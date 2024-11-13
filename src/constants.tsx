import { ReactNode } from "react";
import {
  AiFillGithub,
  AiOutlineGithub,
  AiFillInstagram,
  AiOutlineInstagram,
  AiFillTwitterSquare,
  AiOutlineTwitter,
  AiFillLinkedin,
  AiOutlineLinkedin,
} from "react-icons/ai";

export type PageRoute = {
  pageId: number;
  pageRoute: string;
  pageName: string;
};

export type Socials = {
  socialId: number;
  socialName: string;
  socialHref: string;
  socialIcon: ReactNode; // This will expect a JSX element, not a component reference
};

export type Greetings = {
  id: number;
  greeting: string;
};

export const PAGES: PageRoute[] = [
  {
    pageId: 1,
    pageRoute: "/",
    pageName: "Home",
  },
  {
    pageId: 2,
    pageRoute: "/about",
    pageName: "About",
  },
  {
    pageId: 3,
    pageRoute: "/projects",
    pageName: "Projects",
  },
];

export const SOCIALS: Socials[] = [
  {
    socialId: 0,
    socialHref: "https://twitter.com/fe_mi__",
    socialName: "Twitter",
    socialIcon: <AiOutlineTwitter size={25} />,
  },
  {
    socialId: 1,
    socialHref: "https://github.com/stanwukong",
    socialName: "Github",
    socialIcon: <AiOutlineGithub size={25} />,
  },
  {
    socialId: 2,
    socialHref: "https://instagram.com/not_femi",
    socialName: "Instagram",
    socialIcon: <AiOutlineInstagram size={25} />,
  },
  {
    socialId: 3,
    socialHref: "https://linkedin.com/in/stanwukong",
    socialName: "LinkedIn",
    socialIcon: <AiFillLinkedin size={25} />,
  },
];

export const GREETINGS: Greetings[] = [
  {
    id: 0,
    greeting: "Hello",
  },
  {
    id: 1,
    greeting: "Hola",
  },
  {
    id: 2,
    greeting: "Bonjour",
  },
  {
    id: 3,
    greeting: "Konnichiwa",
  },
  {
    id: 4,
    greeting: "Guten Tag",
  },
  {
    id: 5,
    greeting: "Namaste",
  },
  {
    id: 6,
    greeting: "Ciao",
  },
  {
    id: 7,
    greeting: "Salam",
  },
];

export const STATS = [
  {
    id: 0,
    value: 2,
    text: "years of experience",
  },
  {
    id: 1,
    value: 10,
    text: "projects completed",
  },
  {
    id: 2,
    value: 14,
    text: "GitHub stars",
  },
];

export const timelineData = [
  {
    id: 1,
    title: "Software Engineer",
    company: "VendBite",
    location: "Manchester, UK",
    date: "02/24 - Present",
    description:
      "Building and maintaining the VendBite platform, a food delivery service for local restaurants. I work on the frontend and backend, and I also provide mentorship to junior developers. I also gained experience in DevOps and WordPress platforms.",
  },
  {
    id: 2,
    title: "Frontend Developer",
    company: "Basicons",
    location: "Amsterdam, Netherlands",
    date: "09/23 - 02/24",
    description:
      "At Basicons, I advanced my skills in frontend development and software architecture to drive project optimization by refactoring the legacy codebase to meet modern standards.",
  },
  {
    id: 3,
    title: "Frontend Developer (Intern)",
    company: "Lykdat",
    location: "Amsterdam, Netherlands",
    date: "10/22 - 12/22",
    description:
      "I joined Lykdat as an intern, where I contributed to multiple projects and developed a solid understanding of professional development and team collaboration. During this time, I gained hands-on experience with React and TypeScript, enhancing my skills in building dynamic and scalable web applications.",
  },
  {
    id: 4,
    title: "Website Developer",
    company: "Freelancer",
    location: "Lagos, Nigeria",
    date: "08/22 - Present",
    description:
      "I started my career as a freelancer, where I built websites for small businesses and individuals. I gained experience in client communication, project management, and web development.",
  },
];

export const Projects = [
  {
    id: 1,
    name: "VendBite",
    description:
      "Platform connecting users to curated dining, catering, and delivery services. Built with NextJS and TailwindCSS.",
    href: "http://test.app.vendbite.com/account/create",
    image: "/vendbite.png",
  },
  {
    id: 2,
    name: "Basicons",
    description:
      "Modular icon package for designers, built with TypeScript and React.",
    href: "https://basicons.xyz/",
    image: "/basicons.png",
  },
  {
    id: 3,
    name: "KnowBuddy",
    description: "AI Powered Chatbot. Built with Webflow",
    href: "https://knowbuddy.ai/",
    image: "/knowbuddy.png",
  },
  {
    id: 4,
    name: "Airbnb Clone",
    description:
      "A simple clone of the AirBnb software system. Built with React and TailwindCSS",
    href: "https://rentalsclone.vercel.app/",
    image: "/rentals.png",
  },
];