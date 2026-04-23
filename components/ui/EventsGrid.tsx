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
            distance="2.5" // Mock distance until geospatial logic is added
            price={event.price === 0 ? "Free" : event.price.toString()}
            date={new Date(event.date).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit' })}
            imageUrl={event.imageUrl || "https://images.unsplash.com/photo-1579952363873-27f3bade9f55?q=80&w=800&auto=format&fit=crop"} 
          />
        </motion.div>
      ))}
    </motion.div>
  );
}
