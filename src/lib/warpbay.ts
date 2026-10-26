/** WARPBAY registration sync; server-side only. */
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

export type WarpbayResult =
  | { status: "synced"; userId: string }
  | { status: "already_registered" }
  | { status: "role_conflict" }
  | { status: "accepted_unconfirmed" };

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

function warnEmptyFields(kind: string, payload: Record<string, unknown>) {
  const empty = Object.entries(payload)
    .filter(([, value]) => value === undefined || value === null ||
      (typeof value === "string" && !value.trim()) ||
      (Array.isArray(value) && !value.length))
    .map(([key]) => key);
  if (empty.length) console.warn(`WARPBAY ${kind} empty field names:`, empty);
}

async function postRegistration(path: string, body: unknown): Promise<WarpbayResult> {
  const apiKey = process.env.WARPBAY_API_KEY?.trim();
  if (!apiKey) throw new Error("WARPBAY_API_KEY is missing");

  // Vendor says eventId is hardcoded on their backend.
  const endpoint = new URL(`${BASE}/${path}`);
  let response: Response;
  try {
    response = await fetch(endpoint.toString(), {
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

  const raw = await response.text();
  let parsed: unknown;
  try { parsed = JSON.parse(raw); } catch { parsed = null; }
  const obj: Record<string, unknown> =
    parsed && typeof parsed === "object" ? parsed as Record<string, unknown> : {};
  const detail = [obj.message, obj.error, obj.reason]
    .find((value) => typeof value === "string");
  const message = typeof detail === "string" ? detail : "";
  const normalized = message.toLowerCase();

  // Business-level errors can be returned as HTTP 409 or 500.
  // Keep role conflict separate from duplicate registration.
  if (normalized.includes("user is organizer")) {
    return { status: "role_conflict" };
  }
  if (/already\s+registered|already\s+exists|already\s+been\s+registered/i.test(message)) {
    return { status: "already_registered" };
  }

  if (!response.ok) {
    // Only log bounded provider message. Avoid dumping request bodies or secrets.
    console.error("WARPBAY API FAILED:", {
      path, status: response.status,
      error: message.slice(0, 160) || "No error detail",
    });
    throw new Error(`WARPBAY HTTP ${response.status}`);
  }

  if (typeof obj.userId === "string" && obj.userId.trim()) {
    return { status: "synced", userId: obj.userId.trim() };
  }

  console.warn("WARPBAY 2xx without userId; manual reconciliation required:", { path });
  return { status: "accepted_unconfirmed" };
}

export async function syncWarpbayVisitor(v: VisitorPayload): Promise<WarpbayResult> {
  // Provider's actual req.body.data destructuring does NOT list lastName.
  // Send exact documented fields; the provider must repair an internal
  // lastName validation requirement if multi-word fullName still fails.
  const data = {
    fullName: v.name.trim(),
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
  const data = {
    companyName: v.company,
    contactPerson: v.name,
    designation: v.designation,
    email: v.email,
    mobile: v.phone,
    countryCode: v.countryCode,
    country: v.country,
    city: optionalString(v.city) ?? location.city ?? "",
    state: optionalString(v.state) ?? location.state ?? "",
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
  warnEmptyFields("Exhibitor", data);
  return postRegistration("event/addOdishaMiningExhibitorOrganizationForm", data);
}
