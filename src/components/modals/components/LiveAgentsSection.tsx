"use client";

import { useEffect, useEffectEvent, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Download } from "lucide-react";

import { Button } from "@/components/ui/button";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

// ─── Data model ──────────────────────────────────────────────────────────────

type Skill = { label: string; level: number };

type LiveAgent = {
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

const liveAgents: LiveAgent[] = [
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
];

// ─── Motion / helpers ─────────────────────────────────────────────────────────

const ease = [0.22, 1, 0.36, 1] as const;

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
  idris: { skin: "#9a694f", hair: "#111827", shirt: "#2563eb", backdrop: "#dbeafe", variant: "idris" },
  elena: { skin: "#f0c7bb", hair: "#4c1d95", shirt: "#8b5cf6", backdrop: "#ede9fe", variant: "elena" },
  lara: { skin: "#e8bf9c", hair: "#7c2d12", shirt: "#f97316", backdrop: "#ffedd5", variant: "lara" },
};

function FaceSVG({ agent, fill = false }: { agent: LiveAgent; fill?: boolean }) {
  const p = FACE_PALETTES[agent.id] ?? FACE_PALETTES.maya;
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
      {p.variant === "idris" && (
        <path d="M17 20.5c0-7.6 4.6-12.3 11-12.3 6.7 0 11 4.7 11 12.3-2.4-2.2-5.2-3.6-11-3.6-5.7 0-8.4 1.3-11 3.6Z" fill={p.hair} />
      )}
      {p.variant === "elena" && (
        <path d="M14.5 22c0-8.8 5.5-14 13.5-14s13.5 5.2 13.5 14c-1.5-2-3.8-4.4-6.2-5.2v14.5c0 6.6-2.8 10.2-7.3 10.2s-7.3-3.6-7.3-10.2V16.8c-2.5.8-4.8 3.1-6.2 5.2Z" fill={p.hair} />
      )}
      {p.variant === "lara" && (
        <path d="M15.5 22.5c0-8.3 5.2-13 12.5-13s12.5 4.7 12.5 13c-2-2.4-4.6-4-7.2-4-1.9 0-3.7.7-5.3.7-1.9 0-3.5-.7-5.5-.7-2.4 0-4.8 1.4-7 4Z" fill={p.hair} />
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
                <FaceSVG agent={a} fill />
              </motion.button>
            );
          })}
        </div>

        {/* ── ONE combined card ───────────────────────────────────────────── */}
        <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white">
          <AnimatePresence mode="wait">
            <motion.div
              key={agent.id}
              initial={{ opacity: 0, y: 10, filter: "blur(8px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: -8, filter: "blur(6px)" }}
              transition={{ duration: 0.35, ease }}
              className="grid lg:grid-cols-2"
            >
              {/* ── Left col: face only ─────────────────────────────────── */}
              <div
                className="relative flex flex-col items-center justify-center overflow-hidden py-10 lg:py-0"
                style={{
                  background: `linear-gradient(160deg, ${agent.accentColor}18 0%, ${palette.backdrop} 100%)`,
                  borderRight: "1px solid rgba(226,232,240,0.7)",
                }}
              >
                {/* radial glow behind the face */}
                <div
                  className="pointer-events-none absolute inset-0"
                  style={{
                    background: `radial-gradient(ellipse at 50% 55%, ${agent.accentColor}28 0%, transparent 68%)`,
                  }}
                />

                {/* face */}
                <div
                  className="relative z-10 overflow-hidden rounded-3xl shadow-[0_16px_50px_-20px_rgba(15,23,42,0.4)]"
                  style={{ width: "11rem", height: "11rem" }}
                >
                  <FaceSVG agent={agent} fill />
                </div>

                {/* status */}
                <div className="relative z-10 mt-5 flex items-center gap-2">
                  <motion.span
                    className="h-2 w-2 rounded-full"
                    style={{ background: statusColor }}
                    animate={{ opacity: [1, 0.4, 1], scale: [1, 1.2, 1] }}
                    transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
                  />
                  <span className="text-[11px] font-semibold tracking-wide" style={{ color: statusColor }}>
                    {agent.status}
                  </span>
                  <span className="text-[11px] text-slate-400">·</span>
                  <span className="text-[11px] font-medium text-slate-500">{agent.availability}</span>
                </div>
              </div>

              {/* ── Right col: employment profile ──────────────────────── */}
              <div className="flex flex-col justify-between gap-5 p-6 sm:p-7">
                {/* specialization tag + name */}
                <div className="space-y-1.5">
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
                  <h3 className="text-[1.8rem] font-semibold leading-tight tracking-tight text-slate-950">
                    {agent.name}
                  </h3>
                  <p className="text-sm font-medium text-slate-500">{agent.headline}</p>
                </div>

                {/* bio */}
                <p className="text-sm leading-7 text-slate-600">{agent.bio}</p>

                {/* skill bars */}
                {/* <div className="space-y-3">
                  {agent.skills.map((skill, si) => (
                    <div key={skill.label} className="space-y-1">
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-medium text-slate-700">{skill.label}</span>
                        <span className="font-semibold tabular-nums" style={{ color: agent.accentColor }}>
                          {skill.level}%
                        </span>
                      </div>
                      <div className="h-1.5 w-full overflow-hidden rounded-full bg-slate-100">
                        <motion.div
                          className="h-full rounded-full"
                          style={{ background: `linear-gradient(to right, ${agent.accentColor}, ${agent.accentColor}90)` }}
                          initial={{ width: 0 }}
                          animate={{ width: `${skill.level}%` }}
                          transition={{ duration: 0.55, ease, delay: si * 0.06 }}
                        />
                      </div>
                    </div>
                  ))}
                </div> */}

                {/* stats row */}
                {/* <div
                  className="grid grid-cols-3 gap-3 rounded-2xl border p-4 text-center"
                  style={{ borderColor: `${agent.accentColor}16`, background: `${agent.accentColor}06` }}
                >
                  {[
                    { label: "Completed", value: agent.completedTasks },
                    { label: "Response", value: agent.responseTime },
                    { label: "Timezone", value: agent.timezone },
                  ].map((stat) => (
                    <div key={stat.label}>
                      <div className="text-[9px] font-semibold uppercase tracking-[0.18em] text-slate-400">
                        {stat.label}
                      </div>
                      <div
                        className="mt-1 text-[13px] font-semibold leading-tight tracking-tight"
                        style={{ color: stat.label === "Timezone" ? "#475569" : agent.accentColor }}
                      >
                        {stat.value}
                      </div>
                    </div>
                  ))}
                </div> */}

                {/* CTA buttons */}
                <div className="flex flex-col gap-3 sm:flex-row">
                  <Button
                    type="button"
                    className="h-11 flex-1 rounded-full bg-slate-950 px-5 text-sm font-medium text-white hover:bg-slate-800"
                  >
                    Hire me
                    <ArrowRight className="h-4 w-4" strokeWidth={1.8} />
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    className="h-11 flex-1 rounded-full border-slate-200 bg-white px-5 text-sm font-medium text-slate-700 hover:bg-slate-50 hover:text-slate-900"
                  >
                    Download profile
                    <Download className="h-4 w-4" strokeWidth={1.8} />
                  </Button>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}