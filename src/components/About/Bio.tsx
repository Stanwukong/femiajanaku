import React from "react";
import { STATS } from "@/constants";
import Link from "next/link";

const Bio = () => {
  return (
    <div className="flex flex-col">
      <span className="text-4xl mb-8">About Me</span>

      <div className="flex flex-col space-y-8">
        <p>
          Hi there! I am Femi, I am a software developer with a passion for
          solving complex problems and building visually appealing and seamless
          user interfaces.
        </p>
        <p>
          I{" "}
          <Link
            href={"https://femiajanaku.hashnode.dev/"}
            target="_blank"
            className="px-3 py-2 border border-black hover:bg-black hover:text-white"
          >
            also write
          </Link>{" "}
          sometimes.
        </p>

        <section className="flex flex-col md:flex-row space-y-5 md:space-y-0 w-full justify-between">
          {STATS.map((stat) => (
            <div key={stat.id} className="flex flex-col">
              <span className="text-2xl">{stat.value}</span>
              <span>{stat.text}</span>
            </div>
          ))}
        </section>
      </div>
    </div>
  );
};

export default Bio;
