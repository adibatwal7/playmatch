import { cn } from "@/lib/utils";

export function EventCardSkeleton({ className }: { className?: string }) {
  return (
    <div 
      className={cn(
        "glass overflow-hidden rounded-2xl flex flex-col border border-zinc-800 animate-pulse",
        className
      )}
    >
      {/* Banner Skeleton */}
      <div className="h-40 w-full bg-zinc-800/50" />
      
      {/* Content Skeleton */}
      <div className="p-6 flex flex-col gap-4">
        {/* Sport and Title */}
        <div>
          <div className="h-3 w-16 bg-zinc-800 rounded-full mb-3" />
          <div className="h-5 w-3/4 bg-zinc-800 rounded-full mb-2" />
          <div className="h-5 w-1/2 bg-zinc-800 rounded-full" />
        </div>
        
        {/* Info rows */}
        <div className="flex gap-4 mt-2">
          <div className="h-4 w-24 bg-zinc-800 rounded-full" />
          <div className="h-4 w-20 bg-zinc-800 rounded-full" />
        </div>

        {/* Footer info */}
        <div className="mt-4 flex items-center gap-2">
          <div className="flex -space-x-2">
             <div className="h-6 w-6 rounded-full bg-zinc-800 border border-zinc-900" />
             <div className="h-6 w-6 rounded-full bg-zinc-800 border border-zinc-900" />
             <div className="h-6 w-6 rounded-full bg-zinc-800 border border-zinc-900" />
          </div>
          <div className="h-3 w-16 bg-zinc-800 rounded-full ml-2" />
        </div>
      </div>
    </div>
  );
}
