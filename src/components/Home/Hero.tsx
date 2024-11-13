"use client"

import React, { useEffect } from "react";
import Greeting from "../Greeting";
import { animateBox } from "@/utils/animations";

type Props = {};

const Hero = (props: Props) => {
  useEffect(() => {
    animateBox();
  }, []);

  return (
    <div className="flex flex-col space-y-5 relative">
      <span className="box w-[10px] h-[10px] bg-black" />
      <span>
        <Greeting /> I'm
      </span>
      <p className="text-3xl font">Femi Ajanaku</p>
    </div>
  );
};

export default Hero;
