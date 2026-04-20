import { Navbar } from "@/components/ui/Navbar";
import { Hero } from "@/components/landing/Hero";
import { HowItWorks } from "@/components/landing/HowItWorks";
import { FeaturedEvents } from "@/components/landing/FeaturedEvents";
import { Features } from "@/components/landing/Features";
import { Testimonials } from "@/components/landing/Testimonials";
import { MatchingLogic } from "@/components/landing/MatchingLogic";
import { Stats } from "@/components/landing/Stats";
import { CTASection } from "@/components/landing/CTASection";
import { Footer } from "@/components/landing/Footer";

export default function Home() {
  return (
    <div className="min-h-screen selection:bg-(--color-primary) selection:text-black bg-black text-white">
      <Navbar />
      
      <main className="flex flex-col">
        <Hero />
        <HowItWorks />
        <FeaturedEvents />
        <Features />
        <Testimonials />
        <MatchingLogic />
        <Stats />
        <CTASection />
      </main>

      <Footer />
    </div>
  );
}
