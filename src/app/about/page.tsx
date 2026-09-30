import type { Metadata } from "next";

import { BottomCTA } from "@/components/shared/BottomCTA";
import { AboutHero } from "./_components/AboutHero";
import { AboutIntro } from "./_components/AboutIntro";
import { AboutIndustry } from "./_components/AboutIndustry";
import { AboutOrganiser } from "./_components/AboutOrganiser";

export const metadata: Metadata = {
  title: "About the Expo",
  description:
    "About Odisha Mining & Infrastructure International Expo 2027 — connecting mining leaders, technology providers, manufacturers, policymakers and infrastructure players.",
  alternates: { canonical: "/about" },
};

export default function About() {
  return (
    <>
      <AboutHero />
      <AboutIntro />
      <AboutIndustry />
      <AboutOrganiser />
      <BottomCTA />
    </>
  );
}