// pages/index.tsx
"use client";

import { useState } from 'react';
import { Hospital } from '../types/Hospital';
import HospitalSearch from './hospitalsearch/page';
import HospitalList from '../component/HospitalList';
import ShareButton from '../component/ShareButton';
import Hero from '../component/HeroSection';
import HowItWorks from '../component/HowItworks';
import Features from '../component/Features';
import Testimonials from '../component/Testimonials';
import UserSatisfaction from '../component/satisfaction';
import FloatingActionBar from '../component/OverlappingSearchBar';
import NaturalMedicineSection from '../component/Natural';

export default function Home() {
  const [hospitals, setHospitals] = useState<Hospital[]>([]);
  const [showResults, setShowResults] = useState(false);

  const handleSearch = (results: Hospital[]) => {
    setHospitals(results);
    setShowResults(true);

    if (typeof window !== 'undefined' && results.length > 0) {
      document.getElementById('results-section')?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <main className="bg-gray-100">
      <Hero />
      <HowItWorks />
      <NaturalMedicineSection />
      <Features />
      <section className="container mx-auto p-4">
        <HospitalSearch onSearch={handleSearch} />
      </section>
      {showResults && (
        <section id="results-section" className="container -pt-24 mx-auto p-4 py-8 bg-gray-50">
          <HospitalList hospitals={hospitals} />
          {hospitals.length > 0 && <ShareButton hospitals={hospitals} />}
        </section>
      )}
      <FloatingActionBar />
      <UserSatisfaction />
      <Testimonials />
    </main>
  );
}