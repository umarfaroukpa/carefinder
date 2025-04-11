"use client";

import { useState, useEffect } from 'react';
import { auth } from '../lib/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import Header from '../component/Header';
import Footer from '../component/Footer';

export default function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, loading] = useAuthState(auth);
    const [mounted, setMounted] = useState(false);

    // Handle hydration issues
    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return null;
    }

    if (loading) {
        return (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-white bg-opacity-75">
                <div className="text-center">
                    <p className="text-xl font-semibold text-[#056968] animate-pulse">Loading Please Wait...</p>
                </div>
            </div>
        );
    }

    return (
        <>
            <Header />
            <main className="pt-24">{children}</main> {/* Add padding-top to create space below the fixed header */}
            <Footer />
        </>
    );
}