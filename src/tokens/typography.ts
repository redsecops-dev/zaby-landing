/** Zaby typography tokens — Inter font system. */
export const typography = {
  fontFamily: {
    sans: "var(--font-sans)",
    mono: "var(--font-mono)",
  },
  size: {
    xs: "0.75rem",    /* 12px */
    sm: "0.875rem",   /* 14px */
    base: "1rem",     /* 16px */
    lg: "1.125rem",   /* 18px */
    xl: "1.25rem",    /* 20px */
    "2xl": "1.5rem",  /* 24px */
    "3xl": "1.875rem",/* 30px */
    "4xl": "2.25rem", /* 36px */
    display: "clamp(2.5rem, 5vw, 4.5rem)",
  },
  weight: {
    normal: "400",
    medium: "500",
    semibold: "600",
    bold: "700",
  },
  leading: {
    tight: "1",
    snug: "1.375",
    normal: "1.5",
    relaxed: "1.7",
  },
  tracking: {
    tight: "-0.025em",
    normal: "0",
    wide: "0.025em",
    widest: "0.1em",
  },
} as const;

export type TypographyToken = typeof typography;
