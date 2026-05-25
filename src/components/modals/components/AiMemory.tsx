"use client";

import React from "react";
import { Icon } from "@iconify/react";
import { motion } from "framer-motion";
import { 
  Database,
  Cpu,
  Layers,
  History,
  Activity,
  ArrowUpRight,
  ArrowRight,
  Play,
  Settings,
  ShieldCheck,
  Search,
  FileText,
  Workflow
} from "lucide-react";
import Link from "next/link";
import MemoryArchitectureSection from "./MemoryArchitectureSection";

// --- Section 1: RENO Hub Visualization ---

const nodes = [
  // Left Side
  { name: "Knowledge Base (KB)", icon: "solar:library-bold-duotone", x: 120, y: 50, color: "#22c55e" },
  { name: "Skills", icon: "solar:magic-stick-3-bold-duotone", x: 220, y: 150, color: "#6366f1" },
  { name: "Tools", icon: "solar:settings-minimalistic-bold-duotone", x: 120, y: 250, color: "#f59e0b" },
  
  // Right Side
  { name: "MCP Runtime", icon: "solar:cpu-bolt-bold-duotone", x: 780, y: 50, color: "#3b82f6" },
  { name: "Context Injection", icon: "solar:layers-minimalistic-bold-duotone", x: 680, y: 150, color: "#06b6d4" },
  { name: "Episodic Memory", icon: "solar:history-bold-duotone", x: 780, y: 250, color: "#ec4899" },

  // Bottom
  { name: "Shared Agent Memory", icon: "solar:users-group-two-rounded-bold-duotone", x: 350, y: 340, color: "#8b5cf6" },
  { name: "Semantic Retrieval", icon: "solar:magnifer-bold-duotone", x: 550, y: 340, color: "#10b981" },
];

const EcosystemSection = () => {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center py-24 overflow-hidden bg-white">
      {/* Background Infrastructure */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="h-[800px] w-[800px] rounded-full bg-accent/5 blur-[120px]" />
        </div>
        {/* Subtle operational grid */}
        <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(to_right,#00000010_1px,transparent_1px),linear-gradient(to_bottom,#00000010_1px,transparent_1px)] bg-[size:40px_40px]" />
      </div>

      <div className="relative z-10 w-full max-w-5xl mx-auto px-6 lg:px-8 text-center flex flex-col items-center">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-1.5 rounded-full bg-accent/10 px-3 py-1 text-xs text-accent ring-1 ring-inset ring-accent/20 uppercase tracking-[0.2em] font-bold mb-8 backdrop-blur-sm"
        >
          <Icon icon="solar:database-bold-duotone" className="text-sm" />
          RENO — Reflective Episodic Neural Operator
        </motion.div>

        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-4xl sm:text-5xl md:text-6xl font-semibold text-slate-900 tracking-tight leading-[1.1] max-w-4xl"
        >
          Persistent intelligence infrastructure for <span className="text-accent italic font-light">operational</span> AI systems
        </motion.h1>
        
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="mt-8 max-w-2xl text-base sm:text-lg text-slate-500 leading-relaxed font-medium"
        >
          RENO enables AI agents to retain workflow state, semantic context, operational memory, and long-term execution continuity across conversations, tools, and environments.
        </motion.p>

        {/* RENO Infrastructure Visualization */}
        <div className="relative mt-24 w-full max-w-4xl aspect-[16/9] sm:aspect-[900/400]">
          <svg viewBox="0 0 900 400" className="absolute inset-0 w-full h-full pointer-events-none" fill="none">
            <defs>
              <filter id="reno-glow" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="6" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
              <linearGradient id="reno-line-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="var(--color-accent)" stopOpacity="0" />
                <stop offset="50%" stopColor="var(--color-accent)" stopOpacity="0.3" />
                <stop offset="100%" stopColor="var(--color-accent)" stopOpacity="0.8" />
              </linearGradient>
            </defs>

            {nodes.map((node, i) => (
              <React.Fragment key={i}>
                <path 
                  d={`M${node.x} ${node.y} L 450 200`} 
                  stroke="rgba(0,0,0,0.05)" 
                  strokeWidth="1.5" 
                  strokeDasharray="4 4" 
                />
                
                <motion.path
                  d={`M${node.x} ${node.y} L 450 200`}
                  stroke="url(#reno-line-grad)"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ 
                    pathLength: [0, 1, 1], 
                    opacity: [0, 1, 0],
                    pathOffset: [0, 0, 1]
                  }}
                  transition={{ 
                    duration: 5, 
                    repeat: Infinity, 
                    delay: i * 0.4,
                    ease: "easeInOut"
                  }}
                />

                <motion.circle
                  r="3.5"
                  fill="var(--color-accent)"
                  filter="url(#reno-glow)"
                  initial={{ offsetDistance: "0%" }}
                  animate={{ offsetDistance: "100%" }}
                  transition={{ duration: 5, repeat: Infinity, delay: i * 0.4, ease: "linear" }}
                  style={{ offsetPath: `path('M${node.x} ${node.y} L 450 200')` }}
                />
              </React.Fragment>
            ))}
          </svg>

          {/* Infrastructure Nodes */}
          {nodes.map((node, i) => (
            <motion.div 
              key={i}
              className="absolute hidden sm:flex flex-col items-center gap-2 -translate-x-1/2 -translate-y-1/2 transition-all duration-500 hover:scale-110"
              style={{ top: node.y, left: `${(node.x / 900) * 100}%` }}
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white border border-slate-200 shadow-xl backdrop-blur-xl group relative">
                <Icon icon={node.icon} className="text-2xl" style={{ color: node.color }} />
                <div className="absolute inset-0 rounded-2xl bg-accent/5 opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              <span className="text-[9px] uppercase tracking-widest text-slate-400 font-bold whitespace-nowrap">{node.name}</span>
            </motion.div>
          ))}

          {/* Center Core */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 flex flex-col items-center gap-6">
            <div className="relative group">
              <div className="absolute inset-0 rounded-full bg-accent/20 blur-3xl animate-pulse" />
              <div className="relative flex h-28 w-24 items-center justify-center rounded-[2.5rem] bg-white border border-accent/20 shadow-[0_12px_50px_rgba(var(--color-accent-rgb),0.2)]">
                <Icon icon="solar:bolt-circle-bold-duotone" className="text-7xl text-accent" />
                <div className="absolute inset-[-15px] rounded-full border border-accent/15 animate-[spin_12s_linear_infinite]" />
                <div className="absolute inset-[-30px] rounded-full border border-accent/5 animate-[spin_20s_linear_infinite_reverse]" />
              </div>
            </div>
            <div className="flex flex-col items-center text-center">
              <span className="text-xs font-bold text-slate-900 uppercase tracking-[0.3em]">RENO Runtime Core</span>
              <div className="flex items-center gap-2 mt-2">
                <div className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
                <span className="text-[10px] text-accent/80 font-bold uppercase tracking-[0.2em]">Operational Memory Active</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// --- Section 3: RENO Memory Stack ---

const STACK_LAYERS = [
  { name: "Runtime", color: "from-blue-500/10 to-blue-400/5", border: "border-blue-200/50", icon: "solar:cpu-line-duotone" },
  { name: "Context", color: "from-cyan-500/10 to-cyan-400/5", border: "border-cyan-200/50", icon: "solar:map-point-line-duotone" },
  { name: "Memory", color: "from-indigo-500/10 to-indigo-400/5", border: "border-indigo-200/50", icon: "solar:database-line-duotone" },
  { name: "Skills", color: "from-purple-500/10 to-purple-400/5", border: "border-purple-200/50", icon: "solar:magic-stick-3-line-duotone" },
  { name: "Tools", color: "from-amber-500/10 to-amber-400/5", border: "border-amber-200/50", icon: "solar:settings-line-duotone" },
  { name: "Agents", color: "from-fuchsia-500/10 to-fuchsia-400/5", border: "border-fuchsia-200/50", icon: "solar:users-group-two-rounded-line-duotone" },
  { name: "Retrieval", color: "from-emerald-500/10 to-emerald-400/5", border: "border-emerald-200/50", icon: "solar:magnifer-line-duotone" },
];

const MemoryStackSection = () => {
  return (
    <section className="relative py-32 bg-white px-6 lg:px-8 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="mb-24 text-center flex flex-col items-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-3 py-1 mb-8">
            <span className="text-[10px] font-bold tracking-[0.2em] text-slate-500 uppercase">03 Memory Stack Engine</span>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-semibold text-slate-900 tracking-tight leading-tight">
            Layered intelligence. <br />
            Continuous <span className="text-accent italic font-light">synchronization.</span>
          </h2>
        </div>

        <div className="grid lg:grid-cols-3 gap-16 items-center">
          <div className="relative h-[600px] flex items-center justify-center perspective-[2000px]">
            <div className="relative w-72 h-72" style={{ transformStyle: "preserve-3d", transform: "rotateX(55deg) rotateZ(-45deg)" }}>
              {STACK_LAYERS.map((layer, i) => (
                <motion.div
                   key={i}
                   animate={{ 
                     translateZ: [i * 45, i * 45 + 15, i * 45],
                     opacity: [0.7, 0.9, 0.7]
                   }}
                   transition={{ duration: 5, repeat: Infinity, delay: i * 0.2, ease: "easeInOut" }}
                   className={`absolute inset-0 border-2 ${layer.border} bg-white/80 backdrop-blur-md rounded-3xl flex items-center justify-center shadow-xl shadow-black/[0.03]`}
                   style={{ transform: `translateZ(${i * 45}px)` }}
                >
                  <div className="absolute -left-32 flex items-center gap-3" style={{ transform: "rotateZ(45deg) rotateX(-55deg)", transformOrigin: "right" }}>
                    <div className="w-8 h-8 rounded-lg bg-white border border-slate-100 flex items-center justify-center text-slate-400 shadow-sm">
                      <Icon icon={layer.icon} className="text-lg" />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[10px] text-slate-900 tracking-[0.2em] uppercase font-bold">{layer.name}</span>
                      <span className="text-[8px] text-slate-400 uppercase tracking-widest font-bold">Execution Layer</span>
                    </div>
                    <div className="w-8 h-px bg-slate-100" />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="relative h-[500px] flex flex-col items-center justify-center">
             <span className="absolute top-0 text-[11px] uppercase tracking-[0.3em] text-slate-400 font-bold">Semantic Routing Engine</span>
             <div className="relative flex items-center justify-center w-full h-full">
               <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 500 500">
                  {[...Array(12)].map((_, i) => (
                    <g key={i}>
                      <path 
                        d={`M 250 250 Q ${250 + Math.cos(i * Math.PI/6)*120} ${250 + Math.sin(i * Math.PI/6)*120} ${250 + Math.cos(i * Math.PI/6)*220} ${250 + Math.sin(i * Math.PI/6)*220}`} 
                        fill="none" 
                        stroke="rgba(var(--color-accent-rgb),0.1)" 
                        strokeWidth="1.5" 
                        strokeDasharray="4 4" 
                      />
                      <motion.circle 
                        r="2.5" 
                        fill="var(--color-accent)"
                        initial={{ offsetDistance: "0%" }}
                        animate={{ offsetDistance: "100%" }}
                        transition={{ duration: 3, repeat: Infinity, delay: i * 0.3, ease: "linear" }}
                        style={{ offsetPath: `path('M 250 250 Q ${250 + Math.cos(i * Math.PI/6)*120} ${250 + Math.sin(i * Math.PI/6)*120} ${250 + Math.cos(i * Math.PI/6)*220} ${250 + Math.sin(i * Math.PI/6)*220}')` }}
                      />
                    </g>
                  ))}
               </svg>
               <div className="absolute w-80 h-80 border border-slate-100 rounded-full" />
               <div className="absolute w-56 h-56 border border-accent/20 rounded-full border-dashed animate-[spin_25s_linear_infinite]" />
               <div className="relative z-10 w-28 h-28 bg-white border border-slate-200 rounded-full flex items-center justify-center shadow-2xl shadow-blue-500/5">
                  <div className="absolute inset-0 rounded-full bg-accent/[0.03] animate-pulse" />
                  <Icon icon="solar:globus-line-duotone" className="text-5xl text-accent" />
               </div>
             </div>

             <div className="absolute bottom-0 grid grid-cols-3 gap-10 w-full px-6 text-center">
                {[
                  { label: "Indexing", val: "Live", icon: "solar:refresh-linear" },
                  { label: "Routing", val: "Optimized", icon: "solar:routing-2-linear" },
                  { label: "Sync Status", val: "Real-time", icon: "solar:shield-check-linear" }
                ].map((item, i) => (
                  <div key={i} className="flex flex-col items-center gap-2">
                    <Icon icon={item.icon} className="text-slate-400 text-lg" />
                    <span className="text-[10px] uppercase tracking-widest text-slate-400 font-bold">{item.label}</span>
                    <span className="text-[9px] text-accent font-bold uppercase tracking-widest">{item.val}</span>
                  </div>
                ))}
             </div>
          </div>

          <div className="relative h-[500px] flex flex-col justify-center">
             <div className="bg-slate-50 border border-slate-100 rounded-[2.5rem] p-8 shadow-xl shadow-black/[0.02] relative overflow-hidden h-full flex flex-col">
                <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-accent/40 via-purple-500/20 to-transparent" />
                <div className="flex justify-between items-center mb-8 text-left">
                  <div className="flex flex-col gap-1">
                    <span className="text-sm font-bold text-slate-900 tracking-tight">Live Context Activity</span>
                    <span className="text-[9px] text-slate-400 uppercase tracking-widest font-bold">Active Runtime Streams</span>
                  </div>
                  <div className="flex items-center gap-2 px-2.5 py-1 rounded-full bg-green-500/10 border border-green-500/20">
                    <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                    <span className="text-[9px] uppercase tracking-[0.2em] text-green-600 font-bold">Live</span>
                  </div>
                </div>

                <div className="flex-1 space-y-6 relative overflow-hidden text-left">
                  <div className="absolute left-3.5 top-0 bottom-0 w-px bg-slate-200" />
                  {[
                    { text: "Context retrieved", time: "2s ago", icon: "solar:magnifer-linear" },
                    { text: "Memory matched", time: "3s ago", icon: "solar:checklist-minimalistic-linear" },
                    { text: "Episodic recall", time: "5s ago", icon: "solar:history-linear" },
                    { text: "KB document linked", time: "6s ago", icon: "solar:link-linear" },
                    { text: "Skill invoked", time: "8s ago", icon: "solar:magic-stick-3-linear" },
                  ].map((item, i) => (
                    <motion.div key={i} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} className="flex items-center justify-between relative pl-10 group/item">
                      <div className="absolute left-[11px] w-2.5 h-2.5 rounded-full bg-white border-2 border-slate-200 flex items-center justify-center group-hover/item:border-accent transition-colors shadow-sm"><div className="w-1 h-1 rounded-full bg-slate-300 group-hover/item:bg-accent" /></div>
                      <div className="flex items-center gap-3">
                        <div className="w-7 h-7 rounded-lg bg-white border border-slate-100 flex items-center justify-center text-slate-400 group-hover/item:text-slate-900 transition-colors shadow-sm"><Icon icon={item.icon} className="text-sm" /></div>
                        <span className="text-xs text-slate-500 font-medium group-hover/item:text-slate-900 transition-colors">{item.text}</span>
                      </div>
                      <span className="text-[10px] font-bold text-slate-400 tabular-nums">{item.time}</span>
                    </motion.div>
                  ))}
                </div>

                <div className="mt-8 pt-8 border-t border-slate-200 flex flex-col gap-6 text-left">
                  <div className="flex justify-between items-end">
                    <div className="flex flex-col gap-1">
                      <span className="text-[11px] font-bold text-slate-900 uppercase tracking-widest">Retrieval Confidence</span>
                      <span className="text-[9px] text-slate-400 uppercase tracking-[0.2em] font-bold">Operational Integrity</span>
                    </div>
                    <div className="text-2xl font-bold text-slate-900 tracking-tighter tabular-nums">98.4%</div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="flex-1 h-2 bg-slate-200 rounded-full overflow-hidden flex gap-0.5">
                       <motion.div initial={{ width: 0 }} whileInView={{ width: "82.7%" }} className="h-full bg-accent rounded-full shadow-[0_0_10px_rgba(var(--color-accent-rgb),0.3)]" />
                       <motion.div initial={{ width: 0 }} whileInView={{ width: "14.1%" }} className="h-full bg-slate-300 rounded-full" />
                    </div>
                    <span className="text-[8px] uppercase tracking-widest text-slate-400 font-bold whitespace-nowrap">High Conf</span>
                  </div>
                </div>
             </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// --- Section 4: How RENO Works ---

const VideoExplainerSection = () => {
  return (
    <section className="relative border-t border-slate-100 bg-white px-6 py-32 lg:px-8">
       <div className="max-w-7xl mx-auto">
         <div className="grid lg:grid-cols-2 gap-24 items-center">
            <div className="space-y-10 text-left">
              <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-3 py-1">
                <span className="text-[10px] font-bold tracking-[0.2em] text-slate-500 uppercase">04 How RENO Works</span>
              </div>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-normal text-slate-900 tracking-tight leading-tight">
                How persistent AI memory systems operate in <span className="text-accent italic font-light">real-time.</span>
              </h2>
              <p className="text-slate-500 text-lg font-medium leading-relaxed max-w-xl">
                Understand how RENO coordinates contextual retrieval, episodic memory, semantic ranking, and operational continuity across autonomous AI systems.
              </p>
              <div className="grid grid-cols-2 gap-x-12 gap-y-10 pt-4">
                 {[
                   { title: "Ingest", icon: "solar:incoming-call-bold-duotone", desc: "Capture data, outcomes and interactions." },
                   { title: "Index", icon: "solar:database-bold-duotone", desc: "Structure and embed into memory." },
                   { title: "Retrieve", icon: "solar:magnifer-bold-duotone", desc: "Find the most relevant context." },
                   { title: "Inject", icon: "solar:layers-minimalistic-bold-duotone", desc: "Compose and deliver to the agent." }
                 ].map((step, i) => (
                   <div key={i} className="flex flex-col gap-3 group text-left">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-accent shadow-sm transition-colors group-hover:border-accent/30"><Icon icon={step.icon} className="text-xl" /></div>
                        <span className="text-sm font-bold uppercase tracking-widest text-slate-900">{step.title}</span>
                      </div>
                      <p className="text-xs font-medium leading-relaxed text-slate-500">{step.desc}</p>
                   </div>
                 ))}
              </div>
            </div>
            <div className="relative group">
               <div className="pointer-events-none absolute inset-0 rounded-[3rem] bg-accent/[0.04] blur-[80px]" />
               <div className="relative aspect-video overflow-hidden rounded-[2.5rem] border border-slate-200 bg-slate-50 shadow-[0_8px_40px_rgba(15,23,42,0.06)] transition-all duration-500 group-hover:border-accent/20">
                  <div className="absolute inset-0 opacity-[0.35] bg-[linear-gradient(to_right,#0f172a08_1px,transparent_1px),linear-gradient(to_bottom,#0f172a08_1px,transparent_1px)] bg-[size:24px_24px]" />
                  <div className="absolute inset-0 bg-gradient-to-t from-white/90 via-white/20 to-transparent" />
                  <div className="absolute top-6 left-8 flex items-center gap-3"><div className="h-2 w-2 rounded-full bg-accent animate-pulse" /><span className="text-[10px] font-bold uppercase tracking-[0.3em] text-slate-700">RENO Runtime Visualization</span></div>
                  <div className="absolute top-6 right-8 text-[10px] font-bold uppercase tracking-[0.3em] text-slate-400">LIVE</div>
                  <div className="absolute inset-0 flex items-center justify-center">
                     <div className="relative">
                        <div className="absolute inset-0 scale-150 animate-pulse rounded-full bg-accent/15 blur-2xl" />
                        <button className="group/btn relative flex h-24 w-24 items-center justify-center overflow-hidden rounded-full border border-slate-200 bg-white text-slate-900 shadow-lg transition-transform hover:scale-105 active:scale-95">
                           <div className="absolute inset-0 translate-y-full bg-accent transition-transform duration-500 group-hover/btn:translate-y-0" />
                           <Play className="relative z-10 h-8 w-8 translate-x-0.5 fill-current" />
                        </button>
                     </div>
                  </div>
                  <div className="absolute inset-x-8 bottom-8 flex flex-col gap-6">
                     <div className="flex items-center gap-4"><span className="text-[9px] font-bold tabular-nums text-slate-600">02:14 / 06:48</span><div className="h-1 flex-1 overflow-hidden rounded-full bg-slate-200"><motion.div initial={{ width: 0 }} whileInView={{ width: "32%" }} className="h-full bg-accent" /></div></div>
                     <div className="flex items-center justify-between"><div className="flex gap-4"><Icon icon="solar:volume-loud-linear" className="text-lg text-slate-400" /><Icon icon="solar:settings-linear" className="text-lg text-slate-400" /></div><Icon icon="solar:full-screen-linear" className="text-lg text-slate-400" /></div>
                  </div>
               </div>
            </div>
         </div>
       </div>
    </section>
  );
};

// --- Section 5: CTA ---

const CTASection = () => {
  return (
    <section className="relative overflow-hidden border-t border-slate-100 bg-slate-50 py-40 text-center">
      <div className="pointer-events-none absolute inset-0 opacity-40">
         <svg className="h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
           {[...Array(12)].map((_, i) => (
             <motion.line key={i} x1="0" y1={i * 8} x2="100" y2={i * 8 + 4} stroke="rgba(var(--color-accent-rgb), 0.08)" strokeWidth="0.1" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 15, repeat: Infinity, delay: i * 0.5 }} />
           ))}
         </svg>
      </div>
      <div className="relative z-10 mx-auto flex max-w-4xl flex-col items-center px-6">
        <motion.div initial={{ opacity: 0, scale: 0.98 }} whileInView={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8 }} className="flex flex-col items-center space-y-10">
          <h2 className="text-4xl font-normal leading-[1.1] tracking-tight text-slate-900 sm:text-5xl md:text-6xl lg:text-7xl">
            Persistent intelligence for <br /><span className="font-light italic text-accent">autonomous</span> operational systems.
          </h2>
          <p className="max-w-2xl text-lg font-medium leading-relaxed text-slate-500 sm:text-xl">
            Deploy semantic memory infrastructure for contextual continuity, operational recall, and long-running AI execution.
          </p>
          <div className="flex flex-col items-center gap-4 pt-4 sm:flex-row sm:gap-6">
            <Link href="https://platform.zaby.io" className="rounded-full bg-accent px-12 py-5 font-bold text-black shadow-[0_8px_32px_-8px_rgba(var(--color-accent-rgb),0.45)] transition-all duration-300 hover:bg-accent-hover">Initialize RENO Runtime</Link>
            <button className="flex items-center gap-3 rounded-full border border-slate-200 bg-white px-12 py-5 font-semibold text-slate-700 transition-all hover:border-slate-300 hover:bg-slate-100">Explore Semantic Infrastructure <ArrowRight size={18} className="text-accent" /></button>
          </div>
        </motion.div>
      </div>
      <div className="pointer-events-none absolute bottom-0 left-1/2 h-[400px] w-full -translate-x-1/2 bg-gradient-to-t from-accent/[0.06] to-transparent blur-[80px]" />
    </section>
  );
};

// --- Main Component ---

export default function AiMemory() {
  return (
    <div className="bg-white min-h-screen text-slate-700 antialiased selection:bg-accent/20 selection:text-accent overflow-x-hidden">
      <EcosystemSection />
      <MemoryArchitectureSection />
      <MemoryStackSection />
      <VideoExplainerSection />
      <CTASection />
    </div>
  );
}
