"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";

type ProjectProps = {
  title: string;
  image: string;
  description: string;
  link: string;
};

const ProjectCard = ({ title, image, description, link }: ProjectProps) => {
  return (
    <div className="flex flex-col border border-black bg-white p-4 space-y-4 md:hover:scale-90">
      <Image src={image} alt={title} width={1000} height={1000} />
      <span>
        <h2 className="text-2xl">{title}</h2>
      </span>

      <p>{description}</p>
      <Link
        href={link}
        passHref
        className="w-full p-3 text-center bg-black text-white hover:bg-white hover:text-black border-black border transition-colors"
      >
        View Project
      </Link>
    </div>
  );
};

export default ProjectCard;
