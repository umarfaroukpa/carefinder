'use client';
import { useState, FormEvent, ChangeEvent } from 'react';

// Define interface for form data
interface FormData {
    name: string;
    email: string;
    message: string;
}

export default function ContactUs() {
    const [formData, setFormData] = useState<FormData>({
        name: '',
        email: '',
        message: '',
    });
    const [status, setStatus] = useState<string>('');

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setStatus('Sending...');

        // Simulate form submission (replace with actual API call)
        try {
            // Example: await fetch('/api/contact', { method: 'POST', body: JSON.stringify(formData) });
            setTimeout(() => {
                setStatus('Message sent successfully!');
                setFormData({ name: '', email: '', message: '' });
            }, 1000);
        } catch (error) {
            setStatus('Failed to send message. Please try again.');
        }
    };

    return (
        <div className="bg-gray-100 pt-24 min-h-screen py-12">
            <div className="container mx-auto px-4">
                {/* Header Section */}
                <section className="text-center mb-12">
                    <h1 className="text-4xl md:text-5xl font-bold text-[#056968] mb-4">
                        Contact Us
                    </h1>
                    <p className="text-lg md:text-xl text-[#056968] max-w-2xl mx-auto">
                        We're here to assist you with your healthcare needs. Reach out today!
                    </p>
                </section>

                {/* Contact Info and Form */}
                <section className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                    {/* Contact Information */}
                    <div className="bg-white rounded-lg shadow-md p-6">
                        <h2 className="text-2xl font-semibold text-[#056968] mb-4">
                            Get in Touch
                        </h2>
                        <div className="space-y-4">
                            <div className="flex items-center">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-6 w-6 text-[#edb138] mr-3"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.828 0l-4.243-4.243a8 8 0 1111.314 0z"
                                    />
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                                    />
                                </svg>
                                <p className="text-[#056968]">
                                    Kaduna, North West Region, Nigeria
                                </p>
                            </div>
                            <div className="flex items-center">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-6 w-6 text-[#edb138] mr-3"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                                    />
                                </svg>
                                <a
                                    href="mailto:info@carefinder.com"
                                    className="text-[#056968] hover:text-[#edb13b]"
                                >
                                    info@carefinder.com
                                </a>
                            </div>
                            <div className="flex items-center">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-6 w-6 text-[#edb138] mr-3"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                                    />
                                </svg>
                                <p className="text-[#056968]">
                                    +234 123 456 7890
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Contact Form */}
                    <div className="bg-white rounded-lg shadow-md p-6">
                        <h2 className="text-2xl font-semibold text-[#056968] mb-4">
                            Send Us a Message
                        </h2>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label
                                    htmlFor="name"
                                    className="block text-sm font-medium text-[#056968]"
                                >
                                    Name
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                    className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#056968] focus:border-transparent"
                                />
                            </div>
                            <div>
                                <label
                                    htmlFor="email"
                                    className="block text-sm font-medium text-[#056968]"
                                >
                                    Email
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                    className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#056968] focus:border-transparent"
                                />
                            </div>
                            <div>
                                <label
                                    htmlFor="message"
                                    className="block text-sm font-medium text-[#056968]"
                                >
                                    Message
                                </label>
                                <textarea
                                    id="message"
                                    name="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    required
                                    rows={4}
                                    className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#056968] focus:border-transparent"
                                />
                            </div>
                            <button
                                type="submit"
                                className="w-full bg-[#edb138] text-white px-4 py-2 rounded-md hover:bg-[#edb13b] hover:text-[#056968] transition-colors duration-300"
                            >
                                Send Message
                            </button>
                            {status && (
                                <p
                                    className={`text-center mt-2 ${status.includes('success')
                                        ? 'text-green-600'
                                        : 'text-red-600'
                                        }`}
                                >
                                    {status}
                                </p>
                            )}
                        </form>
                    </div>
                </section>

                {/* Map Section with Google Maps iframe */}
                <section className="text-center">
                    <h2 className="text-2xl md:text-3xl font-semibold text-[#056968] mb-4">
                        Our Location
                    </h2>
                    <div className="bg-white rounded-lg shadow-md p-6 max-w-2xl mx-auto">
                        <p className="text-[#056968] mb-4">
                            Kaduna, North West Region, Nigeria
                        </p>
                        {/* Google Maps iframe */}
                        <div className="w-full h-64 rounded-md overflow-hidden">
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d252621.00409230212!2d7.33929385!3d10.52599185!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x11b295a1e5c0c9a3%3A0x4697e3483cacf81d!2sKaduna%2C%20Nigeria!5e0!3m2!1sen!2sus!4v1712441992095!5m2!1sen!2sus"
                                width="100%"
                                height="100%"
                                style={{ border: 0 }}
                                allowFullScreen={true}
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                                title="Google Maps"
                            ></iframe>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
}