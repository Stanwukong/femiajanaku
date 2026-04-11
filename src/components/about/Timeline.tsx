"use client";

import { useRef, useEffect } from "react";
import { Container } from "@/components/ui/Container";
import { TIMELINE } from "@/data/experience";
import { cn } from "@/lib/utils";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function Timeline() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const timeout = setTimeout(() => {
      if (!sectionRef.current) return;
      const ctx = gsap.context(() => {
        const entries = gsap.utils.toArray<HTMLElement>(".timeline-entry");
        if (!entries.length) return;

        gsap.set(entries, { x: -40, opacity: 0 });
        ScrollTrigger.create({
          trigger: sectionRef.current,
          start: "top 85%",
          once: true,
          onEnter: () => {
            gsap.to(entries, {
              x: 0,
              opacity: 1,
              duration: 0.6,
              stagger: 0.12,
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
        <div className="flex items-center justify-between mb-12">
          <div>
            <p className="text-xs uppercase tracking-widest text-muted-foreground mb-4">
              Experience
            </p>
            <h2 className="text-h2">
              Where I&apos;ve <span className="text-accent">worked.</span>
            </h2>
          </div>
          <a
            href="/Femi_Ajanaku_CV.pdf"
            download
            className="hidden md:inline-flex items-center gap-2 px-5 py-2.5 border border-border rounded-full text-sm font-medium hover:bg-muted transition-colors duration-200 focus-ring"
          >
            Download Resume
          </a>
        </div>

        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-3 top-0 bottom-0 w-px bg-border" aria-hidden="true" />

          <ol className="space-y-8">
            {TIMELINE.map((entry) => (
              <li key={entry.id} className="timeline-entry relative pl-10">
                {/* Dot */}
                <div
                  className={cn(
                    "absolute left-1.5 top-1.5 w-3 h-3 rounded-full border-2",
                    entry.isActive
                      ? "bg-accent border-accent animate-pulse"
                      : "bg-background border-border"
                  )}
                  aria-hidden="true"
                />

                <div className="p-5 rounded-lg border border-border bg-card hover:border-accent/30 transition-colors duration-200">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-2">
                    <h3 className="font-display font-semibold">{entry.title}</h3>
                    <span className="text-xs text-muted-foreground">
                      {entry.startDate} — {entry.endDate}
                    </span>
                  </div>
                  <p className="text-sm text-accent font-medium mb-2">
                    {entry.company} &middot; {entry.location}
                  </p>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {entry.description}
                  </p>
                  {entry.technologies && (
                    <div className="flex flex-wrap gap-1.5 mt-3">
                      {entry.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="px-2 py-0.5 text-xs rounded-full bg-muted text-muted-foreground"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </li>
            ))}
          </ol>
        </div>

        {/* Mobile resume download */}
        <div className="mt-8 md:hidden text-center">
          <a
            href="/Femi_Ajanaku_CV.pdf"
            download
            className="inline-flex items-center gap-2 px-5 py-2.5 border border-border rounded-full text-sm font-medium hover:bg-muted transition-colors duration-200 focus-ring"
          >
            Download Resume
          </a>
        </div>
      </Container>
    </section>
  );
}
