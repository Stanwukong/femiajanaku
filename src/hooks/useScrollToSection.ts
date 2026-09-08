"use client";

import { useCallback } from "react";
import { useLenis } from "@/components/layout/SmoothScroll";

/** Height of the fixed navbar (h-16). */
export const NAV_OFFSET = 64;

/**
 * Scrolls to a section on the single page. Returns `false` when the section
 * isn't on the current page (project detail routes), so callers can fall back
 * to normal link navigation.
 */
export function useScrollToSection() {
  const lenis = useLenis();

  return useCallback(
    (sectionId: string, href = `/#${sectionId}`) => {
      const isTop = sectionId === "home";
      const target = isTop ? document.body : document.getElementById(sectionId);
      if (!target) return false;

      const offset = isTop ? 0 : -NAV_OFFSET;

      if (lenis) {
        lenis.scrollTo(isTop ? 0 : target, { offset });
      } else {
        const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        const top = isTop
          ? 0
          : target.getBoundingClientRect().top + window.scrollY + offset;
        window.scrollTo({ top, behavior: reduced ? "auto" : "smooth" });
      }

      window.history.replaceState(null, "", isTop ? "/" : href);
      return true;
    },
    [lenis]
  );
}
