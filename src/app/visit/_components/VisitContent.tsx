"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

import { Container } from "@/components/ui/Container";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { visitorProfiles } from "@/data/profiles";

const ease = [0.16, 1, 0.3, 1] as const;

const benefits = [
  [
    "Meet 200+ Exhibitors",
    "Knowledgeable suppliers and service providers from India and 10+ countries.",
  ],
  [
    "Live Machinery Demos",
    "Experience equipment and machinery in action on the ground.",
  ],
  [
    "Source Technology",
    "3,000+ cutting-edge products and solutions across the full mining value chain.",
  ],
  [
    "B2B Meetings",
    "Pre-scheduled one-to-one meeting slots with serious buyers and decision-makers.",
  ],
  [
    "Government Participation",
    "PSUs, government and nodal agencies on one common window.",
  ],
  [
    "Investor Networking",
    "Connect with business leaders, investors and strategic partners.",
  ],
] as const;

export function VisitContent() {
  return (
    <>
      <section
        aria-labelledby="visit-benefits-heading"
        className="section-space bg-white"
      >
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease }}
            className="grid gap-6 lg:grid-cols-[1fr_.75fr] lg:items-end"
          >
            <div>
              <Eyebrow>Why Visit</Eyebrow>

              <h2
                id="visit-benefits-heading"
                className="mt-4 text-[clamp(2rem,3.2vw,3.5rem)] font-black leading-[1.02] tracking-[-.045em] text-zinc-950"
              >
                What you&apos;ll get from
                <span className="text-brand">
                  {" "}
                  four days in Bhubaneswar.
                </span>
              </h2>
            </div>

            <p className="max-w-lg text-sm leading-7 text-zinc-700 lg:justify-self-end">
              Meet suppliers, explore technology, watch live machinery and
              build valuable industry connections in one focused trade platform.
            </p>
          </motion.div>

          <div className="mt-10 grid border-l border-t border-zinc-200 sm:grid-cols-2 lg:grid-cols-3">
            {benefits.map(([title, text], i) => (
              <motion.article
                key={title}
                aria-labelledby={`visit-benefit-${i + 1}`}
                initial={{ opacity: 0, y: 22 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.5,
                  delay: i * 0.05,
                  ease,
                }}
                whileHover={{ y: -4 }}
                className="group relative min-h-[220px] overflow-hidden border-b border-r border-zinc-200 bg-white p-6 transition-colors duration-500 hover:bg-brand-black"
              >
                <span
                  aria-hidden="true"
                  className="text-[10px] font-extrabold tracking-[.15em] text-zinc-400 group-hover:text-brand"
                >
                  {String(i + 1).padStart(2, "0")}
                </span>

                <h3
                  id={`visit-benefit-${i + 1}`}
                  className="mt-7 text-lg font-extrabold leading-[1.15] tracking-[-.02em] text-zinc-950 transition group-hover:text-white"
                >
                  {title}
                </h3>

                <p className="mt-3 text-sm leading-6 text-zinc-700 transition group-hover:text-white/70">
                  {text}
                </p>

                <ArrowUpRight
                  aria-hidden="true"
                  className="absolute bottom-6 right-6 size-4 translate-y-2 text-brand opacity-0 transition group-hover:translate-y-0 group-hover:opacity-100"
                />

                <span
                  aria-hidden="true"
                  className="absolute inset-x-0 bottom-0 h-[3px] origin-left scale-x-0 bg-brand transition-transform duration-500 group-hover:scale-x-100"
                />
              </motion.article>
            ))}
          </div>
        </Container>
      </section>

      <section
        id="profiles"
        aria-labelledby="visitor-profiles-heading"
        className="section-space bg-[#f4f4f1]"
      >
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease }}
            className="grid gap-6 lg:grid-cols-[1fr_.75fr] lg:items-end"
          >
            <div>
              <Eyebrow>Visitor Profiles</Eyebrow>

              <h2
                id="visitor-profiles-heading"
                className="mt-4 text-[clamp(2rem,3.2vw,3.4rem)] font-black leading-[1.02] tracking-[-.045em] text-zinc-950"
              >
                Who should
                <span className="text-brand"> visit.</span>
              </h2>
            </div>

            <p className="max-w-lg text-sm leading-7 text-zinc-700 lg:justify-self-end">
              Professionals, buyers, investors and decision-makers from across
              mining, infrastructure and allied industries.
            </p>
          </motion.div>

          <ul className="mt-9 grid border-l border-t border-zinc-200 sm:grid-cols-2 lg:grid-cols-3">
            {visitorProfiles.map((item, i) => (
              <motion.li
                key={item}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.4,
                  delay: (i % 6) * 0.03,
                  ease,
                }}
                className="group relative min-h-20 border-b border-r border-zinc-200 bg-white px-5 py-4 transition duration-300 hover:bg-brand-black"
              >
                <span
                  aria-hidden="true"
                  className="absolute left-0 top-0 h-full w-[2px] scale-y-0 bg-brand transition-transform duration-300 group-hover:scale-y-100"
                />

                <span className="text-sm font-medium leading-6 text-zinc-800 transition group-hover:text-white">
                  {item}
                </span>
              </motion.li>
            ))}
          </ul>

          <div className="mt-9 flex flex-wrap gap-3">
            <ButtonLink
              href="/visitor-registration"
              variant="dark"
              aria-label="Register to visit the Odisha Mining Expo 2027 for free"
              className="
                !border-[#171717]
                !bg-[#171717]
                !text-white
                hover:!border-white
                hover:!bg-white
                hover:!text-[#171717]
              "
            >
              Register to Visit — Free
            </ButtonLink>

            <ButtonLink
              href="/gallery"
              variant="dark"
              aria-label="See highlights and images from the previous Odisha Mining Expo edition"
              className="
                !border-[#171717]
                !bg-[#171717]
                !text-white
                hover:!border-white
                hover:!bg-white
                hover:!text-[#171717]
              "
            >
              See Last Edition Glimpses
            </ButtonLink>
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