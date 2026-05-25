"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Sparkles,
  Zap,
  TrendingUp,
  Cpu,
  Activity,
  Terminal
} from "lucide-react";
import InteractiveDottedGrid from "./InteractiveDottedGrid";

export default function QuestionBankHero() {
  return (
    <section className="relative z-10 px-4 pt-16 pb-12 md:px-6 md:pt-24 lg:pt-35 mx-auto max-w-7xl">
      <InteractiveDottedGrid />
      {/* Founding Access 90% OFF - Right Side Corner Badge */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="absolute top-2 md:top-6 right-1 md:right-0 z-[9999]"
      >
        <Link
          href="https://platform.zaby.io/tenant/signup"
          className="group block bg-transparent border-0 outline-none transition-transform duration-300 hover:scale-[1.05]"
        >
          <img
            src="/Founding.svg"
            alt="Founding Access 90% OFF"
            className="h-14 md:h-20 w-auto select-none pointer-events-none bg-transparent relative z-50"
          />
        </Link>
      </motion.div>

      <div className="flex flex-col items-center text-center">

        {/* Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="mb-6 max-w-3xl text-[2.15rem] font-extrabold leading-[1.1] tracking-tight text-[#171717] sm:text-5xl md:text-7xl lg:text-6xl"
        >
          Next-Gen{" "}
          <span className="text-[#e879f9]">
            Agentic Assessments
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-8 max-w-3xl text-base font-light leading-relaxed text-[#525252] sm:text-lg md:text-xl"
        >
          ZABY replaces static MCQs and outdated coding tests with dynamic AI-generated labs,
          adaptive assessments, and real-time candidate intelligence.
        </motion.p>

        {/* Button */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mb-16"
        >
          <Link
            href="https://platform.zaby.io/tenant/signup"
            className="group relative flex cursor-pointer items-center justify-center gap-3 rounded-full bg-(--color-button-primary-bg) text-white px-8 py-4 text-base font-bold tracking-wide shadow-[rgba(76,29,149,0.5)_0px_10px_30px_-10px] hover:bg-(--color-button-primary-hover) hover:shadow-[rgba(76,29,149,0.6)_0px_12px_34px_-10px] transition-all duration-300 hover:scale-[1.02] hover:translate-y-[-1px]"
          >
            <Zap className="h-5 w-5 text-white animate-pulse" />
            Generate AI Assessment
          </Link>
        </motion.div>
      </div>

      {/* Large Dashboard Interactive Mockup */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.4 }}
        className="relative mx-auto max-w-6xl rounded-3xl p-1 bg-linear-to-br from-white/80 via-[#e879f9]/20 to-white/40 shadow-[0_30px_100px_-20px_rgba(232,121,249,0.15)] backdrop-blur-xl"
      >
        <div className="bg-white/95 rounded-[22px] overflow-hidden border border-white/50 aspect-video lg:aspect-[2.2/1] flex flex-col">

          {/* Mock Header */}
          <div className="px-6 py-4 border-b border-[#e5e5e5] bg-[#fafafa]/80 flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-[#ef4444]" />
                <div className="w-3 h-3 rounded-full bg-[#eab308]" />
                <div className="w-3 h-3 rounded-full bg-[#22c55e]" />
              </div>
              <div className="h-4 w-px bg-[#e5e5e5]" />
              <span className="text-xs font-semibold tracking-widest text-[#525252] uppercase">
                ZABY Autonomous AI Platform
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-[#22c55e] animate-ping" />
              <span className="text-xs text-[#525252] font-medium">Real-Time Core Engine</span>
            </div>
          </div>

          {/* Dashboard Content Grid */}
          <div className="flex-1 grid grid-cols-1 md:grid-cols-4 p-5 gap-4 overflow-hidden">

            {/* Left Widget Panel */}
            <div className="md:col-span-1 flex flex-col gap-4">
              <div className="bg-linear-to-br from-[#ede9fe]/80 to-[#f5d0fe]/40 rounded-2xl border border-white p-4 flex flex-col justify-between h-full shadow-[0_4px_20px_rgba(232,121,249,0.04)]">
                <div className="flex justify-between items-start">
                  <span className="text-[10px] uppercase font-mono tracking-wider text-[#525252]">Assessment Accuracy</span>
                  <TrendingUp className="h-4 w-4 text-[#d946ef]" />
                </div>
                <div>
                  <h3 className="text-3xl font-bold text-[#2f1362]">98%</h3>
                  <p className="text-[11px] text-[#525252] mt-1">Multi-agent verified</p>
                </div>
                <div className="h-10 w-full mt-2 flex items-end gap-1">
                  {[30, 45, 35, 60, 50, 75, 90, 80, 98].map((h, i) => (
                    <div
                      key={i}
                      className="flex-1 bg-[#d946ef]/40 rounded-xs hover:bg-[#d946ef] transition-colors"
                      style={{ height: `${h}%` }}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Central Main Dashboard Widget */}
            <div className="md:col-span-2 bg-[#1e1b29] rounded-2xl p-5 border border-slate-800 text-slate-100 flex flex-col justify-between shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-5">
                <Cpu className="h-40 w-40" />
              </div>

              {/* Active assessment stream */}
              <div className="flex justify-between items-center border-b border-slate-800 pb-3">
                <div className="flex items-center gap-2">
                  <Activity className="h-4 w-4 text-[#e879f9]" />
                  <span className="text-xs font-mono text-[#e879f9]">telemetry.stream.active</span>
                </div>
                <span className="text-[10px] font-mono text-slate-400 bg-slate-800 px-2 py-0.5 rounded">
                  Candidate: ID-90812
                </span>
              </div>

              <div className="flex-1 flex flex-col justify-center py-4">
                {/* Nodes diagram */}
                <div className="flex justify-between items-center relative px-8">
                  {/* Connecting lines */}
                  <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 0 }}>
                    <path d="M 60 40 L 150 40" stroke="rgba(232, 121, 249, 0.4)" strokeWidth="2" strokeDasharray="4 4" />
                    <path d="M 190 40 L 280 40" stroke="rgba(232, 121, 249, 0.4)" strokeWidth="2" strokeDasharray="4 4" />
                  </svg>

                  <div className="relative z-10 flex flex-col items-center gap-1">
                    <div className="w-10 h-10 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-xs text-[#e879f9]">
                      In
                    </div>
                    <span className="text-[9px] font-mono text-slate-400">Knowledge Ingest</span>
                  </div>

                  <div className="relative z-10 flex flex-col items-center gap-1">
                    <div className="w-12 h-12 rounded-full bg-[#2f1362] border border-[#e879f9] flex items-center justify-center text-xs text-white shadow-[0_0_20px_rgba(232,121,249,0.4)] animate-pulse">
                      AI
                    </div>
                    <span className="text-[9px] font-mono text-slate-400">Multi-Agent Val</span>
                  </div>

                  <div className="relative z-10 flex flex-col items-center gap-1">
                    <div className="w-10 h-10 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-xs text-[#e879f9]">
                      Out
                    </div>
                    <span className="text-[9px] font-mono text-slate-400">Validated Lab</span>
                  </div>
                </div>
              </div>

              <div className="bg-[#13111c] rounded-xl p-3 border border-slate-800/80">
                <div className="flex items-center gap-2 mb-1.5">
                  <Terminal className="h-3.5 w-3.5 text-slate-400" />
                  <span className="text-[10px] font-mono text-slate-400">Autonomous Verifier output</span>
                </div>
                <div className="text-[10px] font-mono text-emerald-400 flex flex-col gap-1">
                  <div>&gt; ingest /tmp/candidate_submission.py</div>
                  <div className="text-slate-400">&gt; evaluating logic gates... passed.</div>
                  <div className="text-[#e879f9]">&gt; score metrics optimized to 98%</div>
                </div>
              </div>
            </div>

            {/* Right Widget Panel */}
            <div className="md:col-span-1 flex flex-col gap-4">
              <div className="bg-[#f0abfc]/30 rounded-2xl border border-white p-4 flex flex-col justify-between h-full shadow-[0_4px_20px_rgba(232,121,249,0.03)]">
                <div>
                  <span className="text-[10px] uppercase font-mono tracking-wider text-[#525252]">Candidate Engagement</span>
                  <h3 className="text-3xl font-bold text-[#2f1362] mt-1">92%</h3>
                </div>
                <div className="mt-2">
                  <div className="flex justify-between text-xs text-[#525252] mb-1">
                    <span>Gamified Labs</span>
                    <span className="font-semibold">95%</span>
                  </div>
                  <div className="w-full bg-white rounded-full h-1.5">
                    <div className="bg-[#d946ef] h-1.5 rounded-full" style={{ width: "95%" }} />
                  </div>
                </div>
                <div className="mt-2">
                  <div className="flex justify-between text-xs text-[#525252] mb-1">
                    <span>MCQs / Standard</span>
                    <span className="font-semibold">41%</span>
                  </div>
                  <div className="w-full bg-white rounded-full h-1.5">
                    <div className="bg-[#525252]/30 h-1.5 rounded-full" style={{ width: "41%" }} />
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </motion.div>
    </section>
  );
}
