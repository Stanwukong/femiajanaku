import React, { useEffect } from "react";
import { animateLogo } from "@/utils/animations";

type Props = {
    onModalOpen: () => void;
};

const Logo = ({ onModalOpen }: Props) => {
    

  useEffect(() => {
    animateLogo();
  }, []);

  return (
    <div className="animate-logo">
      
      <button
        onClick={onModalOpen}
        className="px-6 py-3 border border-black cursor-pointer hover:text-white hover:bg-black"
      >
        <span>FEMI</span>
      </button>
    </div>
  );
};

export default Logo;
