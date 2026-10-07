import type { Metadata } from "next";

import { BottomCTA } from "@/components/shared/BottomCTA";
import { ExhibitHero } from "./_components/ExhibitHero";
import { ExhibitContent } from "./_components/ExhibitContent";

const SITE_URL = "https://odishaminingexpo.com";
const PAGE_URL = `${SITE_URL}/exhibit`;

const EVENT_NAME =
  "5th Odisha Mining & Infrastructure International Expo 2027";

export const metadata: Metadata = {
  title: "Why Exhibit | Showcase Your Mining & Infrastructure Solutions",

  description:
    "Showcase your heavy machinery, mining equipment, and infrastructure technologies at OMIIE 2027. Connect with key decision-makers, industry leaders, and expand your B2B network in Odisha.",

  keywords: [
    "Exhibit at Odisha Mining Expo",
    "Mining Equipment Exhibitors",
    "B2B Mining Tradeshow",
    "Showcase Heavy Machinery",
    "Infrastructure Expo Exhibitors",
    "OMIIE 2027 Exhibitor Profile",
    "Mining Business Opportunities Odisha",
  ],

  alternates: {
    canonical: "/exhibit",
  },

  openGraph: {
    type: "website",
    locale: "en_IN",
    url: PAGE_URL,

    title:
      "Why Exhibit at OMIIE 2027 | B2B Mining & Infrastructure Expo",

    description:
      "Position your brand in front of industry leaders. Showcase your latest mining machinery and infrastructure solutions at Odisha's premier B2B expo.",

    siteName: EVENT_NAME,

    images: [
      {
        url: "/image/about-hero-2.png",
        alt: "Exhibit at the 5th Odisha Mining & Infrastructure International Expo 2027",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",

    title: "Why Exhibit at OMIIE 2027",

    description:
      "Connect with key decision-makers and showcase your heavy machinery and mining technologies in Bhubaneswar, Odisha.",

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
        "Why Exhibit | 5th Odisha Mining & Infrastructure International Expo 2027",

      description:
        "Showcase your heavy machinery and mining equipment at OMIIE 2027 and expand your B2B network in Odisha.",

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

      primaryImageOfPage: {
        "@type": "ImageObject",
        url: `${SITE_URL}/image/about-hero-2.png`,
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
          name: "Why Exhibit",
          item: PAGE_URL,
        },
      ],
    },
  ],
};

export default function Exhibit() {
  return (
    <>
      <ExhibitHero />
      <ExhibitContent />
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