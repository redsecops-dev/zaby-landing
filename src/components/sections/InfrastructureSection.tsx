"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Terminal, Activity, Database, Cpu, ShieldCheck } from "lucide-react";
import { cn } from "@/lib/utils";

// ─── Types ────────────────────────────────────────────────────────────────────

interface InfrastructureCard {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  status: string;
  icon: React.ElementType;
  accent: "fuchsia" | "blue" | "teal";
  metrics?: { label: string; value: string }[];
}

const CARDS: InfrastructureCard[] = [
  {
    id: "execution-core",
    title: "Execution Core",
    subtitle: "Authorized",
    description: "Centralized runtime managing task queues, agent state, and operational continuity across all execution shards.",
    status: "Live",
    icon: Cpu,
    accent: "blue",
    metrics: [{ label: "Throughput", value: "1.2k req/s" }, { label: "Latency", value: "12ms" }]
  },
  {
    id: "workflow-engine",
    title: "Workflow Engine",
    subtitle: "Orchestrator",
    description: "Reasoning-based orchestration, scheduling, and retry logic for complex multi-agent pipelines and cross-process coordination.",
    status: "Active",
    icon: Activity,
    accent: "fuchsia",
    metrics: [{ label: "Active Pipelines", value: "482" }, { label: "Success Rate", value: "99.9%" }]
  },
  {
    id: "memory-store",
    title: "Memory Store",
    subtitle: "Semantic Retrieval",
    description: "Vector storage and semantic retrieval for persistent agent intelligence, long-term context retention, and shared knowledge bases.",
    status: "Syncing",
    icon: Database,
    accent: "teal",
    metrics: [{ label: "Vector Count", value: "8.4M" }, { label: "Recall Rate", value: "94%" }]
  },
  {
    id: "agent-runtime",
    title: "Agent Runtime",
    subtitle: "Lifecycle Management",
    description: "Isolated execution environments for autonomous agents with dedicated memory pools and sandboxed computational resources.",
    status: "Active",
    icon: Terminal,
    accent: "blue",
    metrics: [{ label: "Instances", value: "12,402" }, { label: "Uptime", value: "99.99%" }]
  },
  {
    id: "enterprise-node",
    title: "Enterprise Node",
    subtitle: "Dedicated Cluster",
    description: "Isolated, high-performance infrastructure clusters with dedicated compute and secure private networking for enterprise workloads.",
    status: "Secure",
    icon: ShieldCheck,
    accent: "teal",
    metrics: [{ label: "Encryption", value: "AES-256" }, { label: "Compliance", value: "SOC2" }]
  }
];

// ─── Components ──────────────────────────────────────────────────────────────

export function InfrastructureSection() {
  const [centerIndex, setCenterIndex] = useState(0);

  const handleNext = () => setCenterIndex((prev) => (prev + 1) % CARDS.length);
  const handlePrev = () => setCenterIndex((prev) => (prev - 1 + CARDS.length) % CARDS.length);

  // Determine slot positions for each card based on centerIndex
  const getCardSlot = (cardIndex: number) => {
    const diff = (cardIndex - centerIndex + CARDS.length) % CARDS.length;
    
    // We map the diff (0 to 4) to slots
    // 0 -> Center
    // 1 -> Right
    // 2 -> Far Right
    // 3 -> Far Left
    // 4 -> Left
    
    if (diff === 0) return "center";
    if (diff === 1) return "right";
    if (diff === 2) return "far-right";
    if (diff === 3) return "far-left";
    if (diff === 4) return "left";
    return "hidden";
  };

  const slotVariants = {
    "far-left": {
      x: "-120%",
      scale: 0.6,
      opacity: 0.2,
      zIndex: 10,
      filter: "blur(12px)",
      rotateY: 45,
    },
    "left": {
      x: "-70%",
      scale: 0.8,
      opacity: 0.6,
      zIndex: 20,
      filter: "blur(4px)",
      rotateY: 25,
    },
    "center": {
      x: "0%",
      scale: 1,
      opacity: 1,
      zIndex: 30,
      filter: "blur(0px)",
      rotateY: 0,
    },
    "right": {
      x: "70%",
      scale: 0.8,
      opacity: 0.6,
      zIndex: 20,
      filter: "blur(4px)",
      rotateY: -25,
    },
    "far-right": {
      x: "120%",
      scale: 0.6,
      opacity: 0.2,
      zIndex: 10,
      filter: "blur(12px)",
      rotateY: -45,
    },
    "hidden": {
      scale: 0.4,
      opacity: 0,
      zIndex: 0,
    }
  };

  return (
    <section className="relative py-24 md:py-32 overflow-hidden bg-white selection:bg-fuchsia-100">
      <div className="max-w-7xl mx-auto px-6 text-center mb-16 md:mb-24">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neutral-100 border border-neutral-200 mb-6">
          <span className="w-1.5 h-1.5 rounded-full bg-fuchsia-500" />
          <span className="text-xs font-semibold uppercase tracking-widest text-neutral-600">Infrastructure</span>
        </div>
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-neutral-900 mb-6">
          The Foundation of <span className="text-fuchsia-600">Autonomous</span> Execution
        </h2>
        <p className="text-lg text-neutral-500 max-w-2xl mx-auto">
          Zaby's platform is built on a high-performance stack designed for persistent memory, reasoning-based orchestration, and continuous agent operation.
        </p>
      </div>

      {/* Carousel Container */}
      <div className="relative h-[600px] md:h-[700px] flex items-center justify-center perspective-[2000px]">
        <div className="absolute inset-0 flex items-center justify-center">
          <AnimatePresence initial={false}>
            {CARDS.map((card, index) => {
              const slot = getCardSlot(index);
              return (
                <motion.div
                  key={card.id}
                  initial={false}
                  animate={slot}
                  variants={slotVariants}
                  transition={{
                    type: "spring",
                    stiffness: 260,
                    damping: 28,
                    mass: 1.2
                  }}
                  className="absolute w-[320px] md:w-[380px] h-[480px] md:h-[540px] cursor-pointer"
                  onClick={() => {
                    if (slot === "left" || slot === "far-left") handlePrev();
                    if (slot === "right" || slot === "far-right") handleNext();
                  }}
                  drag="x"
                  dragConstraints={{ left: 0, right: 0 }}
                  onDragEnd={(_, info) => {
                    if (info.offset.x > 50) handlePrev();
                    if (info.offset.x < -50) handleNext();
                  }}
                >
                  <InfrastructureCard card={card} isActive={slot === "center"} />
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-center gap-6 mt-12">
        <button 
          onClick={handlePrev}
          className="w-12 h-12 rounded-full border border-neutral-200 flex items-center justify-center hover:bg-neutral-50 hover:border-fuchsia-200 transition-all text-neutral-400 hover:text-fuchsia-600 group"
        >
          <ArrowRight className="w-5 h-5 rotate-180 transition-transform group-active:-translate-x-1" />
        </button>
        <div className="flex gap-2">
          {CARDS.map((_, i) => (
            <button
              key={i}
              onClick={() => setCenterIndex(i)}
              className={cn(
                "h-1.5 rounded-full transition-all duration-300",
                centerIndex === i ? "w-8 bg-fuchsia-600" : "w-2 bg-neutral-200 hover:bg-neutral-300"
              )}
            />
          ))}
        </div>
        <button 
          onClick={handleNext}
          className="w-12 h-12 rounded-full border border-neutral-200 flex items-center justify-center hover:bg-neutral-50 hover:border-fuchsia-200 transition-all text-neutral-400 hover:text-fuchsia-600 group"
        >
          <ArrowRight className="w-5 h-5 transition-transform group-active:translate-x-1" />
        </button>
      </div>
    </section>
  );
}

function InfrastructureCard({ card, isActive }: { card: InfrastructureCard; isActive: boolean }) {
  const Icon = card.icon;
  
  const accentColors = {
    fuchsia: "from-fuchsia-500 to-purple-600 bg-fuchsia-500 text-fuchsia-600",
    blue: "from-blue-500 to-indigo-600 bg-blue-500 text-blue-600",
    teal: "from-teal-400 to-emerald-600 bg-teal-500 text-teal-600",
  };

  const currentAccent = accentColors[card.accent];

  return (
    <div className={cn(
      "w-full h-full rounded-[2.5rem] p-8 md:p-10 flex flex-col bg-white border transition-all duration-500 overflow-hidden",
      isActive 
        ? "border-neutral-200 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.12)]" 
        : "border-neutral-100 shadow-sm"
    )}>
      {/* Glossy Overlay */}
      <div className="absolute inset-0 bg-linear-to-br from-white/40 via-transparent to-transparent pointer-events-none" />
      
      {/* Card Header */}
      <div className="flex items-center justify-between mb-10 relative">
        <div className="flex items-center gap-4">
          <div className={cn("w-12 h-12 rounded-2xl flex items-center justify-center bg-linear-to-br text-white shadow-lg", currentAccent.split(' ').slice(0, 2).join(' '))}>
            <Icon className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-neutral-900">{card.title}</h3>
            <p className="text-xs font-semibold uppercase tracking-widest text-neutral-400">{card.subtitle}</p>
          </div>
        </div>
        <div className={cn("px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border", 
          card.status === "Live" ? "bg-emerald-50 text-emerald-600 border-emerald-100" : "bg-blue-50 text-blue-600 border-blue-100"
        )}>
          {card.status}
        </div>
      </div>

      {/* Description */}
      <p className="text-neutral-500 text-[15px] leading-relaxed mb-10 relative">
        {card.description}
      </p>

      {/* Visual / Chart Area */}
      <div className="flex-1 relative mb-8 rounded-3xl bg-neutral-50/50 border border-neutral-100 overflow-hidden p-6 flex items-center justify-center">
        {/* Placeholder for specific visuals like the wave chart in screenshot */}
        {card.id === "execution-core" && (
          <div className="w-full h-full flex flex-col">
            <div className="flex justify-between items-end mb-4">
              <span className="text-xs font-bold text-neutral-400 flex items-center gap-1">
                <div className="w-2 h-2 rounded-full bg-blue-500" /> Activity
              </span>
              <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest">Live</span>
            </div>
            <div className="flex-1 flex items-end gap-1.5 px-2">
              {[40, 60, 45, 90, 65, 80, 50, 70, 40, 85, 55, 75].map((h, i) => (
                <motion.div 
                  key={i}
                  initial={{ height: 0 }}
                  animate={{ height: `${h}%` }}
                  transition={{ delay: i * 0.05, duration: 1, repeat: Infinity, repeatType: "reverse" }}
                  className="flex-1 bg-linear-to-t from-blue-500 to-indigo-400 rounded-t-sm"
                />
              ))}
            </div>
          </div>
        )}

        {card.id === "workflow-engine" && (
          <div className="w-full h-full flex flex-col justify-center gap-4">
            {[0, 1, 2].map(i => (
              <div key={i} className="h-3 w-full bg-neutral-200 rounded-full overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: `${70 + i * 10}%` }}
                  transition={{ duration: 1.5, delay: i * 0.2 }}
                  className="h-full bg-linear-to-r from-fuchsia-500 to-purple-500"
                />
              </div>
            ))}
          </div>
        )}

        {(card.id === "memory-store" || card.id === "agent-runtime" || card.id === "enterprise-node") && (
          <div className="grid grid-cols-2 gap-4 w-full">
            {card.metrics?.map((m, i) => (
              <div key={i} className="p-4 rounded-2xl bg-white border border-neutral-100 shadow-sm">
                <p className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest mb-1">{m.label}</p>
                <p className="text-lg font-bold text-neutral-900">{m.value}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Buttons */}
      <div className="flex gap-3 relative">
        <button className="flex-1 py-3.5 rounded-2xl border border-neutral-200 text-xs font-bold text-neutral-600 hover:bg-neutral-50 transition-colors">
          Inspect
        </button>
        <button className={cn("flex-1 py-3.5 rounded-2xl text-xs font-bold text-white shadow-lg transition-transform active:scale-95", 
          currentAccent.split(' ').slice(0, 2).join(' ')
        )}>
          Deploy
        </button>
      </div>
    </div>
  );
}
