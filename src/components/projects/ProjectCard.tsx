import React from "react";
import { Button } from "../ui/button";
import Image from "next/image";

type ProjectProps = {
  title: string;
  image: string;
  description: string;
  link: string;
};

const ProjectCard = ({
  title,
  image,
  description,
  link,
}: ProjectProps) => {
  
  return (
    <div className="flex flex-col border border-black bg-white p-4 space-y-4 hover:scale-90 lg:hover:scale-110">
      <Image src={image} alt={title} width={1000} height={1000} />
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
