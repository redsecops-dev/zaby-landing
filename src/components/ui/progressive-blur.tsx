"use client";

import React from "react";
import { cn } from "@/lib/utils";

export interface ProgressiveBlurProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  position?: "top" | "bottom" | "left" | "right";
  height?: string | number;
  width?: string | number;
}

export function ProgressiveBlur({
  className,
  position = "bottom",
  height = "40%",
  width = "100%",
  ...props
}: ProgressiveBlurProps) {
  const isVertical = position === "top" || position === "bottom";
  const isHorizontal = position === "left" || position === "right";

  const getPositionClass = () => {
    switch (position) {
      case "top":
        return "top-0 left-0 right-0";
      case "bottom":
        return "bottom-0 left-0 right-0";
      case "left":
        return "top-0 bottom-0 left-0";
      case "right":
        return "top-0 bottom-0 right-0";
    }
  };

  const gradientDirection = {
    top: "to bottom",
    bottom: "to top",
    left: "to right",
    right: "to left",
  }[position];

  // Multi-step gradient for a more "progressive" and natural blur transition
  const maskImage = `linear-gradient(${gradientDirection}, 
    rgba(0, 0, 0, 1) 0%, 
    rgba(0, 0, 0, 0.9) 12.5%, 
    rgba(0, 0, 0, 0.75) 25%, 
    rgba(0, 0, 0, 0.5) 37.5%, 
    rgba(0, 0, 0, 0.3) 50%, 
    rgba(0, 0, 0, 0.15) 62.5%, 
    rgba(0, 0, 0, 0.05) 75%, 
    transparent 0%)`;

  return (
    <div
      className={cn(
        "pointer-events-none absolute z-50",
        getPositionClass(),
        className
      )}
      style={{
        height: isVertical ? height : "100%",
        width: isHorizontal ? width : "100%",
        backdropFilter: "blur(70px) saturate(180%)",
        WebkitBackdropFilter: "blur(70px) saturate(180%)",
        backgroundColor: "rgba(255, 255, 255, 0.01)", // Ultra-subtle glass tint
        maskImage,
        WebkitMaskImage: maskImage,
      }}
      {...props}
    />
  );
}
