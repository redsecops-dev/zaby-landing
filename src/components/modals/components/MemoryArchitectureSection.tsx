"use client";

import React from "react";
import { Icon } from "@iconify/react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { useScrollTriggerAnimation } from "@/lib/gsap-utils";

interface ArchitectureNode {
  id: string;
  title: string;
  desc: string;
  icon: string;
  color: string;
  lane: string;
  runtime: string;
}

const ARCHITECTURE_NODES: ArchitectureNode[] = [
  {
    id: "CORE",
    title: "RENO Runtime Core",
    desc: "The central nervous system of Zaby. It orchestrates real-time synchronization between disparate memory layers, ensuring a unified stream of consciousness for AI agents.",
    icon: "solar:database-bold-duotone",
    color: "#3b82f6",
    lane: "ORCHESTRATION",
    runtime: "core.v2",
  },
  {
    id: "01",
    title: "Knowledge Base (KB)",
    desc: "Deep-layer vector storage for persistent organizational intelligence. It provides the grounding required for agents to act with accuracy and authority.",
    icon: "solar:library-bold-duotone",
    color: "#22c55e",
    lane: "VECTOR",
    runtime: "embedding.idx",
  },
  {
    id: "02",
    title: "Skills",
    desc: "A library of reusable procedural workflows and specialized operational logic. Skills allow agents to transform simple instructions into complex, multi-step actions.",
    icon: "solar:magic-stick-3-bold-duotone",
    color: "#6366f1",
    lane: "PROCEDURAL",
    runtime: "workflow.exec",
  },
  {
    id: "03",
    title: "Tools",
    desc: "Operational endpoints and API gateways. This layer allows agents to interact with the physical and digital world, from database operations to external software integrations.",
    icon: "solar:settings-minimalistic-bold-duotone",
    color: "#f59e0b",
    lane: "ENDPOINT",
    runtime: "api.gateway",
  },
  {
    id: "04",
    title: "MCP Runtime",
    desc: "The coordination protocol that manages external tool discovery and secure execution, ensuring agents can safely navigate complex software environments.",
    icon: "solar:cpu-bolt-bold-duotone",
    color: "#3b82f6",
    lane: "EXECUTION",
    runtime: "coordination.v2",
  },
  {
    id: "05",
    title: "Context Injection",
    desc: "The semantic assembly engine. It dynamically retrieves and ranks context from all layers, composing the optimal prompt for the agent's current task.",
    icon: "solar:layers-minimalistic-bold-duotone",
    color: "#06b6d4",
    lane: "ASSEMBLY",
    runtime: "prompt.compose",
  },
  {
    id: "06",
    title: "Episodic Memory",
    desc: "The long-term experiential record. It captures past outcomes, human feedback, and decision logic to ensure continuous improvement and contextual recall.",
    icon: "solar:history-bold-duotone",
    color: "#ec4899",
    lane: "EPISODIC",
    runtime: "continuity.log",
  },
];



const FeatureCard = ({ node, index }: { node: ArchitectureNode; index: number }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, delay: index * 0.1, ease: "easeOut" }}
      className="group relative w-full"
    >
      <div className="relative overflow-hidden rounded-[2.5rem] border border-slate-200 bg-white p-8 transition-all duration-500 hover:border-blue-500/20">
        {/* Subtle background glow */}
        <div 
          className="absolute -right-20 -top-20 h-64 w-64 rounded-full blur-[80px] transition-opacity duration-500 opacity-[0.03] group-hover:opacity-[0.08]"
          style={{ backgroundColor: node.color }}
        />

        <div className="relative z-10 flex flex-col gap-8 md:flex-row md:items-center">
          {/* Icon Section */}
          <div 
            className="flex h-20 w-20 flex-shrink-0 items-center justify-center rounded-3xl border transition-transform duration-500 group-hover:scale-110"
            style={{ 
              backgroundColor: `${node.color}08`,
              borderColor: `${node.color}15`,
              color: node.color
            }}
          >
            <Icon icon={node.icon} className="text-4xl" />
          </div>

          {/* Content Section */}
          <div className="flex-1 space-y-3">
            <div className="flex items-center gap-3">
              <span className="font-mono text-[10px] font-bold tracking-[0.2em] text-slate-400 uppercase">
                {node.lane}
              </span>
              <span className="h-3 w-px bg-slate-200" />
              <span className="font-mono text-[10px] text-slate-400">
                {node.runtime}
              </span>
            </div>
            
            <h3 className="text-2xl font-semibold tracking-tight text-slate-900">
              {node.title}
            </h3>
            
            <p className="max-w-2xl text-base font-light leading-relaxed text-slate-500">
              {node.desc}
            </p>
          </div>

          {/* Right Status Indicator (Desktop only) */}
          <div className="hidden shrink-0 flex-col items-end gap-2 text-right md:flex">
             <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/5 border border-emerald-500/10">
                <div className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-[10px] font-bold uppercase tracking-widest text-emerald-600">Active</span>
             </div>
             <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest">Runtime Secure</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default function MemoryArchitectureSection() {
  const containerRef = React.useRef<HTMLElement>(null);

  useScrollTriggerAnimation(containerRef);

  return (
    <section ref={containerRef} className="relative bg-white px-6 py-32 lg:px-8">
      {/* Background patterns */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 opacity-[0.015] bg-[linear-gradient(to_right,#000_1px,transparent_1px),linear-gradient(to_bottom,#000_1px,transparent_1px)] bg-[size:40px_40px]" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-gradient-to-b from-blue-50/[0.2] via-transparent to-transparent" />
      </div>

      <div className="relative z-10 mx-auto max-w-5xl">
        <div className="mb-20 flex flex-col items-center text-center">
          
          <h2 className="reveal-text text-4xl md:text-5xl font-light tracking-tight leading-tight glass-text">
            The Anatomy of <span className="bg-linear-to-br from-accent via-[#c026d3] to-accent-soft bg-clip-text text-transparent font-light">Intelligence.</span>
          </h2>
          
          <p className="reveal-text mt-6 max-w-2xl text-lg font-light leading-relaxed text-slate-500">
            RENO orchestrates multiple persistent memory layers to deliver accurate, 
            contextual, and continuously improving AI operations.
          </p>
        </div>

        <div className="flex flex-col gap-6">
          {ARCHITECTURE_NODES.map((node, i) => (
            <FeatureCard key={node.id} node={node} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
