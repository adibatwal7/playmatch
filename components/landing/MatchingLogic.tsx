"use client";

import { motion } from "framer-motion";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { Sparkles, ArrowRight, UserCheck, MapPin, Calendar, DollarSign, Activity } from "lucide-react";

export function MatchingLogic() {
  return (
    <SectionWrapper className="py-24">
      <div className="glass rounded-[3rem] p-8 md:p-16 border border-(--color-primary)/20 bg-gradient-to-br from-(--color-primary)/5 to-transparent relative overflow-hidden">
        
        {/* Decorative Background */}
        <div className="absolute top-0 right-0 p-12 opacity-10 pointer-events-none">
          <Sparkles className="w-64 h-64 text-(--color-primary)" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center relative z-10">
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-(--color-primary)/10 text-(--color-primary) mb-6 border border-(--color-primary)/20">
              <Sparkles className="w-4 h-4" />
              <span className="text-sm font-bold tracking-wide">Behind the Scenes</span>
            </div>
            
            <h2 className="text-4xl md:text-5xl font-black mb-6 leading-tight">
              Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-(--color-primary) to-teal-400">AI</span> knows your next move.
            </h2>
            <p className="text-xl text-neutral-400 leading-relaxed mb-8 max-w-lg">
              We process hundreds of data points instantly. Stop wasting time finding a game, let our algorithm deliver the perfect match to your feed.
            </p>
          </div>

          {/* Visual Explanation */}
          <div className="flex flex-col items-center justify-center p-8 bg-black/40 rounded-3xl border border-zinc-800 shadow-2xl">
            <div className="grid grid-cols-2 gap-4 w-full mb-8">
              <div className="flex items-center gap-3 p-4 rounded-xl bg-zinc-900/80 border border-zinc-800">
                <MapPin className="text-(--color-primary) w-5 h-5 flex-shrink-0" />
                <span className="text-sm font-medium text-neutral-300">Location Radius</span>
              </div>
              <div className="flex items-center gap-3 p-4 rounded-xl bg-zinc-900/80 border border-zinc-800">
                <Calendar className="text-(--color-primary) w-5 h-5 flex-shrink-0" />
                <span className="text-sm font-medium text-neutral-300">Your Availability</span>
              </div>
              <div className="flex items-center gap-3 p-4 rounded-xl bg-zinc-900/80 border border-zinc-800">
                <DollarSign className="text-(--color-primary) w-5 h-5 flex-shrink-0" />
                <span className="text-sm font-medium text-neutral-300">Price Tolerance</span>
              </div>
              <div className="flex items-center gap-3 p-4 rounded-xl bg-zinc-900/80 border border-zinc-800">
                <Activity className="text-(--color-primary) w-5 h-5 flex-shrink-0" />
                <span className="text-sm font-medium text-neutral-300">Skill Level Matrix</span>
              </div>
            </div>

            <motion.div 
              animate={{ y: [0, 5, 0] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="mb-8"
            >
              <ArrowRight className="w-8 h-8 text-neutral-500 rotate-90 lg:rotate-0" />
            </motion.div>

            <motion.div 
              whileHover={{ scale: 1.05 }}
              className="w-full flex items-center justify-center gap-4 p-6 rounded-2xl bg-gradient-to-r from-(--color-primary)/20 to-teal-500/20 border border-(--color-primary)/50 shadow-[0_0_30px_rgba(163,255,18,0.2)]"
            >
              <UserCheck className="w-8 h-8 text-(--color-primary)" />
              <div className="text-left">
                <span className="block text-2xl font-black text-white">95% Match</span>
                <span className="text-sm text-(--color-primary) font-medium tracking-wide">Ready to play</span>
              </div>
            </motion.div>

          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}
