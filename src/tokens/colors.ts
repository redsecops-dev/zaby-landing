/** Zaby color tokens — CSS variable references only. Never use raw hex in components. */
export const colors = {
  bg: "var(--color-bg)",
  primary: "var(--color-primary)",
  accent: "var(--color-accent)",
  accentSoft: "var(--color-accent-soft)",
  accentHover: "var(--color-accent-hover)",
  muted: "var(--color-muted)",
  mutedForeground: "var(--color-muted-foreground)",
  textPrimary: "var(--color-text-primary)",
  textSecondary: "var(--color-text-secondary)",
  border: "var(--color-border)",
  borderStrong: "var(--color-border-strong)",
  surface: "var(--color-surface)",
  surfaceRaised: "var(--color-surface-raised)",
  glassBg: "var(--color-glass-bg)",
  glassBorder: "var(--color-glass-border)",
  gradients: {
    purpleFrom: "var(--color-gradient-purple-from)",
    purpleTo: "var(--color-gradient-purple-to)",
    pinkFrom: "var(--color-gradient-pink-from)",
    pinkTo: "var(--color-gradient-pink-to)",
    blueFrom: "var(--color-gradient-blue-from)",
    blueTo: "var(--color-gradient-blue-to)",
    orangeFrom: "var(--color-gradient-orange-from)",
    orangeTo: "var(--color-gradient-orange-to)",
  },
} as const;

export type ColorToken = typeof colors;
