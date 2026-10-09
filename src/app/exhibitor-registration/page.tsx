import type { Metadata } from "next";
import {
  ArrowUpRight,
  Building2,
  Handshake,
  MessageCircle,
  Phone,
  Users,
  Zap,
} from "lucide-react";
import { Container } from "@/components/ui/Container";
import { ExhibitorForm } from "./ExhibitorForm";
const SITE_URL = "https://odishaminingexpo.com";
const PAGE_URL = `${SITE_URL}/exhibitor-registration`;
const EVENT_NAME =
  "5th Odisha Mining & Infrastructure International Expo 2027";
const SEO_TITLE =
  "Mining Expo 2027 Stall Booking | Exhibitor Registration Odisha";
const SEO_DESCRIPTION =
  "Book your exhibition stall at Odisha Mining Expo 2027 in Bhubaneswar, 7–10 January. Submit your exhibitor enquiry for stand options, space and participation details.";
export const metadata: Metadata = {
  title: SEO_TITLE,
  description:
    SEO_DESCRIPTION,
  keywords: [
    "Exhibitor Registration Odisha Mining Expo",
    "Book Exhibition Stand",
    "Odisha Mining & Infrastructure International Expo 2027 Exhibitor Form",
    "Mining Expo Stand Booking",
    "B2B Mining Exhibition Registration",
    "Heavy Machinery Trade Show Stand",
    "Bhubaneswar Expo Registration",
  ],
  alternates: {
    canonical: "/exhibitor-registration",
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: PAGE_URL,
    title: SEO_TITLE,
    description:
      SEO_DESCRIPTION,
    siteName: EVENT_NAME,
    images: [
      {
        url: "/image/about-hero-2.png",
        alt: "Exhibitor registration for the 5th Odisha Mining & Infrastructure International Expo 2027",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: SEO_TITLE,
    description:
      SEO_DESCRIPTION,
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
        SEO_TITLE,
      description:
        SEO_DESCRIPTION,
      inLanguage: "en-IN",
      isPartOf: {
        "@id": `${SITE_URL}/#website`,
      },
      about: {
        "@id": `${SITE_URL}/#event`,
      },
      mainEntity: {
        "@id": `${SITE_URL}/#event`,
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
          name: "Exhibitor Registration",
          item: PAGE_URL,
        },
      ],
    },
  ],
};
const highlights = [
  {
    icon: Building2,
    value: "200+",
    label: "Exhibitors",
    text: "Join mining & infrastructure brands from India and 10+ countries.",
  },
  {
    icon: Users,
    value: "20,000+",
    label: "Visitors",
    text: "Meet mine owners, contractors, government buyers and distributors face to face.",
  },
  {
    icon: Zap,
    value: "Fast",
    label: "Response",
    text: "Our sales team responds to every enquiry within one working day.",
  },
];
export default function Page() {
  return (
    <>
      <section
        aria-labelledby="exhibitor-registration-heading"
        className="relative isolate overflow-hidden bg-brand-black text-white"
      >
        <HeroGraphic />
        <Container className="relative z-10 flex min-h-[380px] items-end py-14 sm:min-h-[420px] lg:py-16">
          <div className="max-w-4xl">
            <Eyebrow dark>Exhibit · Odisha Mining & Infrastructure
International Expo 2027</Eyebrow>
            <h1
              id="exhibitor-registration-heading"
              className="mt-4 text-[clamp(2.7rem,5vw,5rem)] font-black leading-[.96] tracking-[-.055em]"
            >
              Exhibitor
              <span className="text-brand"> Registration.</span>
            </h1>
            <p className="mt-5 max-w-3xl text-sm leading-7 text-white/70 sm:text-base">
              Book your stand for 07–10 January 2027 at Baramunda Exhibition
              Ground, Bhubaneswar.
            </p>
            <div
              aria-label="Event details"
              className="mt-6 flex flex-wrap gap-x-6 gap-y-3 text-xs font-semibold text-white/65"
            >
              <span>
                <time dateTime="2027-01-07">07</time>
                {" – "}
                <time dateTime="2027-01-10">10 January 2027</time>
              </span>
              <span aria-hidden="true" className="text-brand">
                •
              </span>
              <address className="not-italic">
                Bhubaneswar, Odisha
              </address>
              <span aria-hidden="true" className="text-brand">
                •
              </span>
              <span>Indoor & Outdoor Exhibition</span>
            </div>
          </div>
        </Container>
      </section>
      <section
        aria-labelledby="book-stand-heading"
        className="section-space bg-white"
      >
        <Container className="grid gap-12 lg:grid-cols-[.72fr_1.28fr] lg:items-start lg:gap-16">
          <div className="lg:sticky lg:top-[110px]">
            <Eyebrow>Book Your Stand</Eyebrow>
            <h2
              id="book-stand-heading"
              className="mt-4 max-w-xl text-[clamp(2rem,3vw,3.3rem)] font-black leading-[1.02] tracking-[-.045em] text-zinc-950"
            >
              Put your brand in front of
              <span className="text-brand">
                {" "}
                serious industry buyers.
              </span>
            </h2>
            <p className="mt-5 max-w-lg text-sm leading-7 text-zinc-700">
              Complete the stand enquiry form with your company, product and
              space requirements. Our exhibition team will contact you with
              suitable participation options.
            </p>
            <div className="mt-8 grid border-l border-t border-zinc-200">
              {highlights.map(
                ({
                  icon: Icon,
                  value,
                  label,
                  text,
                }) => (
                  <article
                    key={label}
                    aria-labelledby={`registration-highlight-${label
                      .toLowerCase()
                      .replaceAll(" ", "-")}`}
                    className="group border-b border-r border-zinc-200 p-5 transition duration-300 hover:bg-brand-black"
                  >
                    <div className="flex items-start gap-4">
                      <span
                        aria-hidden="true"
                        className="grid size-11 shrink-0 place-items-center border border-zinc-200 transition group-hover:border-brand/40 group-hover:bg-brand/10"
                      >
                        <Icon
                          aria-hidden="true"
                          className="size-5 text-brand-dark group-hover:text-brand"
                        />
                      </span>
                      <div>
                        <p className="text-2xl font-black tracking-[-.04em] text-zinc-950 transition group-hover:text-brand">
                          {value}
                        </p>
                        <h3
                          id={`registration-highlight-${label
                            .toLowerCase()
                            .replaceAll(" ", "-")}`}
                          className="mt-1 text-xs font-extrabold uppercase tracking-[.1em] text-zinc-950 transition group-hover:text-white"
                        >
                          {label}
                        </h3>
                        <p className="mt-2 text-sm leading-6 text-zinc-600 transition group-hover:text-white/65">
                          {text}
                        </p>
                      </div>
                    </div>
                  </article>
                ),
              )}
            </div>
            <div className="mt-8 border-t border-zinc-200 pt-7">
              <p className="text-[10px] font-extrabold uppercase tracking-[.16em] text-zinc-500">
                Prefer to talk directly?
              </p>
              <h3 className="mt-2 text-lg font-black text-zinc-950">
                Mr. Namit Gupta
              </h3>
              <div className="mt-4 flex flex-wrap gap-3">
                <a
                  href="tel:+919810855697"
                  aria-label="Call Mr. Namit Gupta at +91 98108 55697"
                  className="inline-flex min-h-11 items-center gap-2 border border-zinc-300 px-4 text-xs font-bold text-zinc-950 transition hover:border-brand"
                >
                  <Phone
                    aria-hidden="true"
                    className="size-4 text-brand-dark"
                  />
                  +91 98108 55697
                </a>
                <a
                  href="https://wa.me/919810855697"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Contact Mr. Namit Gupta on WhatsApp"
                  className="group inline-flex min-h-11 items-center gap-2 bg-brand-black px-4 text-xs font-bold !text-white transition-colors hover:bg-brand hover:!text-brand-black"
                >
                  <MessageCircle
                    aria-hidden="true"
                    className="size-4"
                  />
                  WhatsApp
                  <ArrowUpRight
                    aria-hidden="true"
                    className="size-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
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
            <div className="relative border border-zinc-200 bg-[#f4f4f1] p-6 shadow-[0_20px_70px_rgba(0,0,0,.06)] sm:p-8 lg:p-10">
              <span
                aria-hidden="true"
                className="absolute left-0 top-0 h-[3px] w-28 bg-brand"
              />
              <div className="flex items-start justify-between gap-5">
                <div>
                  <p className="text-[10px] font-extrabold uppercase tracking-[.18em] text-zinc-950">
                    Stand Enquiry
                  </p>
                  <h2
                    id="exhibitor-form-heading"
                    className="mt-2 text-2xl font-black tracking-[-.04em] text-zinc-950 sm:text-3xl"
                  >
                    Exhibitor
                    <span className="text-brand">
                      {" "}
                      details.
                    </span>
                  </h2>
                </div>
                <span
                  aria-hidden="true"
                  className="hidden size-12 place-items-center border border-zinc-300 bg-white sm:grid"
                >
                  <Handshake
                    aria-hidden="true"
                    className="size-5 text-brand-dark"
                  />
                </span>
              </div>
              <p className="mt-4 max-w-2xl text-sm leading-7 text-zinc-600">
                Fields marked with an asterisk are required. Share as much
                information as possible so our team can recommend the right
                participation option.
              </p>
              <div
                aria-labelledby="exhibitor-form-heading"
                className="mt-8"
              >
                <ExhibitorForm />
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
function HeroGraphic() {
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      viewBox="0 0 760 420"
      className="pointer-events-none absolute right-0 top-0 hidden h-full w-[43%] lg:block"
      preserveAspectRatio="xMaxYMin slice"
    >
      <polygon
        points="180,0 760,0 760,125 500,265"
        fill="#F9B900"
      />
      <polygon
        points="500,265 760,125 760,245 540,340"
        fill="#8F6400"
      />
      <path
        d="M500 265 760 125"
        stroke="#FFD84A"
        strokeOpacity=".3"
      />
    </svg>
  );
}