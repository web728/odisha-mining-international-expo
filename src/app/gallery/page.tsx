import type { Metadata } from "next";
import fs from "fs";
import path from "path";

import { Container } from "@/components/ui/Container";
import { BottomCTA } from "@/components/shared/BottomCTA";
import { GalleryGrid } from "./GalleryGrid";

export const metadata: Metadata = {
  title: "Gallery",
  description:
    "Last edition glimpses from Odisha Mining & Infrastructure International Expo.",
  alternates: { canonical: "/gallery" },
};

const extensions = /\.(jpg|jpeg|png|webp|avif)$/i;

function getGalleryImages() {
  const dir = path.join(process.cwd(), "public/image/expo");

  return fs
    .readdirSync(dir)
    .filter((file) => extensions.test(file))
    .sort((a, b) =>
      a.localeCompare(b, undefined, {
        numeric: true,
        sensitivity: "base",
      })
    )
    .map((file) => `/image/expo/${file}`);
}

export default function Gallery() {
  const images = getGalleryImages();

  return (
    <>
      <section className="relative overflow-hidden bg-brand-black text-white">
        <HeroGraphic />

        <Container className="relative z-10 flex min-h-[360px] items-end py-14 sm:min-h-[400px]">
          <div className="max-w-4xl">
            <div className="mb-4 flex items-center gap-3">
              <span className="h-[2px] w-10 bg-brand" />
              <p className="text-[10px] font-extrabold uppercase tracking-[.18em] text-brand">
                Gallery
              </p>
            </div>

            <h1 className="text-[clamp(2.7rem,5vw,5rem)] font-black leading-[.96] tracking-[-.055em]">
              Last Edition
              <span className="text-brand"> Glimpses.</span>
            </h1>

            <p className="mt-5 max-w-2xl text-sm leading-7 text-white/70 sm:text-base">
              A glimpse of past editions — live machinery, business floor and
              expo energy.
            </p>
          </div>
        </Container>
      </section>

      <section className="section-space bg-white">
        <Container>
          <div className="mb-9 flex items-end justify-between border-b border-zinc-200 pb-5">
            <div>
              <p className="text-[10px] font-extrabold uppercase tracking-[.18em] text-zinc-950">
                Previous Editions
              </p>

              <h2 className="mt-2 text-2xl font-black tracking-[-.04em] text-zinc-950 sm:text-3xl">
                Expo in <span className="text-brand">action.</span>
              </h2>
            </div>
 
          </div>

          <GalleryGrid images={images} />
        </Container>
      </section>

      <BottomCTA />
    </>
  );
}

function HeroGraphic() {
  return (
    <svg
      aria-hidden
      viewBox="0 0 760 400"
      className="pointer-events-none absolute right-0 top-0 hidden h-full w-[42%] lg:block"
      preserveAspectRatio="xMaxYMin slice"
    >
      <polygon points="180,0 760,0 760,120 500,255" fill="#F9B900" />
      <polygon points="500,255 760,120 760,235 535,330" fill="#8F6400" />
      <path d="M500 255 760 120" stroke="#FFD84A" strokeOpacity=".35" />
    </svg>
  );
}