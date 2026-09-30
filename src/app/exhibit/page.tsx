import type { Metadata } from "next";

import { BottomCTA } from "@/components/shared/BottomCTA";
import { ExhibitHero } from "./_components/ExhibitHero";
import { ExhibitContent } from "./_components/ExhibitContent";

const SITE_URL = "https://odishaminingexpo.com";

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
    title: "Why Exhibit at OMIIE 2027 | B2B Mining & Infrastructure Expo",
    description:
      "Position your brand in front of industry leaders. Showcase your latest mining machinery and infrastructure solutions at Odisha's premier B2B expo.",
    url: `${SITE_URL}/exhibit`,
    type: "website",
    siteName: "Odisha Mining Expo 2027",
  },
  twitter: {
    card: "summary_large_image",
    title: "Why Exhibit at OMIIE 2027",
    description:
      "Connect with key decision-makers and showcase your heavy machinery and mining technologies in Bhubaneswar, Odisha.",
  },
};

// Breadcrumb aur WebPage schema for Google Sitelinks
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      "@id": `${SITE_URL}/exhibit/#webpage`,
      url: `${SITE_URL}/exhibit`,
      name: "Why Exhibit | Odisha Mining & Infrastructure Expo 2027",
      description:
        "Showcase your heavy machinery and mining equipment at OMIIE 2027. Expand your B2B network in Odisha.",
      inLanguage: "en-IN",
    },
    {
      "@type": "BreadcrumbList",
      "@id": `${SITE_URL}/exhibit/#breadcrumb`,
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: SITE_URL,
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Why Exhibit",
          item: `${SITE_URL}/exhibit`,
        },
      ],
    },
  ],
};

export default function Exhibit() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ExhibitHero />
      <ExhibitContent />
      <BottomCTA />
    </>
  );
}