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
      reducedMotion ? 500 : 1800
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
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            transition: {
              duration: reducedMotion ? 0.2 : 0.45,
              ease: [0.16, 1, 0.3, 1],
            },
          }}
          className="fixed inset-0 z-[9999] bg-[#050505] text-white"
        >
          <div className="relative flex h-full items-center overflow-hidden">
            {/* RIGHT GEOMETRY */}
            <motion.div
              aria-hidden
              initial={
                reducedMotion
                  ? false
                  : {
                      opacity: 0,
                      x: 50,
                    }
              }
              animate={{
                opacity: 1,
                x: 0,
              }}
              transition={{
                duration: 1,
                delay: 0.12,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="pointer-events-none absolute inset-y-0 right-0 hidden w-[34%] md:block"
            >
              <svg
                viewBox="0 0 520 760"
                preserveAspectRatio="xMaxYMid slice"
                className="h-full w-full"
              >
                <polygon
                  points="180,0 520,0 520,235 330,340"
                  fill="#F9B900"
                />

                <polygon
                  points="330,340 520,235 520,460 390,535"
                  fill="#8B6100"
                />

                <polygon
                  points="390,535 520,460 520,760 465,760"
                  fill="#171717"
                />

                <path
                  d="M330 340 L520 235"
                  stroke="#FFD84A"
                  strokeWidth="1.2"
                  strokeOpacity=".45"
                />
              </svg>
            </motion.div>

            {/* CONTENT */}
            <div className="relative z-10 mx-auto w-full max-w-7xl px-6 sm:px-8 lg:px-10">
              <div className="max-w-lg">
                {/* LOGO */}
                <motion.div
                  initial={
                    reducedMotion
                      ? false
                      : {
                          opacity: 0,
                          y: 14,
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
                    width={240}
                    height={90}
                    priority
                    className="h-auto w-[170px] sm:w-[190px]"
                  />
                </motion.div>

                {/* EYEBROW */}
                <motion.div
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
                    duration: 0.5,
                    delay: 0.15,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="mt-7 flex items-center gap-3"
                >
                  <span className="h-[2px] w-8 bg-brand" />

                  <p className="text-[9px] font-extrabold uppercase tracking-[.18em] text-brand sm:text-[10px]">
                    5th Edition · 07–10 January 2027
                  </p>
                </motion.div>

                {/* HEADLINE */}
                <motion.h2
                  initial={
                    reducedMotion
                      ? false
                      : {
                          opacity: 0,
                          y: 18,
                        }
                  }
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  transition={{
                    duration: 0.65,
                    delay: 0.24,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="mt-4 max-w-md text-[clamp(1.9rem,4vw,3.25rem)] font-black leading-[.98] tracking-[-.045em]"
                >
                  Mining.
                  <br />
                  Infrastructure.
                  <br />

                  <span className="text-brand">
                    Industry in motion.
                  </span>
                </motion.h2>

                {/* META */}
                <motion.p
                  initial={
                    reducedMotion
                      ? false
                      : {
                          opacity: 0,
                          y: 8,
                        }
                  }
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  transition={{
                    duration: 0.5,
                    delay: 0.34,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="mt-4 max-w-md text-xs leading-6 text-white/45 sm:text-sm"
                >
                  Odisha Mining & Infrastructure
                  International Expo · Bhubaneswar
                </motion.p>

                {/* PROGRESS */}
                <motion.div
                  initial={
                    reducedMotion
                      ? false
                      : {
                          opacity: 0,
                        }
                  }
                  animate={{
                    opacity: 1,
                  }}
                  transition={{
                    duration: 0.35,
                    delay: 0.42,
                  }}
                  className="mt-8 w-full max-w-[300px]"
                >
                  <div className="h-px overflow-hidden bg-white/15">
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
                          : 1.15,
                        delay: reducedMotion
                          ? 0
                          : 0.45,
                        ease: [0.16, 1, 0.3, 1],
                      }}
                      className="h-full origin-left bg-brand"
                    />
                  </div>

                  <div className="mt-3 flex items-center justify-between">
                    <p className="text-[8px] font-bold uppercase tracking-[.16em] text-white/30">
                      Loading experience
                    </p>

                    <motion.span
                      initial={{
                        opacity: 0,
                      }}
                      animate={{
                        opacity: 1,
                      }}
                      transition={{
                        delay: 0.6,
                      }}
                      className="text-[8px] font-extrabold uppercase tracking-[.16em] text-brand"
                    >
                      OMIIE 2027
                    </motion.span>
                  </div>
                </motion.div>
              </div>
            </div>

            {/* TOP + BOTTOM HAIRLINES */}
            <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-white/10" />

            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-white/10">
              <motion.div
                initial={{
                  scaleX: 0,
                }}
                animate={{
                  scaleX: 1,
                }}
                transition={{
                  duration: reducedMotion ? 0.3 : 1.4,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="h-full origin-left bg-brand"
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}