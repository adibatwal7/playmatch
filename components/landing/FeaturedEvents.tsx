import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { EventsGrid } from "@/components/ui/EventsGrid";
import { createClient } from "@/lib/supabase/server";

export async function FeaturedEvents() {
  const supabase = await createClient();
  
  const { data: events } = await supabase
    .from('events')
    .select('*')
    .order('date', { ascending: true })
    .limit(3);

  const demoEvents = [
    {
      id: "demo-1",
      title: "Intense 5v5 Turf Football",
      sport: "Football",
      price: 12,
      date: new Date(Date.now() + 172800000).toISOString(),
      location: "Downtown Sports Center",
      matchPercentage: 98
    },
    {
      id: "demo-2",
      title: "Sunrise Vinyasa Flow",
      sport: "Yoga",
      price: 0,
      date: new Date(Date.now() + 86400000).toISOString(),
      location: "Central Park West",
      matchPercentage: 95
    },
    {
      id: "demo-3",
      title: "Advanced Tennis Drills",
      sport: "Tennis",
      price: 15,
      date: new Date(Date.now() + 259200000).toISOString(),
      location: "Lakeside Courts",
      matchPercentage: 92
    }
  ];

  const safeEvents = events && events.length > 0 ? events : demoEvents;

  return (
    <SectionWrapper className="py-24">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
        <div>
          <h2 className="text-4xl md:text-5xl font-black mb-4">Featured <span className="text-transparent bg-clip-text bg-gradient-to-r from-(--color-primary) to-teal-400">Events</span></h2>
          <p className="text-xl text-neutral-400 max-w-2xl">Jump into the most popular games happening near you right now.</p>
        </div>
      </div>

      <EventsGrid events={safeEvents} />
    </SectionWrapper>
  );
}
