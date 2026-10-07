"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/ui/Container";

const ease = [0.16, 1, 0.3, 1] as const;

export function ExhibitHero() {
  return (
    <section
      aria-labelledby="exhibit-hero-heading"
      className="relative isolate overflow-hidden bg-brand-black text-white"
    >
      <HeroGraphic />

      <Container className="relative z-10 flex min-h-[390px] items-end py-14 sm:min-h-[430px] lg:py-16">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease }}
          className="max-w-4xl"
        >
          <div className="mb-4 flex items-center gap-3">
            <span
              aria-hidden="true"
              className="h-[2px] w-10 bg-brand"
            />

            <p className="text-[10px] font-extrabold uppercase tracking-[.18em] text-brand">
              Exhibit
            </p>
          </div>

          <h1
            id="exhibit-hero-heading"
            className="text-[clamp(2.6rem,5vw,5rem)] font-black leading-[.96] tracking-[-.055em]"
          >
            Why Exhibit:
            <span className="text-brand"> Be Where the Growth Is.</span>
          </h1>

          <p className="mt-5 max-w-3xl text-sm leading-7 text-white/70 sm:text-base">
            Position your brand at the heart of India&apos;s mining revolution.
            India is the world&apos;s next mining powerhouse.
          </p>
        </motion.div>
      </Container>
    </section>
  );
}

function HeroGraphic() {
  return (
    <motion.svg
      aria-hidden="true"
      focusable="false"
      viewBox="0 0 760 420"
      initial={{ opacity: 0, x: 70 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 1, ease }}
      className="pointer-events-none absolute right-0 top-0 hidden h-full w-[44%] lg:block"
      preserveAspectRatio="xMaxYMin slice"
    >
      <polygon
        points="180,0 760,0 760,125 500,265"
        fill="#F9B900"
      />

      <polygon
        points="500,265 760,125 760,245 540,340"
        fill="#8F6400"
      />

      <path
        d="M500 265 760 125"
        stroke="#FFD84A"
        strokeOpacity=".3"
      />
    </motion.svg>
  );
}