"use client";

import Header from "@/components/Navbar/Navbar";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { SnippetCard } from "@/components/SnippetCard";
import type { Snippet } from "../types";
import { useEffect, useMemo, useState } from "react";
import Footer from "@/components/Footer";
import { SearchAndFilterSection } from "@/components/SearchAndFilterSection";
import { motion } from "framer-motion";
import { Code2, Plus, Sparkles } from "lucide-react";
import { mockSnippets } from "@/lib/mockData";

export default function Home() {
  const [snippets, setSnippets] = useState<Snippet[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [languageFilter, setLanguageFilter] = useState("");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  useEffect(() => {
    // Simulate loading and use mock data
    const loadSnippets = async () => {
      try {
        // Simulate API delay
        await new Promise((resolve) => setTimeout(resolve, 1000));
        setSnippets(mockSnippets);
      } catch (error) {
        console.error("Error loading snippets:", error);
      } finally {
        setLoading(false);
      }
    };

    loadSnippets();
  }, []);

  // Memoized filtered snippets
  const filteredSnippets = useMemo(() => {
    return snippets.filter((snippet) => {
      const matchesSearch =
        searchQuery.toLowerCase() === ""
          ? true
          : snippet.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            snippet.tags.some((tag) =>
              tag.toLowerCase().includes(searchQuery.toLowerCase())
            ) ||
            snippet.language
              .toLowerCase()
              .includes(searchQuery.toLowerCase()) ||
            snippet.description
              ?.toLowerCase()
              .includes(searchQuery.toLowerCase());

      const matchesLanguage =
        languageFilter === ""
          ? true
          : snippet.language.toLowerCase() === languageFilter.toLowerCase();

      return matchesSearch && matchesLanguage;
    });
  }, [snippets, searchQuery, languageFilter]);

  const toggleViewMode = () => {
    setViewMode((prev) => (prev === "grid" ? "list" : "grid"));
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0a1929] to-black text-white overflow-hidden relative">
      {/* Animated background effects */}
      <div className="absolute inset-0 overflow-hidden -z-10">
        <div className="absolute top-20 left-1/4 w-[500px] h-[500px] bg-teal-500 opacity-10 rounded-full blur-[150px]"></div>
        <div className="absolute top-1/2 right-1/4 w-[400px] h-[400px] bg-blue-600 opacity-8 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-20 left-1/3 w-[300px] h-[300px] bg-cyan-400 opacity-8 rounded-full blur-[100px]"></div>
      </div>

      <Header />

      <main className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <motion.div
            className="inline-flex items-center justify-center mb-6"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <span className="text-teal-400 border-2 border-teal-700 text-sm px-4 rounded-full py-1 flex items-center gap-2">
              <Code2 className="w-4 h-4" />
              Code Collection
            </span>
          </motion.div>

          <motion.h1
            className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white via-teal-200 to-cyan-400 bg-clip-text text-transparent"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.7 }}
          >
            Your Code Snippets
          </motion.h1>

          <motion.p
            className="text-xl text-gray-300 max-w-2xl mx-auto mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.7 }}
          >
            Store, organize and share your code snippets efficiently with
            blockchain-powered security
          </motion.p>
        </motion.div>

        {/* Stats Section */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.7 }}
        >
          <div className="bg-gradient-to-r from-teal-500/10 to-cyan-500/10 backdrop-blur-sm border border-teal-500/20 rounded-xl p-6 text-center">
            <div className="text-3xl font-bold text-teal-400 mb-2">
              {snippets.length}
            </div>
            <div className="text-gray-300">Total Snippets</div>
          </div>
          <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 backdrop-blur-sm border border-blue-500/20 rounded-xl p-6 text-center">
            <div className="text-3xl font-bold text-blue-400 mb-2">
              {new Set(snippets.map((s) => s.language)).size}
            </div>
            <div className="text-gray-300">Languages</div>
          </div>
          <div className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 backdrop-blur-sm border border-purple-500/20 rounded-xl p-6 text-center">
            <div className="text-3xl font-bold text-purple-400 mb-2">
              {snippets.reduce((acc, s) => acc + (s.views || 0), 0)}
            </div>
            <div className="text-gray-300">Total Views</div>
          </div>
        </motion.div>

        {/* Search and Filter Section */}
        <motion.div
          className="bg-gradient-to-r from-slate-800/30 to-slate-900/30 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-6 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0, duration: 0.7 }}
        >
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex-1 w-full lg:w-auto">
              <SearchAndFilterSection
                searchQuery={searchQuery}
                languageFilter={languageFilter}
                viewMode={viewMode}
                onSearchChange={setSearchQuery}
                onLanguageChange={setLanguageFilter}
                onViewModeToggle={toggleViewMode}
              />
            </div>

            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-full md:w-fit"
            >
              <Link href="/snippet/new">
                <Button className="h-full w-full bg-gradient-to-r from-teal-400 to-blue-500 hover:from-teal-500 hover:to-blue-600 text-black font-semibold px-8 py-3 rounded-2xl shadow-[0_0_25px_rgba(56,189,248,0.3)] hover:shadow-[0_0_35px_rgba(56,189,248,0.5)] transition-all duration-300 flex items-center gap-2">
                  <Plus className="w-5 h-5" />
                  New Snippet
                </Button>
              </Link>
            </motion.div>
          </div>
        </motion.div>

        {/* Snippets Section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.7 }}
        >
          {loading ? (
            <div className="flex justify-center items-center py-20">
              <motion.div
                className="w-16 h-16 border-4 border-teal-400 border-t-transparent rounded-full"
                animate={{ rotate: 360 }}
                transition={{
                  duration: 1,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "linear",
                }}
              />
            </div>
          ) : filteredSnippets.length > 0 ? (
            <div
              className={
                viewMode === "grid"
                  ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                  : "space-y-6"
              }
            >
              {filteredSnippets.map((snippet, index) => (
                <motion.div
                  key={snippet.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.4 + index * 0.1, duration: 0.5 }}
                  whileHover={{ y: -5 }}
                >
                  <SnippetCard snippet={snippet} viewMode={viewMode} />
                </motion.div>
              ))}
            </div>
          ) : (
            <motion.div
              className="text-center py-20"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.4, duration: 0.7 }}
            >
              <div className="bg-gradient-to-r from-slate-800/30 to-slate-900/30 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-12 max-w-md mx-auto">
                <div className="w-20 h-20 bg-gradient-to-r from-teal-400 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Code2 className="w-10 h-10 text-black" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">
                  No snippets found
                </h3>
                <p className="text-gray-400 mb-6">
                  {searchQuery || languageFilter
                    ? "Try adjusting your search or filter criteria"
                    : "Create your first code snippet to get started"}
                </p>
                <Link href="/snippet/new">
                  <Button className="bg-gradient-to-r from-teal-400 to-blue-500 hover:from-teal-500 hover:to-blue-600 text-black font-semibold px-6 py-2 rounded-full">
                    <Plus className="w-4 h-4 mr-2" />
                    Create Snippet
                  </Button>
                </Link>
              </div>
            </motion.div>
          )}
        </motion.div>

        {/* Call to Action */}
        {filteredSnippets.length > 0 && (
          <motion.div
            className="text-center mt-16 py-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.6, duration: 0.7 }}
          >
            <div className="bg-gradient-to-r from-teal-500/10 to-blue-500/10 backdrop-blur-sm border border-teal-500/20 rounded-2xl p-8 max-w-2xl mx-auto">
              <Sparkles className="w-12 h-12 text-teal-400 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-white mb-4">
                Ready to share your code?
              </h3>
              <p className="text-gray-300 mb-6">
                Join thousands of developers sharing and discovering amazing
                code snippets
              </p>
              <Link href="/snippet/new">
                <Button className="bg-gradient-to-r from-teal-400 to-blue-500 hover:from-teal-500 hover:to-blue-600 text-black font-semibold px-8 py-3 rounded-full shadow-[0_0_25px_rgba(56,189,248,0.3)] hover:shadow-[0_0_35px_rgba(56,189,248,0.5)] transition-all duration-300">
                  <Plus className="w-5 h-5 mr-2" />
                  Create New Snippet
                </Button>
              </Link>
            </div>
          </motion.div>
        )}
      </main>

      <Footer />
    </div>
  );
}
