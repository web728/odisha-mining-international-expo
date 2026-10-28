

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

  | "role_conflict"

  | "accepted_unconfirmed"

  | "missing_data"

  | "failed"

  | "unconfirmed";



const SUCCESS_MESSAGE =

  "Visitor registration submitted successfully.";



function getWarpbayResponseMessage(

  status: WarpbayStatus

): string {

  switch (status) {

    case "synced":

      return SUCCESS_MESSAGE;



    case "already_registered":

      return (

        "You are already registered for this event on WARPBAY. " +

        "Your enquiry has been saved. " +

        "Our team will verify your existing registration."

      );



    case "role_conflict":

      return (

        "Your enquiry has been saved, but your account " +

        "already has an Organizer role on WARPBAY. " +

        "Please contact the event team for assistance."

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

    default:

      return (

        "Your enquiry has been saved successfully. " +

        "External registration confirmation is pending."

      );

  }

}



function existingWarpbayStatus(

  status: unknown,

  synced: unknown

): WarpbayStatus {

  if (

    status === "synced" ||

    status === "already_registered" ||

    status === "role_conflict" ||

    status === "accepted_unconfirmed" ||

    status === "missing_data" ||

    status === "failed" ||

    status === "unconfirmed"

  ) {

    return status;

  }



  return synced === true ? "synced" : "unconfirmed";

}



export async function POST(req: Request) {

  try {

    const body = await req.json();



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

        message: SUCCESS_MESSAGE,

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



    // The simplified form collects Full Name as one field.
    const name = clean(body.name, 120);
    const firstName = "";
    const lastName = "";
    const hasSplitNameInput = false;

    const designation = clean(

      body.designation,

      120

    );



    const company = clean(body.company, 180);



    const email = clean(

      body.email,

      200

    ).toLowerCase();



    const phone = clean(body.phone, 50);



    const countryCode = clean(

      body.countryCode,

      8

    ).replace(/[\s()-]/g, "");



    const website = clean(body.website, 300);

    const city = clean(body.city, 120);

    const state = clean(body.state, 120);

    const country = clean(body.country, 120);



    const title = clean(body.title, 40);



    const primaryCategory = clean(body.primaryCategory ?? body.businessCategory, 220);



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



    // Required fields.

    if (

      !name ||

      !designation ||

      !company ||

      !email ||

      !phone ||

      !country

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



    // Country calling code and national number

    // must arrive separately from PhoneField.

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



    // MongoDB is the source of truth.

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



        ...(hasSplitNameInput

          ? {

              firstName,

              lastName,

            }

          : {}),



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

      // Relies on the unique submissionId index.

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



            message:

              getWarpbayResponseMessage(

                existingStatus

              ),

          });

        }

      }



      throw error;

    }



    /*

    // Mark a consented incomplete lead as converted only after Mongo saves.
    // Failure to update a draft must not affect successful registration.
    const draftId =
      typeof body.draftId === "string" && UUID_PATTERN.test(body.draftId)
        ? body.draftId
        : null;
    if (draftId) {
      try {
        await client.db("futurex").collection("incomplete_leads").updateOne(
          { draftId, formType: "visitor", status: "draft" },
          { $set: { status: "converted", submissionId, convertedAt: new Date() } }
        );
      } catch (draftError) {
        console.error("Draft conversion update failed:", draftError instanceof Error ? draftError.message : "unknown");
      }
    }

     * GOOGLE SHEETS

     * Caller ID mapped to existing Caller ID header.

     */

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



    /*

     * ADMIN EMAIL

     */

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

                  label: "Submission ID",

                  value: submissionId,

                },

                {

                  label: "Full Name",

                  value: name,

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

                  label: "Title",

                  value: title,

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

                {

                  label: "How Heard About Us",

                  value: source,

                },

                {

                  label: "Caller ID",

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

        })

      : Promise.resolve();



    /*

     * WARPBAY:

     * No automatic retry to avoid duplicates.

     *

     * Object state avoids TypeScript narrowing

     * errors inside async callbacks.

     */

    const warpbayOutcome: {

      status: WarpbayStatus;

    } = {

      status: "unconfirmed",

    };



    const warpbayTask = (async () => {

      try {

        const result = await syncWarpbayVisitor({

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

        });



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

          // External registration may have succeeded.

          // Do not call WARPBAY again here.

          console.error(

            "Visitor WARPBAY status DB update failed:",

            dbError instanceof Error

              ? dbError.message

              : "unknown error"

          );

        }

      } catch (error) {

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

          // Mongo registration remains saved.

        }

      }

    })();



    /*

     * Run secondary tasks independently.

     */

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



      message:

        getWarpbayResponseMessage(

          finalWarpbayStatus

        ),

    });

  } catch (error) {

    console.error(

      "Visitor registration error:",

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
