'use client'

import { InteractiveRobotSpline } from "@/components/ui/interactive-3d-robot";
import { useRouter } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { GlassPanel } from "@/components/shared/GlassPanel";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { GradientOrb } from "@/components/shared/GradientOrb";
import { GridBackground } from "@/components/shared/GridBackground";
import { Ripple } from "@/components/ui/ripple";
import { ShimmerButton } from "@/components/shared";


export function Cta() {
  const router = useRouter()
  const WHOBEE_SCENE_URL = "https://prod.spline.design/PyzDhpQ9E5f1E3MT/scene.splinecode";

  return (
    <section className="py-10 px-6 md:px-12">
      <div className="max-w-7xl mx-auto">
        <GlassPanel padding="none" className="w-full relative overflow-hidden flex flex-col md:flex-row min-h-[460px] border border-[var(--color-border-strong)]/30 rounded-[32px]">

          {/* Ambient background effects */}
          {/* <GradientOrb 
            color="purple" 
            size="xl" 
            className="absolute -top-60 -left-40 opacity-25 z-0 blur-[120px]" 
          />
          <GradientOrb 
            color="pink" 
            size="lg" 
            className="absolute -bottom-40 right-1/4 opacity-15 z-0 blur-[100px]" 
          />
          <GridBackground variant="dots" opacity="light" className="z-0 opacity-[0.08]" /> */}

          {/* Left content: Vertical Centering & Spacing */}
          <div className="flex-[1.2] p-10 md:p-16 lg:p-20 relative z-10 flex flex-col justify-center">
            <SectionHeading
              title="Operational AI Infrastructure"
              subtitle="Deploy an autonomous AI workforce capable of continuous execution, workflow automation, and operational intelligence. Build enterprise-ready systems that think, learn, and act."
              align="left"
              size="lg"
              className="max-w-2xl"
            />

            <div className="mt-12 flex flex-wrap gap-5 relative z-20">
              <ShimmerButton
                shimmerColor="#e879f9"
                background="var(--color-button-primary-bg)"
                borderRadius="9999px"
                className="group relative flex items-center justify-center gap-2.5 rounded-full px-8 py-4 text-sm font-semibold tracking-wide text-white shadow-lg shadow-purple-500/20"
                onClick={() => router.push("https://platform.zaby.io/tenant/signup")}
              >
                <span className="relative z-10">Get Started</span>
                <ArrowRight className="group-hover:translate-x-1 transition-transform duration-300 relative z-10" size={18} />
              </ShimmerButton>
              <button
                onClick={() => router.push('/contact')}
                className="cursor-pointer flex items-center justify-center gap-2.5 rounded-full border border-[var(--color-button-secondary-border)] backdrop-blur-md px-10 py-4 text-sm font-semibold text-[var(--color-button-secondary-text)] transition-all hover:bg-white/80 hover:scale-[1.02] active:scale-[0.98]"
              >
                Book a Demo
              </button>
            </div>
          </div>

          {/* Right content: Integrated 3D Scene with mask */}
          <div className="flex-1 relative h-[400px] md:h-auto ">
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
      </div>
    </section>
  )
}

export default Cta;
