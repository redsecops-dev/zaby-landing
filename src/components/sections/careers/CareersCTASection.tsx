import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SectionWrapper, Container } from "@/components/layout";
import { GradientOrb } from "@/components/shared";
import { ScrollReveal } from "@/components/animations";

export function CareersCTASection() {
  return (
    <SectionWrapper spacing="lg" background="transparent">
      <Container size="lg">
        <div className="relative rounded-3xl bg-(--color-button-primary-bg) border border-white/10 overflow-hidden px-8 py-16 md:px-16 md:py-20 text-center">
          {/* Inner glow */}
          <GradientOrb
            color="purple"
            size="lg"
            className="absolute -top-16 left-1/2 -translate-x-1/2 opacity-20 pointer-events-none"
          />
          <GradientOrb
            color="pink"
            size="md"
            className="absolute -bottom-16 left-1/4 opacity-[0.12] pointer-events-none"
          />

          <div className="relative">
            <ScrollReveal direction="up" delay={0.05}>
              <p className="mb-4 text-xs font-medium uppercase tracking-widest text-[var(--color-accent)]/80">
                Join the team
              </p>
            </ScrollReveal>
            <ScrollReveal direction="up" delay={0.1}>
              <h2 className="mb-6 text-3xl font-extrabold leading-tight tracking-tight text-white md:text-4xl lg:text-5xl font-display">
                Build the infrastructure
                <br />
                <span className="bg-linear-to-br from-accent via-[#e879f9] to-accent-soft bg-clip-text text-transparent">
                  AI runs on.
                </span>
              </h2>
            </ScrollReveal>
            <ScrollReveal direction="up" delay={0.15}>
              <p className="mb-10 mx-auto max-w-lg text-base font-light text-white/60">
                We&apos;re a small, execution-focused team building the operational
                layer for enterprise AI. If you want ownership, impact, and hard
                problems — come build with us.
              </p>
            </ScrollReveal>
            <ScrollReveal direction="up" delay={0.2}>
              <div className="flex flex-wrap justify-center gap-4">
                <a
                  href="#open-positions"
                  className="inline-flex items-center gap-2 rounded-full bg-[var(--color-accent)] px-6 py-3.5 text-sm font-medium text-white shadow-[rgba(232,121,249,0.4)_0px_10px_30px_-10px] transition-all hover:bg-[var(--color-accent-soft)] hover:-translate-y-0.5"
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
            </ScrollReveal>
          </div>
        </div>
      </Container>
    </SectionWrapper>
  );
}
