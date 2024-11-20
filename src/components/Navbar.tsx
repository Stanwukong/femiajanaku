"use client";

import { PAGES as pages, SOCIALS as socials } from "@/constants";

import TransitionLink from "./TransitionLink";
import Modal from "./Modal";
import { useState } from "react";
import Wrapper from "@/components/Wrapper";
import Logo from "./Logo";

const Navbar = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };
  return (
    <div className="flex w-full p-3 md:justify-between lg:justify-evenly items-center">
      {/* Pages */}
      <div className="hidden md:flex space-x-8">
        {pages.map((page) => (
          <TransitionLink
            key={page.pageId}
            href={page.pageRoute}
            label={page.pageName}
            onModalClose={handleCloseModal}
          />
        ))}
      </div>
      {/* LOGO */}
      <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
        <div className="flex flex-col w-full">
          <Wrapper />
        </div>
      </Modal>
      <Logo onModalOpen={handleOpenModal} />

      {/* SOCIALS */}
      <div className="hidden md:flex space-x-8">
        {socials.map((social) => (
          <a
            key={social.socialId}
            href={social.socialHref}
            target="_blank"
            className="flex flex-col items-center hover:opacity-60"
          >
            <span>{social.socialIcon}</span>
          </a>
        ))}
      </div>
    </div>
  );
};

export default Navbar;
