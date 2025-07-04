"use client";

import { motion } from "framer-motion";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import AboutHero from "@/components/AboutHero";
import FeaturesHero from "@/components/FeaturesHero";
import CodeSnippetsHero from "@/components/CodeSnippetsHero";

export default function Home() {
  return (
    <div className="min-h-screen ">
      {/* Header */}
      <Header />
      <main className="text-white container mx-auto px-4">
        {/* Hero Section */}
        <Hero />
        {/* About Section */}
        <AboutHero />
        {/* Key Features Section */}
        <FeaturesHero />
        {/* Code Snippets Section */}
        <CodeSnippetsHero />
      </main>

      {/* Footer */}
      <motion.footer
        className="py-8 border-t border-gray-800 text-center text-gray-400"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7, duration: 0.7 }}
        whileHover={{ y: -5 }}
      >
        <p>© {new Date().getFullYear()} Snipu. All rights reserved.</p>
      </motion.footer>
    </div>
  );
}
