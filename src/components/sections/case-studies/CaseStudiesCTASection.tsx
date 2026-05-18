import { FadeUp } from "@/components/animations";
import Link from "next/link";

export function CaseStudiesCTASection() {
  return (
    <section className="relative py-20 md:py-28">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <FadeUp>
          <div className="relative overflow-hidden rounded-3xl bg-(--color-button-primary-bg) p-10 md:p-16 text-center">
            {/* Dot pattern overlay */}
            <div
              className="absolute inset-0 opacity-10"
              style={{
                backgroundImage:
                  "radial-gradient(circle at 2px 2px, rgba(255,255,255,0.5) 1px, transparent 0)",
                backgroundSize: "24px 24px",
              }}
            />
            {/* Glow blobs */}
            <div className="absolute -top-20 -left-20 h-72 w-72 rounded-full bg-accent/20 blur-3xl" />
            <div className="absolute -bottom-20 -right-20 h-72 w-72 rounded-full bg-purple-400/15 blur-3xl" />

            <div className="relative z-10">
              <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-medium tracking-wide text-white/80 uppercase mb-6">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-accent" />
                Start Your Journey
              </span>

              <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
                Ready to write your own{" "}
                <span className="text-accent">success story?</span>
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-sm text-white/70 sm:text-base">
                Join 200+ enterprises that deploy Zaby&apos;s autonomous AI agents,
                agentic workflows, and AI workspaces to eliminate operational overhead
                and scale without limits.
              </p>

              <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
                <Link
                  href="/contact"
                  className="cursor-pointer inline-flex items-center gap-2 rounded-full bg-accent px-8 py-3 text-sm font-semibold text-white shadow-[rgba(232,121,249,0.4)_0px_10px_30px_-10px] transition-all hover:opacity-90"
                >
                  Book a Demo
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
                <Link
                  href="/product"
                  className="cursor-pointer inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-8 py-3 text-sm font-medium text-white backdrop-blur-sm transition-all hover:bg-white/20"
                >
                  Explore the Platform
                </Link>
              </div>

              {/* Social proof strip */}
              <div className="mt-10 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 border-t border-white/15 pt-8">
                {[
                  "200+ Enterprise Deployments",
                  "SOC 2 Type II Certified",
                  "99.9% Uptime SLA",
                ].map((item) => (
                  <div key={item} className="flex items-center gap-2 text-xs text-white/60">
                    <svg className="h-3.5 w-3.5 text-accent" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}
