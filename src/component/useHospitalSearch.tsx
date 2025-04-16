"use client";
import { useState } from "react";
import axios from "axios";
import { Hospital } from "../types/Hospital";

// Interface for raw API response data
interface RawHospital {
  id: string;
  name: string;
  address?: string;
  city?: string;
  region?: string;
  phone?: string;
  email?: string | string[];
  specializations?: string[];
  description?: string;
  coordinates?: [number, number];
  functionalStatus?: string;
  isExternal?: boolean;
  location?: string;
}

export function useHospitalSearch() {
  const [results, setResults] = useState<Hospital[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const searchHospitals = async (searchTerm: string, searchType: string, limit?: number) => {
    if (!searchTerm) {
      setResults([]);
      return [];
    }

    setIsLoading(true);
    setError(null);

    try {
      const response = await axios.get("/api/hospitals", {
        params: { searchTerm, searchType, limit },
      });

      const formattedResults = response.data.map((h: RawHospital) => ({
        id: h.id,
        name: h.name,
        address: h.address || `${h.city || "Unknown"}, ${h.region || "Unknown"}`,
        location: h.location || [h.city, h.region].filter(Boolean).join(", ") || h.address,
        city: h.city,
        region: h.region,
        phone: h.phone,
        contactNumber: h.phone,
        email: h.email ? (Array.isArray(h.email) ? h.email : [h.email]) : undefined,
        specializations: h.specializations,
        description: h.description,
        coordinates: h.coordinates,
        functionalStatus: h.functionalStatus,
        isExternal: h.isExternal,
      }));

      setResults(formattedResults);
      setIsLoading(false);
      return formattedResults;
    } catch (error) {
      console.error("Search error:", error);
      setError("Failed to fetch hospitals. Please try again.");
      setResults([]);
      setIsLoading(false);
      return [];
    }
  };

  return {
    results,
    isLoading,
    error,
    searchHospitals,
  };
}