"use client";

import { motion } from "framer-motion";
import { BrainCircuit, Map, Zap, HeartHandshake } from "lucide-react";
import { SectionWrapper } from "@/components/ui/SectionWrapper";

const features = [
  {
    icon: BrainCircuit,
    title: "Smart Matching",
    description: "Our AI engine pairs you with athletes of similar skill constraints so every game stays highly competitive but fair."
  },
  {
    icon: Map,
    title: "Location-Based Discovery",
    description: "Radar-powered search helps you instantly locate games within a configurable radius of your location."
  },
  {
    icon: Zap,
    title: "Instant Booking",
    description: "Reserve your spot in milliseconds. Pay through our secure portal or join free games seamlessly."
  },
  {
    icon: HeartHandshake,
    title: "Play with Like-Minded People",
    description: "Build an authentic network. Check reviews, past behaviors, and ratings for a toxic-free experience."
  }
];

export function Features() {
  return (
    <SectionWrapper className="py-24">
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-black mb-4">Why PlayMatch?</h2>
        <p className="text-xl text-neutral-400">Built by athletes, exclusively for athletes.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
        {features.map((feat, idx) => (
          <motion.div
            key={feat.title}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.1, duration: 0.5 }}
            className="glass rounded-3xl p-8 border border-zinc-800 shadow-xl flex flex-col md:flex-row items-start gap-6 hover:shadow-[0_10px_30px_rgba(163,255,18,0.05)] transition-shadow"
          >
            <div className="w-16 h-16 rounded-2xl bg-(--color-primary)/10 text-(--color-primary) flex items-center justify-center shrink-0 border border-(--color-primary)/20">
              <feat.icon className="w-8 h-8" />
            </div>
            <div>
              <h3 className="text-2xl font-bold mb-2 text-white">{feat.title}</h3>
              <p className="text-neutral-400 text-lg leading-relaxed">{feat.description}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </SectionWrapper>
  );
}
