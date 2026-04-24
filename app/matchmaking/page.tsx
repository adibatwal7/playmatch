import { Navbar } from "@/components/ui/Navbar";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { getMatches } from "../profile/actions";
import { Users, Sparkles, Trophy, Zap, ArrowRight, MapPin } from "lucide-react";
import { AnimatedButton } from "@/components/ui/AnimatedButton";
import Link from "next/link";

interface Match {
  id: string;
  full_name?: string;
  name?: string;
  matchPercentage: number;
  avatar_url?: string;
  bio?: string;
  sharedInterests: string[];
  interests: string[];
  location?: string;
  isLocationMatch?: boolean;
}

export default async function MatchmakingPage() {
  const matches = await getMatches();

  return (
    <div className="min-h-screen pb-24 bg-black text-white">
      <Navbar />
      
      <SectionWrapper className="pt-32 md:pt-40 max-w-6xl">
        <div className="mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-teal-500/10 text-teal-400 mb-4 border border-teal-500/20">
            <Zap className="w-4 h-4" />
            <span className="text-xs font-bold tracking-widest uppercase">Database Matchmaking</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-black mb-6 tracking-tight">Find Your <span className="text-(--color-primary)">Teammates</span></h1>
          <p className="text-xl text-neutral-400 max-w-2xl leading-relaxed">
            Our database algorithm finds users who share your sports interests. No AI fluff, just pure data matching.
          </p>
        </div>

        {matches.length === 0 ? (
          <div className="glass p-16 rounded-[3rem] border border-zinc-800 bg-zinc-900/20 text-center flex flex-col items-center gap-6">
            <div className="w-20 h-20 rounded-full bg-zinc-800 flex items-center justify-center text-neutral-500">
              <Users className="w-10 h-10" />
            </div>
            <div>
              <h3 className="text-2xl font-bold mb-2">No Matches Found Yet</h3>
              <p className="text-neutral-500 max-w-md mx-auto">
                Update your profile with sports interests like &quot;Football&quot; or &quot;Tennis&quot; to start seeing potential teammates.
              </p>
            </div>
            <Link href="/profile/edit">
              <AnimatedButton>Update My Interests</AnimatedButton>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {matches.map((match: Match) => (
              <div 
                key={match.id}
                className="group glass p-8 rounded-[2.5rem] border border-zinc-800 bg-zinc-900/40 hover:bg-zinc-800/60 hover:border-(--color-primary)/30 transition-all duration-500 relative overflow-hidden"
              >
                {/* Match Badge */}
                <div className="absolute top-6 right-6 px-3 py-1 rounded-full bg-(--color-primary)/20 text-(--color-primary) text-xs font-black border border-(--color-primary)/30">
                  {match.matchPercentage}% Match
                </div>

                <div className="flex flex-col gap-6 relative z-10">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-2xl bg-zinc-800 border border-zinc-700 overflow-hidden group-hover:scale-105 transition-transform">
                      <img 
                        src={match.avatar_url || `https://api.dicebear.com/7.x/avataaars/svg?seed=${match.id}`} 
                        alt={match.full_name} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white group-hover:text-(--color-primary) transition-colors">
                        {match.full_name || match.name || "Anonymous Player"}
                      </h3>
                      {match.location && (
                        <p className="text-sm text-neutral-400 font-medium flex items-center gap-1 mt-1">
                          <MapPin className="w-3 h-3" />
                          {match.location}
                        </p>
                      )}
                      <p className="text-xs text-neutral-500 font-medium mt-1">Player since 2024</p>
                    </div>
                  </div>

                  <p className="text-neutral-400 line-clamp-2 text-sm leading-relaxed">
                    {match.bio || "This player hasn't added a bio yet, but they share your passion for sports!"}
                  </p>

                  <div className="flex flex-wrap gap-2">
                    {match.sharedInterests.map((interest: string) => (
                      <span 
                        key={interest}
                        className="px-3 py-1 rounded-lg bg-zinc-950/50 border border-zinc-800 text-[10px] font-black uppercase tracking-widest text-teal-400"
                      >
                        {interest}
                      </span>
                    ))}
                    {match.interests?.length > match.sharedInterests.length && (
                      <span className="px-3 py-1 rounded-lg bg-zinc-950/50 border border-zinc-800 text-[10px] font-black uppercase tracking-widest text-neutral-600">
                        +{match.interests.length - match.sharedInterests.length} more
                      </span>
                    )}
                    {match.isLocationMatch && (
                      <span className="px-3 py-1 rounded-lg bg-(--color-primary)/10 border border-(--color-primary)/20 text-[10px] font-black uppercase tracking-widest text-(--color-primary)">
                        Location Match
                      </span>
                    )}
                  </div>

                  <div className="pt-4 border-t border-zinc-800 flex items-center justify-between">
                    <div className="flex items-center gap-2 text-neutral-500">
                      <Trophy className="w-4 h-4" />
                      <span className="text-xs font-bold uppercase tracking-tighter">Level 4</span>
                    </div>
                    <button className="flex items-center gap-2 text-(--color-primary) font-bold text-sm hover:translate-x-1 transition-transform">
                      View Profile
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Decorative Elements */}
                <div className="absolute -bottom-12 -right-12 w-32 h-32 bg-(--color-primary) rounded-full blur-[80px] opacity-0 group-hover:opacity-10 transition-opacity" />
              </div>
            ))}
          </div>
        )}

        {/* Footer Info Box */}
        <div className="mt-20 p-10 rounded-[2.5rem] border border-zinc-800 bg-gradient-to-br from-zinc-900 to-black flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex items-center gap-6">
             <div className="w-16 h-16 rounded-2xl bg-teal-500/10 flex items-center justify-center border border-teal-500/20">
                <Sparkles className="w-8 h-8 text-teal-400" />
             </div>
             <div>
                <h4 className="text-xl font-bold">Why interest matching?</h4>
                <p className="text-neutral-500 max-w-md">Playing with people who share your passion makes every game more competitive and enjoyable.</p>
             </div>
          </div>
          <AnimatedButton variant="outline" className="border-zinc-700">How it works</AnimatedButton>
        </div>
      </SectionWrapper>
    </div>
  );
}
