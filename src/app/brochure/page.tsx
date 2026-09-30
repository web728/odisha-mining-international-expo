import type { Metadata } from "next";
import {
  CalendarDays,
  Check,
  Download,
  MapPin,
} from "lucide-react";

import { Container } from "@/components/ui/Container";
import { BrochureForm } from "./BrochureForm";

export const metadata: Metadata = {
  title: "Download Brochure",
  description: "Download the Odisha Mining Expo 2027 brochure.",
  alternates: { canonical: "/brochure" },
};

const highlights = [
  "Exhibition overview",
  "Exhibitor & visitor profiles",
  "Industry sectors & opportunities",
  "Participation information",
];

export default function Page() {
  return (
    <>
      {/* HERO */}
      <section className="relative isolate overflow-hidden bg-brand-black text-white">
        <HeroGraphic />

        <Container className="relative z-10 flex min-h-[360px] items-end py-14 sm:min-h-[400px] lg:py-16">
          <div className="max-w-4xl">
            <div className="flex items-center gap-3">
              <span className="h-[2px] w-10 bg-brand" />
              <p className="text-[10px] font-extrabold uppercase tracking-[.18em] text-brand">
                Brochure
              </p>
            </div>

            <h1 className="mt-4 text-[clamp(2.7rem,5vw,5rem)] font-black leading-[.96] tracking-[-.055em]">
              Download the
              <span className="text-brand"> Show Brochure.</span>
            </h1>

            <p className="mt-5 max-w-3xl text-sm leading-7 text-white/70 sm:text-base">
              Odisha Mining & Infrastructure International Expo 2027 —
              07–10 January 2027, Bhubaneswar.
            </p>
          </div>
        </Container>
      </section>

      {/* CONTENT */}
      <section className="section-space bg-white">
        <Container className="grid gap-12 lg:grid-cols-[.85fr_1.15fr] lg:items-start lg:gap-16">
          {/* LEFT */}
          <div className="lg:pt-4">
            <div className="flex items-center gap-3">
              <span className="h-[2px] w-10 bg-brand" />
              <p className="text-[10px] font-extrabold uppercase tracking-[.18em] text-zinc-950">
                OMIIE 2027
              </p>
            </div>

            <h2 className="mt-4 max-w-xl text-[clamp(2rem,3vw,3.3rem)] font-black leading-[1.02] tracking-[-.045em] text-zinc-950">
              Everything you need to
              <span className="text-brand"> plan your participation.</span>
            </h2>

            <p className="mt-5 max-w-xl text-sm leading-7 text-zinc-700">
              Complete the short form to access the Odisha Mining &
              Infrastructure International Expo 2027 brochure.
            </p>

            <div className="mt-8 grid border-l border-t border-zinc-200">
              {highlights.map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-3 border-b border-r border-zinc-200 px-4 py-4"
                >
                  <span className="grid size-7 shrink-0 place-items-center bg-brand text-brand-black">
                    <Check className="size-4" strokeWidth={3} />
                  </span>

                  <p className="text-sm font-semibold text-zinc-800">
                    {item}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-8 grid gap-4 border-t border-zinc-200 pt-6 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
              <Info
                icon={CalendarDays}
                label="Event Dates"
                value="07–10 January 2027"
              />

              <Info
                icon={MapPin}
                label="Venue"
                value="Bhubaneswar, Odisha"
              />
            </div>
          </div>

          {/* FORM */}
          <div className="relative">
            <span className="absolute -right-4 -top-4 hidden h-24 w-24 border-r border-t border-brand/60 lg:block" />

            <div className="relative border border-zinc-200 bg-[#f4f4f1] p-6 shadow-[0_20px_70px_rgba(0,0,0,.06)] sm:p-8 lg:p-10">
              <span className="absolute left-0 top-0 h-[3px] w-24 bg-brand" />

              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-[10px] font-extrabold uppercase tracking-[.18em] text-zinc-950">
                    Free Download
                  </p>

                  <h2 className="mt-2 text-2xl font-black tracking-[-.04em] text-zinc-950 sm:text-3xl">
                    Get the <span className="text-brand">brochure.</span>
                  </h2>
                </div>

                <span className="hidden size-12 place-items-center border border-zinc-300 bg-white sm:grid">
                  <Download className="size-5 text-brand-dark" />
                </span>
              </div>

              <p className="mt-4 text-sm leading-7 text-zinc-600">
                Fill in your details below to access the event brochure.
              </p>

              <div className="mt-7">
                <BrochureForm />
              </div>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}

function Info({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ElementType;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-start gap-3">
      <span className="grid size-10 shrink-0 place-items-center border border-zinc-200">
        <Icon className="size-4 text-brand-dark" />
      </span>

      <div>
        <p className="text-[9px] font-extrabold uppercase tracking-[.14em] text-zinc-500">
          {label}
        </p>
        <p className="mt-1 text-sm font-bold text-zinc-950">{value}</p>
      </div>
    </div>
  );
}

function HeroGraphic() {
  return (
    <svg
      aria-hidden
      viewBox="0 0 760 400"
      className="pointer-events-none absolute right-0 top-0 hidden h-full w-[42%] lg:block"
      preserveAspectRatio="xMaxYMin slice"
    >
      <polygon points="180,0 760,0 760,120 500,255" fill="#F9B900" />
      <polygon points="500,255 760,120 760,235 535,330" fill="#8F6400" />
      <path d="M500 255 760 120" stroke="#FFD84A" strokeOpacity=".35" />
    </svg>
  );
}