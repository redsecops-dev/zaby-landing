/** Zaby spacing tokens — named scale anchored to 4px base unit. */
export const spacing = {
  xs: "var(--spacing-xs)",   /* 4px */
  sm: "var(--spacing-sm)",   /* 8px */
  md: "var(--spacing-md)",   /* 16px */
  lg: "var(--spacing-lg)",   /* 24px */
  xl: "var(--spacing-xl)",   /* 48px */
  "2xl": "var(--spacing-2xl)", /* 64px */
  "3xl": "var(--spacing-3xl)", /* 96px */
} as const;

export type SpacingToken = keyof typeof spacing;
