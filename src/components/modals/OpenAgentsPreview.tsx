"use client";

import React from "react";
import { Network, Sparkles, Volume2, Globe, Cpu, Layers } from "lucide-react";
import { motion } from "framer-motion";
import { Icon } from "@iconify/react";
import SandboxDashboard from "../shared/SandboxDashboard";
export function OpenAgentsPreview() {
  return (
    <div className="w-full min-h-full h-auto bg-gradient-to-br from-(--color-muted)/20 via-white to-slate-50/50 text-slate-800 font-sans antialiased selection:bg-(--color-accent)/10 p-8 flex flex-col gap-12 relative overflow-hidden"
      style={{ backgroundImage: "radial-gradient(circle at top center, rgba(232, 121, 249, 0.04) 0%, transparent 60%)" }}>

      {/* Background subtle grid */}
      <div className="absolute inset-0 pointer-events-none opacity-40"
        style={{
          backgroundImage: "linear-gradient(to right, rgba(148,163,184,0.08) 1px, transparent 1px), linear-gradient(to bottom, rgba(148,163,184,0.08) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
          maskImage: "radial-gradient(circle at center, black, transparent 80%)",
          WebkitMaskImage: "radial-gradient(circle at center, black, transparent 80%)"
        }} />

      {/* Hero / Header */}
      <div className="w-full relative z-10">

        <h1 className="text-4xl sm:text-5xl font-light tracking-tight text-slate-900 mb-3">
          AI <span className="text-(--color-accent) font-semibold">Infrastructure</span>
        </h1>
        <p className="text-slate-600 text-lg max-w-2xl">
          Build, orchestrate, and integrate custom agents equipped with modular capabilities and next-generation execution layers.
        </p>
      </div>

      {/* SECTION 1: CAPABILITIES */}
      {/* ------------------------------------------------------------- */}
      <section className="w-full relative z-10">
        {/* Header */}
        <div className="flex flex-col items-center text-center mb-16 relative z-10">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-(--color-accent) text-xs uppercase tracking-[0.25em] font-bold">Agent Capabilities</span>
          </div>

          <h2 className="text-2xl md:text-3xl font-light tracking-tight text-slate-900 leading-tight flex flex-col items-center gap-2">
            <span className="flex flex-wrap justify-center gap-2 overflow-hidden py-1">
              <motion.span
                initial={{ y: "110%" }}
                whileInView={{ y: "0%" }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="block text-slate-800 font-light"
              >
                Advanced architecture engineered for autonomy.
              </motion.span>
            </span>
          </h2>
        </div>

        {/* Bento Grid Container with Border Gradients */}
        <div className="grid grid-cols-1 lg:grid-cols-3 relative z-10 bg-white/60 backdrop-blur-md shadow-[0_20px_50px_rgba(0,0,0,0.03)] border border-slate-200/80 rounded-2xl overflow-hidden">

          {/* Cell 1: Autonomous workflow automation */}
          <div className="p-8 h-72 relative group overflow-hidden bg-white"
            style={{ borderRight: "1px solid rgba(226, 232, 240, 0.8)", borderBottom: "1px solid rgba(226, 232, 240, 0.8)" }}>

            {/* Aura Asset */}
            <img src="https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/5ee0a38a-b5d3-4531-8793-98beed4af162_1600w.jpg"
              alt="Workflow Architecture"
              className="absolute inset-0 w-full h-full object-cover opacity-[0.05] transition-transform duration-1000 group-hover:scale-110"
              style={{ maskImage: "radial-gradient(circle at right bottom, black, transparent 70%)", WebkitMaskImage: "radial-gradient(circle at right bottom, black, transparent 70%)" }} />

            <div className="absolute -top-[2px] -left-[2px] w-[3px] h-[3px] bg-slate-100 border border-slate-300 z-20 box-content"></div>

            <div className="relative z-10 flex flex-col h-full justify-between">
              <div>
                <span className="text-[10px] uppercase tracking-widest text-(--color-accent) font-bold mb-2 block">01 / Workflow</span>
                <h3 className="text-lg font-semibold text-slate-900 mb-2">Autonomous Workflow Automation</h3>
                <p className="text-xs text-slate-500 leading-relaxed max-w-[90%]">
                  Orchestrate complex tasks from start to finish without human intervention, adapting dynamically to system state changes.
                </p>
              </div>

              <div className="self-end opacity-[0.08] transition-all duration-700 group-hover:opacity-[0.15] group-hover:scale-105">
                <svg width="50" height="50" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M10,40 L50,60 L50,90 L10,70 Z" fill="black" stroke="black" strokeWidth="0.5"></path>
                  <path d="M90,40 L90,70 L50,90 L50,60 Z" fill="black" stroke="black" strokeWidth="0.5"></path>
                  <path d="M50,20 L90,40 L50,60 L10,40 Z" fill="black" stroke="black" strokeWidth="0.5"></path>
                </svg>
              </div>
            </div>
          </div>

          {/* Cell 2: Central Cube - Multi-step reasoning & decision making */}
          <div className="p-8 h-96 lg:h-auto lg:row-span-2 relative flex flex-col items-center justify-center overflow-hidden bg-slate-50/30"
            style={{ borderRight: "1px solid rgba(226, 232, 240, 0.8)", borderBottom: "1px solid rgba(226, 232, 240, 0.8)" }}>

            {/* Aura Asset */}
            <img src="https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/fa51902b-c2a4-4c33-a96e-a8f1ef67edc6_1600w.jpg"
              alt="Core Glow"
              className="absolute inset-0 w-full h-full object-cover opacity-[0.03]"
              style={{ maskImage: "radial-gradient(circle at center, black, transparent 60%)", WebkitMaskImage: "radial-gradient(circle at center, black, transparent 60%)" }} />

            <div className="absolute -top-[2px] -left-[2px] w-[3px] h-[3px] bg-slate-100 border border-slate-300 z-20 box-content"></div>

            {/* Spinning Orbits */}
            <div className="absolute inset-0 flex items-center justify-center opacity-[0.15] pointer-events-none z-0">
              <svg width="300" height="300" viewBox="0 0 100 100" className="animate-[spin_40s_linear_infinite]">
                <circle cx="50" cy="50" r="20" fill="none" stroke="black" strokeWidth="0.2" strokeDasharray="1 2"></circle>
                <circle cx="50" cy="50" r="30" fill="none" stroke="black" strokeWidth="0.2" strokeDasharray="1 3"></circle>
                <circle cx="50" cy="50" r="40" fill="none" stroke="black" strokeWidth="0.2" strokeDasharray="2 4"></circle>
                <circle cx="50" cy="50" r="45" fill="none" stroke="black" strokeWidth="0.1" strokeDasharray="1 5"></circle>
              </svg>
            </div>

            {/* Glowing 3D-like Cube */}
            <div className="relative w-40 h-40 z-10 flex items-center justify-center animate-pulse" style={{ animationDuration: "5s" }}>
              <div className="absolute inset-0 bg-(--color-accent)/10 blur-[45px] rounded-full scale-125"></div>

              <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-[0_8px_20px_rgba(232,121,249,0.3)] transition-transform duration-1000 hover:scale-105" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <linearGradient id="topFace" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#f0abfc"></stop>
                    <stop offset="100%" stopColor="#e879f9"></stop>
                  </linearGradient>
                  <linearGradient id="leftFace" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#d946ef"></stop>
                    <stop offset="100%" stopColor="#c026d3"></stop>
                  </linearGradient>
                  <linearGradient id="rightFace" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#e879f9"></stop>
                    <stop offset="100%" stopColor="#701a75"></stop>
                  </linearGradient>
                </defs>
                <polygon points="50,20 90,40 50,60 10,40" fill="url(#topFace)" stroke="#fdf4ff" strokeWidth="0.5" strokeLinejoin="round"></polygon>
                <polygon points="10,40 50,60 50,90 10,70" fill="url(#leftFace)" stroke="#e879f9" strokeWidth="0.5" strokeLinejoin="round"></polygon>
                <polygon points="90,40 90,70 50,90 50,60" fill="url(#rightFace)" stroke="#d946ef" strokeWidth="0.5" strokeLinejoin="round"></polygon>
              </svg>
            </div>

            <div className="mt-8 text-center max-w-[90%] relative z-10">
              <span className="text-[10px] uppercase tracking-widest text-(--color-accent) font-bold mb-2 block">Core Intelligence</span>
              <h3 className="text-lg font-semibold text-slate-900 mb-2">Multi-Step Reasoning & Decision Making</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Empower agents to evaluate complex execution trees, plan steps ahead, and automatically self-heal from exceptions.
              </p>
            </div>
          </div>

          {/* Cell 3: Sandbox MCPs */}
          <div className="p-8 h-72 relative group overflow-hidden bg-white"
            style={{ borderRight: "1px solid rgba(226, 232, 240, 0.8)", borderBottom: "1px solid rgba(226, 232, 240, 0.8)" }}>

            <div className="absolute -top-[2px] -left-[2px] w-[3px] h-[3px] bg-slate-100 border border-slate-300 z-20 box-content"></div>

            <div className="relative z-10 flex flex-col h-full justify-between">
              <div>
                <span className="text-[10px] uppercase tracking-widest text-(--color-accent) font-bold mb-2 block">02 / Protocol</span>
                <h3 className="text-lg font-semibold text-slate-900 mb-2">Sandbox MCPs</h3>
                <p className="text-xs text-slate-500 leading-relaxed max-w-[90%]">
                  Expose secure Model Context Protocol servers to agents, enabling dynamic tool discovery and safe sandbox resource execution.
                </p>
              </div>

              {/* Animated MCP Server Badge */}
              <div className="flex items-center gap-2.5 px-3.5 py-2 rounded-full border border-slate-200 bg-slate-50 backdrop-blur-md shadow-[0_4px_12px_rgba(0,0,0,0.02)] self-start mt-2">
                <span className="flex h-2 w-2 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                <span className="text-[9px] text-slate-500 font-mono tracking-wider font-semibold">MCP_SERVER_ACTIVE</span>
              </div>
            </div>
          </div>

          {/* Cell 4: Browser/Desktop automation */}
          <div className="p-8 h-72 relative group overflow-hidden bg-white"
            style={{ borderRight: "1px solid rgba(226, 232, 240, 0.8)", borderBottom: "1px solid rgba(226, 232, 240, 0.8)" }}>

            {/* Aura Asset */}
            <img src="https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/e534354d-c5f2-4399-a1d9-2f50338e8c47_1600w.jpg"
              alt="Abstract Waves"
              className="absolute inset-0 w-full h-full object-cover opacity-[0.04] transition-transform duration-1000 group-hover:scale-110"
              style={{ maskImage: "linear-gradient(to top, black, transparent)", WebkitMaskImage: "linear-gradient(to top, black, transparent)" }} />

            <div className="absolute -top-[2px] -left-[2px] w-[3px] h-[3px] bg-slate-100 border border-slate-300 z-20 box-content"></div>

            <div className="relative z-10 flex flex-col h-full justify-between">
              <div>
                <span className="text-[10px] uppercase tracking-widest text-(--color-accent) font-bold mb-2 block">03 / Execution</span>
                <h3 className="text-lg font-semibold text-slate-900 mb-2">Browser & Desktop Automation</h3>
                <p className="text-xs text-slate-500 leading-relaxed max-w-[90%]">
                  Cross-platform environment interaction, directly managing web viewports, filesystems, and legacy desktop software.
                </p>
              </div>

              <div className="relative w-36 h-16 overflow-hidden self-center opacity-75 mt-2">
                <svg viewBox="0 0 100 45" className="absolute bottom-0 w-full opacity-20 transition-transform duration-700 group-hover:-translate-y-2">
                  <polygon points="5,35 50,15 95,35 50,55" fill="none" stroke="currentColor" strokeWidth="0.75"></polygon>
                </svg>
                <svg viewBox="0 0 100 45" className="absolute bottom-1.5 w-full opacity-45 transition-transform duration-700 group-hover:-translate-y-4">
                  <polygon points="5,25 50,5 95,25 50,45" fill="none" stroke="currentColor" strokeWidth="0.75"></polygon>
                </svg>
                <svg viewBox="0 0 100 45" className="absolute bottom-3 w-full drop-shadow-[0_12px_20px_rgba(232,121,249,0.25)] transition-transform duration-700 group-hover:-translate-y-6">
                  <polygon points="5,15 50,-5 95,15 50,35" fill="url(#topFace)" stroke="var(--color-accent)" strokeWidth="0.5"></polygon>
                </svg>
              </div>
            </div>
          </div>

          {/* Cell 5: Tool/API integration */}
          <div className="p-8 h-72 relative group overflow-hidden bg-white"
            style={{ borderRight: "1px solid rgba(226, 232, 240, 0.8)", borderBottom: "1px solid rgba(226, 232, 240, 0.8)" }}>

            <div className="absolute -top-[2px] -left-[2px] w-[3px] h-[3px] bg-slate-100 border border-slate-300 z-20 box-content"></div>

            {/* Dynamic path lines background */}
            <div className="absolute inset-0 right-8 bottom-8 opacity-[0.25] pointer-events-none transition-transform duration-1000 group-hover:scale-105">
              <svg width="100%" height="100%" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="absolute bottom-4 right-0 w-40 h-40">
                <path d="M30,150 L80,100 L120,130 L170,80" stroke="rgba(0,0,0,0.1)" strokeWidth="1"></path>
                <path d="M80,100 L110,60 L170,80" stroke="rgba(0,0,0,0.1)" strokeWidth="1"></path>
                <path d="M80,100 L120,130 L170,80" stroke="var(--color-accent)" strokeWidth="1.2" strokeDasharray="4 4" className="drop-shadow-[0_0_5px_rgba(232,121,249,0.4)]"></path>
                <rect x="28" y="148" width="4" height="4" fill="#ffffff" stroke="#94a3b8" strokeWidth="0.5" transform="rotate(45 30 150)"></rect>
                <rect x="78" y="98" width="4" height="4" fill="#ffffff" stroke="#94a3b8" strokeWidth="0.5" transform="rotate(45 80 100)"></rect>
                <rect x="118" y="128" width="4" height="4" fill="#ffffff" stroke="var(--color-accent)" strokeWidth="1" transform="rotate(45 120 130)"></rect>
                <rect x="168" y="78" width="4" height="4" fill="var(--color-accent)" stroke="var(--color-surface-raised)" strokeWidth="0.5" transform="rotate(45 170 80)"></rect>
              </svg>
            </div>

            <div className="relative z-10 flex flex-col h-full justify-between">
              <div>
                <span className="text-[10px] uppercase tracking-widest text-(--color-accent) font-bold mb-2 block">04 / Integration</span>
                <h3 className="text-lg font-semibold text-slate-900 mb-2">Tool & API Integration</h3>
                <p className="text-xs text-slate-500 leading-relaxed max-w-[90%]">
                  Connect agents to thousands of SaaS applications, custom APIs, local databases, and execution sandboxes instantly.
                </p>
              </div>
              <div className="h-6" />
            </div>
          </div>

        </div>
      </section>

      {/* ------------------------------------------------------------- */}
      {/* SECTION 2: SUPPORTED OS */}
      {/* ------------------------------------------------------------- */}
      <section className="w-full relative z-10 border-t border-slate-100 pt-12">
        <div className="flex flex-col lg:flex-row gap-12 items-start">

          {/* Left Side: Sticky side heading */}
          <div className="w-full lg:w-1/3 lg:sticky lg:top-8">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-(--color-accent) text-xs uppercase tracking-[0.25em] font-bold">Supported OS</span>
            </div>
            <h2 className="text-3xl font-light text-slate-900 tracking-tight mb-4">
              Cross-Platform <br />
              <span className="text-(--color-accent) font-semibold">OS Compatibility</span>
            </h2>
            <p className="text-slate-500 text-sm leading-relaxed max-w-sm">
              Zaby agents run natively across both desktop and server kernels, providing zero-latency environments for deep automation.
            </p>
          </div>

          {/* Right Side: Interactive cards */}
          <div className="w-full lg:w-2/3 grid grid-cols-1 md:grid-cols-2 gap-8">

            {/* Windows Card */}
            <div className="bg-white/90 backdrop-blur-md border border-slate-200/80 rounded-2xl p-8 shadow-[0_8px_30px_rgba(0,0,0,0.02)] hover:shadow-[0_20px_45px_var(--shadow-glow-accent)] hover:border-(--color-accent)/40 transition-all duration-500 group relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-(--color-accent)/5 to-transparent rounded-bl-full pointer-events-none" />

              <div className="flex items-center gap-4 mb-6">
                <div className="w-14 h-14 rounded-xl bg-slate-50/50 flex items-center justify-center border border-slate-200/60 group-hover:bg-slate-100/80 transition-colors duration-500 shadow-sm">
                  {/* Modern Windows Logo in Bright Blue */}
                  <svg className="w-7 h-7 text-[#0078d4] transition-transform duration-500 group-hover:scale-110" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M0 3.449L9.75 2.1v9.45H0V3.449zM0 12.45h9.75v9.45L0 20.551v-8.1zM10.8 1.95L24 0v11.55H10.8V1.95zM10.8 12.45H24v11.55L10.8 22.05v-9.6z" />
                  </svg>
                </div>
                <div>
                  <span className="text-[9px] font-bold text-(--color-accent) uppercase tracking-wider block">Enterprise & Desktop</span>
                  <h3 className="text-xl font-bold text-slate-900">Windows</h3>
                </div>
              </div>

              <p className="text-xs text-slate-500 leading-relaxed mb-6">
                Deep integration with desktop viewports, native registry manipulation, complete PowerShell pipeline control, and active Win32/UWP application automation.
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-2">
                <span className="px-2.5 py-1 text-[10px] font-semibold text-(--color-accent-hover) bg-(--color-muted)/20 border border-(--color-accent)/20 rounded-full">Win32 APIs</span>
                <span className="px-2.5 py-1 text-[10px] font-semibold text-slate-600 bg-slate-50 border border-slate-200/60 rounded-full">PowerShell v7</span>
                <span className="px-2.5 py-1 text-[10px] font-semibold text-slate-600 bg-slate-50 border border-slate-200/60 rounded-full">GUI Hooks</span>
              </div>
            </div>

            {/* Linux Card */}
            <div className="bg-white/90 backdrop-blur-md border border-slate-200/80 rounded-2xl p-8 shadow-[0_8px_30px_rgba(0,0,0,0.02)] hover:shadow-[0_20px_45px_rgba(15,23,42,0.05)] hover:border-slate-400/60 transition-all duration-500 group relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-slate-500/5 to-transparent rounded-bl-full pointer-events-none" />

              <div className="flex items-center gap-4 mb-6">
                <div className="w-14 h-14 rounded-xl bg-slate-50 flex items-center justify-center border border-slate-200 group-hover:bg-slate-100 transition-colors duration-500 shadow-sm overflow-hidden p-1.5">
                  {/* Official Full-Color Linux Tux Penguin Image */}
                  <img
                    src="https://upload.wikimedia.org/wikipedia/commons/a/af/Tux.png"
                    alt="Linux Tux"
                    className="w-10 h-10 object-contain transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
                <div>
                  <span className="text-[9px] font-bold text-slate-600 uppercase tracking-wider block">Server & Developer</span>
                  <h3 className="text-xl font-bold text-slate-900">Linux</h3>
                </div>
              </div>

              <p className="text-xs text-slate-500 leading-relaxed mb-6">
                Native POSIX execution, modular systemd service management, micro-container isolation sandboxing, shell pipe orchestration, and headless display virtual automation.
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-2">
                <span className="px-2.5 py-1 text-[10px] font-semibold text-slate-800 bg-slate-100 border border-slate-200/50 rounded-full">POSIX Shell</span>
                <span className="px-2.5 py-1 text-[10px] font-semibold text-slate-600 bg-slate-50 border border-slate-200/60 rounded-full">Systemd</span>
                <span className="px-2.5 py-1 text-[10px] font-semibold text-slate-600 bg-slate-50 border border-slate-200/60 rounded-full">Docker/Core</span>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* ------------------------------------------------------------- */}
      {/* SECTION 3: PERFORMANCE SPECS */}
      {/* ------------------------------------------------------------- */}
      <section className="w-full relative z-10 border-t border-slate-100 pt-12">
        <div className="flex flex-col gap-8">

          {/* Header */}
          <div>
            <div className="flex items-center gap-3 mb-3">
              <span className="text-(--color-accent) text-xs uppercase tracking-[0.25em] font-bold">Zaby Kernel Specs</span>
            </div>
            <h2 className="text-3xl font-light text-slate-900 tracking-tight">
              Performance <span className="text-(--color-accent) font-semibold">Specifications</span>
            </h2>
            <p className="text-slate-500 text-sm mt-2 max-w-2xl">
              Engineered for extreme responsiveness and reliability. Zaby's virtualized runtime environment guarantees bare-metal execution speed with deep cognitive capabilities.
            </p>
          </div>

          {/* Grid Layout containing Left Column, Center Column (Prism), Right Column */}
          <div className="grid grid-cols-1 lg:grid-cols-3 items-center gap-8 lg:gap-36 relative z-10">

            {/* Left Column: Spec Cards 1, 2, 3 */}
            <div className="flex flex-col gap-6 z-10 w-full order-1">

              {/* Stat Card 1: Latency */}
              <div className="bg-white/85 backdrop-blur-md border border-slate-200/60 rounded-2xl p-6 shadow-[0_8px_30px_rgba(0,0,0,0.01)] hover:border-(--color-accent)/40 hover:shadow-[0_12px_35px_var(--shadow-glow-accent)] transition-all duration-300 group flex flex-col justify-between h-40 relative">
                <div className="absolute inset-0 bg-gradient-to-b from-(--color-accent)/[0.01] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl" />

                {/* Micro-Aligned Pointing Connection Line (Extra Long, Flowing Outward) */}
                <div className="absolute top-1/2 -right-28 w-28 h-24 -translate-y-1/2 pointer-events-none hidden lg:block z-0">
                  <svg className="w-full h-full overflow-visible" xmlns="http://www.w3.org/2000/svg">
                    <path d="M 112,80 C 56,80 56,48 0,48" fill="none" stroke="rgba(232,121,249,0.3)" strokeWidth="1.5" strokeDasharray="3 3" />
                    <circle r="2.5" fill="var(--color-accent)">
                      <animateMotion dur="3s" repeatCount="indefinite" path="M 112,80 C 56,80 56,48 0,48" />
                    </circle>
                  </svg>
                </div>

                <div className="flex items-start justify-between relative z-10">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-200/60 flex items-center justify-center text-slate-600 group-hover:text-(--color-accent) group-hover:border-(--color-accent)/30 transition-all duration-300 shadow-xs">
                      <Icon icon="solar:clock-circle-linear" width={20} />
                    </div>
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Response Latency</span>
                      <h4 className="text-2xl font-bold text-slate-900 tracking-tight mt-0.5">120ms</h4>
                    </div>
                  </div>
                  <span className="text-[10px] font-bold bg-emerald-50 text-emerald-600 px-2 py-0.5 rounded-full border border-emerald-100/80 flex items-center gap-0.5 select-none">
                    ↓ 18.4%
                  </span>
                </div>

                {/* Sparkline wave */}
                <div className="w-full h-12 mt-4 relative z-10 self-end opacity-70 group-hover:opacity-100 transition-opacity duration-300">
                  <svg viewBox="0 0 100 30" className="w-full h-full" preserveAspectRatio="none">
                    <path
                      d="M 0,25 C 10,24 15,10 25,12 C 35,14 40,25 50,20 C 60,15 65,5 75,8 C 85,11 90,2 100,5"
                      fill="none"
                      stroke="#10b981"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                    <path
                      d="M 0,25 C 10,24 15,10 25,12 C 35,14 40,25 50,20 C 60,15 65,5 75,8 C 85,11 90,2 100,5 L 100,30 L 0,30 Z"
                      fill="url(#sparklineGradEmerald)"
                      opacity="0.15"
                    />
                  </svg>
                </div>
              </div>

              {/* Stat Card 2: Memory */}
              <div className="bg-white/85 backdrop-blur-md border border-slate-200/60 rounded-2xl p-6 shadow-[0_8px_30px_rgba(0,0,0,0.01)] hover:border-(--color-accent)/40 hover:shadow-[0_12px_35px_var(--shadow-glow-accent)] transition-all duration-300 group flex flex-col justify-between h-40 relative">
                <div className="absolute inset-0 bg-gradient-to-b from-(--color-accent)/[0.01] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl" />

                {/* Micro-Aligned Pointing Connection Line (Extra Long, Flowing Outward) */}
                <div className="absolute top-1/2 -right-28 w-28 h-24 -translate-y-1/2 pointer-events-none hidden lg:block z-0">
                  <svg className="w-full h-full overflow-visible" xmlns="http://www.w3.org/2000/svg">
                    <path d="M 112,48 L 0,48" fill="none" stroke="rgba(232,121,249,0.3)" strokeWidth="1.5" strokeDasharray="3 3" />
                    <circle r="2.5" fill="#10b981">
                      <animateMotion dur="2.5s" repeatCount="indefinite" path="M 112,48 L 0,48" />
                    </circle>
                  </svg>
                </div>

                <div className="flex items-start justify-between relative z-10">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-200/60 flex items-center justify-center text-slate-600 group-hover:text-(--color-accent) group-hover:border-(--color-accent)/30 transition-all duration-300 shadow-xs">
                      <Icon icon="solar:database-linear" width={20} />
                    </div>
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Max Memory Capacity</span>
                      <h4 className="text-2xl font-bold text-slate-900 tracking-tight mt-0.5">64GB</h4>
                    </div>
                  </div>
                  <span className="text-[10px] font-bold bg-(--color-muted)/25 text-(--color-accent-soft) px-2 py-0.5 rounded-full border border-(--color-accent)/20 flex items-center gap-0.5 select-none">
                    ↑ 2.0x scale
                  </span>
                </div>

                {/* Sparkline wave */}
                <div className="w-full h-12 mt-4 relative z-10 self-end opacity-70 group-hover:opacity-100 transition-opacity duration-300">
                  <svg viewBox="0 0 100 30" className="w-full h-full" preserveAspectRatio="none">
                    <path
                      d="M 0,28 C 10,27 20,20 30,22 C 40,24 50,12 60,15 C 70,18 80,4 90,8 C 95,10 98,2 100,3"
                      fill="none"
                      stroke="var(--color-accent)"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                    <path
                      d="M 0,28 C 10,27 20,20 30,22 C 40,24 50,12 60,15 C 70,18 80,4 90,8 C 95,10 98,2 100,3 L 100,30 L 0,30 Z"
                      fill="url(#sparklineGradBlue)"
                      opacity="0.15"
                    />
                  </svg>
                </div>
              </div>

              {/* Stat Card 3: Bootup Speed */}
              <div className="bg-white/85 backdrop-blur-md border border-slate-200/60 rounded-2xl p-6 shadow-[0_8px_30px_rgba(0,0,0,0.01)] hover:border-(--color-accent)/40 hover:shadow-[0_12px_35px_var(--shadow-glow-accent)] transition-all duration-300 group flex flex-col justify-between h-40 relative">
                <div className="absolute inset-0 bg-gradient-to-b from-(--color-accent)/[0.01] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl" />

                {/* Micro-Aligned Pointing Connection Line (Extra Long, Flowing Outward) */}
                <div className="absolute top-1/2 -right-28 w-28 h-24 -translate-y-1/2 pointer-events-none hidden lg:block z-0">
                  <svg className="w-full h-full overflow-visible" xmlns="http://www.w3.org/2000/svg">
                    <path d="M 112,16 C 56,16 56,48 0,48" fill="none" stroke="rgba(232,121,249,0.3)" strokeWidth="1.5" strokeDasharray="3 3" />
                    <circle r="2.5" fill="var(--color-accent)">
                      <animateMotion dur="4s" repeatCount="indefinite" path="M 112,16 C 56,16 56,48 0,48" />
                    </circle>
                  </svg>
                </div>

                <div className="flex items-start justify-between relative z-10">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-200/60 flex items-center justify-center text-slate-600 group-hover:text-(--color-accent) group-hover:border-(--color-accent)/30 transition-all duration-300 shadow-xs">
                      <Icon icon="solar:bolt-linear" width={20} />
                    </div>
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Cold Boot Time</span>
                      <h4 className="text-2xl font-bold text-slate-900 tracking-tight mt-0.5">1.8s</h4>
                    </div>
                  </div>
                  <span className="text-[10px] font-bold bg-emerald-50 text-emerald-600 px-2 py-0.5 rounded-full border border-emerald-100/80 flex items-center gap-0.5 select-none">
                    ↓ 35.1%
                  </span>
                </div>

                {/* Sparkline wave */}
                <div className="w-full h-12 mt-4 relative z-10 self-end opacity-70 group-hover:opacity-100 transition-opacity duration-300">
                  <svg viewBox="0 0 100 30" className="w-full h-full" preserveAspectRatio="none">
                    <path
                      d="M 0,25 C 10,24 20,18 30,12 C 40,6 50,22 60,18 C 70,14 80,2 90,4 C 95,5 98,1 100,2"
                      fill="none"
                      stroke="#10b981"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                    <path
                      d="M 0,25 C 10,24 20,18 30,12 C 40,6 50,22 60,18 C 70,14 80,2 90,4 C 95,5 98,1 100,2 L 100,30 L 0,30 Z"
                      fill="url(#sparklineGradEmerald)"
                      opacity="0.15"
                    />
                  </svg>
                </div>
              </div>

            </div>

            {/* Center Column: Interactive HTML/CSS 3D Glass Prism with Core Sphere */}
            <div className="flex flex-col items-center justify-center py-6 lg:py-0 h-96 relative z-10 w-full order-2 lg:order-2">
              {/* Radial gradient background light glow */}
              <div className="absolute w-72 h-72 rounded-full bg-(--color-accent)/5 blur-[60px] -z-10 pointer-events-none" />

              {/* The 3D Pyramid & Podium Container */}
              <div className="relative w-72 h-72 flex flex-col items-center justify-center">

                {/* 3D Scene Viewport */}
                <div className="absolute inset-0 flex items-center justify-center [perspective:1200px] [transform-style:preserve-3d]">

                  {/* Floating Animation Group */}
                  <motion.div
                    className="relative flex items-center justify-center [transform-style:preserve-3d]"
                    style={{ width: '120px', height: '152px' }}
                    animate={{
                      y: [0, -14, 0],
                    }}
                    transition={{
                      duration: 6,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  >
                    {/* Glossy, Highly Solid & Reflective Core Sphere */}
                    <div className="absolute w-16 h-16 rounded-full bg-gradient-to-br from-fuchsia-400 via-fuchsia-600 to-purple-900 shadow-[0_0_35px_rgba(232,121,249,0.75),inset_0_5px_12px_rgba(255,255,255,0.45),inset_0_-5px_12px_rgba(0,0,0,0.55)] border border-fuchsia-300/40 animate-pulse z-10 flex items-center justify-center overflow-hidden" style={{ transform: 'translateY(20px)' }}>
                      {/* Crisp specular reflection hotspot */}
                      <div className="absolute top-1.5 left-2 w-5 h-3 rounded-full bg-white/60 rotate-[-15deg] blur-[0.5px]" />
                    </div>

                    {/* True 3D Rotating Glass Pyramid (2x Scale) */}
                    <motion.div
                      className="absolute [transform-style:preserve-3d]"
                      style={{ width: '120px', height: '152px', top: '0px', left: '0px' }}
                      animate={{
                        rotateX: [15, 15],
                        rotateY: [0, 360],
                      }}
                      transition={{
                        duration: 18,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                    >
                      {/* Front Face */}
                      <div
                        className="absolute bg-fuchsia-500/[0.06] border border-fuchsia-400/30 backdrop-blur-[1px]"
                        style={{
                          width: '120px',
                          height: '152px',
                          left: '0px',
                          top: '0px',
                          clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)',
                          transformOrigin: '50% 100%',
                          transform: 'translateZ(60px) rotateX(23deg)',
                        }}
                      />
                      {/* Right Face */}
                      <div
                        className="absolute bg-fuchsia-500/[0.05] border border-fuchsia-400/30 backdrop-blur-[1px]"
                        style={{
                          width: '120px',
                          height: '152px',
                          left: '0px',
                          top: '0px',
                          clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)',
                          transformOrigin: '50% 100%',
                          transform: 'rotateY(90deg) translateZ(60px) rotateX(23deg)',
                        }}
                      />
                      {/* Back Face */}
                      <div
                        className="absolute bg-fuchsia-500/[0.04] border border-fuchsia-400/30 backdrop-blur-[1px]"
                        style={{
                          width: '120px',
                          height: '152px',
                          left: '0px',
                          top: '0px',
                          clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)',
                          transformOrigin: '50% 100%',
                          transform: 'rotateY(180deg) translateZ(60px) rotateX(23deg)',
                        }}
                      />
                      {/* Left Face */}
                      <div
                        className="absolute bg-fuchsia-500/[0.05] border border-fuchsia-400/30 backdrop-blur-[1px]"
                        style={{
                          width: '120px',
                          height: '152px',
                          left: '0px',
                          top: '0px',
                          clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)',
                          transformOrigin: '50% 100%',
                          transform: 'rotateY(270deg) translateZ(60px) rotateX(23deg)',
                        }}
                      />
                      {/* Base Face — precisely aligned to close the pyramid */}
                      <div
                        className="absolute bg-fuchsia-500/[0.03] border border-fuchsia-400/20"
                        style={{
                          width: '120px',
                          height: '120px',
                          left: '0px',
                          top: '0px',
                          transformOrigin: '50% 100%',
                          transform: 'translate3d(0px, 32px, 60px) rotateX(90deg)',
                        }}
                      />
                    </motion.div>

                  </motion.div>
                </div>

                {/* Concentric Elevated Circular Podium (Bottom Platform) */}
                <div className="absolute bottom-4 flex items-center justify-center w-full h-16 pointer-events-none">
                  <svg viewBox="0 0 200 60" className="w-48 h-full overflow-visible">
                    <defs>
                      <radialGradient id="podiumGlow" cx="50%" cy="50%" r="50%">
                        <stop offset="0%" stopColor="#e879f9" stopOpacity="0.4" />
                        <stop offset="100%" stopColor="#e879f9" stopOpacity="0" />
                      </radialGradient>
                    </defs>

                    {/* Concentric ellipses */}
                    <ellipse cx="100" cy="30" rx="75" ry="15" fill="none" stroke="rgba(226, 232, 240, 0.7)" strokeWidth="1" />
                    <ellipse cx="100" cy="30" rx="65" ry="12" fill="none" stroke="rgba(232, 121, 249, 0.15)" strokeWidth="1.5" />

                    {/* Concentric grid lines under the podium */}
                    <line x1="50" y1="30" x2="150" y2="30" stroke="rgba(226, 232, 240, 0.4)" strokeWidth="0.75" />
                    <line x1="100" y1="15" x2="100" y2="45" stroke="rgba(226, 232, 240, 0.4)" strokeWidth="0.75" />

                    {/* Glow platform ellipse */}
                    <ellipse cx="100" cy="30" rx="45" ry="9" fill="url(#podiumGlow)" />
                    <ellipse cx="100" cy="30" rx="35" ry="7" fill="none" stroke="#e879f9" strokeWidth="1" className="animate-pulse" />
                  </svg>
                </div>

              </div>

              {/* Version/Core Label */}
              <div className="mt-4 px-3 py-1 bg-slate-50 border border-slate-200/60 rounded-full flex items-center gap-1.5 shadow-2xs">
                <span className="w-1.5 h-1.5 rounded-full bg-(--color-accent) animate-pulse" />
                <span className="text-[10px] font-mono font-bold text-slate-500 uppercase tracking-wider">Zaby Core Spec v4.0.0</span>
              </div>
            </div>

            {/* Right Column: Spec Cards 4, 5, 6 */}
            <div className="flex flex-col gap-6 z-10 w-full order-3 lg:order-3">

              {/* Stat Card 4: Clock Speed */}
              <div className="bg-white/85 backdrop-blur-md border border-slate-200/60 rounded-2xl p-6 shadow-[0_8px_30px_rgba(0,0,0,0.01)] hover:border-(--color-accent)/40 hover:shadow-[0_12px_35px_var(--shadow-glow-accent)] transition-all duration-300 group flex flex-col justify-between h-40 relative">
                <div className="absolute inset-0 bg-gradient-to-b from-(--color-accent)/[0.01] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl" />

                {/* Micro-Aligned Pointing Connection Line (Extra Long, Flowing Outward) */}
                <div className="absolute top-1/2 -left-28 w-28 h-24 -translate-y-1/2 pointer-events-none hidden lg:block z-0">
                  <svg className="w-full h-full overflow-visible" xmlns="http://www.w3.org/2000/svg">
                    <path d="M 0,80 C 56,80 56,48 112,48" fill="none" stroke="rgba(232,121,249,0.3)" strokeWidth="1.5" strokeDasharray="3 3" />
                    <circle r="2.5" fill="var(--color-accent)">
                      <animateMotion dur="3.5s" repeatCount="indefinite" path="M 0,80 C 56,80 56,48 112,48" />
                    </circle>
                  </svg>
                </div>

                <div className="flex items-start justify-between relative z-10">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-200/60 flex items-center justify-center text-slate-600 group-hover:text-(--color-accent) group-hover:border-(--color-accent)/30 transition-all duration-300 shadow-xs">
                      <Icon icon="solar:cpu-linear" width={20} />
                    </div>
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Virtual Core Clock</span>
                      <h4 className="text-2xl font-bold text-slate-900 tracking-tight mt-0.5">4.8 GHz</h4>
                    </div>
                  </div>
                  <span className="text-[10px] font-bold bg-(--color-muted)/25 text-(--color-accent-soft) px-2 py-0.5 rounded-full border border-(--color-accent)/20 flex items-center gap-0.5 select-none">
                    ↑ 12.5%
                  </span>
                </div>

                {/* Sparkline wave */}
                <div className="w-full h-12 mt-4 relative z-10 self-end opacity-70 group-hover:opacity-100 transition-opacity duration-300">
                  <svg viewBox="0 0 100 30" className="w-full h-full" preserveAspectRatio="none">
                    <path
                      d="M 0,20 C 10,20 15,10 25,15 C 35,20 40,25 50,18 C 60,11 65,4 75,5 C 85,6 90,1 100,2"
                      fill="none"
                      stroke="var(--color-accent)"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                    <path
                      d="M 0,20 C 10,20 15,10 25,15 C 35,20 40,25 50,18 C 60,11 65,4 75,5 C 85,6 90,1 100,2 L 100,30 L 0,30 Z"
                      fill="url(#sparklineGradBlue)"
                      opacity="0.15"
                    />
                  </svg>
                </div>
              </div>

              {/* Stat Card 5: Concurrency (Digital Employee Spec) */}
              <div className="bg-white/85 backdrop-blur-md border border-slate-200/60 rounded-2xl p-6 shadow-[0_8px_30px_rgba(0,0,0,0.01)] hover:border-(--color-accent)/40 hover:shadow-[0_12px_35px_var(--shadow-glow-accent)] transition-all duration-300 group flex flex-col justify-between h-40 relative">
                <div className="absolute inset-0 bg-gradient-to-b from-(--color-accent)/[0.01] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl" />

                {/* Micro-Aligned Pointing Connection Line (Extra Long, Flowing Outward) */}
                <div className="absolute top-1/2 -left-28 w-28 h-24 -translate-y-1/2 pointer-events-none hidden lg:block z-0">
                  <svg className="w-full h-full overflow-visible" xmlns="http://www.w3.org/2000/svg">
                    <path d="M 0,48 L 112,48" fill="none" stroke="rgba(232,121,249,0.3)" strokeWidth="1.5" strokeDasharray="3 3" />
                    <circle r="2.5" fill="var(--color-accent)">
                      <animateMotion dur="2.8s" repeatCount="indefinite" path="M 0,48 L 112,48" />
                    </circle>
                  </svg>
                </div>

                <div className="flex items-start justify-between relative z-10">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-200/60 flex items-center justify-center text-slate-600 group-hover:text-(--color-accent) group-hover:border-(--color-accent)/30 transition-all duration-300 shadow-xs">
                      <Icon icon="solar:widget-linear" width={20} />
                    </div>
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Simultaneous Threads</span>
                      <h4 className="text-2xl font-bold text-slate-900 tracking-tight mt-0.5">16 Tasks</h4>
                    </div>
                  </div>
                  <span className="text-[10px] font-bold bg-(--color-muted)/25 text-(--color-accent-soft) px-2 py-0.5 rounded-full border border-(--color-accent)/20 flex items-center gap-0.5 select-none">
                    ↑ 4x scale
                  </span>
                </div>

                {/* Sparkline wave */}
                <div className="w-full h-12 mt-4 relative z-10 self-end opacity-70 group-hover:opacity-100 transition-opacity duration-300">
                  <svg viewBox="0 0 100 30" className="w-full h-full" preserveAspectRatio="none">
                    <path
                      d="M 0,25 C 10,24 20,20 30,15 C 40,10 50,4 60,8 C 70,12 80,2 90,5 C 95,6 98,1 100,2"
                      fill="none"
                      stroke="var(--color-accent)"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                    <path
                      d="M 0,25 C 10,24 20,20 30,15 C 40,10 50,4 60,8 C 70,12 80,2 90,5 C 95,6 98,1 100,2 L 100,30 L 0,30 Z"
                      fill="url(#sparklineGradBlue)"
                      opacity="0.15"
                    />
                  </svg>
                </div>
              </div>

              {/* Stat Card 6: Execution Accuracy (Digital Employee Spec) */}
              <div className="bg-white/85 backdrop-blur-md border border-slate-200/60 rounded-2xl p-6 shadow-[0_8px_30px_rgba(0,0,0,0.01)] hover:border-(--color-accent)/40 hover:shadow-[0_12px_35px_var(--shadow-glow-accent)] transition-all duration-300 group flex flex-col justify-between h-40 relative">
                <div className="absolute inset-0 bg-gradient-to-b from-(--color-accent)/[0.01] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl" />

                {/* Micro-Aligned Pointing Connection Line (Extra Long, Flowing Outward) */}
                <div className="absolute top-1/2 -left-28 w-28 h-24 -translate-y-1/2 pointer-events-none hidden lg:block z-0">
                  <svg className="w-full h-full overflow-visible" xmlns="http://www.w3.org/2000/svg">
                    <path d="M 0,16 C 40,16 40,48 112,48" fill="none" stroke="rgba(232,121,249,0.3)" strokeWidth="1.5" strokeDasharray="3 3" />
                    <circle r="2.5" fill="#10b981">
                      <animateMotion dur="4.2s" repeatCount="indefinite" path="M 0,16 C 40,16 40,48 112,48" />
                    </circle>
                  </svg>
                </div>

                <div className="flex items-start justify-between relative z-10">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-200/60 flex items-center justify-center text-slate-600 group-hover:text-(--color-accent) group-hover:border-(--color-accent)/30 transition-all duration-300 shadow-xs">
                      <Icon icon="solar:verified-check-linear" width={20} />
                    </div>
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Execution Accuracy</span>
                      <h4 className="text-2xl font-bold text-slate-900 tracking-tight mt-0.5">99.98%</h4>
                    </div>
                  </div>
                  <span className="text-[10px] font-bold bg-emerald-50 text-emerald-600 px-2 py-0.5 rounded-full border border-emerald-100/80 flex items-center gap-0.5 select-none">
                    ↑ 0.04%
                  </span>
                </div>

                {/* Sparkline wave */}
                <div className="w-full h-12 mt-4 relative z-10 self-end opacity-70 group-hover:opacity-100 transition-opacity duration-300">
                  <svg viewBox="0 0 100 30" className="w-full h-full" preserveAspectRatio="none">
                    <path
                      d="M 0,15 C 10,14 15,8 25,6 C 35,4 40,12 50,14 C 60,16 65,10 75,6 C 85,2 90,1 100,0.5"
                      fill="none"
                      stroke="#10b981"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                    <path
                      d="M 0,15 C 10,14 15,8 25,6 C 35,4 40,12 50,14 C 60,16 65,10 75,6 C 85,2 90,1 100,0.5 L 100,30 L 0,30 Z"
                      fill="url(#sparklineGradEmerald)"
                      opacity="0.15"
                    />
                  </svg>
                </div>
              </div>

            </div>

          </div>

        </div>

        {/* Global definitions for Sparkline Gradients */}
        <svg width="0" height="0" className="absolute">
          <defs>
            <linearGradient id="sparklineGradEmerald" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#10b981" stopOpacity="0.25" />
              <stop offset="100%" stopColor="#10b981" stopOpacity="0" />
            </linearGradient>
            <linearGradient id="sparklineGradBlue" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#e879f9" stopOpacity="0.25" />
              <stop offset="100%" stopColor="#e879f9" stopOpacity="0" />
            </linearGradient>
          </defs>
        </svg>
      </section>

      {/* ------------------------------------------------------------- */}
      {/* SECTION 4: PLATFORM GLANCE (Interactive Sandbox Web Simulation) */}
      {/* ------------------------------------------------------------- */}
      <div id="platform-glance-section" className="w-full relative z-10 flex flex-col gap-5">
        <div className="flex flex-col gap-1 pl-1">

          <h1 className="text-xl font-semibold text-slate-900 tracking-tight">Sandbox Preview</h1>
          <p className="text-xs text-slate-500 max-w-2xl leading-normal mt-0.5">
            Demonstrate real-time browser actions, shell commands, virtual terminals, and active system traces inside a sandboxed workspace.
          </p>
        </div>
        <SandboxDashboard />
      </div>

      {/* Bottom CTA / Enable Open Agents Section */}
      <section className="relative min-h-[45vh] w-full flex flex-col items-center justify-center py-16 space-y-8 overflow-hidden bg-white border-t border-slate-200/80 mt-12 rounded-[2rem] shadow-xs">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.02)_0%,transparent_75%)] pointer-events-none" />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center space-y-4 z-20 px-6"
        >
          {/* Stats Badge */}
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 border border-blue-100/50 justify-center mx-auto">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-600 animate-ping" />
            <span className="text-[10px] font-bold uppercase tracking-wider text-blue-700 font-mono">99.9% Task Success Rate</span>
          </div>

          <h2 className="text-4xl font-light tracking-tight text-slate-900 leading-tight">
            Scale Operational Velocity
          </h2>
          <p className="max-w-xl mx-auto font-light text-slate-500 leading-relaxed text-sm md:text-base">
            Deploy autonomous digital agents that run continuously, orchestrating repetitive enterprise workflows and interacting directly with your APIs and legacy systems.
          </p>
        </motion.div>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => window.open('https://platform.zaby.io/tenant/signup', '_blank')}
          className="px-12 py-4 font-medium rounded-full tracking-tight transition-all duration-500 z-20 bg-slate-900 text-white hover:bg-slate-800 hover:shadow-[0_0_40px_rgba(15,23,42,0.15)] cursor-pointer"
        >
          Deploy Sandbox Now
        </motion.button>

        <div className="text-[10px] tracking-[1em] uppercase z-20 text-slate-900/20 pt-4">
          OPEN AGENTS © ZABY WORKFORCE OS
        </div>
      </section>
    </div>
  );
}
