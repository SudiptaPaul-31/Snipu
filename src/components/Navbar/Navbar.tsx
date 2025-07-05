"use client";

import { X, Menu } from "lucide-react";
import React, { useState } from "react";
import Image from "next/image";
import { ConnectButton } from "../ConnectButton";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="text-white w-full font-medium text-sm lg:text-base flex justify-center transition-colors">
      <div className="flex flex-col w-[90%] p-4">
        <div className="flex items-center justify-between w-full">
          <div className="flex lg:w-[40%] justify-between">
            <div className="h-10 w-36">
              <Image
                src="/images/logo.jpg"
                className="!relative"
                alt="logo"
                fill
              />
            </div>

            {/* Navigation Links - Desktop */}
            <div className="hidden md:flex space-x-8 items-center justify-between px-2"></div>
          </div>
          <div className="hidden md:flex text-white space-x-4">
            <ConnectButton />
          </div>

          {/* Mobile Menu Button */}
          <button className="md:hidden p-2 ml-auto" onClick={toggleMenu}>
            {isMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 flex flex-col space-y-4">
            <div className="flex flex-col md:hidden w-fit text-white space-y-4">
              <ConnectButton />
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Header;
