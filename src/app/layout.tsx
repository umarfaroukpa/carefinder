import './styles/globals.css';
import { Toaster } from 'react-hot-toast';
import { AuthProviderContext } from '../component/auth/AuthContext';
import AuthProvider from '../component/AuthProvider';
import { ReactNode } from 'react';
import { Metadata } from 'next';
import ErrorBoundaryWithHooks from './errorRout/ErrorBoundary';

export const metadata: Metadata = {
  title: 'Carefinder',
  description: 'Find and book hospitals in Nigeria',
  icons: {
    icon: [
      {
        url: '/logo.png',
        sizes: '64x64',
        type: 'image/png',
      },
    ],
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className="overflow-x-hidden">
      <body className="overflow-x-hidden">
        <ErrorBoundaryWithHooks>
          <AuthProviderContext>
            <AuthProvider>
            <Toaster position="top-right" toastOptions={{ duration: 3000 }} />
            <main className="-mt-4 w-full">{ children }</main>
            </AuthProvider>
          </AuthProviderContext>
        </ErrorBoundaryWithHooks>
      </body>
    </html>
  );
}