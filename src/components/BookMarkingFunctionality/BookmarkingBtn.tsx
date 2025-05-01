"use client"
import { useWallet } from "@/app/providers/wallet-connect-context";
import { useEffect, useState } from "react";
import { getLocalBookmarks, saveLocalBookmark, syncBookmarksWithServer } from "../../lib/bookmarkUtils";

interface BookmarkingBtnProps {
  snippetId: number;
}

export default function BookmarkingBtn({ snippetId }: BookmarkingBtnProps) {
  const [bookmarked, setBookmarked] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { address: walletAddress } = useWallet();

  useEffect(() => {
    if (!walletAddress) return;

    // Check localStorage first
    const localBookmarks = getLocalBookmarks();
    setBookmarked(localBookmarks.includes(snippetId));

    // Then sync with server
    const fetchBookmarkStatus = async () => {
      try {
        const res = await fetch(`/api/bookmark/${snippetId}?walletAddress=${walletAddress}`);
        if (!res.ok) {
          const errorData = await res.json();
          throw new Error(errorData.error || 'Failed to fetch bookmark status');
        }
        const data = await res.json();
        setBookmarked(data.bookmarked);
        // Update localStorage if server state differs
        if (data.bookmarked !== localBookmarks.includes(snippetId)) {
          saveLocalBookmark(snippetId, data.bookmarked);
        }
      } catch (error) {
        console.error("Error fetching bookmark state:", error);
        setError("Failed to fetch bookmark status");
      }
    };

    fetchBookmarkStatus();
  }, [snippetId, walletAddress]);

  const toggleBookmark = async () => {
    if (!walletAddress) {
      setError("Please connect your wallet");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // Update localStorage first for immediate feedback
      const newBookmarked = !bookmarked;
      saveLocalBookmark(snippetId, newBookmarked);
      setBookmarked(newBookmarked);

      // Then sync with server
      const res = await fetch(`/api/bookmark/${snippetId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          walletAddress
        })
      });

      let data;
      try {
        data = await res.json();
      } catch (e) {
        throw new Error('Invalid response from server');
      }

      if (!res.ok) {
        throw new Error(data?.error || 'Failed to toggle bookmark');
      }

      // If server state differs from what we expected, revert local changes
      if (data.bookmarked !== newBookmarked) {
        saveLocalBookmark(snippetId, data.bookmarked);
        setBookmarked(data.bookmarked);
      }
    } catch (error) {
      console.error("Error toggling bookmark:", error);
      setError(error instanceof Error ? error.message : "Failed to update bookmark");
      // Revert local changes on error
      saveLocalBookmark(snippetId, bookmarked);
      setBookmarked(bookmarked);
    } finally {
      setLoading(false);
    }
  };

  if (!walletAddress) return null;

  return (
    <div className="mt-4">
      <button
        onClick={toggleBookmark}
        disabled={loading}
        className={`px-4 py-2 rounded-sm text-white transition ${bookmarked ? "bg-red-500 hover:bg-red-600" : "bg-blue-600 hover:bg-blue-700"} disabled:opacity-50 w-full`}
      >
        {loading ? "Processing..." : bookmarked ? "Remove Bookmark" : "Bookmark"}
      </button>
      {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
    </div>
  );
}