"use client";

import { useRef, useEffect } from "react";
import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { AnimatedCounter } from "@/components/ui/AnimatedCounter";
import { STATS } from "@/data/skills";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function Bio() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const timeout = setTimeout(() => {
      if (!sectionRef.current) return;
      const ctx = gsap.context(() => {
        const els = gsap.utils.toArray<HTMLElement>("[data-bio-animate]");
        if (!els.length) return;

        gsap.set(els, { y: 40, opacity: 0 });
        ScrollTrigger.create({
          trigger: sectionRef.current,
          start: "top 85%",
          once: true,
          onEnter: () => {
            gsap.to(els, {
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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Profile photo */}
          <div data-bio-animate className="relative">
            <div className="aspect-square rounded-lg overflow-hidden border-2 border-border">
              <Image
                src="/ProfilePic.jpeg"
                alt="Femi Ajanaku"
                width={600}
                height={600}
                className="object-cover w-full h-full"
                priority
              />
            </div>
          </div>

          {/* Bio text */}
          <div>
            <p className="text-xs uppercase tracking-widest text-muted-foreground mb-4" data-bio-animate>
              About me
            </p>
            <h2 className="text-h2 mb-6" data-bio-animate>
              Building the future,
              <br />
              <span className="text-accent">one line at a time.</span>
            </h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed" data-bio-animate>
              <p>
                I&apos;m Femi Ajanaku, a fullstack & AI engineer based in Lagos, Nigeria.
                I specialize in building performant web applications and integrating
                intelligent systems that solve real problems.
              </p>
              <p>
                Currently, I&apos;m building at Bles Software as a Fullstack Engineer,
                leading development at Apperio as its founder, and Pursuing a Master&apos;s degree in Computer Science. I thrive at the intersection of clean code,
                beautiful interfaces, and smart architecture.
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 mt-8" data-bio-animate>
              {STATS.map((stat) => (
                <div key={stat.label} className="text-center md:text-left">
                  <div className="text-2xl font-display font-bold">
                    <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
