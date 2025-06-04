"use client"

import Image from "next/image"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import FeatureCard from "@/components/feature-card"
import { motion } from "framer-motion"
import GlowText from "@/components/glow-text"

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-[#0a1929] to-black text-white overflow-hidden relative">
      {/* Animated light rays */}
      <div className="absolute inset-0 overflow-hidden -z-5">
        <div className="light-ray light-ray-1"></div>
        <div className="light-ray light-ray-2"></div>
        <div className="light-ray light-ray-3"></div>
      </div>
      {/* Enhanced blue glow background effects */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10">
        <div className="absolute top-20 left-1/4 w-[500px] h-[500px] bg-blue-500 opacity-15 rounded-full blur-[150px]"></div>
        <div className="absolute top-1/2 right-1/4 w-[400px] h-[400px] bg-blue-600 opacity-10 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-20 left-1/3 w-[300px] h-[300px] bg-cyan-400 opacity-10 rounded-full blur-[100px]"></div>
        <div className="absolute top-1/3 right-1/3 w-[250px] h-[250px] bg-indigo-500 opacity-5 rounded-full blur-[80px]"></div>
      </div>
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <motion.div
          className="flex justify-center mb-4"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="relative blue-glow">
            <Image
              src="/images/logo.jpg"
              alt="Snipu Logo"
              width={100}
              height={40}
              className="rounded-md relative z-10"
            />
          </div>
        </motion.div>

        <motion.p
          className="text-center text-amber-400 text-sm mb-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          Secure Share. Verify. Build.
        </motion.p>

        {/* Hero Section */}
        <div className="flex flex-col items-center justify-center text-center mb-16">
          <motion.h1
            className="text-4xl md:text-5xl font-bold mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.7 }}
          >
            Revolutionizing Code Sharing in Web3
          </motion.h1>

          <motion.h2
            className="text-xl md:text-2xl mb-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.7 }}
          >
            With Blockchain-Powered Collaboration
          </motion.h2>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.9, duration: 0.5 }}
            whileHover={{ scale: 1.05 }}
            className="mb-16"
          >
            <Link
              href="/snippet"
              className="bg-gradient-to-r from-teal-400 to-blue-500 text-black font-medium px-8 py-3 rounded-full inline-flex items-center shadow-[0_0_25px_rgba(56,189,248,0.6)] hover:shadow-[0_0_35px_rgba(56,189,248,0.8)] transition-shadow duration-300"
            >
              Let&apos;s Get Started <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </motion.div>

          <motion.p
            className="max-w-3xl text-sm md:text-base text-gray-300 leading-relaxed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.1, duration: 0.7 }}
          >
            Snipu is a Decentralized Code Snippet Hub Built On Starknet. That Redefines How Developers Store, Share, And
            Collaborate On Code. By Leveraging Blockchain Technology, The Platform Ensures That Code Snippets Are Stored
            Securely On-Chain While Offering Seamless Access To A Global Community Of Developers. Snipu Revolutionizes
            Code Sharing With Features Like Versioning, Access Control, Digital Rights Management, And More Than With
            Ease Through Sharable Links.
          </motion.p>
        </div>

        {/* Key Features Section */}
        <motion.div
          className="mb-20"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.3, duration: 0.7 }}
        >
          <h2 className="text-4xl font-bold text-center mb-16">
            <GlowText className="text-blue-300">Key Features</GlowText>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <FeatureCard
              title="Core EVM Implementation"
              features={[
                "Full Implementation Of Bitcoin Script Opcodes In Core",
                "Stack-Based Execution Environment Mirroring Bitcoin's Approach",
                "Accurate Handling Of Bitcoin's Execution Constraints And Edge Cases",
              ]}
            />

            <FeatureCard
              title="Script Compilation"
              features={[
                "Bitcoin Script To Cairo Translation With Optimization",
                "Support For Both Legacy And SegWit Script Formats",
                "Comprehensive Script Semantics Across Languages",
              ]}
            />

            <FeatureCard
              title="Verification Tools"
              features={[
                "Zero-Knowledge Proof Generation For Script Execution",
                "On-Chain Verification Of Bitcoin Script Execution On Layer 2",
                "Cryptographic Bridges Between Bitcoin And Cairo Execution Environments",
              ]}
            />

            <FeatureCard
              title="Developer Tools"
              features={[
                "Comprehensive SDK For Integrating Snipu Into Existing Applications",
                "Automated Testing Protocols And Automation",
                "Detailed Execution Logs For Managing Complex Scripts",
              ]}
            />

            <FeatureCard
              title="Interoperability Features"
              features={[
                "Cross-Chain Messaging Capabilities Using Bitcoin Scripts",
                "Built-In Transaction Verification On Layer 2 Platforms",
                "Bridge Mechanism For Bitcoin-Cairo Compatibility",
              ]}
            />

            <FeatureCard
              title="Security Component"
              features={[
                "Formal Verification Of Core VM Components",
                "Comprehensive Test Suite For Security Vulnerabilities",
                "Security Audit-Ready Architecture",
              ]}
            />
          </div>
        </motion.div>

        {/* Footer */}
        <motion.div
          className="flex justify-center pt-8 pb-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.5 }}
        >
          <Image src="/images/logo.jpg" alt="Snipu Logo" width={80} height={32} className="rounded-md" />
        </motion.div>
      </div>
      {/* Floating blue orb */}
      <div className="fixed bottom-10 right-10 w-24 h-24 rounded-full bg-gradient-to-r from-blue-500 to-cyan-400 opacity-70 blur-xl pulse-glow pointer-events-none"></div>
    </main>
  )
}