
"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowLeft,
  ArrowUpRight,
  FileText,
  Mail,
} from "lucide-react";

export type LegalSection = {
  id: string;
  title: string;
  paragraphs?: string[];
  bullets?: string[];
};

type LegalPageProps = {
  label: string;
  title: string;
  description: string;
  updated: string;
  sections: LegalSection[];
  otherPage: {
    label: string;
    href: string;
  };
};

export function LegalPage({
  label,
  title,
  description,
  updated,
  sections,
  otherPage,
}: LegalPageProps) {
  const reduceMotion = useReducedMotion();

  const fade = reduceMotion
    ? {}
    : {
        initial: { opacity: 0, y: 18 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, amount: 0.15 },
        transition: {
          duration: 0.65,
          ease: [0.16, 1, 0.3, 1] as const,
        },
      };

  return (
    <>
      {/* HERO */}
      <section className="relative isolate overflow-hidden bg-[#050505] text-white">
        <div
          aria-hidden
          className="tech-grid absolute inset-0 opacity-35 [mask-image:linear-gradient(to_bottom,#000,transparent)]"
        />

        <div
          aria-hidden
          className="pointer-events-none absolute -right-28 -top-36 h-96 w-96 rounded-full bg-[#f9b900]/10 blur-[110px]"
        />

        <div className="site-container relative py-20 sm:py-24 lg:py-28">
          <motion.div {...fade}>
            <Link
              href="/"
              className="mb-10 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[.12em] text-white/65 transition hover:text-[#f9b900]"
            >
              <ArrowLeft
                className="size-4"
                aria-hidden
              />
              Back to home
            </Link>

            <div className="flex items-center gap-3">
              <span
                aria-hidden
                className="h-[2px] w-9 bg-[#f9b900]"
              />

              <span className="text-[11px] font-extrabold uppercase tracking-[.2em] text-[#f9b900]">
                {label}
              </span>
            </div>

            <h1 className="mt-5 max-w-4xl text-[clamp(2.6rem,6.5vw,5.75rem)] font-black leading-[1.02] tracking-[-.055em]">
              {title}
              <span className="text-[#f9b900]">
                .
              </span>
            </h1>

            <p className="mt-6 max-w-2xl text-sm leading-7 text-zinc-300 sm:text-base">
              {description}
            </p>

            <p className="mt-8 text-xs font-semibold uppercase tracking-[.12em] text-zinc-400">
              Last updated:{" "}
              <time>{updated}</time>
            </p>
          </motion.div>
        </div>

        <div
          aria-hidden
          className="h-[2px] bg-gradient-to-r from-transparent via-[#f9b900] to-transparent opacity-70"
        />
      </section>

      {/* LEGAL CONTENT */}
      <section className="bg-[#f4f4f1] py-14 sm:py-20 lg:py-24">
        <div className="site-container grid gap-8 lg:grid-cols-[270px_minmax(0,1fr)] lg:gap-14">

          {/* SIDEBAR */}
          <aside className="lg:sticky lg:top-28 lg:self-start">
            <nav
              aria-label="On this page"
              className="border border-zinc-200 bg-white p-6"
            >
              <div className="mb-5 flex items-center gap-3">
                <FileText
                  aria-hidden
                  className="size-4 text-[#d99d00]"
                />

                <h2 className="text-xs font-extrabold uppercase tracking-[.16em] text-zinc-950">
                  On this page
                </h2>
              </div>

              <ol className="space-y-1 border-l border-zinc-200">
                {sections.map((section, index) => (
                  <li key={section.id}>
                    <a
                      href={`#${section.id}`}
                      className="flex gap-3 border-l-2 border-transparent py-2 pl-4 text-xs leading-5 text-zinc-600 transition hover:border-[#f9b900] hover:text-black focus-visible:border-[#f9b900]"
                    >
                      <span className="font-bold tabular-nums text-zinc-400">
                        {String(index + 1).padStart(2, "0")}
                      </span>

                      <span>
                        {section.title}
                      </span>
                    </a>
                  </li>
                ))}
              </ol>
            </nav>
          </aside>

          {/* MAIN CONTENT */}
          <div className="min-w-0 border border-zinc-200 bg-white px-6 py-3 sm:px-10 lg:px-12">
            {sections.map((section, index) => (
              <motion.section
                {...fade}
                id={section.id}
                aria-labelledby={`${section.id}-heading`}
                key={section.id}
                className="scroll-mt-28 border-b border-zinc-200 py-9 last:border-0 sm:py-11"
              >
                <div className="mb-5 flex items-start gap-4">
                  <span className="pt-1 text-xs font-extrabold tabular-nums text-[#d99d00]">
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  <h2
                    id={`${section.id}-heading`}
                    className="text-xl font-extrabold leading-tight tracking-[-.03em] text-zinc-950 sm:text-2xl"
                  >
                    {section.title}
                  </h2>
                </div>

                <div className="space-y-4 text-sm leading-7 text-zinc-700 sm:text-[15px] sm:leading-8">
                  {section.paragraphs?.map(
                    (paragraph, i) => (
                      <p key={i}>
                        {paragraph}
                      </p>
                    )
                  )}

                  {section.bullets && (
                    <ul className="list-disc space-y-2 pl-6 marker:text-[#d99d00]">
                      {section.bullets.map(
                        (bullet, i) => (
                          <li key={i}>
                            {bullet}
                          </li>
                        )
                      )}
                    </ul>
                  )}
                </div>
              </motion.section>
            ))}
          </div>
        </div>
      </section>

      {/* SUPPORT CTA */}
      <section className="bg-[#050505] py-12 text-white sm:py-16">
        <div className="site-container flex flex-col gap-7 md:flex-row md:items-center md:justify-between">
          <div>
            <div className="mb-3 flex items-center gap-3">
              <span
                aria-hidden
                className="h-[2px] w-8 bg-[#f9b900]"
              />

              <span className="text-[10px] font-extrabold uppercase tracking-[.18em] text-[#f9b900]">
                Legal & Support
              </span>
            </div>

            <h2 className="text-2xl font-black tracking-[-.045em] sm:text-3xl">
              Need clarification?
            </h2>

            <p className="mt-3 text-sm text-zinc-400">
              Contact the organiser for questions about
              these terms.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <a
              href="mailto:info@futurextrade.com"
              className="inline-flex min-h-12 items-center gap-2 bg-[#f9b900] px-5 text-xs font-extrabold uppercase tracking-[.07em] text-[#050505] transition hover:bg-[#ffc928]"
            >
              <Mail
                aria-hidden
                className="size-4"
              />

              Contact organiser
            </a>

            <Link
              href={otherPage.href}
              className="inline-flex min-h-12 items-center gap-2 border border-white/25 px-5 text-xs font-extrabold uppercase tracking-[.07em] text-white transition hover:border-[#f9b900] hover:text-[#f9b900]"
            >
              {otherPage.label}

              <ArrowUpRight
                aria-hidden
                className="size-4"
              />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
