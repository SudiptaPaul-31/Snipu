import React from "react";
import { motion } from "framer-motion";
import {
  ShieldCheck,
  Handshake,
  Lightbulb,
  Users,
} from "lucide-react";

/**
 * OurValues component displays the core values of the Snipu project.
 *
 * It follows the same styling as the Features section: a teal tagline,
 * bold heading and a grid of value cards.
 */
const OurValues: React.FC = () => {
  const values = [
    {
      icon: ShieldCheck,
      title: "Security & Privacy",
      description:
        "Protecting your code and data is paramount. We embrace robust cryptography and on‑chain storage to keep your snippets safe.",
    },
    {
      icon: Handshake,
      title: "Transparency & Trust",
      description:
        "Open‑source by design. All transactions and contributions are verifiable on the blockchain, fostering a culture of trust.",
    },
    {
      icon: Lightbulb,
      title: "Innovation",
      description:
        "We’re pioneers at heart, pushing the boundaries of decentralized collaboration and enabling new possibilities for developers.",
    },
    {
      icon: Users,
      title: "Community",
      description:
        "Building together is at our core. We empower developers around the world to connect, share knowledge and grow.",
    },
  ];

  return (
    <section className="py-10 xl:py-20 max-w-7xl mx-auto">
      <motion.div
        className="mb-16 text-center"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.7 }}
      >
        <h2 className="text-teal-400 text-lg font-semibold mb-3">Our Values</h2>
        <h3 className="text-3xl font-bold">What Drives Us</h3>
      </motion.div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {values.map(({ icon: Icon, title, description }, idx) => (
          <motion.div
            key={title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 + idx * 0.2, duration: 0.5 }}
            whileHover={{ scale: 1.03 }}
            className="flex flex-col items-start text-left bg-[#0a0a0a] border border-teal-800 rounded-lg p-6 shadow-md hover:shadow-xl transition-shadow duration-300"
          >
            <div className="mb-4">
              <Icon size={32} className="text-teal-400" />
            </div>
            <h4 className="text-lg font-semibold mb-2 text-white">{title}</h4>
            <p className="text-gray-300 text-sm leading-relaxed">
              {description}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default OurValues;
