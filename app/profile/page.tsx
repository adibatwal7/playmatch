import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { Navbar } from "@/components/ui/Navbar";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { User, Mail, Calendar, Settings, Activity } from "lucide-react";
import { AnimatedButton } from "@/components/ui/AnimatedButton";

export default async function ProfilePage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  // Fetch the extended profile data from the profiles table
  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single();

  const joinedDate = new Date(user.created_at).toLocaleDateString("en-US", {
    month: "long",
    year: "numeric"
  });

  // Calculate Player Stats dynamically
  const { count: hostedCount } = await supabase
    .from('events')
    .select('*', { count: 'exact', head: true })
    .eq('host_id', user.id);

  const { count: playedCount } = await supabase
    .from('event_attendees')
    .select('*', { count: 'exact', head: true })
    .eq('user_id', user.id);

  return (
    <div className="min-h-screen pb-24 bg-black text-white">
      <Navbar />
      
      <SectionWrapper className="pt-32 md:pt-32 max-w-4xl">
        <div className="mb-10 text-center md:text-left flex flex-col md:flex-row items-center gap-8 glass p-8 md:p-12 rounded-3xl border border-zinc-800 relative overflow-hidden">
          {/* Subtle bg glow */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-(--color-primary) rounded-full blur-[120px] opacity-10 pointer-events-none" />

          <div className="w-32 h-32 rounded-full border-4 border-zinc-800 bg-zinc-900 flex flex-shrink-0 items-center justify-center overflow-hidden">
             {profile?.avatar_url ? (
               <img src={profile.avatar_url} alt="Avatar" className="w-full h-full object-cover" />
             ) : (
               <User className="w-16 h-16 text-neutral-600" />
             )}
          </div>
          
          <div className="flex-1">
            <h1 className="text-4xl lg:text-5xl font-black mb-2 text-white">
              {profile?.name || user.user_metadata?.name || "Player Profile"}
            </h1>
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 text-neutral-400 font-medium">
              <span className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-(--color-primary)" />
                {user.email}
              </span>
              <span className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-(--color-primary)" />
                Joined {joinedDate}
              </span>
            </div>
          </div>
          
          <div>
            <AnimatedButton variant="outline" className="gap-2 border-zinc-700 bg-black/40 hover:bg-black/60">
              <Settings className="w-4 h-4" />
              Edit Profile
            </AnimatedButton>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-1 glass p-6 rounded-3xl border border-zinc-800 h-fit">
               <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                 <Activity className="w-5 h-5 text-(--color-primary)" />
                 Player Stats
               </h3>
               <div className="space-y-4">
                 <div className="flex justify-between items-center bg-black/40 p-3 rounded-xl border border-zinc-800/50">
                    <span className="text-neutral-400">Games Played</span>
                    <span className="font-bold text-white">{playedCount || 0}</span>
                 </div>
                 <div className="flex justify-between items-center bg-black/40 p-3 rounded-xl border border-zinc-800/50">
                    <span className="text-neutral-400">Events Hosted</span>
                    <span className="font-bold text-white">{hostedCount || 0}</span>
                 </div>
               </div>
          </div>

          <div className="md:col-span-2 glass p-8 rounded-3xl border border-zinc-800 min-h-[300px] flex flex-col items-center justify-center text-center">
            <div className="w-16 h-16 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center mb-4">
               <Activity className="w-8 h-8 text-neutral-600" />
            </div>
            <h3 className="text-xl font-bold mb-2">No Recent Activity</h3>
            <p className="text-neutral-500 mb-6 max-w-sm">Join a game or host an event to start building your player profile history.</p>
            <AnimatedButton size="sm">Explore Events</AnimatedButton>
          </div>
        </div>
      </SectionWrapper>
    </div>
  );
}
