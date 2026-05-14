"use client";

import { motion, type Variants } from "framer-motion";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { cn } from "@/lib/utils";

export interface StaggerProps {
  children: React.ReactNode;
  delay?: number;
  staggerDelay?: number;
  className?: string;
  once?: boolean;
}

export function Stagger({
  children,
  delay = 0,
  staggerDelay = 0.1,
  className,
  once = true,
}: StaggerProps) {
  const reduced = useReducedMotion();

  const containerVariants: Variants = reduced
    ? ({ hidden: {}, visible: {} } as Variants)
    : {
        hidden: {},
        visible: {
          transition: {
            staggerChildren: staggerDelay,
            delayChildren: delay,
          },
        },
      };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once }}
      className={cn(className)}
    >
      {children}
    </motion.div>
  );
}
