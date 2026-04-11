"use client";

import { useRef, useEffect } from "react";
import { Code2, Paintbrush, Smartphone, Users } from "lucide-react";
import { Container } from "@/components/ui/Container";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger);

const SERVICES = [
  {
    icon: Code2,
    title: "Clean Code",
    description:
      "Writing maintainable, well-tested code that scales. Every line has a purpose.",
  },
  {
    icon: Paintbrush,
    title: "Pixel Perfect",
    description:
      "Translating designs into polished interfaces with meticulous attention to detail.",
  },
  {
    icon: Smartphone,
    title: "Responsive",
    description:
      "Building experiences that feel native on every device, from mobile to desktop.",
  },
  {
    icon: Users,
    title: "Collaborative",
    description:
      "Working closely with teams, understanding requirements, and delivering on time.",
  },
];

export function Services() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const timeout = setTimeout(() => {
      if (!sectionRef.current) return;
      const ctx = gsap.context(() => {
        const cards = gsap.utils.toArray<HTMLElement>(".service-card");
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
          What I do
        </p>
        <h2 className="text-h2 mb-12">
          Crafting digital experiences
          <br />
          with <span className="text-accent">purpose.</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {SERVICES.map((service) => (
            <div
              key={service.title}
              className={cn(
                "service-card group relative p-6 md:p-8 rounded-lg border border-border",
                "bg-card hover:border-accent/50 transition-colors duration-300",
                "hover:shadow-lg hover:shadow-accent/5"
              )}
            >
              <service.icon className="w-6 h-6 text-accent mb-4 group-hover:scale-110 transition-transform duration-300" />
              <h3 className="text-lg font-display font-semibold mb-2">
                {service.title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
