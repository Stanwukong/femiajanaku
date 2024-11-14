import { MOBILE_PAGES } from "@/constants";
import Link from "next/link";
import React from "react";

const Wrapper = () => {
  return (
    <div className="w-full">
      {MOBILE_PAGES.map((item) => (
        <div className="flex flex-col w-full" key={item.title}>
          <span className="m-4">{item.title}</span>
          <div className="flex flex-col w-full divide-y-[1px] divide-black ">
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
    </div>
  );
};

export default Wrapper;
