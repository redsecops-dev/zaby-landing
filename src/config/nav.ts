export interface NavItem {
  label: string;
  href: string;
  external?: boolean;
  dropdown?: boolean;
  menuStyle?: "standard" | "sidebar";
  sections?: {
    title: string;
    items: {
      label: string;
      description?: string;
      href: string;
    }[];
  }[];
  sidebarItems?: {
    label: string;
    description?: string;
    href: string;
    icon?: string;
    content: {
      title: string;
      description?: string;
      href?: string;
      ctaLabel?: string;
      features: {
        title: string;
        description: string;
        href: string;
      }[];
    };
  }[];
  featured?: {
    title: string;
    description: string;
    href: string;
    image?: string;
    ctaLabel?: string;
  };
}

export interface NavGroup {
  label: string;
  items: NavItem[];
}

export const navLinks: NavItem[] = [
  {
    label: "Workflows",
    href: "#workflows",
    dropdown: true,
    menuStyle: "sidebar",
    sidebarItems: [
      {
        label: "AI Assessments",
        description: "Automated candidate screening and evaluation.",
        href: "/assessments",
        content: {
          title: "Intelligent Candidate Evaluation",
          description: "Transform your hiring process with AI-driven assessments that accurately measure skills and potential.",
          href: "/assessments",
          ctaLabel: "Explore Assessments",
          features: [
            {
              title: "Question Bank Generation",
              description: "Automated & Manual generation of diverse exam questions tailored to specific roles.",
              href: "/question-bank"
            },
            {
              title: "Code Evaluation",
              description: "Automated grading of coding assignments in secure environments.",
              href: "/assessments/coding"
            },
            {
              title: "Interview Copilot",
              description: "Real-time assistance for interviewers with structured feedback.",
              href: "/assessments/interview"
            }
          ]
        }
      },
      {
        label: "Hiring Automation",
        description: "End-to-end AI recruitment workflows.",
        href: "/hiring",
        content: {
          title: "Streamline Recruitment",
          description: "Automate sourcing, screening, and scheduling to focus on finding the best talent.",
          href: "/hiring",
          ctaLabel: "View Hiring Workflows",
          features: [
            {
              title: "Resume Parsing",
              description: "Instantly extract and structure candidate data from resumes.",
              href: "/hiring/parsing"
            },
            {
              title: "Automated Outreach",
              description: "Engage candidates with personalized, AI-generated communications.",
              href: "/hiring/outreach"
            }
          ]
        }
      },
      {
        label: "EdTech Infrastructure",
        description: "AI tools for personalized learning.",
        href: "/edtech",
        content: {
          title: "Next-Gen Learning Tools",
          description: "Empower educators and engage students with intelligent, adaptive learning platforms.",
          href: "/edtech",
          ctaLabel: "Discover EdTech",
          features: [
            {
              title: "Personalized Tutoring",
              description: "AI tutors that adapt to individual student learning paces.",
              href: "/edtech/tutors"
            },
            {
              title: "Content Generation",
              description: "Automatically create lesson plans and study materials.",
              href: "/edtech/content"
            }
          ]
        }
      },
      {
        label: "Enterprise Solutions",
        description: "Scalable intelligence for large organizations.",
        href: "/enterprise",
        content: {
          title: "Scale Intelligence",
          description: "Deploy robust, secure AI workflows tailored to your organizational needs.",
          href: "/enterprise",
          ctaLabel: "Enterprise Overview",
          features: [
            {
              title: "Talent Intelligence",
              description: "Map and optimize your workforce skills across the enterprise.",
              href: "/talent"
            },
            {
              title: "Compliance & Safety",
              description: "Enterprise-grade security, logging, and monitoring.",
              href: "/security"
            }
          ]
        }
      }
    ]
  },
  {
    label: "AI Native",
    href: "#ai-native",
    dropdown: true,
    menuStyle: "standard",
    sections: [
      {
        title: "Agent Capabilities",
        items: [
          { label: "Agent Squad", description: "Orchestrate multiple agents for complex tasks.", href: "/agent-squad" },
          { label: "AI Memory", description: "Persistent context across agent interactions.", href: "/memory" },
          { label: "Agentic Workflow", description: "Design autonomous business processes.", href: "/workflows" },
        ]
      },
      {
        title: "Developer Tools",
        items: [
          { label: "Agent Sandbox", description: "Test and refine agents in a safe environment.", href: "/sandbox" },
          { label: "Open Agents", description: "Community-driven pre-built agent templates.", href: "/open-agents" },
          { label: "Custom MCPs", description: "Extend capabilities with custom protocols.", href: "/mcp" },
        ]
      }
    ],
    featured: {
      title: "The Agentic Future",
      description: "Explore our latest ebook on delivering a 360° customer experience with autonomous agents.",
      href: "/ebook",
      ctaLabel: "Read Ebook"
    }
  },
  { label: "Pricing", href: "#pricing" },
  { label: "Resources", href: "/docs" },
];

export const footerNav: NavGroup[] = [
  {
    label: "Product",
    items: [
      { label: "Features", href: "#features" },
      { label: "Pricing", href: "#pricing" },
      { label: "Changelog", href: "/changelog" },
      { label: "Roadmap", href: "/roadmap" },
    ],
  },
  {
    label: "Company",
    items: [
      { label: "About", href: "/about" },
      { label: "Blog", href: "/blog" },
      { label: "Careers", href: "/careers" },
      { label: "Press", href: "/press" },
    ],
  },
  {
    label: "Legal",
    items: [
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Terms of Service", href: "/terms-of-services" },
      { label: "Cookie Policy", href: "/cookies" },
      { label: "Security", href: "/security" },
    ],
  },
];
