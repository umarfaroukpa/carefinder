"use client";

import React, { useState, useEffect } from 'react';
import { AlertCircle, Phone, MapPin, Clock, Ambulance, Hospital, Shield, Search } from 'lucide-react';

// Emergency service provider interface
interface EmergencyProvider {
    id: string;
    name: string;
    type: 'hospital' | 'clinic' | 'ambulance';
    address: string;
    phone: string;
    hours: string;
    services: string[];
    distance?: number;
    waitTime?: string;
}

const EmergencyServices = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedType, setSelectedType] = useState<string | null>(null);
    const [currentLocation, setCurrentLocation] = useState<{ lat: number, lng: number } | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [emergencyContacting, setEmergencyContacting] = useState(false);

    // Sample emergency service providers (in real app, would come from API/database)
    const providers: EmergencyProvider[] = [
        {
            id: 'h1',
            name: 'City General Hospital',
            type: 'hospital',
            address: '123 Medical Center Blvd, Downtown',
            phone: '911 or (555) 123-4567',
            hours: '24/7 Emergency Service',
            services: ['Emergency Room', 'Trauma Center', 'Cardiac Care', 'Stroke Center'],
            waitTime: '25-40 min',
            distance: 3.2
        },
        {
            id: 'h2',
            name: 'Memorial Hospital',
            type: 'hospital',
            address: '456 Healthcare Ave, Westside',
            phone: '911 or (555) 987-6543',
            hours: '24/7 Emergency Service',
            services: ['Emergency Room', 'Pediatric Emergency', 'Burn Unit'],
            waitTime: '15-20 min',
            distance: 5.7
        },
        {
            id: 'c1',
            name: 'Urgent Care Clinic',
            type: 'clinic',
            address: '789 Quick Help St, Northside',
            phone: '(555) 456-7890',
            hours: 'Mon-Sun: 8am-10pm',
            services: ['Urgent Care', 'Minor Injuries', 'Basic Diagnostics'],
            waitTime: '5-10 min',
            distance: 1.8
        },
        {
            id: 'a1',
            name: 'Rapid Response EMS',
            type: 'ambulance',
            address: 'Serving entire metro area',
            phone: '911 or (555) 911-0000',
            hours: '24/7 Emergency Service',
            services: ['Emergency Transport', 'Advanced Life Support', 'Critical Care'],
            distance: 0 // Mobile service
        },
        {
            id: 'c2',
            name: 'ExpressMed Urgent Care',
            type: 'clinic',
            address: '321 Quick Care Blvd, Eastside',
            phone: '(555) 234-5678',
            hours: 'Mon-Fri: 7am-9pm, Sat-Sun: 8am-6pm',
            services: ['Urgent Care', 'X-Ray', 'Lab Services', 'Minor Procedures'],
            waitTime: '10-15 min',
            distance: 4.3
        }
    ];

    // Request user location (would need permission in real app)
    useEffect(() => {
        setIsLoading(true);
        // Simulating location retrieval
        setTimeout(() => {
            setCurrentLocation({ lat: 40.7128, lng: -74.0060 });
            setIsLoading(false);
        }, 1000);

        // In a real app, you would use:
        // navigator.geolocation.getCurrentPosition(
        //   (position) => {
        //     setCurrentLocation({
        //       lat: position.coords.latitude,
        //       lng: position.coords.longitude
        //     });
        //     setIsLoading(false);
        //   },
        //   (error) => {
        //     console.error(error);
        //     setIsLoading(false);
        //   }
        // );
    }, []);

    // Filter providers based on search and type
    const filteredProviders = providers.filter(provider => {
        const matchesSearch = searchQuery === '' ||
            provider.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            provider.services.some(service => service.toLowerCase().includes(searchQuery.toLowerCase()));

        const matchesType = selectedType === null || provider.type === selectedType;

        return matchesSearch && matchesType;
    });

    // Sort providers by distance
    const sortedProviders = [...filteredProviders].sort((a, b) => (a.distance || 99) - (b.distance || 99));

    const handleEmergencyCall = (phone: string) => {
        setEmergencyContacting(true);

        // In a real app, this would initiate a call
        alert(`Calling emergency number: ${phone}`);

        setTimeout(() => {
            setEmergencyContacting(false);
        }, 1500);
    };

    const getTypeIcon = (type: string) => {
        switch (type) {
            case 'hospital': return <Hospital className="h-6 w-6 text-red-500" />;
            case 'clinic': return <Shield className="h-6 w-6 text-blue-500" />;
            case 'ambulance': return <Ambulance className="h-6 w-6 text-amber-500" />;
            default: return <AlertCircle className="h-6 w-6 text-gray-500" />;
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-red-50 to-rose-100 p-6 pt-24">
            <div className="max-w-6xl mx-auto">
                {/* Emergency Banner */}
                <div className="bg-red-600 text-white p-4 rounded-lg mb-8 shadow-lg">
                    <div className="flex items-center justify-between flex-wrap gap-4">
                        <div className="flex items-center">
                            <AlertCircle className="h-8 w-8 mr-3" strokeWidth={2} />
                            <div>
                                <h2 className="text-xl font-bold">Emergency Services</h2>
                                <p>For life-threatening emergencies, call 911 immediately</p>
                            </div>
                        </div>
                        <button
                            className="bg-white text-red-600 font-bold py-2 px-6 rounded-md flex items-center hover:bg-red-100 transition"
                            onClick={() => handleEmergencyCall('911')}
                            disabled={emergencyContacting}
                        >
                            <Phone className="mr-2 h-5 w-5" />
                            {emergencyContacting ? 'Connecting...' : 'Call 911 Now'}
                        </button>
                    </div>
                </div>

                {/* Search and Filters */}
                <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
                    <div className="grid md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-gray-700 mb-2 flex items-center">
                                <Search className="mr-2 h-4 w-4" /> Find Emergency Services
                            </label>
                            <input
                                type="text"
                                placeholder="Search hospitals, clinics, or services..."
                                className="w-full p-3 border rounded-md"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>
                        <div>
                            <label className="block text-gray-700 mb-2">Service Type</label>
                            <div className="flex flex-wrap gap-2">
                                <button
                                    className={`px-4 py-2 rounded-md flex items-center gap-2 ${selectedType === null ? 'bg-gray-800 text-white' : 'bg-gray-100'}`}
                                    onClick={() => setSelectedType(null)}
                                >
                                    All Services
                                </button>
                                <button
                                    className={`px-4 py-2 rounded-md flex items-center gap-2 ${selectedType === 'hospital' ? 'bg-red-600 text-white' : 'bg-gray-100'}`}
                                    onClick={() => setSelectedType(selectedType === 'hospital' ? null : 'hospital')}
                                >
                                    <Hospital className="h-4 w-4" /> Hospitals
                                </button>
                                <button
                                    className={`px-4 py-2 rounded-md flex items-center gap-2 ${selectedType === 'clinic' ? 'bg-blue-600 text-white' : 'bg-gray-100'}`}
                                    onClick={() => setSelectedType(selectedType === 'clinic' ? null : 'clinic')}
                                >
                                    <Shield className="h-4 w-4" /> Urgent Care
                                </button>
                                <button
                                    className={`px-4 py-2 rounded-md flex items-center gap-2 ${selectedType === 'ambulance' ? 'bg-amber-600 text-white' : 'bg-gray-100'}`}
                                    onClick={() => setSelectedType(selectedType === 'ambulance' ? null : 'ambulance')}
                                >
                                    <Ambulance className="h-4 w-4" /> Ambulance
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Location Status */}
                <div className="bg-white rounded-lg shadow p-4 mb-8 flex items-center">
                    <MapPin className="h-5 w-5 text-gray-500 mr-2" />
                    {isLoading ? (
                        <span className="text-gray-600">Detecting your location...</span>
                    ) : currentLocation ? (
                        <span className="text-gray-600">Showing emergency services near your current location</span>
                    ) : (
                        <span className="text-gray-600">Location access denied. Results may not be sorted by proximity</span>
                    )}
                </div>

                {/* Emergency Service Providers */}
                <div className="space-y-6">
                    {sortedProviders.length === 0 ? (
                        <div className="text-center p-8 bg-white rounded-lg shadow">
                            <p className="text-gray-500">No emergency services match your search criteria.</p>
                        </div>
                    ) : (
                        sortedProviders.map(provider => (
                            <div key={provider.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                                <div className="border-l-4 border-r-0 border-t-0 border-b-0 p-6 grid md:grid-cols-3 gap-6"
                                    style={{
                                        borderColor: provider.type === 'hospital' ? '#ef4444' :
                                            provider.type === 'clinic' ? '#2563eb' : '#f59e0b'
                                    }}
                                >
                                    {/* Provider Info */}
                                    <div className="md:col-span-2">
                                        <div className="flex items-center mb-2">
                                            {getTypeIcon(provider.type)}
                                            <h3 className="text-xl font-bold ml-2">{provider.name}</h3>
                                        </div>

                                        <div className="grid md:grid-cols-2 gap-4 mt-4">
                                            <div className="space-y-2">
                                                <div className="flex items-start text-gray-600">
                                                    <MapPin className="h-4 w-4 mr-2 mt-1 flex-shrink-0" />
                                                    <span>{provider.address}</span>
                                                </div>
                                                <div className="flex items-center text-gray-600">
                                                    <Phone className="h-4 w-4 mr-2 flex-shrink-0" />
                                                    <span>{provider.phone}</span>
                                                </div>
                                                <div className="flex items-center text-gray-600">
                                                    <Clock className="h-4 w-4 mr-2 flex-shrink-0" />
                                                    <span>{provider.hours}</span>
                                                </div>
                                            </div>

                                            <div>
                                                <p className="text-sm text-gray-700 font-medium mb-1">Available Services:</p>
                                                <div className="flex flex-wrap gap-1">
                                                    {provider.services.map((service, index) => (
                                                        <span key={index} className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded">
                                                            {service}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Actions Panel */}
                                    <div className="flex flex-col justify-between border-l border-gray-200 pl-6">
                                        <div>
                                            {provider.distance !== undefined && (
                                                <div className="mb-2">
                                                    <span className="text-sm text-gray-500">Distance:</span>
                                                    <p className="font-semibold">{provider.distance === 0 ? 'Mobile Service' : `${provider.distance} miles away`}</p>
                                                </div>
                                            )}

                                            {provider.waitTime && (
                                                <div className="mb-4">
                                                    <span className="text-sm text-gray-500">Est. Wait Time:</span>
                                                    <p className="font-semibold">{provider.waitTime}</p>
                                                </div>
                                            )}
                                        </div>

                                        <div className="space-y-3">
                                            <button
                                                className="w-full bg-red-600 text-white py-2 rounded-md hover:bg-red-700 transition flex items-center justify-center"
                                                onClick={() => handleEmergencyCall(provider.phone.split(' or ')[0])}
                                            >
                                                <Phone className="mr-2 h-4 w-4" />
                                                Call Now
                                            </button>

                                            <button className="w-full border border-gray-300 py-2 rounded-md hover:bg-gray-50 transition">
                                                Get Directions
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>

                {/* Emergency Tips */}
                <div className="mt-12 bg-white rounded-lg shadow-lg p-6">
                    <h3 className="text-xl font-semibold mb-4">Emergency Preparedness Tips</h3>
                    <div className="grid md:grid-cols-3 gap-6">
                        <div className="bg-red-50 p-4 rounded-md">
                            <h4 className="font-medium mb-2">Know When to Call 911</h4>
                            <ul className="text-sm space-y-1 text-gray-700">
                                <li>• Chest pain or difficulty breathing</li>
                                <li>• Uncontrolled bleeding</li>
                                <li>• Sudden severe pain</li>
                                <li>• Loss of consciousness</li>
                                <li>• Severe burns or injuries</li>
                            </ul>
                        </div>
                        <div className="bg-blue-50 p-4 rounded-md">
                            <h4 className="font-medium mb-2">When to Visit Urgent Care</h4>
                            <ul className="text-sm space-y-1 text-gray-700">
                                <li>• Minor cuts requiring stitches</li>
                                <li>• Sprains and minor fractures</li>
                                <li>• Fever without rash</li>
                                <li>• Minor burns or injuries</li>
                                <li>• Severe cold or flu symptoms</li>
                            </ul>
                        </div>
                        <div className="bg-green-50 p-4 rounded-md">
                            <h4 className="font-medium mb-2">Prepare an Emergency Kit</h4>
                            <ul className="text-sm space-y-1 text-gray-700">
                                <li>• List of emergency contacts</li>
                                <li>• List of current medications</li>
                                <li>• Insurance information</li>
                                <li>• Basic first aid supplies</li>
                                <li>• Personal medical information</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EmergencyServices;