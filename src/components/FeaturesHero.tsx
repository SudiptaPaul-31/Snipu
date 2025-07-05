import React from "react";
import FeatureCard from "@/components/feature-card";
import { motion } from "framer-motion";

const FeaturesHero = () => {
  return (
    <section className="py-10 xl:py-20 max-w-7xl mx-auto">
      <motion.div
        className="mb-16 text-center"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.3, duration: 0.7 }}
      >
        <h2 className="text-teal-400 text-lg font-semibold mb-3">Features</h2>
        <h3 className="text-3xl font-bold">Experience the premium features </h3>
      </motion.div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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
    </section>
  );
};

export default FeaturesHero;
