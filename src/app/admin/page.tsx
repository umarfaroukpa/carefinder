"use client";

import Head from 'next/head';
import ProtectedRoute from '../../component/auth/ProtectedRoute';
import MarkdownEditor from '../../component/MarkdownEditor';
import { useState } from 'react';
import axios from 'axios';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { LogOut, PlusCircle, HospitalIcon } from 'lucide-react';

// Validation schema for hospital data
const schema = yup.object({
    name: yup.string().required('Hospital name is required'),
    address: yup.string().required('Address is required'),
    phone: yup
        .string()
        .matches(/^\+?[1-9]\d{1,14}$/, 'Enter a valid phone number')
        .required('Phone number is required'),
    email: yup.string().email('Enter a valid email').required('Email is required'),
    city: yup.string().required('City is required'),
    region: yup.string().required('Region is required'),
    description: yup.string().required('Description is required'),
});

type HospitalFormData = yup.InferType<typeof schema>;

export default function Admin() {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitMessage, setSubmitMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

    const {
        register,
        handleSubmit,
        control,
        reset,
        formState: { errors },
    } = useForm<HospitalFormData>({
        resolver: yupResolver(schema),
        defaultValues: {
            name: '',
            address: '',
            phone: '',
            email: '',
            city: '',
            region: '',
            description: '',
        },
    });

    const handleSave = async (data: HospitalFormData) => {
        setIsSubmitting(true);
        setSubmitMessage(null);
        try {
            await axios.post('/api/hospitals', data);
            setSubmitMessage({ type: 'success', text: 'Hospital added successfully!' });
            reset(); // Reset form after successful submission
        } catch (error) {
            console.error('Error adding hospital:', error);
            setSubmitMessage({ type: 'error', text: 'Failed to add hospital. Please try again.' });
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleLogout = () => {
        // Implement logout logic (e.g., clear auth token, redirect)
        console.log('Logout clicked');
    };

    return (
        <ProtectedRoute>
            <Head>
                <title className="text-center text-[#056968]">Carefinder - Admin Dashboard</title>
            </Head>
            <div className="flex flex-col min-h-screen bg-gray-100">
                {/* Main Content Wrapper */}
                <div className="flex flex-1 pt-24">
                    {/* Sidebar */}
                    <aside className="w-64 bg-white shadow-md p-6 fixed h-full">
                        <div className="flex items-center mb-8">
                            <HospitalIcon className="w-8 h-8 text-[#edb138] mr-2" />
                            <h2 className="text-xl font-bold text-[#056968]">Admin Panel</h2>
                        </div>
                        <nav className="space-y-4">
                            <a href="#" className="flex items-center text-[#056968] hover:text-[#edb138] transition">
                                <PlusCircle className="w-5 h-5 mr-2 text-[#edb138]" />
                                Add Provider
                            </a>
                            {/* Add more nav items here if needed */}
                        </nav>
                        <button
                            onClick={handleLogout}
                            className="absolute bottom-6 flex items-center text-[#056968] hover:text-[#edb138] transition"
                        >
                            <LogOut className="w-5 h-5 mr-2 text-[#edb138]" />
                            Logout
                        </button>
                    </aside>

                    {/* Main Content */}
                    <main className="flex-1 ml-64 p-8">
                        <h1 className="text-3xl font-bold text-[#056968] text-center mb-8">Admin Dashboard</h1>

                        <form
                            onSubmit={handleSubmit(handleSave)}
                            className="bg-white p-8 rounded-xl shadow-lg max-w-2xl mx-auto space-y-6 transform transition-all hover:shadow-xl"
                        >
                            <h2 className="text-2xl text-center font-semibold text-[#056968] flex items-center justify-center">
                                <PlusCircle className="w-6 h-6 mr-2 text-[#edb13b]" />
                                Add New Provider
                            </h2>

                            {/* Grid Layout for Form Fields */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* Hospital Name */}
                                <div>
                                    <label htmlFor="name" className="block text-sm font-medium text-[#056968] mb-1">
                                        Hospital Name
                                    </label>
                                    <input
                                        id="name"
                                        {...register('name')}
                                        className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#056968] transition"
                                        placeholder="Enter hospital name"
                                    />
                                    {errors.name && (
                                        <p className="text-[#056968] text-sm mt-1 animate-fade-in">{errors.name.message}</p>
                                    )}
                                </div>

                                {/* Address */}
                                <div>
                                    <label htmlFor="address" className="block text-sm font-medium text-[#056968] mb-1">
                                        Address
                                    </label>
                                    <input
                                        id="address"
                                        {...register('address')}
                                        className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#056968] transition"
                                        placeholder="Enter hospital address"
                                    />
                                    {errors.address && (
                                        <p className="text-[#056968] text-sm mt-1 animate-fade-in">{errors.address.message}</p>
                                    )}
                                </div>

                                {/* Phone */}
                                <div>
                                    <label htmlFor="phone" className="block text-sm font-medium text-[#056968] mb-1">
                                        Phone Number
                                    </label>
                                    <input
                                        id="phone"
                                        {...register('phone')}
                                        className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#056968] transition"
                                        placeholder="e.g., +2341234567890"
                                    />
                                    {errors.phone && (
                                        <p className="text-[#056968] text-sm mt-1 animate-fade-in">{errors.phone.message}</p>
                                    )}
                                </div>

                                {/* Email */}
                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium text-[#056968] mb-1">
                                        Email
                                    </label>
                                    <input
                                        id="email"
                                        {...register('email')}
                                        className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#056968] transition"
                                        placeholder="Enter hospital email"
                                    />
                                    {errors.email && (
                                        <p className="text-[#056968] text-sm mt-1 animate-fade-in">{errors.email.message}</p>
                                    )}
                                </div>

                                {/* City */}
                                <div>
                                    <label htmlFor="city" className="block text-sm font-medium text-[#056968] mb-1">
                                        City
                                    </label>
                                    <input
                                        id="city"
                                        {...register('city')}
                                        className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#056968] transition"
                                        placeholder="Enter city"
                                    />
                                    {errors.city && (
                                        <p className="text-[#056968] text-sm mt-1 animate-fade-in">{errors.city.message}</p>
                                    )}
                                </div>

                                {/* Region */}
                                <div>
                                    <label htmlFor="region" className="block text-sm font-medium text-[#056968] mb-1">
                                        Region
                                    </label>
                                    <input
                                        id="region"
                                        {...register('region')}
                                        className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#056968] transition"
                                        placeholder="Enter region"
                                    />
                                    {errors.region && (
                                        <p className="text-[#056968] text-sm mt-1 animate-fade-in">{errors.region.message}</p>
                                    )}
                                </div>
                            </div>

                            {/* Markdown Description */}
                            <div>
                                <label className="block text-sm font-medium text-[#056968] mb-2">Description (Markdown)</label>
                                <Controller
                                    name="description"
                                    control={control}
                                    render={({ field }) => (
                                        <MarkdownEditor
                                            initialContent={field.value}
                                            onSave={(content) => field.onChange(content)}
                                        />
                                    )}
                                />
                                {errors.description && (
                                    <p className="text-[#056968] text-sm mt-1 animate-fade-in">{errors.description.message}</p>
                                )}
                            </div>

                            {/* Submit Button */}
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full bg-[#edb13b] text-white py-3 rounded-md hover:bg-[#056968] disabled:bg-blue-300 transition flex items-center justify-center"
                            >
                                {isSubmitting ? (
                                    <svg
                                        className="animate-spin h-5 w-5 mr-2 text-white"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                    >
                                        <circle
                                            className="opacity-25"
                                            cx="12"
                                            cy="12"
                                            r="10"
                                            stroke="currentColor"
                                            strokeWidth="4"
                                        />
                                        <path
                                            className="opacity-75"
                                            fill="currentColor"
                                            d="M4 12a8 8 0 018-8v8h-8z"
                                        />
                                    </svg>
                                ) : (
                                    <PlusCircle className="w-5 h-5 mr-2" />
                                )}
                                {isSubmitting ? 'Saving...' : 'Add Provider'}
                            </button>

                            {/* Feedback Message */}
                            {submitMessage && (
                                <p
                                    className={`text-sm text-center p-2 rounded-md ${submitMessage.type === 'success'
                                        ? 'text-[#056968] bg-green-100'
                                        : 'text-red-700 bg-red-100'
                                        } animate-fade-in`}
                                >
                                    {submitMessage.text}
                                </p>
                            )}
                        </form>
                    </main>
                </div>

                {/* Footer */}
                <footer className="bg-[#056968] text-white py-6">
                    <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
                        <div className="mb-4 md:mb-0">
                            <h3 className="text-lg font-semibold">Carefinder</h3>
                            <p className="text-sm">Making healthcare accessible across Nigeria</p>
                        </div>
                        <div className="flex space-x-6">
                            <a href="/aboutUs" className="text-sm hover:text-[#edb13b] transition">
                                About Us
                            </a>
                            <a href="/contactU" className="text-sm hover:text-[#edb13b] transition">
                                Contact Us
                            </a>
                            <a href="/services" className="text-sm hover:text-[#edb13b] transition">
                                Services
                            </a>
                        </div>
                        <div className="mt-4 md:mt-0 text-sm">
                            <p>&copy; {new Date().getFullYear()} Carefinder. All rights reserved.</p>
                        </div>
                    </div>
                </footer>
            </div>
        </ProtectedRoute>
    );
}

// Optional CSS for animations (add to global.css or a stylesheet)
const styles = `
@keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
}
.animate-fade-in {
    animation: fadeIn 0.3s ease-in;
}
`;