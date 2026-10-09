
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

const SITE_URL = "https://odishaminingexpo.com";
const PAGE_URL = `${SITE_URL}/contact`;

const EVENT_NAME =
  "5th Odisha Mining & Infrastructure International Expo 2027";

const ORGANIZER_NAME =
  "Futurex Trade Fair & Events Pvt. Ltd.";

const SEO_TITLE =
  "Contact Odisha Mining Expo 2027 | Exhibitor & Visitor Enquiries";

const SEO_DESCRIPTION =
  "Contact the Odisha Mining Expo 2027 team for exhibitor enquiries, stand bookings, visitor registration, sponsorship and event information in Bhubaneswar.";

export const metadata: Metadata = {
  title: SEO_TITLE,

  description: SEO_DESCRIPTION,

  keywords: [
    "Odisha Mining Expo Contact",
    "Odisha Mining & Infrastructure International Expo 2027 Contact",
    "Odisha Mining Expo Team",
    "Mining Expo Bhubaneswar Contact",
    "Mining Exhibition Exhibitor Enquiry",
    "Futurex Trade Fair Contact",
    "Mining Expo India Contact",
  ],

  alternates: {
    canonical: "/contact",
  },

  openGraph: {
    type: "website",
    locale: "en_IN",
    url: PAGE_URL,

    title: SEO_TITLE,

    description: SEO_DESCRIPTION,

    siteName: EVENT_NAME,

    images: [
      {
        url: "/image/about-hero-2.png",
        alt: "Contact the 5th Odisha Mining & Infrastructure International Expo 2027 team",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",

    title: SEO_TITLE,

    description: SEO_DESCRIPTION,

    images: ["/image/about-hero-2.png"],
  },

  robots: {
    index: true,
    follow: true,

    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
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
] as const;

const jsonLd = {
  "@context": "https://schema.org",

  "@graph": [
    {
      "@type": "ContactPage",
      "@id": `${PAGE_URL}#webpage`,

      url: PAGE_URL,

      name: SEO_TITLE,

      description: SEO_DESCRIPTION,

      inLanguage: "en-IN",

      isPartOf: {
        "@id": `${SITE_URL}/#website`,
      },

      about: {
        "@id": `${SITE_URL}/#event`,
      },

      breadcrumb: {
        "@id": `${PAGE_URL}#breadcrumb`,
      },

      mainEntity: {
        "@id": `${PAGE_URL}#organizer`,
      },
    },

    {
      "@type": "Organization",

      "@id": `${PAGE_URL}#organizer`,

      name: ORGANIZER_NAME,

      url: "https://futurextrade.com/",

      telephone: "+91 98108 55697",

      email: "info@futurextrade.com",

      address: {
        "@type": "PostalAddress",
        streetAddress: "E-52, 1st Floor, Kalkaji",
        addressLocality: "Delhi",
        postalCode: "110019",
        addressCountry: "IN",
      },

      contactPoint: [
        {
          "@type": "ContactPoint",
          name: "Mr. Namit Gupta",
          telephone: "+91 98108 55697",
          email: "namit@futurextrade.com",
          contactType: "exhibitor and event enquiries",
          availableLanguage: ["English", "Hindi"],
        },
        {
          "@type": "ContactPoint",
          name: "Mr. Soumo Roy",
          telephone: "+91 80105 79828",
          email: "soumo@futurextrade.com",
          contactType: "exhibitor and event enquiries",
          availableLanguage: ["English", "Hindi"],
        },
      ],
    },

    {
      "@type": "BreadcrumbList",

      "@id": `${PAGE_URL}#breadcrumb`,

      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: `${SITE_URL}/`,
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Contact",
          item: PAGE_URL,
        },
      ],
    },
  ],
};

export default function Contact() {
  return (
    <>
      {/* HERO */}
      <section
        aria-labelledby="contact-hero-heading"
        className="relative isolate overflow-hidden bg-brand-black text-white"
      >
        <HeroGraphic />

        <Container className="relative z-10 flex min-h-[360px] items-end py-14 sm:min-h-[400px] lg:py-16">
          <div className="max-w-4xl">
            <Eyebrow dark>
              Contact
            </Eyebrow>

            <h1
              id="contact-hero-heading"
              className="mt-4 text-[clamp(2.8rem,5vw,5rem)] font-black leading-[.96] tracking-[-.055em]"
            >
              Get in{" "}
              <span className="text-brand">
                Touch.
              </span>
            </h1>

            <p className="mt-5 max-w-3xl text-sm leading-7 text-white/70 sm:text-base">
              Stand bookings, visitor registration, partnerships and media
              enquiries — the team is ready to help.
            </p>
          </div>
        </Container>
      </section>

      {/* CONTACT */}
      <section
        aria-labelledby="contact-team-heading"
        className="section-space bg-white"
      >
        <Container className="grid gap-12 lg:grid-cols-[.82fr_1.18fr] lg:gap-16 xl:gap-20">
          {/* LEFT */}
          <div>
            <Eyebrow>
              Please contact for more details
            </Eyebrow>

            <h2
              id="contact-team-heading"
              className="mt-4 text-[clamp(2rem,3vw,3.2rem)] font-black leading-[1.02] tracking-[-.045em] text-zinc-950"
            >
              The{" "}
              <span className="text-brand">
                team.
              </span>
            </h2>

            <p className="mt-4 max-w-md text-sm leading-7 text-zinc-600">
              Connect directly with our team for exhibition, visitor,
              partnership and event-related enquiries.
            </p>

            {/* TEAM */}
            <div className="mt-8 grid border-l border-t border-zinc-200 sm:grid-cols-2 lg:grid-cols-1">
              {team.map((person, index) => {
                const headingId =
                  `contact-person-${index + 1}`;

                return (
                  <article
                    key={person.email}
                    aria-labelledby={headingId}
                    className="group relative overflow-hidden border-b border-r border-zinc-200 bg-white p-6 transition-all duration-500 hover:-translate-y-1 hover:bg-brand-black hover:shadow-[0_18px_50px_rgba(0,0,0,.12)]"
                  >
                    <div className="flex items-start justify-between gap-6">
                      <div>
                        <span
                          aria-hidden="true"
                          className="text-[9px] font-extrabold tracking-[.18em] text-zinc-400 transition group-hover:text-brand"
                        >
                          {String(index + 1).padStart(
                            2,
                            "0",
                          )}
                        </span>

                        <h3
                          id={headingId}
                          className="mt-3 text-xl font-black tracking-[-.025em] text-zinc-950 transition group-hover:text-white"
                        >
                          {person.name}
                        </h3>
                      </div>

                      <span
                        aria-hidden="true"
                        className="grid size-10 shrink-0 place-items-center border border-zinc-200 transition group-hover:border-brand/40 group-hover:bg-brand/10"
                      >
                        <Phone
                          aria-hidden="true"
                          className="size-4 text-brand-dark group-hover:text-brand"
                        />
                      </span>
                    </div>

                    <div className="mt-5 grid gap-3 text-sm">
                      <a
                        href={`tel:${person.tel}`}
                        aria-label={`Call ${person.name} at ${person.phone}`}
                        className="
                          flex
                          w-fit
                          items-center
                          gap-3
                          !text-zinc-950
                          no-underline
                          transition-colors
                          duration-300
                          group-hover:!text-white
                          hover:!text-brand
                        "
                      >
                        <Phone
                          aria-hidden="true"
                          className="size-4 shrink-0 !text-brand"
                        />

                        <span>
                          {person.phone}
                        </span>
                      </a>

                      <a
                        href={`mailto:${person.email}`}
                        aria-label={`Email ${person.name} at ${person.email}`}
                        className="
                          flex
                          w-fit
                          items-center
                          gap-3
                          !text-zinc-950
                          no-underline
                          transition-colors
                          duration-300
                          group-hover:!text-white
                          hover:!text-brand
                        "
                      >
                        <Mail
                          aria-hidden="true"
                          className="size-4 shrink-0 !text-brand"
                        />

                        <span>
                          {person.email}
                        </span>
                      </a>
                    </div>

                    <span
                      aria-hidden="true"
                      className="absolute inset-x-0 bottom-0 h-[3px] origin-left scale-x-0 bg-brand transition-transform duration-500 group-hover:scale-x-100"
                    />
                  </article>
                );
              })}
            </div>

            {/* OFFICE */}
            <div className="mt-10 border-t border-zinc-200 pt-8">
              <Eyebrow>
                Head Office
              </Eyebrow>

              <h3 className="mt-4 max-w-md text-xl font-black leading-[1.2] tracking-[-.03em] text-zinc-950 sm:text-2xl">
                Futurex Trade Fair & Events Pvt. Ltd.
              </h3>

              <address className="mt-6 grid gap-4 not-italic">
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
                    aria-label="Visit the Futurex Trade Fair and Events website"
                    className="group/link inline-flex items-center gap-2 font-semibold text-zinc-950 transition hover:text-brand-dark"
                  >
                    www.futurextrade.com

                    <ArrowUpRight
                      aria-hidden="true"
                      className="size-3.5 transition-transform duration-300 group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5"
                    />
                  </a>
                </ContactRow>
              </address>

              <a
                href="https://wa.me/919810855697"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Message the Odisha Mining Expo team on WhatsApp"
                className="
                  group
                  mt-7
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
                  hover:!border-[#d99d00]
                  hover:!bg-[#d99d00]
                  hover:!text-white
                "
              >
                <MessageCircle
                  aria-hidden="true"
                  className="size-4 shrink-0 !text-white transition-transform duration-300 group-hover:scale-105"
                />

                <span className="whitespace-nowrap">
                  Message us on WhatsApp
                </span>

                <ArrowUpRight
                  aria-hidden="true"
                  className="
                    size-4
                    shrink-0
                    !text-white
                    transition-transform
                    duration-300
                    group-hover:-translate-y-0.5
                    group-hover:translate-x-0.5
                  "
                />
              </a>
            </div>
          </div>

          {/* FORM */}
          <div className="relative self-start lg:sticky lg:top-[110px]">
            <span
              aria-hidden="true"
              className="absolute -right-4 -top-4 hidden h-24 w-24 border-r border-t border-brand/60 lg:block"
            />

            <div className="relative border border-zinc-200 bg-[#f4f4f1] p-6 shadow-[0_20px_70px_rgba(0,0,0,.06)] sm:p-8 lg:p-10">
              <span
                aria-hidden="true"
                className="absolute left-0 top-0 h-[3px] w-24 bg-brand"
              />

              <Eyebrow>
                Send us a message
              </Eyebrow>

              <h2
                id="contact-form-heading"
                className="mt-4 text-[clamp(2rem,3vw,3.2rem)] font-black leading-[1.02] tracking-[-.045em] text-zinc-950"
              >
                Enquiry{" "}
                <span className="text-brand">
                  form.
                </span>
              </h2>

              <p className="mt-4 max-w-xl text-sm leading-7 text-zinc-700">
                Share your enquiry with our team and we&apos;ll help with
                exhibition, visiting, partnerships or general information.
              </p>

              <div
                aria-labelledby="contact-form-heading"
                className="mt-8"
              >
                <ContactForm />
              </div>
            </div>
          </div>
        </Container>
      </section>

      <BottomCTA />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(
            /</g,
            "\\u003c",
          ),
        }}
      />
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
      <span
        aria-hidden="true"
        className="h-[2px] w-10 bg-brand"
      />

      <p
        className={`text-[10px] font-extrabold uppercase tracking-[.18em] ${
          dark
            ? "text-brand"
            : "text-zinc-950"
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
      <span
        aria-hidden="true"
        className="grid size-10 shrink-0 place-items-center border border-zinc-200 bg-[#f4f4f1] transition group-hover:border-brand"
      >
        <Icon
          aria-hidden="true"
          className="size-4 text-brand-dark"
        />
      </span>

      <div className="pt-2 leading-6">
        {children}
      </div>
    </div>
  );
}

function HeroGraphic() {
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      viewBox="0 0 760 400"
      className="pointer-events-none absolute right-0 top-0 hidden h-full w-[42%] lg:block"
      preserveAspectRatio="xMaxYMin slice"
    >
      <polygon
        points="180,0 760,0 760,120 500,255"
        fill="#F9B900"
      />

      <polygon
        points="500,255 760,120 760,235 535,330"
        fill="#8F6400"
      />

      <path
        d="M500 255 760 120"
        stroke="#FFD84A"
        strokeOpacity=".35"
      />
    </svg>
  );
}
