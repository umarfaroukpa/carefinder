import './styles/globals.css';
import AuthProvider from '../components/AuthProvider';
import { ReactNode } from 'react';
import { Metadata } from 'next';
import Header from '../components/Header';

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
        <AuthProvider>
          <Header />
          <main className="pt-18 w-full">{children}</main>
        </AuthProvider>
      </body>
    </html>
  );
}