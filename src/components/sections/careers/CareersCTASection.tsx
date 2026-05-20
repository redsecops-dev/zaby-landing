import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { GradientOrb } from "@/components/shared/GradientOrb";

export function CareersCTASection() {
  return (
    <section className="relative py-24 md:py-32 overflow-hidden">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl bg-(--color-button-primary-bg) border border-white/10 overflow-hidden px-8 py-16 md:px-16 md:py-20 text-center">
          {/* Inner glow */}
          <GradientOrb
            color="purple"
            size="lg"
            className="absolute -top-16 left-1/2 -translate-x-1/2 opacity-20"
          />
          <GradientOrb
            color="pink"
            size="md"
            className="absolute -bottom-16 left-1/4 opacity-12"
          />

          <div className="relative">
            <p className="mb-4 text-xs font-medium uppercase tracking-widest text-accent/80">
              Join the team
            </p>
            <h2 className="mb-6 text-3xl font-semibold leading-tight tracking-tight text-white md:text-4xl lg:text-5xl">
              Build the infrastructure
              <br />
              <span className="bg-linear-to-br from-accent via-[#e879f9] to-accent-soft bg-clip-text text-transparent">
                AI runs on.
              </span>
            </h2>
            <p className="mb-10 mx-auto max-w-lg text-base font-light text-white/60">
              We&apos;re a small, execution-focused team building the operational
              layer for enterprise AI. If you want ownership, impact, and hard
              problems — come build with us.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a
                href="#open-positions"
                className="inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3.5 text-sm font-medium text-white shadow-[rgba(232,121,249,0.4)_0px_10px_30px_-10px] transition-all hover:bg-accent-soft hover:-translate-y-0.5"
              >
                View Open Roles
                <ArrowRight className="w-4 h-4" />
              </a>
              <Link
                href="mailto:careers@zaby.ai"
                className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/8 px-6 py-3.5 text-sm font-medium text-white backdrop-blur-md transition-all hover:bg-white/15 hover:border-white/30"
              >
                Reach Out Directly
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
