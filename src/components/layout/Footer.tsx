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
    title: "More",
    links: [
      ["About the Show", "/about"],
      ["Why Odisha", "/why-odisha"],
      ["Venue & Floor Plan", "/venue"],
      ["FAQ", "/faq"],
      ["Contact", "/contact"],
    ],
  },
] as const;

const socials = [
  ["Facebook", "https://www.facebook.com/odishaminingexpo/"],
  ["LinkedIn", "https://www.linkedin.com/company/odishaminingexpo/"],
  ["X", "https://x.com/odisaminingexpo"],
] as const;

export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-brand-black text-white">
      <FooterGraphic />

      <Container className="relative grid gap-12 py-14 lg:grid-cols-[1.25fr_1.35fr_1fr] lg:gap-14 lg:py-16">
        {/* Brand */}
        <div>
          <Link href="/" className="inline-block">
            <Image
              src="/image/5th-Odisha-Logo_White.png"
              alt="Odisha Mining & Infrastructure International Expo"
              width={250}
              height={105}
              className="h-auto w-[210px] object-contain sm:w-[240px]"
            />
          </Link>

          <p className="mt-6 max-w-md text-sm leading-7 text-white/65">
            India&apos;s premier platform for mining, infrastructure, heavy
            equipment & industrial innovation. {site.dates}, {site.venue}.
          </p>

          <div className="mt-7 flex items-center gap-3">
            <span className="h-[2px] w-10 bg-brand" />
            <span className="text-[10px] font-extrabold uppercase tracking-[.18em] text-brand">
              Mining · Infrastructure · Innovation
            </span>
          </div>
        </div>

        {/* Navigation */}
        <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
          {groups.map((group) => (
            <div key={group.title}>
              <h3 className="text-xs font-extrabold uppercase tracking-[.15em] text-white">
                {group.title}
              </h3>

              <div className="mt-5 grid gap-3">
                {group.links.map(([label, href]) => (
                  <Link
                    key={label}
                    href={href}
                    className="group flex w-fit items-center gap-1.5 text-sm text-white/60 transition duration-300 hover:text-brand"
                  >
                    {label}

                    <ArrowUpRight className="size-3 translate-y-1 opacity-0 transition duration-300 group-hover:translate-y-0 group-hover:opacity-100" />
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Futurex / Contact */}
        <div className="lg:border-l lg:border-white/10 lg:pl-10">
          <p className="text-[10px] font-extrabold uppercase tracking-[.18em] text-brand">
            Head Office
          </p>

          <Image
            src="/image/futurextrade.png"
            alt="Futurex Trade Fair & Events Pvt. Ltd."
            width={190}
            height={80}
            className="mt-4 max-h-16 w-auto object-contain"
          />

          <h3 className="mt-5 text-base font-extrabold leading-6">
            Futurex Trade Fair & Events Pvt. Ltd.
          </h3>

          <div className="mt-5 grid gap-3 text-sm text-white/65">
            <p className="flex items-start gap-3 leading-6">
              <MapPin className="mt-1 size-4 shrink-0 text-brand" />
              E-52, 1st Floor, Kalkaji, Delhi 110019, India
            </p>

            <Link
              href="tel:+919810855697"
              className="flex w-fit items-center gap-3 transition hover:text-brand"
            >
              <Phone className="size-4 text-brand" />
              +91 98108 55697
            </Link>

            <Link
              href="mailto:info@futurextrade.com"
              className="flex w-fit items-center gap-3 transition hover:text-brand"
            >
              <Mail className="size-4 text-brand" />
              info@futurextrade.com
            </Link>

            <Link
              href="https://futurextrade.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex w-fit items-center gap-2 font-semibold text-white transition hover:text-brand"
            >
              www.futurextrade.com
              <ArrowUpRight className="size-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </Link>
          </div>

          <div className="mt-7 border-t border-white/10 pt-5">
            <p className="mb-3 text-[10px] font-extrabold uppercase tracking-[.18em] text-white/45">
              Follow the Expo
            </p>

            <div className="flex flex-wrap gap-x-5 gap-y-2">
              {socials.map(([label, href]) => (
                <Link
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-[.08em] text-white/65 transition hover:text-brand"
                >
                  {label}
                  <ArrowUpRight className="size-3 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </Link>
              ))}
            </div>
          </div>
        </div>
      </Container>

      <div className="border-t border-white/10">
        <Container className="flex flex-col gap-3 py-5 text-[11px] leading-5 text-white/40 sm:flex-row sm:items-center sm:justify-between">
          <span>
            © 2027 Odisha Mining & Infrastructure International Expo.
            All rights reserved.
          </span>

          <span>
            Organised by{" "}
            <strong className="font-semibold text-white/70">
              Futurex Trade Fair & Events Pvt. Ltd.
            </strong>
          </span>
        </Container>
      </div>
    </footer>
  );
}

function FooterGraphic() {
  return (
    <svg
      aria-hidden
      viewBox="0 0 700 500"
      className="pointer-events-none absolute -left-24 bottom-0 hidden h-[75%] w-[35%] opacity-[.055] lg:block"
      fill="none"
    >
      <path d="M40 480 390 130H700" stroke="#F9B900" />
      <path d="M150 500 480 180H700" stroke="#fff" />
      <path d="M290 500 600 190" stroke="#F9B900" />
      <circle cx="390" cy="130" r="4" fill="#F9B900" />
    </svg>
  );
}