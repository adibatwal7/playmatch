"use client";

import { motion } from "framer-motion";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { Quote } from "lucide-react";

const testimonials = [
  {
    name: "Marcus T.",
    quote: "Finally found serious games. The AI actually puts me in advanced brackets like I asked.",
    avatar: "https://i.pravatar.cc/150?u=a042581f4e29026704d"
  },
  {
    name: "Sarah L.",
    quote: "Met amazing players nearby. The distance filter is incredibly accurate for weekend mornings.",
    avatar: "https://i.pravatar.cc/150?u=b042581f4e29026704d"
  },
  {
    name: "David K.",
    quote: "AI matching is surprisingly accurate. Best $5 I've spent all week to get out of the house.",
    avatar: "https://i.pravatar.cc/150?u=c042581f4e29026704d"
  }
];

export function Testimonials() {
  return (
    <SectionWrapper className="py-24 overflow-hidden">
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-black mb-4">Players Love Us</h2>
        <p className="text-xl text-neutral-400">Don't just take our word for it.</p>
      </div>

      <div className="flex gap-6 pb-8 overflow-x-auto snap-x scrollbar-hide md:grid md:grid-cols-3">
        {testimonials.map((test, idx) => (
          <motion.div
            key={test.name}
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.1, duration: 0.5 }}
            className="snap-center shrink-0 w-[85vw] md:w-auto glass rounded-3xl p-8 border border-zinc-800 flex flex-col justify-between"
          >
            <div>
              <Quote className="w-10 h-10 text-(--color-primary)/30 mb-6" />
              <p className="text-xl font-medium text-white mb-8 leading-relaxed">
                &quot;{test.quote}&quot;
              </p>
            </div>
            <div className="flex items-center gap-4">
              <img src={test.avatar} alt={test.name} className="w-12 h-12 rounded-full border-2 border-(--color-primary)/50" />
              <span className="font-bold text-lg text-white">{test.name}</span>
            </div>
          </motion.div>
        ))}
      </div>
    </SectionWrapper>
  );
}
