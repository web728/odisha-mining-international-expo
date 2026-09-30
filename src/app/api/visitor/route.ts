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
  cleanArray,
  cleanBoolean,
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

    if (
      clean(
        body.company_website,
        200
      )
    ) {
      return NextResponse.json({
        success: true,
        message:
          "Visitor registration submitted successfully.",
      });
    }

    const captchaValid =
      await verifyRecaptcha(
        body.captchaToken
      );

    if (!captchaValid) {
      return NextResponse.json(
        {
          success: false,
          message:
            "reCAPTCHA verification failed.",
        },
        { status: 400 }
      );
    }

    const name =
      clean(body.name, 120);

    const designation =
      clean(
        body.designation,
        120
      );

    const company =
      clean(
        body.company,
        180
      );

    const email =
      clean(
        body.email,
        200
      ).toLowerCase();

    const phone =
      clean(
        body.phone,
        50
      );

    const website =
      clean(
        body.website,
        300
      );

    const city =
      clean(
        body.city,
        120
      );

    const country =
      clean(
        body.country,
        120
      );

    const profile =
      clean(
        body.profile,
        220
      );

    const source =
      clean(
        body.source,
        180
      );

    const interest =
      cleanArray(
        body.interest,
        30,
        180
      );

    const consent =
      cleanBoolean(
        body.consent
      );

    if (
      !name ||
      !designation ||
      !company ||
      !email ||
      !phone ||
      !city ||
      !country ||
      !profile ||
      !source ||
      !interest.length
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

    const date =
      submittedAt();

    const client =
      await getMongoClient();

    const collection =
      client
        .db("futurex")
        .collection("visitors");

    const result =
      await collection.insertOne({
        fullName: name,
        designation,
        company,
        email,
        phone,
        website,
        city,
        country,
        profile,
        interest,
        source,
        consent,

        sheetSynced: false,
        emailSent: false,

        submittedAt:
          new Date(),
      });

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
                    "Visitor",
                  "Company Name":
                    company,
                  "Contact Person":
                    name,
                  Designation:
                    designation,
                  "Email Id":
                    email,
                  "Mobile No.":
                    phone,
                  Website:
                    website,
                  Address:
                    city,
                  Country:
                    country,
                  "Area of Interest":
                    interest.join(
                      ", "
                    ),
                  "Info. Get From":
                    source,
                  Message:
                    "Visitor Registration",
                  "Product Profile":
                    profile,
                }
              );

              await collection.updateOne(
                {
                  _id:
                    result.insertedId,
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
                to: recipients,
                subject:
                  `Visitor Registration — ${name} | Odisha Mining Expo 2027`,
                html:
                  buildAdminEmailHtml(
                    {
                      badge:
                        "Visitor Registration",
                      submittedAt:
                        date,
                      rows: [
                        {
                          label:
                            "Full Name",
                          value:
                            name,
                        },
                        {
                          label:
                            "Company",
                          value:
                            company,
                        },
                        {
                          label:
                            "Email",
                          value:
                            email,
                        },
                        {
                          label:
                            "Phone",
                          value:
                            phone,
                        },
                        {
                          label:
                            "Profile",
                          value:
                            profile,
                        },
                        {
                          label:
                            "Areas of Interest",
                          value:
                            interest.join(
                              ", "
                            ),
                        },
                      ],
                    }
                  ),
              });

              await collection.updateOne(
                {
                  _id:
                    result.insertedId,
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

    const results =
      await Promise.allSettled(
        [
          sheetTask,
          mailTask,
        ]
      );

    results.forEach(
      (result, index) => {
        if (
          result.status ===
          "rejected"
        ) {
          console.error(
            index === 0
              ? "Visitor sheet failed:"
              : "Visitor mail failed:",
            result.reason
          );
        }
      }
    );

    return NextResponse.json({
      success: true,
      message:
        "Visitor registration submitted successfully.",
    });
  } catch (error) {
    console.error(
      "Visitor form error:",
      error
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