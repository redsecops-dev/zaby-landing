"use client";

import { SectionWrapper, Container } from "@/components/layout";
import { SectionHeading, GlassPanel } from "@/components/shared";
import { ScrollReveal } from "@/components/animations";
import { RESEARCH_INSIGHTS, ENGINEERING_PRINCIPLES } from "./data";
import * as LucideIcons from "lucide-react";

export function ResearchInsightsSection() {
  return (
    <>
      {/* ── Research Insights ─────────────────────── */}
      <SectionWrapper spacing="lg" background="transparent" className="border-t border-[var(--color-border-strong)]/30">
        <Container size="lg">
          {/* Header */}
          <ScrollReveal direction="up" delay={0.05}>
            <SectionHeading
              label="Research Insights"
              title={
                <>
                  Key Findings from{" "}
                  <span className="bg-linear-to-br from-[var(--color-accent)] via-[#c026d3] to-[var(--color-accent-soft)] bg-clip-text text-transparent">
                    Production Research
                  </span>
                </>
              }
              subtitle="Engineering insights derived from real-world deployments, benchmark testing, and ongoing platform research across agent execution, memory, and orchestration."
              align="left"
              className="mb-14 max-w-2xl"
            />
          </ScrollReveal>

          {/* Insight cards — stacked, each with gradient left accent */}
          <div className="space-y-8">
            {RESEARCH_INSIGHTS.map((insight, i) => (
              <ScrollReveal key={insight.id} direction="up" delay={i * 0.08}>
                <GlassPanel
                  className="group relative overflow-hidden border-[var(--color-border-strong)]/30 transition-all duration-300 hover:border-[var(--color-accent)]/20"
                  padding="none"
                >
                  {/* Gradient left accent bar */}
                  <div
                    className="absolute left-0 top-0 h-full w-1.5"
                    style={{
                      background: `linear-gradient(to bottom, ${insight.gradientFrom}, ${insight.gradientTo})`,
                    }}
                  />

                  <div className="p-6 pl-8 md:p-8 md:pl-10">
                    {/* Category + title row */}
                    <div className="mb-4">
                      <span
                        className="mb-3 inline-block rounded-full px-3 py-0.5 text-xs font-semibold text-white shadow-sm"
                        style={{
                          background: `linear-gradient(135deg, ${insight.gradientFrom}, ${insight.gradientTo})`,
                        }}
                      >
                        {insight.category}
                      </span>
                      <h3 className="text-xl font-bold text-[var(--color-text-primary)] sm:text-2xl">
                        {insight.title}
                      </h3>
                    </div>

                    {/* Summary + findings — 2-col on lg */}
                    <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 lg:gap-10">
                      <p className="text-sm leading-relaxed text-[var(--color-text-secondary)] sm:text-base font-light">
                        {insight.summary}
                      </p>

                      <div>
                        <div className="mb-3 text-xs font-semibold uppercase tracking-wide text-[var(--color-text-secondary)]/60">
                          Key Findings
                        </div>
                        <ul className="space-y-2.5">
                          {insight.findings.map((finding, fi) => (
                            <li
                              key={fi}
                              className="flex items-start gap-3 text-sm text-[var(--color-text-secondary)]"
                            >
                              <span
                                className="mt-0.5 flex h-4.5 w-4.5 shrink-0 items-center justify-center rounded-full text-[10px] font-bold text-white shadow-sm"
                                style={{
                                  background: `linear-gradient(135deg, ${insight.gradientFrom}, ${insight.gradientTo})`,
                                }}
                              >
                                {fi + 1}
                              </span>
                              <span className="leading-relaxed font-light">{finding}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </GlassPanel>
              </ScrollReveal>
            ))}
          </div>
        </Container>
      </SectionWrapper>

      {/* ── Engineering Principles ────────────────── */}
      <SectionWrapper spacing="lg" background="transparent">
        <Container size="lg">
          {/* 2-col layout: text left, principles grid right */}
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
            {/* Left: heading + copy */}
            <div className="lg:col-span-5 flex flex-col justify-center">
              <ScrollReveal direction="up" delay={0.05}>
                <SectionHeading
                  label="Engineering Philosophy"
                  title={
                    <>
                      Principles That{" "}
                      <span className="bg-linear-to-br from-[var(--color-accent)] via-[#c026d3] to-[var(--color-accent-soft)] bg-clip-text text-transparent">
                        Guide Every Decision
                      </span>
                    </>
                  }
                  subtitle="Zaby is designed around execution — not conversation. The platform philosophy emerged from observing where AI systems fail at enterprise scale, and engineering directly against those failure modes."
                  align="left"
                  className="mb-8"
                />
              </ScrollReveal>

              {/* Quote block */}
              <ScrollReveal direction="up" delay={0.15}>
                <blockquote className="border-l-2 border-[var(--color-accent)]/40 pl-5">
                  <p className="text-base italic text-[var(--color-text-secondary)] leading-relaxed font-light">
                    &ldquo;AI systems should operate like digital operational infrastructure —
                    executing tasks, retaining memory, and coordinating across environments
                    without requiring humans to manage every step.&rdquo;
                  </p>
                  <cite className="mt-3 block text-xs font-medium text-[var(--color-text-secondary)]/60 not-italic">
                    — Zaby Platform Philosophy
                  </cite>
                </blockquote>
              </ScrollReveal>
            </div>

            {/* Right: 4 principles */}
            <div className="lg:col-span-7 grid grid-cols-1 gap-4 sm:grid-cols-2">
              {ENGINEERING_PRINCIPLES.map((principle, i) => (
                <ScrollReveal key={principle.id} direction="up" delay={i * 0.07}>
                  <GlassPanel className="flex flex-col h-full border-[var(--color-border-strong)]/30 hover:border-[var(--color-accent)]/20 transition-all duration-300" padding="md">
                    {/* Icon badge */}
                    <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-linear-to-br from-[var(--color-accent)]/15 to-[var(--color-accent)]/5 border border-[var(--color-accent)]/15 text-[var(--color-text-primary)]">
                      {(() => {
                        const IconComponent = LucideIcons[
                          principle.icon as keyof typeof LucideIcons
                        ] as React.ComponentType<{ className?: string }>;
                        return IconComponent ? (
                          <IconComponent className="w-5 h-5 text-[var(--color-text-primary)]" />
                        ) : null;
                      })()}
                    </div>
                    <h3 className="text-sm font-semibold text-[var(--color-text-primary)]">
                      {principle.title}
                    </h3>
                    <p className="mt-2 text-xs leading-relaxed text-[var(--color-text-secondary)] font-light">
                      {principle.description}
                    </p>
                  </GlassPanel>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </Container>
      </SectionWrapper>
    </>
  );
}
