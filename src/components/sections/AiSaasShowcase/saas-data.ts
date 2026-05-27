export interface SaasCardData {
  id: string;
  badge: string;
  accentColor: string;
  colorName: "purple" | "blue" | "orange" | "primary" | "pink";
  heading: string[];
  description: string;
  features: { icon: string; label: string }[];
  stats: { label: string; value: string }[];
  cta: string;
  ctaSecondary: string;
}

export const saasCardData: SaasCardData[] = [
  {
    id: "assessments",
    badge: "AI ASSESSMENTS",
    accentColor: "#7c3aed",
    colorName: "purple",
    heading: ["AI", "Assessments"],
    description: "Automated candidate screening and evaluation with adaptive AI-generated questions and grading.",
    features: [
      { icon: "solar:widget-bold-duotone", label: "Adaptive questioning" },
      { icon: "solar:tuning-square-2-linear", label: "Skill-level calibration" },
      { icon: "solar:shield-warning-linear", label: "Anti-cheating engine" },
      { icon: "solar:document-text-linear", label: "Detailed scoring reports" },
    ],
    stats: [
      { label: "ACCURACY", value: "94.2%" },
      { label: "QUESTIONS", value: "50K+" },
      { label: "STATUS", value: "ACTIVE" },
    ],
    cta: "Explore Assessments →",
    ctaSecondary: "Try Demo",
  },
  {
    id: "interviews",
    badge: "MOCK INTERVIEWS",
    accentColor: "#0ea5e9",
    colorName: "blue",
    heading: ["Mock", "Interviews"],
    description: "Practice sessions with intelligent AI feedback, real-time coaching, and performance analysis.",
    features: [
      { icon: "solar:chat-round-video-linear", label: "Real-time AI voice avatar" },
      { icon: "solar:dialog-linear", label: "Contextual conversation" },
      { icon: "solar:bill-list-linear", label: "Instant feedback scorecard" },
      { icon: "solar:users-group-two-rounded-linear", label: "HR system integration" },
    ],
    stats: [
      { label: "COMPLETED", value: "12K+" },
      { label: "LATENCY", value: "1.2s avg" },
      { label: "STATUS", value: "AVAILABLE" },
    ],
    cta: "Inspect Interviews →",
    ctaSecondary: "Launch Demo",
  },
  {
    id: "analytics",
    badge: "SKILL ANALYTICS",
    accentColor: "#f59e0b",
    colorName: "orange",
    heading: ["Skill", "Analytics"],
    description: "Deep insight into workforce capability gaps with predictive modeling and growth tracking.",
    features: [
      { icon: "solar:chart-2-bold-duotone", label: "Skill gap analysis" },
      { icon: "solar:graph-up-linear", label: "Growth trajectory" },
      { icon: "solar:radar-2-linear", label: "Competency radar" },
      { icon: "solar:ranking-linear", label: "Team benchmarking" },
    ],
    stats: [
      { label: "INSIGHTS", value: "1.2M+" },
      { label: "MODELS", value: "24" },
      { label: "STATUS", value: "ACTIVE" },
    ],
    cta: "View Analytics →",
    ctaSecondary: "See Report",
  },
  {
    id: "question-bank",
    badge: "AUTO QUESTION BANK",
    accentColor: "#10b981",
    colorName: "primary",
    heading: ["Auto", "Question Bank"],
    description: "AI-generated assessment libraries with domain-specific questions, difficulty tuning, and version control.",
    features: [
      { icon: "solar:library-bold-duotone", label: "Domain-specific generation" },
      { icon: "solar:slider-vertical-linear", label: "Difficulty calibration" },
      { icon: "solar:refresh-circle-linear", label: "Auto-refresh cycles" },
      { icon: "solar:lock-keyhole-linear", label: "Version control" },
    ],
    stats: [
      { label: "QUESTIONS", value: "200K+" },
      { label: "DOMAINS", value: "48" },
      { label: "STATUS", value: "GENERATING" },
    ],
    cta: "Browse Library →",
    ctaSecondary: "Generate",
  },
  {
    id: "talent-intel",
    badge: "TALENT INTEL",
    accentColor: "#ec4899",
    colorName: "pink",
    heading: ["Talent", "Intelligence"],
    description: "Market intelligence for hiring strategy with role benchmarking and competitive talent mapping.",
    features: [
      { icon: "solar:map-point-wave-bold-duotone", label: "Talent market mapping" },
      { icon: "solar:dollar-minimalistic-linear", label: "Compensation benchmarks" },
      { icon: "solar:user-check-rounded-linear", label: "Candidate scoring" },
      { icon: "solar:transfer-horizontal-linear", label: "Pipeline forecasting" },
    ],
    stats: [
      { label: "PROFILES", value: "5M+" },
      { label: "MARKETS", value: "36" },
      { label: "STATUS", value: "LIVE" },
    ],
    cta: "Explore Intel →",
    ctaSecondary: "View Map",
  },
  {
    id: "compliance",
    badge: "SECURITY COMPLIANCE",
    accentColor: "#6366f1",
    colorName: "purple",
    heading: ["Security", "Compliance"],
    description: "Automated compliance monitoring, audit trails, and policy enforcement for enterprise AI operations.",
    features: [
      { icon: "solar:shield-check-bold-duotone", label: "SOC2 & GDPR" },
      { icon: "solar:file-check-linear", label: "Automated audit trails" },
      { icon: "solar:lock-password-linear", label: "Policy enforcement" },
      { icon: "solar:danger-triangle-linear", label: "Risk scoring" },
    ],
    stats: [
      { label: "CHECKS", value: "99.9%" },
      { label: "AUDITS", value: "Continuous" },
      { label: "STATUS", value: "COMPLIANT" },
    ],
    cta: "View Compliance →",
    ctaSecondary: "Audit Log",
  },
];