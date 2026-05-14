---
version: "alpha"
name: "Iria — Sentient Voice Infrastructure"
description: "Iria Sentient Pricing Section is designed for comparing plans and supporting conversion decisions. Key features include plan comparison blocks and conversion-oriented actions. It is suitable for subscription pricing pages and plan comparison experiences."
colors:
  primary: "#E879F9"
  secondary: "#D946EF"
  tertiary: "#8B5CF6"
  neutral: "#171717"
  background: "#E879F9"
  surface: "#D946EF"
  text-primary: "#171717"
  text-secondary: "#525252"
  border: "#FFFFFF"
  accent: "#E879F9"
typography:
  display-lg:
    fontFamily: "Inter"
    fontSize: "88px"
    fontWeight: 300
    lineHeight: "88px"
    letterSpacing: "-0.05em"
  body-md:
    fontFamily: "Inter"
    fontSize: "18px"
    fontWeight: 400
    lineHeight: "28px"
  label-md:
    fontFamily: "Inter"
    fontSize: "14px"
    fontWeight: 400
    lineHeight: "20px"
rounded:
  md: "0px"
  full: "9999px"
spacing:
  base: "6px"
  sm: "1px"
  md: "6px"
  lg: "14px"
  xl: "16px"
  gap: "2px"
  card-padding: "16px"
  section-padding: "28px"
components:
  button-primary:
    textColor: "{colors.border}"
    typography: "{typography.label-md}"
    rounded: "{rounded.full}"
    padding: "14px"
  button-link:
    textColor: "{colors.text-secondary}"
    typography: "{typography.label-md}"
    rounded: "{rounded.md}"
    padding: "0px"
  card:
    rounded: "16px"
    padding: "16px"
---

## Overview

- **Composition cues:**
  - Layout: Grid
  - Content Width: Bounded
  - Framing: Glassy
  - Grid: Strong

## Colors

The color system uses light mode with #E879F9 as the main accent and #171717 as the neutral foundation.

- **Primary (#E879F9):** Main accent and emphasis color.
- **Secondary (#D946EF):** Supporting accent for secondary emphasis.
- **Tertiary (#8B5CF6):** Reserved accent for supporting contrast moments.
- **Neutral (#171717):** Neutral foundation for backgrounds, surfaces, and supporting chrome.

- **Usage:** Background: #E879F9; Surface: #D946EF; Text Primary: #171717; Text Secondary: #525252; Border: #FFFFFF; Accent: #E879F9

## Typography

Typography relies on Inter across display, body, and utility text.

- **Display (`display-lg`):** Inter, 88px, weight 300, line-height 88px, letter-spacing -0.05em.
- **Body (`body-md`):** Inter, 18px, weight 400, line-height 28px.
- **Labels (`label-md`):** Inter, 14px, weight 400, line-height 20px.

## Layout

Layout follows a grid composition with reusable spacing tokens. Preserve the grid, bounded structural frame before changing ornament or component styling. Use 6px as the base rhythm and let larger gaps step up from that cadence instead of introducing unrelated spacing values.

Treat the page as a grid / bounded composition, and keep that framing stable when adding or remixing sections.

- **Layout type:** Grid
- **Content width:** Bounded
- **Base unit:** 6px
- **Scale:** 1px, 6px, 14px, 16px, 28px, 32px, 36px, 40px
- **Section padding:** 28px, 36px, 56px
- **Card padding:** 16px
- **Gaps:** 2px, 6px, 8px, 10px

## Elevation & Depth

Depth is communicated through glass, border contrast, and reusable shadow or blur treatments. Keep those recipes consistent across hero panels, cards, and controls so the page reads as one material system.

Surfaces should read as glass first, with borders, shadows, and blur only reinforcing that material choice.

- **Surface style:** Glass
- **Borders:** 1px #FFFFFF; 1px #E5E5E5
- **Shadows:** rgba(76, 29, 149, 0.5) 0px 10px 30px -10px
- **Blur:** 12px, 18px, 10px

### Techniques
- **Gradient border shell:** Use a thin gradient border shell around the main card. Wrap the surface in an outer shell with 1px padding and a 9999px radius. Drive the shell with linear-gradient(135deg, rgba(192, 38, 211, 0.4), rgba(124, 58, 237, 0.2)) so the edge reads like premium depth instead of a flat stroke. Keep the actual stroke understated so the gradient shell remains the hero edge treatment. Inset the real content surface inside the wrapper with a slightly smaller radius so the gradient only appears as a hairline frame.

## Shapes

Shapes rely on a tight radius system anchored by 7px and scaled across cards, buttons, and supporting surfaces. Icon geometry should stay compatible with that soft-to-controlled silhouette.

Use the radius family intentionally: larger surfaces can open up, but controls and badges should stay within the same rounded DNA instead of inventing sharper or pill-only exceptions.

- **Corner radii:** 7px, 8px, 16px, 9999px
- **Icon treatment:** Linear
- **Icon sets:** Solar

## Components

Anchor interactions to the detected button styles. Reuse the existing card surface recipe for content blocks.

### Buttons
- **Primary:** text #FFFFFF, radius 9999px, padding 14px, border 0px solid rgb(229, 231, 235).
- **Links:** text #525252, radius 0px, padding 0px, border 0px solid rgb(229, 231, 235).

### Cards and Surfaces
- **Card surface:** background rgba(255, 255, 255, 0.6), border 0px solid rgb(229, 231, 235), radius 16px, padding 16px, shadow none, blur 24px.

### Iconography
- **Treatment:** Linear.
- **Sets:** Solar.

## Do's and Don'ts

Use these constraints to keep future generations aligned with the current system instead of drifting into adjacent styles.

### Do
- Do use the primary palette as the main accent for emphasis and action states.
- Do keep spacing aligned to the detected 6px rhythm.
- Do reuse the Glass surface treatment consistently across cards and controls.
- Do keep corner radii within the detected 7px, 8px, 16px, 9999px family.

### Don't
- Don't introduce extra accent colors outside the core palette roles unless the page needs a new semantic state.
- Don't mix unrelated shadow or blur recipes that break the current depth system.
- Don't exceed the detected moderate motion intensity without a deliberate reason.

## Motion

Motion feels controlled and interface-led across text, layout, and section transitions. Timing clusters around 150ms and 900ms. Easing favors ease and 1). Hover behavior focuses on text and color changes. Scroll choreography uses GSAP ScrollTrigger for section reveals and pacing.

**Motion Level:** moderate

**Durations:** 150ms, 900ms, 1000ms, 300ms

**Easings:** ease, 1), 0, 0.2, cubic-bezier(0.4, cubic-bezier(0.16

**Hover Patterns:** text, color

**Scroll Patterns:** gsap-scrolltrigger

## WebGL

Reconstruct the graphics as a full-bleed background field using webgl, renderer, alpha, antialias, custom shaders. The effect should read as technical and atmospheric: dot-matrix particle field with soft yellow and sparse spacing. Build it from dot particles + soft depth fade so the effect reads clearly. Animate it as soft wave motion. Interaction can react to the pointer, but only as a subtle drift. Preserve dom fallback.

**Id:** webgl

**Label:** WebGL

**Stack:** ThreeJS, WebGL

**Insights:**
  - **Scene:**
    - **Value:** Full-bleed background field
  - **Effect:**
    - **Value:** Dot-matrix particle field
  - **Primitives:**
    - **Value:** Dot particles + soft depth fade
  - **Motion:**
    - **Value:** Soft wave motion
  - **Interaction:**
    - **Value:** Pointer-reactive drift
  - **Render:**
    - **Value:** WebGL, Renderer, alpha, antialias, custom shaders

**Techniques:** Dot matrix, Wave deformation, Pointer parallax, Shader gradients, Noise fields

**Code Evidence:**
  - **HTML reference:**
    - **Language:** html
    - **Snippet:**
      ```html
      <!-- Background Aurora -->
      <div class="fixed inset-y-0 right-0 w-[120vw] md:w-[75vw] translate-x-[10%] md:translate-x-0 z-0 overflow-hidden pointer-events-none">
          <canvas id="webgl-canvas" class="absolute inset-0 w-full h-full"></canvas>
          <div class="absolute inset-0 flex">
              <div class="h-full flex-1 relative" style="background: linear-gradient(to right, rgba(250,250,247,1) 0%, rgba(250,250,247,0.88) 10…
      ```
  - **JS reference:**
    - **Language:** js
    - **Snippet:**
      ```
      // WebGL aurora — purple/magenta palette
      const canvas = document.getElementById('webgl-canvas');
      const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
      const scene = new THREE.Scene();
      const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
      const geometry = new THREE.PlaneGeometry(2, 2);

      const material = new THREE.ShaderMaterial({
      ```
  - **Renderer setup:**
    - **Language:** js
    - **Snippet:**
      ```
      // WebGL aurora — purple/magenta palette
      const canvas = document.getElementById('webgl-canvas');
      const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
      const scene = new THREE.Scene();
      const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
      const geometry = new THREE.PlaneGeometry(2, 2);
      ```
  - **Draw call:**
    - **Language:** js
    - **Snippet:**
      ```
      u_resolution: { value: new THREE.Vector2() }
      },
      vertexShader: `void main(){ gl_Position = vec4(position,1.0); }`,
      fragmentShader: `
          uniform float u_time;
          uniform vec2 u_resolution;
          vec3 permute(vec3 x){ return mod(((x*34.0)+1.0)*x,289.0); }
          float snoise(vec2 v){
      …
      ```

## ThreeJS

Reconstruct the Three.js layer as a full-bleed background field with layered spatial depth that feels technical. Use alpha, antialias renderer settings, orthographic projection, plane geometry, shadermaterial materials, and ambient + key + rim lighting. Motion should read as timeline-led reveals, with poster frame + dom fallback.

**Id:** threejs

**Label:** ThreeJS

**Stack:** ThreeJS, WebGL

**Insights:**
  - **Scene:**
    - **Value:** Full-bleed background field with layered spatial depth
  - **Render:**
    - **Value:** alpha, antialias
  - **Camera:**
    - **Value:** Orthographic projection
  - **Lighting:**
    - **Value:** ambient + key + rim
  - **Materials:**
    - **Value:** ShaderMaterial
  - **Geometry:**
    - **Value:** plane
  - **Motion:**
    - **Value:** Timeline-led reveals

**Techniques:** Shader materials, Timeline beats, alpha, antialias, Poster frame + DOM fallback

**Code Evidence:**
  - **HTML reference:**
    - **Language:** html
    - **Snippet:**
      ```html
      <!-- Background Aurora -->
      <div class="fixed inset-y-0 right-0 w-[120vw] md:w-[75vw] translate-x-[10%] md:translate-x-0 z-0 overflow-hidden pointer-events-none">
          <canvas id="webgl-canvas" class="absolute inset-0 w-full h-full"></canvas>
          <div class="absolute inset-0 flex">
              <div class="h-full flex-1 relative" style="background: linear-gradient(to right, rgba(250,250,247,1) 0%, rgba(250,250,247,0.88) 10…
      ```
  - **JS reference:**
    - **Language:** js
    - **Snippet:**
      ```
      // WebGL aurora — purple/magenta palette
      const canvas = document.getElementById('webgl-canvas');
      const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
      const scene = new THREE.Scene();
      const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
      const geometry = new THREE.PlaneGeometry(2, 2);

      const material = new THREE.ShaderMaterial({
      ```
  - **Renderer setup:**
    - **Language:** js
    - **Snippet:**
      ```
      // WebGL aurora — purple/magenta palette
      const canvas = document.getElementById('webgl-canvas');
      const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
      const scene = new THREE.Scene();
      const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
      const geometry = new THREE.PlaneGeometry(2, 2);
      ```
  - **Draw call:**
    - **Language:** js
    - **Snippet:**
      ```
      u_resolution: { value: new THREE.Vector2() }
      },
      vertexShader: `void main(){ gl_Position = vec4(position,1.0); }`,
      fragmentShader: `
          uniform float u_time;
          uniform vec2 u_resolution;
          vec3 permute(vec3 x){ return mod(((x*34.0)+1.0)*x,289.0); }
          float snoise(vec2 v){
      …
      ```
