import { FadeUp } from "@/components/animations";
import { RESEARCH_STATS } from "./data";

export function ResearchStatsBar() {
  return (
    <section className="border-y border-white/60 bg-white/40 backdrop-blur-sm">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 divide-x divide-white/40 md:grid-cols-4">
          {RESEARCH_STATS.map((stat, i) => (
            <FadeUp key={stat.label} delay={i * 0.07}>
              <div className="flex flex-col items-center py-8 px-4 text-center sm:py-10">
                <div className="text-4xl font-bold tracking-tight sm:text-5xl">
                  <span className="bg-linear-to-br from-accent via-[#c026d3] to-accent-soft bg-clip-text text-transparent">
                    {stat.value}
                  </span>
                </div>
                <div className="mt-1.5 text-sm font-semibold text-foreground">
                  {stat.label}
                </div>
                {stat.description && (
                  <p className="mt-1 hidden text-xs leading-snug text-muted-foreground/70 sm:block">
                    {stat.description}
                  </p>
                )}
              </div>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}
