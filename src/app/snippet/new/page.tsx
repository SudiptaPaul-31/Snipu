"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  ChevronDown,
  Code2,
  Share2,
  Copy,
  Edit,
  Globe,
  Lock,
  Check,
  Bookmark,
  BookmarkX,
  ArrowLeft,
  Save,
  Eye,
  Sparkles,
  FileCode,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "@/hooks/use-toast";
import Header from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import Link from "next/link";
import type { JSX } from "react/jsx-runtime";
import { TagInput } from "@/components/ui/tag-input";
import { getUniqueTags } from "@/lib/mockData";

const CreateSnippetPage = () => {
  const [language, setLanguage] = useState("JavaScript");
  const [visibility, setVisibility] = useState("Public");
  const [framework, setFramework] = useState("React");
  const [description, setDescription] = useState("");
  const [title, setTitle] = useState("");
  const [code, setCode] = useState(`// Welcome to Snipu! 
// Start writing your amazing code here...

function greetUser(name) {
  return \`Hello, \${name}! Welcome to the future of code sharing.\`;
}

console.log(greetUser("Developer"));`);
  const [isEditing, setIsEditing] = useState(true);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isSaveEnabled, setIsSaveEnabled] = useState(true);
  const [showSaveSuccess, setShowSaveSuccess] = useState(false);
  const [tags, setTags] = useState<string[]>([]);
  const [isCopied, setIsCopied] = useState(false);
  const availableTags = getUniqueTags();


  const getFrameworkIcon = (framework: string) => {
    const icons: Record<string, JSX.Element> = {
      React: (
        <div className="w-4 h-4 rounded-full bg-blue-500 flex items-center justify-center text-xs text-white">
          R
        </div>
      ),
      Vue: (
        <div className="w-4 h-4 rounded-full bg-green-500 flex items-center justify-center text-xs text-white">
          V
        </div>
      ),
      Angular: (
        <div className="w-4 h-4 rounded-full bg-red-500 flex items-center justify-center text-xs text-white">
          A
        </div>
      ),
      "No Framework": (
        <div className="w-4 h-4 rounded-full bg-gray-500 flex items-center justify-center text-xs text-white">
          N
        </div>
      ),
    };
    return icons[framework] || icons["No Framework"];
  };

  const getLanguageIcon = (lang: string) => {
    const icons: Record<string, JSX.Element> = {
      JavaScript: (
        <div className="w-5 h-5 flex items-center justify-center rounded-full bg-yellow-400 text-xs font-bold text-black">
          JS
        </div>
      ),
      TypeScript: (
        <div className="w-5 h-5 flex items-center justify-center rounded-full bg-blue-700 text-xs font-bold text-white">
          TS
        </div>
      ),
      Python: (
        <div className="w-5 h-5 flex items-center justify-center rounded-full bg-blue-600 text-xs font-bold text-white">
          PY
        </div>
      ),
      React: (
        <div className="w-5 h-5 flex items-center justify-center rounded-full bg-blue-500 text-xs font-bold text-white">
          R
        </div>
      ),
      Vue: (
        <div className="w-5 h-5 flex items-center justify-center rounded-full bg-green-500 text-xs font-bold text-white">
          V
        </div>
      ),
      Angular: (
        <div className="w-5 h-5 flex items-center justify-center rounded-full bg-red-500 text-xs font-bold text-white">
          A
        </div>
      ),
    };
    return icons[lang] || <FileCode className="w-5 h-5 text-teal-400" />;
  };

  const handleSave = async () => {
    if (!title.trim()) {
      toast({
        title: "Title Required",
        description: "Please enter a title for your snippet",
        variant: "destructive",
        duration: 3000,
      });
      return;
    }

    if (!code.trim()) {
      toast({
        title: "Code Required",
        description: "Please enter some code for your snippet",
        variant: "destructive",
        duration: 3000,
      });
      return;
    }

    try {
      const response = await fetch("/api/snippets", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: title.trim(),
          description: description.trim() || "No description provided",
          code: code.trim(),
          language,
          authorId: "user123",
          tags,
          visibility,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to save snippet");
      }

      const savedSnippet = await response.json();
      console.log("Snippet saved:", savedSnippet);

      setShowSaveSuccess(true);
      setIsSaveEnabled(false);

      toast({
        title: "Success!",
        description: "Your snippet has been saved to the blockchain",
        duration: 3000,
      });

      setTimeout(() => {
        setShowSaveSuccess(false);
      }, 3000);
    } catch (error) {
      console.error("Error saving snippet:", error);
      toast({
        title: "Error",
        description: "Failed to save snippet. Please try again.",
        duration: 3000,
        variant: "destructive",
      });
    }
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(code);
    setIsCopied(true);
    toast({
      title: "Copied!",
      description: "Code snippet copied to clipboard",
      duration: 2000,
    });

    setTimeout(() => {
      setIsCopied(false);
    }, 2000);
  };


  const handleToggleBookmark = () => {
    setIsBookmarked(!isBookmarked);
    toast({
      title: isBookmarked ? "Removed from bookmarks" : "Added to bookmarks",
      description: isBookmarked
        ? "Snippet removed from your bookmarks"
        : "Snippet saved to your bookmarks",
      duration: 2000,
    });
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
          {/* Hero Section */}
          <motion.div
            className="text-center mb-12"
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
                <Sparkles className="w-4 h-4" />
                Create New Snippet
              </span>
            </motion.div>

            <motion.h1
              className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-white via-teal-200 to-cyan-400 bg-clip-text text-transparent"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.7 }}
            >
              Share Your Code with the World
            </motion.h1>

            <motion.p
              className="text-xl text-gray-300 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.7 }}
            >
              Create, store, and share your code snippets on the blockchain with
              enhanced security and global accessibility
            </motion.p>
          </motion.div>

          {/* Form Section */}
          <motion.div
            className="bg-gradient-to-r from-slate-800/40 to-slate-900/40 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-8 mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.7 }}
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Left Column - Metadata */}
              <div className="space-y-6">
                <div>
                  <Label className="text-lg font-semibold text-white mb-3 block">
                    Title
                  </Label>
                  <Input
                    placeholder="Enter a descriptive title for your snippet"
                    className="bg-slate-800/50 border-slate-600/50 text-white placeholder-gray-400 h-12 text-lg focus:ring-2 focus:ring-teal-400/50 focus:border-teal-400/50 transition-all duration-300"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </div>

                <div>
                  <Label className="text-lg font-semibold text-white mb-3 block">
                    Description
                  </Label>
                  <Textarea
                    placeholder="Describe what your code does and how to use it"
                    className="bg-slate-800/50 border-slate-600/50 text-white placeholder-gray-400 min-h-[120px] focus:ring-2 focus:ring-teal-400/50 focus:border-teal-400/50 transition-all duration-300 resize-none"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </div>

                {/* Settings Row */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {/* Language Selector */}
                  <div>
                    <Label className="text-sm font-medium text-gray-300 mb-2 block">
                      Language
                    </Label>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="outline"
                          className="w-full bg-slate-800/50 border-slate-600/50 text-white hover:bg-slate-700/50 hover:text-white justify-between"
                        >
                          <div className="flex items-center gap-2">
                            {getLanguageIcon(language)}
                            <span>{language}</span>
                          </div>
                          <ChevronDown className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className="w-full bg-slate-800 border-slate-700">
                        {[
                          "JavaScript",
                          "TypeScript",
                          "Python",
                          "HTML",
                          "CSS",
                          "React",
                          "Vue",
                          "Angular",
                        ].map((lang) => (
                          <DropdownMenuItem
                            key={lang}
                            onClick={() => setLanguage(lang)}
                            className="flex items-center gap-2 text-gray-300 hover:text-white hover:bg-slate-700 focus:bg-slate-700 focus:text-white"
                          >
                            {getLanguageIcon(lang)}
                            {lang}
                          </DropdownMenuItem>
                        ))}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>

                  {/* Framework Selector */}
                  <div>
                    <Label className="text-sm font-medium text-gray-300 mb-2 block">
                      Framework
                    </Label>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="outline"
                          className="w-full bg-slate-800/50 border-slate-600/50 text-white hover:bg-slate-700/50 hover:text-white justify-between"
                        >
                          <div className="flex items-center gap-2">
                            {getFrameworkIcon(framework)}
                            <span>{framework}</span>
                          </div>
                          <ChevronDown className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className="bg-slate-800 border-slate-700">
                        {["React", "Vue", "Angular", "No Framework"].map((fw) => (
                          <DropdownMenuItem
                            key={fw}
                            onClick={() => setFramework(fw)}
                            className="flex items-center gap-2 text-gray-300 hover:text-white hover:bg-slate-700 focus:bg-slate-700 focus:text-white"
                          >
                            {getFrameworkIcon(fw)}
                            {fw}
                          </DropdownMenuItem>
                        ))}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>

                  {/* Visibility Selector */}
                  <div>
                    <Label className="text-sm font-medium text-gray-300 mb-2 block">
                      Visibility
                    </Label>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="outline"
                          className="w-full bg-slate-800/50 border-slate-600/50 text-white hover:bg-slate-700/50 hover:text-white justify-between"
                        >
                          <div className="flex items-center gap-2">
                            {visibility === "Public" ? (
                              <Globe className="w-4 h-4" />
                            ) : (
                              <Lock className="w-4 h-4" />
                            )}
                            <span>{visibility}</span>
                          </div>
                          <ChevronDown className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className="bg-slate-800 border-slate-700">
                        <DropdownMenuItem
                          onClick={() => setVisibility("Public")}
                          className="flex items-center gap-2 text-gray-300 hover:text-white hover:bg-slate-700 focus:bg-slate-700 focus:text-white"
                        >
                          <Globe className="w-4 h-4" />
                          Public
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => setVisibility("Private")}
                          className="flex items-center gap-2 text-gray-300 hover:text-white hover:bg-slate-700 focus:bg-slate-700 focus:text-white"
                        >
                          <Lock className="w-4 h-4" />
                          Private
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>

                  {/* Topics Input */}
                  <div className="col-span-3">
                    <Label className="text-sm font-medium text-gray-300 mb-2 block">
                      Topics
                    </Label>
                    <TagInput
                      tags={tags}
                      onTagsChange={setTags}
                      placeholder="Add related topics (hooks, patterns, etc.)..."
                      maxTags={6}
                      suggestions={availableTags}
                    />
                    <p className="mt-1 text-xs text-gray-400">
                      Add topics to help others discover your snippet
                    </p>
                  </div>

                </div>
              </div>

              {/* Right Column - Preview */}
              <div className="bg-slate-900/50 rounded-xl p-6 border border-slate-700/30">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                    <Eye className="w-5 h-5 text-teal-400" />
                    Live Preview
                  </h3>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-gradient-to-r from-teal-400 to-blue-500" />
                    <span className="text-sm text-gray-400">{language}</span>
                    <span className="text-sm text-gray-500">•</span>
                    <span className="text-sm text-gray-400">{framework}</span>
                  </div>
                </div>

                <div className="space-y-3">
                  <div>
                    <h4 className="font-medium text-white truncate">
                      {title || "Untitled Snippet"}
                    </h4>
                    <p className="text-sm text-gray-400 line-clamp-2">
                      {description || "No description provided"}
                    </p>
                  </div>

                  <div className="bg-slate-800/50 rounded-lg p-3 border border-slate-700/30">
                    <pre className="text-xs text-gray-300 font-mono leading-relaxed overflow-hidden">
                      <code>
                        {code.split("\n").slice(0, 8).join("\n")}
                        {code.split("\n").length > 8 ? "\n..." : ""}
                      </code>
                    </pre>
                  </div>

                  <div className="flex items-center justify-between text-xs text-gray-400">
                    <span>Just now</span>
                    <div className="flex items-center gap-3">
                      <span className="flex items-center gap-1">
                        <Eye className="w-3 h-3" />0
                      </span>
                      <span className="flex items-center gap-1">
                        <Copy className="w-3 h-3" />0
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Code Editor Section */}
          <motion.div
            className="bg-gradient-to-r from-slate-800/40 to-slate-900/40 backdrop-blur-sm border border-slate-700/50 rounded-2xl overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.0, duration: 0.7 }}
          >
            {/* Editor Header */}
            <div className="flex items-center justify-between p-6 border-b border-slate-700/50 bg-slate-800/30">
              <div className="flex items-center gap-3">
                <Code2 className="w-5 h-5 text-teal-400" />
                <h2 className="text-lg font-semibold text-white">
                  Code Editor
                </h2>
                <span className="text-sm text-gray-400">
                  ({code.split("\n").length} lines)
                </span>
              </div>

              <div className="flex items-center gap-3">
                <motion.button
                  onClick={handleCopyCode}
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-lg transition-all duration-300 text-sm ${
                    isCopied
                      ? "bg-green-500/20 border border-green-500/50 text-green-400"
                      : "bg-slate-700/50 border border-slate-600/50 text-gray-400 hover:text-teal-400 hover:border-teal-500/50"
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Copy className="w-4 h-4" />
                  {isCopied ? "Copied!" : "Copy"}
                </motion.button>

                <motion.button
                  onClick={() => setIsEditing(!isEditing)}
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-lg transition-all duration-300 text-sm ${
                    isEditing
                      ? "bg-teal-500/20 border border-teal-500/50 text-teal-400"
                      : "bg-slate-700/50 border border-slate-600/50 text-gray-400 hover:text-teal-400 hover:border-teal-500/50"
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Edit className="w-4 h-4" />
                  {isEditing ? "Preview" : "Edit"}
                </motion.button>

                <motion.button
                  onClick={handleToggleBookmark}
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-lg transition-all duration-300 text-sm ${
                    isBookmarked
                      ? "bg-yellow-500/20 border border-yellow-500/50 text-yellow-400"
                      : "bg-slate-700/50 border border-slate-600/50 text-gray-400 hover:text-yellow-400 hover:border-yellow-500/50"
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {isBookmarked ? (
                    <Bookmark className="w-4 h-4 fill-current" />
                  ) : (
                    <BookmarkX className="w-4 h-4" />
                  )}
                  {isBookmarked ? "Saved" : "Save"}
                </motion.button>
              </div>
            </div>

            {/* Code Content */}
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-teal-500/5 to-blue-500/5 opacity-50" />
              {isEditing ? (
                <Textarea
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  className="w-full min-h-[400px] bg-slate-900/50 border-0 text-gray-300 font-mono text-sm resize-none p-6 focus:ring-0 focus:outline-none relative z-10"
                  placeholder="// Start coding your amazing snippet here..."
                  style={{
                    whiteSpace: "pre",
                    lineHeight: 1.6,
                  }}
                />
              ) : (
                <pre className="p-6 bg-slate-900/50 text-gray-300 font-mono text-sm leading-relaxed overflow-x-auto relative z-10 min-h-[400px]">
                  <code className="language-javascript">{code}</code>
                </pre>
              )}
            </div>
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            className="flex flex-col sm:flex-row items-center justify-between gap-6 mt-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.7 }}
          >
            <div className="flex items-center gap-4">
              <Link href="/snippet">
                <Button
                  variant="outline"
                  className="bg-slate-800/50 border-slate-600/50 text-gray-400 hover:text-teal-400 hover:border-slate-500/50"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Snippets
                </Button>
              </Link>

              <Button
                variant="outline"
                className="bg-slate-800/50 border-slate-600/50 text-gray-400 hover:text-blue-400 hover:border-blue-500/50"
              >
                <Share2 className="w-4 h-4 mr-2" />
                Share/Export
              </Button>
            </div>

            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                onClick={handleSave}
                disabled={!isSaveEnabled || !title.trim() || !code.trim()}
                className={`${
                  showSaveSuccess
                    ? "bg-green-500 hover:bg-green-600"
                    : "bg-gradient-to-r from-teal-400 to-blue-500 hover:from-teal-500 hover:to-blue-600"
                } text-black font-semibold px-8 py-3 rounded-full shadow-[0_0_25px_rgba(56,189,248,0.3)] hover:shadow-[0_0_35px_rgba(56,189,248,0.5)] transition-all duration-300 flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed`}
              >
                {showSaveSuccess ? (
                  <>
                    <Check className="w-5 h-5" />
                    Saved to Blockchain!
                  </>
                ) : (
                  <>
                    <Save className="w-5 h-5" />
                    Save to Blockchain
                  </>
                )}
              </Button>
            </motion.div>
          </motion.div>

          {/* Tips Section */}
          <motion.div
            className="mt-12 bg-gradient-to-r from-teal-500/10 to-blue-500/10 backdrop-blur-sm border border-teal-500/20 rounded-2xl p-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.4, duration: 0.7 }}
          >
            <div className="flex items-start gap-4">
              <Sparkles className="w-6 h-6 text-teal-400 mt-1 flex-shrink-0" />
              <div>
                <h3 className="text-lg font-semibold text-white mb-2">
                  Pro Tips for Better Snippets
                </h3>
                <ul className="text-gray-300 space-y-1 text-sm">
                  <li>
                    • Use descriptive titles and add comments to make your code
                    more understandable
                  </li>
                  <li>
                    • Tag your snippets appropriately to help others discover
                    them
                  </li>
                  <li>
                    • Public snippets are stored on IPFS for permanent,
                    decentralized access
                  </li>
                  <li>
                    • Private snippets are encrypted and only accessible to you
                  </li>
                </ul>
              </div>
            </div>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default CreateSnippetPage;
