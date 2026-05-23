"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { ArrowRight, ExternalLink } from "lucide-react";
import { Icon } from "@iconify/react";
import { FadeUp } from "@/components/animations";
import { GradientOrb } from "@/components/shared/GradientOrb";

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

export function CareersHeroSection() {
  const sectionRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
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
      className="relative overflow-hidden pt-32 pb-24 md:pt-40 md:pb-32"
    >
      {/* Background orbs — matches home page aesthetic */}
      <GradientOrb
        color="purple"
        size="xl"
        className="absolute -top-40 -right-40 opacity-10"
      />
      <GradientOrb
        color="pink"
        size="lg"
        className="absolute top-60 -left-32 opacity-8"
      />

      <div className="relative mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl">
          {/* Badge — matches home page hero badge exactly */}
          <FadeUp duration={0.5}>
            <div className="mb-6 inline-flex cursor-pointer items-center gap-2 rounded-full border border-border/50 bg-white/60 px-3 py-1 backdrop-blur-md">
              <span className="text-xs font-medium tracking-wide text-accent/90">
                ✦ Careers at Zaby
              </span>
              <Icon
                icon="solar:alt-arrow-right-linear"
                width={12}
                height={12}
                className="text-text-secondary"
              />
            </div>
          </FadeUp>

          {/* Headline — same font scale & weight as home hero */}
          <h1 className="masked-reveal-title mb-6 text-[2.15rem] font-semibold leading-[1.08] tracking-tight text-text-primary sm:text-5xl md:text-6xl lg:text-7xl">
            <RevealWord>We&apos;re building</RevealWord>{" "}
            <RevealWord>the infrastructure</RevealWord>{" "}
            <br className="hidden md:block" />
            <RevealWord className="bg-linear-to-br from-accent via-[#c026d3] to-accent-soft bg-clip-text text-transparent">
              AI runs on.
            </RevealWord>
          </h1>

          {/* Subtext */}
          <FadeUp delay={0.3} duration={0.6}>
            <p className="mb-10 max-w-2xl text-[0.98rem] font-light leading-relaxed text-text-secondary md:text-lg lg:text-xl">
              Zaby is an execution-first operational AI platform. We&apos;re not
              building chatbots or prompt wrappers — we&apos;re building the
              runtime layer that enterprises use to deploy autonomous AI systems
              at scale. If you want to work on infrastructure that matters, this
              is it.
            </p>
          </FadeUp>

          {/* CTAs — exactly matching home page button styles */}
          <FadeUp delay={0.45} duration={0.6}>
            <div className="flex w-full flex-col items-start gap-3 sm:w-auto sm:flex-row sm:items-center sm:gap-4">
              <a
                href="#open-positions"
                className="group relative flex items-center justify-center gap-3 rounded-full bg-(--color-button-primary-bg) px-6 py-3.5 text-sm font-medium tracking-wide text-white shadow-[rgba(76,29,149,0.5)_0px_10px_30px_-10px] transition-all hover:bg-(--color-button-primary-hover) hover:shadow-[rgba(76,29,149,0.6)_0px_12px_34px_-10px]"
              >
                <Icon icon="solar:users-group-rounded-bold" width={18} height={18} />
                See Open Positions
                <ArrowRight className="w-4 h-4" />
              </a>
              <Link
                href="mailto:careers@zaby.ai"
                className="flex items-center justify-center gap-3 rounded-full border border-(--color-button-secondary-border) bg-(--color-button-secondary-bg) px-6 py-3.5 text-sm font-medium text-(--color-button-secondary-text) transition-all hover:bg-[#e9d5ff]"
              >
                General Inquiry
                <ExternalLink className="w-3.5 h-3.5 opacity-60" />
              </Link>
            </div>
          </FadeUp>
        </div>
      </div>
    </section>
  );
}
