import type { Metadata } from "next";
import { Bio } from "@/components/about/Bio";
import { Skills } from "@/components/about/Skills";
import { Timeline } from "@/components/about/Timeline";
import { SpotifyPlayer } from "@/components/about/SpotifyPlayer";

export const metadata: Metadata = {
  title: "About",
  description: "Learn about Femi Ajanaku — Fullstack & AI Engineer based in Lagos, Nigeria.",
};

export default function AboutPage() {
  return (
    <>
      <Bio />
      <Skills />
      <Timeline />
      <SpotifyPlayer />
    </>
  );
}
