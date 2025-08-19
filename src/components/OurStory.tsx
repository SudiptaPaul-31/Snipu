import { motion } from "framer-motion";
import React from "react";

const OurStory: React.FC = () => {
  const timeline = [
    {
      title: "Genesis of Snipu",
      description:
        "Snipu launched as a decentralized code snippet hub built on Starknet, redefining how developers store and share code.",
    },
    {
      title: "Empowering Communities",
      description:
        "Leveraged blockchain technology to ensure secure on‑chain storage while providing global access to developer communities.",
    },
    {
      title: "Revolutionizing Collaboration",
      description:
        "Revolutionized code sharing with version control, access management and digital rights through shareable links.",
    },
  ];

  return (
    <section className="w-full py-16 px-4 md:px-8 max-w-6xl mx-auto">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-3xl md:text-5xl font-bold text-center mb-12 bg-gradient-to-r from-sky-400 to-blue-600 bg-clip-text text-transparent"
      >
        Our&nbsp;Story
      </motion.h2>
      <div className="relative">
        <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 h-full w-px bg-blue-600 opacity-30" />
        <div className="space-y-12">
          {timeline.map((item, index) => {
            const isLeft = index % 2 === 0;
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, x: isLeft ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`flex flex-col md:flex-row items-center md:items-start ${
                  isLeft ? "md:flex-row" : "md:flex-row-reverse"
                }`}
              >
                <div className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center md:mx-4 mb-4 md:mb-0">
                  {index + 1}
                </div>
                <div className="bg-[#1a1a1a] border border-[#333] rounded-lg p-6 md:w-5/12 shadow-lg">
                  <h3 className="text-xl font-semibold mb-2 text-white">
                    {item.title}
                  </h3>
                  <p className="text-gray-400 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default OurStory;
