"use client";

import { useScroll, useTransform, type MotionValue } from "framer-motion";
import { useRef } from "react";

interface ScrollProgressResult {
  ref: React.RefObject<HTMLElement | null>;
  scrollYProgress: MotionValue<number>;
  opacity: MotionValue<number>;
  y: MotionValue<string>;
}

/**
 * Returns scroll progress (0→1) relative to the target element,
 * plus pre-computed opacity and y transform values for parallax.
 */
export function useScrollProgress(): ScrollProgressResult {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "-10%"]);

  return { ref, scrollYProgress, opacity, y };
}
