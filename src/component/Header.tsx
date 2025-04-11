'use client';
import { useAuth } from './auth/AuthContext';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { UserCircle } from 'lucide-react';

export default function Header() {
    const { currentUser, logoutUser, loading } = useAuth();
    const [showServicesDropdown, setShowServicesDropdown] = useState<boolean>(false);
    const [isScrolled, setIsScrolled] = useState<boolean>(false);
    const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
    const router = useRouter();

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleLogout = async () => {
        await logoutUser();
    };

    const handleMouseEnter = () => {
        if (timeoutId) clearTimeout(timeoutId);
        setShowServicesDropdown(true);
    };

    const handleMouseLeave = () => {
        const id = setTimeout(() => setShowServicesDropdown(false), 200);
        setTimeoutId(id);
    };

    const handleProtectedLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
        e.preventDefault();
        if (!currentUser) {
            router.push('/authpage');
        } else {
            router.push(href);
            setIsMobileMenuOpen(false);
        }
    };

    if (loading) {
        return null;
    }

    return (
        <div className="fixed w-full top-0 z-50">
            {/* Subheader */}
            <div className="bg-[#056968] text-white py-2">
                <div className="container mx-auto px-4 flex flex-col sm:flex-row justify-between items-center">
                    <div className="text-sm mb-2 sm:mb-0">
                        <a href="mailto:info@carefinder.com" className="hover:underline">
                            info@carefinder.com
                        </a>
                    </div>
                    <div className="flex space-x-4">
                        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:opacity-80 transition-opacity">
                            <svg className="h-5 w-5 text-white hover:text-[#edb13b] transition-colors" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M18.77 7.46H14.5v-1.9c0-.9.6-1.1 1-1.1h3V.5h-4.33C10.24.5 9.5 3.44 9.5 5.32v2.15h-3v4h3v12h5v-12h3.85l.42-4z" />
                            </svg>
                        </a>
                        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:opacity-80 transition-opacity">
                            <svg className="h-5 w-5 text-white hover:text-[#edb13b] transition-colors" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M23.44 4.83c-.8.37-1.5.38-2.22.02.93-.56.98-.96 1.32-2.02-.88.52-1.86.9-2.9 1.1-.82-.88-2-1.43-3.3-1.43-2.5 0-4.55 2.04-4.55 4.54 0 .36.03.7.1 1.04-3.77-.2-7.12-2-9.36-4.75-.4.67-.6 1.45-.6 2.3 0 1.56.8 2.95 2 3.77-.74-.03-1.44-.23-2.05-.57v.06c0 2.2 1.56 4.03 3.64 4.44-.67.2-1.37.2-2.06.08.58 1.8 2.26 3.12 4.25 3.16C5.78 18.1 3.37 18.74 1 18.46c2 1.3 4.4 2.04 6.97 2.04 8.35 0 12.92-6.92 12.92-12.93 0-.2 0-.4-.02-.6.9-.63 1.96-1.22 2.56-2.14z" />
                            </svg>
                        </a>
                        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:opacity-80 transition-opacity">
                            <svg className="h-5 w-5 text-white hover:text-[#edb13b] transition-colors" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M12 2.16c3.2 0 3.58.01 4.85.07 3.25.15 4.77 1.7 4.92 4.92.06 1.27.07 1.65.07 4.85 0 3.2-.01 3.58-.07 4.85-.15 3.23-1.66 4.77-4.92 4.92-1.27.06-1.64.07-4.85.07-3.2 0-3.58-.01-4.85-.07-3.26-.15-4.77-1.7-4.92-4.92-.06-1.27-.07-1.64-.07-4.85 0-3.2.01-3.58.07-4.85.15-3.23 1.67-4.77 4.92-4.92 1.27-.06 1.65-.07 4.85-.07zM12 0C8.74 0 8.33.01 7.05.07 2.7.27.27 2.7.07 7.05.01 8.33 0 8.74 0 12c0 3.26.01 3.67.07 4.95.2 4.36 2.62 6.78 6.98 6.98 1.28.06 1.7.07 4.95.07 3.26 0 3.67-.01 4.95-.07 4.35-.2 6.78-2.62 6.98-6.98.06-1.28.07-1.7.07-4.95 0-3.26-.01-3.67-.07-4.95-.2-4.35-2.62-6.78-6.98-6.98C15.67.01 15.26 0 12 0zm0 5.84c-3.4 0-6.16 2.76-6.16 6.16 0 3.4 2.76 6.16 6.16 6.16 3.4 0 6.16-2.76 6.16-6.16 0-3.4-2.76-6.16-6.16-6.16zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm6.4-11.85c-.8 0-1.44.65-1.44 1.44s.65 1.44 1.44 1.44c.8 0 1.44-.65 1.44-1.44s-.65-1.44-1.44-1.44z" />
                            </svg>
                        </a>
                    </div>
                </div>
            </div>

            {/* Main Header */}
            <header
                className={`shadow-md transition-colors duration-300 ${isScrolled ? 'bg-[#056968] text-white' : 'bg-white text-[#056968]'}`}
            >
                <div className="container mx-auto px-4 py-2 flex justify-between items-center flex-wrap">
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
                        className="md:hidden text-2xl focus:outline-none"
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    >
                        {isMobileMenuOpen ? '✕' : '☰'}
                    </button>

                    {/* Desktop Nav */}
                    <nav className="hidden md:flex md:items-center md:space-x-6">
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
                        <div className="relative" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
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
                                <div className="absolute left-0 mt-2 w-72 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-[100] transition-all duration-300 ease-in-out">
                                    <div className="py-2">
                                        <div className="px-3 py-2 bg-gray-50 text-sm font-medium text-[#056968]">Healthcare Services</div>
                                        <Link
                                            href="/bookingServices"
                                            className="flex items-center px-4 py-2 text-sm text-gray-700 hover:text-[#edb13b] hover:bg-gray-50"
                                            onClick={(e) => handleProtectedLinkClick(e, '/bookingServices')}
                                        >
                                            Book Appointment
                                        </Link>
                                        <Link
                                            href="/homeServices"
                                            className="flex items-center px-4 py-2 text-sm text-gray-700 hover:text-[#edb13b] hover:bg-gray-50"
                                            onClick={(e) => handleProtectedLinkClick(e, '/homeServices')}
                                        >
                                            Home Care Services
                                        </Link>
                                        <Link
                                            href="/emergencyServices"
                                            className="flex items-center px-4 py-2 text-sm text-gray-700 hover:text-[#edb13b] hover:bg-gray-50"
                                            onClick={(e) => handleProtectedLinkClick(e, '/emergencyServices')}
                                        >
                                            Emergency Services
                                        </Link>
                                        <div className="px-3 py-2 bg-gray-50 text-sm font-medium text-[#056968]">Specialized Care</div>
                                        <Link
                                            href="/pediatric"
                                            className="flex items-center px-4 py-2 text-sm text-gray-700 hover:text-[#edb13b] hover:bg-gray-50"
                                            onClick={(e) => handleProtectedLinkClick(e, '/pediatric')}
                                        >
                                            Pediatric Care
                                        </Link>
                                        <Link
                                            href="/seniorCareServices"
                                            className="flex items-center px-4 py-2 text-sm text-gray-700 hover:text-[#edb13b] hover:bg-gray-50"
                                            onClick={(e) => handleProtectedLinkClick(e, '/seniorCareServices')}
                                        >
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
                            onClick={(e) => handleProtectedLinkClick(e, '/admin')}
                        >
                            Admin
                        </Link>
                    </nav>

                    {/* Desktop Auth Section */}
                    <div className="hidden md:flex items-center space-x-2">
                        {currentUser ? (
                            <>
                                <Link href="/useraccount" className="flex items-center space-x-1">
                                    <UserCircle className={`h-6 w-6 ${isScrolled ? 'text-white hover:text-[#edb13b]' : 'text-[#056968] hover:text-[#edb13b]'}`} />
                                    {/* <span className={`text-sm ${isScrolled ? 'text-gray-200' : 'text-gray-600'}`}>
                    {currentUser.email}
                  </span> */}
                                </Link>
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
                                    className={`text-sm text-white ${isScrolled ? 'bg-[#edb138] hover:bg-white hover:text-[#056968]' : 'bg-[#056968] hover:bg-[#edb138]'} px-3 py-1 rounded`}
                                >
                                    Login
                                </Link>
                                <Link
                                    href="/authpage"
                                    className={`text-sm text-white ${isScrolled ? 'bg-[#edb138] text-[#056968] hover:bg-[#edb138]' : 'bg-[#edb138] hover:bg-[#056968]'} px-3 py-1 rounded`}
                                >
                                    Signup
                                </Link>
                            </>
                        )}
                    </div>
                </div>

                {/* Mobile Menu */}
                <nav
                    className={`md:hidden w-full bg-white text-[#056968] absolute left-0 top-full shadow-md transition-all duration-300 ease-in-out ${isMobileMenuOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0 overflow-hidden'}`}
                >
                    <div className="flex flex-col space-y-2 px-4 py-4">
                        <Link
                            href="/"
                            className="hover:text-[#edb13b] py-2"
                            onClick={(e) => setIsMobileMenuOpen(false)}
                        >
                            Home
                        </Link>
                        <Link
                            href="/aboutUs"
                            className="hover:text-[#edb13b] py-2"
                            onClick={() => setIsMobileMenuOpen(false)}
                        >
                            About
                        </Link>
                        <div className="relative">
                            <button
                                className="flex items-center gap-1 hover:text-[#edb13b] py-2 w-full text-left"
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
                                <div className="pl-4 space-y-2">
                                    <div className="text-sm font-medium text-[#056968] py-1">Healthcare Services</div>
                                    <Link
                                        href="/bookingServices"
                                        className="block text-sm hover:text-[#edb13b] py-1"
                                        onClick={(e) => handleProtectedLinkClick(e, '/bookingServices')}
                                    >
                                        Book Appointment
                                    </Link>
                                    <Link
                                        href="/homeServices"
                                        className="block text-sm hover:text-[#edb13b] py-1"
                                        onClick={(e) => handleProtectedLinkClick(e, '/homeServices')}
                                    >
                                        Home Care Services
                                    </Link>
                                    <Link
                                        href="/emergencyServices"
                                        className="block text-sm hover:text-[#edb13b] py-1"
                                        onClick={(e) => handleProtectedLinkClick(e, '/emergencyServices')}
                                    >
                                        Emergency Services
                                    </Link>
                                    <div className="text-sm font-medium text-[#056968] py-1">Specialized Care</div>
                                    <Link
                                        href="/pediatric"
                                        className="block text-sm hover:text-[#edb13b] py-1"
                                        onClick={(e) => handleProtectedLinkClick(e, '/pediatric')}
                                    >
                                        Pediatric Care
                                    </Link>
                                    <Link
                                        href="/seniorCareServices"
                                        className="block text-sm hover:text-[#edb13b] py-1"
                                        onClick={(e) => handleProtectedLinkClick(e, '/seniorCareServices')}
                                    >
                                        Senior Care
                                    </Link>
                                </div>
                            )}
                        </div>
                        <Link
                            href="/contactUs"
                            className="hover:text-[#edb13b] py-2"
                            onClick={() => setIsMobileMenuOpen(false)}
                        >
                            Contact
                        </Link>
                        <Link
                            href="/admin"
                            className="hover:text-[#edb13b] py-2"
                            onClick={(e) => handleProtectedLinkClick(e, '/admin')}
                        >
                            Admin
                        </Link>
                    </div>
                </nav>

                {/* Mobile Auth Section */}
                {isMobileMenuOpen && (
                    <div className="md:hidden px-4 py-2 bg-white border-t">
                        {currentUser ? (
                            <div className="flex flex-col space-y-2">
                                <Link href="/useraccount" className="flex items-center space-x-1" onClick={() => setIsMobileMenuOpen(false)}>
                                    <UserCircle className="h-6 w-6 text-[#056968] hover:text-[#edb13b]" />
                                    {/* <span className="text-sm text-gray-600">{currentUser.email}</span> */}
                                </Link>
                                <button
                                    onClick={handleLogout}
                                    className="text-sm text-white bg-red-500 px-2 py-1 rounded hover:bg-red-600 w-full"
                                >
                                    Logout
                                </button>
                            </div>
                        ) : (
                            <div className="flex flex-col space-y-2">
                                <Link
                                    href="/authpage"
                                    className="text-sm text-white bg-[#056968] hover:bg-[#edb138] px-3 py-1 rounded text-center"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                >
                                    Login
                                </Link>
                                <Link
                                    href="/authpage"
                                    className="text-sm text-white bg-[#edb138] hover:bg-[#056968] px-3 py-1 rounded text-center"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                >
                                    Signup
                                </Link>
                            </div>
                        )}
                    </div>
                )}
            </header>
        </div>
    );
}