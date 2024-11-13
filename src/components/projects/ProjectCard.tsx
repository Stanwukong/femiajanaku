import React from "react";
import { Button } from "../ui/button";

type ProjectProps = {
  key: number;
  title: string;
  image: string;
  description: string;
  link: string;
};

const ProjectCard = ({
  key,
  title,
  image,
  description,
  link,
}: ProjectProps) => {
  return (
    <div className="flex flex-col border border-black p-4 space-y-4">
      <img src={image} alt={title} />
      <span>
        <h2 className="text-2xl">{title}</h2>
      </span>

      <p>{description}</p>
      <Button className="border-black hover:text-black hover:bg-white hover:border transition-colors">
        <a href={link}>View Project</a>
      </Button>
    </div>
  );
};

export default ProjectCard;
