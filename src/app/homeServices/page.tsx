"use client";

import React, { useState } from 'react';
import { Home, Heart, Clock, Phone, MapPin, User, Calendar } from 'lucide-react';
import ProtectedRoute from '../../component/auth/ProtectedAction';

// Home care service types
interface ServiceType {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
}

// Service provider interface
interface Provider {
  id: string;
  name: string;
  services: string[];
  rating: number;
  experience: string;
  location: string;
  availability: string;
  contact: string;
}

const HomeCareServices = () => {
  const [location, setLocation] = useState('');
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const [bookingDate, setBookingDate] = useState('');

  // Service types available
  const serviceTypes: ServiceType[] = [
    {
      id: 'nursing',
      name: 'Nursing Care',
      description: 'Professional nursing services including medication management, wound care, and health monitoring.',
      icon: <Heart className="h-8 w-8 text-rose-500" />
    },
    {
      id: 'personal',
      name: 'Personal Care',
      description: 'Assistance with daily activities like bathing, dressing, mobility support, and meal preparation.',
      icon: <User className="h-8 w-8 text-blue-500" />
    },
    {
      id: '24hour',
      name: '24-Hour Care',
      description: 'Round-the-clock supervision and assistance for those requiring continuous support.',
      icon: <Clock className="h-8 w-8 text-purple-500" />
    },
    {
      id: 'therapy',
      name: 'Therapy Services',
      description: 'Physical, occupational, and speech therapy services provided in the comfort of home.',
      icon: <Home className="h-8 w-8 text-green-500" />
    }
  ];

  // Sample providers (in a real app, these would come from a database)
  const providers: Provider[] = [
    {
      id: 'p1',
      name: 'Compassionate Care Nursing',
      services: ['nursing', 'personal'],
      rating: 4.8,
      experience: '15+ years',
      location: 'Citywide',
      availability: 'Mon-Sun, 24/7',
      contact: '(555) 123-4567'
    },
    {
      id: 'p2',
      name: 'HomeMed Services',
      services: ['nursing', 'therapy', '24hour'],
      rating: 4.7,
      experience: '12 years',
      location: 'North & Central Districts',
      availability: 'Mon-Sat, 6am-10pm',
      contact: '(555) 987-6543'
    },
    {
      id: 'p3',
      name: 'Helping Hands Personal Care',
      services: ['personal', '24hour'],
      rating: 4.9,
      experience: '8 years',
      location: 'All Districts',
      availability: 'Mon-Sun, 24/7',
      contact: '(555) 456-7890'
    },
    {
      id: 'p4',
      name: 'Therapy at Home',
      services: ['therapy'],
      rating: 4.6,
      experience: '10 years',
      location: 'West & South Districts',
      availability: 'Mon-Fri, 8am-6pm',
      contact: '(555) 234-5678'
    }
  ];

  // Filter providers based on selected service
  const filteredProviders = selectedService
    ? providers.filter(provider => provider.services.includes(selectedService))
    : providers;

  const handleBookService = (providerId: string) => {
    if (!bookingDate) {
      alert('Please select a date for your service');
      return;
    }
    alert(`Service booked with provider ID: ${providerId} for ${bookingDate}`);
    // In a real application, this would submit to your backend
  };

  return (
    <ProtectedRoute>

      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6 pt-24">
        <div className="max-w-6xl mx-auto">
          <header className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-bold text-[#056968] mb-4">Home Care Services</h1>
            <p className="text-[#056968] max-w-2xl mx-auto">
              Professional healthcare services delivered in the comfort of your own home.
              Choose from our range of specialized services tailored to your needs.
            </p>
          </header>

          {/* Search and Filter */}
          <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
            <div className="grid md:grid-cols-3 gap-4">
              <div>
                <label className=" text-[#056968] mb-2 flex items-center">
                  <MapPin className="mr-2 h-4 w-4" /> Your Location
                </label>
                <input
                  type="text"
                  placeholder="Enter your city or district"
                  className="w-full p-2 border rounded-md"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                />
              </div>
              <div>
                <label className=" text-[#056968] mb-2 flex items-center">
                  <Heart className="mr-2 h-4 w-4" /> Service Type
                </label>
                <select
                  className="w-full p-2 text-[#056968] border rounded-md"
                  value={selectedService || ''}
                  onChange={(e) => setSelectedService(e.target.value || null)}
                >
                  <option value="">All Services</option>
                  {serviceTypes.map(service => (
                    <option key={service.id} value={service.id}>{service.name}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className=" text-[#056968] mb-2 flex items-center">
                  <Calendar className="mr-2 h-4 w-4" /> Service Date
                </label>
                <input
                  type="date"
                  className="w-full text-[#056968] p-2 border rounded-md"
                  value={bookingDate}
                  onChange={(e) => setBookingDate(e.target.value)}
                />
              </div>
            </div>
          </div>

          {/* Service Types */}
          <div className="mb-12">
            <h2 className="text-2xl font-semibold text-[#056968] mb-6">Our Services</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {serviceTypes.map(service => (
                <div
                  key={service.id}
                  className={`bg-white rounded-lg shadow-md p-6 cursor-pointer transition 
                  ${selectedService === service.id ? 'ring-2 ring-indigo-500' : 'hover:shadow-lg'}`}
                  onClick={() => setSelectedService(service.id === selectedService ? null : service.id)}
                >
                  <div className="flex flex-col items-center text-center">
                    <div className="mb-4">
                      {service.icon}
                    </div>
                    <h3 className="text-lg text-[#056968] font-semibold mb-2">{service.name}</h3>
                    <p className="text-[#056968] text-sm">{service.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Service Providers */}
          <div>
            <h2 className="text-2xl font-semibold text-[#056968] mb-6">Available Care Providers</h2>

            {filteredProviders.length === 0 ? (
              <div className="text-center p-8 bg-white rounded-lg shadow">
                <p className="text-[#056968]">No providers match your criteria. Please try different filters.</p>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 gap-6">
                {filteredProviders.map(provider => (
                  <div key={provider.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                    <div className="p-6">
                      <h3 className="text-xl font-semibold text-[#056968] mb-2">{provider.name}</h3>
                      <div className="flex items-center mb-4">
                        <div className="flex text-yellow-400">
                          {[...Array(5)].map((_, i) => (
                            <svg key={i} className={`w-4 h-4 ${i < Math.floor(provider.rating) ? 'fill-current' : 'stroke-current fill-none'}`} viewBox="0 0 24 24">
                              <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                            </svg>
                          ))}
                        </div>
                        <span className="text-[#056968] ml-2">{provider.rating}</span>
                        <span className="mx-2 text-[#056968]">•</span>
                        <span className="text-[#056968]">{provider.experience}</span>
                      </div>
                      <div className="space-y-2 mb-4">
                        <div className="flex items-center text-[#056968]">
                          <MapPin className="h-4 w-4 mr-2" />
                          <span>{provider.location}</span>
                        </div>
                        <div className="flex items-center text-[#056968]">
                          <Clock className="h-4 w-4 mr-2" />
                          <span>{provider.availability}</span>
                        </div>
                        <div className="flex items-center text-[#056968]">
                          <Phone className="h-4 w-4 mr-2" />
                          <span>{provider.contact}</span>
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {provider.services.map(serviceId => {
                          const service = serviceTypes.find(s => s.id === serviceId);
                          return service ? (
                            <span key={serviceId} className="bg-indigo-100 text-[#056968] text-xs px-2 py-1 rounded">
                              {service.name}
                            </span>
                          ) : null;
                        })}
                      </div>
                      <button
                        className="w-full bg-[#edb138] text-white py-2 rounded-md hover:bg-[#056968] transition"
                        onClick={() => handleBookService(provider.id)}
                      >
                        Book Service
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default HomeCareServices;