"use client";

import { SectionWrapper, Container } from "@/components/layout";
import { GradientOrb, HeroBadge, HeroHeading } from "@/components/shared";
import { ScrollReveal } from "@/components/animations";

export function ResearchHeroSection() {
  return (
    <SectionWrapper
      spacing="none"
      background="transparent"
      className="relative flex items-center justify-center overflow-hidden mt-24 sm:mt-32 py-16 sm:py-24"
    >
      {/* Background gradient orbs — mirrors reference lavender/purple tones */}
      {/* <GradientOrb
        color="purple"
        size="xl"
        className="absolute -top-32 left-1/2 -translate-x-1/2 opacity-30 pointer-events-none"
      />
      <GradientOrb
        color="pink"
        size="lg"
        className="absolute top-0 -right-32 opacity-15 pointer-events-none"
      />
      <GradientOrb
        color="blue"
        size="md"
        className="absolute bottom-0 -left-24 opacity-20 pointer-events-none"
      /> */}

      {/* Subtle mesh dot pattern */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 2px 2px, var(--color-accent) 1px, transparent 0)",
          backgroundSize: "32px 32px",
        }}
      />

      <Container
        size="lg"
        className="relative z-10 flex flex-col items-center text-center"
      >
        <ScrollReveal direction="up" delay={0.05}>
          {/* Badge pill — matches reference dark pill style */}
          <HeroBadge
            text="Research & Engineering"
            icon="solar:alt-arrow-right-linear"
            className="mb-6 inline-flex"
          />
        </ScrollReveal>

        {/* Main heading and Subtext */}
        <ScrollReveal direction="up" delay={0.12}>
          <HeroHeading
            className="w-full items-center lg:items-center text-center [&>h1]:text-center"
            title={
              <>
                Intelligence Built on{" "}
                <span className="bg-linear-to-br from-[var(--color-accent)] via-[#c026d3] to-[var(--color-accent-soft)] bg-clip-text text-transparent">
                  Rigorous Research
                </span>
              </>
            }
          />
          <p className="mx-auto mt-6 max-w-5xl text-[0.98rem] font-light leading-relaxed text-[var(--color-text-secondary)] md:text-lg lg:text-xl">
            Five years of engineering research in autonomous execution,
            persistent memory, multimodal systems, and enterprise-grade workflow
            orchestration — powering the Zaby operational AI infrastructure.
          </p>
        </ScrollReveal>

        {/* Scroll indicator */}
        <ScrollReveal direction="up" delay={0.2}>
          <div className="mt-14 flex items-center gap-2 text-xs font-medium uppercase tracking-widest text-[var(--color-text-secondary)]/60">
            <div className="h-px w-12 bg-[var(--color-border-strong)]/30" />
            <span>Core Research Areas Below</span>
            <div className="h-px w-12 bg-[var(--color-border-strong)]/30" />
          </div>
        </ScrollReveal>
      </Container>
    </SectionWrapper>
  );
}
