import { NextResponse } from "next/server";

export async function GET(request: Request) {
  // In production: Apply matching algorithm (location_score, sport_match, etc.)
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get('userId');

  return NextResponse.json({
    success: true,
    data: {
      recommendations: [],
      message: "Ready to integrate with matching layer logic."
    }
  });
}
