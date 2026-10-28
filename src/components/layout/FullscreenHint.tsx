"use client";

import { useState, useEffect, useCallback } from "react";
import { usePathname } from "next/navigation";
import { Maximize, X } from "lucide-react";
import { useFullscreen } from "@/hooks/useFullscreen";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { useReducedMotion } from "@/hooks/useReducedMotion";

/** Let the preloader / page-transition overlay clear before inviting them in. */
const APPEAR_DELAY = 1600;
/** Auto-retire the hint if it's ignored. */
const AUTO_DISMISS = 9000;

/**
 * A quiet invitation to go fullscreen for a more immersive pass through the
 * site. Pops on entry to every page (keyed on the route), desktop-only — F11
 * and the Fullscreen API are meaningless on touch — and gets out of the way:
 * it auto-hides on fullscreen, auto-retires, and can be dismissed per view.
 */
export function FullscreenHint() {
  const pathname = usePathname();
  const { isFullscreen, isSupported, enter } = useFullscreen();
  const isDesktop = useMediaQuery("(min-width: 768px) and (pointer: fine)");
  const reducedMotion = useReducedMotion();

  const [mounted, setMounted] = useState(false);
  const [visible, setVisible] = useState(false);

  const dismiss = useCallback(() => {
    setVisible(false);
    // Unmount after the exit transition finishes.
    setTimeout(() => setMounted(false), 500);
  }, []);

  // Pop on entry to each page, after the transition has had its moment.
  useEffect(() => {
    if (!isDesktop || !isSupported || isFullscreen) return;

    setMounted(false);
    setVisible(false);

    const showTimer = setTimeout(() => {
      setMounted(true);
      // Next frame so the entrance transition actually animates.
      requestAnimationFrame(() => setVisible(true));
    }, APPEAR_DELAY);

    return () => clearTimeout(showTimer);
    // Re-run on every route change so the hint greets each page.
  }, [pathname, isDesktop, isSupported, isFullscreen]);

  // Auto-dismiss once shown.
  useEffect(() => {
    if (!visible) return;
    const timer = setTimeout(dismiss, AUTO_DISMISS);
    return () => clearTimeout(timer);
  }, [visible, dismiss]);

  // If the visitor enters fullscreen (on their own or via the button), retire it.
  useEffect(() => {
    if (isFullscreen && mounted) dismiss();
  }, [isFullscreen, mounted, dismiss]);

  const handleEnter = useCallback(() => {
    enter();
    dismiss();
  }, [enter, dismiss]);

  if (!mounted) return null;

  return (
    <div
      role="status"
      aria-live="polite"
      className={[
        "fixed bottom-6 left-1/2 z-[90] -translate-x-1/2",
        "flex items-center gap-3 rounded-full border border-border",
        "bg-background/80 px-4 py-2.5 shadow-lg backdrop-blur-md",
        reducedMotion
          ? ""
          : "transition-all duration-500 ease-[cubic-bezier(0.33,1,0.68,1)]",
        visible
          ? "translate-y-0 opacity-100"
          : "pointer-events-none translate-y-4 opacity-0",
      ].join(" ")}
    >
      <Maximize className="h-4 w-4 shrink-0 text-accent" aria-hidden="true" />

      <p className="text-xs text-muted-foreground">
        Press{" "}
        <kbd className="rounded border border-border bg-muted px-1.5 py-0.5 font-mono text-[0.7rem] text-foreground">
          F11
        </kbd>{" "}
        for the full view —{" "}
        <button
          type="button"
          onClick={handleEnter}
          className="font-medium text-foreground underline decoration-accent/60 underline-offset-2 transition-colors hover:decoration-accent"
          data-cursor="pointer"
        >
          or tap here
        </button>
      </p>

      <button
        type="button"
        onClick={dismiss}
        aria-label="Dismiss fullscreen tip"
        className="ml-1 rounded-full p-1 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
        data-cursor="pointer"
      >
        <X className="h-3.5 w-3.5" aria-hidden="true" />
      </button>
    </div>
  );
}
