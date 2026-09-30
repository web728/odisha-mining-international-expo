"use client";

import { motion } from "framer-motion";

import { Container } from "@/components/ui/Container";
import { ButtonLink } from "@/components/ui/ButtonLink";

const ease = [0.16, 1, 0.3, 1] as const;

export function BottomCTA() {
  return (
    <section className="relative overflow-hidden bg-brand text-brand-black">
      <CTAVisual />

      <Container className="relative z-10 grid gap-8 py-12 lg:grid-cols-[1fr_auto] lg:items-end lg:py-14">
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.6, ease }}
        >
          <div className="mb-3 flex items-center gap-3">
            <span className="h-[2px] w-9 bg-black" />
            <p className="text-[10px] font-extrabold uppercase tracking-[.18em]">
              07–10 January 2027 · Bhubaneswar
            </p>
          </div>

          <h2 className="max-w-3xl text-[clamp(2rem,3.2vw,3.6rem)] font-black leading-[1.02] tracking-[-.05em]">
            Be part of India&apos;s leading
            <span className="text-white"> mining & infrastructure platform</span>
          </h2>

          <p className="mt-4 max-w-2xl text-sm leading-7 text-black/75">
            Four days of business, live demos and networking at Baramunda
            Exhibition Ground.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.6, delay: 0.08, ease }}
          className="flex flex-wrap gap-3"
        >
          <ButtonLink href="/exhibitor-registration" variant="dark">
            Book Your Stand
          </ButtonLink>

          <ButtonLink href="/visitor-registration" variant="dark">
            Register to Visit — Free
          </ButtonLink>
        </motion.div>
      </Container>
    </section>
  );
}

function CTAVisual() {
  return (
    <svg
      aria-hidden
      viewBox="0 0 700 320"
      preserveAspectRatio="none"
      className="pointer-events-none absolute right-0 top-0 h-full w-[48%] opacity-[.14]"
    >
      <polygon points="260,0 700,0 700,120 470,240" fill="#000" />
      <polygon points="470,240 700,120 700,220 520,300" fill="#000" opacity=".65" />
      <path d="M180-10 650 280M320-10 720 235" stroke="#000" />
    </svg>
  );
}