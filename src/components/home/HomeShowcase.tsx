
"use client";

import type { ReactNode } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

import { Container } from "@/components/ui/Container";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { participantLogos } from "@/data/site";
import { Gallery } from "./gallery-video";

const ease = [0.16, 1, 0.3, 1] as const;

/* ---------------- Logo Website Links ---------------- */

// Past Participants: logo file name ke according URL lagao.
// Jiska URL nahi hai, use "#" rehne do.

const participantLogoLinks: Record<string, string> = {
  // Examples:
  // "tata.png": "https://www.tatasteel.com",
  // "jcb.png": "https://www.jcb.com",
  // "example.png": "#",
};

// Organiser and Sponsor Links
const organiserUrl = "https://www.futurextrade.com/";
const lanyardSponsorUrl = "https://mrcrushers.in/";

// Media Partners Links
const mediaPartners = [
  {
    name: "B2B",
    file: "b2b.jpeg",
    url: "https://b2bpurchase.com/",
    imageClassName: "",
  },
  {
    name: "India Mining",
    file: "india-mining.png",
    url: "#",
    imageClassName: "",
  },
  {
    name: "Motor India",
    file: "motor-india-dark.png",
    url: "https://www.motorindiaonline.in/",
    imageClassName: "",
  },
  {
    name: "Equipment Times",
    file: "equipment_times.png",
    url: "https://www.equipmenttimes.in/",
    imageClassName: "",
  },
  {
    name: "Construction Times",
    file: "construction-times.png",
    url: "https://www.constructiontimes.co.in/",
    imageClassName: "scale-110",
  },
  {
    name: "Success Trade Special",
    file: "success-trade.png",
    url: "https://successtradespecial.blogspot.com",
    imageClassName: "scale-110",
  },

  // New Media Partners
  {
    name: "Media Partner 7",
    file: "ct-today.png",
    url: "#",
    imageClassName: "",
  },
  {
    name: "Media Partner 8",
    file: "nbm.png",
    url: "https://www.nbmcw.com/",
    imageClassName: "",
  },
  // {
  //   name: "Media Partner 9",
  //   file: "media-partner-9.png",
  //   url: "#",
  //   imageClassName: "",
  // },
] as const;
/* ---------------- Reusable Logo Link ---------------- */

function LogoLink({
  href = "#",
  children,
  className = "",
  tabIndex,
}: {
  href?: string;
  children: ReactNode;
  className?: string;
  tabIndex?: number;
}) {
  const url = href.trim();

  const hasLink = url !== "" && url !== "#";

  return (
    <a
      href={hasLink ? url : "#"}
      target={hasLink ? "_blank" : undefined}
      rel={hasLink ? "noopener noreferrer" : undefined}
      tabIndex={tabIndex}
      onClick={(e) => {
        if (!hasLink) {
          e.preventDefault();
        }
      }}
      className={className}
    >
      {children}
    </a>
  );
}

/* ---------------- Main Component ---------------- */

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

/* ---------------- Participants ---------------- */

function Participants() {
  return (
    <section
      aria-labelledby="participants-heading"
      className="overflow-hidden border-y border-zinc-200 bg-[#f4f4f1] py-16"
    >
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease }}
        >
          <Eyebrow>Past Participants</Eyebrow>

          <h2
            id="participants-heading"
            className="mt-4 max-w-3xl text-[clamp(1.9rem,3vw,3.2rem)] font-black leading-[1.04] tracking-[-.045em] text-zinc-950"
          >
            Leading brands that have been
            <span className="text-brand">
              {" "}part of the expo.
            </span>
          </h2>
        </motion.div>
      </Container>

      <LogoMarquee />
    </section>
  );
}

/* ---------------- Participants Logo Marquee ---------------- */

function LogoMarquee() {
  const logos = [...participantLogos, ...participantLogos];

  return (
    <div className="group relative mt-10 overflow-hidden">
      {/* Left Gradient */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 left-0 z-10 w-20 bg-gradient-to-r from-[#f4f4f1] to-transparent sm:w-32"
      />

      {/* Right Gradient */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 right-0 z-10 w-20 bg-gradient-to-l from-[#f4f4f1] to-transparent sm:w-32"
      />

      <motion.div
        className="flex w-max"
        animate={{
          x: ["0%", "-50%"],
        }}
        transition={{
          x: {
            duration: 35,
            repeat: Infinity,
            ease: "linear",
          },
        }}
      >
        {logos.map(([name, file], i) => {
          const isDuplicate = i >= participantLogos.length;

          const websiteUrl =
            participantLogoLinks[file] ?? "#";

          return (
            <div
              key={`${name}-${i}`}
              aria-hidden={isDuplicate}
              className="relative h-24 w-40 shrink-0 border-y border-r border-zinc-200 bg-white sm:h-28 sm:w-48"
            >
              <LogoLink
                href={websiteUrl}
                tabIndex={isDuplicate ? -1 : 0}
                className="relative block h-full w-full"
              >
                <Image
                  src={`/image/${file}`}
                  alt={isDuplicate ? "" : name}
                  fill
                  sizes="192px"
                  className="object-contain p-5 grayscale opacity-70 transition duration-300 hover:grayscale-0 hover:opacity-100"
                />
              </LogoLink>
            </div>
          );
        })}
      </motion.div>

      {/* Accessible Participant Names */}
      <div className="sr-only">
        <p>Past participating brands include:</p>
        <ul>
          {participantLogos.map(([name]) => (
            <li key={name}>{name}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

/* ---------------- Partners ---------------- */

function Partners() {
  return (
    <section
      aria-label="Event partners and organiser"
      className="bg-white py-14"
    >
    

<Container>
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.6, ease }}
    className="border border-zinc-200"
  >
    {/* Row 1: Organiser + Lanyard Sponsor */}
    <div className="grid md:grid-cols-2">

      {/* Organiser */}
      <Partner title="Organiser">
        <LogoLink
          href={organiserUrl}
          className="relative block h-[110px] w-[220px] max-w-full"
        >
          <Image
            src="/image/logo.png"
            alt="Futurex Trade Fair & Events Pvt. Ltd."
            fill
            sizes="220px"
            className="object-contain transition-opacity duration-300 hover:opacity-75"
          />
        </LogoLink>
      </Partner>

      {/* Lanyard Sponsor */}
      <Partner title="LanYard Partner">
        <LogoLink
          href={lanyardSponsorUrl}
          className="relative mt-6 block h-[90px] w-[220px] max-w-full"
        >
          <Image
            src="/image/crusher.png"
            alt="Mr Crusher"
            fill
            sizes="220px"
            className="object-contain transition-opacity duration-300 hover:opacity-75"
          />
        </LogoLink>
      </Partner>
    </div>

 {/* Media Partners */}
<div className="group relative border-t border-zinc-200 p-7 text-center">
  <h3 className="mb-8 text-[13px] font-extrabold uppercase tracking-[.18em] text-zinc-950">
    Media Partners
  </h3>

  <ul className="mx-auto grid w-full max-w-[798px] grid-cols-1 items-center justify-items-center gap-6 sm:grid-cols-2 lg:grid-cols-3">
    {mediaPartners.map(
      ({ name, file, url, imageClassName }) => (
        <li
          key={name}
          className="flex w-full min-w-0 items-center justify-center"
        >
          <LogoLink
            href={url}
            className="relative block h-[110px] w-full max-w-[250px]"
          >
            <Image
              src={`/logo/${file}`}
              alt={name}
              fill
              sizes="(max-width: 640px) 90vw, 250px"
              className={`object-contain transition-opacity duration-300 hover:opacity-75 ${imageClassName}`}
            />
          </LogoLink>
        </li>
      )
    )}
  </ul>

  {/* Bottom Hover Line */}
  <span
    aria-hidden="true"
    className="absolute inset-x-0 bottom-0 h-[3px] origin-left scale-x-0 bg-brand transition-transform duration-500 group-hover:scale-x-100"
  />
</div>
  </motion.div>
</Container>


    </section>
  );
}

/* ---------------- Partner Card ---------------- */

function Partner({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <article className="group relative flex min-h-40 flex-col justify-center border-b border-zinc-200 p-7 last:border-b-0 md:border-b-0 md:border-r md:last:border-r-0">
      <h3 className="mb-5 text-[13px] font-extrabold uppercase tracking-[.18em] text-zinc-950">
        {title}
      </h3>

      {children}

      <span
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 h-[3px] origin-left scale-x-0 bg-brand transition-transform duration-500 group-hover:scale-x-100"
      />
    </article>
  );
}

/* ---------------- Final CTA ---------------- */

function FinalCTA() {
  return (
    <section
      aria-labelledby="final-cta-heading"
      className="relative overflow-hidden bg-brand"
    >
      {/* Background Pattern */}
      <svg
        aria-hidden="true"
        focusable="false"
        viewBox="0 0 700 300"
        className="pointer-events-none absolute right-0 top-0 h-full w-[55%] opacity-[.12]"
        preserveAspectRatio="none"
      >
        <path
          d="M170-30 720 250M300-30 790 210M440-30 840 150"
          stroke="#000"
        />
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

          <h2
            id="final-cta-heading"
            className="mt-3 max-w-3xl text-[clamp(2rem,3.4vw,3.8rem)] font-black leading-[1.02] tracking-[-.05em] text-black"
          >
            Unlock endless business possibilities at India&apos;s
            mining revolution
          </h2>

          <p className="mt-4 max-w-2xl text-sm leading-7 text-black/75">
            India is the world&apos;s next mining powerhouse.
            Be where the growth is — 07–10 January 2027,
            Bhubaneswar.
          </p>
        </motion.div>

        <div className="flex flex-wrap gap-3">
          <ButtonLink
            href="/exhibitor-registration"
            variant="dark"
            aria-label="Register as an exhibitor for Odisha Mining Expo 2027"
            className="
              !border-[#1A1A1A]
              !bg-[#1A1A1A]
              !text-white
              hover:!border-white
              hover:!bg-white
              hover:!text-[#111111]
            "
          >
            Exhibit Now
          </ButtonLink>

          <ButtonLink
            href="/visitor-registration"
            variant="dark"
            aria-label="Register as a visitor for Odisha Mining Expo 2027"
            className="
              !border-[#1A1A1A]
              !bg-[#1A1A1A]
              !text-white
              hover:!border-white
              hover:!bg-white
              hover:!text-[#111111]
            "
          >
            Register to Visit — Free
          </ButtonLink>
        </div>
      </Container>
    </section>
  );
}

/* ---------------- Eyebrow ---------------- */

function Eyebrow({
  children,
}: {
  children: ReactNode;
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
