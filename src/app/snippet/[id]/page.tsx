"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import {
  Code2,
  Edit3,
  Trash2,
  Copy,
  Eye,
  Calendar,
  User,
  ArrowLeft,
  Share2,
  Bookmark,
  Globe,
  Download,
  Heart,
} from "lucide-react";
import { toast } from "@/hooks/use-toast";
import Header from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer";
import { getSnippetById } from "@/lib/mockData";
import type { Snippet } from "@/app/types";
import type { JSX } from "react/jsx-runtime";

const SnippetDetailPage = () => {
  const params = useParams();
  const [snippet, setSnippet] = useState<Snippet | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);

  useEffect(() => {
    const loadSnippet = async () => {
      try {
        if (!params || !params.id) {
          throw new Error("No snippet ID provided");
        }

        const id = Number.parseInt(params.id as string);
        if (isNaN(id)) {
          throw new Error("Invalid snippet ID");
        }

        const foundSnippet = getSnippetById(id);

        if (foundSnippet) {
          setSnippet(foundSnippet);
          setIsBookmarked(foundSnippet.isBookmarked || false);
        }
      } catch (error) {
        console.error("Error loading snippet:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadSnippet();
  }, [params]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#0a1929] to-black text-white flex items-center justify-center">
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
    );
  }

  if (!snippet) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#0a1929] to-black text-white">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <div className="text-center py-20">
            <h1 className="text-3xl font-bold mb-4">Snippet Not Found</h1>
            <p className="text-gray-400 mb-6">
              The snippet you're looking for doesn't exist.
            </p>
            <Link href="/snippet">
              <button className="bg-gradient-to-r from-teal-400 to-blue-500 text-black font-semibold px-6 py-2 rounded-full">
                Back to Snippets
              </button>
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const handleCopyCode = async () => {
    try {
      await navigator.clipboard.writeText(snippet.code);
      setCopySuccess(true);
      toast({
        title: "Copied!",
        description: "Code snippet copied to clipboard",
        duration: 2000,
      });
      setTimeout(() => setCopySuccess(false), 2000);
    } catch (err) {
      toast({
        title: "Error",
        description: "Failed to copy code",
        variant: "destructive",
        duration: 2000,
      });
    }
  };

  const handleBookmark = () => {
    setIsBookmarked(!isBookmarked);
    toast({
      title: isBookmarked ? "Removed from bookmarks" : "Added to bookmarks",
      description: isBookmarked
        ? "Snippet removed from your bookmarks"
        : "Snippet saved to your bookmarks",
      duration: 2000,
    });
  };

  const handleLike = () => {
    setIsLiked(!isLiked);
    toast({
      title: isLiked ? "Like removed" : "Snippet liked!",
      description: isLiked
        ? "You unliked this snippet"
        : "Thanks for the feedback!",
      duration: 2000,
    });
  };

  const handleShare = async () => {
    try {
      await navigator.share({
        title: snippet.title,
        text: snippet.description,
        url: window.location.href,
      });
    } catch (err) {
      // Fallback to copying URL
      await navigator.clipboard.writeText(window.location.href);
      toast({
        title: "Link copied!",
        description: "Snippet URL copied to clipboard",
        duration: 2000,
      });
    }
  };

  const getLanguageIcon = (language: string) => {
    const icons: Record<string, JSX.Element> = {
      JavaScript: (
        <div className="w-6 h-6 flex items-center justify-center rounded-full bg-yellow-400 text-xs font-bold text-black">
          JS
        </div>
      ),
      Python: (
        <div className="w-6 h-6 flex items-center justify-center rounded-full bg-blue-600 text-xs font-bold text-white">
          PY
        </div>
      ),
      TypeScript: (
        <div className="w-6 h-6 flex items-center justify-center rounded-full bg-blue-700 text-xs font-bold text-white">
          TS
        </div>
      ),
      CSS: (
        <div className="w-6 h-6 flex items-center justify-center rounded-full bg-pink-500 text-xs font-bold text-white">
          CSS
        </div>
      ),
      SQL: (
        <div className="w-6 h-6 flex items-center justify-center rounded-full bg-orange-500 text-xs font-bold text-white">
          SQL
        </div>
      ),
      Rust: (
        <div className="w-6 h-6 flex items-center justify-center rounded-full bg-orange-600 text-xs font-bold text-white">
          RS
        </div>
      ),
      Go: (
        <div className="w-6 h-6 flex items-center justify-center rounded-full bg-cyan-500 text-xs font-bold text-white">
          GO
        </div>
      ),
    };
    return icons[language] || <Code2 className="w-6 h-6 text-teal-400" />;
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
        {/* Back Navigation */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Link
            href="/snippet"
            className="inline-flex items-center gap-2 text-gray-400 hover:text-teal-400 transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Back to Snippets
          </Link>
        </motion.div>

        <div className="max-w-6xl mx-auto">
          {/* Header Section */}
          <motion.div
            className="bg-gradient-to-r from-slate-800/40 to-slate-900/40 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-8 mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
              {/* Title and Meta */}
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-4">
                  {getLanguageIcon(snippet.language)}
                  <span className="bg-gradient-to-r from-teal-500/20 to-blue-500/20 backdrop-blur-sm border border-teal-500/30 text-teal-300 px-3 py-1 rounded-full text-sm font-medium">
                    {snippet.language}
                  </span>
                  <span className="flex items-center gap-1 text-green-400 text-sm">
                    <Globe className="w-4 h-4" />
                    Public
                  </span>
                </div>

                <h1 className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-white via-teal-200 to-cyan-400 bg-clip-text text-transparent mb-4">
                  {snippet.title}
                </h1>

                <p className="text-gray-300 text-lg mb-6 leading-relaxed">
                  {snippet.description}
                </p>

                {/* Author Info */}
                <div className="flex items-center gap-4 text-sm text-gray-400">
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4" />
                    <span className="text-teal-400">
                      {snippet.author?.username || "Anonymous"}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    <span>{snippet.createdAt.toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Eye className="w-4 h-4" />
                    <span>{snippet.views?.toLocaleString() || 0} views</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-3">
                <motion.button
                  onClick={handleLike}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl border transition-all duration-300 ${
                    isLiked
                      ? "bg-red-500/20 border-red-500/50 text-red-400"
                      : "bg-slate-700/50 border-slate-600/50 text-gray-400 hover:text-red-400 hover:border-red-500/50"
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Heart
                    className={`w-4 h-4 ${isLiked ? "fill-current" : ""}`}
                  />
                  {(snippet.views || 0) + (isLiked ? 1 : 0)}
                </motion.button>

                <motion.button
                  onClick={handleBookmark}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl border transition-all duration-300 ${
                    isBookmarked
                      ? "bg-yellow-500/20 border-yellow-500/50 text-yellow-400"
                      : "bg-slate-700/50 border-slate-600/50 text-gray-400 hover:text-yellow-400 hover:border-yellow-500/50"
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Bookmark
                    className={`w-4 h-4 ${isBookmarked ? "fill-current" : ""}`}
                  />
                  {isBookmarked ? "Saved" : "Save"}
                </motion.button>

                <motion.button
                  onClick={handleShare}
                  className="flex items-center gap-2 px-4 py-2 bg-slate-700/50 border border-slate-600/50 text-gray-400 hover:text-blue-400 hover:border-blue-500/50 rounded-xl transition-all duration-300"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Share2 className="w-4 h-4" />
                  Share
                </motion.button>

                <Link href={`/snippet/${snippet.id}/edit`}>
                  <motion.button
                    className="flex items-center gap-2 px-4 py-2 bg-teal-500/20 border border-teal-500/50 text-teal-400 hover:bg-teal-500/30 rounded-xl transition-all duration-300"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Edit3 className="w-4 h-4" />
                    Edit
                  </motion.button>
                </Link>

                <motion.button
                  className="flex items-center gap-2 px-4 py-2 bg-red-500/20 border border-red-500/50 text-red-400 hover:bg-red-500/30 rounded-xl transition-all duration-300"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Trash2 className="w-4 h-4" />
                  Delete
                </motion.button>
              </div>
            </div>

            {/* Tags */}
            {snippet.tags && snippet.tags.length > 0 && (
              <motion.div
                className="flex flex-wrap gap-2 mt-6 pt-6 border-t border-slate-700/50"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.5 }}
              >
                {snippet.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-slate-700/50 text-gray-300 text-sm rounded-lg border border-slate-600/30 hover:bg-slate-600/50 hover:text-white transition-colors cursor-pointer"
                  >
                    #{tag}
                  </span>
                ))}
              </motion.div>
            )}
          </motion.div>

          {/* Code Section */}
          <motion.div
            className="bg-gradient-to-r from-slate-800/40 to-slate-900/40 backdrop-blur-sm border border-slate-700/50 rounded-2xl overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.7 }}
          >
            {/* Code Header */}
            <div className="flex items-center justify-between p-6 border-b border-slate-700/50 bg-slate-800/30">
              <div className="flex items-center gap-3">
                <Code2 className="w-5 h-5 text-teal-400" />
                <h2 className="text-lg font-semibold text-white">
                  Source Code
                </h2>
                <span className="text-sm text-gray-400">
                  ({snippet.code.split("\n").length} lines)
                </span>
              </div>

              <div className="flex items-center gap-3">
                <motion.button
                  onClick={handleCopyCode}
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-lg transition-all duration-300 text-sm ${
                    copySuccess
                      ? "bg-green-500/20 border border-green-500/50 text-green-400"
                      : "bg-slate-700/50 border border-slate-600/50 text-gray-400 hover:text-teal-400 hover:border-teal-500/50"
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Copy className="w-4 h-4" />
                  {copySuccess ? "Copied!" : "Copy"}
                </motion.button>

                <motion.button
                  className="flex items-center gap-2 px-3 py-1.5 bg-slate-700/50 border border-slate-600/50 text-gray-400 hover:text-blue-400 hover:border-blue-500/50 rounded-lg transition-all duration-300 text-sm"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Download className="w-4 h-4" />
                  Download
                </motion.button>
              </div>
            </div>

            {/* Code Content */}
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-teal-500/5 to-blue-500/5 opacity-50" />
              <pre className="p-6 bg-slate-900/50 text-gray-300 font-mono text-sm leading-relaxed overflow-x-auto relative z-10">
                <code className="language-javascript">{snippet.code}</code>
              </pre>
            </div>
          </motion.div>

          {/* Stats Section */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.7 }}
          >
            <div className="bg-gradient-to-r from-teal-500/10 to-cyan-500/10 backdrop-blur-sm border border-teal-500/20 rounded-xl p-6 text-center">
              <Eye className="w-8 h-8 text-teal-400 mx-auto mb-3" />
              <div className="text-2xl font-bold text-white mb-1">
                {snippet.views?.toLocaleString() || 0}
              </div>
              <div className="text-gray-400 text-sm">Views</div>
            </div>

            <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 backdrop-blur-sm border border-blue-500/20 rounded-xl p-6 text-center">
              <Copy className="w-8 h-8 text-blue-400 mx-auto mb-3" />
              <div className="text-2xl font-bold text-white mb-1">
                {snippet.copies || 0}
              </div>
              <div className="text-gray-400 text-sm">Copies</div>
            </div>

            <div className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 backdrop-blur-sm border border-purple-500/20 rounded-xl p-6 text-center">
              <Heart className="w-8 h-8 text-purple-400 mx-auto mb-3" />
              <div className="text-2xl font-bold text-white mb-1">
                {(snippet.views || 0) + (isLiked ? 1 : 0)}
              </div>
              <div className="text-gray-400 text-sm">Likes</div>
            </div>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default SnippetDetailPage;
