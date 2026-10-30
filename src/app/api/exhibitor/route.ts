import { randomUUID } from "crypto";
import { MongoServerError } from "mongodb";
import { NextResponse } from "next/server";
import getMongoClient from "@/lib/mongodb";
import {
  transporter,
  mailRecipients,
} from "@/lib/mailer";
import { buildAdminEmailHtml } from "@/lib/emailTemplate";
import { appendToExcel } from "@/lib/excelSheet";
import { verifyRecaptcha } from "@/lib/recaptcha";
import { withRetry } from "@/lib/retry";
import { validateCallerId } from "@/lib/callerAttribution";
import {
  clean,
  cleanArray,
  cleanBoolean,
  emailPattern,
  submittedAt,
} from "@/lib/forms";
const SHEET_NAME = "Website Enquries";
const UUID_PATTERN =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const callerId = validateCallerId(
      body.caller_id
    );
    const requestedId = body.submissionId;
    const submissionId =
      typeof requestedId === "string" &&
      UUID_PATTERN.test(requestedId)
        ? requestedId
        : randomUUID();
    // Honeypot: acknowledge without saving.
    if (clean(body.company_website, 200)) {
      return NextResponse.json({
        success: true,
        recorded: false,
        message:
          "Registration submitted successfully.",
      });
    }
    // Verify captcha.
    const captchaValid = await verifyRecaptcha(
      body.captchaToken
    );
    if (!captchaValid) {
      return NextResponse.json(
        {
          success: false,
          message:
            "reCAPTCHA verification failed. Please confirm that you're not a robot.",
        },
        { status: 400 }
      );
    }
    // Clean fields.
    const company = clean(body.company, 180);
    const name = clean(body.name, 120);
    const designation = clean(
      body.designation,
      120
    );
    const email = clean(
      body.email,
      200
    ).toLowerCase();
    const phone = clean(body.phone, 50);
    const countryCode = clean(
      body.countryCode,
      8
    );
    const country = clean(body.country, 100);
    const website = clean(body.website, 300);
    const address = clean(body.address, 500);
    const city = clean(body.city, 120);
    const state = clean(body.state, 120);
    const suppliedCityState = clean(
      body.cityState,
      180
    );
    // Maintain the legacy MongoDB/Sheet field.
    const cityState =
      suppliedCityState ||
      [city, state].filter(Boolean).join(", ");
    const taxId = clean(body.taxId, 120);
    const category = clean(body.category, 220);
    const exhibitDetails = clean(
      body.exhibitDetails,
      3000
    );
    const brands = clean(body.brands, 1000);
    const standSize = clean(
      body.standSize,
      200
    );
    const participationInterests = cleanArray(
      body.participationInterests,
      15,
      250
    );
    const message = clean(body.message, 3000);
    const consent = cleanBoolean(body.consent);
    // Existing form requirements.
    if (
      !company ||
      !name ||
      !designation ||
      !email ||
      !phone ||
      !country ||
      !exhibitDetails
    ) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Please complete all required fields.",
        },
        { status: 400 }
      );
    }
    if (
      !/^\+[1-9]\d{0,3}$/.test(countryCode) ||
      !/^\d{5,15}$/.test(phone)
    ) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Please provide a valid country code and mobile number.",
        },
        { status: 400 }
      );
    }
    if (!emailPattern.test(email)) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Please enter a valid email address.",
        },
        { status: 400 }
      );
    }
    if (!consent) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Please accept the consent statement to continue.",
        },
        { status: 400 }
      );
    }
    const createdAt = new Date();
    const formattedDate = submittedAt();
    // MongoDB remains the source of truth.
    const client = await getMongoClient();
    const collection = client
      .db("futurex")
      .collection("exhibitors");
    try {
      await collection.insertOne({
        submissionId,
        caller_id: callerId,
        company,
        fullName: name,
        designation,
        email,
        phone,
        countryCode,
        country,
        website,
        address,
        city,
        state,
        cityState,
        taxId,
        category,
        exhibitDetails,
        brands,
        standSize,
        participationInterests,
        message,
        consent,
        source: "website",
        event:
          "Odisha Mining & Infrastructure International Expo 2027",
        sheetSynced: false,
        emailSent: false,
        submittedAt: createdAt,
      });
    } catch (error) {
      // Existing partial unique index on submissionId.
      if (
        error instanceof MongoServerError &&
        error.code === 11000
      ) {
        const existing = await collection.findOne({
          submissionId,
        });
        if (existing) {
          return NextResponse.json({
            success: true,
            recorded: true,
            duplicate: true,
            submissionId,
            caller_id: validateCallerId(
              existing.caller_id
            ),
            message:
              "Thank you. Your stand enquiry has been submitted successfully. Our exhibition team will contact you shortly.",
          });
        }
      }
      throw error;
    }
    // Mark a consented incomplete lead as converted only after Mongo saves.
    // Failure to update a draft must not affect successful registration.
    const draftId =
      typeof body.draftId === "string" && UUID_PATTERN.test(body.draftId)
        ? body.draftId
        : null;
    if (draftId) {
      try {
        await client.db("futurex").collection("incomplete_leads").updateOne(
          { draftId, formType: "exhibitor", status: "draft" },
          { $set: { status: "converted", submissionId, convertedAt: new Date() } }
        );
      } catch (draftError) {
        console.error("Draft conversion update failed:", draftError instanceof Error ? draftError.message : "unknown");
      }
    }
    // Google Sheets.
    const spreadsheetId =
      process.env.GOOGLE_SHEET_ID;
    const sheetTask = spreadsheetId
      ? withRetry(async () => {
          await appendToExcel(
            spreadsheetId,
            SHEET_NAME,
            {
              Date: formattedDate,
              Platform: "Website",
              "Register As": "Exhibitor",
              "Company Name": company,
              "Contact Person": name,
              Designation: designation,
              "Email Id": email,
              "Mobile No.": phone,
              Website: website,
              Address: [
                address,
                cityState,
              ]
                .filter(Boolean)
                .join(", "),
              Country: country,
              "Area of Interest": category,
              "Info. Get From":
                "Odisha Mining Expo Website",
              Message: [
                `Stand Preference: ${standSize}`,
                participationInterests.length
                  ? `Additional Participation: ${participationInterests.join(", ")}`
                  : "",
                message
                  ? `Requirements: ${message}`
                  : "",
              ]
                .filter(Boolean)
                .join("\n"),
              "Product Profile": [
                exhibitDetails,
                brands
                  ? `Brands / Products: ${brands}`
                  : "",
                taxId
                  ? `GST / VAT / Tax ID: ${taxId}`
                  : "",
              ]
                .filter(Boolean)
                .join("\n"),
              "Caller ID":
                callerId ?? "Unassigned",
            }
          );
          await collection.updateOne(
            { submissionId },
            {
              $set: {
                sheetSynced: true,
                sheetSyncedAt: new Date(),
              },
            }
          );
        })
      : Promise.resolve();
    // Admin email.
    const recipients = mailRecipients();
    const mailTask = recipients.length
      ? withRetry(async () => {
          await transporter.sendMail({
            from:
              `"Odisha Mining Expo" <${process.env.EMAIL_USER}>`,
            replyTo: email,
            to: recipients,
            subject:
              `Exhibitor Registration — ${company} | Odisha Mining Expo 2027`,
            html: buildAdminEmailHtml({
              badge: "Exhibitor Registration",
              submittedAt: formattedDate,
              rows: [
                {
                  label: "Submission ID",
                  value: submissionId,
                },
                {
                  label: "Company",
                  value: company,
                },
                {
                  label: "Contact Person",
                  value: name,
                },
                {
                  label: "Designation",
                  value: designation,
                },
                {
                  label: "Email",
                  value: email,
                },
                {
                  label: "Phone",
                  value: `${countryCode} ${phone}`,
                },
                {
                  label: "Country",
                  value: country,
                },
                {
                  label: "City",
                  value: city,
                },
                {
                  label: "State",
                  value: state,
                },
                {
                  label: "Company Address",
                  value: address,
                },
                {
                  label: "Company Website",
                  value: website,
                },
                {
                  label: "GST / VAT / Tax ID",
                  value: taxId,
                },
                {
                  label: "Primary Category",
                  value: category,
                },
                {
                  label: "Products / Solutions",
                  value: exhibitDetails,
                },
                {
                  label: "Brands / Products",
                  value: brands,
                },
                {
                  label: "Stand Preference",
                  value: standSize,
                },
                {
                  label: "Additional Participation",
                  value:
                    participationInterests.join(", "),
                },
                {
                  label: "Requirements / Questions",
                  value: message,
                },
                {
                  label: "Caller ID",
                  value:
                    callerId ?? "Unassigned",
                },
                {
                  label: "Consent",
                  value: "Yes",
                },
              ],
            }),
          });
          await collection.updateOne(
            { submissionId },
            {
              $set: {
                emailSent: true,
                emailSentAt: new Date(),
              },
            }
          );
        })
      : Promise.resolve();
    // Wait for secondary tasks.
    const results = await Promise.allSettled([
      sheetTask,
      mailTask,
    ]);
    results.forEach((result, index) => {
      if (result.status === "rejected") {
        const taskName = index === 0
          ? "Exhibitor sheet failed:"
          : "Exhibitor mail failed:";
        console.error(
          taskName,
          result.reason
        );
      }
    });
    return NextResponse.json({
      success: true,
      recorded: true,
      duplicate: false,
      submissionId,
      caller_id: callerId,
      message:
        "Thank you. Your stand enquiry has been submitted successfully. Our exhibition team will contact you shortly.",
    });
  } catch (error) {
    console.error(
      "Exhibitor registration error:",
      error instanceof Error
        ? error.message
        : "unknown error"
    );
    return NextResponse.json(
      {
        success: false,
        message:
          "We could not submit your registration. Please try again.",
      },
      { status: 500 }
    );
  }
}
