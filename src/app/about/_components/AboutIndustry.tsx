"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/ui/Container";

const items = [
  [
    "Top Producer",
    "A resource base spanning coal, iron ore, bauxite and critical minerals across the subcontinent.",
  ],
  [
    "Industrial Growth",
    "Rising demand for advanced mining technology and automation across steel and cement sectors.",
  ],
  [
    "State Support",
    "Increased government backing for exploration, critical minerals processing, and heavy logistics machinery.",
  ],
] as const;

export function AboutIndustry() {
  return (
    <section
      aria-labelledby="mining-industry-heading"
      className="section-space bg-white"
    >
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="grid gap-7 lg:grid-cols-[1fr_.8fr] lg:items-end"
        >
          <div>
            <div className="mb-4 flex items-center gap-3">
              <span
                aria-hidden="true"
                className="h-[2px] w-10 bg-brand"
              />

              <p className="text-[10px] font-extrabold uppercase tracking-[.18em]">
                About India&apos;s Mining Industry
              </p>
            </div>

            <h2
              id="mining-industry-heading"
              className="text-[clamp(2rem,3.2vw,3.4rem)] font-black leading-[1.02] tracking-[-.045em]"
            >
              Powering
              <span className="text-brand"> industrial growth.</span>
            </h2>
          </div>

          <div className="max-w-xl text-sm leading-7 text-zinc-700 lg:justify-self-end">
            <p>
              Driven by rapid industrialization, infrastructure expansion,
              energy demand and manufacturing growth, the mining sector plays a
              vital role in India&apos;s economic development.
            </p>

            <p className="mt-3">
              With strong policy reforms, technology adoption, automation,
              sustainability initiatives and increasing investments,
              India&apos;s mining ecosystem is transforming into a future-ready
              industry.
            </p>
          </div>
        </motion.div>

        <div className="mt-10 grid border-l border-t border-zinc-200 md:grid-cols-3">
          {items.map(([title, text], i) => (
            <motion.article
              key={title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                delay: i * 0.07,
                duration: 0.5,
              }}
              aria-labelledby={`industry-card-${i + 1}`}
              className="group min-h-52 border-b border-r border-zinc-200 p-6 transition duration-500 hover:bg-brand-black"
            >
              <span
                aria-hidden="true"
                className="text-xs font-black text-brand"
              >
                {String(i + 1).padStart(2, "0")}
              </span>

              <h3
                id={`industry-card-${i + 1}`}
                className="mt-6 text-xl font-extrabold tracking-[-.025em] group-hover:text-white"
              >
                {title}
              </h3>

              <p className="mt-3 text-sm leading-6 text-zinc-700 group-hover:text-white/70">
                {text}
              </p>
            </motion.article>
          ))}
        </div>
      </Container>
    </section>
  );
}