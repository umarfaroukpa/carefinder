import Head from 'next/head';
import HospitalSearch from './HospitalSearch';
import HospitalList from './HospitalList';
import ShareButton from './ShareButton';
import { useState } from 'react';
import { Hospital } from '../types/Hospital';

export default function Home() {
  const [hospitals, setHospitals] = useState<Hospital[]>([]);

  return (
    <div className="container mx-auto p-4">
      <Head>
        <title>Carefinder - Find Hospitals in Nigeria</title>
        <meta name="description" content="Search and find hospitals across Nigeria" />
      </Head>

      <h1 className="text-3xl mb-4">Carefinder</h1>
      <HospitalSearch onSearch={setHospitals} />
      <HospitalList hospitals={hospitals} />
      {hospitals.length > 0 && <ShareButton hospitals={hospitals} />}
    </div>
  );
}