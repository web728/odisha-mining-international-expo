import type { Metadata } from "next";
import {
  ArrowUpRight,
  CalendarDays,
  Mail,
  MapPin,
  Ticket,
} from "lucide-react";

import { Container } from "@/components/ui/Container";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { BottomCTA } from "@/components/shared/BottomCTA";
import { Reveal } from "@/components/animations/Reveal";

export const metadata: Metadata = {
  title: "Venue & Floor Plan",
  description:
    "Baramunda Exhibition Ground, Bhubaneswar, Odisha — venue for Odisha Mining Expo 2027.",
  alternates: { canonical: "/venue" },
};

const zones = [
  ["Zone A", "Outdoor Heavy Machinery & Live Demo Arena"],
  ["Zone B", "Indoor Exhibition Halls"],
  ["Zone C", "Networking & Refreshments Lounge"],
  ["Zone D", "B2B Meeting Lounge"],
  ["Zone E", "Registration & Visitor Services"],
];

export default function Venue() {
  return (
    <>
      {/* HERO */}
      <section className="relative isolate overflow-hidden bg-brand-black text-white">
        <HeroGraphic />

        <Container className="relative z-10 flex min-h-[390px] items-end py-14 sm:min-h-[430px] lg:py-16">
          <Reveal>
            <div className="max-w-4xl">
              <Eyebrow dark>Venue</Eyebrow>

              <h1 className="mt-4 text-[clamp(2.7rem,5vw,5rem)] font-black leading-[.96] tracking-[-.055em]">
                Venue &
                <span className="text-brand"> Floor Plan.</span>
              </h1>

              <p className="mt-5 max-w-3xl text-sm leading-7 text-white/70 sm:text-base">
                Baramunda Exhibition Ground, Bhubaneswar, Odisha — 30,000 sq.
                metres of exhibition space matching the scale of leading
                international mining expos.
              </p>
            </div>
          </Reveal>
        </Container>
      </section>

      {/* FLOOR PLAN */}
      <section className="section-space bg-white">
        <Container>
          <Reveal>
            <div className="grid gap-6 lg:grid-cols-[1fr_.8fr] lg:items-end">
              <div>
                <Eyebrow>On Site</Eyebrow>

                <h2 className="mt-4 max-w-2xl text-[clamp(2rem,3.2vw,3.5rem)] font-black leading-[1.02] tracking-[-.045em] text-zinc-950">
                  What to expect
                  <span className="text-brand"> at the ground.</span>
                </h2>
              </div>

              <p className="max-w-xl text-sm leading-7 text-zinc-700 lg:justify-self-end">
                Indicative layout of the show zones. The official hall-wise
                floor plan with stand numbers is shared with confirmed
                exhibitors — request it below.
              </p>
            </div>
          </Reveal>

          <div className="mt-10 grid border-l border-t border-zinc-200 sm:grid-cols-2 lg:grid-cols-5">
            {zones.map(([zone, text], i) => (
              <Reveal key={zone}>
                <article className="group relative min-h-[175px] overflow-hidden border-b border-r border-zinc-200 bg-white p-5 transition duration-500 hover:bg-brand-black">
                  <span className="text-[10px] font-extrabold uppercase tracking-[.16em] text-brand">
                    {zone}
                  </span>

                  <p className="mt-5 text-sm font-bold leading-6 text-zinc-950 transition group-hover:text-white">
                    {text}
                  </p>

                  <span className="absolute right-4 top-4 text-[9px] font-bold tracking-[.14em] text-zinc-300 group-hover:text-brand/60">
                    {String(i + 1).padStart(2, "0")}
                  </span>

                  <span className="absolute inset-x-0 bottom-0 h-[3px] origin-left scale-x-0 bg-brand transition-transform duration-500 group-hover:scale-x-100" />
                </article>
              </Reveal>
            ))}
          </div>

      <div className="mt-8 flex flex-wrap gap-3">
  <a
    href="mailto:info@futurextrade.com?subject=Floor%20Plan%20Request%20-%20OMIIE%202027"
    className="
      group
      inline-flex
      min-h-12
      items-center
      gap-3
      border
      !border-[#171717]
      !bg-[#171717]
      px-5
      text-[11px]
      font-extrabold
      uppercase
      leading-none
      tracking-[0.08em]
      !text-white
      no-underline
      transition-all
      duration-300
      hover:-translate-y-0.5
      hover:!border-white
      hover:!bg-white
      hover:!text-[#171717]
    "
  >
    <Mail className="size-4 shrink-0 !text-white transition-colors duration-300 group-hover:!text-[#171717]" />

    <span className="whitespace-nowrap">
      Request the Official Floor Plan
    </span>

    <ArrowUpRight
      className="
        size-4
        shrink-0
        !text-white
        transition-all
        duration-300
        group-hover:!text-[#171717]
        group-hover:-translate-y-0.5
        group-hover:translate-x-0.5
      "
    />
  </a>

  <ButtonLink
    href="/exhibitor-registration"
    variant="dark"
    className="
      !border-[#171717]
      !bg-[#171717]
      !text-white
      hover:!border-white
      hover:!bg-white
      hover:!text-[#171717]
    "
  >
    Book Your Stand
  </ButtonLink>
</div>
        </Container>
      </section>

      {/* LOCATION */}
      <section className="section-space bg-[#f4f4f1]">
        <Container className="grid gap-10 lg:grid-cols-[.85fr_1.15fr] lg:items-center lg:gap-14">
          <Reveal>
            <div>
              <Eyebrow>Getting There</Eyebrow>

              <h2 className="mt-4 max-w-xl text-[clamp(2rem,3vw,3.25rem)] font-black leading-[1.03] tracking-[-.045em] text-zinc-950">
                Baramunda Exhibition Ground,
                <span className="text-brand"> Bhubaneswar.</span>
              </h2>

              <p className="mt-6 max-w-xl text-[15px] leading-7 text-zinc-700">
                The ground sits in the heart of Bhubaneswar, Odisha&apos;s
                capital, with easy access from Biju Patnaik International
                Airport, Bhubaneswar railway station and the Baramunda bus
                terminus. Ample city hotel options are within a short drive.
              </p>

              <div className="mt-7 grid gap-4 border-t border-zinc-300 pt-6">
                <Info
                  icon={CalendarDays}
                  label="Dates"
                  value="07–10 January 2027"
                />

                <Info
                  icon={Ticket}
                  label="Entry"
                  value={
                    <>
                      Free for trade visitors —{" "}
                      <a
                        href="/visitor-registration"
                        className="font-bold text-zinc-950 underline decoration-brand decoration-2 underline-offset-4"
                      >
                        register online
                      </a>
                    </>
                  }
                />

                <Info
                  icon={MapPin}
                  label="City"
                  value="Bhubaneswar, Odisha, India"
                />
              </div>
            </div>
          </Reveal>

          <Reveal>
            <div className="relative">
              <span className="absolute -right-4 -top-4 hidden h-24 w-24 border-r border-t border-brand/60 lg:block" />

              <div className="relative overflow-hidden border border-zinc-300 bg-white p-2">
                <iframe
                  title="Map of Baramunda Exhibition Ground, Bhubaneswar"
                  loading="lazy"
                  className="h-[360px] w-full border-0 sm:h-[420px]"
                  src="https://maps.google.com/maps?q=Baramunda%20Ground%2C%20Bhubaneswar%2C%20Odisha&t=m&z=13&output=embed&iwloc=near"
                />

                <div className="absolute bottom-5 left-5 bg-brand px-4 py-2 text-[10px] font-extrabold uppercase tracking-[.12em] text-brand-black">
                  Bhubaneswar · Odisha
                </div>
              </div>
            </div>
          </Reveal>
        </Container>
      </section>

      <BottomCTA />
    </>
  );
}

function Eyebrow({
  children,
  dark = false,
}: {
  children: React.ReactNode;
  dark?: boolean;
}) {
  return (
    <div className="flex items-center gap-3">
      <span className="h-[2px] w-10 bg-brand" />
      <p
        className={`text-[10px] font-extrabold uppercase tracking-[.18em] ${
          dark ? "text-brand" : "text-zinc-950"
        }`}
      >
        {children}
      </p>
    </div>
  );
}

function Info({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ElementType;
  label: string;
  value: React.ReactNode;
}) {
  return (
    <div className="flex items-start gap-3">
      <span className="grid size-9 shrink-0 place-items-center border border-zinc-300 bg-white">
        <Icon className="size-4 text-brand-dark" />
      </span>

      <div>
        <p className="text-[9px] font-extrabold uppercase tracking-[.15em] text-zinc-500">
          {label}
        </p>
        <div className="mt-1 text-sm font-semibold leading-6 text-zinc-800">
          {value}
        </div>
      </div>
    </div>
  );
}

function HeroGraphic() {
  return (
    <svg
      aria-hidden
      viewBox="0 0 760 420"
      className="pointer-events-none absolute right-0 top-0 hidden h-full w-[43%] lg:block"
      preserveAspectRatio="xMaxYMin slice"
    >
      <polygon points="180,0 760,0 760,125 500,265" fill="#F9B900" />
      <polygon points="500,265 760,125 760,245 540,340" fill="#8F6400" />
      <path d="M500 265 760 125" stroke="#FFD84A" strokeOpacity=".3" />
    </svg>
  );
}