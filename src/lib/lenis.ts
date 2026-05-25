import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export function initSmoothScroll() {
  if (typeof window === "undefined") return null;

  // Respect prefers-reduced-motion
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (prefersReducedMotion) {
    console.log("Smooth scroll disabled due to prefers-reduced-motion");
    return null;
  }

  const lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    orientation: "vertical",
    gestureOrientation: "vertical",
    smoothWheel: true,
  });

  // Connect Lenis to ScrollTrigger
  lenis.on("scroll", ScrollTrigger.update);

  // Add Lenis to GSAP ticker
  const updateTicker = (time: number) => {
    lenis.raf(time * 1000);
  };
  
  gsap.ticker.add(updateTicker);
  gsap.ticker.lagSmoothing(0);

  // Store on window for debugging/debugging access
  (window as any).lenis = lenis;

  return {
    lenis,
    destroy: () => {
      gsap.ticker.remove(updateTicker);
      lenis.destroy();
      delete (window as any).lenis;
    }
  };
}
