
import type { Metadata } from "next";
import fs from "fs";
import path from "path";

import { Container } from "@/components/ui/Container";
import { BottomCTA } from "@/components/shared/BottomCTA";
import { GalleryGrid } from "./GalleryGrid";

const SITE_URL = "https://odishaminingexpo.com";
const PAGE_URL = `${SITE_URL}/gallery`;

const EVENT_NAME =
  "5th Odisha Mining & Infrastructure International Expo 2027";

const SEO_TITLE =
  "Odisha Mining Expo Gallery | Mining Exhibition Photos & Videos";

const SEO_DESCRIPTION =
  "View photos and videos from previous Odisha Mining Expo editions, featuring mining machinery, equipment displays, exhibitors, live demonstrations and visitors.";

export const metadata: Metadata = {
  title: SEO_TITLE,

  description: SEO_DESCRIPTION,

  keywords: [
    "Odisha Mining Expo Gallery",
    "Odisha Mining & Infrastructure International Expo Gallery",
    "Mining Expo Photos Odisha",
    "Mining Exhibition Bhubaneswar Gallery",
    "Heavy Machinery Expo Photos",
    "Odisha Mining Expo Previous Edition",
    "Mining Trade Show Gallery India",
  ],

  alternates: {
    canonical: "/gallery",
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
        url: "/image/expo/expo-show-floor-avenue.jpg",
        alt: "Previous edition of the Odisha Mining & Infrastructure International Expo",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",

    title: SEO_TITLE,

    description: SEO_DESCRIPTION,

    images: ["/image/expo/expo-show-floor-avenue.jpg"],
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

const extensions = /\.(jpg|jpeg|png|webp|avif)$/i;

function getGalleryImages() {
  const dir = path.join(
    process.cwd(),
    "public/image/expo",
  );

  if (!fs.existsSync(dir)) {
    return [];
  }

  return fs
    .readdirSync(dir)
    .filter((file) => extensions.test(file))
    .sort((a, b) =>
      a.localeCompare(b, undefined, {
        numeric: true,
        sensitivity: "base",
      }),
    )
    .map((file) => `/image/expo/${file}`);
}

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
        url: `${SITE_URL}/image/expo/expo-show-floor-avenue.jpg`,
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
          name: "Gallery",
          item: PAGE_URL,
        },
      ],
    },
  ],
};

export default function Gallery() {
  const images = getGalleryImages();

  return (
    <>
      <section
        aria-labelledby="gallery-hero-heading"
        className="relative overflow-hidden bg-brand-black text-white"
      >
        <HeroGraphic />

        <Container className="relative z-10 flex min-h-[360px] items-end py-14 sm:min-h-[400px]">
          <div className="max-w-4xl">
            <div className="mb-4 flex items-center gap-3">
              <span
                aria-hidden="true"
                className="h-[2px] w-10 bg-brand"
              />

              <p className="text-[10px] font-extrabold uppercase tracking-[.18em] text-brand">
                Gallery
              </p>
            </div>

            <h1
              id="gallery-hero-heading"
              className="text-[clamp(2.7rem,5vw,5rem)] font-black leading-[.96] tracking-[-.055em]"
            >
              Last Edition
              <span className="text-brand">
                {" "}
                Glimpses.
              </span>
            </h1>

            <p className="mt-5 max-w-2xl text-sm leading-7 text-white/70 sm:text-base">
              A glimpse of past editions — live machinery, business floor and
              expo energy.
            </p>
          </div>
        </Container>
      </section>

      <section
        aria-labelledby="gallery-grid-heading"
        className="section-space bg-white"
      >
        <Container>
          <div className="mb-9 flex items-end justify-between border-b border-zinc-200 pb-5">
            <div>
              <p className="text-[10px] font-extrabold uppercase tracking-[.18em] text-zinc-950">
                Previous Editions
              </p>

              <h2
                id="gallery-grid-heading"
                className="mt-2 text-2xl font-black tracking-[-.04em] text-zinc-950 sm:text-3xl"
              >
                Expo in{" "}
                <span className="text-brand">
                  action.
                </span>
              </h2>
            </div>
          </div>

          <GalleryGrid images={images} />
        </Container>
      </section>

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

function HeroGraphic() {
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      viewBox="0 0 760 400"
      className="pointer-events-none absolute right-0 top-0 hidden h-full w-[42%] lg:block"
      preserveAspectRatio="xMaxYMin slice"
    >
      <polygon
        points="180,0 760,0 760,120 500,255"
        fill="#F9B900"
      />

      <polygon
        points="500,255 760,120 760,235 535,330"
        fill="#8F6400"
      />

      <path
        d="M500 255 760 120"
        stroke="#FFD84A"
        strokeOpacity=".35"
      />
    </svg>
  );
}
