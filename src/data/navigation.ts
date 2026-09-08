import type { NavItem, SocialLink } from "@/types";

/**
 * The site is a single page — every nav item points at a section anchor on `/`.
 * `sectionId` is the DOM id used for smooth scrolling and scroll-spy.
 */
export const NAV_ITEMS: NavItem[] = [
  { path: "/", sectionId: "home", label: "Home" },
  { path: "/#about", sectionId: "about", label: "About" },
  { path: "/#projects", sectionId: "projects", label: "Projects" },
  { path: "/#contact", sectionId: "contact", label: "Contact" },
];

export const SOCIAL_LINKS: SocialLink[] = [
  { name: "Twitter", url: "https://twitter.com/fe_mi__", iconName: "twitter" },
  { name: "GitHub", url: "https://github.com/stanwukong", iconName: "github" },
  { name: "Instagram", url: "https://instagram.com/f.e__m.i", iconName: "instagram" },
  { name: "LinkedIn", url: "https://linkedin.com/in/femiajanaku", iconName: "linkedin" },
];
