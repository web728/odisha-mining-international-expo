
import { AboutExpo } from "@/components/home/AboutExpo";
import { FocusAreas } from "@/components/home/FocusAreas";
import { HomeHero } from "@/components/home/HomeHero";
import { HomeShowcase } from "@/components/home/HomeShowcase";
import { HomeStats } from "@/components/home/HomeStats";
import { OdishaAdvantage } from "@/components/home/OdishaAdvantage";

export default function Home() {
  return (
    <>
      <HomeHero />
      <HomeStats />
      <AboutExpo />
      <FocusAreas />
      <OdishaAdvantage />
      <HomeShowcase />
    </>
  );
}