import Head from 'next/head';
import ProtectedRoute from '../../components/auth/ProtectedRoute';
import MarkdownEditor from '../../components/MarkdownEditor';
import { useState } from 'react';
import axios from 'axios';

export default function Admin() {
    const [hospitalData, setHospitalData] = useState({
        name: '', address: '', phone: '', email: '', city: '', region: ''
    });

    const handleSave = async (description: string) => {
        await axios.post('/api/hospitals', { ...hospitalData, description });
        // Reset form or show success message
    };

    return (
        <ProtectedRoute>
            <div className="container mx-auto p-4">
                <Head>
                    <title>Carefinder - Admin Dashboard</title>
                </Head>
                <h1 className="text-3xl mb-4">Admin Dashboard</h1>
                {/* Form inputs for hospital data */}
                <MarkdownEditor onSave={handleSave} />
            </div>
        </ProtectedRoute>
    );
}