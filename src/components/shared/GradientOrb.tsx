import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const orbVariants = cva("pointer-events-none absolute rounded-full blur-[var(--blur-lg)]", {
  variants: {
    color: {
      purple: "bg-[var(--color-gradient-purple-from)]",
      orange: "bg-[var(--color-gradient-orange-from)]",
      primary: "bg-[var(--color-gradient-orange-from)]",
      blue: "bg-[var(--color-gradient-blue-from)]",
      pink: "bg-[var(--color-gradient-pink-from)]",
    },
    size: {
      sm: "h-32 w-32",
      md: "h-64 w-64",
      lg: "h-96 w-96",
      xl: "h-[30rem] w-[30rem]",
    },
  },
  defaultVariants: {
    color: "purple",
    size: "lg",
  },
});

export interface GradientOrbProps extends VariantProps<typeof orbVariants> {
  className?: string;
}

export function GradientOrb({ color, size, className }: GradientOrbProps) {
  return (
    <div
      className={cn(orbVariants({ color, size }), className)}
      aria-hidden="true"
      role="presentation"
    />
  );
}
