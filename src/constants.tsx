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
    date: "05/24 - Present",
    description:
      "Building and maintaining the VendBite platform, a food delivery service for local restaurants. I work on the frontend and backend, and I also provide mentorship to junior developers. I also gained experience in DevOps and WordPress platforms.",
  },
  {
    id: 2,
    title: "Frontend Developer",
    company: "Basicons",
    location: "Amsterdam, Netherlands",
    date: "09/23 - 04/24",
    description:
      "At Basicons, I advanced my skills in frontend development and software architecture to drive project optimization.",
  },
  {
    id: 3,
    title: "Frontend Developer (Intern)",
    company: "Lykdat",
    location: "Amsterdam, Netherlands",
    date: "06/22 - 08/23",
    description:
      "I joined Infraveo Technologies as an Associate Frontend Developer, working on HTML, CSS, and JavaScript to create web applications. I also provided mentorship to junior developers.",
  },
  {
    id: 4,
    title: "Website Developer",
    company: "Freelancer",
    location: "Lagos, Nigeria",
    date: "12/21 - 05/22",
    description:
      "I began my career as an intern at Infraveo Technologies, gaining firsthand experience in web development and working on live projects.",
  },
];
