"use client";

import { motion } from "framer-motion";
import { ArrowRight, Activity } from "lucide-react";
import Link from "next/link";
import { AnimatedButton } from "@/components/ui/AnimatedButton";

export function Hero() {
  return (
    <section className="relative pt-32 pb-16 flex flex-col items-center justify-center min-h-screen overflow-hidden">
      {/* Background Video Layer */}
      <div className="absolute inset-0 z-0">
        <video 
          autoPlay 
          loop 
          muted 
          playsInline
          className="w-full h-full object-cover opacity-80"
        >
          {/* Using the provided transition video */}
          <source 
            src="/Create_transition_video.mp4" 
            type="video/mp4" 
          />
        </video>
        {/* Dark Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-black/40 to-black/70 z-10" />
      </div>

      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center text-center w-full">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-8 border-(--color-primary)/30 text-(--color-primary)"
        >
          <Activity className="w-4 h-4" />
          <span className="text-sm font-semibold tracking-wide">AI-Powered Matches</span>
        </motion.div>
        
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
          className="text-6xl md:text-8xl lg:text-9xl font-black tracking-tighter leading-[1.1] mb-6 text-white"
        >
          Find Your Game.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="text-xl md:text-3xl text-neutral-300 max-w-3xl mb-12 font-medium leading-relaxed drop-shadow-lg"
        >
          Play <span className="text-(--color-primary)">with the right people</span> at the right time.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
          className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto mb-16"
        >
          <Link href="/feed" className="w-full sm:w-auto">
            <AnimatedButton size="lg" className="w-full sm:w-auto gap-2 px-8 text-lg font-bold">
              Explore Events
              <ArrowRight className="w-5 h-5" />
            </AnimatedButton>
          </Link>
          <Link href="/create" className="w-full sm:w-auto">
            <AnimatedButton variant="outline" size="lg" className="w-full sm:w-auto px-8 text-lg font-bold text-white border-zinc-700 bg-black/40 hover:bg-black/60">
              Host a Game
            </AnimatedButton>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
