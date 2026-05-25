"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Icon } from "@iconify/react";
import { 
  Sparkles, 
  ArrowRight, 
  Check, 
  X, 
  Terminal, 
  Play, 
  Activity, 
  Lock, 
  ShieldAlert, 
  Video, 
  UserCheck,
  Zap, 
  Database, 
  Award, 
  Cpu, 
  Smile, 
  Users, 
  HelpCircle,
  ArrowUpRight,
  TrendingUp,
  Fingerprint,
  Maximize2,
  Minimize2
} from "lucide-react";

// Types & Interfaces
interface ComparisonRow {
  feature: string;
  zaby: string;
  hackerrank: string;
  mettl: string;
  codility: string;
}

// Brand Logos Data (Matching home page solar icons)
const BRAND_ITEMS = [
  { icon: "solar:hexagon-linear",  name: "Acme Corp",  bold: false },
  { icon: "solar:triangle-linear", name: "Vortex",     bold: false },
  { icon: "solar:target-linear",   name: "Sphere",     bold: true  },
  { icon: "solar:box-linear",      name: "Cube AI",    bold: true  },
  { icon: "solar:globus-linear",   name: "Nexus",      bold: false },
  { icon: "solar:cpu-linear",      name: "Synapse",    bold: false },
] as const;

function InteractiveDottedGrid() {
  const canvasRef = React.useRef<HTMLCanvasElement>(null);
  const containerRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = 0;
    let height = 0;
    const dots: { ox: number; oy: number; x: number; y: number; opacity: number; radius: number }[] = [];
    const spacing = 32;
    const hoverRadius = 160;
    const maxDisplacement = 12;
    const ease = 0.08;
    const baseOpacity = 0.12;
    const baseRadius = 1.2;
    const maxRadius = 3.0;

    const mouse = { x: -1000, y: -1000, active: false };

    const handleResize = () => {
      const parentEl = containerRef.current;
      if (!parentEl) return;
      width = parentEl.clientWidth;
      height = parentEl.clientHeight;
      
      const dpr = window.devicePixelRatio || 1;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.scale(dpr, dpr);

      dots.length = 0;
      const cols = Math.floor(width / spacing) + 2;
      const rows = Math.floor(height / spacing) + 2;
      
      const offsetX = (width - (cols - 1) * spacing) / 2;
      const offsetY = (height - (rows - 1) * spacing) / 2;

      for (let c = 0; c < cols; c++) {
        for (let r = 0; r < rows; r++) {
          const ox = offsetX + c * spacing;
          const oy = offsetY + r * spacing;
          dots.push({
            ox,
            oy,
            x: ox,
            y: oy,
            opacity: baseOpacity,
            radius: baseRadius,
          });
        }
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
      mouse.active = true;
    };

    const handleMouseLeave = () => {
      mouse.x = -1000;
      mouse.y = -1000;
      mouse.active = false;
    };

    const parent = containerRef.current?.parentElement;
    if (parent) {
      parent.addEventListener("mousemove", handleMouseMove);
      parent.addEventListener("mouseleave", handleMouseLeave);
    }

    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < dots.length; i++) {
        const dot = dots[i];
        let targetX = dot.ox;
        let targetY = dot.oy;
        let targetOpacity = baseOpacity;
        let targetRadius = baseRadius;
        let isHovered = false;

        if (mouse.active) {
          const dx = dot.ox - mouse.x;
          const dy = dot.oy - mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < hoverRadius) {
            isHovered = true;
            const force = (hoverRadius - dist) / hoverRadius;
            const angle = Math.atan2(dy, dx);
            
            const displacement = force * maxDisplacement;
            targetX = dot.ox + Math.cos(angle) * displacement;
            targetY = dot.oy + Math.sin(angle) * displacement;

            targetOpacity = baseOpacity + (0.75 - baseOpacity) * force;
            targetRadius = baseRadius + (maxRadius - baseRadius) * force;
          }
        }

        dot.x += (targetX - dot.x) * ease;
        dot.y += (targetY - dot.y) * ease;
        dot.opacity += (targetOpacity - dot.opacity) * ease;
        dot.radius += (targetRadius - dot.radius) * ease;

        ctx.beginPath();
        ctx.arc(dot.x, dot.y, dot.radius, 0, Math.PI * 2);
        
        if (isHovered || dot.opacity > baseOpacity + 0.01) {
          ctx.fillStyle = `rgba(232, 121, 249, ${dot.opacity})`;
        } else {
          ctx.fillStyle = `rgba(161, 161, 170, ${dot.opacity})`;
        }
        
        ctx.fill();
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", handleResize);
      if (parent) {
        parent.removeEventListener("mousemove", handleMouseMove);
        parent.removeEventListener("mouseleave", handleMouseLeave);
      }
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div 
      ref={containerRef} 
      className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none -z-10"
    >
      <canvas 
        ref={canvasRef} 
        className="block w-full h-full pointer-events-none" 
      />
    </div>
  );
}

export default function QuestionBankPage() {
  const [activeTab, setActiveTab] = useState<"assess" | "generate" | "monitor">("assess");
  const [terminalLogs, setTerminalLogs] = useState<string[]>([]);
  const [proctorStatus, setProctorStatus] = useState<"nominal" | "warning" | "alert">("nominal");
  const [violations, setViolations] = useState<string[]>([]);

  // State variables for interactable Lab Simulator
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
  const simContainerRef = React.useRef<HTMLDivElement>(null);

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

  // Comparison Table Data
  const comparisonData: ComparisonRow[] = [
    { feature: "AI Interactive Labs", zaby: "Yes", hackerrank: "Limited coding only", mettl: "No", codility: "Limited coding only" },
    { feature: "Agentic Question Generation", zaby: "Yes", hackerrank: "No", mettl: "No", codility: "No" },
    { feature: "Dynamic Adaptive Assessments", zaby: "Yes", hackerrank: "Partial", mettl: "Partial", codility: "Partial" },
    { feature: "Multi-Agent Validation", zaby: "Yes", hackerrank: "No", mettl: "No", codility: "No" },
    { feature: "Real-Time Smart Monitoring", zaby: "Yes", hackerrank: "Yes (Streaming)", mettl: "Yes (Streaming)", codility: "Yes (Sync/Async)" },
    { feature: "Enterprise KB Integration", zaby: "Yes", hackerrank: "Limited", mettl: "Limited", codility: "No" },
    { feature: "Static Question Bank Dependency", zaby: "No", hackerrank: "High", mettl: "High", codility: "High" },
    { feature: "Competitive-Exam Compatibility", zaby: "Yes", hackerrank: "Partial", mettl: "Yes", codility: "Partial" },
    { feature: "AI-Powered Optimization", zaby: "Yes", hackerrank: "Limited", mettl: "Limited", codility: "Limited" },
    { feature: "Gen-Z Interaction Experience", zaby: "Yes", hackerrank: "Limited", mettl: "Limited", codility: "Limited" }
  ];

  return (
    <div className="w-full relative overflow-x-hidden antialiased bg-[#FAF9F6] text-[#171717]">
      
      {/* Decorative Blur Background Elements */}
      <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] rounded-full bg-linear-to-tr from-[#f5d0fe] to-[#ede9fe] opacity-35 blur-[120px] pointer-events-none -z-10" />
      <div className="absolute top-[30%] right-[-10%] w-[45vw] h-[45vw] rounded-full bg-linear-to-br from-[#ede9fe] to-[#f5d0fe] opacity-30 blur-[100px] pointer-events-none -z-10" />

      {/* Hero Section */}
      <section className="relative z-10 px-4 pt-16 pb-12 md:px-6 md:pt-24 lg:pt-42 mx-auto max-w-7xl">
        <InteractiveDottedGrid />
        <div className="flex flex-col items-center text-center">
          {/* <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-5 ml-auto inline-flex items-center gap-2 rounded-full border border-[#e879f9]/30 bg-white/80 px-4 py-2 shadow-[0_10px_30px_rgba(232,121,249,0.12)] backdrop-blur-md"
          >
            <Sparkles className="h-4 w-4 text-[#d946ef]" />
            <span className="text-xs font-bold uppercase tracking-[0.18em] text-[#2f1362]">
              Founding Access: 90% Off
            </span>
          </motion.div> */}

          {/* Heading */}
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="mb-6 max-w-3xl text-3xl font-extrabold leading-[1.15] tracking-tight text-[#171717] sm:text-4xl md:text-5xl lg:text-6xl"
          >
            Next-Gen{" "}
            <span className="bg-linear-to-br from-[#e879f9] via-[#c026d3] to-[#d946ef] bg-clip-text text-transparent">
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

      {/* Trusted Brands Section */}
      <section className="border-y border-[#e5e5e5] bg-[#FAF9F6]/50 py-10 overflow-hidden relative">
        <div className="mx-auto max-w-7xl px-4">
          <div className="text-center mb-6">
            <span className="text-xs uppercase font-bold tracking-widest text-[#a3a3a3]">
              Trusted by Forward-Thinking Teams & Global Security Standards
            </span>
          </div>

          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            
            {/* Moving Marquee of brands */}
            <div
              className="relative flex-1 overflow-hidden"
              style={{
                maskImage: "linear-gradient(to right, transparent, black 5%, black 95%, transparent)",
                WebkitMaskImage: "linear-gradient(to right, transparent, black 5%, black 95%, transparent)",
              }}
            >
              <motion.div
                className="flex w-max"
                animate={{ x: [0, "-50%"] }}
                transition={{
                  repeat: Infinity,
                  ease: "linear",
                  duration: 25,
                }}
              >
                {[0, 1].map((copyIndex) => (
                  <div
                    key={copyIndex}
                    aria-hidden={copyIndex === 1 ? true : undefined}
                    className="flex items-center gap-16 whitespace-nowrap px-8 md:gap-20 md:px-10"
                  >
                    {BRAND_ITEMS.map((brand) => (
                      <div
                        key={`${copyIndex}-${brand.name}`}
                        className={`flex items-center gap-3 text-lg tracking-tight text-[#525252] md:text-xl transition-colors duration-200 hover:text-[#171717] ${brand.bold ? "font-bold" : "font-semibold"}`}
                      >
                        <Icon icon={brand.icon} width={26} height={26} className="text-[#a3a3a3]" />
                        <span>{brand.name}</span>
                      </div>
                    ))}
                  </div>
                ))}
              </motion.div>
            </div>

            {/* Static Non-Moving ISO 27001 Badge */}
            <div className="shrink-0 flex items-center gap-2 text-sm md:text-base font-bold bg-white border border-[#e879f9]/20 px-4 py-2 rounded-2xl shadow-[0_4px_20px_rgba(232,121,249,0.06)] backdrop-blur-md">
              <Award className="h-5 w-5 text-[#e879f9]" />
              <span className="text-[#2f1362]">ISO 27001 Certified</span>
            </div>

          </div>
        </div>
      </section>

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
        <div
          ref={simContainerRef}
          className="w-full bg-[#0B0F19] rounded-3xl p-6 md:p-8 border border-[#1e293b] text-slate-100 flex flex-col justify-between shadow-2xl relative overflow-hidden aspect-video"
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
            <div className="absolute top-0 right-0 w-48 h-48 bg-[#4f8ef7]/10 rounded-full blur-[80px] pointer-events-none" />

            {/* Header Tabs switcher */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-slate-800/80 pb-4 mb-4 gap-3 relative z-10">
              <div className="flex gap-2">
                <button
                  onClick={() => setSimTab("workspace")}
                  className={`text-xs font-semibold px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 cursor-pointer ${
                    simTab === "workspace"
                      ? "bg-[#4f8ef7]/15 text-[#4f8ef7] border border-[#4f8ef7]/30"
                      : "text-slate-400 hover:text-slate-200"
                  }`}
                >
                  <Activity className="h-3.5 w-3.5" />
                  Live Candidate Workspace
                </button>
                <button
                  onClick={() => setSimTab("telemetry")}
                  className={`text-xs font-semibold px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 cursor-pointer ${
                    simTab === "telemetry"
                      ? "bg-[#4f8ef7]/15 text-[#4f8ef7] border border-[#4f8ef7]/30"
                      : "text-slate-400 hover:text-slate-200"
                  }`}
                >
                  <Terminal className="h-3.5 w-3.5" />
                  Telemetry Engine Console
                </button>
              </div>
              <div className="flex items-center gap-3">
                <span className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-emerald-400 animate-ping" />
                  <span className="text-[10px] font-mono text-emerald-400">ACTIVE PLATFORM MOCKUP</span>
                </span>
                <button
                  onClick={toggleSimFullscreen}
                  className="flex items-center justify-center w-7 h-7 rounded-lg border border-slate-700 bg-slate-800/60 text-slate-400 hover:text-white hover:border-slate-500 hover:bg-slate-700/80 transition-all cursor-pointer"
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
                        <div className="md:col-span-5 flex flex-col gap-4 border-r border-slate-800/80 pr-4">
                          <div className="flex items-center gap-2">
                            <span className="text-[10px] font-bold text-[#4f8ef7] uppercase tracking-wider font-sans">— LAB ACCESS</span>
                          </div>
                          <div>
                            <h3 className="text-xl font-extrabold text-white leading-tight font-sans">
                              Save your lab access before the timer starts.
                            </h3>
                            <p className="text-[11px] text-slate-400 mt-2 font-light leading-relaxed">
                              MongoDB test includes BYOK lab sections that need your credentials. We validate them now, encrypt them for this attempt, and reuse them automatically when the matching lab begins.
                            </p>
                          </div>
                          
                          <div className="h-px bg-slate-800/50" />
                          
                          {/* Sub info cards */}
                          <div className="flex flex-col gap-3">
                            <div className="flex gap-3 bg-[#131924] border border-slate-800/50 rounded-xl p-3.5 shadow-sm">
                              <div className="w-8 h-8 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 shrink-0">
                                <Icon icon="solar:shield-keyhole-bold-duotone" className="w-4.5 h-4.5" />
                              </div>
                              <div>
                                <h4 className="text-[11px] font-bold text-white">Attempt-scoped encryption</h4>
                                <p className="text-[9px] text-slate-400 mt-0.5 leading-snug font-light">
                                  Credentials are stored only for this attempt and are removed after the assessment ends.
                                </p>
                              </div>
                            </div>

                            <div className="flex gap-3 bg-[#131924] border border-slate-800/50 rounded-xl p-3.5 shadow-sm">
                              <div className="w-8 h-8 rounded-lg bg-[#eab308]/10 border border-[#eab308]/20 flex items-center justify-center text-[#eab308] shrink-0">
                                <Icon icon="solar:clock-circle-bold-duotone" className="w-4.5 h-4.5" />
                              </div>
                              <div>
                                <h4 className="text-[11px] font-bold text-white">Section timer stays protected</h4>
                                <p className="text-[9px] text-slate-400 mt-0.5 leading-snug font-light">
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
                              <span className="text-[9px] font-mono text-slate-500 uppercase tracking-widest">STEP</span>
                              <span className="text-[9px] font-bold text-blue-400 bg-blue-500/10 border border-blue-500/20 px-2 py-0.5 rounded-full font-mono">
                                1 required environment
                              </span>
                            </div>
                            <h3 className="text-base font-bold text-white">Validate your lab credentials</h3>
                            <p className="text-[11px] text-slate-400 mt-0.5 font-light leading-relaxed">
                              Enter one credential set for each required BYOK environment. We verify it now and reuse it automatically in every matching lab section.
                            </p>
                          </div>
                          
                          {/* Connection details block */}
                          <div className="bg-[#131924]/60 border border-slate-800 rounded-2xl p-4.5 space-y-3.5">
                            <div className="flex items-center gap-2">
                              <span className="w-4.5 h-4.5 rounded-full bg-slate-850 flex items-center justify-center text-[10px] font-mono text-slate-400">1</span>
                              <span className="text-[9px] font-bold text-red-400 bg-red-500/10 border border-red-500/20 px-2 py-0.5 rounded font-mono">missing</span>
                              <span className="text-[9px] font-bold text-slate-300 bg-slate-800 border border-slate-700 px-2 py-0.5 rounded font-mono">MongoDB</span>
                            </div>
                            
                            <div>
                              <h4 className="text-xs font-bold text-white">Lab</h4>
                              <p className="text-[10px] text-slate-400 mt-0.5 font-light">MongoDB Student Management System – CRUD & Aggregation</p>
                            </div>

                            <div className="space-y-1.5">
                              <label className="text-[9px] font-bold uppercase tracking-wider text-slate-500 font-mono block">MONGODB CONNECTION STRING</label>
                              <div className="relative">
                                <input
                                  type="text"
                                  value={mongodbString}
                                  onChange={(e) => setMongodbString(e.target.value)}
                                  className="w-full bg-[#0B0F19] border border-slate-800 rounded-xl py-3 pl-3 pr-10 text-xs text-slate-300 font-mono focus:border-blue-500 focus:outline-none transition-colors"
                                />
                                <div className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white cursor-pointer">
                                  <Icon icon="solar:eye-bold" className="w-4 h-4" />
                                </div>
                              </div>
                              <span className="text-[9px] text-slate-500 block leading-tight font-light">
                                Enter a full MongoDB URL. Keep any special characters URL-encoded.
                              </span>
                            </div>
                          </div>
                          
                          <div className="flex flex-col gap-3 mt-1">
                            <span className="text-[9px] text-slate-450 leading-snug font-light text-center">
                              Every required BYOK credential set must validate before the assessment can continue.
                            </span>
                            <button
                              onClick={() => setSimStep(1.5)}
                              className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3.5 rounded-xl font-bold transition-all flex items-center justify-center gap-2 cursor-pointer hover:scale-[1.01] active:scale-[0.99] shadow-lg shadow-blue-500/10"
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
                        <div className="text-2xl font-black text-white tracking-widest mb-6 font-sans">zaby</div>
                        
                        {/* Checkmark circle success */}
                        <div className="w-14 h-14 rounded-full bg-emerald-500/10 border border-emerald-500/40 flex items-center justify-center text-emerald-400 mb-6 shadow-[0_0_24px_rgba(16,185,129,0.2)] relative">
                          <div className="absolute inset-0 rounded-full border border-emerald-400 animate-ping opacity-25" />
                          <Icon icon="solar:check-circle-bold" className="w-7 h-7" />
                        </div>

                        <h2 className="text-xl font-black text-white">Verification Complete!</h2>
                        <p className="text-slate-450 text-[11px] mt-1 font-light">All pre-checks passed successfully</p>
                        
                        {/* Transition Progress bar */}
                        <div className="w-44 h-1 bg-slate-800 rounded-full overflow-hidden mt-6 relative">
                          <motion.div
                            initial={{ width: "0%" }}
                            animate={{ width: "100%" }}
                            transition={{ duration: 2.0, ease: "easeInOut" }}
                            className="h-full bg-blue-500"
                          />
                        </div>
                        
                        <span className="text-[9px] font-bold text-blue-400 font-mono tracking-widest mt-4 uppercase animate-pulse">
                          REDIRECTING TO YOUR ASSESSMENT...
                        </span>
                      </div>
                    </div>
                  )}

                  {simStep === 2 && (
                    <div className="flex-1 flex flex-col justify-between h-full animate-[fadeIn_0.3s_ease-out]">
                      {/* Step 2 Workstation screen */}
                      <div className="flex flex-col gap-3">
                        {/* Sub Header */}
                        <div className="flex justify-between items-center bg-[#131924] border border-slate-800/80 rounded-xl px-4 py-2.5 shadow-sm">
                          <div className="flex items-center gap-2">
                            <span className="w-2.5 h-2.5 rounded-sm bg-emerald-500" />
                            <span className="text-xs font-bold text-white">MongoDB Student Management System</span>
                          </div>
                          
                          {/* Timer Pill */}
                          <div className="flex items-center gap-1.5 bg-[#eab308]/10 border border-[#eab308]/20 px-3 py-1 rounded-full text-[#eab308] shadow-[0_0_12px_rgba(234,179,8,0.1)]">
                            <Icon icon="solar:clock-circle-bold-duotone" className="w-4.5 h-4.5 animate-pulse" />
                            <span className="text-xs font-bold font-mono">
                              0{countdown2Min}:{countdown2Sec < 10 ? `0${countdown2Sec}` : countdown2Sec}
                            </span>
                          </div>
                          
                          <button
                            onClick={() => setSimStep(3)}
                            className="bg-red-500/10 border border-red-500/20 hover:bg-red-500/20 text-red-400 text-xs font-bold px-3 py-1.5 rounded-lg transition-all cursor-pointer shadow-sm"
                          >
                            Submit Section
                          </button>
                        </div>

                        {/* Split Workstation Pane */}
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-stretch">
                          {/* Left Panel: Milestones List */}
                          <div className="lg:col-span-4 bg-[#131924]/60 border border-slate-800/80 rounded-2xl p-4 flex flex-col justify-between min-h-[440px]">
                            <div className="space-y-4">
                              <div className="flex justify-between items-center border-b border-slate-850 pb-2">
                                <div className="flex items-center gap-1.5">
                                  <span className="text-[10px] font-bold text-white uppercase tracking-wider font-mono">Milestones</span>
                                  <span className="bg-slate-850 border border-slate-700 px-2 py-0.5 rounded text-[9px] font-bold font-mono text-slate-350">
                                    {milestonesCompleted}/3
                                  </span>
                                </div>
                                <div className="text-right text-[10px] font-mono text-slate-400">
                                  {Math.round(milestonesCompleted * 33.3)}% complete
                                </div>
                              </div>

                              {/* Progress bar */}
                              <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                                <div 
                                  className="h-full bg-emerald-500 transition-all duration-500" 
                                  style={{ width: `${milestonesCompleted * 33.3}%` }}
                                />
                              </div>
                              <div className="text-[9px] text-[#4f8ef7] font-mono font-bold tracking-wider">
                                POINTS ACQUIRED: +{milestonesCompleted * 5}/15 pts
                              </div>

                              {/* Milestones cards list */}
                              <div className="space-y-3 max-h-[280px] overflow-y-auto pr-1">
                                {/* Milestone 1 */}
                                <div className={`border rounded-xl p-3.5 transition-all ${
                                  milestonesCompleted >= 1 
                                    ? "bg-emerald-500/05 border-emerald-500/30" 
                                    : "bg-[#131924]/80 border-slate-800"
                                }`}>
                                  <div className="flex justify-between items-start gap-2">
                                    <div className="flex gap-2">
                                      <div className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 ${
                                        milestonesCompleted >= 1 ? "bg-emerald-500 text-white" : "bg-slate-800 text-slate-400"
                                      }`}>
                                        {milestonesCompleted >= 1 ? (
                                          <Check className="w-3 h-3 stroke-[3px]" />
                                        ) : (
                                          <span className="text-[9px] font-bold font-mono">1</span>
                                        )}
                                      </div>
                                      <div>
                                        <h4 className="text-xs font-bold text-white font-sans leading-tight">
                                          create collection students and Insert Student Records
                                        </h4>
                                        <p className="text-[9px] text-slate-400 mt-1 leading-snug font-light">
                                          Insert at least 5 student documents into the <code className="bg-slate-800/80 px-1 py-0.2 rounded text-slate-300">students</code> collection. Each document should contain: <code className="text-slate-350">name</code>, <code className="text-slate-350">age</code>, <code className="text-slate-350">course</code>, <code className="text-slate-350">marks</code>, <code className="text-slate-350">city</code>.
                                        </p>
                                      </div>
                                    </div>
                                    <span className="text-[9px] font-bold text-[#e879f9] bg-[#e879f9]/10 px-1.5 py-0.5 rounded font-mono shrink-0">+5pt</span>
                                  </div>
                                  
                                  {/* Action Controls for Milestone 1 */}
                                  {milestonesCompleted === 0 && (
                                    <div className="mt-3 pt-3 border-t border-slate-800/80 flex items-center justify-between gap-2">
                                      <button 
                                        onClick={() => setShowHint(!showHint)}
                                        className="text-[9px] font-bold text-amber-400 hover:text-amber-300 flex items-center gap-1 border border-amber-500/20 bg-amber-500/05 px-2.5 py-1.5 rounded-lg transition-colors cursor-pointer"
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
                                    <div className="mt-2.5 bg-[#0b0f19] border border-slate-800 rounded-xl p-2.5 font-mono text-[9px] text-slate-400 leading-normal animate-[fadeIn_0.2s_ease-out]">
                                      <span className="text-[#4f8ef7] font-semibold">// Try using insertMany syntax:</span>
                                      <pre className="mt-1 font-mono text-slate-300 overflow-x-auto whitespace-pre">
{`db.students.insertMany([
  { name: "Aarav", age: 21, marks: 85, city: "Hyderabad" },
  { name: "Aditi", age: 20, marks: 92, city: "Mumbai" }
])`}
                                      </pre>
                                    </div>
                                  )}
                                </div>

                                {/* Milestone 2 */}
                                <div className={`border rounded-xl p-3.5 transition-all ${
                                  milestonesCompleted >= 2 
                                    ? "bg-emerald-500/05 border-emerald-500/30" 
                                    : milestonesCompleted === 1 
                                      ? "bg-[#131924]/90 border-[#4f8ef7]/30 shadow-[0_0_12px_rgba(79,142,247,0.05)]"
                                      : "bg-[#131924]/80 border-slate-800 opacity-60"
                                }`}>
                                  <div className="flex justify-between items-start gap-2">
                                    <div className="flex gap-2">
                                      <div className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 ${
                                        milestonesCompleted >= 2 ? "bg-emerald-500 text-white" : "bg-slate-800 text-slate-400"
                                      }`}>
                                        {milestonesCompleted >= 2 ? (
                                          <Check className="w-3 h-3 stroke-[3px]" />
                                        ) : (
                                          <span className="text-[9px] font-bold font-mono">2</span>
                                        )}
                                      </div>
                                      <div>
                                        <h4 className="text-xs font-bold text-white font-sans leading-tight">
                                          Find Specific Students
                                        </h4>
                                        <ul className="text-[9px] text-slate-400 mt-1 leading-snug font-light list-disc pl-3.5 space-y-0.5">
                                          <li>Find students from <code className="bg-slate-800/80 px-1 py-0.2 rounded text-slate-350">Hyderabad</code></li>
                                          <li>Find students with marks greater than <code className="bg-slate-800/80 px-1 py-0.2 rounded text-slate-350">80</code></li>
                                        </ul>
                                      </div>
                                    </div>
                                    <span className="text-[9px] font-bold text-[#e879f9] bg-[#e879f9]/10 px-1.5 py-0.5 rounded font-mono shrink-0">+5pt</span>
                                  </div>
                                  {milestonesCompleted === 1 && (
                                    <div className="mt-3 pt-3 border-t border-slate-850 flex items-center justify-end">
                                      <button 
                                        onClick={() => {
                                          if (isQueryRunning) return;
                                          setIsQueryRunning(true);
                                          setTimeout(() => {
                                            setIsQueryRunning(false);
                                            setMilestonesCompleted(2);
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
                                </div>

                                {/* Milestone 3 */}
                                <div className={`border rounded-xl p-3.5 transition-all ${
                                  milestonesCompleted >= 3 
                                    ? "bg-emerald-500/05 border-emerald-500/30" 
                                    : milestonesCompleted === 2 
                                      ? "bg-[#131924]/90 border-[#4f8ef7]/30 shadow-[0_0_12px_rgba(79,142,247,0.05)]"
                                      : "bg-[#131924]/80 border-slate-800 opacity-60"
                                }`}>
                                  <div className="flex justify-between items-start gap-2">
                                    <div className="flex gap-2">
                                      <div className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 ${
                                        milestonesCompleted >= 3 ? "bg-emerald-500 text-white" : "bg-slate-800 text-slate-400"
                                      }`}>
                                        {milestonesCompleted >= 3 ? (
                                          <Check className="w-3 h-3 stroke-[3px]" />
                                        ) : (
                                          <span className="text-[9px] font-bold font-mono">3</span>
                                        )}
                                      </div>
                                      <div>
                                        <h4 className="text-xs font-bold text-white font-sans leading-tight">
                                          Modify Records
                                        </h4>
                                        <ul className="text-[9px] text-slate-400 mt-1 leading-snug font-light list-disc pl-3.5 space-y-0.5">
                                          <li>Update marks of one student</li>
                                          <li>Delete one student using name</li>
                                        </ul>
                                      </div>
                                    </div>
                                    <span className="text-[9px] font-bold text-[#e879f9] bg-[#e879f9]/10 px-1.5 py-0.5 rounded font-mono shrink-0">+5pt</span>
                                  </div>
                                  {milestonesCompleted === 2 && (
                                    <div className="mt-3 pt-3 border-t border-slate-850 flex items-center justify-end">
                                      <button 
                                        onClick={() => {
                                          if (isQueryRunning) return;
                                          setIsQueryRunning(true);
                                          setTimeout(() => {
                                            setIsQueryRunning(false);
                                            setMilestonesCompleted(3);
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
                                </div>
                              </div>
                            </div>

                            {/* Sidebar Footer stats */}
                            <div className="border-t border-slate-800/80 pt-3 mt-4">
                              <button className="w-full text-center text-[10px] text-slate-400 hover:text-white py-2.5 border border-slate-800 rounded-xl mb-3 cursor-pointer transition-colors bg-[#131924]">
                                View Instructions
                              </button>
                              <div className="grid grid-cols-4 text-center text-[8px] text-slate-500 uppercase tracking-wider font-mono gap-1">
                                <div>
                                  <div className={`text-xs font-bold ${milestonesCompleted > 0 ? "text-emerald-400 font-mono" : "text-slate-400 font-mono"}`}>
                                    {milestonesCompleted > 0 ? "1" : "0"}
                                  </div>
                                  <span>Answered</span>
                                </div>
                                <div>
                                  <div className="text-xs font-bold text-slate-400 font-mono">0</div>
                                  <span>Skipped</span>
                                </div>
                                <div>
                                  <div className="text-xs font-bold text-slate-400 font-mono">0</div>
                                  <span>Flagged</span>
                                </div>
                                <div>
                                  <div className={`text-xs font-bold ${milestonesCompleted > 0 ? "text-slate-400 font-mono" : "text-[#4f8ef7] font-mono"}`}>
                                    {milestonesCompleted > 0 ? "0" : "1"}
                                  </div>
                                  <span>Not Visited</span>
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* Right Panel: Code Query Editor & Output Console */}
                          <div className="lg:col-span-8 flex flex-col gap-4 min-h-[440px] justify-between">
                            {/* mongosh editor pane */}
                            <div className="bg-[#131924]/60 border border-slate-800/80 rounded-2xl overflow-hidden flex flex-col flex-1">
                              <div className="bg-[#131924]/80 px-4 py-2 border-b border-slate-800/80 flex justify-between items-center text-slate-400 text-[10px] font-mono">
                                <div className="flex items-center gap-1.5 text-white">
                                  <Icon icon="solar:terminal-code-bold-duotone" className="text-[#4f8ef7] w-4 h-4" />
                                  <span>_ mongosh</span>
                                </div>
                                <div className="flex gap-2">
                                  <span className="w-2.5 h-2.5 rounded-full bg-[#ef4444]/40" />
                                  <span className="w-2.5 h-2.5 rounded-full bg-[#eab308]/40" />
                                  <span className="w-2.5 h-2.5 rounded-full bg-[#22c55e]/40" />
                                </div>
                              </div>

                              {/* Editor field */}
                              <textarea
                                value={mongodbQueryText}
                                onChange={(e) => setMongodbQueryText(e.target.value)}
                                className="w-full flex-1 bg-[#0b0f19] p-4 text-xs font-mono text-slate-200 border-none outline-none focus:ring-0 resize-none font-sans leading-relaxed min-h-[140px]"
                                spellCheck="false"
                              />
                            </div>

                            {/* Console Output bottom tab panel */}
                            <div className="bg-[#131924]/60 border border-slate-800/80 rounded-2xl overflow-hidden flex flex-col h-[220px]">
                              {/* Output tabs header */}
                              <div className="bg-[#131924]/80 px-3 py-1.5 border-b border-slate-800/80 flex justify-between items-center">
                                <div className="flex gap-1">
                                  {(["Tree", "Raw JSON", "Data"] as const).map((tab) => (
                                    <button
                                      key={tab}
                                      onClick={() => setActiveOutputTab(tab)}
                                      className={`text-[9px] font-bold font-mono px-3 py-1 rounded-md transition-all cursor-pointer ${
                                        activeOutputTab === tab
                                          ? "bg-slate-800 text-white border border-slate-700"
                                          : "text-slate-450 hover:text-slate-250"
                                      }`}
                                    >
                                      {tab}
                                    </button>
                                  ))}
                                </div>
                                <span className="text-[8px] font-bold text-slate-500 uppercase tracking-widest font-mono">
                                  Query Console Output
                                </span>
                              </div>

                              {/* Output view area */}
                              <div className="flex-1 p-3.5 overflow-auto font-mono text-[10px] bg-[#0b0f19] text-slate-350">
                                {isQueryRunning ? (
                                  <div className="w-full h-full flex flex-col justify-center items-center gap-2 text-slate-450">
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
                                        <div className="text-emerald-400 font-semibold">// Students Collection - {milestonesCompleted} Milestone(s) Verified</div>
                                        <div className="text-slate-400">{"["}</div>
                                        
                                        {/* Row 1 */}
                                        <div className="pl-4 border-l border-slate-800/80">
                                          <div className="text-slate-550">{"{"}</div>
                                          <div className="pl-4 flex flex-col gap-0.5">
                                            <div><span className="text-purple-400">_id</span>: <span className="text-cyan-400">"603d21b7f1a3e82d8c8b4567"</span>,</div>
                                            <div><span className="text-purple-400">name</span>: <span className="text-cyan-400">"Aarav Mehta"</span>,</div>
                                            <div><span className="text-purple-400">age</span>: <span className="text-amber-400">21</span>,</div>
                                            <div><span className="text-purple-400">course</span>: <span className="text-cyan-400">"Computer Science"</span>,</div>
                                            <div><span className="text-purple-400">marks</span>: <span className="text-amber-400">85</span>,</div>
                                            <div><span className="text-purple-400">city</span>: <span className="text-cyan-400">"Hyderabad"</span></div>
                                          </div>
                                          <div className="text-slate-550">{"},"}</div>
                                        </div>

                                        {/* Row 2 */}
                                        <div className="pl-4 border-l border-slate-800/80">
                                          <div className="text-slate-550">{"{"}</div>
                                          <div className="pl-4 flex flex-col gap-0.5">
                                            <div><span className="text-purple-400">_id</span>: <span className="text-cyan-400">"603d21b7f1a3e82d8c8b4568"</span>,</div>
                                            <div><span className="text-purple-400">name</span>: <span className="text-cyan-400">"Aditi Rao"</span>,</div>
                                            <div><span className="text-purple-400">age</span>: <span className="text-amber-400">20</span>,</div>
                                            <div><span className="text-purple-400">course</span>: <span className="text-cyan-400">"Data Science"</span>,</div>
                                            <div><span className="text-purple-400">marks</span>: <span className="text-amber-400">92</span>,</div>
                                            <div><span className="text-purple-400">city</span>: <span className="text-cyan-400">"Mumbai"</span></div>
                                          </div>
                                          <div className="text-slate-550">{"},"}</div>
                                        </div>

                                        {/* Truncation indicator */}
                                        <div className="pl-4 text-slate-500 italic">
                                          ... {5 - 2} more records listed
                                        </div>

                                        <div className="text-slate-400">{"]"}</div>
                                      </div>
                                    )}

                                    {activeOutputTab === "Raw JSON" && (
                                      <pre className="text-slate-300 font-mono text-[9.5px] leading-normal whitespace-pre-wrap">
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
                                            <tr className="border-b border-slate-800 text-slate-400 font-bold">
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
                                              <tr key={i} className="border-b border-slate-900/50 text-slate-300">
                                                <td className="py-1">{r.id}</td>
                                                <td className="py-1 font-semibold text-white">{r.name}</td>
                                                <td className="py-1 text-center text-amber-400">{r.age}</td>
                                                <td className="py-1 text-cyan-400">{r.course}</td>
                                                <td className="py-1 text-center font-bold text-emerald-400">{r.marks}</td>
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
                        <div className="flex justify-between items-center bg-[#131924] border border-slate-800/80 rounded-xl px-4 py-2.5 mb-3">
                          <div className="flex items-center gap-2">
                            <span className="w-2.5 h-2.5 rounded-sm bg-emerald-500" />
                            <span className="text-xs font-bold text-white">MongoDB Student Management System</span>
                          </div>
                          <div className="flex items-center gap-1.5 bg-[#eab308]/10 border border-[#eab308]/20 px-3 py-1 rounded-full text-[#eab308]">
                            <Icon icon="solar:clock-circle-bold-duotone" className="w-4.5 h-4.5" />
                            <span className="text-xs font-bold font-mono">04:48</span>
                          </div>
                          <button className="bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-bold px-3 py-1.5 rounded-lg">
                            Submit Section
                          </button>
                        </div>

                        {/* Split Workstation Pane */}
                        <div className="grid grid-cols-12 gap-4">
                          <div className="col-span-5 bg-[#131924]/60 border border-slate-800 rounded-2xl p-4 min-h-[300px]" />
                          <div className="col-span-7 bg-[#131924]/60 border border-slate-800 rounded-2xl p-4 min-h-[300px]" />
                        </div>
                      </div>

                      {/* Right Slide-in Confirmation Drawer overlay */}
                      <div className="absolute right-0 top-[-16px] bottom-[-24px] w-full sm:w-[325px] bg-[#0e131f] border-l border-slate-800/90 shadow-2xl p-5 flex flex-col justify-between z-30 animate-[slideIn_0.3s_ease-out]">
                        
                        {/* Scrollable details wrapper */}
                        <div className="flex flex-col gap-3.5 flex-1 overflow-y-auto pr-1.5 scrollbar-thin scrollbar-thumb-slate-800 scrollbar-track-transparent">
                          <div className="flex justify-between items-center border-b border-slate-800 pb-3">
                            <h3 className="text-sm font-bold text-white flex items-center gap-1.5 uppercase font-mono tracking-wider">
                              <Icon icon="solar:checklist-bold-duotone" className="text-[#4f8ef7] w-4.5 h-4.5" />
                              Submit Section
                            </h3>
                            <button
                              onClick={() => setSimStep(2)}
                              className="text-slate-400 hover:text-white cursor-pointer"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          </div>

                          <p className="text-[10px] text-slate-400 leading-relaxed font-light font-sans">
                            Review your answers before submitting the section. Once submitted, you cannot return to this section.
                          </p>

                          {/* Dynamic Green Circular Progress */}
                          <div className="flex flex-col items-center justify-center my-2 py-1.5 border-y border-slate-800/60">
                            <div className="relative w-28 h-28 flex items-center justify-center">
                              {/* SVG Circle indicator */}
                              <svg className="absolute w-28 h-28 transform -rotate-90">
                                <circle cx="56" cy="56" r="48" stroke="rgba(255,255,255,0.05)" strokeWidth="6" fill="transparent" />
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
                                <div className="text-base font-black text-white font-mono">
                                  {Math.round(milestonesCompleted * 33.3)}%
                                </div>
                                <div className="text-[7px] text-slate-400 font-bold uppercase tracking-wider font-mono">Complete</div>
                              </div>
                            </div>
                            
                            <div className="flex justify-center gap-3.5 text-[9px] mt-3 font-mono">
                              <div className="flex items-center gap-1 text-emerald-400">
                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                                <span>Answered ({milestonesCompleted > 0 ? "1" : "0"})</span>
                              </div>
                              <div className="flex items-center gap-1 text-red-400">
                                <span className="w-1.5 h-1.5 rounded-full bg-red-400" />
                                <span>Unanswered ({milestonesCompleted > 0 ? "0" : "1"})</span>
                              </div>
                              <div className="flex items-center gap-1 text-[#4f8ef7]">
                                <span className="w-1.5 h-1.5 rounded-full bg-[#4f8ef7]" />
                                <span>Flagged (0)</span>
                              </div>
                            </div>
                          </div>

                          {/* Stats card info */}
                          <div className="bg-[#131924] border border-slate-800 rounded-xl p-3.5 space-y-2 shadow-sm">
                            <div className="text-[9px] uppercase tracking-wider text-slate-500 font-bold font-mono">
                              TOTAL: 1 SECTION
                            </div>
                            <div className="text-[8px] uppercase tracking-wider text-[#4f8ef7] font-bold font-mono">Detailed Stats</div>
                            
                            <div className="space-y-1.5 text-xs">
                              <div className="flex justify-between items-center text-slate-450 border-b border-slate-850 pb-1.5">
                                <span className="flex items-center gap-1 text-[10px]"><Icon icon="solar:target-bold-duotone" className="w-3.5 h-3.5 text-slate-500" /> Attempted</span>
                                <span className="font-bold text-white text-[11px] font-mono">
                                  {milestonesCompleted > 0 ? "1 / 1" : "0 / 1"}
                                </span>
                              </div>
                              <div className="flex justify-between items-center text-slate-450 border-b border-slate-850 pb-1.5">
                                <span className="flex items-center gap-1 text-[10px]"><Icon icon="solar:check-circle-bold-duotone" className="w-3.5 h-3.5 text-emerald-400" /> Answered</span>
                                <span className="font-bold text-white text-[11px] font-mono">
                                  {milestonesCompleted > 0 ? "1 / 1" : "0 / 1"}
                                </span>
                              </div>
                              <div className="flex justify-between items-center text-slate-455 border-b border-slate-850 pb-1.5">
                                <span className="flex items-center gap-1 text-[10px]"><Icon icon="solar:info-circle-bold-duotone" className="w-3.5 h-3.5 text-red-400" /> Unanswered</span>
                                <span className="font-bold text-slate-300 text-[11px] font-mono">
                                  {milestonesCompleted > 0 ? "0" : "1"}
                                </span>
                              </div>
                              <div className="flex justify-between items-center text-slate-450">
                                <span className="flex items-center gap-1 text-[10px]"><Icon icon="solar:flag-bold-duotone" className="w-3.5 h-3.5 text-[#4f8ef7]" /> Flagged</span>
                                <span className="font-bold text-slate-300 text-[11px] font-mono">0</span>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Pinned action buttons at the bottom of the drawer */}
                        <div className="flex gap-2 border-t border-slate-800 pt-4 mt-3 shrink-0">
                          <button
                            onClick={() => setSimStep(2)}
                            className="w-1/2 border border-slate-700 hover:border-slate-500 hover:bg-slate-800/40 text-slate-200 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer"
                          >
                            Continue Test
                          </button>
                          <button
                            onClick={() => setSimStep(5)}
                            className="w-1/2 bg-blue-500 hover:bg-blue-600 text-white py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer shadow-md shadow-blue-500/10"
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
                      <span className="text-2xl font-black text-white mb-4 tracking-widest">zaby</span>
                      
                      {/* Glowing success badge */}
                      <div className="w-14 h-14 rounded-full bg-emerald-500/10 border border-emerald-500/40 flex items-center justify-center text-emerald-400 mb-5 shadow-[0_0_24px_rgba(16,185,129,0.2)] relative">
                        <div className="absolute inset-0 rounded-full border border-emerald-400 animate-ping opacity-25" />
                        <Check className="w-7 h-7 stroke-[3.5px]" />
                      </div>

                      <h2 className="text-xl font-black text-white">Assessment Submitted!</h2>
                      <p className="text-[#4f8ef7] text-[10px] font-bold tracking-widest uppercase mt-1 font-mono">
                        MongoDB Student Management System
                      </p>

                      {/* Information panel */}
                      <div className="bg-[#131924] border border-slate-800 rounded-2xl p-4.5 mt-5 max-w-sm w-full text-left flex gap-3.5 items-start shadow-sm">
                        <div className="w-8 h-8 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 shrink-0">
                          <Icon icon="solar:graph-bold-duotone" className="w-4.5 h-4.5" />
                        </div>
                        <div className="font-sans">
                          <h4 className="text-xs font-bold text-white mb-0.5">Results will be available shortly</h4>
                          <p className="text-[10px] text-slate-400 leading-normal font-light">
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
                          className="w-full bg-[#131924] border border-slate-700 hover:border-slate-500 text-slate-200 py-3 rounded-xl text-xs font-bold transition-all cursor-pointer"
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
                          className="w-full bg-white hover:bg-slate-100 text-slate-950 py-3 rounded-xl text-xs font-bold transition-all cursor-pointer hover:scale-[1.02]"
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
                  <div className="flex justify-between items-center border-b border-slate-800/80 pb-3 mb-4">
                    <div className="flex items-center gap-2">
                      <Terminal className="h-4 w-4 text-[#4f8ef7]" />
                      <span className="text-xs font-mono text-slate-300">ZABY ASSESSMENT | Lab 2: Optimize API Latency</span>
                    </div>
                    <div className="flex items-center gap-1.5 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-md">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      <span className="text-[9px] font-mono text-emerald-400">ACTIVE SESSION</span>
                    </div>
                  </div>

                  {/* Terminal Logs Area */}
                  <div className="flex-1 font-mono text-xs text-slate-300 space-y-2 overflow-y-auto max-h-[220px] pr-2">
                    {terminalLogs.map((log, idx) => (
                      <div key={idx} className="flex gap-2">
                        <span className="text-slate-500">[{10 + idx}:02:44]</span>
                        {log && log.startsWith("Candidate") ? (
                          <span className="text-emerald-400">{log}</span>
                        ) : log && (log.startsWith("score") || log.includes("Optimized") || log.includes("Optimize")) ? (
                          <span className="text-[#4f8ef7]">{log}</span>
                        ) : (
                          <span>{log || ""}</span>
                        )}
                      </div>
                    ))}
                    <div className="flex gap-1 items-center">
                      <span className="text-slate-500">&gt;</span>
                      <span className="w-1.5 h-3.5 bg-white animate-pulse" />
                    </div>
                  </div>

                  {/* Output Summary Card */}
                  <div className="mt-6 bg-[#191e2a]/90 border border-slate-800 rounded-2xl p-4 flex flex-col md:flex-row justify-between gap-4 items-center">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center">
                        <Play className="h-4 w-4 text-emerald-400 fill-emerald-400" />
                      </div>
                      <div className="font-sans">
                        <h4 className="text-xs font-semibold text-white">Running Test Cases...</h4>
                        <p className="text-[10px] text-slate-400 font-light">Verifying code performance under load</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-6">
                      <div className="text-center font-mono">
                        <div className="text-[9px] uppercase tracking-wider text-slate-400">Passed</div>
                        <div className="text-base font-bold text-emerald-400">14 / 14</div>
                      </div>
                      <div className="h-6 w-px bg-slate-800" />
                      <div className="text-center font-mono">
                        <div className="text-[9px] uppercase tracking-wider text-slate-400">Telemetry Score</div>
                        <div className="text-base font-bold text-[#4f8ef7]">98%</div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
      </section>

      {/* Three Core Capabilities Section */}
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
                        <span className={`text-[7px] font-mono bg-slate-950/80 px-1 py-0.2 rounded absolute bottom-1 left-1 ${
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

      {/* Comparison Table Section */}
      <section className="px-4 py-20 md:px-6 mx-auto max-w-7xl">
        <div className="text-center max-w-3xl mx-auto mb-16">

          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-[#171717] mt-4 mb-4">
            ZABY vs. Leading Assessment Platforms
          </h2>
          <p className="text-base text-[#525252] font-light">
            Compare Zaby's autonomous agent-driven testing infrastructure against legacy platforms.
          </p>
        </div>

        {/* Responsive Table Wrapper */}
        <div className="w-full relative overflow-hidden rounded-3xl border border-[#e5e5e5] bg-white">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-[#e5e5e5] bg-[#FAF9F6]">
                  <th className="px-6 py-5 text-sm font-bold text-[#171717] min-w-[240px]">Platform Capability</th>
                  <th className="px-6 py-5 text-sm font-bold text-white bg-[#2f1362] text-center min-w-[130px]">ZABY</th>
                  <th className="px-6 py-5 text-sm font-bold text-[#525252] text-center min-w-[140px]">HackerRank</th>
                  <th className="px-6 py-5 text-sm font-bold text-[#525252] text-center min-w-[140px]">Mercer | Mettl</th>
                  <th className="px-6 py-5 text-sm font-bold text-[#525252] text-center min-w-[140px]">Codility</th>
                </tr>
              </thead>
              <tbody>
                {comparisonData.map((row, idx) => (
                  <tr key={idx} className="border-b border-[#e5e5e5]/60 hover:bg-[#FAF9F6]/40 transition-colors">
                    <td className="px-6 py-4.5 text-sm font-semibold text-[#171717]">{row.feature}</td>
                    
                    {/* ZABY Column (Highlighted) */}
                    <td className="px-6 py-4.5 bg-[#2f1362]/05 border-x border-[#2f1362]/10 text-center">
                      <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#f5d0fe] border border-[#e879f9]/20 text-[#2f1362] text-xs font-bold">
                        <Check className="h-3.5 w-3.5 text-[#d946ef] stroke-[3px]" />
                        {row.zaby}
                      </div>
                    </td>

                    {/* Other Columns */}
                    <td className="px-6 py-4.5 text-center text-xs font-medium text-[#525252]">
                      {row.hackerrank === "No" ? (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-red-50 text-red-600">
                          <X className="h-3 w-3 stroke-[2.5px]" /> No
                        </span>
                      ) : row.hackerrank.includes("Limited") || row.hackerrank.includes("Partial") ? (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-amber-50 text-amber-600">
                          {row.hackerrank}
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-emerald-50 text-emerald-600">
                          {row.hackerrank}
                        </span>
                      )}
                    </td>

                    <td className="px-6 py-4.5 text-center text-xs font-medium text-[#525252]">
                      {row.mettl === "No" ? (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-red-50 text-red-600">
                          <X className="h-3 w-3 stroke-[2.5px]" /> No
                        </span>
                      ) : row.mettl.includes("Limited") || row.mettl.includes("Partial") ? (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-amber-50 text-amber-600">
                          {row.mettl}
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-emerald-50 text-emerald-600">
                          {row.mettl}
                        </span>
                      )}
                    </td>

                    <td className="px-6 py-4.5 text-center text-xs font-medium text-[#525252]">
                      {row.codility === "No" ? (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-red-50 text-red-600">
                          <X className="h-3 w-3 stroke-[2.5px]" /> No
                        </span>
                      ) : row.codility.includes("Limited") || row.codility.includes("Partial") || row.codility.includes("High") ? (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-amber-50 text-amber-600">
                          {row.codility}
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-emerald-50 text-emerald-600">
                          {row.codility}
                        </span>
                      )}
                    </td>

                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Switch & Promo Section */}
      <section className="px-4 py-16 md:px-6 mx-auto max-w-7xl">
        <div className="bg-[#13111c] rounded-3xl border border-slate-800 p-8 md:p-12 lg:p-16 relative overflow-hidden text-slate-100 flex flex-col lg:flex-row justify-between gap-12 items-center">
          
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
                className="inline-flex items-center justify-center gap-2 bg-linear-to-r from-white/06 via-white/[0.09] to-white/04 hover:from-white/10 hover:via-white/[0.14] hover:to-white/08 border border-white/15 hover:border-white/30 text-white px-6 py-3.5 rounded-full text-sm font-bold tracking-wide backdrop-blur-2xl shadow-[0_8px_32px_0_rgba(0,0,0,0.25),inset_0_1px_1px_0_rgba(255,255,255,0.15)] hover:shadow-[0_12px_40px_0_rgba(255,255,255,0.08),inset_0_1px_1px_0_rgba(255,255,255,0.25)] transition-all duration-300 hover:scale-[1.02] hover:translate-y-[-1px] active:scale-98"
              >
                Book Demo
              </Link>
            </div>
          </div>

          {/* Right Block — Migration Value Propositions */}
          <div className="lg:max-w-md flex flex-col gap-8 relative z-10 w-full">
            
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

    </div>
  );
}