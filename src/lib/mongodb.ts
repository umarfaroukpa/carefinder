import mongoose, { Mongoose } from 'mongoose';

let cachedConnection: Mongoose | null = null;

async function connectToDatabase(): Promise<Mongoose> {
    if (cachedConnection && mongoose.connection.readyState === 1) {
        console.log('Using cached MongoDB connection');
        return cachedConnection;
    }

    const MONGODB_URI: string = process.env.MONGODB_URI as string;
    if (!MONGODB_URI) {
        throw new Error('MONGODB_URI not found in environment variables');
    }

    console.log('Connecting to MongoDB...', MONGODB_URI.replace(/:([^@]+)@/, ':<hidden>@'));
    try {
        cachedConnection = await mongoose.connect(MONGODB_URI, {
            serverSelectionTimeoutMS: 5000,
            connectTimeoutMS: 10000,
        });
        console.log('Connected to MongoDB successfully');
        return cachedConnection;
    } catch (error) {
        console.error('MongoDB connection error:', error);
        cachedConnection = null;
        throw error;
    }
}

export default connectToDatabase;