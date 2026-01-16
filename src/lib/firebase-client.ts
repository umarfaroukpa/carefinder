"use client";

import { initializeApp, getApps, getApp, FirebaseApp } from "firebase/app";
import { getAuth, Auth } from "firebase/auth";
import { getFirestore, Firestore } from "firebase/firestore";
import { getStorage, FirebaseStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

// Private variables (can be undefined)
let _app: FirebaseApp | undefined;
let _auth: Auth | undefined;
let _db: Firestore | undefined;
let _storage: FirebaseStorage | undefined;

// Initialize Firebase only in browser
if (typeof window !== "undefined") {
  try {
    _app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
    _auth = getAuth(_app);
    _db = getFirestore(_app);

    try {
      _storage = getStorage(_app);
    } catch (error) {
      console.warn("[Firebase Client] Storage not available");
    }

    console.log("[Firebase Client] Initialized successfully");
  } catch (error) {
    console.error("[Firebase Client] Initialization failed:", error);
  }
}

// Helper function to ensure Firebase is initialized
function ensureInitialized(): void {
  if (typeof window === "undefined") {
    throw new Error("Firebase can only be used in the browser");
  }
  if (!_auth || !_db) {
    throw new Error("Firebase not initialized. Check your configuration.");
  }
}

// Safe getters that throw helpful errors if not initialized
export function getAuthInstance(): Auth {
  if (!_auth) {
    throw new Error("Firebase Auth not initialized. Make sure you're using this in a client component.");
  }
  return _auth;
}

export function getDbInstance(): Firestore {
  if (!_db) {
    throw new Error("Firebase Firestore not initialized. Make sure you're using this in a client component.");
  }
  return _db;
}

export function getStorageInstance(): FirebaseStorage | null {
  return _storage || null;
}

// Export the direct instances for convenience (use with caution)
// These can be undefined, so always check before using
export const app = _app;
export const auth = _auth;
export const db = _db;
export const storage = _storage;

// Export a helper to check if Firebase is ready
export const isFirebaseInitialized = (): boolean => {
  return !!_auth && !!_db;
};