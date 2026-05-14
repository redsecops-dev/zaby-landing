import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const bgVariants = cva("pointer-events-none absolute inset-0", {
  variants: {
    variant: {
      dots: "",
      lines: "",
      cross: "",
    },
    opacity: {
      light: "opacity-30",
      medium: "opacity-50",
      strong: "opacity-70",
    },
  },
  defaultVariants: {
    variant: "dots",
    opacity: "light",
  },
});

const PATTERNS: Record<string, string> = {
  dots: `<svg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'><path d='M20 20.5V18H17.5V20.5H20ZM20 20.5V23H22.5V20.5H20Z' fill='%23CBD5E1' fill-opacity='0.6' fill-rule='evenodd'/></svg>`,
  lines: `<svg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'><line x1='0' y1='20' x2='40' y2='20' stroke='%23E2E8F0' stroke-width='1'/></svg>`,
  cross: `<svg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'><line x1='0' y1='20' x2='40' y2='20' stroke='%23E2E8F0' stroke-width='0.8'/><line x1='20' y1='0' x2='20' y2='40' stroke='%23E2E8F0' stroke-width='0.8'/></svg>`,
};

export interface GridBackgroundProps extends VariantProps<typeof bgVariants> {
  className?: string;
}

export function GridBackground({
  variant = "dots",
  opacity,
  className,
}: GridBackgroundProps) {
  const safeVariant = variant ?? "dots";
  const svgData = encodeURIComponent(PATTERNS[safeVariant] ?? PATTERNS.dots);

  return (
    <div
      className={cn(bgVariants({ variant, opacity }), className)}
      style={{
        backgroundImage: `url("data:image/svg+xml,${svgData}")`,
        backgroundRepeat: "repeat",
        backgroundSize: "40px 40px",
      }}
      aria-hidden="true"
      role="presentation"
    />
  );
}
