import type { Metadata } from "next";
import {
  ArrowUpRight,
  Building2,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
} from "lucide-react";

import { Container } from "@/components/ui/Container";
import { BottomCTA } from "@/components/shared/BottomCTA";
import { ContactForm } from "./ContactForm";

export const metadata: Metadata = {
  title: "Contact",
  description: "Contact the Odisha Mining Expo 2027 team.",
  alternates: { canonical: "/contact" },
};

const team = [
  {
    name: "Mr. Namit Gupta",
    phone: "+91 98108 55697",
    tel: "+919810855697",
    email: "namit@futurextrade.com",
  },
  {
    name: "Mr. Soumo Roy",
    phone: "+91 80105 79828",
    tel: "+918010579828",
    email: "soumo@futurextrade.com",
  },
];

export default function Contact() {
  return (
    <>
      {/* HERO */}
      <section className="relative isolate overflow-hidden bg-brand-black text-white">
        <HeroGraphic />

        <Container className="relative z-10 flex min-h-[360px] items-end py-14 sm:min-h-[400px] lg:py-16">
          <div className="max-w-4xl">
            <Eyebrow dark>Contact</Eyebrow>

            <h1 className="mt-4 text-[clamp(2.8rem,5vw,5rem)] font-black leading-[.96] tracking-[-.055em]">
              Get in <span className="text-brand">Touch.</span>
            </h1>

            <p className="mt-5 max-w-3xl text-sm leading-7 text-white/70 sm:text-base">
              Stand bookings, visitor registration, partnerships and media
              enquiries — the team is ready to help.
            </p>
          </div>
        </Container>
      </section>

      {/* CONTACT */}
      <section className="section-space bg-white">
        <Container className="grid gap-12 lg:grid-cols-[.82fr_1.18fr] lg:gap-16 xl:gap-20">
          {/* LEFT */}
          <div>
            <Eyebrow>Please contact for more details</Eyebrow>

            <h2 className="mt-4 text-[clamp(2rem,3vw,3.2rem)] font-black leading-[1.02] tracking-[-.045em] text-zinc-950">
              The <span className="text-brand">team.</span>
            </h2>

            <p className="mt-4 max-w-md text-sm leading-7 text-zinc-600">
              Connect directly with our team for exhibition, visitor,
              partnership and event-related enquiries.
            </p>

            {/* TEAM */}
            <div className="mt-8 grid border-l border-t border-zinc-200 sm:grid-cols-2 lg:grid-cols-1">
              {team.map((person, index) => (
                <article
                  key={person.email}
                  className="group relative overflow-hidden border-b border-r border-zinc-200 bg-white p-6 transition-all duration-500 hover:-translate-y-1 hover:bg-brand-black hover:shadow-[0_18px_50px_rgba(0,0,0,.12)]"
                >
                  <div className="flex items-start justify-between gap-6">
                    <div>
                      <span className="text-[9px] font-extrabold tracking-[.18em] text-zinc-400 transition group-hover:text-brand">
                        {String(index + 1).padStart(2, "0")}
                      </span>

                      <h3 className="mt-3 text-xl font-black tracking-[-.025em] text-zinc-950 transition group-hover:text-white">
                        {person.name}
                      </h3>
                    </div>

                    <span className="grid size-10 shrink-0 place-items-center border border-zinc-200 transition group-hover:border-brand/40 group-hover:bg-brand/10">
                      <Phone className="size-4 text-brand-dark group-hover:text-brand" />
                    </span>
                  </div>

                  <div className="mt-5 grid gap-3 text-sm">
                    <a
                      href={`tel:${person.tel}`}
                      className="flex w-fit items-center gap-3 text-zinc-700 transition group-hover:text-white/70 hover:!text-brand"
                    >
                      <Phone className="size-4 text-brand" />
                      {person.phone}
                    </a>

                    <a
                      href={`mailto:${person.email}`}
                      className="flex w-fit items-center gap-3 text-zinc-700 transition group-hover:text-white/70 hover:!text-brand"
                    >
                      <Mail className="size-4 text-brand" />
                      {person.email}
                    </a>
                  </div>

                  <span className="absolute inset-x-0 bottom-0 h-[3px] origin-left scale-x-0 bg-brand transition-transform duration-500 group-hover:scale-x-100" />
                </article>
              ))}
            </div>

            {/* OFFICE */}
            <div className="mt-10 border-t border-zinc-200 pt-8">
              <Eyebrow>Head Office</Eyebrow>

              <h3 className="mt-4 max-w-md text-xl font-black leading-[1.2] tracking-[-.03em] text-zinc-950 sm:text-2xl">
                Futurex Trade Fair & Events Pvt. Ltd.
              </h3>

              <div className="mt-6 grid gap-4">
                <ContactRow icon={MapPin}>
                  E-52, 1st Floor, Kalkaji, Delhi 110019, India
                </ContactRow>

                <ContactRow icon={Phone}>
                  <a
                    href="tel:+919810855697"
                    className="transition hover:text-brand-dark"
                  >
                    +91 98108 55697
                  </a>
                </ContactRow>

                <ContactRow icon={Mail}>
                  <a
                    href="mailto:info@futurextrade.com"
                    className="transition hover:text-brand-dark"
                  >
                    info@futurextrade.com
                  </a>
                </ContactRow>

                <ContactRow icon={Building2}>
                  <a
                    href="https://futurextrade.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group/link inline-flex items-center gap-2 font-semibold text-zinc-950 transition hover:text-brand-dark"
                  >
                    www.futurextrade.com
                    <ArrowUpRight className="size-3.5 transition-transform duration-300 group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5" />
                  </a>
                </ContactRow>
              </div>

              <a
                href="https://wa.me/919810855697"
                target="_blank"
                rel="noopener noreferrer"
                className="group mt-7 inline-flex min-h-12 items-center gap-3 border border-brand-black bg-brand-black px-5 text-[11px] font-extrabold uppercase tracking-[.08em] text-white transition duration-300 hover:-translate-y-0.5 hover:border-brand hover:bg-brand hover:text-brand-black"
              >
                <MessageCircle className="size-4" />
                Message us on WhatsApp
                <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </a>
            </div>
          </div>

          {/* FORM */}
          <div className="relative self-start lg:sticky lg:top-[110px]">
            <span className="absolute -right-4 -top-4 hidden h-24 w-24 border-r border-t border-brand/60 lg:block" />

            <div className="relative border border-zinc-200 bg-[#f4f4f1] p-6 shadow-[0_20px_70px_rgba(0,0,0,.06)] sm:p-8 lg:p-10">
              <span className="absolute left-0 top-0 h-[3px] w-24 bg-brand" />

              <Eyebrow>Send us a message</Eyebrow>

              <h2 className="mt-4 text-[clamp(2rem,3vw,3.2rem)] font-black leading-[1.02] tracking-[-.045em] text-zinc-950">
                Enquiry <span className="text-brand">form.</span>
              </h2>

              <p className="mt-4 max-w-xl text-sm leading-7 text-zinc-700">
                Share your enquiry with our team and we&apos;ll help with
                exhibition, visiting, partnerships or general information.
              </p>

              <div className="mt-8">
                <ContactForm />
              </div>
            </div>
          </div>
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

function ContactRow({
  icon: Icon,
  children,
}: {
  icon: React.ElementType;
  children: React.ReactNode;
}) {
  return (
    <div className="group flex items-start gap-3 text-sm text-zinc-700">
      <span className="grid size-10 shrink-0 place-items-center border border-zinc-200 bg-[#f4f4f1] transition group-hover:border-brand">
        <Icon className="size-4 text-brand-dark" />
      </span>

      <div className="pt-2 leading-6">{children}</div>
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