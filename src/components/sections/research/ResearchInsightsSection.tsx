import { FadeUp } from "@/components/animations";
import { RESEARCH_INSIGHTS, ENGINEERING_PRINCIPLES } from "./data";
import * as LucideIcons from "lucide-react";

export function ResearchInsightsSection() {
  return (
    <>
      {/* ── Research Insights ─────────────────────── */}
      <section className="border-t border-white/60 bg-white/30 py-20 backdrop-blur-sm md:py-28">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <FadeUp>
            <div className="mb-14 max-w-2xl">
              <div className="mb-3 inline-flex items-center gap-1.5 rounded-full border border-accent/20 bg-accent/5 px-3 py-1 text-xs font-medium text-accent/80">
                Research Insights
              </div>
              <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                Key Findings from{" "}
                <span className="bg-linear-to-br from-accent via-[#c026d3] to-accent-soft bg-clip-text text-transparent">
                  Production Research
                </span>
              </h2>
              <p className="mt-4 text-base text-muted-foreground sm:text-lg">
                Engineering insights derived from real-world deployments, benchmark testing,
                and ongoing platform research across agent execution, memory, and orchestration.
              </p>
            </div>
          </FadeUp>

          {/* Insight cards — stacked, each with gradient left accent */}
          <div className="space-y-8">
            {RESEARCH_INSIGHTS.map((insight, i) => (
              <FadeUp key={insight.id} delay={i * 0.08}>
                <div className="group relative overflow-hidden rounded-2xl border border-white/60 bg-white/60 backdrop-blur-md transition-all duration-300">
                  {/* Gradient left accent bar */}
                  <div
                    className="absolute left-0 top-0 h-full w-1 rounded-l-2xl"
                    style={{
                      background: `linear-gradient(to bottom, ${insight.gradientFrom}, ${insight.gradientTo})`,
                    }}
                  />

                  <div className="p-6 pl-8 md:p-8 md:pl-10">
                    {/* Category + title row */}
                    <div className="mb-4">
                      <span
                        className="mb-2 inline-block rounded-full px-3 py-0.5 text-xs font-medium text-white"
                        style={{ background: insight.gradientFrom }}
                      >
                        {insight.category}
                      </span>
                      <h3 className="text-xl font-bold text-foreground sm:text-2xl">
                        {insight.title}
                      </h3>
                    </div>

                    {/* Summary + findings — 2-col on lg */}
                    <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 lg:gap-10">
                      <p className="text-sm leading-relaxed text-muted-foreground sm:text-base">
                        {insight.summary}
                      </p>

                      <div>
                        <div className="mb-3 text-xs font-semibold uppercase tracking-wide text-muted-foreground/60">
                          Key Findings
                        </div>
                        <ul className="space-y-2.5">
                          {insight.findings.map((finding, fi) => (
                            <li key={fi} className="flex items-start gap-2.5 text-sm text-muted-foreground">
                              <span
                                className="mt-1 flex h-4 w-4 shrink-0 items-center justify-center rounded-full text-[10px] font-bold text-white"
                                style={{ background: insight.gradientFrom }}
                              >
                                {fi + 1}
                              </span>
                              {finding}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ── Engineering Principles ────────────────── */}
      <section className="py-20 md:py-28">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* 2-col layout: text left, principles grid right */}
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16">
            {/* Left: heading + copy */}
            <FadeUp>
              <div className="flex flex-col justify-center">
                <div className="mb-3 inline-flex w-fit items-center gap-1.5 rounded-full border border-accent/20 bg-accent/5 px-3 py-1 text-xs font-medium text-accent/80">
                  Engineering Philosophy
                </div>
                <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                  Principles That{" "}
                  <span className="bg-linear-to-br from-accent via-[#c026d3] to-accent-soft bg-clip-text text-transparent">
                    Guide Every Decision
                  </span>
                </h2>
                <p className="mt-4 text-base leading-relaxed text-muted-foreground sm:text-lg">
                  Zaby is designed around execution — not conversation. The platform philosophy
                  emerged from observing where AI systems fail at enterprise scale, and engineering
                  directly against those failure modes.
                </p>

                {/* Quote block */}
                <blockquote className="mt-8 border-l-2 border-accent/40 pl-5">
                  <p className="text-base italic text-muted-foreground leading-relaxed">
                    &ldquo;AI systems should operate like digital operational infrastructure —
                    executing tasks, retaining memory, and coordinating across environments
                    without requiring humans to manage every step.&rdquo;
                  </p>
                  <cite className="mt-3 block text-xs font-medium text-muted-foreground/60 not-italic">
                    — Zaby Platform Philosophy
                  </cite>
                </blockquote>
              </div>
            </FadeUp>

            {/* Right: 4 principles */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {ENGINEERING_PRINCIPLES.map((principle, i) => (
                <FadeUp key={principle.id} delay={i * 0.07}>
                  <div className="flex flex-col rounded-2xl border border-white/60 bg-white/60 p-5 backdrop-blur-md h-full">
                    {/* Icon badge */}
                    <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-linear-to-br from-accent/15 to-accent/5 border border-accent/15 text-foreground">
                      {(() => {
                        const Icon = LucideIcons[principle.icon as keyof typeof LucideIcons] as React.ComponentType<{ className?: string }>;
                        return Icon ? <Icon className="w-5 h-5" /> : null;
                      })()}
                    </div>
                    <h3 className="text-sm font-semibold text-foreground">{principle.title}</h3>
                    <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground">
                      {principle.description}
                    </p>
                  </div>
                </FadeUp>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
