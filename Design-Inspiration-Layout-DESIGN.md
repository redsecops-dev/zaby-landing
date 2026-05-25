---
version: "alpha"
name: "Design Inspiration Layout"
description: "Design Inspiration Feature Section is designed for highlighting product capabilities and value points. Key features include reusable structure, responsive behavior, and production-ready presentation. It is suitable for component libraries and responsive product interfaces."
colors:
  primary: "#e879f9"           # Magenta
  accent: "#e879f9"            # Magenta (same as primary)
  accent-soft: "#d946ef"        # Violet
  accent-hover: "#c026d3"
  muted: "#f5d0fe"              # Light magenta
  muted-foreground: "#525252"
  text-primary: "#171717"
  text-secondary: "#525252"
  border: "#ffffff"
  border-strong: "#e5e5e5"
  surface: "#d946ef"            # Violet
  surface-raised: "#f0abfc"     # Light violet
  button-primary-bg: "#2f1362"  # Deep purple
  button-primary-hover: "#3a1a75"
  button-secondary-bg: "rgba(255,255,255,0.7)"
  button-secondary-border: "#e9c8fb"
  button-secondary-text: "#3f3f46"
  glass-bg: "rgba(255,255,255,0.6)"
  glass-border: "rgba(255,255,255,0.7)"
  gradients:
    magenta-violet: ["#e879f9", "#d946ef"]
    pink: ["#f5d0fe", "#e879f9"]
    blue: ["#ede9fe", "#f5d0fe", "#ddd6fe"]
    orange: ["#e879f9", "#d946ef"]
typography:
  font-sans: "Inter, system-ui, sans-serif"
  font-display: "Manrope, Inter, sans-serif"
  display:
    fontSize: "96px"
    fontWeight: 600
    lineHeight: "96px"
    letterSpacing: "-0.025em"
  body:
    fontSize: "16px"
    fontWeight: 400
    lineHeight: "24px"
  label:
    fontSize: "16px"
    fontWeight: 600
    lineHeight: "24px"
rounded:
  none: "0"
  sm: "8px"
  md: "8px"
  lg: "8px"
  xl: "8px"
  full: "9999px"
spacing:
  xs: "1px"
  sm: "4px"
  md: "8px"
  lg: "12px"
  xl: "16px"
  2xl: "24px"
  3xl: "32px"
  4xl: "48px"
  5xl: "56px"
  6xl: "96px"
  section-padding-sm: "24px"
  section-padding-md: "56px"
  section-padding-lg: "96px"
shadows:
  none: "none"
  sm: "rgba(0,0,0,0.5) 0px 25px 50px -12px"
  glow-accent: "rgba(232,121,249,0.5) 0px 0px 40px -10px"
  glow-primary: "rgba(232,121,249,0.2) 0px 0px 10px 0px"
glass:
  blur-panel: "12px"
  blur-lg: "24px"
components:
  button-primary:
    backgroundColor: "{colors.button-primary-bg}"
    textColor: "#fff"
    rounded: "{rounded.full}"
    padding: "12px 24px"
    border: "none"
    font: "{typography.label}"
    hoverBg: "{colors.button-primary-hover}"
  button-secondary:
    backgroundColor: "{colors.button-secondary-bg}"
    textColor: "{colors.button-secondary-text}"
    border: "1.2px solid {colors.button-secondary-border}"
    rounded: "{rounded.full}"
    padding: "12px 24px"
    font: "{typography.label}"
  card:
    backgroundColor: "#fff"
    border: "1.2px solid {colors.border}"
    rounded: "16px"
    padding: "24px"
    shadow: "none"
  glass-panel:
    background: "{colors.glass-bg}"
    border: "1.2px solid {colors.glass-border}"
    rounded: "8px"
    blur: "12px"
  gradient-border-shell:
    padding: "1.5px"
    border-radius: "8px"
    background: "linear-gradient(to right top, rgb(226,216,240), rgb(250,221,240))"
---

## Overview

- **Composition cues:**
  - Layout: Grid
  - Content Width: Bounded
  - Framing: Glassy
  - Grid: Strong


## Colors & Gradients

The color system uses a magenta/violet palette for primary and accent, with white and light magenta for backgrounds and surfaces. Gradients are mapped to magenta/violet, pink, blue, and orange variants.

## Typography

Typography is Inter for body and Manrope for display. Display headings are large and bold (96px/600), labels are 16px/600, and body is 16px/400. Utility classes provide gradient text and responsive headings.

## Layout & Spacing

Layout is grid-based, with a 4px rhythm and spacing tokens: 1px, 4px, 8px, 12px, 16px, 24px, 32px, 48px, 56px, 96px. Section paddings are 24px, 56px, 96px. Cards and panels use 24px padding.

## Elevation & Glass

Surfaces use glass effects (blur, semi-transparent backgrounds, subtle borders). Shadows are minimal, with accent glows for emphasis. Gradient border shells are used for premium cards.

## Shapes

Corner radii are 8px for all controls and cards, 9999px for pills. Iconography is linear and compatible with the soft radius system.

## Components

- **Button Primary:** Deep purple background, white text, pill radius, 12px 24px padding, no border. Hover uses a darker purple.
- **Button Secondary:** Glass/white background, magenta border, pill radius, 12px 24px padding.
- **Card:** White background, 1.2px border, 16px radius, 24px padding, no shadow.
- **Glass Panel:** Glass background, 1.2px border, 8px radius, 12px blur.
- **Gradient Border Shell:** 1.5px padding, 8px radius, magenta/violet gradient.

## Motion

Motion is expressive but focused on interface and layout transitions. Durations: 100ms, 150ms, 300ms, 1000ms, 2000ms. Easings: linear, ease, ease-in-out, cubic-bezier(0.4,0,0.2,1), cubic-bezier(0.4,0,1,1).

## Utility Classes

- `.glass-panel` for glass surfaces
- `.gradient-border-shell` for premium card outlines
- `.gradient-text`, `.gradient-text-primary` for accent text
- `.display-heading` for hero/section headings

## Do's and Don'ts

Do:
- Use the magenta/violet palette for accents and actions
- Keep spacing on the 4px rhythm
- Use glass and gradient treatments consistently
- Keep radii within the 8px/9999px family

Don't:
- Introduce new accent colors outside the palette
- Mix unrelated shadow/blur recipes
- Exceed expressive motion intensity without reason

## Do's and Don'ts

Use these constraints to keep future generations aligned with the current system instead of drifting into adjacent styles.

### Do
- Do use the primary palette as the main accent for emphasis and action states.
- Do keep spacing aligned to the detected 4px rhythm.
- Do reuse the Glass surface treatment consistently across cards and controls.
- Do keep corner radii within the detected 8px, 16px, 40px, 9999px family.

### Don't
- Don't introduce extra accent colors outside the core palette roles unless the page needs a new semantic state.
- Don't mix unrelated shadow or blur recipes that break the current depth system.
- Don't exceed the detected expressive motion intensity without a deliberate reason.

## Motion

Motion feels expressive but remains focused on interface, text, and layout transitions. Timing clusters around 300ms and 150ms. Easing favors ease and cubic-bezier(0.4. Hover behavior focuses on color and shadow changes.

**Motion Level:** expressive

**Durations:** 300ms, 150ms, 500ms, 12000ms, 24000ms, 6000ms

**Easings:** ease, cubic-bezier(0.4, 0, 0.2, 1), ease-in-out

**Hover Patterns:** color, shadow






