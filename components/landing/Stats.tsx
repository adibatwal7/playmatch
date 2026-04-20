"use client";

import { motion } from "framer-motion";
import { SectionWrapper } from "@/components/ui/SectionWrapper";

export function Stats() {
  return (
    <SectionWrapper className="py-20 md:py-32">
      <div className="glass rounded-[3rem] p-8 md:p-16 border border-zinc-800 shadow-2xl max-w-5xl mx-auto flex flex-col md:flex-row justify-around items-center gap-12 text-center relative overflow-hidden">
        
        {/* Glow behind stats */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-gradient-to-r from-(--color-primary)/5 via-transparent to-teal-500/5 blur-[100px] pointer-events-none" />

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col gap-2 relative z-10"
        >
          <span className="text-5xl md:text-7xl font-black text-white tracking-tighter">10,000+</span>
          <span className="text-lg font-bold text-(--color-primary) uppercase tracking-widest">Active Players</span>
        </motion.div>

        <div className="hidden md:block w-px h-32 bg-zinc-800 relative z-10" />

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="flex flex-col gap-2 relative z-10"
        >
          <span className="text-5xl md:text-7xl font-black text-white tracking-tighter">2,500+</span>
          <span className="text-lg font-bold text-teal-400 uppercase tracking-widest">Games Played</span>
        </motion.div>

        <div className="hidden md:block w-px h-32 bg-zinc-800 relative z-10" />

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="flex flex-col gap-2 relative z-10"
        >
          <span className="text-5xl md:text-7xl font-black text-white tracking-tighter">92%</span>
          <span className="text-lg font-bold text-orange-400 uppercase tracking-widest">Match Satisfaction</span>
        </motion.div>

      </div>
    </SectionWrapper>
  );
}
