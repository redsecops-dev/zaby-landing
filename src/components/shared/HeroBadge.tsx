import { Icon } from "@iconify/react";
import { cn } from "@/lib/utils";

interface HeroBadgeProps {
  text: string;
  icon?: string;
  className?: string;
  onClick?: () => void;
}

export function HeroBadge({ text, icon, className, onClick }: HeroBadgeProps) {
  return (
    <div
      onClick={onClick}
      className={cn(
        "group mb-5 inline-flex cursor-pointer items-center gap-2 rounded-full border border-[var(--color-border-strong)]/30 bg-white/60 px-3 py-1 backdrop-blur-md transition-colors hover:bg-white/80 md:mb-8",
        className
      )}
    >
      <span className="text-xs font-medium tracking-wide text-[var(--color-accent)]/90">
        {text}
      </span>
      {icon && (
        <Icon
          icon={icon}
          width={12}
          height={12}
          className="text-[var(--color-text-secondary)] transition-transform group-hover:translate-x-0.5"
        />
      )}
    </div>
  );
}
