"use client";

import React, { useRef } from "react";
import { Icon } from "@iconify/react";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  Phone,
  Database,
  Cpu,
  Zap,
  ArrowRight,
  Workflow,
  History,
  Bot,
  MessageSquare,
  Users,
  CheckCircle,
  Server,
  Share2,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { SectionHeading, ShimmerButton } from "@/components/shared";
import {
  HeroLiquidMetalRoot,
  HeroLiquidMetalContainer,
  HeroLiquidMetalContent,
  HeroLiquidMetalHeading,
  HeroLiquidMetalDescription,
  HeroLiquidMetalVisual,
  HeroLiquidMetalMobileVisual,
} from "@/components/ui/hero-liquid-metal";

// --- Components ---

const Badge = ({ children }: { children: React.ReactNode }) => (
  <div className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1 text-xs text-primary ring-1 ring-inset ring-primary/20 uppercase tracking-tight font-medium mb-6 backdrop-blur-sm">
    {children}
  </div>
);

// --- Section 1: Hero Hub Visualization ---

const channels = [
  { name: "WhatsApp", icon: "logos:whatsapp-icon", x: 100, y: 30 },
  { name: "Voice", icon: "lucide:phone", x: 200, y: 30, color: "#2563eb" },
  {
    name: "SMS",
    icon: "lucide:message-square",
    x: 300,
    y: 30,
    color: "#1e293b",
  },
  { name: "Teams", icon: "logos:microsoft-teams", x: 400, y: 30 },
  { name: "Slack", icon: "logos:slack-icon", x: 500, y: 30 },
  { name: "Discord", icon: "logos:discord-icon", x: 600, y: 30 },
  { name: "Email", icon: "lucide:mail", x: 700, y: 30, color: "#1e293b" },
  { name: "CRM", icon: "lucide:database", x: 800, y: 30, color: "#d97706" },
];

const HeroSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex flex-col items-center justify-center py-24 overflow-hidden bg-[var(--color-bg)]"
    >
      {/* Background Effects */}

      <div className="relative w-full max-w-5xl mx-auto px-6 lg:px-8 z-10 text-center flex flex-col items-center">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
          className="text-4xl sm:text-5xl md:text-7xl font-light text-[var(--color-text-primary)] tracking-tight leading-[1.1] max-w-4xl glass-text"
        >
          Unify every customer{" "}
          <span className="bg-linear-to-br from-accent via-[#c026d3] to-accent-soft bg-clip-text text-transparent font-light">
            conversation
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="mt-8 max-w-2xl text-base sm:text-lg text-[var(--color-text-secondary)] leading-relaxed font-light"
        >
          Deploy AI-native conversational systems across messaging, voice,
          support, and enterprise communication channels from a single
          operational runtime.
        </motion.p>

        {/* Visualization Hub */}
        <div className="relative mt-20 w-full max-w-4xl aspect-[16/9] sm:aspect-[900/400]">
          <svg
            viewBox="0 0 900 400"
            className="absolute inset-0 w-full h-full pointer-events-none"
            fill="none"
          >
            <defs>
              <filter
                id="hub-glow"
                x="-20%"
                y="-20%"
                width="140%"
                height="140%"
              >
                <feGaussianBlur stdDeviation="5" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
              <linearGradient id="line-grad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="var(--color-primary)" stopOpacity="0" />
                <stop offset="50%" stopColor="var(--color-primary)" stopOpacity="0.3" />
                <stop offset="100%" stopColor="var(--color-primary)" stopOpacity="0.8" />
              </linearGradient>
            </defs>

            {channels.map((ch, i) => (
              <React.Fragment key={i}>
                {/* Background path */}
                <path
                  d={`M${ch.x} ${ch.y} C ${ch.x} 150, 450 200, 450 330`}
                  stroke="var(--color-border-strong)"
                  strokeOpacity="0.05"
                  strokeWidth="1.5"
                  strokeDasharray="4 4"
                />

                {/* Animated Path */}
                <motion.path
                  d={`M${ch.x} ${ch.y} C ${ch.x} 150, 450 200, 450 330`}
                  stroke="url(#line-grad)"
                  strokeWidth="2"
                  strokeLinecap="round"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{
                    pathLength: [0, 1, 1],
                    opacity: [0, 1, 0],
                    pathOffset: [0, 0, 1],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    delay: i * 0.4,
                    ease: "easeInOut",
                  }}
                />

                {/* Pulse travel */}
                <motion.circle
                  r="3.5"
                  fill="var(--color-primary)"
                  filter="url(#hub-glow)"
                  initial={{ offsetDistance: "0%" }}
                  animate={{ offsetDistance: "100%" }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    delay: i * 0.4,
                    ease: "linear",
                  }}
                  style={{
                    offsetPath: `path('M${ch.x} ${ch.y} C ${ch.x} 150, 450 200, 450 330')`,
                  }}
                />
              </React.Fragment>
            ))}
          </svg>

          {/* Top Nodes (Channels) */}
          {channels.map((ch, i) => (
            <div
              key={i}
              className="absolute hidden sm:flex flex-col items-center gap-2 -translate-x-1/2 -translate-y-1/2 transition-transform duration-500 hover:scale-110"
              style={{ top: ch.y, left: `${(ch.x / 900) * 100}%` }}
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[var(--color-bg)] border border-[var(--color-border-strong)] backdrop-blur-xl group relative">
                <Icon
                  icon={ch.icon}
                  className="text-2xl"
                  style={{ color: ch.color }}
                />
                <div className="absolute inset-0 rounded-2xl bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              <span className="text-[10px] uppercase tracking-widest text-[var(--color-text-secondary)] font-bold">
                {ch.name}
              </span>
            </div>
          ))}

          {/* Center Core Node */}
          <div className="absolute top-[85%] left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 flex flex-col items-center gap-4">
            <div className="relative group">
              <div className="absolute inset-0 rounded-3xl bg-primary/20 blur-2xl animate-pulse" />
              <div className="relative flex h-20 w-20 items-center justify-center rounded-3xl bg-[var(--color-bg)] border border-primary/20 shadow-[0_8px_30px_rgba(var(--color-primary-rgb),0.15)]">
                {/* <Icon icon="solar:bolt-circle-bold-duotone" className="text-5xl text-primary" /> */}
                <Bot className="text-5xl text-primary" />

                {/* Orbital Rings */}
                <div className="absolute inset-[-10px] rounded-full border border-primary/10 animate-[spin_10s_linear_infinite]" />
                <div className="absolute inset-[-20px] rounded-full border border-primary/5 animate-[spin_15s_linear_infinite_reverse]" />
              </div>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-xs font-bold text-[var(--color-text-primary)] uppercase tracking-[0.2em]">
                Zaby Conversational Runtime
              </span>
              <div className="flex items-center gap-2 mt-1">
                <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                <span className="text-[10px] text-primary/80 font-bold uppercase tracking-widest">
                  Operational Core Active
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Feature Strip */}
        <div className="mt-32 w-full pt-12 border-t border-[var(--color-border-strong)]">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              "Real-time orchestration",
              "Multi-channel memory",
              "Enterprise-grade routing",
              "Autonomous conversations",
            ].map((text, i) => (
              <div key={i} className="flex flex-col items-center gap-3 group">
                <div className="h-px w-12 bg-primary/30 group-hover:w-20 transition-all duration-500" />
                <span className="text-[11px] uppercase tracking-widest text-[var(--color-text-secondary)] group-hover:text-[var(--color-text-primary)] font-bold transition-colors">
                  {text}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

// --- Section 2: Features Bento Grid ---

const FeatureSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end end"],
  });

  return (
    <section
      ref={containerRef}
      className="py-32 px-6 lg:px-8 relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-40">
          <h2 className="text-5xl md:text-7xl font-light text-slate-900 tracking-tight leading-none mb-8">
            Beyond{" "}
            <span className="bg-linear-to-br from-accent via-[#c026d3] to-accent-soft bg-clip-text text-transparent font-light">
              simple chat.
            </span>
          </h2>
          <p className="text-xl text-slate-500 font-light max-w-2xl mx-auto">
            Experience a new standard in autonomous communication
            infrastructure.
          </p>
        </div>

        {/* Stages Spine Wrapper */}
        <div className="relative">
          {/* The Animated Spine */}
          {/* <div className="absolute left-1/2 top-0 bottom-0 w-px bg-slate-200 hidden md:block">
            <motion.div 
              className="w-full bg-blue-600 shadow-[0_0_15px_rgba(37,99,235,0.5)]"
              style={{ height: useTransform(scrollYProgress, [0, 1], ["0%", "100%"]) }}
            />
          </div> */}

          {/* Stage 1: WhatsApp AI Agents */}
          <div className="grid md:grid-cols-2 gap-20 items-center mb-60 group">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
            >
              <div className="w-16 h-16 rounded-2xl bg-green-50 border border-green-100 flex items-center justify-center mb-8">
                <Icon icon="logos:whatsapp-icon" className="text-3xl" />
              </div>
              <h3 className="text-4xl md:text-5xl font-medium text-slate-900 mb-6 tracking-tight">
                WhatsApp AI Agents
              </h3>
              <p className="text-lg text-slate-600 leading-relaxed font-light mb-8">
                Deploy autonomous agents that handle complex customer inquiries
                directly on WhatsApp. From order tracking to technical
                support—integrated with your CRM in real-time.
              </p>
              <ul className="space-y-4">
                {[
                  "End-to-end encryption maintained",
                  "Full media support (Images, Voice, PDF)",
                  "Instant tool & API execution",
                ].map((item, i) => (
                  <li
                    key={i}
                    className="flex items-center gap-3 text-slate-500 font-medium"
                  >
                    <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
            <motion.div
              className="relative h-[500px] bg-white rounded-[2.5rem] border border-slate-100 overflow-hidden"
              initial={{ opacity: 0, scale: 0.9, y: 50 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div className="absolute inset-x-0 top-0 h-14 bg-slate-50 border-b border-slate-100 flex items-center px-6 justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center text-white font-bold text-[10px]">
                    <Icon icon="logos:whatsapp-icon" className="text-xl" />
                  </div>
                  <span className="text-xs font-bold text-slate-700 uppercase tracking-widest">
                    WhatsApp Agent
                  </span>
                </div>
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              </div>
              <div className="p-8 space-y-6 pt-20">
                <div className="bg-slate-50 rounded-2xl rounded-tl-none p-4 max-w-[80%] text-sm text-slate-600 font-medium leading-relaxed">
                  Hi! I'm your Zaby-powered agent. How can I assist you with
                  your enterprise workflows today?
                </div>
                <motion.div
                  className="bg-blue-600 text-white rounded-2xl rounded-tr-none p-4 max-w-[80%] ml-auto text-sm font-medium"
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1 }}
                >
                  Can you sync my recent orders with the accounting department?
                </motion.div>
                <motion.div
                  className="bg-slate-50 rounded-2xl rounded-tl-none p-4 max-w-[85%] text-sm text-slate-600 font-medium"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: 2 }}
                >
                  <div className="flex items-center gap-2 mb-2 text-blue-600">
                    <Icon
                      icon="solar:refresh-linear"
                      className="animate-spin"
                    />
                    <span className="text-[10px] font-bold uppercase tracking-widest">
                      Executing: Workflow Sync
                    </span>
                  </div>
                  Certainly. I have synchronized 4 orders with the finance
                  stack. Need anything else?
                </motion.div>
              </div>
            </motion.div>
          </div>

          {/* Stage 2: Voice Automation */}
          <div className="grid md:grid-cols-2 gap-20 items-center mb-60 group">
            <div className="order-2 md:order-1">
              <div className="relative h-[400px] flex items-center justify-center">
                {/* Symmetrical audio wave animation around a central node */}
                <div className="flex items-center justify-center w-full">
                  {/* Left Wave */}
                  <div className="flex items-center justify-end gap-1.5 w-1/3">
                    {[40, 60, 100, 140, 80, 120, 160, 110, 70, 50].map(
                      (h, i) => (
                        <motion.div
                          key={`lw-${i}`}
                          className="w-1.5 bg-blue-500/40 rounded-full"
                          animate={{
                            height: [40, h, 40],
                          }}
                          transition={{
                            duration: 1.5,
                            repeat: Infinity,
                            delay: i * 0.08,
                            ease: "easeInOut",
                          }}
                        />
                      ),
                    )}
                  </div>

                  {/* Pulsing Central Mic Badge */}
                  <div className="relative mx-6 group/mic">
                    <div className="absolute inset-0 rounded-full bg-blue-500/20 blur-xl animate-pulse" />
                    {/* Concentric pulsing rings */}
                    <div className="absolute inset-[-12px] rounded-full border border-blue-500/20 animate-ping opacity-75 pointer-events-none" />
                    <div className="absolute inset-[-30px] rounded-full border border-blue-500/5 animate-ping opacity-40 [animation-delay:0.7s] pointer-events-none" />

                    <div className="relative w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center border border-blue-400/20 z-10 transition-transform duration-300 group-hover/mic:scale-105">
                      <Phone className="w-8 h-8 text-white" />
                    </div>
                  </div>

                  {/* Right Wave */}
                  <div className="flex items-center justify-start gap-1.5 w-1/3">
                    {[50, 70, 110, 160, 120, 80, 140, 100, 60, 40].map(
                      (h, i) => (
                        <motion.div
                          key={`rw-${i}`}
                          className="w-1.5 bg-blue-500/40 rounded-full"
                          animate={{
                            height: [40, h, 40],
                          }}
                          transition={{
                            duration: 1.5,
                            repeat: Infinity,
                            delay: i * 0.08,
                            ease: "easeInOut",
                          }}
                        />
                      ),
                    )}
                  </div>
                </div>
                <div className="absolute inset-0 bg-radial-gradient from-blue-500/5 to-transparent blur-3xl" />
              </div>
            </div>
            <motion.div
              className="order-1 md:order-2"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="w-16 h-16 rounded-2xl bg-blue-50 border border-blue-100 flex items-center justify-center mb-8 ">
                <Phone className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-4xl md:text-5xl font-medium text-slate-900 mb-6 tracking-tight">
                Voice Automation
              </h3>
              <p className="text-lg text-slate-600 leading-relaxed font-light mb-8">
                Real-time AI voice systems with ultra-low latency. Conduct
                autonomous calls, handle IVR requests, and provide human-like
                support 24/7.
              </p>
              <div className="flex items-center gap-6">
                <div className="flex flex-col gap-1">
                  <span className="text-2xl font-bold text-slate-900 tracking-tight">
                    14ms
                  </span>
                  <span className="text-[10px] uppercase font-bold text-slate-400 tracking-widest">
                    Processing Latency
                  </span>
                </div>
                <div className="w-px h-10 bg-slate-200" />
                <div className="flex flex-col gap-1">
                  <span className="text-2xl font-bold text-slate-900 tracking-tight">
                    HD
                  </span>
                  <span className="text-[10px] uppercase font-bold text-slate-400 tracking-widest">
                    Neural Audio
                  </span>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Stage 3: Multi-channel Memory */}
          <div className="grid md:grid-cols-2 gap-20 items-center mb-60 group">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="w-16 h-16 rounded-2xl bg-purple-50 border border-purple-100 flex items-center justify-center mb-8 ">
                <History className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-4xl md:text-5xl font-medium text-slate-900 mb-6 tracking-tight">
                Multi-channel Memory
              </h3>
              <p className="text-lg text-slate-600 leading-relaxed font-light mb-8">
                A unified memory layer that spans every platform. When a user
                switches from Slack to WhatsApp, your AI maintains absolute
                context without repeating questions.
              </p>
              <div className="space-y-4">
                {[
                  "Persistent User State",
                  "Cross-Platform Sync",
                  "Semantic Search",
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-4 group/item">
                    <div className="w-10 h-10 rounded-xl bg-white border border-slate-100 flex items-center justify-center group-hover/item:border-purple-300 transition-colors">
                      <Icon
                        icon="solar:check-read-linear"
                        className="text-purple-600"
                      />
                    </div>
                    <span className="text-slate-700 font-semibold">{item}</span>
                  </div>
                ))}
              </div>
            </motion.div>
            <div className="relative">
              <div className="grid grid-cols-2 gap-4">
                {[
                  {
                    label: "User Intent",
                    color: "bg-blue-500",
                    icon: (
                      <Icon
                        icon="solar:brain-bold-duotone"
                        className="text-blue-500"
                      />
                    ),
                    code: '{ intent: "cancel_order", confidence: 0.98 }',
                    delay: 0,
                  },
                  {
                    label: "Preferences",
                    color: "bg-purple-500",
                    icon: (
                      <Icon
                        icon="solar:settings-bold-duotone"
                        className="text-purple-500"
                      />
                    ),
                    code: '{ locale: "en-US", tier: "enterprise" }',
                    delay: 0.1,
                  },
                  {
                    label: "Interaction History",
                    color: "bg-indigo-500",
                    icon: (
                      <Icon
                        icon="solar:history-bold-duotone"
                        className="text-indigo-500"
                      />
                    ),
                    code: '{ channels: ["WhatsApp", "Slack"] }',
                    delay: 0.2,
                  },
                  {
                    label: "Workflow State",
                    color: "bg-slate-900",
                    icon: (
                      <Icon
                        icon="solar:programming-bold-duotone"
                        className="text-slate-700"
                      />
                    ),
                    code: '{ active_step: 3, status: "executing" }',
                    delay: 0.3,
                  },
                ].map((card, i) => (
                  <motion.div
                    key={i}
                    className="p-5 bg-white border border-slate-100 rounded-3xl shadow-xl shadow-slate-900/5 flex flex-col justify-between min-h-[170px]"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: card.delay }}
                  >
                    <div className="flex justify-between items-start">
                      <div
                        className={`w-8 h-8 rounded-lg ${card.color} bg-opacity-10 border border-current flex items-center justify-center text-sm`}
                      >
                        {card.icon}
                      </div>
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                        {card.label}
                      </span>
                    </div>

                    <div className="font-mono text-[9px] text-slate-400 mt-2 bg-slate-50 p-2 rounded-lg border border-slate-100/50 select-none overflow-hidden text-ellipsis whitespace-nowrap">
                      {card.code}
                    </div>

                    <div className="h-1.5 w-full bg-slate-50 rounded-full overflow-hidden mt-3">
                      <motion.div
                        className={`h-full ${card.color}`}
                        animate={{ width: ["30%", "90%", "60%"] }}
                        transition={{
                          duration: 4,
                          repeat: Infinity,
                          ease: "easeInOut",
                        }}
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
              {/* Connection lines visual */}
              <div className="absolute inset-0 -z-10 bg-radial-gradient from-purple-500/5 to-transparent blur-3xl scale-150" />
            </div>
          </div>
        </div>

        {/* Stage 4: Enterprise Routing */}
        <div className="text-center">
          <h3 className="text-5xl md:text-7xl font-medium text-slate-900 mb-12 tracking-tight leading-none">
            Enterprise{" "}
            <span className="bg-linear-to-br from-accent via-[#c026d3] to-accent-soft bg-clip-text text-transparent">
              Routing
            </span>
          </h3>
          <p className="text-xl text-slate-500 font-light max-w-3xl mx-auto mb-20 leading-relaxed">
            Intelligent agent handoffs and multi-tier communication logic that
            scales with your organizational complexity. Route inquiries to the
            perfect autonomous unit instantly.
          </p>
          <div className="relative max-w-5xl mx-auto aspect-[900/450] bg-slate-950 rounded-[3rem] overflow-hidden  group border border-white/10">
            {/* Decorative grid & background gradient */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:30px_30px]" />
            <div className="absolute inset-0 bg-radial-gradient from-purple-500/10 via-transparent to-transparent opacity-60" />

            {/* Animated SVG Connections */}
            <svg
              viewBox="0 0 900 450"
              className="absolute inset-0 w-full h-full pointer-events-none z-0"
            >
              <defs>
                <filter id="route-glow" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="3" result="blur" />
                  <feComposite in="SourceGraphic" in2="blur" operator="over" />
                </filter>
                <linearGradient
                  id="glow-grad-left"
                  gradientUnits="userSpaceOnUse"
                  x1="270"
                  y1="225"
                  x2="450"
                  y2="225"
                >
                  <stop offset="0%" stopColor="#10b981" stopOpacity="0.1" />
                  <stop offset="100%" stopColor="var(--color-primary)" stopOpacity="0.8" />
                </linearGradient>
                <linearGradient
                  id="glow-grad-right"
                  gradientUnits="userSpaceOnUse"
                  x1="450"
                  y1="225"
                  x2="630"
                  y2="225"
                >
                  <stop offset="0%" stopColor="var(--color-primary)" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="var(--color-accent)" stopOpacity="0.1" />
                </linearGradient>
              </defs>

              {/* Left WhatsApp connection */}
              <path
                id="p-whatsapp"
                d="M 270 120 C 350 120, 360 225, 450 225"
                stroke="rgba(255,255,255,0.04)"
                strokeWidth="2"
                fill="none"
              />
              <motion.path
                d="M 270 120 C 350 120, 360 225, 450 225"
                stroke="url(#glow-grad-left)"
                strokeWidth="2"
                strokeDasharray="6 10"
                fill="none"
                animate={{ strokeDashoffset: [0, -32] }}
                transition={{ repeat: Infinity, ease: "linear", duration: 2.5 }}
              />
              <motion.circle r="2.5" fill="var(--color-primary)" filter="url(#route-glow)">
                <animateMotion dur="2.5s" repeatCount="indefinite" path="M 270 120 C 350 120, 360 225, 450 225" />
              </motion.circle>

              {/* Left Voice connection */}
              <path
                id="p-voice"
                d="M 270 330 C 350 330, 360 225, 450 225"
                stroke="rgba(255,255,255,0.04)"
                strokeWidth="2"
                fill="none"
              />
              <motion.path
                d="M 270 330 C 350 330, 360 225, 450 225"
                stroke="url(#glow-grad-left)"
                strokeWidth="2"
                strokeDasharray="6 10"
                fill="none"
                animate={{ strokeDashoffset: [0, -32] }}
                transition={{
                  repeat: Infinity,
                  ease: "linear",
                  duration: 2.5,
                  delay: 0.5,
                }}
              />
              <motion.circle r="2.5" fill="var(--color-primary)" filter="url(#route-glow)">
                <animateMotion dur="2.5s" begin="0.5s" repeatCount="indefinite" path="M 270 330 C 350 330, 360 225, 450 225" />
              </motion.circle>

              {/* Right AI Agent connection */}
              <path
                id="p-agent"
                d="M 450 225 C 540 225, 550 90, 630 90"
                stroke="rgba(255,255,255,0.04)"
                strokeWidth="2"
                fill="none"
              />
              <motion.path
                d="M 450 225 C 540 225, 550 90, 630 90"
                stroke="url(#glow-grad-right)"
                strokeWidth="2"
                strokeDasharray="6 10"
                fill="none"
                animate={{ strokeDashoffset: [0, -32] }}
                transition={{ repeat: Infinity, ease: "linear", duration: 3 }}
              />
              <motion.circle r="2.5" fill="var(--color-primary)" filter="url(#route-glow)">
                <animateMotion dur="3s" repeatCount="indefinite" path="M 450 225 C 540 225, 550 90, 630 90" />
              </motion.circle>

              {/* Right Support Team connection */}
              <path
                id="p-support"
                d="M 450 225 L 630 225"
                stroke="rgba(255,255,255,0.04)"
                strokeWidth="2"
                fill="none"
              />
              <motion.path
                d="M 450 225 L 630 225"
                stroke="url(#glow-grad-right)"
                strokeWidth="2"
                strokeDasharray="8 12"
                fill="none"
                animate={{ strokeDashoffset: [0, -40] }}
                transition={{
                  repeat: Infinity,
                  ease: "linear",
                  duration: 2,
                  delay: 0.2,
                }}
              />
              <motion.circle r="2.5" fill="var(--color-primary)" filter="url(#route-glow)">
                <animateMotion dur="2s" begin="0.2s" repeatCount="indefinite" path="M 450 225 L 630 225" />
              </motion.circle>

              {/* Right DB connection */}
              <path
                id="p-db"
                d="M 450 225 C 540 225, 550 360, 630 360"
                stroke="rgba(255,255,255,0.04)"
                strokeWidth="2"
                fill="none"
              />
              <motion.path
                d="M 450 225 C 540 225, 550 360, 630 360"
                stroke="url(#glow-grad-right)"
                strokeWidth="2"
                strokeDasharray="6 10"
                fill="none"
                animate={{ strokeDashoffset: [0, -32] }}
                transition={{
                  repeat: Infinity,
                  ease: "linear",
                  duration: 3.5,
                  delay: 0.4,
                }}
              />
              <motion.circle r="2.5" fill="var(--color-primary)" filter="url(#route-glow)">
                <animateMotion dur="3.5s" begin="0.4s" repeatCount="indefinite" path="M 450 225 C 540 225, 550 360, 630 360" />
              </motion.circle>
            </svg>

            {/* HTML Cards Layer */}
            <div className="absolute inset-0 w-full h-full z-10 flex items-center justify-between px-12 select-none">
              {/* Left Column: Input Channels */}
              <div className="flex flex-col gap-30 ml-10 w-[240px] text-left">
                {/* WhatsApp Card */}
                <motion.div
                  className="bg-white/5 border border-white/10 rounded-2xl p-4 flex items-center gap-3 w-full backdrop-blur-md relative overflow-hidden transition-all duration-300 hover:bg-white/10 hover:border-emerald-500/30 group/node"
                  whileHover={{ y: -2 }}
                >
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-500">
                    <Icon icon="logos:whatsapp-icon" className="text-xl" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1.5 justify-between">
                      <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider">
                        Inbound Msg
                      </span>
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    </div>
                    <h4 className="text-xs font-bold text-white mt-0.5 truncate">
                      WhatsApp Channel
                    </h4>
                    <p className="text-[9px] text-slate-400 mt-1 font-mono truncate">
                      "Cancel subscription plan..."
                    </p>
                  </div>
                </motion.div>

                {/* Voice Card */}
                <motion.div
                  className="bg-white/5 border border-white/10 rounded-2xl p-4 flex items-center gap-3 w-full backdrop-blur-md relative overflow-hidden transition-all duration-300 hover:bg-white/10 hover:border-blue-500/30 group/node"
                  whileHover={{ y: -2 }}
                >
                  <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400">
                    <Phone size={18} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1.5 justify-between">
                      <span className="text-[10px] font-bold text-blue-400 uppercase tracking-wider">
                        Voice Call
                      </span>
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
                    </div>
                    <h4 className="text-xs font-bold text-white mt-0.5 truncate">
                      Direct Audio Ingest
                    </h4>
                    <div className="flex items-center gap-1 mt-1.5 h-3">
                      {[3, 6, 9, 5, 2, 7].map((h, i) => (
                        <div
                          key={i}
                          className="w-0.5 bg-blue-400/50 rounded-full"
                          style={{ height: `${h * 1.2}px` }}
                        />
                      ))}
                    </div>
                  </div>
                </motion.div>
              </div>

              {/* Center: Intelligent Router */}
              <div className="flex flex-col items-center justify-center relative">
                <div className="absolute inset-0 rounded-full bg-purple-500/20 blur-3xl animate-pulse" />

                {/* Rotating Dashed Outer Ring */}
                <div className="absolute w-[180px] h-[180px] rounded-full border border-dashed border-purple-500/30 animate-[spin_24s_linear_infinite] pointer-events-none" />
                <div className="absolute w-[220px] h-[220px] rounded-full border border-dotted border-indigo-500/20 animate-[spin_32s_linear_infinite_reverse] pointer-events-none" />

                {/* Main Router Core */}
                <div className="relative w-28 h-28 bg-linear-to-br from-purple-500 to-indigo-600 rounded-full flex flex-col items-center justify-center shadow-[0_0_50px_rgba(168,85,247,0.4)] border border-purple-400/30 z-10 select-none">
                  <Share2 className="text-white text-3xl animate-pulse" />
                  <span className="text-[9px] font-bold text-purple-200 uppercase tracking-[0.2em] mt-2">
                    ZABY AI
                  </span>
                  <span className="text-[8px] font-medium text-purple-300 uppercase tracking-widest mt-0.5">
                    ROUTER
                  </span>
                </div>

                {/* Router Status Info Box below */}
                <div className="absolute top-[130px] flex flex-col items-center whitespace-nowrap bg-slate-900/90 border border-white/10 rounded-full px-3 py-1 mt-2 backdrop-blur-sm">
                  <div className="flex items-center gap-1.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-purple-500 animate-pulse" />
                    <span className="text-[8px] font-bold text-slate-300 uppercase tracking-widest">
                      Routing intent resolved (99.2%)
                    </span>
                  </div>
                </div>
              </div>

              {/* Right Column: Destinations */}
              <div className="flex flex-col gap-16 mr-5 w-[240px] text-left">
                {/* AI Agent Node */}
                <motion.div
                  className="bg-white/5 border border-white/10 rounded-2xl p-4 flex items-center gap-3 w-full backdrop-blur-md relative overflow-hidden transition-all duration-300 hover:bg-white/10 hover:border-emerald-500/30 group/node"
                  whileHover={{ y: -2 }}
                >
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
                    <Bot size={18} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1.5 justify-between">
                      <span className="text-[9px] font-bold text-emerald-400 uppercase tracking-wider bg-emerald-500/10 px-1.5 py-0.5 rounded font-mono">
                        Execute
                      </span>
                    </div>
                    <h4 className="text-xs font-bold text-white mt-1 truncate">
                      RENO AI Runtime
                    </h4>
                    <p className="text-[9px] text-slate-400 font-medium mt-0.5 truncate">
                      Autonomous CRM Resolve
                    </p>
                  </div>
                </motion.div>

                {/* Human Support Node */}
                <motion.div
                  className="bg-white/5 border border-white/10 rounded-2xl p-4 flex items-center gap-3 w-full backdrop-blur-md relative overflow-hidden transition-all duration-300 hover:bg-white/10 hover:border-blue-500/30 group/node"
                  whileHover={{ y: -2 }}
                >
                  <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400">
                    <Users size={18} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1.5 justify-between">
                      <span className="text-[9px] font-bold text-blue-400 uppercase tracking-wider bg-blue-500/10 px-1.5 py-0.5 rounded font-mono">
                        Queue
                      </span>
                    </div>
                    <h4 className="text-xs font-bold text-white mt-1 truncate">
                      Tier 2 Support Queue
                    </h4>
                    <p className="text-[9px] text-slate-400 font-medium mt-0.5 truncate">
                      Human Escalation Resolved
                    </p>
                  </div>
                </motion.div>

                {/* Database/Workflow Node */}
                <motion.div
                  className="bg-white/5 border border-white/10 rounded-2xl p-4 flex items-center gap-3 w-full backdrop-blur-md relative overflow-hidden transition-all duration-300 hover:bg-white/10 hover:border-purple-500/30 group/node"
                  whileHover={{ y: -2 }}
                >
                  <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400">
                    <Database size={18} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1.5 justify-between">
                      <span className="text-[9px] font-bold text-purple-400 uppercase tracking-wider bg-purple-500/10 px-1.5 py-0.5 rounded font-mono">
                        Trigger
                      </span>
                    </div>
                    <h4 className="text-xs font-bold text-white mt-1 truncate">
                      Database Automation
                    </h4>
                    <p className="text-[9px] text-slate-400 font-medium mt-0.5 truncate">
                      Sync Stripe Billing Stack
                    </p>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
// --- Section 3: Platform Glance ---

const PlatformGlance = () => {
  return (
    <section className="py-32 bg-white border-y border-slate-100 px-6 lg:px-8 overflow-hidden">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-20 items-center">
        <div className="space-y-12">
          <div>
            <Badge>System Architecture</Badge>
            <h2 className="text-4xl sm:text-5xl font-light text-slate-900 tracking-tight leading-tight mt-6 glass-text">
              Operational runtime for multimodal interaction
            </h2>
          </div>

          <div className="space-y-8">
            {[
              {
                title: "Conversational Pipelines",
                desc: "Low-latency streaming architecture for real-time text and voice processing.",
                icon: <Zap className="w-5 h-5" />,
              },
              {
                title: "Memory Orchestration",
                desc: "Persistent state management that syncs across every customer touchpoint.",
                icon: <Database className="w-5 h-5" />,
              },
              {
                title: "Autonomous Execution",
                desc: "Agents that don't just talk, but trigger workflows and update enterprise systems.",
                icon: <Cpu className="w-5 h-5" />,
              },
            ].map((item, i) => (
              <div key={i} className="flex gap-6 group">
                <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-center text-purple-500 transition-all duration-500">
                  {item.icon}
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-slate-900 mb-2">
                    {item.title}
                  </h4>
                  <p className="text-sm text-slate-500 leading-relaxed font-medium">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="relative">
          <div className="relative rounded-3xl border border-slate-200 bg-slate-50 aspect-square overflow-hidden group">
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#00000003_1px,transparent_1px),linear-gradient(to_bottom,#00000003_1px,transparent_1px)] bg-[size:40px_40px]" />

            {/* Mock Dashboard Visualization */}
            <div className="absolute inset-12 flex flex-col gap-6">
              <div className="h-1/3 w-full rounded-2xl border border-slate-200 bg-white/80 p-6 backdrop-blur-sm">
                <div className="flex justify-between items-center mb-4">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-green-500" />
                    <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500">
                      Live Stream
                    </span>
                  </div>
                  <span className="text-[10px] font-medium text-slate-400 tracking-tighter">
                    ID: ZX-902
                  </span>
                </div>
                <div className="space-y-2">
                  <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-blue-600"
                      initial={{ width: "0%" }}
                      whileInView={{ width: "70%" }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        repeatType: "reverse",
                      }}
                    />
                  </div>
                  <div className="h-1.5 w-3/4 bg-slate-100 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-blue-600/60"
                      initial={{ width: "0%" }}
                      whileInView={{ width: "45%" }}
                      transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        repeatType: "reverse",
                        delay: 0.2,
                      }}
                    />
                  </div>
                </div>
              </div>

              <div className="flex-1 grid grid-cols-2 gap-6">
                <div className="rounded-2xl border border-slate-200 bg-white/80 p-6 backdrop-blur-sm flex flex-col justify-between ">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
                    Sentiment
                  </span>
                  <div className="text-2xl font-semibold text-slate-900 tracking-tighter">
                    Positive (98%)
                  </div>
                </div>
                <div className="rounded-2xl border border-slate-200 bg-white/80 p-6 backdrop-blur-sm flex flex-col justify-between">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
                    Latency
                  </span>
                  <div className="text-2xl font-semibold text-blue-600 tracking-tighter">
                    14ms
                  </div>
                </div>
              </div>

              <div className="h-1/4 w-full rounded-2xl border border-blue-600/20 bg-white p-6 backdrop-blur-sm flex items-center justify-between group-hover:border-blue-600 transition-colors">
                <div className="flex items-center gap-4">
                  <div className="w-8 h-8 rounded-full bg-blue-600/10 flex items-center justify-center">
                    <Workflow className="w-4 h-4 text-blue-600" />
                  </div>
                  <span className="text-sm font-semibold text-slate-900">
                    Trigger Workflow: Order Sync
                  </span>
                </div>
                <div className="w-6 h-6 rounded-full border border-slate-200 flex items-center justify-center">
                  <ArrowRight className="w-3 h-3 text-slate-900" />
                </div>
              </div>
            </div>

            {/* Decorative ambient highlights */}
            <div className="absolute -top-24 -right-24 w-64 h-64 bg-blue-600/5 blur-[100px]" />
            <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-purple-500/5 blur-[100px]" />
          </div>
        </div>
      </div>
    </section>
  );
};


// --- Section 4: CTA Section ---

const CTASection = () => {
  const router = useRouter();
  return (
    <section className="relative py-40 bg-[var(--color-bg)] px-6 text-center overflow-hidden">
      {/* Background Animated Communication Mesh */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <svg
          className="w-full h-full"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
        >
          {[...Array(10)].map((_, i) => (
            <motion.line
              key={i}
              x1="0"
              y1={i * 10}
              x2="100"
              y2={i * 10 + 5}
              stroke="var(--color-primary)"
              strokeWidth="0.1"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 10, repeat: Infinity, delay: i * 0.5 }}
            />
          ))}
        </svg>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center">
        <SectionHeading 
          title={<>Deploy conversational AI systems that <span className="bg-linear-to-br from-accent via-[#c026d3] to-accent-soft bg-clip-text text-transparent font-light">operate</span> beyond chat.</>}
          subtitle="Build operational AI communication infrastructure across voice, messaging, workflows, and enterprise systems."
          align="center"
        />

        <div className="mt-12 flex flex-col sm:flex-row gap-4 items-center">
          <ShimmerButton 
            asChild
            shimmerColor="#e879f9"
            background="var(--color-button-primary-bg)"
            className="group relative flex w-full cursor-pointer items-center justify-center gap-3 rounded-full px-8 py-6 text-md font-medium tracking-wide text-white shadow-[var(--shadow-glow-accent)] transition-all hover:bg-(--color-button-primary-hover) sm:w-auto"
          >
            <Link href="https://platform.zaby.io/signup">
              Start Building
            </Link>
          </ShimmerButton>
          <button
            onClick={() => router.push("https://platform.zaby.io/signup")}
            className="flex w-full cursor-pointer items-center justify-center gap-3 rounded-full border border-(--color-button-secondary-border) bg-(--color-button-secondary-bg) px-8 py-6 font-medium text-(--color-button-secondary-text) transition-all hover:bg-white sm:w-auto"
          >
            Explore Runtime
          </button>
        </div>
      </div>

      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-gradient-to-t from-primary/5 to-transparent blur-3xl pointer-events-none" />
    </section>
  );
};

// --- Main Component ---

export default function ConversationalAI() {
  return (
    <div className="w-full min-h-screen h-auto bg-[var(--color-bg)] text-[var(--color-text-primary)] font-sans antialiased selection:bg-primary/10 p-6 md:p-12 lg:p-16 flex flex-col gap-16 relative overflow-x-hidden">
      <HeroSection />
      <FeatureSection />
      <PlatformGlance />
      {/* <CTASection /> */}
      {/* -------------------- SECTION 6: CTA BANNER WITH INTERACTIVE SHADER -------------------- */}
      <footer className="w-full relative z-10 mt-6 flex flex-col gap-6">
        <HeroLiquidMetalRoot
          title="Deploy conversational AI"
          subtitle="systems that operate beyond chat."
          description="Build operational AI communication infrastructure across voice, messaging, workflows, and enterprise systems."
          image="/cult-icon.svg"
          desktopShaderProps={{
            scale: 0.7,
            speed: 0.6,
            repetition: 6,
            softness: 0.8,
            distortion: 0.4,
            colorTint: "#e879f9",
          }}
          mobileShaderProps={{
            speed: 0.65,
            scale: 0.78,
            colorTint: "#e879f9",
          }}
          className="w-full rounded-2xl bg-primary/5 backdrop-blur-lg text-white border border-primary/50 relative overflow-hidden min-h-[320px] h-auto flex flex-col justify-between p-6 md:p-8"
        >
          <HeroLiquidMetalContainer className="relative z-10 grid gap-6 pb-0 sm:pb-0 lg:pb-0 sm:gap-6 lg:grid-cols-[1.4fr_0.6fr] lg:items-center lg:gap-8 w-full max-w-none px-0">
            <HeroLiquidMetalContent className="p-0 sm:px-0 md:px-0 lg:pr-0 lg:pl-0 xl:pl-0 2xl:pl-0 text-left items-start gap-3">
              <HeroLiquidMetalHeading
                className="text-left pt-0 sm:pt-0 lg:pt-0"
                headingClassName="text-2xl !text-[var(--color-text-primary)] md:text-3xl lg:text-3xl xl:text-3xl 2xl:text-3xl font-light leading-tight tracking-tight text-white text-left lg:text-left pt-0 sm:pt-0"
              />
              <HeroLiquidMetalDescription
                className="text-left mx-0 max-w-none pb-0 sm:pb-0 lg:pb-0"
                descriptionClassName="!text-[var(--color-text-secondary)] font-light text-xs md:text-sm leading-relaxed max-w-lg text-left lg:text-left"
              />

              <div className="relative z-10 flex flex-wrap gap-3 pt-4 border-t border-white/10 mt-2 w-full justify-start">
                <ShimmerButton 
                  asChild
                  shimmerColor="#e879f9"
                  background="var(--color-button-primary-bg)"
                  className="group relative flex w-full cursor-pointer items-center justify-center gap-3 rounded-full px-6 py-3.5 text-sm font-medium tracking-wide text-white shadow-[var(--shadow-glow-accent)] transition-all hover:bg-(--color-button-primary-hover) sm:w-auto"
                >
                  <Link href="https://platform.zaby.io/signup">
                    Start Building
                    <Icon icon="solar:arrow-right-linear" />
                  </Link>
                </ShimmerButton>
                <Link
                  href="https://platform.zaby.io/signup"
                  className="flex w-full cursor-pointer items-center justify-center gap-3 rounded-full border border-(--color-button-secondary-border) bg-(--color-button-secondary-bg) px-8 py-3.5 font-medium text-(--color-button-secondary-text) transition-all hover:bg-white sm:w-auto"
                >
                  Explore Runtime
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
