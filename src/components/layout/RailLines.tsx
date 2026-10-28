"use client";

import { cn } from "@/lib/utils";

export interface RailItem {
  id: string;
  label: string;
  /** Optional href for section links that update the URL (home sections). */
  href?: string;
}

interface RailLinesProps {
  items: RailItem[];
  activeId: string;
  ariaLabel: string;
  onSelect: (item: RailItem) => void;
}

/**
 * Right-edge section indicator: a stack of evenly spaced horizontal lines, one
 * per section. The active line is wider and accent-coloured; hovering or
 * focusing any line widens it and reveals the section's name, and the whole row
 * is a link that jumps there. Desktop-only — it's a pointer/keyboard affordance.
 */
export function RailLines({ items, activeId, ariaLabel, onSelect }: RailLinesProps) {
  if (items.length < 2) return null;

  return (
    <nav
      aria-label={ariaLabel}
      className="fixed right-6 top-1/2 z-40 hidden -translate-y-1/2 md:block"
    >
      <ul className="flex flex-col items-end gap-4">
        {items.map((item) => {
          const isActive = item.id === activeId;
          return (
            <li key={item.id}>
              <button
                type="button"
                onClick={() => onSelect(item)}
                aria-label={`Go to ${item.label}`}
                aria-current={isActive ? "true" : undefined}
                data-cursor="pointer"
                className="group flex items-center justify-end gap-3 py-1 focus-ring"
              >
                <span
                  className={cn(
                    "whitespace-nowrap text-[0.7rem] font-medium uppercase tracking-wide",
                    "translate-x-1 opacity-0 transition-all duration-200",
                    "group-hover:translate-x-0 group-hover:opacity-100",
                    "group-focus-visible:translate-x-0 group-focus-visible:opacity-100",
                    isActive ? "text-accent" : "text-muted-foreground"
                  )}
                >
                  {item.label}
                </span>
                <span
                  aria-hidden="true"
                  className={cn(
                    "block h-0.5 rounded-full transition-all duration-300",
                    isActive
                      ? "w-10 bg-accent"
                      : "w-5 bg-muted-foreground/40 group-hover:w-10 group-hover:bg-foreground"
                  )}
                />
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
