import { Navbar } from "@/components/ui/Navbar";
import { RecommendationBadge } from "@/components/ui/RecommendationBadge";
import { JoinButton } from "@/components/ui/JoinButton";
import { Calendar, MapPin, Clock, User, ArrowLeft, Sparkles, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { notFound } from "next/navigation";
import { DEMO_EVENTS, DEMO_HOSTS } from "@/lib/demo-data";

export default async function EventDetailPage({ 
  params,
  searchParams 
}: { 
  params: Promise<{ id: string }>,
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const { id } = await params;
  const resolvedSearchParams = await searchParams;
  const checkoutStatus = resolvedSearchParams.checkout;
  
  const supabase = await createClient();

  // Fetch current user
  const { data: { user } } = await supabase.auth.getUser();
  const isAuthenticated = !!user;

  // Process Stripe Checkout Success
  if (checkoutStatus === 'success' && isAuthenticated) {
    await supabase.from('event_attendees').insert({
      event_id: id,
      user_id: user.id
    });
  }

  let event: any = null;
  let eventError: any = null;
  let host: any = null;
  let attendeesData: any[] = [];

  if (id.startsWith('demo-')) {
    event = DEMO_EVENTS.find(e => e.id === id);
    host = DEMO_HOSTS[event?.host_id || ""];
    const counts: Record<string, number> = { 'demo-1': 6, 'demo-2': 12, 'demo-3': 2 };
    attendeesData = Array.from({ length: counts[id] || 0 }).map((_, i) => ({ user_id: `fake-user-${i}` }));
  } else {
    const { data: dbEvent, error: dbEventError } = await supabase
      .from('events')
      .select(`*`)
      .eq('id', id)
      .single();
    
    event = dbEvent;
    eventError = dbEventError;

    if (event) {
      const { data: dbHost } = await supabase.from('profiles').select('*').eq('id', event.host_id).single();
      host = dbHost;

      const { data: dbAttendees } = await supabase.from('event_attendees').select('user_id').eq('event_id', id);
      attendeesData = dbAttendees || [];
    }
  }

  if (eventError || !event) {
    return notFound();
  }

  const joinedCount = attendeesData?.length || 0;
  const hasJoined = attendeesData?.some(a => a.user_id === user?.id) || false;
  const isFull = joinedCount >= event.capacity;

  const displayDate = new Date(event.date);
  const imageUrl = "https://images.unsplash.com/photo-1579952363873-27f3bade9f55?q=80&w=1200&auto=format&fit=crop";

  return (
    <div className="min-h-screen pb-40">
      <Navbar />
      
      {/* Banner */}
      <div className="relative h-[45vh] md:h-[55vh] w-full pt-20 border-b border-zinc-800">
        <img 
          src={imageUrl} 
          alt={event.title} 
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-black/40 to-transparent" />
        
        <div className="absolute top-24 left-4 md:left-8 z-10">
          <Link href="/feed">
            <button className="w-12 h-12 rounded-full glass border border-zinc-700 bg-black/50 flex items-center justify-center hover:bg-black/80 transition-colors shadow-lg">
              <ArrowLeft className="w-6 h-6 text-white" />
            </button>
          </Link>
        </div>
      </div>

      <SectionWrapper className="-mt-32 relative z-20 max-w-5xl">
        <div className="flex flex-col gap-10 glass p-6 md:p-12 rounded-3xl border border-zinc-800 shadow-2xl bg-black/60">
          
          {checkoutStatus === 'success' && (
            <div className="w-full relative overflow-hidden bg-gradient-to-r from-emerald-900/40 to-black border border-emerald-500/50 rounded-2xl p-6 flex items-center gap-4">
              <CheckCircle2 className="w-8 h-8 text-emerald-400" />
              <div>
                <h3 className="font-bold text-emerald-400 text-lg">Payment Successful</h3>
                <p className="text-emerald-200/80 text-sm">Your ticket has been secured. You are now officially on the roster!</p>
              </div>
            </div>
          )}

          {/* Header Info */}
          <div className="flex flex-col gap-5">
            <div className="flex flex-wrap items-center gap-4">
              <span className="px-4 py-1.5 rounded-full bg-zinc-900 border border-zinc-800 text-sm font-black tracking-widest uppercase text-(--color-primary)">
                {event.sport}
              </span>
              <RecommendationBadge type="ai-match" matchPercentage={98} />
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight leading-tight">{event.title}</h1>
            
            <div className="flex items-center gap-4 text-neutral-400 mt-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-zinc-900 border border-zinc-700 overflow-hidden">
                   <img src={host?.avatar_url || "https://i.pravatar.cc/150"} alt="Host" />
                </div>
                <div>
                  <p className="text-base font-bold text-white">Hosted by {host?.full_name || host?.name || "Player"}</p>
                  <p className="text-sm font-medium">Verified Event Creator</p>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-2">
            <div className="bg-zinc-950/50 p-6 rounded-2xl flex flex-col gap-3 border border-zinc-800">
              <div className="w-12 h-12 rounded-xl bg-(--color-primary)/10 text-(--color-primary) flex items-center justify-center border border-(--color-primary)/20">
                <Calendar className="w-6 h-6" />
              </div>
              <div>
                <p className="text-sm font-bold text-neutral-500 uppercase tracking-widest">Date</p>
                <p className="font-bold text-lg">{displayDate.toLocaleDateString()}</p>
              </div>
            </div>
            
            <div className="bg-zinc-950/50 p-6 rounded-2xl flex flex-col gap-3 border border-zinc-800">
              <div className="w-12 h-12 rounded-xl bg-teal-500/10 text-teal-400 flex items-center justify-center border border-teal-500/20">
                <Clock className="w-6 h-6" />
              </div>
              <div>
                <p className="text-sm font-bold text-neutral-500 uppercase tracking-widest">Time</p>
                <p className="font-bold text-lg">{displayDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
              </div>
            </div>

            <div className="bg-zinc-950/50 p-6 rounded-2xl flex flex-col gap-3 border border-zinc-800">
              <div className="w-12 h-12 rounded-xl bg-orange-500/10 text-orange-400 flex items-center justify-center border border-orange-500/20">
                <MapPin className="w-6 h-6" />
              </div>
              <div>
                <p className="text-sm font-bold text-neutral-500 uppercase tracking-widest">Location</p>
                <p className="font-bold text-lg truncate w-full" title={event.location}>{event.location}</p>
              </div>
            </div>
          </div>

          {/* AI Match Explanation */}
          <div className="p-8 rounded-3xl border border-(--color-primary)/30 bg-gradient-to-br from-(--color-primary)/10 to-transparent relative overflow-hidden shadow-inner">
            <div className="absolute -right-10 -top-10 text-(--color-primary) opacity-5">
              <Sparkles className="w-64 h-64" />
            </div>
            <h3 className="text-2xl font-black flex items-center gap-3 mb-6 text-(--color-primary)">
              <Sparkles className="w-6 h-6" />
              Why this is perfect for you
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-4">
                <CheckCircle2 className="w-6 h-6 text-(--color-primary) shrink-0 mt-0.5" />
                <span className="text-neutral-200 text-lg">Matches your exact query for a {event.sport} game.</span>
              </li>
              <li className="flex items-start gap-4">
                <CheckCircle2 className="w-6 h-6 text-(--color-primary) shrink-0 mt-0.5" />
                <span className="text-neutral-200 text-lg">Event {event.price === 0 ? "is completely free" : `is under $${event.price + 5}`} making it an ideal choice.</span>
              </li>
            </ul>
          </div>

          <div className="h-px bg-zinc-800/80 w-full my-2" />

          {/* Details */}
          <div className="space-y-4">
            <h3 className="text-2xl font-black">About this game</h3>
            <p className="text-neutral-300 text-lg leading-relaxed font-normal whitespace-pre-wrap">
              Join us for a great game of {event.sport} at {event.location}. This session is open to the public but limited to {event.capacity} players to ensure a good experience. 
            </p>
          </div>

          {/* Participants */}
          <div className="space-y-6">
            <div className="flex justify-between items-end mb-2">
              <h3 className="text-2xl font-black">Participants</h3>
              <span className="text-neutral-400 font-bold bg-zinc-900 px-4 py-1.5 rounded-full text-sm border border-zinc-800">{joinedCount}/{event.capacity} joined</span>
            </div>
            <div className="flex flex-wrap gap-4">
              {Array.from({ length: joinedCount }).map((_, i) => (
                <div key={i} className="w-14 h-14 rounded-full bg-zinc-800 border-2 border-zinc-700 overflow-hidden shadow-lg hover:scale-105 transition-transform cursor-pointer">
                  <img src={`https://i.pravatar.cc/150?u=${i}`} alt={`Player ${i}`} />
                </div>
              ))}
              {Array.from({ length: Math.max(0, event.capacity - joinedCount) }).map((_, i) => (
                <div key={`empty-${i}`} className="w-14 h-14 rounded-full border-2 border-dashed border-zinc-700 bg-zinc-900/50 flex items-center justify-center text-zinc-600">
                  <User className="w-6 h-6" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </SectionWrapper>

      {/* Sticky Bottom Bar */}
      <div className="fixed bottom-0 inset-x-0 glass border-t border-zinc-800 p-4 md:p-6 z-50 bg-black/80">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-sm font-bold text-neutral-400 uppercase tracking-widest">Price</span>
            <span className="text-3xl font-black">{event.price === 0 ? "Free" : `$${event.price}`}</span>
          </div>
          
          <JoinButton 
            eventId={event.id} 
            title={event.title}
            imageUrl={imageUrl}
            price={event.price} 
            initialHasJoined={hasJoined} 
            isFull={isFull}
            isAuthenticated={isAuthenticated}
          />
        </div>
      </div>
    </div>
  );
}
