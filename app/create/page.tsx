"use client";

import { Navbar } from "@/components/ui/Navbar";
import { AnimatedButton } from "@/components/ui/AnimatedButton";
import { motion } from "framer-motion";
import { UploadCloud, Calendar, MapPin, Users, DollarSign, Image as ImageIcon } from "lucide-react";
import React, { useState } from "react";
import { createEvent } from "./actions";
import { SectionWrapper } from "@/components/ui/SectionWrapper";

export default function CreateEventPage() {
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    const formData = new FormData(e.currentTarget);
    const result = await createEvent(formData);

    if (result?.error) {
      setError(result.error);
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen pb-24">
      <Navbar />
      
      <SectionWrapper className="pt-32 md:pt-32 max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl lg:text-5xl font-black mb-3 text-white">Host an Event</h1>
          <p className="text-neutral-400 text-lg">Create a game and let our AI match you with the right players.</p>
        </motion.div>

        <motion.form 
          onSubmit={handleSubmit}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="space-y-8 glass p-6 md:p-10 rounded-3xl border border-zinc-800 shadow-2xl bg-black/60 relative"
        >
          {error && (
            <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm font-medium">
              {error}
            </div>
          )}

          {/* Image Upload */}
          <div 
            onClick={() => fileInputRef.current?.click()}
            className="w-full h-64 rounded-2xl border-2 border-dashed border-zinc-700 bg-white/5 flex flex-col items-center justify-center cursor-pointer hover:border-(--color-primary)/50 bg-zinc-900/50 transition-colors group relative overflow-hidden"
          >
            <input 
              type="file"
              name="image"
              accept="image/*"
              className="hidden"
              ref={fileInputRef}
              onChange={handleImageChange}
            />
            
            {previewUrl ? (
              <img 
                src={previewUrl} 
                alt="Preview" 
                className="absolute inset-0 w-full h-full object-cover"
              />
            ) : (
              <>
                <div className="w-12 h-12 rounded-full bg-zinc-800 flex items-center justify-center mb-3 group-hover:bg-(--color-primary)/20 group-hover:text-(--color-primary) transition-colors">
                  <UploadCloud className="w-6 h-6" />
                </div>
                <p className="font-bold text-white">Upload Banner Image</p>
                <p className="text-sm text-neutral-500 mt-1">PNG, JPG or WebP (max 5MB)</p>
              </>
            )}

            {previewUrl && (
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <p className="text-white font-bold flex items-center gap-2">
                  <ImageIcon className="w-5 h-5" />
                  Change Image
                </p>
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Title */}
            <div className="space-y-3 md:col-span-2">
              <label className="text-sm font-bold text-neutral-300 uppercase tracking-widest">Event Title</label>
              <input
                required
                name="title"
                type="text"
                placeholder="e.g. Saturday Evening 5v5"
                className="w-full bg-zinc-950/50 border border-zinc-800 rounded-xl px-5 py-4 text-white focus:outline-none focus:border-(--color-primary) focus:ring-1 focus:ring-(--color-primary) transition-colors"
              />
            </div>

            {/* Sport & Capacity */}
            <div className="space-y-3">
              <label className="text-sm font-bold text-neutral-300 uppercase tracking-widest">Sport</label>
              <select 
                name="sport"
                className="w-full bg-zinc-950/50 border border-zinc-800 rounded-xl px-5 py-4 text-white focus:outline-none focus:border-(--color-primary) transition-colors appearance-none"
              >
                <option value="Football">Football</option>
                <option value="Basketball">Basketball</option>
                <option value="Tennis">Tennis</option>
                <option value="Volleyball">Volleyball</option>
              </select>
            </div>

            <div className="space-y-3">
              <label className="text-sm font-bold text-neutral-300 uppercase tracking-widest">Capacity</label>
              <div className="relative">
                <Users className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-500" />
                <input
                  required
                  name="capacity"
                  type="number"
                  placeholder="e.g. 10"
                  defaultValue="10"
                  className="w-full bg-zinc-950/50 border border-zinc-800 rounded-xl pl-12 pr-5 py-4 text-white focus:outline-none focus:border-(--color-primary) transition-colors"
                />
              </div>
            </div>

            {/* Date & Time */}
            <div className="space-y-3">
              <label className="text-sm font-bold text-neutral-300 uppercase tracking-widest">Date</label>
              <div className="relative">
                <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-500" />
                <input
                  required
                  name="date"
                  type="date"
                  className="w-full bg-zinc-950/50 border border-zinc-800 rounded-xl pl-12 pr-5 py-4 text-white focus:outline-none focus:border-(--color-primary) transition-colors"
                />
              </div>
            </div>

            <div className="space-y-3">
              <label className="text-sm font-bold text-neutral-300 uppercase tracking-widest">Time</label>
              <input
                required
                name="time"
                type="time"
                className="w-full bg-zinc-950/50 border border-zinc-800 rounded-xl px-5 py-4 text-white focus:outline-none focus:border-(--color-primary) transition-colors"
              />
            </div>

            {/* Location */}
            <div className="space-y-3 md:col-span-2">
              <label className="text-sm font-bold text-neutral-300 uppercase tracking-widest">Location</label>
              <div className="relative">
                <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-500" />
                <input
                  required
                  name="location"
                  type="text"
                  placeholder="Search for a field, court, or address"
                  className="w-full bg-zinc-950/50 border border-zinc-800 rounded-xl pl-12 pr-5 py-4 text-white focus:outline-none focus:border-(--color-primary) transition-colors"
                />
              </div>
            </div>

            {/* Price */}
            <div className="space-y-3 md:col-span-2">
              <label className="text-sm font-bold text-neutral-300 uppercase tracking-widest">Ticket Price (Leave 0 for Free)</label>
              <div className="relative">
                <DollarSign className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-500" />
                <input
                  name="price"
                  type="number"
                  placeholder="0"
                  defaultValue="0"
                  className="w-full bg-zinc-950/50 border border-zinc-800 rounded-xl pl-12 pr-5 py-4 text-white focus:outline-none focus:border-(--color-primary) transition-colors"
                />
              </div>
            </div>
          </div>

          <div className="pt-8 mt-4 border-t border-zinc-800/80 flex justify-end">
            <AnimatedButton disabled={isLoading} size="lg" className="px-12 w-full sm:w-auto text-lg font-bold">
              {isLoading ? "Creating..." : "Create Event"}
            </AnimatedButton>
          </div>
        </motion.form>
      </SectionWrapper>
    </div>
  );
}
