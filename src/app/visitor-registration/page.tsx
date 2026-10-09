import type { Metadata } from "next";

import {

  Building2,

  Check,

  Globe2,

  Users,

} from "lucide-react";

import { Container } from "@/components/ui/Container";

import { VisitorForm } from "./VisitorForm";

const SITE_URL = "https://odishaminingexpo.com";

const PAGE_URL = `${SITE_URL}/visitor-registration`;

const SEO_TITLE =
  "Odisha Mining Expo 2027 Visitor Registration | Free Entry";

const SEO_DESCRIPTION =
  "Register for free trade visitor entry to Odisha Mining Expo 2027, 7–10 January at Baramunda Exhibition Ground, Bhubaneswar. Explore machinery, technology and equipment.";

const EVENT_NAME =

  "5th Odisha Mining & Infrastructure International Expo 2027";

export const metadata: Metadata = {

  title: SEO_TITLE,

  description: SEO_DESCRIPTION,

  keywords: [

    "Visitor Registration Odisha Mining Expo",

    "OMIIE 2027 Visitor Registration",

    "Free Mining Expo Registration",

    "Trade Visitor Registration",

    "Mining Exhibition Visitor Registration",

    "Bhubaneswar Mining Expo Registration",

    "Mining Trade Show India",

  ],

  alternates: {

    canonical: "/visitor-registration",

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

        alt: "Visitor registration for the 5th Odisha Mining & Infrastructure International Expo 2027",

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

const jsonLd = {

  "@context": "https://schema.org",

  "@graph": [

    {

      "@type": "WebPage",

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

          name: "Visitor Registration",

          item: PAGE_URL,

        },

      ],

    },

  ],

};

const benefits = [

  {

    icon: Building2,

    value: "200+",

    label: "Exhibitors",

    text: "Meet suppliers, manufacturers and technology providers.",

  },

  {

    icon: Users,

    value: "20,000+",

    label: "Trade Visitors",

    text: "Network with buyers, contractors and industry decision-makers.",

  },

  {

    icon: Globe2,

    value: "10+",

    label: "Countries",

    text: "Connect with participating companies from India and overseas.",

  },

];

export default function Page() {

  return (

    <>

      <section

        aria-labelledby="visitor-registration-heading"

        className="relative isolate overflow-hidden bg-brand-black text-white"

      >

        <HeroGraphic />

        <Container className="relative z-10 flex min-h-[380px] items-end py-14 sm:min-h-[420px] lg:py-16">

          <div className="max-w-4xl">

            <Eyebrow dark>

              Visit · Free Registration

            </Eyebrow>

            <h1

              id="visitor-registration-heading"

              className="mt-4 text-[clamp(2.7rem,5vw,5rem)] font-black leading-[.96] tracking-[-.055em]"

            >

              Visitor

              <span className="text-brand">

                {" "}

                Registration.

              </span>

            </h1>

            <p className="mt-5 max-w-3xl text-sm leading-7 text-white/70 sm:text-base">

              Free entry for trade visitors —{" "}

              <time dateTime="2027-01-07">

                07

              </time>

              {"–"}

              <time dateTime="2027-01-10">

                10 January 2027

              </time>

              , Baramunda Exhibition Ground, Bhubaneswar.

            </p>

          </div>

        </Container>

      </section>

      <section

        aria-labelledby="visitor-register-heading"

        className="section-space bg-white"

      >

        <Container className="grid gap-12 lg:grid-cols-[.72fr_1.28fr] lg:items-start lg:gap-16">

          <div className="lg:sticky lg:top-[110px]">

            <Eyebrow>

              Register Free

            </Eyebrow>

            <h2

              id="visitor-register-heading"

              className="mt-4 max-w-xl text-[clamp(2rem,3vw,3.25rem)] font-black leading-[1.02] tracking-[-.045em] text-zinc-950"

            >

              Four days of sourcing,

              <span className="text-brand">

                {" "}

                networking & discovery.

              </span>

            </h2>

            <p className="mt-5 max-w-lg text-sm leading-7 text-zinc-700">

              Register as a trade visitor and connect with mining,

              infrastructure, heavy equipment and industrial businesses under

              one roof.

            </p>

            <div className="mt-8 grid border-l border-t border-zinc-200">

              {benefits.map(

                ({

                  icon: Icon,

                  value,

                  label,

                  text,

                }) => (

                  <article

                    key={label}

                    aria-labelledby={`visitor-benefit-${label

                      .toLowerCase()

                      .replaceAll(" ", "-")}`}

                    className="group border-b border-r border-zinc-200 p-5 transition duration-300 hover:bg-brand-black"

                  >

                    <div className="flex gap-4">

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

                          id={`visitor-benefit-${label

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

            <ul className="mt-8 border-t border-zinc-200 pt-6">

              {[

                "Free entry for registered trade visitors",

                "Access to live machinery demonstrations",

                "Networking & B2B opportunities",

              ].map((item) => (

                <li

                  key={item}

                  className="flex items-center gap-3 py-2 text-sm font-semibold text-zinc-800"

                >

                  <span

                    aria-hidden="true"

                    className="grid size-6 place-items-center bg-brand"

                  >

                    <Check

                      aria-hidden="true"

                      className="size-3.5"

                      strokeWidth={3}

                    />

                  </span>

                  {item}

                </li>

              ))}

            </ul>

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

              <p className="text-[10px] font-extrabold uppercase tracking-[.18em] text-zinc-950">

                Trade Visitor

              </p>

              <h2

                id="visitor-form-heading"

                className="mt-2 text-2xl font-black tracking-[-.04em] text-zinc-950 sm:text-3xl"

              >

                Registration{" "}

                <span className="text-brand">

                  details.

                </span>

              </h2>

              <p className="mt-4 text-sm leading-7 text-zinc-600">

                Complete the form below to register for free entry to the 5th

                Odisha Mining & Infrastructure International Expo.

              </p>

              <div

                aria-labelledby="visitor-form-heading"

                className="mt-8"

              >

                <VisitorForm />

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