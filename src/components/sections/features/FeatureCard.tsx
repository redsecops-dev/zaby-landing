"use client";

import React from "react";
import { cn } from "@/lib/utils";

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
    <div
      onClick={onClick}
      className={cn(
        "h-full rounded-2xl p-px group cursor-pointer shadow-[0_1px_2px_0_rgb(0,0,0,0.05)] transition-all duration-300 hover:shadow-[0_10px_15px_-3px_rgb(0,0,0,0.1),0_4px_6px_-4px_rgb(0,0,0,0.1)]",
        className
      )}
    >
      <div
        className={cn(
          "bg-white rounded-2xl overflow-hidden relative flex flex-col h-full w-full",
          innerClassName
        )}
      >
        {children}
      </div>
    </div>
  );
}
