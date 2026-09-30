"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { useEffect, useState } from "react";

const ease = [0.16, 1, 0.3, 1] as const;

export function GalleryGrid({ images }: { images: string[] }) {
  const [limit, setLimit] = useState(16);
  const [active, setActive] = useState<number | null>(null);

  const move = (dir: number) =>
    setActive((i) =>
      i === null ? null : (i + dir + images.length) % images.length
    );

  useEffect(() => {
    if (active === null) return;

    document.body.style.overflow = "hidden";

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActive(null);
      if (e.key === "ArrowLeft") move(-1);
      if (e.key === "ArrowRight") move(1);
    };

    window.addEventListener("keydown", onKey);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [active]);

  return (
    <>
      <div className="grid grid-cols-2 gap-3 md:grid-cols-3 xl:grid-cols-4">
        {images.slice(0, limit).map((src, i) => (
          <motion.button
            key={src}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "60px" }}
            transition={{
              duration: 0.5,
              delay: (i % 8) * 0.025,
              ease,
            }}
            whileHover={{
              y: -8,
              rotateX: 2,
              rotateY: i % 2 ? 2 : -2,
              scale: 1.015,
            }}
            onClick={() => setActive(i)}
            style={{ transformPerspective: 900 }}
            className="group relative aspect-[4/3] overflow-hidden bg-zinc-100 text-left shadow-[0_8px_30px_rgba(0,0,0,.06)] transition-shadow duration-500 hover:shadow-[0_20px_50px_rgba(0,0,0,.18)]"
          >
            <Image
              src={src}
              alt={`Odisha Mining Expo gallery image ${i + 1}`}
              fill
              loading={i < 8 ? "eager" : "lazy"}
              quality={80}
              sizes="(max-width:768px) 50vw, (max-width:1280px) 33vw, 25vw"
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.045]"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

            <span className="absolute bottom-4 left-4 translate-y-2 text-[9px] font-extrabold uppercase tracking-[.16em] text-white opacity-0 transition duration-300 group-hover:translate-y-0 group-hover:opacity-100">
              View Image
            </span>

            <span className="absolute inset-x-0 bottom-0 h-[3px] origin-left scale-x-0 bg-brand transition-transform duration-500 group-hover:scale-x-100" />
          </motion.button>
        ))}
      </div>

      {limit < images.length && (
        <div className="mt-10 flex justify-center">
          <button
            onClick={() => setLimit((v) => Math.min(v + 16, images.length))}
            className="border border-brand-black bg-brand-black px-7 py-3.5 text-[11px] font-extrabold uppercase tracking-[.1em] text-white transition duration-300 hover:border-brand hover:bg-brand hover:text-brand-black"
          >
            Load More
          </button>
        </div>
      )}

      <AnimatePresence>
        {active !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActive(null)}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 p-4 sm:p-8"
            role="dialog"
            aria-modal="true"
          >
            <button
              onClick={() => setActive(null)}
              aria-label="Close image"
              className="absolute right-5 top-5 z-30 grid size-11 place-items-center border border-white/20 bg-black/50 text-white transition hover:border-brand hover:text-brand"
            >
              <X className="size-5" />
            </button>

            <NavButton side="left" onClick={() => move(-1)}>
              <ChevronLeft />
            </NavButton>

            <motion.div
              key={images[active]}
              initial={{ opacity: 0, scale: 0.97, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.4, ease }}
              onClick={(e) => e.stopPropagation()}
              className="relative h-[82vh] w-full max-w-6xl"
            >
              <Image
                src={images[active]}
                alt={`Odisha Mining Expo gallery image ${active + 1}`}
                fill
                quality={90}
                priority
                sizes="100vw"
                className="object-contain"
              />
 
            </motion.div>

            <NavButton side="right" onClick={() => move(1)}>
              <ChevronRight />
            </NavButton>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function NavButton({
  side,
  onClick,
  children,
}: {
  side: "left" | "right";
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={(e) => {
        e.stopPropagation();
        onClick();
      }}
      className={`absolute z-20 grid size-11 place-items-center border border-white/20 bg-black/50 text-white transition hover:border-brand hover:text-brand ${
        side === "left" ? "left-3 sm:left-7" : "right-3 sm:right-7"
      }`}
    >
      {children}
    </button>
  );
}