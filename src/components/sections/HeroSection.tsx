"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { Icon } from "@iconify/react";
import { Button } from "@/components/ui/button";
import { SplineScene } from "@/components/ui/splite";
import { HeroMarquee } from "./hero/HeroMarquee";
import { 
  HeroBadge, 
  HeroHeading, 
  RevealWord, 
  GradientOrb, 
  GridBackground 
} from "@/components/shared";

export function HeroSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const logoRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (prefersReducedMotion) return;

    let isDisposed = false;
    let revertAnimations: (() => void) | undefined;

    void (async () => {
      const [{ gsap }, { ScrollTrigger }] = await Promise.all([
        import("gsap"),
        import("gsap/ScrollTrigger"),
      ]);

      if (isDisposed) return;

      gsap.registerPlugin(ScrollTrigger);

      const context = gsap.context(() => {
        const words = section.querySelectorAll<HTMLElement>(".reveal-word");
        const marqueeTrack = section.querySelector<HTMLElement>(".marquee-track");
        const title = section.querySelector(".masked-reveal-title");

        if (title) {
          gsap.to(words, {
            y: "0%",
            duration: 1.2,
            stagger: 0.1,
            ease: "power4.out",
            scrollTrigger: {
              trigger: title,
              start: "top 90%",
              once: true,
            },
          });
        }

        if (marqueeTrack) {
          gsap.to(marqueeTrack, {
            xPercent: -50,
            ease: "none",
            duration: 25,
            repeat: -1,
          });
        }
      }, section);

      revertAnimations = () => context.revert();
    })();

    return () => {
      isDisposed = true;
      revertAnimations?.();
    };
  }, []);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const handlePointerMove = (e: PointerEvent) => {
      const canvas = section.querySelector("canvas");
      if (!canvas || e.target === canvas) return;

      const syntheticEvent = new PointerEvent("pointermove", {
        clientX: e.clientX,
        clientY: e.clientY,
        pointerId: e.pointerId,
        pointerType: e.pointerType,
        isPrimary: e.isPrimary,
        bubbles: true,
      });
      canvas.dispatchEvent(syntheticEvent);
    };

    window.addEventListener("pointermove", handlePointerMove);
    return () => window.removeEventListener("pointermove", handlePointerMove);
  }, []);

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative overflow-hidden antialiased bg-transparent"
    >
      {/* Ambient background effects */}
      <GradientOrb 
        color="purple" 
        size="xl" 
        className="absolute -top-[20%] -left-[10%] opacity-20 blur-[120px] z-0" 
      />
      <GradientOrb 
        color="blue" 
        size="lg" 
        className="absolute top-[20%] -right-[5%] opacity-15 blur-[100px] z-0" 
      />
      <GridBackground variant="dots" opacity="light" className="z-0 opacity-[0.05]" />

      <div className="relative z-10 overflow-visible px-4 pt-26 md:px-6 md:pt-30 lg:pb-0 lg:pt-24">
        <div className="mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-8 pb-10 md:gap-10 md:pb-12 lg:grid-cols-2 lg:gap-8">
          {/* Left column — text */}
          <div className="relative z-20 order-1 col-span-1 flex flex-col items-center text-center lg:order-1 lg:col-span-1 lg:items-start lg:text-left">
            <HeroBadge 
              text="Introducing Zaby AI" 
              icon="solar:alt-arrow-right-linear" 
              className="mb-8"
            />

            <HeroHeading 
              title={
                <>
                  <RevealWord>Re-Defining</RevealWord>{" "}
                  <RevealWord>AI FOR</RevealWord>{" "}
                  <br className="hidden lg:block" />
                  <RevealWord className="bg-linear-to-br from-accent via-[#c026d3] to-accent-soft bg-clip-text text-transparent">
                    Next-GEN
                  </RevealWord>
                </>
              }
              subtitle="Zaby is the AI workspace for modern teams — think, write, and ship faster with context-aware intelligence built into every workflow."
            />

            {/* CTA buttons */}
            <div className="flex w-full flex-col items-center gap-3 sm:w-auto sm:flex-row sm:gap-4">
              <Button
                asChild
                size="lg"
                className="group relative flex w-full cursor-pointer items-center justify-center gap-3 rounded-full bg-(--color-button-primary-bg) px-8 py-7 text-base font-medium tracking-wide text-white shadow-[rgba(76,29,149,0.5)_0px_10px_30px_-10px] transition-all hover:bg-(--color-button-primary-hover) hover:shadow-[rgba(76,29,149,0.6)_0px_12px_34px_-10px] sm:w-auto"
              >
                <Link href="https://platform.zaby.io/tenant/signup">
                  <Icon icon="solar:bolt-linear" width={22} height={22} />
                  Get started free
                </Link>
              </Button>

              <Button
                size="lg"
                variant="outline"
                className="flex w-full cursor-pointer items-center justify-center gap-3 rounded-full border border-(--color-button-secondary-border) bg-(--color-button-secondary-bg) px-10 py-7 text-base font-medium text-(--color-button-secondary-text) transition-all hover:bg-[#e9d5ff] sm:w-auto"
              >
                <Icon icon="solar:play-circle-linear" width={22} height={22} />
                See how it works
              </Button>
            </div>
          </div>

          {/* Right column — robot */}
          <div className="relative order-2 hidden h-72 w-full items-center justify-center sm:h-84 md:h-125 lg:order-2 lg:flex lg:h-187.5">
            <div className="absolute inset-y-0 -left-[20%] right-0 pointer-events-none">
              <SplineScene
                scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
                className="w-full h-full pointer-events-auto"
              />
            </div>
          </div>
        </div>

        {/* Marquee strip */}
        <HeroMarquee />
      </div>
    </section>
  );
}
