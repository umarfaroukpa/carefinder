"use client";

import Head from 'next/head';
import ProtectedRoute from '../../components/auth/ProtectedRoute';
import MarkdownEditor from '../../components/MarkdownEditor';
import { useState } from 'react';
import axios from 'axios';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

// Validation schema for hospital data
const schema = yup.object({
    name: yup.string().required('Hospital name is required'),
    address: yup.string().required('Address is required'),
    phone: yup.string().matches(/^\+?[1-9]\d{1,14}$/, 'Enter a valid phone number').required('Phone number is required'),
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

    return (
        <ProtectedRoute>
            <div className="container mx-auto p-4">
                <Head>
                    <title>Carefinder - Admin Dashboard</title>
                </Head>
                <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>

                <form onSubmit={handleSubmit(handleSave)} className="space-y-6 bg-white p-6 rounded-lg shadow-md">
                    <h2 className="text-2xl font-semibold">Add New Hospital</h2>

                    {/* Hospital Name */}
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                            Hospital Name
                        </label>
                        <input
                            id="name"
                            {...register('name')}
                            className="mt-1 w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter hospital name"
                        />
                        {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
                    </div>

                    {/* Address */}
                    <div>
                        <label htmlFor="address" className="block text-sm font-medium text-gray-700">
                            Address
                        </label>
                        <input
                            id="address"
                            {...register('address')}
                            className="mt-1 w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter hospital address"
                        />
                        {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address.message}</p>}
                    </div>

                    {/* Phone */}
                    <div>
                        <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                            Phone Number
                        </label>
                        <input
                            id="phone"
                            {...register('phone')}
                            className="mt-1 w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="e.g., +2341234567890"
                        />
                        {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>}
                    </div>

                    {/* Email */}
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                            Email
                        </label>
                        <input
                            id="email"
                            {...register('email')}
                            className="mt-1 w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter hospital email"
                        />
                        {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
                    </div>

                    {/* City */}
                    <div>
                        <label htmlFor="city" className="block text-sm font-medium text-gray-700">
                            City
                        </label>
                        <input
                            id="city"
                            {...register('city')}
                            className="mt-1 w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter city"
                        />
                        {errors.city && <p className="text-red-500 text-sm mt-1">{errors.city.message}</p>}
                    </div>

                    {/* Region */}
                    <div>
                        <label htmlFor="region" className="block text-sm font-medium text-gray-700">
                            Region
                        </label>
                        <input
                            id="region"
                            {...register('region')}
                            className="mt-1 w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter region"
                        />
                        {errors.region && <p className="text-red-500 text-sm mt-1">{errors.region.message}</p>}
                    </div>

                    {/* Markdown Description */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Description (Markdown)</label>
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
                        {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description.message}</p>}
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 disabled:bg-blue-300 transition"
                    >
                        {isSubmitting ? 'Saving...' : 'Add Hospital'}
                    </button>

                    {/* Feedback Message */}
                    {submitMessage && (
                        <p
                            className={`text-sm text-center ${submitMessage.type === 'success' ? 'text-green-500' : 'text-red-500'
                                }`}
                        >
                            {submitMessage.text}
                        </p>
                    )}
                </form>
            </div>
        </ProtectedRoute>
    );
}