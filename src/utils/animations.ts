import gsap from "gsap";

/**
 * Animate page-in:
 * Panels already cover the viewport on mount.
 * 1. Logo draws itself centered on the overlay
 * 2. Logo shrinks and moves to the navbar position
 * 3. Panels slide away to reveal the page
 * 4. Page content fades in
 */
export function animatePageIn() {
  const panels = document.querySelectorAll("[data-panel]");
  const logo = document.querySelector("[data-transition-logo]") as HTMLElement;
  const pageContent = document.querySelector(
    "[data-page-content]"
  ) as HTMLElement;
  const navbarLogo = document.querySelector(
    'a[aria-label="Home"]'
  ) as HTMLElement;

  if (!panels.length) {
    // No panels — just show content immediately
    if (pageContent) gsap.set(pageContent, { opacity: 1 });
    return;
  }

  const tl = gsap.timeline({
    onComplete: () => {
      // Safety: ensure content is visible when timeline ends
      if (pageContent) gsap.set(pageContent, { opacity: 1 });
    },
  });

  // Logo draw sequence
  if (logo) {
    const paths = logo.querySelectorAll("path");

    // Set stroke dash for draw animation
    paths.forEach((path) => {
      const length = path.getTotalLength();
      gsap.set(path, {
        strokeDasharray: length,
        strokeDashoffset: length,
        fill: "transparent",
      });
    });

    // Show logo container
    tl.set(logo, { opacity: 1, x: 0, y: 0, scale: 1 });

    // Draw strokes
    tl.to(Array.from(paths), {
      strokeDashoffset: 0,
      duration: 1,
      stagger: 0.1,
      ease: "power2.inOut",
    });

    // Fill in
    tl.to(
      Array.from(paths),
      {
        fill: "currentColor",
        duration: 0.5,
        stagger: 0.05,
        ease: "power1.in",
      },
      "-=0.1"
    );

    // Brief hold
    tl.to({}, { duration: 0.15 });

    // Animate logo to navbar position
    if (navbarLogo) {
      gsap.set(navbarLogo, { visibility: "hidden" });

      const navRect = navbarLogo.getBoundingClientRect();
      const logoRect = logo.getBoundingClientRect();

      const targetX = navRect.left + navRect.width / 2;
      const targetY = navRect.top + navRect.height / 2;
      const currentX = logoRect.left + logoRect.width / 2;
      const currentY = logoRect.top + logoRect.height / 2;

      const targetScale = navRect.width / logoRect.width || 0.4;

      tl.to(logo, {
        x: targetX - currentX,
        y: targetY - currentY,
        scale: targetScale,
        duration: 0.6,
        ease: "power3.inOut",
      });

      tl.to(logo, {
        opacity: 0,
        duration: 0.15,
        ease: "power1.out",
        onComplete: () => {
          gsap.set(navbarLogo, { visibility: "visible" });
        },
      });
    } else {
      tl.to(logo, { opacity: 0, duration: 0.2 });
    }
  }

  // Panels slide away
  tl.to(Array.from(panels), {
    yPercent: 100,
    duration: 0.5,
    stagger: 0.08,
    ease: "power3.inOut",
  });

  // Move panels out of view
  tl.set(Array.from(panels), { yPercent: -100 });

  // Fade in page content (overlaps slightly with panel exit)
  if (pageContent) {
    tl.to(
      pageContent,
      {
        opacity: 1,
        duration: 0.4,
        ease: "power2.out",
      },
      "-=0.3"
    );
  }
}

/** Animate page-out: content fades → panels slide in to cover, then navigate */
export function animatePageOut(
  href: string,
  router: { push: (url: string) => void }
) {
  const panels = document.querySelectorAll("[data-panel]");
  const pageContent = document.querySelector(
    "[data-page-content]"
  ) as HTMLElement;

  if (!panels.length) {
    router.push(href);
    return;
  }

  const tl = gsap.timeline();

  // Fade out content
  if (pageContent) {
    tl.to(pageContent, {
      opacity: 0,
      duration: 0.2,
      ease: "power1.in",
    });
  }

  // Panels slide up from below to cover
  tl.set(Array.from(panels), { yPercent: 100 });
  tl.to(Array.from(panels), {
    yPercent: 0,
    duration: 0.5,
    stagger: 0.08,
    ease: "power3.inOut",
    onComplete: () => router.push(href),
  });
}
