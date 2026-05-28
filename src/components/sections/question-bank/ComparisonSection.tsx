"use client";

import React from "react";
import { Check, X } from "lucide-react";
import { SectionWrapper, Container } from "@/components/layout";
import { SectionHeading, GlassPanel, GradientOrb } from "@/components/shared";
import { ScrollReveal } from "@/components/animations";

interface ComparisonRow {
  feature: string;
  zaby: string;
  hackerrank: string;
  mettl: string;
  codility: string;
}

const comparisonData: ComparisonRow[] = [
  { feature: "AI Interactive Labs", zaby: "Yes", hackerrank: "Limited coding only", mettl: "No", codility: "Limited coding only" },
  { feature: "Agentic Question Generation", zaby: "Yes", hackerrank: "No", mettl: "No", codility: "No" },
  { feature: "Dynamic Adaptive Assessments", zaby: "Yes", hackerrank: "Partial", mettl: "Partial", codility: "Partial" },
  { feature: "Multi-Agent Validation", zaby: "Yes", hackerrank: "No", mettl: "No", codility: "No" },
  { feature: "Real-Time Smart Monitoring", zaby: "Yes", hackerrank: "Yes (Streaming)", mettl: "Yes (Streaming)", codility: "Yes (Sync/Async)" },
  { feature: "Enterprise KB Integration", zaby: "Yes", hackerrank: "Limited", mettl: "Limited", codility: "No" },
  { feature: "Static Question Bank Dependency", zaby: "No", hackerrank: "High", mettl: "High", codility: "High" },
  { feature: "Competitive-Exam Compatibility", zaby: "Yes", hackerrank: "Partial", mettl: "Yes", codility: "Partial" },
  { feature: "AI-Powered Optimization", zaby: "Yes", hackerrank: "Limited", mettl: "Limited", codility: "Limited" },
  { feature: "Gen-Z Interaction Experience", zaby: "Yes", hackerrank: "Limited", mettl: "Limited", codility: "Limited" }
];

export default function ComparisonSection() {
  return (
    <SectionWrapper spacing="lg" background="transparent" className="relative overflow-hidden border-y border-[var(--color-border-strong)]/40 !py-0 mb-20">
      {/* Background Glows */}
      <GradientOrb color="purple" size="lg" className="top-[30%] -left-[10%] opacity-10" />
      <GradientOrb color="blue" size="lg" className="bottom-[20%] -right-[15%] opacity-8" />

      <Container size="lg" className="relative z-10">
        <SectionHeading
          label="Feature Comparison"
          title={
            <>
              ZABY vs. <span className="font-semibold bg-linear-to-br from-[var(--color-accent-hover)] via-[#c026d3] to-[var(--color-accent-soft)] bg-clip-text text-transparent">Leading Platforms</span>
            </>
          }
          subtitle="Compare Zaby's autonomous agent-driven testing infrastructure against legacy platforms."
          className="mb-16"
          align="center"
        />

        {/* Responsive Table Wrapper */}
        <ScrollReveal direction="up" delay={0.15}>
          <GlassPanel
            padding="none"
            className="w-full relative overflow-hidden border border-[var(--color-glass-border)] shadow-xs bg-white/60 backdrop-blur-md rounded-3xl"
          >
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-[var(--color-border-strong)]/40 bg-slate-50/50">
                    <th className="px-6 py-5 text-sm font-bold text-[var(--color-text-primary)] min-w-[240px]">Platform Capability</th>
                    <th className="px-6 py-5 text-sm font-bold text-white bg-[var(--color-button-primary-bg)] text-center min-w-[140px]">ZABY</th>
                    <th className="px-6 py-5 text-sm font-bold text-[var(--color-text-secondary)] text-center min-w-[140px]">HackerRank</th>
                    <th className="px-6 py-5 text-sm font-bold text-[var(--color-text-secondary)] text-center min-w-[140px]">Mercer | Mettl</th>
                    <th className="px-6 py-5 text-sm font-bold text-[var(--color-text-secondary)] text-center min-w-[140px]">Codility</th>
                  </tr>
                </thead>
                <tbody>
                  {comparisonData.map((row, idx) => (
                    <tr key={idx} className="border-b border-[var(--color-border-strong)]/30 hover:bg-slate-50/50 transition-colors">
                      <td className="px-6 py-4.5 text-sm font-semibold text-[var(--color-text-primary)]">{row.feature}</td>
                      
                      {/* ZABY Column (Highlighted) */}
                      <td className="px-6 py-4.5 bg-[var(--color-button-primary-bg)]/03 border-x border-[var(--color-border-strong)]/40 text-center">
                        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[var(--color-accent)]/15 border border-[var(--color-accent)]/30 text-[var(--color-button-primary-bg)] text-xs font-bold shadow-2xs">
                          <Check className="h-3.5 w-3.5 text-[var(--color-accent-soft)] stroke-[3px]" />
                          {row.zaby}
                        </div>
                      </td>

                      {/* Other Columns */}
                      <td className="px-6 py-4.5 text-center text-xs font-medium text-[var(--color-text-secondary)]">
                        {row.hackerrank === "No" ? (
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded border border-red-200/50 bg-red-50/80 text-red-750 font-semibold">
                            <X className="h-3 w-3 stroke-[2.5px]" /> No
                          </span>
                        ) : row.hackerrank.includes("Limited") || row.hackerrank.includes("Partial") || row.hackerrank.includes("High") ? (
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded border border-amber-200/50 bg-amber-50/80 text-amber-705 font-semibold">
                            {row.hackerrank}
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded border border-emerald-250/50 bg-emerald-50/80 text-emerald-705 font-semibold">
                            {row.hackerrank}
                          </span>
                        )}
                      </td>

                      <td className="px-6 py-4.5 text-center text-xs font-medium text-[var(--color-text-secondary)]">
                        {row.mettl === "No" ? (
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded border border-red-200/50 bg-red-50/80 text-red-755 font-semibold">
                            <X className="h-3 w-3 stroke-[2.5px]" /> No
                          </span>
                        ) : row.mettl.includes("Limited") || row.mettl.includes("Partial") || row.mettl.includes("High") ? (
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded border border-amber-200/50 bg-amber-50/80 text-amber-705 font-semibold">
                            {row.mettl}
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded border border-emerald-250/50 bg-emerald-50/80 text-emerald-705 font-semibold">
                            {row.mettl}
                          </span>
                        )}
                      </td>

                      <td className="px-6 py-4.5 text-center text-xs font-medium text-[var(--color-text-secondary)]">
                        {row.codility === "No" ? (
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded border border-red-200/50 bg-red-50/80 text-red-755 font-semibold">
                            <X className="h-3 w-3 stroke-[2.5px]" /> No
                          </span>
                        ) : row.codility.includes("Limited") || row.codility.includes("Partial") || row.codility.includes("High") ? (
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded border border-amber-200/50 bg-amber-50/80 text-amber-705 font-semibold">
                            {row.codility}
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded border border-emerald-250/50 bg-emerald-50/80 text-emerald-705 font-semibold">
                            {row.codility}
                          </span>
                        )}
                      </td>

                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </GlassPanel>
        </ScrollReveal>
      </Container>
    </SectionWrapper>
  );
}
