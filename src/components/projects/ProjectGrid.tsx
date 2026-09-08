"use client";

import { useRef, useEffect } from "react";
import { Container } from "@/components/ui/Container";
import { ProjectCard } from "@/components/projects/ProjectCard";
import { PROJECTS } from "@/data/projects";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function ProjectGrid() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    // Delay animation setup until after page transition panels have cleared
    const timeout = setTimeout(() => {
      if (!sectionRef.current) return;

      const ctx = gsap.context(() => {
        const cards = gsap.utils.toArray<HTMLElement>(".project-card");
        if (!cards.length) return;

        gsap.set(cards, { y: 60, opacity: 0 });

        ScrollTrigger.create({
          trigger: sectionRef.current,
          start: "top 85%",
          once: true,
          onEnter: () => {
            gsap.to(cards, {
              y: 0,
              opacity: 1,
              duration: 0.8,
              stagger: 0.12,
              ease: "power2.out",
            });
          },
        });

        // If the section is already in view, trigger immediately
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
          All work
        </p>
        <h2 className="text-h1 mb-12">
          Projects & <span className="text-accent">experiments.</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {PROJECTS.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </Container>
    </section>
  );
}
