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

const SHEET_NAME = "Website Enquries";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    /*
     * HONEYPOT
     */
    if (clean(body.company_website, 200)) {
      return NextResponse.json({
        success: true,
        message: "Form submitted successfully.",
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
    const fullName = clean(
      body.fullName,
      120
    );

    const company = clean(
      body.company,
      180
    );

    const designation = clean(
      body.designation,
      120
    );

    const email = clean(
      body.email,
      200
    ).toLowerCase();

    const phone = clean(
      body.phone,
      50
    );

    const country = clean(
      body.country,
      120
    );

    const interestType = clean(
      body.interestType,
      180
    );

    const message = clean(
      body.message,
      2500
    );

    /*
     * VALIDATION
     */
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
     * MONGODB ATLAS
     */
    const client =
      await getMongoClient();

    await client
      .db("futurex")
      .collection("contacts")
      .insertOne({
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

        submittedAt: createdAt,
      });

    /*
     * GOOGLE SHEET
     */
    const sheetId =
      process.env.GOOGLE_SHEET_ID;

    if (sheetId) {
      await appendToExcel(
        sheetId,
        SHEET_NAME,
        {
          Date: formattedDate,

          Platform: "Website",

          "Register As":
            "Contact Enquiry",

          "Company Name":
            company || "",

          "Contact Person":
            fullName,

          Designation:
            designation || "",

          "Email Id": email,

          "Mobile No.": phone,

          Website: "",

          Address: "",

          Country:
            country || "",

          "Area of Interest":
            interestType,

          "Info. Get From":
            "Odisha Mining Expo Website",

          Message:
            message,

          "Product Profile": "",
        }
      );
    }

    /*
     * EMAIL TO BOTH ADMIN RECIPIENTS
     */
    const recipients =
      mailRecipients();

    if (recipients.length) {
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
          ],
        }),
      });
    }

    return NextResponse.json({
      success: true,
      message:
        "Thank you. Your enquiry has been submitted successfully. Our team will get back to you shortly.",
    });
  } catch (error) {
    console.error(
      "Contact form error:",
      error
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