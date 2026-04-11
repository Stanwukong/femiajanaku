import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import { Link } from "next-view-transitions";
import { ArrowLeft, ExternalLink } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { PROJECTS } from "@/data/projects";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return PROJECTS.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = PROJECTS.find((p) => p.slug === slug);
  if (!project) return { title: "Project Not Found" };

  return {
    title: project.name,
    description: project.description,
  };
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const project = PROJECTS.find((p) => p.slug === slug);
  if (!project) notFound();

  const currentIndex = PROJECTS.findIndex((p) => p.slug === slug);
  const nextProject = PROJECTS[(currentIndex + 1) % PROJECTS.length];
  const prevProject = PROJECTS[(currentIndex - 1 + PROJECTS.length) % PROJECTS.length];

  return (
    <article className="py-[var(--section-gap)]" data-animate="entrance">
      <Container size="lg">
        {/* Back link */}
        <Link
          href="/projects"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors duration-200 mb-8 focus-ring"
          data-animate="entrance"
        >
          <ArrowLeft className="w-4 h-4" />
          All projects
        </Link>

        {/* Hero image — shared element transition from project card */}
        <div
          className="relative aspect-video rounded-lg overflow-hidden border border-border mb-8"
          style={{ viewTransitionName: `project-image-${slug}` }}
          data-animate="entrance"
        >
          <Image
            src={project.image}
            alt={project.name}
            fill
            className="object-cover"
            sizes="100vw"
            priority
          />
        </div>

        {/* Project info */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12" data-animate="entrance">
          <div className="md:col-span-2">
            <h1
              className="text-h1 mb-4"
              style={{ viewTransitionName: `project-title-${slug}` }}
            >
              {project.name}
            </h1>
            <p className="text-muted-foreground leading-relaxed">
              {project.longDescription || project.description}
            </p>
          </div>

          <div className="space-y-6">
            <div>
              <p className="text-xs uppercase tracking-widest text-muted-foreground mb-2">Role</p>
              <p className="text-sm font-medium">{project.role}</p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-widest text-muted-foreground mb-2">Year</p>
              <p className="text-sm font-medium">{project.year}</p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-widest text-muted-foreground mb-2">Stack</p>
              <div className="flex flex-wrap gap-1.5">
                {project.stack.map((tech) => (
                  <span key={tech} className="px-2 py-0.5 text-xs rounded-full border border-border text-muted-foreground">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
            <a
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-foreground text-background rounded-full text-sm font-medium hover:bg-accent hover:text-accent-foreground transition-colors duration-200 focus-ring"
            >
              Visit site
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-between pt-8 border-t border-border" data-animate="entrance">
          <Link
            href={`/projects/${prevProject.slug}`}
            className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200 focus-ring"
          >
            &larr; {prevProject.name}
          </Link>
          <Link
            href={`/projects/${nextProject.slug}`}
            className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200 focus-ring"
          >
            {nextProject.name} &rarr;
          </Link>
        </div>
      </Container>
    </article>
  );
}
