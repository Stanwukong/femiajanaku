"use client";

import { useRef, useEffect } from "react";
import { Container } from "@/components/ui/Container";
import { SKILLS, SKILL_CATEGORIES } from "@/data/skills";
import { cn } from "@/lib/utils";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function Skills() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const timeout = setTimeout(() => {
      if (!sectionRef.current) return;
      const ctx = gsap.context(() => {
        const groups = gsap.utils.toArray<HTMLElement>(".skill-group");
        if (!groups.length) return;

        gsap.set(groups, { y: 40, opacity: 0 });
        ScrollTrigger.create({
          trigger: sectionRef.current,
          start: "top 85%",
          once: true,
          onEnter: () => {
            gsap.to(groups, {
              y: 0,
              opacity: 1,
              duration: 0.6,
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
    <section ref={sectionRef} className="py-[var(--section-gap)] bg-muted/30" data-animate="entrance">
      <Container size="lg">
        <p className="text-xs uppercase tracking-widest text-muted-foreground mb-4">
          Skills & tools
        </p>
        <h2 className="text-h2 mb-12">
          Technologies I <span className="text-accent">work with.</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {SKILL_CATEGORIES.map((category) => {
            const categorySkills = SKILLS.filter(
              (s) => s.category === category.key
            );
            return (
              <div key={category.key} className="skill-group">
                <h3 className="text-sm font-medium mb-3 text-muted-foreground uppercase tracking-wide">
                  {category.label}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {categorySkills.map((skill) => (
                    <span
                      key={skill.name}
                      className={cn(
                        "px-3 py-1.5 text-sm rounded-full border border-border",
                        "hover:border-accent hover:text-accent transition-colors duration-200",
                        "bg-background"
                      )}
                    >
                      {skill.name}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
