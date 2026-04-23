export const DEMO_EVENTS = [
  {
    id: "demo-1",
    title: "Intense 5v5 Turf Football",
    sport: "Football",
    description: "Looking for experienced players for a fast-paced game. Cleats required. No beginners please.",
    location: "Downtown Sports Center",
    date: new Date(Date.now() + 172800000).toISOString(), // 2 days from now
    price: 12,
    capacity: 10,
    host_id: "demo-host-1",
    matchPercentage: 98
  },
  {
    id: "demo-2",
    title: "Sunrise Vinyasa Flow",
    description: "Start your morning right with a gentle yoga session in the park. Bring your own mat!",
    sport: "Yoga",
    location: "Central Park West",
    date: new Date(Date.now() + 86400000).toISOString(), // 1 day from now
    price: 0,
    capacity: 20,
    host_id: "demo-host-2",
    matchPercentage: 95
  },
  {
    id: "demo-3",
    title: "Advanced Tennis Drills",
    description: "Hitting session focused on backhands and serves. Intermediate/Advanced level only.",
    sport: "Tennis",
    location: "Lakeside Courts",
    date: new Date(Date.now() + 259200000).toISOString(), // 3 days from now
    price: 15,
    capacity: 4,
    host_id: "demo-host-3",
    matchPercentage: 92
  }
];

export const DEMO_HOSTS: Record<string, any> = {
  "demo-host-1": {
    full_name: "Marcus Chen",
    avatar_url: "https://api.dicebear.com/7.x/avataaars/svg?seed=Marcus",
    bio: "Ex-college football player. Looking for high-intensity matches only."
  },
  "demo-host-2": {
    full_name: "Sarah Jenkins",
    avatar_url: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
    bio: "Yoga instructor and wellness enthusiast."
  },
  "demo-host-3": {
    full_name: "Elena Rodriguez",
    avatar_url: "https://api.dicebear.com/7.x/avataaars/svg?seed=Elena",
    bio: "Competitive tennis player. 4.5 NTRP rating."
  }
};
