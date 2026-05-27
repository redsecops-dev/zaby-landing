import { cn } from "@/lib/utils";

interface RevealWordProps {
  children: string;
  className?: string;
}

export function RevealWord({ children, className = "" }: RevealWordProps) {
  return (
    <span className="inline-block overflow-hidden align-top">
      <span
        className={cn(
          "reveal-word inline-block translate-y-full motion-reduce:translate-y-0",
          className
        )}
      >
        {children}
      </span>
    </span>
  );
}

interface HeroHeadingProps {
  title: React.ReactNode;
  subtitle?: string;
  className?: string;
}

export function HeroHeading({ title, subtitle, className }: HeroHeadingProps) {
  return (
    <div className={cn("flex flex-col items-center lg:items-start", className)}>
      <h1
        className={cn(
          "masked-reveal-title mb-5 text-[2.15rem] font-semibold leading-[1.1] tracking-tight text-[var(--color-text-primary)] drop-shadow-2xl text-balance sm:text-5xl md:mb-8 md:text-7xl lg:text-8xl"
        )}
      >
        {title}
      </h1>
      {subtitle && (
        <p className="mb-7 max-w-xl px-1 text-[0.98rem] font-light leading-relaxed text-[var(--color-text-secondary)] text-balance md:mb-12 md:max-w-2xl md:px-0 md:text-lg lg:text-xl">
          {subtitle}
        </p>
      )}
    </div>
  );
}
