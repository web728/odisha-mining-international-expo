"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

import { Container } from "@/components/ui/Container";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { participantLogos } from "@/data/site";
import { gallery } from "./home.data";

const ease = [0.16, 1, 0.3, 1] as const;

export function HomeShowcase() {
  return (
    <>
      <Gallery />
      <Participants />
      <Partners />
      <FinalCTA />
    </>
  );
}

/* ---------------- Gallery ---------------- */

function Gallery() {
  return (
    <section className="section-space bg-white">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.65, ease }}
          className="grid gap-6 lg:grid-cols-[1fr_.7fr] lg:items-end"
        >
          <div>
            <Eyebrow>Event Highlights</Eyebrow>

            <h2 className="mt-4 text-[clamp(2rem,3.2vw,3.5rem)] font-black leading-[1.02] tracking-[-.045em] text-zinc-950">
              Watch the expo
              <span className="text-brand"> in action.</span>
            </h2>
          </div>

          <p className="max-w-lg text-sm leading-7 text-zinc-700 lg:justify-self-end">
            A glimpse of past editions — live machinery, business floor and
            expo energy.
          </p>
        </motion.div>

        <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {gallery.map((img, i) => (
            <motion.article
              key={img}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, delay: i * 0.06, ease }}
              whileHover={{ y: -5 }}
              className="group relative aspect-[4/5] overflow-hidden bg-zinc-200"
            >
              <Image
                src={`/image/${img}`}
                alt={`Day ${i + 1} Highlights`}
                fill
                sizes="(max-width:640px) 100vw, 25vw"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-transparent" />

              <div className="absolute inset-x-0 bottom-0 flex items-end justify-between p-5">
                <div>
                  <span className="text-[9px] font-extrabold uppercase tracking-[.16em] text-brand">
                    Previous Edition
                  </span>

                  <p className="mt-1 text-sm font-bold text-white">
                    Day {i + 1} Highlights
                  </p>
                </div>

                <ArrowUpRight className="size-4 text-brand transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1" />
              </div>

              <span className="absolute inset-x-0 bottom-0 h-[3px] origin-left scale-x-0 bg-brand transition-transform duration-500 group-hover:scale-x-100" />
            </motion.article>
          ))}
        </div>
      </Container>
    </section>
  );
}

/* ---------------- Participants ---------------- */

function Participants() {
  return (
    <section className="overflow-hidden border-y border-zinc-200 bg-[#f4f4f1] py-16">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease }}
        >
          <Eyebrow>Past Participants</Eyebrow>

          <h2 className="mt-4 max-w-3xl text-[clamp(1.9rem,3vw,3.2rem)] font-black leading-[1.04] tracking-[-.045em] text-zinc-950">
            Leading brands that have been
            <span className="text-brand"> part of the expo.</span>
          </h2>
        </motion.div>
      </Container>

      <LogoMarquee />
    </section>
  );
}

function LogoMarquee() {
  const logos = [...participantLogos, ...participantLogos];

  return (
    <div className="group relative mt-10 overflow-hidden">
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-20 bg-gradient-to-r from-[#f4f4f1] to-transparent sm:w-32" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-20 bg-gradient-to-l from-[#f4f4f1] to-transparent sm:w-32" />

      <motion.div
        className="flex w-max"
        animate={{ x: ["0%", "-50%"] }}
        transition={{
          x: {
            duration: 35,
            repeat: Infinity,
            ease: "linear",
          },
        }}
      >
        {logos.map(([name, file], i) => (
          <div
            key={`${name}-${i}`}
            className="relative h-24 w-40 shrink-0 border-y border-r border-zinc-200 bg-white sm:h-28 sm:w-48"
          >
            <Image
              src={`/image/${file}`}
              alt={name}
              fill
              sizes="192px"
              className="object-contain p-5 grayscale opacity-70 transition duration-300 hover:grayscale-0 hover:opacity-100"
            />
          </div>
        ))}
      </motion.div>
    </div>
  );
}

/* ---------------- Partners ---------------- */

function Partners() {
  return (
    <section className="bg-white py-14">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease }}
          className="grid border border-zinc-200 md:grid-cols-2"
        >
          <Partner title="Organiser">
            <Image
              src="/image/futurex.jpg"
              alt="Futurex Trade Fair & Events Pvt. Ltd."
              width={210}
              height={90}
              className="max-h-20 w-auto object-contain"
            />
          </Partner>

          <Partner title="LanYard Sponsor">
            <Image
              src="/image/mr-crusher.png"
              alt="Mr Crusher"
              width={210}
              height={90}
              className="max-h-20 w-auto object-contain"
            />
          </Partner>
        </motion.div>
      </Container>
    </section>
  );
}

function Partner({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="group relative flex min-h-40 flex-col justify-center border-b border-zinc-200 p-7 last:border-b-0 md:border-b-0 md:border-r md:last:border-r-0">
      <p className="mb-5 text-[10px] font-extrabold uppercase tracking-[.18em] text-zinc-950">
        {title}
      </p>

      {children}

      <span className="absolute inset-x-0 bottom-0 h-[3px] origin-left scale-x-0 bg-brand transition-transform duration-500 group-hover:scale-x-100" />
    </div>
  );
}

/* ---------------- CTA ---------------- */

function FinalCTA() {
  return (
    <section className="relative overflow-hidden bg-brand">
      <svg
        aria-hidden
        viewBox="0 0 700 300"
        className="pointer-events-none absolute right-0 top-0 h-full w-[55%] opacity-[.12]"
        preserveAspectRatio="none"
      >
        <path d="M170-30 720 250M300-30 790 210M440-30 840 150" stroke="#000" />
      </svg>

      <Container className="relative flex flex-col gap-8 py-14 lg:flex-row lg:items-end lg:justify-between lg:py-16">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.65, ease }}
        >
          <p className="text-[10px] font-extrabold uppercase tracking-[.18em] text-black">
            Exhibit · Engage · Grow
          </p>

          <h2 className="mt-3 max-w-3xl text-[clamp(2rem,3.4vw,3.8rem)] font-black leading-[1.02] tracking-[-.05em] text-black">
            Unlock endless business possibilities at India&apos;s mining
            revolution
          </h2>

          <p className="mt-4 max-w-2xl text-sm leading-7 text-black/75">
            India is the world&apos;s next mining powerhouse. Be where the
            growth is — 07–10 January 2027, Bhubaneswar.
          </p>
        </motion.div>

        <div className="flex flex-wrap gap-3">
          <ButtonLink href="/exhibitor-registration" variant="dark">
            Exhibit Now
          </ButtonLink>

          <ButtonLink href="/visitor-registration" variant="dark">
            Register to Visit — Free
          </ButtonLink>
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