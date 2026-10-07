"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/ui/Container";

const ease = [0.16, 1, 0.3, 1] as const;

export function AboutHero() {
  return (
    <section
      aria-labelledby="about-hero-heading"
      className="relative isolate overflow-hidden bg-brand-black text-white"
    >
      <HeroShape />

      <Container className="relative z-10 flex min-h-[370px] items-end py-14 sm:min-h-[420px] lg:py-16">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.7,
            ease,
          }}
          className="max-w-4xl"
        >
          <div className="mb-4 flex items-center gap-3">
            <span
              aria-hidden="true"
              className="h-[2px] w-10 bg-brand"
            />

            <p className="text-[10px] font-extrabold uppercase tracking-[.18em] text-brand">
              The Show
            </p>
          </div>

          <h1
            id="about-hero-heading"
            className="text-[clamp(2.7rem,5vw,5rem)] font-black leading-[.96] tracking-[-.055em]"
          >
            About the
            <span className="text-brand"> Expo.</span>
          </h1>

          <p className="mt-5 max-w-3xl text-sm leading-7 text-white/70 sm:text-base">
            The industry platform driving mining innovation — connecting mining
            leaders, technology providers, equipment manufacturers,
            policymakers, investors and infrastructure players.
          </p>
        </motion.div>
      </Container>
    </section>
  );
}

function HeroShape() {
  return (
    <motion.svg
      aria-hidden="true"
      focusable="false"
      viewBox="0 0 700 400"
      initial={{
        opacity: 0,
        x: 70,
      }}
      animate={{
        opacity: 1,
        x: 0,
      }}
      transition={{
        duration: 1,
        ease,
      }}
      className="pointer-events-none absolute right-0 top-0 hidden h-full w-[42%] lg:block"
      preserveAspectRatio="xMaxYMin slice"
    >
      <polygon
        points="170,0 700,0 700,125 470,250"
        fill="#F9B900"
      />

      <polygon
        points="470,250 700,125 700,240 510,320"
        fill="#9A6B00"
      />

      <path
        d="M470 250 700 125"
        stroke="#FFD94C"
        strokeOpacity=".35"
      />
    </motion.svg>
  );
}