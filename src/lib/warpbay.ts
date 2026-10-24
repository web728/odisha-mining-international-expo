/** WARPBAY registration sync. Server-only; never expose API key to browsers. */
import "server-only";

const BASE = "https://app-server-63238821306.asia-south1.run.app/api/v1";
const ORIGIN = "https://odishaminingexpo.com";

type Common = {
  submissionId: string;
  name: string;
  designation: string;
  company: string;
  email: string;
  phone: string;
  countryCode: string;
  country: string;
  website: string;
};

export type VisitorPayload = Common & {
  city: string;
  profile: string;
  source: string;
  interest: string[];
  state?: string;
  title?: string;
  primaryCategory?: string;
  productsSolutions?: string;
};

export type ExhibitorPayload = Common & {
  cityState: string;
  address: string;
  taxId: string;
  category: string;
  exhibitDetails: string;
  brands: string;
  standSize: string;
  participationInterests: string[];
  message: string;
  city?: string;
  state?: string;
};

function optionalString(value: unknown): string | undefined {
  return typeof value === "string" && value.trim() ? value.trim() : undefined;
}

function cityStateParts(value: string) {
  const parts = value.split(",").map((part) => part.trim()).filter(Boolean);
  return {
    city: parts[0] || undefined,
    state: parts.length > 1 ? parts.slice(1).join(", ") : undefined,
  };
}

/** Log field *names* only; never email, phone, API key, or submitted PII. */
function warnEmptyFields(kind: string, payload: Record<string, unknown>) {
  const empty = Object.entries(payload)
    .filter(([, val]) => val === undefined || val === null ||
      (typeof val === "string" && !val.trim()) ||
      (Array.isArray(val) && !val.length))
    .map(([key]) => key);
  if (empty.length) console.warn(`WARPBAY ${kind} empty field names:`, empty);
}

export type WarpbayResult =
  | { status: "synced"; userId: string }
  | { status: "already_registered" }
  | { status: "accepted_unconfirmed" };

async function postRegistration(path: string, body: unknown): Promise<WarpbayResult> {
  const apiKey = process.env.WARPBAY_API_KEY?.trim();
  if (!apiKey) throw new Error("WARPBAY_API_KEY is missing");

  // Provider reported eventId is configured on their backend.
  // Do not append eventId to the URL unless they specifically instruct it.
  const url = `${BASE}/${path}`;
  let response: Response;
  try {
    response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "x-api-key": apiKey,
        Origin: ORIGIN,
      },
      body: JSON.stringify(body),
      cache: "no-store",
      signal: AbortSignal.timeout(10000),
    });
  } catch (error) {
    console.error("WARPBAY network failure:", {
      path,
      error: error instanceof Error ? error.name : "unknown",
    });
    throw new Error("WARPBAY request failed before response");
  }

  const responseText = await response.text();
  let parsed: unknown;
  try { parsed = JSON.parse(responseText); } catch { parsed = null; }

  const object = parsed && typeof parsed === "object"
    ? parsed as Record<string, unknown> : {};
  const detail = [object.message, object.error, object.reason]
    .find((value) => typeof value === "string");
  const message = typeof detail === "string" ? detail : "";

  // Provider sometimes returns HTTP 500 for a business-level duplicate.
  // Never count this as a new successful WARPBAY registration.
  if (/already\s+registered\s+for\s+this\s+event/i.test(message)) {
    console.info("WARPBAY existing registration detected:", { path, status: response.status });
    return { status: "already_registered" };
  }

  if (!response.ok) {
    console.error("WARPBAY API FAILED:", {
      path, status: response.status,
      error: message.slice(0, 160) || "No error detail",
    });
    throw new Error(`WARPBAY HTTP ${response.status}`);
  }

  if (typeof object.userId === "string" && object.userId.trim()) {
    return { status: "synced", userId: object.userId.trim() };
  }

  // A 2xx response without userId may indicate acceptance, but not confirmed sync.
  // Do not submit again automatically; let staff reconcile with WARPBAY.
  console.warn("WARPBAY 2xx without userId; manual reconciliation required:", { path });
  return { status: "accepted_unconfirmed" };
}

export async function syncWarpbayVisitor(v: VisitorPayload): Promise<WarpbayResult> {
  const data = {
    fullName: v.name,
    organization: v.company,
    jobTitle: v.designation,
    email: v.email,
    mobile: v.phone,
    countryCode: v.countryCode,
    country: v.country,
    state: optionalString(v.state) ?? "",
    city: v.city,
    label: "Visitor",
    companyWebsite: optionalString(v.website) ?? "",
    primaryCategory: optionalString(v.primaryCategory) ?? "",
    productsSolutions: optionalString(v.productsSolutions) ?? "",
    howDidYouHearAboutUs: v.source,
    areasOfInterest: v.interest,
    uid: v.submissionId,
    title: optionalString(v.title) ?? "",
  };
  warnEmptyFields("Visitor", data);
  return postRegistration("odisha-mining/registerAttendee", { data });
}

export async function syncWarpbayExhibitor(v: ExhibitorPayload): Promise<WarpbayResult> {
  const location = cityStateParts(v.cityState);
  const city = optionalString(v.city) ?? location.city;
  const state = optionalString(v.state) ?? location.state;
  const data = {
    companyName: v.company,
    contactPerson: v.name,
    designation: v.designation,
    email: v.email,
    mobile: v.phone,
    countryCode: v.countryCode,
    country: v.country,
    city: city ?? "",
    state: state ?? "",
    companyWebsite: optionalString(v.website) ?? "",
    companyAddress: optionalString(v.address) ?? "",
    taxId: optionalString(v.taxId) ?? "",
    primaryCategory: v.category,
    productsSolutions: v.exhibitDetails,
    brandsProductNames: optionalString(v.brands) ?? "",
    standPreference: v.standSize,
    additionalParticipation: v.participationInterests,
    requirementsOrQuestions: optionalString(v.message) ?? "",
  };
  // These fields are present in the sample request; provider must confirm
  // which are truly mandatory for real submissions.
  const absentInSampleShape = [
    "city", "state", "companyWebsite", "companyAddress", "taxId",
    "brandsProductNames", "additionalParticipation", "requirementsOrQuestions",
  ].filter((key) => !(key in data));
  if (absentInSampleShape.length) {
    console.warn("WARPBAY Exhibitor absent optional/undocumented field names:", absentInSampleShape);
  }
  warnEmptyFields("Exhibitor", data);
  return postRegistration("event/addOdishaMiningExhibitorOrganizationForm", data);
}
