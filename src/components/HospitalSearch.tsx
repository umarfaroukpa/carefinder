'use client';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import axios from 'axios';
import { Hospital } from '../types/Hospital';

const schema = yup.object({
    location: yup.string().required('Location is required'),
});

type FormData = yup.InferType<typeof schema>;

export default function HospitalSearch({ onSearch }: { onSearch: (hospitals: Hospital[]) => void }) {
    const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
        resolver: yupResolver(schema),
    });

    const onSubmit = async (data: FormData) => {
        try {
            const response = await axios.get('/api/hospitals', {
                params: { location: data.location }
            });
            onSearch(response.data);
        } catch (error) {
            console.error('Search failed:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <input
                {...register('location')}
                placeholder="Enter city or region"
                className="border p-2 rounded"
            />
            {errors.location && <p className="text-red-500">{errors.location.message}</p>}
            <button type="submit" className="ml-2 bg-blue-500 text-white p-2 rounded">
                Search
            </button>
        </form>
    );
}