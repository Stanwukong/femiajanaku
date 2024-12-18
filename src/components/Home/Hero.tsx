"use client";

import React, { useEffect } from "react";
import Greeting from "../Greeting";
import { animateBox } from "@/utils/animations";

const Hero = () => {
  useEffect(() => {
    animateBox();
  }, []);

  return (
    <div className="flex my-24 flex-col min-h-screen justify-center space-y-5 relative">
      <div className="flex items-center space-x-4 ">
        <span className="box w-[10px] h-[10px] bg-black animate-ping" />
        <p>AVAILABLE FOR WORK</p>
      </div>
      <span>
        <Greeting /> I&apos;m
      </span>
      <p className="text-3xl font">Femi Ajanaku</p>
    </div>
  );
};

export default Hero;
