import type { NavItem, SocialLink } from "@/types";

export const NAV_ITEMS: NavItem[] = [
  { path: "/", label: "Home" },
  { path: "/about", label: "About" },
  { path: "/projects", label: "Projects" },
  { path: "/contact", label: "Contact" },
];

export const SOCIAL_LINKS: SocialLink[] = [
  { name: "Twitter", url: "https://twitter.com/fe_mi__", iconName: "twitter" },
  { name: "GitHub", url: "https://github.com/stanwukong", iconName: "github" },
  { name: "Instagram", url: "https://instagram.com/f.e__m.i", iconName: "instagram" },
  { name: "LinkedIn", url: "https://linkedin.com/in/femiajanaku", iconName: "linkedin" },
];
