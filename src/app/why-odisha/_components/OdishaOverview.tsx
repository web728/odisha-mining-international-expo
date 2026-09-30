"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import {
  Pickaxe,
  Factory,
  Anchor,
  Building2,
  Landmark,
  Tractor,
  type LucideIcon,
} from "lucide-react";

import { Container } from "@/components/ui/Container";

const points: Array<[LucideIcon, string, string]> = [
  [
    Pickaxe,
    "Iron Ore & Chromite Output",
    "Major contributor to India's iron ore and chromite production.",
  ],
  [
    Factory,
    "Industrial Ecosystem",
    "Strong mining and industrial base with processing industries.",
  ],
  [
    Anchor,
    "Port-Led Logistics",
    "Export advantages through strong port access and corridors.",
  ],
  [
    Building2,
    "Infrastructure Investment",
    "Growing infrastructure & manufacturing investments statewide.",
  ],
  [
    Landmark,
    "Government-Backed Policies",
    "Supportive state industrial policies for investors.",
  ],
  [
    Tractor,
    "Technology Hub",
    "Ideal hub for mining technology & heavy equipment businesses.",
  ],
];

const ease = [0.16, 1, 0.3, 1] as const;

export function OdishaOverview() {
  return (
    <section className="section-space bg-white">
      <Container>
        <div className="grid gap-12 lg:grid-cols-[.95fr_1.05fr] lg:items-center lg:gap-16">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.65, ease }}
          >
            <Eyebrow>At the Heart of India&apos;s Mining Economy</Eyebrow>

            <h2 className="mt-4 max-w-xl text-[clamp(2rem,3.4vw,3.5rem)] font-black leading-[1.02] tracking-[-.045em] text-zinc-950">
              A preferred hub for
              <span className="text-brand"> mining investment.</span>
            </h2>

            <p className="mt-6 max-w-xl text-[15px] leading-7 text-zinc-700">
              Home to vast reserves of iron ore, bauxite, coal, chromite,
              manganese and other strategic minerals, Odisha has become a
              preferred hub for mining investments, infrastructure projects,
              processing industries and industrial expansion.
            </p>

            <p className="mt-4 max-w-xl text-[15px] leading-7 text-zinc-700">
              With strong connectivity, industrial corridors, port access,
              supportive state policies and rapid infrastructure development,
              Odisha offers unmatched opportunities for stakeholders across
              mining and heavy industries.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 35 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.75, ease }}
            className="relative"
          >
            <span className="absolute -right-4 -top-4 hidden h-24 w-24 border-r border-t border-brand/50 lg:block" />

            <div className="image-premium relative aspect-[4/3] overflow-hidden">
              <Image
                src="/image/why.jpg"
                alt="Heavy machinery display at Odisha Mining Expo"
                fill
                sizes="(max-width:1024px) 100vw, 50vw"
                className="object-cover"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent" />

              <div className="absolute bottom-5 left-5">
                <p className="text-[9px] font-extrabold uppercase tracking-[.16em] text-brand">
                  Odisha Advantage
                </p>
                <p className="mt-1 text-sm font-bold text-white">
                  Mining · Industry · Infrastructure
                </p>
              </div>
            </div>
          </motion.div>
        </div>

        <div className="mt-12 grid border-l border-t border-zinc-200 sm:grid-cols-2 lg:grid-cols-3">
          {points.map(([Icon, title, text], index) => (
            <motion.article
              key={title}
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.05, ease }}
              whileHover={{ y: -4 }}
              className="group relative min-h-[220px] overflow-hidden border-b border-r border-zinc-200 bg-white p-6 transition-colors duration-500 hover:bg-brand-black"
            >
              <div className="flex items-start justify-between">
                <span className="grid size-11 place-items-center border border-zinc-200 transition group-hover:border-brand/50 group-hover:bg-brand/10">
                  <Icon className="size-5 text-zinc-950 transition group-hover:text-brand" />
                </span>

                <span className="text-[10px] font-extrabold tracking-[.15em] text-zinc-400 group-hover:text-brand/70">
                  {String(index + 1).padStart(2, "0")}
                </span>
              </div>

              <h3 className="mt-6 text-lg font-extrabold leading-[1.15] tracking-[-.02em] text-zinc-950 transition group-hover:text-white">
                {title}
              </h3>

              <p className="mt-3 text-sm leading-6 text-zinc-700 transition group-hover:text-white/70">
                {text}
              </p>

              <span className="absolute inset-x-0 bottom-0 h-[3px] origin-left scale-x-0 bg-brand transition-transform duration-500 group-hover:scale-x-100" />
            </motion.article>
          ))}
        </div>
      </Container>
    </section>
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