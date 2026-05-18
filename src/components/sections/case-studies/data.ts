import type { CaseStudy } from "./types";

export const CASE_STUDIES: CaseStudy[] = [
  {
    id: "nexacorp-operations",
    slug: "nexacorp-operations",
    company: "NexaCorp",
    industry: "Enterprise Operations",
    product: "Agent Squad",
    headline:
      "NexaCorp deploys an autonomous AI operations team — cutting overhead by 62%",
    challenge:
      "NexaCorp managed over 400 daily operational tasks across infrastructure monitoring, dashboard validation, and compliance checks. Their team spent 70% of their time on repetitive verification work, leaving little capacity for high-value decisions.",
    solution:
      "Zaby deployed an Agent Squad of Operations Agents across NexaCorp's environments. The agents autonomously execute browser-based checks, validate dashboards, run API health routines, and escalate anomalies — all without human intervention.",
    metrics: [
      { value: "62%", label: "reduction in operational overhead" },
      { value: "400+", label: "tasks automated daily" },
      { value: "99.7%", label: "uptime maintained" },
      { value: "4.2×", label: "faster incident resolution" },
    ],
    gradientFrom: "#2f1362",
    gradientTo: "#6d28d9",
    icon: "solar:cpu-bold-duotone",
    featured: true,
    quote:
      "Zaby's Agent Squad functions like a permanent, always-on operational team. We stopped worrying about uptime checks and started focusing on what matters.",
    quoteAuthor: "Rajan Mehta",
    quoteRole: "VP of Engineering, NexaCorp",
  },
  {
    id: "vaultfin-compliance",
    slug: "vaultfin-compliance",
    company: "VaultFin",
    industry: "Finance & Compliance",
    product: "Agentic Workflows",
    headline: "VaultFin automates compliance audits end-to-end with Agentic Workflows",
    challenge:
      "VaultFin's compliance team ran 120+ regulatory checks weekly across multiple platforms. Manual auditing consumed 3 FTEs and regularly caused reporting delays.",
    solution:
      "Zaby's Agentic Workflows replaced the manual cycle. Scheduled compliance agents now run daily audits, generate reports, validate outputs, and flag exceptions — eliminating the manual reporting backlog entirely.",
    metrics: [
      { value: "78%", label: "reduction in audit time" },
      { value: "120+", label: "weekly checks automated" },
      { value: "0", label: "reporting delays since launch" },
      { value: "3 FTEs", label: "redeployed to strategic work" },
    ],
    gradientFrom: "#065f46",
    gradientTo: "#059669",
    icon: "solar:shield-check-bold-duotone",
    quote:
      "What used to take three people three days now runs autonomously every morning. Zaby Workflows changed how we think about compliance operations.",
    quoteAuthor: "Priya Anand",
    quoteRole: "Chief Compliance Officer, VaultFin",
  },
  {
    id: "cartwave-support",
    slug: "cartwave-support",
    company: "CartWave",
    industry: "Customer Experience",
    product: "Open Agents",
    headline: "CartWave scales customer support 5× without adding headcount",
    challenge:
      "CartWave's support team was overwhelmed — 8,000+ tickets per month, average first-response time of 6 hours, and 42% ticket escalation rates. Hiring wasn't scaling fast enough.",
    solution:
      "Zaby deployed a multimodal Open Agent on CartWave's support portal and WhatsApp channel. The agent handles order inquiries, return workflows, FAQs, and escalations — routing complex tickets intelligently to human agents.",
    metrics: [
      { value: "5×", label: "support volume handled" },
      { value: "8 min", label: "average first-response time" },
      { value: "67%", label: "tickets resolved without escalation" },
      { value: "4.7★", label: "average customer satisfaction" },
    ],
    gradientFrom: "#1e40af",
    gradientTo: "#3b82f6",
    icon: "solar:chat-round-bold-duotone",
  },
  {
    id: "buildright-qa",
    slug: "buildright-qa",
    company: "BuildRight",
    industry: "Engineering & QA",
    product: "Agentic Workflows",
    headline: "BuildRight eliminates QA bottlenecks with autonomous regression testing",
    challenge:
      "BuildRight's release cycle was blocked by manual QA. Each deployment required 40+ hours of browser-based regression testing across 12 environments — delaying releases by an average of 4 days.",
    solution:
      "Zaby deployed a QA Workflow that triggers on every deployment event. Agents run full browser-based regression suites, validate UI flows, generate reports, and notify engineers of failures — all within 90 minutes.",
    metrics: [
      { value: "94%", label: "faster QA cycle" },
      { value: "12", label: "environments covered simultaneously" },
      { value: "90 min", label: "from deploy to QA report" },
      { value: "41%", label: "reduction in production bugs" },
    ],
    gradientFrom: "#7c2d12",
    gradientTo: "#ea580c",
    icon: "solar:bug-bold-duotone",
  },
  {
    id: "talentscale-hiring",
    slug: "talentscale-hiring",
    company: "TalentScale",
    industry: "HR & Recruitment",
    product: "AI SaaS Workspace",
    headline: "TalentScale cuts time-to-hire by 47% with AI Hiring Workspace",
    challenge:
      "TalentScale processed 2,000+ applications per month across 80 open roles. Recruiters spent 60% of their time on initial screening, scheduling, and coordination — burning out before strategic work.",
    solution:
      "Zaby's AI Hiring Workspace gave TalentScale a fully operational recruitment environment. AI agents screen candidates, conduct initial assessments, coordinate schedules, and surface ranked shortlists to human recruiters.",
    metrics: [
      { value: "47%", label: "reduction in time-to-hire" },
      { value: "2,000+", label: "applications processed monthly" },
      { value: "60%", label: "recruiter time freed up" },
      { value: "3.1×", label: "increase in qualified pipeline" },
    ],
    gradientFrom: "#4c1d95",
    gradientTo: "#8b5cf6",
    icon: "solar:user-bold-duotone",
  },
  {
    id: "mediapulse-content",
    slug: "mediapulse-content",
    company: "MediaPulse",
    industry: "Media & Content",
    product: "AI SaaS Workspace",
    headline: "MediaPulse publishes 3× faster with AI content workflow automation",
    challenge:
      "MediaPulse's editorial team managed 500+ content pieces monthly across 6 brands. Manual handoffs between writers, editors, compliance reviewers, and publishers caused consistent delays and version-control nightmares.",
    solution:
      "Zaby's Content Studio Workspace automated the full editorial pipeline — from drafting workflows and moderation queues to compliance validation and multi-channel publishing. Human editors focus only on creative decisions.",
    metrics: [
      { value: "3×", label: "faster content publishing" },
      { value: "500+", label: "pieces processed monthly" },
      { value: "88%", label: "reduction in manual handoffs" },
      { value: "6 brands", label: "managed from one workspace" },
    ],
    gradientFrom: "#831843",
    gradientTo: "#ec4899",
    icon: "solar:document-bold-duotone",
  },
  {
    id: "logitrack-infra",
    slug: "logitrack-infra",
    company: "LogiTrack",
    industry: "Logistics",
    product: "Agent Squad",
    headline: "LogiTrack runs 24/7 infrastructure monitoring with zero human shifts",
    challenge:
      "LogiTrack's operations ran across 3 data centers and 14 cloud environments. Night-shift human monitoring was costly, error-prone, and led to delayed incident responses averaging 38 minutes.",
    solution:
      "Zaby's Operations Agents continuously monitor LogiTrack's infrastructure — checking uptime, validating deployments, analyzing anomalies, and triggering automated remediation workflows. Incidents are now detected and escalated in under 90 seconds.",
    metrics: [
      { value: "90s", label: "average incident detection time" },
      { value: "38→1.5min", label: "incident response improvement" },
      { value: "100%", label: "coverage across all environments" },
      { value: "$280K", label: "annual ops cost saved" },
    ],
    gradientFrom: "#0c4a6e",
    gradientTo: "#0ea5e9",
    icon: "solar:server-bold-duotone",
  },
  {
    id: "healthnova-agents",
    slug: "healthnova-agents",
    company: "HealthNova",
    industry: "Healthcare",
    product: "Open Agents",
    headline: "HealthNova deploys voice + text AI agent for patient intake workflows",
    challenge:
      "HealthNova's front-desk team handled 1,200+ patient interactions daily — appointment bookings, pre-intake questionnaires, and insurance verification. Manual processing created a 45-minute average wait time.",
    solution:
      "Zaby deployed a multimodal Open Agent for HealthNova — handling inbound voice calls, SMS intake forms, and web chat. Agents book appointments, gather intake data, verify insurance, and route complex cases to clinical staff.",
    metrics: [
      { value: "45→4 min", label: "patient wait time improvement" },
      { value: "1,200+", label: "daily interactions handled" },
      { value: "94%", label: "intake completion rate" },
      { value: "31%", label: "reduction in front-desk workload" },
    ],
    gradientFrom: "#064e3b",
    gradientTo: "#10b981",
    icon: "solar:heart-pulse-bold-duotone",
  },
];

export const INDUSTRY_FILTERS = [
  "All",
  "Enterprise Operations",
  "Customer Experience",
  "HR & Recruitment",
  "Engineering & QA",
  "Finance & Compliance",
  "Healthcare",
  "Logistics",
  "Media & Content",
] as const;

export const FEATURED_STUDY = CASE_STUDIES.find((s) => s.featured)!;
export const GRID_STUDIES = CASE_STUDIES.filter((s) => !s.featured);

export const IMPACT_STATS = [
  { value: "200+", label: "Enterprise Deployments" },
  { value: "12M+", label: "Tasks Automated Monthly" },
  { value: "68%", label: "Average Cost Reduction" },
  { value: "4.8★", label: "Average Customer CSAT" },
];
