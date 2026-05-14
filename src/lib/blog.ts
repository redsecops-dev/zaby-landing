// ─── Types ────────────────────────────────────────────────────────────────────

export type Category = "All" | "Platform Updates" | "Engineering" | "Industry Insights";
export type Accent = "fuchsia" | "blue" | "teal";

export interface Post {
  slug: string;
  category: Exclude<Category, "All">;
  date: string;
  isoDate: string;
  title: string;
  excerpt: string;
  author: string;
  authorInitials: string;
  authorRole: string;
  readTime: string;
  accent: Accent;
}

export type Block =
  | { type: "paragraph"; text: string }
  | { type: "list"; ordered?: boolean; items: string[] }
  | { type: "callout"; text: string };

export interface Section {
  id: string;
  level: 2 | 3;
  heading: string;
  blocks: Block[];
}

export interface PostContent {
  intro: string[];
  sections: Section[];
}

// ─── Post Metadata ────────────────────────────────────────────────────────────

export const POSTS: Post[] = [
  {
    slug: "zaby-built-for-execution",
    category: "Platform Updates",
    date: "May 14, 2026",
    isoDate: "2026-05-14",
    title: "Zaby is Built for Execution, Not Conversation",
    excerpt:
      "Most AI products today are designed around conversation. Zaby is designed around execution. Agents should execute tasks, interact with software, operate continuously, retain memory, and coordinate with other agents inside enterprise environments.",
    author: "Zaby Team",
    authorInitials: "ZT",
    authorRole: "Product",
    readTime: "5 min read",
    accent: "fuchsia",
  },
  {
    slug: "introducing-agent-squad",
    category: "Platform Updates",
    date: "May 10, 2026",
    isoDate: "2026-05-10",
    title: "Introducing Agent Squad: Autonomous AI Employees for Enterprise Operations",
    excerpt:
      "Agent Squad is the operational AI employee layer of the Zaby platform. Deploy specialized autonomous agents capable of browser interaction, computer use, API execution, and workflow coordination.",
    author: "Zaby Team",
    authorInitials: "ZT",
    authorRole: "Product",
    readTime: "6 min read",
    accent: "fuchsia",
  },
  {
    slug: "open-agents-multimodal",
    category: "Platform Updates",
    date: "May 7, 2026",
    isoDate: "2026-05-07",
    title: "Open Agents: Build Multimodal AI for Any Channel or Industry",
    excerpt:
      "Open Agents is the customizable agent creation layer enabling organizations to build domain-specific AI across text, voice, vision, browser interaction, and API modalities.",
    author: "Zaby Team",
    authorInitials: "ZT",
    authorRole: "Product",
    readTime: "5 min read",
    accent: "fuchsia",
  },
  {
    slug: "agentic-workflows-intelligence",
    category: "Engineering",
    date: "May 4, 2026",
    isoDate: "2026-05-04",
    title: "Agentic Workflows: Bringing Intelligence to Process Automation",
    excerpt:
      "Traditional automation systems rely on static logic. Agentic Workflows introduces reasoning, adaptation, and conditional execution into your workflow systems.",
    author: "Zaby Engineering",
    authorInitials: "ZE",
    authorRole: "Engineering",
    readTime: "7 min read",
    accent: "blue",
  },
  {
    slug: "agent-memory-long-term-context",
    category: "Engineering",
    date: "May 1, 2026",
    isoDate: "2026-05-01",
    title: "Agent Memory: How We Give AI Systems Long-Term Intelligence",
    excerpt:
      "Most AI systems are stateless. Agent Memory enables continuity through four memory types powered by semantic retrieval, vector storage, and permission-aware access.",
    author: "Zaby Engineering",
    authorInitials: "ZE",
    authorRole: "Engineering",
    readTime: "8 min read",
    accent: "blue",
  },
  {
    slug: "five-core-service-layers",
    category: "Engineering",
    date: "Apr 24, 2026",
    isoDate: "2026-04-24",
    title: "Five Core Service Layers That Power the Zaby Platform",
    excerpt:
      "Agent Squad, Open Agents, Agentic Workflows, Agent Memory, and AI SaaS Workspace — each layer is interconnected through shared execution runtime, orchestration, and observability.",
    author: "Zaby Engineering",
    authorInitials: "ZE",
    authorRole: "Engineering",
    readTime: "6 min read",
    accent: "blue",
  },
  {
    slug: "ai-saas-workspace",
    category: "Platform Updates",
    date: "Apr 28, 2026",
    isoDate: "2026-04-28",
    title: "AI SaaS Workspace: Production-Ready Operational Environments",
    excerpt:
      "Instead of building AI infrastructure from scratch, AI SaaS Workspace provides production-ready environments for hiring, assessment, content operations, and support.",
    author: "Zaby Team",
    authorInitials: "ZT",
    authorRole: "Product",
    readTime: "5 min read",
    accent: "fuchsia",
  },
  {
    slug: "why-operational-ai-matters",
    category: "Industry Insights",
    date: "Apr 20, 2026",
    isoDate: "2026-04-20",
    title: "Why Operational AI Infrastructure Is the Next Evolution",
    excerpt:
      "The era of static copilots and narrow chatbot systems is over. Operational AI infrastructure represents the real next frontier for enterprise technology.",
    author: "Zaby Team",
    authorInitials: "ZT",
    authorRole: "Strategy",
    readTime: "7 min read",
    accent: "teal",
  },
  {
    slug: "enterprise-deployment-models",
    category: "Industry Insights",
    date: "Apr 16, 2026",
    isoDate: "2026-04-16",
    title: "Enterprise Deployment: Cloud, Dedicated and Self-Hosted Options",
    excerpt:
      "Zaby offers three deployment models to meet enterprise requirements — Cloud, Dedicated Enterprise, and Self-Hosted — each with different data residency and security postures.",
    author: "Zaby Team",
    authorInitials: "ZT",
    authorRole: "Strategy",
    readTime: "5 min read",
    accent: "teal",
  },
];

// ─── Post Content ─────────────────────────────────────────────────────────────

export const POST_CONTENT: Record<string, PostContent> = {
  "zaby-built-for-execution": {
    intro: [
      "There is a defining difference between a tool that helps you think and a system that executes on your behalf. Most AI products released over the past three years have been the former: chat interfaces, copilots, suggestion engines. They respond when asked. They help when prompted. They stop the moment you close the window.",
      "Zaby is something different. It is an operational AI infrastructure platform. The agents inside Zaby do not wait for prompts. They operate, execute, coordinate, and persist. They run inside your real business environment, interact with real software, hold memory across sessions, and hand off tasks to other agents. Zaby is built for execution, not conversation.",
    ],
    sections: [
      {
        id: "the-conversation-paradigm-problem",
        level: 2,
        heading: "The Conversation Paradigm Problem",
        blocks: [
          {
            type: "paragraph",
            text: "The chatbot model works well for lookup and retrieval. Ask a question, get an answer. Generate a draft, review it, edit it yourself. This pattern has clear value. But it carries a hidden assumption: that the human is always the executor. The AI is a consultant, never the worker.",
          },
          {
            type: "paragraph",
            text: "This assumption breaks down the moment you try to scale operations. A hiring team processing 400 applications cannot rely on a copilot that waits to be asked. A support system handling 2,000 tickets per day cannot depend on a chatbot that requires human review of every response. The bottleneck is always the human-in-the-loop, and conversation-first AI amplifies that bottleneck rather than resolving it.",
          },
          {
            type: "paragraph",
            text: "Operational AI infrastructure removes the bottleneck by making the agent the executor. The human defines policy, reviews outcomes, and makes strategic decisions. The agent handles volume, consistency, and execution.",
          },
        ],
      },
      {
        id: "what-execution-means-in-practice",
        level: 2,
        heading: "What Execution Means in Practice",
        blocks: [
          {
            type: "paragraph",
            text: "When we say Zaby is built for execution, we mean several concrete things. First, agents in Zaby can interact with software interfaces. They can browse the web, operate internal dashboards, fill forms, click buttons, read PDFs, and extract structured data from unstructured sources. This is not simulated interaction. It is real browser automation with intelligent decision-making layered on top.",
          },
          {
            type: "paragraph",
            text: "Second, agents in Zaby operate continuously. They can be scheduled to run on a cron, triggered by events, or deployed as long-running processes that react to changes in your environment. A Zaby agent can monitor an inbox, process incoming messages, classify them, route them to appropriate workflows, and escalate edge cases to a human reviewer.",
          },
          {
            type: "list",
            items: [
              "Browser interaction: real web navigation, form filling, data extraction",
              "Computer use: operating desktop applications and internal tools",
              "API execution: calling external services, reading databases, writing records",
              "Workflow coordination: chaining tasks, handing off to other agents",
              "Continuous operation: event-driven or scheduled execution without human prompts",
            ],
          },
        ],
      },
      {
        id: "the-role-of-agent-memory",
        level: 2,
        heading: "The Role of Agent Memory",
        blocks: [
          {
            type: "paragraph",
            text: "Conversation-first AI is inherently stateless. Each session starts fresh. Any context built up in prior conversations is lost unless the user manually re-enters it. For casual lookup, this is acceptable. For operational systems, it is a critical failure mode.",
          },
          {
            type: "paragraph",
            text: "Execution requires memory. An agent that processes hiring applications needs to know the role requirements, the evaluation rubric, decisions already made, and patterns observed across hundreds of candidates. An agent that handles enterprise support needs to know the customer account history, open tickets, prior resolutions, and escalation policies.",
          },
          {
            type: "paragraph",
            text: "Zaby's Agent Memory layer provides four memory types: Conversational (per-session context), Operational (task and workflow state), Knowledge (documents, policies, domain expertise), and Shared (cross-agent institutional knowledge). Together they give agents the continuity required to operate at enterprise scale.",
          },
        ],
      },
      {
        id: "designed-for-enterprise-environments",
        level: 2,
        heading: "Designed for Enterprise Environments",
        blocks: [
          {
            type: "paragraph",
            text: "Enterprise environments are not the same as consumer contexts. They have existing software stacks, internal tools, compliance requirements, role-based access controls, and audit expectations. Conversation-first AI can be bolted onto an enterprise context. Execution-first AI must be designed for it.",
          },
          {
            type: "paragraph",
            text: "Every component in Zaby is built with enterprise deployment in mind. Agents operate within permission-scoped environments. Access to data and tools is governed by RBAC policies. Every agent action is logged with full execution traces. Approval workflows can be inserted at any step. Execution happens inside isolated runtime environments that can be deployed to cloud, dedicated, or self-hosted infrastructure.",
          },
          {
            type: "callout",
            text: "The distinction between conversation and execution is not a feature difference. It is an architectural difference. Execution-first AI requires different memory systems, different runtime environments, different permission models, and different observability tooling.",
          },
        ],
      },
      {
        id: "the-future-is-operational",
        level: 2,
        heading: "The Future Is Operational",
        blocks: [
          {
            type: "paragraph",
            text: "The next phase of enterprise AI adoption will be defined by organizations that move from AI-assisted to AI-operated. The distinction matters. AI-assisted means humans are still doing the work, just faster. AI-operated means agents are handling execution at a scale no human team could match, and humans are managing outcomes, strategy, and exceptions.",
          },
          {
            type: "paragraph",
            text: "Zaby is the infrastructure for that transition. Not a chatbot. Not a copilot. An operational platform where agents execute, coordinate, remember, and deliver — continuously and at scale.",
          },
        ],
      },
    ],
  },

  "introducing-agent-squad": {
    intro: [
      "Every organization that tries to deploy AI at scale eventually hits the same wall. The models are capable. The APIs are accessible. But connecting AI capability to real business execution — the actual tasks, tools, and workflows that constitute operational work — requires infrastructure that most AI platforms simply do not provide.",
      "Agent Squad is Zaby's answer. It is the operational AI employee layer: a system of specialized autonomous agents that can be deployed inside enterprise environments to execute tasks, operate software, coordinate with other agents, and handle the full operational lifecycle of business processes.",
    ],
    sections: [
      {
        id: "what-is-agent-squad",
        level: 2,
        heading: "What Agent Squad Is",
        blocks: [
          {
            type: "paragraph",
            text: "Agent Squad is not a team of chatbots. It is a deployable workforce of specialized autonomous agents, each capable of operating with defined scope, memory, tool access, and coordination logic. Agents in the squad are specialized — a Hiring Agent handles candidate screening, a Support Agent handles ticket resolution, a Research Agent handles web-based investigation — but they share a common runtime, memory infrastructure, and coordination layer.",
          },
          {
            type: "paragraph",
            text: "Each agent in the squad can be assigned a role, given access to specific tools and data sources, placed under a set of policy constraints, and connected to approval workflows for edge cases requiring human judgment.",
          },
        ],
      },
      {
        id: "core-capabilities",
        level: 2,
        heading: "Core Capabilities",
        blocks: [
          {
            type: "list",
            items: [
              "Browser interaction: navigate websites, operate web applications, extract and submit data",
              "Computer use: control desktop environments, operate internal software tools",
              "API execution: call external services, read and write to databases, integrate with business systems",
              "Document processing: read, extract, classify, and generate structured data from documents",
              "Agent coordination: delegate subtasks, await results, and synthesize multi-agent outputs",
              "Continuous operation: run as long-lived processes triggered by events, schedules, or conditions",
            ],
          },
          {
            type: "paragraph",
            text: "These capabilities are not theoretical. They are implemented through real browser automation, tool call infrastructure, and execution environments that provide agents with the ability to take action in real software systems.",
          },
        ],
      },
      {
        id: "multi-agent-coordination",
        level: 2,
        heading: "Multi-Agent Coordination",
        blocks: [
          {
            type: "paragraph",
            text: "Complex operational workflows rarely map to a single agent's scope. A hiring workflow might require a Sourcing Agent to find candidates, a Screening Agent to evaluate applications, a Scheduling Agent to coordinate interviews, and a Reporting Agent to generate pipeline analytics. Each is specialized. Each operates within defined boundaries. But together they execute what previously required an entire team.",
          },
          {
            type: "paragraph",
            text: "Zaby's coordination layer handles task routing, dependency management, result aggregation, and escalation. Agents can invoke other agents, wait for results, branch based on output, and surface exceptions to human reviewers at defined checkpoints.",
          },
        ],
      },
      {
        id: "deployment-and-governance",
        level: 2,
        heading: "Deployment and Governance",
        blocks: [
          {
            type: "paragraph",
            text: "Agent Squad operates within Zaby's enterprise governance framework. Every agent action is logged. Execution traces are stored and queryable. RBAC policies govern what each agent can access. Approval nodes can be inserted into any workflow to require human sign-off before critical actions are taken.",
          },
          {
            type: "paragraph",
            text: "Organizations can deploy Agent Squad to cloud, dedicated enterprise, or self-hosted infrastructure depending on their data residency and security requirements.",
          },
        ],
      },
    ],
  },

  "open-agents-multimodal": {
    intro: [
      "Most enterprise AI deployments today are either too generic or too narrow. Off-the-shelf assistants lack the domain knowledge and operational integration required for real business use. Custom-built systems require months of development time and significant engineering resources. The gap between capability and deployment has been one of the defining challenges of enterprise AI adoption.",
      "Open Agents is the Zaby layer that closes this gap. It is the customizable agent creation platform that enables organizations to build domain-specific AI agents deployable across every interaction channel — text, voice, vision, browser, and API — without starting from scratch each time.",
    ],
    sections: [
      {
        id: "multimodal-by-design",
        level: 2,
        heading: "Multimodal by Design",
        blocks: [
          {
            type: "paragraph",
            text: "Business communication does not happen in a single modality. Customers interact via chat on websites. Teams communicate through voice on calls. Documents arrive as PDFs and images. Internal systems expose APIs. Modern enterprise AI must operate across all of these simultaneously.",
          },
          {
            type: "paragraph",
            text: "Open Agents are built on a multimodal execution foundation. A single agent definition can be deployed across text interfaces, voice channels, image and document processing, browser automation, and programmatic API access. The underlying model capabilities and tool access are consistent across modalities — only the interface layer changes.",
          },
          {
            type: "list",
            items: [
              "Text: website chat, email processing, Slack, WhatsApp, Discord, SMS",
              "Voice: inbound and outbound call handling, real-time transcription and response",
              "Vision: document analysis, form extraction, image classification",
              "Browser: web research, form automation, data extraction",
              "API: programmatic integration with existing business systems",
            ],
          },
        ],
      },
      {
        id: "domain-specialization",
        level: 2,
        heading: "Domain Specialization",
        blocks: [
          {
            type: "paragraph",
            text: "Open Agents can be specialized for specific domains by connecting them to relevant knowledge bases, granting access to domain-specific tools, and defining behavioral policies appropriate to the use case. A Legal Agent has access to regulatory documents and follows compliance-conscious response patterns. A Sales Agent has access to CRM data and follows escalation policies for high-value prospects.",
          },
          {
            type: "paragraph",
            text: "Domain knowledge is managed through Zaby's Agent Memory layer, allowing agents to be updated with new policies, documents, and procedures without redeployment. Knowledge updates propagate to all deployed instances automatically.",
          },
        ],
      },
      {
        id: "building-and-deploying",
        level: 2,
        heading: "Building and Deploying",
        blocks: [
          {
            type: "paragraph",
            text: "Open Agents provides a builder environment where operators define agent persona, capabilities, knowledge connections, tool access, escalation logic, and deployment channels. Agents can be tested in simulation before deployment and monitored through Zaby's observability dashboard once live.",
          },
          {
            type: "paragraph",
            text: "Deployment targets include embedded website widgets, API endpoints, webhook receivers, and direct channel integrations for messaging and voice platforms. Agents can be updated, rolled back, or branched for A/B testing without downtime.",
          },
        ],
      },
    ],
  },

  "agentic-workflows-intelligence": {
    intro: [
      "Traditional automation has a ceiling. You define a rule. The rule executes. If something unexpected happens, the rule fails. Human intervention is required. The world does not cooperate with static logic, and most business processes are not clean enough to be fully handled by if-then-else conditions.",
      "Agentic Workflows is the Zaby layer that breaks through that ceiling. It replaces static automation logic with dynamic, reasoning-capable workflow execution — where agents evaluate conditions, adapt to unexpected inputs, recover from failures, and coordinate across systems without requiring a rule for every possible scenario.",
    ],
    sections: [
      {
        id: "static-vs-agentic",
        level: 2,
        heading: "Static Automation vs. Agentic Workflows",
        blocks: [
          {
            type: "paragraph",
            text: "Static automation tools — workflow builders, RPA systems, integration platforms — excel at predictable, repetitive processes where inputs and outputs are well-defined. They are effective for a meaningful share of operational work. But they break at boundaries: ambiguous inputs, unexpected formats, exceptions, and cases that fall outside their programmed logic.",
          },
          {
            type: "paragraph",
            text: "Agentic Workflows handle the messy middle. When an input is ambiguous, the workflow agent reasons about it. When a downstream system is unavailable, the workflow retries with backoff and routes to a fallback. When a case exceeds defined policy bounds, the workflow routes to a human approval step automatically. The logic is not predetermined; it is dynamically evaluated.",
          },
        ],
      },
      {
        id: "workflow-primitives",
        level: 2,
        heading: "Workflow Primitives",
        blocks: [
          {
            type: "list",
            items: [
              "Scheduling: cron-based, event-triggered, or condition-driven workflow initiation",
              "Branching: dynamic conditional routing based on agent-evaluated conditions",
              "Retries and recovery: automatic retry with configurable backoff and fallback paths",
              "Human-in-the-loop: approval nodes that pause execution pending human decision",
              "Agent chaining: sequential and parallel agent invocations with dependency management",
              "Observability: full execution traces, step-level logging, and failure diagnostics",
            ],
          },
          {
            type: "paragraph",
            text: "These primitives compose into workflows of arbitrary complexity. A multi-stage document processing pipeline can route documents to different processing paths based on content type, retry failed extractions with alternative approaches, and escalate low-confidence outputs for human review — all within a single workflow definition.",
          },
        ],
      },
      {
        id: "integration-and-deployment",
        level: 2,
        heading: "Integration and Deployment",
        blocks: [
          {
            type: "paragraph",
            text: "Agentic Workflows integrates with existing business systems through Zaby's tool execution layer. Workflows can read from and write to databases, call APIs, operate browser interfaces, and interact with messaging systems. No separate integration middleware is required.",
          },
          {
            type: "paragraph",
            text: "Workflow definitions are versioned and deployable across environments. Production, staging, and development instances can run different workflow versions simultaneously. Rollback to prior versions is immediate.",
          },
        ],
      },
    ],
  },

  "agent-memory-long-term-context": {
    intro: [
      "Memory is what separates a stateless query-response system from an operational intelligence. An AI system without memory can answer questions. An AI system with memory can learn your business, retain decisions, track ongoing work, and grow more useful with every interaction.",
      "Zaby's Agent Memory layer is the infrastructure that gives agents long-term operational intelligence. It is not a conversation history buffer. It is a structured memory system designed for the demands of enterprise AI execution.",
    ],
    sections: [
      {
        id: "four-memory-types",
        level: 2,
        heading: "Four Memory Types",
        blocks: [
          {
            type: "paragraph",
            text: "Different operational contexts require different kinds of memory. Zaby's Agent Memory system provides four distinct types, each optimized for a specific purpose.",
          },
          {
            type: "list",
            items: [
              "Conversational Memory: per-session context including messages, tool calls, and intermediate results",
              "Operational Memory: persistent task state, workflow progress, and agent execution history",
              "Knowledge Memory: documents, policies, domain expertise, and reference information",
              "Shared Memory: cross-agent institutional knowledge accessible to all agents within a defined scope",
            ],
          },
          {
            type: "paragraph",
            text: "These memory types are stored in purpose-built backends: vector stores for semantic retrieval, relational stores for structured state, and document stores for knowledge. Retrieval is automatic — agents query memory as needed without explicit programmer instruction.",
          },
        ],
      },
      {
        id: "semantic-retrieval",
        level: 2,
        heading: "Semantic Retrieval",
        blocks: [
          {
            type: "paragraph",
            text: "Raw storage is not enough. Agent Memory uses semantic retrieval to surface the most contextually relevant information at the moment it is needed. When an agent is processing a support ticket, it automatically retrieves related prior tickets, relevant product documentation, and applicable resolution policies.",
          },
          {
            type: "paragraph",
            text: "Retrieval is scope-aware. Agents only access memory they are authorized to read. Shared memory respects RBAC policies. Personal agent memory is isolated by agent identity. Organization-level knowledge is accessible based on deployment configuration.",
          },
        ],
      },
      {
        id: "memory-updates-and-persistence",
        level: 2,
        heading: "Memory Updates and Persistence",
        blocks: [
          {
            type: "paragraph",
            text: "Memory is not static. Knowledge memory is updated when new documents are ingested or policies change. Operational memory updates as workflows progress. Conversational memory accumulates across sessions according to retention policy. Shared memory grows as agents collectively encounter new situations and record institutional knowledge.",
          },
          {
            type: "callout",
            text: "Agent Memory is what makes Zaby agents improve over time. Each execution cycle — each document processed, each decision made, each exception resolved — enriches the memory available to future executions.",
          },
        ],
      },
    ],
  },

  "five-core-service-layers": {
    intro: [
      "The Zaby platform is not a single product. It is a set of interconnected service layers, each addressing a distinct component of the operational AI stack. Understanding how these layers relate to each other is key to understanding what Zaby makes possible.",
      "The five core layers are Agent Squad, Open Agents, Agentic Workflows, Agent Memory, and AI SaaS Workspace. Each is independently useful. Together they form a complete operational AI infrastructure.",
    ],
    sections: [
      {
        id: "agent-squad-layer",
        level: 2,
        heading: "Agent Squad: The Workforce Layer",
        blocks: [
          {
            type: "paragraph",
            text: "Agent Squad is the layer where autonomous agents are deployed and operated. It handles agent specialization, tool access, coordination, and execution. It is the layer that does the work — browsing, operating software, calling APIs, processing documents, and handing off to other agents.",
          },
        ],
      },
      {
        id: "open-agents-layer",
        level: 2,
        heading: "Open Agents: The Channel Layer",
        blocks: [
          {
            type: "paragraph",
            text: "Open Agents is the layer that connects agent capabilities to interaction channels. It handles the multimodal interface concerns — how agents communicate via text, voice, vision, and API. It is the layer that defines what users and systems see when they interact with Zaby-powered AI.",
          },
        ],
      },
      {
        id: "agentic-workflows-layer",
        level: 2,
        heading: "Agentic Workflows: The Orchestration Layer",
        blocks: [
          {
            type: "paragraph",
            text: "Agentic Workflows is the layer that sequences, coordinates, and governs execution across agents and systems. It handles scheduling, branching, retries, approvals, and observability. It is the layer that turns individual agent capabilities into coherent operational processes.",
          },
        ],
      },
      {
        id: "agent-memory-layer",
        level: 2,
        heading: "Agent Memory: The Intelligence Layer",
        blocks: [
          {
            type: "paragraph",
            text: "Agent Memory is the layer that gives agents context and continuity. It provides the four memory types — Conversational, Operational, Knowledge, and Shared — that allow agents to operate with institutional knowledge rather than starting from zero on every execution.",
          },
        ],
      },
      {
        id: "ai-saas-workspace-layer",
        level: 2,
        heading: "AI SaaS Workspace: The Product Layer",
        blocks: [
          {
            type: "paragraph",
            text: "AI SaaS Workspace is the layer that packages operational AI infrastructure into ready-to-deploy product environments. Hiring Workspace, Assessment Platform, and Content Studio are pre-built applications that combine all four underlying layers into domain-specific solutions organizations can deploy immediately.",
          },
          {
            type: "paragraph",
            text: "These five layers are connected through shared execution runtime, unified permission and governance infrastructure, common observability tooling, and a consistent API surface. They can be deployed individually or as an integrated platform.",
          },
        ],
      },
    ],
  },

  "ai-saas-workspace": {
    intro: [
      "Building AI infrastructure from scratch is expensive, slow, and risky. Most organizations attempting to deploy operational AI in specific domains spend the majority of their time on infrastructure concerns — deployment, security, data pipelines, integrations — rather than on the domain logic that actually creates value.",
      "AI SaaS Workspace changes that equation. It provides pre-built, production-ready operational environments that package all of Zaby's infrastructure capabilities into deployable, domain-specific products.",
    ],
    sections: [
      {
        id: "hiring-workspace",
        level: 2,
        heading: "Hiring Workspace",
        blocks: [
          {
            type: "paragraph",
            text: "The Hiring Workspace is a fully operational AI-native recruitment environment. It includes a Sourcing Agent that identifies candidates across job platforms, a Screening Agent that evaluates applications against role requirements, a Communication Agent that handles outreach and scheduling, and an Analytics Agent that tracks pipeline health.",
          },
          {
            type: "paragraph",
            text: "All agents operate on Zaby's execution infrastructure with shared memory of role history, candidate interactions, and hiring decisions. Human reviewers work in a collaborative interface that surfaces agent recommendations, flags for their attention, and tracks decisions for compliance.",
          },
        ],
      },
      {
        id: "assessment-platform",
        level: 2,
        heading: "Assessment Platform",
        blocks: [
          {
            type: "paragraph",
            text: "The Assessment Platform provides AI-native candidate and employee evaluation infrastructure. It includes adaptive assessment generation, automated proctoring, performance analysis, and structured reporting. Assessments can be configured for technical skills, behavioral attributes, domain knowledge, and role-specific scenarios.",
          },
          {
            type: "paragraph",
            text: "Assessment workflows integrate with the Hiring Workspace to create end-to-end evaluation pipelines, or can be deployed independently for learning and development use cases.",
          },
        ],
      },
      {
        id: "content-studio",
        level: 2,
        heading: "Content Studio",
        blocks: [
          {
            type: "paragraph",
            text: "Content Studio is an AI-native content operations environment. Content agents research, draft, review, and publish content across channels with configurable editorial workflows. Knowledge bases can be connected to ensure content accuracy. Human editors work in a collaborative review interface with full version history.",
          },
        ],
      },
      {
        id: "shared-infrastructure",
        level: 2,
        heading: "Shared Infrastructure",
        blocks: [
          {
            type: "paragraph",
            text: "All AI SaaS Workspace products share the same underlying infrastructure: Zaby's agent execution runtime, memory layer, workflow orchestration, observability tooling, and enterprise security. Organizations that adopt multiple workspaces benefit from shared memory, cross-workspace analytics, and unified governance.",
          },
        ],
      },
    ],
  },

  "why-operational-ai-matters": {
    intro: [
      "We are at the end of the first era of enterprise AI. The era of chatbots, copilots, and smart search. These products demonstrated AI capability. They generated genuine productivity gains. They made the case that AI could be useful in a business context.",
      "But they also revealed the ceiling of the conversation paradigm. And that ceiling is becoming the central problem of enterprise AI strategy.",
    ],
    sections: [
      {
        id: "the-limits-of-conversation-ai",
        level: 2,
        heading: "The Limits of Conversation-First AI",
        blocks: [
          {
            type: "paragraph",
            text: "Conversation-first AI tools are useful for individuals. They help knowledge workers draft faster, research more efficiently, and navigate complex information. But they do not scale organizational operations. They amplify individual productivity while leaving the organizational bottlenecks — volume, consistency, coordination — entirely in place.",
          },
          {
            type: "paragraph",
            text: "A support team that handles 1,000 tickets per day does not become a team that handles 10,000 tickets per day because every team member has an AI copilot. The per-interaction time might decrease. But the headcount required to handle the volume stays the same. Copilots do not change the scaling equation.",
          },
        ],
      },
      {
        id: "what-operational-ai-changes",
        level: 2,
        heading: "What Operational AI Changes",
        blocks: [
          {
            type: "paragraph",
            text: "Operational AI infrastructure changes the scaling equation by making agents the executors. Instead of assisting a human who handles each ticket, an operational AI system handles the tickets directly. Humans manage the system, review edge cases, refine policies, and handle the cases that genuinely require human judgment.",
          },
          {
            type: "paragraph",
            text: "This is not a small productivity improvement. It is an organizational architecture change. The ratio of volume to headcount shifts fundamentally when agents execute rather than assist.",
          },
          {
            type: "callout",
            text: "The organizations that will define the next decade of enterprise AI adoption will not be the ones with the best copilots. They will be the ones with the most capable operational AI infrastructure.",
          },
        ],
      },
      {
        id: "requirements-for-operational-ai",
        level: 2,
        heading: "Requirements for Operational AI",
        blocks: [
          {
            type: "paragraph",
            text: "Operational AI infrastructure is more demanding than conversational AI tooling. It requires real execution capability — not just generation. It requires persistent memory — not just per-session context. It requires enterprise governance — not just API access. It requires observability — not just usage metrics.",
          },
          {
            type: "list",
            items: [
              "Execution capability: agents must act on real systems, not just generate text",
              "Persistent memory: context must survive across sessions and agent restarts",
              "Enterprise governance: RBAC, audit logs, approval workflows, compliance controls",
              "Observability: execution traces, failure diagnostics, performance monitoring",
              "Coordination: agents must delegate, collaborate, and hand off without human orchestration",
            ],
          },
        ],
      },
    ],
  },

  "enterprise-deployment-models": {
    intro: [
      "Enterprise AI deployment is not one-size-fits-all. Organizations have different security requirements, data residency obligations, compliance frameworks, and infrastructure preferences. A deployment model appropriate for a tech startup is not appropriate for a regulated financial institution or a government contractor.",
      "Zaby offers three deployment models designed to meet the full spectrum of enterprise requirements.",
    ],
    sections: [
      {
        id: "cloud-deployment",
        level: 2,
        heading: "Cloud Deployment",
        blocks: [
          {
            type: "paragraph",
            text: "Cloud deployment is Zaby's managed infrastructure option. The Zaby team operates the execution infrastructure, handles scaling, applies security patches, and maintains uptime SLAs. Organizations get full platform capabilities immediately without infrastructure management overhead.",
          },
          {
            type: "paragraph",
            text: "Cloud deployment is appropriate for organizations whose data residency requirements are satisfied by Zaby's data processing agreements and whose security teams are comfortable with a managed infrastructure posture. It is the fastest path to production deployment.",
          },
        ],
      },
      {
        id: "dedicated-enterprise",
        level: 2,
        heading: "Dedicated Enterprise Deployment",
        blocks: [
          {
            type: "paragraph",
            text: "Dedicated enterprise deployment provides an isolated Zaby environment running on dedicated infrastructure, either in Zaby-managed cloud regions or in a customer-specified cloud account. The organization's workloads run on infrastructure that is not shared with other Zaby customers.",
          },
          {
            type: "paragraph",
            text: "This model is appropriate for organizations with strict data isolation requirements, regulated industries with specific infrastructure compliance needs, or organizations processing sensitive data that requires network-level isolation.",
          },
        ],
      },
      {
        id: "self-hosted",
        level: 2,
        heading: "Self-Hosted Deployment",
        blocks: [
          {
            type: "paragraph",
            text: "Self-hosted deployment enables organizations to run Zaby entirely within their own infrastructure — on-premises, in their own cloud account, or in air-gapped environments. The organization controls all infrastructure, all data, and all network boundaries.",
          },
          {
            type: "list",
            items: [
              "Full data sovereignty: no data leaves the organization's infrastructure",
              "Air-gap compatible: can operate without internet access for sensitive environments",
              "Custom security controls: integrate with existing enterprise security tooling",
              "Compliance ready: meet sector-specific regulatory requirements",
            ],
          },
          {
            type: "paragraph",
            text: "Self-hosted deployment is appropriate for government agencies, defense contractors, financial institutions with strict data sovereignty requirements, and any organization that cannot accept external data processing.",
          },
        ],
      },
      {
        id: "choosing-a-model",
        level: 2,
        heading: "Choosing the Right Model",
        blocks: [
          {
            type: "paragraph",
            text: "The right deployment model depends on your organization's security posture, compliance requirements, infrastructure capabilities, and time-to-deployment priorities. Zaby's enterprise team works with each organization to assess requirements and recommend the appropriate deployment architecture. All three models provide the same platform capabilities; they differ in infrastructure ownership, data residency, and operational responsibilities.",
          },
        ],
      },
    ],
  },
};

// ─── Helpers ──────────────────────────────────────────────────────────────────

export const ACCENT_STYLES: Record<Accent, { badge: string; bar: string; gradient: string; ring: string }> = {
  fuchsia: {
    badge: "bg-fuchsia-50 text-fuchsia-700 border border-fuchsia-100",
    bar: "bg-fuchsia-500",
    gradient: "from-fuchsia-100 via-purple-50 to-pink-100",
    ring: "ring-fuchsia-200",
  },
  blue: {
    badge: "bg-blue-50 text-blue-700 border border-blue-100",
    bar: "bg-blue-500",
    gradient: "from-blue-100 via-sky-50 to-indigo-100",
    ring: "ring-blue-200",
  },
  teal: {
    badge: "bg-teal-50 text-teal-700 border border-teal-100",
    bar: "bg-teal-500",
    gradient: "from-teal-100 via-emerald-50 to-cyan-100",
    ring: "ring-teal-200",
  },
};

export function getPostBySlug(slug: string): Post | undefined {
  return POSTS.find((p) => p.slug === slug);
}

export function getRelatedPosts(slug: string, count = 3): Post[] {
  const post = getPostBySlug(slug);
  if (!post) return POSTS.slice(0, count);

  const sameCategory = POSTS.filter(
    (p) => p.slug !== slug && p.category === post.category
  );
  const others = POSTS.filter(
    (p) => p.slug !== slug && p.category !== post.category
  );

  return [...sameCategory, ...others].slice(0, count);
}
