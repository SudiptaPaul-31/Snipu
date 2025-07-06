"use client";

import {
  Search,
  Filter,
  Grid3X3,
  List,
  Sparkles,
  ChevronDown,
} from "lucide-react";
import { motion } from "framer-motion";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { getUniqueLanguages, getUniqueTags } from "@/lib/mockData";

interface SearchAndFilterSectionProps {
  searchQuery: string;
  languageFilter: string;
  viewMode: "grid" | "list";
  onSearchChange: (value: string) => void;
  onLanguageChange: (value: string) => void;
  onViewModeToggle: () => void;
}

export function SearchAndFilterSection({
  searchQuery,
  languageFilter,
  viewMode,
  onSearchChange,
  onLanguageChange,
  onViewModeToggle,
}: SearchAndFilterSectionProps) {
  const languages = getUniqueLanguages();
  const tags = getUniqueTags();

  return (
    <div className="flex flex-col sm:flex-row gap-4 w-full">
      {/* Search Input */}
      <motion.div
        className="relative flex-1"
        whileFocus={{ scale: 1.02 }}
        transition={{ duration: 0.2 }}
      >
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search snippets, tags, or languages..."
          className="w-full h-12 pl-12 pr-4 bg-slate-800/50 backdrop-blur-sm border border-slate-600/50 rounded-2xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-400/50 focus:border-teal-400/50 transition-all duration-300 hover:border-slate-500/50"
        />
        {searchQuery && (
          <motion.div
            className="absolute right-4 top-1/2 -translate-y-1/2"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <Sparkles className="w-4 h-4 text-teal-400" />
          </motion.div>
        )}
      </motion.div>

      <div className="flex gap-4">
        {" "}
        {/* Language Filter Dropdown */}
        <motion.div
          className="relative flex-1"
          whileFocus={{ scale: 1.02 }}
          transition={{ duration: 0.2 }}
        >
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                className="w-full sm:w-48 h-12 bg-slate-800/50 backdrop-blur-sm border border-slate-600/50 text-white hover:bg-slate-700/50 hover:border-slate-500/50 transition-all duration-300 justify-between rounded-2xl"
              >
                <div className="flex items-center gap-2">
                  <Filter className="w-4 h-4 text-gray-400" />
                  <span className="text-gray-300">
                    {languageFilter || "All Languages"}
                  </span>
                </div>
                <ChevronDown className="w-4 h-4 text-gray-400" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-48 bg-slate-800 border-slate-700 rounded-2xl">
              <DropdownMenuItem
                onClick={() => onLanguageChange("")}
                className="text-gray-300 hover:text-white hover:bg-slate-700 focus:bg-slate-700 focus:text-white rounded-xl mx-1 my-1"
              >
                All Languages
              </DropdownMenuItem>
              {languages.map((language) => (
                <DropdownMenuItem
                  key={language}
                  onClick={() => onLanguageChange(language)}
                  className="text-gray-300 hover:text-white hover:bg-slate-700 focus:bg-slate-700 focus:text-white rounded-xl mx-1 my-1"
                >
                  {language}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </motion.div>
        {/* View Mode Toggle */}
        <motion.button
          onClick={onViewModeToggle}
          className="flex items-center justify-center w-12 h-12 bg-slate-800/50 backdrop-blur-sm border border-slate-600/50 rounded-2xl text-gray-400 hover:text-white hover:border-teal-400/50 transition-all duration-300 group"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          title={`Switch to ${viewMode === "grid" ? "list" : "grid"} view`}
        >
          {viewMode === "grid" ? (
            <List className="w-5 h-5 group-hover:text-teal-400 transition-colors" />
          ) : (
            <Grid3X3 className="w-5 h-5 group-hover:text-teal-400 transition-colors" />
          )}
        </motion.button>
      </div>
    </div>
  );
}
