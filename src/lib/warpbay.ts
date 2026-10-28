/** WARPBAY integration. Server-only; never expose WARPBAY_API_KEY to browsers. */
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

// Keep these fields compatible with existing API routes. The simplified
// frontend may supply empty strings for fields no longer present on screen.
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

const safe = (value: unknown): string =>
  typeof value === "string" ? value.trim() : "";

function warnEmptyFields(kind: string, payload: Record<string, unknown>) {
  const names = Object.entries(payload)
    .filter(([, value]) => value == null ||
      (typeof value === "string" && !value.trim()) ||
      (Array.isArray(value) && value.length === 0))
    .map(([key]) => key);
  if (names.length) console.warn(`WARPBAY ${kind} empty field names:`, names);
}

function extractError(value: unknown): string {
  if (typeof value === "string") return value;
  if (Array.isArray(value)) return value.map(extractError).filter(Boolean).join("; ");
  if (value && typeof value === "object") {
    const obj = value as Record<string, unknown>;
    return [obj.message, obj.error, obj.reason, obj.details]
      .map(extractError).filter(Boolean).join("; ");
  }
  return "";
}

async function postRegistration(path: string, data: unknown): Promise<WarpbayResult> {
  const key = process.env.WARPBAY_API_KEY?.trim();
  if (!key) throw new Error("WARPBAY_API_KEY is missing");

  // Vendor previously stated that eventId is assigned server-side.
  const endpoint = new URL(`${BASE}/${path}`);
  let response: Response;
  try {
    response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "x-api-key": key,
        Origin: ORIGIN,
      },
      body: JSON.stringify(data),
      cache: "no-store",
      signal: AbortSignal.timeout(10000),
    });
  } catch (error) {
    console.error("WARPBAY network failure:", {
      path,
      reason: error instanceof Error ? error.name : "unknown",
    });
    // An ambiguous network failure may occur AFTER WARPBAY created a record.
    // Never retry the POST automatically.
    throw new Error("WARPBAY request outcome unknown");
  }

  const raw = await response.text();
  let parsed: unknown;
  try { parsed = JSON.parse(raw); } catch { parsed = raw.slice(0, 300); }
  const detail = extractError(parsed);
  const normalized = detail.toLowerCase();

  if (/user\s+is\s+organizer|organizer\s+role/.test(normalized)) {
    console.info("WARPBAY role conflict:", { path, status: response.status });
    return { status: "role_conflict" };
  }
  if (/already\s+(?:been\s+)?registered|already\s+exists/.test(normalized)) {
    console.info("WARPBAY already registered:", { path, status: response.status });
    return { status: "already_registered" };
  }

  if (!response.ok) {
    console.error("WARPBAY API FAILED:", {
      path, status: response.status,
      error: detail.slice(0, 160) || "No error detail",
    });
    throw new Error(`WARPBAY HTTP ${response.status}`);
  }

  // Only a confirmed userId counts as synchronized. Other 2xx responses
  // need provider reconciliation and must never trigger automatic retries.
  if (parsed && typeof parsed === "object" && !Array.isArray(parsed)) {
    const obj = parsed as Record<string, unknown>;
    if (typeof obj.userId === "string" && obj.userId.trim()) {
      return { status: "synced", userId: obj.userId.trim() };
    }
  }

  console.warn("WARPBAY 2xx without userId; manual reconciliation required:", {
    path, status: response.status,
  });
  return { status: "accepted_unconfirmed" };
}

export async function syncWarpbayVisitor(v: VisitorPayload): Promise<WarpbayResult> {
  // Request shape supplied by WARPBAY: { data: { fullName, ... } }.
  // Do not add undocumented firstName/lastName fields.
  const data = {
    fullName: safe(v.name),
    organization: safe(v.company),
    jobTitle: safe(v.designation),
    email: safe(v.email),
    mobile: safe(v.phone),
    countryCode: safe(v.countryCode),
    country: safe(v.country),
    state: safe(v.state),
    city: safe(v.city),
    label: "Visitor",
    companyWebsite: safe(v.website),
    primaryCategory: safe(v.primaryCategory),
    productsSolutions: safe(v.productsSolutions),
    howDidYouHearAboutUs: safe(v.source),
    areasOfInterest: Array.isArray(v.interest) ? v.interest : [],
    uid: safe(v.submissionId),
    title: safe(v.title),
  };
  warnEmptyFields("Visitor", data);
  return postRegistration("odisha-mining/registerAttendee", { data });
}

export async function syncWarpbayExhibitor(v: ExhibitorPayload): Promise<WarpbayResult> {
  // WARPBAY exhibitor payload is flat, unlike Visitor.
  const locationParts = safe(v.cityState).split(",").map(x => x.trim()).filter(Boolean);
  const data = {
    companyName: safe(v.company),
    contactPerson: safe(v.name),
    designation: safe(v.designation),
    email: safe(v.email),
    mobile: safe(v.phone),
    countryCode: safe(v.countryCode),
    country: safe(v.country),
    city: safe(v.city) || locationParts[0] || "",
    state: safe(v.state) || locationParts.slice(1).join(", "),
    companyWebsite: safe(v.website),
    companyAddress: safe(v.address),
    taxId: safe(v.taxId),
    primaryCategory: safe(v.category),
    productsSolutions: safe(v.exhibitDetails),
    brandsProductNames: safe(v.brands),
    standPreference: safe(v.standSize),
    additionalParticipation: Array.isArray(v.participationInterests)
      ? v.participationInterests : [],
    requirementsOrQuestions: safe(v.message),
  };
  warnEmptyFields("Exhibitor", data);
  return postRegistration("event/addOdishaMiningExhibitorOrganizationForm", data);
}
