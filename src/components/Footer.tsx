"use client";
import Link from "next/link";
import React from "react";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";

const Footer = () => {
  const pathname = usePathname();
  const isHomePage = pathname === "/";
  return (
    // Footer
    <motion.footer
      className="py-8 border-t border-gray-800 text-center text-gray-400"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.7, duration: 0.7 }}
      whileHover={{ y: -5 }}
    >
      {isHomePage ? (
        <p className="text-sm">
          © {new Date().getFullYear()} Snipu. All rights reserved.
        </p>
      ) : (
        <>
        <Link
        href="#dashboard"
        className="text-[#868686] hover:text-gray-400 underline mx-2"
      >
        Dashboard
      </Link>
      <Link
        href="#templates"
        className="text-[#868686] hover:text-gray-400 underline mx-2"
      >
        Templates
      </Link>
      <Link
        href="#resources"
        className="text-[#868686] hover:text-gray-400 underline mx-2"
      >
        Resources
      </Link></>
      )}
      
    </motion.footer>
  );
};

export default Footer;
