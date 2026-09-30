"use client";

import { motion } from "framer-motion";

import { Container } from "@/components/ui/Container";
import { ButtonLink } from "@/components/ui/ButtonLink";

import { AnimatedNumber } from "./AnimatedNumber";
import { minerals } from "./home.data";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0 },
};

export function OdishaAdvantage() {
  return (
    <section className="section-space relative isolate overflow-hidden bg-brand-black text-white">
      <ContourGraphic />

      <Container className="relative">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
          className="grid gap-7 lg:grid-cols-[1.1fr_.9fr] lg:items-end"
        >
          <div>
            <div className="mb-4 flex items-center gap-3">
              <span className="h-[2px] w-10 bg-brand" />
              <p className="text-[10px] font-extrabold uppercase tracking-[.18em] text-brand">
                Why Odisha
              </p>
            </div>

            <h2 className="max-w-3xl text-[clamp(2rem,3.3vw,3.6rem)] font-black leading-[1.02] tracking-[-.045em]">
              Odisha&apos;s share of India&apos;s
              <span className="text-brand"> identified mineral resources</span>
            </h2>
          </div>

          <p className="max-w-xl text-sm leading-7 text-white/70 lg:justify-self-end">
            Odisha has a nationally significant mineral resource base,
            supporting a strong ecosystem of mining, mineral processing,
            metals, infrastructure and allied industries.
          </p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.15 }}
          transition={{ staggerChildren: 0.07 }}
          className="mt-10 grid grid-cols-2 border-l border-t border-white/10 sm:grid-cols-4 lg:grid-cols-7"
        >
          {minerals.map(([name, percent], index) => (
            <motion.article
              key={name}
              variants={fadeUp}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -4 }}
              className="group relative min-h-[145px] overflow-hidden border-b border-r border-white/10 bg-white/[.02] p-5 transition-colors duration-500 hover:bg-white/[.06]"
            >
              <span className="absolute right-4 top-4 text-[9px] font-bold tracking-[.14em] text-white/20 transition group-hover:text-brand/70">
                {String(index + 1).padStart(2, "0")}
              </span>

              <div className="counter-number text-3xl font-black tracking-[-.055em] text-brand sm:text-[2.1rem]">
                <AnimatedNumber value={percent} />
              </div>

              <p className="mt-3 max-w-[120px] text-[11px] font-semibold uppercase leading-5 tracking-[.08em] text-white/65 transition group-hover:text-white">
                {name}
              </p>

              <span className="absolute inset-x-0 bottom-0 h-[2px] origin-left scale-x-0 bg-brand transition-transform duration-500 group-hover:scale-x-100" />
            </motion.article>
          ))}
        </motion.div>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mt-7 flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between"
        >
          <p className="max-w-3xl text-sm leading-6 text-white/55">
            Share of India&apos;s identified mineral resources held in Odisha —
            the backbone of the country&apos;s mining and industrial development.
          </p>

          <ButtonLink href="/why-odisha">
            Explore the Odisha Advantage
          </ButtonLink>
        </motion.div>
      </Container>
    </section>
  );
}

function ContourGraphic() {
  return (
    <svg
      aria-hidden
      viewBox="0 0 900 600"
      className="pointer-events-none absolute -right-[12%] top-1/2 -z-10 hidden w-[820px] -translate-y-1/2 opacity-[.12] lg:block"
      fill="none"
    >
      {[70, 130, 190, 250, 310].map((x, i) => (
        <path
          key={x}
          d={`M${x} 520C190 390 230 220 380 150C535 78 680 145 860 35`}
          stroke={i === 2 ? "#F9B900" : "#FFFFFF"}
          strokeOpacity={i === 2 ? ".8" : ".25"}
        />
      ))}

      <circle cx="380" cy="150" r="4" fill="#F9B900" />
    </svg>
  );
}