"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";

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
    <nav className="sticky top-24 w-56 shrink-0 hidden lg:block self-start">
      <p className="text-xs font-semibold uppercase tracking-widest text-neutral-400 mb-4">
        In this article
      </p>
      <ul className="flex flex-col gap-0.5">
        {COOKIE_SECTIONS.map((section) => (
          <li key={section.id}>
            <button
              onClick={() => onSectionClick(section.id)}
              className={`text-left text-sm w-full px-2 py-1.5 rounded-md transition-colors leading-snug cursor-pointer ${
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
        {COOKIE_SECTIONS.map((section) => (
          <button
            key={section.id}
            onClick={() => onSectionClick(section.id)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all cursor-pointer ${
              activeSection === section.id
                ? "bg-fuchsia-600 text-white shadow-md shadow-fuchsia-200"
                : "bg-white border border-neutral-200 text-neutral-600 hover:border-neutral-300"
            }`}
          >
            {section.title.split(". ")[1] || section.title}
          </button>
        ))}
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
            <p key={i} className="text-[15px] sm:text-[16px] leading-relaxed text-neutral-600">
              {block.text}
            </p>
          );
        }
        if (block.type === "subheading") {
          return (
            <h3 key={i} className="text-lg font-bold text-neutral-800 mt-4">
              {block.text}
            </h3>
          );
        }
        if (block.type === "list") {
          return (
            <ul key={i} className="flex flex-col gap-3.5 pl-1 sm:pl-2">
              {block.items.map((item, j) => (
                <li key={j} className="flex items-start gap-3.5 text-[15px] sm:text-[16px] leading-relaxed text-neutral-600">
                  <span className="mt-2.5 w-1.5 h-1.5 rounded-full bg-fuchsia-500 shrink-0" />
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
      <section className="relative mt-30 flex items-center justify-center overflow-x-hidden text-(--foreground) antialiased selection:bg-white/30 selection:text-black">
        <div className="w-full max-w-7xl bg-white/40 backdrop-blur-3xl rounded-[2.5rem] border border-white/60 shadow-[0_8px_40px_rgb(0,0,0,0.04)] p-8 md:p-10 lg:p-12">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-neutral-400 mb-8">
            <Link href="/" className="hover:text-fuchsia-600 transition-colors">
              Home
            </Link>
            <span>/</span>
            <span className="text-neutral-600">Cookie Policy</span>
          </nav>

          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-fuchsia-50 border border-fuchsia-100 rounded-full px-3 py-1 mb-5">
            <span className="w-1.5 h-1.5 rounded-full bg-fuchsia-500" />
            <span className="text-xs font-semibold uppercase tracking-widest text-fuchsia-600">
              Legal
            </span>
          </div>

          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-neutral-900 mb-4">
            Cookie Policy
          </h1>
          <p className="text-neutral-500 text-base max-w-2xl leading-relaxed">
            This policy describes how Zaby uses cookies and similar technologies to provide and improve our platform.
          </p>
          <p className="mt-4 text-sm text-neutral-400">
            Last updated:{" "}
            <time dateTime="2025-05-14" className="font-medium text-neutral-600">
              May 14, 2025
            </time>
          </p>
        </div>
      </section>

      {/* Main layout */}
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-24 py-14 md:py-20">
        {/* Mobile Section Selector */}
        <MobileSectionSelector activeSection={activeSection} onSectionClick={scrollToSection} />

        <div className="flex gap-16 xl:gap-20">
          {/* Main Content */}
          <div className="flex-1 min-w-0">
            {/* Intro block */}
            <div className="mb-12 pb-10 border-b border-neutral-200">
              <p className="text-[15px] sm:text-[16px] leading-relaxed text-neutral-600">
                At Zaby, we believe in being clear and open about how we collect and use data related
                to you. In the spirit of transparency, this policy provides detailed information
                about how and when we use cookies on our platform.
              </p>
              <p className="mt-4 text-[15px] sm:text-[16px] leading-relaxed text-neutral-600">
                For more information about how we protect your information, please visit our{" "}
                <Link href="/privacy" className="text-fuchsia-600 hover:underline cursor-pointer">
                  Privacy Policy
                </Link>
                .
              </p>
            </div>

            {/* Section blocks */}
            <div className="flex flex-col gap-14">
              {COOKIE_SECTIONS.map((section) => (
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
                If you have questions about our use of cookies, please contact us at{" "}
                <a
                  href="mailto:privacy@zaby.ai"
                  className="text-fuchsia-600 hover:underline font-medium"
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
      </div>
    </>
  );
}
