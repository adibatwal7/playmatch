"use client"

import { Navbar } from "@/components/ui/Navbar";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { AnimatedButton } from "@/components/ui/AnimatedButton";
import { motion } from "framer-motion";
import { User, Mail, Tag, AlignLeft, Save, ArrowLeft } from "lucide-react";
import { useState, useEffect } from "react";
import { updateProfile } from "../actions";
import { createClient } from "@/lib/supabase/client";
import Link from "next/link";

export default function EditProfilePage() {
  const [profile, setProfile] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const supabase = createClient();

  useEffect(() => {
    async function loadProfile() {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const { data } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', user.id)
          .single();
        setProfile(data);
      }
      setIsLoading(false);
    }
    loadProfile();
  }, []);

  const handleAction = async (formData: FormData) => {
    setIsSaving(true);
    setError(null);
    const result = await updateProfile(formData);
    if (result?.error) {
      setError(result.error);
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-(--color-primary) border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen pb-24 bg-black text-white">
      <Navbar />
      
      <SectionWrapper className="pt-32 md:pt-32 max-w-3xl">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <Link href="/profile" className="flex items-center gap-2 text-neutral-500 hover:text-white transition-colors mb-4 group">
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              Back to Profile
            </Link>
            <h1 className="text-4xl lg:text-5xl font-black text-white">Edit Profile</h1>
            <p className="text-neutral-400 mt-2">Update your information and interests to find better matches.</p>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass p-8 md:p-12 rounded-[2.5rem] border border-zinc-800 bg-black/60 relative overflow-hidden"
        >
          <form action={handleAction} className="space-y-8 relative z-10">
            {error && (
              <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
                {error}
              </div>
            )}

            <div className="space-y-6">
              {/* Name */}
              <div className="space-y-3">
                <label className="text-sm font-bold text-neutral-400 uppercase tracking-widest flex items-center gap-2">
                  <User className="w-4 h-4 text-(--color-primary)" />
                  Full Name
                </label>
                <input
                  name="name"
                  type="text"
                  defaultValue={profile?.name || profile?.full_name || ""}
                  placeholder="e.g. Alex Rivera"
                  className="w-full bg-zinc-950/50 border border-zinc-800 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-(--color-primary) focus:ring-1 focus:ring-(--color-primary) transition-all"
                  required
                />
              </div>

              {/* Bio */}
              <div className="space-y-3">
                <label className="text-sm font-bold text-neutral-400 uppercase tracking-widest flex items-center gap-2">
                  <AlignLeft className="w-4 h-4 text-(--color-primary)" />
                  Bio
                </label>
                <textarea
                  name="bio"
                  rows={4}
                  defaultValue={profile?.bio || ""}
                  placeholder="Tell others about your play style, experience, or what you're looking for..."
                  className="w-full bg-zinc-950/50 border border-zinc-800 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-(--color-primary) focus:ring-1 focus:ring-(--color-primary) transition-all resize-none"
                />
              </div>

              {/* Interests */}
              <div className="space-y-3">
                <label className="text-sm font-bold text-neutral-400 uppercase tracking-widest flex items-center gap-2">
                  <Tag className="w-4 h-4 text-(--color-primary)" />
                  Sports Interests
                </label>
                <input
                  name="interests"
                  type="text"
                  defaultValue={profile?.interests?.join(', ') || ""}
                  placeholder="Football, Basketball, Tennis (comma separated)"
                  className="w-full bg-zinc-950/50 border border-zinc-800 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-(--color-primary) focus:ring-1 focus:ring-(--color-primary) transition-all"
                />
                <p className="text-xs text-neutral-500">Separating sports with commas helps our matching algorithm find your teammates.</p>
              </div>
            </div>

            <div className="pt-6 border-t border-zinc-800/50 flex justify-end">
              <AnimatedButton 
                type="submit" 
                disabled={isSaving}
                className="px-10 h-14 text-lg font-bold shadow-[0_0_20px_rgba(163,255,18,0.2)]"
              >
                {isSaving ? "Saving..." : "Save Changes"}
                {!isSaving && <Save className="ml-2 w-5 h-5" />}
              </AnimatedButton>
            </div>
          </form>

          {/* Background Glow */}
          <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-(--color-primary) rounded-full blur-[120px] opacity-10 pointer-events-none" />
        </motion.div>
      </SectionWrapper>
    </div>
  );
}
