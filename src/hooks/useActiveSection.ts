"use client";

import { useEffect, useState } from "react";

/**
 * Scroll-spy: returns the id of the section currently occupying the middle of
 * the viewport. Falls back to the first id before any section is observed.
 */
export function useActiveSection(sectionIds: string[]): string {
  const [activeId, setActiveId] = useState(sectionIds[0] ?? "");

  useEffect(() => {
    const elements = sectionIds
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    if (!elements.length) return;

    const visible = new Map<string, boolean>();

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          visible.set(entry.target.id, entry.isIntersecting);
        });
        const next = sectionIds.find((id) => visible.get(id));
        if (next) setActiveId(next);
      },
      // Only count a section once it crosses the middle band of the viewport.
      { rootMargin: "-45% 0px -45% 0px", threshold: 0 }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sectionIds.join(",")]);

  return activeId;
}
