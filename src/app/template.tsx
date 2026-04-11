"use client";

import { useEffect, useRef } from "react";
import { animatePageIn } from "@/utils/animations";

export default function Template({ children }: { children: React.ReactNode }) {
  const hasRun = useRef(false);

  useEffect(() => {
    if (hasRun.current) return;
    hasRun.current = true;

    const pageContent = document.querySelector("[data-page-content]") as HTMLElement;
    const logo = document.querySelector("[data-transition-logo]") as HTMLElement;
    const panels = document.querySelectorAll("[data-panel]");

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reducedMotion) {
      panels.forEach((el) => {
        (el as HTMLElement).style.transform = "translateY(-100%)";
      });
      if (logo) logo.style.opacity = "0";
      if (pageContent) pageContent.style.opacity = "1";
      return;
    }

    try {
      animatePageIn();
    } catch {
      panels.forEach((el) => {
        (el as HTMLElement).style.transform = "translateY(-100%)";
      });
      if (logo) logo.style.opacity = "0";
      if (pageContent) pageContent.style.opacity = "1";
    }
  }, []);

  return (
    <>
      {/* Page transition panels — start covering the viewport */}
      {[0, 1, 2, 3, 4].map((i) => (
        <div
          key={i}
          data-panel={i}
          className="min-h-screen bg-neutral-950 fixed top-0 z-50"
          style={{
            left: `${i * 20}%`,
            width: "20%",
          }}
        />
      ))}

      {/* Transition logo — centered on overlay */}
      <div
        data-transition-logo
        className="fixed z-50 pointer-events-none"
        style={{
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          opacity: 0,
        }}
      >
        <svg
          viewBox="0 0 240 60"
          width={200}
          height={60}
          className="text-neutral-50"
          aria-hidden="true"
        >
          <path
            d="M 5 55 L 5 5 L 45 5 M 5 28 L 35 28"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
            stroke="currentColor"
          />
          <path
            d="M 60 55 L 60 5 L 100 5 M 60 30 L 90 30 M 60 55 L 100 55"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
            stroke="currentColor"
          />
          <path
            d="M 115 55 L 115 5 L 140 30 L 165 5 L 165 55"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
            stroke="currentColor"
          />
          <path
            d="M 185 5 L 225 5 M 205 5 L 205 55 M 185 55 L 225 55"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
            stroke="currentColor"
          />
        </svg>
      </div>

      {/* Page content — hidden behind panels until transition completes */}
      <div data-page-content style={{ opacity: 0 }}>
        {children}
      </div>
    </>
  );
}
