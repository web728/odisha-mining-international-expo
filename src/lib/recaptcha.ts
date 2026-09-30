type RecaptchaResponse = {
  success: boolean;
  challenge_ts?: string;
  hostname?: string;
  "error-codes"?: string[];
};

export async function verifyRecaptcha(
  token: unknown
) {
  if (
    typeof token !== "string" ||
    !token.trim()
  ) {
    return false;
  }

  const secret =
    process.env
      .RECAPTCHA_SECRET_KEY;

  if (!secret) {
    console.error(
      "RECAPTCHA_SECRET_KEY is missing"
    );

    return false;
  }

  try {
    const body =
      new URLSearchParams({
        secret,
        response: token,
      });

    const response =
      await fetch(
        "https://www.google.com/recaptcha/api/siteverify",
        {
          method: "POST",

          headers: {
            "Content-Type":
              "application/x-www-form-urlencoded",
          },

          body,

          cache: "no-store",
        }
      );

    if (!response.ok) {
      return false;
    }

    const result =
      (await response.json()) as RecaptchaResponse;

    return (
      result.success === true
    );
  } catch (error) {
    console.error(
      "reCAPTCHA verification error:",
      error
    );

    return false;
  }
}