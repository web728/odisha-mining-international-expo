"use client";

import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";

const TARGET_DATE = new Date("2027-01-07T09:00:00+05:30").getTime();

function getTimeLeft() {
  const distance = Math.max(0, TARGET_DATE - Date.now());

  return {
    days: Math.floor(distance / 86_400_000),
    hours: Math.floor(distance / 3_600_000) % 24,
    minutes: Math.floor(distance / 60_000) % 60,
    seconds: Math.floor(distance / 1_000) % 60,
  };
}

export function Countdown() {
  const [time, setTime] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    setTime(getTimeLeft());

    const timer = window.setInterval(() => {
      setTime(getTimeLeft());
    }, 1000);

    return () => window.clearInterval(timer);
  }, []);

  const items = useMemo(
    () => [
      { label: "Days", value: time.days },
      { label: "Hours", value: time.hours },
      { label: "Minutes", value: time.minutes },
      { label: "Seconds", value: time.seconds },
    ],
    [time]
  );

  return (
    // mt-12 hata diya, width compact kardi
    <div className="w-full max-w-[550px]">
      {/* Sleek Eyebrow */}
      <div className="mb-3 flex items-center gap-2.5">
        <motion.span
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="h-px w-6 origin-left bg-[#F9B900]"
        />
        <p className="text-[8.5px] font-bold uppercase tracking-[0.2em] text-white/40">
          Event commences in
        </p>
      </div>

      {/* 
        Grid Container: 
        Mobile me bhi 4 columns (grid-cols-4) taaki height bhot kam le.
        Rounded corners lagaye hain soft premium feel ke liye.
      */}
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="grid grid-cols-4 gap-px rounded-sm border border-white/10 bg-white/10 overflow-hidden"
      >
        {items.map((item) => (
          <div
            key={item.label}
            className="group relative flex flex-col items-center justify-center bg-[#050505] py-4 transition-colors duration-500 hover:bg-[#0a0a0a] sm:py-5"
          >
            {/* Top Hover Gradient Line */}
            <span className="absolute inset-x-0 top-0 h-[2px] origin-left scale-x-0 bg-gradient-to-r from-[#FFD55A] via-[#F9B900] to-[#C98E00] transition-transform duration-500 ease-out group-hover:scale-x-100" />

            <div className="flex items-baseline gap-0.5">
              {/* Size text-4xl se chota karke text-2xl/text-3xl kar diya */}
              <span className="tabular-nums text-2xl font-bold tracking-tighter text-white/90 transition-colors duration-300 group-hover:text-white sm:text-3xl lg:text-4xl">
                {isMounted ? String(item.value).padStart(2, "0") : "00"}
              </span>

              {/* Minimal Dot */}
              <span className="mb-1 size-[3px] rounded-full bg-[#F9B900] opacity-80" />
            </div>

            <p className="mt-1 text-[7.5px] font-bold uppercase tracking-[0.2em] text-white/30 transition-colors duration-300 group-hover:text-[#F9B900]/80 sm:text-[8.5px]">
              {item.label}
            </p>

            {/* Subtle background glow effect on hover */}
            <div className="pointer-events-none absolute inset-0 bg-[#F9B900] opacity-0 mix-blend-overlay transition-opacity duration-500 group-hover:opacity-[0.03]" />
          </div>
        ))}
      </motion.div>
    </div>
  );
}