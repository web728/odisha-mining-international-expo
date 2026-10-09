"use client";

import { useEffect, useState } from "react";
import { X } from "lucide-react";

type Consent = "accepted" | "rejected" | null;

export function CookieConsent() {
  const [consent, setConsent] =
    useState<Consent>(null);

  const [ready, setReady] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem(
      "Odisha Mining & Infrastructure International Expo-cookie-consent"
    );

    if (
      saved === "accepted" ||
      saved === "rejected"
    ) {
      setConsent(saved);
    }

    setReady(true);
  }, []);

  async function choose(
    value: "accepted" | "rejected"
  ) {
    localStorage.setItem(
      "Odisha Mining & Infrastructure International Expo-cookie-consent",
      value
    );

    setConsent(value);

    try {
      await fetch("/api/consent", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          consent: value,
          page: window.location.pathname,
          referrer: document.referrer || "",
        }),
      });
    } catch {
      // Consent choice should still work
      // even if logging temporarily fails.
    }
  }

  if (!ready || consent) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-[200] p-3 sm:p-5">
      <div className="mx-auto max-w-5xl border border-white/15 bg-brand-black p-5 text-white shadow-[0_20px_80px_rgba(0,0,0,.45)] sm:p-6">
        <div className="grid gap-5 lg:grid-cols-[1fr_auto] lg:items-center">
          <div>
            <div className="mb-3 flex items-center gap-3">
              <span className="h-[2px] w-8 bg-brand" />

              <p className="text-[10px] font-extrabold uppercase tracking-[.16em] text-brand">
                Privacy & Cookies
              </p>
            </div>

            <p className="max-w-3xl text-sm leading-6 text-white/70">
              We use necessary cookies and, with your
              permission, analytics technologies to improve
              the website experience. Your form details are
              only collected when you provide them.
            </p>
          </div>

          <div className="flex flex-col gap-2 sm:flex-row">
            <button
              onClick={() => choose("rejected")}
              className="min-h-11 border border-white/20 px-5 text-[10px] font-extrabold uppercase tracking-[.08em] transition hover:border-brand hover:text-brand"
            >
              Reject Optional
            </button>

            <button
              onClick={() => choose("accepted")}
              className="min-h-11 bg-brand px-5 text-[10px] font-extrabold uppercase tracking-[.08em] text-brand-black transition hover:bg-brand-light"
            >
              Accept
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}