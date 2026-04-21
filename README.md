# PlayMatch ⚽️🏀🎾

**Find Your Game. Play with the right people at the right time.**

PlayMatch is a sophisticated, AI-powered sports matchmaking platform designed to help athletes and casual players find games, host events, and connect with the right teammates effortlessly.

[![Next.js](https://img.shields.io/badge/Next.js-15+-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.0-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![Supabase](https://img.shields.io/badge/Supabase-Database-3ECF8E?style=for-the-badge&logo=supabase)](https://supabase.com/)
[![OpenAI](https://img.shields.io/badge/OpenAI-AI_Search-412991?style=for-the-badge&logo=openai)](https://openai.com/)
[![Tauri](https://img.shields.io/badge/Tauri-Desktop-24C8D8?style=for-the-badge&logo=tauri)](https://tauri.app/)

## ✨ Key Features

- 🤖 **AI-Powered Recommendations**: Smart matchmaking that suggests games and players based on skill level, location, and interests using OpenAI.
- 🔍 **AI Natural Language Search**: Find games using natural language queries (e.g., "Competitive basketball in Brooklyn this weekend").
- 📅 **Event Hosting & Management**: Create and manage sports events with dynamic rosters and real-time updates.
- 💳 **Secure Payments**: Integrated Stripe checkout for tournament fees or venue bookings.
- 🖥️ **Cross-Platform**: Available on Web and as a native Desktop application powered by Tauri.
- 🌙 **Premium UI/UX**: A dark-themed, glassmorphic interface built with Framer Motion for smooth, high-end interactions.

## 🚀 Tech Stack

- **Framework**: [Next.js 15+](https://nextjs.org/) (App Router)
- **Frontend**: React 19, [Framer Motion](https://www.framer.com/motion/), [Lucide Icons](https://lucide.dev/)
- **Styling**: [Tailwind CSS 4.0](https://tailwindcss.com/)
- **Backend & Auth**: [Supabase](https://supabase.com/)
- **Brain**: [OpenAI API](https://openai.com/) (GPT-4o / Recommendations)
- **Payments**: [Stripe SDK](https://stripe.com/)
- **Desktop**: [Tauri](https://tauri.app/)

## 🛠️ Getting Started

### Prerequisites

- Node.js 18+
- npm / pnpm / yarn
- Supabase account & project
- OpenAI API Key
- Stripe account (for payments)

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/adibatwal7/playmatch.git
   cd playmatch
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up Environment Variables:**
   Create a `.env.local` file in the root directory:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   OPENAI_API_KEY=your_openai_api_key
   STRIPE_SECRET_KEY=your_stripe_secret_key
   ```

4. **Run the development server:**
   ```bash
   npm run dev
   ```

5. **Desktop (Optional):**
   To run the Tauri desktop app:
   ```bash
   npm run tauri dev
   ```

## 📖 Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [Supabase SSR Guide](https://supabase.com/docs/guides/auth/server-side/nextjs)
- [Tailwind CSS 4.0 Alpha](https://tailwindcss.com/blog/2024-03-06-tailwindcss-v4-alpha)

---

Built with ❤️ for the sports community.
