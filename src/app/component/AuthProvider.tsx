"use client";

import { useState, useEffect } from 'react';
import { auth } from '../../lib/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import Header from './Header';
import Footer from './Footer';

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
            <div className="flex items-center justify-center min-h-screen">
                <p>Loading Please wait...</p>
            </div>
        );
    }

    return (
        <>
            <Header />
            <main>{children}</main>
            <Footer />
        </>
    );
}