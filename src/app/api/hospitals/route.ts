import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import mongoose from "mongoose";
import connectToDatabase from "../../../lib/mongodb";
import Hospital, { IHospital } from "../../../models/Hospital";

const searchParamsSchema = z.object({
  searchTerm: z.string().min(1, "Search term is required"),
  searchType: z.enum(["location", "name", "specialization", "issue"]),
});

const hospitalSchema = z.object({
  name: z.string().min(1, "Hospital name is required"),
  address: z.string().min(1, "Address is required"),
  phone: z.string().min(1, "Phone number is required"),
  email: z.string().email("Invalid email").optional(),
  city: z.string().min(1, "City is required"),
  region: z.string().min(1, "Region is required"),
  description: z.string().min(1, "Description is required"),
  specializations: z.array(z.string()).optional(),
});

// Define interface for LocationIQ response
interface LocationIQResponseItem {
  place_id?: string;
  display_name?: string;
  lat?: string;
  lon?: string;
  address?: {
    city?: string;
    town?: string;
    state?: string;
    phone?: string;
  };
}

async function searchExternalHospitals(searchTerm: string): Promise<LocationIQResponseItem[]> {
  const maxRetries = 3;
  let attempt = 0;

  while (attempt < maxRetries) {
    try {
      const url = `https://us1.locationiq.com/v1/search?` + new URLSearchParams({
        key: process.env.LOCATIONIQ_TOKEN!,
        q: `${searchTerm} hospital`,
        countrycodes: "ng",
        tag: "amenity:hospital",
        format: "json",
        limit: "15",
        addressdetails: "1",
      }).toString();

      const response = await fetch(url);

      if (response.status === 429) {
        const delay = Math.pow(2, attempt) * 1000;
        console.log(`Rate limited (429), retrying after ${delay}ms...`);
        await new Promise(resolve => setTimeout(resolve, delay));
        attempt++;
        continue;
      }

      if (!response.ok) throw new Error(`LocationIQ error: ${response.status}`);

      const data: LocationIQResponseItem[] = await response.json();
      return data || [];
    } catch (error) {
      console.error("LocationIQ search error:", error);
      if (attempt >= maxRetries - 1) return [];
      attempt++;
    }
  }
  return [];
}

interface TransformedHospital {
  id: string;
  name: string;
  location: string;
  city?: string;
  region?: string;
  email?: string[];
  address: string;
  description?: string;
  specializations: string[];
  contactNumber: string;
  isExternal: boolean;
  coordinates: number[];
}

function transformExternalHospitalData(item: LocationIQResponseItem): TransformedHospital {
  return {
    id: `ext_${item.place_id || Math.random().toString(36)}`,
    name: item.display_name?.split(",")[0] || item.display_name || "Unnamed Hospital",
    location: item.display_name || "Unknown",
    address: item.display_name || "",
    specializations: [],
    contactNumber: item.address?.phone || "Not available",
    isExternal: true,
    coordinates: item.lat && item.lon ? [parseFloat(item.lon), parseFloat(item.lat)] : [],
    city: item.address?.city || item.address?.town || undefined,
    region: item.address?.state || undefined,
    email: undefined,
    description: undefined,
  };
}

export async function GET(request: NextRequest) {
  try {
    console.log("GET /api/hospitals - Starting request:", request.nextUrl.searchParams.toString());
    await Promise.race([
      connectToDatabase(),
      new Promise((_, reject) => setTimeout(() => reject(new Error("Database connection timeout")), 10000)),
    ]);
    console.log("Database connected successfully");

    const searchParams = Object.fromEntries(request.nextUrl.searchParams);
    console.log("Search params:", searchParams);

    const validatedParams = searchParamsSchema.safeParse(searchParams);
    if (!validatedParams.success) {
      console.error("Validation error:", validatedParams.error.errors);
      return NextResponse.json(
        { error: "Validation Failed", details: validatedParams.error.errors },
        { status: 400 }
      );
    }

    let query: mongoose.FilterQuery<IHospital> = {};
    switch (validatedParams.data.searchType) {
      case "location":
        query = {
          $or: [
            { city: { $regex: validatedParams.data.searchTerm, $options: "i" } },
            { region: { $regex: validatedParams.data.searchTerm, $options: "i" } },
            { address: { $regex: validatedParams.data.searchTerm, $options: "i" } },
          ],
        };
        break;
      case "name":
        query = { name: { $regex: validatedParams.data.searchTerm, $options: "i" } };
        break;
      case "specialization":
      case "issue":
        query = { specializations: { $regex: validatedParams.data.searchTerm, $options: "i" } };
        break;
      default:
        return NextResponse.json({ error: "Invalid search type" }, { status: 400 });
    }
    console.log("Query constructed:", query);

    // Search internal database first
    const results = await Hospital.find(query).limit(50).lean();
    console.log("Query results count:", results.length);

    // Transform database results
    const databaseHospitals = results.map((hospital) => ({
      id: hospital._id.toString(),
      name: hospital.name,
      location: `${hospital.city || "Unknown"}, ${hospital.region || "Unknown"}`,
      address: hospital.address,
      specializations: hospital.specializations || [],
      contactNumber: hospital.phone || "Not provided",
      email: hospital.email ? [hospital.email] : undefined,
      city: hospital.city || undefined,
      region: hospital.region || undefined,
      description: hospital.description || "",
      coordinates: hospital.coordinates || [],
      functionalStatus: hospital.functionalStatus || "Unknown",
      isExternal: false,
    }));

    // Always search external API to include new providers
    console.log("Searching external API for:", validatedParams.data.searchTerm);
    const externalResults = await searchExternalHospitals(validatedParams.data.searchTerm);
    const externalHospitals = externalResults
      .slice(0, 5)
      .map(transformExternalHospitalData);
    console.log("External API results count:", externalHospitals.length);

    // Combine internal and external results
    const combinedHospitals = [...databaseHospitals, ...externalHospitals];

    console.log("Returning response with hospitals:", combinedHospitals.length);
    return NextResponse.json(combinedHospitals, { status: 200 });
  } catch (error) {
    console.error("Search error:", error);
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: "Validation Failed", details: error.errors }, { status: 400 });
    }
    return NextResponse.json(
      {
        error: "Internal Server Error",
        message: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    await connectToDatabase();
    const body = await request.json();
    const validatedData = hospitalSchema.parse(body);

    const newHospital = new Hospital({
      name: validatedData.name,
      address: validatedData.address,
      phone: validatedData.phone,
      email: validatedData.email,
      city: validatedData.city,
      region: validatedData.region,
      description: validatedData.description,
      specializations: validatedData.specializations || [],
    });
    await newHospital.save();

    return NextResponse.json(
      { message: "Hospital created successfully", id: newHospital._id },
      { status: 201 }
    );
  } catch (error) {
    console.error("Hospital creation error:", error);
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: "Validation Failed", details: error.errors }, { status: 400 });
    }
    return NextResponse.json(
      {
        error: "Internal Server Error",
        message: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}