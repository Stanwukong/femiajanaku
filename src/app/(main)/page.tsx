import type { Metadata } from "next";
import { Hero } from "@/components/home/Hero";
import { Capabilities } from "@/components/home/Capabilities";
import { Bio } from "@/components/about/Bio";
import { Skills } from "@/components/about/Skills";
import { Timeline } from "@/components/about/Timeline";
import { SpotifyPlayer } from "@/components/about/SpotifyPlayer";
import { ProjectGrid } from "@/components/projects/ProjectGrid";
import { StrategyGrid } from "@/components/trading/StrategyGrid";
import { STRATEGIES, toCardData } from "@/data/strategies";
import { ContactSection } from "@/components/contact/ContactSection";
import { JsonLd } from "@/components/seo/JsonLd";
import { personJsonLd } from "@/lib/seo";

export const metadata: Metadata = {
  description:
    "Femi Ajanaku — Fullstack & AI Engineer based in Lagos, Nigeria. About, projects, and contact, all on one page.",
  alternates: {
    canonical: "/",
  },
};

/**
 * Single-page site: every former route is now a section anchor here.
 * Section ids are referenced by NAV_ITEMS in @/data/navigation.
 */
export default function HomePage() {
  return (
    <>
      <JsonLd data={personJsonLd} />
      <div id="home" className="scroll-mt-16">
        <Hero />
        <Capabilities />
      </div>

      <div id="about" className="scroll-mt-16">
        <Bio />
        <Skills />
        <Timeline />
        <SpotifyPlayer />
      </div>

      <div id="projects" className="scroll-mt-16">
        <ProjectGrid />
      </div>

      <div id="trading" className="scroll-mt-16">
        <StrategyGrid strategies={STRATEGIES.map(toCardData)} />
      </div>

      <div id="contact" className="scroll-mt-16">
        <ContactSection />
      </div>
    </>
  );
}
