import Bio from "@/components/About/Bio";
import Experience from "@/components/About/Experience";
import SpotifyPlayerWrapper from "@/components/About/SpotifyPlayerWrapper";
import React from "react";

const AboutPage = () => {
  return (
    <div className="flex flex-col py-8 px-4 space-y-40 justify-center mx-auto max-w-screen-xl">
      <Bio />
      
      <Experience />

      <SpotifyPlayerWrapper/>
      
    </div>
  );
};

export default AboutPage;
