// components/HospitalSearch.tsx
"use client";

import { useState, useCallback, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Hospital } from "../types/Hospital";
import { MapPin, Search, Filter, Loader2, X, Share2, Download, PlusCircle } from "lucide-react";
import HospitalList from "../component/HospitalList";
import ProtectedRoute from "../component/auth/ProtectedRoute";
import ProtectedAction from "../component/auth/ProtectedAction";
import { useSearchParams, useRouter } from "next/navigation";
import { useHospitalSearch } from "../component/useHospitalSearch";

const schema = yup.object({
  searchTerm: yup.string().required("Search term is required"),
  searchType: yup.string().oneOf(["location", "name", "specialization", "issue"]).default("location"),
});

type FormData = yup.InferType<typeof schema>;

interface HospitalSearchProps {
  onSearch: (hospitals: Hospital[]) => void;
}

export default function HospitalSearch({ onSearch }: HospitalSearchProps) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const initialTerm = searchParams.get("term") || "";
  const initialType = (searchParams.get("type") as "location" | "name" | "specialization" | "issue" | undefined) || "location";

  const [isAdvancedSearch, setIsAdvancedSearch] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchResults, setSearchResults] = useState<Hospital[]>([]);
  const [showAddHospitalPrompt, setShowAddHospitalPrompt] = useState(false);
  const [lastSearchTerm, setLastSearchTerm] = useState("");

  const { isLoading, searchHospitals } = useHospitalSearch();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    setValue,
    watch,
  } = useForm<FormData>({
    resolver: yupResolver(schema),
    defaultValues: { searchTerm: initialTerm, searchType: initialType },
  });

  const searchType = watch("searchType");

  const getPlaceholder = () => {
    switch (searchType) {
      case "name":
        return "Enter hospital name";
      case "specialization":
        return "Enter medical specialization";
      case "issue":
        return "Enter medical issue";
      case "location":
      default:
        return "Enter city or region";
    }
  };

  const handleSearchResults = useCallback(
    (hospitals: Hospital[], searchTerm: string) => {
      console.log("Handling search results:", hospitals);
      setSearchResults(hospitals);
      setLastSearchTerm(searchTerm);
      onSearch(hospitals);

      if (hospitals.length > 0) {
        setIsModalOpen(true);
        const hasExternalResults = hospitals.some((h) => h.isExternal);
        console.log("Has external results:", hasExternalResults);
        setShowAddHospitalPrompt(hasExternalResults);
      } else {
        setErrorMessage("No hospitals found.");
        setShowAddHospitalPrompt(false);
      }
    },
    [onSearch]
  );

  const debouncedSearch = useCallback(
    (term: string, type: string) => {
      if (!term) return;

      const performSearch = async () => {
        try {
          setErrorMessage(null);
          const results = await searchHospitals(term, type);
          handleSearchResults(results, term);
        } catch {
          setErrorMessage("Failed to fetch hospitals. Please try again.");
        }
      };

      const debounceTimer = setTimeout(performSearch, 500);
      return () => clearTimeout(debounceTimer);
    },
    [handleSearchResults, searchHospitals]
  );

  const onSubmit = async (data: FormData) => {
    try {
      setErrorMessage(null);
      const hospitals = await searchHospitals(data.searchTerm, data.searchType);
      handleSearchResults(hospitals, data.searchTerm);
    } catch {
      setErrorMessage("Failed to fetch hospitals. Please try again.");
    }
  };

  useEffect(() => {
    if (initialTerm) {
      setValue("searchTerm", initialTerm);
      debouncedSearch(initialTerm, initialType);
    }
  }, [initialTerm, initialType, setValue, debouncedSearch]);

  const closeModal = () => setIsModalOpen(false);

  const exportToCSV = () => {
    const headers = ["Name,Location,Address,Phone,Specializations"];
    const rows = searchResults.map((h) =>
      `${h.name},${h.location || ""},${h.address || ""},${h.contactNumber || h.phone || ""},${h.specializations?.join(";") || ""}`
    );
    const csvContent = [headers, ...rows].join("\n");
    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "hospitals.csv";
    link.click();
    window.URL.revokeObjectURL(url);
  };

  const shareToSocials = () => {
    const text = `Found ${searchResults.length} hospital(s) near ${searchResults[0]?.location || "this location"}. Check out Carefinder!`;
    const url = window.location.href;
    if (navigator.share) {
      navigator.share({ title: "Carefinder Hospitals", text, url });
    } else {
      alert(`Share this: ${text} ${url}`);
    }
  };

  const navigateToAddHospital = () => {
    router.push(`/admin?searchTerm=${encodeURIComponent(lastSearchTerm)}`);
    closeModal();
  };

  const handleHospitalAdded = (updatedHospital: Hospital) => {
    setSearchResults((prev) => prev.map((h) => (h.id === updatedHospital.id ? updatedHospital : h)));
  };

  const toggleAdvancedSearch = () => setIsAdvancedSearch((prev) => !prev);

  return (
    <ProtectedRoute requiredRole="user" redirectTo="/authpage">
      <div className="w-full max-w-2xl mx-auto min-h-[calc(100vh-12rem)] pt-16 flex flex-col justify-center">
        <h2 className="text-3xl text-[#056968] font-bold text-center">Find Health Care Provider Near You</h2>
        <p className="text-center text-[#056968] mb-8">Search for hospitals, clinics, and healthcare providers in your area.</p>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="bg-white shadow-lg rounded-xl p-6 space-y-6 transition-all duration-300 ease-in-out"
        >
          <div className="flex items-center space-x-4">
            <div className="relative flex-grow">
              <input
                {...register("searchTerm")}
                placeholder={getPlaceholder()}
                className="w-full border border-gray-300 p-3 pl-12 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#056968] focus:border-transparent transition duration-200"
                onChange={(e) => {
                  register("searchTerm").onChange(e);
                  const currentType = control._formValues.searchType;
                  debouncedSearch(e.target.value, currentType);
                }}
                aria-invalid={errors.searchTerm ? "true" : "false"}
                aria-describedby={errors.searchTerm ? "searchTerm-error" : undefined}
              />
              <Search
                className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500"
                size={20}
                aria-hidden="true"
              />
            </div>
            <ProtectedAction>
              <button
                type="button"
                onClick={toggleAdvancedSearch}
                className="p-3 bg-gray-100 rounded-lg hover:bg-gray-200 text-[#056968] transition duration-200"
                aria-label="Toggle advanced search"
              >
                <Filter size={20} aria-hidden="true" />
              </button>
            </ProtectedAction>
          </div>

          {errors.searchTerm && (
            <p id="searchTerm-error" className="text-red-600 text-sm font-medium animate-fade-in">
              {errors.searchTerm.message}
            </p>
          )}
          {errorMessage && (
            <p className="text-red-600 text-sm font-medium animate-fade-in">{errorMessage}</p>
          )}

          {isAdvancedSearch && (
            <div className="grid grid-cols-1 gap-4 animate-slide-down">
              <div>
                <label htmlFor="searchType" className="platforms-semibold text-gray-700 mb-2">
                  Search By
                </label>
                <Controller
                  name="searchType"
                  control={control}
                  render={({ field }) => (
                    <select
                      {...field}
                      id="searchType"
                      className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#056968] focus:border-transparent transition duration-200"
                      onChange={(e) => {
                        field.onChange(e);
                        const currentTerm = control._formValues.searchTerm;
                        if (currentTerm) {
                          debouncedSearch(currentTerm, e.target.value);
                        }
                      }}
                    >
                      <option value="location">Location</option>
                      <option value="name">Hospital Name</option>
                      <option value="specialization">Specialization</option>
                      <option value="issue">Medical Issue</option>
                    </select>
                  )}
                />
              </div>
              <ProtectedAction>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-[#edb138] cursor-pointer text-white p-3 rounded-lg hover:bg-[#edb13b] hover:text-[#056968] disabled:bg-gray-400 disabled:text-gray-700 transition duration-300 flex items-center justify-center"
                >
                  {isLoading ? (
                    <Loader2 className="animate-spin mr-2" size={20} aria-hidden="true" />
                  ) : (
                    <MapPin className="mr-2" size={20} aria-hidden="true" />
                  )}
                  {isLoading ? "Searching..." : "Find Hospitals"}
                </button>
              </ProtectedAction>
            </div>
          )}

          {!isAdvancedSearch && (
            <ProtectedAction>
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-[#edb138] cursor-pointer text-white p-3 rounded-lg hover:bg-[#edb13b] hover:text-[#056968] disabled:bg-gray-400 disabled:text-gray-700 transition duration-300 flex items-center justify-center"
              >
                {isLoading ? (
                  <Loader2 className="animate-spin mr-2" size={20} aria-hidden="true" />
                ) : (
                  <MapPin className="mr-2" size={20} aria-hidden="true" />
                )}
                {isLoading ? "Searching..." : "Find Hospitals"}
              </button>
            </ProtectedAction>
          )}
        </form>

        {isModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 transition-opacity duration-300">
            <div className="bg-white rounded-xl p-6 w-full max-w-4xl max-h-[85vh] overflow-y-auto relative shadow-2xl animate-slide-up">
              <ProtectedAction>
                <button
                  onClick={closeModal}
                  className="absolute top-4 right-4 text-[#056968] hover:text-[#056968] transition duration-200"
                  aria-label="Close modal"
                >
                  <X size={24} aria-hidden="true" />
                </button>
              </ProtectedAction>
              <h2 className="text-2xl md:text-3xl font-bold text-[#056968] mb-6">Search Results</h2>

              {showAddHospitalPrompt && (
                <div className="bg-blue-50 border-l-4 border-[#edb138] p-4 mb-6 rounded">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <PlusCircle className="h-5 w-5 text-[#edb138]" aria-hidden="true" />
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

              <HospitalList hospitals={searchResults} onHospitalAdded={handleHospitalAdded} />

              <div className="mt-6 flex flex-col sm:flex-row sm:space-x-4 space-y-4 sm:space-y-0">
                <ProtectedAction>
                  <button
                    onClick={exportToCSV}
                    className="flex items-center justify-center bg-[#056968] text-white px-4 py-2 rounded-lg hover:bg-[#edb13b] hover:text-[#056968] transition duration-300"
                  >
                    <Download className="mr-2" size={20} aria-hidden="true" />
                    Export as CSV
                  </button>
                </ProtectedAction>
                <ProtectedAction>
                  <button
                    onClick={shareToSocials}
                    className="flex items-center justify-center bg-[#056968] text-white px-4 py-2 rounded-lg hover:bg-[#edb13b] hover:text-[#056968] transition duration-300"
                  >
                    <Share2 className="mr-2" size={20} aria-hidden="true" />
                    Share
                  </button>
                </ProtectedAction>
              </div>
            </div>
          </div>
        )}
      </div>
    </ProtectedRoute>
  );
}