"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  ChevronDown,
  Code2,
  Share2,
  Copy,
  Edit,
  Globe,
  Lock,
  Check,
  Star,
  Bookmark,
  BookmarkX,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "@/hooks/use-toast";
import { MoveLeft } from "lucide-react";
import Header from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer";

const CreateSnippetPage = () => {
  const [language, setLanguage] = useState("JavaScript + CSS");
  const [visibility, setVisibility] = useState("Secret/Public");
  const [description, setDescription] = useState("");
  const [title, setTitle] = useState("");
  const [code, setCode] =
    useState(`<button class="btn" onclick="this.style.backgroundColor='#'+Math.floor(Math.random()*16777215).toString(16)">Click</button>

<style>
.btn {
  padding: 8px 12px;
  font-size: 14px;
  border: none;
  cursor: pointer;
  background: #5141A4;
  color: white;
  border-radius: 5px;
  transition: background 0.3s;
}
</style>`);
  const [isEditing, setIsEditing] = useState(false);
    const [isBookmarked, setIsBookmarked] = useState(false);
  const [isSaveEnabled, setIsSaveEnabled] = useState(false);
  const [initialDescription, setInitialDescription] = useState("");
  const [initialCode, setInitialCode] = useState(code);
  const [showSaveSuccess, setShowSaveSuccess] = useState(false);
  const [tags, setTags] = useState<string[]>(["React"]);
  const [isCopied, setIsCopied] = useState(false);

  useEffect(() => {
    const hasDescriptionChanged = description !== initialDescription;
    const hasCodeChanged = code !== initialCode;

    setIsSaveEnabled(isEditing || hasDescriptionChanged || hasCodeChanged);
  }, [isEditing, description, code, initialDescription, initialCode]);

  const handleSave = async () => {
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

      setInitialDescription(description);
      setInitialCode(code);
      setIsEditing(false);
      setShowSaveSuccess(true);
      setIsSaveEnabled(false);

      toast({
        title: "Success!",
        description: "Snippet saved successfully",
        duration: 2000,
      });

      setTimeout(() => {
        setShowSaveSuccess(false);
      }, 3000);
    } catch (error) {
      console.error("Error saving snippet:", error);
      toast({
        title: "Error",
        description: "Failed to save snippet",
        duration: 2000,
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
    
    // Reset the copied state after 2 seconds
    setTimeout(() => {
      setIsCopied(false);
    }, 2000);
  };

  const handleAddTag = (newTag: string) => {
    if (!tags.includes(newTag)) {
      setTags((prev) => [...prev, newTag]);
    }
  };

  // Add this with your other functions
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
    <>
    
      <Header />
    <div className="bg-hero-gradient min-h-screen bg-[#121212] text-gray-200 flex items-center justify-center flex-col w-full  sm:p-10 p-10">
      <div className="justify-start w-full max-w-[75rem] mx-auto flex items-center gap-2 m-4">
        <Button
          variant="outline"
          className="bg-[##100720] border-[#333333] text-gray-300 h-10 flex items-center gap-1 hover:bg-[#1A1A1A] hover:text-white transition-colors rounded-lg"
          onClick={() => {
            // Logic to navigate back to the previous page
            window.history.back();
          }}
        >
          <MoveLeft className="mr-1" />
          <span className="text-gray-400"> Back to snippets</span>
        </Button>
      </div>
      <div className="bg-[#190B2D73] rounded-lg  w-full max-w-[75rem] mx-auto flex flex-col items-center sm:p-10 p-10">
        {/* Main container with visible border */}
        <div className="w-full max-w-[62.5rem] mt-14 ">
          <div className="w-full mb-8">
            <Label className="text-lg" htmlFor="text">
              Title
            </Label>
            <Input
              placeholder="Enter snippet title"
              className="bg-transparent border-[#333333] text-gray-300 h-[55px] text-2xl placeholder:italic placeholder:text-gray-500 rounded-lg"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="mb-8">
            <Label className="text-lg" htmlFor="text">
              Description
            </Label>
            <Input
              placeholder="Describe your code snippet"
              className="bg-transparent border-[#333333] text-gray-300 h-[55px] text-2xl placeholder:italic placeholder:text-gray-500 rounded-lg"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
        </div>
        <div className="bg-[#07031271] boader-[#E3E3E31F] w-full max-w-[62.5rem] rounded-lg p-6 shadow-[0_-20.08px_80.32px_0_rgba(147,57,255,0.16)]">
          <div className="bg-[##FFFFFF0A] rounded-xl overflow-hidden border border-[#333333] max-w-[61rem]">
            {/* Header with controls */}

            <div className="flex items-center gap-2 p-3 border-b border-[#333333] bg-[#FFFFFF0A]">
              <h2 className="text-[#6A6A6A] text-xl ml-2 w-[411px]">
                Enter your snippet below
              </h2>
              <DropdownMenu>
                <DropdownMenuContent className="bg-[#1A1A1A] border-[#333333] text-gray-300 rounded-lg">
                  <DropdownMenuItem
                    className="hover:bg-[#252525] hover:text-white focus:bg-[#252525] focus:text-white"
                    onClick={() => setVisibility("Secret")}
                  >
                    <Lock className="h-4 w-4 mr-2" />
                    Secret
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    className="hover:bg-[#252525] hover:text-white focus:bg-[#252525] focus:text-white"
                    onClick={() => setVisibility("Public")}
                  >
                    <Globe className="h-4 w-4 mr-2" />
                    Public
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    className="bg-transparent border-[#333333] text-gray-300 h-10 flex items-center gap-1 hover:bg-[#1A1A1A] hover:text-white transition-colors rounded-lg"
                  >
                    <div className="w-5 h-5 rounded-full bg-blue-500 flex items-center justify-center text-xs text-white">
                      {tags[0]?.[0] || "T"}
                    </div>
                    <span className="mx-1">{tags.join(", ")}</span>
                    <ChevronDown className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="bg-[#FFFFFF0A] border-[#333333] text-gray-300 rounded-lg">
                  <DropdownMenuItem
                    className="hover:bg-[#252525] hover:text-white focus:bg-[#252525] focus:text-white"
                    onClick={() => handleAddTag("React")}
                  >
                    <div className="w-5 h-5 rounded-full bg-blue-500 flex items-center justify-center text-xs text-white mr-2">
                      R
                    </div>
                    React
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    className="hover:bg-[#252525] hover:text-white focus:bg-[#252525] focus:text-white"
                    onClick={() => handleAddTag("Vue")}
                  >
                    <div className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center text-xs text-white mr-2">
                      V
                    </div>
                    Vue
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    className="hover:bg-[#252525] hover:text-white focus:bg-[#252525] focus:text-white"
                    onClick={() => handleAddTag("Angular")}
                  >
                    <div className="w-5 h-5 rounded-full bg-red-500 flex items-center justify-center text-xs text-white mr-2">
                      A
                    </div>
                    Angular
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    className="bg-transparent border-[#333333] text-gray-300 h-10 flex items-center gap-1 hover:bg-[#1A1A1A] hover:text-white transition-colors rounded-lg"
                  >
                    <span>{language}</span>
                    <ChevronDown className="h-4 w-4 ml-1" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="bg-[##FFFFFF0A] border-[#333333] text-gray-300 rounded-lg">
                  <DropdownMenuItem
                    className="hover:bg-[#252525] hover:text-white focus:bg-[#252525] focus:text-white"
                    onClick={() => setLanguage("JavaScript + CSS")}
                  >
                    JavaScript + CSS
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    className="hover:bg-[#252525] hover:text-white focus:bg-[#252525] focus:text-white"
                    onClick={() => setLanguage("TypeScript")}
                  >
                    TypeScript
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    className="hover:bg-[#252525] hover:text-white focus:bg-[#252525] focus:text-white"
                    onClick={() => setLanguage("HTML")}
                  >
                    HTML
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    className="hover:bg-[#252525] hover:text-white focus:bg-[#252525] focus:text-white"
                    onClick={() => setLanguage("Python")}
                  >
                    Python
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              <Button
                variant="outline"
                className="bg-transparent border-[#333333] text-gray-300 h-10 flex items-center gap-1 hover:bg-[#1A1A1A] hover:text-white transition-all duration-200 hover:scale-105 rounded-lg shadow-sm"
              >
                <Share2 className="h-4 w-4 mr-1" />
                Share/Export
              </Button>

              <Button
                className={`${
                  showSaveSuccess
                    ? "bg-green-600 hover:bg-green-700"
                    : "bg-[#8B5CF6] hover:bg-[#7C3AED]"
                } text-white h-10 ml-auto transition-all duration-200 hover:scale-105 rounded-lg shadow-md flex items-center gap-2`}
                onClick={handleSave}
                disabled={!isSaveEnabled}
              >
                {showSaveSuccess ? (
                  <>
                    <Check className="h-4 w-4" />
                    Saved!
                  </>
                ) : (
                  "Save"
                )}
              </Button>
            </div>

            {/* Code snippet area */}
            <div className="m-4 p-10 bg-[#FFFFFF0A] boader-[#FFFFFF33] rounded-lg">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-gray-300 font-medium flex items-center text-base">
                  <Code2 className="h-5 w-5 mr-2" />
                  Code Snippet
                </h2>
                <div className="flex gap-4">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-gray-400 hover:text-white hover:bg-transparent transition-colors flex items-center"
                    onClick={handleCopyCode}
                  >
                    {isCopied ? (
                      <Check className="h-4 w-4 mr-2 text-green-500" />
                    ) : (
                      <Copy className="h-4 w-4 mr-2" />
                    )}
                    <span>{isCopied ? 'Copied!' : 'Copy'}</span>
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-gray-400 hover:text-white hover:bg-transparent transition-colors flex items-center"
                    onClick={() => setIsEditing(!isEditing)}
                  >
                    <Edit className="h-4 w-4 mr-2" />
                    <span>{isEditing ? "Cancel" : "Edit"}</span>
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-gray-400 hover:text-white hover:bg-transparent transition-colors flex items-center"
                    onClick={handleToggleBookmark}
                    title="Bookmark this Snippet"
                  >
                    {isBookmarked ? (
                      <>
                        <Bookmark className="h-4 w-4 mr-2 fill-current" />
                        <span>Bookmarked</span>
                      </>
                    ) : (
                      <>
                        <BookmarkX className="h-4 w-4 mr-2" />
                        <span>Bookmark</span>
                      </>
                    )}
                  </Button>
                </div>
              </div>

              <div className="rounded-lg p-5 font-mono text-sm">
                {isEditing ? (
                  <textarea
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    className="w-full h-[300px] bg-transparent border-0 text-green-400 font-mono resize-none p-0 focus-visible:ring-0 focus-visible:ring-offset-0 outline-none"
                    style={{
                      whiteSpace: "pre",
                      color: "inherit",
                      lineHeight: 1.5,
                    }}
                    placeholder="// Write your code here..."
                  />
                ) : (
                  <pre className="text-left whitespace-pre overflow-x-auto">
                    <code>
                      {code.split("\n").map((line, index) => {
                        // Handle comments (ensure they are in English)
                        if (line.trim().startsWith("//")) {
                          return (
                            <div key={index}>
                              <span className="text-gray-500">{line}</span>
                            </div>
                          );
                        }

                        // Process HTML tags, CSS, and other code
                        if (line.includes("<button")) {
                          return (
                            <div key={index}>
                              <span className="text-red-400">{"<"}</span>
                              <span className="text-orange-400">button </span>
                              <span className="text-yellow-400">class</span>
                              <span className="text-white">{"="}</span>
                              <span className="text-green-400">{'"btn"'} </span>
                              <span className="text-yellow-400">onclick</span>
                              <span className="text-white">{"="}</span>
                              <span className="text-green-400">
                                {
                                  "\"this.style.backgroundColor='#'+Math.floor(Math.random()*16777215).toString(16)\""
                                }
                              </span>
                              <span className="text-red-400">{">"}</span>
                              <span className="text-white">Click</span>
                              <span className="text-red-400">{"</"}</span>
                              <span className="text-orange-400">button</span>
                              <span className="text-red-400">{">"}</span>
                            </div>
                          );
                        }

                        if (line.includes("<style>")) {
                          return (
                            <div key={index}>
                              <span className="text-red-400">{"<"}</span>
                              <span className="text-orange-400">style</span>
                              <span className="text-red-400">{">"}</span>
                            </div>
                          );
                        }

                        if (line.includes(".btn {")) {
                          return (
                            <div key={index}>
                              <span className="text-yellow-400">{".btn"} </span>
                              <span className="text-white">{"{"}</span>
                            </div>
                          );
                        }

                        // CSS properties - fix for additional semicolon issue
                        if (
                          line.trim().startsWith("padding:") ||
                          line.trim().startsWith("font-size:") ||
                          line.trim().startsWith("border:") ||
                          line.trim().startsWith("cursor:") ||
                          line.trim().startsWith("background:") ||
                          line.trim().startsWith("color:") ||
                          line.trim().startsWith("border-radius:") ||
                          line.trim().startsWith("transition:")
                        ) {
                          const [property, value] = line.trim().split(":");
                          // Check if value already has a semicolon to prevent duplicates
                          const valueWithoutSemicolon = value
                            .trim()
                            .endsWith(";")
                            ? value.trim().slice(0, -1)
                            : value.trim();

                          return (
                            <div key={index}>
                              <span className="text-green-400">
                                {`  ${property}:`}{" "}
                              </span>
                              <span className="text-orange-400">
                                {valueWithoutSemicolon}
                              </span>
                              <span className="text-white">;</span>
                            </div>
                          );
                        }

                        if (line.trim() === "}") {
                          return (
                            <div key={index}>
                              <span className="text-white">{"}"}</span>
                            </div>
                          );
                        }

                        if (line.includes("</style>")) {
                          return (
                            <div key={index}>
                              <span className="text-red-400">{"</"}</span>
                              <span className="text-orange-400">style</span>
                              <span className="text-red-400">{">"}</span>
                            </div>
                          );
                        }

                        // Default for any other lines
                        return <div key={index}>{line}</div>;
                      })}
                    </code>
                  </pre>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="justify-start w-full max-w-[62.5rem] mx-auto flex items-center gap-4 m-10 mb-20">
          <Button
            variant="outline"
            className="bg-[##100720] border-[#333333] text-gray-300 h-10 flex items-center gap-1 hover:bg-[#1A1A1A] hover:text-white transition-colors rounded-lg"
            onClick={() => {
              // Logic to navigate back to the previous page
              window.history.back();
            }}
          >
            <MoveLeft className="mr-1" />
            <span className="text-gray-400"> Back to snippets</span>
          </Button>
          <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold py-3 px-6 rounded-lg transform transition-all duration-200 hover:scale-105 shadow-lg">
            + New Snippet
          </Button>
        </div>
      </div>
    </div>
      <Footer />
    </>
  );
};

export default CreateSnippetPage;
