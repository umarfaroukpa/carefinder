'use client';
import { useState } from 'react';
import { Hospital } from '../types/Hospital';
import { getFunctions, httpsCallable } from 'firebase/functions';

export default function ShareButton({ hospitals }: { hospitals: Hospital[] }) {
    const [email, setEmail] = useState('');
    const functions = getFunctions();

    const shareViaEmail = async () => {
        const sendHospitalList = httpsCallable(functions, 'sendHospitalList');
        await sendHospitalList({ email, hospitals });
        setEmail('');
        alert('List shared successfully!');
    };

    return (
        <div>
            <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter email to share"
                className="border p-2 rounded"
            />
            <button
                onClick={shareViaEmail}
                className="ml-2 bg-purple-500 text-white p-2 rounded"
            >
                Share via Email
            </button>
        </div>
    );
}