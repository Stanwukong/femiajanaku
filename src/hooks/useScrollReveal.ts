"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface ScrollRevealOptions {
  /** Elements to stagger in, selected within the returned ref. */
  selector?: string;
  /** ScrollTrigger start position. */
  start?: string;
  /** Vertical travel before settling, in px. */
  y?: number;
  /** Delay between each element. */
  stagger?: number;
}

/**
 * Shared section-entrance choreography: the same reveal Bio/Skills/Timeline use,
 * extracted so every section animates in consistently. Attach the returned ref
 * to a section and mark the children that should rise in with `data-reveal`.
 *
 * Reduced-motion-safe (skips entirely) and scoped via gsap.context so it cleans
 * up after itself. The 900ms delay lets the page-transition overlay clear first.
 */
export function useScrollReveal<T extends HTMLElement = HTMLElement>({
  selector = "[data-reveal]",
  start = "top 85%",
  y = 40,
  stagger = 0.12,
}: ScrollRevealOptions = {}) {
  const ref = useRef<T>(null);

  useEffect(() => {
    if (!ref.current) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const timeout = setTimeout(() => {
      if (!ref.current) return;
      const ctx = gsap.context(() => {
        const els = gsap.utils.toArray<HTMLElement>(selector);
        if (!els.length) return;

        gsap.set(els, { y, opacity: 0 });
        ScrollTrigger.create({
          trigger: ref.current,
          start,
          once: true,
          onEnter: () => {
            gsap.to(els, {
              y: 0,
              opacity: 1,
              duration: 0.8,
              stagger,
              ease: "power2.out",
            });
          },
        });
        ScrollTrigger.refresh();
      }, ref);
      return () => ctx.revert();
    }, 900);

    return () => clearTimeout(timeout);
  }, [selector, start, y, stagger]);

  return ref;
}
