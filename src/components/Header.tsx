'use client';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../lib/firebase';
import { signOut } from 'firebase/auth';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

export default function Header() {
    const [user, loading] = useAuthState(auth);
    const [showServicesDropdown, setShowServicesDropdown] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
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
                        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:opacity-75">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="white">
                                <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
                            </svg>
                        </a>
                        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:opacity-75">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="white">
                                <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719.588-7.719 2.604 0 1.459.969 2.039 1.808 2.346-.548-.015-1.067-.166-1.518-.465 0 1.688 1.201 3.092 2.794 3.414-.292.08-.583.142-.891.142-.218 0-.432-.021-.641-.064.433 1.356 1.692 2.34 3.183 2.368-1.165.916-2.635 1.461-4.23 1.461-.275 0-.546-.016-.818-.046 1.518.975 3.326 1.541 5.27 1.541 6.326 0 9.781-5.24 9.781-9.781 0-.149-.003-.298-.01-.446.67-.483 1.254-1.087 1.713-1.774z" />
                            </svg>
                        </a>
                        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:opacity-75">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="white">
                                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.366.062 2.633.326 3.608 1.301.975.975 1.24 2.242 1.301 3.608.058 1.266.07 1.646.07 4.85 0 3.204-.012 3.584-.07 4.85-.062 1.366-.326 2.633-1.301 3.608-.975.975-1.24 2.242-1.301 3.608-.058 1.266-.07 1.646-.07 4.85 0 3.204.012 3.584.07 4.85.062 1.366.326 2.633 1.301 3.608.975.975 1.24 2.242 1.301 3.608.058 1.266.07 1.646.07 4.85 0 3.204-.012 3.584-.07 4.85-.062 1.366-.326 2.633-1.301 3.608-.975.975-1.24 2.242-1.301 3.608-.058 1.266-.07 1.646-.07 4.85zm-4.228 3.837h8.456c2.552 0 4.632 2.08 4.632 4.632v8.456c0 2.552-2.08 4.632-4.632 4.632h-8.456c-2.552 0-4.632-2.08-4.632-4.632v-8.456c0-2.552 2.08-4.632 4.632-4.632zm4.228 2.928c-2.48 0-4.493 2.013-4.493 4.493s2.013 4.493 4.493 4.493 4.493-2.013 4.493-4.493-2.013-4.493-4.493-4.493zm0 7.415c-1.628 0-2.922-1.294-2.922-2.922s1.294-2.922 2.922-2.922 2.922 1.294 2.922 2.922-1.294 2.922-2.922 2.922zm4.632-7.415c-.586 0-1.058.472-1.058 1.058s.472 1.058 1.058 1.058 1.058-.472 1.058-1.058-.472-1.058-1.058-1.058z" />
                            </svg>
                        </a>
                    </div>
                </div>
            </div>

            {/* Main Header */}
            <header
                className={`shadow-md transition-colors duration-300 ${isScrolled ? 'bg-[#056968] text-white' : 'bg-white text-[#056968]'
                    }`}
            >
                <div className="container mx-auto px-4 py-2 flex justify-between items-center">
                    <div className="flex items-center">
                        <Link href="/" className="text-xl font-bold">
                            <Image src="/logo.png" alt="Carefinder Logo" width={100} height={50} />
                        </Link>
                        <div className={`text-2xl ${isScrolled ? '' : 'text-[#056968]'}`}>
                            Carefinder
                        </div>
                    </div>

                    <nav className="hidden md:flex space-x-4">
                        <Link
                            href="/"
                            className={`${isScrolled ? 'text-white hover:text-[#edb13b]' : 'text-[#056968] hover:text-[#edb13b]'}`}
                        >
                            Home
                        </Link>
                        <div
                            className="relative"
                            onMouseEnter={() => setShowServicesDropdown(true)}
                            onMouseLeave={() => setShowServicesDropdown(false)}
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
                                >
                                    <path d="M6 9l6 6 6-6" />
                                </svg>
                            </Link>
                            {showServicesDropdown && (
                                <div
                                    className="absolute left-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-50"
                                    style={{ maxHeight: '240px', overflowY: 'auto' }}
                                >
                                    <div className="py-1">
                                        <Link
                                            href="/services/service1"
                                            className="block px-4 py-2 text-sm text-[#056968] hover:text-[#edb13b] hover:bg-gray-100"
                                        >
                                            Book Appointment
                                        </Link>
                                        <Link
                                            href="/services/service2"
                                            className="block px-4 py-2 text-sm text-[#056968] hover:text-[#edb13b] hover:bg-gray-100"
                                        >
                                            Home Services
                                        </Link>
                                        <Link
                                            href="/services/service3"
                                            className="block px-4 py-2 text-sm text-[#056968] hover:text-[#edb13b] hover:bg-gray-100"
                                        >
                                            Emergency Services
                                        </Link>
                                    </div>
                                </div>
                            )}
                        </div>
                        <Link
                            href="/about"
                            className={`${isScrolled ? 'text-white hover:text-[#edb13b]' : 'text-[#056968] hover:text-[#edb13b]'}`}
                        >
                            Patients Guide
                        </Link>
                        <Link
                            href="/about"
                            className={`${isScrolled ? 'text-white hover:text-[#edb13b]' : 'text-[#056968] hover:text-[#edb13b]'}`}
                        >
                            Providers
                        </Link>
                        <Link
                            href="/about"
                            className={`${isScrolled ? 'text-white hover:text-[#edb13b]' : 'text-[#056968] hover:text-[#edb13b]'}`}
                        >
                            About Us
                        </Link>
                        <Link
                            href="/admin"
                            className={`${isScrolled ? 'text-white hover:text-[#edb13b]' : 'text-[#056968] hover:text-[#edb13b]'}`}
                        >
                            Contact Us
                        </Link>
                    </nav>

                    <div className="flex items-center space-x-2">
                        {loading ? (
                            <span>Loading...</span>
                        ) : user ? (
                            <>
                                <span
                                    className={`text-sm ${isScrolled ? 'text-gray-200' : 'text-gray-600'}`}
                                >
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
                                    className={`text-lg text-white ${isScrolled
                                        ? 'bg-[#edb138] hover:bg-white hover:text-[#056968]'
                                        : 'bg-[#056968] hover:bg-[#edb138]'
                                        } px-3 py-1 rounded`}
                                >
                                    Login
                                </Link>
                                <Link
                                    href="/authpage"
                                    className={`text-lg text-white ${isScrolled
                                        ? ' text-[#056968] hover:bg-[#edb138]'
                                        : 'bg-[#edb138] hover:bg-[#056968]'
                                        } px-3 py-1 rounded`}
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