import type { Metadata } from "next";

import { BottomCTA } from "@/components/shared/BottomCTA";
import { ExhibitHero } from "./_components/ExhibitHero";
import { ExhibitContent } from "./_components/ExhibitContent";

export const metadata: Metadata = {
  title: "Why Exhibit",
  description:
    "Why exhibit at Odisha Mining & Infrastructure International Expo 2027.",
  alternates: { canonical: "/exhibit" },
};

export default function Exhibit() {
  return (
    <>
      <ExhibitHero />
      <ExhibitContent />
      <BottomCTA />
    </>
  );
}