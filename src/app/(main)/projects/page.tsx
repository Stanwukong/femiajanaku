import type { Metadata } from "next";
import { ProjectGrid } from "@/components/projects/ProjectGrid";

export const metadata: Metadata = {
  title: "Projects",
  description: "Explore projects built by Femi Ajanaku — web applications, platforms, and open-source tools.",
};

export default function ProjectsPage() {
  return <ProjectGrid />;
}
