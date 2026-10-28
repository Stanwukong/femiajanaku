import type { Metadata } from "next";
import { ResumeViewer } from "@/components/resume/ResumeViewer";

export const metadata: Metadata = {
  title: "Resume",
  description: "Femi Ajanaku's resume — Fullstack & AI Engineer.",
};

export default function ResumePage() {
  return <ResumeViewer />;
}
