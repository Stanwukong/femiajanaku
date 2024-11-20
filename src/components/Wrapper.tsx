import { MOBILE_PAGES, SOCIALS } from "@/constants";
import Link from "next/link";
import React from "react";

const Wrapper = () => {
  return (
    <div className="w-full divide-y divide-black">
      {MOBILE_PAGES.map((item) => (
        <div className="flex flex-col w-full" key={item.title}>
          <span className="mx-3 my-2 text-neutral-700 text-xs">
            {item.title}
          </span>
          <div className="flex flex-col w-full ">
            {item.pages.map((page) => (
              <Link
                href={page.pageRoute}
                key={page.pageId}
                className="w-full p-3  hover:bg-neutral-200"
              >
                {page.pageName}
              </Link>
            ))}
          </div>
        </div>
      ))}
      <div className="flex w-full justify-evenly py-4">
        {SOCIALS.map((social) => (
          <a key={social.socialId} href={social.socialHref}>
            {social.socialIcon}
          </a>
        ))}
      </div>
    </div>
  );
};

export default Wrapper;
