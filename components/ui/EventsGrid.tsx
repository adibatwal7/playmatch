"use client";

import { motion } from "framer-motion";
import { EventCard } from "./EventCard";
import { EmptyState } from "./EmptyState";

interface EventType {
  id: string;
  title: string;
  sport: string;
  location: string;
  price: number;
  date: string;
  capacity?: number;
  host_id?: string;
  imageUrl?: string;
}

const SPORT_IMAGES: Record<string, string> = {
  football: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?q=80&w=800&auto=format&fit=crop",
  soccer: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?q=80&w=800&auto=format&fit=crop",
  basketball: "https://images.unsplash.com/photo-1546519638-68e109498ffc?q=80&w=800&auto=format&fit=crop",
  tennis: "https://images.unsplash.com/photo-1595435934249-5df7ed86e1c0?q=80&w=800&auto=format&fit=crop",
  yoga: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=800&auto=format&fit=crop",
  volleyball: "https://images.unsplash.com/photo-1592650547661-314fe411a09d?q=80&w=800&auto=format&fit=crop",
  padel: "https://images.unsplash.com/photo-1626084300762-5394ef34764b?q=80&w=800&auto=format&fit=crop",
  "table tennis": "https://images.unsplash.com/photo-1609132718484-ccc305002701?q=80&w=800&auto=format&fit=crop",
  badminton: "https://images.unsplash.com/photo-1626225967045-9410dd99fa70?q=80&w=800&auto=format&fit=crop",
  running: "https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?q=80&w=800&auto=format&fit=crop",
  hiking: "https://images.unsplash.com/photo-1551632811-561732d1e306?q=80&w=800&auto=format&fit=crop"
};

function getSportImage(sport: string, providedUrl?: string) {
  if (providedUrl) return providedUrl;
  const key = sport.toLowerCase();
  return SPORT_IMAGES[key] || "https://images.unsplash.com/photo-1579952363873-27f3bade9f55?q=80&w=800&auto=format&fit=crop";
}

export function EventsGrid({ events, emptyMessage = "No events found." }: { events: EventType[], emptyMessage?: string }) {
  if (events.length === 0) {
    return <EmptyState className="my-10" />;
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
    >
      {events.map((event, idx) => (
        <motion.div
          key={event.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 * idx }}
        >
          <EventCard 
            id={event.id}
            title={event.title}
            sport={event.sport}
            distance="2.5" 
            price={event.price === 0 ? "Free" : event.price.toString()}
            date={new Date(event.date).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit' })}
            imageUrl={getSportImage(event.sport, event.imageUrl)} 
          />
        </motion.div>
      ))}
    </motion.div>
  );
}
