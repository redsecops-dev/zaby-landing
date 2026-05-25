"use client";

import { useEffect, useEffectEvent, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Download } from "lucide-react";
import { Icon } from "@iconify/react";

import { Button } from "@/components/ui/button";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

// ─── Data model ──────────────────────────────────────────────────────────────

type Skill = { label: string; level: number };

export type LiveAgent = {
  id: string;
  name: string;
  headline: string;
  specialization: string;
  accentColor: string;
  status: "Available" | "On a task" | "In review" | "Queued";
  availability: string;
  timezone: string;
  completedTasks: string;
  responseTime: string;
  bio: string;
  skills: Skill[];
};

export const liveAgents: LiveAgent[] = [
  {
    id: "maya",
    name: "Maya Chen",
    headline: "Go-To-Market & Launch Strategist",
    specialization: "Marketing Operations",
    accentColor: "#0ea5e9",
    status: "Available",
    availability: "Available now",
    timezone: "SGT · UTC+8",
    completedTasks: "3.2K",
    responseTime: "1.8s avg",
    bio: "Orchestrates cross-functional product launches by translating briefs into execution plans across brand, content, and growth teams — nothing stalls on missing context.",
    skills: [
      { label: "Campaign planning", level: 96 },
      { label: "Brief synthesis", level: 91 },
      { label: "Channel strategy", level: 88 },
      { label: "Priority routing", level: 94 },
    ],
  },
  {
    id: "alex",
    name: "Alex Rivera",
    headline: "DevOps & Cloud Infrastructure Engineer",
    specialization: "DevOps Engineering",
    accentColor: "#10b981",
    status: "On a task",
    availability: "1 min provision",
    timezone: "EST · UTC-5",
    completedTasks: "2.4K",
    responseTime: "1.5s avg",
    bio: "Deploys cloud resources, orchestrates container workloads, and maintains continuous delivery pipelines with robust observability.",
    skills: [
      { label: "Infrastructure as Code", level: 95 },
      { label: "Kubernetes orchestration", level: 93 },
      { label: "CI/CD automation", level: 97 },
      { label: "Observability setup", level: 90 },
    ],
  },
  {
    id: "idris",
    name: "Idris Vale",
    headline: "Compliance & Risk Reviewer",
    specialization: "Legal & Policy",
    accentColor: "#2563eb",
    status: "In review",
    availability: "5 min clearance",
    timezone: "GMT · UTC+0",
    completedTasks: "1.8K",
    responseTime: "2.4s avg",
    bio: "Scans release payloads, contracts, and content for policy drift and approval gaps before any execution-layer agent touches the final output.",
    skills: [
      { label: "Policy screening", level: 98 },
      { label: "Approval chains", level: 93 },
      { label: "Risk summaries", level: 90 },
      { label: "Compliance audits", level: 95 },
    ],
  },
  {
    id: "elena",
    name: "Elena Park",
    headline: "Product Delivery Architect",
    specialization: "Release & Delivery Ops",
    accentColor: "#7c3aed",
    status: "On a task",
    availability: "2 min rollout",
    timezone: "PST · UTC-8",
    completedTasks: "4.1K",
    responseTime: "1.2s avg",
    bio: "Converts approved plans into step-by-step deployment sequences, aligning channels, owners, and release timing across the final mile.",
    skills: [
      { label: "Release sequencing", level: 97 },
      { label: "Runbook authoring", level: 92 },
      { label: "Owner coordination", level: 89 },
      { label: "Rollout timing", level: 95 },
    ],
  },
  {
    id: "lara",
    name: "Lara Gomez",
    headline: "Customer Narrative & Content Lead",
    specialization: "Content & Copywriting",
    accentColor: "#f97316",
    status: "Queued",
    availability: "Instant publish",
    timezone: "EST · UTC-5",
    completedTasks: "5.7K",
    responseTime: "1.5s avg",
    bio: "Shapes launch narratives and customer-facing copy while preserving every handoff detail — making the final output feel sharp, human, and ready to publish.",
    skills: [
      { label: "Narrative design", level: 99 },
      { label: "Tone alignment", level: 96 },
      { label: "Channel adaptation", level: 93 },
      { label: "Final copy polish", level: 98 },
    ],
  },
  {
    id: "jin",
    name: "Jin-Woo Kim",
    headline: "QA & Resiliency Automation Engineer",
    specialization: "QA & Testing",
    accentColor: "#ec4899",
    status: "Available",
    availability: "Available now",
    timezone: "KST · UTC+9",
    completedTasks: "2.9K",
    responseTime: "1.9s avg",
    bio: "Automates end-to-end testing, executes performance stress tests, and builds resiliency validation frameworks for zero-downtime releases.",
    skills: [
      { label: "E2E testing automation", level: 96 },
      { label: "Performance stress tests", level: 92 },
      { label: "Resiliency validation", level: 94 },
      { label: "Regression mapping", level: 91 },
    ],
  },
];

// ─── Motion / helpers ─────────────────────────────────────────────────────────

const ease = [0.22, 1, 0.36, 1] as const;
const spring = { type: "spring" as const, stiffness: 280, damping: 28 };


const badgeVariants = {
  initial: { opacity: 0, y: 15, filter: "blur(4px)" },
  animate: { opacity: 1, y: 0, filter: "blur(0px)", transition: { ...spring, delay: 0.02 } },
  exit: { opacity: 0, y: -10, filter: "blur(2px)", transition: { duration: 0.15 } }
};

const nameWordVariants = (wi: number) => ({
  initial: { opacity: 0, y: 20, filter: "blur(6px)" },
  animate: { opacity: 1, y: 0, filter: "blur(0px)", transition: { ...spring, delay: 0.08 + wi * 0.08 } },
  exit: { opacity: 0, y: -12, filter: "blur(3px)", transition: { duration: 0.15 } }
});

const headlineVariants = {
  initial: { opacity: 0, y: 15, filter: "blur(4px)" },
  animate: { opacity: 1, y: 0, filter: "blur(0px)", transition: { ...spring, delay: 0.20 } },
  exit: { opacity: 0, y: -10, filter: "blur(2px)", transition: { duration: 0.15 } }
};

const bioVariants = {
  initial: { opacity: 0, y: 15, filter: "blur(4px)" },
  animate: { opacity: 1, y: 0, filter: "blur(0px)", transition: { ...spring, delay: 0.26 } },
  exit: { opacity: 0, y: -10, filter: "blur(2px)", transition: { duration: 0.15 } }
};

const telemetryVariants = {
  initial: { opacity: 0, y: 15, filter: "blur(4px)" },
  animate: { opacity: 1, y: 0, filter: "blur(0px)", transition: { ...spring, delay: 0.32 } },
  exit: { opacity: 0, y: -10, filter: "blur(2px)", transition: { duration: 0.15 } }
};

const buttonsVariants = {
  initial: { opacity: 0, y: 15, filter: "blur(4px)" },
  animate: { opacity: 1, y: 0, filter: "blur(0px)", transition: { ...spring, delay: 0.38 } },
  exit: { opacity: 0, y: -10, filter: "blur(2px)", transition: { duration: 0.15 } }
};


const STATUS_COLORS: Record<string, string> = {
  Available: "#10b981",
  "On a task": "#f59e0b",
  "In review": "#3b82f6",
  Queued: "#94a3b8",
};

// ─── Face SVG ─────────────────────────────────────────────────────────────────

type FacePalette = {
  skin: string;
  hair: string;
  shirt: string;
  backdrop: string;
  variant: string;
};

const FACE_PALETTES: Record<string, FacePalette> = {
  maya: { skin: "#f4cdbf", hair: "#1e293b", shirt: "#0ea5e9", backdrop: "#e0f2fe", variant: "maya" },
  alex: { skin: "#dfb195", hair: "#2d3748", shirt: "#10b981", backdrop: "#d1fae5", variant: "alex" },
  idris: { skin: "#9a694f", hair: "#111827", shirt: "#2563eb", backdrop: "#dbeafe", variant: "idris" },
  elena: { skin: "#f0c7bb", hair: "#4c1d95", shirt: "#8b5cf6", backdrop: "#ede9fe", variant: "elena" },
  lara: { skin: "#e8bf9c", hair: "#7c2d12", shirt: "#f97316", backdrop: "#ffedd5", variant: "lara" },
  jin: { skin: "#eed2c4", hair: "#0f172a", shirt: "#ec4899", backdrop: "#fce7f3", variant: "jin" },
};

export function FaceSVG({ id, fill = false }: { id: string; fill?: boolean }) {
  const p = FACE_PALETTES[id] ?? FACE_PALETTES.maya;
  return (
    <svg
      viewBox="0 0 56 56"
      className="h-full w-full"
      aria-hidden="true"
      style={fill ? { background: p.backdrop } : undefined}
    >
      <rect width="56" height="56" rx="0" fill={p.backdrop} />
      <path d="M10 56c2.5-9 9.2-14 18-14s15.5 5 18 14z" fill={p.shirt} />
      <ellipse cx="28" cy="23" rx="10.5" ry="12" fill={p.skin} />
      {p.variant === "maya" && (
        <>
          <path d="M16 21c0-8.5 4.8-14 12-14s12 5.5 12 14c-1.8-2.6-5.3-4.5-12-4.5S17.8 18.4 16 21Z" fill={p.hair} />
          <circle cx="39.5" cy="12.5" r="3.5" fill={p.hair} />
        </>
      )}
      {p.variant === "alex" && (
        <path d="M16 21c0-7.8 5.4-12.5 12-12.5s12 4.7 12 12.5c-2.5-2.5-5.8-3.7-12-3.7s-9.5 1.2-12 3.7Z" fill={p.hair} />
      )}
      {p.variant === "idris" && (
        <path d="M17 20.5c0-7.6 4.6-12.3 11-12.3 6.7 0 11 4.7 11 12.3-2.4-2.2-5.2-3.6-11-3.6-5.7 0-8.4 1.3-11 3.6Z" fill={p.hair} />
      )}
      {p.variant === "elena" && (
        <path d="M14.5 22c0-8.8 5.5-14 13.5-14s13.5 5.2 13.5 14c-1.5-2-3.8-4.4-6.2-5.2v14.5c0 6.6-2.8 10.2-7.3 10.2s-7.3-3.6-7.3-10.2V16.8c-2.5.8-4.8 3.1-6.2 5.2Z" fill={p.hair} />
      )}
      {p.variant === "lara" && (
        <path d="M15.5 22.5c0-8.3 5.2-13 12.5-13s12.5 4.7 12.5 13c-2-2.4-4.6-4-7.2-4-1.9 0-3.7.7-5.3.7-1.9 0-3.5-.7-5.5-.7-2.4 0-4.8 1.4-7 4Z" fill={p.hair} />
      )}
      {p.variant === "jin" && (
        <path d="M15 21.5c0-8 5-13.5 13-13.5s13 5.5 13 13.5c-2-2-5-3-13-3s-11 1-13 3Z" fill={p.hair} />
      )}
      <circle cx="24.2" cy="24.2" r="1.15" fill="#1f2937" />
      <circle cx="31.8" cy="24.2" r="1.15" fill="#1f2937" />
      <path d="M24.5 29.3c1.3 1.3 5.2 1.3 6.5 0" fill="none" stroke="#7c4a35" strokeWidth="1.1" strokeLinecap="round" />
    </svg>
  );
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function LiveAgentsSection() {
  const prefersReducedMotion = useReducedMotion();
  const [activeIndex, setActiveIndex] = useState(0);
  const [cycleSeed, setCycleSeed] = useState(0);

  const advanceAgent = useEffectEvent(() => {
    setActiveIndex((i) => (i + 1) % liveAgents.length);
  });

  useEffect(() => {
    if (prefersReducedMotion) return;
    const id = window.setInterval(() => advanceAgent(), 3800);
    return () => window.clearInterval(id);
  }, [cycleSeed, prefersReducedMotion]);

  const agent = liveAgents[activeIndex] ?? liveAgents[0];
  const statusColor = STATUS_COLORS[agent.status] ?? "#94a3b8";
  const palette = FACE_PALETTES[agent.id] ?? FACE_PALETTES.maya;

  const handleSelect = (i: number) => {
    setActiveIndex(i);
    setCycleSeed((s) => s + 1);
  };

  return (
    <section className="relative overflow-hidden p-5 sm:p-8">
      {/* ambient blobs */}
      {/* <div className="pointer-events-none absolute -left-12 top-0 h-52 w-52 rounded-full bg-sky-200/40 blur-3xl" />
      <div className="pointer-events-none absolute -right-12 bottom-0 h-52 w-52 rounded-full bg-violet-200/35 blur-3xl" /> */}

      <div className="relative z-10 space-y-5">
        {/* ── Section header ─────────────────────────────────────────────── */}
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/80 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.24em] text-slate-500 shadow-sm">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-sky-500" />
            Live Agent Exchange
          </div>
          <h2 className="text-2xl font-semibold leading-tight tracking-tight text-slate-950 sm:text-3xl">
            Your AI agent squad, available to hire.
          </h2>
          <p className="max-w-lg text-sm leading-7 text-slate-500">
            Select an agent to review their profile, check availability, and deploy them to your active workflow.
          </p>
        </div>

        {/* ── Face chip selector ──────────────────────────────────────────── */}
        <div className="flex justify-center gap-3">
          {liveAgents.map((a, i) => {
            const active = i === activeIndex;
            return (
              <motion.button
                key={a.id}
                type="button"
                onClick={() => handleSelect(i)}
                aria-label={`View ${a.name}`}
                aria-pressed={active}
                className="relative h-12 w-12 overflow-hidden rounded-2xl border-2 shadow-sm transition-shadow duration-200"
                whileHover={prefersReducedMotion ? undefined : { y: -3, scale: 1.07 }}
                whileTap={prefersReducedMotion ? undefined : { scale: 0.95 }}
                style={{
                  borderColor: active ? a.accentColor : "rgba(203,213,225,0.9)",
                  boxShadow: active
                    ? `0 0 0 3px ${a.accentColor}22, 0 6px 16px -4px ${a.accentColor}40`
                    : undefined,
                }}
              >
                <FaceSVG id={a.id} fill />
              </motion.button>
            );
          })}
        </div>

        {/* ── ONE combined card ───────────────────────────────────────────── */}
        <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-[0_12px_32px_rgba(0,0,0,0.03)]">
          <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[420px] lg:h-[420px]">
            {/* ── Left col: talking preview ─────────────────────────────────── */}
            <div className="relative overflow-hidden min-h-[380px] lg:min-h-0 w-full h-full border-b lg:border-b-0 lg:border-r border-slate-100 bg-slate-950">
              <AnimatePresence>
                <motion.div
                  key={agent.id}
                  initial={{ opacity: 0, scale: 0.95, filter: "blur(4px)" }}
                  animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                  exit={{ opacity: 0, scale: 1.05, filter: "blur(4px)" }}
                  transition={{ duration: 0.35, ease }}
                  className="absolute inset-0 w-full h-full flex flex-col justify-between p-6"
                  style={{
                    background: `radial-gradient(circle at 50% 40%, ${agent.accentColor}18 0%, transparent 70%), linear-gradient(135deg, rgba(15, 23, 42, 0.96) 0%, rgba(2, 6, 23, 1) 100%)`,
                  }}
                >
                  {/* Cyber grid lines */}
                  <div
                    className="absolute inset-0 opacity-[0.05] pointer-events-none"
                    style={{
                      backgroundImage: `radial-gradient(${agent.accentColor} 1px, transparent 1px)`,
                      backgroundSize: "16px 16px"
                    }}
                  />

                  {/* Scanning Laser Line */}
                  <motion.div
                    className="absolute inset-x-0 h-[2px] opacity-20 pointer-events-none"
                    style={{
                      background: `linear-gradient(to right, transparent, ${agent.accentColor}, transparent)`,
                      boxShadow: `0 0 8px ${agent.accentColor}`,
                    }}
                    animate={{ top: ["0%", "100%", "0%"] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                  />

                  {/* Viewfinder corner brackets */}
                  <div className="absolute top-4 left-4 w-3.5 h-3.5 border-t-2 border-l-2 border-slate-800 pointer-events-none" />
                  <div className="absolute top-4 right-4 w-3.5 h-3.5 border-t-2 border-r-2 border-slate-800 pointer-events-none" />
                  <div className="absolute bottom-4 left-4 w-3.5 h-3.5 border-b-2 border-l-2 border-slate-800 pointer-events-none" />
                  <div className="absolute bottom-4 right-4 w-3.5 h-3.5 border-b-2 border-r-2 border-slate-800 pointer-events-none" />

                  {/* Viewport header */}
                  <div className="w-full flex items-center justify-between z-10 text-[9px] font-mono text-slate-500">
                    <span className="flex items-center gap-1.5">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                      SYS_LIVE: TRUE
                    </span>
                    <span>AGENT_FEED // {agent.name.toUpperCase()}</span>
                  </div>

                  {/* Center Avatar Viewport */}
                  <div className="relative flex items-center justify-center w-full flex-1">
                    <div className="relative flex items-center justify-center w-36 h-36 md:w-40 md:h-40">
                      {/* Outer rotating dashboard circle */}
                      <motion.div
                        className="absolute inset-0 rounded-full border border-dashed opacity-25 pointer-events-none"
                        style={{ borderColor: agent.accentColor }}
                        animate={{ rotate: 360 }}
                        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                      />
                      {/* Inner glow */}
                      <div
                        className="absolute inset-4 rounded-full blur-lg opacity-20 pointer-events-none"
                        style={{ backgroundColor: agent.accentColor }}
                      />
                      {/* Face inside circular frame */}
                      <div className="relative z-10 w-26 h-26 md:w-30 md:h-30 overflow-hidden rounded-full border border-slate-800 shadow-[0_8px_32px_rgba(0,0,0,0.5)]">
                        <FaceSVG id={agent.id} fill />
                      </div>
                    </div>
                  </div>

                  {/* Audio visualizer + telemetry footer */}
                  <div className="w-full flex justify-between items-end px-2 z-10">
                    {/* Left side telemetry */}
                    <div className="flex flex-col gap-0.5 text-[9px] font-mono text-slate-500 text-left">
                      <div>SYS.LOC: {agent.timezone.split(" · ")[0]}</div>
                      <div>LATENCY: {agent.responseTime}</div>
                    </div>

                    {/* Center dynamic voice waveform */}
                    <div className="flex items-end justify-center gap-[3px] h-8 px-4 pb-0.5">
                      {Array.from({ length: 11 }).map((_, idx) => {
                        const heights = [
                          [10, 24, 8, 30, 10],
                          [6, 32, 14, 20, 6],
                          [12, 18, 6, 28, 12],
                          [8, 26, 12, 34, 8],
                        ];
                        const scaleYPattern = heights[idx % heights.length];
                        return (
                          <motion.div
                            key={idx}
                            className="w-[3px] rounded-full origin-bottom"
                            style={{ backgroundColor: agent.accentColor }}
                            animate={{
                              height: scaleYPattern,
                            }}
                            transition={{
                              duration: 0.8 + (idx % 3) * 0.2,
                              repeat: Infinity,
                              ease: "easeInOut",
                              delay: idx * 0.05,
                            }}
                          />
                        );
                      })}
                    </div>

                    {/* Right side telemetry */}
                    <div className="flex flex-col gap-0.5 text-[9px] font-mono text-slate-500 text-right">
                      <div>BITRATE: 4.8 MBPS</div>
                      <div>CODEC: OPUS_L16</div>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* ── Right col: profile info ──────────────────────────────────── */}
            <div className="relative overflow-hidden w-full h-full bg-white border-l border-slate-100">
              {/* Top border strip */}
              <AnimatePresence mode="popLayout">
                <motion.div
                  key={`border-${agent.id}`}
                  className="absolute top-0 inset-x-0 h-[3px] z-20"
                  initial={{ opacity: 0, scaleX: 0 }}
                  animate={{ opacity: 1, scaleX: 1 }}
                  exit={{ opacity: 0, scaleX: 0 }}
                  transition={{ duration: 0.45, ease: "easeOut" }}
                  style={{
                    background: `linear-gradient(to right, transparent, ${agent.accentColor}, transparent)`
                  }}
                />
              </AnimatePresence>

              {/* Ambient radial gradient tint */}
              <AnimatePresence mode="popLayout">
                <motion.div
                  key={`tint-${agent.id}`}
                  className="pointer-events-none absolute inset-0 z-0"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.45 }}
                  style={{
                    background: `radial-gradient(ellipse at top right, ${agent.accentColor}0a 0%, transparent 70%)`
                  }}
                />
              </AnimatePresence>

              {/* Dynamic ambient color glow */}
              <AnimatePresence mode="popLayout">
                <motion.div
                  key={`glow-${agent.id}`}
                  className="pointer-events-none absolute left-1/2 top-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 blur-[90px] rounded-full z-0"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: [0, 0.14, 0.14] }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                  style={{ background: agent.accentColor }}
                />
              </AnimatePresence>

              <AnimatePresence mode="wait">
                <motion.div
                  key={agent.id}
                  className="relative z-10 w-full h-full flex flex-col justify-between p-6 sm:p-8"
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  variants={{
                    initial: { opacity: 0 },
                    animate: { opacity: 1, transition: { duration: 0.25 } },
                    exit: { opacity: 0, transition: { duration: 0.2 } }
                  }}
                >
                  {/* Top content area */}
                  <div className="space-y-4">
                    {/* Header info */}
                    <div className="space-y-2">
                      <motion.div variants={badgeVariants}>
                        <span
                          className="inline-flex items-center rounded-full border px-3 py-0.5 text-[10px] font-semibold uppercase tracking-[0.2em]"
                          style={{
                            borderColor: `${agent.accentColor}28`,
                            background: `${agent.accentColor}10`,
                            color: agent.accentColor,
                          }}
                        >
                          {agent.specialization}
                        </span>
                      </motion.div>

                      <div className="overflow-hidden flex flex-col gap-0.5">
                        {agent.name.split(" ").map((word, wi) => (
                          <motion.div
                            key={wi}
                            variants={nameWordVariants(wi)}
                            className="block text-2xl sm:text-3xl font-semibold leading-[1.05] tracking-tight text-slate-950"
                          >
                            {word}
                          </motion.div>
                        ))}
                      </div>

                      <motion.p
                        variants={headlineVariants}
                        className="text-sm font-medium text-slate-500"
                      >
                        {agent.headline}
                      </motion.p>
                    </div>

                    {/* Bio */}
                    <motion.p
                      variants={bioVariants}
                      className="text-sm leading-relaxed text-slate-600"
                    >
                      {agent.bio}
                    </motion.p>
                  </div>

                  {/* Bottom content area (pinned to bottom) */}
                  <div className="mt-auto space-y-4">
                    {/* Telemetry/Status Bar */}
                    <motion.div
                      variants={telemetryVariants}
                      className="flex items-center justify-between border-t border-slate-100 pt-4 text-[11px] text-slate-500"
                    >
                      <div className="flex items-center gap-1.5">
                        <span
                          className="h-2 w-2 rounded-full animate-pulse"
                          style={{ backgroundColor: statusColor }}
                        />
                        <span className="font-medium text-slate-700">{agent.status}</span>
                        <span>({agent.availability})</span>
                      </div>
                      <div className="font-medium tabular-nums">
                        {agent.completedTasks} tasks completed
                      </div>
                    </motion.div>

                    {/* Action buttons */}
                    <motion.div
                      variants={buttonsVariants}
                      className="flex flex-col gap-3 sm:flex-row pt-2"
                    >
                      <Button
                        asChild
                        className="h-11 flex-1 rounded-full bg-slate-950 px-5 text-sm font-medium text-white hover:bg-slate-800 cursor-pointer"
                      >
                        <a
                          href="https://platform.zaby.io/tenant/signup"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center justify-center gap-1.5 w-full h-full"
                        >
                          <span>Deploy {agent.name.split(" ")[0]}</span>
                          <ArrowRight className="h-4 w-4" strokeWidth={1.8} />
                        </a>
                      </Button>
                      <Button
                        asChild
                        variant="outline"
                        className="h-11 flex-1 rounded-full border-slate-200 hover:border-purple-400 bg-white px-5 text-sm font-medium text-slate-700 hover:bg-white hover:text-purple-400 cursor-pointer"
                      >
                        <a
                          href="https://platform.zaby.io/tenant/signup"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center justify-center gap-1.5 w-full h-full"
                        >
                          <span>Initialize workflow</span>
                          <Download className="h-4 w-4" strokeWidth={1.8} />
                        </a>
                      </Button>
                    </motion.div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}