"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { User, Menu } from "lucide-react";
import { AnimatedButton } from "./AnimatedButton";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { createClient } from "@/lib/supabase/client";
import { logout } from "@/app/login/actions";

export function Navbar() {
  const pathname = usePathname();
  const [user, setUser] = useState<any>(null);
  const supabase = createClient();

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
    };
    getUser();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUser(session?.user || null);
      }
    );

    return () => subscription.unsubscribe();
  }, [supabase]);

  const handleLogout = async () => {
    await logout();
  };

  return (
    <nav className="fixed top-0 w-full z-50 glass bg-black/60 border-b border-zinc-800 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div className="flex items-center gap-8">
            <Link href="/" className="flex items-center gap-2 group">
              <div className="w-8 h-8 bg-(--color-primary) rounded-xl rotate-12 group-hover:rotate-0 transition-transform duration-300 shadow-[0_0_15px_rgba(163,255,18,0.4)]" />
              <span className="font-bold text-2xl tracking-tighter">
                Play<span className="text-(--color-primary)">Match</span>
              </span>
            </Link>
            
            <div className="hidden md:flex items-center gap-6">
              {[
                { name: "Discover", href: "/feed" },
                { name: "Matchmaking", href: "/matchmaking" },
                { name: "Host Event", href: "/create" },
                { name: "AI Search", href: "/ai-search" },
              ].map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className={cn(
                    "text-sm font-medium transition-colors hover:text-white",
                    pathname === link.href ? "text-(--color-primary)" : "text-neutral-400"
                  )}
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>

          <div className="hidden md:flex items-center gap-4">
            {user ? (
              <>
                <Link href="/profile" className="text-sm font-bold text-neutral-300 hover:text-white mr-2 flex items-center gap-2 px-3 py-1.5 rounded-full bg-zinc-900/50 border border-zinc-800 hover:border-(--color-primary)/50 transition-all">
                  <User className="w-4 h-4 text-(--color-primary)" />
                  {user.user_metadata?.name || user.email?.split('@')[0]}
                </Link>
                <button onClick={handleLogout} className="text-sm font-medium text-neutral-400 hover:text-red-400 transition-colors">
                  Log Out
                </button>
              </>
            ) : (
              <Link href="/login">
                <AnimatedButton variant="primary" size="sm">
                  Sign In
                </AnimatedButton>
              </Link>
            )}
          </div>

          <div className="md:hidden flex items-center">
            <button className="text-neutral-400 hover:text-white">
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
