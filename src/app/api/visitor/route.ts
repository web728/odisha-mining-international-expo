
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

type WarpbayStatus =
  | "synced"
  | "already_registered"
  | "accepted_unconfirmed"
  | "failed"
  | "missing_data"
  | "unconfirmed";

function getWarpbayResponseMessage(
  status: WarpbayStatus,
  defaultMessage: string
): string {
  switch (status) {
    case "already_registered":
      return (
        "You are already registered for this event on WARPBAY. " +
        "Your enquiry has been saved. " +
        "Our team will verify your existing registration."
      );

    case "accepted_unconfirmed":
      return (
        "Your enquiry has been saved. " +
        "WARPBAY did not return a registration ID. " +
        "Our team will verify your registration status."
      );

    case "missing_data":
      return (
        "Your enquiry has been saved. " +
        "Some registration details need verification. " +
        "Our team will review your submission."
      );

    case "failed":
    case "unconfirmed":
      return (
        "Your enquiry has been saved successfully. " +
        "External registration confirmation is pending."
      );

    case "synced":
    default:
      return defaultMessage;
  }
}

function existingWarpbayStatus(
  status: unknown,
  synced: unknown
): WarpbayStatus {
  if (
    status === "synced" ||
    status === "already_registered" ||
    status === "accepted_unconfirmed" ||
    status === "failed" ||
    status === "missing_data" ||
    status === "unconfirmed"
  ) {
    return status;
  }

  return synced === true ? "synced" : "unconfirmed";
}

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const callerId = validateCallerId(body.caller_id);

    const submissionId =
      typeof body.submissionId === "string" &&
      UUID_PATTERN.test(body.submissionId)
        ? body.submissionId
        : randomUUID();

    // Honeypot: acknowledge without saving.
    if (clean(body.company_website, 200)) {
      return NextResponse.json({
        success: true,
        recorded: false,
        message:
          "Visitor registration submitted successfully.",
      });
    }

    // Verify reCAPTCHA.
    const captchaValid = await verifyRecaptcha(
      body.captchaToken
    );

    if (!captchaValid) {
      return NextResponse.json(
        {
          success: false,
          message: "reCAPTCHA verification failed.",
        },
        { status: 400 }
      );
    }

    // Clean form inputs.
    const name = clean(body.name, 120);
    const designation = clean(body.designation, 120);
    const company = clean(body.company, 180);

    const email = clean(
      body.email,
      200
    ).toLowerCase();

    const phone = clean(body.phone, 50);
    const countryCode = clean(body.countryCode, 8);

    const website = clean(body.website, 300);
    const city = clean(body.city, 120);
    const state = clean(body.state, 120);
    const country = clean(body.country, 120);

    const title = clean(body.title, 40);
    const primaryCategory = clean(
      body.primaryCategory,
      220
    );
    const productsSolutions = clean(
      body.productsSolutions,
      3000
    );

    const profile = clean(body.profile, 220);
    const source = clean(body.source, 180);

    const interest = cleanArray(
      body.interest,
      30,
      180
    );

    const consent = cleanBoolean(body.consent);

    // Existing required fields + WARPBAY location fields.
    if (
      !name ||
      !designation ||
      !company ||
      !email ||
      !phone ||
      !city ||
      !state ||
      !country ||
      !profile ||
      !source ||
      !interest.length ||
      !title ||
      !primaryCategory ||
      !productsSolutions
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

    // Country code + mobile are separate values.
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
            "Please accept the consent statement.",
        },
        { status: 400 }
      );
    }

    const date = submittedAt();

    // MongoDB is the registration source of truth.
    const client = await getMongoClient();

    const collection = client
      .db("futurex")
      .collection("visitors");

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
        state,
        country,
        title,
        primaryCategory,
        productsSolutions,

        profile,
        interest,
        source,
        consent,

        sheetSynced: false,
        emailSent: false,

        warpbaySynced: false,
        warpbayStatus: "unconfirmed",

        submittedAt: new Date(),
      });

      insertedId = insertion.insertedId;
    } catch (error) {
      // Requires existing partial unique index on submissionId.
      if (
        error instanceof MongoServerError &&
        error.code === 11000
      ) {
        const existing = await collection.findOne({
          submissionId,
        });

        if (existing) {
          const existingStatus =
            existingWarpbayStatus(
              existing.warpbayStatus,
              existing.warpbaySynced
            );

          return NextResponse.json({
            success: true,
            recorded: true,
            duplicate: true,
            submissionId,

            caller_id: validateCallerId(
              existing.caller_id
            ),

            warpbayStatus: existingStatus,

            message: getWarpbayResponseMessage(
              existingStatus,
              "Visitor registration submitted successfully."
            ),
          });
        }
      }

      throw error;
    }

    // Google Sheets sync.
    const sheetId = process.env.GOOGLE_SHEET_ID;

    const sheetTask = sheetId
      ? withRetry(async () => {
          await appendToExcel(
            sheetId,
            SHEET_NAME,
            {
              Date: date,
              Platform: "Website",
              "Register As": "Visitor",

              "Company Name": company,
              "Contact Person": name,
              Designation: designation,
              "Email Id": email,
              "Mobile No.": phone,

              Website: website,
              Address: [city, state]
                .filter(Boolean)
                .join(", "),
              Country: country,

              "Area of Interest":
                interest.join(", "),

              "Info. Get From": source,

              Message: "Visitor Registration",

              "Product Profile": profile,

              "Caller ID":
                callerId ?? "Unassigned",
            }
          );

          await collection.updateOne(
            { _id: insertedId },
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
              `Visitor Registration — ${name} | Odisha Mining Expo 2027`,

            html: buildAdminEmailHtml({
              badge: "Visitor Registration",
              submittedAt: date,
              rows: [
                {
                  label: "Full Name",
                  value: name,
                },
                {
                  label: "Company",
                  value: company,
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
                  label: "City",
                  value: city,
                },
                {
                  label: "State",
                  value: state,
                },
                {
                  label: "Country",
                  value: country,
                },
                {
                  label: "Profile",
                  value: profile,
                },
                {
                  label: "Primary Category",
                  value: primaryCategory,
                },
                {
                  label: "Products / Solutions",
                  value: productsSolutions,
                },
                {
                  label: "Areas of Interest",
                  value: interest.join(", "),
                },
              ],
            }),
          });

          await collection.updateOne(
            { _id: insertedId },
            {
              $set: {
                emailSent: true,
                emailSentAt: new Date(),
              },
            }
          );
        })
      : Promise.resolve();

    /*
     * WARPBAY:
     * Keep status in an object so TypeScript does not
     * incorrectly narrow the variable to "failed".
     *
     * No automatic API retry because WARPBAY has not
     * documented duplicate/idempotency semantics.
     */
    const warpbayOutcome: {
      status: WarpbayStatus;
    } = {
      status: "unconfirmed",
    };

    const warpbayTask = syncWarpbayVisitor({
      submissionId,
      name,
      designation,
      company,
      email,
      phone,
      countryCode,
      country,
      website,
      city,
      state,
      title,
      primaryCategory,
      productsSolutions,
      profile,
      source,
      interest,
    })
      .then(async (result) => {
        warpbayOutcome.status = result.status;

        try {
          await collection.updateOne(
            { _id: insertedId },
            {
              $set: {
                warpbaySynced:
                  result.status === "synced",

                warpbayStatus: result.status,

                warpbayLastAttemptAt:
                  new Date(),

                ...(result.status === "synced"
                  ? {
                      warpbayUserId:
                        result.userId,

                      warpbaySyncedAt:
                        new Date(),
                    }
                  : {}),
              },
            }
          );
        } catch (dbError) {
          // Do not change the WARPBAY outcome if
          // WARPBAY succeeded but Mongo update failed.
          console.error(
            "Visitor WARPBAY status DB update failed:",
            dbError instanceof Error
              ? dbError.message
              : "unknown error"
          );
        }
      })
      .catch(async (error: unknown) => {
        warpbayOutcome.status = "failed";

        console.error(
          "Visitor WARPBAY sync failed:",
          error instanceof Error
            ? error.message
            : "unknown error"
        );

        try {
          await collection.updateOne(
            { _id: insertedId },
            {
              $set: {
                warpbaySynced: false,
                warpbayStatus: "failed",
                warpbayLastAttemptAt:
                  new Date(),
              },
            }
          );
        } catch {
          // Registration stays saved.
        }
      });

    // Wait for all secondary tasks.
    const results = await Promise.allSettled([
      sheetTask,
      mailTask,
      warpbayTask,
    ]);

    results.forEach((result, index) => {
      if (result.status === "rejected") {
        const taskName =
          index === 0
            ? "Visitor sheet failed:"
            : index === 1
              ? "Visitor mail failed:"
              : "Visitor WARPBAY task failed:";

        console.error(
          taskName,
          result.reason
        );
      }
    });

    const finalWarpbayStatus =
      warpbayOutcome.status;

    return NextResponse.json({
      success: true,
      recorded: true,
      duplicate: false,
      submissionId,

      caller_id: callerId,

      warpbayStatus:
        finalWarpbayStatus,

      message: getWarpbayResponseMessage(
        finalWarpbayStatus,
        "Visitor registration submitted successfully."
      ),
    });
  } catch (error) {
    console.error(
      "Visitor form error:",
      error instanceof Error
        ? error.message
        : "unknown error"
    );

    return NextResponse.json(
      {
        success: false,
        message:
          "Unable to submit registration.",
      },
      { status: 500 }
    );
  }
}
