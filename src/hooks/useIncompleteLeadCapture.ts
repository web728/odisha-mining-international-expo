"use client";
import { useCallback, useRef } from "react";
import { getCallerId } from "@/lib/callerAttribution";

type FormKind = "visitor" | "exhibitor" | "contact";
/** Requires an explicit checked opt-in. Never sends without it. */
export function useIncompleteLeadCapture(formKind: FormKind) {
  const draftId = useRef<string | null>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const inFlight = useRef(false);
  const lastFingerprint = useRef("");
  const succeeded = useRef(false);

  const save = useCallback(async (form: HTMLFormElement) => {
    if (succeeded.current || inFlight.current || !form.isConnected) return;
    const data = new FormData(form);
    if (data.get("draftConsent") !== "yes") return;
    const name = String(data.get("name") || data.get("fullName") ||
      [data.get("firstName"), data.get("lastName")].filter(Boolean).join(" ")).trim();
    const email = String(data.get("email") || "").trim();
    const number = String(data.get("phone") || "").trim();
    const countryCode = String(data.get("countryCode") || "").trim();
    const phone = number ? `${countryCode} ${number}`.trim() : "";
    if (!name || (!email && !phone)) return;
    const fingerprint = JSON.stringify([name, email, phone, getCallerId()]);
    if (lastFingerprint.current === fingerprint) return;
    if (!draftId.current) draftId.current = crypto.randomUUID();
    inFlight.current = true;
    try {
      const response = await fetch("/api/lead-draft", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          draftId: draftId.current, formKind, name, email, phone,
          caller_id: getCallerId(), draftConsent: true,
        }),
      });
      if (response.ok) lastFingerprint.current = fingerprint;
    } catch { /* normal form remains usable offline */ }
    finally { inFlight.current = false; }
  }, [formKind]);

  const schedule = useCallback((form: HTMLFormElement) => {
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => { void save(form); }, 1700);
  }, [save]);

  const markSubmitted = useCallback(async () => {
    succeeded.current = true;
    if (timer.current) clearTimeout(timer.current);
    // A complete conversion should reconcile/delete any earlier draft.
    // This package intentionally does not delete PII without backend authorization.
  }, []);

  return { schedule, markSubmitted };
}
