"use client";

import { useScrollToSection } from "@/hooks/useScrollToSection";

interface SectionLinkProps {
  /** DOM id of the target section, e.g. "about". */
  sectionId: string;
  /** Fallback href for no-JS, new-tab clicks and other routes, e.g. "/#about". */
  href: string;
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  "aria-current"?: "page" | undefined;
  "aria-label"?: string;
}

/**
 * Anchor that smooth-scrolls to a section on the single page. If the section
 * isn't in the DOM (e.g. on a project detail route) the browser follows the
 * href normally and lands on the home page at that hash.
 */
export function SectionLink({
  sectionId,
  href,
  children,
  className,
  onClick,
  ...rest
}: SectionLinkProps) {
  const scrollToSection = useScrollToSection();

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return;

    if (scrollToSection(sectionId, href)) {
      e.preventDefault();
    }
    onClick?.();
  };

  return (
    <a href={href} onClick={handleClick} className={className} {...rest}>
      {children}
    </a>
  );
}
