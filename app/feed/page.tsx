import { Navbar } from "@/components/ui/Navbar";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { createClient } from "@/lib/supabase/server";
import { DEMO_EVENTS } from "@/lib/demo-data";
import { DiscoverContent } from "@/components/landing/DiscoverContent";

export default async function FeedPage() {
  const supabase = await createClient();
  
  // Fetch active events from database
  const { data: events } = await supabase
    .from('events')
    .select('*')
    .order('date', { ascending: true });

  const dbEvents = (events || []).map(ev => ({
    ...ev,
    imageUrl: ev.image_url || ev.imageUrl
  }));
  const safeEvents = [...dbEvents, ...DEMO_EVENTS];

  return (
    <div className="min-h-screen pb-24">
      <Navbar />
      
      <SectionWrapper className="pt-32 md:pt-40">
        <DiscoverContent initialEvents={safeEvents} />
      </SectionWrapper>
    </div>
  );
}
