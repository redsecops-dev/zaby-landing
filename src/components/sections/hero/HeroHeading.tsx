import Link from "next/link";
import { FadeUp } from "@/components/animations";
import { siteConfig } from "@/config/site";

export interface HeroHeadingProps {
  className?: string;
}

export function HeroHeading({ className }: HeroHeadingProps) {
  return (
    <FadeUp className={className}>
      <div className="flex flex-col items-center text-center gap-6">
        <span className="inline-flex items-center gap-2 rounded-full border border-[var(--color-border)] bg-[var(--color-surface)] px-4 py-1.5 text-xs font-semibold text-[var(--color-accent)] tracking-wide uppercase">
          ✦ Introducing {siteConfig.name}
        </span>

        <h1 className="display-heading text-[var(--color-primary)] max-w-3xl">
          Your AI-Powered{" "}
          <span className="gradient-text-primary">Workspace</span>
          {" "}for Every Team
        </h1>

        <p className="text-lg text-[var(--color-muted-foreground)] max-w-xl leading-relaxed">
          Zaby brings together documents, code, chat, and AI in one seamless workspace — built for speed, built for teams.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4">
          <Link
            href="#features"
            className="rounded-full bg-[var(--color-accent)] px-8 py-3 text-sm font-semibold text-white shadow-[var(--shadow-glow-accent)] hover:opacity-90 transition-opacity"
          >
            Get started free
          </Link>
          <Link
            href="#workflow"
            className="rounded-full border border-[var(--color-border)] px-8 py-3 text-sm font-semibold text-[var(--color-primary)] hover:bg-[var(--color-surface)] transition-colors"
          >
            See how it works
          </Link>
        </div>
      </div>
    </FadeUp>
  );
}
