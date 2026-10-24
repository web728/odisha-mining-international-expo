/** Server-side WARPBAY registration sync. Never import into a client component. */
const BASE = "https://app-server-63238821306.asia-south1.run.app/api/v1";
const EVENT_ID = "6ac61df57138504798ef0ff5";

type Common = { submissionId: string; name: string; designation: string; company: string;
  email: string; phone: string; country: string; website: string; };
export type VisitorPayload = Common & { city: string; profile: string;
  source: string; interest: string[]; };
export type ExhibitorPayload = Common & { cityState: string; address: string;
  taxId: string; category: string; exhibitDetails: string; brands: string;
  standSize: string; participationInterests: string[]; message: string; };

function nonEmpty(s: string) { return s.trim() || undefined; }
function cityStateParts(s: string): { city?: string; state?: string } {
  const parts = s.split(",").map(x => x.trim()).filter(Boolean);
  return { city: parts[0], state: parts.length > 1 ? parts.slice(1).join(", ") : undefined };
}
async function postRegistration(path: string, body: unknown): Promise<string> {
  const apiKey = process.env.WARPBAY_API_KEY;
  if (!apiKey) throw new Error("WARPBAY_API_KEY is missing");
  // Documentation lists eventId as a parameter without specifying its location.
  // Confirm query-string placement with WARPBAY before enabling this integration.
  const endpoint = new URL(`${BASE}/${path}`);
  endpoint.searchParams.set("eventId", EVENT_ID);
  const response = await fetch(endpoint.toString(), {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": apiKey,
      "Origin": "https://odishaminingexpo.com/",
    },
    body: JSON.stringify(body),
    cache: "no-store",
    signal: AbortSignal.timeout(10000),
  });
  if (!response.ok) throw new Error(`WARPBAY HTTP ${response.status}`);
  const json: unknown = await response.json();
  if (!json || typeof json !== "object" || !("userId" in json) ||
      typeof json.userId !== "string" || !json.userId.trim()) {
    throw new Error("WARPBAY response missing userId");
  }
  return json.userId;
}
export async function syncWarpbayVisitor(v: VisitorPayload): Promise<string> {
  // The current VisitorForm does not collect title/state/primaryCategory/productsSolutions.
  // Do not fabricate these fields; confirm whether WARPBAY requires them.
  return postRegistration("odisha-mining/registerAttendee", {
    data: {
      fullName: v.name, organization: v.company, jobTitle: v.designation,
      email: v.email, mobile: v.phone, country: v.country, city: v.city,
      label: "Visitor", companyWebsite: nonEmpty(v.website),
      howDidYouHearAboutUs: v.source, areasOfInterest: v.interest,
      uid: v.submissionId,
    },
  });
}
export async function syncWarpbayExhibitor(v: ExhibitorPayload): Promise<string> {
  const place = cityStateParts(v.cityState);
  return postRegistration("event/addOdishaMiningExhibitorOrganizationForm", {
    companyName: v.company, contactPerson: v.name, designation: v.designation,
    email: v.email, mobile: v.phone, country: v.country,
    ...place, companyWebsite: nonEmpty(v.website), companyAddress: v.address,
    taxId: v.taxId, primaryCategory: v.category, productsSolutions: v.exhibitDetails,
    brandsProductNames: v.brands, standPreference: v.standSize,
    additionalParticipation: v.participationInterests,
    requirementsOrQuestions: v.message,
    // countryCode is optional per latest confirmation; omit it entirely.
  });
}
