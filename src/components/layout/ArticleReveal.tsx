"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * Gives the detail routes (project / strategy case studies) the same entrance
 * beat as the home sections: elements marked `data-animate="entrance"` rise in,
 * batched so a run of them staggers together as it scrolls into view.
 *
 * Mount once per detail page. Reduced-motion-safe; the 900ms delay lets the
 * page-transition overlay clear first. The outer <article> is left untouched so
 * only its blocks animate, not the whole page as one.
 */
export function ArticleReveal() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let cleanup: (() => void) | undefined;

    const timeout = setTimeout(() => {
      const els = gsap.utils
        .toArray<HTMLElement>('[data-animate="entrance"]')
        .filter((el) => el.tagName !== "ARTICLE");
      if (!els.length) return;

      const ctx = gsap.context(() => {
        gsap.set(els, { y: 40, opacity: 0 });
        ScrollTrigger.batch(els, {
          start: "top 90%",
          once: true,
          onEnter: (batch) =>
            gsap.to(batch, {
              y: 0,
              opacity: 1,
              duration: 0.8,
              stagger: 0.12,
              ease: "power2.out",
            }),
        });
        ScrollTrigger.refresh();
      });

      // Store for cleanup.
      cleanup = () => ctx.revert();
    }, 900);

    return () => {
      clearTimeout(timeout);
      cleanup?.();
    };
  }, []);

  return null;
}
