
"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  ArrowUpRight,
  CalendarDays,
  MapPin,
  Ticket,
} from "lucide-react";

import { Container } from "@/components/ui/Container";
import { Countdown } from "@/app/_components/Countdown";

const calendarUrl =
  "https://calendar.google.com/calendar/render?action=TEMPLATE&text=Odisha+Mining+%26+Infrastructure+International+Expo+2027&dates=20270107/20270111&location=Baramunda+Exhibition+Ground%2C+Bhubaneswar%2C+Odisha";

const PREMIUM_EASE = [0.16, 1, 0.3, 1] as const;

const containerVariants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
};

const textRevealVariants = {
  hidden: {
    opacity: 0,
    y: "100%",
  },
  visible: {
    opacity: 1,
    y: "0%",
    transition: {
      duration: 0.8,
      ease: PREMIUM_EASE,
    },
  },
};

const fadeUpVariants = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: PREMIUM_EASE,
    },
  },
};

export function HomeHero() {
  return (
    <section
      aria-labelledby="home-hero-heading"
      className="relative isolate flex min-h-[100dvh] flex-col justify-center overflow-hidden bg-[#030303] text-white lg:min-h-[650px]"
    >
      {/* Decorative technical grid */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-20"
      />

      {/* Decorative gold glow */}
      <motion.div
        aria-hidden="true"
        animate={{
          x: [0, -30, 0],
          y: [0, 20, 0],
          scale: [1, 1.05, 1],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="pointer-events-none absolute -right-20 top-[10%] h-[450px] w-[450px] rounded-full bg-[#F9B900]/[0.05] blur-[120px]"
      />

      {/* Decorative ambient light */}
      <motion.div
        aria-hidden="true"
        animate={{
          opacity: [0.2, 0.8, 0.2],
          scale: [1, 2, 1],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="pointer-events-none absolute left-[40%] top-[20%] size-[2px] rounded-full bg-[#F9B900] shadow-[0_0_12px_#F9B900]"
      />

      <HeroGraphic />

      <Container className="relative z-10 w-full py-16 lg:py-0">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="w-full max-w-[850px]"
        >
          {/* Eyebrow */}
          <motion.div
            variants={fadeUpVariants}
            className="flex items-center gap-2.5"
          >
            <motion.span
              aria-hidden="true"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{
                duration: 0.8,
                delay: 0.2,
                ease: PREMIUM_EASE,
              }}
              className="relative block h-[2px] w-7 origin-left bg-[#F9B900]"
            >
              <span className="absolute -right-1 top-1/2 size-1 -translate-y-1/2 rotate-45 bg-[#F9B900]" />
            </motion.span>

            <p className="text-[8.5px] font-extrabold uppercase tracking-[0.22em] text-[#F9B900] sm:text-[9.5px]">
              5th Edition · OMIIE 2027
            </p>
          </motion.div>

          {/* Primary SEO H1 - One H1 in HomeHero */}
          <h1
            id="home-hero-heading"
            className="mt-3.5 max-w-[800px] text-[clamp(1.8rem,3.8vw,3.4rem)] font-black uppercase leading-[0.98] tracking-[-0.03em] text-white"
          >
            <span className="block overflow-hidden pb-1">
              <motion.span
                variants={textRevealVariants}
                className="block"
              >
                Odisha Mining &amp;
              </motion.span>
            </span>

            <span className="block overflow-hidden pb-1">
              <motion.span
                variants={textRevealVariants}
                className="block"
              >
                Infrastructure
              </motion.span>
            </span>

            <span className="block overflow-hidden pb-1.5">
              <motion.span
                variants={textRevealVariants}
                className="block bg-gradient-to-r from-[#FFD65A] via-[#F9B900] to-[#C98E00] bg-clip-text text-transparent"
              >
                International Expo 2027
              </motion.span>
            </span>
          </h1>

          {/* SEO Supporting Text - Directly Below H1 */}
          <motion.p
            variants={fadeUpVariants}
            className="mt-4 max-w-[750px] text-[13px] font-semibold leading-relaxed text-white/85 sm:text-[16px]"
          >
            Mining Machinery, Equipment &amp; Infrastructure
            Exhibition in Bhubaneswar, India
          </motion.p>

          {/* Existing Description */}
          <motion.p
            variants={fadeUpVariants}
            className="mt-3 max-w-[600px] text-[12px] leading-relaxed text-white/60 sm:text-[14px]"
          >
            Odisha&apos;s focused business across logistics,
            transportation, infrastructure, construction,
            safety, sustainability, mining machinery,
            mineral processing, and heavy engineering
            solutions.
          </motion.p>

          {/* Event Information */}
          <div
            aria-label="Event details"
            className="mt-5 flex max-w-[750px] flex-wrap gap-x-5 gap-y-2.5"
          >
            <motion.div
              variants={fadeUpVariants}
              className="flex items-center gap-2 text-[9px] font-bold uppercase tracking-[0.08em] text-white/70 sm:text-[10px]"
            >
              <CalendarDays
                aria-hidden="true"
                className="size-3.5 shrink-0 text-[#F9B900]"
              />

              <time
                dateTime="2027-01-07"
                title="7 January 2027 to 10 January 2027"
              >
                7–10 January 2027
              </time>
            </motion.div>

            <motion.div
              variants={fadeUpVariants}
              className="flex items-center gap-2 text-[9px] font-bold uppercase tracking-[0.08em] text-white/70 sm:text-[10px]"
            >
              <MapPin
                aria-hidden="true"
                className="size-3.5 shrink-0 text-[#F9B900]"
              />

              <address className="not-italic">
                Baramunda Exhibition Ground, Bhubaneswar, Odisha
              </address>
            </motion.div>

            <motion.div
              variants={fadeUpVariants}
              className="flex items-center gap-2 text-[9px] font-bold uppercase tracking-[0.08em] text-white/70 sm:text-[10px]"
            >
              <Ticket
                aria-hidden="true"
                className="size-3.5 shrink-0 text-[#F9B900]"
              />

              <span>Free entry for trade visitors</span>
            </motion.div>
          </div>

          {/* Calls to Action */}
          <motion.div
            variants={fadeUpVariants}
            className="mt-6 flex flex-wrap gap-2.5"
          >
            <Link
              href="/exhibitor-registration"
              aria-label="Book your stand for Odisha Mining Expo 2027"
              className="group relative inline-flex min-h-11 items-center justify-center gap-2.5 overflow-hidden bg-[#F9B900] px-6 text-[9.5px] font-extrabold uppercase tracking-[0.12em] text-[#050505]! transition-all duration-300 hover:bg-[#FFD65A]"
            >
              <span className="relative z-10 flex items-center gap-2.5">
                Book Your Stand

                <ArrowRight
                  aria-hidden="true"
                  className="size-3.5 transition-transform duration-300 group-hover:translate-x-1"
                />
              </span>

              <span
                aria-hidden="true"
                className="absolute inset-0 z-0 bg-white/20 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
              />
            </Link>

            <Link
              href="/brochure"
              aria-label="View Odisha Mining Expo 2027 brochure"
              className="group inline-flex min-h-11 items-center justify-center gap-2.5 border border-white/15 bg-white/[0.02] px-6 text-[9.5px] font-extrabold uppercase tracking-[0.12em] text-white backdrop-blur-sm transition-all duration-300 hover:border-[#F9B900] hover:bg-[#F9B900]/10 hover:text-[#F9B900]"
            >
              Brochure

              <ArrowUpRight
                aria-hidden="true"
                className="size-3.5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              />
            </Link>

            <Link
              href={calendarUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Add Odisha Mining Expo 2027 to Google Calendar"
              className="group hidden min-h-11 items-center justify-center gap-2.5 border border-white/15 bg-white/[0.02] px-6 text-[9.5px] font-extrabold uppercase tracking-[0.12em] text-white backdrop-blur-sm transition-all duration-300 hover:border-[#F9B900] hover:bg-[#F9B900]/10 hover:text-[#F9B900] sm:inline-flex"
            >
              Add to Calendar

              <CalendarDays
                aria-hidden="true"
                className="size-3.5 transition-transform duration-300 group-hover:rotate-6"
              />
            </Link>
          </motion.div>

          {/* Countdown */}
          <motion.div
            variants={fadeUpVariants}
            className="mt-6 max-w-[650px] border-t border-white/10 pt-4 [&>div]:!mt-1"
          >
            <Countdown />
          </motion.div>
        </motion.div>
      </Container>

      {/* Decorative bottom line */}
      <motion.div
        aria-hidden="true"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{
          duration: 1.5,
          delay: 0.5,
          ease: PREMIUM_EASE,
        }}
        className="absolute inset-x-0 bottom-0 h-[2px] origin-left bg-gradient-to-r from-transparent via-[#F9B900] to-transparent opacity-60"
      />
    </section>
  );
}

/* =========================================
   MINING SVG GRAPHIC
========================================= */

function HeroGraphic() {
  return (
    <motion.div
      aria-hidden
      initial={{ opacity: 0, x: 80, scale: 0.95 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      transition={{
        duration: 1.2,
        delay: 0.2,
        ease: PREMIUM_EASE,
      }}
      className="pointer-events-none absolute right-0 top-0 hidden h-full w-[42%] lg:block"
    >
      <motion.svg
        viewBox="0 0 650 620"
        preserveAspectRatio="xMaxYMid slice"
        className="h-full w-full"
        animate={{ y: [0, -8, 0] }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <defs>
          <linearGradient
            id="miningGold"
            x1="0"
            y1="0"
            x2="1"
            y2="1"
          >
            <stop offset="0%" stopColor="#FFD21A" />
            <stop offset="48%" stopColor="#F4B600" />
            <stop offset="100%" stopColor="#B97900" />
          </linearGradient>

          <linearGradient
            id="miningEarth"
            x1="0"
            y1="0"
            x2="0"
            y2="1"
          >
            <stop offset="0%" stopColor="#9B6B00" />
            <stop offset="100%" stopColor="#493100" />
          </linearGradient>

          <linearGradient
            id="miningFade"
            x1="0"
            y1="0"
            x2="1"
            y2="0"
          >
            <stop
              offset="0%"
              stopColor="#0B0B0B"
              stopOpacity="0"
            />
            <stop
              offset="70%"
              stopColor="#0B0B0B"
              stopOpacity="0.08"
            />
            <stop
              offset="100%"
              stopColor="#0B0B0B"
              stopOpacity="0.75"
            />
          </linearGradient>

          <pattern
            id="miningGrid"
            width="30"
            height="30"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M 30 0 L 0 0 0 30"
              fill="none"
              stroke="#FFFFFF"
              strokeWidth="0.6"
              opacity="0.08"
            />
          </pattern>
        </defs>

        <polygon
          points="220,0 650,0 650,155 430,275"
          fill="url(#miningGold)"
        />

        <polygon
          points="430,275 650,155 650,315 455,425"
          fill="url(#miningEarth)"
        />

        <polygon
          points="220,0 430,275 390,298 165,0"
          fill="#E5A900"
        />

        <polygon
          points="220,0 430,275 414,284 195,0"
          fill="#030303"
          opacity="0.88"
        />

        <polygon
          points="455,425 650,315 650,620 540,620"
          fill="#111111"
        />

        <path
          d="M455 425 L650 315"
          fill="none"
          stroke="#F5B900"
          strokeWidth="2"
          strokeOpacity="0.65"
        />

        <path
          d="M500 475 L650 390"
          fill="none"
          stroke="#C58B00"
          strokeWidth="1"
          strokeOpacity="0.42"
        />

        <path
          d="M540 525 L650 465"
          fill="none"
          stroke="#C58B00"
          strokeWidth="1"
          strokeOpacity="0.3"
        />

        <path
          d="M430 275 L650 155"
          fill="none"
          stroke="#FFD21A"
          strokeWidth="1.5"
          strokeOpacity="0.72"
        />

        <path
          d="M470 0 L650 115"
          fill="none"
          stroke="#FFFFFF"
          strokeWidth="1"
          strokeOpacity="0.16"
        />

        <path
          d="M530 0 L650 75"
          fill="none"
          stroke="#0B0B0B"
          strokeWidth="1.5"
          strokeOpacity="0.2"
        />

        <rect
          x="400"
          y="0"
          width="250"
          height="620"
          fill="url(#miningGrid)"
        />

        <rect
          width="650"
          height="620"
          fill="url(#miningFade)"
        />
      </motion.svg>
    </motion.div>
  );
}
