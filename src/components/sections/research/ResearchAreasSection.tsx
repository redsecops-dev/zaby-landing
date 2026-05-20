import { FadeUp } from "@/components/animations";
import { ScrollReveal, Stagger } from "@/components/animations";
import { RESEARCH_AREAS } from "./data";
import * as LucideIcons from "lucide-react";

export function ResearchAreasSection() {
  return (
    <section className="py-20 md:py-28">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <FadeUp>
          <div className="mb-14 text-center">
            <div className="mb-3 inline-flex items-center gap-1.5 rounded-full border border-accent/20 bg-accent/5 px-3 py-1 text-xs font-medium text-accent/80">
              Core Research Areas
            </div>
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Six Pillars of{" "}
              <span className="bg-linear-to-br from-accent via-[#c026d3] to-accent-soft bg-clip-text text-transparent">
                Platform Intelligence
              </span>
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-base text-muted-foreground sm:text-lg">
              Zaby&apos;s platform capabilities are grounded in sustained engineering research
              across six interconnected domains — each directly informing production infrastructure.
            </p>
          </div>
        </FadeUp>

        {/* 6-card grid — 2 cols on md, 3 cols on lg */}
        <ScrollReveal>
          <Stagger staggerDelay={0.06}>
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {RESEARCH_AREAS.map((area) => (
                <div
                  key={area.id}
                  className="group relative flex flex-col overflow-hidden rounded-2xl border border-white/60 bg-white/60 p-6 backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-accent/20"
                >
                  {/* Accent glow on hover */}
                  <div className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100 bg-linear-to-br from-accent/5 to-transparent" />

                  {/* Icon */}
                  <div className="relative mb-4 flex h-12 w-12 items-center justify-center rounded-xl border border-white/60 bg-white/80 text-foreground">
                    {(() => {
                      const Icon = LucideIcons[area.icon as keyof typeof LucideIcons] as React.ComponentType<{ className?: string }>;
                      return Icon ? <Icon className="w-6 h-6" /> : null;
                    })()}
                  </div>

                  {/* Title */}
                  <h3 className="relative text-base font-semibold text-foreground group-hover:text-accent transition-colors duration-200">
                    {area.title}
                  </h3>

                  {/* Description */}
                  <p className="relative mt-2 text-sm leading-relaxed text-muted-foreground flex-1">
                    {area.description}
                  </p>

                  {/* Tags */}
                  <div className="relative mt-4 flex flex-wrap gap-1.5">
                    {area.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full border border-border/40 bg-white/60 px-2.5 py-0.5 text-xs text-muted-foreground"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </Stagger>
        </ScrollReveal>
      </div>
    </section>
  );
}
