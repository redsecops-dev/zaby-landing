import { FadeUp } from "@/components/animations";
import { GradientOrb } from "@/components/shared/GradientOrb";
import { FEATURED_STUDY } from "./data";
import Link from "next/link";

export function CaseStudiesHeroSection() {
  const study = FEATURED_STUDY;

  return (
    <section className="relative overflow-hidden py-20 md:py-28">
      {/* Background orbs */}
      <GradientOrb color="purple" size="xl" className="absolute -top-32 -left-32 opacity-30" />
      <GradientOrb color="pink" size="lg" className="absolute top-20 -right-20 opacity-20" />

      <div className="container relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Page intro badge */}
        <FadeUp>
          <div className="mb-10 text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-border/50 bg-white/60 px-4 py-1.5 backdrop-blur-md">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-accent" />
              <span className="text-xs font-medium tracking-wide text-accent/90 uppercase">
                Customer Stories
              </span>
            </span>
            <h1 className="mt-5 text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
              Real results with{" "}
              <span className="bg-linear-to-br from-accent via-[#c026d3] to-accent-soft bg-clip-text text-transparent">
                autonomous AI
              </span>
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-base text-muted-foreground sm:text-lg">
              See how enterprises across industries deploy Zaby&apos;s AI agents, workflows,
              and workspaces to eliminate operational overhead and scale without limits.
            </p>
          </div>
        </FadeUp>

        {/* Featured story card */}
        <FadeUp delay={0.15}>
          <div className="relative overflow-hidden rounded-3xl border border-white/60 bg-white/60 backdrop-blur-md shadow-xl">
            <div className="grid grid-cols-1 gap-0 lg:grid-cols-2">
              {/* Left: content */}
              <div className="relative p-8 md:p-12 lg:p-14">
                {/* Top badge */}
                <div className="mb-6 flex items-center gap-2">
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-accent/30 bg-accent/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-accent">
                    <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                    Top Success Story
                  </span>
                  <span className="rounded-full bg-white/80 border border-border/40 px-3 py-1 text-xs font-medium text-muted-foreground">
                    {study.product}
                  </span>
                </div>

                <h2 className="text-2xl font-bold leading-snug text-foreground sm:text-3xl lg:text-4xl">
                  {study.headline}
                </h2>

                <p className="mt-4 text-sm leading-relaxed text-muted-foreground sm:text-base">
                  {study.challenge}
                </p>

                {/* Metrics */}
                <div className="mt-8 grid grid-cols-2 gap-4 border-t border-border/30 pt-8">
                  {study.metrics.slice(0, 4).map((metric) => (
                    <div key={metric.label} className="flex flex-col gap-1 border-l-2 border-accent/40 pl-4">
                      <span className="text-2xl font-bold text-accent">{metric.value}</span>
                      <span className="text-xs text-muted-foreground">{metric.label}</span>
                    </div>
                  ))}
                </div>

                {/* CTA */}
                <div className="mt-8 flex flex-wrap items-center gap-4">
                  <Link
                    href={`/case-studies/${study.slug}`}
                    className="cursor-pointer inline-flex items-center gap-2 rounded-full bg-(--color-button-primary-bg) px-6 py-2.5 text-sm font-medium text-white shadow-[rgba(76,29,149,0.5)_0px_10px_30px_-10px] transition-colors hover:bg-(--color-button-primary-hover)"
                  >
                    Read Full Story
                    <svg
                      className="h-4 w-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </Link>
                  <span className="text-xs text-muted-foreground">{study.industry}</span>
                </div>

                {/* Quote */}
                {study.quote && (
                  <blockquote className="mt-8 rounded-xl border border-border/30 bg-white/40 p-5">
                    <p className="text-sm italic text-foreground/80 leading-relaxed">
                      &ldquo;{study.quote}&rdquo;
                    </p>
                    <footer className="mt-3 flex items-center gap-2">
                      <div className="h-8 w-8 rounded-full bg-linear-to-br from-accent to-accent-soft flex items-center justify-center text-white text-xs font-bold">
                        {study.quoteAuthor?.charAt(0)}
                      </div>
                      <div>
                        <div className="text-xs font-semibold text-foreground">{study.quoteAuthor}</div>
                        <div className="text-xs text-muted-foreground">{study.quoteRole}</div>
                      </div>
                    </footer>
                  </blockquote>
                )}
              </div>

              {/* Right: visual panel */}
              <div
                className="relative flex min-h-64 items-end overflow-hidden lg:min-h-full"
                style={{
                  background: `linear-gradient(135deg, ${study.gradientFrom}, ${study.gradientTo})`,
                }}
              >
                {/* Pattern overlay */}
                <div className="absolute inset-0 opacity-10"
                  style={{
                    backgroundImage:
                      "radial-gradient(circle at 2px 2px, rgba(255,255,255,0.4) 1px, transparent 0)",
                    backgroundSize: "28px 28px",
                  }}
                />
                {/* Glow orb */}
                <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 h-64 w-64 rounded-full bg-white/10 blur-3xl" />

                {/* Company name display */}
                <div className="relative z-10 w-full p-8 md:p-12">
                  <div className="mb-3 inline-flex rounded-xl bg-white/10 border border-white/20 px-4 py-2 backdrop-blur-sm">
                    <span className="text-lg font-bold text-white">{study.company}</span>
                  </div>
                  <div className="text-white/70 text-sm">{study.industry}</div>

                  {/* Stats strip */}
                  <div className="mt-6 grid grid-cols-2 gap-3">
                    {study.metrics.slice(0, 2).map((metric) => (
                      <div
                        key={metric.label}
                        className="rounded-xl bg-white/10 border border-white/15 p-4 backdrop-blur-sm"
                      >
                        <div className="text-2xl font-bold text-white">{metric.value}</div>
                        <div className="mt-1 text-xs text-white/70">{metric.label}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}
