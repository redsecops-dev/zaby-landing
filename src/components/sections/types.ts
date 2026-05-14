import type { ReactNode } from "react";

export interface SectionProps {
  className?: string;
}

export interface FeatureItem {
  icon: ReactNode;
  title: string;
  description: string;
}

export interface PricingPlan {
  name: string;
  description: string;
  monthlyPrice: number | null;
  annualPrice: number | null;
  ctaLabel: string;
  highlighted?: boolean;
  features: string[];
}

export interface TestimonialItem {
  quote: string;
  author: string;
  role: string;
  company: string;
  avatarInitials: string;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface WorkflowStep {
  step: number;
  title: string;
  description: string;
}
