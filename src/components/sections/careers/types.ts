export interface JobOpening {
  id: string;
  title: string;
  department: string;
  location: string;
  type: "Full-time" | "Part-time" | "Contract";
  description: string;
  responsibilities?: string[];
  requirements?: string[];
  bonusPoints?: string[];
}

export interface Value {
  key: string;
  label: string;
  icon: string;
  description: string;
}

export interface Perk {
  icon: string;
  title: string;
  description: string;
}
