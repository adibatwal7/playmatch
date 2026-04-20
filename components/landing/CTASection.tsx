"use client";

import { motion } from "framer-motion";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { AnimatedButton } from "@/components/ui/AnimatedButton";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export function CTASection() {
  return (
    <SectionWrapper className="py-24 md:py-32">
      <div className="relative overflow-hidden rounded-[3rem] glass border border-(--color-primary)/20 p-12 md:p-24 text-center flex flex-col items-center">
        {/* Background Gradients */}
        <div className="absolute inset-0 bg-gradient-to-t from-(--color-primary)/10 to-transparent pointer-events-none" />
        <div className="absolute -bottom-1/2 left-1/2 -translate-x-1/2 w-full h-full bg-(--color-primary) rounded-full blur-[150px] opacity-10 pointer-events-none" />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative z-10 w-full max-w-3xl flex flex-col items-center"
        >
          <h2 className="text-5xl md:text-7xl font-black mb-6 text-white tracking-tighter">Ready to Play?</h2>
          <p className="text-xl md:text-2xl text-neutral-400 mb-12 font-medium">
            Stop searching. Start playing. Join thousands of athletes finding games every day.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 w-full sm:w-auto">
            <Link href="/feed" className="w-full sm:w-auto">
              <AnimatedButton size="lg" className="w-full sm:w-auto px-12 text-xl font-black gap-2 h-16">
                Join a Game
                <ArrowRight className="w-6 h-6" />
              </AnimatedButton>
            </Link>
            <Link href="/create" className="w-full sm:w-auto">
              <AnimatedButton variant="outline" size="lg" className="w-full sm:w-auto px-12 text-xl font-bold h-16 border-zinc-700 bg-black/40 hover:bg-black/60 text-white">
                Host an Event
              </AnimatedButton>
            </Link>
          </div>
        </motion.div>
      </div>
    </SectionWrapper>
  );
}
