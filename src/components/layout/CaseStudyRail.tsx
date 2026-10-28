"use client";

import { useMemo } from "react";
import { useActiveSection } from "@/hooks/useActiveSection";
import { useLenis } from "@/components/layout/SmoothScroll";
import { NAV_OFFSET } from "@/hooks/useScrollToSection";
import { RailLines, type RailItem } from "@/components/layout/RailLines";

/**
 * Case-study section rail for the detail routes. Same horizontal-line indicator
 * as the home page, but driven by the sections present on this page. Scrolls to
 * a section by id (via Lenis when available) without touching the URL.
 */
export function CaseStudyRail({ items }: { items: RailItem[] }) {
  const lenis = useLenis();
  const ids = useMemo(() => items.map((i) => i.id), [items]);
  const activeId = useActiveSection(ids);

  const onSelect = (item: RailItem) => {
    const el = document.getElementById(item.id);
    if (!el) return;
    if (lenis) {
      lenis.scrollTo(el, { offset: -NAV_OFFSET });
    } else {
      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const top = el.getBoundingClientRect().top + window.scrollY - NAV_OFFSET;
      window.scrollTo({ top, behavior: reduced ? "auto" : "smooth" });
    }
  };

  return (
    <RailLines
      items={items}
      activeId={activeId}
      ariaLabel="Case study sections"
      onSelect={onSelect}
    />
  );
}
