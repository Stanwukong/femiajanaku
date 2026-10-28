"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import { Keyboard, X } from "lucide-react";
import { NAV_ITEMS } from "@/data/navigation";
import { useFullscreen } from "@/hooks/useFullscreen";
import { useScrollToSection } from "@/hooks/useScrollToSection";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { OPEN_SHORTCUTS_EVENT } from "@/components/layout/ShortcutsHint";
import { cn } from "@/lib/utils";

interface Shortcut {
  keys: string[];
  label: string;
}

/** Don't hijack keys while the visitor is typing. */
function isEditable(el: EventTarget | null): boolean {
  if (!(el instanceof HTMLElement)) return false;
  const tag = el.tagName;
  return (
    tag === "INPUT" ||
    tag === "TEXTAREA" ||
    tag === "SELECT" ||
    el.isContentEditable
  );
}

/**
 * Global keyboard shortcuts plus a "press ?" cheat-sheet overlay. Jump between
 * sections by number, toggle fullscreen and theme, and open this help — giving
 * keyboard-first visitors a faster path through the site.
 */
export function KeyboardShortcuts() {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const { setTheme, resolvedTheme } = useTheme();
  const { toggle: toggleFullscreen } = useFullscreen();
  const scrollToSection = useScrollToSection();
  const reducedMotion = useReducedMotion();
  const closeRef = useRef<HTMLButtonElement>(null);

  const goToSection = useCallback(
    (sectionId: string, path: string) => {
      if (!scrollToSection(sectionId, path)) router.push(path);
    },
    [scrollToSection, router]
  );

  const handleKey = useCallback(
    (e: KeyboardEvent) => {
      if (e.ctrlKey || e.metaKey || e.altKey) return;
      if (isEditable(e.target)) return;

      // "?" (Shift + /) toggles the cheat sheet.
      if (e.key === "?") {
        e.preventDefault();
        setOpen((v) => !v);
        return;
      }
      if (e.key === "Escape" && open) {
        setOpen(false);
        return;
      }

      const key = e.key.toLowerCase();

      // Number keys jump to nav sections.
      const index = Number(e.key) - 1;
      if (!Number.isNaN(index) && NAV_ITEMS[index]) {
        e.preventDefault();
        setOpen(false);
        goToSection(NAV_ITEMS[index].sectionId, NAV_ITEMS[index].path);
        return;
      }

      if (key === "f") {
        e.preventDefault();
        toggleFullscreen();
        setOpen(false);
      } else if (key === "t") {
        e.preventDefault();
        setTheme(resolvedTheme === "dark" ? "light" : "dark");
      }
    },
    [open, goToSection, toggleFullscreen, setTheme, resolvedTheme]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [handleKey]);

  // Let the footer hint (or anything else) open the overlay.
  useEffect(() => {
    const openOverlay = () => setOpen(true);
    window.addEventListener(OPEN_SHORTCUTS_EVENT, openOverlay);
    return () => window.removeEventListener(OPEN_SHORTCUTS_EVENT, openOverlay);
  }, []);

  // Move focus into the dialog when it opens.
  useEffect(() => {
    if (open) closeRef.current?.focus();
  }, [open]);

  const shortcuts: Shortcut[] = [
    ...NAV_ITEMS.map((item, i) => ({
      keys: [String(i + 1)],
      label: `Go to ${item.label}`,
    })),
    { keys: ["F"], label: "Toggle fullscreen" },
    { keys: ["T"], label: "Toggle theme" },
    { keys: ["?"], label: "Toggle this help" },
    { keys: ["Esc"], label: "Close this help" },
  ];

  return (
    <>
      {/* Subtle, discoverable trigger (desktop only). */}
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Show keyboard shortcuts"
        data-cursor="pointer"
        className="fixed bottom-6 left-6 z-40 hidden h-9 w-9 items-center justify-center rounded-full border border-border bg-background/80 text-muted-foreground shadow-sm backdrop-blur-md transition-colors hover:border-accent/50 hover:text-foreground md:flex"
      >
        <Keyboard className="h-4 w-4" aria-hidden="true" />
      </button>

      {open && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="shortcuts-title"
          className={cn(
            "fixed inset-0 z-[120] flex items-center justify-center p-4",
            "bg-background/70 backdrop-blur-sm",
            reducedMotion ? "" : "animate-in fade-in duration-200"
          )}
          onClick={(e) => {
            if (e.target === e.currentTarget) setOpen(false);
          }}
        >
          <div className="w-full max-w-sm rounded-lg border border-border bg-card p-6 shadow-xl">
            <div className="mb-5 flex items-center justify-between">
              <h2
                id="shortcuts-title"
                className="flex items-center gap-2 font-display text-lg font-semibold"
              >
                <Keyboard className="h-4 w-4 text-accent" aria-hidden="true" />
                Keyboard shortcuts
              </h2>
              <button
                ref={closeRef}
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close"
                data-cursor="pointer"
                className="rounded-full p-1.5 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus-ring"
              >
                <X className="h-4 w-4" aria-hidden="true" />
              </button>
            </div>

            <ul className="space-y-2.5">
              {shortcuts.map((s) => (
                <li
                  key={s.label}
                  className="flex items-center justify-between gap-4 text-sm"
                >
                  <span className="text-muted-foreground">{s.label}</span>
                  <span className="flex gap-1">
                    {s.keys.map((k) => (
                      <kbd
                        key={k}
                        className="min-w-[1.6rem] rounded border border-border bg-muted px-1.5 py-0.5 text-center font-mono text-xs text-foreground"
                      >
                        {k}
                      </kbd>
                    ))}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </>
  );
}
