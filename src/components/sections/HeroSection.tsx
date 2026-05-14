"use client";

import { useEffect, useRef } from "react";
import { Icon } from "@iconify/react";
import { HeroGlobe } from "./hero/HeroGlobe";
import { HeroMarquee } from "./hero/HeroMarquee";

function RevealWord({
  children,
  className = "",
}: {
  children: string;
  className?: string;
}) {
  return (
    <span className="inline-block overflow-hidden align-top">
      <span
        className={`reveal-word inline-block translate-y-full motion-reduce:translate-y-0 ${className}`}
      >
        {children}
      </span>
    </span>
  );
}

export function HeroSection() {
  const sectionRef = useRef<HTMLElement | null>(null);

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

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative overflow-x-hidden antialiased"
    >


      <div className="relative z-10 overflow-hidden px-4 pt-32 md:px-6 lg:pb-0 lg:pt-24">
        <div className="mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-12 pb-12 lg:grid-cols-2 lg:gap-8">
          {/* Left column — text */}
          <div className="relative z-20 order-2 flex flex-col items-center text-center lg:order-1 lg:items-start lg:text-left">
            {/* Badge */}
            <div className="group mb-6 inline-flex cursor-pointer items-center gap-2 rounded-full border border-border/50 bg-white/60 px-3 py-1 backdrop-blur-md transition-colors hover:bg-white/80 md:mb-8">
              {/* <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
              </span> */}
              <span className="text-xs font-medium tracking-wide text-accent/90">
                ✦ Introducing Zaby AI
              </span>
              <Icon
                icon="solar:alt-arrow-right-linear"
                width={12}
                height={12}
                className="text-text-secondary transition-transform group-hover:translate-x-0.5"
              />
            </div>

            {/* Heading */}
            <h1
              className="masked-reveal-title mb-6 text-4xl font-semibold leading-[1.1] tracking-tight text-text-primary drop-shadow-2xl text-balance sm:text-5xl md:mb-8 md:text-7xl lg:text-8xl"
            >
              <RevealWord>Re-Defining</RevealWord>{" "}
              <RevealWord>AI FOR</RevealWord>{" "}
              <br className="hidden lg:block" />
              <RevealWord className="bg-linear-to-br from-accent via-[#c026d3] to-accent-soft bg-clip-text text-transparent">
                Next-GEN.
              </RevealWord>
            </h1>

            {/* Subtitle */}
            <p className="mb-8 max-w-2xl text-base font-light leading-relaxed text-text-secondary text-balance md:mb-12 md:text-lg lg:text-xl">
              Zaby is the AI workspace for modern teams — think, write, and ship
              faster with context-aware intelligence built into every workflow.
            </p>

            {/* CTA buttons */}
            <div className="flex w-full flex-col items-center gap-4 sm:w-auto sm:flex-row">
              <button
                type="button"
                className="group relative flex w-full items-center justify-center gap-3 rounded-full bg-(--color-button-primary-bg) px-6 py-3.5 text-sm font-medium tracking-wide text-white shadow-[rgba(76,29,149,0.5)_0px_10px_30px_-10px] transition-all hover:bg-(--color-button-primary-hover) hover:shadow-[rgba(76,29,149,0.6)_0px_12px_34px_-10px] sm:w-auto"
              >
                <Icon icon="solar:bolt-linear" width={20} height={20} />
                Get started free
              </button>

              <button
                type="button"
                className="flex w-full items-center justify-center gap-3 rounded-full border border-(--color-button-secondary-border) bg-(--color-button-secondary-bg) px-8 py-3.5 font-medium text-(--color-button-secondary-text) backdrop-blur-md transition-all hover:bg-white sm:w-auto"
              >
                <Icon icon="solar:play-circle-linear" width={20} height={20} />
                See how it works
              </button>
            </div>
          </div>

          {/* Right column — globe */}
          <div className="relative order-1 flex h-100 w-full items-center justify-center md:h-150 lg:order-2 lg:h-187.5">
            <HeroGlobe />
          </div>
        </div>

        {/* Marquee strip */}
        <HeroMarquee />
      </div>
    </section>
  );
}
