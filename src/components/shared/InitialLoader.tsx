"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

// Premium Apple-like smooth easing curve
const PREMIUM_EASE = [0.22, 1, 0.36, 1] as const;
const EXIT_EASE = [0.76, 0, 0.24, 1] as const;

export function InitialLoader() {
  const [visible, setVisible] = useState(true);
  const [isMounted, setIsMounted] = useState(false);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    setIsMounted(true);

    // Check if user has already seen the loader in this session
    const hasSeenLoader = sessionStorage.getItem("hasSeenLoader");

    if (hasSeenLoader) {
      // Agar already dekh liya hai, toh bina load kiye turant hide kardo
      setVisible(false);
      return;
    }

    // Scroll block karna
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    // 2.6 seconds ka premium loading experience
    const timer = window.setTimeout(() => {
      setVisible(false);
      sessionStorage.setItem("hasSeenLoader", "true"); // Session me save kar diya
    }, 2600);

    return () => {
      window.clearTimeout(timer);
      document.body.style.overflow = previousOverflow;
    };
  }, []);

  useEffect(() => {
    if (!visible && isMounted) {
      document.body.style.overflow = "";
    }
  }, [visible, isMounted]);

  // Premium Clip-path Reveal Animation
  const textReveal = {
    hidden: { opacity: 0, y: "100%" },
    visible: {
      opacity: 1,
      y: "0%",
      transition: { duration: 1, ease: PREMIUM_EASE },
    },
  };

  // Agar component mount nahi hua ya visible false hai pehle se (session storage true), toh render mat karo
  if (isMounted && !visible) return null;

  return (
    <AnimatePresence mode="wait">
      {visible && (
        <motion.div
          key="initial-loader"
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            y: "-100%", // Exit hone pe slide up hoga (Premium feel)
            transition: {
              duration: reducedMotion ? 0.2 : 0.8,
              ease: EXIT_EASE,
            },
          }}
          className="fixed inset-0 z-[9999] overflow-hidden bg-[#030303] text-white"
        >
          {/* Subtle Ambient Glow */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 2, ease: PREMIUM_EASE }}
            aria-hidden
            className="pointer-events-none absolute left-[12%] top-[24%] h-[400px] w-[400px] rounded-full bg-[#f9b900]/[0.05] blur-[120px]"
          />

          {/* Cinematic Grain Effect */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 opacity-[0.04] mix-blend-soft-light"
            style={{
              backgroundImage:
                'url("data:image/svg+xml,%3Csvg viewBox=%270 0 180 180%27 xmlns=%27http://www.w3.org/2000/svg%27%3E%3Cfilter id=%27n%27%3E%3CfeTurbulence type=%27fractalNoise%27 baseFrequency=%270.85%27 numOctaves=%274%27 stitchTiles=%27stitch%27/%3E%3C/filter%3E%3Crect width=%27100%25%27 height=%27100%25%27 filter=%27url(%23n)%27 opacity=%271%27/%3E%3C/svg%3E")',
            }}
          />

          {/* Right Art Direction (Gold SVG) */}
          <motion.div
            aria-hidden
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.5, delay: 0.2, ease: PREMIUM_EASE }}
            className="pointer-events-none absolute inset-y-0 right-0 hidden w-[38%] md:block"
          >
            <svg
              viewBox="0 0 620 900"
              preserveAspectRatio="xMaxYMid slice"
              className="h-full w-full"
            >
              <defs>
                <linearGradient id="goldPrimary" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#FFD55A" />
                  <stop offset="45%" stopColor="#F9B900" />
                  <stop offset="100%" stopColor="#C98E00" />
                </linearGradient>
                <linearGradient id="goldDeep" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#9D7107" />
                  <stop offset="100%" stopColor="#4D3500" />
                </linearGradient>
                <linearGradient id="darkPanel" x1="0" y1="0" x2="1" y2="1">
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

          <div className="relative flex h-full items-center">
            <div className="mx-auto w-full max-w-7xl px-6 sm:px-8 lg:px-10">
              <motion.div
                initial="hidden"
                animate="visible"
                transition={{ staggerChildren: 0.15, delayChildren: 0.2 }}
                className="max-w-[560px]"
              >
                {/* Logo Reveal */}
                <motion.div
                  variants={textReveal}
                  className="overflow-hidden pb-2"
                >
                  <Image
                    src="/image/5th-Odisha-Logo_White.png"
                    alt="Odisha Mining Expo"
                    width={260}
                    height={98}
                    priority
                    className="h-auto w-[172px] sm:w-[195px]"
                  />
                </motion.div>

                {/* Eyebrow */}
                <motion.div
                  variants={textReveal}
                  className="mt-8 flex items-center gap-3 overflow-hidden"
                >
                  <motion.span
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{
                      duration: 0.8,
                      delay: 0.5,
                      ease: PREMIUM_EASE,
                    }}
                    className="h-px w-9 origin-left bg-[#F9B900]"
                  />
                  <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-[#F9B900] sm:text-[10px]">
                    5th Edition · 07–10 January 2027
                  </p>
                </motion.div>

                {/* Headline - Cinematic Split Line Reveal */}
                <div className="mt-5">
                  <h1 className="max-w-xl text-[clamp(2rem,4.4vw,3.7rem)] font-black leading-[1.05] tracking-[-0.055em]">
                    <span className="block overflow-hidden">
                      <motion.span variants={textReveal} className="block">
                        Mining.
                      </motion.span>
                    </span>
                    <span className="block overflow-hidden">
                      <motion.span variants={textReveal} className="block">
                        Infrastructure.
                      </motion.span>
                    </span>
                    <span className="block overflow-hidden pb-2">
                      <motion.span
                        variants={textReveal}
                        className="block bg-gradient-to-r from-[#FFD65A] via-[#F9B900] to-[#C98E00] bg-clip-text text-transparent"
                      >
                        Industry in motion.
                      </motion.span>
                    </span>
                  </h1>
                </div>

                {/* Meta Description */}
                <motion.div variants={textReveal} className="overflow-hidden">
                  <p className="mt-4 max-w-[470px] text-[11px] leading-5 text-white/40 sm:text-[13px] sm:leading-6">
                    Odisha Mining & Infrastructure International Expo
                    <span className="mx-3 text-white/20">|</span>
                    Bhubaneswar
                  </p>
                </motion.div>

                {/* Premium Progress Bar */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1, duration: 0.8, ease: PREMIUM_EASE }}
                  className="mt-12 w-full max-w-[330px]"
                >
                  <div className="relative h-[2px] overflow-hidden rounded-full bg-white/[0.08]">
                    <motion.div
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: [0, 0.3, 0.7, 1] }}
                      transition={{
                        duration: 2.2, // Authentic loading timing
                        times: [0, 0.4, 0.8, 1], // Slow-fast-slow feel
                        ease: "easeInOut",
                      }}
                      className="absolute inset-0 origin-left rounded-full bg-gradient-to-r from-[#D99D00] via-[#FFD65A] to-[#F9B900] shadow-[0_0_10px_rgba(249,185,0,0.5)]"
                    />
                  </div>

                  <div className="mt-4 flex items-center justify-between">
                    <p className="text-[8px] font-semibold uppercase tracking-[0.2em] text-white/30">
                      Initiating Experience
                    </p>
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: [0, 1, 0.5, 1] }}
                      transition={{ delay: 1.2, duration: 1 }}
                      className="text-[8px] font-bold uppercase tracking-[0.2em] text-[#F9B900]"
                    >
                      Odisha Mining & Infrastructure International Expo 2027
                    </motion.p>
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </div>

          {/* Footer Line with loading animation */}
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-white/[0.05]">
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 2.4, ease: PREMIUM_EASE }}
              className="h-full origin-left bg-gradient-to-r from-transparent via-[#F9B900]/50 to-transparent"
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
