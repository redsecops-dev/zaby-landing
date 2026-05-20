import type {
  ResearchStat,
  ResearchArea,
  ResearchInsight,
  EngineeringPrinciple,
} from "./types";

export const RESEARCH_STATS: ResearchStat[] = [
  { value: "5+", label: "Years of R&D", description: "Engineering investment in autonomous execution systems" },
  { value: "12M+", label: "Agent Tasks Executed", description: "Validated through real-world enterprise deployments" },
  { value: "200+", label: "Enterprise Deployments", description: "Organisations running on Zaby infrastructure" },
  { value: "99.9%", label: "Runtime Uptime", description: "Platform reliability across production environments" },
];

export const RESEARCH_AREAS: ResearchArea[] = [
  {
    id: "agent-execution",
    title: "Autonomous Execution",
    description:
      "Research into how AI agents execute long-running tasks without human intervention — covering execution lifecycle, runtime isolation, state management, and task persistence across operational environments.",
    icon: "Settings",
    tags: ["Execution Runtime", "State Management", "Task Persistence"],
  },
  {
    id: "memory-architecture",
    title: "Persistent Memory Systems",
    description:
      "Engineering research on how agents retain operational knowledge, user context, and workflow state across sessions. Covers vector storage, semantic retrieval, context compression, and permission-aware memory access.",
    icon: "Brain",
    tags: ["Vector Storage", "Semantic Retrieval", "Context Compression"],
  },
  {
    id: "workflow-intelligence",
    title: "Agentic Workflow Intelligence",
    description:
      "Research into reasoning-based orchestration that moves beyond static automation. Covers conditional execution, failure recovery, branching logic, multi-agent coordination, and intelligent retry systems.",
    icon: "GitBranch",
    tags: ["Orchestration", "Branching Logic", "Failure Recovery"],
  },
  {
    id: "multimodal-runtime",
    title: "Multimodal Interaction Research",
    description:
      "Engineering foundations for agents that operate across text, voice, vision, browser interaction, and API connectivity — enabling unified operational execution across all modalities in enterprise environments.",
    icon: "Globe",
    tags: ["Voice Processing", "Vision Systems", "Browser Automation"],
  },
  {
    id: "enterprise-security",
    title: "Enterprise Security Architecture",
    description:
      "Research into secure agent deployment: RBAC permission systems, environment isolation, audit logging, and integration security — designed for enterprise operational environments with strict compliance requirements.",
    icon: "Lock",
    tags: ["RBAC Permissions", "Audit Logs", "Environment Isolation"],
  },
  {
    id: "human-ai-collaboration",
    title: "Human–AI Collaboration",
    description:
      "Research on designing systems where humans and AI agents collaborate effectively — covering escalation architectures, approval workflows, oversight mechanisms, and the optimal boundaries of autonomous execution.",
    icon: "Handshake",
    tags: ["Approval Workflows", "Escalation Systems", "Oversight Design"],
  },
];

export const RESEARCH_INSIGHTS: ResearchInsight[] = [
  {
    id: "autonomous-execution",
    category: "Execution Research",
    title: "Autonomous Execution Without Operational Bottlenecks",
    summary:
      "Enterprise operations fail at scale when every AI action requires a human approval loop. Our research into execution-first architecture demonstrates how agents can operate continuously with contextual reasoning — achieving 68% reduction in operational overhead across validated deployments.",
    findings: [
      "Long-running agent tasks require runtime isolation to prevent cross-contamination",
      "Contextual reasoning at execution time reduces error rates by 3.4× over rule-based systems",
      "Task persistence mechanisms are critical for agents operating across multi-hour workflows",
    ],
    gradientFrom: "#2f1362",
    gradientTo: "#6d28d9",
  },
  {
    id: "memory-persistence",
    category: "Memory Architecture",
    title: "Persistent Memory Infrastructure for Enterprise AI Systems",
    summary:
      "Most AI systems are stateless by design — resetting context with every session. Our memory architecture research demonstrates how organisations gain compounding operational advantage when agents retain knowledge across sessions, workflows, and environments.",
    findings: [
      "Vector-based semantic retrieval outperforms keyword-lookup by 5.2× for operational context",
      "Shared memory architectures enable multi-agent coordination without explicit messaging overhead",
      "Permission-aware memory retrieval is a prerequisite for enterprise-grade agent deployment",
    ],
    gradientFrom: "#0e7490",
    gradientTo: "#2563eb",
  },
  {
    id: "multi-agent-coordination",
    category: "Workflow Research",
    title: "Multi-Agent Coordination at Enterprise Scale",
    summary:
      "Scaling AI operations requires agents that can collaborate, delegate, and coordinate without centralised bottlenecks. Our workflow orchestration research covers distributed execution, sequential task handling, and human-in-the-loop approval patterns.",
    findings: [
      "Distributed workflow architectures handle 4.8× more concurrent tasks than centralised models",
      "Event-driven workflow triggers reduce latency by 61% compared to polling-based systems",
      "Human approval checkpoints with async escalation reduce mean time-to-resolution by 40%",
    ],
    gradientFrom: "#065f46",
    gradientTo: "#0d9488",
  },
];

export const ENGINEERING_PRINCIPLES: EngineeringPrinciple[] = [
  {
    id: "execution-first",
    title: "Execution-First Design",
    description:
      "Every architectural decision prioritises reliable execution over conversational capability. Agents are built as operational systems, not chat interfaces.",
    icon: "Play",
  },
  {
    id: "infrastructure-reliability",
    title: "Infrastructure Reliability",
    description:
      "Platform components are designed for enterprise availability — with retry systems, failure recovery, and runtime isolation baked into the execution layer.",
    icon: "TrendingUp",
  },
  {
    id: "memory-continuity",
    title: "Memory Continuity",
    description:
      "Agents retain operational context across sessions, maintaining a persistent understanding of workflows, preferences, and organisational knowledge.",
    icon: "CircleDot",
  },
  {
    id: "autonomy-with-control",
    title: "Autonomy with Control",
    description:
      "Every autonomous capability is paired with visibility, audit mechanisms, and human escalation paths — ensuring organisations retain full operational oversight.",
    icon: "Grid3x3",
  },
];
