import React from "react";
import { Button } from "../ui/button";

type Props = {
  id: number;
  title: string;
  description: string;
  link: string;
  onBgChange: (id: number) => void;
  className?: string;
};

const CarouselCard = ({
  id,
  title,
  description,
  link,
  onBgChange,
  className,
}: Props) => {
  return (
    <div
      onMouseEnter={() => onBgChange(id)}
      className="group h-full w-full flex items-end py-8 px-4"
    >
      <div className="relative space-y-4 transition-all duration-300 group-hover:-translate-y-2">
        <h3 className="text-xl lg:text-2xl">{title}</h3>
        <p>{description}</p>
        <div className="h-0 group-hover:h-10 transition-all duration-300 overflow-hidden">
          <Button className="p-0" variant="link" asChild>
            <a href={link} target="_blank" rel="noreferrer">
              View project
            </a>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CarouselCard;
