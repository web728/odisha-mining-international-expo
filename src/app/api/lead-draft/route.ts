import { NextResponse } from "next/server";
import getMongoClient from "@/lib/mongodb";
import { validateCallerId } from "@/lib/callerAttribution";
import { upsertDraftSheet } from "@/lib/draftSheet";

const UUID =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const str = (v: unknown, max: number) =>
  typeof v === "string" ? v.trim().slice(0, max) : "";
export async function POST(req: Request) {
  try {
    // Reject cross-origin browser requests. This is not a replacement for rate limiting.
    const origin = req.headers.get("origin");
    const expected = new URL(req.url).origin;
    if (
      origin &&
      origin !== expected &&
      origin !== "https://odishaminingexpo.com"
    ) {
      return NextResponse.json(
        { error: "Origin not allowed" },
        { status: 403 },
      );
    }
    if (Number(req.headers.get("content-length") ?? 0) > 4096) {
      return NextResponse.json({ error: "Payload too large" }, { status: 413 });
    }
    const body: unknown = await req.json();
    if (!body || typeof body !== "object" || Array.isArray(body)) {
      return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
    }
    const input = body as Record<string, unknown>;
    if (input.draftConsent !== true) {
      return NextResponse.json(
        { error: "Draft consent required" },
        { status: 403 },
      );
    }
    const draftId = str(input.draftId, 60);
    const formType = input.formType;
    if (
      !UUID.test(draftId) ||
      (formType !== "visitor" &&
        formType !== "exhibitor" &&
        formType !== "contact")
    ) {
      return NextResponse.json(
        { error: "Invalid draft ID or form type" },
        { status: 400 },
      );
    }
    const name = str(input.name, 120);
    const email = str(input.email, 200).toLowerCase();
    const phone = str(input.phone, 50).replace(/[^+\d]/g, "");
    if (!name || (!EMAIL.test(email) && !/^\+?\d{5,15}$/.test(phone))) {
      return NextResponse.json({
        saved: false,
        reason: "not_enough_contact_information",
      });
    }
    const callerId = validateCallerId(input.caller_id);
    const client = await getMongoClient();
    const collection = client.db("futurex").collection("incomplete_leads");
    const now = new Date();
    // The browser sends one fixed draftId per form session; the upsert updates one Mongo document.
    // Requires unique index on draftId (README).
    const existing = await collection.findOne(
      { draftId },
      { projection: { status: 1, formType: 1, updatedAt: 1 } },
    );
    if (
      existing &&
      (existing.status !== "draft" || existing.formType !== formType)
    ) {
      return NextResponse.json(
        { saved: false, reason: "draft_closed" },
        { status: 409 },
      );
    }
    // Coarse server-side write throttle. Client also debounces changes.
    if (
      existing?.updatedAt instanceof Date &&
      now.getTime() - existing.updatedAt.getTime() < 15000
    ) {
      return NextResponse.json({ saved: true, throttled: true });
    }
    await collection.updateOne(
      { draftId, status: "draft" },
      {
        $set: {
          formType,
          name,
          email: EMAIL.test(email) ? email : "",
          phone: /^\+?\d{5,15}$/.test(phone) ? phone : "",
          caller_id: callerId,
          updatedAt: now,
          consentAt: now,
        },
        $setOnInsert: { createdAt: now, status: "draft" },
      },
      { upsert: true },
    );
    // Isolated failure: data is still safe in MongoDB. Do not retry an ambiguous Sheet append automatically.
    let sheetSynced = false;
    try {
      await upsertDraftSheet({
        draftId,
        updatedAt: now.toISOString(),
        formType,
        name,
        email: EMAIL.test(email) ? email : "",
        phone: /^\+?\d{5,15}$/.test(phone) ? phone : "",
        callerId: callerId ?? "Unassigned",
        status: "draft",
      });
      sheetSynced = true;
    } catch (err) {
      console.error(
        "Draft Sheet sync issue:",
        err instanceof Error ? err.message : "unknown",
      );
    }
    return NextResponse.json({ saved: true, sheetSynced });
  } catch (err) {
    console.error(
      "Draft save failed:",
      err instanceof Error ? err.message : "unknown",
    );
    return NextResponse.json(
      { saved: false, message: "Draft could not be saved" },
      { status: 500 },
    );
  }
}
