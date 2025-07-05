"use client";

import Header from "@/components/Navbar/Navbar";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { SnippetCard } from "@/components/SnippetCard";
import NoSnippetFound from "@/components/NoSnippetFound";
import { Snippet } from "../types";
import { useEffect, useMemo, useState } from "react";
import Footer from "@/components/Footer";
import Loading from "@/components/Loading";
import { SearchAndFilterSection } from "@/components/SearchAndFilterSection";
import { prisma } from "@/lib/prisma";
import { toast } from "@/hooks/use-toast";

interface PaginatedResponse {
  snippets: Snippet[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

export default function Home() {
  const [snippets, setSnippets] = useState<Snippet[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  // const [bookmarkingIds, setBookmarkingIds] = useState<Set<string>>(new Set());
  const [searchQuery, setSearchQuery] = useState("");
  const [languageFilter, setLanguageFilter] = useState("");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const fetchSnippets = async () => {
    try {
      // const snippets = await prisma.snippet.findMany();
      const response = await fetch("/api/snippets");
      if (!response.ok) {
        throw new Error("Failed to fetch snippets");
      }
      const data: PaginatedResponse = await response.json();
      setSnippets(data.snippets);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load snippets");
    } finally {
      setLoading(false);
    }
  };

  // useEffect(() => {
  //   fetchSnippets();
  // }, []);

  useEffect(() => {
    const fetchSnippets = async () => {
      try {
        const mockSnippets: Snippet[] = [
          {
            id: 1,
            title: "React useState Example",
            code: "const [state, setState] = useState(initialState);",
            language: "JavaScript",
            authorId: "user1",
            tags: ["React", "Hooks"],
            createdAt: new Date("2023-05-15"),
            comments: [
              {
                id: 1,
                content: "Great example of useState!",
                createdAt: new Date("2023-05-16"),
                updatedAt: new Date("2023-05-16"),
                authorId: "user2",
                snippetId: 1,
              },
            ],
            author: {
              id: "user1",
              walletAddress: "0x71C...3b5",
              username: "react_dev",
              bio: "React enthusiast",
              createdAt: new Date("2023-01-10"),
              updatedAt: new Date("2023-06-20"),
            },
            views: 24,
            copies: 12,
          },
          {
            id: 2,
            title: "Python List Comprehension",
            code: "[x for x in range(10) if x % 2 == 0]",
            language: "Python",
            authorId: "user3",
            tags: ["Python", "Lists"],
            createdAt: new Date("2023-06-20"),
            author: {
              id: "user3",
              walletAddress: "0x92D...7f1",
              username: "python_lover",
              createdAt: new Date("2023-02-15"),
              updatedAt: new Date("2023-07-01"),
            },
            views: 24,
            copies: 12,
          },
          {
            id: 3,
            title: "JavaScript Fetch API",
            code: "fetch('/api/data').then(res => res.json());",
            language: "JavaScript",
            authorId: "user1",
            tags: ["API", "Fetch"],
            createdAt: new Date("2023-07-10"),
            comments: [
              {
                id: 2,
                content: "Don't forget error handling!",
                createdAt: new Date("2023-07-11"),
                updatedAt: new Date("2023-07-11"),
                authorId: "user4",
                snippetId: 3,
              },
            ],
            views: 0,
            copies: 0,
          },
          {
            id: 4,
            title: "CSS Center with Flexbox",
            code: "display: flex;\njustify-content: center;\nalign-items: center;",
            language: "CSS",
            authorId: "user2",
            tags: ["CSS", "Flexbox"],
            createdAt: new Date("2023-08-05"),
            author: {
              id: "user2",
              walletAddress: "0x45E...9c2",
              username: "css_wizard",
              bio: "CSS magician",
              createdAt: new Date("2023-01-25"),
              updatedAt: new Date("2023-08-10"),
            },
            views: 0,
            copies: 0,
          },
          {
            id: 5,
            title: "SQL Inner Join",
            code: "SELECT * FROM users\nINNER JOIN orders\nON users.id = orders.user_id;",
            language: "SQL",
            authorId: "user4",
            tags: ["SQL", "Join"],
            createdAt: new Date("2023-09-12"),
            comments: [
              {
                id: 3,
                content: "You might want to specify columns instead of using *",
                createdAt: new Date("2023-09-13"),
                updatedAt: new Date("2023-09-13"),
                authorId: "user3",
                snippetId: 5,
              },
            ],
            views: 1,
            copies: 0,
          },
          {
            id: 6,
            title: "TypeScript Interface Example",
            code: "interface User {\n  name: string;\n  age: number;\n}",
            language: "TypeScript",
            authorId: "user5",
            tags: ["TypeScript", "Types"],
            createdAt: new Date("2023-10-01"),
            author: {
              id: "user5",
              walletAddress: "0x63F...4a8",
              username: "ts_expert",
              bio: "TypeScript advocate",
              createdAt: new Date("2023-03-18"),
              updatedAt: new Date("2023-10-05"),
            },
            views: 0,
            copies: 1,
          },
          {
            id: 7,
            title: "Rust Error Handling",
            code: 'fn divide(a: i32, b: i32) -> Result<i32, String> {\n  if b == 0 {\n    return Err(String::from("Cannot divide by zero"));\n  }\n  Ok(a / b)\n}',
            language: "Rust",
            authorId: "user6",
            tags: ["Rust", "Error"],
            createdAt: new Date("2023-10-15"),
            comments: [
              {
                id: 4,
                content: "Clean error handling example!",
                createdAt: new Date("2023-10-16"),
                updatedAt: new Date("2023-10-16"),
                authorId: "user1",
                snippetId: 7,
              },
            ],
            views: 0,
            copies: 0,
          },
          {
            id: 8,
            title: "Go HTTP Server",
            code: 'package main\n\nimport (\n  "fmt"\n  "net/http"\n)\n\nfunc handler(w http.ResponseWriter, r *http.Request) {\n  fmt.Fprintf(w, "Hello, World!")\n}',
            language: "Go",
            authorId: "user7",
            tags: ["Go", "HTTP"],
            createdAt: new Date("2023-11-01"),
            author: {
              id: "user7",
              walletAddress: "0x87G...5b9",
              username: "gopher",
              createdAt: new Date("2023-04-22"),
              updatedAt: new Date("2023-11-05"),
            },
            views: 10,
            copies: 10,
          },
        ];
        setSnippets(mockSnippets);
      } catch (error) {
        console.error("Error fetching snippets:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSnippets();
  }, []);

  // Memoized filtered snippets

  const filteredSnippets = useMemo(() => {
    return snippets.filter((snippet) => {
      const matchesSearch =
        searchQuery.toLowerCase() === ""
          ? true
          : snippet.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            snippet.tags.some((tag) =>
              tag.toLowerCase().includes(searchQuery.toLowerCase()),
            );

      const matchesLanguage =
        languageFilter === ""
          ? true
          : snippet.language.toLowerCase() === languageFilter.toLowerCase();

      return matchesSearch && matchesLanguage;
    });
  }, [snippets, searchQuery, languageFilter]);

  // const handleToggleBookmark = async (
  //   e: React.MouseEvent,
  //   snippet: Snippet
  // ) => {
  //   e.preventDefault(); // Prevent navigation
  //   setBookmarkingIds((prev) => new Set(prev).add(snippet.id.toString()));

  //   try {
  //     const response = await fetch("/api/snippets", {
  //       method: "PATCH",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({
  //         id: snippet.id,
  //         isBookmarked: !snippet.isBookmarked,
  //       }),
  //     });

  //     if (!response.ok) {
  //       throw new Error("Failed to update bookmark");
  //     }

  //     toast({
  //       title: snippet.isBookmarked
  //         ? "Removed from bookmarks"
  //         : "Added to bookmarks",
  //       description: snippet.isBookmarked
  //         ? "Snippet removed from your bookmarks"
  //         : "Snippet saved to your bookmarks",
  //       duration: 2000,
  //     });

  //     // Refresh snippets after 2 seconds
  //     setTimeout(() => {
  //       fetchSnippets();
  //     }, 2000);
  //   } catch (error) {
  //     console.error("Error toggling bookmark:", error);
  //     toast({
  //       title: "Error",
  //       description: "Failed to update bookmark status",
  //       variant: "destructive",
  //       duration: 2000,
  //     });
  //   } finally {
  //     setBookmarkingIds((prev) => {
  //       const updated = new Set(prev);
  //       updated.delete(snippet.id.toString());
  //       return updated;
  //     });
  //   }
  // };
  const handleToggleBookmark = async (
    e: React.MouseEvent,
    snippet: Snippet,
  ) => {
    e.preventDefault(); // Prevent navigation since star is inside Link

    try {
      const response = await fetch("/api/snippets", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: snippet.id,
          isBookmarked: !snippet.isBookmarked,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to update bookmark");
      }

      toast({
        title: snippet.isBookmarked
          ? "Removed from bookmarks"
          : "Added to bookmarks",
        description: snippet.isBookmarked
          ? "Snippet removed from your bookmarks"
          : "Snippet saved to your bookmarks",
        duration: 2000,
      });

      // Refresh snippets after 2 seconds
      setTimeout(() => {
        fetchSnippets();
      }, 2000);
    } catch (error) {
      console.error("Error toggling bookmark:", error);
      toast({
        title: "Error",
        description: "Failed to update bookmark status",
        variant: "destructive",
        duration: 2000,
      });
    }
  };

  const toggleViewMode = () => {
    setViewMode((prev) => (prev === "grid" ? "list" : "grid"));
  };

  return (
    <>
      <Header />
      <div className="bg-hero-gradient bg-[#121212] w-full  sm:p-10 p-10">
        <div className="w-full min-h-screen mb-10">
          <div className="max-w-[75rem] mx-auto animate-fade-in">
            <div className="text-center mb-12">
              <h1 className="md:text-5xl text-2xl font-extrabold text-white mt-16">
                Your Collection of Code Snippets{" "}
              </h1>
              <p className="md:text-lg mt-4 text-sm text-white">
                Store, organize and share your code snippets efficiently{" "}
              </p>
            </div>
            <div>
              <h2 className="text-3xl font-semibold text-white mb-5">
                My Snippets
              </h2>
            </div>
            <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
              <SearchAndFilterSection
                searchQuery={searchQuery}
                languageFilter={languageFilter}
                viewMode={viewMode}
                onSearchChange={setSearchQuery}
                onLanguageChange={setLanguageFilter}
                onViewModeToggle={toggleViewMode}
              />
              <Link href="/snippet/new">
                <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold py-3 px-6 rounded-lg transform transition-all duration-200 hover:scale-105 shadow-lg">
                  + New Snippet
                </Button>
              </Link>
            </div>
            <div className="space-y-4">
              <div
                className={
                  viewMode === "grid"
                    ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                    : "flex-row gap-4"
                }
              >
                {loading ? (
                  <Loading />
                ) : snippets.length > 0 ? (
                  filteredSnippets.map((snippet) => (
                    <SnippetCard
                      key={snippet.id}
                      snippet={snippet}
                      viewMode={viewMode}
                    />
                  ))
                ) : (
                  <NoSnippetFound />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
