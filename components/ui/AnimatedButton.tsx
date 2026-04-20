"use client";

import { HTMLAttributes, forwardRef } from "react";
import { motion, HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";

interface AnimatedButtonProps extends HTMLMotionProps<"button"> {
  variant?: "primary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
}

export const AnimatedButton = forwardRef<HTMLButtonElement, AnimatedButtonProps>(
  ({ className, variant = "primary", size = "md", children, ...props }, ref) => {
    return (
      <motion.button
        ref={ref}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className={cn(
          "inline-flex items-center justify-center rounded-2xl font-medium transition-colors focus:outline-none",
          {
            "bg-(--color-primary) text-black shadow-[0_0_15px_rgba(163,255,18,0.4)] hover:bg-(--color-primary-dark) hover:shadow-[0_0_25px_rgba(163,255,18,0.6)]":
              variant === "primary",
            "border border-(--color-primary) text-(--color-primary) hover:bg-(--color-primary)/10":
              variant === "outline",
            "text-foreground hover:bg-white/10": variant === "ghost",
            "px-3 py-1.5 text-sm": size === "sm",
            "px-6 py-3 text-base": size === "md",
            "px-8 py-4 text-lg": size === "lg",
          },
          className
        )}
        {...props}
      >
        {children}
      </motion.button>
    );
  }
);
AnimatedButton.displayName = "AnimatedButton";
