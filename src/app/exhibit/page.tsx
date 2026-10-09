
import type { Metadata } from "next";

import { BottomCTA } from "@/components/shared/BottomCTA";
import { ExhibitHero } from "./_components/ExhibitHero";
import { ExhibitContent } from "./_components/ExhibitContent";

const SITE_URL = "https://odishaminingexpo.com";
const PAGE_URL = `${SITE_URL}/exhibit`;

const EVENT_NAME =
  "5th Odisha Mining & Infrastructure International Expo 2027";

const SEO_TITLE =
  "Why Exhibit at Odisha Mining Expo 2027 | Mining Trade Show";

const SEO_DESCRIPTION =
  "Showcase mining machinery, heavy equipment and industrial technology at Odisha Mining Expo 2027. Connect with mine operators, contractors, distributors and buyers.";

export const metadata: Metadata = {
  title: SEO_TITLE,

  description: SEO_DESCRIPTION,

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

    title: SEO_TITLE,

    description: SEO_DESCRIPTION,

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
