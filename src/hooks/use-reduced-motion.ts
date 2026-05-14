"use client";

import { useReducedMotion as useFramerReducedMotion } from "framer-motion";

/**
 * Returns `true` if the user has requested reduced motion
 * (via OS accessibility setting or `prefers-reduced-motion` media query).
 * All animation components should gate their transitions behind this hook.
 */
export function useReducedMotion(): boolean {
  return useFramerReducedMotion() ?? false;
}
