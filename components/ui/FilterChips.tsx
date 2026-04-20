"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const filters = ["All Sports", "Today", "This Week", "Free", "Indoor", "Outdoor", "Matches"];

export function FilterChips() {
  const [active, setActive] = useState("All Sports");

  return (
    <div className="flex gap-3 overflow-x-auto pb-4 scrollbar-hide snap-x pt-2">
      {filters.map((filter) => {
        const isActive = active === filter;
        return (
          <motion.button
            key={filter}
            onClick={() => setActive(filter)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={cn(
              "whitespace-nowrap px-5 py-2 rounded-full text-sm font-medium transition-colors snap-center border focus:outline-none",
              {
                "bg-(--color-primary) text-black border-(--color-primary) shadow-[0_0_10px_rgba(163,255,18,0.3)]": isActive,
                "bg-white/5 text-neutral-300 border-white/10 hover:bg-white/10 hover:text-white hover:border-white/20": !isActive,
              }
            )}
          >
            {filter}
          </motion.button>
        );
      })}
    </div>
  );
}
