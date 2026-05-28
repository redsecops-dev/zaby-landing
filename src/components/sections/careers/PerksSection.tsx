"use client";

import { Icon } from "@iconify/react";
import { SectionWrapper, Container } from "@/components/layout";
import { GradientOrb, HeroBadge, GlassPanel } from "@/components/shared";
import { ScrollReveal } from "@/components/animations";
import { PERKS } from "./data";

export function PerksSection() {
  return (
    <SectionWrapper spacing="lg" background="transparent" className="overflow-visible">
      <GradientOrb
        color="purple"
        size="xl"
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.05] pointer-events-none"
      />

      <Container size="lg" className="relative z-10">
        <div className="mb-16 flex flex-col items-center text-center">
          <ScrollReveal direction="up" delay={0.05}>
            <HeroBadge text="What we offer" />
          </ScrollReveal>
          <ScrollReveal direction="up" delay={0.1}>
            <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-[var(--color-text-primary)] md:text-4xl lg:text-5xl font-display">
              Perks &{" "}
              <span className="bg-linear-to-br from-accent via-[#c026d3] to-accent-soft bg-clip-text text-transparent">
                Benefits
              </span>
            </h2>
          </ScrollReveal>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {PERKS.map((perk, i) => (
            <ScrollReveal key={perk.title} direction="up" delay={0.08 + i * 0.06}>
              <GlassPanel
                padding="lg"
                className="group rounded-2xl transition-all duration-300 hover:border-[var(--color-accent)]/20 hover:shadow-md hover:shadow-black/5 hover:-translate-y-0.5 h-full flex flex-col gap-4"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/80 border border-[var(--color-border-strong)]/30 text-[var(--color-accent)] shadow-sm shadow-black/5 group-hover:scale-105 transition-transform duration-300">
                  <Icon icon={perk.icon} width={24} height={24} />
                </div>
                <h3 className="text-base font-semibold text-[var(--color-text-primary)]">
                  {perk.title}
                </h3>
                <p className="text-sm font-light text-[var(--color-text-secondary)] leading-relaxed">
                  {perk.description}
                </p>
              </GlassPanel>
            </ScrollReveal>
          ))}
        </div>
      </Container>
    </SectionWrapper>
  );
}
