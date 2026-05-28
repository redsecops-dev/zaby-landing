"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { SectionWrapper, Container } from "@/components/layout";
import { GlassPanel, GradientOrb, HeroBadge } from "@/components/shared";
import { ScrollReveal } from "@/components/animations";
import { cn } from "@/lib/utils";


// ─── Cookie Policy Content ──────────────────────────────────────────────────

const COOKIE_SECTIONS = [
  {
    id: "overview",
    title: "1. Overview",
    content: [
      {
        type: "paragraph",
        text: "Zaby AI, Inc. (\"Zaby,\" \"we,\" \"our,\" or \"us\") uses cookies and similar tracking technologies to improve operational reliability, analyze platform performance, and optimize your experience on our websites and applications.",
      },
      {
        type: "paragraph",
        text: "This Cookie Policy explains what cookies are, how we use them, and the choices you have regarding their use. By using our platform, you consent to the use of cookies as described in this policy.",
      },
    ],
  },
  {
    id: "what-are-cookies",
    title: "2. What are Cookies?",
    content: [
      {
        type: "paragraph",
        text: "Cookies are small text files that are stored on your device (computer, smartphone, or tablet) when you visit a website. They allow the website to recognize your device and store certain information about your preferences or past actions.",
      },
      {
        type: "paragraph",
        text: "In addition to cookies, we may use other technologies such as web beacons, pixels, and local storage to collect and store information.",
      },
    ],
  },
  {
    id: "types-of-cookies",
    title: "3. How We Use Cookies",
    content: [
      {
        type: "paragraph",
        text: "We use different categories of cookies for various purposes within our infrastructure:",
      },
      {
        type: "subheading",
        text: "3.1 Essential Infrastructure (Necessary)",
      },
      {
        type: "paragraph",
        text: "These cookies are strictly necessary for the operation of the Zaby platform. They enable core functions such as secure runtime execution, authentication, platform stability, and security monitoring. Without these technologies, the platform cannot function correctly.",
      },
      {
        type: "subheading",
        text: "3.2 Observability & Analytics",
      },
      {
        type: "paragraph",
        text: "These technologies help us understand how users interact with our platform by collecting telemetry and performance metrics. We use this data to measure operational reliability, identify technical issues, and improve the overall performance of our infrastructure.",
      },
      {
        type: "subheading",
        text: "3.3 Experience Optimization (Personalization)",
      },
      {
        type: "paragraph",
        text: "These cookies allow us to remember your preferences and settings (such as language or region) and provide enhanced features. They are designed to optimize your platform experience and reduce execution latency by caching relevant data.",
      },
      {
        type: "subheading",
        text: "3.4 Operational Growth (Marketing)",
      },
      {
        type: "paragraph",
        text: "We may use non-intrusive technologies to communicate platform updates, deliver relevant content, and reach new enterprise operators. These cookies help us measure the effectiveness of our communication and growth strategies.",
      },
    ],
  },
  {
    id: "managing-cookies",
    title: "4. Managing Your Preferences",
    content: [
      {
        type: "paragraph",
        text: "You have several options for managing your cookie preferences on the Zaby platform:",
      },
      {
        type: "subheading",
        text: "4.1 Zaby Privacy Settings",
      },
      {
        type: "paragraph",
        text: "You can use our integrated Privacy & Operational Preferences panel to customize which categories of non-essential cookies you wish to enable. These settings are stored locally on your device.",
      },
      {
        type: "subheading",
        text: "4.2 Browser Controls",
      },
      {
        type: "paragraph",
        text: "Most web browsers allow you to control cookies through their settings. You can choose to block all cookies, accept only certain types, or be notified when a cookie is being set. Please note that disabling essential cookies may impact the functionality of the Zaby platform.",
      },
    ],
  },
  {
    id: "policy-updates",
    title: "5. Updates to This Policy",
    content: [
      {
        type: "paragraph",
        text: "We may update this Cookie Policy from time to time to reflect changes in our technologies or legal requirements. We encourage you to review this policy periodically to stay informed about how we use cookies.",
      },
      {
        type: "paragraph",
        text: "The date at the top of this policy indicates when it was last updated.",
      },
    ],
  },
  {
    id: "contact",
    title: "6. Contact Us",
    content: [
      {
        type: "paragraph",
        text: "If you have any questions about our use of cookies or this policy, please contact us at privacy@zaby.ai.",
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
          {COOKIE_SECTIONS.map((section) => {
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
        {COOKIE_SECTIONS.map((section) => {
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

export default function CookiePolicyPage() {
  const [activeSection, setActiveSection] = useState(COOKIE_SECTIONS[0].id);
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

    COOKIE_SECTIONS.forEach(({ id }) => {
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
              <span className="text-[var(--color-text-primary)]">Cookie Policy</span>
            </nav>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={0.1}>
            <HeroBadge text="LEGAL" />
          </ScrollReveal>

          <ScrollReveal direction="up" delay={0.15}>
            <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-[var(--color-text-primary)] mb-6 font-display leading-[1.1]">
              Cookie Policy
            </h1>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={0.18}>
            <p className="text-[var(--color-text-secondary)] text-base sm:text-lg max-w-2xl leading-relaxed font-light mb-6">
              This policy describes how Zaby uses cookies and similar technologies to provide and improve our platform.
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
                  At Zaby, we believe in being clear and open about how we collect and use data related
                  to you. In the spirit of transparency, this policy provides detailed information
                  about how and when we use cookies on our platform.
                </p>
                <p className="mt-4 text-base sm:text-lg leading-relaxed text-[var(--color-text-secondary)] font-light">
                  For more information about how we protect your information, please visit our{" "}
                  <Link href="/privacy" className="text-[var(--color-accent-soft)] hover:text-[var(--color-accent-hover)] hover:underline cursor-pointer font-medium transition-colors">
                    Privacy Policy
                  </Link>
                  .
                </p>
              </div>

              {/* Section blocks */}
              <div className="flex flex-col gap-14 text-left">
                {COOKIE_SECTIONS.map((section) => (
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
                  If you have questions about our use of cookies, please contact us at{" "}
                  <a
                    href="mailto:privacy@zaby.ai"
                    className="text-[var(--color-accent-soft)] hover:text-[var(--color-accent-hover)] hover:underline font-semibold transition-colors"
                  >
                    privacy@zaby.ai
                  </a>
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
