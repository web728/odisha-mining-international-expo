
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
import {
  clean,
  emailPattern,
  submittedAt,
} from "@/lib/forms";
import { verifyRecaptcha } from "@/lib/recaptcha";
import { validateCallerId } from "@/lib/callerAttribution";

const SHEET_NAME = "Website Enquries";

const UUID_PATTERN =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[89ab][0-9a-f]{12}$/i;

// Use the same format as existing registration routes.
const VALID_UUID_PATTERN =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

const SUCCESS_MESSAGE =
  "Thank you. Your enquiry has been submitted successfully. Our team will get back to you shortly.";

export async function POST(req: Request) {
  try {
    const body: unknown = await req.json();

    if (
      !body ||
      typeof body !== "object" ||
      Array.isArray(body)
    ) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid request payload.",
        },
        { status: 400 }
      );
    }

    const input = body as Record<string, unknown>;

    const callerId = validateCallerId(
      input.caller_id
    );

    const submissionId =
      typeof input.submissionId === "string" &&
      VALID_UUID_PATTERN.test(input.submissionId)
        ? input.submissionId
        : randomUUID();

    // Honeypot: do not store spam.
    if (clean(input.company_website, 200)) {
      return NextResponse.json({
        success: true,
        recorded: false,
        message: SUCCESS_MESSAGE,
      });
    }

    // reCAPTCHA verification.
    const captchaValid = await verifyRecaptcha(
      input.captchaToken
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

    // Clean input.
    const fullName = clean(
      input.fullName,
      120
    );

    const company = clean(
      input.company,
      180
    );

    const designation = clean(
      input.designation,
      120
    );

    const email = clean(
      input.email,
      200
    ).toLowerCase();

    const phone = clean(
      input.phone,
      50
    );

    const country = clean(
      input.country,
      120
    );

    const interestType = clean(
      input.interestType,
      180
    );

    const message = clean(
      input.message,
      2500
    );

    // Required fields.
    if (
      !fullName ||
      !email ||
      !phone ||
      !interestType ||
      !message
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

    const createdAt = new Date();
    const formattedDate = submittedAt();

    /*
     * MongoDB is the source of truth.
     * The submissionId unique index prevents
     * duplicate inserts from repeated requests.
     */
    const client = await getMongoClient();

    const collection = client
      .db("futurex")
      .collection("contacts");

    let insertedId;

    try {
      const insertion = await collection.insertOne({
        submissionId,
        caller_id: callerId,

        fullName,
        company,
        designation,
        email,
        phone,
        country,
        interestType,
        message,

        source: "website",
        event: "OMIIE 2027",

        sheetSynced: false,
        emailSent: false,

        submittedAt: createdAt,
      });

      insertedId = insertion.insertedId;
    } catch (error) {
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

            message: SUCCESS_MESSAGE,
          });
        }
      }

      throw error;
    }

    /*
     * Google Sheets.
     * Caller ID is mapped to the existing column.
     */
    const sheetId =
      process.env.GOOGLE_SHEET_ID;

    const sheetTask = (async () => {
      if (!sheetId) {
        console.warn(
          "Contact Sheet sync skipped: GOOGLE_SHEET_ID missing"
        );
        return;
      }

      try {
        await appendToExcel(
          sheetId,
          SHEET_NAME,
          {
            Date: formattedDate,

            Platform: "Website",

            "Register As":
              "Contact Enquiry",

            "Company Name":
              company,

            "Contact Person":
              fullName,

            Designation:
              designation,

            "Email Id":
              email,

            "Mobile No.":
              phone,

            Website: "",

            Address: "",

            Country:
              country,

            "Area of Interest":
              interestType,

            "Info. Get From":
              callerId ?? "Odisha Mining Expo Website",

            Message:
              message,

            "Product Profile": "",

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
      } catch (error) {
        console.error(
          "Contact Sheet sync failed:",
          error instanceof Error
            ? error.message
            : "unknown error"
        );
      }
    })();

    /*
     * Admin email.
     */
    const recipients =
      mailRecipients();

    const mailTask = (async () => {
      if (!recipients.length) {
        return;
      }

      try {
        await transporter.sendMail({
          from:
            `"Odisha Mining Expo" <${process.env.EMAIL_USER}>`,

          replyTo: email,

          to: recipients,

          subject:
            `New Contact Enquiry — ${fullName} | Odisha Mining Expo 2027`,

          html: buildAdminEmailHtml({
            badge:
              "New Contact Enquiry",

            submittedAt:
              formattedDate,

            rows: [
              {
                label: "Submission ID",
                value: submissionId,
              },
              {
                label: "Full Name",
                value: fullName,
              },
              {
                label: "Company",
                value: company,
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
                value: phone,
              },
              {
                label: "Country",
                value: country,
              },
              {
                label:
                  "Enquiring About",
                value: interestType,
              },
              {
                label: "Message",
                value: message,
              },
              {
                label: "Tracking Source",
                value:
                  callerId ?? "Unassigned",
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
      } catch (error) {
        console.error(
          "Contact admin email failed:",
          error instanceof Error
            ? error.message
            : "unknown error"
        );
      }
    })();

    // Independent secondary tasks.
    await Promise.allSettled([
      sheetTask,
      mailTask,
    ]);

    return NextResponse.json({
      success: true,
      recorded: true,
      duplicate: false,

      submissionId,
      caller_id: callerId,

      message: SUCCESS_MESSAGE,
    });
  } catch (error) {
    console.error(
      "Contact form error:",
      error instanceof Error
        ? error.message
        : "unknown error"
    );

    return NextResponse.json(
      {
        success: false,
        message:
          "We could not submit your enquiry. Please try again.",
      },
      { status: 500 }
    );
  }
}
