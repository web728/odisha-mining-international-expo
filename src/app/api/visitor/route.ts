import { randomUUID } from "crypto";
import { MongoServerError } from "mongodb";
import { NextResponse } from "next/server";
import getMongoClient from "@/lib/mongodb";
import { transporter, mailRecipients } from "@/lib/mailer";
import { buildAdminEmailHtml } from "@/lib/emailTemplate";
import { appendToExcel } from "@/lib/excelSheet";
import { verifyRecaptcha } from "@/lib/recaptcha";
import { withRetry } from "@/lib/retry";
import { validateCallerId } from "@/lib/callerAttribution";
import { syncWarpbayVisitor } from "@/lib/warpbay";
import { clean, cleanArray, cleanBoolean, emailPattern, submittedAt } from "@/lib/forms";

const SHEET_NAME = "Website Enquries";
const UUID_PATTERN = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const callerId = validateCallerId(body.caller_id);
    const submissionId = typeof body.submissionId === "string" && UUID_PATTERN.test(body.submissionId)
      ? body.submissionId
      : randomUUID();

    // Keep the original honeypot acknowledgement; it is NOT a saved registration.
    if (clean(body.company_website, 200)) {
      return NextResponse.json({
        success: true,
        recorded: false,
        message: "Visitor registration submitted successfully.",
      });
    }

    const captchaValid = await verifyRecaptcha(body.captchaToken);
    if (!captchaValid) {
      return NextResponse.json({ success: false, message: "reCAPTCHA verification failed." }, { status: 400 });
    }

    const name = clean(body.name, 120);
    const designation = clean(body.designation, 120);
    const company = clean(body.company, 180);
    const email = clean(body.email, 200).toLowerCase();
    const phone = clean(body.phone, 50);
    const countryCode = clean(body.countryCode, 8);
    const website = clean(body.website, 300);
    const city = clean(body.city, 120);
    const country = clean(body.country, 120);
    const profile = clean(body.profile, 220);
    const source = clean(body.source, 180);
    const interest = cleanArray(body.interest, 30, 180);
    const consent = cleanBoolean(body.consent);

    if (!name || !designation || !company || !email || !phone || !city || !country || !profile || !source || !interest.length) {
      return NextResponse.json({ success: false, message: "Please complete all required fields." }, { status: 400 });
    }
    if (!/^\+[1-9]\d{0,3}$/.test(countryCode) || !/^\d{5,15}$/.test(phone)) {
      return NextResponse.json({ success: false, message: "Please provide a valid country code and mobile number." }, { status: 400 });
    }
    if (!emailPattern.test(email)) {
      return NextResponse.json({ success: false, message: "Please enter a valid email address." }, { status: 400 });
    }
    if (!consent) {
      return NextResponse.json({ success: false, message: "Please accept the consent statement." }, { status: 400 });
    }

    const date = submittedAt();
    const client = await getMongoClient();
    const collection = client.db("futurex").collection("visitors");
    let insertedId;
    try {
      const insertion = await collection.insertOne({
        submissionId,
        caller_id: callerId,
        fullName: name,
        designation,
        company,
        email,
        phone,
        countryCode,
        website,
        city,
        country,
        profile,
        interest,
        source,
        consent,
        sheetSynced: false,
        emailSent: false,
        warpbaySynced: false,
        submittedAt: new Date(),
      });
      insertedId = insertion.insertedId;
    } catch (error) {
      // Requires the partial unique index documented in README; do not rebuild it per request.
      if (error instanceof MongoServerError && error.code === 11000) {
        const existing = await collection.findOne({ submissionId });
        if (existing) {
          return NextResponse.json({
            success: true,
            recorded: true,
            duplicate: true,
            submissionId,
            caller_id: existing.caller_id === "caller_1" || existing.caller_id === "caller_2"
              ? existing.caller_id : null,
            message: "Visitor registration submitted successfully.",
          });
        }
      }
      throw error;
    }

    const sheetId = process.env.GOOGLE_SHEET_ID;
    const sheetTask = sheetId
      ? withRetry(async () => {
          await appendToExcel(sheetId, SHEET_NAME, {
            Date: date,
            Platform: "Website",
            "Register As": "Visitor",
            "Company Name": company,
            "Contact Person": name,
            Designation: designation,
            "Email Id": email,
            "Mobile No.": phone,
            Website: website,
            Address: city,
            Country: country,
            "Area of Interest": interest.join(", "),
            "Info. Get From": source,
            Message: "Visitor Registration",
            "Product Profile": profile,
            "Caller ID": callerId ?? "Unassigned",
          });
          await collection.updateOne({ _id: insertedId }, {
            $set: { sheetSynced: true, sheetSyncedAt: new Date() },
          });
        })
      : Promise.resolve();

    const recipients = mailRecipients();
    const mailTask = recipients.length
      ? withRetry(async () => {
          await transporter.sendMail({
            from: `"Odisha Mining Expo" <${process.env.EMAIL_USER}>`,
            replyTo: email,
            to: recipients,
            subject: `Visitor Registration — ${name} | Odisha Mining Expo 2027`,
            html: buildAdminEmailHtml({
              badge: "Visitor Registration",
              submittedAt: date,
              rows: [
                { label: "Full Name", value: name },
                { label: "Company", value: company },
                { label: "Email", value: email },
                { label: "Phone", value: phone },
                { label: "Profile", value: profile },
                { label: "Areas of Interest", value: interest.join(", ") },
              ],
            }),
          });
          await collection.updateOne({ _id: insertedId }, {
            $set: { emailSent: true, emailSentAt: new Date() },
          });
        })
      : Promise.resolve();

    // External system is secondary: MongoDB remains the registration source of truth.
    // No automatic retry here: WARPBAY has not documented idempotency semantics.
    const warpbayTask = syncWarpbayVisitor({
      submissionId, name, designation, company, email, phone,
      country, website, city, profile, source, interest, countryCode,
      state: clean(body.state, 120), title: clean(body.title, 40),
      primaryCategory: clean(body.primaryCategory, 220),
      productsSolutions: clean(body.productsSolutions, 3000),
    }).then(async (userId) => {
      await collection.updateOne({ _id: insertedId }, {
        $set: { warpbaySynced: true, warpbayUserId: userId, warpbaySyncedAt: new Date() },
      });
    }).catch(async (error: unknown) => {
      console.error("Visitor WARPBAY sync failed:", error instanceof Error ? error.message : "unknown error");
      // Keep failure visible for controlled reconciliation, with no PII in logs.
      try { await collection.updateOne({ _id: insertedId }, { $set: { warpbaySynced: false, warpbayLastAttemptAt: new Date() } }); }
      catch { /* preserve existing success semantics */ }
    });

    const results = await Promise.allSettled([sheetTask, mailTask, warpbayTask]);
    results.forEach((result, index) => {
      if (result.status === "rejected") {
        console.error(index === 0 ? "Visitor sheet failed:" : "Visitor mail failed:", result.reason);
      }
    });

    return NextResponse.json({
      success: true,
      recorded: true,
      duplicate: false,
      submissionId,
      caller_id: callerId,
      message: "Visitor registration submitted successfully.",
    });
  } catch (error) {
    console.error("Visitor form error:", error);
    return NextResponse.json({ success: false, message: "Unable to submit registration." }, { status: 500 });
  }
}
