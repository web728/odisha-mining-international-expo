import type { Metadata } from "next";

import { BottomCTA } from "@/components/shared/BottomCTA";
import { WhyOdishaHero } from "./_components/WhyOdishaHero";
import { OdishaOverview } from "./_components/OdishaOverview";
import { OdishaMinerals } from "./_components/OdishaMinerals";

export const metadata: Metadata = {
  title: "Why Odisha",
  description:
    "Why Odisha is India's mineral powerhouse and a preferred mining investment hub.",
  alternates: { canonical: "/why-odisha" },
};

export default function WhyOdisha() {
  return (
    <>
      <WhyOdishaHero />
      <OdishaOverview />
      <OdishaMinerals />
      <BottomCTA />
    </>
  );
}