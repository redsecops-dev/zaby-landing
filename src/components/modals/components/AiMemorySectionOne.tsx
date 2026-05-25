"use client";

import React, { useCallback, useRef } from "react";
import { Icon } from "@iconify/react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useScrollTriggerAnimation } from "@/lib/gsap-utils";

interface MemoryNode {
  name: string;
  sub: string;
  icon: string;
  color: string;
}

const leftNodes: MemoryNode[] = [
  { name: "Knowledge Base (KB)", sub: "Vector memory for intelligence", icon: "solar:library-bold-duotone", color: "#22c55e" },
  { name: "Skills", sub: "Reusable workflows & logic", icon: "solar:magic-stick-3-bold-duotone", color: "#6366f1" },
  { name: "Tools", sub: "APIs, utilities & integrations", icon: "solar:settings-minimalistic-bold-duotone", color: "#f59e0b" },
];

const rightNodes: MemoryNode[] = [
  { name: "MCP Runtime", sub: "Execution layer protocol", icon: "solar:cpu-bolt-bold-duotone", color: "#3b82f6" },
  { name: "Context Injection", sub: "Semantic context assembly", icon: "solar:layers-minimalistic-bold-duotone", color: "#06b6d4" },
  { name: "Episodic Memory", sub: "Experiences & decisions", icon: "solar:history-bold-duotone", color: "#ec4899" },
];

const NodeCard = ({ node, side }: { node: MemoryNode; side: "left" | "right" }) => {
  return (
    <div className={cn(
      "z-30 flex items-center gap-4 bg-white/90 backdrop-blur-md border border-slate-200 p-4 rounded-2xl group hover:border-blue-500/30 transition-all duration-300 w-[240px] relative",
      side === "right" && "flex-row-reverse text-right"
    )}>
      <div 
        className="flex-shrink-0 w-12 h-12 rounded-xl border flex items-center justify-center group-hover:scale-110 transition-transform duration-500"
        style={{ 
          backgroundColor: `${node.color}10`,
          borderColor: `${node.color}20`,
          color: node.color
        }}
      >
        <Icon icon={node.icon} className="text-2xl" />
      </div>
      <div className={cn("flex flex-col gap-0.5 min-w-0", side === "left" ? "items-start" : "items-end")}>
        <span className="text-xs font-bold text-slate-900 truncate w-full">{node.name}</span>
        <span className="text-[10px] text-slate-500 leading-tight line-clamp-2 font-medium">{node.sub}</span>
      </div>
    </div>
  );
};



export default function AiMemorySectionOne() {
  const containerRef = useRef<HTMLDivElement>(null);

  const customAnimation = useCallback((scroller: Element | Window) => {
    gsap.from(".gsap-reveal-item", {
      y: 20,
      opacity: 0,
      duration: 1,
      stagger: 0.1,
      ease: "power3.out",
      scrollTrigger: {
        trigger: ".gsap-reveal-item",
        scroller: scroller as any,
        start: "top 95%",
      }
    });
  }, []);

  useScrollTriggerAnimation(containerRef, { customAnimation });

  return (
    <section ref={containerRef} className="relative min-h-screen flex flex-col items-center justify-start overflow-hidden bg-white">
      {/* Background Infrastructure */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="h-[800px] w-[800px] rounded-full bg-blue-500/5 blur-[120px]" />
        </div>
        {/* Subtle operational grid */}
        <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(to_right,#00000015_1px,transparent_1px),linear-gradient(to_bottom,#00000015_1px,transparent_1px)] bg-[size:40px_40px]" />
      </div>

      <div className="relative z-10 w-full flex flex-col items-center w-full">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-8 items-center w-full text-left mb-24">
          {/* Left Column - Content & Buttons */}
          <div className="lg:col-span-7 flex flex-col items-start text-left">
            <h1 className="reveal-text text-3xl sm:text-4xl md:text-5xl font-light tracking-tight leading-tight text-slate-900 max-w-2xl mb-6">
              Persistent intelligence infrastructure for <br />
              <span className="bg-linear-to-br from-accent via-[#c026d3] to-accent-soft bg-clip-text text-transparent font-light">operational</span> AI systems
            </h1>
            
            <p className="reveal-text text-sm sm:text-base text-slate-500 leading-relaxed font-light mb-8 max-w-xl">
              RENO enables AI agents to retain workflow state, semantic context, operational memory, and long-term execution continuity across conversations, tools, and environments.
            </p>

            <div className="flex flex-wrap items-center gap-4 gsap-reveal-item">
              <Link 
                href="https://platform.zaby.io" 
                className="group relative flex w-full cursor-pointer items-center justify-center gap-3 rounded-full bg-(--color-button-primary-bg) px-6 py-3.5 text-sm font-medium tracking-wide text-white shadow-[rgba(76,29,149,0.5)_0px_10px_30px_-10px] transition-all hover:bg-(--color-button-primary-hover) hover:shadow-[rgba(76,29,149,0.6)_0px_12px_34px_-10px] sm:w-auto"
              >
                <Icon icon="solar:bolt-linear" width={20} height={20} />
                Initialize RENO Runtime
              </Link>
              <Link 
                href="https://platform.zaby.io/docs" 
                className="flex w-full cursor-pointer items-center justify-center gap-3 rounded-full border border-(--color-button-secondary-border) bg-(--color-button-secondary-bg) px-8 py-3.5 text-sm font-medium text-(--color-button-secondary-text) backdrop-blur-md transition-all hover:bg-white sm:w-auto"
              >
                <Icon icon="solar:document-linear" width={20} height={20} />
                View API Docs
              </Link>
            </div>
          </div>

          {/* Right Column - Checklist */}
          <div className="lg:col-span-5 flex flex-col gap-6 pl-0 lg:pl-12 border-l border-slate-100/80 mt-8 lg:mt-0 text-left">
            {[
              {
                title: "Persistent Intelligence",
                desc: "Retain long-term memory across infinite sessions, runs, and sandboxes."
              },
              {
                title: "Semantic Orchestration",
                desc: "Dynamically rank, filter, and inject relevant context on-the-fly."
              },
              {
                title: "Episodic Memory Layers",
                desc: "Record past actions, execution states, and human-in-the-loop decisions."
              },
              {
                title: "Contextual Continuity",
                desc: "Guarantee zero state drift when executing complex multi-agent pipelines."
              }
            ].map((item, idx) => (
              <div key={idx} className="flex gap-4 items-start gsap-reveal-item">
                <div className="w-5 h-5 rounded-full bg-violet-50 text-violet-500 border border-violet-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Icon icon="solar:check-read-linear" className="text-xs" />
                </div>
                <div className="flex flex-col gap-1 text-left">
                  <span className="text-sm font-semibold text-slate-900 leading-none">{item.title}</span>
                  <span className="text-xs text-slate-500 leading-relaxed font-light">{item.desc}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Animated Beam Style Visualization */}
        <div className="relative w-full max-w-5xl mx-auto h-[400px] flex items-center justify-center">
          
          <svg className="absolute inset-0 w-full h-full pointer-events-none z-0" viewBox="0 0 1000 400" preserveAspectRatio="xMidYMid meet">
            <defs>
              <filter id="reno-glow" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="3" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
              <linearGradient id="grad-left" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#3b82f6" stopOpacity="0" />
                <stop offset="50%" stopColor="#3b82f6" stopOpacity="0.3" />
                <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.8" />
              </linearGradient>
              <linearGradient id="grad-right" x1="100%" y1="0%" x2="0%" y2="0%">
                <stop offset="0%" stopColor="#3b82f6" stopOpacity="0" />
                <stop offset="50%" stopColor="#3b82f6" stopOpacity="0.3" />
                <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.8" />
              </linearGradient>
            </defs>

            {/* Left Lines */}
            {[70, 200, 330].map((y, i) => {
              const startX = 220;
              const endX = 430;
              const endY = 200;
              const d = `M ${startX} ${y} C ${startX + 120} ${y}, ${endX - 80} ${endY}, ${endX} ${endY}`;
              
              return (
                <g key={`l-${i}`}>
                  <path d={d} fill="none" stroke="rgba(0,0,0,0.06)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  <path d={d} fill="none" stroke="rgba(59,130,246,0.05)" strokeWidth="6" filter="url(#reno-glow)" />
                  <motion.path
                    d={d}
                    fill="none"
                    stroke="url(#grad-left)"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: [0, 1, 1], opacity: [0, 1, 0] }}
                    transition={{ duration: 6, repeat: Infinity, delay: i * 1.5, ease: "easeInOut" }}
                  />
                  <motion.circle
                    r="2"
                    fill="#3b82f6"
                    filter="url(#reno-glow)"
                    initial={{ offsetDistance: "0%" }}
                    animate={{ offsetDistance: "100%" }}
                    transition={{ duration: 6, repeat: Infinity, delay: i * 1.5, ease: "linear" }}
                    style={{ offsetPath: `path('${d}')` }}
                  />
                </g>
              );
            })}

            {/* Right Lines */}
            {[70, 200, 330].map((y, i) => {
              const startX = 780;
              const endX = 570;
              const endY = 200;
              const d = `M ${startX} ${y} C ${startX - 120} ${y}, ${endX + 80} ${endY}, ${endX} ${endY}`;
              
              return (
                <g key={`r-${i}`}>
                  <path d={d} fill="none" stroke="rgba(0,0,0,0.06)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  <path d={d} fill="none" stroke="rgba(59,130,246,0.05)" strokeWidth="6" filter="url(#reno-glow)" />
                  <motion.path
                    d={d}
                    fill="none"
                    stroke="url(#grad-right)"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: [0, 1, 1], opacity: [0, 1, 0] }}
                    transition={{ duration: 6, repeat: Infinity, delay: (i * 1.5) + 0.75, ease: "easeInOut" }}
                  />
                  <motion.circle
                    r="2"
                    fill="#3b82f6"
                    filter="url(#reno-glow)"
                    initial={{ offsetDistance: "0%" }}
                    animate={{ offsetDistance: "100%" }}
                    transition={{ duration: 6, repeat: Infinity, delay: (i * 1.5) + 0.75, ease: "linear" }}
                    style={{ offsetPath: `path('${d}')` }}
                  />
                </g>
              );
            })}
          </svg>

          {/* Left Column Nodes */}
          <div className="absolute left-[8%] top-0 h-full flex flex-col justify-between items-start z-10 w-[240px] py-[25px]">
            {leftNodes.map((node, i) => (
              <motion.div key={`ln-${i}`} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.1 }}>
                <NodeCard node={node} side="left" />
              </motion.div>
            ))}
          </div>

          {/* Center Hub */}
          <div className="absolute left-1/2 top-55 -translate-x-1/2 -translate-y-1/2 z-20 flex flex-col items-center">
            <div className="relative group flex items-center justify-center">
              {/* RENO Ripple Effect */}
              {[...Array(3)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute inset-0 rounded-full border border-blue-500/30"
                  initial={{ scale: 1, opacity: 0.5 }}
                  animate={{ scale: [1, 2.5], opacity: [0.5, 0] }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    delay: i * 1,
                    ease: "easeOut",
                  }}
                />
              ))}
              
              <div className="absolute inset-0 rounded-full bg-blue-500/20 blur-3xl animate-pulse" />
              
              {/* 3D Sphere Core */}
              <div 
                className="relative flex h-40 w-40 items-center justify-center rounded-full z-10 group-hover:scale-105 transition-transform duration-500 border border-slate-200"
                style={{
                  background: "radial-gradient(circle at 35% 35%, #ffffff, #eff6ff, #dbeafe)"
                }}
              >
                {/* Specular Highlight */}
                <div className="absolute top-[15%] left-[15%] w-1/4 h-1/4 rounded-full bg-white/60 blur-[2px]" />
                
                <Icon icon="solar:database-bold-duotone" className="text-5xl text-blue-500" />
              </div>
            </div>
            
            <div className="mt-3 flex flex-col items-center">
               <span className="text-[10px] font-bold text-blue-500 uppercase tracking-widest mb-1">RENO</span>
               <span className="text-xs font-bold text-slate-900 tracking-tight leading-tight">Runtime<br/>Core</span>
            </div>
          </div>

          {/* Right Column Nodes */}
          <div className="absolute right-0 top-0 h-full flex flex-col justify-between items-end z-10 w-[240px]">
            {rightNodes.map((node, i) => (
              <motion.div key={`rn-${i}`} initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} transition={{ delay: (i * 0.1) + 0.3 }}>
                <NodeCard node={node} side="right" />
              </motion.div>
            ))}
          </div>

        </div>

        {/* Feature Summary Strip */}
        <div className="mt-28 w-full pt-12 border-t border-slate-100">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              "Persistent intelligence",
              "Semantic orchestration",
              "Episodic memory layers",
              "Contextual continuity"
            ].map((text, i) => (
              <div key={i} className="flex flex-col items-center gap-3 group">
                <div className="h-px w-12 bg-blue-500/30 group-hover:w-20 transition-all duration-500" />
                <span className="text-[11px] uppercase tracking-widest text-slate-700 group-hover:text-slate-900 font-bold transition-colors">
                  {text}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
