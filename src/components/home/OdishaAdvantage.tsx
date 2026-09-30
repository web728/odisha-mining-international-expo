"use client";

import { motion, type Variants } from "framer-motion";

import { Container } from "@/components/ui/Container";
import { ButtonLink } from "@/components/ui/ButtonLink";

import { AnimatedNumber } from "./AnimatedNumber";
import { minerals } from "./home.data";

// Premium Apple-like Easing
const PREMIUM_EASE = [0.16, 1, 0.3, 1] as const;

const sectionReveal: Variants = {
  hidden: { opacity: 0, y: 30 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: PREMIUM_EASE,
    },
  },
};

const gridReveal: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.2,
    },
  },
};

const itemReveal: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: PREMIUM_EASE,
    },
  },
};

export function OdishaAdvantage() {
  return (
    <section className="section-space relative isolate overflow-hidden bg-[#030303] text-white">
      {/* Ambient Premium Glow */}
      <div className="pointer-events-none absolute left-[10%] top-[20%] -z-10 h-[400px] w-[400px] rounded-full bg-brand/5 blur-[120px]" />

      <ContourGraphic />

      {/* Top Border Glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent"
      />

      <Container className="relative">
        {/* =========================================
           HEADER SECTION
        ========================================== */}
        <motion.div
          variants={sectionReveal}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-50px" }}
          className="grid gap-8 lg:grid-cols-[1.08fr_.92fr] lg:items-end lg:gap-14"
        >
          <div>
            <div className="flex items-center gap-3">
              <motion.span
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: PREMIUM_EASE }}
                className="h-[2px] w-9 origin-left bg-brand"
              />
              <p className="text-[10px] font-extrabold uppercase tracking-[.2em] text-brand">
                Why Odisha
              </p>
            </div>

            <h2 className="mt-5 max-w-[760px] text-[clamp(2rem,3.2vw,3.5rem)] font-black leading-[1.05] tracking-[-.04em]">
              A mineral powerhouse
              <br className="hidden sm:block" />
              <span className="bg-gradient-to-r from-[#FFD55A] via-brand to-[#C98E00] bg-clip-text text-transparent">
                at the centre of India&apos;s industrial growth.
              </span>
            </h2>
          </div>

          <div className="lg:justify-self-end">
            <p className="max-w-xl text-sm leading-relaxed text-white/60">
              Odisha holds a nationally significant share of identified
              mineral resources, supporting mining, mineral processing,
              metals, infrastructure and allied industries.
            </p>

            <div className="mt-6 flex items-center gap-3 text-[9px] font-extrabold uppercase tracking-[.18em] text-white/40">
              <span className="size-1.5 bg-brand shadow-[0_0_8px_#F9B900]" />
              Share of India&apos;s identified resources
            </div>
          </div>
        </motion.div>

        {/* =========================================
           MINERALS GRID
        ========================================== */}
        <motion.div
          variants={gridReveal}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-50px" }}
          className="mt-12 grid grid-cols-2 gap-px border border-white/10 bg-white/10 sm:grid-cols-4 lg:grid-cols-7 rounded-sm overflow-hidden"
        >
          {minerals.map(([name, percent], index) => (
            <motion.article
              key={name}
              variants={itemReveal}
              className="group relative flex min-h-[140px] flex-col justify-between bg-[#050505] px-4 py-5 transition-colors duration-500 hover:bg-[#0a0a0a] sm:px-5"
            >
              {/* Hover Glow Effect */}
              <div className="pointer-events-none absolute inset-0 bg-brand opacity-0 mix-blend-overlay transition-opacity duration-500 group-hover:opacity-[0.04]" />

              <div className="flex items-start justify-between gap-3">
                <div className="text-[clamp(1.85rem,2.5vw,2.35rem)] font-black leading-none tracking-[-.055em] text-brand transition-transform duration-500 group-hover:scale-105 group-hover:text-[#FFD55A]">
                  <AnimatedNumber value={percent} />
                </div>

                <span className="pt-1 text-[9px] font-black tracking-[.16em] text-white/20 transition-colors duration-300 group-hover:text-brand/60">
                  {String(index + 1).padStart(2, "0")}
                </span>
              </div>

              <p className="mt-4 max-w-[130px] text-[10px] font-extrabold uppercase leading-5 tracking-[.1em] text-white/50 transition-colors duration-300 group-hover:text-white/90">
                {name}
              </p>

              {/* Bottom Animated Line */}
              <span className="absolute inset-x-0 bottom-0 h-[2px] origin-left scale-x-0 bg-gradient-to-r from-[#FFD55A] to-brand transition-transform duration-500 ease-out group-hover:scale-x-100" />
            </motion.article>
          ))}
        </motion.div>

        {/* =========================================
           FOOTER CTA
        ========================================== */}
        <motion.div
          variants={sectionReveal}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-50px" }}
          className="mt-10 flex flex-col gap-6 border-t border-white/10 pt-8 lg:flex-row lg:items-center lg:justify-between"
        >
          <p className="max-w-3xl text-sm leading-relaxed text-white/50">
            Odisha&apos;s mineral base underpins major investments across
            mining, metals, heavy industry, logistics and infrastructure.
          </p>

          <ButtonLink
            href="/why-odisha"
            variant="dark"
            className="shrink-0 border border-white/20 hover:border-brand hover:bg-brand hover:text-black transition-all duration-300"
          >
            Explore the Odisha Advantage
          </ButtonLink>
        </motion.div>
      </Container>
    </section>
  );
}

/* =========================================
   CINEMATIC SVG GRAPHIC
========================================== */
function ContourGraphic() {
  return (
    <svg
      aria-hidden
      viewBox="0 0 900 600"
      className="pointer-events-none absolute -right-[8%] top-1/2 -z-10 hidden w-[760px] -translate-y-1/2 opacity-[.25] lg:block"
      fill="none"
    >
      {[85, 145, 205, 265, 325].map((x, i) => (
        <motion.path
          key={x}
          initial={{ pathLength: 0, opacity: 0 }}
          whileInView={{ pathLength: 1, opacity: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 2, delay: i * 0.15, ease: PREMIUM_EASE }}
          d={`M${x} 535C205 410 235 250 385 165C535 80 690 150 865 45`}
          stroke={i === 2 ? "#F9B900" : "#FFFFFF"}
          strokeOpacity={i === 2 ? ".78" : ".15"}
          strokeWidth={i === 2 ? "1.5" : "1"}
        />
      ))}

      <motion.circle
        initial={{ scale: 0, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 1.2, ease: PREMIUM_EASE }}
        cx="385"
        cy="165"
        r="4.5"
        fill="#F9B900"
        className="drop-shadow-[0_0_8px_rgba(249,185,0,0.8)]"
      />
    </svg>
  );
}