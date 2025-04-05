'use client';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../../lib/firebase';
import { signOut } from 'firebase/auth';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

export default function Header() {
    const [user, loading] = useAuthState(auth);
    const [showServicesDropdown, setShowServicesDropdown] = useState<boolean>(false);
    const [isScrolled, setIsScrolled] = useState<boolean>(false);
    const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null); 
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false); 
    const router = useRouter();

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 50) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleLogout = async () => {
        await signOut(auth);
        router.push('/');
    };

    // Dropdown hover handlers
    const handleMouseEnter = () => {
        if (timeoutId) clearTimeout(timeoutId);
        setShowServicesDropdown(true);
    };

    const handleMouseLeave = () => {
        const id = setTimeout(() => setShowServicesDropdown(false), 200);
        setTimeoutId(id);
    };

    return (
        <div className="fixed w-full top-0 z-50">
            {/* Subheader */}
            <div className="bg-[#056968] text-white py-2">
                <div className="container mx-auto px-4 flex justify-between items-center">
                    <div className="text-sm">
                        <a href="mailto:info@carefinder.com" className="hover:underline">
                            info@carefinder.com
                        </a>
                    </div>
                    <div className="flex space-x-4">
                        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5 hover:text-[#edb13b]"
                                fill="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
                            </svg>
                        </a>
                        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5 hover:text-[#edb13b]"
                                fill="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719 2.165-7.719 5.144 0 2.987-1.915 5.639-4.567 5.639-1.14 0-2.223-.315-3.126-.876.254.614.801 1.562 1.015 2.49-.609-.402-1.28-.695-2.048-.788-.762-.093-1.56-.093-2.322 0-3.752 1.016-5.318 4.747-3.594 8.29 1.524-1.198 2.668-2.82 3.367-4.557-.762.876-1.726 1.562-2.795 1.955z" />
                            </svg>
                        </a>
                        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5 hover:text-[#edb13b]"
                                fill="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.366.062 2.633.326 3.608 1.301.975.975 1.24 2.242 1.301 3.608.058 1.266.07 1.646.07 4.85 0 3.204-.012 3.584-.07 4.85-.062 1.366-.326 2.633-1.301 3.608-1.301.975-1.24 2.242-1.301 3.608-.058 1.266-.07 1.646-.07 4.85 0 3.204.012 3.584.07 4.85.062 1.366.326 2.633 1.301 3.608 1.301.975 1.24 2.242 1.301 3.608.058 1.266.07 1.646.07 4.85 0 3.204-.012 3.584-.07 4.85-.062 1.366-.326 2.633-1.301 3.608-1.301.975-1.24 2.242-1.301 3.608-.058 1.266-.07 1.646-.07 4.85 0-3.204zM12 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zm0 10.162a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 11-2.88 0 1.44 1.44 0 012.88 0z" />
                            </svg>
                        </a>
                    </div>
                </div>
            </div>

            {/* Main Header */}
            <header
                className= {`shadow-md transition-colors duration-300 ${isScrolled ? 'bg-[#056968] text-white' : 'bg-white text-[#056968]'}`}
            >
                <div className="container mx-auto px-4 py-2 flex justify-between items-center ">
                    <div className="flex items-center">
                        <Link href="/" className="text-xl font-bold">
                            <Image src="/logo.png" alt="Carefinder Logo" width={100} height={50} />
                        </Link>
                        <div className={`text-2xl ${isScrolled ? '' : 'text-[#056968]'}`}>
                            Carefinder
                        </div>
                    </div>

                    {/* Mobile Menu Toggle */}
                    <button
                        className="md:hidden text-2xl"
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    >
                        {isMobileMenuOpen ? '✕' : '☰'}
                    </button>

                    {/* Desktop Nav */}
                    <nav className="hidden md:flex space-x-4">
                        <Link
                            href="/"
                            className={`${isScrolled ? 'text-white hover:text-[#edb13b]' : 'text-[#056968] hover:text-[#edb13b]'}`}
                        >
                            Home
                        </Link>
                        <Link
                            href="/aboutUs"
                            className={`${isScrolled ? 'text-white hover:text-[#edb13b]' : 'text-[#056968] hover:text-[#edb13b]'}`}
                        >
                            About
                        </Link>
                        {/* Services Dropdown */}
                        <div
                            className="relative"
                            onMouseEnter={handleMouseEnter}
                            onMouseLeave={handleMouseLeave}
                        >
                            <Link
                                href="#"
                                className={`${isScrolled ? 'text-white hover:text-[#edb13b]' : 'text-[#056968] hover:text-[#edb13b]'} flex items-center gap-1`}
                                onClick={(e) => {
                                    e.preventDefault();
                                    setShowServicesDropdown(!showServicesDropdown);
                                }}
                            >
                                Services
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="16"
                                    height="16"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className={`transition-transform duration-300 ${showServicesDropdown ? 'rotate-180' : ''}`}
                                >
                                    <path d="M6 9l6 6 6-6" />
                                </svg>
                            </Link>
                            {showServicesDropdown && (
                                <div
                                    className="absolute left-0 mt-2 w-96 md:w-96 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-[100] transition-all duration-300 ease-in-out"
                                >
                                    <div className="py-2 grid  grid-cols-2 md:grid-cols-3 gap-4">
                                        <div className="col-span-2 md:col-span-3 text-center px-3 py-2 bg-gray-50 text-sm font-medium text-[#056968]">
                                            Healthcare Services
                                        </div>
                                        <Link
                                            href="/bookingServices"
                                            className="flex items-center  py-3 text-sm text-gray-700 hover:text-[#edb13b] hover:bg-gray-50 group"
                                        >
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                className="h-5 w-5 mr-3 text-gray-400 group-hover:text-[#edb13b]"
                                                viewBox="0 0 20 20"
                                                fill="currentColor"
                                            >
                                                <path
                                                    fillRule="evenodd"
                                                    d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                                                    clipRule="evenodd"
                                                />
                                            </svg>
                                            Book Appointment
                                        </Link>
                                        <Link
                                            href="/homeServices"
                                            className="flex items-center px-4 py-3 text-sm text-gray-700 hover:text-[#edb13b] hover:bg-gray-50 group"
                                        >
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                className="h-5 w-5 mr-3 text-gray-400 group-hover:text-[#edb13b]"
                                                viewBox="0 0 20 20"
                                                fill="currentColor"
                                            >
                                                <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                                            </svg>
                                            Home Care Services
                                        </Link>
                                        <Link
                                            href="/emergencyServices"
                                            className="flex items-center px-4 py-3 text-sm text-gray-700 hover:text-[#edb13b] hover:bg-gray-50 group"
                                        >
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                className="h-5 w-5 mr-3 text-gray-400 group-hover:text-[#edb13b]"
                                                viewBox="0 0 20 20"
                                                fill="currentColor"
                                            >
                                                <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM14 11a1 1 0 011 1v1h1a1 1 0 110 2h-1v1a1 1 0 11-2 0v-1h-1a1 1 0 110-2h1v-1a1 1 0 011-1z" />
                                            </svg>
                                            Emergency Services
                                        </Link>
                                        <div className="col-span-2 text-center md:col-span-3 px-3 py-2 bg-gray-50 text-sm font-medium text-[#056968]">
                                            Specialized Care
                                        </div>
                                        <Link
                                            href="/pediatric"
                                            className="flex items-center px-4 py-3 text-sm text-gray-700 hover:text-[#edb13b] hover:bg-gray-50 group"
                                        >
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                className="h-5 w-5 mr-3 text-gray-400 group-hover:text-[#edb13b]"
                                                viewBox="0 0 20 20"
                                                fill="currentColor"
                                            >
                                                <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
                                            </svg>
                                            Pediatric Care
                                        </Link>
                                        <Link
                                            href="/seniorCareServices"
                                            className="flex items-center px-4 py-3 text-sm text-gray-700 hover:text-[#edb13b] hover:bg-gray-50 group"
                                        >
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                className="h-5 w-5 mr-3 text-gray-400 group-hover:text-[#edb13b]"
                                                viewBox="0 0 20 20"
                                                fill="currentColor"
                                            >
                                                <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                                            </svg>
                                            Senior Care
                                        </Link>
                                    </div>
                                </div>
                            )}
                        </div>
                        <Link
                            href="/contactUs"
                            className={`${isScrolled ? 'text-white hover:text-[#edb13b]' : 'text-[#056968] hover:text-[#edb13b]'}`}
                        >
                            Contact
                        </Link>
                        <Link
                            href="/admin"
                            className={`${isScrolled ? 'text-white hover:text-[#edb13b]' : 'text-[#056968] hover:text-[#edb13b]'}`}
                        >
                            Admin
                        </Link>
                    </nav>

                    {/* Mobile Menu */}
                    {isMobileMenuOpen && (
                        <nav className="md:hidden bg-white text-[#056968] absolute top-[calc(100%+40px)] left-0 w-full shadow-md">
                            <div className="flex flex-col space-y-2 px-4 py-2">
                                <Link href="/" className="hover:text-[#edb13b]">
                                    Home
                                </Link>
                                <Link href="/aboutUs" className="hover:text-[#edb13b]">
                                    About
                                </Link>
                                <div className="relative">
                                    <button
                                        className="flex items-center gap-1 hover:text-[#edb13b]"
                                        onClick={() => setShowServicesDropdown(!showServicesDropdown)}
                                    >
                                        Services
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="16"
                                            height="16"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            className={`transition-transform duration-300 ${showServicesDropdown ? 'rotate-180' : ''}`}
                                        >
                                            <path d="M6 9l6 6 6-6" />
                                        </svg>
                                    </button>
                                    {showServicesDropdown && (
                                        <div className="pl-4 mt-2 space-y-2">
                                            <div className="text-sm font-medium text-[#056968]">Healthcare Services</div>
                                            <Link href="/bookingServices" className="block text-sm hover:text-[#edb13b]">
                                                Book Appointment
                                            </Link>
                                            <Link href="/homeServices" className="block text-sm hover:text-[#edb13b]">
                                                Home Care Services
                                            </Link>
                                            <Link href="/emergencyServices" className="block text-sm hover:text-[#edb13b]">
                                                Emergency Services
                                            </Link>
                                            <div className="text-sm font-medium text-[#056968]">Specialized Care</div>
                                            <Link href="/pediatric" className="block text-sm hover:text-[#edb13b]">
                                                Pediatric Care
                                            </Link>
                                            <Link href="/seniorCareServices" className="block text-sm hover:text-[#edb13b]">
                                                Senior Care
                                            </Link>
                                        </div>
                                    )}
                                </div>
                                <Link href="/contactUs" className="hover:text-[#edb13b]">
                                    Contact
                                </Link>
                                <Link href="/admin" className="hover:text-[#edb13b]">
                                    Admin
                                </Link>
                            </div>
                        </nav>
                    )}

                    {/* Auth Section */}
                    <div className="flex items-center space-x-2">
                        {loading ? (
                            <span>Loading...</span>
                        ) : user ? (
                            <>
                                <span className={`text-sm ${isScrolled ? 'text-gray-200' : 'text-gray-600'}`}>
                                    Welcome, {user.email}
                                </span>
                                <button
                                    onClick={handleLogout}
                                    className="text-sm text-white bg-red-500 px-2 py-1 rounded hover:bg-red-600"
                                >
                                    Logout
                                </button>
                            </>
                        ) : (
                            <>
                                <Link
                                    href="/authpage"
                                    className={`text-lg text-white ${isScrolled ? 'bg-[#edb138] hover:bg-white hover:text-[#056968]' : 'bg-[#056968] hover:bg-[#edb138]'} px-3 py-1 rounded`}
                                >
                                    Login
                                </Link>
                                <Link
                                    href="/authpage"
                                    className={`text-lg text-white ${isScrolled ? 'bg-white text-[#056968] hover:bg-[#edb138]' : 'bg-[#edb138] hover:bg-[#056968]'} px-3 py-1 rounded`}
                                >
                                    Signup
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            </header>
        </div>
    );
}