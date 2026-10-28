"use client";

import { useMemo } from "react";
import { usePathname } from "next/navigation";
import { NAV_ITEMS } from "@/data/navigation";
import { useActiveSection } from "@/hooks/useActiveSection";
import { useScrollToSection } from "@/hooks/useScrollToSection";
import { RailLines, type RailItem } from "@/components/layout/RailLines";

/**
 * Home-page section rail: a line per nav section that lights up as you scroll
 * and jumps there on click. Desktop + home only — the sections resolve on `/`.
 */
export function ScrollRail() {
  const pathname = usePathname();
  const sectionIds = useMemo(() => NAV_ITEMS.map((i) => i.sectionId), []);
  const activeSection = useActiveSection(sectionIds);
  const scrollToSection = useScrollToSection();

  const items: RailItem[] = useMemo(
    () => NAV_ITEMS.map((i) => ({ id: i.sectionId, label: i.label, href: i.path })),
    []
  );

  if (pathname !== "/") return null;

  return (
    <RailLines
      items={items}
      activeId={activeSection}
      ariaLabel="Section progress"
      onSelect={(item) => scrollToSection(item.id, item.href)}
    />
  );
}
