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

export default function QuestionBankPage() {
  return (
    <div className="w-full relative overflow-x-hidden antialiased bg-[#FAF9F6] text-[#171717]">

      {/* Decorative Blur Background Elements */}
      <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] rounded-full bg-linear-to-tr from-[#f5d0fe] to-[#ede9fe] opacity-35 blur-[120px] pointer-events-none -z-10" />
      <div className="absolute top-[30%] right-[-10%] w-[45vw] h-[45vw] rounded-full bg-linear-to-br from-[#ede9fe] to-[#f5d0fe] opacity-30 blur-[100px] pointer-events-none -z-10" />

      {/* Hero Section */}
      <QuestionBankHero />

      {/* Trusted Brands Section */}
      <TrustedBrands />

      {/* Bento Demo Section ("See Zaby Tools in Real Time") */}
      <section className="px-4 py-20 md:px-6 mx-auto max-w-7xl">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-[#171717] mt-4 mb-4">
            See ZABY Tools in Real Time
          </h2>
          <p className="text-base text-[#525252] font-light">
            Dynamic AI-directed coding assessments, generating labs, and monitoring integrity simultaneously.
          </p>
        </div>

        {/* Top grid features banner */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-12">

          {/* Left Column — Title & Info */}
          <div className="lg:col-span-5 flex flex-col justify-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#2f1362] text-white rounded-full text-xs font-semibold mb-4 w-fit">
              <Cpu className="h-3.5 w-3.5 text-[#e879f9]" />
              AI LABS
            </div>
            <h3 className="text-3xl font-extrabold text-[#171717] mb-4 leading-tight">
              Assess Real Skills. <br />Not Memorization.
            </h3>
            <p className="text-base text-[#525252] leading-relaxed font-light">
              Zaby's agent infrastructure deploys full sandbox workspaces in seconds.
              Evaluate actual problem solving, logic efficiency, and code craftsmanship.
            </p>
            <div className="mt-6 flex items-center gap-4">
              <span className="text-xs text-[#a3a3a3]">Active Labs: 1,420+</span>
              <Link
                href="https://platform.zaby.io/tenant/signup"
                className="text-xs font-bold text-[#2f1362] hover:text-[#d946ef] flex items-center gap-1.5 transition-colors"
              >
                Explore Sandbox <ArrowUpRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>

          {/* Right Column — Beautiful features highlights block */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-6 md:p-8 border border-[#e5e5e5] shadow-[0_4px_20px_rgba(0,0,0,0.01)]">
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                { title: "AI-Generated Interactive Labs", desc: "Instantly compiled playgrounds tailored to custom engineering tasks." },
                { title: "Adaptive Difficulty Scaling", desc: "Test parameters dynamically adapt based on candidate performance." },
                { title: "Goal-Based Playgrounds", desc: "Evaluate actual execution speed, data flow logic, and code neatness." },
                { title: "Instant Automated Verifications", desc: "Smart agent verifiers run complex assertions and score test metrics." },
                { title: "Multi-Domain Compatibility", desc: "Seamless setups for MongoDB, advanced backend APIs, and DevOps." }
              ].map((item, idx) => (
                <li key={idx} className="flex gap-3 items-start">
                  <div className="mt-0.5 rounded-full bg-[#f5d0fe] p-1 flex items-center justify-center shrink-0">
                    <Check className="h-3.5 w-3.5 text-[#d946ef] stroke-[3px]" />
                  </div>
                  <div>
                    <span className="text-sm text-[#171717] font-bold block">{item.title}</span>
                    <span className="text-[11px] text-[#737373] font-light leading-snug block mt-0.5">{item.desc}</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
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