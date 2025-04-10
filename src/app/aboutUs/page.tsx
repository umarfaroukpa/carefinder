'use client';
import Link from 'next/link';

export default function AboutUs() {
    return (
        <div className="bg-gray-100 min-h-screen py-12 pt-28">
            <div className="container mx-auto px-4">
                {/* Header Section */}
                <section className="text-center mb-12">
                    <h1 className="text-4xl md:text-5xl font-bold text-[#056968] mb-4">
                        About Carefinder
                    </h1>
                    <p className="text-lg md:text-xl text-[#edb138] max-w-2xl mx-auto">
                        Your trusted partner in navigating healthcare services in Nigeria.
                    </p>
                </section>

                {/* Mission Statement */}
                <section className="bg-white rounded-lg shadow-md p-6 mb-12">
                    <h2 className="text-2xl md:text-3xl font-semibold text-[#056968] mb-4">
                        Our Mission
                    </h2>
                    <p className="text-[#056968] leading-relaxed">
                        Access to healthcare in Nigeria can be challenging and thorough. It is absurd that the first thing to living is being healthy. Carefinder is a simple tool that aims to help users find, export, and share hospitals within the region, making healthcare more accessible and manageable for everyone.
                    </p>
                </section>

                {/* Services Section */}
                <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                    <div className="bg-white rounded-lg shadow-md p-6 text-center">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-12 w-12 mx-auto mb-4 text-[#056968]"
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
                        <h3 className="text-xl font-semibold text-[#056968] mb-2">
                            Find Healthcare Near You
                        </h3>
                        <p className="text-[#056968]">
                            Locate hospitals and clinics close to your location with ease.
                        </p>
                    </div>
                    <div className="bg-white rounded-lg shadow-md p-6 text-center">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-12 w-12 mx-auto mb-4 text-[#056968]"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M9 11h6"
                            />
                        </svg>
                        <h3 className="text-xl font-semibold text-[#056968] mb-2">
                            Find Doctors Near You
                        </h3>
                        <p className="text-[#056968]">
                            Connect with qualified doctors in your area quickly and efficiently.
                        </p>
                    </div>
                    <div className="bg-white rounded-lg shadow-md p-6 text-center">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-12 w-12 mx-auto mb-4 text-[#056968]"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M3 10h18M3 14h18m-9-4v8m-7 0h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
                            />
                        </svg>
                        <h3 className="text-xl font-semibold text-[#056968] mb-2">
                            Healthcare Providers in Nigeria
                        </h3>
                        <p className="text-[#056968]">
                            Explore a curated list of healthcare providers across Nigeria.
                        </p>
                    </div>
                    <div className="bg-white rounded-lg shadow-md p-6 text-center">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-12 w-12 mx-auto mb-4 text-[#056968]"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                            />
                        </svg>
                        <h3 className="text-xl font-semibold text-[#056968] mb-2">
                            Specialized Care Services
                        </h3>
                        <p className="text-[#056968]">
                            Access tailored healthcare solutions for your unique needs.
                        </p>
                    </div>
                </section>

                {/* Call to Action */}
                <section className="text-center">
                    <h2 className="text-2xl md:text-3xl font-semibold text-[#056968] mb-4">
                        Ready to Get Started?
                    </h2>
                    <p className="text-[#edb138] mb-6">
                        Join us in making healthcare accessible to all Nigerians.
                    </p>
                    <Link
                        href="/services"
                        className="inline-block bg-[#edb138] text-white px-6 py-3 rounded-md hover:bg-[#edb13b] hover:text-[#056968] transition-colors duration-300"
                    >
                        Explore Our Services
                    </Link>
                </section>
            </div>
        </div>
    );
}