"use client";
import { useEffect, useState } from "react";

interface BookmarkingBtnProps {
  snippetId: number;
}

export default function BookmarkingBtn({ snippetId }: BookmarkingBtnProps) {
  const [isBookmarked, setIsBookmarked] = useState(false);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("bookmarks") || "[]");
    setIsBookmarked(stored.includes(snippetId));
  }, [snippetId]);

  const toggleBookmark = () => {
    const stored = JSON.parse(localStorage.getItem("bookmarks") || "[]");

    let updated;
    if (stored.includes(snippetId)) {
      updated = stored.filter((id: number) => id !== snippetId);
    } else {
      updated = [...stored, snippetId];
    }

    localStorage.setItem("bookmarks", JSON.stringify(updated));
    setIsBookmarked(!isBookmarked);
  };

  return (
    <button
      className={`mt-4 px-4 py-2 rounded-sm text-white transition ${
        isBookmarked ? "bg-red-500" : "bg-blue-600"
      }`}
      onClick={toggleBookmark}
    >
      {isBookmarked ? "Remove Bookmark" : "Bookmark"}
    </button>
  );
}
