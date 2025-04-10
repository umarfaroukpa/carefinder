"use client";

import React, { useState, useMemo, Suspense } from 'react';
import { Clock, Home, MapPin, Phone, Search, Shield, Users, Heart, Activity, Star } from 'lucide-react';
import ProtectedRoute from '../../component/auth/ProtectedRoute';

// Interfaces remain the same
interface ServiceType {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
}

interface CareProvider {
  id: string;
  name: string;
  type: string;
  services: string[];
  rating: number;
  reviews: number;
  address: string;
  phone: string;
  hours: string;
  insurance: string[];
  specialFeatures: string[];
}

interface Facility {
  id: string;
  name: string;
  type: 'nursing' | 'assisted' | 'independent' | 'memory';
  image: string;
  address: string;
  phone: string;
  rating: number;
  reviews: number;
  pricing: string;
  amenities: string[];
  medicalServices: string[];
  availability: boolean;
}

const SeniorCare = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [selectedView, setSelectedView] = useState<'providers' | 'facilities'>('providers');
  const [showInsuranceFilter, setShowInsuranceFilter] = useState(false);
  const [selectedInsurance, setSelectedInsurance] = useState<string[]>([]);

  const serviceTypes: ServiceType[] = [
    // ... unchanged
    {
      id: 'home',
      name: 'In-Home Care',
      description: 'Professional caregivers providing assistance with daily activities in the comfort of one\'s home.',
      icon: <Home className="h-8 w-8 text-green-500" />
    },
    {
      id: 'medical',
      name: 'Medical Care',
      description: 'Specialized healthcare services including medication management, skilled nursing, and therapy services.',
      icon: <Activity className="h-8 w-8 text-red-500" />
    },
    {
      id: 'memory',
      name: 'Memory Care',
      description: 'Specialized care for seniors with Alzheimer\'s, dementia and other memory conditions.',
      icon: <Heart className="h-8 w-8 text-purple-500" />
    },
    {
      id: 'residential',
      name: 'Residential Care',
      description: 'Full-time residential facilities offering varying levels of assistance and medical care.',
      icon: <Users className="h-8 w-8 text-blue-500" />
    }
  ];

  const insuranceOptions = [
    'Medicare', 'Medicaid', 'Blue Cross Blue Shield',
    'Aetna', 'UnitedHealthcare', 'Humana', 'Kaiser Permanente'
  ];

  const careProviders: CareProvider[] = [
    // ... unchanged
    {
      id: 'p1',
      name: 'Golden Years Home Care',
      type: 'home',
      services: ['Personal care', 'Medication management', 'Light housekeeping', 'Transportation'],
      rating: 4.8,
      reviews: 156,
      address: '123 Elder Care Lane, Suite 101',
      phone: '(555) 123-4567',
      hours: 'Available 24/7',
      insurance: ['Medicare', 'Medicaid', 'Blue Cross Blue Shield', 'Aetna'],
      specialFeatures: ['Multilingual caregivers', 'Specialty trained in dementia care']
    },
    // ... other providers
  ];

  const facilities: Facility[] = [
    {
      id: 'f1',
      name: 'Sunset Gardens Assisted Living',
      type: 'assisted',
      image: 'https://placehold.co/400x300', // Fixed placeholder
      address: '100 Comfort Lane',
      phone: '(555) 222-3333',
      rating: 4.5,
      reviews: 87,
      pricing: '$3,500 - $5,200/month',
      amenities: ['Private apartments', 'Restaurant-style dining', 'Gardens', 'Social activities', 'Transportation services'],
      medicalServices: ['24/7 staff', 'Medication management', 'Physical therapy'],
      availability: true
    },
    {
      id: 'f2',
      name: 'Tranquil Pines Nursing Home',
      type: 'nursing',
      image: 'https://placehold.co/400x300',
      address: '200 Care Boulevard',
      phone: '(555) 333-4444',
      rating: 4.3,
      reviews: 62,
      pricing: '$6,800 - $9,500/month',
      amenities: ['Semi-private rooms', 'Dining hall', 'Common areas', 'Garden access'],
      medicalServices: ['24/7 nursing care', 'Physician visits', 'Rehabilitation services', 'Specialized care programs'],
      availability: false
    },
    // ... other facilities with updated image URLs
  ];

  const handleInsuranceChange = (insurance: string) => {
    setSelectedInsurance(prev =>
      prev.includes(insurance) ? prev.filter(i => i !== insurance) : [...prev, insurance]
    );
  };

  const filteredProviders = useMemo(() => {
    return careProviders.filter(provider => {
      const matchesSearch =
        searchQuery === '' ||
        provider.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        provider.services.some(service => service.toLowerCase().includes(searchQuery.toLowerCase()));
      const matchesType = selectedType === null || provider.type === selectedType;
      const matchesInsurance =
        selectedInsurance.length === 0 ||
        selectedInsurance.some(insurance => provider.insurance.includes(insurance));
      return matchesSearch && matchesType && matchesInsurance;
    });
  }, [searchQuery, selectedType, selectedInsurance]);

  const filteredFacilities = useMemo(() => {
    return facilities.filter(facility => {
      const matchesSearch =
        searchQuery === '' ||
        facility.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        facility.amenities.some(amenity => amenity.toLowerCase().includes(searchQuery.toLowerCase())) ||
        facility.medicalServices.some(service => service.toLowerCase().includes(searchQuery.toLowerCase()));
      const matchesType =
        selectedType === null ||
        (selectedType === 'residential' && ['nursing', 'assisted', 'independent'].includes(facility.type)) ||
        (selectedType === facility.type);
      return matchesSearch && matchesType;
    });
  }, [searchQuery, selectedType]);

  const handleContactProvider = (providerId: string) => {
    alert(`Contact request sent to provider ID: ${providerId}. They will reach out to schedule a consultation.`);
  };

  const handleScheduleTour = (facilityId: string) => {
    alert(`Tour request sent to facility ID: ${facilityId}. They will contact you to arrange a convenient time.`);
  };

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gradient-to-br bg-gray-200 p-6 pt-24">
        <div className="max-w-6xl mx-auto">
          <header className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-bold text-[#056968] mb-4">Senior Care Services</h1>
            <p className="text-[#056968] max-w-2xl mx-auto">
              Compassionate care services designed to support seniors' health, independence, and quality of life.
              Find the right care options for your loved ones.
            </p>
          </header>

          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <div className="flex flex-col md:flex-row items-center gap-4">
              <div className="relative flex-1 w-full">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#056968]" size={20} />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  placeholder="Search by name, service, or amenity..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#edb138]"
                />
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => setSelectedView('providers')}
                  className={`px-4 py-2 rounded-md ${selectedView === 'providers' ? 'bg-[#056968] text-white' : 'bg-gray-200 text-gray-700'} hover:bg-amber-600 hover:text-white transition`}
                >
                  Providers
                </button>
                <button
                  onClick={() => setSelectedView('facilities')}
                  className={`px-4 py-2 rounded-md ${selectedView === 'facilities' ? 'bg-[#056968] text-white' : 'bg-gray-200 text-gray-700'} hover:bg-amber-600 hover:text-white transition`}
                >
                  Facilities
                </button>
              </div>
              <button
                onClick={() => setShowInsuranceFilter(!showInsuranceFilter)}
                className="px-4 py-2 bg-gray-200 text-[#056968] rounded-md hover:bg-gray-300 transition flex items-center"
              >
                <Shield className="w-5 h-5 mr-2" />
                Insurance
              </button>
            </div>
            {showInsuranceFilter && (
              <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-2">
                {insuranceOptions.map(insurance => (
                  <label key={insurance} className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={selectedInsurance.includes(insurance)}
                      onChange={() => handleInsuranceChange(insurance)}
                      className="h-4 w-4 text-amber-500 focus:ring-amber-500"
                    />
                    <span className="text-gray-700">{insurance}</span>
                  </label>
                ))}
              </div>
            )}
          </div>

          <div className="mb-12">
            <h2 className="text-2xl font-semibold text-[#056968] mb-6">Explore Care Options</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {serviceTypes.map(type => (
                <div
                  key={type.id}
                  onClick={() => setSelectedType(type.id === selectedType ? null : type.id)}
                  className={`bg-white p-6 rounded-lg shadow-md cursor-pointer hover:shadow-lg transition ${selectedType === type.id ? 'border-2 border-amber-500' : 'border border-gray-200'}`}
                >
                  <div className="flex items-center gap-4">
                    {type.icon}
                    <div>
                      <h3 className="text-lg font-bold text-[#056968]">{type.name}</h3>
                      <p className="text-[#056968] text-sm">{type.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <Suspense fallback={<div className="text-center text-[#056968]">Loading {selectedView}...</div>}>
            <div>
              <h2 className="text-2xl font-semibold text-[#056968] mb-6">
                {selectedView === 'providers' ? 'Care Providers' : 'Care Facilities'}
              </h2>
              {selectedView === 'providers' ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredProviders.length > 0 ? (
                    filteredProviders.map(provider => (
                      <div
                        key={provider.id}
                        className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition"
                      >
                        <h3 className="text-xl font-semibold text-[#056968] mb-2">{provider.name}</h3>
                        <p className="text-[#056968] flex items-center gap-2 mb-1">
                          <MapPin className="h-5 w-5 text-[#edb138]" /> {provider.address}
                        </p>
                        <p className="text-[#056968] flex items-center gap-2 mb-1">
                          <Phone className="h-5 w-5 text-[#edb138]" /> {provider.phone}
                        </p>
                        <p className="text-[#056968] flex items-center gap-2 mb-1">
                          <Clock className="h-5 w-5 text-[#edb138]" /> {provider.hours}
                        </p>
                        <p className="text-[#056968] flex items-center gap-2 mb-2">
                          <Star className="h-5 w-5 text-[#edb138]" /> {provider.rating} ({provider.reviews} reviews)
                        </p>
                        <p className="text-[#056968] font-medium">Services:</p>
                        <ul className="list-disc pl-5 text-[#056968] mb-2">
                          {provider.services.map(service => (
                            <li key={service}>{service}</li>
                          ))}
                        </ul>
                        <p className="text-[#056968] font-medium">Special Features:</p>
                        <ul className="list-disc pl-5 text-[#056968] mb-4">
                          {provider.specialFeatures.map(feature => (
                            <li key={feature}>{feature}</li>
                          ))}
                        </ul>
                        <button
                          onClick={() => handleContactProvider(provider.id)}
                          className="w-full bg-[#edb138] text-white py-2 rounded-md hover:bg-amber-600 transition"
                        >
                          Contact Provider
                        </button>
                      </div>
                    ))
                  ) : (
                    <p className="text-[#056968] text-center col-span-full">No providers match your criteria.</p>
                  )}
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredFacilities.length > 0 ? (
                    filteredFacilities.map(facility => (
                      <div
                        key={facility.id}
                        className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition"
                      >
                        <img
                          src={facility.image}
                          alt={facility.name}
                          className="w-full h-48 object-cover rounded-t-md mb-4"
                        />
                        <h3 className="text-xl font-semibold text-[#056968] mb-2">{facility.name}</h3>
                        <p className="text-[#056968] flex items-center gap-2 mb-1">
                          <MapPin className="h-5 w-5 text-[#edb138]" /> {facility.address}
                        </p>
                        <p className="text-[#056968] flex items-center gap-2 mb-1">
                          <Phone className="h-5 w-5 text-[#edb138]" /> {facility.phone}
                        </p>
                        <p className="text-[#056968] flex items-center gap-2 mb-1">
                          <Star className="h-5 w-5 text-[#edb138]" /> {facility.rating} ({facility.reviews} reviews)
                        </p>
                        <p className="text-[#056968] mb-2">
                          <span className="font-medium">Pricing:</span> {facility.pricing}
                        </p>
                        <p className="text-[#056968] font-medium">Amenities:</p>
                        <ul className="list-disc pl-5 text-[#056968] mb-2">
                          {facility.amenities.slice(0, 3).map(amenity => (
                            <li key={amenity}>{amenity}</li>
                          ))}
                          {facility.amenities.length > 3 && <li>...and more</li>}
                        </ul>
                        <p className="text-[#056968] font-medium">Medical Services:</p>
                        <ul className="list-disc pl-5 text-[#056968] mb-4">
                          {facility.medicalServices.slice(0, 3).map(service => (
                            <li key={service}>{service}</li>
                          ))}
                          {facility.medicalServices.length > 3 && <li>...and more</li>}
                        </ul>
                        <p className="text-[#056968] mb-4">
                          <span className="font-medium">Availability:</span>{' '}
                          <span className={facility.availability ? 'text-[#056968]' : 'text-[#edb138]'}>
                            {facility.availability ? 'Yes' : 'No'}
                          </span>
                        </p>
                        <button
                          onClick={() => handleScheduleTour(facility.id)}
                          className="w-full bg-[#056968] text-white py-2 rounded-md hover:bg-[#edb138] transition"
                        >
                          Schedule a Tour
                        </button>
                      </div>
                    ))
                  ) : (
                    <p className="text-[#056968] text-center col-span-full">No facilities match your criteria.</p>
                  )}
                </div>
              )}
            </div>
          </Suspense>
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default SeniorCare;