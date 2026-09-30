"use client";

import { motion } from "framer-motion";

import { Container } from "@/components/ui/Container";
import { AnimatedNumber } from "@/components/home/AnimatedNumber";

const minerals = [
  ["Chromite", "96%"],
  ["Nickel Ore", "93%"],
  ["Bauxite", "41%"],
  ["Haematite Iron Ore", "39%"],
  ["Manganese Ore", "34%"],
  ["Coal", "25%"],
  ["Monazite", "24%"],
] as const;

const ease = [0.16, 1, 0.3, 1] as const;

export function OdishaMinerals() {
  return (
    <section className="section-space relative isolate overflow-hidden bg-brand-black text-white">
      <ContourGraphic />

      <Container className="relative">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.65, ease }}
          className="grid gap-7 lg:grid-cols-[1.1fr_.9fr] lg:items-end"
        >
          <div>
            <div className="mb-4 flex items-center gap-3">
              <span className="h-[2px] w-10 bg-brand" />
              <p className="text-[10px] font-extrabold uppercase tracking-[.18em] text-brand">
                Mineral Reserves
              </p>
            </div>

            <h2 className="max-w-3xl text-[clamp(2rem,3.3vw,3.6rem)] font-black leading-[1.02] tracking-[-.045em]">
              Odisha&apos;s share of India&apos;s
              <span className="text-brand"> identified mineral resources.</span>
            </h2>
          </div>

          <p className="max-w-xl text-sm leading-7 text-white/70 lg:justify-self-end">
            Odisha has a nationally significant mineral resource base,
            supporting a strong ecosystem of mining, mineral processing,
            metals, infrastructure and allied industries.
          </p>
        </motion.div>

        <div className="mt-10 grid grid-cols-2 border-l border-t border-white/10 sm:grid-cols-4 lg:grid-cols-7">
          {minerals.map(([name, percent], index) => (
            <motion.article
              key={name}
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.05, ease }}
              whileHover={{ y: -4 }}
              className="group relative min-h-[145px] overflow-hidden border-b border-r border-white/10 bg-white/[.02] p-5 transition-colors duration-500 hover:bg-white/[.06]"
            >
              <span className="absolute right-4 top-4 text-[9px] font-bold tracking-[.14em] text-white/20 group-hover:text-brand/70">
                {String(index + 1).padStart(2, "0")}
              </span>

              <div className="counter-number text-3xl font-black tracking-[-.055em] text-brand">
                <AnimatedNumber value={percent} />
              </div>

              <p className="mt-3 text-[11px] font-semibold uppercase leading-5 tracking-[.08em] text-white/70 group-hover:text-white">
                {name}
              </p>

              <span className="absolute inset-x-0 bottom-0 h-[2px] origin-left scale-x-0 bg-brand transition-transform duration-500 group-hover:scale-x-100" />
            </motion.article>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, delay: 0.1, ease }}
          className="mt-7 max-w-3xl text-sm leading-7 text-white/60"
        >
          Odisha&apos;s mineral resource base creates significant opportunities
          for investment, technology, infrastructure development and industry
          partnerships across the mining and allied sectors.
        </motion.p>
      </Container>
    </section>
  );
}

function ContourGraphic() {
  return (
    <svg
      aria-hidden
      viewBox="0 0 900 600"
      className="pointer-events-none absolute -right-[12%] top-1/2 -z-10 hidden w-[820px] -translate-y-1/2 opacity-[.11] lg:block"
      fill="none"
    >
      {[70, 130, 190, 250, 310].map((x, i) => (
        <path
          key={x}
          d={`M${x} 520C190 390 230 220 380 150C535 78 680 145 860 35`}
          stroke={i === 2 ? "#F9B900" : "#FFFFFF"}
          strokeOpacity={i === 2 ? ".8" : ".24"}
        />
      ))}
      <circle cx="380" cy="150" r="4" fill="#F9B900" />
    </svg>
  );
}