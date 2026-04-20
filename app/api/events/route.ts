import { NextResponse } from "next/server";

// Mock data
const MOCK_EVENTS = [
  {
    id: "1",
    title: "Saturday Evening 5v5 Football",
    sport: "Football",
    distance: "2.1",
    price: "10",
    date: "Tomorrow, 6:00 PM",
    imageUrl: "https://images.unsplash.com/photo-1579952363873-27f3bade9f55?q=80&w=800&auto=format&fit=crop",
    matchPercentage: 95,
  }
];

export async function GET() {
  // In production: Fetch from Supabase events table
  return NextResponse.json({ success: true, data: MOCK_EVENTS });
}

export async function POST(request: Request) {
  // In production: Insert into Supabase events table
  const body = await request.json();
  return NextResponse.json({ success: true, data: { ...body, id: "new-uuid" } });
}
