"use client";

import Header from "@/components/Header";
import Hero from "@/components/Hero";
import AboutHero from "@/components/AboutHero";
import FeaturesHero from "@/components/FeaturesHero";
import CodeSnippetsHero from "@/components/CodeSnippetsHero";
import Footer from "@/components/Footer";

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
      <Footer />
    </div>
  );
}
