import type { Metadata } from "next";

import { BottomCTA } from "@/components/shared/BottomCTA";
import { VisitHero } from "./_components/VisitHero";
import { VisitContent } from "./_components/VisitContent";

const SITE_URL = "https://odishaminingexpo.com";

export const metadata: Metadata = {
  title: "Why Visit | Free Entry for Trade Visitors",
  description:
    "Discover why you should visit the 5th Odisha Mining & Infrastructure International Expo 2027. Explore cutting-edge heavy machinery, network with industry leaders, and find new B2B opportunities in Bhubaneswar.",
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
    title: "Why Visit OMIIE 2027 | Free Trade Visitor Entry",
    description:
      "Join industry leaders and explore the latest in mining, infrastructure, and heavy equipment at OMIIE 2027 in Bhubaneswar, Odisha.",
    url: `${SITE_URL}/visit`,
    type: "website",
    siteName: "Odisha Mining Expo 2027",
  },
  twitter: {
    card: "summary_large_image",
    title: "Why Visit OMIIE 2027",
    description:
      "Explore cutting-edge heavy machinery and network with industry leaders. Free entry for trade visitors.",
  },
};

// Breadcrumb aur WebPage schema Google Sitelinks (search results ke niche links) ke liye zaroori hai
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      "@id": `${SITE_URL}/visit/#webpage`,
      url: `${SITE_URL}/visit`,
      name: "Why Visit | Odisha Mining & Infrastructure Expo 2027",
      description:
        "Discover why you should visit the 5th Odisha Mining & Infrastructure International Expo 2027. Free entry for trade visitors.",
      inLanguage: "en-IN",
    },
    {
      "@type": "BreadcrumbList",
      "@id": `${SITE_URL}/visit/#breadcrumb`,
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
          name: "Why Visit",
          item: `${SITE_URL}/visit`,
        },
      ],
    },
  ],
};

export default function Visit() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <VisitHero />
      <VisitContent />
      <BottomCTA />
    </>
  );
}