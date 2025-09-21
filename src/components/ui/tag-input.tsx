"use client";

import { useState, useRef, useEffect } from "react";
import { X, Plus, Tag } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface TagInputProps {
  tags: string[];
  onTagsChange: (tags: string[]) => void;
  placeholder?: string;
  maxTags?: number;
  suggestions?: string[];
}

export function TagInput({
  tags,
  onTagsChange,
  placeholder = "Add tags...",
  maxTags = 10,
  suggestions = [],
}: TagInputProps) {
  const [inputValue, setInputValue] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [filteredSuggestions, setFilteredSuggestions] = useState<string[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  // Filter suggestions based on input
  useEffect(() => {
    if (inputValue.trim()) {
      const filtered = suggestions
        .filter(
          (suggestion) =>
            suggestion.toLowerCase().includes(inputValue.toLowerCase()) &&
            !tags.includes(suggestion)
        )
        .slice(0, 5);
      setFilteredSuggestions(filtered);
      setShowSuggestions(filtered.length > 0);
    } else {
      setShowSuggestions(false);
      setFilteredSuggestions([]);
    }
  }, [inputValue, suggestions, tags]);

  const addTag = (tag: string) => {
    const trimmedTag = tag.trim();
    if (
      trimmedTag &&
      !tags.includes(trimmedTag) &&
      tags.length < maxTags
    ) {
      onTagsChange([...tags, trimmedTag]);
      setInputValue("");
      setShowSuggestions(false);
    }
  };

  const removeTag = (tagToRemove: string) => {
    onTagsChange(tags.filter((tag) => tag !== tagToRemove));
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      addTag(inputValue);
    } else if (e.key === "Backspace" && !inputValue && tags.length > 0) {
      removeTag(tags[tags.length - 1]);
    } else if (e.key === "Escape") {
      setShowSuggestions(false);
      inputRef.current?.blur();
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    addTag(suggestion);
  };

  return (
    <div className="relative">
      <div className="min-h-[48px] w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-xl focus-within:ring-2 focus-within:ring-teal-400/50 focus-within:border-teal-400/50 transition-all duration-300">
        <div className="flex flex-wrap gap-2 items-center">
          {/* Existing tags */}
          <AnimatePresence>
            {tags.map((tag) => (
              <motion.div
                key={tag}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.2 }}
                className="inline-flex items-center gap-1 px-3 py-1 bg-teal-500/20 text-teal-300 text-sm rounded-lg border border-teal-500/30"
              >
                <Tag className="w-3 h-3" />
                <span>{tag}</span>
                <button
                  type="button"
                  onClick={() => removeTag(tag)}
                  className="ml-1 hover:text-teal-200 transition-colors"
                >
                  <X className="w-3 h-3" />
                </button>
              </motion.div>
            ))}
          </AnimatePresence>

          {/* Input field */}
          <input
            ref={inputRef}
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            onFocus={() => setShowSuggestions(true)}
            onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
            placeholder={tags.length === 0 ? placeholder : ""}
            className="flex-1 min-w-[120px] bg-transparent text-white placeholder-gray-400 focus:outline-none"
            disabled={tags.length >= maxTags}
          />

          {/* Add button */}
          {inputValue.trim() && (
            <motion.button
              type="button"
              onClick={() => addTag(inputValue)}
              className="p-1 text-teal-400 hover:text-teal-300 transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <Plus className="w-4 h-4" />
            </motion.button>
          )}
        </div>

        {/* Tag count */}
        {maxTags && (
          <div className="text-xs text-gray-400 mt-1">
            {tags.length}/{maxTags} tags
          </div>
        )}
      </div>

      {/* Suggestions dropdown */}
      <AnimatePresence>
        {showSuggestions && filteredSuggestions.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full left-0 right-0 mt-1 bg-slate-800 border border-slate-700 rounded-xl shadow-lg z-50 max-h-48 overflow-y-auto"
          >
            {filteredSuggestions.map((suggestion) => (
              <button
                key={suggestion}
                type="button"
                onClick={() => handleSuggestionClick(suggestion)}
                className="w-full px-4 py-2 text-left text-gray-300 hover:text-white hover:bg-slate-700 transition-colors first:rounded-t-xl last:rounded-b-xl"
              >
                <div className="flex items-center gap-2">
                  <Tag className="w-3 h-3 text-teal-400" />
                  <span>{suggestion}</span>
                </div>
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
