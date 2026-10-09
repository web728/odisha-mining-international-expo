"use client";

import { FormEvent, useRef, useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import { Download, Loader2 } from "lucide-react";

import { FormStatus } from "@/components/forms/FormStatus";
import { TextField } from "@/components/forms/fields";

type Status = {
  type: "idle" | "loading" | "success" | "error";
  message?: string;
};

export function BrochureForm() {
  const [status, setStatus] = useState<Status>({
    type: "idle",
  });

  const [captchaToken, setCaptchaToken] = useState<string | null>(null);

  const captchaRef = useRef<ReCAPTCHA>(null);

  const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!siteKey) {
      setStatus({
        type: "error",
        message: "reCAPTCHA configuration is missing.",
      });

      return;
    }

    if (!captchaToken) {
      setStatus({
        type: "error",
        message: "Please complete the reCAPTCHA verification.",
      });

      return;
    }

    const form = e.currentTarget;
    const formData = new FormData(form);

    const payload = {
      name: formData.get("name"),
      email: formData.get("email"),
      company: formData.get("company"),
      phone: formData.get("phone"),

      captchaToken,

      company_website: formData.get("company_website"),
    };

    setStatus({
      type: "loading",
    });

    try {
      const response = await fetch("/api/brochure", {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Submission failed.");
      }

      setStatus({
        type: "success",

        message: result.message || "Your brochure is ready.",
      });

      form.reset();

      setCaptchaToken(null);
      captchaRef.current?.reset();

      if (
        typeof result.downloadUrl === "string" &&
        result.downloadUrl.length > 0
      ) {
        window.location.assign(result.downloadUrl);
      }
    } catch (error) {
      setStatus({
        type: "error",

        message: error instanceof Error ? error.message : "Submission failed.",
      });

      setCaptchaToken(null);
      captchaRef.current?.reset();
    }
  }

  return (
    <form
      onSubmit={onSubmit}
      aria-labelledby="brochure-download-form-heading"
      aria-describedby="brochure-form-status brochure-form-consent"
      className="grid gap-5"
    >
      <h3 id="brochure-download-form-heading" className="sr-only">
        Download the Odisha Mining & Infrastructure International Expo 2027
        brochure
      </h3>

      <div className="grid gap-5 sm:grid-cols-2">
        <TextField label="Name" name="name" required autoComplete="name" />

        <TextField
          label="Email"
          name="email"
          type="email"
          required
          autoComplete="email"
        />

        <TextField label="Company" name="company" autoComplete="organization" />

        <TextField
          label="Phone"
          name="phone"
          type="tel"
          required
          autoComplete="tel"
        />
      </div>

      {/* Honeypot */}
      <div className="absolute -left-[9999px]" aria-hidden="true">
        <TextField
          label="Website"
          name="company_website"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      <p
        id="brochure-form-consent"
        className="text-[11px] leading-5 text-zinc-500"
      >
        By submitting, you agree to be contacted by Futurex Trade Fair & Events
        Pvt. Ltd. regarding the Odisha Mining & Infrastructure International
        Expo.
      </p>

      {/* reCAPTCHA */}
      <div className="overflow-x-auto">
        {siteKey ? (
          <ReCAPTCHA
            ref={captchaRef}
            sitekey={siteKey}
            onChange={setCaptchaToken}
            onExpired={() => setCaptchaToken(null)}
            onErrored={() => setCaptchaToken(null)}
          />
        ) : (
          <div
            role="alert"
            className="border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
          >
            reCAPTCHA configuration is missing.
          </div>
        )}
      </div>

      <div id="brochure-form-status" aria-live="polite" aria-atomic="true">
        <FormStatus status={status} />
      </div>

      <button
        type="submit"
        disabled={status.type === "loading"}
        aria-busy={status.type === "loading"}
        className="group inline-flex min-h-12 w-full items-center justify-center gap-3 border border-brand-black bg-brand-black px-6 text-[11px] font-extrabold uppercase tracking-[.09em] text-white transition duration-300 hover:border-brand hover:bg-brand hover:text-brand-black disabled:cursor-not-allowed disabled:opacity-50 sm:w-fit"
      >
        {status.type === "loading" ? (
          <>
            <Loader2 aria-hidden="true" className="size-4 animate-spin" />
            Preparing Brochure...
          </>
        ) : (
          <>
            <Download aria-hidden="true" className="size-4" />
            Download Brochure
          </>
        )}
      </button>
    </form>
  );
}
