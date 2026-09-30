"use client";

import {
  FormEvent,
  useRef,
  useState,
} from "react";
import ReCAPTCHA from "react-google-recaptcha";
import { Loader2, Send } from "lucide-react";

import {
  SelectField,
  TextAreaField,
  TextField,
} from "@/components/forms/fields";
import { FormStatus } from "@/components/forms/FormStatus";

type Status = {
  type: "idle" | "loading" | "success" | "error";
  message?: string;
};

const interests = [
  "Exhibitor / Stand Booking",
  "Visitor Registration",
  "Sponsorship / Partnership",
  "Media / Press",
  "General Enquiry",
];

export function ContactForm() {
  const [status, setStatus] = useState<Status>({
    type: "idle",
  });

  const [captchaToken, setCaptchaToken] =
    useState<string | null>(null);

  const captchaRef = useRef<ReCAPTCHA>(null);

  const siteKey =
    process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;

  async function submit(
    e: FormEvent<HTMLFormElement>
  ) {
    e.preventDefault();

    if (!siteKey) {
      setStatus({
        type: "error",
        message:
          "reCAPTCHA configuration is missing.",
      });

      return;
    }

    if (!captchaToken) {
      setStatus({
        type: "error",
        message:
          "Please complete the reCAPTCHA verification.",
      });

      return;
    }

    const form = e.currentTarget;
    const formData = new FormData(form);

    const payload = {
      fullName: formData.get("fullName"),
      company: formData.get("company"),
      designation: formData.get("designation"),
      email: formData.get("email"),
      phone: formData.get("phone"),
      country: formData.get("country"),
      interestType: formData.get("interestType"),
      message: formData.get("message"),

      captchaToken,

      company_website:
        formData.get("company_website"),
    };

    setStatus({
      type: "loading",
    });

    try {
      const response = await fetch(
        "/api/contact",
        {
          method: "POST",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      const result =
        await response.json();

      if (!response.ok) {
        throw new Error(
          result.message ||
            "Submission failed."
        );
      }

      setStatus({
        type: "success",
        message:
          result.message ||
          "Your enquiry has been submitted.",
      });

      form.reset();

      setCaptchaToken(null);

      captchaRef.current?.reset();
    } catch (error) {
      setStatus({
        type: "error",
        message:
          error instanceof Error
            ? error.message
            : "Submission failed.",
      });

      setCaptchaToken(null);

      captchaRef.current?.reset();
    }
  }

  return (
    <form
      onSubmit={submit}
      className="grid gap-6"
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <TextField
          label="Name"
          name="fullName"
          required
          autoComplete="name"
        />

        <TextField
          label="Company"
          name="company"
          autoComplete="organization"
        />

        <TextField
          label="Designation"
          name="designation"
        />

        <TextField
          label="Email"
          name="email"
          type="email"
          required
          autoComplete="email"
        />

        <TextField
          label="Phone"
          name="phone"
          type="tel"
          required
          autoComplete="tel"
        />

        <TextField
          label="Country"
          name="country"
          autoComplete="country-name"
        />

        <div className="sm:col-span-2">
          <SelectField
            label="I'm enquiring about"
            name="interestType"
            required
            defaultValue=""
          >
            <option
              value=""
              disabled
            >
              Select one…
            </option>

            {interests.map((item) => (
              <option
                key={item}
                value={item}
              >
                {item}
              </option>
            ))}
          </SelectField>
        </div>
      </div>

      <TextAreaField
        label="Message"
        name="message"
        required
        placeholder="Tell us how we can help..."
      />

      {/* Honeypot */}
      <div
        className="absolute -left-[9999px]"
        aria-hidden="true"
      >
        <TextField
          label="Website"
          name="company_website"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      <p className="max-w-2xl text-[11px] leading-5 text-zinc-500">
        By submitting, you agree to be contacted by
        Futurex Trade Fair & Events Pvt. Ltd. about
        the 5th Odisha Mining & Infrastructure
        International Expo. We don&apos;t share your
        details with third parties.
      </p>

      <div className="overflow-x-auto">
        {siteKey ? (
          <ReCAPTCHA
            ref={captchaRef}
            sitekey={siteKey}
            onChange={
              setCaptchaToken
            }
            onExpired={() =>
              setCaptchaToken(
                null
              )
            }
            onErrored={() =>
              setCaptchaToken(
                null
              )
            }
          />
        ) : (
          <div className="border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            reCAPTCHA configuration is missing.
          </div>
        )}
      </div>

      <FormStatus
        status={status}
      />

      <button
        type="submit"
        disabled={
          status.type ===
          "loading"
        }
        className="group inline-flex min-h-12 w-full items-center justify-center gap-3 border border-brand-black bg-brand-black px-6 text-[11px] font-extrabold uppercase tracking-[.09em] text-white transition duration-300 hover:border-brand hover:bg-brand hover:text-brand-black disabled:cursor-not-allowed disabled:opacity-60 sm:w-fit"
      >
        {status.type ===
        "loading" ? (
          <>
            <Loader2 className="size-4 animate-spin" />
            Sending...
          </>
        ) : (
          <>
            Send Message

            <Send className="size-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </>
        )}
      </button>
    </form>
  );
}