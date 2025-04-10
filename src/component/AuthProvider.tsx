// component/auth/AuthProvider.tsx

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
            <div className="fixed inset-0 flex items-center justify-center bg-gray-100 bg-opacity-75 z-50">
                <p className="text-lg font-semibold text-gray-800">Please Wait...</p>
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