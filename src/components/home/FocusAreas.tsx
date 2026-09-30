"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

import { Container } from "@/components/ui/Container";
import { focusAreas } from "./home.data";

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0 },
};

export function FocusAreas() {
  return (
    <section className="section-space bg-white">
      <Container>
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
          className="grid gap-6 lg:grid-cols-[1fr_.75fr] lg:items-end"
        >
          <div>
            <div className="mb-4 flex items-center gap-3">
              <span className="h-[2px] w-10 bg-brand" />
              <p className="text-[10px] font-extrabold uppercase tracking-[.18em] text-zinc-950">
                Focus Areas
              </p>
            </div>

            <h2 className="text-[clamp(2rem,3.2vw,3.4rem)] font-black leading-[1.02] tracking-[-.045em] text-zinc-950">
              Six sectors.
              <span className="text-brand"> One floor.</span>
            </h2>
          </div>

          <p className="max-w-lg text-sm leading-7 text-zinc-700 lg:justify-self-end">
            Explore the key industries, technologies and solutions shaping
            the future of mining, infrastructure and industrial development.
          </p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.15 }}
          transition={{ staggerChildren: 0.08 }}
          className="mt-10 grid border-l border-t border-zinc-200 md:grid-cols-2 lg:grid-cols-3"
        >
          {focusAreas.map(([Icon, title, text], index) => (
            <motion.article
              key={title}
              variants={fadeUp}
              transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -5 }}
              className="group relative min-h-[250px] overflow-hidden border-b border-r border-zinc-200 bg-white p-6 transition-colors duration-500 hover:bg-brand-black sm:p-7"
            >
              <div className="flex items-start justify-between">
                <motion.span
                  whileHover={{ rotate: 3, scale: 1.04 }}
                  transition={{ duration: 0.3 }}
                  className="grid size-11 place-items-center border border-zinc-200 transition duration-300 group-hover:border-brand/50 group-hover:bg-brand/10"
                >
                  <Icon className="size-5 text-zinc-950 transition duration-300 group-hover:text-brand" />
                </motion.span>

                <span className="text-[10px] font-extrabold tracking-[.16em] text-zinc-400 transition group-hover:text-brand/70">
                  {String(index + 1).padStart(2, "0")}
                </span>
              </div>

              <h3 className="mt-7 max-w-xs text-xl font-extrabold leading-[1.15] tracking-[-.025em] text-zinc-950 transition-colors duration-300 group-hover:text-white">
                {title}
              </h3>

              <p className="mt-3 max-w-sm text-sm leading-6 text-zinc-700 transition-colors duration-300 group-hover:text-white/70">
                {text}
              </p>

              <motion.span
                initial={{ scaleX: 0 }}
                whileHover={{ scaleX: 1 }}
                className="absolute inset-x-0 bottom-0 h-[3px] origin-left bg-brand"
              />

              <ArrowUpRight className="absolute bottom-6 right-6 size-4 translate-y-2 text-brand opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100" />
            </motion.article>
          ))}
        </motion.div>
      </Container>
    </section>
  );
}