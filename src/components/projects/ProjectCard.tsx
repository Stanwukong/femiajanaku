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
    <div className="flex flex-col border border-neutral-500 bg-neutral-300 p-4 space-y-4">
      <Image src={image} alt={title} width={1000} height={1000} />
      <span>
        <h2 className="text-2xl">{title}</h2>
      </span>

      <p className="text-neutral-700">{description}</p>
      <Link
        href={link}
        passHref
        className="w-full p-3 text-center bg-black hover:bg-neutral-800 text-white border-black border transition-colors"
      >
        View Project
      </Link>
    </div>
  );
};

export default ProjectCard;
