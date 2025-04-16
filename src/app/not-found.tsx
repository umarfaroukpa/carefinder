"use client";

import React from 'react';
import Link from 'next/link';
import { FaArrowLeft, FaHome, FaSearch } from 'react-icons/fa';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center items-center pt-24 px-4">
      <div className="max-w-lg w-full text-center">
        <div className="mb-8">
          <svg className="mx-auto h-24 w-24 text-[#056968]" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 8V12M12 16H12.01M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z"
              stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>

        <h1 className="text-6xl font-bold text-[#056968]">404</h1>
        <h2 className="mt-3 text-2xl font-semibold text-[#056968]">Page not found</h2>
        <p className="mt-4 text-[#056968]">
          Sorry, the page you are looking for does not exist or has been moved.
        </p>

        <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4">
          <button
            onClick={() => window.history.back()}
            className="flex items-center justify-center gap-2 px-6 py-3 bg-white border border-[#056968] text-[#056968] rounded-full hover:bg-gray-50 transition-all"
          >
            <FaArrowLeft size={16} />
            <span>Go Back</span>
          </button>

          <Link href="/">
            <button className="flex items-center justify-center gap-2 px-6 py-3 bg-[#056968] text-white rounded-full hover:bg-[#045756] transition-all">
              <FaHome size={16} />
              <span>Home Page</span>
            </button>
          </Link>
        </div>

        <div className="mt-8 max-w-md mx-auto">
          <div className="relative">
            <input
              type="text"
              placeholder="Search for services..."
              className="w-full px-4 py-3 pl-12 bg-white border border-[#056968] rounded-full focus:outline-none focus:ring-2 focus:ring-[#edb13b] focus:border-transparent"
            />
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center">
              <FaSearch className="text-[#056968]" />
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-200">
          <p className="text-[#056968]">
            Need immediate assistance? <Link href="/contact" className="text-[#edb13b] hover:underline">Contact our support team</Link>
          </p>
        </div>
      </div>
    </div>
  );
}