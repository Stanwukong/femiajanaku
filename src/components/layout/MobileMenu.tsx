"use client";

import { useEffect, useRef } from "react";
import { Link } from "next-view-transitions";
import { usePathname } from "next/navigation";
import { Github, Twitter, Instagram, Linkedin } from "lucide-react";
import { NAV_ITEMS, SOCIAL_LINKS } from "@/data/navigation";
import { cn } from "@/lib/utils";
import gsap from "gsap";

const ICON_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
  github: Github,
  twitter: Twitter,
  instagram: Instagram,
  linkedin: Linkedin,
};

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const pathname = usePathname();
  const menuRef = useRef<HTMLDivElement>(null);
  const linksRef = useRef<HTMLDivElement>(null);

  // Focus trap + ESC key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    if (isOpen) {
      document.body.style.overflow = "hidden";
      document.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  // Stagger animation for links
  useEffect(() => {
    if (!isOpen || !linksRef.current) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const links = linksRef.current.querySelectorAll(".menu-item");
    gsap.from(links, {
      x: 40,
      opacity: 0,
      duration: 0.4,
      stagger: 0.08,
      ease: "power2.out",
      delay: 0.2,
    });
  }, [isOpen]);

  return (
    <div
      ref={menuRef}
      className={cn(
        "fixed inset-0 z-50 md:hidden transition-all duration-500",
        isOpen ? "pointer-events-auto" : "pointer-events-none"
      )}
      role="dialog"
      aria-modal="true"
      aria-label="Navigation menu"
    >
      {/* Backdrop */}
      <div
        className={cn(
          "absolute inset-0 bg-background/95 backdrop-blur-lg transition-opacity duration-500",
          isOpen ? "opacity-100" : "opacity-0"
        )}
        onClick={onClose}
      />

      {/* Menu Content */}
      <div
        className={cn(
          "absolute inset-y-0 right-0 w-full max-w-sm flex flex-col justify-center px-8 transition-transform duration-500 ease-[cubic-bezier(0.65,0,0.35,1)]",
          isOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        <div ref={linksRef}>
          {/* Navigation Label */}
          <p className="menu-item text-xs uppercase tracking-widest text-muted-foreground mb-6">
            Navigation
          </p>

          {/* Nav Links */}
          <div className="space-y-4 mb-12">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.path}
                href={item.path}
                onClick={onClose}
                className={cn(
                  "menu-item block text-3xl font-display font-semibold tracking-tight transition-colors duration-200 focus-ring",
                  pathname === item.path
                    ? "text-accent"
                    : "text-foreground hover:text-accent"
                )}
                aria-current={pathname === item.path ? "page" : undefined}
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="/resume"
              onClick={onClose}
              className="menu-item block text-3xl font-display font-semibold tracking-tight text-foreground hover:text-accent transition-colors duration-200 focus-ring"
            >
              Resume
            </Link>
          </div>

          {/* Social Links */}
          <p className="menu-item text-xs uppercase tracking-widest text-muted-foreground mb-4">
            Connect
          </p>
          <div className="menu-item flex items-center gap-4">
            {SOCIAL_LINKS.map((social) => {
              const Icon = ICON_MAP[social.iconName];
              return (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Visit ${social.name} profile`}
                  className="flex items-center justify-center w-10 h-10 rounded-full border border-border hover:bg-accent hover:text-accent-foreground transition-colors duration-200 focus-ring"
                >
                  <Icon className="w-4 h-4" />
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
