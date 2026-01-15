import { NextRequest, NextResponse } from "next/server";

interface HospitalResult {
  place_id: string;
  lat: string | number;
  lon: string | number;
  display_name: string;
  type?: string;
  address?: {
    city?: string;
    state?: string;
    phone?: string;
  };
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const q = searchParams.get("q");

  if (!q) {
    return NextResponse.json({ error: "Missing search term" }, { status: 400 });
  }

  try {
    console.log(`🔍 [Hospital Search] Query: "${q}"`);

    // Step 1: Geocode the location
    const coordinates = await geocodeLocation(q);
    if (!coordinates) {
      console.log(`⚠️  Could not geocode: "${q}" - trying direct search`);
      // If geocoding fails, try direct text search
      const directResults = await searchLocationIQHospitals(q);
      if (directResults.length > 0) {
        console.log(`✅ Direct search: ${directResults.length} results`);
        return NextResponse.json(directResults, { 
          status: 200,
          headers: {
            'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=7200',
          }
        });
      }
      console.log(`❌ No results found for: "${q}"`);
      return NextResponse.json([], { status: 200 });
    }

    const { lat, lon } = coordinates;
    console.log(`📍 Coordinates: ${lat}, ${lon}`);

    // Step 2: Try Overpass API first (best data for Nigeria)
    const overpassResults = await searchOverpassHospitals(lat, lon);
    
    if (overpassResults.length > 0) {
      console.log(`✅ Overpass: ${overpassResults.length} hospitals found`);
      return NextResponse.json(overpassResults, { 
        status: 200,
        headers: {
          'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=7200',
        }
      });
    }

    // Step 3: Fallback to LocationIQ search
    console.log(`🔄 Overpass returned 0 results, trying LocationIQ...`);
    const locationIQResults = await searchLocationIQHospitals(q);
    
    console.log(`✅ LocationIQ: ${locationIQResults.length} results found`);
    return NextResponse.json(locationIQResults, { 
      status: 200,
      headers: {
        'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=7200',
      }
    });

  } catch (error) {
    console.error("❌ [Hospital Search] Error:", error);
    return NextResponse.json([], { status: 200 });
  }
}

async function geocodeLocation(location: string): Promise<{ lat: string; lon: string } | null> {
  try {
    const url = `https://us1.locationiq.com/v1/search?` + new URLSearchParams({
      key: process.env.LOCATIONIQ_TOKEN!,
      q: location,
      countrycodes: "ng",
      format: "json",
      limit: "1",
    }).toString();

    const res = await fetch(url, {
      headers: { "User-Agent": "Carefinder/1.0" },
    });

    if (!res.ok) return null;

    const data = await res.json();
    if (!data || data.length === 0) return null;

    return { lat: data[0].lat, lon: data[0].lon };
  } catch (error) {
    console.error("Geocoding error:", error);
    return null;
  }
}

async function searchOverpassHospitals(lat: string, lon: string): Promise<HospitalResult[]> {
  try {
    const radius = 15000; // 15km radius
    
    console.log(`🗺️  Querying Overpass API with radius ${radius}m around ${lat},${lon}`);
    
    // Simplified Overpass query - faster and more reliable
    const query = `
      [out:json][timeout:15];
      (
        node["amenity"="hospital"](around:${radius},${lat},${lon});
        node["amenity"="clinic"](around:${radius},${lat},${lon});
        node["healthcare"](around:${radius},${lat},${lon});
      );
      out body 20;
    `;

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000); // 10s timeout

    const res = await fetch("https://overpass-api.de/api/interpreter", {
      method: "POST",
      body: `data=${encodeURIComponent(query)}`,
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (!res.ok) {
      console.error(`❌ Overpass HTTP ${res.status}: ${res.statusText}`);
      return [];
    }

    const data = await res.json();
    console.log(`📊 Overpass returned ${data.elements?.length || 0} raw elements`);
    
    if (!data.elements || data.elements.length === 0) {
      console.log(`⚠️  No elements found in Overpass response`);
      return [];
    }
    
    const hospitals: HospitalResult[] = data.elements
      .filter((el: any) => {
        const hasName = el.tags && (el.tags.name || el.tags["name:en"]);
        if (!hasName) console.log(`⚠️  Skipping unnamed element: ${el.id}`);
        return hasName;
      })
      .map((el: any) => ({
        place_id: `osm_${el.id}`,
        lat: el.lat || el.center?.lat || "",
        lon: el.lon || el.center?.lon || "",
        display_name: el.tags.name || el.tags["name:en"] || "Healthcare Facility",
        type: el.tags.amenity || el.tags.healthcare || "hospital",
        address: {
          city: el.tags["addr:city"],
          state: el.tags["addr:state"],
          phone: el.tags.phone || el.tags["contact:phone"],
        },
      }))
      .filter((h: HospitalResult) => h.lat && h.lon)
      .slice(0, 20);

    console.log(`✅ Processed ${hospitals.length} valid hospitals from Overpass`);
    return hospitals;
  } catch (error: any) {
    if (error.name === 'AbortError') {
      console.error("❌ Overpass request timed out after 10s");
    } else {
      console.error("❌ Overpass error:", error.message || error);
    }
    return [];
  }
}

async function searchLocationIQHospitals(location: string): Promise<HospitalResult[]> {
  try {
    console.log(`🔍 LocationIQ fallback search for: "hospital ${location}"`);
    
    const url = `https://us1.locationiq.com/v1/search?` + new URLSearchParams({
      key: process.env.LOCATIONIQ_TOKEN!,
      q: `hospital ${location}`,
      countrycodes: "ng",
      format: "json",
      limit: "20",
      addressdetails: "1",
    }).toString();

    const res = await fetch(url, {
      headers: { "User-Agent": "Carefinder/1.0" },
    });

    if (!res.ok) {
      console.error(`❌ LocationIQ HTTP ${res.status}: ${res.statusText}`);
      return [];
    }

    const data = await res.json();
    console.log(`📊 LocationIQ returned ${data.length} raw results`);
    
    // Filter to only healthcare-related results
    const hospitals: HospitalResult[] = data
      .filter((item: any) => {
        const name = item.display_name?.toLowerCase() || '';
        const type = item.type?.toLowerCase() || '';
        const isHealthcare = (
          name.includes('hospital') || 
          name.includes('clinic') || 
          name.includes('medical') ||
          name.includes('health') ||
          name.includes('centre') ||
          type === 'hospital' ||
          type === 'clinic'
        );
        if (!isHealthcare) {
          console.log(`⚠️  Filtering out: ${item.display_name}`);
        }
        return isHealthcare;
      })
      .map((item: any) => ({
        place_id: item.place_id,
        lat: item.lat,
        lon: item.lon,
        display_name: item.display_name,
        type: item.type,
        address: {
          city: item.address?.city || item.address?.town,
          state: item.address?.state,
        },
      }))
      .slice(0, 20);

    console.log(`✅ Filtered to ${hospitals.length} healthcare facilities`);
    return hospitals;
  } catch (error: any) {
    console.error("❌ LocationIQ search error:", error.message || error);
    return [];
  }
}