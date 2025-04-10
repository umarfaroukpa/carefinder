// components/auth/ProtectedRoute.tsx
"use client";

import { ReactNode, useEffect, useState } from 'react';
import { useAuth } from './AuthContext';
import { useRouter } from 'next/navigation';
import { Loader2 } from 'lucide-react';

type ProtectedRouteProps = {
    children: ReactNode;
    requiredRole?: 'user' | 'moderator' | 'admin' | null;
    redirectTo?: string;
    fallback?: ReactNode;
};

export default function ProtectedRoute({
    children,
    requiredRole = null,
    redirectTo = '/', 
    fallback
}: ProtectedRouteProps) {
    const { currentUser, userData, loading, isAdmin, isModerator } = useAuth();
    const router = useRouter();
    const [isAuthorized, setIsAuthorized] = useState(false);

    useEffect(() => {
        if (!loading) {
            if (!currentUser) {
                router.push(redirectTo);
                return;
            }

            if (requiredRole) {
                if (requiredRole === 'admin' && !isAdmin) {
                    router.push('/');
                    return;
                }

                if (requiredRole === 'moderator' && !isModerator) {
                    router.push('/');
                    return;
                }
            }

            setIsAuthorized(true);
        }
    }, [currentUser, loading, requiredRole, isAdmin, isModerator, router, redirectTo]);

    if (loading) {
        return fallback || (
            <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
                <div className="flex flex-col items-center gap-2 text-[#056968]">
                    <Loader2 className="h-8 w-8 animate-spin text-[#edb138]" />
                    <div className="text-xl">Loading...</div>
                </div>
            </div>
        );
    }

    return isAuthorized ? <>{children}</> : null;
}