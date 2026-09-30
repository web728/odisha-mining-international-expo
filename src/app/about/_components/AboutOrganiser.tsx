"use client";

import Image from "next/image";
import { motion } from "framer-motion";

import { Container } from "@/components/ui/Container";

export function AboutOrganiser() {
  return (
    <section className="section-space relative overflow-hidden bg-brand-black text-white">
      <svg
        aria-hidden
        viewBox="0 0 700 420"
        className="pointer-events-none absolute -right-20 top-0 hidden h-full w-[45%] opacity-10 lg:block"
        fill="none"
      >
        <path d="M50 390 380 60H700" stroke="#F9B900" />
        <path d="M160 420 470 110H700" stroke="white" />
        <path d="M300 420 570 150" stroke="#F9B900" />
      </svg>

      <Container className="relative grid gap-12 lg:grid-cols-[1fr_.95fr] lg:items-center lg:gap-16">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.65 }}
        >
          <div className="mb-4 flex items-center gap-3">
            <span className="h-[2px] w-10 bg-brand" />
            <p className="text-[10px] font-extrabold uppercase tracking-[.18em] text-brand">
              Organiser
            </p>
          </div>

          <h2 className="max-w-xl text-[clamp(2rem,3.2vw,3.4rem)] font-black leading-[1.02] tracking-[-.045em]">
            Futurex Trade Fair
            <span className="text-brand"> & Events Pvt. Ltd.</span>
          </h2>

          <p className="mt-6 max-w-xl text-sm leading-7 text-white/70">
            Futurex aims at providing an ideal business platform through
            exhibitions, seminars, corporate events and get-togethers. Its
            strength lies in understanding the industry&apos;s needs and
            interests, and in multidimensional activities that make each
            platform the most viable for business.
          </p>

          <p className="mt-4 max-w-xl text-sm leading-7 text-white/70">
            Futurex believes in making the exhibition the most sustainable and
            cost-effective mode of business activity — with the perfect blend
            of the best manufacturers and potential industry buyers from around
            the world.
          </p>

          <p className="mt-6 border-l-2 border-brand pl-4 text-xs leading-6 text-white/60">
            <strong className="text-white">India (Delhi):</strong> E-52, 1st
            Floor, Kalkaji, Delhi 110019 · +91 98108 55697 ·
            info@futurextrade.com
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 35 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.75 }}
          className="image-premium relative aspect-[4/3] overflow-hidden"
        >
          <Image
            src="/image/P1382702-1024x683.jpg"
            alt="Crowds at the Odisha Mining and Infrastructure International Expo"
            fill
            sizes="(max-width:1024px) 100vw, 50vw"
            className="object-cover"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent" />

          <div className="absolute bottom-5 left-5">
            <p className="text-[9px] font-extrabold uppercase tracking-[.16em] text-brand">
              Building Business Platforms
            </p>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}