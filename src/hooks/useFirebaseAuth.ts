"use client";

import { useState, useEffect } from "react";
import { getAuthInstance, isFirebaseInitialized } from "@/lib/firebase-client";
import { onAuthStateChanged, User } from "firebase/auth";

export function useFirebaseAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    // Check if Firebase is initialized
    if (!isFirebaseInitialized()) {
      const authError = new Error("Firebase not initialized");
      console.error("[useFirebaseAuth]", authError.message);
      setError(authError);
      setLoading(false);
      return;
    }

    try {
      const auth = getAuthInstance();
      console.log("[useFirebaseAuth] Auth is ready, subscribing to state changes...");

      const unsubscribe = onAuthStateChanged(
        auth!,
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
    } catch (err) {
      console.error("[useFirebaseAuth] Failed to get auth instance:", err);
      setError(err as Error);
      setLoading(false);
    }
  }, []);

  return { user, loading, error };
}