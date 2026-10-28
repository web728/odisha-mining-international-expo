"use client";
import { FormEvent, useEffect, useRef, useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import { ArrowRight, Loader2 } from "lucide-react";
import { TextField, SelectField, TextAreaField } from "@/components/forms/fields";
import { PhoneField } from "@/components/forms/PhoneField";
import { FormStatus } from "@/components/forms/FormStatus";
import { captureCallerAttribution, getCallerId } from "@/lib/callerAttribution";
import { useLeadDraft } from "@/components/forms/useLeadDraft";

type Status = { type: "idle" | "loading" | "success" | "error"; message?: string };
type Result = { success?: boolean; recorded?: boolean; duplicate?: boolean; submissionId?: string; caller_id?: string | null; warpbayStatus?: string; message?: string };
const read = (fd: FormData, key: string) => String(fd.get(key) ?? "").trim();

export function VisitorForm() {
  const [status, setStatus] = useState<Status>({ type: "idle" });
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);
  const [accepted, setAccepted] = useState(false);
  const [draftConsent, setDraftConsent] = useState(false);
  const [formVersion, setFormVersion] = useState(0);
  const busyRef = useRef(false);
  const submissionRef = useRef<string | null>(null);
  const captchaRef = useRef<ReCAPTCHA>(null);
  const draft = useLeadDraft("visitor");
  const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;
  useEffect(() => { captureCallerAttribution(); }, []);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (busyRef.current) return;
    const form = e.currentTarget;
    if (!accepted || !captchaToken || !siteKey) {
      setStatus({ type: "error", message: !accepted ? "Please accept the registration consent." : "Please complete reCAPTCHA." });
      return;
    }
    const fd = new FormData(form);
    const phone = read(fd, "phone");
    const countryCode = read(fd, "countryCode");
    if (!/^\+[1-9]\d{0,3}$/.test(countryCode) || !/^\d{5,15}$/.test(phone)) {
      setStatus({ type: "error", message: "Please enter a valid mobile number and country calling code." });
      return;
    }
    const payload = {
      submissionId: submissionRef.current ?? (submissionRef.current = crypto.randomUUID()),
      draftId: draftConsent ? draft.draftId() : null,
      caller_id: getCallerId(),
      name: read(fd, "name"), company: read(fd, "company"),
      designation: read(fd, "designation"), email: read(fd, "email"),
      phone: read(fd, "phone"), countryCode: read(fd, "countryCode"),
      country: read(fd, "country"), businessCategory: read(fd, "businessCategory"),
      primaryCategory: read(fd, "businessCategory"),
      consent: true, captchaToken, company_website: read(fd, "company_website"),
    };
    busyRef.current = true;
    setStatus({ type: "loading" });
    try {
      const response = await fetch("/api/visitor", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const result: Result = await response.json();
      if (!response.ok || result.success !== true) {
        throw new Error(result.message || "Unable to submit registration.");
      }
      if (result.recorded === true && result.submissionId && !result.duplicate) {
        try {
          const eventKey = `ome_ga4_visitor_success_${result.submissionId}`;
          const analytics = window as Window & { gtag?: (...args: unknown[]) => void };
          if (!sessionStorage.getItem(eventKey) && typeof analytics.gtag === "function") {
            analytics.gtag("event", "visitor_registration_success", { caller_id: result.caller_id ?? "unassigned" });
            sessionStorage.setItem(eventKey, "1");
          }
        } catch { /* analytics must not affect registration */ }
      }
      if (result.recorded === true) draft.markConverted();
      submissionRef.current = null;
      setStatus({ type: "success", message: result.message || "Your enquiry has been saved." });
      form.reset();
      setAccepted(false);
      setDraftConsent(false);
      setCaptchaToken(null);
      captchaRef.current?.reset();
      setFormVersion((value) => value + 1);
    } catch (error) {
      setStatus({ type: "error", message: error instanceof Error ? error.message : "Submission failed." });
      setCaptchaToken(null);
      captchaRef.current?.reset();
    } finally { busyRef.current = false; }
  }

  return (
    <form key={formVersion} onSubmit={onSubmit} onChange={draft.onChange} onBlur={draft.onBlur} className="grid gap-6">
      <div className="grid gap-5 sm:grid-cols-2">
        <TextField label="Full Name" name="name" required autoComplete="name" />
        <TextField label="Company / Organisation" name="company" required autoComplete="organization" />
        <TextField label="Designation" name="designation" required />
        <PhoneField required />
        <TextField label="Email Address" name="email" type="email" required autoComplete="email" />
        <TextField label="Business / Category (Optional)" name="businessCategory" />
        <TextField label="Country" name="country" required autoComplete="country-name" />
      </div>
      <div className="absolute -left-[9999px]" aria-hidden="true">
        <TextField label="Website" name="company_website" tabIndex={-1} autoComplete="off" />
      </div>
      <label className="flex items-start gap-3 text-sm text-zinc-700">
        <input type="checkbox" name="draftConsent" value="yes" checked={draftConsent}
          onChange={(e) => setDraftConsent(e.target.checked)} className="mt-1" />
        <span>Optional: I agree that my entered contact details may be saved before submission so the event team can follow up if I leave this form unfinished.</span>
      </label>
      <label className="flex items-start gap-3 text-sm text-zinc-700">
        <input type="checkbox" checked={accepted} onChange={(e) => setAccepted(e.target.checked)} required className="mt-1" />
        <span>I agree to be contacted about Odisha Mining & Infrastructure International Expo 2027. <strong>*</strong></span>
      </label>
      {siteKey ? <ReCAPTCHA ref={captchaRef} sitekey={siteKey} onChange={setCaptchaToken}
        onExpired={() => setCaptchaToken(null)} onErrored={() => setCaptchaToken(null)} />
        : <p role="alert">reCAPTCHA configuration missing.</p>}
      <FormStatus status={status} />
      <button type="submit" disabled={status.type === "loading"}
        className="group inline-flex min-h-12 w-full items-center justify-center gap-3 bg-brand-black px-7 py-3 text-xs font-extrabold uppercase text-white disabled:opacity-60 sm:w-fit">
        {status.type === "loading" ? <><Loader2 className="size-4 animate-spin" /> Sending...</>
          : <>Register to Visit — Free <ArrowRight className="size-4" /></>}
      </button>
    </form>
  );
}
