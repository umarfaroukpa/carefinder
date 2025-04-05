"use client";

import React, { useState } from 'react';
import { Calendar, Clock, FileText, Home, MapPin, Phone, Search, Shield, Users, Heart, Clipboard, Activity, Star } from 'lucide-react';

// Senior care service type interface
interface ServiceType {
    id: string;
    name: string;
    description: string;
    icon: React.ReactNode;
}

// Senior care provider interface
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

// Senior care facility interface
interface Facility {
    id: string;
    name: string;
    type: 'nursing' | 'assisted' | 'independent' | 'memory';
    image: string; // URL or placeholder
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

    // Service types
    const serviceTypes: ServiceType[] = [
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

    // Insurance options
    const insuranceOptions = [
        'Medicare', 'Medicaid', 'Blue Cross Blue Shield',
        'Aetna', 'UnitedHealthcare', 'Humana', 'Kaiser Permanente'
    ];

    // Sample providers (replace with API data in production)
    const careProviders: CareProvider[] = [
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
        {
            id: 'p2',
            name: 'Senior Wellness Medical Group',
            type: 'medical',
            services: ['Primary care', 'Medication review', 'Chronic disease management', 'Telehealth'],
            rating: 4.7,
            reviews: 89,
            address: '456 Health Boulevard',
            phone: '(555) 234-5678',
            hours: 'Mon-Fri: 8am-5pm',
            insurance: ['Medicare', 'Medicaid', 'UnitedHealthcare', 'Humana'],
            specialFeatures: ['House calls available', 'Geriatric specialists']
        },
        {
            id: 'p3',
            name: 'Gentle Hands Memory Support',
            type: 'memory',
            services: ['Memory care', 'Cognitive therapy', 'Structured activities', 'Family support'],
            rating: 4.9,
            reviews: 74,
            address: '789 Remembrance Way',
            phone: '(555) 345-6789',
            hours: 'Mon-Sun: 7am-8pm',
            insurance: ['Medicare', 'Blue Cross Blue Shield', 'Kaiser Permanente'],
            specialFeatures: ['Dementia-certified staff', 'Secure environment']
        },
        {
            id: 'p4',
            name: 'Reliable Senior Transport',
            type: 'home',
            services: ['Medical appointments', 'Errand assistance', 'Social outings', 'Airport transfers'],
            rating: 4.6,
            reviews: 112,
            address: '321 Mobility Drive',
            phone: '(555) 456-7890',
            hours: 'Mon-Sat: 6am-10pm',
            insurance: ['Medicare Advantage plans only'],
            specialFeatures: ['Wheelchair accessible vehicles', 'Trained senior companions']
        }
    ];

    // Sample facilities (replace with API data in production)
    const facilities: Facility[] = [
        {
            id: 'f1',
            name: 'Sunset Gardens Assisted Living',
            type: 'assisted',
            image: '/api/placeholder/400/300',
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
            image: '/api/placeholder/400/300',
            address: '200 Care Boulevard',
            phone: '(555) 333-4444',
            rating: 4.3,
            reviews: 62,
            pricing: '$6,800 - $9,500/month',
            amenities: ['Semi-private rooms', 'Dining hall', 'Common areas', 'Garden access'],
            medicalServices: ['24/7 nursing care', 'Physician visits', 'Rehabilitation services', 'Specialized care programs'],
            availability: false
        },
        {
            id: 'f3',
            name: 'Heritage Village Independent Living',
            type: 'independent',
            image: '/api/placeholder/400/300',
            address: '300 Liberty Avenue',
            phone: '(555) 444-5555',
            rating: 4.8,
            reviews: 124,
            pricing: '$2,800 - $4,200/month',
            amenities: ['Full apartments', 'Fitness center', 'Pool', 'Library', 'Dining options', 'Social events'],
            medicalServices: ['Emergency call system', 'Optional care packages', 'Wellness programs'],
            availability: true
        },
        {
            id: 'f4',
            name: 'Serenity Memory Care Center',
            type: 'memory',
            image: '/api/placeholder/400/300',
            address: '400 Peaceful Path',
            phone: '(555) 555-6666',
            rating: 4.7,
            reviews: 91,
            pricing: '$7,200 - $9,800/month',
            amenities: ['Secure living environment', 'Memory gardens', 'Adaptive dining', 'Sensory rooms'],
            medicalServices: ['Specialized memory care staff', 'Behavior management', 'Health monitoring', 'Therapy services'],
            availability: true
        },
        {
            id: 'f5',
            name: 'Golden Oaks Continuing Care',
            type: 'nursing',
            image: '/api/placeholder/400/300',
            address: '500 Wellness Way',
            phone: '(555) 666-7777',
            rating: 4.4,
            reviews: 78,
            pricing: '$5,500 - $12,000/month',
            amenities: ['Multiple room options', 'Multiple dining venues', 'Recreational areas', 'Chapel', 'Beauty salon'],
            medicalServices: ['Progressive care levels', 'Rehabilitation center', 'Memory care unit', 'Palliative care'],
            availability: true
        }
    ];

    // Handle insurance checkbox changes
    const handleInsuranceChange = (insurance: string) => {
        setSelectedInsurance(prev =>
            prev.includes(insurance) ? prev.filter(i => i !== insurance) : [...prev, insurance]
        );
    };

    // Filter providers based on search, type, and insurance
    const filteredProviders = careProviders.filter(provider => {
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

    // Filter facilities based on search and type
    const filteredFacilities = facilities.filter(facility => {
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

    const handleContactProvider = (providerId: string) => {
        alert(`Contact request sent to provider ID: ${providerId}. They will reach out to schedule a consultation.`);
    };

    const handleScheduleTour = (facilityId: string) => {
        alert(`Tour request sent to facility ID: ${facilityId}. They will contact you to arrange a convenient time.`);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-100 p-6 pt-24">
            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <header className="text-center mb-12">
                    <h1 className="text-3xl md:text-4xl font-bold text-amber-800 mb-4">Senior Care Services</h1>
                    <p className="text-gray-600 max-w-2xl mx-auto">
                        Compassionate care services designed to support seniors' health, independence, and quality of life.
                        Find the right care options for your loved ones.
                    </p>
                </header>

                {/* Search and Filters */}
                <div className="bg-white rounded-lg shadow-md p-6 mb-8">
                    <div className="flex flex-col md:flex-row items-center gap-4">
                        {/* Search Bar */}
                        <div className="relative flex-1 w-full">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={e => setSearchQuery(e.target.value)}
                                placeholder="Search by name, service, or amenity..."
                                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
                            />
                        </div>

                        {/* View Toggle */}
                        <div className="flex gap-2">
                            <button
                                onClick={() => setSelectedView('providers')}
                                className={`px-4 py-2 rounded-md ${selectedView === 'providers' ? 'bg-amber-500 text-white' : 'bg-gray-200 text-gray-700'} hover:bg-amber-600 hover:text-white transition`}
                            >
                                Providers
                            </button>
                            <button
                                onClick={() => setSelectedView('facilities')}
                                className={`px-4 py-2 rounded-md ${selectedView === 'facilities' ? 'bg-amber-500 text-white' : 'bg-gray-200 text-gray-700'} hover:bg-amber-600 hover:text-white transition`}
                            >
                                Facilities
                            </button>
                        </div>

                        {/* Insurance Filter Toggle */}
                        <button
                            onClick={() => setShowInsuranceFilter(!showInsuranceFilter)}
                            className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition flex items-center"
                        >
                            <Shield className="w-5 h-5 mr-2" />
                            Insurance
                        </button>
                    </div>

                    {/* Insurance Filter Dropdown */}
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

                {/* Service Types */}
                <div className="mb-12">
                    <h2 className="text-2xl font-semibold text-amber-800 mb-6">Explore Care Options</h2>
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
                                        <h3 className="text-lg font-semibold text-gray-800">{type.name}</h3>
                                        <p className="text-gray-600 text-sm">{type.description}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Results */}
                <div>
                    <h2 className="text-2xl font-semibold text-amber-800 mb-6">
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
                                        <h3 className="text-xl font-semibold text-gray-800 mb-2">{provider.name}</h3>
                                        <p className="text-gray-600 flex items-center gap-2 mb-1">
                                            <MapPin className="h-5 w-5" /> {provider.address}
                                        </p>
                                        <p className="text-gray-600 flex items-center gap-2 mb-1">
                                            <Phone className="h-5 w-5" /> {provider.phone}
                                        </p>
                                        <p className="text-gray-600 flex items-center gap-2 mb-1">
                                            <Clock className="h-5 w-5" /> {provider.hours}
                                        </p>
                                        <p className="text-gray-600 flex items-center gap-2 mb-2">
                                            <Star className="h-5 w-5 text-yellow-500" /> {provider.rating} ({provider.reviews} reviews)
                                        </p>
                                        <p className="text-gray-700 font-medium">Services:</p>
                                        <ul className="list-disc pl-5 text-gray-600 mb-2">
                                            {provider.services.map(service => (
                                                <li key={service}>{service}</li>
                                            ))}
                                        </ul>
                                        <p className="text-gray-700 font-medium">Special Features:</p>
                                        <ul className="list-disc pl-5 text-gray-600 mb-4">
                                            {provider.specialFeatures.map(feature => (
                                                <li key={feature}>{feature}</li>
                                            ))}
                                        </ul>
                                        <button
                                            onClick={() => handleContactProvider(provider.id)}
                                            className="w-full bg-amber-500 text-white py-2 rounded-md hover:bg-amber-600 transition"
                                        >
                                            Contact Provider
                                        </button>
                                    </div>
                                ))
                            ) : (
                                <p className="text-gray-600 text-center col-span-full">No providers match your criteria.</p>
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
                                        <h3 className="text-xl font-semibold text-gray-800 mb-2">{facility.name}</h3>
                                        <p className="text-gray-600 flex items-center gap-2 mb-1">
                                            <MapPin className="h-5 w-5" /> {facility.address}
                                        </p>
                                        <p className="text-gray-600 flex items-center gap-2 mb-1">
                                            <Phone className="h-5 w-5" /> {facility.phone}
                                        </p>
                                        <p className="text-gray-600 flex items-center gap-2 mb-1">
                                            <Star className="h-5 w-5 text-yellow-500" /> {facility.rating} ({facility.reviews} reviews)
                                        </p>
                                        <p className="text-gray-600 mb-2">
                                            <span className="font-medium">Pricing:</span> {facility.pricing}
                                        </p>
                                        <p className="text-gray-700 font-medium">Amenities:</p>
                                        <ul className="list-disc pl-5 text-gray-600 mb-2">
                                            {facility.amenities.slice(0, 3).map(amenity => (
                                                <li key={amenity}>{amenity}</li>
                                            ))}
                                            {facility.amenities.length > 3 && <li>...and more</li>}
                                        </ul>
                                        <p className="text-gray-700 font-medium">Medical Services:</p>
                                        <ul className="list-disc pl-5 text-gray-600 mb-4">
                                            {facility.medicalServices.slice(0, 3).map(service => (
                                                <li key={service}>{service}</li>
                                            ))}
                                            {facility.medicalServices.length > 3 && <li>...and more</li>}
                                        </ul>
                                        <p className="text-gray-600 mb-4">
                                            <span className="font-medium">Availability:</span>{' '}
                                            <span className={facility.availability ? 'text-green-500' : 'text-red-500'}>
                                                {facility.availability ? 'Yes' : 'No'}
                                            </span>
                                        </p>
                                        <button
                                            onClick={() => handleScheduleTour(facility.id)}
                                            className="w-full bg-amber-500 text-white py-2 rounded-md hover:bg-amber-600 transition"
                                        >
                                            Schedule a Tour
                                        </button>
                                    </div>
                                ))
                            ) : (
                                <p className="text-gray-600 text-center col-span-full">No facilities match your criteria.</p>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default SeniorCare;