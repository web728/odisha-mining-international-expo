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
  TextAreaField,
  TextField,
} from "@/components/forms/fields";

const categories = [
  "Mining Machinery & Equipment",
  "Infrastructure & Construction",
  "Mineral Processing",
  "Logistics & Transportation",
  "Safety & Sustainability",
  "Heavy Engineering & Industrial Solutions",
  "Other",
];

const standOptions = [
  "9 sqm shell scheme",
  "18 sqm shell scheme",
  "27+ sqm custom / bare",
  "Outdoor machinery display",
  "Not sure yet",
];

const participationOptions = [
  "Live Machinery / Product Demonstration",
  "Sponsorship / Branding Opportunities",
  "B2B Meetings",
  "Dealer / Distributor Networking",
];

type Status = {
  type:
    | "idle"
    | "loading"
    | "success"
    | "error";
  message?: string;
};

export function ExhibitorForm() {
  const [status, setStatus] =
    useState<Status>({
      type: "idle",
    });

  const [accepted, setAccepted] =
    useState(false);

  const [
    captchaToken,
    setCaptchaToken,
  ] = useState<string | null>(null);

  const captchaRef =
    useRef<ReCAPTCHA>(null);

  const siteKey =
    process.env
      .NEXT_PUBLIC_RECAPTCHA_SITE_KEY;

  async function onSubmit(
    e: FormEvent<HTMLFormElement>
  ) {
    e.preventDefault();

    if (!accepted) {
      setStatus({
        type: "error",
        message:
          "Please accept the consent statement to continue.",
      });

      return;
    }

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

    const form =
      e.currentTarget;

    const formData =
      new FormData(form);

    const data = {
      company:
        formData.get("company"),

      name:
        formData.get("name"),

      designation:
        formData.get(
          "designation"
        ),

      email:
        formData.get("email"),

      phone:
        formData.get("phone"),

      country:
        formData.get("country"),

      website:
        formData.get("website"),

      address:
        formData.get("address"),

      cityState:
        formData.get("cityState"),

      taxId:
        formData.get("taxId"),

      category:
        formData.get("category"),

      exhibitDetails:
        formData.get(
          "exhibitDetails"
        ),

      brands:
        formData.get("brands"),

      standSize:
        formData.get(
          "standSize"
        ),

      participationInterests:
        formData.getAll(
          "participationInterests"
        ),

      message:
        formData.get("message"),

      consent: true,

      captchaToken,

      company_website:
        formData.get(
          "company_website"
        ),
    };

    setStatus({
      type: "loading",
    });

    try {
      const response =
        await fetch(
          "/api/exhibitor",
          {
            method: "POST",

            headers: {
              "Content-Type":
                "application/json",
            },

            body:
              JSON.stringify(data),
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
          "Thank you. Our exhibition team will contact you shortly.",
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
      className="grid gap-9"
    >
      <FormSection
        number="01"
        title="Company Details"
        text="Tell us who you are and how our exhibition team can reach you."
      >
        <div className="grid gap-5 sm:grid-cols-2">
          <TextField
            label="Company Name"
            name="company"
            required
            autoComplete="organization"
          />

          <TextField
            label="Contact Person"
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
            required
            autoComplete="country-name"
          />

          <TextField
            label="Company Website"
            name="website"
            type="url"
            placeholder="https://"
          />

          <TextField
            label="City / State"
            name="cityState"
          />

          <div className="sm:col-span-2">
            <TextField
              label="Company Address"
              name="address"
              autoComplete="street-address"
            />
          </div>

          <div className="sm:col-span-2">
            <TextField
              label="GST / VAT / Tax ID"
              name="taxId"
              placeholder="Optional"
            />
          </div>
        </div>
      </FormSection>

      <FormSection
        number="02"
        title="What You'll Exhibit"
        text="Help us understand your products, technologies and sector."
      >
        <div className="grid gap-5">
          <SelectField
            label="Primary Category"
            name="category"
            required
            defaultValue=""
          >
            <option
              value=""
              disabled
            >
              Select a category…
            </option>

            {categories.map(
              (category) => (
                <option
                  key={category}
                  value={category}
                >
                  {category}
                </option>
              )
            )}
          </SelectField>

          <TextAreaField
            label="Products / Solutions to be Exhibited"
            name="exhibitDetails"
            required
            placeholder="Briefly describe the machinery, equipment, technology, products or services you plan to showcase."
          />

          <TextField
            label="Brands / Product Names"
            name="brands"
            placeholder="Optional"
          />
        </div>
      </FormSection>

      <FormSection
        number="03"
        title="Stand Preference"
        text="Select the participation format closest to your current requirement."
      >
        <div className="grid gap-3 sm:grid-cols-2">
          {standOptions.map(
            (option) => (
              <label
                key={option}
                className="group flex cursor-pointer items-center gap-3 border border-zinc-300 bg-white p-4 transition hover:border-brand"
              >
                <input
                  type="radio"
                  name="standSize"
                  value={option}
                  required
                  className="size-4 accent-[#f9b900]"
                />

                <span className="text-sm font-semibold text-zinc-800">
                  {option}
                </span>
              </label>
            )
          )}
        </div>
      </FormSection>

      <FormSection
        number="04"
        title="Additional Participation"
        text="Optional opportunities your company may be interested in."
      >
        <div className="grid gap-3 sm:grid-cols-2">
          {participationOptions.map(
            (option) => (
              <label
                key={option}
                className="group flex cursor-pointer items-start gap-3 border border-zinc-300 bg-white p-4 transition hover:border-brand"
              >
                <input
                  type="checkbox"
                  name="participationInterests"
                  value={option}
                  className="mt-0.5 size-4 accent-[#f9b900]"
                />

                <span className="text-sm font-semibold leading-5 text-zinc-800">
                  {option}
                </span>
              </label>
            )
          )}
        </div>
      </FormSection>

      <FormSection
        number="05"
        title="Anything Else?"
        text="Share special requirements or questions for our exhibition team."
      >
        <TextAreaField
          label="Requirements or Questions"
          name="message"
          placeholder="Stand configuration, power requirements, machinery display, sponsorship, logistics or any other requirement..."
        />
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
          I agree to be contacted by Futurex Trade Fair &
          Events Pvt. Ltd. about exhibiting at the 5th
          Odisha Mining & Infrastructure International Expo.
          My details won&apos;t be shared with third parties.
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

      <FormStatus
        status={status}
      />

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
            Sending Enquiry...
          </>
        ) : (
          <>
            Send Stand Enquiry

            <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
          </>
        )}
      </button>

      <p className="text-xs leading-6 text-zinc-500">
        Prefer to talk directly?
        Call{" "}
        <a
          href="tel:+919810855697"
          className="font-bold text-zinc-950 underline decoration-brand decoration-2 underline-offset-4"
        >
          +91 98108 55697
        </a>{" "}
        (Namit Gupta) or{" "}
        <a
          href="https://wa.me/919810855697"
          target="_blank"
          rel="noopener noreferrer"
          className="font-bold text-zinc-950 underline decoration-brand decoration-2 underline-offset-4"
        >
          message on WhatsApp
        </a>
        .
      </p>
    </form>
  );
}

function FormSection({
  number,
  title,
  text,
  children,
}: {
  number: string;
  title: string;
  text: string;
  children:
    React.ReactNode;
}) {
  return (
    <section>
      <div className="mb-5 flex items-start gap-4 border-b border-zinc-300 pb-4">
        <span className="text-[10px] font-black tracking-[.15em] text-brand-dark">
          {number}
        </span>

        <div>
          <h3 className="text-lg font-black tracking-[-.025em] text-zinc-950">
            {title}
          </h3>

          <p className="mt-1 text-xs leading-5 text-zinc-500">
            {text}
          </p>
        </div>
      </div>

      {children}
    </section>
  );
}