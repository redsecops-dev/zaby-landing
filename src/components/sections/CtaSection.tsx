import { SectionWrapper, Container } from "@/components/layout";
import { GradientOrb } from "@/components/shared";
import { FadeUp } from "@/components/animations";

export function CtaSection() {
  return (
    <SectionWrapper spacing="lg" background="white" className="relative overflow-hidden">
      <GradientOrb color="primary" size="xl" className="top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />

      <Container size="sm" className="relative z-10 text-center">
        <FadeUp>
          <div className="flex flex-col items-center gap-8">
            <div className="flex flex-col gap-4">
              <span className="inline-block text-xs font-semibold uppercase tracking-widest text-accent">
                Get started today
              </span>
              <h2 className="text-4xl sm:text-5xl font-extrabold text-primary leading-tight">
                Your team deserves a{" "}
                <span className="gradient-text-orange">smarter workspace</span>
              </h2>
              <p className="text-text-secondary text-lg max-w-md mx-auto leading-relaxed">
                Join thousands of teams already shipping faster with Zaby. Free to start — no credit card required.
              </p>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-4">
              <a
                href="https://platform.zaby.io/tenant/signup"
                className="rounded-full bg-(--color-button-primary-bg) px-10 py-3.5 text-sm font-semibold text-white shadow-[rgba(76,29,149,0.5)_0px_10px_30px_-10px] transition-colors hover:bg-(--color-button-primary-hover) cursor-pointer"
              >
                Start for free
              </a>
              <a
                href="https://platform.zaby.io/tenant/signup"
                className="rounded-full border border-(--color-button-secondary-border) bg-(--color-button-secondary-bg) px-10 py-3.5 text-sm font-semibold text-(--color-button-secondary-text) transition-colors hover:bg-white cursor-pointer"
              >
                Book a demo
              </a>
            </div>

            <p className="text-xs text-muted-fg">
              14-day Pro trial &middot; No credit card &middot; Cancel anytime
            </p>
          </div>
        </FadeUp>
      </Container>
    </SectionWrapper>
  );
}
