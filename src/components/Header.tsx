import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Menu } from "lucide-react";
import Link from "next/link";

const Header = () => {
  return (
    <motion.header
      className="flex justify-between items-center px-4 py-8 h-20 text-white sticky top-0 z-50 bg-[#00]/90 backdrop-blur-sm"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Link
        href="/"
        className="focus:outline-none focus:ring-2 focus:ring-teal-400 rounded-md"
      >
        <Image
          src="/images/logo.jpg"
          alt="Snipu Logo"
          width={190}
          height={100}
          className="rounded-md"
          priority
        />
      </Link>
      <button
        aria-label="Open menu"
        className="p-2 focus:outline-none focus:ring-2 focus:ring-teal-400 rounded-md"
      >
        <Menu />
      </button>
    </motion.header>
  );
};

export default Header;
