'use client'

import { SplineScene } from "@/components/ui/splite";
import { Card } from "@/components/ui/card"
import { Spotlight } from "@/components/ui/spotlight"
 
export function Cta() {
  return (
    <section className="py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <Card className="w-full h-[500px] bg-black/[0.96] relative overflow-hidden border border-neutral-800">
          <Spotlight
            className="-top-40 left-0 md:left-60 md:-top-20"
            fill="white"
          />
          
          <div className="flex h-full flex-col md:flex-row">
            {/* Left content */}
            <div className="flex-1 p-8 md:p-12 relative z-10 flex flex-col justify-center">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400 leading-tight">
                <span className="bg-linear-to-br from-accent via-[#c026d3] to-accent-soft bg-clip-text text-transparent">Operational AI</span><br />Infrastructure
              </h1>
              <p className="mt-4 text-neutral-300 max-w-lg text-base md:text-lg leading-relaxed">
                Deploy an autonomous AI workforce capable of continuous execution, workflow automation, and operational intelligence. Build enterprise-ready operational systems without static logic or prompt wrappers.
              </p>
              <div className="mt-8 flex gap-4">
                 <button className="group relative flex w-full cursor-pointer items-center justify-center gap-3 rounded-full bg-(--color-button-primary-bg) px-6 py-3.5 text-sm font-medium tracking-wide text-white shadow-[rgba(76,29,149,0.5)_0px_10px_30px_-10px] transition-all hover:bg-(--color-button-primary-hover) hover:shadow-[rgba(76,29,149,0.6)_0px_12px_34px_-10px] sm:w-auto">
                    Get Started
                 </button>
                 <button className="flex w-full cursor-pointer items-center justify-center gap-3 rounded-full border border-(--color-button-secondary-border) bg-(--color-button-secondary-bg) px-8 py-3.5 font-medium text-(--color-button-secondary-text) transition-all hover:bg-[#e9d5ff] sm:w-auto">
                    Book a Demo
                 </button>
              </div>
            </div>

            {/* Right content */}
            <div className="flex-1 relative h-[300px] md:h-full">
              <SplineScene 
                scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
                className="w-full h-full"
              />
            </div>
          </div>
        </Card>
      </div>
    </section>
  )
}

export default Cta;
