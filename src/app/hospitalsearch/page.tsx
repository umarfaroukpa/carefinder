'use client';
import React, { useState, useCallback } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import axios from 'axios';
import { Hospital } from '../../types/Hospital';
import { MapPin, Search, Filter, Loader2, X, Share2, Download } from 'lucide-react';
import debounce from 'debounce';
import HospitalList from '../../component/HospitalList';
import ProtectedRoute from '../../component/auth/ProtectedRoute';

const schema = yup.object({
  searchTerm: yup.string().required('Location is required'),
  searchType: yup.string().oneOf(['location']).default('location'),
});

type FormData = yup.InferType<typeof schema>;

interface HospitalSearchProps {
  onSearch: (hospitals: Hospital[]) => void;
}

export default function HospitalSearch({ onSearch }: HospitalSearchProps) {
  const [isAdvancedSearch, setIsAdvancedSearch] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchResults, setSearchResults] = useState<Hospital[]>([]);

  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
    defaultValues: { searchTerm: '', searchType: 'location' },
  });

  const searchType = watch('searchType');

  const getPlaceholder = () => 'Enter city or region';

  const debouncedSearch = useCallback(
    debounce(async (term: string) => {
      if (!term) return;
      try {
        setIsLoading(true);
        setErrorMessage(null);
        const response = await axios.get('/api/hospitals', {
          params: { searchTerm: term, searchType: 'location' },
        });
        handleSearchResults(response.data);
      } catch (error) {
        console.error('Search failed:', error);
        setErrorMessage('Failed to fetch hospitals. Please try again.');
      } finally {
        setIsLoading(false);
      }
    }, 500),
    [onSearch]
  );

  const onSubmit = async (data: FormData) => {
    setIsLoading(true);
    setErrorMessage(null);
    try {
      const response = await axios.get('/api/hospitals', {
        params: { searchTerm: data.searchTerm, searchType: 'location' },
      });
      handleSearchResults(response.data);
    } catch (error) {
      console.error('Search failed:', error);
      setErrorMessage('Failed to fetch hospitals. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearchResults = (hospitals: Hospital[]) => {
    setSearchResults(hospitals);
    if (hospitals.length > 0) {
      setIsModalOpen(true);
      onSearch(hospitals);
    } else {
      setErrorMessage('No hospitals found for this location.');
    }
  };

  const closeModal = () => setIsModalOpen(false);

  const exportToCSV = () => {
    const headers = ['Name,Location,Address,Phone,Specializations'];
    const rows = searchResults.map((h) =>
      `${h.name},${h.location},${h.address},${h.contactNumber || ''},${h.specializations?.join(';') || ''}`
    );
    const csvContent = [headers, ...rows].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'hospitals.csv';
    link.click();
    window.URL.revokeObjectURL(url);
  };

  const shareToSocials = () => {
    const text = `Found ${searchResults.length} hospital(s) near ${searchResults[0]?.location || 'this location'}. Check out Carefinder!`;
    const url = window.location.href;
    if (navigator.share) {
      navigator.share({ title: 'Carefinder Hospitals', text, url });
    } else {
      alert(`Share this: ${text} ${url}`);
    }
  };

  const toggleAdvancedSearch = () => setIsAdvancedSearch((prev) => !prev);

  return (
    <ProtectedRoute>
      <div className="w-full max-w-2xl mx-auto min-h-[calc(100vh-12rem)] pt-16 flex flex-col justify-center">
        <h2 className="text-3xl text-[#056968] font-bold text-center ">Find Health Care Provider Near You</h2>
        <p className="text-center text-[#056968] mb-8">Search for hospitals, clinics, and healthcare providers in your area.</p>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="bg-white shadow-lg rounded-xl p-6 space-y-6 transition-all duration-300 ease-in-out"
        >
          <div className="flex items-center space-x-4">
            <div className="relative flex-grow">
              <input
                {...register('searchTerm')}
                placeholder={getPlaceholder()}
                className="w-full border border-gray-300 p-3 pl-12 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#056968] focus:border-transparent transition duration-200"
                onChange={(e) => {
                  register('searchTerm').onChange(e);
                  debouncedSearch(e.target.value);
                }}
              />
              <Search
                className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500"
                size={20}
              />
            </div>
            <button
              type="button"
              onClick={toggleAdvancedSearch}
              className="p-3 bg-gray-100 rounded-lg hover:bg-gray-200 text-[#056968] transition duration-200"
              aria-label="Toggle advanced search"
            >
              <Filter size={20} />
            </button>
          </div>

          {errors.searchTerm && (
            <p className="text-red-600 text-sm font-medium animate-fade-in">
              {errors.searchTerm.message}
            </p>
          )}
          {errorMessage && (
            <p className="text-red-600 text-sm font-medium animate-fade-in">{errorMessage}</p>
          )}

          {isAdvancedSearch && (
            <div className="grid grid-cols-1 gap-4 animate-slide-down">
              <div>
                <label className=" platforms-semibold text-gray-700 mb-2">
                  Search By Location
                </label>
                <Controller
                  name="searchType"
                  control={control}
                  render={({ field }) => (
                    <select
                      {...field}
                      className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#056968] focus:border-transparent transition duration-200"
                      disabled
                    >
                      <option value="location">Location</option>
                    </select>
                  )}
                />
              </div>
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-[#edb138] cursor-pointer  text-white p-3 rounded-lg hover:bg-[#edb13b] hover:text-[#056968] disabled:bg-gray-400 disabled:text-gray-700 transition duration-300 flex items-center justify-center"
              >
                {isLoading ? (
                  <Loader2 className="animate-spin mr-2" size={20} />
                ) : (
                  <MapPin className="mr-2" size={20} />
                )}
                {isLoading ? 'Searching...' : 'Find Hospitals'}
              </button>
            </div>
          )}

          {!isAdvancedSearch && (
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-[#edb138] cursor-pointer  text-white p-3 rounded-lg hover:bg-[#edb13b] hover:text-[#056968] disabled:bg-gray-400 disabled:text-gray-700 transition duration-300 flex items-center justify-center"
            >
              {isLoading ? (
                <Loader2 className="animate-spin mr-2" size={20} />
              ) : (
                <MapPin className="mr-2" size={20} />
              )}
              {isLoading ? 'Searching...' : 'Find Hospitals'}
            </button>
          )}
        </form>

        {/* Modal for Search Results */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 transition-opacity duration-300">
            <div className="bg-white rounded-xl p-6 w-full max-w-4xl max-h-[85vh] overflow-y-auto relative shadow-2xl animate-slide-up">
              <button
                onClick={closeModal}
                className="absolute top-4 right-4 text-gray-600 hover:text-[#056968] transition duration-200"
                aria-label="Close modal"
              >
                <X size={24} />
              </button>
              <h2 className="text-2xl md:text-3xl font-bold text-[#056968] mb-6">
                Search Results
              </h2>
              <HospitalList hospitals={searchResults} />
              <div className="mt-6 flex flex-col sm:flex-row sm:space-x-4 space-y-4 sm:space-y-0">
                <button
                  onClick={exportToCSV}
                  className="flex items-center justify-center bg-[#056968] text-white px-4 py-2 rounded-lg hover:bg-[#edb13b] hover:text-[#056968] transition duration-300"
                >
                  <Download className="mr-2" size={20} />
                  Export as CSV
                </button>
                <button
                  onClick={shareToSocials}
                  className="flex items-center justify-center bg-[#056968] text-white px-4 py-2 rounded-lg hover:bg-[#edb13b] hover:text-[#056968] transition duration-300"
                >
                  <Share2 className="mr-2" size={20} />
                  Share
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </ProtectedRoute>
  );
}