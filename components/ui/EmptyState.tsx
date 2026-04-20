import { SearchX } from "lucide-react";
import { cn } from "@/lib/utils";
import { AnimatedButton } from "./AnimatedButton";

interface EmptyStateProps {
  title?: string;
  description?: string;
  actionText?: string;
  onAction?: () => void;
  className?: string;
}

export function EmptyState({ 
  title = "No games found", 
  description = "We couldn't find any events matching your search criteria. Try adjusting your filters or expanding your search area.",
  actionText = "Clear Filters",
  onAction,
  className
}: EmptyStateProps) {
  return (
    <div className={cn("flex flex-col items-center justify-center text-center p-12 glass rounded-3xl border border-zinc-800", className)}>
      <div className="w-16 h-16 rounded-2xl bg-zinc-800/50 flex items-center justify-center mb-5 border border-zinc-700/50">
        <SearchX className="w-8 h-8 text-neutral-500" />
      </div>
      <h3 className="text-xl font-bold mb-2 text-white">{title}</h3>
      <p className="text-sm text-neutral-400 max-w-md mb-6 leading-relaxed">
        {description}
      </p>
      {onAction && (
        <AnimatedButton variant="outline" onClick={onAction}>
          {actionText}
        </AnimatedButton>
      )}
    </div>
  );
}
