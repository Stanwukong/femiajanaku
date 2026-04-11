/** Motion design tokens — single source of truth for all animations */

export const EASE = {
  /** Standard transition for most UI movements */
  default: "power2.out",
  /** Page transitions, large movements */
  dramatic: "power3.inOut",
  /** Content entering viewport */
  entrance: "power2.out",
  /** Content leaving viewport */
  exit: "power2.in",
  /** Bounce-back for interactive elements */
  elastic: "elastic.out(1, 0.5)",
  /** Smooth deceleration for scroll-linked */
  smooth: "none",
} as const;

export const DURATION = {
  /** Micro-interactions: hover, click feedback */
  fast: 0.2,
  /** Standard UI transitions: underlines, color changes */
  normal: 0.4,
  /** Section reveals, card animations */
  slow: 0.8,
  /** Page transitions, preloader sequences */
  page: 1.2,
  /** Logo draw animation */
  logo: 1.8,
} as const;

export const STAGGER = {
  /** Panel transitions */
  panel: 0.08,
  /** Text character reveals */
  char: 0.02,
  /** Text word reveals */
  word: 0.05,
  /** Section child elements */
  section: 0.1,
  /** Card grid items */
  card: 0.12,
} as const;

/** CSS easing equivalents for Tailwind/CSS transitions */
export const CSS_EASE = {
  default: "cubic-bezier(0.33, 1, 0.68, 1)",
  dramatic: "cubic-bezier(0.65, 0, 0.35, 1)",
  entrance: "cubic-bezier(0.33, 1, 0.68, 1)",
} as const;

/** Check if user prefers reduced motion */
export function prefersReducedMotion(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/** Determine motion level based on device capabilities */
export type MotionLevel = "full" | "reduced" | "minimal";

export function getMotionLevel(): MotionLevel {
  if (typeof window === "undefined") return "full";
  if (prefersReducedMotion()) return "minimal";

  const isMobile = window.matchMedia("(max-width: 768px)").matches;
  const isTouch = window.matchMedia("(pointer: coarse)").matches;

  if (isMobile || isTouch) return "reduced";
  return "full";
}
