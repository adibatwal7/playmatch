import { NextResponse } from "next/server";
import Stripe from "stripe";

// Initialize Stripe gracefully, avoiding breaking builds if the key isn't provided yet.
const stripeApiKey = process.env.STRIPE_SECRET_KEY || "empty";
const stripe = new Stripe(stripeApiKey, {
  // @ts-expect-error - Standardize API version
  apiVersion: "2024-06-20",
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { eventId, title, price, imageUrl } = body;
    
    if (!eventId || price === undefined || !title) {
      return NextResponse.json({ error: "Missing required parameters" }, { status: 400 });
    }

    if (stripeApiKey === "empty") {
      return NextResponse.json({ 
        error: "Stripe connection not configured. Please add STRIPE_SECRET_KEY." 
      }, { status: 500 });
    }

    // Capture the base URL where the request originated (e.g. localhost:3000 or production domain)
    const origin = request.headers.get('origin') || "http://localhost:3000";

    // Create Checkout Sessions from body params
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            unit_amount: price * 100, // Stripe expects amounts in cents
            product_data: {
              name: title,
              images: imageUrl ? [imageUrl] : [],
            },
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${origin}/events/${eventId}?checkout=success`,
      cancel_url: `${origin}/events/${eventId}?checkout=cancelled`,
      metadata: {
        eventId: eventId,
      }
    });

    return NextResponse.json({ url: session.url });
  } catch (err: unknown) {
    console.error("Stripe Checkout Error:", err);
    return NextResponse.json({ error: err instanceof Error ? err.message : String(err) }, { status: 500 });
  }
}
