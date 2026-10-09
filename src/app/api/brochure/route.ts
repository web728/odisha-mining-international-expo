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

import {
  clean,
  emailPattern,
  submittedAt,
} from "@/lib/forms";

const SHEET_NAME =
  "Website Enquries";

export async function POST(
  req: Request
) {
  try {
    const body =
      await req.json();

    /*
     * HONEYPOT
     */
    if (
      clean(
        body.company_website,
        200
      )
    ) {
      return NextResponse.json({
        success: true,
        message:
          "Brochure request submitted successfully.",
      });
    }

    /*
     * RECAPTCHA
     */
    const captchaValid =
      await verifyRecaptcha(
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

    /*
     * CLEAN DATA
     */
    const name =
      clean(body.name, 120);

    const email =
      clean(
        body.email,
        200
      ).toLowerCase();

    const company =
      clean(
        body.company,
        180
      );

    const phone =
      clean(
        body.phone,
        50
      );

    /*
     * VALIDATION
     */
    if (
      !name ||
      !email ||
      !phone
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
      !emailPattern.test(email)
    ) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Please enter a valid email address.",
        },
        { status: 400 }
      );
    }

    const date =
      submittedAt();

    const createdAt =
      new Date();

    /*
     * MONGO FIRST
     *
     * Mongo = primary/source of truth.
     */
    const client =
      await getMongoClient();

    const collection =
      client
        .db("futurex")
        .collection(
          "brochure_downloads"
        );

    const insertResult =
      await collection.insertOne({
        fullName: name,
        email,
        company,
        phone,

        source:
          "Brochure Download",

        event:
          "OMIIE 2027",

        sheetSynced: false,
        emailSent: false,

        submittedAt:
          createdAt,
      });

    /*
     * GOOGLE SHEET
     */
    const sheetId =
      process.env
        .GOOGLE_SHEET_ID;

    const sheetTask =
      sheetId
        ? withRetry(
            async () => {
              await appendToExcel(
                sheetId,
                SHEET_NAME,
                {
                  Date: date,

                  Platform:
                    "Website",

                  "Register As":
                    "Brochure Download",

                  "Company Name":
                    company,

                  "Contact Person":
                    name,

                  Designation:
                    "",

                  "Email Id":
                    email,

                  "Mobile No.":
                    phone,

                  Website:
                    "",

                  Address:
                    "",

                  Country:
                    "",

                  "Area of Interest":
                    "Brochure Download",

                  "Info. Get From":
                    "Odisha Mining Expo Website",

                  Message:
                    "Requested / downloaded the Odisha Mining Expo 2027 brochure",

                  "Product Profile":
                    "",
                }
              );

              await collection.updateOne(
                {
                  _id:
                    insertResult.insertedId,
                },
                {
                  $set: {
                    sheetSynced:
                      true,

                    sheetSyncedAt:
                      new Date(),
                  },
                }
              );
            }
          )
        : Promise.resolve();

    /*
     * EMAIL
     */
    const recipients =
      mailRecipients();

    const mailTask =
      recipients.length
        ? withRetry(
            async () => {
              await transporter.sendMail({
                from:
                  `"Odisha Mining Expo" <${process.env.EMAIL_USER}>`,

                replyTo:
                  email,

                to:
                  recipients,

                subject:
                  `Brochure Download — ${name}${
                    company
                      ? ` (${company})`
                      : ""
                  } | Odisha Mining Expo 2027`,

                html:
                  buildAdminEmailHtml(
                    {
                      badge:
                        "Brochure Download",

                      submittedAt:
                        date,

                      rows: [
                        {
                          label:
                            "Name",
                          value:
                            name,
                        },
                        {
                          label:
                            "Email",
                          value:
                            email,
                        },
                        {
                          label:
                            "Company",
                          value:
                            company,
                        },
                        {
                          label:
                            "Phone",
                          value:
                            phone,
                        },
                        {
                          label:
                            "Source",
                          value:
                            "Odisha Mining Expo Website",
                        },
                      ],
                    }
                  ),
              });

              await collection.updateOne(
                {
                  _id:
                    insertResult.insertedId,
                },
                {
                  $set: {
                    emailSent:
                      true,

                    emailSentAt:
                      new Date(),
                  },
                }
              );
            }
          )
        : Promise.resolve();

    /*
     * SHEET + EMAIL PARALLEL
     */
    const [
      sheetResult,
      mailResult,
    ] =
      await Promise.allSettled([
        sheetTask,
        mailTask,
      ]);

    if (
      sheetResult.status ===
      "rejected"
    ) {
      console.error(
        "Brochure Google Sheet sync failed:",
        sheetResult.reason
      );
    }

    if (
      mailResult.status ===
      "rejected"
    ) {
      console.error(
        "Brochure admin email failed:",
        mailResult.reason
      );
    }

    /*
     * Configure this in env.
     */
    const downloadUrl =
      process.env
        .BROCHURE_DOWNLOAD_URL;

    if (!downloadUrl) {
      console.error(
        "BROCHURE_DOWNLOAD_URL is missing."
      );

      return NextResponse.json({
        success: true,

        message:
          "Your request was submitted successfully, but the brochure download URL is not configured yet.",
      });
    }

    return NextResponse.json({
      success: true,

      message:
        "Thank you. Your brochure is ready to download.",

      downloadUrl,
    });
  } catch (error) {
    console.error(
      "Brochure request error:",
      error
    );

    return NextResponse.json(
      {
        success: false,

        message:
          "We could not process your brochure request. Please try again.",
      },
      { status: 500 }
    );
  }
}