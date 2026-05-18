export interface ResearchStat {
  value: string;
  label: string;
  description?: string;
}

export interface ResearchArea {
  id: string;
  title: string;
  description: string;
  icon: string;
  tags: string[];
}

export interface ResearchInsight {
  id: string;
  category: string;
  title: string;
  summary: string;
  findings: string[];
  gradientFrom: string;
  gradientTo: string;
}

export interface EngineeringPrinciple {
  id: string;
  title: string;
  description: string;
  icon: string;
}
