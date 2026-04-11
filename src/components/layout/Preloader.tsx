"use client";

import { useState, useEffect, useCallback } from "react";
import { FemiLogo } from "@/components/ui/FemiLogo";
import { useFirstVisit } from "@/hooks/useFirstVisit";
import gsap from "gsap";

export function Preloader() {
  const isFirstVisit = useFirstVisit();
  const [isVisible, setIsVisible] = useState(true);
  const [isDone, setIsDone] = useState(false);

  const handleAnimationComplete = useCallback(() => {
    // After logo draws, fade out the preloader
    const tl = gsap.timeline({
      onComplete: () => {
        setIsVisible(false);
        setTimeout(() => setIsDone(true), 100);
      },
    });

    tl.to(".preloader-content", {
      scale: 0.8,
      opacity: 0,
      duration: 0.6,
      ease: "power2.in",
      delay: 0.3,
    });

    tl.to(".preloader-bg", {
      yPercent: -100,
      duration: 0.8,
      ease: "power3.inOut",
    }, "-=0.2");
  }, []);

  useEffect(() => {
    if (!isFirstVisit) {
      setIsVisible(false);
      setIsDone(true);
    }
  }, [isFirstVisit]);

  if (isDone) return null;

  return (
    <div
      className={`fixed inset-0 z-[100] flex items-center justify-center transition-opacity duration-300 ${
        isVisible ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
    >
      <div className="preloader-bg absolute inset-0 bg-background" />
      <div className="preloader-content relative z-10">
        <FemiLogo
          size="lg"
          animate={isFirstVisit}
          onAnimationComplete={handleAnimationComplete}
          className="text-foreground"
        />
      </div>
    </div>
  );
}
