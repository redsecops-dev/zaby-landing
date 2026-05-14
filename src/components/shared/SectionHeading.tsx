import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const headingVariants = cva("", {
  variants: {
    size: {
      sm: "text-2xl sm:text-3xl",
      md: "text-3xl sm:text-4xl",
      lg: "text-4xl sm:text-5xl",
    },
    align: {
      left: "text-left items-start",
      center: "text-center items-center",
      right: "text-right items-end",
    },
  },
  defaultVariants: {
    size: "md",
    align: "center",
  },
});

export interface SectionHeadingProps extends VariantProps<typeof headingVariants> {
  label?: string;
  title: string;
  subtitle?: string;
  gradient?: boolean;
  className?: string;
}

export function SectionHeading({
  label,
  title,
  subtitle,
  gradient = false,
  size,
  align,
  className,
}: SectionHeadingProps) {
  return (
    <div className={cn("flex flex-col gap-3", headingVariants({ align }), className)}>
      {label && (
        <span
          className={cn(
            "inline-block text-xs font-semibold uppercase tracking-widest",
            "text-[var(--color-accent)] px-3 py-1 rounded-full",
            "bg-[var(--color-accent)]/10 w-fit"
          )}
        >
          {label}
        </span>
      )}
      <h2
        className={cn(
          "font-bold leading-tight tracking-tight text-[var(--color-text-primary)]",
          headingVariants({ size }),
          gradient && "gradient-text"
        )}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className={cn(
            "max-w-2xl text-base sm:text-lg leading-relaxed text-[var(--color-text-secondary)]",
            align === "center" && "mx-auto"
          )}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}
