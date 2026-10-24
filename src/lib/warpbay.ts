
/**
 * Server-side WARPBAY registration sync.
 * Never import this file into a client component.
 */

import "server-only";

const BASE =
  "https://app-server-63238821306.asia-south1.run.app/api/v1";

const EVENT_ID = "6ac61df57138504798ef0ff5";

type Common = {
  submissionId: string;
  name: string;
  designation: string;
  company: string;
  email: string;
  phone: string;
  country: string;
  website: string;
};

export type VisitorPayload = Common & {
  city: string;
  profile: string;
  source: string;
  interest: string[];
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
};

function nonEmpty(value: string): string | undefined {
  return value.trim() || undefined;
}

function cityStateParts(
  value: string
): {
  city?: string;
  state?: string;
} {
  const parts = value
    .split(",")
    .map((part) => part.trim())
    .filter(Boolean);

  return {
    city: parts[0],
    state:
      parts.length > 1
        ? parts.slice(1).join(", ")
        : undefined,
  };
}

async function postRegistration(
  path: string,
  body: unknown
): Promise<string> {
  const apiKey = process.env.WARPBAY_API_KEY?.trim();

  if (!apiKey) {
    throw new Error(
      "WARPBAY_API_KEY is missing in server environment"
    );
  }

  const endpoint = new URL(`${BASE}/${path}`);

  // Confirm with WARPBAY that eventId belongs
  // in the query string.
  endpoint.searchParams.set("eventId", EVENT_ID);

  let response: Response;

  try {
    response = await fetch(endpoint.toString(), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        "x-api-key": apiKey,

        // Must be a plain origin URL.
        "Origin": "https://odishaminingexpo.com",
      },
      body: JSON.stringify(body),
      cache: "no-store",
      signal: AbortSignal.timeout(10000),
    });
  } catch (error) {
    console.error("WARPBAY network error:", {
      endpoint: endpoint.pathname,
      message:
        error instanceof Error
          ? error.message
          : "Unknown network error",
    });

    throw new Error(
      "WARPBAY request failed before receiving a response"
    );
  }

  // Read response body only once.
  const responseText = await response.text();

  if (!response.ok) {
    // Safe basic diagnostics.
    // Avoid logging entire response body: it could
    // contain personal information or secrets.
    console.error("WARPBAY request rejected:", {
      endpoint: endpoint.pathname,
      status: response.status,
      statusText: response.statusText,
      contentType:
        response.headers.get("content-type"),
      requestId:
        response.headers.get("x-request-id"),
    });

    // For debugging, enable this only temporarily
    // in a secure development environment:
    //
    // console.error(
    //   "WARPBAY error body:",
    //   responseText.slice(0, 1000)
    // );

    throw new Error(
      `WARPBAY HTTP ${response.status}`
    );
  }

  let json: unknown;

  try {
    json = JSON.parse(responseText);
  } catch {
    throw new Error(
      "WARPBAY returned an invalid JSON response"
    );
  }

  if (
    !json ||
    typeof json !== "object" ||
    !("userId" in json) ||
    typeof json.userId !== "string" ||
    !json.userId.trim()
  ) {
    throw new Error(
      "WARPBAY response missing userId"
    );
  }

  return json.userId;
}

export async function syncWarpbayVisitor(
  v: VisitorPayload
): Promise<string> {
  return postRegistration(
    "odisha-mining/registerAttendee",
    {
      data: {
        fullName: v.name,
        organization: v.company,
        jobTitle: v.designation,
        email: v.email,
        mobile: v.phone,
        country: v.country,
        city: v.city,
        label: "Visitor",
        companyWebsite: nonEmpty(v.website),
        howDidYouHearAboutUs: v.source,
        areasOfInterest: v.interest,
        uid: v.submissionId,
      },
    }
  );
}

export async function syncWarpbayExhibitor(
  v: ExhibitorPayload
): Promise<string> {
  const place = cityStateParts(v.cityState);

  return postRegistration(
    "event/addOdishaMiningExhibitorOrganizationForm",
    {
      companyName: v.company,
      contactPerson: v.name,
      designation: v.designation,
      email: v.email,
      mobile: v.phone,
      country: v.country,
      ...place,
      companyWebsite: nonEmpty(v.website),
      companyAddress: v.address,
      taxId: v.taxId,
      primaryCategory: v.category,
      productsSolutions: v.exhibitDetails,
      brandsProductNames: v.brands,
      standPreference: v.standSize,
      additionalParticipation:
        v.participationInterests,
      requirementsOrQuestions: v.message,

      // countryCode is optional: omitted.
    }
  );
}
