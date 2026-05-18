import { FadeUp } from "@/components/animations";
import { IMPACT_STATS } from "./data";

export function CaseStudiesImpactBar() {
  return (
    <section className="relative border-y border-white/60 bg-white/40 backdrop-blur-md py-10">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <FadeUp>
          <div className="grid grid-cols-2 gap-6 sm:grid-cols-4">
            {IMPACT_STATS.map((stat, i) => (
              <div
                key={i}
                className="flex flex-col items-center gap-1 text-center"
              >
                <span className="text-3xl font-bold text-accent sm:text-4xl">
                  {stat.value}
                </span>
                <span className="text-xs text-muted-foreground sm:text-sm">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </FadeUp>
      </div>
    </section>
  );
}
