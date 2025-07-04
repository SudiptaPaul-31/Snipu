import React from "react";
import { motion } from "framer-motion";

const AboutHero = () => {
  return (
    <section className="py-10 xl:py-20 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 r">
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1.1, duration: 0.7 }}
      >
        <h2 className="text-teal-400 text-lg font-semibold mb-3">About us</h2>
        <h3 className="text-4xl font-bold mb-4">
          Building Decentralized Code Snippet Hub
        </h3>
      </motion.div>
      <div className="relative max-w-3xl mx-auto">
        {/* Timeline line */}
        <motion.div
          className="absolute left-3  h-full w-0.5 bg-teal-500 transform translate-x-2"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1.1, duration: 0.7 }}
        />

        {/* Timeline item 1 */}
        <motion.div
          className="relative mb-8 pl-10 md:pl-0 md:pr-2"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1.1, duration: 0.7 }}
        >
          <div className="absolute -left-1 top-1 w-4 h-4 rounded-full bg-teal-400 border-2 border-teal-300 transform translate-x-1/2" />
          <div className=" px-8 pt-4 ">
            <p className="text-gray-300">
              Snipu launched as a decentralized code snippet hub built on
              Starknet, redefining how developers store and share code.
            </p>
          </div>
        </motion.div>

        {/* Timeline item 2 */}
        <motion.div
          className="relative mb-8 pl-10 md:pl-0 md:pr-2"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1.3, duration: 0.7 }}
        >
          <div className="absolute -left-1 top-1 w-4 h-4 rounded-full bg-teal-400 border-2 border-teal-300 transform translate-x-1/2" />
          <div className=" px-8 pt-4">
            <p className="text-gray-300">
              Leveraged blockchain technology to ensure secure on-chain storage
              while providing global access to developer communities.
            </p>
          </div>
        </motion.div>

        {/* Timeline item 3 */}
        <motion.div
          className="relative pl-10 md:pl-0 md:pr-2"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1.5, duration: 0.7 }}
        >
          <div className="absolute -left-1 top-1 w-4 h-4 rounded-full bg-teal-400 border-2 border-teal-300 transform translate-x-1/2" />
          <div className=" px-8  pt-4 ">
            <p className="text-gray-300">
              Revolutionized code sharing with version control, access
              management, and digital rights through shareable links.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutHero;
