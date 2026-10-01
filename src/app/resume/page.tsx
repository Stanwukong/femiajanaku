import type { Metadata } from "next";
import { SITE } from "@/data/site";

export const metadata: Metadata = {
  title: "Resume",
  description: "Femi Ajanaku's resume — Fullstack & AI Engineer.",
};

export default function ResumePage() {
  return (
    <div className="w-full h-screen bg-background">
      <iframe
        src={SITE.cvPath}
        width="100%"
        height="100%"
        style={{ border: "none" }}
        title="Femi Ajanaku's Resume"
      />
    </div>
  );
}
