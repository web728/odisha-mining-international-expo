
import type { Metadata } from "next";

import { BottomCTA } from "@/components/shared/BottomCTA";
import { AboutHero } from "./_components/AboutHero";
import { AboutIntro } from "./_components/AboutIntro";
import { AboutIndustry } from "./_components/AboutIndustry";
import { AboutOrganiser } from "./_components/AboutOrganiser";

const SITE_URL = "https://odishaminingexpo.com";
const PAGE_URL = `${SITE_URL}/about`;

const EVENT_NAME =
  "5th Odisha Mining & Infrastructure International Expo 2027";

export const metadata: Metadata = {
  title:
    "About Odisha Mining Expo 2027 | International Mining Exhibition",

  description:
    "Learn about Odisha Mining & Infrastructure International Expo 2027, a B2B exhibition connecting mining equipment manufacturers, technology providers and industry buyers.",

  alternates: {
    canonical: "/about",
  },

  openGraph: {
    type: "website",
    locale: "en_IN",
    url: PAGE_URL,

    title:
      "About Odisha Mining Expo 2027 | International Mining Exhibition",

    description:
      "Learn about Odisha Mining & Infrastructure International Expo 2027, a B2B exhibition connecting mining equipment manufacturers, technology providers and industry buyers.",

    siteName: EVENT_NAME,

    images: [
      {
        url: "/image/about-hero-2.png",
        alt: EVENT_NAME,
      },
    ],
  },

  twitter: {
    card: "summary_large_image",

    title:
      "About Odisha Mining Expo 2027 | International Mining Exhibition",

    description:
      "Learn about Odisha Mining & Infrastructure International Expo 2027, a B2B exhibition connecting mining equipment manufacturers, technology providers and industry buyers.",

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

const structuredData = [
  {
    "@context": "https://schema.org",
    "@type": "AboutPage",

    "@id": `${PAGE_URL}#webpage`,

    url: PAGE_URL,

    name:
      "About the 5th Odisha Mining & Infrastructure International Expo 2027",

    description:
      "About the 5th Odisha Mining & Infrastructure International Expo 2027 — connecting mining leaders, technology providers, manufacturers, policymakers and infrastructure players.",

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
    "@context": "https://schema.org",
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

        name: "About the Expo",

        item: PAGE_URL,
      },
    ],
  },
];

export default function About() {
  return (
    <>
      <AboutHero />
      <AboutIntro />
      <AboutIndustry />
      <AboutOrganiser />
      <BottomCTA />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData).replace(
            /</g,
            "\\u003c",
          ),
        }}
      />
    </>
  );
}
