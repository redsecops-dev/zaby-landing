import {
  CareersHeroSection,
  StatsBarSection,
  ValuesSection,
  LifeAtZabySection,
  PerksSection,
  OpenPositionsSection,
  CareersCTASection,
} from "@/components/sections/careers";

export const metadata = {
  title: "Careers — Zaby",
  description:
    "Join Zaby and build the infrastructure AI runs on. Explore open roles across Engineering, Product, Design, Sales, and Research.",
};

export default function CareersPage() {
  return (
    <main className="relative antialiased">
      <CareersHeroSection />
      <StatsBarSection />
      <ValuesSection />
      <LifeAtZabySection />
      <PerksSection />
      <OpenPositionsSection />
      <CareersCTASection />
    </main>
  );
}
