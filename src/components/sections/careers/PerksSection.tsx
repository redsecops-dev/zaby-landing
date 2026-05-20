"use client";

import { Icon } from "@iconify/react";
import { GradientOrb } from "@/components/shared/GradientOrb";
import { Stagger } from "@/components/animations";
import { ScrollReveal } from "@/components/animations";
import { PERKS } from "./data";

export function PerksSection() {
  return (
    <section className="relative py-24 md:py-32 overflow-hidden">
      <GradientOrb
        color="purple"
        size="xl"
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-6"
      />

      <div className="relative mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-16 flex flex-col items-center text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-border/50 bg-white/60 px-3 py-1 backdrop-blur-md">
            <Icon icon="solar:gift-bold-duotone" width={12} height={12} className="text-accent" />
            <span className="text-xs font-medium tracking-wide text-accent/90">
              What we offer
            </span>
          </div>
          <h2 className="mt-2 text-3xl font-semibold tracking-tight text-text-primary md:text-4xl lg:text-5xl">
            Perks &{" "}
            <span className="bg-linear-to-br from-accent via-[#c026d3] to-accent-soft bg-clip-text text-transparent">
              Benefits
            </span>
          </h2>
        </div>

        <Stagger staggerDelay={0.07} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {PERKS.map((perk) => (
            <ScrollReveal key={perk.title} direction="up">
              <div className="group flex flex-col gap-4 p-8 rounded-2xl bg-white/60 backdrop-blur-md border border-white/60 transition-all duration-300 hover:bg-white/80 hover:shadow-md hover:shadow-black/5 hover:-translate-y-0.5 h-full">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/80 border border-white/60 text-accent shadow-sm shadow-black/5 group-hover:scale-105 transition-transform duration-300">
                  <Icon icon={perk.icon} width={24} height={24} />
                </div>
                <h3 className="text-base font-semibold text-text-primary">
                  {perk.title}
                </h3>
                <p className="text-sm font-light text-text-secondary leading-relaxed">
                  {perk.description}
                </p>
              </div>
            </ScrollReveal>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
