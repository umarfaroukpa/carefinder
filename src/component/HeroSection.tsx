// components/Hero.tsx
"use client";

import React, { useRef, useEffect, useState, useCallback } from "react";
import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useAuth } from "../component/auth/AuthContext";
import * as Dialog from "@radix-ui/react-dialog";
import { FaTimes, FaPlusCircle } from "react-icons/fa";
import HospitalList from "../component/HospitalList";
import { useHospitalSearch } from "../component/useHospitalSearch";
import ProtectedAction from "../component/auth/ProtectedAction";
import { Hospital } from "../types/Hospital";
import toast from "react-hot-toast"; // Add toast import

export default function Hero() {
  const { currentUser, loading } = useAuth();
  const router = useRouter();
  const containerRef = useRef(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [searchType, setSearchType] = useState<"location" | "name" | "specialization">("location");
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [lastSearch, setLastSearch] = useState<{ term: string; type: string } | null>(null);
  const [showAddHospitalPrompt, setShowAddHospitalPrompt] = useState<boolean>(false);
  const [results, setResults] = useState<Hospital[]>([]);

  const { isLoading, error, searchHospitals } = useHospitalSearch();

  const windowWidth = typeof window !== "undefined" ? window.innerWidth : 0;
  const windowHeight = typeof window !== "undefined" ? window.innerHeight : 0;

  const springConfig = { stiffness: 100, damping: 30 };
  const transformX = useSpring(useTransform(mouseX, [0, windowWidth || 1000], [-10, 10]), springConfig);
  const transformY = useSpring(useTransform(mouseY, [0, windowHeight || 1000], [-10, 10]), springConfig);

  const handleMouseMove = (event: React.MouseEvent) => {
    if (containerRef.current) {
      const rect = (containerRef.current as HTMLElement).getBoundingClientRect();
      mouseX.set(event.clientX - rect.left);
      mouseY.set(event.clientY - rect.top);
    }
  };

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const isMobile = window.innerWidth < 768;
    if (mediaQuery.matches || isMobile) {
      mouseX.set(0);
      mouseY.set(0);
    }

    const handleResize = () => {
      if (window.innerWidth < 768) {
        mouseX.set(0);
        mouseY.set(0);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [mouseX, mouseY]);

  useEffect(() => {
    if (!isModalOpen) {
      setSearchTerm("");
      setLastSearch(null);
      setShowAddHospitalPrompt(false);
      setResults([]);
    }
  }, [isModalOpen]);

  const handleSearch = useCallback(() => {
    if (
      searchTerm.trim() &&
      isModalOpen &&
      (lastSearch?.term !== searchTerm || lastSearch?.type !== searchType)
    ) {
      console.log("Searching:", { searchTerm, searchType, lastSearch });
      searchHospitals(searchTerm, searchType, 5).then((hospitals) => {
        console.log("Search results:", hospitals);
        setResults(hospitals);
        setLastSearch({ term: searchTerm, type: searchType });
        const hasExternalResults = hospitals.some((h: Hospital) => h.isExternal);
        setShowAddHospitalPrompt(hasExternalResults);
      });
    }
  }, [searchTerm, searchType, isModalOpen, searchHospitals, lastSearch]);

  useEffect(() => {
    const debounce = setTimeout(() => {
      handleSearch();
    }, 300);
    return () => clearTimeout(debounce);
  }, [handleSearch]);

  const handleViewAll = () => {
    if (searchTerm) {
      console.log("Navigating to:", `/hospitalsearch?term=${encodeURIComponent(searchTerm)}&type=${searchType}`);
      router.push(`/hospitalsearch?term=${encodeURIComponent(searchTerm)}&type=${searchType}`);
    }
    setIsModalOpen(false);
  };

  const clearSearch = () => {
    setSearchTerm("");
    setLastSearch(null);
    setShowAddHospitalPrompt(false);
    setResults([]);
  };

  const navigateToAddHospital = () => {
    router.push(`/admin?searchTerm=${encodeURIComponent(searchTerm)}`);
    setIsModalOpen(false);
  };

  const handleHospitalAdded = (updatedHospital: Hospital) => {
    console.log("Updating hospital:", updatedHospital);
    setResults((prev) =>
      prev.map((h) => (h.id === updatedHospital.id ? { ...h, isExternal: false } : h))
    );
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <motion.header
      ref={containerRef}
      onMouseMove={handleMouseMove}
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="w-full min-h-[80vh] sm:min-h-screen bg-gradient-to-br from-[#056968] via-[#04807D] to-[#02A69A] py-12 sm:py-20 overflow-hidden relative"
    >
      <motion.div
        style={{ x: transformX.get() * -1, y: transformY.get() * -1 }}
        className="absolute left-16 top-1/2 transform -translate-y-1/2 -translate-x-1/2 z-0 hidden md:block"
      >
        <Image src="/hook.png" alt="Left Chain Hook" width={300} height={280} priority className="opacity-20" />
      </motion.div>

      <motion.div
        style={{ x: transformX, y: transformY }}
        className="absolute right-16 top-1/2 transform -translate-y-1/2 translate-x-1/2 z-0 hidden md:block"
      >
        <Image src="/hook.png" alt="Right Chain Hook" width={300} height={280} priority className="opacity-20 rotate-180" />
      </motion.div>

      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 0.15, scale: 1 }}
          transition={{ duration: 1 }}
          className="absolute -top-1/4 -right-1/4 w-[400px] h-[400px] sm:w-[600px] sm:h-[600px] bg-[#02A69A] rounded-full blur-3xl"
        />
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 0.15, scale: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="absolute -bottom-1/4 -left-1/4 w-[300px] h-[300px] sm:w-[500px] sm:h-[500px] bg-[#04807D] rounded-full blur-3xl"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 max-w-7xl mx-auto px-4 sm:px-4 relative z-10">
        <motion.div variants={itemVariants} className="flex flex-col justify-center text-center md:text-left">
          <motion.h1
            variants={itemVariants}
            className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight leading-tight"
          >
            Find Healthcare Near You
          </motion.h1>
          <motion.p
            variants={itemVariants}
            className="text-base sm:text-lg md:text-xl text-white/90 mb-6 sm:mb-8 max-w-md mx-auto md:mx-0"
          >
            Carefinder helps you locate, book, and share hospital information across Nigeria.
          </motion.p>
          <div className="flex flex-col sm:flex-row gap-4 mx-auto md:mx-0">
            <Dialog.Root open={isModalOpen} onOpenChange={setIsModalOpen}>
              <ProtectedAction
                onClick={(e) => {
                  if (!currentUser) {
                    e.preventDefault();
                    toast.error("Please log in to find providers");
                    router.push("/authpage");
                  }
                  // Dialog.Trigger will handle opening the dialog for logged-in users
                }}
              >
                <Dialog.Trigger asChild>
                  <motion.button
                    variants={itemVariants}
                    aria-label="Find hospitals with Carefinder"
                    className="inline-block bg-[#edb13b] text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg hover:bg-[#f1c35e] transition-colors duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 whitespace-nowrap"
                  >
                    Find Providers
                  </motion.button>
                </Dialog.Trigger>
              </ProtectedAction>
              <Dialog.Portal>
                <Dialog.Overlay className="fixed inset-0 bg-[#056968] bg-opacity-50 z-40" />
                <Dialog.Content className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg shadow-xl p-6 w-full max-w-3xl z-50 max-h-[80vh] overflow-y-auto">
                  <Dialog.Title className="text-xl font-semibold text-[#056968] mb-4">
                    Find Hospitals
                  </Dialog.Title>
                  <div className="flex items-center space-x-2 mb-6">
                    <select
                      value={searchType}
                      onChange={(e) => setSearchType(e.target.value as typeof searchType)}
                      className="p-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#056968] text-black"
                    >
                      <option value="location">City/Region</option>
                      <option value="name">Hospital Name</option>
                      <option value="specialization">Specialization</option>
                    </select>
                    <input
                      type="text"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      placeholder={`Search by ${searchType}`}
                      className="flex-1 p-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#056968] text-black"
                    />
                    <ProtectedAction onClick={clearSearch}>
                      <button className="text-[#edb138] hover:text-[#056968]">
                        <FaTimes size={16} />
                      </button>
                    </ProtectedAction>
                    <ProtectedAction onClick={handleSearch}>
                      <button
                        className="bg-[#056968] text-white p-2 rounded-lg hover:bg-[#edb138]"
                        disabled={isLoading || !searchTerm.trim()}
                      >
                        Search
                      </button>
                    </ProtectedAction>
                  </div>

                  {showAddHospitalPrompt && (
                    <div className="bg-blue-50 border-l-4 border-[#edb138] p-4 mb-6 rounded">
                      <div className="flex">
                        <div className="flex-shrink-0">
                          <FaPlusCircle className="h-5 w-5 text-[#edb138]" />
                        </div>
                        <div className="ml-3">
                          <p className="text-sm text-[#056968]">
                            Some results may not be in our database or no results were found. Would you like to add a new healthcare provider?
                          </p>
                          <div className="mt-2">
                            <ProtectedAction requiredRole="admin" onClick={navigateToAddHospital}>
                              <button className="bg-[#056968] hover:bg-[#edb138] text-white text-sm px-3 py-1 rounded transition-colors">
                                Add Provider
                              </button>
                            </ProtectedAction>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {isLoading ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {Array(3).fill(0).map((_, idx) => (
                        <div key={idx} className="bg-white rounded-lg shadow-md p-6 animate-pulse">
                          <div className="h-6 bg-gray-200 rounded mb-2"></div>
                          <div className="h-4 bg-gray-200 rounded mb-1"></div>
                          <div className="h-4 bg-gray-200 rounded"></div>
                        </div>
                      ))}
                    </div>
                  ) : error ? (
                    <p className="text-red-500 text-center">{error}</p>
                  ) : results.length > 0 ? (
                    <HospitalList hospitals={results} onHospitalAdded={handleHospitalAdded} />
                  ) : (
                    searchTerm && <p className="text-gray-500 text-center">No hospitals found.</p>
                  )}
                  <div className="mt-6 flex justify-between">
                    <ProtectedAction onClick={handleViewAll}>
                      <button className="bg-[#edb138] text-white p-2 rounded-lg hover:bg-[#056968]">
                        View All Results
                      </button>
                    </ProtectedAction>
                    <Dialog.Close asChild>
                      <ProtectedAction>
                        <button className="text-gray-500 hover:text-[#056968]">
                          Close
                        </button>
                      </ProtectedAction>
                    </Dialog.Close>
                  </div>
                </Dialog.Content>
              </Dialog.Portal>
            </Dialog.Root>
          </div>
        </motion.div>

        <motion.div variants={itemVariants} className="flex items-center justify-center mt-20 md:mt-0">
          <Image
            src="/bgs.png"
            alt="Healthcare Illustration"
            width={320}
            height={160}
            priority
            className="object-contain w-full max-w-[320px] sm:max-w-[400px]"
          />
        </motion.div>
      </div>
    </motion.header>
  );
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { delayChildren: 0.2, staggerChildren: 0.1 } },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 100 } },
};