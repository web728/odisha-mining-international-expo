import type { Metadata } from "next";

import { AboutExpo } from "@/components/home/AboutExpo";
import { FocusAreas } from "@/components/home/FocusAreas";
import { HomeHero } from "@/components/home/HomeHero";
import { HomeShowcase } from "@/components/home/HomeShowcase";
import { HomeStats } from "@/components/home/HomeStats";
import { OdishaAdvantage } from "@/components/home/OdishaAdvantage";

const SITE_URL = "https://odishaminingexpo.com";

export const metadata: Metadata = {
  title:
    "5th Odisha Mining & Infrastructure International Expo 2027",

  description:
    "India's premier platform for mining, infrastructure, heavy equipment & industrial innovation. 07–10 January 2027, Baramunda Exhibition Ground, Bhubaneswar, Odisha.",

  alternates: {
    canonical: "/",
  },

  openGraph: {
    type: "website",
    url: SITE_URL,
    title:
      "5th Odisha Mining & Infrastructure International Expo 2027",
    description:
      "India's premier platform for mining, infrastructure, heavy equipment & industrial innovation. 07–10 January 2027, Bhubaneswar, Odisha.",
    images: [
      {
        url: "/image/5th-Odisha-Logo_White.png",
        alt: "5th Odisha Mining & Infrastructure International Expo 2027",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title:
      "5th Odisha Mining & Infrastructure International Expo 2027",
    description:
      "07–10 January 2027 · Baramunda Exhibition Ground · Bhubaneswar, Odisha",
    images: ["/image/5th-Odisha-Logo_White.png"],
  },
};

const homepageStructuredData = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "@id": `${SITE_URL}/#webpage`,

  url: `${SITE_URL}/`,

  name:
    "5th Odisha Mining & Infrastructure International Expo 2027",

  description:
    "India's premier platform for mining, infrastructure, heavy equipment and industrial innovation.",

  inLanguage: "en-IN",

  isPartOf: {
    "@id": `${SITE_URL}/#website`,
  },

  about: {
    "@id": `${SITE_URL}/#event`,
  },

  primaryImageOfPage: {
    "@type": "ImageObject",
    url:
      `${SITE_URL}/image/5th-Odisha-Logo_White.png`,
  },
};

export default function Home() {
  return (
    <>
      <HomeHero />
      <HomeStats />
      <AboutExpo />
      <FocusAreas />
      <OdishaAdvantage />
      <HomeShowcase />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            homepageStructuredData,
          ).replace(/</g, "\\u003c"),
        }}
      />
    </>
  );
}