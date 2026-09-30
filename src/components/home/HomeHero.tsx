"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowRight,
  ArrowUpRight,
  CalendarDays,
  MapPin,
  Ticket,
} from "lucide-react";

import { Container } from "@/components/ui/Container";
import { Countdown } from "@/app/_components/Countdown";

const info = [
  [CalendarDays, "07 – 10 January 2027"],
  [MapPin, "Baramunda Exhibition Ground, Bhubaneswar"],
  [Ticket, "Free entry for trade visitors"],
] as const;

const calendarUrl =
  "https://calendar.google.com/calendar/render?action=TEMPLATE&text=Odisha+Mining+%26+Infrastructure+International+Expo+2027&dates=20270107/20270111&location=Baramunda+Exhibition+Ground%2C+Bhubaneswar%2C+Odisha";

const easeOut = [0.16, 1, 0.3, 1] as const;

export function HomeHero() {
  const reducedMotion = useReducedMotion();

  const reveal = (delay: number) =>
    reducedMotion
      ? {}
      : {
          initial: {
            opacity: 0,
            y: 32,
          },
          animate: {
            opacity: 1,
            y: 0,
          },
          transition: {
            duration: 0.75,
            delay,
            ease: easeOut,
          },
        };

  return (
    <section className="relative isolate min-h-[540px] overflow-hidden bg-brand-black text-white sm:min-h-[570px] lg:min-h-[610px]">
      {/* =========================================
          BACKGROUND ANIMATION
      ========================================== */}

      {/* Moving technical grid */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.035]"
        animate={
          reducedMotion
            ? undefined
            : {
                backgroundPosition: [
                  "0px 0px",
                  "80px 80px",
                ],
              }
        }
        transition={
          reducedMotion
            ? undefined
            : {
                duration: 18,
                repeat: Infinity,
                ease: "linear",
              }
        }
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,.8) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.8) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
        }}
      />

      {/* Moving gold glow */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute -right-40 top-[15%] h-[400px] w-[400px] rounded-full bg-brand/[0.045] blur-[120px]"
        animate={
          reducedMotion
            ? undefined
            : {
                x: [0, -30, 0],
                y: [0, 25, 0],
                scale: [1, 1.08, 1],
              }
        }
        transition={
          reducedMotion
            ? undefined
            : {
                duration: 9,
                repeat: Infinity,
                ease: "easeInOut",
              }
        }
      />

      {/* Small ambient light */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute left-[43%] top-[22%] size-1 rounded-full bg-brand"
        animate={
          reducedMotion
            ? undefined
            : {
                opacity: [0.1, 0.8, 0.1],
                scale: [1, 2, 1],
              }
        }
        transition={
          reducedMotion
            ? undefined
            : {
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
              }
        }
      />

      {/* Mining graphic */}
      <HeroGraphic reducedMotion={reducedMotion} />

      {/* =========================================
          CONTENT
      ========================================== */}

      <Container className="relative z-10 flex min-h-[540px] items-center py-12 sm:min-h-[570px] sm:py-14 lg:min-h-[610px] lg:py-14">
        <div className="w-full max-w-[900px]">
          {/* Eyebrow */}
          <motion.div
            {...reveal(0.05)}
            className="flex items-center gap-3"
          >
            <motion.span
              initial={
                reducedMotion
                  ? false
                  : {
                      width: 0,
                      opacity: 0,
                    }
              }
              animate={
                reducedMotion
                  ? undefined
                  : {
                      width: 32,
                      opacity: 1,
                    }
              }
              transition={{
                duration: 0.55,
                delay: 0.05,
                ease: "easeOut",
              }}
              className="relative block h-[2px] bg-brand"
            >
              <span className="absolute -right-1 top-1/2 size-1.5 -translate-y-1/2 rotate-45 bg-brand" />
            </motion.span>

            <p className="text-[9px] font-extrabold uppercase tracking-[0.18em] text-brand sm:text-[10px]">
              5th Edition · OMIIE 2027
            </p>
          </motion.div>

          {/* Heading */}
          <motion.h1
            {...reveal(0.14)}
            className="mt-4 max-w-[820px] text-[clamp(2rem,4.25vw,3.8rem)] font-black uppercase leading-[0.94] tracking-[-0.052em] text-white"
          >
            Mining, Infrastructure,
            <br className="hidden sm:block" />
            Heavy Equipment &amp;
            <br className="hidden sm:block" />
            <span className="text-brand">
              Industrial Innovation 2027
            </span>
          </motion.h1>

          {/* Description */}
          <motion.p
            {...reveal(0.23)}
            className="mt-4 max-w-[570px] text-[13px] leading-5 text-white/60 sm:text-sm sm:leading-6"
          >
            Odisha&apos;s focused business platform
            for mining machinery, infrastructure,
            heavy equipment and industrial
            technologies.
          </motion.p>

          {/* Event information */}
          <div className="mt-5 flex max-w-[760px] flex-wrap gap-x-5 gap-y-2.5">
            {info.map(([Icon, text], index) => (
              <motion.div
                key={text}
                {...reveal(0.31 + index * 0.07)}
                className="flex items-center gap-2 text-[9px] font-bold uppercase tracking-[0.05em] text-white/65 sm:text-[10px]"
              >
                <Icon className="size-3.5 shrink-0 text-brand" />

                <span>{text}</span>
              </motion.div>
            ))}
          </div>

          {/* Buttons */}
          <motion.div
            {...reveal(0.53)}
            className="mt-6 flex flex-wrap gap-2.5"
          >
            <Link
              href="/exhibitor-registration"
              className="group inline-flex min-h-12 items-center justify-center gap-2.5 bg-brand px-6 text-[10px] font-extrabold uppercase tracking-[0.09em] text-brand-black transition duration-300 hover:bg-brand-light"
            >
              Book Your Stand

              <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>

            <Link
              href="/brochure"
              className="group inline-flex min-h-12 items-center justify-center gap-2.5 border border-white/20 px-6 text-[10px] font-extrabold uppercase tracking-[0.09em] text-white transition duration-300 hover:border-brand hover:bg-brand hover:text-brand-black"
            >
              Brochure

              <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </Link>

            <Link
              href={calendarUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group hidden min-h-12 items-center justify-center gap-2.5 border border-white/20 px-6 text-[10px] font-extrabold uppercase tracking-[0.09em] text-white transition duration-300 hover:border-brand hover:bg-brand hover:text-brand-black sm:inline-flex"
            >
              Add to Calendar

              <CalendarDays className="size-4 transition-transform duration-300 group-hover:rotate-6" />
            </Link>
          </motion.div>

          {/* Countdown */}
          <motion.div
            {...reveal(0.63)}
            className="mt-6 max-w-[650px] border-t border-white/10 pt-4"
          >
            <Countdown />
          </motion.div>
        </div>
      </Container>

      {/* Bottom line */}
      <motion.div
        initial={
          reducedMotion
            ? false
            : {
                scaleX: 0,
                opacity: 0,
              }
        }
        animate={{
          scaleX: 1,
          opacity: 1,
        }}
        transition={{
          duration: 0.9,
          delay: 0.15,
          ease: easeOut,
        }}
        className="absolute inset-x-0 bottom-0 h-px origin-left bg-brand"
      />
    </section>
  );
}

/* =========================================
   MINING SVG
========================================= */

function HeroGraphic({
  reducedMotion,
}: {
  reducedMotion: boolean | null;
}) {
  return (
    <motion.div
      aria-hidden
      initial={
        reducedMotion
          ? false
          : {
              opacity: 0,
              x: 60,
              scale: 0.96,
            }
      }
      animate={{
        opacity: 1,
        x: 0,
        scale: 1,
      }}
      transition={{
        duration: 1.1,
        delay: 0.1,
        ease: easeOut,
      }}
      className="pointer-events-none absolute right-0 top-0 hidden h-full w-[40%] lg:block"
    >
      <motion.svg
        viewBox="0 0 650 620"
        preserveAspectRatio="xMaxYMid slice"
        className="h-full w-full"
        animate={
          reducedMotion
            ? undefined
            : {
                y: [0, -7, 0],
              }
        }
        transition={
          reducedMotion
            ? undefined
            : {
                duration: 8,
                repeat: Infinity,
                ease: "easeInOut",
              }
        }
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
              stopOpacity="0.45"
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

        {/* Main machine body */}
        <polygon
          points="220,0 650,0 650,155 430,275"
          fill="url(#miningGold)"
        />

        {/* Excavator cabin */}
        <polygon
          points="430,275 650,155 650,315 455,425"
          fill="url(#miningEarth)"
        />

        {/* Excavator boom */}
        <polygon
          points="220,0 430,275 390,298 165,0"
          fill="#E5A900"
        />

        {/* Dark boom edge */}
        <polygon
          points="220,0 430,275 414,284 195,0"
          fill="#0B0B0B"
          opacity="0.88"
        />

        {/* Mine / terrain */}
        <polygon
          points="455,425 650,315 650,620 540,620"
          fill="#151515"
        />

        {/* Mining bench lines */}
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

        {/* Structural highlights */}
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

        {/* Technical grid */}
        <rect
          x="400"
          y="0"
          width="250"
          height="620"
          fill="url(#miningGrid)"
        />

        {/* Fade */}
        <rect
          width="650"
          height="620"
          fill="url(#miningFade)"
        />
      </motion.svg>
    </motion.div>
  );
}