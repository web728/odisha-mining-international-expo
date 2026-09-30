import type { Metadata } from "next";

import { BottomCTA } from "@/components/shared/BottomCTA";
import { WhyOdishaHero } from "./_components/WhyOdishaHero";
import { OdishaOverview } from "./_components/OdishaOverview";
import { OdishaMinerals } from "./_components/OdishaMinerals";

const SITE_URL = "https://odishaminingexpo.com";

export const metadata: Metadata = {
  title: "Why Odisha | India's Mineral Powerhouse & Investment Hub",
  description:
    "Discover why Odisha is the undisputed mineral powerhouse of India. Explore vast investment opportunities in mining, metals, and infrastructure at OMIIE 2027.",
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
    title: "Why Odisha | India's Mineral Powerhouse",
    description:
      "Explore vast investment opportunities in mining, metals, and infrastructure in Odisha, the mineral hub of India. Join us at OMIIE 2027.",
    url: `${SITE_URL}/why-odisha`,
    type: "website",
    siteName: "Odisha Mining Expo 2027",
  },
  twitter: {
    card: "summary_large_image",
    title: "Why Odisha | India's Mineral Powerhouse",
    description:
      "Discover why Odisha is the preferred destination for mining and infrastructure investments. Explore opportunities at OMIIE 2027.",
  },
};

// Breadcrumb aur WebPage schema for Google Sitelinks
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      "@id": `${SITE_URL}/why-odisha/#webpage`,
      url: `${SITE_URL}/why-odisha`,
      name: "Why Odisha | Odisha Mining & Infrastructure Expo 2027",
      description:
        "Discover why Odisha is the undisputed mineral powerhouse of India and a preferred hub for mining investments.",
      inLanguage: "en-IN",
    },
    {
      "@type": "BreadcrumbList",
      "@id": `${SITE_URL}/why-odisha/#breadcrumb`,
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
          name: "Why Odisha",
          item: `${SITE_URL}/why-odisha`,
        },
      ],
    },
  ],
};

export default function WhyOdisha() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <WhyOdishaHero />
      <OdishaOverview />
      <OdishaMinerals />
      <BottomCTA />
    </>
  );
}