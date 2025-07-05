import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const Hero = () => {
  return (
    <section className="mt-20 xl:py-20 flex flex-col items-center text-center">
      <motion.div
        className="inline-flex items-center justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.5 }}
      >
        <span className="text-white border-2 border-teal-700 text-sm px-4 rounded-full py-1 mb-4">
          Secure Share, Verify and Build
        </span>
      </motion.div>

      <motion.h2
        className="text-4xl md:text-5xl font-bold mb-4 "
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.7 }}
      >
        Revolutionizing Code Sharing in Web3
      </motion.h2>

      <motion.h3
        className="text-xl md:text-2xl mb-10 text-gray-300 max-w-2xl"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7, duration: 0.7 }}
      >
        With Blockchain-Powered Collaboration
      </motion.h3>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.9, duration: 0.5 }}
        whileHover={{ scale: 1.05 }}
        whileFocus={{ scale: 1.05 }}
        className="mb-16"
      >
        <Link
          href="/snippet"
          className="bg-gradient-to-r from-teal-400 to-blue-500 text-[#eee] font-medium px-8 py-3 rounded-full inline-flex items-center focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-400 focus:ring-offset-[#0a0a0a] hover:shadow-[0_0_25px_rgba(56,189,248,0.6)] transition"
        >
          Get Started <ArrowRight className="ml-2 h-4 w-4" />
        </Link>
      </motion.div>
    </section>
  );
};

export default Hero;
