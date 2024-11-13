import React from "react";
import { timelineData } from "@/constants";

type Props = {};

const Timeline = (props: Props) => {
  return (
    <div className="w-full">
      {/* Vertical Line */}
      {/* <div className="absolute left-8 top-0 h-full w-0.5 bg-gray-300"></div> */}

      {timelineData.map((item) => (
        <div key={item.id} className="flex items-center mb-10">
          {/* Dot */}
          <div
            className={`absolute  w-4 h-4 bg-gray-800 rounded-full ${
              item.id == 1 && "animate-ping"
            }`}
          ></div>

          {/* Content */}
          <div className="ml-8 p-4 bg-white w-full">
            <h3 className="text-lg font-semibold">{item.title}</h3>
            <p className="text-gray-500 mb-1">
              {item.company} • {item.location}
            </p>
            <p className="text-sm text-gray-400 mb-2">{item.date}</p>
            <p className="text-gray-700">{item.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Timeline;
