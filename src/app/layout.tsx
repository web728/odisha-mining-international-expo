
import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { Manrope } from "next/font/google";

import "./globals.css";

import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { CookieConsent } from "@/components/shared/CookieConsent";
import { InitialLoader } from "@/components/shared/InitialLoader";

const SITE_URL = "https://odishaminingexpo.com";

const EVENT_NAME =
  "5th Odisha Mining & Infrastructure International Expo 2027";

const EVENT_SHORT_NAME =
  "Odisha Mining & Infrastructure International Expo";

const ORGANIZER_NAME =
  "Futurex Trade Fair & Events Pvt. Ltd.";

const ORGANIZER_URL = "https://futurextrade.com/";

const LOGO_URL =
  `${SITE_URL}/image/5th-Odisha-Logo_White.png`;

const SEO_TITLE =
  "Mining Expo India 2027 | Odisha Mining & Infrastructure Expo";

const SEO_DESCRIPTION =
  "Explore Odisha Mining Expo 2027, 7–10 January in Bhubaneswar. Discover mining machinery, mineral processing, heavy equipment and B2B opportunities. Register now.";

const manrope = Manrope({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-manrope",
  preload: true,
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),

  applicationName: EVENT_NAME,

  // Default title; individual pages can override it.
  title: SEO_TITLE,

  description: SEO_DESCRIPTION,

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
      name: EVENT_SHORT_NAME,
      url: SITE_URL,
    },
  ],

  creator: EVENT_SHORT_NAME,

  publisher: ORGANIZER_NAME,

  category: "Mining & Infrastructure Exhibition",

  icons: {
    icon: [
      {
        url: "/favicon.ico",
      },
      {
        url: "/icon.png",
        type: "image/png",
        sizes: "512x512",
      },
    ],

    apple: [
      {
        url: "/apple-icon.png",
        type: "image/png",
        sizes: "180x180",
      },
    ],

    shortcut: "/favicon.ico",
  },

  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },

  openGraph: {
    type: "website",
    locale: "en_IN",

    url: `${SITE_URL}/`,

    siteName: EVENT_NAME,

    title: SEO_TITLE,

    description: SEO_DESCRIPTION,

    images: [
      {
        url: "/image/5th-Odisha-Logo_White.png",
        alt: EVENT_NAME,
      },
    ],
  },

  twitter: {
    card: "summary_large_image",

    title: SEO_TITLE,

    description: SEO_DESCRIPTION,

    images: [
      "/image/5th-Odisha-Logo_White.png",
    ],
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

const structuredData = {
  "@context": "https://schema.org",

  "@graph": [
    {
      "@type": "WebSite",

      "@id": `${SITE_URL}/#website`,

      url: `${SITE_URL}/`,

      name: EVENT_NAME,

      alternateName: [
        "Odisha Mining Expo",
        "Odisha Mining Expo 2027",
        "OMIIE 2027",
      ],

      inLanguage: "en-IN",

      publisher: {
        "@id": `${SITE_URL}/#organizer`,
      },

      about: {
        "@id": `${SITE_URL}/#event`,
      },
    },

    {
      "@type": "Organization",

      "@id": `${SITE_URL}/#organizer`,

      name: ORGANIZER_NAME,

      url: ORGANIZER_URL,

      telephone: "+91 98108 55697",

      email: "info@futurextrade.com",

      address: {
        "@type": "PostalAddress",

        streetAddress: "E-52, 1st Floor, Kalkaji",

        addressLocality: "Delhi",

        postalCode: "110019",

        addressCountry: "IN",
      },

      contactPoint: [
        {
          "@type": "ContactPoint",

          name: "Mr. Namit Gupta",

          telephone: "+91 98108 55697",

          email: "namit@futurextrade.com",

          contactType: "exhibitor and event enquiries",

          availableLanguage: [
            "English",
            "Hindi",
          ],
        },

        {
          "@type": "ContactPoint",

          name: "Mr. Soumo Roy",

          telephone: "+91 80105 79828",

          email: "soumo@futurextrade.com",

          contactType: "exhibitor and event enquiries",

          availableLanguage: [
            "English",
            "Hindi",
          ],
        },
      ],
    },

    {
      "@type": "ExhibitionEvent",

      "@id": `${SITE_URL}/#event`,

      name: EVENT_NAME,

      alternateName: [
        "Odisha Mining Expo",
        "Odisha Mining Expo 2027",
        "OMIIE 2027",
      ],

      description:
        "India's premier platform for mining, infrastructure, heavy equipment and industrial innovation.",

      url: `${SITE_URL}/`,

      startDate: "2027-01-07",

      endDate: "2027-01-10",

      eventStatus:
        "https://schema.org/EventScheduled",

      eventAttendanceMode:
        "https://schema.org/OfflineEventAttendanceMode",

      isAccessibleForFree: true,

      image: [LOGO_URL],

      location: {
        "@type": "Place",

        "@id": `${SITE_URL}/venue#venue`,

        name: "Baramunda Exhibition Ground",

        address: {
          "@type": "PostalAddress",

          addressLocality: "Bhubaneswar",

          addressRegion: "Odisha",

          addressCountry: "IN",
        },
      },

      organizer: {
        "@id": `${SITE_URL}/#organizer`,
      },

      offers: {
        "@type": "Offer",

        url: `${SITE_URL}/visitor-registration`,

        price: "0",

        priceCurrency: "INR",

        availability:
          "https://schema.org/InStock",

        category: "Trade Visitor Registration",
      },

      sameAs: [
        "https://www.facebook.com/odishaminingexpo/",
        "https://www.linkedin.com/company/odishaminingexpo/",
        "https://x.com/odisaminingexpo",
      ],
    },

    {
      "@type": "ImageObject",

      "@id": `${SITE_URL}/#logo`,

      url: LOGO_URL,

      contentUrl: LOGO_URL,

      caption: EVENT_NAME,
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html
      lang="en-IN"
      className={manrope.variable}
    >
      <body
        suppressHydrationWarning
        className="min-h-screen overflow-x-clip bg-white text-zinc-900 antialiased"
      >
        <InitialLoader />

        <Navbar />

        <main
          id="main-content"
          tabIndex={-1}
        >
          {children}
        </main>

        <Footer />

        <CookieConsent />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(
              structuredData
            ).replace(/</g, "\\u003c"),
          }}
        />
      </body>
    </html>
  );
}
