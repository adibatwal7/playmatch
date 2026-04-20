"use client";

import { Navbar } from "@/components/ui/Navbar";
import { EventCard } from "@/components/ui/EventCard";
import { EmptyState } from "@/components/ui/EmptyState";
import { AnimatedButton } from "@/components/ui/AnimatedButton";
import { motion } from "framer-motion";
import { Sparkles, Send, MapPin, DollarSign, Calendar } from "lucide-react";
import { useState } from "react";

import { SectionWrapper } from "@/components/ui/SectionWrapper";

const SUGGESTIONS = [
  "Football tomorrow evening under $10",
  "Tennis courts near me available now",
  "Free basketball games this weekend",
  "Competitive volleyball leagues"
];

const MOCK_RESULTS = [
  {
    id: "1",
    title: "Saturday Evening 5v5 Football",
    sport: "Football",
    distance: "2.1",
    price: "10",
    date: "Tomorrow, 6:00 PM",
    imageUrl: "https://images.unsplash.com/photo-1579952363873-27f3bade9f55?q=80&w=800&auto=format&fit=crop",
    matchPercentage: 98,
    trending: true,
  },
  {
    id: "5",
    title: "Indoor 7v7 Tournament",
    sport: "Football",
    distance: "4.0",
    price: "15",
    date: "Tomorrow, 7:30 PM",
    imageUrl: "https://images.unsplash.com/photo-1518091043644-c1d44570a2c9?q=80&w=800&auto=format&fit=crop",
    matchPercentage: 85,
  }
];

export default function AISearchPage() {
  const [query, setQuery] = useState("");
  const [searched, setSearched] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState<any[]>([]);

  const handleSearch = async (e?: React.FormEvent, directQuery?: string) => {
    if (e) e.preventDefault();
    const searchQuery = directQuery || query;
    if (!searchQuery.trim()) return;

    setIsLoading(true);
    setSearched(true);
    setQuery(searchQuery);

    try {
      const res = await fetch("/api/ai-search", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: searchQuery })
      });
      
      const data = await res.json();
      if (data.success) {
        setResults(data.events || []);
      } else {
        console.error(data.error);
        setResults([]);
      }
    } catch (err) {
      console.error(err);
      setResults([]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen pb-24 flex flex-col">
      <Navbar />

      <SectionWrapper className="pt-20 md:pt-32 flex-1 max-w-4xl flex flex-col items-center">
        {!searched ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center justify-center flex-1 py-10 md:py-20 w-full"
          >
            <div className="w-20 h-20 rounded-3xl bg-(--color-primary)/10 text-(--color-primary) flex items-center justify-center border border-(--color-primary)/20 mb-8 shadow-inner shadow-(--color-primary)/20">
              <Sparkles className="w-10 h-10" />
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black mb-6 text-center text-white tracking-tight leading-tight">What do you want to play?</h1>
            <p className="text-neutral-400 text-lg md:text-xl mb-12 text-center max-w-2xl font-medium">
              Describe your ideal game, and our AI will find the perfect match based on your preferences, distance, and timeline.
            </p>

            <form onSubmit={handleSearch} className="w-full max-w-3xl relative mb-12">
              <input
                type="text"
                placeholder="e.g. I want to play football tomorrow evening under $10"
                className="w-full bg-zinc-950/60 border border-zinc-800 rounded-full px-8 py-6 pr-20 focus:outline-none focus:border-(--color-primary) focus:ring-1 focus:ring-(--color-primary) transition-all text-xl shadow-[0_0_40px_rgba(0,0,0,0.5)] text-white placeholder-neutral-600 glass"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
              <button
                type="submit"
                className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-(--color-primary) text-black flex items-center justify-center hover:bg-(--color-primary-dark) hover:scale-105 active:scale-95 transition-all"
              >
                <Send className="w-5 h-5 ml-0.5" />
              </button>
            </form>

            <div className="flex flex-wrap items-center justify-center gap-4">
              {SUGGESTIONS.map((suggestion) => (
                <button
                  key={suggestion}
                  onClick={() => handleSearch(undefined, suggestion)}
                  className="px-5 py-2.5 rounded-full border border-zinc-800 bg-zinc-900/50 text-sm font-medium text-neutral-400 hover:text-white hover:border-zinc-600 transition-colors shadow-sm"
                >
                  {suggestion}
                </button>
              ))}
            </div>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col h-full w-full"
          >
            <div className="flex items-center gap-4 mb-10 p-5 rounded-2xl glass border border-zinc-800 bg-black/40">
              <Sparkles className="w-6 h-6 text-(--color-primary)" />
              <p className="font-bold text-xl text-white">&quot;{query}&quot;</p>
              <button
                onClick={() => setSearched(false)}
                className="ml-auto text-sm font-bold text-neutral-500 hover:text-white underline underline-offset-4"
              >
                Start Over
              </button>
            </div>

            <div className="flex gap-3 mb-10 overflow-x-auto pb-4 scrollbar-hide snap-x">
              <AnimatedButton variant="outline" size="sm" className="whitespace-nowrap gap-2 text-white bg-zinc-900/50 border-zinc-700">
                <MapPin className="w-4 h-4" /> Make it closer
              </AnimatedButton>
              <AnimatedButton variant="outline" size="sm" className="whitespace-nowrap gap-2 text-white bg-zinc-900/50 border-zinc-700">
                <DollarSign className="w-4 h-4" /> Show free events
              </AnimatedButton>
              <AnimatedButton variant="outline" size="sm" className="whitespace-nowrap gap-2 text-white bg-zinc-900/50 border-zinc-700">
                <Calendar className="w-4 h-4" /> This weekend instead
              </AnimatedButton>
            </div>

            {isLoading ? (
              <div className="flex flex-col items-center justify-center py-20 w-full animate-pulse">
                 <div className="w-16 h-16 rounded-full border-t-2 border-(--color-primary) animate-spin mb-4"></div>
                <p className="text-xl text-(--color-primary) font-bold tracking-wide">AI is analyzing...</p>
              </div>
            ) : results.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full">
                {results.map((event, idx) => (
                  <motion.div
                    key={event.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 * idx }}
                  >
                    <EventCard 
                      id={event.id}
                      title={event.title}
                      sport={event.sport}
                      distance="2.5" 
                      price={event.price === 0 ? "Free" : event.price.toString()}
                      date={new Date(event.date).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit' })}
                      imageUrl="https://images.unsplash.com/photo-1579952363873-27f3bade9f55?q=80&w=800&auto=format&fit=crop"
                      matchPercentage={event.matchPercentage}
                    />
                  </motion.div>
                ))}
              </div>
            ) : (
              <EmptyState className="my-10" />
            )}
          </motion.div>
        )}
      </SectionWrapper>
    </div>
  );
}
