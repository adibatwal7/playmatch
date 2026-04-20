import { cn } from "@/lib/utils";
import { HTMLAttributes, ReactNode } from "react";

interface SectionWrapperProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  className?: string;
  noPadding?: boolean;
}

export function SectionWrapper({ children, className, noPadding = false, ...props }: SectionWrapperProps) {
  return (
    <section 
      className={cn(
        "w-full max-w-7xl mx-auto",
        !noPadding && "px-4 sm:px-6 md:px-8 py-8 md:py-12",
        className
      )}
      {...props}
    >
      {children}
    </section>
  );
}
