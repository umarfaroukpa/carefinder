import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const q = searchParams.get("q");
  
  if (!q) {
    return NextResponse.json({ error: "Missing search term" }, { status: 400 });
  }

  const url = `https://us1.locationiq.com/v1/search?` + new URLSearchParams({
    // this will noly runs on server
    key: process.env.LOCATIONIQ_TOKEN!,  
    q: `${q} hospital`,
    countrycodes: "ng",
    tag: "amenity:hospital",
    format: "json",
    limit: "15",
    addressdetails: "1",
  });

  try {
    const res = await fetch(url, { next: { revalidate: 3600 } }); // Cache for 1 hour
    if (!res.ok) throw new Error("LocationIQ error");
    const data = await res.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Proxy error:", error);
    return NextResponse.json([], { status: 200 }); // Return empty on error — app still works
  }

  
}

