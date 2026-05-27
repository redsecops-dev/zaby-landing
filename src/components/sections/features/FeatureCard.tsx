"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { GlassPanel } from "@/components/shared/GlassPanel";

interface FeatureCardProps {
  onClick: () => void;
  className?: string;
  innerClassName?: string;
  children: React.ReactNode;
}

export function FeatureCard({
  onClick,
  className,
  innerClassName,
  children,
}: FeatureCardProps) {
  return (
    <GlassPanel
      padding="none"
      onClick={onClick}
      className={cn(
        "h-full group cursor-pointer transition-all duration-300 hover:shadow-[0_10px_15px_-3px_rgb(0,0,0,0.1),0_4px_6px_-4px_rgb(0,0,0,0.1)]",
        className
      )}
    >
      <div
        className={cn(
          "relative flex flex-col h-full w-full",
          innerClassName
        )}
      >
        {children}
      </div>
    </GlassPanel>
  );
}
