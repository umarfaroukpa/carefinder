"use client";

import { useState, useEffect } from "react";
import { Share2 } from "lucide-react";
import { auth } from "@/lib/firebase-client";

export default function ShareButton() {
  const [mounted, setMounted] = useState(false);
  const [canShare, setCanShare] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Check if the browser supports native sharing
    setCanShare(typeof navigator !== "undefined" && !!navigator.share);
  }, []);

  const handleShare = async () => {
    // Check if user is authenticated (only if auth is available)
    if (auth?.currentUser) {
      // User is logged in, proceed
    } else {
      // User not logged in - you might want to handle this differently
      console.log("User not authenticated");
    }

    const shareData = {
      title: "CareFinder",
      text: "Find healthcare providers near you with CareFinder",
      url: window.location.href,
    };

    try {
      if (canShare) {
        await navigator.share(shareData);
      } else {
        // Fallback: copy to clipboard
        await navigator.clipboard.writeText(window.location.href);
        alert("Link copied to clipboard!");
      }
    } catch (error) {
      console.error("Error sharing:", error);
    }
  };

  // Don't render until mounted (prevents hydration errors)
  if (!mounted) return null;

  return (
    <button
      onClick={handleShare}
      className="flex items-center gap-2 px-4 py-2 bg-[#056968] text-white rounded-lg hover:bg-[#edb138] transition-colors"
      aria-label="Share this page"
    >
      <Share2 size={20} />
      Share
    </button>
  );
}