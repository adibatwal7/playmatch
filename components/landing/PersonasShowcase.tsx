"use client";

import { motion } from "framer-motion";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { User, Activity, MapPin, Trophy, Heart } from "lucide-react";

const PERSONAS = [
  {
    name: "Marcus Chen",
    role: "The Finisher",
    bio: "Ex-college football player. Looking for high-intensity matches only. No beginners please.",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Marcus",
    tagline: "Ultra-Competitive",
    icon: <Trophy className="w-5 h-5 text-yellow-500" />,
    stats: { skill: "Diamond", games: 142, rep: "99%" }
  },
  {
    name: "Sarah Jenkins",
    role: "Park Organizer",
    bio: "Yoga instructor and community enthusiast. I love hosting inclusive weekend sessions.",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
    tagline: "Social & Relaxed",
    icon: <Heart className="w-5 h-5 text-rose-500" />,
    stats: { skill: "Casual", games: 89, rep: "100%" }
  },
  {
    name: "Elena Rodriguez",
    role: "Tennis Specialist",
    bio: "4.5 NTRP rating. Looking for early morning hitting partners to sharpen backhands.",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Elena",
    tagline: "Early Bird",
    icon: <Activity className="w-5 h-5 text-teal-500" />,
    stats: { skill: "Gold", games: 56, rep: "98%" }
  }
];

export function PersonasShowcase() {
  return (
    <SectionWrapper className="py-24">
      <div className="text-center mb-16">
        <h2 className="text-5xl md:text-6xl font-black mb-6">Meet the <span className="text-transparent bg-clip-text bg-gradient-to-r from-(--color-primary) to-teal-400">Players</span></h2>
        <p className="text-xl text-neutral-400 max-w-2xl mx-auto font-medium">Diverse personas our algorithm uses to build the perfect match for you.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {PERSONAS.map((person, idx) => (
          <motion.div
            key={person.name}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="glass rounded-[2rem] p-8 border border-zinc-800 hover:border-(--color-primary)/50 transition-all group overflow-hidden relative"
          >
            {/* Background Glow */}
            <div className="absolute -top-12 -right-12 w-32 h-32 bg-(--color-primary)/5 blur-3xl group-hover:bg-(--color-primary)/10 transition-colors" />
            
            <div className="flex items-center gap-4 mb-6">
              <div className="relative">
                <img 
                  src={person.avatar} 
                  alt={person.name} 
                  className="w-16 h-16 rounded-2xl bg-zinc-900 border border-zinc-800"
                />
                <div className="absolute -bottom-2 -right-2 p-1.5 rounded-lg bg-black border border-zinc-800 shadow-xl">
                  {person.icon}
                </div>
              </div>
              <div>
                <h3 className="text-2xl font-black text-white leading-tight">{person.name}</h3>
                <span className="text-sm font-bold text-(--color-primary) tracking-widest uppercase">{person.role}</span>
              </div>
            </div>

            <div className="inline-block px-3 py-1 rounded-full bg-zinc-900 border border-zinc-800 text-xs font-bold text-neutral-400 mb-4 tracking-wider">
              {person.tagline}
            </div>

            <p className="text-neutral-400 leading-relaxed mb-8 flex-1">
              &quot;{person.bio}&quot;
            </p>

            <div className="grid grid-cols-3 gap-4 border-t border-zinc-800 pt-6">
              <div className="text-center">
                <span className="block text-[10px] uppercase tracking-tighter text-neutral-500 font-bold mb-1">Skill</span>
                <span className="text-xs font-black text-white">{person.stats.skill}</span>
              </div>
              <div className="text-center border-x border-zinc-800">
                <span className="block text-[10px] uppercase tracking-tighter text-neutral-500 font-bold mb-1">Played</span>
                <span className="text-xs font-black text-white">{person.stats.games}</span>
              </div>
              <div className="text-center">
                <span className="block text-[10px] uppercase tracking-tighter text-neutral-500 font-bold mb-1">Reliability</span>
                <span className="text-xs font-black text-white">{person.stats.rep}</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </SectionWrapper>
  );
}
