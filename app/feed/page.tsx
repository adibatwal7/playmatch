import { Navbar } from "@/components/ui/Navbar";
import { SearchBar } from "@/components/ui/SearchBar";
import { FilterChips } from "@/components/ui/FilterChips";
import { EventsGrid } from "@/components/ui/EventsGrid";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { createClient } from "@/lib/supabase/server";
import { DEMO_EVENTS } from "@/lib/demo-data";

export default async function FeedPage() {
  const supabase = await createClient();
  
  // Fetch active events from database
  const { data: events, error } = await supabase
    .from('events')
    .select('*')
    .order('date', { ascending: true });

  const safeEvents = events && events.length > 0 ? events : DEMO_EVENTS;

  return (
    <div className="min-h-screen pb-24">
      <Navbar />
      
      <SectionWrapper className="pt-32 md:pt-32">
        <div className="flex flex-col gap-8 mb-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <SearchBar />
          <FilterChips />
        </div>

        <EventsGrid events={safeEvents} />
      </SectionWrapper>
    </div>
  );
}
