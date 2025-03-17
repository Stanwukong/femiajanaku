"use client";

import React, { useEffect } from "react";
import Greeting from "../Greeting";
import { animateBox } from "@/utils/animations";

const Hero = () => {
  useEffect(() => {
    animateBox();
  }, []);

  return (
    <div className="flex flex-col h-screen items-center justify-center space-y-5 relative">
      <div className="flex items-center space-x-4">
        <span className="box w-[10px] h-[10px] bg-black animate-ping" />
        <p>OPEN TO FREELANCE CONTRACTS</p>
      </div>
      <span>
        <Greeting /> I&apos;m
      </span>
      <p className="text-3xl font">Femi Ajanaku</p>
    </div>
  );
};

export default Hero;
