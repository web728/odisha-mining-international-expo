"use client";

import { motion } from "framer-motion";
import {
  ArrowRight,
  ArrowUpRight,
} from "lucide-react";

import { Container } from "@/components/ui/Container";

const ease = [0.16, 1, 0.3, 1] as const;

export function BottomCTA() {
  return (
    <section className="relative isolate overflow-hidden bg-brand text-brand-black">
      <CTAVisual />

      <Container className="relative z-10 flex min-h-[330px] items-center py-16 sm:min-h-[350px] sm:py-18 lg:min-h-[370px] lg:py-20">
        <div className="grid w-full gap-10 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end lg:gap-16">
          {/* =========================
              CONTENT
          ========================== */}

          <motion.div
            initial={{
              opacity: 0,
              y: 30,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{
              once: true,
              amount: 0.25,
            }}
            transition={{
              duration: 0.7,
              ease,
            }}
            className="relative max-w-3xl"
          >
            {/* Eyebrow */}
            <div className="mb-5 flex items-center gap-3">
              <span className="relative h-[2px] w-10 shrink-0 bg-black">
                <span className="absolute -right-1 top-1/2 size-1.5 -translate-y-1/2 rotate-45 bg-black" />
              </span>

              <p className="text-[9px] font-black uppercase leading-none tracking-[0.18em] text-black sm:text-[10px]">
                07–10 January 2027 · Bhubaneswar
              </p>
            </div>

            {/* Heading */}
            <h2 className="max-w-[850px] text-[clamp(2.15rem,3.6vw,3.8rem)] font-black uppercase leading-[0.94] tracking-[-0.055em] text-black">
              Be part of India&apos;s leading{" "}
              <span className="text-white">
                mining &amp; infrastructure platform
              </span>
            </h2>

            {/* Description */}
            <p className="mt-5 max-w-[620px] text-[13px] font-medium leading-6 text-black/70 sm:text-sm sm:leading-7">
              Four days of business, live demos and networking at Baramunda
              Exhibition Ground.
            </p>
          </motion.div>

          {/* =========================
              ACTIONS
          ========================== */}

          <motion.div
            initial={{
              opacity: 0,
              y: 30,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{
              once: true,
              amount: 0.25,
            }}
            transition={{
              duration: 0.7,
              delay: 0.12,
              ease,
            }}
            className="relative flex flex-wrap gap-3 lg:max-w-[330px] lg:flex-col"
          >
            {/* Primary */}
            <a
              href="/exhibitor-registration"
              className="group inline-flex min-h-[52px] items-center justify-center gap-3 !border !border-black !bg-black px-6 text-[10px] font-black uppercase tracking-[0.1em] !text-white no-underline transition-all duration-300 hover:!border-white hover:!bg-white hover:!text-black focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/50"
            >
              <span>Book Your Stand</span>

              <ArrowRight className="size-4 shrink-0 transition-transform duration-300 group-hover:translate-x-1" />
            </a>

            {/* Secondary */}
            <a
              href="/visitor-registration"
              className="group inline-flex min-h-[52px] items-center justify-center gap-3 !border !border-black/80 !bg-transparent px-6 text-[10px] font-black uppercase tracking-[0.1em] !text-black no-underline transition-all duration-300 hover:!border-black hover:!bg-black hover:!text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/50"
            >
              <span>Register to Visit — Free</span>

              <ArrowUpRight className="size-4 shrink-0 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </a>
          </motion.div>
        </div>
      </Container>

      {/* Bottom border */}
      <div className="absolute inset-x-0 bottom-0 h-px bg-black/20" />
    </section>
  );
}

/* =================================
   PREMIUM CTA VISUAL
================================= */

function CTAVisual() {
  return (
    <motion.svg
      aria-hidden
      viewBox="0 0 800 420"
      preserveAspectRatio="none"
      className="pointer-events-none absolute right-0 top-0 h-full w-full opacity-[0.075] sm:w-[70%] lg:w-[52%]"
      animate={{
        x: [0, -10, 0],
      }}
      transition={{
        duration: 9,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    >
      <defs>
        <linearGradient
          id="ctaDark"
          x1="0"
          y1="0"
          x2="1"
          y2="1"
        >
          <stop offset="0%" stopColor="#000000" />
          <stop offset="100%" stopColor="#000000" stopOpacity="0.45" />
        </linearGradient>

        <linearGradient
          id="ctaFade"
          x1="0"
          y1="0"
          x2="1"
          y2="0"
        >
          <stop
            offset="0%"
            stopColor="#F3B600"
            stopOpacity="0"
          />

          <stop
            offset="70%"
            stopColor="#F3B600"
            stopOpacity="0.3"
          />

          <stop
            offset="100%"
            stopColor="#F3B600"
            stopOpacity="0"
          />
        </linearGradient>
      </defs>

      {/* Main geometric mining form */}
      <polygon
        points="290,0 800,0 800,150 500,330"
        fill="url(#ctaDark)"
      />

      {/* Lower terrain */}
      <polygon
        points="500,330 800,150 800,300 555,420"
        fill="#000"
        opacity=".65"
      />

      {/* Excavator-style boom */}
      <polygon
        points="290,0 500,330 470,350 235,0"
        fill="#000"
        opacity=".55"
      />

      {/* Structural lines */}
      <path
        d="M210 0 L570 300"
        fill="none"
        stroke="#000"
        strokeWidth="1.5"
      />

      <path
        d="M330 0 L690 275"
        fill="none"
        stroke="#000"
        strokeWidth="1"
      />

      <path
        d="M500 330 L800 150"
        fill="none"
        stroke="#000"
        strokeWidth="2"
        strokeOpacity=".65"
      />

      {/* Subtle highlight */}
      <path
        d="M470 350 L800 155"
        fill="none"
        stroke="#000"
        strokeWidth="1"
        strokeOpacity=".5"
      />

      {/* Soft horizontal light */}
      <rect
        x="360"
        y="340"
        width="440"
        height="2"
        fill="url(#ctaFade)"
      />
    </motion.svg>
  );
}