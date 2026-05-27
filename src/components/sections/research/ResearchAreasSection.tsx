"use client";

import { SectionWrapper, Container } from "@/components/layout";
import { SectionHeading, GlassPanel } from "@/components/shared";
import { ScrollReveal } from "@/components/animations";
import { RESEARCH_AREAS } from "./data";
import * as LucideIcons from "lucide-react";

export function ResearchAreasSection() {
  return (
    <SectionWrapper spacing="lg" background="transparent">
      <Container size="lg">
        {/* Section header */}
        <ScrollReveal direction="up" delay={0.05}>
          <SectionHeading
            label="Core Research Areas"
            title={
              <>
                Six Pillars of{" "}
                <span className="bg-linear-to-br from-[var(--color-accent)] via-[#c026d3] to-[var(--color-accent-soft)] bg-clip-text text-transparent">
                  Platform Intelligence
                </span>
              </>
            }
            subtitle="Zaby's platform capabilities are grounded in sustained engineering research across six interconnected domains — each directly informing production infrastructure."
            align="center"
            className="mb-14"
          />
        </ScrollReveal>

        {/* 6-card grid — 2 cols on md, 3 cols on lg */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {RESEARCH_AREAS.map((area, i) => (
            <ScrollReveal key={area.id} direction="up" delay={i * 0.05}>
              <GlassPanel
                className="group relative flex flex-col overflow-hidden h-full transition-all duration-300 hover:-translate-y-1 hover:border-[var(--color-accent)]/20"
                padding="md"
              >
                {/* Accent glow on hover */}
                <div className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100 bg-linear-to-br from-[var(--color-accent)]/5 to-transparent" />

                {/* Icon */}
                <div className="relative mb-4 flex h-12 w-12 items-center justify-center rounded-xl border border-[var(--color-border-strong)]/30 bg-white/80 text-[var(--color-text-primary)] transition-colors group-hover:border-[var(--color-accent)]/30">
                  {(() => {
                    const IconComponent = LucideIcons[
                      area.icon as keyof typeof LucideIcons
                    ] as React.ComponentType<{ className?: string }>;
                    return IconComponent ? (
                      <IconComponent className="w-6 h-6 text-[var(--color-text-primary)] group-hover:text-[var(--color-accent)] transition-colors" />
                    ) : null;
                  })()}
                </div>

                {/* Title */}
                <h3 className="relative text-base font-semibold text-[var(--color-text-primary)] group-hover:text-[var(--color-accent)] transition-colors duration-200">
                  {area.title}
                </h3>

                {/* Description */}
                <p className="relative mt-2 text-sm leading-relaxed text-[var(--color-text-secondary)] flex-1">
                  {area.description}
                </p>

                {/* Tags */}
                <div className="relative mt-4 flex flex-wrap gap-1.5">
                  {area.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-[var(--color-border-strong)]/30 bg-white/60 px-2.5 py-0.5 text-xs text-[var(--color-text-secondary)]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </GlassPanel>
            </ScrollReveal>
          ))}
        </div>
      </Container>
    </SectionWrapper>
  );
}
