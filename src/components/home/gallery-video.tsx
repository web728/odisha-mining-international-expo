"use client";

import {
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";

import { motion } from "framer-motion";
import {
  ArrowUpRight,
  Play,
} from "lucide-react";

import { Container } from "@/components/ui/Container";
import Image from "next/image";

const ease = [0.16, 1, 0.3, 1] as const;

const reels = [
  {
    id: "lvFJPNJg1HE",
    day: "Day 01",
    label: "Day 1 Highlights",
    thumbnail: "/image/Day-1.jpg",
  },
  {
    id: "7pKg_lpkhNo",
    day: "Day 02",
    label: "Day 2 Highlights",
    thumbnail: "/image/Day-2.jpg",
  },
  {
    id: "ot83zSZdON0",
    day: "Day 03",
    label: "Day 3 Highlights",
    thumbnail: "/image/Day-3.jpg",
  },
  {
    id: "3phqYtd7ytA",
    day: "Final Day",
    label: "Final Day Highlights",
    thumbnail: "/image/Day-4.jpg",
  },
] as const;


function getEmbedUrl(videoId: string) {
  return `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&controls=0&loop=1&playlist=${videoId}&playsinline=1&rel=0&modestbranding=1`;
}

function getThumbnail(videoId: string) {
  return `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`;
}

export function Gallery() {
  const cardRefs =
    useRef<Array<HTMLElement | null>>([]);

  const [activeReel, setActiveReel] =
    useState<number | null>(null);

  const [isDesktop, setIsDesktop] =
    useState(false);

  /*
   * Desktop detection
   */
  useEffect(() => {
    const mediaQuery = window.matchMedia(
      "(min-width: 1024px) and (hover: hover) and (pointer: fine)"
    );

    const updateDevice = () => {
      setIsDesktop(mediaQuery.matches);
    };

    updateDevice();

    mediaQuery.addEventListener(
      "change",
      updateDevice
    );

    return () => {
      mediaQuery.removeEventListener(
        "change",
        updateDevice
      );
    };
  }, []);

  /*
   * Mobile:
   * whichever reel is most visible
   * becomes active automatically.
   */
  useEffect(() => {
    if (isDesktop) {
      setActiveReel(null);
      return;
    }

    const ratios = new Map<number, number>();

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const element =
            entry.target as HTMLElement;

          const index = Number(
            element.dataset.index
          );

          ratios.set(
            index,
            entry.isIntersecting
              ? entry.intersectionRatio
              : 0
          );
        });

        let bestIndex = -1;
        let bestRatio = 0;

        ratios.forEach((ratio, index) => {
          if (ratio > bestRatio) {
            bestRatio = ratio;
            bestIndex = index;
          }
        });

        if (
          bestIndex >= 0 &&
          bestRatio >= 0.58
        ) {
          setActiveReel(bestIndex);
        } else {
          setActiveReel(null);
        }
      },
      {
        threshold: [
          0,
          0.25,
          0.4,
          0.58,
          0.7,
          0.85,
          1,
        ],
      }
    );

    cardRefs.current.forEach((card) => {
      if (card) {
        observer.observe(card);
      }
    });

    return () => {
      observer.disconnect();
    };
  }, [isDesktop]);

  const handleMouseEnter = (
    index: number
  ) => {
    if (!isDesktop) return;

    setActiveReel(index);
  };

  const handleMouseLeave = () => {
    if (!isDesktop) return;

    setActiveReel(null);
  };

  return (
    <section className="section-space overflow-hidden bg-white">
      <Container>
        {/* Heading */}
        <motion.div
          initial={{
            opacity: 0,
            y: 20,
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
            duration: 0.6,
            ease,
          }}
          className="grid gap-6 lg:grid-cols-[1fr_.7fr] lg:items-end"
        >
          <div>
            <Eyebrow>
              Event Highlights
            </Eyebrow>

            <h2 className="mt-4 max-w-3xl text-[clamp(2rem,3.2vw,3.5rem)] font-black leading-[1.02] tracking-[-.045em] text-zinc-950">
              Experience the expo
              <span className="text-brand">
                {" "}
                day by day.
              </span>
            </h2>
          </div>

          <p className="max-w-lg text-sm leading-7 text-zinc-600 lg:justify-self-end">
            Relive the previous edition
            through four days of machinery,
            conversations, innovation and
            activity from across the
            exhibition floor.
          </p>
        </motion.div>

        {/* Mobile info */}
        <div className="mt-7 flex items-center justify-between border-y border-zinc-200 py-3 lg:hidden">
          <p className="text-[9px] font-extrabold uppercase tracking-[.16em] text-zinc-500">
            Swipe through the days
          </p>

          <span className="flex items-center gap-2 text-[9px] font-black uppercase tracking-[.16em] text-brand">
            <span className="size-1.5 animate-pulse bg-brand" />
            Auto Play
          </span>
        </div>

        {/* Reels */}
        <div className="mt-6 flex snap-x snap-mandatory gap-3 overflow-x-auto pb-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden lg:mt-10 lg:grid lg:grid-cols-4 lg:overflow-visible lg:pb-0">
          {reels.map(
            (reel, index) => {
              const isActive =
                activeReel === index;

              return (
                <motion.article
                  key={reel.id}
                  ref={(element) => {
                    cardRefs.current[
                      index
                    ] = element;
                  }}
                  data-index={index}
                  initial={{
                    opacity: 0,
                    y: 20,
                  }}
                  whileInView={{
                    opacity: 1,
                    y: 0,
                  }}
                  viewport={{
                    once: true,
                    amount: 0.15,
                  }}
                  transition={{
                    duration: 0.5,
                    delay:
                      index * 0.05,
                    ease,
                  }}
                  onMouseEnter={() =>
                    handleMouseEnter(index)
                  }
                  onMouseLeave={
                    handleMouseLeave
                  }
                  className="group relative aspect-[9/14] w-[78vw] max-w-[330px] shrink-0 snap-center overflow-hidden bg-black sm:w-[48vw] lg:w-auto lg:max-w-none"
                >
               {/* Media */}
<div className="absolute inset-0 overflow-hidden bg-zinc-950">
  {isActive ? (
    <iframe
      key={`${reel.id}-playing`}
      src={getEmbedUrl(reel.id)}
      title={reel.label}
      allow="autoplay; encrypted-media; picture-in-picture"
      allowFullScreen
      className="pointer-events-none absolute left-1/2 top-1/2 h-full w-[250%] -translate-x-1/2 -translate-y-1/2 border-0"
    />
  ) : (
    <Image
      src={reel.thumbnail}
      alt={`${reel.label} thumbnail`}
      fill
      sizes="(max-width: 640px) 78vw, (max-width: 1024px) 48vw, 25vw"
      className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.035]"
    />
  )}
</div>

                  {/* Dark treatment */}
              <div
  className={`pointer-events-none absolute inset-0 bg-gradient-to-t from-black/95 via-black/20 to-black/5 transition-opacity duration-500 ${
    isActive ? "opacity-55" : "opacity-75"
  }`}
/>

                  {/* Day */}
               <div className="pointer-events-none absolute left-0 top-0 z-10">
  <span className="inline-flex border-b border-r border-black/10 bg-brand px-3 py-2 text-[9px] font-black uppercase tracking-[.16em] text-brand-black">
    {reel.day}
  </span>
</div>

                  {/* Mobile playing */}
                  <div
                    className={`pointer-events-none absolute right-3 top-3 z-10 flex items-center gap-2 transition-opacity duration-300 lg:hidden ${
                      isActive
                        ? "opacity-100"
                        : "opacity-0"
                    }`}
                  >
                    <span className="size-1.5 animate-pulse bg-brand" />

                    <span className="text-[8px] font-black uppercase tracking-[.14em] text-white">
                      Playing
                    </span>
                  </div>

                  {/* Desktop play icon */}
                <div
  className={`pointer-events-none absolute left-1/2 top-1/2 z-10 hidden size-12 -translate-x-1/2 -translate-y-1/2 place-items-center border border-white/30 bg-black/35 backdrop-blur-md transition-all duration-300 lg:grid ${
    isActive
      ? "scale-90 opacity-0"
      : "scale-100 opacity-100"
  }`}
>
  <Play className="ml-0.5 size-4 fill-white text-white" />
</div>

                  {/* Bottom text */}
                 <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 p-5">
  <div className="flex items-end justify-between gap-4">
    <div>
      <p className="text-[9px] font-extrabold uppercase tracking-[.16em] text-brand">
        Previous Edition
      </p>

      <h3 className="mt-1.5 text-[15px] font-extrabold tracking-[-.02em] text-white">
        {reel.label}
      </h3>

      <p className="mt-2 hidden text-[9px] font-bold uppercase tracking-[.13em] text-white/40 lg:block">
        {isActive ? "Playing" : "Hover to play"}
      </p>
    </div>

    <ArrowUpRight
      className={`size-4 shrink-0 text-brand transition-transform duration-300 ${
        isActive
          ? "-translate-y-1 translate-x-1"
          : ""
      }`}
    />
  </div>
</div>

                  {/* Active bottom line */}
                  <span
                    className={`pointer-events-none absolute inset-x-0 bottom-0 z-20 h-[3px] origin-left bg-brand transition-transform duration-500 ${
                      isActive
                        ? "scale-x-100"
                        : "scale-x-0"
                    }`}
                  />
                </motion.article>
              );
            }
          )}
        </div>

        {/* Mobile progress */}
        <div className="mt-4 grid grid-cols-4 gap-1 lg:hidden">
          {reels.map(
            (reel, index) => (
              <span
                key={reel.id}
                className={`h-[2px] transition-colors duration-300 ${
                  activeReel === index
                    ? "bg-brand"
                    : "bg-zinc-200"
                }`}
              />
            )
          )}
        </div>
      </Container>
    </section>
  );
}

function Eyebrow({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="flex items-center gap-3">
      <span className="h-[2px] w-10 bg-brand" />

      <p className="text-[10px] font-extrabold uppercase tracking-[.18em] text-zinc-950">
        {children}
      </p>
    </div>
  );
}