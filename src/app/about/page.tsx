import Bio from "@/components/About/Bio";
import Experience from "@/components/About/Experience";
import React from "react";

type Props = {};

const AboutPage = (props: Props) => {
  return (
    <div className="flex flex-col py-8 px-4 space-y-40 justify-center mx-auto max-w-screen-xl">
      <Bio />
      <Experience />
      
    </div>
  );
};

export default AboutPage;
