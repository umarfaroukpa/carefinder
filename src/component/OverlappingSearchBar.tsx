// components/FloatingActionBar.tsx
"use client";

import React from "react";
import { FaPlay, FaUserMd, FaExclamationTriangle, FaSearch } from "react-icons/fa";
import Link from "next/link";
import { useAuth } from "../component/auth/AuthContext";
import ProtectedAction from "../component/auth/ProtectedAction";

interface FloatingActionBarProps {
  onSearch?: (term: string) => Promise<void>;
}

const FloatingActionBar = ({ onSearch }: FloatingActionBarProps) => {
  const { currentUser, loading } = useAuth();

  if (loading) {
    return null;
  }

  const handleSearchClick = () => {
    if (onSearch) {
      onSearch("example location");
    }
  };

  return (
    <div className="hidden md:block absolute -bottom-28 left-1/2 transform -translate-x-1/2 w-full max-w-screen-xl px-4 z-20">
      <div className="bg-[#056968] rounded-full shadow-lg flex justify-around items-center py-4 px-6">
        {currentUser ? (
          <ProtectedAction href="/useraccount" requiredRole="user">
            <button
              className="flex flex-col items-center cursor-pointer text-[#edb13b] hover:text-white transition-colors duration-300 transform hover:-translate-y-1"
              aria-label="Go to My Account"
            >
              <FaPlay size={20} aria-hidden="true" />
              <span className="text-xs mt-1">My Account</span>
            </button>
          </ProtectedAction>
        ) : (
          <Link href="/authpage">
            <button
              className="flex flex-col items-center cursor-pointer text-[#edb13b] hover:text-white transition-colors duration-300 transform hover:-translate-y-1"
              aria-label="Get Started"
            >
              <FaPlay size={20} aria-hidden="true" />
              <span className="text-xs mt-1">Get Started</span>
            </button>
          </Link>
        )}

        <ProtectedAction href="/bookingServices" requiredRole="user">
          <button
            className="flex flex-col items-center cursor-pointer text-[#edb13b] hover:text-white transition-colors duration-300 transform hover:-translate-y-1"
            aria-label="Find Doctors"
          >
            <FaUserMd size={20} aria-hidden="true" />
            <span className="text-xs mt-1">Find Doctors</span>
          </button>
        </ProtectedAction>

        <ProtectedAction href="/emergencyServices" requiredRole="user">
          <button
            className="flex flex-col items-center cursor-pointer text-[#edb13b] hover:text-white transition-colors duration-300 transform hover:-translate-y-1"
            aria-label="Emergency Services"
          >
            <FaExclamationTriangle size={20} aria-hidden="true" />
            <span className="text-xs mt-1">Emergency</span>
          </button>
        </ProtectedAction>

        {onSearch && (
          <ProtectedAction onClick={handleSearchClick}>
            <button
              className="flex flex-col items-center cursor-pointer text-[#edb13b] hover:text-white transition-colors duration-300 transform hover:-translate-y-1"
              aria-label="Search Hospitals"
            >
              <FaSearch size={20} aria-hidden="true" />
              <span className="text-xs mt-1">Search</span>
            </button>
          </ProtectedAction>
        )}
      </div>
    </div>
  );
};

export default FloatingActionBar;