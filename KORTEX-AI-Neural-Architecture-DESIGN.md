---
version: "alpha"
name: "KORTEX | AI Neural Architecture"
description: "Next-generation AI neural architecture for predictive algorithms and autonomous defense."
colors:
  primary: "#EF233C"
  secondary: "#F87171"
  tertiary: "#FEE2E2"
  neutral: "#000000"
  background: "#EF233C"
  surface: "#000000"
  text-primary: "#F1F5F9"
  text-secondary: "#FFFFFF"
  border: "#FFFFFF"
  accent: "#EF233C"
typography:
  display-lg:
    fontFamily: "Manrope"
    fontSize: "96px"
    fontWeight: 600
    lineHeight: "96px"
    letterSpacing: "-0.025em"
  body-md:
    fontFamily: "SFMono-Regular"
    fontSize: "10px"
    fontWeight: 400
    lineHeight: "15px"
    letterSpacing: "0.1em"
    textTransform: "uppercase"
  label-md:
    fontFamily: "Inter"
    fontSize: "16px"
    fontWeight: 600
    lineHeight: "24px"
    letterSpacing: "0.4px"
rounded:
  md: "0px"
  full: "9999px"
spacing:
  base: "4px"
  sm: "1px"
  md: "4px"
  lg: "8px"
  xl: "12px"
  gap: "8px"
  section-padding: "24px"
components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.text-secondary}"
    typography: "{typography.label-md}"
    rounded: "{rounded.full}"
    padding: "16px"
  button-link:
    textColor: "#A1A1AA"
    rounded: "{rounded.md}"
    padding: "0px"
---

## Overview

- **Composition cues:**
  - Layout: Grid
  - Content Width: Full Bleed
  - Framing: Glassy
  - Grid: Strong

## Colors

The color system uses dark mode with #EF233C as the main accent and #000000 as the neutral foundation.

- **Primary (#EF233C):** Main accent and emphasis color.
- **Secondary (#F87171):** Supporting accent for secondary emphasis.
- **Tertiary (#FEE2E2):** Reserved accent for supporting contrast moments.
- **Neutral (#000000):** Neutral foundation for backgrounds, surfaces, and supporting chrome.

- **Usage:** Background: #EF233C; Surface: #000000; Text Primary: #F1F5F9; Text Secondary: #FFFFFF; Border: #FFFFFF; Accent: #EF233C

- **Gradients:** bg-gradient-to-br from-[#ef233c] to-black, bg-gradient-to-r from-[#ef233c] to-[#ef233c] via-[#ff4d6d], bg-gradient-to-br from-white to-transparent via-[#dc8474]

## Typography

Typography pairs Manrope for display hierarchy with SFMono-Regular for supporting content and interface copy.

- **Display (`display-lg`):** Manrope, 96px, weight 600, line-height 96px, letter-spacing -0.025em.
- **Body (`body-md`):** SFMono-Regular, 10px, weight 400, line-height 15px, letter-spacing 0.1em, uppercase.
- **Labels (`label-md`):** Inter, 16px, weight 600, line-height 24px, letter-spacing 0.4px.

## Layout

Layout follows a grid composition with reusable spacing tokens. Preserve the grid, full bleed structural frame before changing ornament or component styling. Use 4px as the base rhythm and let larger gaps step up from that cadence instead of introducing unrelated spacing values.

Treat the page as a grid / full bleed composition, and keep that framing stable when adding or remixing sections.

- **Layout type:** Grid
- **Content width:** Full Bleed
- **Base unit:** 4px
- **Scale:** 1px, 4px, 8px, 12px, 16px, 24px, 32px, 48px
- **Section padding:** 24px, 56px, 96px
- **Gaps:** 8px, 12px, 16px, 32px

## Elevation & Depth

Depth is communicated through glass, border contrast, and reusable shadow or blur treatments. Keep those recipes consistent across hero panels, cards, and controls so the page reads as one material system.

Surfaces should read as glass first, with borders, shadows, and blur only reinforcing that material choice.

- **Surface style:** Glass
- **Borders:** 1px #FFFFFF; 1px #000000; 1px #27272A; 1px #E4E4E7
- **Shadows:** rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgb(239, 35, 60) 0px 0px 10px 0px; rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0.5) 0px 25px 50px -12px; rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(239, 35, 60, 0.5) 0px 0px 40px -10px
- **Blur:** 12px, 24px

### Techniques
- **Gradient border shell:** Use a thin gradient border shell around the main card. Wrap the surface in an outer shell with 0px padding and a 0px radius. Drive the shell with radial-gradient(at 50% 100%, rgb(26, 5, 5) 0%, rgb(0, 0, 0) 100%) so the edge reads like premium depth instead of a flat stroke. Keep the actual stroke understated so the gradient shell remains the hero edge treatment. Inset the real content surface inside the wrapper with a slightly smaller radius so the gradient only appears as a hairline frame.

## Shapes

Shapes rely on a tight radius system anchored by 8px and scaled across cards, buttons, and supporting surfaces. Icon geometry should stay compatible with that soft-to-controlled silhouette.

Use the radius family intentionally: larger surfaces can open up, but controls and badges should stay within the same rounded DNA instead of inventing sharper or pill-only exceptions.

- **Corner radii:** 8px, 9999px
- **Icon treatment:** Linear
- **Icon sets:** Solar

## Components

Anchor interactions to the detected button styles.

### Buttons
- **Primary:** background #EF233C, text #FFFFFF, radius 9999px, padding 16px, border 0px solid rgb(229, 231, 235).
- **Links:** text #A1A1AA, radius 0px, padding 0px, border 0px solid rgb(229, 231, 235).

### Iconography
- **Treatment:** Linear.
- **Sets:** Solar.

## Do's and Don'ts

Use these constraints to keep future generations aligned with the current system instead of drifting into adjacent styles.

### Do
- Do use the primary palette as the main accent for emphasis and action states.
- Do keep spacing aligned to the detected 4px rhythm.
- Do reuse the Glass surface treatment consistently across cards and controls.
- Do keep corner radii within the detected 8px, 9999px family.

### Don't
- Don't introduce extra accent colors outside the core palette roles unless the page needs a new semantic state.
- Don't mix unrelated shadow or blur recipes that break the current depth system.
- Don't exceed the detected expressive motion intensity without a deliberate reason.

## Motion

Motion feels expressive but remains focused on interface, text, and layout transitions. Timing clusters around 300ms and 150ms. Easing favors ease and 0. Hover behavior focuses on text and color changes. Scroll choreography uses GSAP ScrollTrigger for section reveals and pacing.

**Motion Level:** expressive

**Durations:** 300ms, 150ms, 100ms, 1000ms, 2000ms

**Easings:** ease, 0, 1), 0.2, cubic-bezier(0.4, cubic-bezier(0

**Hover Patterns:** text, color, shadow

**Scroll Patterns:** gsap-scrolltrigger
