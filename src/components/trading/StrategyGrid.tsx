"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Container } from "@/components/ui/Container";
import { StrategyCard } from "@/components/trading/StrategyCard";
import type { StrategyCardData } from "@/types";

gsap.registerPlugin(ScrollTrigger);

/**
 * Cards are passed in from the server rather than imported here: the strategy
 * module carries the full trade journals, and a client import would serialise
 * all of them into the home page payload just to draw three sparklines.
 */
export function StrategyGrid({ strategies }: { strategies: StrategyCardData[] }) {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    // Delay animation setup until after page transition panels have cleared
    const timeout = setTimeout(() => {
      if (!sectionRef.current) return;

      const ctx = gsap.context(() => {
        const cards = gsap.utils.toArray<HTMLElement>(".strategy-card");
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
        <p className="mb-4 text-xs uppercase tracking-widest text-muted-foreground">
          Algorithmic trading
        </p>
        <h2 className="text-h1 mb-4">
          Strategies & <span className="text-accent">backtests.</span>
        </h2>
        <p className="mb-12 max-w-2xl text-muted-foreground">
          Automated systems I have written, tested, and published the source for. Every
          strategy below links to its full code, its equity curve, and the trade-by-trade
          journal behind the numbers — results are historical backtests, not live returns.
        </p>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {strategies.map((strategy) => (
            <StrategyCard key={strategy.id} strategy={strategy} />
          ))}
        </div>
      </Container>
    </section>
  );
}
