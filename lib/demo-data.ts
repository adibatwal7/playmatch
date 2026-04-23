export const DEMO_EVENTS = [
  {
    id: "demo-1",
    title: "Intense 5v5 Turf Football",
    sport: "Football",
    description: "Looking for experienced players for a fast-paced game. Cleats required. No beginners please.",
    location: "Downtown Sports Center",
    date: new Date(Date.now() + 172800000).toISOString(),
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
    date: new Date(Date.now() + 86400000).toISOString(),
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
    date: new Date(Date.now() + 259200000).toISOString(),
    price: 15,
    capacity: 4,
    host_id: "demo-host-3",
    matchPercentage: 92
  },
  {
    id: "demo-4",
    title: "Late Night 3v3 Hoops",
    description: "Casual high-energy basketball under the lights. Winners stay on.",
    sport: "Basketball",
    location: "Underground Gym",
    date: new Date(Date.now() + 345600000).toISOString(),
    price: 5,
    capacity: 12,
    host_id: "demo-host-4",
    matchPercentage: 88
  },
  {
    id: "demo-5",
    title: "Beach Volleyball Social",
    description: "Friendly games on the sand followed by drinks at the boardwalk. All levels welcome!",
    sport: "Volleyball",
    location: "Sunset Beach - Court 4",
    date: new Date(Date.now() + 432000000).toISOString(),
    price: 0,
    capacity: 16,
    host_id: "demo-host-2",
    matchPercentage: 97
  },
  {
    id: "demo-6",
    title: "Beginner Padel Match",
    description: "Learning the basics of Padel? Come join us for a friendly match. We have spare rackets.",
    sport: "Padel",
    location: "Padel Club North",
    date: new Date(Date.now() + 518400000).toISOString(),
    price: 20,
    capacity: 4,
    host_id: "demo-host-4",
    matchPercentage: 90
  },
  {
    id: "demo-7",
    title: "Table Tennis Play-offs",
    description: "Fast-paced tournament style ping pong. Bring your A-game!",
    sport: "Table Tennis",
    location: "Retro Bar & Games",
    date: new Date(Date.now() + 604800000).toISOString(),
    price: 8,
    capacity: 8,
    host_id: "demo-host-1",
    matchPercentage: 85
  },
  {
    id: "demo-8",
    title: "5K Community Run",
    description: "A steady pace run through the botanical gardens. Coffee afterwards is mandatory!",
    sport: "Running",
    location: "Botanical Gardens Gate",
    date: new Date(Date.now() + 691200000).toISOString(),
    price: 0,
    capacity: 30,
    host_id: "demo-host-2",
    matchPercentage: 94
  },
  {
    id: "demo-9",
    title: "Weekend Hiking Group",
    description: "A moderate 3-hour hike up the ridge. Stunning views guaranteed. Bring water and snacks.",
    sport: "Hiking",
    location: "Base Camp Trailhead",
    date: new Date(Date.now() + 777600000).toISOString(),
    price: 0,
    capacity: 15,
    host_id: "demo-host-3",
    matchPercentage: 96
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
  },
  "demo-host-4": {
    full_name: "David Miller",
    avatar_url: "https://api.dicebear.com/7.x/avataaars/svg?seed=David",
    bio: "Always down for a game. Basketball and Padel enthusiast."
  }
};
