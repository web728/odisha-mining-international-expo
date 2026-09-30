"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

import { Container } from "@/components/ui/Container";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { exhibitorProfiles } from "@/data/profiles";

const ease = [0.16, 1, 0.3, 1] as const;

const benefits = [
  ["Connect", "With key mining & infrastructure buyers from across India and 10+ countries."],
  ["Generate", "High-value B2B business opportunities across a 200+ exhibitor, 20,000+ visitor show floor."],
  ["Showcase", "Innovations & live technologies with on-ground machinery demonstrations."],
  ["Strengthen", "National industry visibility and leadership status through targeted branding."],
  ["Launch", "Products to a focused industrial audience and gauge real-time market reaction."],
  ["Build Strategic Partnerships", "Across sectors — mining, infrastructure, technology and government."],
  ["Expand", "Dealer & distribution networks across India's mining & industrial markets."],
  ["Access", "India's growing mining & industrial markets from one national platform."],
];

const stats = [
  ["200+", "Exhibitors"],
  ["20,000+", "Visitors"],
  ["10+", "Countries"],
  ["3,000+", "Products & Solutions"],
];

export function ExhibitContent() {
  return (
    <>
      <section className="section-space bg-white">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease }}
            className="grid gap-6 lg:grid-cols-[1fr_.75fr] lg:items-end"
          >
            <div>
              <Eyebrow>Exhibit · Engage · Grow</Eyebrow>

              <h2 className="mt-4 text-[clamp(2rem,3.2vw,3.5rem)] font-black leading-[1.02] tracking-[-.045em] text-zinc-950">
                Unlock endless
                <span className="text-brand"> business possibilities.</span>
              </h2>
            </div>

            <p className="max-w-lg text-sm leading-7 text-zinc-700 lg:justify-self-end">
              Position your business in front of decision-makers, buyers and
              industry leaders across mining, infrastructure and industrial markets.
            </p>
          </motion.div>

          <div className="mt-10 grid border-l border-t border-zinc-200 sm:grid-cols-2 lg:grid-cols-4">
            {benefits.map(([title, text], i) => (
              <motion.article
                key={title}
                initial={{ opacity: 0, y: 22 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.04, ease }}
                whileHover={{ y: -4 }}
                className="group relative min-h-[220px] overflow-hidden border-b border-r border-zinc-200 bg-white p-6 transition-colors duration-500 hover:bg-brand-black"
              >
                <span className="text-[10px] font-extrabold tracking-[.15em] text-zinc-400 group-hover:text-brand">
                  {String(i + 1).padStart(2, "0")}
                </span>

                <h3 className="mt-7 text-lg font-extrabold leading-[1.15] tracking-[-.02em] text-zinc-950 transition group-hover:text-white">
                  {title}
                </h3>

                <p className="mt-3 text-sm leading-6 text-zinc-700 transition group-hover:text-white/70">
                  {text}
                </p>

                <ArrowUpRight className="absolute bottom-6 right-6 size-4 translate-y-2 text-brand opacity-0 transition group-hover:translate-y-0 group-hover:opacity-100" />

                <span className="absolute inset-x-0 bottom-0 h-[3px] origin-left scale-x-0 bg-brand transition-transform duration-500 group-hover:scale-x-100" />
              </motion.article>
            ))}
          </div>

          <div className="mt-8 grid grid-cols-2 border-l border-t border-zinc-200 sm:grid-cols-4">
            {stats.map(([value, label]) => (
              <div
                key={label}
                className="border-b border-r border-zinc-200 bg-brand-black p-5"
              >
                <div className="text-2xl font-black tracking-[-.04em] text-brand sm:text-3xl">
                  {value}
                </div>
                <p className="mt-1 text-xs font-semibold uppercase tracking-[.06em] text-white/65">
                  {label}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section id="profiles" className="section-space bg-[#f4f4f1]">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease }}
            className="grid gap-6 lg:grid-cols-[1fr_.8fr] lg:items-end"
          >
            <div>
              <Eyebrow>Exhibitor Profiles</Eyebrow>

              <h2 className="mt-4 text-[clamp(2rem,3.2vw,3.4rem)] font-black leading-[1.02] tracking-[-.045em] text-zinc-950">
                Who should
                <span className="text-brand"> exhibit.</span>
              </h2>
            </div>

            <p className="max-w-xl text-sm leading-7 text-zinc-700 lg:justify-self-end">
              The full mining and infrastructure value chain — machinery,
              technology, services and supplies.
            </p>
          </motion.div>

          <div className="mt-9 columns-1 gap-8 sm:columns-2 lg:columns-3">
            {exhibitorProfiles.map((item, i) => (
              <motion.div
                key={item}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: (i % 6) * 0.03 }}
                className="group mb-3 break-inside-avoid border-b border-zinc-300 pb-3 text-sm font-medium leading-6 text-zinc-800 transition hover:border-brand hover:text-zinc-950"
              >
                <span className="mr-2 text-brand">—</span>
                {item}
              </motion.div>
            ))}
          </div>

          <div className="mt-9 flex flex-wrap gap-3">
            <ButtonLink href="/exhibitor-registration" variant="dark">
              Book Your Stand
            </ButtonLink>

            <ButtonLink href="/brochure" variant="dark">
              Download Brochure
            </ButtonLink>
          </div>
        </Container>
      </section>
    </>
  );
}

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-3">
      <span className="h-[2px] w-10 bg-brand" />
      <p className="text-[10px] font-extrabold uppercase tracking-[.18em] text-zinc-950">
        {children}
      </p>
    </div>
  );
}