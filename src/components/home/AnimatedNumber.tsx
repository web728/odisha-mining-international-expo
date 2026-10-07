"use client";

import { useEffect, useMemo, useRef, useState } from "react";

export function AnimatedNumber({
  value,
}: {
  value: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);

  const match = useMemo(
    () => value.match(/^([\d,]+)(.*)$/),
    [value],
  );

  const [shown, setShown] = useState(value);

  useEffect(() => {
    setShown(value);

    if (!match || !ref.current) return;

    const target = Number(
      match[1].replaceAll(",", ""),
    );

    const suffix = match[2];

    if (!Number.isFinite(target)) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return;

        const start = performance.now();
        const duration = 1400;

        const animate = (time: number) => {
          const progress = Math.min(
            (time - start) / duration,
            1,
          );

          const eased =
            1 - Math.pow(1 - progress, 4);

          const number = Math.round(
            target * eased,
          );

          setShown(
            `${number.toLocaleString("en-IN")}${suffix}`,
          );

          if (progress < 1) {
            requestAnimationFrame(animate);
          }
        };

        requestAnimationFrame(animate);
        observer.disconnect();
      },
      {
        threshold: 0.45,
      },
    );

    observer.observe(ref.current);

    return () => {
      observer.disconnect();
    };
  }, [match, value]);

  return (
    <span
      ref={ref}
      aria-hidden="true"
    >
      {shown}
    </span>
  );
}