"use client";

import { useRouter, usePathname } from "next/navigation";
import { animatePageOut } from "@/utils/animations";
import { cn } from "@/lib/utils";

interface TransitionLinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

export function TransitionLink({
  href,
  children,
  className,
  onClick,
}: TransitionLinkProps) {
  const router = useRouter();
  const pathname = usePathname();

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (pathname === href) return;

    onClick?.();

    // Check reduced motion -- skip animation
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      router.push(href);
      return;
    }

    animatePageOut(href, router);
  };

  return (
    <button
      onClick={handleClick}
      className={cn(className)}
    >
      {children}
    </button>
  );
}
