import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import connectToDatabase from '../../../lib/mongodb';
import Hospital from '../../../models/Hospital';

// Validation schemas
const searchParamsSchema = z.object({
    searchTerm: z.string().min(1, "Search term is required"),
    searchType: z.enum(['location', 'name', 'specialization', 'issue']),
});

const hospitalSchema = z.object({
    name: z.string().min(1, "Hospital name is required"),
    address: z.string().min(1, "Address is required"),
    phone: z.string().min(1, "Phone number is required"),
    email: z.string().email("Invalid email").optional(),
    city: z.string().min(1, "City is required"),
    region: z.string().min(1, "Region is required"),
    description: z.string().min(1, "Description is required"),
});

export async function GET(request: NextRequest) {
    try {
        console.log('GET /api/hospitals - Starting request:', request.nextUrl.searchParams.toString());

        // Connect to database with timeout
        await Promise.race([
            connectToDatabase(),
            new Promise((_, reject) => setTimeout(() => reject(new Error('Database connection timeout')), 10000)),
        ]);
        console.log('Database connected successfully');

        const searchParams = Object.fromEntries(request.nextUrl.searchParams);
        console.log('Search params:', searchParams);

        const validatedParams = searchParamsSchema.parse(searchParams);
        console.log('Validated params:', validatedParams);

        let query = {};
        switch (validatedParams.searchType) {
            case 'location':
                query = {
                    $or: [
                        { city: { $regex: validatedParams.searchTerm, $options: 'i' } },
                        { region: { $regex: validatedParams.searchTerm, $options: 'i' } },
                        { address: { $regex: validatedParams.searchTerm, $options: 'i' } },
                    ],
                };
                break;
            case 'name':
                query = { name: { $regex: validatedParams.searchTerm, $options: 'i' } };
                break;
            case 'specialization':
            case 'issue':
                query = { specializations: { $regex: validatedParams.searchTerm, $options: 'i' } };
                break;
        }
        console.log('Query constructed:', query);

        const results = await Hospital.find(query).limit(50);
        console.log('Query results count:', results.length);

        const hospitals = results.map(hospital => ({
            id: hospital._id.toString(),
            name: hospital.name,
            location: `${hospital.city || 'Unknown'}, ${hospital.region || 'Unknown'}`,
            address: hospital.address,
            specializations: hospital.specializations || [],
            contactNumber: hospital.phone || 'Not provided',
        }));

        console.log('Returning response with hospitals:', hospitals.length);
        return NextResponse.json(hospitals, { status: 200 });
    } catch (error) {
        if (error instanceof z.ZodError) {
            console.error('Validation error:', error.errors);
            return NextResponse.json({ error: 'Validation Failed', details: error.errors }, { status: 400 });
        }
        console.error('Search error:', error);
        return NextResponse.json({ error: 'Internal Server Error', message: error instanceof Error ? error.message : 'Unknown error' }, { status: 500 });
    }
}

export async function POST(request: NextRequest) {
    try {
        await connectToDatabase();
        const body = await request.json();
        const validatedData = hospitalSchema.parse(body);

        const newHospital = new Hospital(validatedData);
        await newHospital.save();

        return NextResponse.json(
            { message: 'Hospital created successfully', id: newHospital._id },
            { status: 201 }
        );
    } catch (error) {
        if (error instanceof z.ZodError) {
            return NextResponse.json({ error: 'Validation Failed', details: error.errors }, { status: 400 });
        }
        console.error('Hospital creation error:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}

export const config = {
    api: {
        methods: ['GET', 'POST'],
    },
};