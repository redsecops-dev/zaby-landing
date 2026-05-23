"use client";

import React, { useEffect, useRef } from "react";
import { Icon } from "@iconify/react";
import { motion, useScroll, useTransform } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { 
  MessageSquare, 
  Phone, 
  Mail, 
  Database, 
  Cpu, 
  Globe, 
  ShieldCheck,
  Zap,
  ArrowRight,
  Share2,
  Workflow,
  History
} from "lucide-react";
import Link from "next/link";

// --- Components ---

const Badge = ({ children }: { children: React.ReactNode }) => (
  <div className="inline-flex items-center gap-1.5 rounded-full bg-accent/10 px-3 py-1 text-xs text-accent ring-1 ring-inset ring-accent/20 uppercase tracking-tight font-medium mb-6 backdrop-blur-sm">
    {children}
  </div>
);

// --- Section 1: Hero Hub Visualization ---

const channels = [
  { name: "WhatsApp", icon: "logos:whatsapp-icon", x: 100, y: 30 },
  { name: "Voice", icon: "lucide:phone", x: 200, y: 30, color: "#60a5fa" },
  { name: "SMS", icon: "lucide:message-square", x: 300, y: 30, color: "#fff" },
  { name: "Teams", icon: "logos:microsoft-teams", x: 400, y: 30 },
  { name: "Slack", icon: "logos:slack-icon", x: 500, y: 30 },
  { name: "Discord", icon: "logos:discord-icon", x: 600, y: 30 },
  { name: "Email", icon: "lucide:mail", x: 700, y: 30, color: "#fff" },
  { name: "CRM", icon: "lucide:database", x: 800, y: 30, color: "#fbbf24" },
];

const HeroSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      gsap.from(".gsap-reveal", {
        y: 40,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        ease: "power4.out",
        scrollTrigger: {
          trigger: ".gsap-reveal",
          start: "top 90%",
        }
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative min-h-screen flex flex-col items-center justify-center py-24 overflow-hidden bg-[#0a0a0a]">
      {/* Background Effects */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="h-[800px] w-[800px] rounded-full bg-accent/5 blur-[120px]" />
        </div>
        <div className="absolute top-0 left-0 w-full h-full opacity-[0.03] mix-blend-overlay bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]" />
      </div>

      <div className="relative w-full max-w-5xl mx-auto px-6 lg:px-8 z-10 text-center flex flex-col items-center">
        <div className="gsap-reveal">
          <Badge>
            <Icon icon="solar:chat-round-line-linear" className="text-sm" />
            Conversational Infrastructure
          </Badge>
        </div>

        <h1 className="gsap-reveal text-4xl sm:text-5xl md:text-7xl font-normal text-white tracking-tight leading-[1.1] max-w-4xl">
          Unify every customer <span className="text-accent italic">conversation</span>
        </h1>
        
        <p className="gsap-reveal mt-8 max-w-2xl text-base sm:text-lg text-neutral-400 leading-relaxed font-light">
          Deploy AI-native conversational systems across messaging, voice, support, and enterprise communication channels from a single operational runtime.
        </p>

        {/* Visualization Hub */}
        <div className="relative mt-20 w-full max-w-4xl aspect-[16/9] sm:aspect-[900/400]">
          <svg viewBox="0 0 900 400" className="absolute inset-0 w-full h-full pointer-events-none" fill="none">
            <defs>
              <filter id="hub-glow" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="5" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
              <linearGradient id="line-grad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="var(--color-accent)" stopOpacity="0" />
                <stop offset="50%" stopColor="var(--color-accent)" stopOpacity="0.5" />
                <stop offset="100%" stopColor="var(--color-accent)" stopOpacity="1" />
              </linearGradient>
            </defs>

            {channels.map((ch, i) => (
              <React.Fragment key={i}>
                {/* Background path */}
                <path 
                  d={`M${ch.x} ${ch.y} C ${ch.x} 150, 450 200, 450 330`} 
                  stroke="rgba(255,255,255,0.05)" 
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
                    pathOffset: [0, 0, 1]
                  }}
                  transition={{ 
                    duration: 3, 
                    repeat: Infinity, 
                    delay: i * 0.4,
                    ease: "easeInOut"
                  }}
                />

                {/* Pulse travel */}
                <motion.circle
                  r="3"
                  fill="var(--color-accent)"
                  filter="url(#hub-glow)"
                  initial={{ offsetDistance: "0%" }}
                  animate={{ offsetDistance: "100%" }}
                  transition={{ duration: 3, repeat: Infinity, delay: i * 0.4, ease: "linear" }}
                  style={{ offsetPath: `path('M${ch.x} ${ch.y} C ${ch.x} 150, 450 200, 450 330')` }}
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
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#111] border border-white/10 shadow-2xl backdrop-blur-xl group">
                <Icon icon={ch.icon} className="text-2xl" style={{ color: ch.color }} />
                <div className="absolute inset-0 rounded-2xl bg-accent/5 opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              <span className="text-[10px] uppercase tracking-widest text-neutral-500 font-semibold">{ch.name}</span>
            </div>
          ))}

          {/* Center Core Node */}
          <div className="absolute top-[85%] left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 flex flex-col items-center gap-4">
            <div className="relative group">
              <div className="absolute inset-0 rounded-3xl bg-accent/20 blur-2xl animate-pulse" />
              <div className="relative flex h-20 w-20 items-center justify-center rounded-3xl bg-[#0a0a0a] border border-accent/30 shadow-[0_0_50px_-12px_rgba(var(--color-accent-rgb),0.5)]">
                <Icon icon="solar:bolt-circle-bold-duotone" className="text-5xl text-accent" />
                
                {/* Orbital Rings */}
                <div className="absolute inset-[-10px] rounded-full border border-accent/10 animate-[spin_10s_linear_infinite]" />
                <div className="absolute inset-[-20px] rounded-full border border-accent/5 animate-[spin_15s_linear_infinite_reverse]" />
              </div>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-xs font-bold text-white uppercase tracking-[0.2em]">Zaby Conversational Runtime</span>
              <div className="flex items-center gap-2 mt-1">
                <div className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
                <span className="text-[10px] text-accent/80 font-medium uppercase tracking-widest">Operational Core Active</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Feature Strip */}
        <div className="mt-32 w-full pt-12 border-t border-white/5">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              "Real-time orchestration",
              "Multi-channel memory",
              "Enterprise-grade routing",
              "Autonomous conversations"
            ].map((text, i) => (
              <div key={i} className="flex flex-col items-center gap-3 group">
                <div className="h-px w-12 bg-accent/20 group-hover:w-20 transition-all duration-500" />
                <span className="text-[11px] uppercase tracking-widest text-neutral-500 group-hover:text-neutral-300 transition-colors">
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

const features = [
  {
    title: "WhatsApp AI Agents",
    desc: "Deploy autonomous agents that handle complex customer inquiries directly on WhatsApp.",
    icon: <Icon icon="logos:whatsapp-icon" />,
    size: "col-span-12 md:col-span-8",
    gradient: "from-green-500/10 via-transparent to-transparent"
  },
  {
    title: "Voice Automation",
    desc: "Real-time AI voice systems for automated calling and IVR.",
    icon: <Phone className="w-6 h-6 text-blue-400" />,
    size: "col-span-12 md:col-span-4",
    gradient: "from-blue-500/10 via-transparent to-transparent"
  },
  {
    title: "Multi-channel Memory",
    desc: "Unified memory layer across all platforms for persistent context.",
    icon: <History className="w-6 h-6 text-purple-400" />,
    size: "col-span-12 md:col-span-4",
    gradient: "from-purple-500/10 via-transparent to-transparent"
  },
  {
    title: "Enterprise Routing",
    desc: "Intelligent agent handoffs and multi-tier communication logic.",
    icon: <Workflow className="w-6 h-6 text-accent" />,
    size: "col-span-12 md:col-span-8",
    gradient: "from-accent/10 via-transparent to-transparent"
  }
];

const FeatureSection = () => {
  return (
    <section className="py-24 bg-[#0a0a0a] px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col items-center text-center mb-16">
          <Badge>Capabilities</Badge>
          <h2 className="text-3xl sm:text-5xl font-normal text-white tracking-tight">Beyond simple chat</h2>
        </div>

        <div className="grid grid-cols-12 gap-6">
          {features.map((f, i) => (
            <div 
              key={i}
              className={`${f.size} group relative overflow-hidden rounded-3xl border border-white/5 bg-[#111] p-8 transition-all hover:border-white/10`}
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${f.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-700`} />
              <div className="relative z-10 h-full flex flex-col justify-between">
                <div className="mb-12">
                  <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-6">
                    {f.icon}
                  </div>
                  <h3 className="text-xl font-medium text-white mb-3">{f.title}</h3>
                  <p className="text-sm text-neutral-500 leading-relaxed max-w-sm">{f.desc}</p>
                </div>
                <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-accent opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                  Operational Details <ArrowRight className="w-3 h-3" />
                </div>
              </div>
              
              {/* Telemetry background effect */}
              <div className="absolute right-0 bottom-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                 <Icon icon="solar:graph-up-linear" className="text-8xl text-white" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// --- Section 3: Platform Glance ---

const PlatformGlance = () => {
  return (
    <section className="py-32 bg-[#0a0a0a] border-y border-white/5 px-6 lg:px-8 overflow-hidden">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-20 items-center">
        <div className="space-y-12">
          <div>
            <Badge>System Architecture</Badge>
            <h2 className="text-4xl sm:text-5xl font-normal text-white tracking-tight leading-tight mt-6">
              Operational runtime for multimodal interaction
            </h2>
          </div>
          
          <div className="space-y-8">
            {[
              { 
                title: "Conversational Pipelines", 
                desc: "Low-latency streaming architecture for real-time text and voice processing.",
                icon: <Zap className="w-5 h-5" /> 
              },
              { 
                title: "Memory Orchestration", 
                desc: "Persistent state management that syncs across every customer touchpoint.",
                icon: <Database className="w-5 h-5" /> 
              },
              { 
                title: "Autonomous Execution", 
                desc: "Agents that don't just talk, but trigger workflows and update enterprise systems.",
                icon: <Cpu className="w-5 h-5" /> 
              }
            ].map((item, i) => (
              <div key={i} className="flex gap-6 group">
                <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-accent group-hover:bg-accent group-hover:text-black transition-all duration-500">
                  {item.icon}
                </div>
                <div>
                  <h4 className="text-lg font-medium text-white mb-2">{item.title}</h4>
                  <p className="text-sm text-neutral-500 leading-relaxed font-light">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="relative">
          <div className="relative rounded-3xl border border-white/10 bg-[#111] aspect-square overflow-hidden group">
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:40px_40px]" />
            
            {/* Mock Dashboard Visualization */}
            <div className="absolute inset-12 flex flex-col gap-6">
              <div className="h-1/3 w-full rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
                <div className="flex justify-between items-center mb-4">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-green-500" />
                    <span className="text-[10px] font-bold uppercase tracking-widest text-neutral-400 text-white">Live Stream</span>
                  </div>
                  <span className="text-[10px] font-medium text-neutral-600 tracking-tighter">ID: ZX-902</span>
                </div>
                <div className="space-y-2">
                  <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                    <motion.div 
                      className="h-full bg-accent"
                      initial={{ width: "0%" }}
                      whileInView={{ width: "70%" }}
                      transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
                    />
                  </div>
                  <div className="h-1.5 w-3/4 bg-white/5 rounded-full overflow-hidden">
                    <motion.div 
                      className="h-full bg-accent/60"
                      initial={{ width: "0%" }}
                      whileInView={{ width: "45%" }}
                      transition={{ duration: 1.5, repeat: Infinity, repeatType: "reverse", delay: 0.2 }}
                    />
                  </div>
                </div>
              </div>

              <div className="flex-1 grid grid-cols-2 gap-6">
                <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm flex flex-col justify-between">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-neutral-500">Sentiment</span>
                  <div className="text-2xl font-medium text-white tracking-tighter">Positive (98%)</div>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm flex flex-col justify-between">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-neutral-500">Latency</span>
                  <div className="text-2xl font-medium text-accent tracking-tighter">14ms</div>
                </div>
              </div>

              <div className="h-1/4 w-full rounded-2xl border border-accent/20 bg-accent/5 p-6 backdrop-blur-sm flex items-center justify-between group-hover:border-accent transition-colors">
                <div className="flex items-center gap-4">
                  <div className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center">
                    <Workflow className="w-4 h-4 text-accent" />
                  </div>
                  <span className="text-sm font-medium text-white">Trigger Workflow: Order Sync</span>
                </div>
                <div className="w-6 h-6 rounded-full border border-white/20 flex items-center justify-center">
                  <ArrowRight className="w-3 h-3 text-white" />
                </div>
              </div>
            </div>
            
            {/* Decorative ambient highlights */}
            <div className="absolute -top-24 -right-24 w-64 h-64 bg-accent/10 blur-[100px]" />
            <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-purple-500/10 blur-[100px]" />
          </div>
        </div>
      </div>
    </section>
  );
};

// --- Section 4: CTA Section ---

const CTASection = () => {
  return (
    <section className="relative py-40 bg-[#0a0a0a] px-6 text-center overflow-hidden">
      {/* Background Animated Communication Mesh */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
         <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
           {[...Array(10)].map((_, i) => (
             <motion.line
               key={i}
               x1="0"
               y1={i * 10}
               x2="100"
               y2={i * 10 + 5}
               stroke="rgba(var(--color-accent-rgb), 0.2)"
               strokeWidth="0.1"
               initial={{ pathLength: 0 }}
               animate={{ pathLength: 1 }}
               transition={{ duration: 10, repeat: Infinity, delay: i * 0.5 }}
             />
           ))}
         </svg>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center">
        <h2 className="text-3xl sm:text-5xl md:text-6xl font-normal text-white tracking-tight leading-[1.1]">
          Deploy conversational AI systems that <span className="italic text-accent">operate</span> beyond chat.
        </h2>
        <p className="mt-10 max-w-2xl text-base sm:text-xl text-neutral-400 font-light leading-relaxed">
          Build operational AI communication infrastructure across voice, messaging, workflows, and enterprise systems.
        </p>
        
        <div className="mt-12 flex flex-col sm:flex-row gap-4 items-center">
          <Link href="https://platform.zaby.io" className="bg-accent text-black font-semibold px-10 py-4 rounded-full hover:bg-accent-hover transition-all duration-300 shadow-[0_0_40px_-10px_rgba(var(--color-accent-rgb),0.5)]">
            Start Building
          </Link>
          <button className="text-white border border-white/10 px-10 py-4 rounded-full hover:bg-white/5 transition-all">
            Explore Runtime
          </button>
        </div>
      </div>

      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-gradient-to-t from-accent/5 to-transparent blur-3xl pointer-events-none" />
    </section>
  );
};

// --- Main Component ---

export default function ConversationalAI() {
  return (
    <div className="bg-[#0a0a0a] min-h-screen text-neutral-300 antialiased selection:bg-accent/30 selection:text-accent-soft">
      <HeroSection />
      <FeatureSection />
      <PlatformGlance />
      <CTASection />
    </div>
  );
}
