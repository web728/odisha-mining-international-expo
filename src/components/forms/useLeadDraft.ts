"use client";
import { useCallback, useEffect, useRef } from "react";
import { getCallerId } from "@/lib/callerAttribution";

type FormType = "visitor" | "exhibitor" | "contact";
/** Call on form input/change after adding the draftConsent checkbox. */
export function useLeadDraft(formType: FormType) {
  const id = useRef<string | null>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const inFlight = useRef(false);
  const finished = useRef(false);
  const formRef = useRef<HTMLFormElement | null>(null);
  useEffect(() => () => { if (timer.current) clearTimeout(timer.current); }, []);

  const getDraftId = useCallback(() => {
    if (!id.current) id.current = crypto.randomUUID();
    return id.current;
  }, []);

  const saveNow = useCallback(async () => {
    const form = formRef.current;
    if (!form || inFlight.current || finished.current) return;
    const fd = new FormData(form);
    if (fd.get("draftConsent") !== "yes") return;
    const name = String(fd.get("name") || fd.get("fullName") ||
      [fd.get("firstName"), fd.get("lastName")].filter(Boolean).join(" ")).trim();
    const email = String(fd.get("email") || "").trim();
    const phone = String(fd.get("phone") || "").trim();
    if (!name || (!email.includes("@") && !/\d{5}/.test(phone))) return;
    inFlight.current = true;
    try {
      await fetch("/api/lead-draft", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ draftId: getDraftId(), formType, draftConsent: true,
          name, email, phone, caller_id: getCallerId() }),
      });
    } catch { /* draft save must never prevent form registration */ }
    finally { inFlight.current = false; }
  }, [formType, getDraftId]);

  const onChange = useCallback((event: React.FormEvent<HTMLFormElement>) => {
    formRef.current = event.currentTarget;
    if (timer.current) clearTimeout(timer.current);
    const fd = new FormData(event.currentTarget);
    if (finished.current && fd.get("draftConsent") === "yes") {
      id.current = null;
      finished.current = false;
    }
    if (finished.current) return;
    if (fd.get("draftConsent") !== "yes") return;
    timer.current = setTimeout(() => { void saveNow(); }, 2000);
  }, [saveNow]);
  const onBlur = useCallback((event: React.FocusEvent<HTMLFormElement>) => {
    formRef.current = event.currentTarget;
    if (timer.current) clearTimeout(timer.current);
    void saveNow();
  }, [saveNow]);
  const markConverted = useCallback(() => {
    finished.current = true;
    if (timer.current) clearTimeout(timer.current);
  }, []);
  return { draftId: getDraftId, onChange, onBlur, markConverted };
}
