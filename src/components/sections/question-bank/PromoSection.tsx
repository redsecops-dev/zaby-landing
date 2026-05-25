"use client";

import React from "react";
import Link from "next/link";
import { Database, Fingerprint, Users } from "lucide-react";

export default function PromoSection() {
  return (
    <section className="px-4 py-16 md:px-6 mx-auto max-w-7xl">
      <div className="bg-gradient-to-br from-fuchsia-950 via-purple-950 to-indigo-950 text-white border border-white/10 rounded-3xl p-8 md:p-12 lg:p-16 relative overflow-hidden flex flex-col lg:flex-row justify-between gap-12 items-center">
        
        {/* Accent Glow */}
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#d946ef]/15 rounded-full blur-[100px] pointer-events-none" />

        {/* Left Block — Promotional Info */}
        <div className="flex-1 flex flex-col gap-4 relative z-10">
          <h3 className="text-lg font-light text-slate-400">Switch from any existing assessment platform</h3>
          <h2 className="text-4xl md:text-5xl font-black tracking-tight leading-tight">
            Get up to <span className="bg-linear-to-r from-[#e879f9] to-[#d946ef] bg-clip-text text-transparent">90% OFF</span> <br />
            <span className="text-xl md:text-2xl font-semibold text-slate-300">BASED ON YOUR CURRENT INVOICE</span>
          </h2>
          <p className="text-sm text-slate-400 max-w-md font-light leading-relaxed">
            Migrate from legacy assessment platforms seamlessly. Zaby will handle all content mapping and onboarding support.
          </p>
          
          <div className="mt-4 flex flex-wrap gap-4">
            <Link 
              href="/contact" 
              className="inline-flex items-center justify-center gap-2 bg-linear-to-r from-white/06 via-white/[0.09] to-white/04 hover:from-white/10 hover:via-white/[0.14] hover:to-white/08 border border-white/15 hover:border-white/30 text-white px-6 py-3.5 rounded-full text-sm font-bold tracking-wide backdrop-blur-2xl shadow-[0_8px_32px_0_rgba(0,0,0,0.25),inset_0_1px_1px_0_rgba(255,255,255,0.15)] transition-all duration-300 hover:scale-[1.02] hover:translate-y-[-1px] active:scale-98"
            >
              Book Demo
            </Link>
          </div>
        </div>

        {/* Right Block — Migration Value Propositions */}
        <div className="lg:max-w-md flex flex-col gap-8 relative z-10 w-full text-left">
          
          <div className="flex gap-4 items-start">
            <div className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-[#e879f9] shrink-0 shadow-lg">
              <Database className="h-5 w-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white mb-1">Seamless Migration</h4>
              <p className="text-xs text-slate-400 leading-relaxed font-light">Don't lose your content and assessments. We automate mapping with 0 data loss.</p>
            </div>
          </div>

          <div className="flex gap-4 items-start">
            <div className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-[#e879f9] shrink-0 shadow-lg">
              <Fingerprint className="h-5 w-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white mb-1">Enterprise Security</h4>
              <p className="text-xs text-slate-400 leading-relaxed font-light">Your candidate data is private, secure & compliant. SOC2 & ISO certified.</p>
            </div>
          </div>

          <div className="flex gap-4 items-start">
            <div className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-[#e879f9] shrink-0 shadow-lg">
              <Users className="h-5 w-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white mb-1">Dedicated Support</h4>
              <p className="text-xs text-slate-400 leading-relaxed font-light">White-glove onboarding & customer success teams available 24/7/365.</p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
