
import Image from "next/image";
import Link from "next/link";
import {
  ArrowUpRight,
  Mail,
  MapPin,
  Phone,
} from "lucide-react";

import { Container } from "@/components/ui/Container";
import { site } from "@/data/site";

const groups = [
  {
    title: "Exhibit",
    links: [
      ["Why Exhibit", "/exhibit"],
      ["Exhibitor Profiles", "/exhibit#profiles"],
      ["Brochure", "/brochure"],
      ["Book Your Stand", "/exhibitor-registration"],
    ],
  },
  {
    title: "Visit",
    links: [
      ["Why Visit", "/visit"],
      ["Visitor Profiles", "/visit#profiles"],
      ["Register Free", "/visitor-registration"],
      ["Gallery", "/gallery"],
    ],
  },
  {
    title: "Explore",
    links: [
      ["About the Show", "/about"],
      ["Why Odisha", "/why-odisha"],
      ["Venue", "/venue"],
      ["FAQ", "/faq"],
      ["Contact", "/contact"],
    ],
  },
] as const;

const socials = [
  [
    "Facebook",
    "https://www.facebook.com/odishaminingexpo/",
  ],
  [
    "LinkedIn",
    "https://www.linkedin.com/company/odishaminingexpo/",
  ],
  [
    "X",
    "https://x.com/odisaminingexpo",
  ],
] as const;

export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-[#050505] text-white">
      <FooterGraphic />

      {/* Top Statement */}
      <div className="relative border-b border-white/10">
        <Container className="grid items-center gap-4 py-6 lg:grid-cols-[1fr_auto] lg:py-7">
          <div className="min-w-0">
            <div className="flex items-center gap-3">
              <span className="h-[2px] w-10 shrink-0 bg-brand" />

              <p className="text-[10px] font-extrabold uppercase tracking-[.18em] text-brand">
                Odisha Mining Expo 2027
              </p>
            </div>

            <h2 className="mt-3 max-w-4xl text-[clamp(1.8rem,3vw,3.3rem)] font-black leading-[1.05] tracking-[-.045em]">
              India&apos;s mining and infrastructure
              <span className="text-brand">
                {" "}industry meets in Odisha.
              </span>
            </h2>
          </div>

          <div className="lg:text-right">
            <p className="text-[10px] font-extrabold uppercase tracking-[.16em] text-white/35">
              07–10 January 2027
            </p>

            <p className="mt-1.5 text-sm font-semibold text-white/75">
              Bhubaneswar · Odisha · India
            </p>
          </div>
        </Container>
      </div>

      {/* Main Footer */}
      <Container className="relative grid grid-cols-1 items-start gap-8 py-7 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.5fr)_minmax(0,1fr)] lg:gap-8 lg:py-9">

        {/* Brand Section */}
        <div className="flex min-w-0 flex-col items-start">

          {/* Expo Logo */}
          <Link
            href="/"
            className="m-0 flex w-fit items-center justify-start p-0 leading-none transition-opacity hover:opacity-85"
          >
            <Image
              src="/image/5th-Odisha-Logo_White.png"
              alt="Odisha Mining & Infrastructure International Expo"
              width={250}
              height={105}
              className="m-0 block h-auto w-[205px] max-w-full object-contain object-left p-0 sm:w-[225px]"
            />
          </Link>

          {/* Brand Description */}
          <p className="mt-3 max-w-sm text-sm leading-6 text-white/55">
            A focused B2B platform bringing together mining,
            infrastructure, heavy equipment, mineral processing,
            logistics and industrial technology.
          </p>

          {/* Event Details */}
          <div className="mt-5 w-full border-t border-white/10 pt-4">
            <p className="text-[9px] font-extrabold uppercase tracking-[.17em] text-white/30">
              Event
            </p>

            <p className="mt-2 text-sm font-semibold leading-6 text-white/75">
              {site.dates}
              <br />
              {site.venue}
            </p>
          </div>
        </div>

        {/* Navigation Section */}
        <div className="grid min-w-0 grid-cols-2 items-start gap-x-5 gap-y-7 sm:grid-cols-3 lg:gap-x-5">
          {groups.map((group) => (
            <div key={group.title} className="min-w-0">
              <div className="flex items-center gap-2">
                <span className="size-1.5 shrink-0 bg-brand" />

                <h3 className="text-[10px] font-extrabold uppercase tracking-[.16em] text-white">
                  {group.title}
                </h3>
              </div>

              <div className="mt-3 grid">
                {group.links.map(([label, href]) => (
                  <Link
                    key={href}
                    href={href}
                    className="group flex min-h-10 items-center justify-between gap-1 border-b border-white/[.07] py-2 text-sm text-white/55 transition-colors duration-200 hover:text-white"
                  >
                    <span>{label}</span>

                    <ArrowUpRight className="size-3.5 shrink-0 -translate-x-1 translate-y-1 text-brand opacity-0 transition-all duration-200 group-hover:translate-x-0 group-hover:translate-y-0 group-hover:opacity-100" />
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Organiser Section */}
        <div className="min-w-0 border-t border-white/10 pt-6 lg:border-l lg:border-t-0 lg:pl-6 lg:pt-0">
          <p className="text-[10px] font-extrabold uppercase tracking-[.18em] text-brand">
            Organised By
          </p>

          {/* Futurex Logo */}
          <div className="mt-2 flex flex-col items-start border-b border-white/10 pb-1">
            <Link
              href="https://futurextrade.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="m-0 flex w-fit items-center justify-start p-0 leading-none transition-opacity hover:opacity-85"
            >
              <Image
                src="/logo/futurex-logo.png"
                alt="Futurex Trade Fair & Events Pvt. Ltd."
                width={190}
                height={80}
                className="m-0 block h-auto max-h-[62px] w-auto max-w-full object-contain object-left p-0"
              />
            </Link>

            <h3 className="max-w-xs text-[14px] font-extrabold leading-5 text-white">
              Futurex Trade Fair & Events Pvt. Ltd.
            </h3>
          </div>

          {/* Contact Details */}
          <div className="mt-4 grid gap-3">
            <div className="flex items-start gap-3">
              <MapPin className="mt-1 size-4 shrink-0 text-brand" />

              <p className="text-sm leading-6 text-white/55">
                E-52, 1st Floor, Kalkaji,
                <br />
                Delhi 110019, India
              </p>
            </div>

            <Link
              href="tel:+919810855697"
              className="group flex w-fit items-center gap-3 text-sm font-semibold text-white/65 transition-colors hover:text-white"
            >
              <Phone className="size-4 shrink-0 text-brand" />
              +91 98108 55697
            </Link>

            <Link
              href="mailto:info@futurextrade.com"
              className="group flex min-w-0 items-center gap-3 text-sm font-semibold text-white/65 transition-colors hover:text-white"
            >
              <Mail className="size-4 shrink-0 text-brand" />

              <span className="break-all">
                info@futurextrade.com
              </span>
            </Link>

            <Link
              href="https://futurextrade.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex w-fit items-center gap-2 text-sm font-semibold text-white transition-colors hover:text-brand"
            >
              futurextrade.com

              <ArrowUpRight className="size-3.5 shrink-0 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </Link>
          </div>

          {/* Social Links */}
          <div className="mt-5 border-t border-white/10 pt-4">
            <p className="text-[9px] font-extrabold uppercase tracking-[.17em] text-white/30">
              Follow the Expo
            </p>

            <div className="mt-2.5 flex flex-wrap items-center gap-x-4 gap-y-2">
              {socials.map(([label, href]) => (
                <Link
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-1.5 text-[10px] font-extrabold uppercase tracking-[.1em] text-white/55 transition-colors hover:text-brand"
                >
                  {label}

                  <ArrowUpRight className="size-3 shrink-0 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </Link>
              ))}
            </div>
          </div>
        </div>
      </Container>

      {/* Bottom Strip */}
      <div className="relative border-t border-white/10 bg-white/[.015]">
        <Container className="flex flex-col gap-3 py-3.5 text-[10px] font-medium uppercase leading-5 tracking-[.08em] text-white/30 lg:flex-row lg:items-center lg:justify-between">
          <span>
            © 2027 Odisha Mining & Infrastructure International Expo
          </span>

          <div className="flex flex-wrap items-center gap-x-5 gap-y-1">
            <Link
              href="/privacy-policy"
              className="transition-colors hover:text-white"
            >
              Privacy
            </Link>

            <Link
              href="/terms"
              className="transition-colors hover:text-white"
            >
              Terms
            </Link>

            <span>
              Organised by Futurex Trade Fair & Events Pvt. Ltd.
            </span>
          </div>
        </Container>
      </div>
    </footer>
  );
}

/* Background Graphics */
function FooterGraphic() {
  return (
    <>
      <svg
        aria-hidden
        viewBox="0 0 760 600"
        className="pointer-events-none absolute -left-32 bottom-0 hidden h-[72%] w-[38%] opacity-[.06] lg:block"
        fill="none"
      >
        <path
          d="M40 560 410 165H760"
          stroke="#F9B900"
        />

        <path
          d="M145 590 500 225H760"
          stroke="#FFFFFF"
        />

        <path
          d="M285 600 610 250"
          stroke="#F9B900"
        />

        <circle
          cx="410"
          cy="165"
          r="4"
          fill="#F9B900"
        />
      </svg>

      <div
        aria-hidden
        className="pointer-events-none absolute right-0 top-[18%] hidden h-[340px] w-px bg-gradient-to-b from-transparent via-brand/25 to-transparent lg:block"
      />
    </>
  );
}
