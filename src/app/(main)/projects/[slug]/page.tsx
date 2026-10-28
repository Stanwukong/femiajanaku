import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import { Link } from "next-view-transitions";
import { ArrowLeft, ExternalLink } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { ProjectCover } from "@/components/projects/ProjectCover";
import { ArticleReveal } from "@/components/layout/ArticleReveal";
import { CaseStudyRail } from "@/components/layout/CaseStudyRail";
import type { RailItem } from "@/components/layout/RailLines";
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

  const { caseStudy } = project;
  const currentIndex = PROJECTS.findIndex((p) => p.slug === slug);
  const nextProject = PROJECTS[(currentIndex + 1) % PROJECTS.length];
  const prevProject = PROJECTS[(currentIndex - 1 + PROJECTS.length) % PROJECTS.length];

  // Section map for the case-study rail — only the sections actually rendered.
  const railItems: RailItem[] = [
    { id: "overview", label: "Overview" },
    ...(caseStudy?.problem ? [{ id: "problem", label: "Problem" }] : []),
    ...(caseStudy ? [{ id: "work", label: "What I built" }] : []),
    ...(caseStudy?.decisions?.length ? [{ id: "decisions", label: "Decisions" }] : []),
    ...(caseStudy?.outcome ? [{ id: "outcome", label: "Outcome" }] : []),
  ];

  return (
    <article className="py-[var(--section-gap)]" data-animate="entrance">
      <ArticleReveal />
      <CaseStudyRail items={railItems} />
      <Container size="lg">
        {/* Back link */}
        <Link
          href="/#projects"
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
          {project.image ? (
            <Image
              src={project.image}
              alt={project.name}
              fill
              className="object-cover"
              sizes="100vw"
              priority
            />
          ) : (
            <ProjectCover project={project} />
          )}
        </div>

        {/* Project info */}
        <div id="overview" className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12 scroll-mt-24" data-animate="entrance">
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
            {caseStudy && (
              <div>
                <p className="text-xs uppercase tracking-widest text-muted-foreground mb-2">Context</p>
                <p className="text-sm font-medium">{caseStudy.context}</p>
              </div>
            )}
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
            {project.url ? (
              <a
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-foreground text-background rounded-full text-sm font-medium hover:bg-accent hover:text-accent-foreground transition-colors duration-200 focus-ring"
              >
                Visit site
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            ) : (
              caseStudy?.context.startsWith("Client work") && (
                <p className="text-sm text-muted-foreground leading-relaxed">
                  The code and product belong to the client, so this is a write-up
                  rather than a demo. I&apos;m happy to walk through the architecture
                  on a call.
                </p>
              )
            )}
          </div>
        </div>

        {/* Case study write-up — client work with no public demo */}
        {caseStudy && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12" data-animate="entrance">
            <div className="md:col-span-2 space-y-10">
              {caseStudy.problem && (
                <section id="problem" className="scroll-mt-24">
                  <h2 className="text-xs uppercase tracking-widest text-muted-foreground mb-3">
                    The problem
                  </h2>
                  <p className="text-muted-foreground leading-relaxed">{caseStudy.problem}</p>
                </section>
              )}

              <section id="work" className="scroll-mt-24">
                <h2 className="text-xs uppercase tracking-widest text-muted-foreground mb-3">
                  What I built
                </h2>
                <ul className="space-y-2">
                  {caseStudy.contributions.map((item) => (
                    <li key={item} className="flex gap-3 text-muted-foreground leading-relaxed">
                      <span
                        className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent"
                        aria-hidden="true"
                      />
                      {item}
                    </li>
                  ))}
                </ul>
              </section>

              {caseStudy.decisions && caseStudy.decisions.length > 0 && (
                <section id="decisions" className="scroll-mt-24">
                  <h2 className="text-xs uppercase tracking-widest text-muted-foreground mb-3">
                    Key decisions
                  </h2>
                  <div className="space-y-6">
                    {caseStudy.decisions.map((decision) => (
                      <div key={decision.title}>
                        <h3 className="font-display font-semibold mb-1">{decision.title}</h3>
                        <p className="text-muted-foreground leading-relaxed">{decision.body}</p>
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {caseStudy.outcome && (
                <section id="outcome" className="scroll-mt-24">
                  <h2 className="text-xs uppercase tracking-widest text-muted-foreground mb-3">
                    Outcome
                  </h2>
                  <p className="text-muted-foreground leading-relaxed">{caseStudy.outcome}</p>
                </section>
              )}
            </div>
          </div>
        )}

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
