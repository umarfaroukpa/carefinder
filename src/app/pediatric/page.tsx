"use client";

import React, { useState } from 'react';
import { Baby, Calendar, Clock, MapPin, Phone, Star, Search, Filter, Heart, User, BookOpen } from 'lucide-react';
import ProtectedRoute from '../../component/auth/ProtectedRoute';

// Pediatric doctor/specialist interface
interface Doctor {
    id: string;
    name: string;
    specialty: string;
    image: string; // URL or placeholder
    rating: number;
    experience: string;
    education: string;
    languages: string[];
    address: string;
    availability: string[];
    acceptingNewPatients: boolean;
    phone: string;
}

// Types of pediatric care services
interface ServiceType {
    id: string;
    name: string;
    icon: React.ReactNode;
    description: string;
}

const PediatricCare = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedSpecialty, setSelectedSpecialty] = useState<string | null>(null);
    const [appointmentDate, setAppointmentDate] = useState('');
    const [showFilters, setShowFilters] = useState(false);
    const [acceptingNewOnly, setAcceptingNewOnly] = useState(false);

    // Service types
    const serviceTypes: ServiceType[] = [
        {
            id: 'general',
            name: 'General Pediatrics',
            icon: <Baby className="h-8 w-8 text-blue-500" />,
            description: 'Routine check-ups, vaccinations, growth monitoring, and treatment for common childhood illnesses.'
        },
        {
            id: 'specialist',
            name: 'Pediatric Specialists',
            icon: <Heart className="h-8 w-8 text-pink-500" />,
            description: 'Specialized care for conditions requiring experts in areas like pediatric cardiology, neurology, endocrinology, and more.'
        },
        {
            id: 'development',
            name: 'Developmental Pediatrics',
            icon: <User className="h-8 w-8 text-purple-500" />,
            description: 'Assessment and support for developmental delays, behavioral concerns, ADHD, autism spectrum disorders, and learning disabilities.'
        },
        {
            id: 'emergency',
            name: 'Pediatric Emergency Care',
            icon: <Clock className="h-8 w-8 text-red-500" />,
            description: '24/7 emergency services specially equipped for children with pediatric specialists on call.'
        }
    ];

    // Sample pediatric doctors (in a real app, these would come from a database)
    const doctors: Doctor[] = [
        {
            id: 'd1',
            name: 'Dr. Sarah Johnson',
            specialty: 'General Pediatrics',
            image: '/api/placeholder/200/200',
            rating: 4.9,
            experience: '15 years',
            education: 'MD, Children\'s Medical University',
            languages: ['English', 'Spanish'],
            address: '123 Kids Health Ave, Suite 101',
            availability: ['Mon-Wed: 9am-5pm', 'Fri: 9am-3pm'],
            acceptingNewPatients: true,
            phone: '(555) 123-4567'
        },
        {
            id: 'd2',
            name: 'Dr. Michael Chen',
            specialty: 'Pediatric Cardiology',
            image: '/api/placeholder/200/200',
            rating: 4.8,
            experience: '12 years',
            education: 'MD, Children\'s Heart Institute',
            languages: ['English', 'Mandarin'],
            address: '456 Medical Center Blvd, Suite 300',
            availability: ['Tues-Thurs: 8am-4pm', 'Fri: 10am-2pm'],
            acceptingNewPatients: true,
            phone: '(555) 234-5678'
        },
        {
            id: 'd3',
            name: 'Dr. Lisa Rodriguez',
            specialty: 'Developmental Pediatrics',
            image: '/api/placeholder/200/200',
            rating: 5.0,
            experience: '10 years',
            education: 'MD, Child Development Center',
            languages: ['English', 'Spanish', 'Portuguese'],
            address: '789 Growth Path, Suite 205',
            availability: ['Mon, Wed, Fri: 8am-6pm'],
            acceptingNewPatients: false,
            phone: '(555) 345-6789'
        },
        {
            id: 'd4',
            name: 'Dr. James Wilson',
            specialty: 'Pediatric Neurology',
            image: '/api/placeholder/200/200',
            rating: 4.7,
            experience: '20 years',
            education: 'MD, Pediatric Neurological Institute',
            languages: ['English'],
            address: '321 Brain Health Way',
            availability: ['Mon-Thurs: 9am-5pm'],
            acceptingNewPatients: true,
            phone: '(555) 456-7890'
        },
        {
            id: 'd5',
            name: 'Dr. Emily Park',
            specialty: 'General Pediatrics',
            image: '/api/placeholder/200/200',
            rating: 4.6,
            experience: '8 years',
            education: 'MD, Children\'s Medical College',
            languages: ['English', 'Korean'],
            address: '567 Wellness Street, Suite 110',
            availability: ['Mon, Tues, Thurs, Fri: 8:30am-4:30pm'],
            acceptingNewPatients: true,
            phone: '(555) 567-8901'
        },
        {
            id: 'd6',
            name: 'Dr. Robert Thompson',
            specialty: 'Pediatric Pulmonology',
            image: '/api/placeholder/200/200',
            rating: 4.9,
            experience: '14 years',
            education: 'MD, Respiratory Medicine University',
            languages: ['English', 'French'],
            address: '890 Breathing Lane, Suite 400',
            availability: ['Wed-Fri: 9am-5pm'],
            acceptingNewPatients: false,
            phone: '(555) 678-9012'
        }
    ];

    // Filter doctors based on search query, specialty, and accepting new patients
    const filteredDoctors = doctors.filter(doctor => {
        const matchesSearch = searchQuery === '' ||
            doctor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            doctor.specialty.toLowerCase().includes(searchQuery.toLowerCase());

        const matchesSpecialty = selectedSpecialty === null ||
            (selectedSpecialty === 'general' && doctor.specialty === 'General Pediatrics') ||
            (selectedSpecialty === 'specialist' && doctor.specialty !== 'General Pediatrics' && doctor.specialty !== 'Developmental Pediatrics') ||
            (selectedSpecialty === 'development' && doctor.specialty === 'Developmental Pediatrics') ||
            (selectedSpecialty === 'emergency' && doctor.specialty.includes('Emergency'));

        const matchesAcceptingNew = !acceptingNewOnly || doctor.acceptingNewPatients;

        return matchesSearch && matchesSpecialty && matchesAcceptingNew;
    });

    const handleBookAppointment = (doctorId: string) => {
        if (!appointmentDate) {
            alert('Please select an appointment date');
            return;
        }
        alert(`Appointment booked with Dr. ID: ${doctorId} for ${appointmentDate}`);
        // In a real application, this would submit to your backend
    };

    return (
        <ProtectedRoute>
            <div className="min-h-screen bg-gradient-to-br from-sky-50 to-blue-100 p-6 pt-28">
                <div className="max-w-6xl mx-auto">
                    <header className="text-center mb-12">
                        <h1 className="text-3xl md:text-4xl font-bold text-[#056968] mb-4">Pediatric Care Services</h1>
                        <p className="text-[#056968] max-w-2xl mx-auto">
                            Quality healthcare for your child from trusted pediatricians and specialists.
                            Find the right doctor for your child's specific needs.
                        </p>
                    </header>

                    {/* Search and basic filters */}
                    <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
                        <div className="grid md:grid-cols-3 gap-4">
                            <div>
                                <label className=" text-[#056968] mb-2 flex items-center">
                                    <Search className="mr-2 h-4 w-4" /> Find a Pediatrician
                                </label>
                                <input
                                    type="text"
                                    placeholder="Search by doctor name or specialty"
                                    className="w-full p-2 border rounded-md"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                            </div>
                            <div>
                                <label className=" text-[#056968] mb-2 flex items-center">
                                    <Calendar className="mr-2 h-4 w-4" /> Appointment Date
                                </label>
                                <input
                                    type="date"
                                    className="w-full text-[#056968] p-2 border rounded-md"
                                    value={appointmentDate}
                                    onChange={(e) => setAppointmentDate(e.target.value)}
                                />
                            </div>
                            <div>
                                <div className="flex justify-between mb-2">
                                    <label className=" text-[#056968] flex items-center">
                                        <Filter className="mr-2 h-4 w-4" /> More Filters
                                    </label>
                                    <button
                                        onClick={() => setShowFilters(!showFilters)}
                                        className="text-[#edb138] text-sm hover:text-[#056968]"
                                    >
                                        {showFilters ? 'Hide Filters' : 'Show Filters'}
                                    </button>
                                </div>
                                <div className="flex items-center bg-gray-50 p-2 rounded-md">
                                    <input
                                        type="checkbox"
                                        id="acceptingNew"
                                        checked={acceptingNewOnly}
                                        onChange={() => setAcceptingNewOnly(!acceptingNewOnly)}
                                        className="mr-2"
                                    />
                                    <label htmlFor="acceptingNew" className="text-[#056968] text-sm">
                                        Accepting New Patients Only
                                    </label>
                                </div>
                            </div>
                        </div>

                        {/* Additional filters that can be shown/hidden */}
                        {showFilters && (
                            <div className="mt-4 pt-4 border-t border-gray-200">
                                <h3 className="text-sm font-medium text-[#056968] mb-2">Filter by specialty:</h3>
                                <div className="flex flex-wrap gap-2">
                                    <button
                                        className={`px-3 py-1 rounded-full text-sm ${selectedSpecialty === null ? 'bg-[#edb138] text-white' : 'bg-gray-100 text-[#056968]'}`}
                                        onClick={() => setSelectedSpecialty(null)}
                                    >
                                        All Specialties
                                    </button>
                                    {serviceTypes.map(service => (
                                        <button
                                            key={service.id}
                                            className={`px-3 py-1 rounded-full text-sm flex items-center ${selectedSpecialty === service.id ? 'bg-[#edb138] text-white' : 'bg-gray-100 text-[#056968]'}`}
                                            onClick={() => setSelectedSpecialty(selectedSpecialty === service.id ? null : service.id)}
                                        >
                                            <span className="mr-1">{service.name}</span>
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Service Types */}
                    <div className="mb-12">
                        <h2 className="text-2xl font-semibold text-[#056968] mb-6">Our Pediatric Services</h2>
                        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                            {serviceTypes.map(service => (
                                <div
                                    key={service.id}
                                    className={`bg-white rounded-lg shadow-md p-6 cursor-pointer transition 
                  ${selectedSpecialty === service.id ? 'ring-2 ring-blue-500' : 'hover:shadow-lg'}`}
                                    onClick={() => setSelectedSpecialty(selectedSpecialty === service.id ? null : service.id)}
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

                    {/* Pediatric Doctors */}
                    <div>
                        <h2 className="text-2xl font-semibold text-[#056968] text[#056968] mb-6">Our Pediatric Doctors</h2>

                        {filteredDoctors.length === 0 ? (
                            <div className="text-center p-8 bg-white rounded-lg shadow">
                                <p className="text-[#056968]">No doctors match your search criteria. Please try different filters.</p>
                            </div>
                        ) : (
                            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {filteredDoctors.map(doctor => (
                                    <div key={doctor.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                                        <div className="p-6">
                                            <div className="flex items-center mb-4">
                                                <div className="w-16 h-16 bg-gray-200 rounded-full overflow-hidden mr-4">
                                                    <img
                                                        src={doctor.image}
                                                        alt={doctor.name}
                                                        className="w-full h-full object-cover"
                                                    />
                                                </div>
                                                <div>
                                                    <h3 className="text-xl font-semibold text-[#056968]">{doctor.name}</h3>
                                                    <p className="text-[#edb138]">{doctor.specialty}</p>
                                                </div>
                                            </div>

                                            <div className="flex items-center mb-4">
                                                <div className="flex text-yellow-400">
                                                    {[...Array(5)].map((_, i) => (
                                                        <Star
                                                            key={i}
                                                            className={`w-4 h-4 ${i < Math.floor(doctor.rating) ? 'fill-current' : 'fill-none'}`}
                                                        />
                                                    ))}
                                                </div>
                                                <span className="text-[#056968] ml-2">{doctor.rating}</span>
                                                <span className="mx-2 text-[#056968]">•</span>
                                                <span className="text-[#056968]">{doctor.experience}</span>
                                            </div>

                                            <div className="space-y-2 mb-4">
                                                <div className="flex items-start text-[#056968]">
                                                    <MapPin className="h-4 text-[#edb138] w-4 mr-2 mt-1 flex-shrink-0" />
                                                    <span>{doctor.address}</span>
                                                </div>
                                                <div className="flex items-start text-[#056968]">
                                                    <Clock className="h-4 text-[#edb138] w-4 mr-2 mt-1 flex-shrink-0" />
                                                    <div className="flex flex-col">
                                                        {doctor.availability.map((time, index) => (
                                                            <span key={index}>{time}</span>
                                                        ))}
                                                    </div>
                                                </div>
                                                <div className="flex items-center text-[#056968]">
                                                    <Phone className="h-4 text-[#edb138] w-4 mr-2 flex-shrink-0" />
                                                    <span>{doctor.phone}</span>
                                                </div>
                                                <div className="flex items-center text-[#056968]">
                                                    <BookOpen className="h-4 text-[#edb138] w-4 mr-2 flex-shrink-0" />
                                                    <span>Languages: {doctor.languages.join(', ')}</span>
                                                </div>
                                            </div>

                                            <div className="flex text-[#056968] items-center mb-4">
                                                <span className={`px-2 py-1 rounded text-xs ${doctor.acceptingNewPatients ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                                                    {doctor.acceptingNewPatients ? 'Accepting New Patients' : 'Not Accepting New Patients'}
                                                </span>
                                            </div>

                                            <button
                                                className={`w-full py-2 rounded-md transition ${doctor.acceptingNewPatients
                                                    ? 'bg-[#edb138] text-white hover:bg-[#056968]'
                                                    : 'bg-gray-300 text-[#056968] cursor-not-allowed'
                                                    }`}
                                                onClick={() => doctor.acceptingNewPatients && handleBookAppointment(doctor.id)}
                                                disabled={!doctor.acceptingNewPatients}
                                            >
                                                Book Appointment
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Child Health Resources */}
                    <div className="mt-12 bg-white rounded-lg shadow-lg p-6">
                        <h3 className="text-xl text-[#056968] font-semibold mb-6">Child Health Resources</h3>
                        <div className="grid md:grid-cols-3 gap-6">
                            <div className="bg-blue-50 p-4 rounded-md">
                                <h4 className="font-bold text-[#056968] mb-2">Vaccination Schedules</h4>
                                <p className="text-sm text-[#056968]">
                                    Stay up-to-date with recommended immunizations for your child from birth to 18 years.
                                    Regular vaccinations help protect your child from serious illnesses.
                                </p>
                                <button className="mt-4 text-[#056968] text-sm font-medium hover:text-[#edb138]">
                                    View Schedule →
                                </button>
                            </div>
                            <div className="bg-green-50 p-4 rounded-md">
                                <h4 className="font-bold text-[#056968] mb-2">Developmental Milestones</h4>
                                <p className="text-sm text-[#056968]">
                                    Learn about important physical, cognitive, and social milestones to track your child's development
                                    from infancy through adolescence.
                                </p>
                                <button className="mt-4 text-[#056968] text-sm font-medium hover:text-[#edb138]">
                                    Explore Milestones →
                                </button>
                            </div>
                            <div className="bg-purple-50 p-4 rounded-md">
                                <h4 className="font-bold text-[#056968] mb-2">Nutrition & Healthy Habits</h4>
                                <p className="text-sm text-[#056968]">
                                    Find guidance on age-appropriate nutrition, establishing healthy eating habits, and
                                    supporting your child's physical activity needs.
                                </p>
                                <button className="mt-4 text-[#056968] text-sm font-medium hover:text-[#edb138]">
                                    Get Nutrition Tips →
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </ProtectedRoute>
    );
};

export default PediatricCare;