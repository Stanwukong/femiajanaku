"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import { usePathname } from "next/navigation";
import { Github, Twitter, Instagram, Linkedin } from "lucide-react";
import { FemiLogo } from "@/components/ui/FemiLogo";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { MagneticWrapper } from "@/components/ui/MagneticWrapper";
import { MobileMenu } from "./MobileMenu";
import { SectionLink } from "./SectionLink";
import { NAV_ITEMS, SOCIAL_LINKS } from "@/data/navigation";
import { useActiveSection } from "@/hooks/useActiveSection";
import { cn } from "@/lib/utils";

const ICON_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
  github: Github,
  twitter: Twitter,
  instagram: Instagram,
  linkedin: Linkedin,
};

export function Navbar() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const sectionIds = useMemo(() => NAV_ITEMS.map((item) => item.sectionId), []);
  const activeSection = useActiveSection(sectionIds);

  // Section anchors only resolve on the single home page
  const isHome = pathname === "/";

  const handleScroll = useCallback(() => {
    const currentY = window.scrollY;
    setIsVisible(currentY < lastScrollY || currentY < 50);
    setLastScrollY(currentY);
  }, [lastScrollY]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  // Close menu on route change
  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  return (
    <>
      <a href="#main-content" className="skip-to-content">
        Skip to content
      </a>
      {/*
        Sits above the mobile menu overlay (z-50): the hamburger doubles as the
        menu's only close button, so it has to stay visible and clickable while
        the sheet is open. The auto-hide is suspended for the same reason.
      */}
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-[60] transition-transform duration-300",
          isVisible || isMenuOpen ? "translate-y-0" : "-translate-y-full"
        )}
      >
        <div className="bg-background/80 backdrop-blur-md border-b border-border/50">
          <nav
            aria-label="Main navigation"
            className="max-w-[var(--content-max)] mx-auto px-[var(--content-padding)] h-16 flex items-center justify-between"
          >
            {/* Desktop Nav Links */}
            <div className="hidden md:flex items-center gap-8">
              {NAV_ITEMS.map((item) => {
                const isActive = isHome && activeSection === item.sectionId;
                return (
                  <SectionLink
                    key={item.sectionId}
                    sectionId={item.sectionId}
                    href={item.path}
                    className={cn(
                      "nav-link text-sm font-medium tracking-wide uppercase focus-ring",
                      isActive && "text-accent"
                    )}
                    aria-current={isActive ? "page" : undefined}
                  >
                    {item.label}
                  </SectionLink>
                );
              })}
            </div>

            {/* Logo (center on desktop, left on mobile) */}
            <SectionLink
              sectionId="home"
              href="/"
              className="md:absolute md:left-1/2 md:-translate-x-1/2 focus-ring"
              aria-label="Home"
            >
              <FemiLogo size="sm" interactive className="text-foreground" />
            </SectionLink>

            {/* Desktop Right: Theme + Socials */}
            <div className="hidden md:flex items-center gap-3">
              <ThemeToggle />
              {SOCIAL_LINKS.map((social) => {
                const Icon = ICON_MAP[social.iconName];
                return (
                  <MagneticWrapper key={social.name} strength={0.3}>
                    <a
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Visit ${social.name} profile`}
                      className="flex items-center justify-center w-9 h-9 rounded-full hover:bg-muted transition-colors duration-200 focus-ring"
                    >
                      <Icon className="w-4 h-4" />
                    </a>
                  </MagneticWrapper>
                );
              })}
            </div>

            {/* Mobile: Hamburger */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden relative w-8 h-8 flex flex-col items-center justify-center gap-1.5 focus-ring"
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={isMenuOpen}
            >
              <span
                className={cn(
                  "block w-5 h-px bg-foreground transition-all duration-300",
                  isMenuOpen && "rotate-45 translate-y-[3.5px]"
                )}
              />
              <span
                className={cn(
                  "block w-5 h-px bg-foreground transition-all duration-300",
                  isMenuOpen && "-rotate-45 -translate-y-[3.5px]"
                )}
              />
            </button>
          </nav>
        </div>
      </header>

      <MobileMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
    </>
  );
}
