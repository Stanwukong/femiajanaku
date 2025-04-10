import React from "react";
import ServiceCard from "./ServiceCard";
import { FiFigma } from "react-icons/fi";
import { GitPullRequest, Library, Waypoints } from "lucide-react";

const Services = () => {
  return (
    <div className="flex flex-col w-full px-8 lg:px-16 py-8 h-full space-y-8">
      <div className="flex flex-col space-y-4">
        <h2 className="text-2xl lg:text-4xl">Your Software Forge</h2>
        <p>Precision-crafted software for modern challenges.</p>
      </div>
      <div className="lg:grid lg:grid-cols-3 flex flex-col gap-8 ">
        <ServiceCard
          icon={<FiFigma size={40} />}
          title={"Pixel Perfect UI"}
          description={`Crafting interfaces with precision and attention to detail is my passion. I ensure every 
            design element aligns seamlessly with the intended vision, delivering visually stunning and responsive 
            user experiences.`}
          className="lg:col-span-2 "
        />
        <ServiceCard
          icon={<Waypoints size={40} />}
          title={"Art is beautiful, Code like its art"}
          description={`Code should be a joy to work with. My goal is to write clean, elegant, and well-structured 
            code that not only works seamlessly but is also a pleasure to build on and improve.`}
        />
        <ServiceCard
          icon={<Library size={40} />}
          title={"Adapt or Deprecate"}
          description={`Technology evolves rapidly, and so do I. I stay ahead of industry trends, 
            continuously learning new tools and frameworks to deliver innovative, future-proof solutions.`}
        />
        <ServiceCard
          icon={<GitPullRequest size={40} />}
          title={"Collaboration is Everything"}
          description={`Great software is built by great teams. I thrive on open communication and teamwork, 
            working closely with others to solve problems, align on goals, and create solutions that make an impact.`}
          className="lg:col-span-2 "
        />
      </div>
    </div>
  );
};

export default Services;
