import { NextResponse } from "next/server";
import OpenAI from "openai";
import { createClient } from "@/lib/supabase/server";

// Fallback logic if OPENAI_API_KEY is not defined, prevents hard crash if user didn't set it yet
const apiKey = process.env.OPENAI_API_KEY || "empty";
const openai = new OpenAI({ apiKey, dangerouslyAllowBrowser: true }); // Server route but safe measure

export async function POST(request: Request) {
  try {
    const { query } = await request.json();
    
    if (!query) {
      return NextResponse.json({ error: "Query is required" }, { status: 400 });
    }

    if (apiKey === "empty") {
      return NextResponse.json({ error: "OpenAI Configuration Missing. Please add OPENAI_API_KEY to .env.local" }, { status: 500 });
    }

    // 1. Extract intents using GPT
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: `You are an AI for a sports matchmaking app. Analyze the user query and extract JSON search parameters.
Schema:
{
  "sport": string | null, // e.g. "Football", "Basketball", "Tennis", "Volleyball". Null if none detected. Match the casing strictly.
  "max_price": number | null, // e.g. 0 for free, 10 for under 10, null if no price preference
  "keyword": string | null // e.g. "competitive", "casual", "morning", "evening". Or null.
}
If the user asks for "free", "no cost", set max_price to 0.`
        },
        { role: "user", content: query }
      ],
      response_format: { type: "json_object" }
    });

    const parsedContext = JSON.parse(completion.choices[0].message.content || "{}");
    
    // 2. Query Supabase
    const supabase = await createClient();
    
    let dbQuery = supabase.from('events').select('*');
    
    if (parsedContext.sport) {
      dbQuery = dbQuery.ilike('sport', parsedContext.sport);
    }
    
    if (parsedContext.max_price !== null) {
      dbQuery = dbQuery.lte('price', parsedContext.max_price);
    }

    if (parsedContext.keyword) {
      // Loose heuristic match against title
      dbQuery = dbQuery.ilike('title', `%${parsedContext.keyword}%`);
    }
    
    const { data: events, error } = await dbQuery.order('date', { ascending: true });

    if (error) {
      console.error(error);
      return NextResponse.json({ error: "Database query failed" }, { status: 500 });
    }
    
    // 3. Map Match Percentages
    const enrichedEvents = events?.map(ev => ({
       ...ev,
       imageUrl: ev.image_url || ev.imageUrl,
       matchPercentage: Math.floor(Math.random() * (99 - 85 + 1)) + 85 // Generate an 85-99% mock match score 
    })) || [];

    return NextResponse.json({
      success: true,
      events: enrichedEvents,
      parameters: parsedContext
    });

  } catch (err: unknown) {
    console.error("AI Route Error:", err);
    return NextResponse.json({ error: err instanceof Error ? err.message : String(err) }, { status: 500 });
  }
}
