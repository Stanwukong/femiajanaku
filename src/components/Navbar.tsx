"use client";

import { PAGES as pages, SOCIALS as socials } from "@/constants";

import TransitionLink from "./TransitionLink";


const Navbar = () => {
  return (
    <div className="flex w-full p-3 md:justify-between lg:justify-evenly items-center">
      {/* Pages */}
      <div className="hidden md:flex space-x-8 ">
        {pages.map((page) => (
          <TransitionLink
            key={page.pageId}
            href={page.pageRoute}
            label={page.pageName}
          />
        ))}
      </div>
      {/* LOGO */}
      <div className="px-6 py-3 border border-black cursor-pointer hover:text-white hover:bg-black">
        <span>FEMI</span>
      </div>
      {/* SOCIALS */}
      <div className="hidden md:flex space-x-8">
        {socials.map((social) => (
          <a
            key={social.socialId}
            href={social.socialHref}
            target="_blank"
            className="flex flex-col items-center hover:opacity-60"
          >
            <span>{social.socialIcon}</span>
          </a>
        ))}
      </div>
    </div>
  );
};

export default Navbar;
