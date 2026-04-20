import { NextResponse } from "next/server";

export async function POST(request: Request) {
  // In production: Integrate Stripe secret key and create intent
  const body = await request.json();
  const { eventId, price } = body;

  console.log(`Creating Stripe intent for event ${eventId} with price ${price}`);

  return NextResponse.json({
    success: true,
    clientSecret: "pi_mock_secret_key_123",
  });
}
