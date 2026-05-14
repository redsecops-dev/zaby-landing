"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { FooterSection } from "@/components/sections/FooterSection";

// ─── Privacy Content ────────────────────────────────────────────────────────

const PRIVACY_SECTIONS = [
  {
    id: "overview",
    title: "1. Overview",
    content: [
      {
        type: "paragraph",
        text: "Zaby AI, Inc. (\"Zaby,\" \"we,\" \"our,\" or \"us\") is committed to protecting your privacy and the privacy of data processed through our platform. This Privacy Policy explains how we collect, use, store, share, and protect information when you access or use the Zaby platform, including our websites, APIs, services, and applications.",
      },
      {
        type: "paragraph",
        text: "Zaby is an AI-native operational infrastructure platform. Our services include Agent Squad, Open Agents, Agentic Workflows, Agent Memory, and AI SaaS Workspace. Each of these services may process different types of data depending on how you use the platform.",
      },
      {
        type: "paragraph",
        text: "By using the Zaby platform, you agree to the collection and use of information in accordance with this Privacy Policy. If you do not agree with the terms of this policy, please do not use our services.",
      },
    ],
  },
  {
    id: "information-we-collect",
    title: "2. Information We Collect",
    content: [
      {
        type: "paragraph",
        text: "We collect information in several ways depending on how you interact with the Zaby platform. The categories of information we collect include:",
      },
      {
        type: "subheading",
        text: "2.1 Account & Identity Information",
      },
      {
        type: "list",
        items: [
          "Name, email address, and password when you create an account",
          "Organization name and billing information for enterprise accounts",
          "Profile information and preferences you provide during onboarding",
          "Authentication credentials and access tokens for API usage",
        ],
      },
      {
        type: "subheading",
        text: "2.2 Usage & Operational Data",
      },
      {
        type: "list",
        items: [
          "Agent configurations, workflow definitions, and task instructions you create",
          "Execution logs, interaction histories, and operational metrics",
          "API request and response data generated during platform use",
          "Browser interaction data and computer-use session logs from Agent Squad deployments",
        ],
      },
      {
        type: "subheading",
        text: "2.3 Content You Upload",
      },
      {
        type: "paragraph",
        text: "You may upload documents, knowledge bases, business data, and other content to the platform (\"Your Content\"). This content may be stored in Agent Memory systems and used to train or configure agents within your workspace. You retain ownership of all content you upload.",
      },
      {
        type: "subheading",
        text: "2.4 Technical & Device Data",
      },
      {
        type: "list",
        items: [
          "IP addresses, browser type, and operating system",
          "Device identifiers and network information",
          "Log files, error reports, and performance data",
          "Cookies and similar tracking technologies",
        ],
      },
    ],
  },
  {
    id: "how-we-use-data",
    title: "3. How We Use Your Information",
    content: [
      {
        type: "paragraph",
        text: "We use the information we collect to operate, maintain, and improve the Zaby platform. Specifically, we use your information to:",
      },
      {
        type: "list",
        items: [
          "Provision and deliver the services you have requested, including agent execution, workflow orchestration, and memory persistence",
          "Authenticate your identity and manage your account and access permissions",
          "Process and execute agent tasks, workflows, and operational instructions you configure",
          "Store and retrieve data through Agent Memory systems to enable contextual continuity across sessions",
          "Monitor platform performance, detect errors, and maintain service reliability",
          "Provide customer support and respond to your inquiries",
          "Send you service-related communications, including security alerts and policy updates",
          "Comply with legal obligations and enforce our Terms of Service",
        ],
      },
      {
        type: "subheading",
        text: "3.1 AI Model Usage",
      },
      {
        type: "paragraph",
        text: "Agent operations on the Zaby platform involve processing your instructions and data through AI models. We do not use your content or operational data to train foundation AI models without your explicit consent. Enterprise customers may request additional contractual protections regarding AI model training.",
      },
    ],
  },
  {
    id: "agent-memory-data",
    title: "4. Agent Memory & Data Persistence",
    content: [
      {
        type: "paragraph",
        text: "Agent Memory is a core capability of the Zaby platform that enables AI agents to retain information across sessions and environments. Understanding how memory systems work is important for understanding how your data is stored and processed.",
      },
      {
        type: "subheading",
        text: "4.1 Memory Types",
      },
      {
        type: "list",
        items: [
          "Conversational Memory: stores user interactions, preferences, and historical conversation data to enable personalized agent responses",
          "Operational Memory: stores workflow state, execution history, and operational context to support long-running task continuity",
          "Knowledge Memory: stores organizational documents, business knowledge, and reference materials you upload for agent access",
          "Shared Memory: enables multi-agent coordination and shared operational context within your workspace",
        ],
      },
      {
        type: "subheading",
        text: "4.2 Memory Storage & Retrieval",
      },
      {
        type: "paragraph",
        text: "Memory data is stored using vector storage, semantic indexing, and structured memory systems. Retrieval is permission-aware — agents only access memory scoped to their assigned permissions and your organizational boundaries. Memory data is encrypted at rest and in transit.",
      },
      {
        type: "subheading",
        text: "4.3 Memory Deletion",
      },
      {
        type: "paragraph",
        text: "You can request deletion of memory data stored in your workspace at any time through the platform settings or by contacting our support team. Enterprise customers may configure automated memory retention and deletion policies through dedicated workspace controls.",
      },
    ],
  },
  {
    id: "data-sharing",
    title: "5. Data Sharing & Third Parties",
    content: [
      {
        type: "paragraph",
        text: "We do not sell your personal information or operational data to third parties. We may share information in the following limited circumstances:",
      },
      {
        type: "subheading",
        text: "5.1 Service Providers",
      },
      {
        type: "paragraph",
        text: "We engage trusted third-party service providers to help operate the platform, including cloud infrastructure providers, AI model providers, and payment processors. These providers are contractually bound to process data only as directed by Zaby and in accordance with applicable privacy laws.",
      },
      {
        type: "subheading",
        text: "5.2 Third-Party Integrations",
      },
      {
        type: "paragraph",
        text: "The Zaby platform supports integrations with external services including CRMs, scheduling systems, payment platforms, communication channels (WhatsApp, Slack, Discord), and enterprise systems. When you configure agents to interact with these integrations, data may be transmitted to and from those third-party services. Your use of third-party integrations is subject to the respective privacy policies of those services.",
      },
      {
        type: "subheading",
        text: "5.3 Legal Requirements",
      },
      {
        type: "paragraph",
        text: "We may disclose information when required by law, legal process, or governmental authority, or when we believe disclosure is necessary to protect the rights, property, or safety of Zaby, our customers, or the public.",
      },
      {
        type: "subheading",
        text: "5.4 Business Transfers",
      },
      {
        type: "paragraph",
        text: "In the event of a merger, acquisition, or sale of assets, your information may be transferred as part of that transaction. We will notify you of any such change and the applicable privacy commitments.",
      },
    ],
  },
  {
    id: "security",
    title: "6. Security Infrastructure",
    content: [
      {
        type: "paragraph",
        text: "Zaby implements comprehensive security infrastructure across all platform services to protect your data and operational systems.",
      },
      {
        type: "subheading",
        text: "6.1 Technical Safeguards",
      },
      {
        type: "list",
        items: [
          "Role-based access control (RBAC) for permission management across agents, workflows, and workspaces",
          "Environment isolation to prevent cross-tenant data access",
          "Audit logs for all agent executions, workflow runs, and administrative actions",
          "Encryption of data at rest and in transit using industry-standard protocols",
          "Secure API integrations with authentication and rate limiting",
        ],
      },
      {
        type: "subheading",
        text: "6.2 Observability & Monitoring",
      },
      {
        type: "paragraph",
        text: "Our observability layer tracks execution logs, metrics, and tracing data across all platform services. This monitoring helps us detect anomalies, investigate incidents, and maintain platform integrity. Operational logs are retained according to our data retention schedule and are accessible to you through the platform audit interface.",
      },
      {
        type: "subheading",
        text: "6.3 Security Incidents",
      },
      {
        type: "paragraph",
        text: "In the event of a data breach or security incident that affects your personal information, we will notify you as required by applicable law. Enterprise customers will receive incident notifications through their designated security contacts in accordance with agreed response procedures.",
      },
    ],
  },
  {
    id: "enterprise-data",
    title: "7. Enterprise Data Handling",
    content: [
      {
        type: "paragraph",
        text: "Enterprise customers have access to enhanced data handling capabilities and contractual protections. Zaby offers multiple deployment models that affect how your data is stored and processed:",
      },
      {
        type: "subheading",
        text: "7.1 Deployment Models",
      },
      {
        type: "list",
        items: [
          "Cloud Deployment: data is stored and processed on Zaby-managed infrastructure with standard platform security controls",
          "Dedicated Enterprise Deployment: isolated infrastructure environment where your data is logically and physically separated from other customers",
          "Self-Hosted Deployment: customer-managed infrastructure where you retain full control over data storage, processing, and security configuration",
        ],
      },
      {
        type: "subheading",
        text: "7.2 Data Processing Agreements",
      },
      {
        type: "paragraph",
        text: "Enterprise customers requiring GDPR-compliant Data Processing Agreements (DPAs) or CCPA-specific contractual terms can request these through their account manager. Zaby acts as a data processor for customer data and as a data controller for account and usage data.",
      },
      {
        type: "subheading",
        text: "7.3 Permission & Access Controls",
      },
      {
        type: "paragraph",
        text: "Enterprise workspaces include granular permission controls for agents, workflows, and memory systems. Administrators can configure role boundaries, operational restrictions, and environment permissions to align with your organization's data governance requirements.",
      },
    ],
  },
  {
    id: "data-retention",
    title: "8. Data Retention",
    content: [
      {
        type: "paragraph",
        text: "We retain different categories of data for different periods depending on the type of data, the purpose for which it was collected, and applicable legal requirements.",
      },
      {
        type: "subheading",
        text: "8.1 Retention Periods",
      },
      {
        type: "list",
        items: [
          "Account information: retained for the duration of your account and for a reasonable period after account deletion",
          "Agent Memory data: retained according to your workspace configuration; deletable on request",
          "Execution logs and workflow history: retained for 90 days by default; configurable for enterprise plans",
          "Billing and transaction records: retained as required by applicable financial regulations",
          "Security and audit logs: retained for 12 months to support incident investigation and compliance",
        ],
      },
      {
        type: "subheading",
        text: "8.2 Account Deletion",
      },
      {
        type: "paragraph",
        text: "When you delete your account, we will delete or anonymize your personal information within a commercially reasonable period, except where retention is required by law or for legitimate business purposes such as fraud prevention or financial record-keeping.",
      },
    ],
  },
  {
    id: "your-rights",
    title: "9. Your Rights & Controls",
    content: [
      {
        type: "paragraph",
        text: "Depending on your location, you may have certain rights regarding your personal information. Zaby is committed to honoring these rights regardless of jurisdiction.",
      },
      {
        type: "subheading",
        text: "9.1 Rights You May Have",
      },
      {
        type: "list",
        items: [
          "Access: request a copy of the personal information we hold about you",
          "Correction: request correction of inaccurate or incomplete information",
          "Deletion: request deletion of your personal information, subject to legal retention requirements",
          "Portability: request your data in a structured, machine-readable format",
          "Restriction: request that we limit how we process your information in certain circumstances",
          "Objection: object to certain types of processing, including direct marketing",
          "Withdrawal of consent: withdraw consent where processing is based on consent",
        ],
      },
      {
        type: "subheading",
        text: "9.2 How to Exercise Your Rights",
      },
      {
        type: "paragraph",
        text: "To exercise any of these rights, contact us at privacy@zaby.ai. We will respond to your request within the timeframe required by applicable law (typically 30 days). We may need to verify your identity before processing certain requests.",
      },
      {
        type: "subheading",
        text: "9.3 Cookie & Tracking Controls",
      },
      {
        type: "paragraph",
        text: "You can control cookies and tracking technologies through your browser settings. Disabling certain cookies may affect the functionality of the platform. We do not respond to Do Not Track signals at this time but will honor applicable regional opt-out mechanisms.",
      },
    ],
  },
  {
    id: "children",
    title: "10. Children's Privacy",
    content: [
      {
        type: "paragraph",
        text: "The Zaby platform is designed for use by businesses and professionals. We do not knowingly collect personal information from individuals under the age of 16. If you believe we have inadvertently collected information from a minor, please contact us immediately at privacy@zaby.ai and we will take steps to delete that information.",
      },
    ],
  },
  {
    id: "international-transfers",
    title: "11. International Data Transfers",
    content: [
      {
        type: "paragraph",
        text: "Zaby operates globally and your information may be transferred to and processed in countries other than your country of residence. These countries may have different data protection laws than your jurisdiction.",
      },
      {
        type: "paragraph",
        text: "When we transfer personal information across borders, we implement appropriate safeguards including Standard Contractual Clauses approved by the European Commission, adequacy decisions where applicable, and other transfer mechanisms recognized under applicable data protection law.",
      },
      {
        type: "paragraph",
        text: "Enterprise customers requiring data residency commitments — including EU, UK, or specific regional data storage requirements — may configure dedicated deployment environments. Contact your account manager for information about available data residency options.",
      },
    ],
  },
  {
    id: "policy-changes",
    title: "12. Changes to This Policy",
    content: [
      {
        type: "paragraph",
        text: "We may update this Privacy Policy from time to time to reflect changes in our practices, technology, legal requirements, or other factors. We will notify you of material changes by posting the updated policy on our website and, where required, by sending you a direct notification.",
      },
      {
        type: "paragraph",
        text: "The date at the top of this policy indicates when it was last updated. We encourage you to review this policy periodically. Your continued use of the platform following the posting of changes constitutes your acceptance of the updated policy.",
      },
    ],
  },
  {
    id: "contact",
    title: "13. Contact Us",
    content: [
      {
        type: "paragraph",
        text: "If you have questions, concerns, or requests related to this Privacy Policy or how Zaby handles your data, please contact us at:",
      },
      {
        type: "list",
        items: [
          "Email: privacy@zaby.ai",
          "Legal inquiries: legal@zaby.ai",
          "Mailing address: Zaby AI, Inc. — available upon written request",
        ],
      },
      {
        type: "paragraph",
        text: "For EU/EEA residents, Zaby's designated Data Protection Officer can be reached at privacy@zaby.ai. We will respond to all privacy-related inquiries within 30 days.",
      },
    ],
  },
];

// ─── Types ───────────────────────────────────────────────────────────────────

type ContentBlock =
  | { type: "paragraph"; text: string }
  | { type: "subheading"; text: string }
  | { type: "list"; items: string[] };

// ─── Components ─────────────────────────────────────────────────────────────

function TableOfContents({
  activeSection,
  onSectionClick,
}: {
  activeSection: string;
  onSectionClick: (id: string) => void;
}) {
  return (
    <nav className="sticky top-24 w-56 shrink-0 hidden lg:block self-start">
      <p className="text-xs font-semibold uppercase tracking-widest text-neutral-400 mb-4">
        In this article
      </p>
      <ul className="flex flex-col gap-0.5">
        {PRIVACY_SECTIONS.map((section) => (
          <li key={section.id}>
            <button
              onClick={() => onSectionClick(section.id)}
              className={`text-left text-sm w-full px-2 py-1.5 rounded-md transition-colors leading-snug ${
                activeSection === section.id
                  ? "text-fuchsia-600 font-medium bg-fuchsia-50"
                  : "text-neutral-500 hover:text-neutral-800 hover:bg-neutral-50"
              }`}
            >
              {section.title}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
}

function SectionContent({ content }: { content: ContentBlock[] }) {
  return (
    <div className="flex flex-col gap-4">
      {content.map((block, i) => {
        if (block.type === "paragraph") {
          return (
            <p key={i} className="text-[15px] leading-relaxed text-neutral-600">
              {block.text}
            </p>
          );
        }
        if (block.type === "subheading") {
          return (
            <h3 key={i} className="text-base font-semibold text-neutral-800 mt-3">
              {block.text}
            </h3>
          );
        }
        if (block.type === "list") {
          return (
            <ul key={i} className="flex flex-col gap-2.5 pl-1">
              {block.items.map((item, j) => (
                <li key={j} className="flex items-start gap-3 text-[15px] leading-relaxed text-neutral-600">
                  <span className="mt-1.75 w-1.5 h-1.5 rounded-full bg-fuchsia-500 shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          );
        }
        return null;
      })}
    </div>
  );
}

// ─── Page ────────────────────────────────────────────────────────────────────

export default function PrivacyPage() {
  const [activeSection, setActiveSection] = useState(PRIVACY_SECTIONS[0].id);
  const sectionRefs = useRef<Record<string, HTMLElement | null>>({});

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        }
      },
      { rootMargin: "-20% 0px -70% 0px", threshold: 0 }
    );

    PRIVACY_SECTIONS.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const offset = 100;
      const y = el.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  return (
    <>
      {/* Hero / Header */}
      <div className="border-b border-neutral-200 bg-white">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-24 py-14 md:py-20">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-neutral-400 mb-8">
            <Link href="/" className="hover:text-fuchsia-600 transition-colors">
              Home
            </Link>
            <span>/</span>
            <span className="text-neutral-600">Privacy Policy</span>
          </nav>

          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-fuchsia-50 border border-fuchsia-100 rounded-full px-3 py-1 mb-5">
            <span className="w-1.5 h-1.5 rounded-full bg-fuchsia-500" />
            <span className="text-xs font-semibold uppercase tracking-widest text-fuchsia-600">
              Legal
            </span>
          </div>

          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-neutral-900 mb-4">
            Privacy Policy
          </h1>
          <p className="text-neutral-500 text-base max-w-2xl leading-relaxed">
            We are committed to protecting your privacy and the data processed through our platform.
            This policy explains how we collect, use, and safeguard your information.
          </p>
          <p className="mt-4 text-sm text-neutral-400">
            Last updated:{" "}
            <time dateTime="2025-05-14" className="font-medium text-neutral-600">
              May 14, 2025
            </time>
          </p>
        </div>
      </div>

      {/* Main layout */}
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-24 py-14 md:py-20">
        <div className="flex gap-16 xl:gap-20">
          {/* Main Content */}
          <div className="flex-1 min-w-0">
            {/* Intro block */}
            <div className="mb-12 pb-10 border-b border-neutral-200">
              <p className="text-[15px] leading-relaxed text-neutral-600">
                This Privacy Policy describes how Zaby AI, Inc. collects, uses, stores, and protects
                information when you use the Zaby platform, including{" "}
                <a
                  href="https://zaby.ai"
                  className="text-fuchsia-600 hover:underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  https://zaby.ai
                </a>{" "}
                and all related services, APIs, and applications.
              </p>
              <p className="mt-4 text-[15px] leading-relaxed text-neutral-600">
                For questions about our Terms of Service, visit our{" "}
                <Link href="/terms" className="text-fuchsia-600 hover:underline">
                  Terms of Service
                </Link>{" "}
                page. To exercise your privacy rights, contact us at{" "}
                <a href="mailto:privacy@zaby.ai" className="text-fuchsia-600 hover:underline">
                  privacy@zaby.ai
                </a>
                .
              </p>
            </div>

            {/* Section blocks */}
            <div className="flex flex-col gap-14">
              {PRIVACY_SECTIONS.map((section) => (
                <section
                  key={section.id}
                  id={section.id}
                  ref={(el) => {
                    sectionRefs.current[section.id] = el;
                  }}
                  className="scroll-mt-28"
                >
                  <h2 className="text-xl font-bold text-neutral-900 mb-5 pb-3 border-b border-neutral-200">
                    {section.title}
                  </h2>
                  <SectionContent content={section.content as ContentBlock[]} />
                </section>
              ))}
            </div>

            {/* Footer note */}
            <div className="mt-16 pt-10 border-t border-neutral-200">
              <p className="text-sm text-neutral-500">
                For privacy-related questions or to exercise your rights, contact us at{" "}
                <a
                  href="mailto:privacy@zaby.ai"
                  className="text-fuchsia-600 hover:underline font-medium"
                >
                  privacy@zaby.ai
                </a>
                . For general legal inquiries, visit our{" "}
                <Link href="/terms" className="text-fuchsia-600 hover:underline font-medium">
                  Terms of Service
                </Link>
                .
              </p>
            </div>
          </div>

          {/* Sticky Table of Contents */}
          <TableOfContents activeSection={activeSection} onSectionClick={scrollToSection} />
        </div>
      </div>

      <FooterSection />
    </>
  );
}
