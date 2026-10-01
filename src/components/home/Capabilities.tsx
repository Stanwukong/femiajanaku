"use client";

import { useRef, useEffect, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger);

interface Capability {
  id: string;
  title: string;
  summary: string;
  stack: string[];
}

const CAPABILITIES: Capability[] = [
  {
    id: "ai",
    title: "AI Systems & Agents",
    summary:
      "I build RAG pipelines, tool-using agents, and MCP servers that actually get things done.",
    stack: ["OpenAI", "Anthropic", "LangGraph", "pgvector", "n8n"],
  },
  {
    id: "product",
    title: "Product Engineering, 0→1",
    summary:
      "I build products end to end, from the frontend to the backend and the infrastructure running underneath it. TypeScript, Node, FastAPI, whatever fits the job.",
    stack: ["Next.js", "FastAPI", "PostgreSQL", "AWS"],
  },
  {
    id: "motion",
    title: "Motion & Performance",
    summary:
      "I build interfaces that feel good to use without sacrificing performance. Motion has a purpose, and I make sure it still feels smooth on the hardware people actually use.",
    stack: ["GSAP", "Framer motion", "Core Web Vitals", "A11y", "Apperio"],
  },
  {
    id: "trading",
    title: "Trading Systems",
    summary:
      "I build automated trading systems end to end: signal logic, risk management and live execution, plus the tooling that parses raw backtest reports into equity curves and trade journals. The test is whether a signal still holds on data it hasn’t seen, not whether it looks good on a chart.",
    stack: ["MQL5", "Pine Script", "pandas", "Backtesting"],
  },
];

/** Jagged upward line — draws itself when the trading row opens. */
const SPARKLINE_PATH =
  "M 2 42 L 18 36 L 30 40 L 44 26 L 56 31 L 70 17 L 82 23 L 96 12 L 110 18 L 124 8 L 140 13 L 158 3";

function Sparkline({ active, animate }: { active: boolean; animate: boolean }) {
  const drawn = active || !animate;

  return (
    <svg
      viewBox="0 0 160 48"
      className="w-36 h-11 shrink-0 text-accent"
      fill="none"
      aria-hidden="true"
    >
      <path
        d={SPARKLINE_PATH}
        stroke="currentColor"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
        style={{
          strokeDasharray: 340,
          strokeDashoffset: drawn ? 0 : 340,
          transition: animate
            ? "stroke-dashoffset 1.1s var(--ease-default)"
            : undefined,
        }}
      />
      <circle
        cx={158}
        cy={3}
        r={3}
        fill="currentColor"
        style={{
          opacity: drawn ? 1 : 0,
          transition: animate ? "opacity 300ms 900ms linear" : undefined,
        }}
      />
    </svg>
  );
}

export function Capabilities() {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovering, setIsHovering] = useState(false);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (!sectionRef.current) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const timeout = setTimeout(() => {
      if (!sectionRef.current) return;
      const ctx = gsap.context(() => {
        const rows = gsap.utils.toArray<HTMLElement>(".capability-row");
        if (!rows.length) return;

        gsap.set(rows, { y: 40, opacity: 0 });
        ScrollTrigger.create({
          trigger: sectionRef.current,
          start: "top 85%",
          once: true,
          onEnter: () => {
            gsap.to(rows, {
              y: 0,
              opacity: 1,
              duration: 0.7,
              stagger: 0.1,
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
    <section
      ref={sectionRef}
      className="py-[var(--section-gap)]"
      data-animate="entrance"
    >
      <Container size="lg">
        <p className="text-xs uppercase tracking-widest text-muted-foreground mb-4">
          What I build
        </p>
        <h2 className="text-h2 mb-12">
          Systems that do the hard work. 
          <br />
          Interfaces that{" "}
          <span className="text-accent">stay out of the way.</span>
        </h2>

        <ul
          className="border-t border-border"
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
        >
          {CAPABILITIES.map((capability, index) => {
            const isOpen = activeIndex === index;
            const panelId = `capability-panel-${capability.id}`;

            return (
              <li
                key={capability.id}
                className={cn(
                  "capability-row border-b border-border transition-opacity duration-300",
                  isHovering && !isOpen && "md:opacity-40",
                )}
              >
                <button
                  type="button"
                  onClick={() => setActiveIndex(index)}
                  onMouseEnter={() => setActiveIndex(index)}
                  onFocus={() => setActiveIndex(index)}
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                  className="group w-full flex items-center gap-4 md:gap-8 py-6 md:py-8 text-left focus-ring"
                >
                  <span
                    className={cn(
                      "w-8 md:w-12 shrink-0 font-mono text-xs tabular-nums transition-colors duration-300",
                      isOpen ? "text-accent" : "text-muted-foreground",
                    )}
                  >
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  <h3
                    className={cn(
                      "flex-1 text-h3 md:text-h2 font-display tracking-tight transition-colors duration-300",
                      isOpen ? "text-accent" : "group-hover:text-accent",
                    )}
                  >
                    {capability.title}
                  </h3>

                  <ArrowUpRight
                    className={cn(
                      "w-5 h-5 shrink-0 transition-all duration-300",
                      isOpen
                        ? "rotate-90 text-accent"
                        : "text-muted-foreground group-hover:text-accent",
                    )}
                  />
                </button>

                {/* Expanding panel — grid-rows trick animates to auto height */}
                <div
                  id={panelId}
                  role="region"
                  aria-label={capability.title}
                  className={cn(
                    "grid transition-[grid-template-rows] duration-500 motion-reduce:transition-none",
                    isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
                  )}
                  style={{ transitionTimingFunction: "var(--ease-default)" }}
                >
                  <div className="overflow-hidden">
                    <div
                      className={cn(
                        "pl-12 md:pl-20 pr-4 pb-8 flex flex-col md:flex-row md:items-end md:justify-between gap-6",
                        "transition-opacity duration-300 motion-reduce:transition-none",
                        isOpen ? "opacity-100" : "opacity-0",
                      )}
                    >
                      <div className="max-w-xl">
                        <p className="text-sm md:text-base text-muted-foreground leading-relaxed mb-5">
                          {capability.summary}
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {capability.stack.map((tech) => (
                            <span
                              key={tech}
                              className="px-2.5 py-1 text-xs rounded-full border border-border text-muted-foreground"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>

                      {capability.id === "trading" && (
                        <Sparkline active={isOpen} animate={!reducedMotion} />
                      )}
                    </div>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </Container>
    </section>
  );
}
