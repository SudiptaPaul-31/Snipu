"use client";
import { useWallet } from "@/app/providers/wallet-connect-context";
import { useEffect, useState } from "react";

interface BookmarkingBtnProps {
  snippetId: number;
}

export default function BookmarkingBtn({ snippetId }: BookmarkingBtnProps) {
  const [bookmarked, setBookmarked] = useState(false);
  const [loading, setLoading] = useState(false);
  const { address: walletAddress } = useWallet();

  useEffect(() => {
    if (!walletAddress) return;

    const fetchBookmarkStatus = async () => {
      try {
        const res = await fetch(`/api/bookmark/${snippetId}?walletAddress=${walletAddress}`);
        if (!res.ok) throw new Error('Failed to fetch bookmark status');
        const data = await res.json();
        setBookmarked(data.bookmarked);
      } catch (error) {
        console.error("Error fetching bookmark state:", error);
      }
    };

    fetchBookmarkStatus();
  }, [snippetId, walletAddress]);

  const toggleBookmark = async () => {
    if (!walletAddress) {
      console.error("No wallet address connected");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(`/api/bookmark/${snippetId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ walletAddress })
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || 'Failed to toggle bookmark');
      }

      const data = await res.json();
      setBookmarked(data.bookmarked);
    } catch (error) {
      console.error("Error toggling bookmark:", error);
      // Optional: Show error to user
      alert(error.message || "Failed to update bookmark");
    } finally {
      setLoading(false);
    }
  };

  if (!walletAddress) return null;

  return (
    <button
      onClick={toggleBookmark}
      disabled={loading}
      className={`mt-4 px-4 py-2 rounded-sm text-white transition ${
        bookmarked ? "bg-red-500 hover:bg-red-600" : "bg-blue-600 hover:bg-blue-700"
      } disabled:opacity-50`}
    >
      {loading ? "Processing..." : bookmarked ? "Remove Bookmark" : "Bookmark"}
    </button>
  );
}