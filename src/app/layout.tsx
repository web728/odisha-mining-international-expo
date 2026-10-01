import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { Manrope } from "next/font/google";

import "./globals.css";

import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { CookieConsent } from "@/components/shared/CookieConsent";
import { InitialLoader } from "@/components/shared/InitialLoader";

const SITE_URL = "https://odishaminingexpo.com";
const ORGANIZER_URL = "https://futurextrade.com/";

const manrope = Manrope({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-manrope",
  preload: true,
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),

  applicationName: "Odisha Mining Expo 2027",

  title: {
    default: "5th Odisha Mining & Infrastructure International Expo 2027",
    template:
      "%s | Odisha Mining & Infrastructure International Expo 2027",
  },

  description:
    "India's premier platform for mining, infrastructure, heavy equipment & industrial innovation. 07–10 January 2027, Baramunda Exhibition Ground, Bhubaneswar, Odisha.",

  keywords: [
    "Odisha Mining Expo",
    "Odisha Mining Expo 2027",
    "OMIIE 2027",
    "Mining Expo India",
    "Mining Exhibition Odisha",
    "Heavy Equipment Expo India",
    "Infrastructure Expo India",
  ],

  authors: [
    {
      name: "Odisha Mining & Infrastructure International Expo",
      url: SITE_URL,
    },
  ],

  creator: "Odisha Mining & Infrastructure International Expo",
  publisher: "Futurex Trade Fair & Events Pvt. Ltd.",
  category: "Mining & Infrastructure Exhibition",

  alternates: {
    canonical: "/",
  },

  openGraph: {
    type: "website",
    locale: "en_IN",
    url: SITE_URL,
    siteName: "Odisha Mining Expo 2027",
    title: "5th Odisha Mining & Infrastructure International Expo 2027",
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
    title: "5th Odisha Mining & Infrastructure International Expo 2027",
    description:
      "07–10 January 2027 · Baramunda Exhibition Ground · Bhubaneswar, Odisha",
    images: ["/image/5th-Odisha-Logo_White.png"],
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

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#ffffff",
};

const structuredData = [
  {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    url: SITE_URL,
    name: "5th Odisha Mining & Infrastructure International Expo 2027",
    alternateName: ["Odisha Mining Expo", "OMIIE 2027"],
    inLanguage: "en-IN",
  },

  {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${SITE_URL}/#organization`,
    name: "Odisha Mining & Infrastructure International Expo",
    alternateName: "Odisha Mining Expo",
    url: SITE_URL,

    logo: {
      "@type": "ImageObject",
      url: `${SITE_URL}/image/5th-Odisha-Logo_White.png`,
    },

    sameAs: [
      "https://www.facebook.com/odishaminingexpo/",
      "https://www.linkedin.com/company/odishaminingexpo/",
      "https://x.com/odisaminingexpo",
    ],
  },

  {
    "@context": "https://schema.org",
    "@type": "Event",
    "@id": `${SITE_URL}/#event`,

    name: "5th Odisha Mining & Infrastructure International Expo 2027",

    description:
      "India's premier platform for mining, infrastructure, heavy equipment and industrial innovation.",

    url: SITE_URL,

    startDate: "2027-01-07T09:00:00+05:30",
    endDate: "2027-01-10T18:00:00+05:30",

    eventStatus: "https://schema.org/EventScheduled",

    eventAttendanceMode:
      "https://schema.org/OfflineEventAttendanceMode",

    image: [
      `${SITE_URL}/image/5th-Odisha-Logo_White.png`,
    ],

    location: {
      "@type": "Place",
      name: "Baramunda Exhibition Ground",

      address: {
        "@type": "PostalAddress",
        addressLocality: "Bhubaneswar",
        addressRegion: "Odisha",
        addressCountry: "IN",
      },
    },

    organizer: {
      "@type": "Organization",
      name: "Futurex Trade Fair & Events Pvt. Ltd.",
      url: ORGANIZER_URL,
    },

    offers: {
      "@type": "Offer",
      url: `${SITE_URL}/visitor-registration`,
      availability: "https://schema.org/InStock",
    },
  },
];

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en-IN" className={manrope.variable}>
      <body
        suppressHydrationWarning
        className="min-h-screen overflow-x-clip bg-white text-zinc-900 antialiased"
      >
        <InitialLoader />

        <Navbar />

        <main id="main-content">{children}</main>

        <Footer />

        <CookieConsent />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData).replace(
              /</g,
              "\\u003c",
            ),
          }}
        />
      </body>
    </html>
  );
}