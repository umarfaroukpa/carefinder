"use client";

import Link from "next/link";

export const dynamic = 'force-dynamic';

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <h1 className="text-6xl font-bold">404</h1>
      <p className="text-xl mt-4">Oops! Page not found</p>
      <Link href="/" className="mt-8 text-blue-600 hover:underline">
        ← Back to Home
      </Link>
    </div>
  );
}