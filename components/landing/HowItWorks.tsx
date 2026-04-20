"use client";

import { motion } from "framer-motion";
import { Search, Users, Trophy } from "lucide-react";
import { SectionWrapper } from "@/components/ui/SectionWrapper";

const steps = [
  {
    icon: Search,
    title: "Discover",
    description: "Find local sports events tailored to your skill level and schedule."
  },
  {
    icon: Users,
    title: "Match",
    description: "Our AI pairs you with the perfect group to ensure a balanced game."
  },
  {
    icon: Trophy,
    title: "Play",
    description: "Show up, meet awesome athletes, and leave it all on the field."
  }
];

export function HowItWorks() {
  return (
    <SectionWrapper className="py-24 relative z-20 bg-background">
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-black mb-4">How It Works</h2>
        <p className="text-xl text-neutral-400">Join a game in three simple steps.</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {steps.map((step, idx) => (
          <motion.div
            key={step.title}
            whileHover={{ y: -8, scale: 1.02 }}
            className="flex flex-col items-center text-center p-8 glass rounded-3xl border border-zinc-800 shadow-2xl transition-all hover:border-(--color-primary)/50"
          >
            <div className="w-20 h-20 rounded-2xl bg-zinc-900 border border-zinc-800 flex items-center justify-center mb-6 text-(--color-primary) shadow-inner shadow-(--color-primary)/20">
              <step.icon className="w-10 h-10" />
            </div>
            <h3 className="text-2xl font-bold mb-3">{step.title}</h3>
            <p className="text-neutral-400 text-lg">{step.description}</p>
          </motion.div>
        ))}
      </div>
    </SectionWrapper>
  );
}
