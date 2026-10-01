"use client";

import { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface AnimatedCounterProps {
  value: number;
  suffix?: string;
  duration?: number;
  className?: string;
}

export function AnimatedCounter({
  value,
  suffix = "",
  duration = 2,
  className,
}: AnimatedCounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  // Start from the real value so server HTML, link previews and slow devices
  // show the number, not "0". The count-up is layered on after mount.
  const [displayValue, setDisplayValue] = useState(value);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!ref.current || hasAnimated.current) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const trigger = ref.current;

    // Already past the trigger point (e.g. landed on a lower anchor): keep the
    // real value rather than flashing to zero.
    if (trigger.getBoundingClientRect().top < window.innerHeight * 0.85) return;

    const obj = { val: 0 };
    setDisplayValue(0);

    ScrollTrigger.create({
      trigger,
      start: "top 85%",
      once: true,
      onEnter: () => {
        hasAnimated.current = true;
        gsap.to(obj, {
          val: value,
          duration,
          ease: "power2.out",
          onUpdate: () => setDisplayValue(Math.round(obj.val)),
        });
      },
    });

    return () => {
      ScrollTrigger.getAll().forEach((t) => {
        if (t.trigger === trigger) t.kill();
      });
    };
  }, [value, duration]);

  return (
    <span ref={ref} className={className}>
      {displayValue}
      {suffix}
    </span>
  );
}
