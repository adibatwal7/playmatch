"use client";

import { motion } from "framer-motion";
import { MapPin, Users, Calendar } from "lucide-react";
import { RecommendationBadge } from "./RecommendationBadge";
import { cn } from "@/lib/utils";

interface EventCardProps {
  id: string;
  title: string;
  sport: string;
  distance: string;
  price: string | "Free";
  date: string;
  imageUrl: string;
  matchPercentage?: number;
  trending?: boolean;
  almostFull?: boolean;
  className?: string;
}

import Link from "next/link";

export function EventCard({
  id,
  title,
  sport,
  distance,
  price,
  date,
  imageUrl,
  matchPercentage,
  trending,
  almostFull,
  className,
}: EventCardProps) {
  return (
    <Link href={`/events/${id}`} className="block h-full">
      <motion.div
        whileHover={{ scale: 1.03 }}
        className={cn(
          "glass overflow-hidden rounded-2xl flex flex-col h-full cursor-pointer transition-all border border-zinc-800 shadow-xl hover:shadow-[0_20px_40px_rgba(163,255,18,0.15)]",
          className
        )}
      >
        {/* Banner */}
        <div className="relative h-40 w-full bg-zinc-900 border-b border-zinc-800">
          <img
            src={imageUrl}
            alt={title}
            className="object-cover w-full h-full opacity-90 transition-opacity hover:opacity-100"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
          
          {/* Badges Overlay */}
          <div className="absolute top-3 left-3 flex flex-col gap-2 z-10">
            {matchPercentage && (
              <RecommendationBadge type="ai-match" matchPercentage={matchPercentage} />
            )}
            {trending && <RecommendationBadge type="trending" />}
            {almostFull && <RecommendationBadge type="filling-fast" />}
          </div>
          
          <div className="absolute bottom-3 right-3 bg-black/80 backdrop-blur-md px-4 py-1.5 rounded-full text-sm font-bold border border-white/10 z-10 text-white shadow-lg">
            {price === "Free" ? "Free" : `$${price}`}
          </div>
        </div>

        {/* Content */}
        <div className="p-6 flex flex-col gap-4 relative z-20 bg-zinc-950/50 flex-1">
          <div>
            <p className="text-(--color-primary) text-xs font-bold tracking-widest uppercase mb-2">
              {sport}
            </p>
            <h3 className="text-xl font-bold leading-tight line-clamp-1 text-white">{title}</h3>
          </div>

          <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-neutral-400 mt-auto">
            <div className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4 text-neutral-500" />
              <span className="font-medium">{date}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <MapPin className="w-4 h-4 text-neutral-500" />
              <span className="font-medium">{distance} km away</span>
            </div>
          </div>
          
          <div className="mt-3 pt-4 border-t border-zinc-800/50 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex -space-x-2">
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="w-7 h-7 rounded-full bg-zinc-800 border-2 border-zinc-950 shadow-sm"
                  />
                ))}
              </div>
              <span className="text-xs text-neutral-400 font-medium tracking-wide">
                Friends going
              </span>
            </div>
          </div>
        </div>
      </motion.div>
    </Link>
  );
}
