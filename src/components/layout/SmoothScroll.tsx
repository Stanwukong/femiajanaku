"use client";

import { createContext, useContext, useEffect, useState } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/** Null when Lenis is disabled (touch devices, reduced motion). */
const LenisContext = createContext<Lenis | null>(null);

export function useLenis() {
  return useContext(LenisContext);
}

interface SmoothScrollProps {
  children: React.ReactNode;
}

export function SmoothScroll({ children }: SmoothScrollProps) {
  const [lenis, setLenis] = useState<Lenis | null>(null);

  useEffect(() => {
    // Disable on touch devices
    if (window.matchMedia("(pointer: coarse)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const instance = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });
    setLenis(instance);

    instance.on("scroll", ScrollTrigger.update);

    const rafCallback = (time: number) => {
      instance.raf(time * 1000);
    };
    gsap.ticker.add(rafCallback);
    gsap.ticker.lagSmoothing(0);

    return () => {
      instance.destroy();
      gsap.ticker.remove(rafCallback);
      setLenis(null);
    };
  }, []);

  return <LenisContext.Provider value={lenis}>{children}</LenisContext.Provider>;
}
