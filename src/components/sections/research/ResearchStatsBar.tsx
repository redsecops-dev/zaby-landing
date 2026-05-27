"use client";

import { SectionWrapper, Container } from "@/components/layout";
import { ScrollReveal } from "@/components/animations";
import { cn } from "@/lib/utils";
import { RESEARCH_STATS } from "./data";

export function ResearchStatsBar() {
  return (
    <SectionWrapper
      spacing="none"
      background="transparent"
      className="border-y border-[var(--color-border-strong)]/40 py-14"
    >
      <Container size="lg">
        <div className="grid grid-cols-2 gap-y-10 md:grid-cols-4">
          {RESEARCH_STATS.map((stat, i) => (
            <ScrollReveal key={stat.label} direction="up" delay={i * 0.07}>
              <div
                className={cn(
                  "flex flex-col items-center gap-1.5 px-4 text-center",
                  i > 0 && "md:border-l md:border-[var(--color-border-strong)]/30"
                )}
              >
                <span className="text-3xl sm:text-4xl font-semibold tracking-tight bg-linear-to-br from-[var(--color-accent)] via-[#c026d3] to-[var(--color-accent-soft)] bg-clip-text text-transparent leading-none">
                  {stat.value}
                </span>
                <span className="text-xs font-semibold uppercase tracking-wider text-[var(--color-text-primary)]">
                  {stat.label}
                </span>
                {stat.description && (
                  <p className="mt-1 hidden max-w-[200px] text-xs leading-relaxed text-[var(--color-text-secondary)]/80 sm:block">
                    {stat.description}
                  </p>
                )}
              </div>
            </ScrollReveal>
          ))}
        </div>
      </Container>
    </SectionWrapper>
  );
}
