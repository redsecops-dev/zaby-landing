import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const sectionVariants = cva("relative overflow-hidden", {
  variants: {
    spacing: {
      none: "",
      sm: "py-12 md:py-16",
      md: "py-16 md:py-24",
      lg: "py-24 md:py-32",
    },
    background: {
      white: "bg-white",
      muted: "bg-[var(--color-muted)]",
      surface: "bg-[var(--color-surface-raised)]",
      transparent: "bg-transparent",
    },
  },
  defaultVariants: {
    spacing: "lg",
    background: "white",
  },
});

export interface SectionWrapperProps
  extends React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof sectionVariants> {
  as?: "section" | "div" | "article";
}

export function SectionWrapper({
  as: Tag = "section",
  spacing,
  background,
  className,
  children,
  ...props
}: SectionWrapperProps) {
  return (
    <Tag className={cn(sectionVariants({ spacing, background }), className)} {...props}>
      {children}
    </Tag>
  );
}
