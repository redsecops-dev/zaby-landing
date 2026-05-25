"use client"

import React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { LoadingCarousel } from "../ui/loading-carousel"

export default function LoadingCarouselDemo() {
  return (
    <div className="bg-[#FAF9F6] py-20 px-4 md:px-6 border-y border-[#e5e5e5]">
      <div className="max-w-7xl mx-auto space-y-16">
        
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-3xl md:text-4xl font-black text-[#171717] tracking-tight mb-4">
            Interactive AI Loading Components
          </h2>
          <p className="text-slate-500 font-light">
            Pixel-perfect, high-performance loading carousels designed for modern AI SaaS applications.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Default LoadingCarousel */}
          <div className="space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400 px-1">Default LoadingCarousel</h3>
            <LoadingCarousel />
          </div>

          {/* Wide Aspect Ratio with Top Text */}
          <div className="space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400 px-1">Wide Aspect Ratio with Top Text</h3>
            <LoadingCarousel
              aspectRatio="wide"
              textPosition="top"
              showIndicators={true}
            />
          </div>

          {/* Background Tips + Gradient */}
          <div className="space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400 px-1">Background Tips + Gradient</h3>
            <LoadingCarousel
              aspectRatio="wide"
              backgroundTips={true}
              backgroundGradient={true}
            />
          </div>

          {/* Custom Interval and Navigation */}
          <div className="space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400 px-1">Custom Interval and Navigation</h3>
            <LoadingCarousel autoplayInterval={2000} showNavigation={true} />
          </div>

          {/* Shuffled Tips with Custom Interval */}
          <div className="space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400 px-1">Shuffled Tips with Custom Interval</h3>
            <LoadingCarousel
              shuffleTips={true}
              autoplayInterval={3000}
              showProgress={false}
            />
          </div>

          {/* Square Aspect Ratio with Background Tips */}
          <div className="space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400 px-1">Square Aspect Ratio with Background Tips</h3>
            <div className="max-w-md mx-auto w-full">
              <LoadingCarousel
                aspectRatio="square"
                backgroundTips={true}
                backgroundGradient={true}
                barClassName="bg-[#f5d0fe] text-[#d946ef] border-t-0"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
