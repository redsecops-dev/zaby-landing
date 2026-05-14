import { GlassPanel } from "@/components/shared";
import { Stagger } from "@/components/animations";
import { SparklesIcon, ZapIcon, ShieldCheckIcon } from "@/components/shared/icons";

const BENTO_ITEMS = [
  {
    icon: <SparklesIcon className="text-[var(--color-accent)]" size={22} />,
    title: "AI Drafts",
    description: "Generate documents in seconds with context-aware AI.",
  },
  {
    icon: <ZapIcon className="text-[var(--color-accent)]" size={22} />,
    title: "Instant Search",
    description: "Search across your entire workspace in milliseconds.",
  },
  {
    icon: <ShieldCheckIcon className="text-[var(--color-accent)]" size={22} />,
    title: "Zero-trust Security",
    description: "Enterprise-grade encryption at every layer.",
  },
];

export interface HeroBentoGridProps {
  className?: string;
}

export function HeroBentoGrid({ className }: HeroBentoGridProps) {
  return (
    <Stagger className={`grid grid-cols-1 gap-4 sm:grid-cols-3 ${className ?? ""}`}>
      {BENTO_ITEMS.map((item) => (
        <GlassPanel key={item.title} padding="md" className="flex flex-col gap-3">
          {item.icon}
          <p className="font-semibold text-[var(--color-primary)] text-sm">{item.title}</p>
          <p className="text-[var(--color-muted-foreground)] text-xs leading-relaxed">{item.description}</p>
        </GlassPanel>
      ))}
    </Stagger>
  );
}
