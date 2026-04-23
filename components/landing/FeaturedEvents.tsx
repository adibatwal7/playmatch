import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { EventsGrid } from "@/components/ui/EventsGrid";
import { createClient } from "@/lib/supabase/server";
import { DEMO_EVENTS } from "@/lib/demo-data";

export async function FeaturedEvents() {
  const supabase = await createClient();
  
  const { data: events } = await supabase
    .from('events')
    .select('*')
    .order('date', { ascending: true })
    .limit(3);

  const safeEvents = events && events.length > 0 ? events : DEMO_EVENTS.slice(0, 3);

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
