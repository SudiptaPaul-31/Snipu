"use client";

import OurStory from "@/components/OurStory";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function About() {
  return (
    <div className="min-h-screen ">
      {/* Header */}
      <Header />
      <main className="text-white container mx-auto px-4">
        {/* About Section */}
        <OurStory/>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}

