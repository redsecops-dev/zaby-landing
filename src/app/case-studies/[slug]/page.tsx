import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { FadeUp } from "@/components/animations";
import { GradientOrb } from "@/components/shared/GradientOrb";
import { CASE_STUDIES } from "@/components/sections/case-studies/data";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return CASE_STUDIES.map((study) => ({ slug: study.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const study = CASE_STUDIES.find((s) => s.slug === slug);
  if (!study) return { title: "Case Study — Zaby" };
  return {
    title: `${study.company} Case Study — Zaby`,
    description: study.headline,
  };
}

export default async function CaseStudyDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const study = CASE_STUDIES.find((s) => s.slug === slug);

  if (!study) notFound();

  const related = CASE_STUDIES.filter(
    (s) => s.slug !== slug && s.product === study.product
  ).slice(0, 3);

  const fallbackRelated = CASE_STUDIES.filter((s) => s.slug !== slug).slice(0, 3);
  const relatedStudies = related.length >= 2 ? related : fallbackRelated;

  return (
    <main className="relative antialiased">
      {/* ── Hero ──────────────────────────────────── */}
      <section className="relative overflow-hidden py-16 md:py-24">
        <GradientOrb color="purple" size="xl" className="absolute -top-40 -left-40 opacity-25" />
        <GradientOrb color="pink" size="lg" className="absolute top-10 -right-24 opacity-20" />

        <div className="container relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-10">
          {/* Breadcrumb */}
          <FadeUp>
            <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
              <Link
                href="/"
                className="group cursor-pointer relative text-muted-foreground hover:text-foreground transition-all duration-300 inline-flex items-center gap-1"
              >
                Home
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-linear-to-r from-accent to-accent/60 group-hover:w-full transition-all duration-300" />
              </Link>
              <span className="text-border/50">/</span>
              <Link
                href="/case-studies"
                className="group cursor-pointer relative text-muted-foreground hover:text-foreground transition-all duration-300 inline-flex items-center gap-1"
              >
                Case Studies
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-linear-to-r from-accent to-accent/60 group-hover:w-full transition-all duration-300" />
              </Link>
              <span className="text-border/50">/</span>
              <span className="text-muted-foreground/60 line-clamp-1">{study.headline}</span>
            </nav>
          </FadeUp>

          {/* Hero card */}
          <FadeUp delay={0.1}>
            <div
              className="relative overflow-hidden rounded-3xl"
              style={{
                background: `linear-gradient(135deg, ${study.gradientFrom}, ${study.gradientTo})`,
              }}
            >
              {/* Dot pattern */}
              <div
                className="absolute inset-0 opacity-10"
                style={{
                  backgroundImage:
                    "radial-gradient(circle at 2px 2px, rgba(255,255,255,0.5) 1px, transparent 0)",
                  backgroundSize: "26px 26px",
                }}
              />
              {/* Glow */}
              <div className="absolute top-0 right-0 h-96 w-96 translate-x-1/3 -translate-y-1/3 rounded-full bg-white/10 blur-3xl" />

              <div className="relative z-10 p-8 md:p-12 lg:p-16">
                {/* Tags */}
                <div className="mb-6 flex flex-wrap gap-2">
                  <span className="rounded-full border border-white/25 bg-white/15 px-3 py-1 text-xs font-medium text-white/90 backdrop-blur-sm">
                    {study.industry}
                  </span>
                  <span className="rounded-full border border-white/25 bg-white/15 px-3 py-1 text-xs font-medium text-white/90 backdrop-blur-sm">
                    {study.product}
                  </span>
                  {study.featured && (
                    <span className="rounded-full border border-yellow-300/40 bg-yellow-300/15 px-3 py-1 text-xs font-semibold text-yellow-200">
                      ★ Featured Story
                    </span>
                  )}
                </div>

                <h1 className="max-w-4xl text-3xl font-bold leading-snug text-white sm:text-4xl lg:text-5xl">
                  {study.headline}
                </h1>

                {/* Metrics strip */}
                <div className="mt-10 grid grid-cols-2 gap-4 border-t border-white/20 pt-8 sm:grid-cols-4">
                  {study.metrics.map((metric) => (
                    <div key={metric.label} className="flex flex-col gap-1">
                      <span className="text-3xl font-bold text-white">{metric.value}</span>
                      <span className="text-xs text-white/65">{metric.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* ── Main content ──────────────────────────── */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-3">
            {/* Left: prose content */}
            <div className="lg:col-span-2 space-y-10">
              {/* Challenge */}
              <FadeUp>
                <div className="rounded-2xl border border-white/60 bg-white/60 backdrop-blur-md p-7 md:p-9">
                  <div className="mb-4 flex items-center gap-3">
                    <div
                      className="flex h-9 w-9 items-center justify-center rounded-xl"
                      style={{ background: `linear-gradient(135deg, ${study.gradientFrom}, ${study.gradientTo})` }}
                    >
                      <svg className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                      </svg>
                    </div>
                    <h2 className="text-lg font-semibold text-foreground">The Challenge</h2>
                  </div>
                  <p className="text-sm leading-relaxed text-muted-foreground sm:text-base">
                    {study.challenge}
                  </p>
                </div>
              </FadeUp>

              {/* Solution */}
              <FadeUp delay={0.05}>
                <div className="rounded-2xl border border-white/60 bg-white/60 backdrop-blur-md p-7 md:p-9">
                  <div className="mb-4 flex items-center gap-3">
                    <div
                      className="flex h-9 w-9 items-center justify-center rounded-xl"
                      style={{ background: `linear-gradient(135deg, ${study.gradientFrom}, ${study.gradientTo})` }}
                    >
                      <svg className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                      </svg>
                    </div>
                    <h2 className="text-lg font-semibold text-foreground">The Solution</h2>
                  </div>
                  <p className="text-sm leading-relaxed text-muted-foreground sm:text-base">
                    {study.solution}
                  </p>
                </div>
              </FadeUp>

              {/* Results */}
              <FadeUp delay={0.1}>
                <div className="rounded-2xl border border-white/60 bg-white/60 backdrop-blur-md p-7 md:p-9">
                  <div className="mb-6 flex items-center gap-3">
                    <div
                      className="flex h-9 w-9 items-center justify-center rounded-xl"
                      style={{ background: `linear-gradient(135deg, ${study.gradientFrom}, ${study.gradientTo})` }}
                    >
                      <svg className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                      </svg>
                    </div>
                    <h2 className="text-lg font-semibold text-foreground">The Results</h2>
                  </div>
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    {study.metrics.map((metric) => (
                      <div
                        key={metric.label}
                        className="rounded-xl border border-border/30 bg-white/50 p-5"
                      >
                        <div
                          className="text-3xl font-bold"
                          style={{ color: study.gradientFrom }}
                        >
                          {metric.value}
                        </div>
                        <div className="mt-1 text-sm text-muted-foreground capitalize">
                          {metric.label}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </FadeUp>

              {/* Testimonial */}
              {study.quote && (
                <FadeUp delay={0.15}>
                  <div className="rounded-2xl border border-border/30 bg-white/40 backdrop-blur-md p-7 md:p-9">
                    <svg
                      className="mb-4 h-8 w-8 opacity-30"
                      fill="currentColor"
                      viewBox="0 0 32 32"
                      style={{ color: study.gradientFrom }}
                    >
                      <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" />
                    </svg>
                    <p className="text-base italic leading-relaxed text-foreground/80 sm:text-lg">
                      &ldquo;{study.quote}&rdquo;
                    </p>
                    <div className="mt-6 flex items-center gap-3">
                      <div
                        className="flex h-10 w-10 items-center justify-center rounded-full text-sm font-bold text-white"
                        style={{ background: `linear-gradient(135deg, ${study.gradientFrom}, ${study.gradientTo})` }}
                      >
                        {study.quoteAuthor?.charAt(0)}
                      </div>
                      <div>
                        <div className="text-sm font-semibold text-foreground">{study.quoteAuthor}</div>
                        <div className="text-xs text-muted-foreground">{study.quoteRole}</div>
                      </div>
                    </div>
                  </div>
                </FadeUp>
              )}
            </div>

            {/* Right: sidebar */}
            <div className="space-y-6 lg:sticky lg:top-24 lg:self-start">
              {/* Company card */}
              <FadeUp delay={0.05}>
                <div className="overflow-hidden rounded-2xl border border-white/60 bg-white/60 backdrop-blur-md">
                  <div
                    className="relative flex h-24 items-center justify-center"
                    style={{ background: `linear-gradient(135deg, ${study.gradientFrom}, ${study.gradientTo})` }}
                  >
                    <div
                      className="absolute inset-0 opacity-10"
                      style={{
                        backgroundImage:
                          "radial-gradient(circle at 2px 2px, rgba(255,255,255,0.5) 1px, transparent 0)",
                        backgroundSize: "20px 20px",
                      }}
                    />
                    <div className="relative flex h-14 w-14 items-center justify-center rounded-2xl bg-white/20 border border-white/30 backdrop-blur-sm">
                      <span className="text-2xl font-bold text-white">{study.company.charAt(0)}</span>
                    </div>
                  </div>
                  <div className="p-5">
                    <div className="text-base font-semibold text-foreground">{study.company}</div>
                    <div className="mt-1 text-xs text-muted-foreground">{study.industry}</div>
                    <div className="mt-3 flex flex-wrap gap-2">
                      <span className="rounded-full border border-border/40 bg-white/60 px-2.5 py-0.5 text-xs text-muted-foreground">
                        {study.product}
                      </span>
                    </div>
                  </div>
                </div>
              </FadeUp>

              {/* CTA card */}
              <FadeUp delay={0.1}>
                <div className="rounded-2xl bg-(--color-button-primary-bg) p-6 text-center relative overflow-hidden">
                  <div className="absolute -top-8 -right-8 h-28 w-28 rounded-full bg-accent/20 blur-2xl" />
                  <div className="relative z-10">
                    <div className="mb-2 text-sm font-semibold text-white">Want similar results?</div>
                    <p className="mb-5 text-xs text-white/65 leading-relaxed">
                      Deploy Zaby&apos;s autonomous agents and workflows in your organisation today.
                    </p>
                    <Link
                      href="/contact"
                      className="cursor-pointer inline-flex w-full items-center justify-center gap-2 rounded-full bg-accent px-5 py-2.5 text-xs font-semibold text-white shadow-[rgba(232,121,249,0.4)_0px_8px_24px_-8px] transition-opacity hover:opacity-90"
                    >
                      Book a Demo
                      <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </Link>
                    <Link
                      href="/case-studies"
                      className="cursor-pointer mt-2 inline-flex w-full items-center justify-center rounded-full border border-white/20 bg-white/10 px-5 py-2.5 text-xs font-medium text-white/80 transition-colors hover:bg-white/20"
                    >
                      View All Case Studies
                    </Link>
                  </div>
                </div>
              </FadeUp>

              {/* Key metrics recap */}
              <FadeUp delay={0.15}>
                <div className="rounded-2xl border border-white/60 bg-white/60 backdrop-blur-md p-5">
                  <div className="mb-4 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                    Key Metrics
                  </div>
                  <div className="space-y-3">
                    {study.metrics.map((metric) => (
                      <div key={metric.label} className="flex items-center justify-between gap-3">
                        <span className="text-xs text-muted-foreground">{metric.label}</span>
                        <span
                          className="text-sm font-bold"
                          style={{ color: study.gradientFrom }}
                        >
                          {metric.value}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </FadeUp>
            </div>
          </div>
        </div>
      </section>

      {/* ── Related case studies ──────────────────── */}
      {relatedStudies.length > 0 && (
        <section className="border-t border-white/60 bg-white/30 py-16 backdrop-blur-sm md:py-20">
          <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <FadeUp>
              <div className="mb-10 flex items-end justify-between gap-4">
                <div>
                  <h2 className="text-2xl font-bold text-foreground sm:text-3xl">
                    More{" "}
                    <span className="bg-linear-to-br from-accent via-[#c026d3] to-accent-soft bg-clip-text text-transparent">
                      success stories
                    </span>
                  </h2>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Explore how other organisations use Zaby to transform their operations.
                  </p>
                </div>
                <Link
                  href="/case-studies"
                  className="cursor-pointer hidden shrink-0 items-center gap-1.5 text-sm font-medium text-accent/80 hover:text-accent sm:inline-flex"
                >
                  View all
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
              </div>
            </FadeUp>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {relatedStudies.map((related, i) => (
                <FadeUp key={related.id} delay={i * 0.06}>
                  <Link
                    href={`/case-studies/${related.slug}`}
                    className="group cursor-pointer flex flex-col overflow-hidden rounded-2xl border border-white/60 bg-white/60 backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                  >
                    {/* Gradient header */}
                    <div
                      className="relative h-32 overflow-hidden"
                      style={{
                        background: `linear-gradient(135deg, ${related.gradientFrom}, ${related.gradientTo})`,
                      }}
                    >
                      <div
                        className="absolute inset-0 opacity-10"
                        style={{
                          backgroundImage:
                            "radial-gradient(circle at 2px 2px, rgba(255,255,255,0.4) 1px, transparent 0)",
                          backgroundSize: "20px 20px",
                        }}
                      />
                      {/* Two metrics overlay */}
                      <div className="absolute bottom-0 left-0 right-0 flex border-t border-white/15 bg-black/20 backdrop-blur-sm">
                        {related.metrics.slice(0, 2).map((metric, mi) => (
                          <div
                            key={mi}
                            className={`flex-1 px-3 py-2 ${mi === 0 ? "border-r border-white/15" : ""}`}
                          >
                            <div className="text-sm font-bold text-white">{metric.value}</div>
                            <div className="text-xs text-white/65 leading-none mt-0.5">{metric.label}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                    {/* Content */}
                    <div className="flex flex-1 flex-col p-5">
                      <div className="mb-2 flex flex-wrap gap-1.5">
                        <span className="rounded-full border border-border/40 bg-white/60 px-2 py-0.5 text-xs text-muted-foreground">
                          {related.industry}
                        </span>
                        <span className="rounded-full border border-accent/20 bg-accent/5 px-2 py-0.5 text-xs text-accent/80">
                          {related.product}
                        </span>
                      </div>
                      <h3 className="text-sm font-semibold leading-snug text-foreground group-hover:text-accent transition-colors line-clamp-2">
                        {related.headline}
                      </h3>
                    </div>
                  </Link>
                </FadeUp>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── Bottom CTA ────────────────────────────── */}
      <section className="py-20 md:py-28">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <FadeUp>
            <div className="relative overflow-hidden rounded-3xl bg-(--color-button-primary-bg) p-10 md:p-16 text-center">
              <div
                className="absolute inset-0 opacity-10"
                style={{
                  backgroundImage:
                    "radial-gradient(circle at 2px 2px, rgba(255,255,255,0.5) 1px, transparent 0)",
                  backgroundSize: "24px 24px",
                }}
              />
              <div className="absolute -top-20 -left-20 h-72 w-72 rounded-full bg-accent/20 blur-3xl" />
              <div className="absolute -bottom-20 -right-20 h-72 w-72 rounded-full bg-purple-400/15 blur-3xl" />
              <div className="relative z-10">
                <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                  Ready to achieve{" "}
                  <span className="text-accent">these results?</span>
                </h2>
                <p className="mx-auto mt-3 max-w-xl text-sm text-white/65 sm:text-base">
                  Let Zaby&apos;s autonomous AI agents handle your operations — from day one.
                </p>
                <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
                  <Link
                    href="/contact"
                    className="cursor-pointer inline-flex items-center gap-2 rounded-full bg-accent px-8 py-3 text-sm font-semibold text-white shadow-[rgba(232,121,249,0.4)_0px_10px_30px_-10px] transition-opacity hover:opacity-90"
                  >
                    Book a Demo
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </Link>
                  <Link
                    href="/case-studies"
                    className="cursor-pointer inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-8 py-3 text-sm font-medium text-white backdrop-blur-sm transition-colors hover:bg-white/20"
                  >
                    ← Back to Case Studies
                  </Link>
                </div>
              </div>
            </div>
          </FadeUp>
        </div>
      </section>
    </main>
  );
}
