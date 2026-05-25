export interface AgentCardData {
  id: string;
  badge: string;
  accentColor: string;
  heading: string[];
  description: string;
  features: {
    icon: string;
    label: string;
  }[];
  stats: {
    label: string;
    value: string;
  }[];
  cta: string;
  ctaSecondary: string;
}

export const agentData: AgentCardData[] = [
  {
    id: "maya",
    badge: "MARKETING LEAD",
    accentColor: "#0ea5e9",
    heading: ["Maya", "Chen"],
    description:
      "Orchestrates cross-functional product launches by translating briefs into execution plans across brand, content, and growth teams.",
    features: [
      { icon: "solar:chart-2-linear", label: "Campaign planning" },
      { icon: "solar:notes-linear", label: "Brief synthesis" },
      { icon: "solar:share-circle-linear", label: "Channel strategy" },
      { icon: "solar:route-linear", label: "Priority routing" },
    ],
    stats: [
      { label: "RESPONSE", value: "1.8s avg" },
      { label: "COMPLETED", value: "3.2K" },
      { label: "STATUS", value: "AVAILABLE" },
    ],
    cta: "Explore Marketing →",
    ctaSecondary: "Deploy Campaign",
  },
  {
    id: "alex",
    badge: "DEVOPS ENGINEER",
    accentColor: "#10b981",
    heading: ["Alex", "Rivera"],
    description:
      "Deploys cloud resources, orchestrates container workloads, and maintains continuous delivery pipelines with robust observability.",
    features: [
      { icon: "solar:server-bold-duotone", label: "Infrastructure as Code" },
      { icon: "solar:cpu-bolt-linear", label: "Kubernetes orchestration" },
      { icon: "solar:pulse-2-linear", label: "CI/CD automation" },
      { icon: "solar:shield-network-linear", label: "Security & compliance" },
    ],
    stats: [
      { label: "RESPONSE", value: "1.5s avg" },
      { label: "COMPLETED", value: "2.4K" },
      { label: "STATUS", value: "ONLINE" },
    ],
    cta: "Explore DevOps →",
    ctaSecondary: "View Pipeline",
  },
  {
    id: "sasha",
    badge: "RELEASE MANAGER",
    accentColor: "#7c3aed",
    heading: ["Sasha", "Kumar"],
    description:
      "Coordinates product releases across engineering, QA, and stakeholders with automated rollout plans and changelog generation.",
    features: [
      { icon: "solar:rocket-bold-duotone", label: "Release orchestration" },
      { icon: "solar:calendar-mark-linear", label: "Sprint alignment" },
      { icon: "solar:flag-linear", label: "Feature flagging" },
      { icon: "solar:clipboard-check-linear", label: "Rollback automation" },
    ],
    stats: [
      { label: "RESPONSE", value: "2.1s avg" },
      { label: "RELEASES", value: "890" },
      { label: "STATUS", value: "ACTIVE" },
    ],
    cta: "Explore Releases →",
    ctaSecondary: "Deploy Now",
  },
  {
    id: "jordan",
    badge: "LEGAL COUNSEL",
    accentColor: "#f59e0b",
    heading: ["Jordan", "Lee"],
    description:
      "Automates contract review, compliance audits, and regulatory monitoring with multi-jurisdictional awareness and risk scoring.",
    features: [
      { icon: "solar:document-text-bold-duotone", label: "Contract review" },
      { icon: "solar:scales-linear", label: "Regulatory monitoring" },
      { icon: "solar:lock-password-linear", label: "Data privacy" },
      { icon: "solar:danger-triangle-linear", label: "Risk assessment" },
    ],
    stats: [
      { label: "RESPONSE", value: "2.4s avg" },
      { label: "REVIEWED", value: "1.8K" },
      { label: "STATUS", value: "SCANNING" },
    ],
    cta: "Explore Legal →",
    ctaSecondary: "Run Audit",
  },
  {
    id: "priya",
    badge: "QA ENGINEER",
    accentColor: "#ec4899",
    heading: ["Priya", "Nair"],
    description:
      "Generates comprehensive test suites, manages regression coverage, and integrates automated testing into CI pipelines.",
    features: [
      { icon: "solar:test-tube-bold-duotone", label: "Test generation" },
      { icon: "solar:bug-linear", label: "Bug triage" },
      { icon: "solar:graph-up-linear", label: "Coverage analytics" },
      { icon: "solar:refresh-circle-linear", label: "Regression tracking" },
    ],
    stats: [
      { label: "RESPONSE", value: "1.3s avg" },
      { label: "TESTS RUN", value: "42K" },
      { label: "STATUS", value: "TESTING" },
    ],
    cta: "Explore QA →",
    ctaSecondary: "Run Suite",
  },
  {
    id: "sam",
    badge: "CONTENT STRATEGIST",
    accentColor: "#6366f1",
    heading: ["Sam", "Okafor"],
    description:
      "Produces on-brand content across channels, manages editorial calendars, and optimizes for SEO with AI-driven suggestions.",
    features: [
      { icon: "solar:pen-new-square-bold-duotone", label: "Content generation" },
      { icon: "solar:calendar-linear", label: "Editorial calendar" },
      { icon: "solar:magnifer-linear", label: "SEO optimization" },
      { icon: "solar:chat-round-dots-linear", label: "Brand voice" },
    ],
    stats: [
      { label: "RESPONSE", value: "1.6s avg" },
      { label: "PUBLISHED", value: "5.1K" },
      { label: "STATUS", value: "DRAFTING" },
    ],
    cta: "Explore Content →",
    ctaSecondary: "Generate",
  },
];