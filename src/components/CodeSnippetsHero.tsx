import React from "react";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const CodeSnippetsHero = () => {
  return (
    <section className="py-10 xl:py-20 px-4">
      <motion.div
        className="text-center mb-16"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.7 }}
      >
        <h2 className="text-teal-400 text-lg font-semibold mb-3">
          Code Snippets
        </h2>
        <h3 className="text-3xl md:text-4xl font-bold text-white mb-6">
          Access to Code Snippet Resources
        </h3>
      </motion.div>

      {/* Snippet Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {/* Snippet Card 1 */}
        <motion.div
          className="bg-[#073B3A]/50 rounded-xl p-6 border border-teal-500/30 hover:border-teal-400 transition-all"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.7 }}
          whileHover={{ y: -5 }}
        >
          <div className="text-teal-400 mb-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="m16 18 6-6-6-6" />
              <path d="m8 6-6 6 6 6" />
            </svg>
          </div>
          <h4 className="text-xl font-bold text-white mb-3">Smart Contracts</h4>
          <p className="text-gray-300">
            Ready-to-use Starknet smart contract templates with zero-knowledge
            verification built-in.
          </p>
        </motion.div>

        {/* Snippet Card 2 */}
        <motion.div
          className="bg-[#073B3A]/50 rounded-xl p-6 border border-teal-500/30 hover:border-teal-400 transition-all"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.7 }}
          whileHover={{ y: -5 }}
        >
          <div className="text-teal-400 mb-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12 20h9" />
              <path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z" />
            </svg>
          </div>
          <h4 className="text-xl font-bold text-white mb-3">Cairo Libraries</h4>
          <p className="text-gray-300">
            Optimized Cairo code libraries for common blockchain operations and
            cryptographic functions.
          </p>
        </motion.div>

        {/* Snippet Card 3 */}
        <motion.div
          className="bg-[#073B3A]/50 rounded-xl p-6 border border-teal-500/30 hover:border-teal-400 transition-all"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.7 }}
          whileHover={{ y: -5 }}
        >
          <div className="text-teal-400 mb-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
            </svg>
          </div>
          <h4 className="text-xl font-bold text-white mb-3">
            Security Modules
          </h4>
          <p className="text-gray-300">
            Audited security patterns and vulnerability prevention templates for
            Web3 development.
          </p>
        </motion.div>
      </div>

      {/* CTA Button */}
      <motion.div
        className="text-center mt-16"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.1, duration: 0.7 }}
      >
        <Link
          href="/snippet"
          className="bg-gradient-to-r from-teal-400 to-blue-500 text-[#eee] font-medium px-8 py-3 rounded-full inline-flex items-center focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-400 focus:ring-offset-[#0a0a0a] hover:shadow-[0_0_25px_rgba(56,189,248,0.6)] transition"
        >
          Browse All Snippets
          <ArrowRight className="ml-2 h-4 w-4" />
        </Link>
      </motion.div>
    </section>
  );
};

export default CodeSnippetsHero;
