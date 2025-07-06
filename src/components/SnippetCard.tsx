"use client";

import type React from "react";
import Link from "next/link";
import { Eye, Copy, MoreVertical, Globe, Star, Calendar } from "lucide-react";
import { useState, useRef, useEffect, type JSX } from "react";
import type { ProgrammingLanguage, Snippet } from "@/app/types";
import { getRelativeTime } from "@/lib/utils";
import { motion } from "framer-motion";

interface SnippetCardProps {
  snippet: Snippet;
  viewMode: "grid" | "list";
}

export const SnippetCard: React.FC<SnippetCardProps> = ({
  snippet,
  viewMode,
}) => {
  const [showOptions, setShowOptions] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const optionsRef = useRef<HTMLDivElement>(null);

  // Close options when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        optionsRef.current &&
        !optionsRef.current.contains(event.target as Node)
      ) {
        setShowOptions(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const getLanguageIcon = (language: ProgrammingLanguage) => {
    const languageIcons: Record<string, JSX.Element> = {
      JavaScript: (
        <div className="w-5 h-5 flex items-center justify-center rounded-full bg-yellow-400 text-[9px] font-bold text-black">
          JS
        </div>
      ),
      Python: (
        <div className="w-5 h-5 flex items-center justify-center rounded-full bg-blue-600 text-[9px] font-bold text-white">
          PY
        </div>
      ),
      CSS: (
        <div className="w-6 h-5 flex items-center justify-center rounded-full bg-pink-500 text-[9px] font-bold text-white">
          CSS
        </div>
      ),
      SQL: (
        <div className="w-5 h-5 flex items-center justify-center rounded-full bg-orange-500 text-[9px] font-bold text-white">
          SQL
        </div>
      ),
      TypeScript: (
        <div className="w-5 h-5 flex items-center justify-center rounded-full bg-blue-700 text-xs font-bold text-white">
          TS
        </div>
      ),
      HTML: (
        <div className="w-5 h-5 flex items-center justify-center rounded-full bg-red-500 text-xs font-bold text-white">
          HTML
        </div>
      ),
      Rust: (
        <div className="w-5 h-5 flex items-center justify-center rounded-full bg-orange-600 text-xs font-bold text-white">
          RS
        </div>
      ),
      Go: (
        <div className="w-5 h-5 flex items-center justify-center rounded-full bg-cyan-500 text-xs font-bold text-white">
          GO
        </div>
      ),
    };

    return languageIcons[language] || <Globe size={16} />;
  };

  const getLanguageGradient = (language: ProgrammingLanguage) => {
    const gradients: Record<string, string> = {
      JavaScript: "from-yellow-400/20 to-orange-400/20",
      Python: "from-blue-500/20 to-blue-600/20",
      CSS: "from-pink-500/20 to-purple-500/20",
      SQL: "from-orange-500/20 to-red-500/20",
      TypeScript: "from-blue-600/20 to-blue-700/20",
      HTML: "from-red-500/20 to-pink-500/20",
      Go: "from-cyan-400/20 to-blue-500/20",
      Rust: "from-orange-600/20 to-red-600/20",
    };
    return gradients[language] || "from-gray-500/20 to-gray-600/20";
  };

  // Dynamic classes based on view mode
  const cardClasses =
    viewMode === "grid"
      ? "group relative bg-gradient-to-br from-slate-800/40 to-slate-900/40 backdrop-blur-sm border border-slate-700/50 rounded-2xl overflow-hidden hover:border-teal-500/50 transition-all duration-300 hover:shadow-[0_0_30px_rgba(56,189,248,0.2)] cursor-pointer"
      : "group relative bg-gradient-to-br from-slate-800/40 to-slate-900/40 backdrop-blur-sm border border-slate-700/50 rounded-2xl overflow-hidden hover:border-teal-500/50 transition-all duration-300 hover:shadow-[0_0_30px_rgba(56,189,248,0.2)] flex flex-row w-full cursor-pointer";

  const contentClasses = viewMode === "grid" ? "p-6" : "p-6 flex-1 min-w-0";

  const codePreviewClasses =
    viewMode === "grid"
      ? `bg-gradient-to-r ${getLanguageGradient(
          snippet.language
        )} backdrop-blur-sm border border-slate-600/30 rounded-xl p-4 mb-6 overflow-hidden h-[100px] relative`
      : `bg-gradient-to-r ${getLanguageGradient(
          snippet.language
        )} backdrop-blur-sm border border-slate-600/30 rounded-xl p-4 mb-6 overflow-hidden h-[100px] relative flex-1`;

  return (
    <Link href={`/snippet/${snippet.id}`} className="block">
      <motion.div
        className={cardClasses}
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        whileHover={{ scale: 1.02 }}
        transition={{ duration: 0.2 }}
      >
        {/* Animated background gradient on hover */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-teal-500/5 to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          initial={false}
          animate={{ opacity: isHovered ? 1 : 0 }}
        />

        <div className={contentClasses}>
          <div className="flex-1 min-w-0 relative z-10">
            {/* Header */}
            <div className="flex justify-between items-start mb-4">
              <motion.div
                className="flex items-center gap-3"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
              >
                <span
                  className={`bg-gradient-to-r ${getLanguageGradient(
                    snippet.language
                  )} backdrop-blur-sm border border-slate-600/30 text-white px-3 py-1.5 rounded-full text-xs font-medium flex items-center gap-2 shadow-lg`}
                >
                  {getLanguageIcon(snippet.language)}
                  {snippet.language}
                </span>
                {snippet.isBookmarked && (
                  <Star className="w-4 h-4 text-yellow-400 fill-current" />
                )}
              </motion.div>

              <button
                className="text-gray-400 hover:text-white p-2 rounded-full hover:bg-slate-700/50 transition-colors"
                onClick={(e) => {
                  e.preventDefault();
                  setShowOptions(!showOptions);
                }}
              >
                <MoreVertical size={16} />
              </button>
            </div>

            {/* Title */}
            <motion.h3
              className="font-semibold text-xl text-white mb-4 line-clamp-2 group-hover:text-teal-200 transition-colors"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              {snippet.title}
            </motion.h3>

            {/* Code Preview */}
            <motion.div
              className={codePreviewClasses}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              {/* Code syntax highlighting effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              <pre className="text-sm text-gray-300 whitespace-pre-wrap font-mono leading-relaxed">
                <code className="group-hover:text-gray-200 transition-colors">
                  {snippet.code.length > 120
                    ? `${snippet.code.substring(0, 120)}...`
                    : snippet.code}
                </code>
              </pre>
            </motion.div>

            {/* Footer */}
            <motion.div
              className="flex justify-between items-center text-sm"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <div className="flex items-center text-gray-400 gap-2">
                <Calendar className="w-4 h-4" />
                <span className="group-hover:text-gray-300 transition-colors">
                  {getRelativeTime(snippet.createdAt)}
                </span>
              </div>

              <div className="flex items-center space-x-4 text-gray-400">
                <motion.div
                  className="flex items-center space-x-1 group-hover:text-teal-400 transition-colors"
                  whileHover={{ scale: 1.1 }}
                >
                  <Eye size={16} />
                  <span>{snippet.views || 0}</span>
                </motion.div>
                <motion.div
                  className="flex items-center space-x-1 group-hover:text-blue-400 transition-colors"
                  whileHover={{ scale: 1.1 }}
                >
                  <Copy size={16} />
                  <span>{snippet.copies || 0}</span>
                </motion.div>
              </div>
            </motion.div>

            {/* Tags */}
            {snippet.tags && snippet.tags.length > 0 && (
              <motion.div
                className="flex flex-wrap gap-2 mt-4"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                {snippet.tags.slice(0, 3).map((tag, index) => (
                  <span
                    key={index}
                    className="px-2 py-1 bg-slate-700/50 text-gray-300 text-xs rounded-md border border-slate-600/30 group-hover:bg-slate-600/50 group-hover:text-white transition-colors"
                  >
                    #{tag}
                  </span>
                ))}
                {snippet.tags.length > 3 && (
                  <span className="px-2 py-1 bg-slate-700/50 text-gray-400 text-xs rounded-md border border-slate-600/30">
                    +{snippet.tags.length - 3}
                  </span>
                )}
              </motion.div>
            )}
          </div>
        </div>

        {/* Hover glow effect */}
        <motion.div
          className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
          style={{
            background: `linear-gradient(135deg, rgba(56, 189, 248, 0.1) 0%, rgba(14, 165, 233, 0.05) 100%)`,
            filter: "blur(1px)",
          }}
          initial={false}
          animate={{ opacity: isHovered ? 1 : 0 }}
        />
      </motion.div>
    </Link>
  );
};
