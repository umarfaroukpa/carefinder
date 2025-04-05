'use client';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useDocument } from 'react-firebase-hooks/firestore';
import { doc } from 'firebase/firestore';
import { auth, db } from '../../../lib/firebase';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function ProtectedRoute({ children, adminOnly = false }: { children: React.ReactNode, adminOnly?: boolean }) {
    const [user, loading] = useAuthState(auth);
    const [userDoc, userDocLoading] = useDocument(
        user ? doc(db, 'users', user.uid) : null
    );
    const router = useRouter();

    useEffect(() => {
        if (!loading && !user) {
            router.push('/authpage');
        } else if (!loading && user && adminOnly && userDoc && !userDoc.data()?.isAdmin) {
            // Redirect non-admin users to home
            router.push('/');
        }
    }, [user, loading, router, adminOnly, userDoc, userDocLoading]);

    if (loading || userDocLoading) return <div>Loading...</div>;
    if (!user || (adminOnly && !userDoc?.data()?.isAdmin)) return null;

    return <>{children}</>;
}