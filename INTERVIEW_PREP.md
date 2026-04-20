# PlayMatch Interview Prep Guide 🚀

Congratulations on building **PlayMatch**! This guide is explicitly designed to help you ace your interview by clearly articulating the complex architectural and **Database Management System (DBMS)** decisions you made while building this application. 

Instead of just saying "I used Supabase," this guide will give you the vocabulary to explain *why* and *how* your database works under the hood.

---

## 1. Core Architecture: What is PlayMatch?
PlayMatch is a **Next.js (React) Full-Stack Web Application** built on a serverless architecture. 
For the backend, you utilized **Supabase**, which is a powerful Backend-as-a-Service (BaaS) that operates directly on top of an open-source **PostgreSQL (Postgres)** relational database.

### Why a Relational Database (RDBMS)?
You chose a Relational Database (PostgreSQL) rather than a NoSQL document store (like MongoDB) because the core feature of a sports matchmaking app is highly **relational data**: 
- Users host Events.
- Users join Events.
- Events have multiple Users. 
An RDBMS guarantees data consistency and referential integrity between these entities.

---

## 2. Database Schema & Normalization
*Normalization* is the process of organizing data to reduce redundancy and improve data integrity. You designed a highly normalized schema spanning three primary tables:

1. **`profiles` (Users)**: Stores extended data about users (name, avatar, bio).
2. **`events`**: Stores the core data of a game (location, date, capacity, price, and host).
3. **`event_attendees`**: Tracks exactly who is going to which event.

### Key DBMS Concept: Primary Keys & Foreign Keys
You can explain that your database enforces **Referential Integrity**:
- **Primary Key (PK):** A unique identifier for a row. Example: `events.id` is a randomly generated UUID. 
- **Foreign Key (FK):** A column that physically links one table to another's Primary Key.
  - In your `events` table, the `host_id` is a Foreign Key referencing `profiles.id`. If a profile is deleted, the database knows exactly how to handle the orphaned event.

---

## 3. The "Many-to-Many" Relationship (Junction Tables)
If your interviewer asks: *"How do you handle a user joining an event?"*

**Your Answer:** 
"I implemented a **Junction Table** (also known as an Associative Entity) called `event_attendees`."

**The Concept:**
- One User can join *Many* Events.
- One Event can have *Many* Users.
- A database cannot store a Many-to-Many relationship directly in a single column without breaking normalization (like saving an array of strings). 
- To solve this, you built `event_attendees`, which holds two Foreign Keys: `event_id` and `user_id`. 
- By making a **Composite Primary Key** out of `(event_id, user_id)`, you natively prevented a bug where a user could join the same game twice! The database throws a `23505 Unique Violation` error if they try.

---

## 4. Advanced DBMS Features you Implemented

### A. Database Triggers & Functions (PL/pgSQL)
When a user signs up using an email and password, their secure login goes to `auth.users` (managed by Supabase secretly). However, we need their public profile in `public.profiles` so other players can see their name.

**How you solved this:**
You wrote an **SQL Trigger**. A trigger is database-level code that fires automatically based on an event. You configured `handle_new_user()` to automatically execute an `INSERT` statement into `profiles` the exact millisecond a row is created in `auth.users`. 
*Why it's good:* This guarantees data sync at the absolute lowest database level, regardless of API crashes.

### B. Row Level Security (RLS)
Traditionally, frontend apps talk to a middleman Node.js server, which talks to the Database. To cut down latency and infrastructure, Next.js talks *directly* to the Database.

**Why isn't that dangerous?**
You implemented **Row Level Security (RLS)** in PostgreSQL. This means security is baked into the tables themselves.
- You wrote a Policy: `Users can update own profile ONLY IF auth.uid() = id`.
- If an attacker tries to pass a malicious query fetching everyone's private data, the PostgreSQL engine intercepts it, sees they aren't authenticated, and returns 0 rows. 

---

## 5. Next.js Server Components & AI Integration

### Server-Side Rendering (SSR)
When navigating to an event (`/events/[123]`), you used **Next.js App Router Server Components**. This means the SQL query runs on the secure backend server, fetches the Data, Host Profile, and Attendee Count dynamically using relational `.select('*, profiles(...)')` joins, and compiles it into HTML before sending it to the user's phone. This means lightning-fast loads and high SEO.

### AI Natural Language Routing
You integrated **OpenAI (GPT-4) as an intelligence layer**:
1. User types unstructured text: *"I want to play football under $10 tomorrow."*
2. Our Next.js `/api/ai-search` Endpoint shoots that string to OpenAI with a strict system prompt.
3. OpenAI extracts Structured Data JSON: `{ "sport": "Football", "max_price": 10 }`.
4. Our API dynamically maps that JSON to **PostgreSQL filters**, running `.eq('sport', 'Football').lte('price', 10)` directly against the live database to return the exact cards to the UI.

---

## 6. The Stripe Financial Transaction Flow
For premium events, you implemented **Stripe Hosted Checkout**:
1. When a user clicks "Pay & Join", the click hits `/api/checkout`.
2. The Server securely contacts Stripe using your `STRIPE_SECRET_KEY` to draft an isolated session, attaching the Event ID loosely via metadata.
3. The user's browser is bounced to Stripe's ultra-secure vault to process the credit card (fulfilling PCI Compliance).
4. Upon successful swipe, Stripe redirects them back to our app (`/events/[id]?checkout=success`).
5. Next.js natively detects the `success` parameter URL on the server side and instantly triggers an `INSERT` statement into the `event_attendees` roster!

---

## ⭐ Summary Checklist for the Interviewer
If they ask what you are most proud of technically, emphasize:
> "I'm most proud of designing a strictly normalized PostgreSQL Database Schema with Row-Level Security, resolving complex Many-to-Many relationships via Junction tables, and wiring it end-to-end through Next.js Server Components into a generative-AI natural language filtering algorithm."
