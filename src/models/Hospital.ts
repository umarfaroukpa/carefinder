import mongoose, { Schema, Model, Document } from "mongoose";

export interface IHospital extends Document {
  name: string;
  address: string;
  phone?: string;
  email?: string;
  city?: string;
  region?: string;
  description?: string;
  specializations?: string[];
  coordinates?: number[];
  functionalStatus?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

const hospitalSchema = new Schema<IHospital>(
  {
    name: { type: String, required: true },
    address: { type: String, required: true },
    phone: { type: String },
    email: { type: String },
    city: { type: String },
    region: { type: String },
    description: { type: String },
    specializations: { type: [String], default: [] },
    coordinates: { type: [Number], default: [] },
    functionalStatus: { type: String, default: "Unknown" },
  },
  { timestamps: true }
);

// Prevent model overwrite
const Hospital: Model<IHospital> = mongoose.models.Hospital || mongoose.model<IHospital>("Hospital", hospitalSchema);

export default Hospital;