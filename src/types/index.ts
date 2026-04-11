export interface Project {
  id: string;
  slug: string;
  name: string;
  description: string;
  longDescription?: string;
  url: string;
  image: string;
  tags: string[];
  stack: string[];
  role: string;
  year: number;
  featured?: boolean;
}

export interface TimelineEntry {
  id: string;
  title: string;
  company: string;
  location: string;
  startDate: string;
  endDate: string;
  description: string;
  isActive: boolean;
  technologies?: string[];
}

export interface NavItem {
  path: string;
  label: string;
}

export interface SocialLink {
  name: string;
  url: string;
  iconName: "github" | "twitter" | "instagram" | "linkedin";
}

export interface Skill {
  name: string;
  category: "ai" | "frontend" | "backend" | "databases" | "devops" | "trading" | "testing" | "languages";
}

export interface Stat {
  label: string;
  value: number;
  suffix?: string;
}
