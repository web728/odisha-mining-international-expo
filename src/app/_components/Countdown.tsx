"use client";

import { useEffect, useMemo, useState } from "react";

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
  const [time, setTime] = useState(getTimeLeft);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setTime(getTimeLeft());
    }, 1000);

    return () => window.clearInterval(timer);
  }, []);

  const items = useMemo(
    () => [
      ["Days", time.days],
      ["Hours", time.hours],
      ["Minutes", time.minutes],
      ["Seconds", time.seconds],
    ],
    [time]
  );

  return (
    <div className="mt-10 max-w-3xl">
      <div className="mb-4 flex items-center gap-3">
        <span className="h-px w-8 bg-yellow-300" />
        <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-zinc-400">
          Event starts in
        </p>
      </div>

      <div className="grid grid-cols-2 border-l border-t border-white/10 sm:grid-cols-4">
        {items.map(([label, value]) => (
          <div
            key={label}
            className="group relative overflow-hidden border-b border-r border-white/10 bg-white/[0.035] px-4 py-5 backdrop-blur-sm transition duration-500 hover:bg-white/[0.065] sm:px-5 sm:py-6"
          >
            <span className="absolute inset-x-0 bottom-0 h-[2px] origin-left scale-x-0 bg-yellow-300 transition-transform duration-500 group-hover:scale-x-100" />

            <div className="flex items-end gap-1">
              <span className="counter-number text-3xl font-bold leading-none tracking-[-0.06em] text-white sm:text-4xl lg:text-5xl">
                {String(value).padStart(2, "0")}
              </span>

              <span className="mb-1 size-1 rounded-full bg-yellow-300" />
            </div>

            <p className="mt-3 text-[9px] font-bold uppercase tracking-[0.18em] text-zinc-500 sm:text-[10px]">
              {label}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}