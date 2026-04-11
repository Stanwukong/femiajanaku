"use client";

import { useRef, useEffect, useCallback } from "react";
import gsap from "gsap";

interface FemiLogoProps {
  size?: "sm" | "md" | "lg";
  animate?: boolean;
  onAnimationComplete?: () => void;
  className?: string;
  interactive?: boolean;
}

const SIZES = {
  sm: { width: 80, height: 24 },
  md: { width: 160, height: 48 },
  lg: { width: 320, height: 96 },
};

export function FemiLogo({
  size = "md",
  animate = true,
  onAnimationComplete,
  className = "",
  interactive = true,
}: FemiLogoProps) {
  const svgRef = useRef<SVGSVGElement>(null);
  const tlRef = useRef<gsap.core.Timeline | null>(null);
  const hasAnimated = useRef(false);
  const { width, height } = SIZES[size];

  const playDrawAnimation = useCallback(
    (speed = 1) => {
      if (!svgRef.current) return;
      const paths = svgRef.current.querySelectorAll("path");

      // Kill previous timeline
      if (tlRef.current) tlRef.current.kill();

      const tl = gsap.timeline({
        onComplete: onAnimationComplete,
      });
      tlRef.current = tl;

      // Set initial state
      paths.forEach((path) => {
        const length = path.getTotalLength();
        gsap.set(path, {
          strokeDasharray: length,
          strokeDashoffset: length,
          fill: "transparent",
          stroke: "currentColor",
          opacity: 1,
        });
      });

      // Phase 1: Draw strokes
      tl.to(Array.from(paths), {
        strokeDashoffset: 0,
        duration: 0.6 / speed,
        stagger: 0.15 / speed,
        ease: "power2.inOut",
      });

      // Phase 2: Fill fades in
      tl.to(
        Array.from(paths),
        {
          fill: "currentColor",
          duration: 0.4 / speed,
          stagger: 0.08 / speed,
          ease: "power1.in",
        },
        "-=0.1"
      );

      // Phase 3: Stroke fades
      tl.to(
        Array.from(paths),
        {
          stroke: "transparent",
          duration: 0.3 / speed,
          ease: "power1.out",
        },
        "-=0.2"
      );

      return tl;
    },
    [onAnimationComplete]
  );

  useEffect(() => {
    if (!animate || hasAnimated.current) return;

    // Check reduced motion
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      // Just show the logo without animation
      if (svgRef.current) {
        const paths = svgRef.current.querySelectorAll("path");
        paths.forEach((path) => {
          gsap.set(path, { fill: "currentColor", stroke: "transparent" });
        });
      }
      onAnimationComplete?.();
      hasAnimated.current = true;
      return;
    }

    const timeout = setTimeout(() => {
      playDrawAnimation();
      hasAnimated.current = true;
    }, 100);

    return () => clearTimeout(timeout);
  }, [animate, playDrawAnimation, onAnimationComplete]);

  const handleHover = () => {
    if (!interactive || !hasAnimated.current) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    playDrawAnimation(1); 
  };

  return (
    <svg
      ref={svgRef}
      viewBox="0 0 240 60"
      width={width}
      height={height}
      className={`${className}`}
      onMouseEnter={handleHover}
      aria-label="FEMI"
      role="img"
    >
      {/* F */}
      <path
        d="M 5 55 L 5 5 L 45 5 M 5 28 L 35 28"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      {/* E */}
      <path
        d="M 60 55 L 60 5 L 100 5 M 60 30 L 90 30 M 60 55 L 100 55"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      {/* M */}
      <path
        d="M 115 55 L 115 5 L 140 30 L 165 5 L 165 55"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      {/* I */}
      <path
        d="M 185 5 L 225 5 M 205 5 L 205 55 M 185 55 L 225 55"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </svg>
  );
}
