import Link from "next/link";
import { FadeUp } from "@/components/animations";

export function ResearchCTASection() {
  return (
    <section className="border-t border-white/60 py-20 md:py-28">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <FadeUp>
          <div className="relative overflow-hidden rounded-3xl bg-(--color-button-primary-bg) p-10 text-center md:p-16">
            {/* Background dot pattern */}
            <div
              className="absolute inset-0 opacity-10"
              style={{
                backgroundImage:
                  "radial-gradient(circle at 2px 2px, rgba(255,255,255,0.5) 1px, transparent 0)",
                backgroundSize: "24px 24px",
              }}
            />
            {/* Accent glow orbs */}
            <div className="absolute -top-20 -left-20 h-72 w-72 rounded-full bg-accent/20 blur-3xl" />
            <div className="absolute -bottom-20 -right-20 h-72 w-72 rounded-full bg-purple-400/15 blur-3xl" />

            <div className="relative z-10">
              {/* Badge */}
              <div className="mb-4 inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-white/10 px-3.5 py-1 text-xs font-medium text-white/80">
                <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                Production-Ready Platform
              </div>

              <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                Explore the Platform Built on{" "}
                <span className="text-accent">This Research</span>
              </h2>
              <p className="mx-auto mt-3 max-w-xl text-sm text-white/65 sm:text-base">
                Deploy Zaby&apos;s autonomous agents, agentic workflows, and persistent memory
                systems — production infrastructure grounded in five years of engineering research.
              </p>

              {/* Feature badges */}
              <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
                {[
                  "Agent Squad",
                  "Open Agents",
                  "Agentic Workflows",
                  "Agent Memory",
                  "AI SaaS Workspace",
                ].map((feature) => (
                  <span
                    key={feature}
                    className="rounded-full border border-white/20 bg-white/10 px-3 py-0.5 text-xs font-medium text-white/70"
                  >
                    {feature}
                  </span>
                ))}
              </div>

              {/* CTAs */}
              <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
                <Link
                  href="/contact"
                  className="cursor-pointer inline-flex items-center gap-2 rounded-full bg-accent px-8 py-3 text-sm font-semibold text-white transition-opacity hover:opacity-90"
                >
                  Book a Demo
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
                <Link
                  href="/product"
                  className="cursor-pointer inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-8 py-3 text-sm font-medium text-white backdrop-blur-sm transition-colors hover:bg-white/20"
                >
                  Explore the Platform
                </Link>
              </div>
            </div>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}
