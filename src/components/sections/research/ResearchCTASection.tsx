"use client";

import { useRouter } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { SectionWrapper, Container } from "@/components/layout";
import { GlassPanel, SectionHeading } from "@/components/shared";
import { Ripple } from "@/components/ui/ripple";
import { InteractiveRobotSpline } from "@/components/ui/interactive-3d-robot";

export function ResearchCTASection() {
  const router = useRouter();
  const WHOBEE_SCENE_URL = "https://prod.spline.design/PyzDhpQ9E5f1E3MT/scene.splinecode";

  return (
    <SectionWrapper spacing="lg" background="transparent">
      <Container size="lg">
        <GlassPanel
          padding="none"
          className="w-full relative overflow-hidden flex flex-col md:flex-row min-h-[460px] border border-[var(--color-border-strong)]/30 rounded-[32px]"
        >
          {/* Left content: Vertical Centering & Spacing */}
          <div className="flex-[1.2] p-8 md:p-12 lg:p-16 relative z-10 flex flex-col justify-center">
            <SectionHeading
              label="Production-Ready Platform"
              title={
                <>
                  Explore the Platform Built on{" "}
                  <span className="bg-linear-to-br from-[var(--color-accent)] via-[#c026d3] to-[var(--color-accent-soft)] bg-clip-text text-transparent font-semibold">
                    This Research
                  </span>
                </>
              }
              subtitle="Deploy Zaby's autonomous agents, agentic workflows, and persistent memory systems — production infrastructure grounded in five years of engineering research."
              align="left"
              size="md"
              className="max-w-2xl"
            />

            {/* Feature badges */}
            <div className="mt-6 flex flex-wrap gap-2 relative z-20">
              {[
                "Agent Squad",
                "Open Agents",
                "Agentic Workflows",
                "Agent Memory",
                "AI SaaS Workspace",
              ].map((feature) => (
                <span
                  key={feature}
                  className="rounded-full border border-[var(--color-border-strong)]/20 bg-white/60 px-3 py-0.5 text-xs font-medium text-[var(--color-text-secondary)] shadow-sm"
                >
                  {feature}
                </span>
              ))}
            </div>

            <div className="mt-8 flex flex-wrap gap-4 relative z-20">
              <button
                onClick={() => router.push("/contact")}
                className="cursor-pointer group relative flex items-center justify-center gap-2.5 rounded-full bg-[var(--color-button-primary-bg)] px-8 py-3.5 text-sm font-semibold tracking-wide text-white transition-all hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-purple-500/20"
              >
                Book a Demo
                <ArrowRight className="group-hover:translate-x-1 transition-transform duration-300" size={18} />
              </button>
              <button
                onClick={() => router.push("/product")}
                className="cursor-pointer flex items-center justify-center gap-2.5 rounded-full border border-[var(--color-button-secondary-border)] backdrop-blur-md px-10 py-3.5 text-sm font-semibold text-[var(--color-button-secondary-text)] transition-all hover:bg-white/80 hover:scale-[1.02] active:scale-[0.98]"
              >
                Explore the Platform
              </button>
            </div>
          </div>

          {/* Right content: Integrated 3D Scene with mask */}
          <div className="flex-1 relative h-[350px] md:h-auto overflow-hidden">
            <div
              className="absolute inset-0 z-10 pointer-events-none"
              style={{
                background: "radial-gradient(circle at center, transparent 30%, rgba(255,255,255,0.05) 70%, white 100%)",
                maskImage: "linear-gradient(to left, black 80%, transparent 100%), linear-gradient(to top, black 80%, transparent 100%)",
                WebkitMaskImage: "linear-gradient(to left, black 80%, transparent 100%), linear-gradient(to top, black 80%, transparent 5%)",
              }}
            />
            <div className="w-full h-full scale-[0.75] md:scale-[0.85] lg:scale-[0.95] transform translate-x-0 relative">
              <Ripple
                className="z-0"
                mainCircleOpacity={0.7}
                mainCircleSize={150}
                numCircles={7}
                style={{
                  '--ripple-color': 'rgba(168, 85, 247, 0.45)',
                  '--ripple-bg': 'rgba(168, 85, 247, 0.08)',
                } as React.CSSProperties}
              />
              <InteractiveRobotSpline
                scene={WHOBEE_SCENE_URL}
                className="w-full h-full relative z-10"
              />
            </div>
          </div>
        </GlassPanel>
      </Container>
    </SectionWrapper>
  );
}
