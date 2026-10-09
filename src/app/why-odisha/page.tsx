
import type { Metadata } from "next";

import { BottomCTA } from "@/components/shared/BottomCTA";
import { WhyOdishaHero } from "./_components/WhyOdishaHero";
import { OdishaOverview } from "./_components/OdishaOverview";
import { OdishaMinerals } from "./_components/OdishaMinerals";

const SITE_URL = "https://odishaminingexpo.com";
const PAGE_URL = `${SITE_URL}/why-odisha`;

const EVENT_NAME =
  "5th Odisha Mining & Infrastructure International Expo 2027";

const SEO_TITLE =
  "Mining Industry in Odisha | Minerals & Business Opportunities";

const SEO_DESCRIPTION =
  "Discover Odisha's mining industry, iron ore, coal, bauxite and chromite resources, industrial infrastructure and opportunities for mining equipment businesses.";

export const metadata: Metadata = {
  title: SEO_TITLE,

  description: SEO_DESCRIPTION,

  keywords: [
    "Why Odisha",
    "Odisha Mineral Resources",
    "India Mineral Powerhouse",
    "Mining Investment Odisha",
    "Odisha Mining Industry",
    "OMIIE 2027 Location",
    "Bhubaneswar Mining Hub",
    "Infrastructure Investment India",
  ],

  alternates: {
    canonical: "/why-odisha",
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
        alt: "Odisha mining and infrastructure industry landscape",
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
          name: "Why Odisha",
          item: PAGE_URL,
        },
      ],
    },
  ],
};

export default function WhyOdisha() {
  return (
    <>
      <WhyOdishaHero />
      <OdishaOverview />
      <OdishaMinerals />
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
