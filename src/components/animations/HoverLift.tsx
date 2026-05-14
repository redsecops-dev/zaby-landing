"use client";

import { motion } from "framer-motion";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { cn } from "@/lib/utils";

export interface HoverLiftProps {
  children: React.ReactNode;
  className?: string;
  scale?: number;
  y?: number;
}

export function HoverLift({
  children,
  className,
  scale = 1.02,
  y = -4,
}: HoverLiftProps) {
  const reduced = useReducedMotion();

  if (reduced) {
    return <div className={cn(className)}>{children}</div>;
  }

  return (
    <motion.div
      className={cn(className)}
      whileHover={{ scale, y }}
      transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
    >
      {children}
    </motion.div>
  );
}
