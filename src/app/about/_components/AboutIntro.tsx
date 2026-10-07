"use client";

import Image from "next/image";
import { motion } from "framer-motion";

import { Container } from "@/components/ui/Container";

const focus = [
  "Mining Machinery & Equipment",
  "Infrastructure & Construction",
  "Mineral Processing",
  "Logistics & Transportation",
  "Safety & Sustainability",
  "Heavy Engineering & Industrial Solutions",
] as const;

const ease = [0.16, 1, 0.3, 1] as const;

export function AboutIntro() {
  return (
    <>
      <section
        aria-labelledby="about-intro-heading"
        className="section-space bg-white"
      >
        <Container className="grid gap-12 lg:grid-cols-[.95fr_1.05fr] lg:items-center lg:gap-16">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.65, ease }}
          >
            <Eyebrow>The Show</Eyebrow>

            <h2
              id="about-intro-heading"
              className="mt-4 max-w-xl text-[clamp(2rem,3.4vw,3.5rem)] font-black leading-[1.02] tracking-[-.045em] text-zinc-950"
            >
              Odisha Mining &amp; Infrastructure
              <span className="text-brand"> International Expo 2027</span>
            </h2>

            <p className="mt-6 max-w-xl text-[15px] leading-7 text-zinc-700">
              Odisha Mining &amp; Infrastructure International Expo has emerged
              as a leading B2B platform connecting mining leaders, technology
              providers, equipment manufacturers, policymakers, investors,
              infrastructure players and industrial stakeholders.
            </p>

            <p className="mt-4 max-w-xl text-[15px] leading-7 text-zinc-700">
              The expo creates opportunities for business partnerships,
              innovation exchange, product showcasing, networking and
              sector-wide collaboration. The 5th edition takes place{" "}
              <strong className="font-extrabold text-zinc-950">
                <time dateTime="2027-01-07">07–10 January 2027</time>
              </strong>{" "}
              at Baramunda Exhibition Ground, Bhubaneswar.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 35 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.75, ease }}
            className="relative"
          >
            <span
              aria-hidden="true"
              className="absolute -right-4 -top-4 hidden h-24 w-24 border-r border-t border-brand/50 lg:block"
            />

            <div className="image-premium relative aspect-[4/3] overflow-hidden">
              <Image
                src="/image/about-hero-2.png"
                alt="Business meetings at the Odisha Mining Expo"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />

              <div
                aria-hidden="true"
                className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent"
              />

              <div className="absolute bottom-5 left-5">
                <p className="text-[9px] font-extrabold uppercase tracking-[.16em] text-brand">
                  5th Edition
                </p>

                <address className="mt-1 not-italic text-sm font-bold text-white">
                  Bhubaneswar · Odisha
                </address>
              </div>
            </div>
          </motion.div>
        </Container>
      </section>

      <section
        aria-labelledby="about-focus-heading"
        className="section-space-sm bg-[#f4f4f1]"
      >
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease }}
          >
            <Eyebrow>Focus Areas</Eyebrow>

            <h2
              id="about-focus-heading"
              className="mt-4 text-[clamp(2rem,3vw,3.2rem)] font-black leading-[1.02] tracking-[-.045em] text-zinc-950"
            >
              What the platform
              <span className="text-brand"> covers.</span>
            </h2>
          </motion.div>

          <div className="mt-9 grid border-l border-t border-zinc-200 sm:grid-cols-2 lg:grid-cols-3">
            {focus.map((item, i) => (
              <motion.article
                key={item}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.5,
                  delay: i * 0.05,
                  ease,
                }}
                aria-labelledby={`focus-area-${i + 1}`}
                className="group relative min-h-24 border-b border-r border-zinc-200 bg-white p-5 transition duration-400 hover:bg-brand-black"
              >
                <span
                  aria-hidden="true"
                  className="text-[9px] font-extrabold tracking-[.14em] text-zinc-400 group-hover:text-brand"
                >
                  {String(i + 1).padStart(2, "0")}
                </span>

                <h3
                  id={`focus-area-${i + 1}`}
                  className="mt-3 text-sm font-bold leading-5 text-zinc-950 transition group-hover:text-white"
                >
                  {item}
                </h3>

                <span
                  aria-hidden="true"
                  className="absolute inset-x-0 bottom-0 h-[2px] origin-left scale-x-0 bg-brand transition-transform duration-500 group-hover:scale-x-100"
                />
              </motion.article>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}

function Eyebrow({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-center gap-3">
      <span
        aria-hidden="true"
        className="h-[2px] w-10 bg-brand"
      />

      <p className="text-[10px] font-extrabold uppercase tracking-[.18em] text-zinc-950">
        {children}
      </p>
    </div>
  );
}