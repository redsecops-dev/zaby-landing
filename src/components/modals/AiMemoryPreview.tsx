"use client";

import React, { useRef } from "react";
import { Icon } from "@iconify/react";
import { motion } from "framer-motion";
import { ArrowRight, Play } from "lucide-react";
import Link from "next/link";
import { useScrollTriggerAnimation } from "@/lib/gsap-utils";

import AiMemorySectionOne from "./components/AiMemorySectionOne";
import MemoryArchitectureSection from "./components/MemoryArchitectureSection";
import HeroLiquidMetal, {
  HeroLiquidMetalRoot,
  HeroLiquidMetalContainer,
  HeroLiquidMetalContent,
  HeroLiquidMetalHeading,
  HeroLiquidMetalDescription,
  HeroLiquidMetalVisual,
  HeroLiquidMetalMobileVisual,
} from "@/components/ui/hero-liquid-metal";



// --- Section 3: RENO Memory Stack ---

const STACK_LAYERS = [
  { name: "Runtime", color: "from-blue-500/10 to-blue-400/5", border: "border-blue-200/50", icon: "solar:cpu-line-duotone" },
  { name: "Context", color: "from-blue-500/10 to-blue-400/5", border: "border-blue-200/50", icon: "solar:map-point-line-duotone" },
  { name: "Memory", color: "from-blue-500/10 to-blue-400/5", border: "border-blue-200/50", icon: "solar:database-line-duotone" },
  { name: "Skills", color: "from-blue-500/10 to-blue-400/5", border: "border-blue-200/50", icon: "solar:magic-stick-3-line-duotone" },
  { name: "Tools", color: "from-blue-500/10 to-blue-400/5", border: "border-blue-200/50", icon: "solar:settings-line-duotone" },
  { name: "Agents", color: "from-blue-500/10 to-blue-400/5", border: "border-blue-200/50", icon: "solar:users-group-two-rounded-line-duotone" },
  { name: "Retrieval", color: "from-blue-500/10 to-blue-400/5", border: "border-blue-200/50", icon: "solar:magnifer-line-duotone" },
];

const MemoryStackSection = () => {
  const containerRef = useRef<HTMLElement>(null);

  useScrollTriggerAnimation(containerRef);

  return (
    <section ref={containerRef} className="relative bg-white px-6 lg:px-8 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="mb-24 text-center flex flex-col items-center">
          <h2 className="reveal-text text-4xl md:text-5xl font-light tracking-tight leading-tight glass-text">
            Layered intelligence. <br />
            Continuous synchronization.
          </h2>
        </div>

        <div className="grid lg:grid-cols-3 gap-16 items-center">
          <div className="relative h-[600px] flex items-center justify-center perspective-[2000px]">
            <div className="relative w-72 h-72" style={{ transformStyle: "preserve-3d", transform: "rotateX(55deg) rotateZ(-45deg)" }}>
              {STACK_LAYERS.map((layer, i) => (
                <motion.div
                   key={i}
                   initial={{ opacity: 0, translateZ: i * 45 - 100 }}
                   whileInView={{ opacity: 0.8, translateZ: i * 45 }}
                   viewport={{ once: true }}
                   transition={{
                     duration: 1,
                     delay: i * 0.1,
                     ease: "easeOut",
                     translateZ: { duration: 5, repeat: Infinity, delay: i * 0.2, ease: "easeInOut" },
                     opacity: { duration: 5, repeat: Infinity, delay: i * 0.2, ease: "easeInOut" }
                   }}
                   animate={{ 
                     translateZ: [i * 45, i * 45 + 15, i * 45],
                     opacity: [0.7, 0.9, 0.7]
                   }}
                   className={`absolute inset-0 border-2 ${layer.border} bg-white/80 backdrop-blur-md rounded-3xl flex items-center justify-center`}
                   style={{ transform: `translateZ(${i * 45}px)` }}
                >
                  <div className="absolute -left-32 flex items-center gap-3" style={{ transform: "rotateZ(45deg) rotateX(-55deg)", transformOrigin: "right" }}>
                    <div className="w-8 h-8 rounded-lg bg-white border border-slate-100 flex items-center justify-center text-slate-400">
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
                        stroke="rgba(59,130,246,0.1)" 
                        strokeWidth="1.5" 
                        strokeDasharray="4 4" 
                      />
                      <motion.circle 
                        r="2.5" 
                        fill="#3b82f6"
                        initial={{ offsetDistance: "0%" }}
                        animate={{ offsetDistance: "100%" }}
                        transition={{ duration: 3, repeat: Infinity, delay: i * 0.3, ease: "linear" }}
                        style={{ offsetPath: `path('M 250 250 Q ${250 + Math.cos(i * Math.PI/6)*120} ${250 + Math.sin(i * Math.PI/6)*120} ${250 + Math.cos(i * Math.PI/6)*220} ${250 + Math.sin(i * Math.PI/6)*220}')` }}
                      />
                    </g>
                  ))}
               </svg>
               <div className="absolute w-80 h-80 border border-slate-100 rounded-full" />
               <div className="absolute w-56 h-56 border border-blue-500/20 rounded-full border-dashed animate-[spin_25s_linear_infinite]" />
               <div className="relative z-10 w-28 h-28 bg-white border border-slate-200 rounded-full flex items-center justify-center">
                  <div className="absolute inset-0 rounded-full bg-blue-500/[0.03] animate-pulse" />
                  <Icon icon="solar:globus-line-duotone" className="text-5xl text-blue-500" />
               </div>
             </div>

             <div className="absolute bottom-0 grid grid-cols-3 gap-10 w-full px-6 text-center">
                {[
                  { label: "Indexing", val: "Live", icon: "solar:refresh-linear" },
                  { label: "Routing", val: "Optimized", icon: "solar:routing-2-linear" },
                  { label: "Sync Status", val: "Real-time", icon: "solar:shield-check-linear" }
                ].map((item, i) => (
                  <motion.div 
                    key={i} 
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4 + i * 0.1 }}
                    className="flex flex-col items-center gap-2"
                  >
                    <Icon icon={item.icon} className="text-slate-400 text-lg" />
                    <span className="text-[10px] uppercase tracking-widest text-slate-400 font-bold">{item.label}</span>
                    <span className="text-[9px] text-blue-500 font-bold uppercase tracking-widest">{item.val}</span>
                  </motion.div>
                ))}
             </div>
          </div>

          <div className="relative h-[500px] flex flex-col justify-center">
             <motion.div 
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="bg-slate-50 border border-slate-100 rounded-[2.5rem] p-8 relative overflow-hidden h-full flex flex-col"
              >
                <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-blue-500/40 via-indigo-500/20 to-transparent" />
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
                    <motion.div key={i} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 + i * 0.05 }} className="flex items-center justify-between relative pl-10 group/item">
                      <div className="absolute left-[11px] w-2.5 h-2.5 rounded-full bg-white border-2 border-slate-200 flex items-center justify-center group-hover/item:border-blue-500 transition-colors"><div className="w-1 h-1 rounded-full bg-slate-300 group-hover/item:bg-blue-500" /></div>
                      <div className="flex items-center gap-3">
                        <div className="w-7 h-7 rounded-lg bg-white border border-slate-100 flex items-center justify-center text-slate-400 group-hover/item:text-slate-900 transition-colors"><Icon icon={item.icon} className="text-sm" /></div>
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
                       <motion.div initial={{ width: 0 }} whileInView={{ width: "82.7%" }} className="h-full bg-blue-500 rounded-full" />
                       <motion.div initial={{ width: 0 }} whileInView={{ width: "14.1%" }} className="h-full bg-slate-300 rounded-full" />
                    </div>
                    <span className="text-[8px] uppercase tracking-widest text-slate-400 font-bold whitespace-nowrap">High Conf</span>
                  </div>
                </div>
             </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

// --- Section 4: How RENO Works ---

const VideoExplainerSection = () => {
  const containerRef = useRef<HTMLElement>(null);

  useScrollTriggerAnimation(containerRef);

  return (
    <section ref={containerRef} className="relative pb-25 px-6 lg:px-8">
       <div className="max-w-7xl mx-auto">
         <div className="grid lg:grid-cols-2 gap-24 items-center">
            <div className="space-y-10 text-left">
              <h2 className="reveal-text text-4xl md:text-5xl font-light tracking-tight leading-tight glass-text">
                Intelligent Memory Operations.
              </h2>
              <p className="reveal-text font-light text-base leading-relaxed transition-colors text-slate-600 max-w-xl">
                Understand how RENO coordinates contextual retrieval, episodic memory, semantic ranking, and operational continuity across autonomous AI systems.
              </p>
              <div className="grid grid-cols-2 gap-x-12 gap-y-10 pt-4">
                 {[
                   { title: "Ingest", icon: "solar:incoming-call-bold-duotone", desc: "Capture data, outcomes and interactions." },
                   { title: "Index", icon: "solar:database-bold-duotone", desc: "Structure and embed into memory." },
                   { title: "Retrieve", icon: "solar:magnifer-bold-duotone", desc: "Find the most relevant context." },
                   { title: "Inject", icon: "solar:layers-minimalistic-bold-duotone", desc: "Compose and deliver to the agent." }
                 ].map((step, i) => (
                   <motion.div 
                    key={i} 
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 + i * 0.1 }}
                    className="flex flex-col gap-3 group text-left"
                   >
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-400 group-hover:bg-blue-500/20 transition-all duration-300"><Icon icon={step.icon} className="text-xl" /></div>
                        <span className="text-sm font-medium tracking-wide uppercase text-slate-900">{step.title}</span>
                      </div>
                      <p className="text-xs font-light leading-relaxed text-slate-500">{step.desc}</p>
                   </motion.div>
                 ))}
              </div>
            </div>
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
              className="relative group"
            >
               <div className="pointer-events-none absolute inset-0 rounded-[3rem] bg-blue-500/[0.04] blur-[80px]" />
               <div className="relative aspect-video overflow-hidden rounded-[2.5rem] border border-slate-200 bg-slate-50 transition-all duration-500 group-hover:border-blue-500/20">
                  <div className="absolute inset-0 opacity-[0.35] bg-[linear-gradient(to_right,#0f172a08_1px,transparent_1px),linear-gradient(to_bottom,#0f172a08_1px,transparent_1px)] bg-[size:24px_24px]" />
                  <div className="absolute inset-0 bg-gradient-to-t from-white/90 via-white/20 to-transparent" />
                  <div className="absolute top-6 left-8 flex items-center gap-3"><div className="h-2 w-2 rounded-full bg-blue-500 animate-pulse" /><span className="text-[10px] font-bold uppercase tracking-[0.3em] text-slate-700">RENO Runtime Visualization</span></div>
                  <div className="absolute top-6 right-8 text-[10px] font-bold uppercase tracking-[0.3em] text-slate-400">LIVE</div>
                  <div className="absolute inset-0 flex items-center justify-center">
                     <div className="relative">
                        <div className="absolute inset-0 scale-150 animate-pulse rounded-full bg-blue-500/15 blur-2xl" />
                        <button className="group/btn relative flex h-24 w-24 items-center justify-center overflow-hidden rounded-full border border-slate-200 bg-white text-slate-900 transition-transform hover:scale-105 active:scale-95">
                           <div className="absolute inset-0 translate-y-full bg-blue-500 transition-transform duration-500 group-hover/btn:translate-y-0" />
                           <Play className="relative z-10 h-8 w-8 translate-x-0.5 fill-current" />
                        </button>
                     </div>
                  </div>
                  <div className="absolute inset-x-8 bottom-8 flex flex-col gap-6">
                     <div className="flex items-center gap-4"><span className="text-[9px] font-bold tabular-nums text-slate-600">02:14 / 06:48</span><div className="h-1 flex-1 overflow-hidden rounded-full bg-slate-200"><motion.div initial={{ width: 0 }} whileInView={{ width: "32%" }} className="h-full bg-blue-500" /></div></div>
                     <div className="flex items-center justify-between"><div className="flex gap-4"><Icon icon="solar:volume-loud-linear" className="text-lg text-slate-400" /><Icon icon="solar:settings-linear" className="text-lg text-slate-400" /></div><Icon icon="solar:full-screen-linear" className="text-lg text-slate-400" /></div>
                  </div>
               </div>
            </motion.div>
         </div>
       </div>
    </section>
  );
};

// --- Section 5: CTA ---

const CTASection = () => {
  const containerRef = useRef<HTMLElement>(null);

  useScrollTriggerAnimation(containerRef);

  return (
    <section ref={containerRef} className="min-h-[90vh] max-w-5xl mx-auto pt-10 relative overflow-hidden text-center">
      <div className="pointer-events-none absolute inset-0 opacity-40">
         <svg className="h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
           {[...Array(12)].map((_, i) => (
             <motion.line key={i} x1="0" y1={i * 8} x2="100" y2={i * 8 + 4} stroke="rgba(59, 130, 246, 0.08)" strokeWidth="0.1" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 15, repeat: Infinity, delay: i * 0.5 }} />
           ))}
         </svg>
      </div>
      <div className="relative z-10 mx-auto flex max-w-4xl flex-col items-center px-6">
        <div className="flex flex-col items-center space-y-10">
          <h2 className="reveal-text text-4xl md:text-5xl lg:text-6xl font-light tracking-tight leading-tight glass-text">
            Persistent intelligence for <br /> autonomous systems.
          </h2>
          <p className="reveal-text max-w-xl mx-auto font-light text-slate-500 leading-relaxed text-sm md:text-base">
            Deploy semantic memory infrastructure for contextual continuity, operational recall, and long-running AI execution.
          </p>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="flex flex-col items-center gap-4 pt-4 sm:flex-row sm:gap-6"
          >
            <Link 
              href="https://platform.zaby.io" 
              className="group relative flex w-full cursor-pointer items-center justify-center gap-3 rounded-full bg-(--color-button-primary-bg) px-8 py-6 text-md font-medium tracking-wide text-white shadow-[rgba(76,29,149,0.5)_0px_10px_30px_-10px] transition-all hover:bg-(--color-button-primary-hover) hover:shadow-[rgba(76,29,149,0.6)_0px_12px_34px_-10px] sm:w-auto z-20"
            >
              <Icon icon="solar:bolt-linear" width={18} height={18} />
              Initialize RENO Runtime
            </Link>
            <button className="group flex w-full cursor-pointer items-center justify-center gap-3 rounded-full border border-(--color-button-secondary-border) bg-(--color-button-secondary-bg) px-8 py-6 text-md font-medium text-(--color-button-secondary-text) backdrop-blur-md transition-all hover:bg-white sm:w-auto">
              Explore Semantic Infrastructure 
              <ArrowRight size={16} className=" transition-transform group-hover:translate-x-0.5" />
            </button>
          </motion.div>
        </div>
      </div>
      <div className="pointer-events-none absolute bottom-0 left-1/2 h-[400px] w-full -translate-x-1/2 bg-gradient-to-t from-blue-500/[0.06] to-transparent blur-[80px]" />
    </section>
  );
};

// --- Main Component ---

export function AiMemoryPreview() {
  return (
    <div className="bg-white min-h-screen text-slate-700 antialiased selection:bg-blue-500/20 selection:text-blue-500 p-10">
      <AiMemorySectionOne />
      <MemoryArchitectureSection />
      {/* <MemoryStackSection /> */}
      <VideoExplainerSection />
      {/* -------------------- SECTION 6: CTA BANNER WITH INTERACTIVE SHADER -------------------- */}
      <footer className="w-full relative z-10 mt-6 flex flex-col gap-6">
        <HeroLiquidMetalRoot
          title="Persistent intelligence"
          subtitle="for autonomous systems."
          description="Deploy semantic memory infrastructure for contextual continuity, operational recall, and long-running AI execution."
          width={1280}
          height={720}
          image="https://shaders.paper.design/images/logos/diamond.svg"
          colorBack="#ffffff00"
          colorTint="#2c5d72"
          shape={undefined}
          repetition={6}
          softness={0.8}
          shiftRed={1}
          shiftBlue={-1}
          distortion={0.4}
          contour={0.4}
          angle={0}
          speed={1}
          scale={0.6}
          fit="contain"
          className="w-full rounded-2xl bg-purple-500/5 backdrop-blur-lg text-white border border-purple-500/50 relative overflow-hidden shadow-2xl min-h-[320px] h-auto flex flex-col justify-between p-6 md:p-8"
        >
          <HeroLiquidMetalContainer className="relative z-10 grid gap-6 pb-0 sm:pb-0 lg:pb-0 sm:gap-6 lg:grid-cols-[1.4fr_0.6fr] lg:items-center lg:gap-8 w-full max-w-none px-0">
            <HeroLiquidMetalContent className="p-0 sm:px-0 md:px-0 lg:pr-0 lg:pl-0 xl:pl-0 2xl:pl-0 text-left items-start gap-3">
              <HeroLiquidMetalHeading 
                className="text-left pt-0 sm:pt-0 lg:pt-0"
                headingClassName="text-2xl md:text-3xl lg:text-3xl !text-black xl:text-3xl 2xl:text-3xl font-light leading-tight tracking-tight text-white text-left lg:text-left pt-0 sm:pt-0" 
              />
              <HeroLiquidMetalDescription 
                className="text-left mx-0 max-w-none pb-0 sm:pb-0 lg:pb-0"
                descriptionClassName="text-gray-500 font-light text-xs md:text-sm leading-relaxed max-w-lg text-left lg:text-left" 
              />
              
              <div className="relative z-10 flex flex-wrap gap-3 pt-4 border-t border-white/10 mt-2 w-full justify-start">
                <Link 
                  href="https://platform.zaby.io/signup"
                  className="group relative flex w-full cursor-pointer items-center justify-center gap-3 rounded-full bg-(--color-button-primary-bg) px-6 py-3.5 text-md font-medium tracking-wide text-white shadow-[rgba(76,29,149,0.5)_0px_10px_30px_-10px] transition-all hover:bg-(--color-button-primary-hover) hover:shadow-[rgba(76,29,149,0.6)_0px_12px_34px_-10px] sm:w-auto"
                >
                  Initialize RENO Runtime
                  <Icon icon="solar:arrow-right-linear" />
                </Link>
                <Link 
                  href="https://platform.zaby.io/signup"
                  className="flex w-full cursor-pointer items-center justify-center gap-3 rounded-full border border-(--color-button-secondary-border) bg-(--color-button-secondary-bg) px-8 py-3.5 font-medium text-(--color-button-secondary-text) transition-all hover:bg-[#e9d5ff] sm:w-auto"
                >
                  Explore Infrastructure
                </Link>
              </div>
            </HeroLiquidMetalContent>
            <HeroLiquidMetalVisual className="h-[200px] lg:h-[240px] xl:h-[310px] relative" />
          </HeroLiquidMetalContainer>
          <HeroLiquidMetalMobileVisual />
        </HeroLiquidMetalRoot>
      </footer>
    </div>
  );
}
