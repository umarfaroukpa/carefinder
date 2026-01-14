"use client";

import { useState, useEffect } from "react";
import { auth } from "@/lib/firebase-client";
import { onAuthStateChanged, User } from "firebase/auth";

export function useFirebaseAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    // Guard clause: if auth isn't initialized (server-side or error), bail out
    if (!auth) {
      const authError = new Error("Firebase Auth not initialized");
      console.error("[useFirebaseAuth]", authError.message);
      setError(authError);
      setLoading(false);
      return;
    }

    console.log("[useFirebaseAuth] Auth is ready, subscribing to state changes...");

    const unsubscribe = onAuthStateChanged(
      auth,
      (firebaseUser) => {
        console.log("[useFirebaseAuth] User state changed:", firebaseUser ? "logged in" : "logged out");
        setUser(firebaseUser);
        setLoading(false);
        setError(null);
      },
      (err) => {
        console.error("[useFirebaseAuth] Auth error:", err);
        setError(err);
        setLoading(false);
      }
    );

    return () => {
      console.log("[useFirebaseAuth] Cleaning up auth listener");
      unsubscribe();
    };
  }, []); // Empty deps - auth is stable

  return { user, loading, error };
}