import { randomUUID } from "crypto";
import { NextResponse } from "next/server";

import getMongoClient from "@/lib/mongodb";
import { clean } from "@/lib/forms";

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
        {
          status: 400,
        },
      );
    }

    const submissionId = randomUUID();

    const page = clean(body.page, 500);
    const referrer = clean(
      body.referrer,
      1000,
    );

    const client =
      await getMongoClient();

    await client
      .db("futurex")
      .collection("consentEvents")
      .insertOne({
        submissionId,

        consent,

        page:
          page || null,

        referrer:
          referrer || null,

        submittedAt:
          new Date(),
      });

    return NextResponse.json({
      success: true,
    });
  } catch (error) {
    console.error(
      "Consent error:",
      error,
    );

    return NextResponse.json(
      {
        success: false,
        message:
          "Unable to save consent.",
      },
      {
        status: 500,
      },
    );
  }
}