import { cn } from "@/lib/utils";
import { Sparkles, Flame, Clock } from "lucide-react";

interface RecommendationBadgeProps {
  type: "ai-match" | "trending" | "filling-fast";
  matchPercentage?: number;
  className?: string;
}

export function RecommendationBadge({
  type,
  matchPercentage,
  className,
}: RecommendationBadgeProps) {
  return (
    <div
      className={cn(
        "inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold tracking-wide shadow-sm",
        {
          "bg-(--color-primary)/20 text-(--color-primary) border border-(--color-primary)/50":
            type === "ai-match",
          "bg-orange-500/20 text-orange-400 border border-orange-500/50": type === "trending",
          "bg-red-500/20 text-red-400 border border-red-500/50": type === "filling-fast",
        },
        className
      )}
    >
      {type === "ai-match" && (
        <>
          <Sparkles className="w-3.5 h-3.5" />
          AI Match {matchPercentage}%
        </>
      )}
      {type === "trending" && (
        <>
          <Flame className="w-3.5 h-3.5" />
          Trending
        </>
      )}
      {type === "filling-fast" && (
        <>
          <Clock className="w-3.5 h-3.5" />
          Almost Full
        </>
      )}
    </div>
  );
}
