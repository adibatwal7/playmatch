"use client";

import { motion } from "framer-motion";
import { Search, Sparkles } from "lucide-react";
import { useState } from "react";

export function SearchBar() {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <motion.div
      animate={{
        scale: isFocused ? 1.02 : 1,
        boxShadow: isFocused
          ? "0 0 0 2px rgba(163,255,18,0.5), 0 8px 30px rgba(0,0,0,0.4)"
          : "0 0 0 1px rgba(255,255,255,0.1), 0 4px 20px rgba(0,0,0,0.2)",
      }}
      transition={{ duration: 0.2 }}
      className="relative flex items-center w-full max-w-3xl mx-auto rounded-full glass border border-zinc-700 bg-black/40 overflow-hidden shadow-2xl h-16 md:h-20"
    >
      <div className="pl-6 md:pl-8 pr-4 text-neutral-400">
        <Search className="w-6 h-6" />
      </div>
      <input
        type="text"
        placeholder="Find games or try 'football tonight near me'"
        className="flex-1 bg-transparent py-4 text-white placeholder-neutral-500 focus:outline-none text-base md:text-lg lg:text-xl font-medium"
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
      />
      <div className="pr-2">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center gap-2 bg-(--color-primary) text-black px-4 py-2 rounded-full font-medium shadow-[0_0_15px_rgba(163,255,18,0.3)] hover:bg-(--color-primary-dark)"
        >
          <Sparkles className="w-4 h-4" />
          <span>AI Search</span>
        </motion.button>
      </div>
    </motion.div>
  );
}
