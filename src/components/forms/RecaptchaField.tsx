"use client";

import ReCAPTCHA from "react-google-recaptcha";

export function RecaptchaField({
  onChange,
}: {
  onChange: (token: string | null) => void;
}) {
  const siteKey =
    process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;

  if (!siteKey) {
    return (
      <p className="text-sm text-red-700">
        reCAPTCHA configuration is missing.
      </p>
    );
  }

  return (
    <div className="overflow-x-auto">
      <ReCAPTCHA
        sitekey={siteKey}
        onChange={onChange}
        onExpired={() => onChange(null)}
        onErrored={() => onChange(null)}
      />
    </div>
  );
}