"use client";

import { motion } from "framer-motion";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { Users, Zap, CheckCircle2, ArrowRight } from "lucide-react";
import { AnimatedButton } from "@/components/ui/AnimatedButton";
import Link from "next/link";

export function MatchmakingPromo() {
  return (
    <SectionWrapper className="py-24">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="space-y-8"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-teal-500/10 text-teal-400 border border-teal-500/20">
            <Zap className="w-4 h-4" />
            <span className="text-sm font-bold tracking-wide uppercase">New Tool</span>
          </div>
          
          <h2 className="text-4xl md:text-6xl font-black leading-tight">
            Find Your Perfect <span className="text-(--color-primary)">Sports Partner</span>
          </h2>
          
          <p className="text-xl text-neutral-400 leading-relaxed max-w-lg">
            Our database-driven matching tool connects you with players who share your exact game interests and skill levels. No more random teammates.
          </p>

          <ul className="space-y-4">
            {[
              "Interest-based overlap algorithm",
              "Real-time database matching",
              "Skill-level synchronization",
              "Direct profile connections"
            ].map((feature) => (
              <li key={feature} className="flex items-center gap-3 text-lg font-medium text-neutral-200">
                <CheckCircle2 className="w-6 h-6 text-(--color-primary)" />
                {feature}
              </li>
            ))}
          </ul>

          <div className="pt-4">
            <Link href="/matchmaking">
              <AnimatedButton size="lg" className="px-10 h-16 text-lg">
                Try Matchmaking
                <ArrowRight className="ml-2 w-5 h-5" />
              </AnimatedButton>
            </Link>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="relative"
        >
          <div className="glass rounded-[3rem] p-4 border border-zinc-800 bg-zinc-900/20 relative overflow-hidden">
            <div className="bg-black/60 rounded-[2.5rem] p-8 md:p-12 border border-zinc-800 shadow-2xl">
              <div className="space-y-6">
                {[
                  { name: "Marcus Chen", match: 98, interests: ["Football", "Tennis"] },
                  { name: "Sarah Jenkins", match: 95, interests: ["Yoga", "Running"] },
                  { name: "Elena Rodriguez", match: 92, interests: ["Tennis", "Hiking"] }
                ].map((user, i) => (
                  <div 
                    key={user.name}
                    className="flex items-center justify-between p-5 rounded-2xl bg-zinc-950/50 border border-zinc-800 group hover:border-(--color-primary)/50 transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl bg-zinc-800 border border-zinc-700 overflow-hidden">
                        <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user.name}`} alt={user.name} />
                      </div>
                      <div>
                        <p className="font-bold text-white">{user.name}</p>
                        <div className="flex gap-2 mt-1">
                          {user.interests.map(t => (
                            <span key={t} className="text-[10px] uppercase font-black text-neutral-500 tracking-tighter">{t}</span>
                          ))}
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="block text-lg font-black text-(--color-primary)">{user.match}%</span>
                      <span className="text-[10px] text-neutral-500 uppercase font-bold">Match</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Decorative Glows */}
          <div className="absolute -top-10 -right-10 w-64 h-64 bg-(--color-primary) rounded-full blur-[100px] opacity-10 pointer-events-none" />
          <div className="absolute -bottom-10 -left-10 w-64 h-64 bg-teal-500 rounded-full blur-[100px] opacity-10 pointer-events-none" />
        </motion.div>
      </div>
    </SectionWrapper>
  );
}
