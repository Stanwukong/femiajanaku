import React from "react";
import { STATS } from "@/constants";
import Link from "next/link";

const Bio = () => {
  return (
    <div className="flex flex-col">
      <span className="text-4xl mb-8">About Me</span>

      <div className="flex flex-col space-y-8">
        <p className="text-sm md:text-base">
          Hi there! I am{" "}
          <a
            href="https://x.com/fe_mi__"
            target="_blank"
            className="px-3 leading-8 py-1 border border-black hover:bg-black hover:text-white transition-colors"
          >
            Femi
          </a>
          , I am a software developer with a passion for solving complex
          problems and building visually appealing and seamless user interfaces.
        </p>
        <p className="text-sm md:text-base">
          I also{" "}
          <Link
            href={"https://femiajanaku.hashnode.dev/"}
            target="_blank"
            className="px-3 py-2 border border-black hover:bg-black hover:text-white transition-colors"
          >
            write
          </Link>{" "}
          sometimes.
        </p>

        <section className="flex flex-col md:flex-row space-y-5 md:space-y-0 w-full justify-between">
          {STATS.map((stat) => (
            <div key={stat.id} className="flex flex-col">
              <span className="text-2xl">{stat.value}</span>
              <span className="text-sm md:text-base">{stat.text}</span>
            </div>
          ))}
        </section>
      </div>
    </div>
  );
};

export default Bio;
