"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Navbar } from "@/components/ui/Navbar";
import { AnimatedButton } from "@/components/ui/AnimatedButton";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { Mail, Lock, User, Activity } from "lucide-react";
import { login, signup } from "./actions";

export default function LoginPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    const formData = new FormData(e.currentTarget);
    
    // Call the server action directly
    const result = isLogin 
      ? await login(formData)
      : await signup(formData);

    if (result?.error) {
      setError(result.error);
      setIsLoading(false);
    }
    // Note: successful login/signup will redirect automatically via the server action
  };

  return (
    <div className="min-h-screen pb-24 bg-black flex flex-col">
      <Navbar />
      
      <SectionWrapper className="pt-32 flex-1 flex flex-col items-center justify-center max-w-md">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full glass p-8 md:p-10 rounded-3xl border border-zinc-800 shadow-2xl relative overflow-hidden"
        >
          {/* Subtle glow background */}
          <div className="absolute -top-24 -right-24 w-48 h-48 bg-(--color-primary) rounded-full blur-[100px] opacity-10 pointer-events-none" />

          <div className="text-center mb-8">
            <div className="w-16 h-16 rounded-2xl bg-zinc-900 mx-auto flex items-center justify-center text-(--color-primary) border border-zinc-800 mb-6 shadow-inner">
              <Activity className="w-8 h-8" />
            </div>
            <h1 className="text-3xl font-black text-white mb-2">
              {isLogin ? "Welcome Back" : "Create Account"}
            </h1>
            <p className="text-neutral-400">
              {isLogin ? "Sign in to join games and host events." : "Join thousands of athletes near you."}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5 relative z-10">
            {!isLogin && (
              <div className="space-y-2">
                <label className="text-xs font-bold text-neutral-400 uppercase tracking-widest pl-1">Name</label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-500" />
                  <input
                    name="name"
                    type="text"
                    required={!isLogin}
                    placeholder="Aditya Batwal"
                    className="w-full bg-zinc-950/50 border border-zinc-800 rounded-xl pl-12 pr-5 py-4 text-white focus:outline-none focus:border-(--color-primary) transition-colors"
                  />
                </div>
              </div>
            )}

            <div className="space-y-2">
              <label className="text-xs font-bold text-neutral-400 uppercase tracking-widest pl-1">Email</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-500" />
                <input
                  name="email"
                  type="email"
                  required
                  placeholder="name@example.com"
                  className="w-full bg-zinc-950/50 border border-zinc-800 rounded-xl pl-12 pr-5 py-4 text-white focus:outline-none focus:border-(--color-primary) transition-colors"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-neutral-400 uppercase tracking-widest pl-1">Password</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-500" />
                <input
                  name="password"
                  type="password"
                  required
                  placeholder="••••••••"
                  className="w-full bg-zinc-950/50 border border-zinc-800 rounded-xl pl-12 pr-5 py-4 text-white focus:outline-none focus:border-(--color-primary) transition-colors"
                />
              </div>
            </div>

            {error && (
              <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm font-medium text-center">
                {error}
              </div>
            )}

            <div className="pt-4">
              <AnimatedButton size="lg" className="w-full font-bold text-lg" disabled={isLoading}>
                {isLoading ? "Processing..." : (isLogin ? "Sign In" : "Sign Up")}
              </AnimatedButton>
            </div>
          </form>

          <div className="mt-8 text-center">
            <button 
              onClick={() => {
                setIsLogin(!isLogin);
                setError(null);
              }}
              className="text-neutral-400 hover:text-white text-sm font-medium transition-colors"
            >
              {isLogin ? "Don't have an account? Sign up" : "Already have an account? Sign in"}
            </button>
          </div>
        </motion.div>
      </SectionWrapper>
    </div>
  );
}
