"use client";

import { useState, useMemo } from "react";
import { SearchBar } from "@/components/ui/SearchBar";
import { FilterChips } from "@/components/ui/FilterChips";
import { EventsGrid } from "@/components/ui/EventsGrid";
import { Search, Sparkles, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

interface EventType {
  id: string;
  title: string;
  sport: string;
  location: string;
  description?: string;
  price: number;
  date: string;
  capacity?: number;
  host_id?: string;
  imageUrl?: string;
}

export function DiscoverContent({ initialEvents }: { initialEvents: EventType[] }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState<string>("All Sports");

  const filteredEvents = useMemo(() => {
    let result = [...initialEvents];

    // Search filter
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(e => 
        e.title.toLowerCase().includes(q) || 
        e.sport.toLowerCase().includes(q) ||
        e.location.toLowerCase().includes(q)
      );
    }

    // Category filter
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime();
    const tonight = today + 24 * 60 * 60 * 1000;
    const endOfWeek = today + 7 * 24 * 60 * 60 * 1000;

    switch (activeFilter) {
      case "Today":
        result = result.filter(e => {
          const d = new Date(e.date).getTime();
          return d >= today && d < tonight;
        });
        break;
      case "This Week":
        result = result.filter(e => {
          const d = new Date(e.date).getTime();
          return d >= today && d < endOfWeek;
        });
        break;
      case "Free":
        result = result.filter(e => e.price === 0);
        break;
      case "Indoor":
        result = result.filter(e => 
          e.location.toLowerCase().includes("indoor") || 
          (e.description?.toLowerCase().includes("indoor"))
        );
        break;
      case "Outdoor":
        const outdoorKeywords = ["outdoor", "park", "beach", "turf", "field", "court"];
        result = result.filter(e => 
          outdoorKeywords.some(k => e.location.toLowerCase().includes(k)) ||
          outdoorKeywords.some(k => (e as any).description?.toLowerCase().includes(k))
        );
        break;
    }

    return result;
  }, [initialEvents, searchQuery, activeFilter]);

  return (
    <div className="flex flex-col gap-12">
      {/* Custom Search Bar to integrate with state */}
      <div className="w-full max-w-3xl mx-auto flex flex-col gap-8">
         <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="relative flex items-center w-full rounded-full glass border border-zinc-700 bg-black/40 overflow-hidden shadow-2xl h-16 md:h-20"
          >
            <div className="pl-6 md:pl-8 pr-4 text-neutral-400">
              <Search className="w-6 h-6" />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Filter by sport, location, or name..."
              className="flex-1 bg-transparent py-4 text-white placeholder-neutral-500 focus:outline-none text-base md:text-lg lg:text-xl font-medium"
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery("")}
                className="p-2 mr-2 text-neutral-500 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            )}
            <div className="pr-2">
              <button className="flex items-center gap-2 bg-(--color-primary) text-black px-4 py-2 md:px-6 md:py-3 rounded-full font-bold shadow-[0_0_15px_rgba(163,255,18,0.3)]">
                <Sparkles className="w-4 h-4" />
                <span className="hidden sm:inline">AI Search</span>
              </button>
            </div>
          </motion.div>

          {/* Integrated Filter Chips */}
          <div className="flex gap-3 overflow-x-auto pb-4 scrollbar-hide snap-x">
            {["All Sports", "Today", "This Week", "Free", "Indoor", "Outdoor"].map((filter) => {
              const isActive = activeFilter === filter;
              return (
                <button
                  key={filter}
                  onClick={() => setActiveFilter(filter)}
                  className={cn(
                    "whitespace-nowrap px-6 py-2.5 rounded-full text-sm font-bold transition-all snap-center border",
                    isActive 
                      ? "bg-(--color-primary) text-black border-(--color-primary) shadow-[0_0_20px_rgba(163,255,18,0.4)] scale-105" 
                      : "bg-white/5 text-neutral-400 border-white/10 hover:border-white/30"
                  )}
                >
                  {filter}
                </button>
              );
            })}
          </div>
      </div>

      <div>
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-black text-white">
            {activeFilter === "All Sports" ? "Recommended for you" : `${activeFilter} Events`}
            <span className="ml-3 text-sm font-bold text-neutral-500 bg-zinc-900 px-3 py-1 rounded-lg">
              {filteredEvents.length} {filteredEvents.length === 1 ? 'game' : 'games'}
            </span>
          </h2>
        </div>
        
        <EventsGrid events={filteredEvents} />
      </div>
    </div>
  );
}
