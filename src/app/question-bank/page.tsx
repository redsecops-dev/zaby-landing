"use client";

import React from "react";
import Link from "next/link";
import { Cpu, ArrowUpRight, Check } from "lucide-react";
import QuestionBankHero from "@/components/sections/question-bank/QuestionBankHero";
import TrustedBrands from "@/components/sections/question-bank/TrustedBrands";
import SandboxSimulationWidget from "@/components/sections/question-bank/SandboxSimulationWidget";
import CoreCapabilities from "@/components/sections/question-bank/CoreCapabilities";
import ComparisonSection from "@/components/sections/question-bank/ComparisonSection";
import PromoSection from "@/components/sections/question-bank/PromoSection";
import { SectionHeading, GlassPanel, GradientOrb } from "@/components/shared";

export default function QuestionBankPage() {
  return (
    <div className="w-full relative overflow-x-hidden antialiased bg-transparent text-[#171717]">

      {/* Decorative Blur Background Elements */}
      <GradientOrb color="purple" size="xl" className="-top-[10%] -left-[10%] opacity-20 -z-10" />
      <GradientOrb color="pink" size="xl" className="top-[30%] -right-[10%] opacity-15 -z-10" />

      {/* Hero Section */}
      <QuestionBankHero />

      {/* Trusted Brands Section */}
      <TrustedBrands />

      {/* Bento Demo Section ("See Zaby Tools in Real Time") */}
      <section className="relative px-4 md:px-6 mx-auto max-w-7xl">
        <GradientOrb color="purple" size="lg" className="top-[20%] left-[-20%] opacity-10 -z-10" />
        <GradientOrb color="blue" size="lg" className="bottom-[10%] right-[-10%] opacity-10 -z-10" />

        <SectionHeading
          label="Interactive Demo"
          title={
            <>
              See ZABY Tools in <span className="font-semibold bg-linear-to-br from-[var(--color-accent-hover)] via-[#c026d3] to-[var(--color-accent-soft)] bg-clip-text text-transparent">Real Time</span>
            </>
          }
          subtitle="Dynamic AI-directed coding assessments, generating labs, and monitoring integrity simultaneously."
          className="mb-16"
          align="center"
        />

        {/* Top grid features banner */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-12 relative z-10">

          {/* Left Column — Title & Info */}
          <div className="lg:col-span-5 flex flex-col justify-center">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-[var(--color-accent)]/10 border border-[var(--color-accent)]/20 text-[var(--color-accent-hover)] rounded-full text-xs font-semibold mb-6 w-fit backdrop-blur-xs">
              <Cpu className="h-3.5 w-3.5 text-[var(--color-accent-soft)]" />
              AI LABS
            </div>
            <h3 className="text-3xl sm:text-4xl font-light tracking-tight text-[var(--color-text-primary)] mb-5 leading-tight">
              Assess <span className="font-semibold text-transparent bg-clip-text bg-linear-to-r from-[var(--color-accent-hover)] to-[var(--color-accent-soft)]">Real Skills</span>. <br className="hidden sm:block" />Not Memorization.
            </h3>
            <p className="text-base sm:text-lg text-[var(--color-text-secondary)] leading-relaxed font-light mb-2">
              Zaby's agent infrastructure deploys full sandbox workspaces in seconds.
              Evaluate actual problem solving, logic efficiency, and code craftsmanship.
            </p>
            <div className="mt-6 flex items-center gap-6">
              <span className="text-xs font-mono text-[var(--color-text-secondary)]/80 bg-slate-100/80 px-2.5 py-1 rounded-md border border-slate-200/50">
                Active Labs: <span className="font-semibold text-[var(--color-text-primary)]">1,420+</span>
              </span>
              <Link
                href="https://platform.zaby.io/tenant/signup"
                className="group text-sm font-semibold text-[var(--color-button-primary-bg)] hover:text-[var(--color-accent-hover)] flex items-center gap-1 transition-colors"
              >
                Explore Sandbox
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
            </div>
          </div>

          {/* Right Column — Beautiful features highlights block */}
          <GlassPanel
            padding="lg"
            className="lg:col-span-7 border border-[var(--color-glass-border)] shadow-xs bg-white/70 backdrop-blur-md rounded-3xl"
          >
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                { title: "AI-Generated Interactive Labs", desc: "Instantly compiled playgrounds tailored to custom engineering tasks." },
                { title: "Adaptive Difficulty Scaling", desc: "Test parameters dynamically adapt based on candidate performance." },
                { title: "Goal-Based Playgrounds", desc: "Evaluate actual execution speed, data flow logic, and code neatness." },
                { title: "Instant Automated Verifications", desc: "Smart agent verifiers run complex assertions and score test metrics." },
                { title: "Multi-Domain Compatibility", desc: "Seamless setups for MongoDB, advanced backend APIs, and DevOps." }
              ].map((item, idx) => (
                <li key={idx} className="flex gap-4 items-start group">
                  <div className="mt-1 rounded-full bg-[var(--color-accent)]/15 p-1.5 flex items-center justify-center shrink-0 transition-transform group-hover:scale-110">
                    <Check className="h-3.5 w-3.5 text-[var(--color-accent-soft)] stroke-[3px]" />
                  </div>
                  <div>
                    <span className="text-sm text-[var(--color-text-primary)] font-semibold block">{item.title}</span>
                    <span className="text-xs text-[var(--color-text-secondary)] font-light leading-relaxed block mt-1">{item.desc}</span>
                  </div>
                </li>
              ))}
            </ul>
          </GlassPanel>
        </div>

        {/* Sandbox Simulation Widget - Spans FULL PAGE WIDTH from left to right */}
        <SandboxSimulationWidget />
      </section>

      {/* Three Core Capabilities Section */}
      <CoreCapabilities />

      {/* Comparison Table Section */}
      <ComparisonSection />

      {/* Switch & Promo Section */}
      <PromoSection />

    </div>
  );
}