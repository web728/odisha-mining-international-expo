import type { Metadata } from "next";

import {
  ArrowUpRight,
  HelpCircle,
  Mail,
  Phone,
} from "lucide-react";

import { Container } from "@/components/ui/Container";
import { FaqList } from "./FaqList";
import { faqItems } from "./faq.data";

const SITE_URL = "https://odishaminingexpo.com";
const PAGE_URL = `${SITE_URL}/faq`;

const EVENT_NAME =
  "5th Odisha Mining & Infrastructure International Expo 2027";

export const metadata: Metadata = {
  title: "FAQ | Visitor & Exhibitor Questions",

  description:
    "Find answers to frequently asked questions about the 5th Odisha Mining & Infrastructure International Expo 2027, including dates, visitor entry, exhibiting, registration, venue access and event information.",

  keywords: [
    "Odisha Mining Expo FAQ",
    "Odisha Mining & Infrastructure
International Expo 2027 FAQ",
    "Odisha Mining Expo Visitor Questions",
    "Mining Expo Exhibitor Questions",
    "Odisha Mining Expo Registration",
    "Mining Expo Bhubaneswar FAQ",
    "Odisha Mining & Infrastructure
International Expo Visitor Information",
  ],

  alternates: {
    canonical: "/faq",
  },

  openGraph: {
    type: "website",
    locale: "en_IN",
    url: PAGE_URL,

    title:
      "FAQ | 5th Odisha Mining & Infrastructure International Expo 2027",

    description:
      "Get answers about visiting, exhibiting, registration, venue access and event information for Odisha Mining & Infrastructure
International Expo 2027.",

    siteName: EVENT_NAME,

    images: [
      {
        url: "/image/about-hero-2.png",
        alt: "Frequently asked questions about the 5th Odisha Mining & Infrastructure International Expo 2027",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",

    title: "FAQ | Odisha Mining & Infrastructure
International Expo 2027",

    description:
      "Find answers about visiting, exhibiting, registration and venue access for the Odisha Mining & Infrastructure International Expo 2027.",

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

const jsonLd = {
  "@context": "https://schema.org",

  "@graph": [
    {
      "@type": "WebPage",
      "@id": `${PAGE_URL}#webpage`,
      url: PAGE_URL,

      name:
        "FAQ | 5th Odisha Mining & Infrastructure International Expo 2027",

      description:
        "Frequently asked questions about visiting, exhibiting, registration, venue access and event information for the 5th Odisha Mining & Infrastructure International Expo 2027.",

      inLanguage: "en-IN",

      isPartOf: {
        "@id": `${SITE_URL}/#website`,
      },

      about: {
        "@id": `${SITE_URL}/#event`,
      },

      mainEntity: {
        "@id": `${PAGE_URL}#faq`,
      },

      breadcrumb: {
        "@id": `${PAGE_URL}#breadcrumb`,
      },
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
          name: "FAQ",
          item: PAGE_URL,
        },
      ],
    },

    {
      "@type": "FAQPage",
      "@id": `${PAGE_URL}#faq`,
      url: PAGE_URL,

      name:
        "Frequently Asked Questions | 5th Odisha Mining & Infrastructure International Expo 2027",

      inLanguage: "en-IN",

      isPartOf: {
        "@id": `${PAGE_URL}#webpage`,
      },

      about: {
        "@id": `${SITE_URL}/#event`,
      },

      mainEntity: faqItems.map(
        ({ question, answer }) => ({
          "@type": "Question",
          name: question,

          acceptedAnswer: {
            "@type": "Answer",
            text: answer,
          },
        }),
      ),
    },
  ],
};

export default function FAQ() {
  return (
    <>
      <section
        aria-labelledby="faq-hero-heading"
        className="relative isolate overflow-hidden bg-brand-black text-white"
      >
        <HeroGraphic />

        <Container className="relative z-10 flex min-h-[360px] items-end py-14 sm:min-h-[400px] lg:py-16">
          <div className="max-w-4xl">
            <div className="flex items-center gap-3">
              <span
                aria-hidden="true"
                className="h-[2px] w-10 bg-brand"
              />

              <p className="text-[10px] font-extrabold uppercase tracking-[.18em] text-brand">
                FAQ
              </p>
            </div>

            <h1
              id="faq-hero-heading"
              className="mt-4 text-[clamp(2.7rem,5vw,5rem)] font-black leading-[.96] tracking-[-.055em]"
            >
              Frequently Asked
              <span className="text-brand">
                {" "}
                Questions.
              </span>
            </h1>

            <p className="mt-5 max-w-3xl text-sm leading-7 text-white/70 sm:text-base">
              Everything you need to know before you exhibit or visit — dates,
              entry, booking and getting there.
            </p>
          </div>
        </Container>
      </section>

      <section
        aria-labelledby="faq-help-heading"
        className="section-space bg-white"
      >
        <Container className="grid gap-12 lg:grid-cols-[.72fr_1.28fr] lg:items-start lg:gap-16">
          <div className="lg:sticky lg:top-[110px]">
            <div className="flex items-center gap-3">
              <span
                aria-hidden="true"
                className="h-[2px] w-10 bg-brand"
              />

              <p className="text-[10px] font-extrabold uppercase tracking-[.18em] text-zinc-950">
                Help Centre
              </p>
            </div>

            <h2
              id="faq-help-heading"
              className="mt-4 max-w-lg text-[clamp(2rem,3vw,3.25rem)] font-black leading-[1.02] tracking-[-.045em] text-zinc-950"
            >
              Questions and
              <span className="text-brand">
                {" "}
                answers.
              </span>
            </h2>

            <p className="mt-5 max-w-md text-sm leading-7 text-zinc-700">
              Find quick information about visiting, exhibiting, venue access,
              registrations and event documents.
            </p>

            <div className="mt-8 border-t border-zinc-200 pt-7">
              <p className="text-[10px] font-extrabold uppercase tracking-[.16em] text-zinc-500">
                Still have a question?
              </p>

              <h3 className="mt-2 text-xl font-black tracking-[-.025em] text-zinc-950">
                Contact the exhibition team.
              </h3>

              <div className="mt-5 grid gap-3">
                <a
                  href="tel:+919810855697"
                  aria-label="Call the exhibition team at +91 98108 55697"
                  className="group flex items-center justify-between border border-zinc-200 px-4 py-4 transition hover:border-brand hover:bg-[#f4f4f1]"
                >
                  <span className="flex items-center gap-3">
                    <Phone
                      aria-hidden="true"
                      className="size-4 text-brand-dark"
                    />

                    <span className="text-sm font-bold text-zinc-950">
                      +91 98108 55697
                    </span>
                  </span>

                  <ArrowUpRight
                    aria-hidden="true"
                    className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  />
                </a>

                <a
                  href="mailto:info@futurextrade.com"
                  aria-label="Email the exhibition team at info@futurextrade.com"
                  className="group flex items-center justify-between border border-zinc-200 px-4 py-4 transition hover:border-brand hover:bg-[#f4f4f1]"
                >
                  <span className="flex items-center gap-3">
                    <Mail
                      aria-hidden="true"
                      className="size-4 text-brand-dark"
                    />

                    <span className="text-sm font-bold text-zinc-950">
                      info@futurextrade.com
                    </span>
                  </span>

                  <ArrowUpRight
                    aria-hidden="true"
                    className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  />
                </a>

                <a
                  href="/contact"
                  aria-label="Contact the Odisha Mining Expo exhibition team"
                  className="group mt-1 inline-flex min-h-12 items-center justify-center gap-3 bg-brand-black px-5 text-[11px] font-extrabold uppercase tracking-[.09em] !text-white transition-colors hover:bg-brand hover:!text-brand-black"
                >
                  Contact the Team

                  <ArrowUpRight
                    aria-hidden="true"
                    className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  />
                </a>
              </div>
            </div>
          </div>

          <div className="relative">
            <span
              aria-hidden="true"
              className="absolute -right-4 -top-4 hidden h-24 w-24 border-r border-t border-brand/60 lg:block"
            />

            <div className="relative border border-zinc-200 bg-[#f4f4f1] p-6 shadow-[0_20px_70px_rgba(0,0,0,.05)] sm:p-8 lg:p-10">
              <span
                aria-hidden="true"
                className="absolute left-0 top-0 h-[3px] w-24 bg-brand"
              />

              <div className="flex items-start justify-between gap-5">
                <div>
                  <p className="text-[10px] font-extrabold uppercase tracking-[.18em] text-zinc-950">
                    Common Questions
                  </p>

                  <h2
                    id="faq-list-heading"
                    className="mt-2 text-2xl font-black tracking-[-.04em] text-zinc-950 sm:text-3xl"
                  >
                    Find your
                    <span className="text-brand">
                      {" "}
                      answer.
                    </span>
                  </h2>
                </div>

                <span
                  aria-hidden="true"
                  className="hidden size-12 place-items-center border border-zinc-300 bg-white sm:grid"
                >
                  <HelpCircle
                    aria-hidden="true"
                    className="size-5 text-brand-dark"
                  />
                </span>
              </div>

              <div
                aria-labelledby="faq-list-heading"
                className="mt-7"
              >
                <FaqList />
              </div>
            </div>
          </div>
        </Container>
      </section>

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