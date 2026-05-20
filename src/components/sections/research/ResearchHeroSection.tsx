import { FadeUp } from "@/components/animations";
import { GradientOrb } from "@/components/shared/GradientOrb";

export function ResearchHeroSection() {
  return (
    <section className="relative overflow-hidden min-h-screen flex flex-col justify-center items-center py-24 md:py-32">
      {/* Background gradient orbs — mirrors reference lavender/purple tones */}
      <GradientOrb
        color="purple"
        size="xl"
        className="absolute -top-32 left-1/2 -translate-x-1/2 opacity-30"
      />
      <GradientOrb
        color="pink"
        size="lg"
        className="absolute top-0 -right-32 opacity-15"
      />
      <GradientOrb
        color="blue"
        size="md"
        className="absolute bottom-0 -left-24 opacity-20"
      />

      {/* Subtle mesh dot pattern */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 2px 2px, #6d28d9 1px, transparent 0)",
          backgroundSize: "32px 32px",
        }}
      />

      <div className="container relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center text-center">
          {/* Badge pill — matches reference dark pill style */}
          <FadeUp>
            <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-(--color-button-primary-bg) px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-white/90">
              <span className="h-1.5 w-1.5 rounded-full bg-accent" />
              Research &amp; Engineering
            </div>
          </FadeUp>

          {/* Main heading */}
          <FadeUp delay={0.06}>
            <h1 className="max-w-4xl text-5xl font-bold tracking-tight text-foreground sm:text-6xl lg:text-7xl">
              Intelligence Built on{" "}
              <span className="bg-linear-to-br from-accent via-[#c026d3] to-accent-soft bg-clip-text text-transparent">
                Rigorous Research
              </span>
            </h1>
          </FadeUp>

          {/* Subtext */}
          <FadeUp delay={0.12}>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground sm:text-xl">
              Five years of engineering research in autonomous execution, persistent memory,
              multimodal systems, and enterprise-grade workflow orchestration — powering the
              Zaby operational AI infrastructure.
            </p>
          </FadeUp>

          {/* Scroll indicator */}
          <FadeUp delay={0.18}>
            <div className="mt-10 flex items-center gap-2 text-xs font-medium uppercase tracking-widest text-muted-foreground/60">
              <div className="h-px w-12 bg-border/60" />
              <span>Core Research Areas Below</span>
              <div className="h-px w-12 bg-border/60" />
            </div>
          </FadeUp>
        </div>
      </div>
    </section>
  );
}
