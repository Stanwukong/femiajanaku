"use client";

import { useMemo } from "react";
import { usePathname } from "next/navigation";
import { NAV_ITEMS } from "@/data/navigation";
import { useScrollProgress } from "@/hooks/useScrollProgress";
import { useActiveSection } from "@/hooks/useActiveSection";
import { useScrollToSection } from "@/hooks/useScrollToSection";
import { cn } from "@/lib/utils";

/**
 * A slim vertical rail on the right edge that doubles as a scroll-progress
 * meter and a section map. The fill tracks page progress; each dot marks a
 * nav section, lights up when active, and scrolls there on click.
 *
 * Desktop-only and home-only — the dots map the single page's section anchors.
 */
export function ScrollRail() {
  const pathname = usePathname();
  const { progress } = useScrollProgress();
  const sectionIds = useMemo(() => NAV_ITEMS.map((i) => i.sectionId), []);
  const activeSection = useActiveSection(sectionIds);
  const scrollToSection = useScrollToSection();

  // Sections only resolve on the single home page.
  if (pathname !== "/") return null;

  return (
    <nav
      aria-label="Section progress"
      className="fixed right-6 top-1/2 z-40 hidden -translate-y-1/2 md:block"
    >
      <div className="relative flex h-56 flex-col items-center justify-between">
        {/* Track + progress fill, centered behind the dots */}
        <span
          aria-hidden="true"
          className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-border"
        />
        <span
          aria-hidden="true"
          className="absolute left-1/2 top-0 w-px -translate-x-1/2 origin-top bg-accent transition-transform duration-150 ease-out"
          style={{ height: "100%", transform: `scaleY(${progress})` }}
        />

        {NAV_ITEMS.map((item) => {
          const isActive = activeSection === item.sectionId;
          return (
            <button
              key={item.sectionId}
              type="button"
              onClick={() => scrollToSection(item.sectionId, item.path)}
              aria-label={`Go to ${item.label}`}
              aria-current={isActive ? "true" : undefined}
              data-cursor="pointer"
              className="group relative z-10 flex items-center justify-center p-1"
            >
              {/* Label, revealed on hover/focus to the left of the dot */}
              <span
                className={cn(
                  "pointer-events-none absolute right-6 whitespace-nowrap rounded-full border border-border bg-background/90 px-2.5 py-1 text-[0.65rem] font-medium uppercase tracking-wide backdrop-blur-sm",
                  "opacity-0 translate-x-1 transition-all duration-200",
                  "group-hover:opacity-100 group-hover:translate-x-0 group-focus-visible:opacity-100 group-focus-visible:translate-x-0",
                  isActive ? "text-accent" : "text-muted-foreground"
                )}
              >
                {item.label}
              </span>

              {/* Dot */}
              <span
                className={cn(
                  "block rounded-full border transition-all duration-300",
                  isActive
                    ? "h-3 w-3 border-accent bg-accent shadow-[0_0_0_4px_hsl(var(--accent)/0.15)]"
                    : "h-2.5 w-2.5 border-muted-foreground/50 bg-background group-hover:border-accent group-hover:scale-110"
                )}
              />
            </button>
          );
        })}
      </div>
    </nav>
  );
}
