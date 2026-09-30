"use client";

import {
  FormEvent,
  useRef,
  useState,
} from "react";
import ReCAPTCHA from "react-google-recaptcha";
import {
  ArrowRight,
  Loader2,
} from "lucide-react";

import { FormStatus } from "@/components/forms/FormStatus";
import {
  SelectField,
  TextField,
} from "@/components/forms/fields";

const interests = [
  "Mining Machinery & Equipment",
  "Infrastructure & Construction",
  "Mineral Processing",
  "Logistics & Transportation",
  "Safety & Sustainability",
  "Heavy Engineering & Industrial Solutions",
];

const visitorProfiles = [
  "Mine Owner / Developer / Operator",
  "Manufacturer",
  "Contractor / Builder",
  "Consultant / Engineering Firm",
  "Distributor / Transporter",
  "Government / PSU / Nodal Agency",
  "Association / Academia",
  "Financial Institution / Investor / Consultant",
  "Dealer / Distributor",
  "Media / Press",
  "Other",
];

const sources = [
  "Google Search",
  "Email",
  "WhatsApp",
  "Facebook",
  "Instagram",
  "LinkedIn",
  "Industry Association",
  "Colleague / Business Contact",
  "Previous Edition",
  "Other",
];

type Status = {
  type: "idle" | "loading" | "success" | "error";
  message?: string;
};

export function VisitorForm() {
  const [status, setStatus] = useState<Status>({
    type: "idle",
  });

  const [captchaToken, setCaptchaToken] =
    useState<string | null>(null);

  const [accepted, setAccepted] = useState(false);

  const captchaRef = useRef<ReCAPTCHA>(null);

  const siteKey =
    process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;

  async function onSubmit(
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

    if (!accepted) {
      setStatus({
        type: "error",
        message:
          "Please accept the consent statement to continue.",
      });

      return;
    }

    const form = e.currentTarget;
    const data = new FormData(form);

    const interest = data
      .getAll("interest")
      .map(String);

    if (!interest.length) {
      setStatus({
        type: "error",
        message:
          "Please select at least one area of interest.",
      });

      return;
    }

    const payload = {
      name: data.get("name"),
      designation: data.get("designation"),
      company: data.get("company"),

      email: data.get("email"),
      phone: data.get("phone"),

      website: data.get("website"),

      city: data.get("city"),
      country: data.get("country"),

      profile: data.get("profile"),
      interest,

      source: data.get("source"),

      consent: true,

      captchaToken,

      company_website:
        data.get("company_website"),
    };

    setStatus({
      type: "loading",
    });

    try {
      const response = await fetch(
        "/api/visitor",
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
          "Visitor registration submitted successfully.",
      });

      form.reset();

      setAccepted(false);
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
      onSubmit={onSubmit}
      className="grid gap-8"
    >
      <FormSection
        number="01"
        title="Your Details"
      >
        <div className="grid gap-5 sm:grid-cols-2">
          <TextField
            label="Full Name"
            name="name"
            required
            autoComplete="name"
          />

          <TextField
            label="Designation"
            name="designation"
            required
          />

          <TextField
            label="Company / Organisation"
            name="company"
            required
            autoComplete="organization"
          />

          <TextField
            label="Company Website"
            name="website"
            type="url"
            placeholder="https://"
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
            label="City"
            name="city"
            required
            autoComplete="address-level2"
          />

          <TextField
            label="Country"
            name="country"
            required
            autoComplete="country-name"
          />
        </div>
      </FormSection>

      <FormSection
        number="02"
        title="Visitor Profile"
      >
        <div className="grid gap-5">
          <SelectField
            label="Visitor Profile"
            name="profile"
            required
            defaultValue=""
          >
            <option
              value=""
              disabled
            >
              Select one…
            </option>

            {visitorProfiles.map(
              (profile) => (
                <option
                  key={profile}
                  value={profile}
                >
                  {profile}
                </option>
              )
            )}
          </SelectField>

          <SelectField
            label="How did you hear about us?"
            name="source"
            required
            defaultValue=""
          >
            <option
              value=""
              disabled
            >
              Select one…
            </option>

            {sources.map((source) => (
              <option
                key={source}
                value={source}
              >
                {source}
              </option>
            ))}
          </SelectField>
        </div>
      </FormSection>

      <FormSection
        number="03"
        title="Areas of Interest"
      >
        <div className="grid gap-3 sm:grid-cols-2">
          {interests.map((item) => (
            <label
              key={item}
              className="group flex cursor-pointer items-start gap-3 border border-zinc-300 bg-white p-4 transition hover:border-brand"
            >
              <input
                type="checkbox"
                name="interest"
                value={item}
                className="mt-0.5 size-4 accent-[#f9b900]"
              />

              <span className="text-sm font-semibold leading-5 text-zinc-800">
                {item}
              </span>
            </label>
          ))}
        </div>
      </FormSection>

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

      <label className="flex cursor-pointer items-start gap-3 border-t border-zinc-300 pt-6">
        <input
          type="checkbox"
          checked={accepted}
          onChange={(e) =>
            setAccepted(
              e.target.checked
            )
          }
          className="mt-1 size-4 shrink-0 accent-[#f9b900]"
        />

        <span className="text-[11px] leading-5 text-zinc-600">
          I agree to be contacted by Futurex Trade
          Fair & Events Pvt. Ltd. about the 5th
          Odisha Mining & Infrastructure
          International Expo. My details won&apos;t
          be shared with third parties.
        </span>
      </label>

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

      <FormStatus status={status} />

      <button
        type="submit"
        disabled={
          status.type ===
          "loading"
        }
        className="group inline-flex min-h-13 w-full items-center justify-center gap-3 bg-brand-black px-7 text-[11px] font-extrabold uppercase tracking-[.09em] text-white transition duration-300 hover:bg-brand hover:text-brand-black disabled:cursor-not-allowed disabled:opacity-50 sm:w-fit"
      >
        {status.type ===
        "loading" ? (
          <>
            <Loader2 className="size-4 animate-spin" />
            Registering...
          </>
        ) : (
          <>
            Register to Visit — Free

            <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
          </>
        )}
      </button>
    </form>
  );
}

function FormSection({
  number,
  title,
  children,
}: {
  number: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section>
      <div className="mb-5 flex items-center gap-4 border-b border-zinc-300 pb-4">
        <span className="text-[10px] font-black tracking-[.15em] text-brand-dark">
          {number}
        </span>

        <h3 className="text-lg font-black tracking-[-.025em] text-zinc-950">
          {title}
        </h3>
      </div>

      {children}
    </section>
  );
}