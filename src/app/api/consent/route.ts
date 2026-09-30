import { randomUUID } from "crypto";
import { NextResponse } from "next/server";

import getMongoClient from "@/lib/mongodb";
import { appendToExcel } from "@/lib/excelSheet";
import { clean, submittedAt } from "@/lib/forms";

const SHEET_NAME = "Website Enquries";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const consent =
      body.consent === "accepted"
        ? "Accepted"
        : body.consent === "rejected"
          ? "Rejected"
          : "";

    if (!consent) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid consent value.",
        },
        { status: 400 }
      );
    }

    const submissionId = randomUUID();

    const page = clean(body.page, 500);
    const referrer = clean(body.referrer, 1000);

    const client = await getMongoClient();

    await client
      .db("futurex")
      .collection("consentEvents")
      .insertOne({
        submissionId,
        consent,
        page,
        referrer,
        submittedAt: new Date(),
      });

    const spreadsheetId =
      process.env.GOOGLE_SHEET_ID;

    if (spreadsheetId) {
      await appendToExcel(
        spreadsheetId,
        SHEET_NAME,
        {
          Date: submittedAt(),
          "Submission ID": submissionId,
          Platform: "Cookie Consent",
          "Register As": "Consent",
          Message: `Consent: ${consent} | Page: ${
            page || "-"
          } | Referrer: ${referrer || "-"}`,
          Consent: consent,
        }
      );
    }

    return NextResponse.json({
      success: true,
    });
  } catch (error) {
    console.error("Consent error:", error);

    return NextResponse.json(
      { success: false },
      { status: 500 }
    );
  }
}