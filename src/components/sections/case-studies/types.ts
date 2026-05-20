export interface CaseStudyMetric {
  value: string;
  label: string;
}

export interface CaseStudy {
  id: string;
  slug: string;
  company: string;
  industry: string;
  product: string;
  headline: string;
  challenge: string;
  solution: string;
  metrics: CaseStudyMetric[];
  gradientFrom: string;
  gradientTo: string;
  icon: string;
  featured?: boolean;
  quote?: string;
  quoteAuthor?: string;
  quoteRole?: string;
}

export type IndustryFilter =
  | "All"
  | "Enterprise Operations"
  | "Customer Experience"
  | "HR & Recruitment"
  | "Engineering & QA"
  | "Finance & Compliance"
  | "Healthcare"
  | "Logistics"
  | "Media & Content";
