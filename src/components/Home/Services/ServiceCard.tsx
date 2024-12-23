import { cn } from "@/lib/utils";
import React from "react";

type Props = {
  icon: React.ReactNode;
  title: string;
  description: string;
  className?: string;
};

const ServiceCard = ({ icon, title, description, className }: Props) => {
  return (
    <div
      className={cn(
        ` relative group z-10 flex w-full cursor-pointer items-center overflow-hidden rounded-lg p-[1px] transition-all peer-hover:p-0`,
        className
      )}
    >
      <div className="animate-rotate absolute inset-0 h-full w-full rounded-full bg-[conic-gradient(#000_20deg,transparent_30deg)] " />
      <div className="relative z-20 flex flex-col w-full p-4 bg-neutral-300 rounded-lg border-neutral-500 h-full">
        <div className="flex items-center justify-center mt-16 w-16 h-16 rounded-full">
          {icon}
        </div>
        <div className="flex flex-col space-y-2 mt-4">
          <span className="text-xl font-bold">{title}</span>
          <p className="text-neutral-700">{description}</p>
        </div>
      </div>
    </div>
  );
};

export default ServiceCard;
