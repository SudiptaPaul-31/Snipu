"use client";
import { CodeXml, Plus, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "./ui/button";

function NoSnippetFound() {
  return (
    <motion.div
      className="flex flex-col items-center justify-center py-20"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.7 }}
    >
      <div className="bg-gradient-to-r from-slate-800/30 to-slate-900/30 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-12 max-w-md mx-auto text-center">
        {/* Animated Icon */}
        <motion.div
          className="w-24 h-24 bg-gradient-to-r from-teal-400 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-6 relative"
          animate={{
            rotate: [0, 5, -5, 0],
            scale: [1, 1.05, 1],
          }}
          transition={{
            duration: 4,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        >
          <CodeXml className="w-12 h-12 text-black" />

          {/* Floating sparkles */}
          <motion.div
            className="absolute -top-2 -right-2"
            animate={{
              y: [-5, 5, -5],
              opacity: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 2,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
          >
            <Sparkles className="w-4 h-4 text-teal-400" />
          </motion.div>
        </motion.div>

        {/* Title */}
        <motion.h3
          className="text-2xl font-bold text-white mb-4"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          No snippets found
        </motion.h3>

        {/* Description */}
        <motion.p
          className="text-gray-400 mb-8 leading-relaxed"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          Start building your collection of code snippets. Create, organize, and
          share your code efficiently with the power of blockchain.
        </motion.p>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Link href="/snippet/new">
            <Button className="bg-gradient-to-r from-teal-400 to-blue-500 hover:from-teal-500 hover:to-blue-600 text-black font-semibold px-6 py-3 rounded-full shadow-[0_0_25px_rgba(56,189,248,0.3)] hover:shadow-[0_0_35px_rgba(56,189,248,0.5)] transition-all duration-300 flex items-center gap-2">
              <Plus className="w-5 h-5" />
              Create Your First Snippet
            </Button>
          </Link>
        </motion.div>

        {/* Decorative elements */}
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-teal-500/5 to-blue-500/5 pointer-events-none" />
      </div>
    </motion.div>
  );
}

export default NoSnippetFound;
