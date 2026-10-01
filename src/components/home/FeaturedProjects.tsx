"use client";

import { useRef, useEffect } from "react";
import Image from "next/image";
import { Link } from "next-view-transitions";
import { ArrowUpRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { ProjectCover } from "@/components/projects/ProjectCover";
import { FEATURED_PROJECTS } from "@/data/projects";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger);

export function FeaturedProjects() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const timeout = setTimeout(() => {
      if (!sectionRef.current) return;
      const ctx = gsap.context(() => {
        const cards = gsap.utils.toArray<HTMLElement>(".project-card-featured");
        if (!cards.length) return;

        gsap.set(cards, { y: 80, opacity: 0 });
        ScrollTrigger.create({
          trigger: sectionRef.current,
          start: "top 85%",
          once: true,
          onEnter: () => {
            gsap.to(cards, {
              y: 0,
              opacity: 1,
              duration: 0.8,
              stagger: 0.15,
              ease: "power2.out",
            });
          },
        });
        ScrollTrigger.refresh();
      }, sectionRef);
      return () => ctx.revert();
    }, 900);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <section ref={sectionRef} className="py-[var(--section-gap)]" data-animate="entrance">
      <Container size="lg">
        <p className="text-xs uppercase tracking-widest text-muted-foreground mb-4">
          Selected work
        </p>
        <h2 className="text-h2 mb-12">
          Featured <span className="text-accent">projects.</span>
        </h2>

        <div className="space-y-8">
          {FEATURED_PROJECTS.map((project) => (
            <Link
              key={project.id}
              href={`/projects/${project.slug}`}
              className={cn(
                "project-card-featured group block rounded-lg border border-border overflow-hidden",
                "bg-card hover:border-accent/50 transition-all duration-300",
                "hover:shadow-xl hover:shadow-accent/5"
              )}
            >
              <div className="grid grid-cols-1 md:grid-cols-2">
                <div
                  className="relative aspect-video md:aspect-auto md:min-h-[280px] overflow-hidden"
                  style={{ viewTransitionName: `project-image-${project.slug}` }}
                >
                  {project.image ? (
                    <Image
                      src={project.image}
                      alt={project.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  ) : (
                    <ProjectCover project={project} />
                  )}
                </div>

                <div className="p-6 md:p-8 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <h3
                        className="text-xl font-display font-semibold"
                        style={{ viewTransitionName: `project-title-${project.slug}` }}
                      >
                        {project.name}
                      </h3>
                      <ArrowUpRight className="w-5 h-5 text-muted-foreground group-hover:text-accent group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300" />
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                      {project.description}
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {project.stack.map((tech) => (
                      <span
                        key={tech}
                        className="px-2.5 py-1 text-xs rounded-full border border-border text-muted-foreground"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link
            href="/#projects"
            className="inline-flex items-center gap-2 text-sm font-medium hover:text-accent transition-colors duration-200 focus-ring"
          >
            View all projects
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>
      </Container>
    </section>
  );
}
