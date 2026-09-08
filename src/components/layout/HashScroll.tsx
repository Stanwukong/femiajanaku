"use client";

import { useEffect } from "react";
import { useScrollToSection } from "@/hooks/useScrollToSection";

/**
 * Deep links like /#projects land while the page-transition panels are still
 * covering the viewport, so the native anchor jump lands in the wrong place.
 * Re-run the scroll once the entrance animation has cleared.
 */
export function HashScroll() {
  const scrollToSection = useScrollToSection();

  useEffect(() => {
    const id = window.location.hash.slice(1);
    if (!id) return;

    const timeout = setTimeout(() => scrollToSection(id), 1000);
    return () => clearTimeout(timeout);
  }, [scrollToSection]);

  return null;
}
