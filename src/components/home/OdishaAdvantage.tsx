"use client";

import {
  motion,
  useReducedMotion,
  type Variants,
} from "framer-motion";

import { Container } from "@/components/ui/Container";
import { ButtonLink } from "@/components/ui/ButtonLink";

import { AnimatedNumber } from "./AnimatedNumber";
import { minerals } from "./home.data";

const ease = [0.16, 1, 0.3, 1] as const;

const sectionReveal: Variants = {
  hidden: {
    opacity: 0,
    y: 18,
  },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease,
    },
  },
};

const gridReveal: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.055,
      delayChildren: 0.08,
    },
  },
};

const itemReveal: Variants = {
  hidden: {
    opacity: 0,
    y: 16,
  },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.48,
      ease,
    },
  },
};

export function OdishaAdvantage() {
  const reducedMotion = useReducedMotion();

  return (
    <section className="section-space relative isolate overflow-hidden bg-[#050505] text-white">
      <ContourGraphic />

      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-white/10"
      />

      <Container className="relative">
        <motion.div
          variants={reducedMotion ? undefined : sectionReveal}
          initial={reducedMotion ? false : "hidden"}
          whileInView={reducedMotion ? undefined : "show"}
          viewport={{ once: true, amount: 0.2 }}
          className="grid gap-7 lg:grid-cols-[1.08fr_.92fr] lg:items-end lg:gap-14"
        >
          <div>
            <div className="flex items-center gap-3">
              <span className="h-[2px] w-9 bg-brand" />

              <p className="text-[10px] font-extrabold uppercase tracking-[.18em] text-brand">
                Why Odisha
              </p>
            </div>

            <h2 className="mt-4 max-w-[760px] text-[clamp(2rem,3.2vw,3.5rem)] font-black leading-[1] tracking-[-.05em]">
              A mineral powerhouse
              <br className="hidden sm:block" />
              <span className="text-brand">
                at the centre of India&apos;s industrial growth.
              </span>
            </h2>
          </div>

          <div className="lg:justify-self-end">
            <p className="max-w-xl text-sm leading-7 text-white/62">
              Odisha holds a nationally significant share of identified
              mineral resources, supporting mining, mineral processing,
              metals, infrastructure and allied industries.
            </p>

            <div className="mt-5 flex items-center gap-3 text-[9px] font-extrabold uppercase tracking-[.16em] text-white/35">
              <span className="size-1.5 bg-brand" />
              Share of India&apos;s identified resources
            </div>
          </div>
        </motion.div>

        <motion.div
          variants={reducedMotion ? undefined : gridReveal}
          initial={reducedMotion ? false : "hidden"}
          whileInView={reducedMotion ? undefined : "show"}
          viewport={{ once: true, amount: 0.12 }}
          className="mt-10 grid grid-cols-2 border-l border-t border-white/10 sm:grid-cols-4 lg:grid-cols-7"
        >
          {minerals.map(([name, percent], index) => (
            <motion.article
              key={name}
              variants={reducedMotion ? undefined : itemReveal}
              whileHover={reducedMotion ? undefined : { y: -3 }}
              className="group relative min-h-[136px] overflow-hidden border-b border-r border-white/10 bg-white/[.015] px-4 py-5 transition-colors duration-300 hover:bg-white/[.05] sm:px-5"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="text-[clamp(1.85rem,2.5vw,2.35rem)] font-black leading-none tracking-[-.055em] text-brand">
                  <AnimatedNumber value={percent} />
                </div>

                <span className="pt-1 text-[8px] font-black tracking-[.16em] text-white/20 transition group-hover:text-brand/60">
                  {String(index + 1).padStart(2, "0")}
                </span>
              </div>

              <p className="mt-4 max-w-[130px] text-[10px] font-extrabold uppercase leading-5 tracking-[.085em] text-white/58 transition group-hover:text-white">
                {name}
              </p>

              <span className="absolute inset-x-0 bottom-0 h-[2px] origin-left scale-x-0 bg-brand transition-transform duration-300 group-hover:scale-x-100" />
            </motion.article>
          ))}
        </motion.div>

        <motion.div
          variants={reducedMotion ? undefined : sectionReveal}
          initial={reducedMotion ? false : "hidden"}
          whileInView={reducedMotion ? undefined : "show"}
          viewport={{ once: true, amount: 0.3 }}
          className="mt-7 flex flex-col gap-6 border-t border-white/10 pt-6 lg:flex-row lg:items-center lg:justify-between"
        >
          <p className="max-w-3xl text-sm leading-6 text-white/45">
            Odisha&apos;s mineral base underpins major investments across
            mining, metals, heavy industry, logistics and infrastructure.
          </p>

          <ButtonLink
            href="/why-odisha"
            className="shrink-0"
          >
            Explore the Odisha Advantage
          </ButtonLink>
        </motion.div>
      </Container>
    </section>
  );
}

function ContourGraphic() {
  return (
    <svg
      aria-hidden
      viewBox="0 0 900 600"
      className="pointer-events-none absolute -right-[8%] top-1/2 -z-10 hidden w-[760px] -translate-y-1/2 opacity-[.14] lg:block"
      fill="none"
    >
      {[85, 145, 205, 265, 325].map((x, i) => (
        <path
          key={x}
          d={`M${x} 535C205 410 235 250 385 165C535 80 690 150 865 45`}
          stroke={i === 2 ? "#F9B900" : "#FFFFFF"}
          strokeOpacity={i === 2 ? ".78" : ".22"}
          strokeWidth={i === 2 ? "1.4" : "1"}
        />
      ))}

      <circle
        cx="385"
        cy="165"
        r="4"
        fill="#F9B900"
      />
    </svg>
  );
}