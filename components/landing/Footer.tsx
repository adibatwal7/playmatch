import Link from "next/link";
import { Globe, MessageCircle, Activity } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-zinc-800 bg-black pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 text-xl font-black tracking-tight text-white mb-6">
              <Activity className="w-6 h-6 text-(--color-primary)" />
              PlayMatch
            </div>
            <p className="text-neutral-400 mb-6">
              The smartest way to discover sports events, join games, and connect with athletes worldwide.
            </p>
            <div className="flex gap-4">
              <Link href="#" className="w-10 h-10 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center text-neutral-400 hover:text-(--color-primary) hover:border-(--color-primary)/50 transition-colors">
                <Globe className="w-5 h-5" />
              </Link>
              <Link href="#" className="w-10 h-10 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center text-neutral-400 hover:text-(--color-primary) hover:border-(--color-primary)/50 transition-colors">
                <MessageCircle className="w-5 h-5" />
              </Link>
            </div>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6 tracking-wide">Platform</h4>
            <ul className="space-y-4">
              <li><Link href="/feed" className="text-neutral-400 hover:text-white transition-colors">Find Games</Link></li>
              <li><Link href="/create" className="text-neutral-400 hover:text-white transition-colors">Host Event</Link></li>
              <li><Link href="/ai-search" className="text-neutral-400 hover:text-white transition-colors">AI Search</Link></li>
              <li><Link href="#" className="text-neutral-400 hover:text-white transition-colors">Pricing</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6 tracking-wide">Company</h4>
            <ul className="space-y-4">
              <li><Link href="#" className="text-neutral-400 hover:text-white transition-colors">About Us</Link></li>
              <li><Link href="#" className="text-neutral-400 hover:text-white transition-colors">Careers</Link></li>
              <li><Link href="#" className="text-neutral-400 hover:text-white transition-colors">Blog</Link></li>
              <li><Link href="#" className="text-neutral-400 hover:text-white transition-colors">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6 tracking-wide">Legal</h4>
            <ul className="space-y-4">
              <li><Link href="#" className="text-neutral-400 hover:text-white transition-colors">Terms of Service</Link></li>
              <li><Link href="#" className="text-neutral-400 hover:text-white transition-colors">Privacy Policy</Link></li>
              <li><Link href="#" className="text-neutral-400 hover:text-white transition-colors">Cookie Policy</Link></li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-zinc-800/50 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-neutral-500 text-sm">
            &copy; {new Date().getFullYear()} PlayMatch Inc. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm text-neutral-500">
            <Link href="#" className="hover:text-white transition-colors">System Status</Link>
            <Link href="#" className="hover:text-white transition-colors">Support</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
