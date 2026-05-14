/** Zaby shadow tokens — CSS variable references. */
export const shadows = {
  none: "var(--shadow-none)",
  sm: "var(--shadow-sm)",
  md: "var(--shadow-md)",
  lg: "var(--shadow-lg)",
  glowPrimary: "var(--shadow-glow-primary)",
  glowAccent: "var(--shadow-glow-accent)",
} as const;

export type ShadowToken = keyof typeof shadows;
