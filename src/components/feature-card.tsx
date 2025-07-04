"use client";

import { motion } from "framer-motion";

interface FeatureCardProps {
  title: string;
  features: string[];
}

export default function FeatureCard({ title, features }: FeatureCardProps) {
  return (
    <motion.div
      className=" bg-opacity-70 p-6 rounded-lg border border-gray-800 h-full backdrop-blur-sm relative overflow-hidden"
      whileHover={{
        scale: 1.03,
        boxShadow: "0 0 25px #3bedf666",
      }}
      transition={{ duration: 0.3 }}
    >
      <div className="absolute   opacity-10 blur-xl rounded-lg"></div>
      <h3 className="text-lg font-semibold mb-4 text-center relative">
        {title}
      </h3>
      <ul className="space-y-3">
        {features.map((feature, index) => (
          <li key={index} className="text-sm text-gray-300 flex items-start">
            <span className="text-teal-400 mr-2">✔</span>
            <span>{feature}</span>
          </li>
        ))}
      </ul>
    </motion.div>
  );
}
