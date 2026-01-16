"use client";

import { AuthProviderContext } from '../component/auth/AuthContext';
import AuthProvider from '../component/AuthProvider';
import { ReactNode } from 'react';

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <AuthProviderContext>
      <AuthProvider>
        {children}
      </AuthProvider>
    </AuthProviderContext>
  );
}