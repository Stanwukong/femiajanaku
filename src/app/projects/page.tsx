"use client";

import CarouselCard from "@/components/projects/CarouselCard";
import ProjectCard from "@/components/projects/ProjectCard";
import { Projects } from "@/constants";
import React, { useEffect, useState } from "react";

const CarouselProjects = () => {
  const [bgImageId, setBgImageId] = useState(1);
  const [bgImage, setBgImage] = useState<string>("");

  useEffect(() => {
    const handleBgImage = () => {
      const activeProject = Projects.find(
        (project) => project.id === bgImageId
      );
      setBgImage(`url(${activeProject?.image})`);
    };
    handleBgImage();
  }, [bgImageId]);

  return (
    <>
      {/* Desktop View */}
      <div
        className="hidden md:flex flex-col relative w-full h-[93vh]  bg-center bg-no-repeat bg-cover "
        style={{ backgroundImage: bgImage }}
      >
        <div className="absolute h-full w-full bg-gradient-to-b from-transparent to-neutral-300" />
        <div className="flex items-center z-10 justify-center w-full h-full divide-x-[1px] divide-neutral-100">
          {Projects.map((project) => (
            <CarouselCard
              key={project.id}
              id={project.id}
              title={project.name}
              description={project.description}
              link={project.href}
              onBgChange={() => setBgImageId(project.id)}
            />
          ))}
        </div>
      </div>

      {/* Mobile View */}
      <div className="flex flex-col md:hidden py-8 px-4 space-y-16 justify-center mx-auto max-w-screen-xl">
          <div className="w-full">
            <h1 className="text-5xl text-center">Projects</h1>
          </div>

          <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-4">
            {Projects.map((project) => (
              <ProjectCard
                key={project.id}
                title={project.name}
                image={project.image}
                description={project.description}
                link={project.href}
              />
            ))}
          </div>
        </div>
    </>
  );
};

export default CarouselProjects;
