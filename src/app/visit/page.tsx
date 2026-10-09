
import type { Metadata } from "next";

import { BottomCTA } from "@/components/shared/BottomCTA";
import { VisitHero } from "./_components/VisitHero";
import { VisitContent } from "./_components/VisitContent";

const SITE_URL = "https://odishaminingexpo.com";
const PAGE_URL = `${SITE_URL}/visit`;

const EVENT_NAME =
  "5th Odisha Mining & Infrastructure International Expo 2027";

const SEO_TITLE =
  "Why Visit Odisha Mining Expo 2027 | Mining Equipment Exhibition";

const SEO_DESCRIPTION =
  "Explore mining machinery, mineral processing, earthmoving equipment and industrial solutions at Odisha Mining Expo 2027. Discover products, suppliers and industry connections.";

export const metadata: Metadata = {
  title: SEO_TITLE,

  description: SEO_DESCRIPTION,

  keywords: [
    "Visit Odisha Mining Expo",
    "Mining Expo Visitors",
    "B2B Mining Exhibition",
    "Heavy Machinery Showcase",
    "Mining Industry Networking",
    "Free Trade Visitor Entry",
    "Bhubaneswar Expo Visitors",
  ],

  alternates: {
    canonical: "/visit",
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
        alt: "Trade visitors at the 5th Odisha Mining & Infrastructure International Expo 2027",
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
          name: "Why Visit",
          item: PAGE_URL,
        },
      ],
    },
  ],
};

export default function Visit() {
  return (
    <>
      <VisitHero />
      <VisitContent />
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
