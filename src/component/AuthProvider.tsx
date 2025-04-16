// src/component/AuthProvider.tsx
"use client";
import { useState, useEffect } from "react";
import { auth } from "../lib/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import Header from "./Header";
import Footer from "./Footer";

export default function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, loading, error] = useAuthState(auth);
  const [mounted, setMounted] = useState(false);
  const [isTimedOut, setIsTimedOut] = useState(false);

  // Handle hydration
  useEffect(() => {
    setMounted(true);
  }, []);

  // Debug auth state
  useEffect(() => {
    console.log("AuthProvider state:", { user: !!user, loading, error, mounted, isTimedOut });
  }, [user, loading, error, mounted, isTimedOut]);

  // Timeout for loading
  useEffect(() => {
    if (loading && mounted && !isTimedOut) {
      const timer = setTimeout(() => {
        console.warn("Auth loading timed out");
        setIsTimedOut(true);
      }, 10000); // Increased to 10 seconds
      return () => clearTimeout(timer);
    }
  }, [loading, mounted, isTimedOut]);

  // Initialize Firebase auth persistence (optional, if needed)
  useEffect(() => {
    import("firebase/auth")
      .then(({ setPersistence, browserLocalPersistence }) => {
        setPersistence(auth, browserLocalPersistence).catch((err) =>
          console.error("Persistence error:", err)
        );
      })
      .catch((err) => console.error("Import error:", err));
  }, []);

  if (!mounted) {
    return null; // Prevent SSR mismatch
  }

  if (loading && !isTimedOut) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-white bg-opacity-75">
        <div className="text-center">
          <p className="text-xl font-semibold text-[#056968] animate-pulse">
            Loading Please Wait........
          </p>
        </div>
      </div>
    );
  }

  if (error || isTimedOut) {
    console.error("AuthProvider error:", error?.message || "Loading timed out");
    return (
      <div className="flex items-center justify-center min-h-screen p-4">
        <div className="text-center">
          <p className="text-red-500 mb-4">
            {error
              ? "Authentication error: " + error.message
              : "Authentication timed out. Please check your network or Firebase settings."}
          </p>
          <button
            onClick={() => window.location.reload()}
            className="bg-[#056968] text-white px-4 py-2 rounded-lg hover:bg-[#edb13b]"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      <Header />
      <main className="pt-24">{children}</main>
      <Footer />
    </>
  );
}