import { PROJECTS } from "@/data/projects";
import { OG_SIZE, renderOgImage } from "@/lib/og";

export const alt = "Project case study";
export const size = OG_SIZE;
export const contentType = "image/png";

export function generateStaticParams() {
  return PROJECTS.map((project) => ({ slug: project.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = PROJECTS.find((p) => p.slug === slug);
  return renderOgImage({
    eyebrow: project ? `Project · ${project.year}` : "Project",
    title: project?.name ?? "Project",
    subtitle: project?.description ?? "",
  });
}
