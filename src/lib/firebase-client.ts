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

// Initialize only in browser environment
function initializeFirebase() {
  if (typeof window === "undefined") {
    return {
      app: undefined,
      auth: undefined,
      db: undefined,
      storage: undefined,
    };
  }

  try {
    const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
    const auth = getAuth(app);
    const db = getFirestore(app);
    let storage: FirebaseStorage | undefined;

    try {
      storage = getStorage(app);
    } catch (error) {
      console.warn("[Firebase Client] Storage not available");
    }

    console.log("[Firebase Client] Initialized successfully");
    return { app, auth, db, storage };
  } catch (error) {
    console.error("[Firebase Client] Initialization failed:", error);
    return {
      app: undefined,
      auth: undefined,
      db: undefined,
      storage: undefined,
    };
  }
}

const { app, auth, db, storage } = initializeFirebase();

export { app, auth, db, storage };