'use client';
import { useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, db } from '../../lib/firebase';
import ProtectedRoute from '../../component/auth/ProtectedRoute';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import Link from 'next/link';

interface AppointmentFormData {
    name: string;
    email: string;
    phone: string;
    date: string;
    time: string;
    service: string;
    doctor: string;
    notes: string;
}

export default function BookAppointment() {
    const [user] = useAuthState(auth);
    const [formData, setFormData] = useState<AppointmentFormData>({
        name: '',
        email: '',
        phone: '',
        date: '',
        time: '',
        service: 'General Checkup',
        doctor: '',
        notes: '',
    });
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
    const [submitSuccess, setSubmitSuccess] = useState<boolean>(false);
    const [submitError, setSubmitError] = useState('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSubmitting(true);
        setSubmitError('');

        try {
            await addDoc(collection(db, "appointments"), {
                ...formData,
                userEmail: user?.email || formData.email,
                userId: user?.uid || null,
                status: 'pending',
                createdAt: serverTimestamp(),
            });

            setSubmitSuccess(true);
            setFormData({
                name: '',
                email: '',
                phone: '',
                date: '',
                time: '',
                service: 'General Checkup',
                doctor: '',
                notes: '',
            });
        } catch (error) {
            console.error("Error submitting appointment:", error);
            setSubmitError('Failed to book appointment. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <ProtectedRoute>
            <div className="min-h-screen bg-gray-50 py-16 pt-24">
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto">
                        <div className="text-center mb-12">
                            <h1 className="text-3xl font-bold text-[#056968] mb-4">Book Your Appointment</h1>
                            <p className="text-[#056968] max-w-2xl mx-auto">
                                Schedule your appointment with our healthcare professionals quickly and easily.
                                Choose from a wide range of services and find a time that works for you.
                            </p>
                        </div>

                        {!user && (
                            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-8 text-center">
                                <p className="text-blue-800">
                                    <span className="font-medium">Note:</span> Creating an account allows you to track your appointments and medical history.
                                    <Link href="/authpage" className="ml-2 text-blue-600 hover:underline font-medium">
                                        Login or Sign Up
                                    </Link>
                                </p>
                            </div>
                        )}

                        {submitSuccess ? (
                            <div className="bg-green-50 border border-green-200 rounded-lg p-8 text-center">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-green-500 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                <h2 className="text-2xl font-bold text-green-800 mb-2">Appointment Booked Successfully!</h2>
                                <p className="text-green-700 mb-6">
                                    We've received your appointment request and will send you a confirmation email shortly.
                                </p>
                                <button
                                    onClick={() => setSubmitSuccess(false)}
                                    className="bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-6 rounded-md"
                                >
                                    Book Another Appointment
                                </button>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-lg p-8">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label htmlFor="name" className="block text-[#056968] font-medium mb-2">Full Name</label>
                                        <input
                                            type="text"
                                            id="name"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            required
                                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#056968] focus:border-transparent"
                                            placeholder="Enter your full name"
                                        />
                                    </div>

                                    <div>
                                        <label htmlFor="email" className="block text-[#056968] font-medium mb-2">Email Address</label>
                                        <input
                                            type="email"
                                            id="email"
                                            name="email"
                                            value={user?.email || formData.email}
                                            onChange={handleChange}
                                            required
                                            disabled={!!user}
                                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#056968] focus:border-transparent"
                                            placeholder="Enter your email"
                                        />
                                    </div>

                                    <div>
                                        <label htmlFor="phone" className="block text-[#056968] font-medium mb-2">Phone Number</label>
                                        <input
                                            type="tel"
                                            id="phone"
                                            name="phone"
                                            value={formData.phone}
                                            onChange={handleChange}
                                            required
                                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#056968] focus:border-transparent"
                                            placeholder="Enter your phone number"
                                        />
                                    </div>

                                    <div>
                                        <label htmlFor="service" className="block text-[#056968] font-medium mb-2">Service Type</label>
                                        <select
                                            id="service"
                                            name="service"
                                            value={formData.service}
                                            onChange={handleChange}
                                            required
                                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#056968] focus:border-transparent"
                                        >
                                            <option value="General Checkup">General Checkup</option>
                                            <option value="Specialist Consultation">Specialist Consultation</option>
                                            <option value="Diagnostic Tests">Diagnostic Tests</option>
                                            <option value="Vaccination">Vaccination</option>
                                            <option value="Prenatal Care">Prenatal Care</option>
                                            <option value="Pediatric Checkup">Pediatric Checkup</option>
                                            <option value="Geriatric Care">Geriatric Care</option>
                                            <option value="Dental Services">Dental Services</option>
                                            <option value="Eye Examination">Eye Examination</option>
                                            <option value="Physical Therapy">Physical Therapy</option>
                                        </select>
                                    </div>

                                    <div>
                                        <label htmlFor="date" className="block text-[#056968] font-medium mb-2">Preferred Date</label>
                                        <input
                                            type="date"
                                            id="date"
                                            name="date"
                                            value={formData.date}
                                            onChange={handleChange}
                                            required
                                            min={new Date().toISOString().split('T')[0]}
                                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#056968] focus:border-transparent"
                                        />
                                    </div>

                                    <div>
                                        <label htmlFor="time" className="block text-[#056968] font-medium mb-2">Preferred Time</label>
                                        <select
                                            id="time"
                                            name="time"
                                            value={formData.time}
                                            onChange={handleChange}
                                            required
                                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#056968] focus:border-transparent"
                                        >
                                            <option value="">Select a time</option>
                                            <option value="9:00 AM">9:00 AM</option>
                                            <option value="10:00 AM">10:00 AM</option>
                                            <option value="11:00 AM">11:00 AM</option>
                                            <option value="12:00 PM">12:00 PM</option>
                                            <option value="1:00 PM">1:00 PM</option>
                                            <option value="2:00 PM">2:00 PM</option>
                                            <option value="3:00 PM">3:00 PM</option>
                                            <option value="4:00 PM">4:00 PM</option>
                                        </select>
                                    </div>

                                    <div className="md:col-span-2">
                                        <label htmlFor="doctor" className="block text-[#056968] font-medium mb-2">Preferred Doctor (Optional)</label>
                                        <input
                                            type="text"
                                            id="doctor"
                                            name="doctor"
                                            value={formData.doctor}
                                            onChange={handleChange}
                                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#056968] focus:border-transparent"
                                            placeholder="Enter doctor's name if you have a preference"
                                        />
                                    </div>

                                    <div className="md:col-span-2">
                                        <label htmlFor="notes" className="block text-[#056968] font-medium mb-2">Additional Notes</label>
                                        <textarea
                                            id="notes"
                                            name="notes"
                                            value={formData.notes}
                                            onChange={handleChange}
                                            rows={4}
                                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#056968] focus:border-transparent"
                                            placeholder="Please provide any additional information about your appointment request"
                                        ></textarea>
                                    </div>
                                </div>

                                {submitError && (
                                    <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mt-6">
                                        {submitError}
                                    </div>
                                )}

                                <div className="mt-8 text-center">
                                    <button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className="bg-[#edb138] hover:bg-[#045857] text-white font-medium py-3 px-8 rounded-md transition duration-300 ease-in-out"
                                    >
                                        {isSubmitting ? 'Booking...' : 'Book Appointment'}
                                    </button>
                                </div>
                            </form>
                        )}

                        <div className="mt-12 bg-white shadow-md rounded-lg p-8">
                            <h2 className="text-2xl font-bold text-[#056968] mb-6">What to Expect</h2>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <div className="text-center">
                                    <div className="bg-[#e6f7f7] rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-[#056968]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                        </svg>
                                    </div>
                                    <h3 className="font-semibold text-[#edb138] text-lg mb-2">Confirmation</h3>
                                    <p className="text-[#056968]">
                                        You'll receive an email confirmation within 24 hours of your appointment request.
                                    </p>
                                </div>

                                <div className="text-center">
                                    <div className="bg-[#e6f7f7] rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-[#056968]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                                        </svg>
                                    </div>
                                    <h3 className="font-semibold text-[#edb138] text-lg mb-2">Preparation</h3>
                                    <p className="text-[#056968]">
                                        Bring your ID, insurance information, and a list of current medications to your appointment.
                                    </p>
                                </div>

                                <div className="text-center">
                                    <div className="bg-[#e6f7f7] rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-[#056968]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                    </div>
                                    <h3 className="font-semibold text-[#edb138] text-lg mb-2">Arrival</h3>
                                    <p className="text-[#056968]">
                                        Please arrive 15 minutes before your scheduled appointment time to complete any necessary paperwork.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </ProtectedRoute>
    );
}