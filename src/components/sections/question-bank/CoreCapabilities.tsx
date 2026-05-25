"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { 
  Sparkles, 
  Lock, 
  Video, 
  ShieldAlert, 
  Smile, 
  Users, 
  ArrowRight 
} from "lucide-react";

export default function CoreCapabilities() {
  const [proctorStatus, setProctorStatus] = useState<"nominal" | "warning" | "alert">("nominal");
  const [violations, setViolations] = useState<string[]>([]);

  // Simulation effect for AI Proctoring grid
  useEffect(() => {
    const events = [
      { status: "warning", log: "Multiple displays detected in background", viol: "Dual Monitor Telemetry" },
      { status: "nominal", log: "Telemetry nominal. Candidate verified.", viol: "" },
      { status: "alert", log: "Unauthorized person detected in frame", viol: "Secondary Person Flag" },
      { status: "nominal", log: "Visual focus recovered.", viol: "" }
    ];

    let currentEvent = 0;
    const interval = setInterval(() => {
      const e = events[currentEvent % events.length];
      setProctorStatus(e.status as any);
      if (e.viol) {
        setViolations(prev => [...new Set([e.viol, ...prev])].slice(0, 3));
      }
      currentEvent++;
    }, 4500);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="px-4 py-20 bg-white border-y border-[#e5e5e5] md:px-6">
      <div className="mx-auto max-w-7xl">
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Card 1: Agentic Question Generator */}
          <div className="bg-[#FAF9F6] rounded-3xl p-8 border border-[#e5e5e5] flex flex-col justify-between shadow-[0_4px_20px_rgba(0,0,0,0.01)] transition-all duration-300 group">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-[#f5d0fe] flex items-center justify-center text-[#d946ef] mb-6 group-hover:scale-110 transition-transform duration-200">
                <Sparkles className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold text-[#171717] mb-2">Agentic Question Generator</h3>
              <p className="text-xs font-semibold tracking-wider text-[#a3a3a3] uppercase mb-6">No More Static Question Banks.</p>
              <div className="relative mb-6 aspect-[16/10] overflow-hidden rounded-2xl border border-[#e5e5e5] bg-white shadow-[0_12px_30px_rgba(47,19,98,0.08)]">
                <Image
                  src="/models/generate_questions.gif"
                  alt="Agentic question generation workflow"
                  fill
                  unoptimized
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                />
              </div>
              
              <ul className="space-y-4">
                {[
                  "Multi-agent validated question generation",
                  "Generates custom assessments instantly",
                  "Data ingest from documents, APIs & wikis",
                  "Subject Matter Expert dependency reduced",
                  "Personalized assessments per organization"
                ].map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2.5">
                    <div className="h-1.5 w-1.5 rounded-full bg-[#d946ef] mt-2 shrink-0" />
                    <span className="text-sm text-[#525252] leading-tight">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="mt-8 pt-6 border-t border-[#e5e5e5]">
              <Link href="https://platform.zaby.io/tenant/signup" className="text-xs font-semibold text-[#2f1362] flex items-center gap-1 hover:text-[#d946ef] transition-colors">
                Generate Bank <ArrowRight className="h-3 w-3" />
              </Link>
            </div>
          </div>

          {/* Card 2: Real-Time Monitoring with Live Proctoring Grid Simulator */}
          <div className="bg-[#FAF9F6] rounded-3xl p-8 border border-[#e5e5e5] flex flex-col justify-between shadow-[0_4px_20px_rgba(0,0,0,0.01)] transition-all duration-300 group">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-[#f5d0fe] flex items-center justify-center text-[#d946ef] mb-6 group-hover:scale-110 transition-transform duration-200">
                <Lock className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold text-[#171717] mb-2">Real-Time Monitoring</h3>
              <p className="text-xs font-semibold tracking-wider text-[#a3a3a3] uppercase mb-6">Built for High-Integrity Assessments.</p>
              
              {/* Live Webcam Grid Proctoring Simulator */}
              <div className="mb-6 bg-slate-950 rounded-2xl p-3 border border-slate-800 relative overflow-hidden">
                
                {/* Grid header */}
                <div className="flex justify-between items-center mb-2">
                  <div className="flex items-center gap-1 text-[8px] font-mono text-slate-400">
                    <Video className="h-3 w-3 text-red-500 animate-pulse" />
                    <span>PROCTOR TELEMETRY STREAM</span>
                  </div>
                  <span className={`text-[8px] font-mono px-1.5 py-0.5 rounded ${
                    proctorStatus === "nominal" ? "bg-emerald-500/20 text-emerald-400" :
                    proctorStatus === "warning" ? "bg-amber-500/20 text-amber-400" :
                    "bg-red-500/20 text-red-400 animate-pulse"
                  }`}>
                    {proctorStatus.toUpperCase()}
                  </span>
                </div>

                {/* 2x2 simulated grid of webcam screens */}
                <div className="grid grid-cols-2 gap-1.5">
                  
                  {/* User Feed 1 */}
                  <div className="aspect-video bg-slate-900 rounded-md overflow-hidden relative border border-slate-800 flex items-center justify-center">
                    {/* Bounding box representation */}
                    <div className="absolute inset-2 border border-emerald-400/50 rounded flex items-center justify-center">
                      <span className="text-[7px] font-mono text-emerald-400 bg-slate-950/80 px-1 py-0.2 rounded absolute bottom-1 left-1">
                        Candidate 01: Ok
                      </span>
                    </div>
                    <Smile className="h-6 w-6 text-slate-700" />
                  </div>

                  {/* User Feed 2 */}
                  <div className="aspect-video bg-slate-900 rounded-md overflow-hidden relative border border-slate-800 flex items-center justify-center">
                    <div className={`absolute inset-2 border rounded flex items-center justify-center ${
                      proctorStatus === "warning" ? "border-amber-400/80 animate-pulse" : "border-emerald-400/50"
                    }`}>
                      <span className={`text-[7px] font-mono bg-slate-950/80 px-1 py-0.2 rounded absolute bottom-1 left-1 ${
                        proctorStatus === "warning" ? "text-amber-400" : "text-emerald-400"
                      }`}>
                        Candidate 02: {proctorStatus === "warning" ? "Multi-Display" : "Ok"}
                      </span>
                    </div>
                    <Smile className="h-6 w-6 text-slate-700" />
                  </div>

                  {/* User Feed 3 */}
                  <div className="aspect-video bg-slate-900 rounded-md overflow-hidden relative border border-slate-800 flex items-center justify-center">
                    <div className={`absolute inset-2 border rounded flex items-center justify-center ${
                      proctorStatus === "alert" ? "border-red-500 animate-pulse stroke-[2px]" : "border-emerald-400/50"
                    }`}>
                      <span className={`text-[7px] font-mono bg-slate-955/80 px-1 py-0.2 rounded absolute bottom-1 left-1 ${
                        proctorStatus === "alert" ? "text-red-400" : "text-emerald-400"
                      }`}>
                        Candidate 03: {proctorStatus === "alert" ? "Multi-Person" : "Ok"}
                      </span>
                    </div>
                    <Smile className="h-6 w-6 text-slate-700" />
                    {proctorStatus === "alert" && (
                      <div className="absolute top-1 right-1">
                        <ShieldAlert className="h-3.5 w-3.5 text-red-500 animate-ping" />
                      </div>
                    )}
                  </div>

                  {/* User Feed 4 */}
                  <div className="aspect-video bg-slate-900 rounded-md overflow-hidden relative border border-slate-800 flex items-center justify-center">
                    <div className="absolute inset-2 border border-emerald-400/50 rounded flex items-center justify-center">
                      <span className="text-[7px] font-mono text-emerald-400 bg-slate-950/80 px-1 py-0.2 rounded absolute bottom-1 left-1">
                        Candidate 04: Ok
                      </span>
                    </div>
                    <Smile className="h-6 w-6 text-slate-700" />
                  </div>

                </div>

                {/* Telemetry Log Footer */}
                <div className="mt-2 pt-2 border-t border-slate-800 text-[7px] font-mono text-slate-400 flex flex-col gap-0.5">
                  <div>[PROCTOR] Smart Telemetry Connected</div>
                  {violations.length > 0 ? (
                    <div className="text-red-400 font-semibold flex items-center gap-1">
                      <span className="w-1 h-1 rounded-full bg-red-400" />
                      Violations: {violations.join(", ")}
                    </div>
                  ) : (
                    <div className="text-emerald-400 font-semibold flex items-center gap-1">
                      <span className="w-1 h-1 rounded-full bg-emerald-400" />
                      Aura System: Absolute Integrity Verified
                    </div>
                  )}
                </div>

              </div>

              <ul className="space-y-4">
                {[
                  "Live audio & screen monitoring",
                  "Candidate behavior tracking metrics",
                  "AI-powered suspicious activity logs",
                  "Enterprise-grade remote proctoring",
                  "Competitive-exams & certification ready"
                ].map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2.5">
                    <div className="h-1.5 w-1.5 rounded-full bg-[#d946ef] mt-2 shrink-0" />
                    <span className="text-sm text-[#525252] leading-tight">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="mt-8 pt-6 border-t border-[#e5e5e5]">
              <Link href="https://platform.zaby.io/tenant/signup" className="text-xs font-semibold text-[#2f1362] flex items-center gap-1 hover:text-[#d946ef] transition-colors">
                View Safeguards <ArrowRight className="h-3 w-3" />
              </Link>
            </div>
          </div>

          {/* Card 3: Gen-Z Engagement */}
          <div className="bg-[#FAF9F6] rounded-3xl p-8 border border-[#e5e5e5] flex flex-col justify-between shadow-[0_4px_20px_rgba(0,0,0,0.01)] transition-all duration-300 group">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-[#f5d0fe] flex items-center justify-center text-[#d946ef] mb-6 group-hover:scale-110 transition-transform duration-200">
                <Smile className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold text-[#171717] mb-2">Gen-Z Engagement</h3>
              <p className="text-xs font-semibold tracking-wider text-[#a3a3a3] uppercase mb-6">Interactive Assessments That Candidates Actually Enjoy.</p>
              <div className="relative mb-6 aspect-[16/10] overflow-hidden rounded-2xl border border-[#e5e5e5] bg-white shadow-[0_12px_30px_rgba(47,19,98,0.08)]">
                <Image
                  src="/models/genz_gamify.png"
                  alt="Gamified Gen-Z assessment experience"
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                />
              </div>
              
              <ul className="space-y-4">
                {[
                  "Gamified engineering sandboxes",
                  "Dynamic coding quests & challenges",
                  "Conversational AI guidance assistance",
                  "Immersive workspace assessment experiences",
                  "Eliminates copy-paste test fatigue"
                ].map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2.5">
                    <div className="h-1.5 w-1.5 rounded-full bg-[#d946ef] mt-2 shrink-0" />
                    <span className="text-sm text-[#525252] leading-tight">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="mt-8 pt-6 border-t border-[#e5e5e5]">
              <Link href="https://platform.zaby.io/tenant/signup" className="text-xs font-semibold text-[#2f1362] flex items-center gap-1 hover:text-[#d946ef] transition-colors">
                See Engagement Stats <ArrowRight className="h-3 w-3" />
              </Link>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
