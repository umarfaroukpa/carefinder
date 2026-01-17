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
function initializeFirebase() {
  if (typeof window === "undefined" || _auth) return;
  
  try {
    _app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
    _auth = getAuth(_app);
    _db = getFirestore(_app);

    try {
      _storage = getStorage(_app);
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : "Unknown error";
      console.warn("[Firebase Client] Storage not available:", errorMessage);
    }

    console.log("[Firebase Client] Initialized successfully");
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    console.error("[Firebase Client] Initialization failed:", errorMessage);
  }
}

// Safe getters that return undefined during SSR
export function getAuthInstance(): Auth | undefined {
  if (typeof window === "undefined") return undefined;
  initializeFirebase();
  return _auth;
}

export function getDbInstance(): Firestore | undefined {
  if (typeof window === "undefined") return undefined;
  initializeFirebase();
  return _db;
}

export function getStorageInstance(): FirebaseStorage | null {
  if (typeof window === "undefined") return null;
  initializeFirebase();
  return _storage || null;
}

// Export the direct instances for convenience
export const getFirebaseApp = () => _app;
export const getFirebaseAuth = () => _auth;
export const getDb = () => _db;
export const getFirebaseStorage = () => _storage;


// Export a helper to check if Firebase is ready
export const isFirebaseInitialized = (): boolean => {
  return typeof window !== "undefined" && !!_auth && !!_db;
};