"use client";

import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";

import { Container } from "@/components/ui/Container";
import { ButtonLink } from "@/components/ui/ButtonLink";
// Agar aap ab Reveal component use nahi kar rahe toh is line ko hata sakte hain
// import { Reveal } from "@/components/animations/Reveal";

// Premium Easing Curve
const PREMIUM_EASE = [0.16, 1, 0.3, 1] as const;

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: PREMIUM_EASE },
  },
};

export function AboutExpo() {
  return (
    <section className="section-space overflow-hidden bg-[#f4f4f1]">
      <Container className="grid gap-12 lg:grid-cols-[.92fr_1.08fr] lg:items-center lg:gap-16">
        
        {/* TEXT SECTION WITH STAGGERED SCROLL ANIMATION */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="max-w-2xl"
        >
          {/* Eyebrow */}
          <motion.div variants={itemVariants} className="mb-4 flex items-center gap-3">
            <motion.span 
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: PREMIUM_EASE }}
              className="h-[2px] w-10 origin-left bg-brand" 
            />
            <p className="text-[10px] font-extrabold uppercase tracking-[.18em] text-zinc-500 sm:text-[11px]">
              About the Expo
            </p>
          </motion.div>

          {/* Heading */}
          <motion.h2 
            variants={itemVariants}
            className="max-w-xl text-[clamp(2rem,3.4vw,3.5rem)] font-black leading-[1.02] tracking-[-.045em] text-zinc-950"
          >
            The industry platform driving{" "}
            <span className="text-brand">mining innovation</span>
          </motion.h2>

          {/* Paragraph 1 */}
          <motion.p 
            variants={itemVariants}
            className="mt-6 max-w-xl text-[15px] leading-7 text-zinc-600"
          >
            Odisha Mining & Infrastructure International Expo has emerged as
            a leading B2B platform connecting mining leaders, technology
            providers, equipment manufacturers, policymakers, investors,
            infrastructure players and industrial stakeholders.
          </motion.p>

          {/* Paragraph 2 with Border */}
          <motion.div 
            variants={itemVariants}
            className="mt-6 max-w-xl border-l-2 border-brand pl-4"
          >
            <p className="text-[15px] leading-7 text-zinc-700">
              The expo creates opportunities for business partnerships,
              innovation exchange, product showcasing, networking and
              sector-wide collaboration — across four business days in
              Bhubaneswar.
            </p>
          </motion.div>

          {/* Button */}
          <motion.div variants={itemVariants}>
            <ButtonLink
              href="/about"
              variant="dark"
              className="mt-8 !text-white"
            >
              <span className="inline-flex items-center gap-2">
                About the Show
                {/* <ArrowUpRight className="size-4" /> */}
              </span>
            </ButtonLink>
          </motion.div>
        </motion.div>

        {/* IMAGE SECTION WITH CINEMATIC SCROLL REVEAL */}
        <div className="relative group">
          {/* Decorative Borders with subtle hover expansion */}
          <div className="absolute -right-4 -top-4 hidden h-28 w-28 border-r border-t border-brand/50 transition-all duration-700 ease-out group-hover:-right-5 group-hover:-top-5 lg:block" />
          <div className="absolute -bottom-4 -left-4 hidden h-28 w-28 border-b border-l border-zinc-300 transition-all duration-700 ease-out group-hover:-bottom-5 group-hover:-left-5 lg:block" />

          {/* Image Reveal Mask Container */}
          <motion.div 
            initial={{ opacity: 0, clipPath: "inset(15% 15% 15% 15%)" }}
            whileInView={{ opacity: 1, clipPath: "inset(0% 0% 0% 0%)" }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1.2, ease: PREMIUM_EASE }}
            className="image-premium relative aspect-[4/3] overflow-hidden bg-zinc-200"
          >
            {/* Cinematic Slow Zoom Out on Scroll */}
            <motion.div
              initial={{ scale: 1.2 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1.6, ease: PREMIUM_EASE }}
              className="absolute inset-0 h-full w-full"
            >
              <Image
                src="/image/about-hero-2.png"
                alt="Visitors exploring machinery on the Odisha Mining Expo exhibition floor"
                fill
                sizes="(max-width:1024px) 100vw, 55vw"
                className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
              />
            </motion.div>

            {/* Dark Gradient Overlay for text legibility */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent pointer-events-none" />

            {/* Badge */}
            <motion.div 
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="absolute left-5 top-5 flex items-center gap-2"
            >
              <span className="size-2 bg-brand" />
              <span className="text-[9px] font-extrabold uppercase tracking-[.16em] text-white">
                OMIIE 2027
              </span>
            </motion.div>

            {/* Bottom details */}
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="absolute inset-x-0 bottom-0 flex items-end justify-between p-5 sm:p-6"
            >
              <div>
                <p className="text-[9px] font-bold uppercase tracking-[.16em] text-brand">
                  Venue
                </p>
                <p className="mt-1 text-sm font-bold text-white">
                  Bhubaneswar · Odisha
                </p>
              </div>

              <motion.span 
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.8, duration: 0.8 }}
                className="h-px w-14 origin-right bg-brand" 
              />
            </motion.div>
          </motion.div>
        </div>
        
      </Container>
    </section>
  );
}