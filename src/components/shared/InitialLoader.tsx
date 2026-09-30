"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
} from "framer-motion";

export function InitialLoader() {
  const [visible, setVisible] = useState(true);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const previousOverflow =
      document.body.style.overflow;

    document.body.style.overflow = "hidden";

    const timer = window.setTimeout(
      () => {
        setVisible(false);
      },
      reducedMotion ? 450 : 1500
    );

    return () => {
      window.clearTimeout(timer);
      document.body.style.overflow =
        previousOverflow;
    };
  }, [reducedMotion]);

  useEffect(() => {
    if (!visible) {
      document.body.style.overflow = "";
    }
  }, [visible]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{
            opacity: 1,
          }}
          exit={{
            opacity: 0,
            transition: {
              duration: reducedMotion
                ? 0.2
                : 0.5,
              ease: [0.16, 1, 0.3, 1],
            },
          }}
          className="fixed inset-0 z-[9999] overflow-hidden bg-[#050505]"
        >
          {/* Industrial geometry */}
          <motion.div
            aria-hidden
            initial={
              reducedMotion
                ? false
                : {
                    x: 90,
                    opacity: 0,
                  }
            }
            animate={{
              x: 0,
              opacity: 1,
            }}
            transition={{
              duration: 0.9,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="pointer-events-none absolute right-0 top-0 hidden h-full w-[38%] md:block"
          >
            <svg
              viewBox="0 0 600 800"
              preserveAspectRatio="xMaxYMid slice"
              className="h-full w-full"
            >
              <polygon
                points="220,0 600,0 600,250 395,365"
                fill="#F9B900"
              />

              <polygon
                points="395,365 600,250 600,475 455,555"
                fill="#936700"
              />

              <polygon
                points="455,555 600,475 600,800 525,800"
                fill="#161616"
              />

              <path
                d="M395 365 L600 250"
                stroke="#FFD84A"
                strokeWidth="1.5"
                strokeOpacity=".5"
              />
            </svg>
          </motion.div>

          <div className="relative z-10 flex h-full items-center">
            <div className="mx-auto w-full max-w-7xl px-5 sm:px-8 lg:px-10">
              <div className="max-w-xl">
                {/* Logo */}
                <motion.div
                  initial={
                    reducedMotion
                      ? false
                      : {
                          opacity: 0,
                          y: 12,
                        }
                  }
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  transition={{
                    duration: 0.55,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                >
                  <Image
                    src="/image/5th-Odisha-Logo_White.png"
                    alt="Odisha Mining Expo"
                    width={260}
                    height={90}
                    priority
                    className="h-auto w-[185px] sm:w-[220px]"
                  />
                </motion.div>

                {/* Accent */}
                <motion.div
                  initial={
                    reducedMotion
                      ? false
                      : {
                          scaleX: 0,
                        }
                  }
                  animate={{
                    scaleX: 1,
                  }}
                  transition={{
                    duration: 0.7,
                    delay: 0.15,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="mt-7 h-[2px] w-14 origin-left bg-brand"
                />

                {/* Copy */}
                <motion.p
                  initial={
                    reducedMotion
                      ? false
                      : {
                          opacity: 0,
                          y: 10,
                        }
                  }
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  transition={{
                    duration: 0.55,
                    delay: 0.22,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="mt-4 text-[10px] font-extrabold uppercase tracking-[.2em] text-white/50"
                >
                  07–10 January 2027 · Bhubaneswar
                </motion.p>

                <motion.h2
                  initial={
                    reducedMotion
                      ? false
                      : {
                          opacity: 0,
                          y: 16,
                        }
                  }
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  transition={{
                    duration: 0.65,
                    delay: 0.28,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="mt-3 text-[clamp(1.65rem,3vw,2.8rem)] font-black leading-[1] tracking-[-.045em] text-white"
                >
                  Mining. Infrastructure.
                  <br />

                  <span className="text-brand">
                    Industry in motion.
                  </span>
                </motion.h2>

                {/* Progress */}
                <div className="mt-8 w-full max-w-[280px] overflow-hidden bg-white/10">
                  <motion.div
                    initial={{
                      scaleX: 0,
                    }}
                    animate={{
                      scaleX: 1,
                    }}
                    transition={{
                      duration: reducedMotion
                        ? 0.3
                        : 1.25,
                      delay: reducedMotion
                        ? 0
                        : 0.12,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                    className="h-[2px] origin-left bg-brand"
                  />
                </div>

                <motion.p
                  initial={{
                    opacity: 0,
                  }}
                  animate={{
                    opacity: 1,
                  }}
                  transition={{
                    delay: 0.45,
                    duration: 0.4,
                  }}
                  className="mt-3 text-[9px] font-bold uppercase tracking-[.18em] text-white/30"
                >
                  Odisha Mining & Infrastructure
                  International Expo
                </motion.p>
              </div>
            </div>
          </div>

          {/* Bottom detail */}
          <div className="absolute inset-x-0 bottom-0 h-px bg-white/10">
            <motion.div
              initial={{
                scaleX: 0,
              }}
              animate={{
                scaleX: 1,
              }}
              transition={{
                duration: 1.3,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="h-full origin-left bg-brand"
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}