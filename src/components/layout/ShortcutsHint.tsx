"use client";

/** Shared channel so the footer hint can open the shortcuts overlay. */
export const OPEN_SHORTCUTS_EVENT = "shortcuts:open";

/**
 * A visible, clickable nudge in the footer that surfaces the otherwise-hidden
 * "press ?" cheat sheet. Dispatches a window event the KeyboardShortcuts
 * overlay listens for, so the two stay decoupled.
 */
export function ShortcutsHint() {
  return (
    <button
      type="button"
      onClick={() => window.dispatchEvent(new Event(OPEN_SHORTCUTS_EVENT))}
      className="focus-ring inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors duration-200 hover:text-accent"
      data-cursor="pointer"
    >
      Keyboard shortcuts
      <kbd className="rounded border border-border bg-muted px-1.5 py-0.5 font-mono text-[0.7rem] text-foreground">
        ?
      </kbd>
    </button>
  );
}
