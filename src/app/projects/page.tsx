import ProjectCard from "@/components/projects/ProjectCard";
import { Projects } from "@/constants";
import React from "react";

type Props = {};

const ProjectsPage = (props: Props) => {
  return (
    <div className="flex flex-col py-8 px-4 space-y-40 justify-center mx-auto max-w-screen-xl">
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
  );
};

export default ProjectsPage;
