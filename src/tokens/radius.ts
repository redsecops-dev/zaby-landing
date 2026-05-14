/** Zaby border radius tokens. */
export const radius = {
  none: "var(--radius-none)",
  sm: "var(--radius-sm)",   /* 8px */
  md: "var(--radius-md)",   /* 16px */
  lg: "var(--radius-lg)",   /* 24px */
  xl: "var(--radius-xl)",   /* 40px */
  full: "var(--radius-full)", /* 9999px */
} as const;

export type RadiusToken = keyof typeof radius;
