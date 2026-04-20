"use client";

import { useState } from "react";
import { AnimatedButton } from "./AnimatedButton";
import { joinEvent } from "@/app/events/[id]/actions";
import { useRouter } from "next/navigation";
import { Check, ShieldAlert } from "lucide-react";

interface JoinButtonProps {
  eventId: string;
  title: string;
  imageUrl?: string;
  price: number;
  initialHasJoined: boolean;
  isFull: boolean;
  isAuthenticated: boolean;
}

export function JoinButton({ eventId, title, imageUrl, price, initialHasJoined, isFull, isAuthenticated }: JoinButtonProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [hasJoined, setHasJoined] = useState(initialHasJoined);
  const [error, setError] = useState<string | null>(null);

  const handleJoin = async () => {
    if (!isAuthenticated) {
      router.push("/login");
      return;
    }

    if (hasJoined || isFull) return;

    setError(null);
    setIsLoading(true);

    try {
      if (price > 0) {
        // Proceed to Stripe Hosted Checkout
        const res = await fetch("/api/checkout", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ eventId, title, price, imageUrl })
        });
        
        const data = await res.json();
        
        if (data.url) {
          // Send the user to the secure Stripe portal
          window.location.href = data.url;
        } else {
          setError(data.error || "Failed to initialize checkout.");
          setIsLoading(false);
        }
      } else {
        // Free event, insert directly
        const result = await joinEvent(eventId);
        if (result.error) {
          setError(result.error);
        } else {
          setHasJoined(true);
        }
        setIsLoading(false);
      }
    } catch (err) {
      setError("An unexpected error occurred.");
      setIsLoading(false);
    }
  };

  if (hasJoined) {
    return (
      <AnimatedButton size="lg" className="w-48 text-lg font-bold bg-zinc-800 text-white border-zinc-700 pointer-events-none opacity-80" disabled>
        <Check className="w-5 h-5 mr-2 inline-block" />
        Joined
      </AnimatedButton>
    );
  }

  if (isFull) {
    return (
      <AnimatedButton size="lg" className="w-48 text-lg font-bold bg-red-950/40 text-red-400 border-red-900 pointer-events-none opacity-80" disabled>
        Event Full
      </AnimatedButton>
    );
  }

  return (
    <div className="flex flex-col items-end">
      {error && <span className="text-red-400 text-sm mb-2">{error}</span>}
      <AnimatedButton 
        size="lg" 
        onClick={handleJoin} 
        disabled={isLoading}
        className="w-48 text-lg font-bold shadow-[0_0_20px_rgba(163,255,18,0.2)]"
      >
        {isLoading 
          ? "Processing..." 
          : price > 0 
            ? `Pay $${price} & Join` 
            : "Get Tickets"
        }
      </AnimatedButton>
    </div>
  );
}
