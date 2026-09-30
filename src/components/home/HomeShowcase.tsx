"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowRight,
  ArrowUpRight,
} from "lucide-react";

import { Container } from "@/components/ui/Container";
import { participantLogos } from "@/data/site";
import { gallery } from "./home.data";

const ease = [0.16, 1, 0.3, 1] as const;

/* =========================================================
   MAIN
========================================================= */

export function HomeShowcase() {
  return (
    <>
      <Gallery />
      <Participants />
      <Partners />
      <FinalCTA />
    </>
  );
}

/* =========================================================
   GALLERY
========================================================= */

function Gallery() {
  const reducedMotion = useReducedMotion();

  return (
    <section className="relative overflow-hidden bg-white py-14 sm:py-16 lg:py-20">
      <Container>
        {/* Header */}
        <motion.div
          initial={
            reducedMotion
              ? false
              : {
                  opacity: 0,
                  y: 30,
                }
          }
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
          className="grid gap-5 lg:grid-cols-[1fr_0.65fr] lg:items-end lg:gap-10"
        >
          <div>
            <Eyebrow>Event Highlights</Eyebrow>

            <h2 className="mt-4 max-w-3xl text-[clamp(2rem,3.5vw,3.55rem)] font-black uppercase leading-[0.96] tracking-[-0.05em] text-zinc-950">
              Watch the expo
              <span className="text-brand"> in action.</span>
            </h2>
          </div>

          <p className="max-w-lg text-[13px] leading-6 text-zinc-600 sm:text-sm sm:leading-7 lg:justify-self-end">
            A glimpse of past editions — live machinery, business floor and
            expo energy.
          </p>
        </motion.div>

        {/* Gallery */}
        <div className="mt-8 grid gap-3 sm:mt-10 sm:grid-cols-2 lg:grid-cols-4">
          {gallery.map((img, i) => (
            <GalleryCard
              key={img}
              img={img}
              index={i}
              reducedMotion={reducedMotion}
            />
          ))}
        </div>
      </Container>
    </section>
  );
}

/* =========================================================
   GALLERY CARD
========================================================= */

function GalleryCard({
  img,
  index,
  reducedMotion,
}: {
  img: string;
  index: number;
  reducedMotion: boolean | null;
}) {
  return (
    <motion.article
      initial={
        reducedMotion
          ? false
          : {
              opacity: 0,
              y: 35,
            }
      }
      whileInView={{
        opacity: 1,
        y: 0,
      }}
      viewport={{
        once: true,
        amount: 0.18,
      }}
      transition={{
        duration: 0.65,
        delay: index * 0.07,
        ease,
      }}
      whileHover={
        reducedMotion
          ? undefined
          : {
              y: -6,
            }
      }
      className="group relative aspect-[4/5] overflow-hidden bg-zinc-100"
    >
      <Image
        src={`/image/${img}`}
        alt={`Day ${index + 1} Highlights`}
        fill
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
        className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.045]"
      />

      {/* Image overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/15 to-transparent opacity-90 transition-opacity duration-500 group-hover:opacity-100" />

      {/* Top number */}
      <div className="absolute left-4 top-4 flex size-8 items-center justify-center border border-white/20 bg-black/20 backdrop-blur-sm">
        <span className="text-[9px] font-black text-white">
          {String(index + 1).padStart(2, "0")}
        </span>
      </div>

      {/* Content */}
      <div className="absolute inset-x-0 bottom-0 p-4 sm:p-5">
        <div className="flex items-end justify-between gap-4">
          <div>
            <span className="text-[8px] font-black uppercase tracking-[0.16em] text-brand sm:text-[9px]">
              Previous Edition
            </span>

            <p className="mt-1 text-sm font-bold tracking-[-0.01em] text-white">
              Day {index + 1} Highlights
            </p>
          </div>

          <div className="flex size-8 shrink-0 items-center justify-center border border-white/20 bg-white/10 backdrop-blur-sm">
            <ArrowUpRight className="size-3.5 text-brand transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </div>
        </div>
      </div>

      {/* Hover line */}
      <span className="absolute inset-x-0 bottom-0 h-[3px] origin-left scale-x-0 bg-brand transition-transform duration-500 group-hover:scale-x-100" />
    </motion.article>
  );
}

/* =========================================================
   PARTICIPANTS
========================================================= */

function Participants() {
  const reducedMotion = useReducedMotion();

  return (
    <section className="relative overflow-hidden border-y border-zinc-200 bg-[#f4f4f1] py-14 sm:py-16 lg:py-18">
      <Container>
        <motion.div
          initial={
            reducedMotion
              ? false
              : {
                  opacity: 0,
                  y: 25,
                }
          }
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
            amount: 0.25,
          }}
          transition={{
            duration: 0.65,
            ease,
          }}
        >
          <Eyebrow>Past Participants</Eyebrow>

          <h2 className="mt-4 max-w-3xl text-[clamp(1.9rem,3.1vw,3.15rem)] font-black uppercase leading-[0.98] tracking-[-0.05em] text-zinc-950">
            Leading brands that have been
            <span className="text-brand"> part of the expo.</span>
          </h2>
        </motion.div>
      </Container>

      <LogoMarquee reducedMotion={reducedMotion} />
    </section>
  );
}

/* =========================================================
   LOGO MARQUEE
========================================================= */

function LogoMarquee({
  reducedMotion,
}: {
  reducedMotion: boolean | null;
}) {
  const logos = [...participantLogos, ...participantLogos];

  return (
    <div className="group relative mt-9 overflow-hidden sm:mt-10">
      {/* Fade edges */}
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-[#f4f4f1] to-transparent sm:w-28" />

      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-[#f4f4f1] to-transparent sm:w-28" />

      <motion.div
        className="flex w-max"
        animate={
          reducedMotion
            ? undefined
            : {
                x: ["0%", "-50%"],
              }
        }
        transition={
          reducedMotion
            ? undefined
            : {
                x: {
                  duration: 38,
                  repeat: Infinity,
                  ease: "linear",
                },
              }
        }
      >
        {logos.map(([name, file], i) => (
          <div
            key={`${name}-${i}`}
            className="group/logo relative flex h-24 w-40 shrink-0 items-center justify-center border-y border-r border-zinc-200 bg-white sm:h-28 sm:w-48"
          >
            <Image
              src={`/image/${file}`}
              alt={name}
              fill
              sizes="192px"
              className="object-contain p-5 grayscale opacity-60 transition-all duration-500 group-hover/logo:grayscale-0 group-hover/logo:opacity-100"
            />

            <span className="absolute inset-x-0 bottom-0 h-px origin-left scale-x-0 bg-brand transition-transform duration-300 group-hover/logo:scale-x-100" />
          </div>
        ))}
      </motion.div>
    </div>
  );
}

/* =========================================================
   PARTNERS
========================================================= */

function Partners() {
  const reducedMotion = useReducedMotion();

  return (
    <section className="bg-white py-12 sm:py-14 lg:py-16">
      <Container>
        <motion.div
          initial={
            reducedMotion
              ? false
              : {
                  opacity: 0,
                  y: 25,
                }
          }
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
            amount: 0.25,
          }}
          transition={{
            duration: 0.65,
            ease,
          }}
          className="grid overflow-hidden border border-zinc-200 md:grid-cols-2"
        >
          <Partner title="Organiser">
            <Image
              src="/image/futurex.jpg"
              alt="Futurex Trade Fair & Events Pvt. Ltd."
              width={210}
              height={90}
              className="max-h-20 w-auto object-contain"
            />
          </Partner>

          <Partner title="LanYard Sponsor">
            <Image
              src="/image/crusher.png"
              alt="Mr Crusher"
              width={210}
              height={90}
              className="max-h-20 w-auto object-contain"
            />
          </Partner>
        </motion.div>
      </Container>
    </section>
  );
}

/* =========================================================
   PARTNER CARD
========================================================= */

function Partner({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="group relative flex min-h-[165px] flex-col justify-center overflow-hidden border-b border-zinc-200 p-7 transition-colors duration-300 hover:bg-zinc-50 last:border-b-0 md:min-h-[180px] md:border-b-0 md:border-r md:last:border-r-0">
      {/* Label */}
      <div className="mb-5 flex items-center gap-3">
        <span className="h-px w-6 bg-brand transition-all duration-300 group-hover:w-9" />

        <p className="text-[9px] font-black uppercase tracking-[0.18em] text-zinc-900">
          {title}
        </p>
      </div>

      {children}

      {/* Bottom accent */}
      <span className="absolute inset-x-0 bottom-0 h-[3px] origin-left scale-x-0 bg-brand transition-transform duration-500 group-hover:scale-x-100" />
    </div>
  );
}

/* =========================================================
   FINAL CTA
========================================================= */

function FinalCTA() {
  const reducedMotion = useReducedMotion();

  return (
    <section className="relative isolate overflow-hidden bg-brand">
      {/* Animated background */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute -right-20 top-1/2 size-[420px] -translate-y-1/2 rounded-full bg-black/[0.06] blur-[100px]"
        animate={
          reducedMotion
            ? undefined
            : {
                x: [0, -25, 0],
                y: [0, 20, 0],
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

      {/* Geometric mining graphic */}
      <CTAVisual reducedMotion={reducedMotion} />

      <Container className="relative z-10 flex flex-col gap-9 py-14 sm:py-16 lg:min-h-[340px] lg:flex-row lg:items-end lg:justify-between lg:gap-14 lg:py-18">
        {/* Content */}
        <motion.div
          initial={
            reducedMotion
              ? false
              : {
                  opacity: 0,
                  y: 30,
                }
          }
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
          className="max-w-[850px]"
        >
          <div className="flex items-center gap-3">
            <span className="relative h-[2px] w-9 bg-black">
              <span className="absolute -right-1 top-1/2 size-1.5 -translate-y-1/2 rotate-45 bg-black" />
            </span>

            <p className="text-[9px] font-black uppercase tracking-[0.18em] text-black sm:text-[10px]">
              Exhibit · Engage · Grow
            </p>
          </div>

          <h2 className="mt-4 max-w-[850px] text-[clamp(2rem,3.5vw,3.7rem)] font-black uppercase leading-[0.95] tracking-[-0.055em] text-black">
            Unlock endless business possibilities at India&apos;s mining
            revolution
          </h2>

          <p className="mt-4 max-w-[650px] text-[13px] font-medium leading-6 text-black/70 sm:text-sm sm:leading-7">
            India is the world&apos;s next mining powerhouse. Be where the
            growth is — 07–10 January 2027, Bhubaneswar.
          </p>
        </motion.div>

        {/* Buttons */}
        <motion.div
          initial={
            reducedMotion
              ? false
              : {
                  opacity: 0,
                  y: 30,
                }
          }
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
            delay: 0.1,
            ease,
          }}
          className="relative flex w-full flex-col gap-2.5 sm:w-auto sm:flex-row lg:min-w-[310px] lg:flex-col"
        >
          {/* Exhibit */}
          <a
            href="/exhibitor-registration"
            className="group inline-flex min-h-12 w-full items-center justify-center gap-3 !border !border-black !bg-black px-6 text-[10px] font-black uppercase tracking-[0.09em] !text-white no-underline transition-all duration-300 hover:!border-white hover:!bg-white hover:!text-black focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/50"
          >
            <span>Exhibit Now</span>

            <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
          </a>

          {/* Visit */}
          <a
            href="/visitor-registration"
            className="group inline-flex min-h-12 w-full items-center justify-center gap-3 !border !border-black/80 !bg-transparent px-6 text-[10px] font-black uppercase tracking-[0.09em] !text-black no-underline transition-all duration-300 hover:!border-black hover:!bg-black hover:!text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/50"
          >
            <span>Register to Visit — Free</span>

            <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </a>
        </motion.div>
      </Container>

      {/* Bottom line */}
      <motion.div
        initial={
          reducedMotion
            ? false
            : {
                scaleX: 0,
              }
        }
        whileInView={{
          scaleX: 1,
        }}
        viewport={{
          once: true,
        }}
        transition={{
          duration: 0.9,
          ease,
        }}
        className="absolute inset-x-0 bottom-0 h-px origin-left bg-black/25"
      />
    </section>
  );
}

/* =========================================================
   CTA VISUAL
========================================================= */

function CTAVisual({
  reducedMotion,
}: {
  reducedMotion: boolean | null;
}) {
  return (
    <motion.svg
      aria-hidden
      viewBox="0 0 800 420"
      preserveAspectRatio="none"
      className="pointer-events-none absolute right-0 top-0 h-full w-full opacity-[0.075] sm:w-[70%] lg:w-[52%]"
      animate={
        reducedMotion
          ? undefined
          : {
              x: [0, -10, 0],
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
          <stop
            offset="100%"
            stopColor="#000000"
            stopOpacity="0.35"
          />
        </linearGradient>
      </defs>

      {/* Main mining geometry */}
      <polygon
        points="290,0 800,0 800,150 500,330"
        fill="url(#ctaDark)"
      />

      {/* Lower terrain */}
      <polygon
        points="500,330 800,150 800,300 555,420"
        fill="#000"
        opacity=".55"
      />

      {/* Excavator boom inspired shape */}
      <polygon
        points="290,0 500,330 470,350 235,0"
        fill="#000"
        opacity=".5"
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

      <path
        d="M470 350 L800 155"
        fill="none"
        stroke="#000"
        strokeWidth="1"
        strokeOpacity=".4"
      />
    </motion.svg>
  );
}

/* =========================================================
   EYEBROW
========================================================= */

function Eyebrow({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-center gap-3">
      <span className="relative h-[2px] w-9 shrink-0 bg-brand">
        <span className="absolute -right-1 top-1/2 size-1.5 -translate-y-1/2 rotate-45 bg-brand" />
      </span>

      <p className="text-[9px] font-black uppercase tracking-[0.18em] text-zinc-950 sm:text-[10px]">
        {children}
      </p>
    </div>
  );
}