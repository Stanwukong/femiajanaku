"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger);

interface TextRevealProps {
  text: string;
  as?: "h1" | "h2" | "h3" | "h4" | "p" | "span";
  splitBy?: "word" | "char";
  className?: string;
  delay?: number;
  triggerOnScroll?: boolean;
}

export function TextReveal({
  text,
  as: Tag = "h2",
  splitBy = "word",
  className,
  delay = 0,
  triggerOnScroll = true,
}: TextRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const el = containerRef.current;
    const spans = el.querySelectorAll(".reveal-unit");

    const animation = gsap.from(spans, {
      y: "100%",
      opacity: 0,
      duration: 0.8,
      stagger: splitBy === "char" ? 0.02 : 0.05,
      ease: "power3.out",
      delay,
      scrollTrigger: triggerOnScroll
        ? {
            trigger: el,
            start: "top 85%",
            toggleActions: "play none none none",
          }
        : undefined,
    });

    return () => {
      animation.kill();
      ScrollTrigger.getAll().forEach((t) => {
        if (t.trigger === el) t.kill();
      });
    };
  }, [text, splitBy, delay, triggerOnScroll]);

  const units = splitBy === "char" ? text.split("") : text.split(" ");

  return (
    <Tag
      ref={containerRef as React.Ref<never>}
      className={cn("overflow-hidden", className)}
    >
      {units.map((unit, i) => (
        <span
          key={i}
          className="reveal-unit inline-block"
          style={{ whiteSpace: splitBy === "word" ? "pre" : undefined }}
        >
          {unit}
          {splitBy === "word" && i < units.length - 1 ? " " : ""}
        </span>
      ))}
    </Tag>
  );
}
