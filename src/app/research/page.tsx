import type { Metadata } from "next";
import {
  ResearchHeroSection,
  ResearchStatsBar,
  ResearchAreasSection,
  ResearchInsightsSection,
  ResearchCTASection,
} from "@/components/sections/research";

export const metadata: Metadata = {
  title: "Research — Zaby",
  description:
    "Five years of engineering research in autonomous execution, persistent memory systems, multimodal AI, and enterprise workflow orchestration — the foundation of Zaby's operational AI infrastructure.",
};

export default function ResearchPage() {
  return (
    <main className="relative antialiased">
      <ResearchHeroSection />
      <ResearchStatsBar />
      <ResearchAreasSection />
      <ResearchInsightsSection />
      <ResearchCTASection />
    </main>
  );
}
