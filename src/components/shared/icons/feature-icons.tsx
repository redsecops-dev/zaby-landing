import {
  Sparkles,
  Zap,
  ShieldCheck,
  BarChart3,
  Network,
  Layers,
  type LucideProps,
} from "lucide-react";

export interface IconProps extends Omit<LucideProps, "ref"> {
  size?: number;
  strokeWidth?: number;
  className?: string;
}

export function SparklesIcon({ size = 20, strokeWidth = 1.5, ...props }: IconProps) {
  return <Sparkles size={size} strokeWidth={strokeWidth} {...props} />;
}

export function ZapIcon({ size = 20, strokeWidth = 1.5, ...props }: IconProps) {
  return <Zap size={size} strokeWidth={strokeWidth} {...props} />;
}

export function ShieldCheckIcon({ size = 20, strokeWidth = 1.5, ...props }: IconProps) {
  return <ShieldCheck size={size} strokeWidth={strokeWidth} {...props} />;
}

export function BarChart3Icon({ size = 20, strokeWidth = 1.5, ...props }: IconProps) {
  return <BarChart3 size={size} strokeWidth={strokeWidth} {...props} />;
}

export function NetworkIcon({ size = 20, strokeWidth = 1.5, ...props }: IconProps) {
  return <Network size={size} strokeWidth={strokeWidth} {...props} />;
}

export function LayersIcon({ size = 20, strokeWidth = 1.5, ...props }: IconProps) {
  return <Layers size={size} strokeWidth={strokeWidth} {...props} />;
}
