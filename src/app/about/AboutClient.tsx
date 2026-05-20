"use client";

import React from "react";
import {
  Target,
  Cpu,
  Database,
  GitBranch,
  ShieldCheck,
  Users,
  Building2,
  MapPin,
} from "lucide-react";
import { GradientOrb } from "@/components/shared/GradientOrb";
import {
  HeroSection,
  StatsSection,
  MissionSection,
  JourneySection,
  ValuesSection,
  CompanyDetailsSection,
  HiringSection,
} from "./components";

// --- Data ---

const TIMELINE = [
  {
    year: "2020",
    category: "FOUNDING",
    title: "Founded with Execution-First Vision",
    desc: "R&D began into autonomous AI execution systems and agent runtime architecture in Hyderabad, India.",
  },
  {
    year: "2021",
    category: "ENTERPRISE",
    title: "First Enterprise Deployments",
    desc: "Agent runtime v1 deployed with early enterprise clients across workflow automation verticals.",
  },
  {
    year: "2022",
    category: "INFRASTRUCTURE",
    title: "Memory & Workflow Systems",
    desc: "Built persistent vector-based memory infrastructure and agentic workflow orchestration layer.",
  },
  {
    year: "2023",
    category: "CERTIFICATION",
    title: "ISO 27001 & ISO 9001 Certified",
    desc: "Enterprise-grade security and quality certifications achieved for global production deployments.",
  },
  {
    year: "2024",
    category: "SCALE",
    title: "100+ Enterprise Deployments",
    desc: "Agent Squad and Agentic Workflows launched. Platform handles millions of agent tasks monthly.",
  },
  {
    year: "2025",
    category: "PLATFORM",
    title: "200+ Deployments & Global Expansion",
    desc: "AI SaaS Workspace launched. Full operational AI infrastructure platform across multiple continents.",
  },
];

const VALUES = [
  {
    Icon: Target,
    title: "Execution Over Conversation",
    desc: "Every architectural decision prioritises reliable autonomous execution over conversational capability.",
  },
  {
    Icon: ShieldCheck,
    title: "Infrastructure Reliability",
    desc: "Platform components are designed for enterprise availability with retry systems and runtime isolation.",
  },
  {
    Icon: Database,
    title: "Memory Continuity",
    desc: "Agents retain operational context across sessions, maintaining persistent organisational knowledge.",
  },
  {
    Icon: Users,
    title: "Autonomy with Control",
    desc: "Every autonomous capability is paired with visibility, audit mechanisms, and human escalation paths.",
  },
];

const STATS = [
  { value: "200+", label: "Enterprise Deployments", sub: "Organisations running on Zaby" },
  { value: "12M+", label: "Agent Tasks Executed", sub: "Validated in production" },
  { value: "99.9%", label: "Runtime Uptime", sub: "Across all environments" },
  { value: "5+", label: "Years of R&D", sub: "Into execution-first AI" },
];

const MISSION_ITEMS = [
  { label: "Execute tasks", Icon: Cpu },
  { label: "Interact with software", Icon: GitBranch },
  { label: "Retain memory", Icon: Database },
  { label: "Coordinate agents", Icon: Users },
];

const COMPANY_DETAILS = [
  {
    Icon: Building2,
    label: "Legal Name",
    value: "GEN ZABY AI SOLUTIONS PRIVATE LIMITED",
    sub: "Registered in India",
  },
  {
    Icon: MapPin,
    label: "Headquarters",
    value: "Gachibowli, Hyderabad",
    sub: "Telangana, India",
  },
  {
    Icon: ShieldCheck,
    label: "Certifications",
    value: "ISO 9001 · ISO 27001",
    sub: "Enterprise-grade security & quality",
  },
];

const HIRING_ROLES = [
  { role: "AI Infrastructure", dept: "Engineering" },
  { role: "Agent Systems", dept: "Engineering" },
  { role: "Enterprise Sales", dept: "GTM" },
  { role: "Product Design", dept: "Design" },
];

export default function AboutClient() {
  return (
    <main className="relative antialiased overflow-x-hidden flex flex-col items-center w-full">
      <GradientOrb color="purple" size="xl" className="absolute -top-32 -left-20 opacity-10 pointer-events-none" />
      <GradientOrb color="pink" size="lg" className="absolute top-1/4 -right-16 opacity-8 pointer-events-none" />

      <HeroSection 
        badge="About Zaby"
        title={
          <>
            Building the operational AI infrastructure for{" "}
            <span className="bg-linear-to-br from-accent via-[#c026d3] to-accent-soft bg-clip-text text-transparent">
              the autonomous enterprise.
            </span>
          </>
        }
        description="Founded in Hyderabad, India. Zaby is an AI-native operational infrastructure platform designed to help businesses deploy autonomous AI systems capable of complex execution, workflow automation, and persistent operational intelligence. We are designed around execution, not conversation."
      />

      <StatsSection stats={STATS} />

      <MissionSection 
        badge="Our Mission"
        title={
          <>
            Most AI products are designed around conversation.{" "}
            <span className="bg-linear-to-br from-accent via-[#c026d3] to-accent-soft bg-clip-text text-transparent">
              Zaby is designed around execution.
            </span>
          </>
        }
        description="AI systems should operate like digital operational infrastructure: executing tasks, retaining memory, and coordinating across environments without requiring humans to manage every step. The platform is intentionally designed to move beyond static copilots, prompt wrappers, and narrow chatbot systems."
        items={MISSION_ITEMS}
      />

      {/* <JourneySection 
        badge="Our Journey"
        title={
          <>
            We have learned a lot<br className="hidden md:block" /> over the last five years.
          </>
        }
        items={TIMELINE}
      /> */}

      <ValuesSection 
        badge="What Drives Us"
        title={
          <>
            Principles that guide<br className="hidden md:block" /> every decision we make.
          </>
        }
        items={VALUES}
      />

      <CompanyDetailsSection 
        badge="The Company"
        items={COMPANY_DETAILS}
      />

      <HiringSection 
        title={
          <>
            Build the Future of<br className="hidden sm:block" /> Operational AI
          </>
        }
        description="We're building the infrastructure layer that powers the next generation of autonomous enterprise operations. If you thrive on hard infrastructure problems and believe AI should execute, not just converse, come build with us."
        items={HIRING_ROLES}
      />
    </main>
  );
}
