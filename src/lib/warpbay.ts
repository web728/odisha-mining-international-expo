
/**
 * WARPBAY API Integration
 * Odisha Mining Expo 2027
 *
 * Server-side only.
 * Never import this file in a client component.
 */

import "server-only";

const BASE_URL =
  "https://app-server-63238821306.asia-south1.run.app/api/v1";

const WEBSITE_ORIGIN =
  "https://odishaminingexpo.com";

// eventId is hardcoded on the WARPBAY backend.
// We do not send eventId in query, headers, or body.

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

// Return undefined for optional empty values.
function nonEmpty(
  value: string | null | undefined
): string | undefined {
  return value?.trim() || undefined;
}

// Split "Bhubaneswar, Odisha" into city and state.
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

type WarpbaySuccessResponse = {
  message?: string;
  userId?: string;
};

// Common function for both API endpoints.
async function postRegistration(
  path: string,
  body: unknown
): Promise<string> {
  const apiKey =
    process.env.WARPBAY_API_KEY?.trim();

  if (!apiKey) {
    throw new Error(
      "WARPBAY_API_KEY is missing in server environment"
    );
  }

  // No eventId query parameter.
  const endpoint = new URL(
    `${BASE_URL}/${path}`
  );

  let response: Response;

  try {
    response = await fetch(
      endpoint.toString(),
      {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",

          "x-api-key": apiKey,

          Origin: WEBSITE_ORIGIN,
        },

        body: JSON.stringify(body),

        cache: "no-store",

        signal: AbortSignal.timeout(10000),
      }
    );
  } catch (error) {
    console.error(
      "WARPBAY network request failed:",
      {
        endpoint: endpoint.pathname,
        message:
          error instanceof Error
            ? error.message
            : "Unknown network error",
      }
    );

    throw new Error(
      "WARPBAY API network request failed"
    );
  }

  // Read the body once for success/error handling.
  const responseText = await response.text();

  if (!response.ok) {
    let errorMessage = "Request rejected";

    try {
      const parsed: unknown =
        JSON.parse(responseText);

      if (
        parsed &&
        typeof parsed === "object"
      ) {
        const errorObject = parsed as {
          message?: unknown;
          error?: unknown;
          reason?: unknown;
        };

        const detail =
          errorObject.message ??
          errorObject.error ??
          errorObject.reason;

        if (typeof detail === "string") {
          errorMessage = detail;
        }
      }
    } catch {
      errorMessage =
        "Non-JSON error response";
    }

    console.error("WARPBAY API FAILED:", {
      endpoint: endpoint.pathname,
      status: response.status,
      error: errorMessage.slice(0, 300),
    });

    throw new Error(
      `WARPBAY HTTP ${response.status}`
    );
  }

  let result: WarpbaySuccessResponse;

  try {
    result = JSON.parse(
      responseText
    ) as WarpbaySuccessResponse;
  } catch {
    throw new Error(
      "WARPBAY returned invalid JSON"
    );
  }

  if (
    !result ||
    typeof result.userId !== "string" ||
    !result.userId.trim()
  ) {
    throw new Error(
      "WARPBAY response missing userId"
    );
  }

  return result.userId;
}

/**
 * VISITOR REGISTRATION
 */
export async function syncWarpbayVisitor(
  visitor: VisitorPayload
): Promise<string> {
  return postRegistration(
    "odisha-mining/registerAttendee",
    {
      data: {
        fullName: visitor.name,

        organization: visitor.company,

        jobTitle: visitor.designation,

        email: visitor.email,

        mobile: visitor.phone,

        country: visitor.country,

        city: visitor.city,

        label: "Visitor",

        companyWebsite: nonEmpty(
          visitor.website
        ),

        howDidYouHearAboutUs:
          visitor.source,

        areasOfInterest:
          visitor.interest,

        // Use existing unique submission ID.
        uid: visitor.submissionId,
      },
    }
  );
}

/**
 * EXHIBITOR REGISTRATION
 */
export async function syncWarpbayExhibitor(
  exhibitor: ExhibitorPayload
): Promise<string> {
  const place = cityStateParts(
    exhibitor.cityState
  );

  return postRegistration(
    "event/addOdishaMiningExhibitorOrganizationForm",
    {
      companyName: exhibitor.company,

      contactPerson: exhibitor.name,

      designation: exhibitor.designation,

      email: exhibitor.email,

      mobile: exhibitor.phone,

      country: exhibitor.country,

      ...place,

      companyWebsite: nonEmpty(
        exhibitor.website
      ),

      companyAddress:
        exhibitor.address,

      taxId: exhibitor.taxId,

      primaryCategory:
        exhibitor.category,

      productsSolutions:
        exhibitor.exhibitDetails,

      brandsProductNames:
        exhibitor.brands,

      standPreference:
        exhibitor.standSize,

      additionalParticipation:
        exhibitor.participationInterests,

      requirementsOrQuestions:
        exhibitor.message,

      // countryCode optional: not sent.
    }
  );
}
