import type { Metadata } from "next";
import {
  CaseStudiesHeroSection,
  CaseStudiesImpactBar,
  CaseStudiesGridSection,
  CaseStudiesCTASection,
} from "@/components/sections/case-studies";

export const metadata: Metadata = {
  title: "Case Studies — Zaby",
  description:
    "See how enterprises deploy Zaby's autonomous AI agents, agentic workflows, and AI workspaces to reduce operational overhead and scale without limits.",
};

export default function CaseStudiesPage() {
  return (
    <main className="relative antialiased">
      <CaseStudiesHeroSection />
      <CaseStudiesImpactBar />
      <CaseStudiesGridSection />
      <CaseStudiesCTASection />
    </main>
  );
}
