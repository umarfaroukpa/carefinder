"use client";

import Head from 'next/head';
import { useState } from 'react';
import { Hospital } from '../types/Hospital';
import HospitalSearch from './component/HospitalSearch';
import HospitalList from './component/HospitalList';
import ShareButton from './component/ShareButton';
import Hero from './component/HeroSection';
import HowItWorks from './component/HowItworks';
import Features from './component/Features';
import Testimonials from './component/Testimonials';
import FloatingActionBar from './component/OverlappingSearchBar';
import NaturalMedicineSection from './component/Natural';


export default function Home() {
  const [hospitals, setHospitals] = useState<Hospital[]>([]);
  const [showResults, setShowResults] = useState(false);

  const handleSearch = (results: Hospital[]) => {
    setHospitals(results);
    setShowResults(true);

    // Scroll to results
    if (results.length > 0) {
      document.getElementById('results-section')?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <main className="bg-gray-100">
      {/* Hero section with search */}
      <Hero />

      <HowItWorks />

      {/* Natural Medicine Network Section */}
      <NaturalMedicineSection />
      <Features />


      {/* Marketing sections */}

      {/* Search section */}
      <section className="container mx-auto p-4 py-12">
        <h2 className="text-3xl font-bold text-center mb-8">Find Healthcare Near You</h2>
        <HospitalSearch onSearch={handleSearch} />
      </section>

      {/* Results section - conditionally rendered */}
      {showResults && (
        <section id="results-section" className="container mx-auto p-4 py-8 bg-gray-50">
          <HospitalList hospitals={hospitals} />
          {hospitals.length > 0 && <ShareButton hospitals={hospitals} />}
        </section>
      )}

      {/* Marketing sections */}
      <FloatingActionBar />


     
      <Testimonials />
    </main>
  );
}