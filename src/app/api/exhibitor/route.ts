import { randomUUID } from "crypto";
import { MongoServerError } from "mongodb";
import { validateCallerId } from "@/lib/callerAttribution";
import { syncWarpbayExhibitor } from "@/lib/warpbay";

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

const SHEET_NAME = "Website Enquries";

export async function POST(req: Request) {

  try {

    const body = await req.json();
    const callerId = validateCallerId(body.caller_id);
    const requestedId = body.submissionId;
    const submissionId = typeof requestedId === "string" && /^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(requestedId) ? requestedId : randomUUID();

    /*

     * HONEYPOT

     */

    if (clean(body.company_website, 200)) {

      return NextResponse.json({

        success: true,
        recorded: false,

        message:

          "Registration submitted successfully.",

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

     * CLEAN

     */

    const company =

      clean(body.company, 180);

    const name =

      clean(body.name, 120);

    const designation =

      clean(body.designation, 120);

    const email =

      clean(body.email, 200).toLowerCase();

    const phone =

      clean(body.phone, 50);

    const country =

      clean(body.country, 100);

    const website =

      clean(body.website, 300);

    const address =

      clean(body.address, 500);

    const cityState =

      clean(body.cityState, 180);

    const taxId =

      clean(body.taxId, 120);

    const category =

      clean(body.category, 220);

    const exhibitDetails =

      clean(body.exhibitDetails, 3000);

    const brands =

      clean(body.brands, 1000);

    const standSize =

      clean(body.standSize, 200);

    const participationInterests =

      cleanArray(

        body.participationInterests,

        15,

        250

      );

    const message =

      clean(body.message, 3000);

    const consent =

      cleanBoolean(body.consent);

    /*

     * VALIDATION

     */

    if (

      !company ||

      !name ||

      !designation ||

      !email ||

      !phone ||

      !country ||

      !category ||

      !exhibitDetails ||

      !standSize

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

    const formattedDate =

      submittedAt();

    /*

     * MONGODB — SOURCE OF TRUTH

     *

     * Pehle Mongo save.

     * Agar baad me Sheet/mail temporary fail ho,

     * lead lose nahi hogi.

     */

    const client =

      await getMongoClient();

    const collection = client.db("futurex").collection("exhibitors");
    // A partial unique index for submissionId must be provisioned in MongoDB,
    // outside the request path (see README).
    try {
      await collection.insertOne({

        submissionId,
        caller_id: callerId,

        company,

        fullName: name,

        designation,

        email,

        phone,

        country,

        website,

        address,

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

        event: "Odisha Mining & Infrastructure International Expo 2027",

        sheetSynced: false,

        emailSent: false,
        warpbaySynced: false,

        submittedAt: createdAt,

      });
    } catch (error) {
      if (error instanceof MongoServerError && error.code === 11000) {
        const existing = await collection.findOne({ submissionId });
        if (existing) {
          return NextResponse.json({
            success: true,
            recorded: true,
            duplicate: true,
            submissionId,
            caller_id: validateCallerId(existing.caller_id),
            message: "Thank you. Your stand enquiry has been submitted successfully. Our exhibition team will contact you shortly.",
          });
        }
      }
      throw error;
    }



    /*

     * GOOGLE SHEET TASK

     */

    const spreadsheetId =

      process.env.GOOGLE_SHEET_ID;

    const sheetTask =

      spreadsheetId

        ? withRetry(async () => {

            await appendToExcel(

              spreadsheetId,

              SHEET_NAME,

              {

                Date: formattedDate,

                Platform: "Website",

                "Register As":

                  "Exhibitor",

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

                Address: [

                  address,

                  cityState,

                ]

                  .filter(Boolean)

                  .join(", "),

                Country:

                  country,

                "Area of Interest":

                  category,

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

              }

            );

            await collection.updateOne(

              { submissionId },

              {

                $set: {

                  sheetSynced: true,

                  sheetSyncedAt:

                    new Date(),

                },

              }

            );

          })

        : Promise.resolve();

    /*

     * ADMIN EMAIL TASK

     */

    const recipients =

      mailRecipients();

    const mailTask =

      recipients.length

        ? withRetry(async () => {

            await transporter.sendMail({

              from:

                `"Odisha Mining Expo" <${process.env.EMAIL_USER}>`,

              replyTo: email,

              to: recipients,

              subject:

                `Exhibitor Registration — ${company} | Odisha Mining Expo 2027`,

              html:

                buildAdminEmailHtml({

                  badge:

                    "Exhibitor Registration",

                  submittedAt:

                    formattedDate,

                  rows: [

                    {

                      label:

                        "Submission ID",

                      value:

                        submissionId,

                    },

                    {

                      label:

                        "Company",

                      value:

                        company,

                    },

                    {

                      label:

                        "Contact Person",

                      value:

                        name,

                    },

                    {

                      label:

                        "Designation",

                      value:

                        designation,

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

                        "Country",

                      value:

                        country,

                    },

                    {

                      label:

                        "City / State",

                      value:

                        cityState,

                    },

                    {

                      label:

                        "Company Address",

                      value:

                        address,

                    },

                    {

                      label:

                        "Company Website",

                      value:

                        website,

                    },

                    {

                      label:

                        "GST / VAT / Tax ID",

                      value:

                        taxId,

                    },

                    {

                      label:

                        "Primary Category",

                      value:

                        category,

                    },

                    {

                      label:

                        "Products / Solutions",

                      value:

                        exhibitDetails,

                    },

                    {

                      label:

                        "Brands / Products",

                      value:

                        brands,

                    },

                    {

                      label:

                        "Stand Preference",

                      value:

                        standSize,

                    },

                    {

                      label:

                        "Additional Participation",

                      value:

                        participationInterests.join(

                          ", "

                        ),

                    },

                    {

                      label:

                        "Requirements / Questions",

                      value:

                        message,

                    },

                    {

                      label:

                        "Consent",

                      value:

                        "Yes",

                    },

                  ],

                }),

            });

            await collection.updateOne(

              { submissionId },

              {

                $set: {

                  emailSent: true,

                  emailSentAt:

                    new Date(),

                },

              }

            );

          })

        : Promise.resolve();

    /*

     * PARALLEL EXTERNAL WORK

     */

    // WARPBAY sync is independent of the saved registration and existing Sheets/mail tasks.
      // Do not retry blindly: WARPBAY does not document idempotency.
      const warpbayTask = syncWarpbayExhibitor({
        submissionId, name, designation, company, email, phone, country,
        website, cityState, address, taxId, category, exhibitDetails,
        brands, standSize, participationInterests, message,
      }).then(async (userId) => {
        await collection.updateOne({ submissionId }, {
          $set: { warpbaySynced: true, warpbayUserId: userId, warpbaySyncedAt: new Date() },
        });
      }).catch(async (error: unknown) => {
        console.error("Exhibitor WARPBAY sync failed:", error instanceof Error ? error.message : "unknown error");
        try { await collection.updateOne({ submissionId }, {
          $set: { warpbaySynced: false, warpbayLastAttemptAt: new Date() },
        }); } catch { /* preserve existing success semantics */ }
      });

    const [sheetResult, mailResult] = await Promise.allSettled([

        sheetTask,

        mailTask,
        warpbayTask,

      ]);

    if (

      sheetResult.status ===

      "rejected"

    ) {

      console.error(

        "Exhibitor sheet sync failed:",

        sheetResult.reason

      );

    }

    if (

      mailResult.status ===

      "rejected"

    ) {

      console.error(

        "Exhibitor email failed:",

        mailResult.reason

      );

    }

    /*

     * Mongo already has the lead,

     * so temporary secondary-service failure

     * should not lose the registration.

     */

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

      error

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