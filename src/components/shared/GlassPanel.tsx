import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const panelVariants = cva("glass-panel", {
  variants: {
    padding: {
      none: "",
      sm: "p-4",
      md: "p-6",
      lg: "p-8",
    },
  },
  defaultVariants: {
    padding: "md",
  },
});

export interface GlassPanelProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof panelVariants> {}

export function GlassPanel({ padding, className, children, ...props }: GlassPanelProps) {
  return (
    <div className={cn(panelVariants({ padding }), className)} {...props}>
      {children}
    </div>
  );
}
