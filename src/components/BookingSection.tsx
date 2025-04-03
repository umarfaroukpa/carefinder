'use client';
import { useState } from 'react';
import HospitalSearch from './HospitalSearch';
import HospitalList from './HospitalList';
import { Hospital } from '../types/Hospital';

export default function BookingSection() {
    const [hospitals, setHospitals] = useState<Hospital[]>([]);
    const [selectedHospital, setSelectedHospital] = useState<Hospital | null>(null);
    const [appointmentDate, setAppointmentDate] = useState('');

    const handleBook = (e: React.FormEvent) => {
        e.preventDefault();
        if (selectedHospital && appointmentDate) {
            alert(`Booking confirmed at ${selectedHospital.name} on ${appointmentDate}`);
            // Replace with API call to save booking
        }
    };

    return (
        <section id="booking" className="py-12 bg-white">
            <div className="container mx-auto">
                <h2 className="text-3xl font-bold text-center mb-8">Book an Appointment</h2>

                {/* Hospital Search */}
                <HospitalSearch onSearch={setHospitals} />
                <HospitalList hospitals={hospitals} />

                {/* Booking Form */}
                {hospitals.length > 0 && (
                    <div className="mt-8">
                        <h3 className="text-2xl font-semibold mb-4">Schedule Your Visit</h3>
                        <form onSubmit={handleBook} className="space-y-4 max-w-md mx-auto">
                            <div>
                                <label htmlFor="hospital" className="block text-gray-700">
                                    Select Hospital
                                </label>
                                <select
                                    id="hospital"
                                    className="w-full p-2 border rounded"
                                    onChange={(e) =>
                                        setSelectedHospital(hospitals.find(h => h._id === e.target.value) || null)
                                    }
                                >
                                    <option value="">Choose a hospital</option>
                                    {hospitals.map(hospital => (
                                        <option key={hospital._id} value={hospital._id}>
                                            {hospital.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label htmlFor="date" className="block text-gray-700">
                                    Appointment Date
                                </label>
                                <input
                                    type="date"
                                    id="date"
                                    className="w-full p-2 border rounded"
                                    value={appointmentDate}
                                    onChange={(e) => setAppointmentDate(e.target.value)}
                                    required
                                />
                            </div>
                            <button
                                type="submit"
                                className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
                            >
                                Book Appointment
                            </button>
                        </form>
                    </div>
                )}
            </div>
        </section>
    );
}