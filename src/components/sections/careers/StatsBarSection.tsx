import { STATS } from "./data";

export function StatsBarSection() {
  return (
    <section className="relative border-y border-white/60 bg-white/40 backdrop-blur-md">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 divide-x divide-white/50 md:grid-cols-4">
          {STATS.map((stat) => (
            <div
              key={stat.label}
              className="flex flex-col items-center gap-1 py-8 px-4 text-center"
            >
              <span className="text-3xl font-semibold tracking-tight text-text-primary">
                {stat.value}
              </span>
              <span className="text-xs font-medium uppercase tracking-wider text-text-secondary">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
