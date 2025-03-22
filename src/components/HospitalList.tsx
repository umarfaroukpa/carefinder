'use client';
import { ref, uploadString, getDownloadURL } from 'firebase/storage';
import { storage } from '../lib/firebase';
import { Hospital } from '../types/Hospital';

export default function HospitalList({ hospitals }: { hospitals: Hospital[] }) {
    const exportToCSV = async () => {
        const csv = [
            ['Name', 'Address', 'Phone', 'Email', 'City'],
            ...hospitals.map(h => [h.name, h.address, h.phone, h.email, h.city])
        ].map(row => row.join(',')).join('\n');

        const storageRef = ref(storage, `exports/hospitals-${Date.now()}.csv`);
        await uploadString(storageRef, csv);
        const url = await getDownloadURL(storageRef);
        window.open(url, '_blank');
    };

    return (
        <div>
            <button onClick={exportToCSV} className="mb-4 bg-green-500 text-white p-2 rounded">
                Export to CSV
            </button>
            <div className="grid gap-4">
                {hospitals.map(hospital => (
                    <div key={hospital._id} className="border p-4 rounded">
                        <h2 className="text-xl">{hospital.name}</h2>
                        <p>{hospital.address}</p>
                        <p>{hospital.phone}</p>
                        <p>{hospital.email}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}