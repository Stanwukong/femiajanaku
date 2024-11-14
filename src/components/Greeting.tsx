"use client";
import { GREETINGS } from "@/constants";
import { useState } from "react";


const Greeting = () => {
  const [index, setIndex] = useState(0);

  const handleGreeting = () => {
    setIndex((prevIndex) => (prevIndex + 1) % GREETINGS.length);
  };

  return (
    <span
      onClick={handleGreeting}
      className="border  border-black p-2 cursor-pointer"
    >
      {GREETINGS[index].greeting} 👋🏽
    </span>
  );
};

export default Greeting;
