"use client";

import React, { useState, useEffect, useRef } from "react";
import { Icon } from "@iconify/react";
import { motion } from "framer-motion";
import { 
  Activity, 
  Terminal, 
  Minimize2, 
  Maximize2, 
  ArrowRight, 
  Check, 
  X,
  Play,
  Sun,
  Moon
} from "lucide-react";
import { NeonGradientCard } from "@/components/ui/neon-gradient-card";
import Image from "next/image";
import { siteConfig } from "@/config";

export default function SandboxSimulationWidget() {
  const [simTab, setSimTab] = useState<"workspace" | "telemetry">("workspace");
  const [simStep, setSimStep] = useState<number>(1);
  const [mongodbString, setMongodbString] = useState("mongodb://admin:pass@db.zaby.io:27017/student_mgmt?ssl=true");
  const [mongodbQueryText, setMongodbQueryText] = useState(`// Use mongosh syntax
// e.g. db.students.find({ grade: { $gte: 90 } })

db.students.find({})`);
  const [milestonesCompleted, setMilestonesCompleted] = useState<number>(0);
  const [isQueryExecuted, setIsQueryExecuted] = useState<boolean>(false);
  const [activeOutputTab, setActiveOutputTab] = useState<"Tree" | "Raw JSON" | "Data">("Tree");
  const [showHint, setShowHint] = useState<boolean>(false);
  const [isQueryRunning, setIsQueryRunning] = useState<boolean>(false);
  const [countdown1, setCountdown1] = useState(56);
  const [countdown2Min, setCountdown2Min] = useState(4);
  const [countdown2Sec, setCountdown2Sec] = useState(48);
  const [isSimFullscreen, setIsSimFullscreen] = useState<boolean>(false);
  const [terminalLogs, setTerminalLogs] = useState<string[]>([]);
  const [isDark, setIsDark] = useState<boolean>(true);
  const simContainerRef = useRef<HTMLDivElement>(null);

  // Sync state when native fullscreen changes (e.g. user presses Esc)
  useEffect(() => {
    const handleFsChange = () => {
      setIsSimFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener("fullscreenchange", handleFsChange);
    return () => document.removeEventListener("fullscreenchange", handleFsChange);
  }, []);

  const toggleSimFullscreen = () => {
    if (!simContainerRef.current) return;
    if (!document.fullscreenElement) {
      simContainerRef.current.requestFullscreen().catch(() => {});
    } else {
      document.exitFullscreen().catch(() => {});
    }
  };

  // Transition timer for Step 1.5 loader screen
  useEffect(() => {
    if (simStep === 1.5) {
      const timer = setTimeout(() => {
        setSimStep(2);
      }, 2200);
      return () => clearTimeout(timer);
    }
  }, [simStep]);

  // Countdown for Step 1 Autostart screen
  useEffect(() => {
    if (simStep !== 1) return;
    const interval = setInterval(() => {
      setCountdown1(prev => (prev > 0 ? prev - 1 : 56));
    }, 1000);
    return () => clearInterval(interval);
  }, [simStep]);

  // Countdown for Step 2 Workstation screen
  useEffect(() => {
    if (simStep < 2 || simStep > 3) return;
    const interval = setInterval(() => {
      setCountdown2Sec(prev => {
        if (prev > 0) return prev - 1;
        setCountdown2Min(m => {
          if (m > 0) return m - 1;
          // Reset if reaches 0
          return 4;
        });
        return 59;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [simStep]);

  // Simulation effect for interactive Terminal
  useEffect(() => {
    const logs = [
      "Initializing Zaby Autonomous Assessment Engine v4.2...",
      "Connecting to Multi-Agent Knowledge Sandbox...",
      "Parsing assessment schema: Advanced API Engineering...",
      "Generating dynamic challenge: 'Optimize Event Loop Latency'",
      "Compiling sandboxed runtime environment...",
      "Candidate session active. Telemetry stream connected.",
      "Awaiting input..."
    ];
    
    const interval = setInterval(() => {
      setTerminalLogs(prev => {
        if (prev.length < logs.length) {
          return [...prev, logs[prev.length]];
        }
        clearInterval(interval);
        return prev;
      });
    }, 1200);

    return () => clearInterval(interval);
  }, []);

  return (
    <NeonGradientCard
      ref={simContainerRef}
      isDark={isDark}
      borderRadius={isSimFullscreen ? 0 : 24}
      borderSize={isSimFullscreen ? 0 : 2}
      neonColors={{
        firstColor: "#e879f9",
        secondColor: "#00FFF1",
      }}
      className={isSimFullscreen ? "w-full h-full" : "w-full aspect-video mt-20"}
    >
      <div
        className={`w-full h-full p-6 md:p-8 flex flex-col justify-between relative overflow-hidden transition-colors duration-300 bg-transparent ${
          isDark ? "text-slate-100" : "text-slate-800"
        }`}
      >
        <style dangerouslySetInnerHTML={{__html: `
          @keyframes slideIn {
            from { transform: translateX(100%); }
            to { transform: translateX(0); }
          }
          @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
          }
          @keyframes scaleUp {
            from { transform: scale(0.95); opacity: 0; }
            to { transform: scale(1); opacity: 1; }
          }
        `}} />
        
        {/* Neon Accent light */}
        <div className={`absolute top-0 right-0 w-48 h-48 rounded-full blur-[80px] pointer-events-none transition-colors duration-300 ${
          isDark ? "bg-[#e879f9]/10" : "bg-[#e879f9]/5"
        }`} />

        {/* Header Tabs switcher */}
        <div className={`flex flex-col sm:flex-row justify-between items-start sm:items-center border-b pb-4 mb-4 gap-3 relative z-10 transition-colors duration-300 ${
          isDark ? "border-slate-800/80" : "border-slate-200"
        }`}>
          <div className="flex gap-2">
            <button
              onClick={() => setSimTab("workspace")}
              className={`text-xs font-semibold px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 cursor-pointer ${
                simTab === "workspace"
                  ? isDark
                    ? "bg-[#4f8ef7]/15 text-[#4f8ef7] border border-[#4f8ef7]/30"
                    : "bg-[#4f8ef7]/10 text-[#1d4ed8] border border-[#4f8ef7]/20"
                  : isDark
                    ? "text-slate-400 hover:text-slate-200"
                    : "text-slate-500 hover:text-slate-800"
              }`}
            >
              <Activity className="h-3.5 w-3.5" />
              Live Candidate Workspace
            </button>
            <button
              onClick={() => setSimTab("telemetry")}
              className={`text-xs font-semibold px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 cursor-pointer ${
                simTab === "telemetry"
                  ? isDark
                    ? "bg-[#4f8ef7]/15 text-[#4f8ef7] border border-[#4f8ef7]/30"
                    : "bg-[#4f8ef7]/10 text-[#1d4ed8] border border-[#4f8ef7]/20"
                  : isDark
                    ? "text-slate-400 hover:text-slate-200"
                    : "text-slate-500 hover:text-slate-800"
              }`}
            >
              <Terminal className="h-3.5 w-3.5" />
              Telemetry Engine Console
            </button>
          </div>
          
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-2">
              <span className={`h-2 w-2 rounded-full animate-ping ${isDark ? "bg-emerald-400" : "bg-emerald-500"}`} />
              <span className={`text-[10px] font-mono font-bold tracking-wider ${isDark ? "text-emerald-400" : "text-emerald-600"}`}>
                ACTIVE PLATFORM MOCKUP
              </span>
            </span>
            
            <button
              onClick={() => setIsDark(!isDark)}
              className={`flex items-center justify-center w-7 h-7 rounded-lg border transition-all cursor-pointer ${
                isDark 
                  ? "border-slate-700 bg-slate-800/60 text-slate-400 hover:text-white hover:border-slate-500 hover:bg-slate-700/80" 
                  : "border-slate-250 bg-white text-slate-550 hover:text-slate-900 hover:border-slate-350 hover:bg-slate-50"
              }`}
              title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
            >
              {isDark ? <Sun className="h-3.5 w-3.5" /> : <Moon className="h-3.5 w-3.5" />}
            </button>

            <button
              onClick={toggleSimFullscreen}
              className={`flex items-center justify-center w-7 h-7 rounded-lg border transition-all cursor-pointer ${
                isDark 
                  ? "border-slate-700 bg-slate-800/60 text-slate-400 hover:text-white hover:border-slate-500 hover:bg-slate-700/80" 
                  : "border-slate-250 bg-white text-slate-550 hover:text-slate-900 hover:border-slate-350 hover:bg-slate-50"
              }`}
              title={isSimFullscreen ? "Exit fullscreen" : "Fullscreen"}
            >
              {isSimFullscreen ? <Minimize2 className="h-3.5 w-3.5" /> : <Maximize2 className="h-3.5 w-3.5" />}
            </button>
          </div>
        </div>

        {/* Dynamic View Panel */}
        <div className="flex-1 flex flex-col justify-between relative z-10 overflow-y-auto">
          {simTab === "workspace" ? (
            /* Interactive Workspace flow step switcher */
            <div className="flex-1 flex flex-col justify-between h-full">
              {simStep === 1 && (
                <div className="flex-1 flex flex-col justify-between animate-[fadeIn_0.3s_ease-out]">
                  {/* Step 1: BYOK Credentials input validation */}
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                    
                    {/* Left column - Information */}
                    <div className={`md:col-span-5 flex flex-col gap-4 border-r min-h-[560px] pr-4 transition-colors duration-300 ${
                      isDark ? "border-slate-800/80" : "border-slate-250"
                    }`}>
                      <div className="flex items-center gap-2">
                        <span className={`text-[10px] font-bold uppercase tracking-wider font-sans ${
                          isDark ? "text-[#4f8ef7]" : "text-blue-600"
                        }`}>— LAB ACCESS</span>
                      </div>
                      <div>
                        <h3 className={`text-xl font-extrabold leading-tight font-display ${
                          isDark ? "text-white" : "text-slate-900"
                        }`}>
                          Save your lab access before the timer starts.
                        </h3>
                        <p className={`text-[11px] mt-2 font-light leading-relaxed ${
                          isDark ? "text-slate-400" : "text-slate-600"
                        }`}>
                          MongoDB test includes BYOK lab sections that need your credentials. We validate them now, encrypt them for this attempt, and reuse them automatically when the matching lab begins.
                        </p>
                      </div>
                      
                      <div className={`h-px ${isDark ? "bg-slate-800/50" : "bg-slate-200"}`} />
                      
                      {/* Sub info cards */}
                      <div className="flex flex-col gap-3">
                        <div className={`flex gap-3 border rounded-xl p-3.5 shadow-xs transition-colors duration-300 ${
                          isDark ? "bg-[#131924] border-slate-850" : "bg-white border-slate-200"
                        }`}>
                          <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 border transition-colors ${
                            isDark 
                              ? "bg-blue-500/10 border-blue-500/20 text-blue-400" 
                              : "bg-blue-50 border-blue-200 text-blue-650"
                          }`}>
                            <Icon icon="solar:shield-keyhole-bold-duotone" className="w-4.5 h-4.5" />
                          </div>
                          <div>
                            <h4 className={`text-[11px] font-bold font-sans ${isDark ? "text-white" : "text-slate-900"}`}>Attempt-scoped encryption</h4>
                            <p className={`text-[9px] mt-0.5 leading-snug font-light ${isDark ? "text-slate-400" : "text-slate-600"}`}>
                              Credentials are stored only for this attempt and are removed after the assessment ends.
                            </p>
                          </div>
                        </div>

                        <div className={`flex gap-3 border rounded-xl p-3.5 shadow-xs transition-colors duration-300 ${
                          isDark ? "bg-[#131924] border-slate-850" : "bg-white border-slate-200"
                        }`}>
                          <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 border transition-colors ${
                            isDark 
                              ? "bg-[#eab308]/10 border-[#eab308]/20 text-[#eab308]" 
                              : "bg-amber-50 border-amber-200 text-amber-700"
                          }`}>
                            <Icon icon="solar:clock-circle-bold-duotone" className="w-4.5 h-4.5" />
                          </div>
                          <div>
                            <h4 className={`text-[11px] font-bold font-sans ${isDark ? "text-white" : "text-slate-900"}`}>Section timer stays protected</h4>
                            <p className={`text-[9px] mt-0.5 leading-snug font-light ${isDark ? "text-slate-400" : "text-slate-600"}`}>
                              BYOK validation happens before the section starts, so time is not lost to setup or sign-in prompts.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Right column - Connections form */}
                    <div className="md:col-span-7 flex flex-col justify-between gap-4 pl-2">
                      <div>
                        <div className="flex justify-between items-center mb-1">
                          <span className={`text-[9px] font-mono uppercase tracking-widest ${isDark ? "text-slate-500" : "text-slate-450"}`}>STEP</span>
                          <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full font-mono border ${
                            isDark 
                              ? "text-blue-400 bg-blue-500/10 border-blue-500/20" 
                              : "text-blue-700 bg-blue-50 border-blue-200"
                          }`}>
                            1 required environment
                          </span>
                        </div>
                        <h3 className={`text-base font-bold font-sans ${isDark ? "text-white" : "text-slate-900"}`}>Validate your lab credentials</h3>
                        <p className={`text-[11px] mt-0.5 font-light leading-relaxed ${isDark ? "text-slate-400" : "text-slate-600"}`}>
                          Enter one credential set for each required BYOK environment. We verify it now and reuse it automatically in every matching lab section.
                        </p>
                      </div>
                      
                      {/* Connection details block */}
                      <div className={`border rounded-2xl p-4.5 space-y-3.5 transition-colors duration-300 ${
                        isDark ? "bg-[#131924]/60 border-slate-800" : "bg-white border-slate-200"
                      }`}>
                        <div className="flex items-center gap-2">
                          <span className={`w-4.5 h-4.5 rounded-full flex items-center justify-center text-[10px] font-mono ${
                            isDark ? "bg-slate-850 text-slate-400" : "bg-slate-100 text-slate-600"
                          }`}>1</span>
                          <span className={`text-[9px] font-bold px-2 py-0.5 rounded font-mono border ${
                            isDark ? "text-red-400 bg-red-500/10 border-red-500/20" : "text-red-700 bg-red-50 border-red-200"
                          }`}>missing</span>
                          <span className={`text-[9px] font-bold px-2 py-0.5 rounded font-mono border ${
                            isDark ? "text-slate-300 bg-slate-800 border-slate-700" : "text-slate-750 bg-slate-100 border-slate-200"
                          }`}>MongoDB</span>
                        </div>
                        
                        <div>
                          <h4 className={`text-xs font-bold font-sans ${isDark ? "text-white" : "text-slate-900"}`}>Lab</h4>
                          <p className={`text-[10px] mt-0.5 font-light ${isDark ? "text-slate-400" : "text-slate-650"}`}>MongoDB Student Management System – CRUD & Aggregation</p>
                        </div>

                        <div className="space-y-1.5">
                          <label className={`text-[9px] font-bold uppercase tracking-wider font-mono block ${isDark ? "text-slate-500" : "text-slate-450"}`}>MONGODB CONNECTION STRING</label>
                          <div className="relative">
                            <input
                              type="text"
                              value={mongodbString}
                              onChange={(e) => setMongodbString(e.target.value)}
                              className={`w-full border rounded-xl py-3 pl-3 pr-10 text-xs font-mono transition-colors focus:ring-1 ${
                                isDark 
                                  ? "bg-[#0B0F19] border-slate-800 text-slate-350 focus:border-blue-500 focus:ring-blue-500" 
                                  : "bg-slate-50 border-slate-250 text-slate-800 focus:border-blue-500 focus:ring-blue-500"
                              }`}
                            />
                            <div className={`absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer transition-colors ${
                              isDark ? "text-slate-500 hover:text-white" : "text-slate-400 hover:text-slate-800"
                            }`}>
                              <Icon icon="solar:eye-bold" className="w-4.5 h-4.5" />
                            </div>
                          </div>
                          <span className={`text-[9px] block leading-tight font-light ${isDark ? "text-slate-500" : "text-slate-450"}`}>
                            Enter a full MongoDB URL. Keep any special characters URL-encoded.
                          </span>
                        </div>
                      </div>
                      
                      <div className="flex flex-col gap-3 mt-1">
                        <span className={`text-[9px] leading-snug font-light text-center ${isDark ? "text-slate-500" : "text-slate-455"}`}>
                          Every required BYOK credential set must validate before the assessment can continue.
                        </span>
                        <button
                          onClick={() => setSimStep(1.5)}
                          className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3.5 rounded-xl font-bold transition-all flex items-center justify-center gap-2 cursor-pointer"
                        >
                          <span>Validate and continue</span>
                          <ArrowRight className="w-4.5 h-4.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {simStep === 1.5 && (
                <div className="flex-1 flex flex-col justify-center items-center py-8 text-center animate-[fadeIn_0.3s_ease-out]">
                  <div className="max-w-md w-full flex flex-col items-center">
                    {/* Logo */}
                    <div className={`text-2xl font-black tracking-widest mb-6 font-sans ${isDark ? "text-white" : "text-slate-900"}`}><Image 
                                   src={isDark ? '/zaby-logos/logo-white.svg' : '/zaby-logos/logo-dark.svg'} 
                                   alt={`${siteConfig.name} logo`} 
                                   width={58} 
                                   height={58} 
                                   className="h-9 w-auto transition-all duration-300 md:h-11"
                                 /></div>
                    
                    {/* Checkmark circle success */}
                    <div className="w-14 h-14 rounded-full bg-emerald-500/10 border border-emerald-500/40 flex items-center justify-center text-emerald-400 mb-6 shadow-[0_0_24px_rgba(16,185,129,0.2)] relative">
                      <div className="absolute inset-0 rounded-full border border-emerald-400 animate-ping opacity-25" />
                      <Icon icon="solar:check-circle-bold" className="w-7 h-7" />
                    </div>

                    <h2 className={`text-xl font-black ${isDark ? "text-white" : "text-slate-900"}`}>Verification Complete!</h2>
                    <p className={`text-[11px] mt-1 font-light ${isDark ? "text-slate-450" : "text-slate-600"}`}>All pre-checks passed successfully</p>
                    
                    {/* Transition Progress bar */}
                    <div className={`w-44 h-1 rounded-full overflow-hidden mt-6 relative ${isDark ? "bg-slate-800" : "bg-slate-200"}`}>
                      <motion.div
                        initial={{ width: "0%" }}
                        animate={{ width: "100%" }}
                        transition={{ duration: 2.0, ease: "easeInOut" }}
                        className="h-full bg-blue-500"
                      />
                    </div>
                    
                    <span className="text-[9px] font-bold text-blue-500 font-mono tracking-widest mt-4 uppercase animate-pulse">
                      REDIRECTING TO YOUR ASSESSMENT...
                    </span>
                  </div>
                </div>
              )}

              {simStep === 2 && (
                <div className="flex-1 flex flex-col justify-between h-full animate-[fadeIn_0.3s_ease-out] overflow-hidden">
                  {/* Step 2 Workstation screen */}
                  <div className="flex-1 flex flex-col gap-3 h-full min-h-0">
                    {/* Sub Header */}
                    <div className={`flex justify-between items-center border rounded-xl px-4 py-2.5 shadow-2xs transition-colors duration-300 shrink-0 ${
                      isDark ? "bg-[#131924] border-slate-850" : "bg-white border-slate-200"
                    }`}>
                      <div className="flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-sm bg-emerald-500" />
                        <span className={`text-xs font-bold ${isDark ? "text-white" : "text-slate-900"}`}>MongoDB Student Management System</span>
                      </div>
                      
                      {/* Timer Pill */}
                      <div className={`flex items-center gap-1.5 border px-3 py-1 rounded-full shadow-[0_0_12px_rgba(234,179,8,0.05)] transition-colors duration-300 ${
                        isDark 
                          ? "bg-[#eab308]/10 border-[#eab308]/20 text-[#eab308]" 
                          : "bg-amber-500/10 border-amber-500/20 text-amber-700"
                      }`}>
                        <Icon icon="solar:clock-circle-bold-duotone" className="w-4.5 h-4.5 animate-pulse" />
                        <span className="text-xs font-bold font-mono">
                          0{countdown2Min}:{countdown2Sec < 10 ? `0${countdown2Sec}` : countdown2Sec}
                        </span>
                      </div>
                      
                      <button
                        onClick={() => setSimStep(3)}
                        className={`border hover:bg-red-500/20 text-red-400 text-xs font-bold px-3 py-1.5 rounded-lg transition-all cursor-pointer shadow-sm ${
                          isDark ? "bg-red-500/10 border-red-500/20" : "bg-red-50 border-red-205"
                        }`}
                      >
                        Submit Section
                      </button>
                    </div>

                    {/* Split Workstation Pane */}
                    <div className="flex-1 min-h-0 grid grid-cols-1 lg:grid-cols-12 gap-4 items-stretch">
                      {/* Left Panel: Milestones List */}
                      <div className={`col-span-1 lg:col-span-4 border rounded-2xl p-4 flex flex-col justify-between h-full overflow-hidden transition-colors duration-300 ${
                        isDark ? "bg-[#131924]/60 border-slate-800/80" : "bg-slate-50/50 border-slate-200"
                      }`}>
                        <div className="flex-1 flex flex-col min-h-0 gap-4">
                          <div className={`flex justify-between items-center border-b pb-2 ${isDark ? "border-slate-850" : "border-slate-200"}`}>
                            <div className="flex items-center gap-1.5">
                              <span className={`text-[10px] font-bold uppercase tracking-wider font-mono ${isDark ? "text-white" : "text-slate-900"}`}>Milestones</span>
                              <span className={`border px-2 py-0.5 rounded text-[9px] font-bold font-mono transition-colors ${
                                isDark 
                                  ? "bg-slate-850 border-slate-700 text-slate-350" 
                                  : "bg-white border-slate-200 text-slate-750"
                              }`}>
                                {milestonesCompleted}/3
                              </span>
                            </div>
                            <div className={`text-right text-[10px] font-mono ${isDark ? "text-slate-400" : "text-slate-550"}`}>
                              {Math.round(milestonesCompleted * 33.3)}% complete
                            </div>
                          </div>

                          {/* Progress bar */}
                          <div className={`w-full h-1.5 rounded-full overflow-hidden ${isDark ? "bg-slate-800" : "bg-slate-200"}`}>
                            <div 
                              className="h-full bg-emerald-500 transition-all duration-500" 
                              style={{ width: `${milestonesCompleted * 33.3}%` }}
                            />
                          </div>
                          <div className="text-[9px] font-mono font-bold tracking-wider text-blue-500">
                            POINTS ACQUIRED: +{milestonesCompleted * 5}/15 pts
                          </div>

                          {/* Milestones cards list */}
                          <div className="space-y-3 flex-1 min-h-0 overflow-y-auto pr-1">
                            {/* Milestone 1 */}
                            <div className={`border rounded-xl p-3.5 transition-all duration-300 ${
                              milestonesCompleted >= 1 
                                ? isDark 
                                  ? "bg-emerald-500/05 border-emerald-500/30" 
                                  : "bg-emerald-50/20 border-emerald-500/20"
                                : isDark
                                  ? "bg-[#131924]/80 border-slate-800"
                                  : "bg-white border-slate-200 shadow-2xs"
                            }`}>
                              <div className="flex justify-between items-start gap-2">
                                <div className="flex gap-2">
                                  <div className={`w-5.5 h-5.5 rounded-full flex items-center justify-center shrink-0 border transition-colors ${
                                    milestonesCompleted >= 1 
                                      ? "bg-emerald-500 border-emerald-500 text-white" 
                                      : isDark
                                        ? "bg-slate-850 border-slate-700 text-slate-400"
                                        : "bg-slate-100 border-slate-200 text-slate-600"
                                  }`}>
                                    {milestonesCompleted >= 1 ? (
                                      <Check className="w-3.5 h-3.5 stroke-[3px]" />
                                    ) : (
                                      <span className="text-[9px] font-bold font-mono">1</span>
                                    )}
                                  </div>
                                  <div>
                                    <h4 className={`text-xs font-bold font-sans leading-tight ${isDark ? "text-white" : "text-slate-900"}`}>
                                      create collection students and Insert Student Records
                                    </h4>
                                    <p className={`text-[9px] mt-1 leading-snug font-light ${isDark ? "text-slate-450" : "text-slate-600"}`}>
                                      Insert at least 5 student documents into the <code className={`px-1 py-0.2 rounded font-mono ${isDark ? "bg-slate-800/80 text-slate-300" : "bg-slate-100 text-slate-700"}`}>students</code> collection. Each document should contain: <code className={`${isDark ? "text-slate-350" : "text-slate-700"}`}>name</code>, <code className={`${isDark ? "text-slate-350" : "text-slate-700"}`}>age</code>, <code className={`${isDark ? "text-slate-350" : "text-slate-700"}`}>course</code>, <code className={`${isDark ? "text-slate-350" : "text-slate-700"}`}>marks</code>, <code className={`${isDark ? "text-slate-350" : "text-slate-700"}`}>city</code>.
                                    </p>
                                  </div>
                                </div>
                                <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded font-mono shrink-0 ${isDark ? "text-[#e879f9] bg-[#e879f9]/10" : "text-fuchsia-700 bg-fuchsia-100"}`}>+5pt</span>
                              </div>
                              
                              {/* Action Controls for Milestone 1 */}
                              {milestonesCompleted === 0 && (
                                <div className={`mt-3 pt-3 border-t flex items-center justify-between gap-2 ${isDark ? "border-slate-800/80" : "border-slate-150"}`}>
                                  <button 
                                    onClick={() => setShowHint(!showHint)}
                                    className={`text-[9px] font-bold flex items-center gap-1 border px-2.5 py-1.5 rounded-lg transition-colors cursor-pointer ${
                                      isDark
                                        ? "border-amber-500/20 bg-amber-500/05 text-amber-400 hover:text-amber-300"
                                        : "border-amber-400/30 bg-amber-500/5 text-amber-700 hover:text-amber-800"
                                    }`}
                                  >
                                    <Icon icon="solar:idea-bold" className="w-3.5 h-3.5" />
                                    {showHint ? "Hide hint" : "Show hint"}
                                  </button>
                                  <button 
                                    onClick={() => {
                                      if (isQueryRunning) return;
                                      setIsQueryRunning(true);
                                      setTimeout(() => {
                                        setIsQueryRunning(false);
                                        setIsQueryExecuted(true);
                                        setMilestonesCompleted(1);
                                      }, 1200);
                                    }}
                                    className="text-[9px] font-bold bg-[#4f8ef7] hover:bg-[#3b82f6] text-white px-3.5 py-1.5 rounded-lg flex items-center gap-1 cursor-pointer transition-all shadow-md shadow-blue-500/10"
                                  >
                                    {isQueryRunning ? (
                                      <Icon icon="solar:refresh-bold" className="w-3.5 h-3.5 animate-spin" />
                                    ) : (
                                      <Icon icon="solar:play-bold" className="w-3.5 h-3.5" />
                                    )}
                                    Run & Verify
                                  </button>
                                </div>
                              )}
                              
                              {/* Collapsible Hint Block */}
                              {showHint && milestonesCompleted === 0 && (
                                <div className={`mt-2.5 border rounded-xl p-2.5 font-mono text-[9px] leading-normal animate-[fadeIn_0.2s_ease-out] ${
                                  isDark ? "bg-[#0b0f19] border-slate-800 text-slate-400" : "bg-slate-50 border-slate-200 text-slate-650"
                                }`}>
                                  <span className="text-[#4f8ef7] font-semibold">// Try using insertMany syntax:</span>
                                  <pre className={`mt-1 font-mono overflow-x-auto whitespace-pre ${isDark ? "text-slate-350" : "text-slate-700"}`}>
{`db.students.insertMany([
  { name: "Aarav", age: 21, marks: 85, city: "Hyderabad" },
  { name: "Aditi", age: 20, marks: 92, city: "Mumbai" }
])`}
                                  </pre>
                                </div>
                              )}
                            </div>

                            {/* Milestone 2 */}
                            <div className={`border rounded-xl p-3.5 transition-all duration-300 ${
                              milestonesCompleted >= 2 
                                ? isDark 
                                  ? "bg-emerald-500/05 border-emerald-500/30" 
                                  : "bg-emerald-50/20 border-emerald-500/20"
                                : milestonesCompleted === 1 
                                  ? isDark
                                    ? "bg-[#131924]/90 border-[#4f8ef7]/30 shadow-[0_0_12px_rgba(79,142,247,0.05)]"
                                    : "bg-white border-[#4f8ef7]/40 shadow-xs"
                                  : isDark
                                    ? "bg-[#131924]/80 border-slate-800 opacity-60"
                                    : "bg-white border-slate-200 opacity-60"
                            }`}>
                              <div className="flex justify-between items-start gap-2">
                                <div className="flex gap-2">
                                  <div className={`w-5.5 h-5.5 rounded-full flex items-center justify-center shrink-0 border transition-colors ${
                                    milestonesCompleted >= 2 
                                      ? "bg-emerald-500 border-emerald-500 text-white" 
                                      : isDark
                                        ? "bg-slate-850 border-slate-700 text-slate-400"
                                        : "bg-slate-100 border-slate-200 text-slate-600"
                                  }`}>
                                    {milestonesCompleted >= 2 ? (
                                      <Check className="w-3.5 h-3.5 stroke-[3px]" />
                                    ) : (
                                      <span className="text-[9px] font-bold font-mono">2</span>
                                    )}
                                  </div>
                                  <div>
                                    <h4 className={`text-xs font-bold font-sans leading-tight ${isDark ? "text-white" : "text-slate-900"}`}>
                                      Find Specific Students
                                    </h4>
                                    <ul className={`text-[9px] mt-1 leading-snug font-light list-disc pl-3.5 space-y-0.5 ${isDark ? "text-slate-450" : "text-slate-655"}`}>
                                      <li>Find students from <code className={`px-1 py-0.2 rounded font-mono ${isDark ? "bg-slate-800/80 text-slate-350" : "bg-slate-100 text-slate-700"}`}>Hyderabad</code></li>
                                      <li>Find students with marks greater than <code className={`px-1 py-0.2 rounded font-mono ${isDark ? "bg-slate-800/80 text-slate-350" : "bg-slate-100 text-slate-700"}`}>80</code></li>
                                    </ul>
                                  </div>
                                </div>
                                <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded font-mono shrink-0 ${isDark ? "text-[#e879f9] bg-[#e879f9]/10" : "text-fuchsia-700 bg-fuchsia-100"}`}>+5pt</span>
                              </div>
                              {milestonesCompleted === 1 && (
                                <div className={`mt-3 pt-3 border-t flex items-center justify-end ${isDark ? "border-slate-850" : "border-slate-150"}`}>
                                  <button 
                                    onClick={() => {
                                      if (isQueryRunning) return;
                                      setIsQueryRunning(true);
                                      setTimeout(() => {
                                        setIsQueryRunning(false);
                                        setMilestonesCompleted(2);
                                      }, 1200);
                                    }}
                                    className="text-[9px] font-bold bg-[#4f8ef7] hover:bg-[#3b82f6] text-white px-3.5 py-1.5 rounded-lg flex items-center gap-1 cursor-pointer transition-all shadow-md shadow-blue-500/10 hover:scale-[1.01]"
                                  >
                                    {isQueryRunning ? (
                                      <Icon icon="solar:refresh-bold" className="w-3.5 h-3.5 animate-spin" />
                                    ) : (
                                      <Icon icon="solar:play-bold" className="w-3.5 h-3.5" />
                                    )}
                                    Run & Verify
                                  </button>
                                </div>
                              )}
                            </div>

                            {/* Milestone 3 */}
                            <div className={`border rounded-xl p-3.5 transition-all duration-300 ${
                              milestonesCompleted >= 3 
                                ? isDark 
                                  ? "bg-emerald-500/05 border-emerald-500/30" 
                                  : "bg-emerald-50/20 border-emerald-500/20"
                                : milestonesCompleted === 2 
                                  ? isDark
                                    ? "bg-[#131924]/90 border-[#4f8ef7]/30 shadow-[0_0_12px_rgba(79,142,247,0.05)]"
                                    : "bg-white border-[#4f8ef7]/40 shadow-xs"
                                  : isDark
                                    ? "bg-[#131924]/80 border-slate-800 opacity-60"
                                    : "bg-white border-slate-200 opacity-60"
                            }`}>
                              <div className="flex justify-between items-start gap-2">
                                <div className="flex gap-2">
                                  <div className={`w-5.5 h-5.5 rounded-full flex items-center justify-center shrink-0 border transition-colors ${
                                    milestonesCompleted >= 3 
                                      ? "bg-emerald-500 border-emerald-500 text-white" 
                                      : isDark
                                        ? "bg-slate-850 border-slate-700 text-slate-400"
                                        : "bg-slate-100 border-slate-200 text-slate-600"
                                  }`}>
                                    {milestonesCompleted >= 3 ? (
                                      <Check className="w-3.5 h-3.5 stroke-[3px]" />
                                    ) : (
                                      <span className="text-[9px] font-bold font-mono">3</span>
                                    )}
                                  </div>
                                  <div>
                                    <h4 className={`text-xs font-bold font-sans leading-tight ${isDark ? "text-white" : "text-slate-900"}`}>
                                      Modify Records
                                    </h4>
                                    <ul className={`text-[9px] mt-1 leading-snug font-light list-disc pl-3.5 space-y-0.5 ${isDark ? "text-slate-450" : "text-slate-655"}`}>
                                      <li>Update marks of one student</li>
                                      <li>Delete one student using name</li>
                                    </ul>
                                  </div>
                                </div>
                                <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded font-mono shrink-0 ${isDark ? "text-[#e879f9] bg-[#e879f9]/10" : "text-fuchsia-700 bg-fuchsia-100"}`}>+5pt</span>
                              </div>
                              {milestonesCompleted === 2 && (
                                <div className={`mt-3 pt-3 border-t flex items-center justify-end ${isDark ? "border-slate-850" : "border-slate-150"}`}>
                                  <button 
                                    onClick={() => {
                                      if (isQueryRunning) return;
                                      setIsQueryRunning(true);
                                      setTimeout(() => {
                                        setIsQueryRunning(false);
                                        setMilestonesCompleted(3);
                                      }, 1200);
                                    }}
                                    className="text-[9px] font-bold bg-[#4f8ef7] hover:bg-[#3b82f6] text-white px-3.5 py-1.5 rounded-lg flex items-center gap-1 cursor-pointer transition-all shadow-md shadow-blue-500/10 hover:scale-[1.01]"
                                  >
                                    {isQueryRunning ? (
                                      <Icon icon="solar:refresh-bold" className="w-3.5 h-3.5 animate-spin" />
                                    ) : (
                                      <Icon icon="solar:play-bold" className="w-3.5 h-3.5" />
                                    )}
                                    Run & Verify
                                  </button>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>

                        {/* Sidebar Footer stats */}
                        <div className={`border-t pt-3 mt-4 ${isDark ? "border-slate-800/80" : "border-slate-200"}`}>
                          <button className={`w-full text-center text-[10px] py-2.5 border rounded-xl mb-3 cursor-pointer transition-colors shadow-2xs ${
                            isDark 
                              ? "bg-[#131924] border-slate-850 text-slate-400 hover:text-white" 
                              : "bg-white border-slate-250 text-slate-600 hover:text-slate-900 hover:bg-slate-50"
                          }`}>
                            View Instructions
                          </button>
                          <div className={`grid grid-cols-4 text-center text-[8px] uppercase tracking-wider font-mono gap-1 ${isDark ? "text-slate-500" : "text-slate-450"}`}>
                            <div>
                              <div className={`text-xs font-bold font-mono ${milestonesCompleted > 0 ? isDark ? "text-emerald-400" : "text-emerald-600" : isDark ? "text-slate-500" : "text-slate-400"}`}>
                                {milestonesCompleted > 0 ? "1" : "0"}
                              </div>
                              <span>Answered</span>
                            </div>
                            <div>
                              <div className={`text-xs font-bold font-mono ${isDark ? "text-slate-500" : "text-slate-400"}`}>0</div>
                              <span>Skipped</span>
                            </div>
                            <div>
                              <div className={`text-xs font-bold font-mono ${isDark ? "text-slate-500" : "text-slate-400"}`}>0</div>
                              <span>Flagged</span>
                            </div>
                            <div>
                              <div className={`text-xs font-bold font-mono ${milestonesCompleted > 0 ? isDark ? "text-slate-500" : "text-slate-450" : "text-blue-500"}`}>
                                {milestonesCompleted > 0 ? "0" : "1"}
                              </div>
                              <span>Not Visited</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Right Panel: Code Query Editor & Output Console */}
                      <div className="lg:col-span-8 flex flex-col gap-4 justify-between h-full overflow-hidden">
                        {/* mongosh editor pane */}
                        <div className={`border rounded-2xl overflow-hidden flex flex-col flex-1 transition-colors duration-300 ${
                          isDark ? "bg-[#131924]/60 border-slate-800/80" : "bg-slate-50/50 border-slate-200"
                        }`}>
                          <div className={`px-4 py-2 border-b flex justify-between items-center text-[10px] font-mono transition-colors duration-300 ${
                            isDark ? "bg-[#131924]/80 border-slate-850 text-slate-400" : "bg-slate-100 border-slate-200 text-slate-550"
                          }`}>
                            <div className={`flex items-center gap-1.5 font-bold ${isDark ? "text-white" : "text-slate-750"}`}>
                              <Icon icon="solar:terminal-code-bold-duotone" className="text-[#4f8ef7] w-4 h-4" />
                              <span>_ mongosh</span>
                            </div>
                            <div className={`flex gap-2 ${isDark ? "opacity-100" : "opacity-80"}`}>
                              <span className="w-2.5 h-2.5 rounded-full bg-[#ef4444]/40" />
                              <span className="w-2.5 h-2.5 rounded-full bg-[#eab308]/40" />
                              <span className="w-2.5 h-2.5 rounded-full bg-[#22c55e]/40" />
                            </div>
                          </div>

                          {/* Editor field */}
                          <textarea
                            value={mongodbQueryText}
                            onChange={(e) => setMongodbQueryText(e.target.value)}
                            className={`w-full flex-1 p-4 text-xs font-mono border-none outline-none focus:ring-0 resize-none leading-relaxed min-h-0 transition-colors ${
                              isDark ? "bg-[#0b0f19] text-slate-200" : "bg-white text-slate-850"
                            }`}
                            spellCheck="false"
                          />
                        </div>

                        {/* Console Output bottom tab panel */}
                        <div className={`border rounded-2xl overflow-hidden flex flex-col h-[220px] transition-colors duration-300 ${
                          isDark ? "bg-[#131924]/60 border-slate-800/80" : "bg-slate-50/50 border-slate-200"
                        }`}>
                          {/* Output tabs header */}
                          <div className={`px-3 py-1.5 border-b flex justify-between items-center transition-colors duration-300 ${
                            isDark ? "bg-[#131924]/80 border-slate-850" : "bg-slate-100 border-slate-200"
                          }`}>
                            <div className="flex gap-1">
                              {(["Tree", "Raw JSON", "Data"] as const).map((tab) => (
                                <button
                                  key={tab}
                                  onClick={() => setActiveOutputTab(tab)}
                                  className={`text-[9px] font-bold font-mono px-3 py-1 rounded-md transition-all cursor-pointer ${
                                    activeOutputTab === tab
                                      ? isDark 
                                        ? "bg-slate-850 text-white border border-slate-700"
                                        : "bg-white text-slate-800 border border-slate-250 shadow-2xs"
                                      : isDark
                                        ? "text-slate-450 hover:text-slate-250"
                                        : "text-slate-500 hover:text-slate-800"
                                  }`}
                                >
                                  {tab}
                                </button>
                              ))}
                            </div>
                            <span className={`text-[8px] font-bold uppercase tracking-widest font-mono ${isDark ? "text-slate-500" : "text-slate-450"}`}>
                              Query Console Output
                            </span>
                          </div>

                          {/* Output view area */}
                          <div className={`flex-1 p-3.5 overflow-auto font-mono text-[10px] transition-colors duration-300 ${
                            isDark ? "bg-[#0b0f19] text-slate-350" : "bg-white text-slate-700 border-t-0 border-slate-200"
                          }`}>
                            {isQueryRunning ? (
                              <div className="w-full h-full flex flex-col justify-center items-center gap-2 text-slate-500">
                                <Icon icon="solar:refresh-bold" className="w-6 h-6 animate-spin text-[#4f8ef7]" />
                                <span className="font-mono text-[9px] uppercase tracking-wider animate-pulse">
                                  Connecting to Sandbox Database and Running verification...
                                </span>
                              </div>
                            ) : !isQueryExecuted ? (
                              <div className="w-full h-full flex flex-col justify-center items-center text-slate-500 gap-2">
                                <Icon icon="solar:database-bold" className="w-7 h-7 opacity-35" />
                                <span className="text-[9px] font-mono uppercase tracking-widest text-slate-500">
                                  Run a query to see results here.
                                </span>
                              </div>
                            ) : (
                              <div className="space-y-1 animate-[fadeIn_0.3s_ease-out]">
                                {activeOutputTab === "Tree" && (
                                  <div className="space-y-2 font-mono text-[10px]">
                                    <div className={`font-semibold ${isDark ? "text-emerald-400" : "text-emerald-600"}`}>// Students Collection - {milestonesCompleted} Milestone(s) Verified</div>
                                    <div className="text-slate-400">{"["}</div>
                                    
                                    {/* Row 1 */}
                                    <div className={`pl-4 border-l ${isDark ? "border-slate-800" : "border-slate-200"}`}>
                                      <div className="text-slate-450">{"{"}</div>
                                      <div className="pl-4 flex flex-col gap-0.5">
                                        <div><span className="text-purple-400">_id</span>: <span className="text-cyan-400">"603d21b7f1a3e82d8c8b4567"</span>,</div>
                                        <div><span className="text-purple-400">name</span>: <span className="text-cyan-400">"Aarav Mehta"</span>,</div>
                                        <div><span className="text-purple-400">age</span>: <span className="text-amber-550">21</span>,</div>
                                        <div><span className="text-purple-400">course</span>: <span className="text-cyan-400">"Computer Science"</span>,</div>
                                        <div><span className="text-purple-400">marks</span>: <span className="text-amber-550">85</span>,</div>
                                        <div><span className="text-purple-400">city</span>: <span className="text-cyan-400">"Hyderabad"</span></div>
                                      </div>
                                      <div className="text-slate-450">{"},"}</div>
                                    </div>

                                    {/* Row 2 */}
                                    <div className={`pl-4 border-l ${isDark ? "border-slate-800" : "border-slate-200"}`}>
                                      <div className="text-slate-455">{"{"}</div>
                                      <div className="pl-4 flex flex-col gap-0.5">
                                        <div><span className="text-purple-400">_id</span>: <span className="text-cyan-400">"603d21b7f1a3e82d8c8b4568"</span>,</div>
                                        <div><span className="text-purple-400">name</span>: <span className="text-cyan-400">"Aditi Rao"</span>,</div>
                                        <div><span className="text-purple-400">age</span>: <span className="text-amber-550">20</span>,</div>
                                        <div><span className="text-purple-400">course</span>: <span className="text-cyan-400">"Data Science"</span>,</div>
                                        <div><span className="text-purple-400">marks</span>: <span className="text-amber-555">92</span>,</div>
                                        <div><span className="text-purple-400">city</span>: <span className="text-cyan-400">"Mumbai"</span></div>
                                      </div>
                                      <div className="text-slate-455">{"},"}</div>
                                    </div>

                                    {/* Truncation indicator */}
                                    <div className={`pl-4 italic ${isDark ? "text-slate-550" : "text-slate-500"}`}>
                                      ... {5 - 2} more records listed
                                    </div>

                                    <div className="text-slate-400">{"]"}</div>
                                  </div>
                                )}

                                {activeOutputTab === "Raw JSON" && (
                                  <pre className={`font-mono text-[9.5px] leading-normal whitespace-pre-wrap ${isDark ? "text-slate-300" : "text-slate-650"}`}>
{JSON.stringify([
  { _id: "603d21b7f1a3e82d8c8b4567", name: "Aarav Mehta", age: 21, course: "Computer Science", marks: 85, city: "Hyderabad" },
  { _id: "603d21b7f1a3e82d8c8b4568", name: "Aditi Rao", age: 20, course: "Data Science", marks: 92, city: "Mumbai" },
  { _id: "603d21b7f1a3e82d8c8b4569", name: "Kabir Singh", age: 22, course: "Information Technology", marks: 78, city: "Hyderabad" }
], null, 2)}
                                  </pre>
                                )}

                                {activeOutputTab === "Data" && (
                                  <div className="overflow-x-auto">
                                    <table className="w-full text-left font-mono text-[9px] border-collapse">
                                      <thead>
                                        <tr className={`border-b font-bold ${isDark ? "border-slate-800 text-slate-400" : "border-slate-200 text-slate-500"}`}>
                                          <th className="pb-1.5 pr-2">ID</th>
                                          <th className="pb-1.5 pr-2">Name</th>
                                          <th className="pb-1.5 pr-2 text-center">Age</th>
                                          <th className="pb-1.5 pr-2">Course</th>
                                          <th className="pb-1.5 pr-2 text-center">Marks</th>
                                          <th className="pb-1.5">City</th>
                                        </tr>
                                      </thead>
                                      <tbody>
                                        {[
                                          { id: "*4567", name: "Aarav Mehta", age: 21, course: "Comp Sci", marks: 85, city: "Hyderabad" },
                                          { id: "*4568", name: "Aditi Rao", age: 20, course: "Data Sci", marks: 92, city: "Mumbai" },
                                          { id: "*4569", name: "Kabir Singh", age: 22, course: "Info Tech", marks: 78, city: "Hyderabad" }
                                        ].map((r, i) => (
                                          <tr key={i} className={`border-b ${isDark ? "border-slate-900/50 text-slate-300" : "border-slate-100 text-slate-650"}`}>
                                            <td className="py-1">{r.id}</td>
                                            <td className={`py-1 font-semibold ${isDark ? "text-white" : "text-slate-900"}`}>{r.name}</td>
                                            <td className={`py-1 text-center ${isDark ? "text-amber-400" : "text-amber-700"}`}>{r.age}</td>
                                            <td className={`py-1 ${isDark ? "text-cyan-400" : "text-blue-700"}`}>{r.course}</td>
                                            <td className={`py-1 text-center font-bold ${isDark ? "text-emerald-400" : "text-emerald-600"}`}>{r.marks}</td>
                                            <td className="py-1">{r.city}</td>
                                          </tr>
                                        ))}
                                      </tbody>
                                    </table>
                                  </div>
                                )}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {simStep === 3 && (
                <div className="flex-1 flex flex-col justify-between h-full relative">
                  {/* Step 3 Sliding Drawer Confirmation (Image 2 style) */}
                  
                  {/* Dimmed static background workspace */}
                  <div className="opacity-35 pointer-events-none">
                    {/* Sub Header */}
                    <div className={`flex justify-between items-center border rounded-xl px-4 py-2.5 mb-3 ${
                      isDark ? "bg-[#131924] border-slate-850" : "bg-white border-slate-200"
                    }`}>
                      <div className="flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-sm bg-emerald-500" />
                        <span className="text-xs font-bold">MongoDB Student Management System</span>
                      </div>
                      <div className={`flex items-center gap-1.5 border px-3 py-1 rounded-full text-[#eab308] ${
                        isDark ? "bg-[#eab308]/10 border-[#eab308]/20" : "bg-amber-500/10 border-amber-500/20"
                      }`}>
                        <Icon icon="solar:clock-circle-bold-duotone" className="w-4.5 h-4.5" />
                        <span className="text-xs font-bold font-mono">04:48</span>
                      </div>
                      <button className="bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-bold px-3 py-1.5 rounded-lg">
                        Submit Section
                      </button>
                    </div>

                    {/* Split Workstation Pane */}
                    <div className="grid grid-cols-12 gap-4">
                      <div className={`col-span-5 border rounded-2xl p-4 min-h-[300px] ${
                        isDark ? "bg-[#131924]/60 border-slate-800" : "bg-slate-50 border-slate-200"
                      }`} />
                      <div className={`col-span-7 border rounded-2xl p-4 min-h-[300px] ${
                        isDark ? "bg-[#131924]/60 border-slate-800" : "bg-slate-50 border-slate-200"
                      }`} />
                    </div>
                  </div>

                  {/* Right Slide-in Confirmation Drawer overlay */}
                  <div className={`absolute right-0 top-[-16px] bottom-[-24px] w-full sm:w-[325px] border-l shadow-2xl p-5 flex flex-col justify-between z-30 animate-[slideIn_0.3s_ease-out] ${
                    isDark ? "bg-[#0e131f] border-slate-800/90" : "bg-white border-slate-200"
                  }`}>
                    
                    {/* Scrollable details wrapper */}
                    <div className="flex flex-col gap-3.5 flex-1 overflow-y-auto pr-1.5 scrollbar-thin scrollbar-thumb-slate-800 scrollbar-track-transparent">
                      <div className={`flex justify-between items-center border-b pb-3 ${isDark ? "border-slate-800" : "border-slate-200"}`}>
                        <h3 className={`text-sm font-bold flex items-center gap-1.5 uppercase font-mono tracking-wider ${isDark ? "text-white" : "text-slate-900"}`}>
                          <Icon icon="solar:checklist-bold-duotone" className="text-[#4f8ef7] w-4.5 h-4.5" />
                          Submit Section
                        </h3>
                        <button
                          onClick={() => setSimStep(2)}
                          className={`cursor-pointer ${isDark ? "text-slate-400 hover:text-white" : "text-slate-500 hover:text-slate-800"}`}
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>

                      <p className={`text-[10px] leading-relaxed font-light font-sans ${isDark ? "text-slate-400" : "text-slate-600"}`}>
                        Review your answers before submitting the section. Once submitted, you cannot return to this section.
                      </p>

                      {/* Dynamic Green Circular Progress */}
                      <div className={`flex flex-col items-center justify-center my-2 py-1.5 border-y ${
                        isDark ? "border-slate-800/60" : "border-slate-200"
                      }`}>
                        <div className="relative w-28 h-28 flex items-center justify-center">
                          {/* SVG Circle indicator */}
                          <svg className="absolute w-28 h-28 transform -rotate-90">
                            <circle cx="56" cy="56" r="48" stroke={isDark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.05)"} strokeWidth="6" fill="transparent" />
                            <circle 
                              cx="56" 
                              cy="56" 
                              r="48" 
                              stroke="#10b981" 
                              strokeWidth="6" 
                              fill="transparent" 
                              strokeDasharray="301.6" 
                              strokeDashoffset={301.6 - (301.6 * (milestonesCompleted / 3))} 
                              className="transition-all duration-500" 
                            />
                          </svg>
                          <div className="text-center z-10">
                            <div className={`text-base font-black font-mono ${isDark ? "text-white" : "text-slate-900"}`}>
                              {Math.round(milestonesCompleted * 33.3)}%
                            </div>
                            <div className={`text-[7px] font-bold uppercase tracking-wider font-mono ${isDark ? "text-slate-400" : "text-slate-500"}`}>Complete</div>
                          </div>
                        </div>
                        
                        <div className="flex justify-center gap-3.5 text-[9px] mt-3 font-mono">
                          <div className={`flex items-center gap-1 ${isDark ? "text-emerald-400" : "text-emerald-600"}`}>
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                            <span>Answered ({milestonesCompleted > 0 ? "1" : "0"})</span>
                          </div>
                          <div className="flex items-center gap-1 text-red-500">
                            <span className="w-1.5 h-1.5 rounded-full bg-red-500" />
                            <span>Unanswered ({milestonesCompleted > 0 ? "0" : "1"})</span>
                          </div>
                          <div className="flex items-center gap-1 text-[#4f8ef7]">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#4f8ef7]" />
                            <span>Flagged (0)</span>
                          </div>
                        </div>
                      </div>

                      {/* Stats card info */}
                      <div className={`border rounded-xl p-3.5 space-y-2 shadow-2xs transition-colors duration-300 ${
                        isDark ? "bg-[#131924] border-slate-800" : "bg-slate-50 border-slate-200"
                      }`}>
                        <div className={`text-[9px] uppercase tracking-wider font-bold font-mono ${isDark ? "text-slate-500" : "text-slate-450"}`}>
                          TOTAL: 1 SECTION
                        </div>
                        <div className="text-[8px] uppercase tracking-wider text-[#4f8ef7] font-bold font-mono">Detailed Stats</div>
                        
                        <div className="space-y-1.5 text-xs">
                          <div className={`flex justify-between items-center border-b pb-1.5 ${isDark ? "border-slate-850 text-slate-400" : "border-slate-200 text-slate-600"}`}>
                            <span className="flex items-center gap-1 text-[10px]"><Icon icon="solar:target-bold-duotone" className="w-3.5 h-3.5 text-slate-500" /> Attempted</span>
                            <span className={`font-bold text-[11px] font-mono ${isDark ? "text-white" : "text-slate-900"}`}>
                              {milestonesCompleted > 0 ? "1 / 1" : "0 / 1"}
                            </span>
                          </div>
                          <div className={`flex justify-between items-center border-b pb-1.5 ${isDark ? "border-slate-850 text-slate-400" : "border-slate-200 text-slate-600"}`}>
                            <span className="flex items-center gap-1 text-[10px]"><Icon icon="solar:check-circle-bold-duotone" className="w-3.5 h-3.5 text-emerald-500" /> Answered</span>
                            <span className={`font-bold text-[11px] font-mono ${isDark ? "text-white" : "text-slate-900"}`}>
                              {milestonesCompleted > 0 ? "1 / 1" : "0 / 1"}
                            </span>
                          </div>
                          <div className={`flex justify-between items-center border-b pb-1.5 ${isDark ? "border-slate-850 text-slate-455" : "border-slate-200 text-slate-650"}`}>
                            <span className="flex items-center gap-1 text-[10px]"><Icon icon="solar:info-circle-bold-duotone" className="w-3.5 h-3.5 text-red-500" /> Unanswered</span>
                            <span className={`font-bold text-[11px] font-mono ${isDark ? "text-slate-350" : "text-slate-700"}`}>
                              {milestonesCompleted > 0 ? "0" : "1"}
                            </span>
                          </div>
                          <div className={`flex justify-between items-center ${isDark ? "text-slate-400" : "text-slate-600"}`}>
                            <span className="flex items-center gap-1 text-[10px]"><Icon icon="solar:flag-bold-duotone" className="w-3.5 h-3.5 text-[#4f8ef7]" /> Flagged</span>
                            <span className={`font-bold text-[11px] font-mono ${isDark ? "text-slate-355" : "text-slate-700"}`}>0</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Pinned action buttons at the bottom of the drawer */}
                    <div className={`flex gap-2 border-t pt-4 mt-3 shrink-0 ${isDark ? "border-slate-800" : "border-slate-200"}`}>
                      <button
                        onClick={() => setSimStep(2)}
                        className={`w-1/2 border py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                          isDark 
                            ? "border-slate-750 hover:border-slate-505 bg-slate-800/40 text-slate-200 hover:text-white" 
                            : "border-slate-300 hover:border-slate-400 bg-slate-100 hover:bg-slate-200 text-slate-700 hover:text-slate-900"
                        }`}
                      >
                        Continue Test
                      </button>
                      <button
                        onClick={() => setSimStep(5)}
                        className="w-1/2 bg-blue-500 hover:bg-blue-600 text-white py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer shadow-md shadow-blue-500/10 hover:scale-[1.01]"
                      >
                        Finish Test
                      </button>
                    </div>

                  </div>
                </div>
              )}

              {simStep === 5 && (
                <div className="flex-1 flex flex-col justify-center items-center py-6 text-center animate-[fadeIn_0.4s_ease-out]">
                  {/* Step 5: Final Submission Complete Screen */}
                  <span className={`text-2xl font-black mb-4 tracking-widest font-sans ${isDark ? "text-white" : "text-slate-900"}`}>zaby</span>
                  
                  {/* Glowing success badge */}
                  <div className="w-14 h-14 rounded-full bg-emerald-500/10 border border-emerald-500/40 flex items-center justify-center text-emerald-400 mb-5 shadow-[0_0_24px_rgba(16,185,129,0.2)] relative">
                    <div className="absolute inset-0 rounded-full border border-emerald-400 animate-ping opacity-25" />
                    <Check className="w-7 h-7 stroke-[3.5px]" />
                  </div>

                  <h2 className={`text-xl font-black ${isDark ? "text-white" : "text-slate-900"}`}>Assessment Submitted!</h2>
                  <p className="text-[#4f8ef7] text-[10px] font-bold tracking-widest uppercase mt-1 font-mono">
                    MongoDB Student Management System
                  </p>

                  {/* Information panel */}
                  <div className={`border rounded-2xl p-4.5 mt-5 max-w-sm w-full text-left flex gap-3.5 items-start shadow-2xs transition-colors duration-300 ${
                    isDark ? "bg-[#131924] border-slate-800" : "bg-white border-slate-200"
                  }`}>
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 border ${
                      isDark 
                        ? "bg-blue-500/10 border-blue-500/20 text-blue-400" 
                        : "bg-blue-50 border-blue-200 text-blue-650"
                    }`}>
                      <Icon icon="solar:graph-bold-duotone" className="w-4.5 h-4.5" />
                    </div>
                    <div className="font-sans">
                      <h4 className={`text-xs font-bold mb-0.5 ${isDark ? "text-white" : "text-slate-900"}`}>Results will be available shortly</h4>
                      <p className={`text-[10px] leading-normal font-light ${isDark ? "text-slate-400" : "text-slate-600"}`}>
                        Your connection string, query log, and automated milestone checks have been securely transmitted to the Zaby Assessment Engine. Evaluated results and personalized insights will be populated on your dashboard shortly.
                      </p>
                    </div>
                  </div>

                  <div className="mt-6 flex flex-col sm:flex-row gap-3 w-full max-w-xs">
                    <button
                      onClick={() => {
                        setSimStep(1);
                        setMilestonesCompleted(0);
                        setIsQueryExecuted(false);
                        setCountdown2Min(4);
                        setCountdown2Sec(48);
                      }}
                      className={`w-full border py-3 rounded-xl text-xs font-bold transition-all cursor-pointer shadow-2xs ${
                        isDark 
                          ? "bg-[#131924] border-slate-700 hover:border-slate-500 text-slate-200 hover:text-white" 
                          : "bg-white border-slate-250 hover:bg-slate-50 hover:border-slate-350 text-slate-700"
                      }`}
                    >
                      Restart Simulation
                    </button>
                    <button
                      onClick={() => {
                        setSimStep(1);
                        setMilestonesCompleted(0);
                        setIsQueryExecuted(false);
                        setCountdown2Min(4);
                        setCountdown2Sec(48);
                      }}
                      className={`w-full py-3 rounded-xl text-xs font-bold transition-all cursor-pointer hover:scale-[1.02] shadow-sm ${
                        isDark
                          ? "bg-white hover:bg-slate-100 text-slate-950"
                          : "bg-[var(--color-button-primary-bg)] hover:bg-[var(--color-button-primary-hover)] text-white"
                      }`}
                    >
                      Go to Dashboard
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            /* Telemetry Engine Console view (Original system terminal logs) */
            <div className="flex-1 flex flex-col justify-between h-full">
              <div className={`flex justify-between items-center border-b pb-3 mb-4 ${isDark ? "border-slate-800/80" : "border-slate-200"}`}>
                <div className="flex items-center gap-2">
                  <Terminal className={`h-4 w-4 ${isDark ? "text-[#4f8ef7]" : "text-blue-650"}`} />
                  <span className={`text-xs font-mono ${isDark ? "text-slate-300" : "text-slate-700"}`}>ZABY ASSESSMENT | Lab 2: Optimize API Latency</span>
                </div>
                <div className={`flex items-center gap-1.5 border px-2 py-0.5 rounded-md ${
                  isDark ? "bg-emerald-500/10 border-emerald-500/20" : "bg-emerald-50 border-emerald-250"
                }`}>
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span className={`text-[9px] font-mono font-bold ${isDark ? "text-emerald-400" : "text-emerald-600"}`}>ACTIVE SESSION</span>
                </div>
              </div>

              {/* Terminal Logs Area */}
              <div className={`flex-1 font-mono text-xs space-y-2 overflow-y-auto max-h-[220px] pr-2 ${
                isDark ? "text-slate-300" : "text-slate-700"
              }`}>
                {terminalLogs.map((log, idx) => (
                  <div key={idx} className="flex gap-2">
                    <span className={`font-mono ${isDark ? "text-slate-500" : "text-slate-450"}`}>[{10 + idx}:02:44]</span>
                    {log && log.startsWith("Candidate") ? (
                      <span className={isDark ? "text-emerald-400 font-bold" : "text-emerald-600 font-bold"}>{log}</span>
                    ) : log && (log.startsWith("score") || log.includes("Optimized") || log.includes("Optimize")) ? (
                      <span className={isDark ? "text-[#4f8ef7] font-bold" : "text-blue-650 font-bold"}>{log}</span>
                    ) : (
                      <span>{log || ""}</span>
                    )}
                  </div>
                ))}
                <div className="flex gap-1 items-center">
                  <span className={isDark ? "text-slate-500" : "text-slate-450"}>&gt;</span>
                  <span className={`w-1.5 h-3.5 animate-pulse ${isDark ? "bg-white" : "bg-slate-900"}`} />
                </div>
              </div>

              {/* Output Summary Card */}
              <div className={`mt-6 border rounded-2xl p-4 flex flex-col md:flex-row justify-between gap-4 items-center shadow-2xs transition-colors duration-300 ${
                isDark ? "bg-[#191e2a]/90 border-slate-800" : "bg-white border-slate-200"
              }`}>
                <div className="flex items-center gap-3">
                  <div className={`w-9 h-9 rounded-lg flex items-center justify-center border ${
                    isDark ? "bg-emerald-500/10 border-emerald-500/20" : "bg-emerald-50 border-emerald-250"
                  }`}>
                    <Play className="h-4 w-4 text-emerald-500 fill-emerald-500" />
                  </div>
                  <div className="font-sans">
                    <h4 className={`text-xs font-semibold ${isDark ? "text-white" : "text-slate-900"}`}>Running Test Cases...</h4>
                    <p className={`text-[10px] font-light ${isDark ? "text-slate-450" : "text-slate-550"}`}>Verifying code performance under load</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-6">
                  <div className="text-center font-mono">
                    <div className={`text-[9px] uppercase tracking-wider ${isDark ? "text-slate-500" : "text-slate-450"}`}>Passed</div>
                    <div className={`text-base font-bold font-mono ${isDark ? "text-emerald-400" : "text-emerald-600"}`}>14 / 14</div>
                  </div>
                  <div className={`h-6 w-px ${isDark ? "bg-slate-800" : "bg-slate-250"}`} />
                  <div className="text-center font-mono">
                    <div className={`text-[9px] uppercase tracking-wider ${isDark ? "text-slate-500" : "text-slate-455"}`}>Telemetry Score</div>
                    <div className="text-base font-bold text-[#4f8ef7] font-mono">98%</div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </NeonGradientCard>
  );
}
