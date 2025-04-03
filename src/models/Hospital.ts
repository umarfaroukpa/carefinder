import mongoose, { Schema, Model } from 'mongoose';

const hospitalSchema = new Schema({
    name: { type: String, required: true },
    address: { type: String, required: true },
    phone: String,
    email: { type: [String], default: ['No email provided'] },
    city: String,
    region: String,
    description: String,
    specializations: [String],
    coordinates: { type: [Number], default: [] },
    functionalStatus: { type: String, default: 'Unknown' },
}, { timestamps: true });

// Prevent model overwrite by checking if it already exists
export default (mongoose.models.Hospital || mongoose.model('Hospital', hospitalSchema)) as Model<any>;