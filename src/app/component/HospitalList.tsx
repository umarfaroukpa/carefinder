'use client';
import { ref, uploadString, getDownloadURL } from 'firebase/storage';
import { storage } from '../../lib/firebase';
import { Hospital } from '../../types/Hospital';
import { MapPin, Phone, Mail, Building, Activity } from 'lucide-react';

interface HospitalListProps {
    hospitals: Hospital[];
}

export default function HospitalList({ hospitals }: HospitalListProps) {
    const exportToCSV = async () => {
        const csv = [
            ['Name', 'Address', 'Phone', 'Email', 'City'],
            ...hospitals.map(h => [
                h.name,
                h.address,
                h.contactNumber || h.phone || 'Not provided',
                h.email?.[0] || 'Not provided',
                h.city || h.location?.split(',')[0] || 'Unknown'
            ])
        ].map(row => row.join(',')).join('\n');

        const storageRef = ref(storage, `exports/hospitals-${Date.now()}.csv`);
        await uploadString(storageRef, csv);
        const url = await getDownloadURL(storageRef);
        window.open(url, '_blank');
    };

    if (!hospitals || hospitals.length === 0) {
        return <p className="text-gray-500 text-center py-8">No hospitals found.</p>;
    }

    return (
        <div>
            <button onClick={exportToCSV} className="mb-6 bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-md transition-colors flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                Export to CSV
            </button>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {hospitals.map(hospital => (
                    <div key={hospital.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                        <div className="bg-blue-600 h-3 w-full"></div>
                        <div className="p-6">
                            <h2 className="text-xl font-bold text-gray-800 mb-2">{hospital.name}</h2>

                            <div className="space-y-3 text-gray-600">
                                <div className="flex items-start">
                                    <MapPin className="h-5 w-5 mr-2 text-blue-500 flex-shrink-0 mt-0.5" />
                                    <p>{hospital.address || hospital.location || `${hospital.city || 'Unknown'}, ${hospital.region || 'Unknown'}`}</p>
                                </div>

                                <div className="flex items-center">
                                    <Phone className="h-5 w-5 mr-2 text-blue-500" />
                                    <p>{hospital.contactNumber || hospital.phone || 'Contact information not provided'}</p>
                                </div>

                                {hospital.email && hospital.email[0] && (
                                    <div className="flex items-center">
                                        <Mail className="h-5 w-5 mr-2 text-blue-500" />
                                        <p className="truncate">{hospital.email[0]}</p>
                                    </div>
                                )}

                                {hospital.city && (
                                    <div className="flex items-center">
                                        <Building className="h-5 w-5 mr-2 text-blue-500" />
                                        <p>{hospital.city}, {hospital.region || 'Unknown'}</p>
                                    </div>
                                )}

                                {hospital.specializations && hospital.specializations.length > 0 && (
                                    <div className="flex items-start">
                                        <Activity className="h-5 w-5 mr-2 text-blue-500 flex-shrink-0 mt-0.5" />
                                        <div>
                                            <p className="font-medium mb-1">Specializations:</p>
                                            <div className="flex flex-wrap gap-2">
                                                {hospital.specializations.map((spec, idx) => (
                                                    <span key={idx} className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                                                        {spec}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>

                            <div className="mt-4 pt-4 border-t border-gray-100">
                                <a href={`/hospitals/${hospital.id}`} className="text-blue-600 hover:text-blue-800 font-medium inline-flex items-center">
                                    View Details
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                    </svg>
                                </a>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}