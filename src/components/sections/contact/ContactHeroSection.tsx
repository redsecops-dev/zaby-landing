"use client";

import { Icon } from "@iconify/react";
import { FadeUp } from "@/components/animations";
import { GradientOrb } from "@/components/shared/GradientOrb";

export function ContactHeroSection() {
  return (
    <section className="relative flex min-h-[52vh] items-center justify-center overflow-hidden py-28 md:py-36">
      {/* Background orbs */}
      <GradientOrb
        color="purple"
        size="xl"
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 opacity-20"
      />
      <GradientOrb
        color="pink"
        size="lg"
        className="absolute right-1/4 top-1/4 opacity-15"
      />

      <div className="relative mx-auto w-full max-w-4xl px-4 text-center sm:px-6 lg:px-8">
        <FadeUp>
          {/* Badge */}
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-border/50 bg-white/60 px-3 py-1 backdrop-blur-md">
            <Icon
              icon="solar:phone-calling-bold-duotone"
              width={12}
              height={12}
              className="text-accent"
            />
            <span className="text-xs font-medium tracking-wide text-accent/90">
              Contact Us
            </span>
          </div>

          {/* Heading */}
          <h1 className="text-[2.5rem] font-semibold leading-[1.08] tracking-tight text-text-primary sm:text-5xl md:text-6xl lg:text-7xl">
            Get in{" "}
            <span className="bg-linear-to-br from-accent via-[#c026d3] to-accent-soft bg-clip-text text-transparent">
              Touch
            </span>
          </h1>

          {/* Subtitle */}
          <p className="mx-auto mt-6 max-w-2xl text-lg font-light leading-relaxed text-text-secondary">
            Ready to deploy operational AI across your business? We&apos;re here
            to help you build, configure, and scale your AI workforce.
          </p>
        </FadeUp>
      </div>
    </section>
  );
}
