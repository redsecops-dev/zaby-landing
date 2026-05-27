"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { FooterSection } from "@/components/sections";
import { SectionWrapper, Container } from "@/components/layout";
import { GlassPanel, GradientOrb, HeroBadge } from "@/components/shared";
import { ScrollReveal } from "@/components/animations";
import { cn } from "@/lib/utils";


// ─── Terms Content ─────────────────────────────────────────────────────────

const TERMS_SECTIONS = [
  {
    id: "overview",
    title: "1. Overview",
    content: [
      {
        type: "paragraph",
        text: "Zaby is an AI-native operational infrastructure platform designed to help businesses deploy autonomous AI systems capable of execution, workflow automation, operational intelligence, and multimodal interaction. These Terms of Service (\"Terms\") govern your access to and use of the Zaby platform, including all services, APIs, and software made available through our websites and applications.",
      },
      {
        type: "paragraph",
        text: "By accessing or using the Zaby platform, you signify that you have read, understood, and agree to be bound by these Terms. Zaby reserves the right to modify these Terms at any time and will provide notice of material changes. Continued use of the platform following any such changes constitutes your acceptance of the revised Terms.",
      },
      {
        type: "paragraph",
        text: "These Terms apply to all visitors, users, and others who access the Service, whether as individuals, team members, or entities accessing the platform on behalf of an organization.",
      },
    ],
  },
  {
    id: "platform-philosophy",
    title: "2. Platform Philosophy & Purpose",
    content: [
      {
        type: "paragraph",
        text: "Zaby is designed around execution — not conversation. The platform enables AI systems to operate as digital operational infrastructure, allowing agents to execute tasks, interact with software, operate continuously, retain memory, collaborate with humans, and coordinate with other agents inside enterprise operational environments.",
      },
      {
        type: "paragraph",
        text: "The platform is intentionally designed to move beyond static copilots, prompt wrappers, isolated automation tools, and narrow chatbot systems. Users agree to deploy and use the platform in accordance with this operational purpose and in a manner consistent with applicable laws and enterprise governance requirements.",
      },
    ],
  },
  {
    id: "agent-squad",
    title: "3. Agent Squad Service",
    content: [
      {
        type: "paragraph",
        text: "Agent Squad is the operational AI employee layer of the Zaby platform. It enables organizations to deploy specialized autonomous AI employees capable of performing operational tasks using browser interaction, software operation, workflow execution, reasoning systems, tool integrations, and computer-use infrastructure.",
      },
      {
        type: "subheading",
        text: "3.1 Permitted Uses",
      },
      {
        type: "list",
        items: [
          "Operational monitoring, dashboard verification, and infrastructure checks",
          "Quality assurance including regression testing, UI validation, and workflow testing",
          "Customer support ticket resolution, interaction, and escalation handling",
          "Recruitment workflows including candidate screening and interview coordination",
          "Research tasks including information gathering, market analysis, and document summarization",
        ],
      },
      {
        type: "subheading",
        text: "3.2 Execution Modes",
      },
      {
        type: "paragraph",
        text: "Agents deployed through Agent Squad may operate in Browser Interaction, Computer Use, API Execution, and Workflow Coordination modes. Users are responsible for ensuring that agents operate within the permissions and access boundaries set by your organization and applicable third-party service agreements.",
      },
    ],
  },
  {
    id: "open-agents",
    title: "4. Open Agents Service",
    content: [
      {
        type: "paragraph",
        text: "Open Agents is the customizable multimodal agent creation layer of the platform, enabling organizations to build domain-specific AI agents for customer-facing and internal operational workflows across text, voice, vision, browser interaction, and API modalities.",
      },
      {
        type: "subheading",
        text: "4.1 User Obligations",
      },
      {
        type: "paragraph",
        text: "When deploying agents via Open Agents, you are solely responsible for the behavior, outputs, and compliance of those agents. This includes ensuring that agents deployed to third-party channels (websites, WhatsApp, Slack, Discord, mobile applications, voice systems) comply with the respective platform's terms of service and applicable laws.",
      },
      {
        type: "subheading",
        text: "4.2 Prohibited Deployments",
      },
      {
        type: "list",
        items: [
          "Deploying agents designed to deceive, manipulate, or defraud users",
          "Creating agents that violate privacy laws or collect data without consent",
          "Building agents for automated spam, phishing, or social engineering",
          "Deploying agents in contexts that violate third-party platform terms of service",
          "Using agents to circumvent security controls or access unauthorized systems",
        ],
      },
    ],
  },
  {
    id: "agentic-workflows",
    title: "5. Agentic Workflows",
    content: [
      {
        type: "paragraph",
        text: "Agentic Workflows is the orchestration and autonomous process execution layer of the platform. It enables businesses to automate repetitive, operational, scheduled, and reasoning-based workflows with capabilities including scheduling, retries, failure recovery, observability, event handling, notifications, approvals, branching logic, and agent chaining.",
      },
      {
        type: "subheading",
        text: "5.1 Workflow Responsibility",
      },
      {
        type: "paragraph",
        text: "You are responsible for designing, testing, and validating workflows before deploying them in production environments. Zaby provides the infrastructure for workflow execution but does not warrant the correctness, completeness, or fitness for purpose of any workflow logic you create.",
      },
      {
        type: "subheading",
        text: "5.2 Human Approval Workflows",
      },
      {
        type: "paragraph",
        text: "For workflows involving consequential decisions — including escalation systems, review processes, and approval pipelines — you are responsible for ensuring appropriate human oversight is incorporated. Zaby strongly recommends implementing human-in-the-loop validation for any workflow that may have significant business, legal, or operational impact.",
      },
    ],
  },
  {
    id: "agent-memory",
    title: "6. Agent Memory",
    content: [
      {
        type: "paragraph",
        text: "Agent Memory is the persistent intelligence infrastructure layer for AI systems, enabling agents to retain operational knowledge, user context, workflow state, historical interactions, and organizational information across sessions and environments.",
      },
      {
        type: "subheading",
        text: "6.1 Data Stored in Memory",
      },
      {
        type: "paragraph",
        text: "Memory systems may store Conversational Memory (user interactions, preferences, historical conversations), Operational Memory (workflow state, execution history, operational context), Knowledge Memory (organizational documents, business knowledge, reference materials), and Shared Memory for multi-agent coordination.",
      },
      {
        type: "subheading",
        text: "6.2 Data Ownership",
      },
      {
        type: "paragraph",
        text: "All data stored in Agent Memory systems remains your property. You are responsible for ensuring that data stored in memory systems complies with applicable data protection laws including GDPR, CCPA, and other regional privacy regulations. Zaby provides the infrastructure for memory storage and retrieval but does not claim ownership of your data.",
      },
    ],
  },
  {
    id: "ai-saas-workspace",
    title: "7. AI SaaS Workspace",
    content: [
      {
        type: "paragraph",
        text: "AI SaaS Workspace is the application-layer operational environment providing prebuilt AI-native business workspaces with integrated agents, workflows, analytics, collaboration systems, and operational tooling. Available workspace types include Hiring Workspace, Assessment Platform, Content Studio, and Support Operations Center.",
      },
      {
        type: "subheading",
        text: "7.1 Workspace Access",
      },
      {
        type: "paragraph",
        text: "Access to specific workspace types is determined by your subscription plan. Zaby reserves the right to modify, update, or discontinue workspace features with reasonable notice. Enterprise customers may negotiate specific feature availability through dedicated agreements.",
      },
    ],
  },
  {
    id: "proprietary-rights",
    title: "8. Proprietary Rights",
    content: [
      {
        type: "paragraph",
        text: "The Zaby platform, including all software, infrastructure, models, APIs, documentation, and intellectual property, is owned by Zaby and its licensors. Nothing in these Terms grants you any ownership rights in the platform or any of its components.",
      },
      {
        type: "paragraph",
        text: "Subject to these Terms, Zaby grants you a limited, non-exclusive, non-transferable, revocable license to access and use the platform solely for your internal business operations. This license does not permit resale, sublicensing, or distribution of the platform or any of its components.",
      },
      {
        type: "subheading",
        text: "8.1 Your Content",
      },
      {
        type: "paragraph",
        text: "You retain all rights to data, workflows, agent configurations, and content you create or upload to the platform (\"Your Content\"). By submitting Your Content, you grant Zaby a limited license to host, process, and transmit Your Content solely as necessary to provide the services.",
      },
    ],
  },
  {
    id: "security",
    title: "9. Security",
    content: [
      {
        type: "paragraph",
        text: "Zaby implements security infrastructure including RBAC permissions, environment isolation, audit logs, and secure integrations across all platform services. We maintain industry-standard security practices and regularly conduct security audits.",
      },
      {
        type: "paragraph",
        text: "You are responsible for maintaining the security of your account credentials, managing access permissions within your organization, and ensuring that agents and workflows deployed through the platform do not introduce security vulnerabilities to your systems or third-party services.",
      },
      {
        type: "subheading",
        text: "9.1 Incident Reporting",
      },
      {
        type: "paragraph",
        text: "You agree to promptly notify Zaby of any unauthorized access to your account, any suspected security breach involving the platform, or any misuse of agent systems or workflows. Zaby will investigate and respond to security reports in accordance with our Security Response Policy.",
      },
    ],
  },
  {
    id: "enterprise-deployment",
    title: "10. Enterprise Deployment",
    content: [
      {
        type: "paragraph",
        text: "Zaby offers multiple deployment models to meet enterprise requirements: Cloud Deployment (managed infrastructure hosted by Zaby), Dedicated Enterprise Deployment (isolated enterprise infrastructure), and Self-Hosted Deployment (customer-managed infrastructure environments).",
      },
      {
        type: "paragraph",
        text: "Enterprise customers accessing Dedicated or Self-Hosted deployments are subject to additional terms as specified in their Enterprise Agreement. In the event of any conflict between these Terms and an Enterprise Agreement, the Enterprise Agreement shall prevail.",
      },
    ],
  },
  {
    id: "no-warranty",
    title: "11. No Warranty",
    content: [
      {
        type: "paragraph",
        text: 'THE ZABY PLATFORM IS PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT WARRANTIES OF ANY KIND, WHETHER EXPRESS, IMPLIED, STATUTORY, OR OTHERWISE. ZABY SPECIFICALLY DISCLAIMS ALL IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, TITLE, AND NON-INFRINGEMENT.',
      },
      {
        type: "paragraph",
        text: "Zaby does not warrant that the platform will be uninterrupted, error-free, or free from harmful components. AI systems and autonomous agents may produce outputs that are inaccurate, incomplete, or unexpected. You are solely responsible for validating the outputs of any AI agent or workflow before acting upon them.",
      },
    ],
  },
  {
    id: "limitation-of-liability",
    title: "12. Limitation of Liability",
    content: [
      {
        type: "paragraph",
        text: "TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW, ZABY SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, INCLUDING LOSS OF PROFITS, REVENUE, DATA, BUSINESS, OR GOODWILL, EVEN IF ZABY HAS BEEN ADVISED OF THE POSSIBILITY OF SUCH DAMAGES.",
      },
      {
        type: "paragraph",
        text: "IN NO EVENT SHALL ZABY'S TOTAL CUMULATIVE LIABILITY ARISING OUT OF OR RELATED TO THESE TERMS EXCEED THE GREATER OF (A) THE AMOUNTS PAID BY YOU TO ZABY IN THE TWELVE MONTHS PRECEDING THE CLAIM, OR (B) ONE HUNDRED US DOLLARS ($100).",
      },
    ],
  },
  {
    id: "governing-law",
    title: "13. Governing Law",
    content: [
      {
        type: "paragraph",
        text: "These Terms shall be governed by and construed in accordance with the laws of the applicable jurisdiction, without regard to its conflict of law provisions. Any dispute arising from or relating to these Terms or your use of the Zaby platform shall be resolved through binding arbitration in accordance with the rules of the applicable arbitration body.",
      },
      {
        type: "paragraph",
        text: "You agree that any dispute resolution proceedings shall be conducted on an individual basis and not as part of a class, consolidated, or representative action. Nothing in these Terms prevents either party from seeking injunctive or other equitable relief in a court of competent jurisdiction.",
      },
    ],
  },
  {
    id: "general",
    title: "14. General",
    content: [
      {
        type: "paragraph",
        text: "These Terms constitute the entire agreement between you and Zaby with respect to the subject matter hereof, superseding any prior agreements or understandings. If any provision of these Terms is found to be unenforceable, the remaining provisions will remain in full force and effect.",
      },
      {
        type: "paragraph",
        text: "Zaby's failure to enforce any right or provision of these Terms shall not constitute a waiver of such right or provision. You may not assign your rights under these Terms without Zaby's prior written consent. Zaby may assign these Terms in connection with a merger, acquisition, or sale of assets.",
      },
      {
        type: "paragraph",
        text: "For questions regarding these Terms, please contact Zaby at legal@zaby.ai.",
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
    <aside className="hidden lg:block">
      <nav className="sticky top-32 w-56 shrink-0 self-start border-l border-[var(--color-border-strong)]/20 pl-4 py-2">
        <p className="text-[10px] font-bold uppercase tracking-widest text-[var(--color-text-secondary)]/50 mb-4 pl-3">
          On this page
        </p>
        <ul className="flex flex-col gap-1 text-left">
          {TERMS_SECTIONS.map((section) => {
            const isActive = activeSection === section.id;
            return (
              <li key={section.id}>
                <button
                  onClick={() => onSectionClick(section.id)}
                  className={cn(
                    "text-left text-xs w-full px-3 py-2 rounded-lg transition-all duration-200 leading-snug cursor-pointer font-medium",
                    isActive
                      ? "text-[var(--color-accent-soft)] bg-[var(--color-accent)]/5 shadow-xs translate-x-1"
                      : "text-[var(--color-text-secondary)]/80 hover:text-[var(--color-text-primary)] hover:bg-white/40 dark:hover:bg-zinc-900/40"
                  )}
                >
                  {section.title}
                </button>
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
}

function MobileSectionSelector({
  activeSection,
  onSectionClick,
}: {
  activeSection: string;
  onSectionClick: (id: string) => void;
}) {
  return (
    <div className="lg:hidden mb-10 overflow-x-auto pb-4 -mx-6 px-6 scrollbar-hide">
      <div className="flex gap-2 whitespace-nowrap">
        {TERMS_SECTIONS.map((section) => {
          const isActive = activeSection === section.id;
          return (
            <button
              key={section.id}
              onClick={() => onSectionClick(section.id)}
              className={cn(
                "px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wider transition-all duration-200 cursor-pointer backdrop-blur-md",
                isActive
                  ? "bg-[var(--color-accent-soft)] text-white shadow-md shadow-[var(--color-accent)]/20"
                  : "bg-white/40 dark:bg-zinc-900/20 border border-[var(--color-border-strong)]/30 text-[var(--color-text-secondary)] hover:border-[var(--color-text-primary)]/30"
              )}
            >
              {section.title.split(". ")[1] || section.title}
            </button>
          );
        })}
      </div>
    </div>
  );
}

function SectionContent({ content }: { content: ContentBlock[] }) {
  return (
    <div className="flex flex-col gap-5">
      {content.map((block, i) => {
        if (block.type === "paragraph") {
          return (
            <p key={i} className="text-base sm:text-lg leading-relaxed text-[var(--color-text-secondary)] font-light">
              {block.text}
            </p>
          );
        }
        if (block.type === "subheading") {
          return (
            <h3 key={i} className="text-lg sm:text-xl font-bold text-[var(--color-text-primary)] font-display mt-6 mb-2">
              {block.text}
            </h3>
          );
        }
        if (block.type === "list") {
          return (
            <ul key={i} className="flex flex-col gap-3.5 pl-1 sm:pl-2">
              {block.items.map((item, j) => (
                <li key={j} className="flex items-start gap-3.5 text-base sm:text-lg leading-relaxed text-[var(--color-text-secondary)] font-light">
                  <span className="mt-2.5 w-1.5 h-1.5 rounded-full bg-[var(--color-accent-soft)] shrink-0" />
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

export default function TermsPage() {
  const [activeSection, setActiveSection] = useState(TERMS_SECTIONS[0].id);
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

    TERMS_SECTIONS.forEach(({ id }) => {
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
      <SectionWrapper
        spacing="none"
        background="transparent"
        className="relative mt-20 sm:mt-30 flex items-center justify-center overflow-visible"
      >
        <GradientOrb
          color="purple"
          size="xl"
          className="absolute right-1/4 top-1/2 -translate-y-1/2 opacity-[0.08] dark:opacity-[0.05] pointer-events-none"
        />
        <GradientOrb
          color="pink"
          size="lg"
          className="absolute left-1/4 top-1/4 opacity-[0.06] dark:opacity-[0.03] pointer-events-none"
        />

        <Container size="lg" className="relative z-10 py-10 sm:py-16">
          <ScrollReveal direction="up" delay={0.05}>
            <nav className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-wider text-[var(--color-text-secondary)]/60 mb-8 sm:mb-10">
              <Link href="/" className="hover:text-[var(--color-accent-soft)] transition-colors cursor-pointer">
                Home
              </Link>
              <span>/</span>
              <span className="text-[var(--color-text-primary)]">Terms of Service</span>
            </nav>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={0.1}>
            <HeroBadge text="LEGAL" />
          </ScrollReveal>

          <ScrollReveal direction="up" delay={0.15}>
            <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-[var(--color-text-primary)] mb-6 font-display leading-[1.1]">
              Terms of Service
            </h1>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={0.18}>
            <p className="text-[var(--color-text-secondary)] text-base sm:text-lg max-w-2xl leading-relaxed font-light mb-6">
              Please read these terms carefully before using the Zaby platform. By accessing or using
              our services, you agree to be bound by these terms.
            </p>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={0.2}>
            <p className="text-xs text-[var(--color-text-secondary)]/70">
              Last updated:{" "}
              <time dateTime="2025-05-14" className="font-semibold text-[var(--color-text-primary)]">
                May 14, 2025
              </time>
            </p>
          </ScrollReveal>
        </Container>
      </SectionWrapper>

      {/* Main layout */}
      <SectionWrapper spacing="md" background="transparent" className="overflow-visible pt-4">
        <Container size="lg">
          {/* Mobile Section Selector */}
          <MobileSectionSelector activeSection={activeSection} onSectionClick={scrollToSection} />

          <div className="grid lg:grid-cols-[1fr_260px] gap-12 sm:gap-16 md:gap-20">
            {/* Main Content */}
            <div className="min-w-0">
              {/* Intro block */}
              <div className="mb-12 pb-10 border-b border-[var(--color-border-strong)]/30">
                <p className="text-base sm:text-lg leading-relaxed text-[var(--color-text-secondary)] font-light">
                  These Terms of Service describe your rights and responsibilities when accessing and
                  using the Zaby platform, including{" "}
                  <a
                    href="https://zaby.ai"
                    className="text-[var(--color-accent-soft)] hover:text-[var(--color-accent-hover)] hover:underline cursor-pointer font-medium transition-colors"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    https://zaby.ai
                  </a>{" "}
                  and any related services, APIs, and applications (collectively, the "Service")
                  provided by Zaby AI, Inc. ("Zaby," "we," "our," or "us").
                </p>
                <p className="mt-4 text-base sm:text-lg leading-relaxed text-[var(--color-text-secondary)] font-light">
                  By accessing or using the Service, you agree to be bound by these Terms. If you do
                  not agree, you may not access or use the Service.
                </p>
              </div>

              {/* Section blocks */}
              <div className="flex flex-col gap-14 text-left">
                {TERMS_SECTIONS.map((section) => (
                  <section
                    key={section.id}
                    id={section.id}
                    ref={(el) => {
                      sectionRefs.current[section.id] = el;
                    }}
                    className="scroll-mt-28"
                  >
                    <h2 className="text-2xl font-bold text-[var(--color-text-primary)] mb-5 pb-3 border-b border-[var(--color-border-strong)]/30 font-display">
                      {section.title}
                    </h2>
                    <SectionContent content={section.content as ContentBlock[]} />
                  </section>
                ))}
              </div>

              {/* Footer note */}
              <div className="mt-16 pt-10 border-t border-[var(--color-border-strong)]/30 text-left">
                <p className="text-sm text-[var(--color-text-secondary)] font-light">
                  If you have questions about these Terms, please contact us at{" "}
                  <a
                    href="mailto:legal@zaby.ai"
                    className="text-[var(--color-accent-soft)] hover:text-[var(--color-accent-hover)] hover:underline font-semibold transition-colors"
                  >
                    legal@zaby.ai
                  </a>
                  . For privacy-related questions, visit our{" "}
                  <Link href="/privacy" className="text-[var(--color-accent-soft)] hover:text-[var(--color-accent-hover)] hover:underline font-semibold transition-colors">
                    Privacy Policy
                  </Link>
                  .
                </p>
              </div>
            </div>

            {/* Sticky Table of Contents */}
            <TableOfContents activeSection={activeSection} onSectionClick={scrollToSection} />
          </div>
        </Container>
      </SectionWrapper>

    </>
  );
}
