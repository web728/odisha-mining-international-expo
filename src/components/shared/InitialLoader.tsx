"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
} from "framer-motion";

const EASE = [0.16, 1, 0.3, 1] as const;

export function InitialLoader() {
  const [visible, setVisible] = useState(true);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;

    document.body.style.overflow = "hidden";

    const timer = window.setTimeout(
      () => setVisible(false),
      reducedMotion ? 450 : 1750
    );

    return () => {
      window.clearTimeout(timer);
      document.body.style.overflow = previousOverflow;
    };
  }, [reducedMotion]);

  useEffect(() => {
    if (!visible) {
      document.body.style.overflow = "";
    }
  }, [visible]);

  const reveal = {
    hidden: {
      opacity: 0,
      y: reducedMotion ? 0 : 18,
      filter: reducedMotion ? "blur(0px)" : "blur(8px)",
    },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: {
        duration: reducedMotion ? 0.25 : 0.7,
        ease: EASE,
      },
    },
  };

  return (
    <AnimatePresence mode="wait">
      {visible && (
        <motion.div
          key="initial-loader"
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            scale: reducedMotion ? 1 : 1.012,
            filter: reducedMotion ? "blur(0px)" : "blur(4px)",
            transition: {
              duration: reducedMotion ? 0.18 : 0.5,
              ease: EASE,
            },
          }}
          className="fixed inset-0 z-[9999] overflow-hidden bg-[#050505] text-white"
        >
          {/* subtle ambient glow */}
          <div
            aria-hidden
            className="pointer-events-none absolute left-[12%] top-[24%] h-[320px] w-[320px] rounded-full bg-[#f9b900]/[0.045] blur-[100px]"
          />

          {/* grain */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 opacity-[0.035] mix-blend-soft-light"
            style={{
              backgroundImage:
                'url("data:image/svg+xml,%3Csvg viewBox=%270 0 180 180%27 xmlns=%27http://www.w3.org/2000/svg%27%3E%3Cfilter id=%27n%27%3E%3CfeTurbulence type=%27fractalNoise%27 baseFrequency=%270.85%27 numOctaves=%274%27 stitchTiles=%27stitch%27/%3E%3C/filter%3E%3Crect width=%27100%25%27 height=%27100%25%27 filter=%27url(%23n)%27 opacity=%271%27/%3E%3C/svg%3E")',
            }}
          />

          {/* RIGHT ART DIRECTION */}
          <motion.div
            aria-hidden
            initial={
              reducedMotion
                ? false
                : {
                    opacity: 0,
                    x: 70,
                    scale: 1.04,
                  }
            }
            animate={{
              opacity: 1,
              x: 0,
              scale: 1,
            }}
            transition={{
              duration: 1.15,
              delay: 0.08,
              ease: EASE,
            }}
            className="pointer-events-none absolute inset-y-0 right-0 hidden w-[38%] md:block"
          >
            <svg
              viewBox="0 0 620 900"
              preserveAspectRatio="xMaxYMid slice"
              className="h-full w-full"
            >
              <defs>
                <linearGradient
                  id="goldPrimary"
                  x1="0"
                  y1="0"
                  x2="1"
                  y2="1"
                >
                  <stop offset="0%" stopColor="#FFD55A" />
                  <stop offset="45%" stopColor="#F9B900" />
                  <stop offset="100%" stopColor="#C98E00" />
                </linearGradient>

                <linearGradient
                  id="goldDeep"
                  x1="0"
                  y1="0"
                  x2="1"
                  y2="1"
                >
                  <stop offset="0%" stopColor="#9D7107" />
                  <stop offset="100%" stopColor="#4D3500" />
                </linearGradient>

                <linearGradient
                  id="darkPanel"
                  x1="0"
                  y1="0"
                  x2="1"
                  y2="1"
                >
                  <stop offset="0%" stopColor="#1B1B1B" />
                  <stop offset="100%" stopColor="#090909" />
                </linearGradient>
              </defs>

              <polygon
                points="210,0 620,0 620,270 380,405"
                fill="url(#goldPrimary)"
              />

              <polygon
                points="380,405 620,270 620,545 450,640"
                fill="url(#goldDeep)"
              />

              <polygon
                points="450,640 620,545 620,900 515,900"
                fill="url(#darkPanel)"
              />

              <path
                d="M380 405 L620 270"
                stroke="#FFE69A"
                strokeWidth="1"
                strokeOpacity=".5"
              />

              <path
                d="M450 640 L620 545"
                stroke="#F9B900"
                strokeWidth="1"
                strokeOpacity=".16"
              />
            </svg>
          </motion.div>

          {/* vertical separator */}
          <motion.div
            aria-hidden
            initial={{ scaleY: 0 }}
            animate={{ scaleY: 1 }}
            transition={{
              duration: reducedMotion ? 0.25 : 1,
              delay: reducedMotion ? 0 : 0.15,
              ease: EASE,
            }}
            className="pointer-events-none absolute bottom-0 right-[38%] top-0 hidden w-px origin-bottom bg-white/[0.06] md:block"
          />

          <div className="relative flex h-full items-center">
            <div className="mx-auto w-full max-w-7xl px-6 sm:px-8 lg:px-10">
              <motion.div
                initial="hidden"
                animate="visible"
                transition={{
                  staggerChildren: reducedMotion ? 0 : 0.085,
                  delayChildren: reducedMotion ? 0 : 0.08,
                }}
                className="max-w-[560px]"
              >
                {/* logo */}
                <motion.div variants={reveal}>
                  <Image
                    src="/image/5th-Odisha-Logo_White.png"
                    alt="Odisha Mining Expo"
                    width={260}
                    height={98}
                    priority
                    className="h-auto w-[172px] sm:w-[195px]"
                  />
                </motion.div>

                {/* eyebrow */}
                <motion.div
                  variants={reveal}
                  className="mt-8 flex items-center gap-3"
                >
                  <motion.span
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{
                      duration: reducedMotion ? 0.2 : 0.65,
                      delay: reducedMotion ? 0 : 0.28,
                      ease: EASE,
                    }}
                    className="h-px w-9 origin-left bg-[#F9B900]"
                  />

                  <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-[#F9B900] sm:text-[10px]">
                    5th Edition · 07–10 January 2027
                  </p>
                </motion.div>

                {/* headline */}
                <motion.div variants={reveal} className="mt-5 overflow-hidden">
                  <h1 className="max-w-xl text-[clamp(2rem,4.4vw,3.7rem)] font-black leading-[0.94] tracking-[-0.055em]">
                    <span className="block">Mining.</span>
                    <span className="block">Infrastructure.</span>
                    <span className="block bg-gradient-to-r from-[#FFD65A] via-[#F9B900] to-[#C98E00] bg-clip-text text-transparent">
                      Industry in motion.
                    </span>
                  </h1>
                </motion.div>

                {/* meta */}
                <motion.p
                  variants={reveal}
                  className="mt-5 max-w-[470px] text-[11px] leading-5 text-white/40 sm:text-[13px] sm:leading-6"
                >
                  Odisha Mining & Infrastructure International Expo
                  <span className="mx-2 text-white/20">/</span>
                  Bhubaneswar
                </motion.p>

                {/* loader */}
                <motion.div
                  variants={reveal}
                  className="mt-10 w-full max-w-[330px]"
                >
                  <div className="relative h-px overflow-hidden bg-white/[0.14]">
                    <motion.div
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{
                        duration: reducedMotion ? 0.3 : 1.05,
                        delay: reducedMotion ? 0 : 0.5,
                        ease: EASE,
                      }}
                      className="absolute inset-0 origin-left bg-gradient-to-r from-[#D99D00] via-[#FFD65A] to-[#F9B900]"
                    />
                  </div>

                  <div className="mt-3 flex items-center justify-between">
                    <p className="text-[8px] font-semibold uppercase tracking-[0.18em] text-white/25">
                      Entering experience
                    </p>

                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{
                        delay: reducedMotion ? 0 : 0.72,
                        duration: 0.35,
                      }}
                      className="text-[8px] font-bold uppercase tracking-[0.18em] text-[#F9B900]"
                    >
                      OMIIE 2027
                    </motion.p>
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </div>

          {/* frame */}
          <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-white/[0.07]" />

          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-white/[0.08]">
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{
                duration: reducedMotion ? 0.25 : 1.45,
                ease: EASE,
              }}
              className="h-full origin-left bg-[#F9B900]"
            />
          </div>

          {/* corner detail */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{
              delay: reducedMotion ? 0 : 0.8,
              duration: 0.4,
            }}
            className="pointer-events-none absolute bottom-7 right-8 hidden items-center gap-2 md:flex"
          >
            <span className="text-[7px] font-semibold uppercase tracking-[0.22em] text-white/20">
              Odisha · India
            </span>
            <span className="h-px w-5 bg-[#F9B900]/50" />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}