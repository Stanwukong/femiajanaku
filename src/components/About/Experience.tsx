import React from "react";
import Link from "next/link";
import Timeline from "./Timeline";

const Experience = () => {
  return (
    <div className="flex flex-col my-10">
      <span className="text-4xl mb-8">Experience</span>

      <div className="flex flex-col space-y-8">
        <p className="text-sm md:text-base">
          With over 4 years in software development, I&apos;ve developed a
          strong foundation across front-end development, backend development, software
          architecture, and UI/UX design.
        </p>

        <div>
          <Link
            href="/resume"
            target="_blank"
            passHref
            className="px-8 py-3 bg-black text-white border-black transition-colors hover:bg-white hover:text-black hover:border"
          >
            Resume
          </Link>
        </div>

        <section className="flex w-full">
          <Timeline />
        </section>
      </div>
    </div>
  );
};

export default Experience;
