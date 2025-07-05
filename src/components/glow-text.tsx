"use client";

import type React from "react";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface GlowTextProps {
  children: React.ReactNode;
  className?: string;
}

export default function GlowText({ children, className }: GlowTextProps) {
  return (
    <motion.span
      className={cn("relative inline-block", className)}
      whileInView={{ opacity: 1, y: 0 }}
      initial={{ opacity: 0, y: 10 }}
      transition={{ duration: 0.5 }}
    >
      {children}
      <span className="absolute inset-0 blur-md opacity-60 bg-gradient-to-r from-blue-400 to-cyan-300 -z-10 rounded-lg"></span>
    </motion.span>
  );
}
