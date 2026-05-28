export interface NavItem {
  label: string;
  href: string;
  external?: boolean;
  dropdown?: boolean;
  sections?: {
    title: string;
    items: {
      label: string;
      description?: string;
      href: string;
    }[];
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
    sections: [
      {
        title: "Platform Tools",
        items: [
          { label: "AI Assessments", description: "Automated candidate screening and evaluation.", href: "/assessments" },
          { label: "Hiring", description: "Automate your hiring process with AI.", href: "/hiring" },
          { label: "Edtech", description: "Streamline your teaching process with AI.", href: "/edtech" },
        ]
      },
      {
        title: "Enterprise Solutions",
        items: [
          { label: "Question Bank Generation", description: "Automated & Manual generation of diverse exam questions.", href: "/question-bank" },
          { label: "Talent Intelligence", description: "Map and optimize your workforce skills.", href: "/talent" },
          { label: "Compliance & Safety", description: "Enterprise-grade security and monitoring.", href: "/security" },
        ]
      }
    ],
    featured: {
      title: "Solutions That Drive Outcomes",
      description: "Discover how Zaby helps enterprises deliver reliable, AI-powered engagement and actionable insights.",
      href: "/request-demo",
      ctaLabel: "Request a Demo"
    }
  },
  {
    label: "AI Native",
    href: "#ai-native",
    dropdown: true,
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
