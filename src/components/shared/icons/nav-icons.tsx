import {
  Menu,
  X,
  ChevronDown,
  ExternalLink,
  type LucideProps,
} from "lucide-react";

export interface NavIconProps extends Omit<LucideProps, "ref"> {
  size?: number;
  strokeWidth?: number;
  className?: string;
}

export function MenuIcon({ size = 20, strokeWidth = 1.5, ...props }: NavIconProps) {
  return <Menu size={size} strokeWidth={strokeWidth} {...props} />;
}

export function XIcon({ size = 20, strokeWidth = 1.5, ...props }: NavIconProps) {
  return <X size={size} strokeWidth={strokeWidth} {...props} />;
}

export function ChevronDownIcon({ size = 20, strokeWidth = 1.5, ...props }: NavIconProps) {
  return <ChevronDown size={size} strokeWidth={strokeWidth} {...props} />;
}

export function ExternalLinkIcon({ size = 20, strokeWidth = 1.5, ...props }: NavIconProps) {
  return <ExternalLink size={size} strokeWidth={strokeWidth} {...props} />;
}
