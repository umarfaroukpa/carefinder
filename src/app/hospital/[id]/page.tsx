import React from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { MapPin, Phone, Mail, ArrowLeft } from 'lucide-react';

// Define the hospital type interface
interface Hospital {
  sno: number;
  name: string;
  location: string | null;
  phone: string | string[] | null;
  email: string | null;
}

// Combined hospital data
const hospitals: Hospital[] = [
  {
    sno: 1,
    name: 'Jos University Teaching Hospital',
    location: 'Jos',
    phone: '07-3454376',
    email: 'juth-info@yahoo.com',
  },
  // The rest of your hospital data would be here
];

// Function to handle array phone numbers
const getPhoneDisplay = (phone: string | string[] | null): string | null => {
  if (!phone) return null;
  return Array.isArray(phone) ? phone[0] : phone;
};

// Use proper Next.js page props typing
interface HospitalDetailPageProps {
  params: Promise<{ id: string }>; // Use Promise for dynamic params
}

export default async function HospitalDetailPage({ params }: HospitalDetailPageProps) {
  const resolvedParams = await params; // Await the params Promise
  const hospitalId = parseInt(resolvedParams.id);

  // Find the hospital by ID
  const hospital = hospitals.find((h) => h.sno === hospitalId);

  // If hospital not found, show 404 page
  if (!hospital) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Link href="/providers" className="inline-flex items-center text-[#056968] hover:text-[#edb138] mb-6">
        <ArrowLeft className="h-4 w-4 mr-1" />
        Back to all hospitals
      </Link>

      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="bg-[#edb138] h-2 w-full"></div>
        <div className="p-6">
          <h1 className="text-2xl font-bold text-[#056968] mb-4">{hospital.name}</h1>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h2 className="text-lg font-semibold text-[#056968] border-b pb-2">Contact Information</h2>

              {hospital.location && (
                <div className="flex items-start">
                  <MapPin className="h-5 w-5 mr-2 text-[#edb138] flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium text-[#056968]">Location</p>
                    <p className="text-[#056968]">{hospital.location}</p>
                  </div>
                </div>
              )}

              {hospital.phone && (
                <div className="flex items-start">
                  <Phone className="h-5 w-5 mr-2 text-[#056968] flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium text-[#056968]">Phone</p>
                    <p className="text-[#056968]">{getPhoneDisplay(hospital.phone)}</p>
                  </div>
                </div>
              )}

              {hospital.email && (
                <div className="flex items-start">
                  <Mail className="h-5 w-5 mr-2 text-blue-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium text-[#056968]">Email</p>
                    <a href={`mailto:${hospital.email}`} className="text-[#edb138] hover:underline">
                      {hospital.email}
                    </a>
                  </div>
                </div>
              )}
            </div>

            <div className="bg-gray-50 p-4 rounded-lg">
              <h2 className="text-lg font-semibold text-[#056968] mb-3">Hospital ID</h2>
              <p className="text-xl font-bold text-[#056968]">{hospital.sno}</p>
              <p className="text-[#056968] text-sm mt-1">Reference number</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Generate static params for all hospitals at build time
export async function generateStaticParams() {
  return hospitals.map((hospital) => ({
    id: hospital.sno.toString(),
  }));
}