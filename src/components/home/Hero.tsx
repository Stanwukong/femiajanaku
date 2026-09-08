"use client";

import { useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";
import { Container } from "@/components/ui/Container";
import gsap from "gsap";

export function Hero() {
  const heroRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!heroRef.current) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const timeout = setTimeout(() => {
      if (!heroRef.current) return;
      const ctx = gsap.context(() => {
        const els = gsap.utils.toArray<HTMLElement>("[data-hero-animate]");
        gsap.set(els, { y: 60, opacity: 0 });
        gsap.to(els, {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.15,
          ease: "power2.out",
        });
      }, heroRef);
      return () => ctx.revert();
    }, 900);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      data-animate="entrance"
    >
      {/* Dot grid background */}
      <div
        className="absolute inset-0 opacity-[0.15] dark:opacity-[0.08]"
        style={{
          backgroundImage:
            "radial-gradient(circle, hsl(var(--foreground)) 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
        aria-hidden="true"
      />

      <Container size="lg" className="relative z-10 text-center">
        {/* Availability indicator */}
        <div
          data-hero-animate
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-border bg-background/80 backdrop-blur-sm mb-8"
        >
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75" />
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-accent" />
          </span>
          <span className="text-xs font-medium tracking-wide uppercase text-muted-foreground">
            Open to contracts
          </span>
        </div>

        {/* Name */}
        <h1 data-hero-animate className="text-display tracking-tighter mb-4">
          FEMI
          <br />
          AJANAKU
        </h1>

        {/* Subtitle */}
        <p
          data-hero-animate
          className="text-h5 text-muted-foreground font-normal max-w-md mx-auto"
        >
          Fullstack Engineer | Lagos, Nigeria        </p>
      </Container>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <ChevronDown className="w-5 h-5 text-muted-foreground" />
      </div>
    </section>
  );
}
