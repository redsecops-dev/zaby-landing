"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Icon } from "@iconify/react";
import { cn } from "@/lib/utils";

// ─── Glassmorphism Premium Helper ─────────────────────────────────────────────
// ... rest of imports/helpers ...

// ─── Glassmorphism Premium Helper ─────────────────────────────────────────────

const GLASS_STYLES = {
  // Premium frosted glass - center card
  premiumCenter: "bg-white/80 backdrop-blur-2xl",
  // Mid-range glass - adjacent cards
  premiumMid: "bg-white/75 backdrop-blur-xl",
  // Subtle glass - far cards
  premiumFar: "bg-white/70 backdrop-blur-lg",
  // Layered illuminated border with glow
  premiumBorder: "border border-white/40 shadow-[inset_0_1px_2px_rgba(255,255,255,0.4),inset_0_-1px_2px_rgba(0,0,0,0.05),0_0_20px_rgba(59,130,246,0.1)]",
  // Side card softer border
  sideBorder: "border border-white/30 shadow-[inset_0_1px_1px_rgba(255,255,255,0.3),0_0_12px_rgba(59,130,246,0.05)]",
};

type BorderTone = "blue" | "fuchsia" | "teal" | "indigo" | "emerald";

const BORDER_TONE_STYLES: Record<BorderTone, string> = {
  blue: "from-blue-300/45 via-blue-200/18 to-indigo-300/30",
  fuchsia: "from-fuchsia-300/45 via-fuchsia-200/18 to-pink-300/30",
  teal: "from-teal-300/45 via-teal-200/18 to-cyan-300/30",
  indigo: "from-indigo-300/45 via-indigo-200/18 to-blue-300/30",
  emerald: "from-emerald-300/45 via-emerald-200/18 to-teal-300/30",
};

const BORDER_FRAME_STYLES: Record<BorderTone, string> = {
  blue: "border-blue-200/55 shadow-[inset_0_0_0_1px_rgba(191,219,254,0.45),0_8px_20px_rgba(59,130,246,0.12)]",
  fuchsia: "border-fuchsia-200/55 shadow-[inset_0_0_0_1px_rgba(245,208,254,0.45),0_8px_20px_rgba(217,70,239,0.12)]",
  teal: "border-teal-200/55 shadow-[inset_0_0_0_1px_rgba(153,246,228,0.45),0_8px_20px_rgba(20,184,166,0.12)]",
  indigo: "border-indigo-200/55 shadow-[inset_0_0_0_1px_rgba(199,210,254,0.45),0_8px_20px_rgba(99,102,241,0.12)]",
  emerald: "border-emerald-200/55 shadow-[inset_0_0_0_1px_rgba(167,243,208,0.45),0_8px_20px_rgba(16,185,129,0.12)]",
};

function SleekCardBorder({ tone = "blue" }: { tone?: BorderTone }) {
  return (
    <>
      <div
        className={cn(
          "absolute inset-0 rounded-[2.5rem] pointer-events-none bg-linear-to-br z-2",
          BORDER_TONE_STYLES[tone]
        )}
      />
      <div className="absolute inset-px rounded-[calc(2.5rem-1px)] pointer-events-none bg-white/78 z-2" />
      <div
        className={cn(
          "absolute inset-px rounded-[calc(2.5rem-1px)] pointer-events-none border z-3",
          BORDER_FRAME_STYLES[tone]
        )}
      />
      <div className="absolute inset-0.5 rounded-[calc(2.5rem-2px)] pointer-events-none border border-white/45 z-3" />
      <div
        className={cn(
          "absolute inset-x-8 top-0 h-px pointer-events-none bg-linear-to-r from-transparent to-transparent z-4 opacity-80",
          BORDER_TONE_STYLES[tone]
        )}
      />
      <div className="absolute inset-x-10 bottom-0 h-px pointer-events-none bg-linear-to-r from-transparent via-black/16 to-transparent z-4" />
      <div
        className={cn(
          "absolute top-8 bottom-8 left-0 w-px pointer-events-none bg-linear-to-b from-transparent to-transparent z-4 opacity-70",
          BORDER_TONE_STYLES[tone]
        )}
      />
    </>
  );
}

// ─── Types ───────────────────────────────────────────────────────────────────

type CardType = "flow" | "throughput" | "engine" | "efficiency" | "facility";

interface CardData {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  icon?: string;
  bgImage?: string;
  type: CardType;
}

// ─── Data ────────────────────────────────────────────────────────────────────

const CARDS_DATA: CardData[] = [
  {
    id: 1,
    title: "Agent Runtime",
    subtitle: "Lifecycle Management",
    description: "Execution lifecycle management across globally distributed agent instances.",
    icon: "solar:routing-2-linear",
    bgImage: "https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/e534354d-c5f2-4399-a1d9-2f50338e8c47_1600w.jpg",
    type: "flow",
  },
  {
    id: 2,
    title: "Workflow Engine",
    subtitle: "Orchestrator",
    description: "Orchestration, scheduling, and retry logic for complex multi-agent pipelines.",
    type: "throughput",
  },
  {
    id: 3,
    title: "Execution Core",
    subtitle: "Authorized",
    description: "Centralized runtime managing task queues, agent state, and operational continuity across all execution shards.",
    type: "engine",
  },
  {
    id: 4,
    title: "Memory Store",
    subtitle: "Semantic Retrieval",
    description: "Vector storage and semantic retrieval for persistent agent intelligence across sessions.",
    icon: "solar:settings-linear",
    type: "efficiency",
  },
  {
    id: 5,
    title: "Enterprise Node",
    subtitle: "Dedicated Cluster",
    description: "Isolated, high-performance infrastructure clusters with dedicated compute and secure networking.",
    icon: "solar:server-square-linear",
    bgImage: "https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/7f78131e-65e9-49b2-aa1f-ccc33e28df9f_1600w.webp",
    type: "facility",
  },
];

// ─── Sub-Components (Preserving Original UI) ──────────────────────────────────

function ThroughputCard() {
  return (
    <div className={cn(
      "relative w-full h-full rounded-[2.5rem] p-6 md:p-8 flex flex-col justify-between",
      "overflow-hidden",
      GLASS_STYLES.premiumCenter,
      GLASS_STYLES.premiumBorder,
      // Layered shadow system - ambient + depth + glow
      "shadow-[0_20px_60px_rgba(0,0,0,0.08),0_8px_24px_rgba(59,130,246,0.06),inset_0_1px_2px_rgba(255,255,255,0.4)]",
      // Soft inner luminous effect
      "before:absolute before:inset-0 before:rounded-[2.5rem] before:pointer-events-none before:opacity-30",
      "before:bg-linear-to-b before:from-white/20 before:via-transparent before:to-transparent"
    )}>
      <SleekCardBorder tone="fuchsia" />

      {/* Premium ambient glow background */}
      <div className="absolute inset-0 rounded-[2.5rem] pointer-events-none">
        <div className="absolute -inset-8 bg-linear-to-br from-blue-300/0 via-blue-200/0 to-blue-100/0 blur-3xl opacity-0 group-hover:opacity-20 transition-opacity duration-500" />
      </div>

      <div className="relative z-10">
        <div className="flex items-center gap-3 mb-4">
          <div className={cn(
            "w-10 h-10 rounded-xl bg-fuchsia-500 flex items-center justify-center text-white",
            "shadow-[0_8px_16px_rgba(232,121,249,0.3),inset_0_1px_2px_rgba(255,255,255,0.3)]",
            "ring-1 ring-fuchsia-400/50"
          )}>
            <Icon icon="solar:graph-up-linear" width={20} />
          </div>
          <div>
            <h3 className="text-xl font-bold tracking-tight text-slate-900 leading-none">Workflow Engine</h3>
            <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-500 mt-1.5">Orchestrator</p>
          </div>
        </div>
        <p className="text-sm leading-relaxed text-slate-600 font-medium">
          Orchestration, scheduling, and retry logic for complex multi-agent pipelines.
        </p>
      </div>

      <div className="relative z-10 flex items-end justify-between h-24 gap-0.75 mt-6 mb-2 px-1 rounded-3xl bg-fuchsia-50/70 border border-fuchsia-200/50">
        {[40, 70, 50, 100, 30, 60, 85, 45, 75].map((height, i) => (
          <motion.div
            key={i}
            initial={{ scaleY: 0.5 }}
            animate={{ scaleY: [0.5, 1.2, 0.8, 1.1, 0.5] }}
            transition={{ duration: 2 + i * 0.2, repeat: Infinity, ease: "easeInOut" }}
            className={cn(
              "w-2 rounded-full origin-bottom",
              "shadow-[0_0_10px_rgba(232,121,249,0.55)]",
              height === 100 ? "shadow-[0_0_16px_rgba(232,121,249,0.75)]" : ""
            )}
            style={{
              height: `${height}%`,
              backgroundColor:
                height === 100
                  ? "rgba(217,70,239,1)"
                  : `rgba(217,70,239,${Math.max(0.55, (height / 100) * 0.9)})`,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 space-y-2 mt-auto">
        <div className={cn(
          "bg-linear-to-r from-slate-50/60 to-slate-50/40 rounded-full px-4 py-2.5 flex justify-between items-center text-xs",
          "border border-slate-200/40 backdrop-blur-sm",
          "shadow-[inset_0_1px_2px_rgba(255,255,255,0.3)]"
        )}>
          <span className="text-slate-600 font-semibold">Active Agents</span>
          <span className="font-bold text-slate-800">942 / hr</span>
        </div>
        <div className={cn(
          "bg-linear-to-r from-slate-50/60 to-slate-50/40 rounded-full px-4 py-2.5 flex justify-between items-center text-xs",
          "border border-slate-200/40 backdrop-blur-sm",
          "shadow-[inset_0_1px_2px_rgba(255,255,255,0.3)]"
        )}>
          <span className="text-slate-600 font-semibold">Avg. Task Time</span>
          <span className="font-bold text-slate-800">415 ms</span>
        </div>
      </div>
    </div>
  );
}

function CoreEngineCard() {
  return (
    <div className={cn(
      "relative w-full h-full rounded-[2.5rem] p-7 md:p-9 flex flex-col overflow-hidden",
      GLASS_STYLES.premiumCenter,
      // Premium layered border with illuminated edges
      "border border-white/55 shadow-[inset_0_1px_3px_rgba(255,255,255,0.5),inset_0_-1px_3px_rgba(0,0,0,0.08),0_20px_60px_rgba(59,130,246,0.12),0_0_1px_rgba(59,130,246,0.2)]",
      // Active card glow - smooth cinematic lighting
      "before:absolute before:inset-0 before:rounded-[2.5rem] before:pointer-events-none",
      "before:bg-linear-to-b before:from-white/30 before:via-transparent before:to-transparent before:opacity-25"
    )}>
      <SleekCardBorder tone="blue" />

      {/* Ambient glow effect around center card */}
      <div className="absolute -inset-12 pointer-events-none overflow-hidden rounded-full">
        <motion.div 
          animate={{ opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 3, repeat: Infinity }}
          className="absolute inset-0 bg-linear-to-r from-blue-300/20 via-transparent to-indigo-300/20 blur-2xl"
        />
      </div>

      <div className="flex justify-end absolute top-6 right-6 z-20">
        <Icon icon="solar:menu-dots-circle-linear" className="text-slate-500 hover:text-slate-700 cursor-pointer transition-colors" width={24} height={24} />
      </div>
      
      <div className="flex items-center gap-3 mb-8 relative z-10">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/77415a2e-dcbc-4748-a29d-fced4821881a_1600w.jpg"
          alt="User"
          className="w-10 h-10 rounded-full object-cover border-2 border-white/50 shadow-md ring-1 ring-white/30"
        />
        <div className="flex flex-col">
          <span className="text-sm font-bold text-slate-900 leading-none">Execution Core</span>
          <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-500 mt-1.5">Authorized</span>
        </div>
      </div>

      <h2 className="text-3xl font-bold tracking-tight text-slate-950 mb-3 relative z-10">Execution Core</h2>
      <p className="text-sm leading-relaxed text-slate-700 mb-8 font-medium relative z-10">
        Centralized runtime managing task queues, agent state, and operational continuity across all execution shards.
      </p>

      <div className={cn(
        "relative z-10 grow bg-white/92 backdrop-blur-md rounded-4xl p-6 overflow-hidden",
        "flex flex-col justify-between mb-8",
        "border border-slate-200/60 shadow-[inset_0_1px_2px_rgba(255,255,255,0.45),inset_0_-1px_1px_rgba(0,0,0,0.03)]"
      )}>
        <div className="flex justify-between items-center relative z-10">
          <div className="flex items-center gap-2">
            <motion.div 
              animate={{ opacity: [0.4, 1, 0.4] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className={cn(
                "w-2 h-2 rounded-full bg-blue-500",
                "shadow-[0_0_10px_rgba(59,130,246,0.6)]"
              )}
            />
            <span className="font-bold text-xs text-slate-900 tracking-tight uppercase">Activity</span>
          </div>
          <div className="text-[10px] font-semibold text-slate-600 uppercase tracking-wider">Live</div>
        </div>

        <div className="relative h-24 mt-4 w-full">
          <svg className="absolute inset-0 w-full h-full overflow-visible" viewBox="0 0 100 40" preserveAspectRatio="none">
            <defs>
              <filter id="graphGlow" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur in="SourceGraphic" stdDeviation="1.5" />
              </filter>
            </defs>
            <path d="M0,20 Q20,30 40,15 T70,25 T100,15" fill="none" stroke="currentColor" strokeWidth="1.4" className="text-slate-300" />
            <motion.path
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 2, ease: "easeInOut" }}
              d="M0,25 Q15,10 30,22 T55,10 T75,25 T100,18"
              fill="none"
              stroke="currentColor"
              strokeWidth="3.2"
              className="text-blue-600 drop-shadow-lg"
              filter="url(#graphGlow)"
            />
            {[30, 55, 75].map((cx, i) => (
              <motion.circle 
                key={i} 
                cx={cx} 
                cy={cx === 30 ? 22 : cx === 55 ? 10 : 25} 
                r="4.2" 
                initial={{ scale: 0 }}
                animate={{ scale: [1, 1.4, 1] }}
                transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.3 }}
                fill="currentColor" 
                stroke="white" 
                strokeWidth="2" 
                className="text-blue-600 drop-shadow-lg" 
              />
            ))}
          </svg>
        </div>
      </div>

      <div className="flex gap-3 relative z-10">
        <button 
          suppressHydrationWarning
          className={cn(
            "flex-1 text-slate-700 text-xs font-bold py-3.5 rounded-2xl transition-all",
            "bg-white/70 hover:bg-white/90 active:scale-95",
            "border border-slate-200/60 backdrop-blur-sm",
            "shadow-[0_4px_12px_rgba(0,0,0,0.05),inset_0_1px_2px_rgba(255,255,255,0.3)]"
          )}
        >
          Inspect
        </button>
        <button 
          suppressHydrationWarning
          className={cn(
            "flex-1 bg-linear-to-r from-blue-600 to-indigo-600 text-white text-xs font-bold py-3.5 rounded-2xl",
            "transition-all active:scale-95",
            "hover:from-blue-500 hover:to-indigo-500 hover:shadow-lg hover:shadow-blue-300/50",
            "shadow-[0_8px_24px_rgba(59,130,246,0.3)]",
            "border border-blue-500/30"
          )}
        >
          Deploy
        </button>
      </div>
    </div>
  );
}

// ─── Main Section Export ─────────────────────────────────────────────────────

export function DataSynchronySection() {
  const [centerIndex, setCenterIndex] = useState(2); // Start with Execution Core in center
  const [isPaused, setIsPaused] = useState(false);

  const handleNext = useCallback(() => {
    setCenterIndex((prev) => (prev + 1) % CARDS_DATA.length);
  }, []);

  const handlePrev = useCallback(() => {
    setCenterIndex((prev) => (prev - 1 + CARDS_DATA.length) % CARDS_DATA.length);
  }, []);

  // Auto-scroll logic
  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      handleNext();
    }, 3000); // Increased speed: Swipe every 3 seconds

    return () => clearInterval(interval);
  }, [isPaused, handleNext]);

  const getCardSlot = (cardIndex: number) => {
    const diff = (cardIndex - centerIndex + CARDS_DATA.length) % CARDS_DATA.length;
    if (diff === 0) return "center";
    if (diff === 1) return "right";
    if (diff === 2) return "far-right";
    if (diff === 3) return "far-left";
    if (diff === 4) return "left";
    return "hidden";
  };

  const slotVariants = {
    // ... variants unchanged ...
    "far-left": {
      x: "-110%",
      scale: 0.65,
      opacity: 2,
      zIndex: 10,
      filter: "blur(0px)",
      rotateY: 35,
    },
    "left": {
      x: "-65%",
      scale: 0.85,
      opacity: 2,
      zIndex: 20,
      filter: "blur(0px)",
      rotateY: 20,
    },
    "center": {
      x: "0%",
      scale: 1,
      opacity: 2,
      zIndex: 30,
      filter: "blur(0px)",
      rotateY: 0,
    },
    "right": {
      x: "65%",
      scale: 0.85,
      opacity: 2,
      zIndex: 20,
      filter: "blur(0px)",
      rotateY: -20,
    },
    "far-right": {
      x: "110%",
      scale: 0.65,
      opacity: 2,
      zIndex: 10,
      filter: "blur(0px)",
      rotateY: -35,
    },
    "hidden": {
      scale: 0.4,
      opacity: 0,
      zIndex: 0,
    }
  };

  return (
    <section 
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      className="relative w-full text-slate-800 antialiased py-24 md:py-32 px-4 md:px-8 overflow-hidden"
    >
      {/* Cinematic ambient lighting - subtle radial glows */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Center blue glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-200 h-200 bg-linear-to-r from-blue-500/5 via-transparent to-indigo-500/5 rounded-full blur-3xl" />
        {/* Top ambient */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-200/3 rounded-full blur-3xl" />
        {/* Right side subtle glow */}
        <div className="absolute bottom-1/4 right-0 w-150 h-150 bg-linear-to-l from-indigo-300/3 to-transparent rounded-full blur-3xl" />
      </div>

      {/* Hero header */}
      <div className="text-center w-full max-w-2xl mx-auto z-10 flex flex-col items-center">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className={cn(
            "inline-flex items-center gap-2 px-3 py-1 mb-6 rounded-full",
            "bg-white/60 backdrop-blur-sm border border-slate-200/60 shadow-sm",
            "hover:bg-white/70 hover:border-slate-300/60 transition-all"
          )}
        >
          <div className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse shadow-md shadow-blue-500/50" />
          <span className="text-xs font-bold uppercase tracking-widest text-slate-600">Runtime Architecture</span>
        </motion.div>
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-slate-950 mb-6"
        >
          Platform Infrastructure
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-lg text-slate-600 max-w-md mx-auto leading-relaxed font-medium"
        >
          Five interconnected runtime layers powering autonomous AI execution, orchestration, memory, and enterprise deployment.
        </motion.p>
      </div>

      {/* Cinematic Carousel Container */}
      <div className="relative h-132 md:h-175 flex items-center justify-center perspective-[2000px]">
        {/* Center card spotlight effect */}
        <div className="absolute inset-0 pointer-events-none">
          <motion.div 
            animate={{ 
              opacity: [0.4, 0.6, 0.4],
              scale: [1, 1.05, 1]
            }}
            transition={{ duration: 4, repeat: Infinity }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-125 h-125 bg-linear-to-br from-blue-400/10 via-transparent to-indigo-400/10 rounded-full blur-3xl"
          />
        </div>

        <div className="absolute inset-0 flex items-center justify-center">
          <AnimatePresence initial={false}>
            {CARDS_DATA.map((card, index) => {
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
                  className={cn(
                    "absolute w-80 md:w-95 h-120 md:h-135 cursor-pointer group",
                    slot !== "center" && "max-md:hidden"
                  )}
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
                  {card.type === "throughput" && <ThroughputCard />}
                  {card.type === "engine" && <CoreEngineCard />}
                  {card.type === "efficiency" && (
                    <div className={cn(
                      "relative w-full h-full rounded-[2.5rem] p-8 flex flex-col justify-between overflow-hidden",
                      "border border-white/45 shadow-[inset_0_1px_2px_rgba(255,255,255,0.3),0_12px_40px_rgba(20,184,166,0.08)]",
                      GLASS_STYLES.premiumMid,
                      // Subtle glow for side card
                      "before:absolute before:inset-0 before:rounded-[2.5rem] before:pointer-events-none",
                      "before:bg-linear-to-b before:from-white/20 before:via-transparent before:to-transparent before:opacity-25"
                    )}>
                      <SleekCardBorder tone="teal" />

                      {/* Teal ambient glow */}
                      <div className="absolute -inset-10 pointer-events-none rounded-full">
                        <div className="absolute inset-0 bg-linear-to-br from-teal-200/5 via-transparent to-cyan-200/5 blur-2xl opacity-60" />
                      </div>

                      <div className="flex justify-end w-full mb-2 relative z-10">
                        <div className="flex gap-1.5">
                          <div className="w-1.5 h-1.5 rounded-full bg-slate-300" />
                          <div className="w-1.5 h-1.5 rounded-full bg-teal-400 shadow-sm shadow-teal-400/50" />
                        </div>
                      </div>
                      <div className="relative z-10">
                        <div className="flex items-center gap-3 mb-4">
                          <div className={cn(
                            "w-10 h-10 rounded-xl bg-teal-500 flex items-center justify-center text-white",
                            "shadow-[0_8px_16px_rgba(20,184,166,0.25),inset_0_1px_2px_rgba(255,255,255,0.3)]",
                            "ring-1 ring-teal-400/50"
                          )}>
                            <Icon icon="solar:settings-linear" width={20} />
                          </div>
                          <div>
                            <h3 className="text-xl font-bold tracking-tight text-slate-900 leading-none">Memory Store</h3>
                            <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-500 mt-1.5">Semantic Retrieval</p>
                          </div>
                        </div>
                        <p className="text-sm leading-relaxed text-slate-600 font-medium">Vector storage and semantic retrieval for persistent agent intelligence.</p>
                      </div>
                      <div className={cn(
                        "bg-linear-to-br from-slate-50/70 to-slate-50/40 rounded-3xl p-5 mt-6 flex flex-col gap-5 relative z-10",
                        "border border-slate-200/30 backdrop-blur-sm",
                        "shadow-[inset_0_1px_2px_rgba(255,255,255,0.3)]"
                      )}>
                        <div className="w-full flex items-center justify-between text-xs">
                          <div className="flex items-center h-2 w-2/3 bg-slate-200/60 rounded-full overflow-hidden">
                            <motion.div 
                              initial={{ width: 0 }}
                              animate={{ width: "78%" }}
                              className="h-full bg-linear-to-r from-teal-400 to-teal-500 rounded-full shadow-md shadow-teal-400/30" 
                            />
                          </div>
                          <span className="text-slate-700 font-bold ml-3">78%</span>
                        </div>
                        <div className="w-full flex items-center justify-between text-xs">
                          <div className="flex items-center h-2 w-1/2 bg-slate-200/60 rounded-full overflow-hidden">
                            <motion.div 
                              initial={{ width: 0 }}
                              animate={{ width: "42%" }}
                              className="h-full bg-linear-to-r from-slate-400 to-slate-500 rounded-full shadow-sm shadow-slate-400/20" 
                            />
                          </div>
                          <span className="text-slate-700 font-bold ml-3">42%</span>
                        </div>
                      </div>
                      <div className="flex gap-3 mt-auto pt-6 relative z-10">
                        <div className={cn(
                          "w-12 h-12 rounded-2xl flex items-center justify-center text-slate-500",
                          "bg-slate-50/60 border border-slate-200/40 backdrop-blur-sm",
                          "shadow-[0_2px_8px_rgba(0,0,0,0.04)]"
                        )}>
                          <Icon icon="solar:settings-linear" width={24} />
                        </div>
                        <button 
                          suppressHydrationWarning
                          className={cn(
                            "flex-1 text-white text-xs font-bold py-3 rounded-2xl transition-all",
                            "bg-linear-to-r from-slate-800 to-slate-900 hover:from-slate-700 hover:to-slate-800",
                            "shadow-[0_8px_20px_rgba(15,23,42,0.2)]",
                            "active:scale-95"
                          )}
                        >
                          Retrieve
                        </button>
                      </div>
                    </div>
                  )}
                  {card.type === "flow" && (
                    <div className={cn(
                      "relative w-full h-full rounded-[2.5rem] p-8 overflow-hidden flex flex-col justify-between",
                      "border border-white/45 shadow-[inset_0_1px_2px_rgba(255,255,255,0.3),0_12px_40px_rgba(99,102,241,0.08)]",
                      GLASS_STYLES.premiumMid,
                      // Subtle inner light
                      "before:absolute before:inset-0 before:rounded-[2.5rem] before:pointer-events-none",
                      "before:bg-linear-to-b before:from-white/20 before:via-transparent before:to-transparent before:opacity-25"
                    )}>
                      <SleekCardBorder tone="indigo" />

                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={card.bgImage}
                        alt="Abstract"
                        className="absolute inset-0 w-full h-full object-cover opacity-8 mix-blend-overlay pointer-events-none"
                      />

                      {/* Indigo ambient glow */}
                      <div className="absolute -inset-10 pointer-events-none rounded-full">
                        <div className="absolute inset-0 bg-linear-to-br from-indigo-200/5 via-transparent to-blue-200/5 blur-2xl opacity-60" />
                      </div>

                      <div className="relative z-10">
                        <div className="flex items-center gap-3 mb-6">
                          <div className={cn(
                            "w-10 h-10 rounded-xl bg-indigo-500 flex items-center justify-center text-white",
                            "shadow-[0_8px_16px_rgba(99,102,241,0.25),inset_0_1px_2px_rgba(255,255,255,0.3)]",
                            "ring-1 ring-indigo-400/50"
                          )}>
                            <Icon icon={card.icon!} width={20} />
                          </div>
                          <div>
                            <h3 className="text-xl font-bold tracking-tight text-slate-900 leading-none">Agent Runtime</h3>
                            <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-500 mt-1.5">Lifecycle Management</p>
                          </div>
                        </div>
                        <p className="text-sm leading-relaxed text-slate-600 font-medium">Execution lifecycle management across globally distributed agent instances.</p>
                      </div>
                      <div className={cn(
                        "relative z-10 h-28 w-full bg-slate-50/70 backdrop-blur-sm rounded-4xl p-4 overflow-hidden flex items-center",
                        "border border-slate-200/30 shadow-[inset_0_1px_2px_rgba(255,255,255,0.3)]"
                      )}>
                        <svg className="w-full h-full overflow-visible" viewBox="0 0 100 40" preserveAspectRatio="none">
                          <motion.path
                            initial={{ pathLength: 0 }}
                            animate={{ pathLength: 1 }}
                            transition={{ duration: 2.5, repeat: Infinity }}
                            d="M0,25 Q15,35 30,20 T60,25 T100,10"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            className="text-indigo-400 drop-shadow-sm"
                          />
                          {[30, 60].map((cx, i) => (
                            <motion.circle 
                              key={i} 
                              cx={cx} 
                              cy={cx === 30 ? 20 : 25} 
                              r="3" 
                              initial={{ scale: 0.8 }}
                              animate={{ scale: [0.8, 1.4, 0.8] }}
                              transition={{ duration: 2, repeat: Infinity, delay: i * 0.5 }}
                              fill="currentColor" 
                              className="text-indigo-500 drop-shadow-md" 
                            />
                          ))}
                        </svg>
                      </div>
                    </div>
                  )}
                  {card.type === "facility" && (
                    <div className={cn(
                      "relative w-full h-full rounded-[2.5rem] overflow-hidden flex flex-col justify-between p-8",
                      "border border-emerald-200/60 shadow-[0_12px_40px_rgba(16,185,129,0.1),inset_0_1px_2px_rgba(255,255,255,0.25)]",
                      "bg-white/90 backdrop-blur-xl"
                    )}>
                      <SleekCardBorder tone="emerald" />

                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={card.bgImage}
                        alt="Modern Architecture"
                        className="absolute inset-0 w-full h-full object-cover opacity-6 mix-blend-overlay pointer-events-none"
                      />

                      <div className="relative z-10 flex justify-between items-start">
                        <div className="flex-1">
                          <div className="flex items-center gap-2.5 mb-3">
                            <div className={cn(
                              "w-10 h-10 rounded-xl bg-linear-to-br from-emerald-400 to-emerald-600 flex items-center justify-center text-white",
                              "shadow-[0_8px_16px_rgba(16,185,129,0.3),inset_0_1px_2px_rgba(255,255,255,0.3)]",
                              "ring-1 ring-emerald-300/50"
                            )}>
                              <Icon icon={card.icon!} width={20} />
                            </div>
                            <div>
                              <h3 className="text-lg font-bold tracking-tight text-slate-950 leading-none">Enterprise Node</h3>
                              <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-600 mt-1">Dedicated Cluster</p>
                            </div>
                          </div>
                          <p className="text-sm leading-relaxed text-slate-700 font-medium">Isolated, high-performance infrastructure clusters with dedicated compute and secure networking.</p>
                        </div>
                        <motion.div 
                          animate={{ scale: [1, 1.1, 1] }}
                          transition={{ duration: 2, repeat: Infinity }}
                          className={cn(
                            "flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] font-bold uppercase whitespace-nowrap ml-4",
                            "bg-emerald-500/15 text-emerald-700 border border-emerald-500/40",
                            "shadow-[0_4px_12px_rgba(16,185,129,0.15)]"
                          )}
                        >
                          <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-md shadow-emerald-500/60" />
                          Active
                        </motion.div>
                      </div>

                      <div className="relative z-10 grid grid-cols-2 gap-3 mt-6">
                        <div className={cn(
                          "rounded-2xl p-4 bg-white/60 backdrop-blur-sm border border-slate-200/50",
                          "shadow-[0_2px_8px_rgba(0,0,0,0.04),inset_0_1px_2px_rgba(255,255,255,0.3)]"
                        )}>
                          <p className="text-[10px] font-bold text-slate-600 uppercase tracking-wider mb-2">CPU Usage</p>
                          <div className="flex items-baseline gap-1">
                            <span className="text-lg font-bold text-slate-950">87%</span>
                            <motion.div 
                              initial={{ width: 0 }}
                              animate={{ width: "100%" }}
                              className="flex-1 h-1.5 bg-slate-200 rounded-full overflow-hidden"
                            >
                              <motion.div 
                                animate={{ scaleX: [0.7, 1, 0.7] }}
                                transition={{ duration: 2, repeat: Infinity }}
                                className="h-full bg-linear-to-r from-emerald-500 to-emerald-400 rounded-full origin-left"
                              />
                            </motion.div>
                          </div>
                        </div>
                        <div className={cn(
                          "rounded-2xl p-4 bg-white/60 backdrop-blur-sm border border-slate-200/50",
                          "shadow-[0_2px_8px_rgba(0,0,0,0.04),inset_0_1px_2px_rgba(255,255,255,0.3)]"
                        )}>
                          <p className="text-[10px] font-bold text-slate-600 uppercase tracking-wider mb-2">Memory</p>
                          <div className="flex items-baseline gap-1">
                            <span className="text-lg font-bold text-slate-950">62%</span>
                            <motion.div 
                              initial={{ width: 0 }}
                              animate={{ width: "100%" }}
                              className="flex-1 h-1.5 bg-slate-200 rounded-full overflow-hidden"
                            >
                              <motion.div 
                                animate={{ scaleX: [0.5, 0.8, 0.5] }}
                                transition={{ duration: 2.5, repeat: Infinity }}
                                className="h-full bg-linear-to-r from-blue-500 to-blue-400 rounded-full origin-left"
                              />
                            </motion.div>
                          </div>
                        </div>
                      </div>

                      <div className="flex gap-2.5 mt-auto pt-6 relative z-10">
                        <button 
                          suppressHydrationWarning
                          className={cn(
                            "flex-1 text-slate-700 text-xs font-bold py-3 rounded-2xl transition-all",
                            "bg-white/70 hover:bg-white/90 active:scale-95",
                            "border border-slate-200/60 backdrop-blur-sm",
                            "shadow-[0_4px_12px_rgba(0,0,0,0.05),inset_0_1px_2px_rgba(255,255,255,0.3)]"
                          )}
                        >
                          Monitor
                        </button>
                        <button 
                          suppressHydrationWarning
                          className={cn(
                            "flex-1 bg-linear-to-r from-emerald-600 to-emerald-500 text-white text-xs font-bold py-3 rounded-2xl",
                            "transition-all active:scale-95",
                            "hover:from-emerald-500 hover:to-emerald-400 hover:shadow-lg hover:shadow-emerald-300/50",
                            "shadow-[0_8px_24px_rgba(16,185,129,0.3)]",
                            "border border-emerald-400/30"
                          )}
                        >
                          Deploy
                        </button>
                      </div>
                    </div>
                  )}
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      </div>

      {/* Mobile controls */}
      <div className="mt-6 flex items-center justify-center gap-4 md:hidden">
        <button
          type="button"
          onClick={handlePrev}
          className="h-10 w-10 rounded-full border border-slate-200 bg-white/80 backdrop-blur-sm flex items-center justify-center text-slate-600 hover:text-slate-900 hover:border-slate-300 transition-all cursor-pointer"
          aria-label="Previous card"
        >
          <Icon icon="solar:alt-arrow-left-linear" width={18} />
        </button>

        <div className="flex gap-1.5">
          {CARDS_DATA.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setCenterIndex(i)}
              className={cn(
                "h-1.5 rounded-full transition-all duration-300 cursor-pointer",
                centerIndex === i ? "w-8 bg-slate-800" : "w-2 bg-slate-300"
              )}
              aria-label={`Go to card ${i + 1}`}
            />
          ))}
        </div>

        <button
          type="button"
          onClick={handleNext}
          className="h-10 w-10 rounded-full border border-slate-200 bg-white/80 backdrop-blur-sm flex items-center justify-center text-slate-600 hover:text-slate-900 hover:border-slate-300 transition-all cursor-pointer"
          aria-label="Next card"
        >
          <Icon icon="solar:alt-arrow-right-linear" width={18} />
        </button>
      </div>

      {/* Controls */}
      {/* <div className="flex items-center justify-center gap-6 mt-12">
        <button 
          onClick={handlePrev}
          className="w-12 h-12 rounded-full border border-slate-200 flex items-center justify-center hover:bg-white hover:border-slate-300 transition-all text-slate-400 hover:text-slate-600 group shadow-sm bg-white/50"
        >
          <ArrowRight className="w-5 h-5 rotate-180 transition-transform group-active:-translate-x-1" />
        </button>
        <div className="flex gap-2">
          {CARDS_DATA.map((_, i) => (
            <button
              key={i}
              onClick={() => setCenterIndex(i)}
              className={cn(
                "h-1.5 rounded-full transition-all duration-300",
                centerIndex === i ? "w-8 bg-slate-800" : "w-2 bg-slate-200 hover:bg-slate-300"
              )}
            />
          ))}
        </div>
        <button 
          onClick={handleNext}
          className="w-12 h-12 rounded-full border border-slate-200 flex items-center justify-center hover:bg-white hover:border-slate-300 transition-all text-slate-400 hover:text-slate-600 group shadow-sm bg-white/50"
        >
          <ArrowRight className="w-5 h-5 transition-transform group-active:translate-x-1" />
        </button>
      </div> */}
    </section>
  );
}
