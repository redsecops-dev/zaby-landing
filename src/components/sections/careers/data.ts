import type { JobOpening, Value, Perk } from "./types";

export const VALUES: Value[] = [
  {
    key: "execution",
    label: "Built for Execution",
    icon: "solar:cpu-bolt-bold-duotone",
    description:
      "We don't build conversation wrappers. We build systems that execute tasks, interact with software, and operate continuously. Every line of code we write moves something forward.",
  },
  {
    key: "reliability",
    label: "Reliability by Design",
    icon: "solar:shield-check-bold-duotone",
    description:
      "Our infrastructure is mission-critical for enterprises. We operate with zero tolerance for instability. Reliability isn't a feature — it's the foundation everything else is built on.",
  },
  {
    key: "intelligence",
    label: "Operational Intelligence",
    icon: "solar:brain-bold-duotone",
    description:
      "We push the boundaries of what AI systems can do inside real enterprise environments. Context, memory, multi-agent coordination — we solve the hard problems others avoid.",
  },
  {
    key: "enterprise",
    label: "Enterprise Mindset",
    icon: "solar:buildings-3-bold-duotone",
    description:
      "We think in terms of security, scalability, RBAC, observability, and audit logs. Enterprise-grade isn't a checklist — it's embedded in every design decision we make.",
  },
];

export const PERKS: Perk[] = [
  {
    icon: "solar:rocket-2-bold-duotone",
    title: "High-Impact Work",
    description:
      "Work on systems that run inside real enterprise environments, not toy demos. Your work matters from day one.",
  },
  {
    icon: "solar:chart-bold-duotone",
    title: "Competitive Compensation",
    description:
      "We offer strong base salaries, equity, and performance incentives that reflect the impact you drive.",
  },
  {
    icon: "solar:laptop-bold-duotone",
    title: "Fully Remote",
    description:
      "Work from anywhere in the world. We operate asynchronously and trust people to deliver.",
  },
  {
    icon: "solar:book-2-bold-duotone",
    title: "Learning Budget",
    description:
      "Annual budget for courses, conferences, and technical resources. We invest in your growth continuously.",
  },
  {
    icon: "solar:users-group-rounded-bold-duotone",
    title: "Small, Elite Team",
    description:
      "No bureaucracy. You work directly with decision-makers, ship fast, and have real ownership over your domain.",
  },
  {
    icon: "solar:health-bold-duotone",
    title: "Healthcare Coverage",
    description:
      "Comprehensive medical, dental, and vision plans for you and your family. We take care of our people.",
  },
];

export const JOB_OPENINGS: JobOpening[] = [
  {
    id: "be-01",
    title: "Senior Backend Engineer — Agent Runtime",
    department: "Engineering",
    location: "Remote",
    type: "Full-time",
    description:
      "Build and scale the execution runtime that powers autonomous AI agents. You'll work on agent state management, task orchestration, and runtime isolation at enterprise scale.",
    responsibilities: [
      "Architect and implement the core execution engine for long-running autonomous agents.",
      "Develop secure runtime isolation mechanisms to ensure safe execution of untrusted agent code.",
      "Design and optimize high-concurrency task orchestration and state management systems.",
      "Collaborate with the Research team to integrate advanced memory and context retrieval systems into the runtime.",
      "Build robust observability and debugging tools for complex agentic workflows."
    ],
    requirements: [
      "5+ years of experience in backend engineering with high-performance systems (Node.js/TypeScript, Go, or Rust).",
      "Deep understanding of distributed systems, concurrency primitives, and state machine design.",
      "Experience with containerization (Docker) and runtime isolation technologies.",
      "Strong background in building scalable APIs and microservices in enterprise environments.",
      "Excellent problem-solving skills and the ability to work independently in a remote-first team."
    ],
    bonusPoints: [
      "Prior experience building AI infrastructure or agentic frameworks.",
      "Familiarity with vector databases and LLM orchestration tools.",
      "Contributions to open-source infrastructure projects."
    ]
  },
  {
    id: "ml-01",
    title: "AI/ML Engineer — Multi-Agent Systems",
    department: "Engineering",
    location: "Remote",
    type: "Full-time",
    description:
      "Design multi-agent coordination systems, memory retrieval pipelines, and reasoning workflows that power Zaby's Agent Squad and Agentic Workflows products.",
    responsibilities: [
      "Design and implement coordination protocols for multi-agent systems to solve complex, multi-step tasks.",
      "Develop advanced RAG (Retrieval-Augmented Generation) pipelines for agent memory and context persistence.",
      "Fine-tune and optimize LLMs for specific operational tasks and reasoning workflows.",
      "Research and implement evaluation frameworks for agent performance and reliability.",
      "Work closely with product teams to translate user requirements into agentic capabilities."
    ],
    requirements: [
      "3+ years of experience in AI/ML engineering with a focus on NLP or multi-agent systems.",
      "Strong proficiency in Python and deep learning frameworks (PyTorch, JAX).",
      "Experience with LLM orchestration (LangChain, AutoGen, etc.) and prompt engineering.",
      "Solid understanding of vector storage and semantic retrieval architectures.",
      "Master's or PhD in CS/AI or equivalent industry experience."
    ],
    bonusPoints: [
      "Experience with reinforcement learning or autonomous systems.",
      "Published research in top-tier AI conferences.",
      "Experience deploying large-scale ML models in production environments."
    ]
  },
  {
    id: "fe-01",
    title: "Senior Frontend Engineer",
    department: "Engineering",
    location: "Remote",
    type: "Full-time",
    description:
      "Build the interfaces that help enterprises deploy, monitor, and manage AI operational systems. You'll own the Agent Builder, Workflow Visualizer, and observability dashboards.",
    responsibilities: [
      "Develop complex React-based interfaces for agent orchestration and workflow visualization.",
      "Architect scalable frontend state management systems for real-time agent monitoring.",
      "Collaborate with Designers to implement a high-fidelity, accessible design system.",
      "Optimize frontend performance for data-intensive observability dashboards.",
      "Implement robust testing strategies for critical enterprise-facing UI components."
    ],
    requirements: [
      "5+ years of experience in frontend engineering with React and TypeScript.",
      "Deep understanding of modern CSS, Tailwind, and animation libraries (Framer Motion).",
      "Experience building complex data visualizations (D3.js, Canvas, or SVG).",
      "Strong background in architecting large-scale frontend applications.",
      "Passion for creating polished, high-performance user experiences."
    ],
    bonusPoints: [
      "Experience with Next.js and Server Components.",
      "Prior experience in B2B SaaS or developer tools.",
      "A strong eye for design and interaction detail."
    ]
  },
  {
    id: "ux-01",
    title: "Senior Product Designer",
    department: "Design",
    location: "Remote",
    type: "Full-time",
    description:
      "Design operational AI interfaces that enterprise teams actually use. You'll own the visual language, interaction systems, and complex workflow UX across the entire platform.",
    responsibilities: [
      "Lead the design of complex AI orchestration and monitoring products from concept to launch.",
      "Define and maintain the Zaby design system across all platform touchpoints.",
      "Conduct user research and translate complex technical requirements into intuitive UX.",
      "Create high-fidelity prototypes to test and validate interaction patterns.",
      "Work closely with engineering to ensure high-quality implementation of designs."
    ],
    requirements: [
      "5+ years of experience in product design for complex SaaS or technical products.",
      "Expertise in Figma and modern design tools.",
      "Strong portfolio demonstrating high-end visual design and systems thinking.",
      "Ability to simplify complex technical concepts into clear, usable interfaces.",
      "Excellent communication and collaboration skills."
    ],
    bonusPoints: [
      "Basic understanding of frontend development (HTML/CSS/JS).",
      "Experience designing AI or developer-focused tools.",
      "Experience with motion design and micro-interactions."
    ]
  },
  {
    id: "ae-01",
    title: "Enterprise Account Executive",
    department: "Sales",
    location: "Remote",
    type: "Full-time",
    description:
      "Sell Zaby's operational AI infrastructure to enterprise accounts in financial services, logistics, and technology. You'll work with decision-makers to deploy AI workforce systems at scale.",
  },
  {
    id: "sa-01",
    title: "Solutions Architect",
    department: "Sales",
    location: "Remote",
    type: "Full-time",
    description:
      "Work with enterprise customers to design and implement Zaby deployments. Bridge the gap between technical infrastructure and business operational outcomes.",
  },
  {
    id: "res-01",
    title: "AI Research Engineer — Memory & Context",
    department: "Research",
    location: "Remote",
    type: "Full-time",
    description:
      "Research and implement advanced memory systems for long-running AI agents — vector storage, context compression, semantic retrieval, and shared memory for multi-agent coordination.",
  },
];

export const DEPARTMENTS = [
  "All",
  "Engineering",
  "Product",
  "Design",
  "Sales",
  "Research",
] as const;

export const LIFE_AT_ZABY_CARDS = [
  {
    icon: "solar:code-bold-duotone",
    title: "Ship Real Infrastructure",
    desc: "No toy projects. From day one, your work runs inside enterprise production environments powering real autonomous agents.",
  },
  {
    icon: "solar:global-bold-duotone",
    title: "Work Across Borders",
    desc: "Our team spans multiple time zones. We operate async-first with structured communication that respects everyone's focus time.",
  },
  {
    icon: "solar:lightbulb-bold-duotone",
    title: "Solve Hard Problems",
    desc: "Long-running agent state, multi-agent memory coordination, runtime isolation — we tackle the unsolved parts of operational AI.",
  },
  {
    icon: "solar:users-group-two-rounded-bold-duotone",
    title: "Direct Ownership",
    desc: "Small team means broad ownership. You won't be a cog — you'll own entire system domains and see your decisions ship.",
  },
  {
    icon: "solar:graph-new-up-bold-duotone",
    title: "Grow Fast",
    desc: "We're in a category-defining moment. Growing with Zaby means growing with an emerging infrastructure layer of enterprise AI.",
  },
  {
    icon: "solar:shield-network-bold-duotone",
    title: "Enterprise-Grade Standards",
    desc: "RBAC, audit logs, SOC2-ready architecture, secure integrations — we build with enterprise trust as a baseline.",
  },
];

export const STATS = [
  { label: "Service Layers", value: "5" },
  { label: "Deployment Modes", value: "4+" },
  { label: "Agent Types", value: "12+" },
  { label: "Remote First", value: "100%" },
] as const;
