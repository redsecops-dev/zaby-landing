import {
  Brain,
  Cpu,
  Bot,
  Scan,
  Wand2,
  type LucideProps,
} from "lucide-react";

export interface AiIconProps extends Omit<LucideProps, "ref"> {
  size?: number;
  strokeWidth?: number;
  className?: string;
}

export function BrainIcon({ size = 20, strokeWidth = 1.5, ...props }: AiIconProps) {
  return <Brain size={size} strokeWidth={strokeWidth} {...props} />;
}

export function CpuIcon({ size = 20, strokeWidth = 1.5, ...props }: AiIconProps) {
  return <Cpu size={size} strokeWidth={strokeWidth} {...props} />;
}

export function BotIcon({ size = 20, strokeWidth = 1.5, ...props }: AiIconProps) {
  return <Bot size={size} strokeWidth={strokeWidth} {...props} />;
}

export function ScanIcon({ size = 20, strokeWidth = 1.5, ...props }: AiIconProps) {
  return <Scan size={size} strokeWidth={strokeWidth} {...props} />;
}

export function WandIcon({ size = 20, strokeWidth = 1.5, ...props }: AiIconProps) {
  return <Wand2 size={size} strokeWidth={strokeWidth} {...props} />;
}
