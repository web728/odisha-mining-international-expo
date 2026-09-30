import type { Metadata } from "next";

import { BottomCTA } from "@/components/shared/BottomCTA";
import { VisitHero } from "./_components/VisitHero";
import { VisitContent } from "./_components/VisitContent";

export const metadata: Metadata = {
  title: "Why Visit",
  description: "Free entry for trade visitors at Odisha Mining Expo 2027.",
  alternates: { canonical: "/visit" },
};

export default function Visit() {
  return (
    <>
      <VisitHero />
      <VisitContent />
      <BottomCTA />
    </>
  );
}