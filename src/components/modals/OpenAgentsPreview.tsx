"use client";

import React from "react";
import { Network, Sparkles, Volume2, Globe, Cpu, Layers } from "lucide-react";
import { motion } from "framer-motion";
import { Icon } from "@iconify/react";
import SandboxDashboard from "../shared/SandboxDashboard";

export function OpenAgentsPreview() {
  return (
    <div className="w-full min-h-full h-auto bg-white text-slate-800 font-sans antialiased selection:bg-blue-500/10 p-8 flex flex-col gap-12 relative overflow-hidden"
      style={{ backgroundImage: "radial-gradient(circle at top center, rgba(59, 130, 246, 0.04) 0%, transparent 60%)" }}>

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
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-4xl md:text-5xl font-light tracking-tight leading-tight glass-text mb-3"
        >
          AI Infrastructure
        </motion.h1>
        <p className="font-light text-base leading-relaxed transition-colors text-slate-600 max-w-2xl">
          Build, orchestrate, and integrate custom agents equipped with modular capabilities and next-generation execution layers.
        </p>
      </div>

      {/* SECTION 1: CAPABILITIES */}
      {/* ------------------------------------------------------------- */}
      <section className="w-full relative z-10">
        {/* Header */}
        <div className="flex flex-col items-center text-center mb-16 relative z-10">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-blue-500 text-xs uppercase tracking-[0.25em] font-bold">Agent Capabilities</span>
          </div>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-4xl md:text-5xl font-light tracking-tight leading-tight glass-text"
          >
            Advanced architecture engineered for autonomy.
          </motion.h2>
        </div>

        {/* Bento Grid Container with Border Gradients */}
        <div className="grid grid-cols-1 lg:grid-cols-3 relative z-10 bg-white/60 backdrop-blur-md shadow-[0_20px_50px_rgba(0,0,0,0.03)] border border-slate-200/80 rounded-2xl overflow-hidden">

          {/* Cell 1: Autonomous workflow automation */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
            whileHover={{ y: -6, borderColor: "rgba(59,130,246,0.3)" }}
            className="p-8 h-72 relative group overflow-hidden bg-white"
            style={{ borderRight: "1px solid rgba(226, 232, 240, 0.8)", borderBottom: "1px solid rgba(226, 232, 240, 0.8)" }}>

            {/* Aura Asset */}
            <img src="https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/5ee0a38a-b5d3-4531-8793-98beed4af162_1600w.jpg"
              alt="Workflow Architecture"
              className="absolute inset-0 w-full h-full object-cover opacity-[0.05] transition-transform duration-1000 group-hover:scale-110"
              style={{ maskImage: "radial-gradient(circle at right bottom, black, transparent 70%)", WebkitMaskImage: "radial-gradient(circle at right bottom, black, transparent 70%)" }} />

            <div className="absolute -top-[2px] -left-[2px] w-[3px] h-[3px] bg-slate-100 border border-slate-300 z-20 box-content"></div>

            <div className="relative z-10 flex flex-col h-full justify-between">
              <div>
                <span className="text-[10px] uppercase tracking-widest text-blue-500 font-bold mb-2 block">01 / Workflow</span>
                <h3 className="text-lg font-semibold text-slate-900 mb-2">Autonomous Workflow Automation</h3>
                <p className="text-xs font-light leading-relaxed transition-colors text-slate-500 max-w-[90%]">
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
          </motion.div>

          {/* Cell 2: Central Cube - Multi-step reasoning & decision making */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="p-8 h-96 lg:h-auto lg:row-span-2 relative flex flex-col items-center justify-center overflow-hidden bg-slate-50/30 group"
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

            {/* Holographic Stacked Glass Layers */}
            <div className="relative my-4 flex h-48 w-full items-center justify-center overflow-visible z-10">
              <div
                className="pointer-events-none absolute inset-0 flex items-center justify-center"
                aria-hidden
              >
                <div className="absolute h-[88%] w-[78%] rounded-[42%] bg-purple-500/[0.22] blur-[52px] transition-opacity duration-700 group-hover:bg-purple-500/[0.28]" />
                <div className="absolute h-[62%] w-[58%] translate-y-1 rounded-full bg-cyan-400/[0.14] blur-[40px] transition-opacity duration-700 group-hover:bg-cyan-400/[0.2]" />
                <div className="absolute h-[48%] w-[42%] -translate-y-2 rounded-full bg-fuchsia-400/[0.12] blur-[32px] transition-opacity duration-700 group-hover:bg-fuchsia-400/[0.18]" />
                <div className="absolute bottom-[8%] left-1/2 h-10 w-[65%] -translate-x-1/2 rounded-full bg-purple-400/[0.1] blur-2xl" />
              </div>
              <motion.img
                src="/models/sandbox.png"
                alt="Holographic stacked glass layers"
                className="relative z-10 w-[70%] h-full object-contain drop-shadow-[0_8px_32px_rgba(168,85,247,0.18)]"
                animate={{ y: [0, -6, 0] }}
                transition={{ type: "tween", duration: 5, repeat: Infinity, ease: "easeInOut" }}
              />
            </div>

            <div className="mt-8 text-center max-w-[90%] relative z-10">
              <span className="text-[10px] uppercase tracking-widest text-blue-500 font-bold mb-2 block">Core Intelligence</span>
              <h3 className="text-lg font-semibold text-slate-900 mb-2">Multi-Step Reasoning & Decision Making</h3>
              <p className="text-xs font-light leading-relaxed transition-colors text-slate-500">
                Empower agents to evaluate complex execution trees, plan steps ahead, and automatically self-heal from exceptions.
              </p>
            </div>
          </motion.div>

          {/* Cell 3: Sandbox MCPs */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
            whileHover={{ y: -6, borderColor: "rgba(59,130,246,0.3)" }}
            className="p-8 h-72 relative group overflow-hidden bg-white"
            style={{ borderRight: "1px solid rgba(226, 232, 240, 0.8)", borderBottom: "1px solid rgba(226, 232, 240, 0.8)" }}>

            <div className="absolute -top-[2px] -left-[2px] w-[3px] h-[3px] bg-slate-100 border border-slate-300 z-20 box-content"></div>

            <div className="relative z-10 flex flex-col h-full justify-between">
              <div>
                <span className="text-[10px] uppercase tracking-widest text-blue-500 font-bold mb-2 block">02 / Protocol</span>
                <h3 className="text-lg font-semibold text-slate-900 mb-2">Sandbox MCPs</h3>
                <p className="text-xs font-light leading-relaxed transition-colors text-slate-500 max-w-[90%]">
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
          </motion.div>

          {/* Cell 4: Browser/Desktop automation */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
            whileHover={{ y: -6, borderColor: "rgba(59,130,246,0.3)" }}
            className="p-8 h-72 relative group overflow-hidden bg-white"
            style={{ borderRight: "1px solid rgba(226, 232, 240, 0.8)", borderBottom: "1px solid rgba(226, 232, 240, 0.8)" }}>

            {/* Aura Asset */}
            <img src="https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/e534354d-c5f2-4399-a1d9-2f50338e8c47_1600w.jpg"
              alt="Abstract Waves"
              className="absolute inset-0 w-full h-full object-cover opacity-[0.04] transition-transform duration-1000 group-hover:scale-110"
              style={{ maskImage: "linear-gradient(to top, black, transparent)", WebkitMaskImage: "linear-gradient(to top, black, transparent)" }} />

            <div className="absolute -top-[2px] -left-[2px] w-[3px] h-[3px] bg-slate-100 border border-slate-300 z-20 box-content"></div>

            <div className="relative z-10 flex flex-col h-full justify-between">
              <div>
                <span className="text-[10px] uppercase tracking-widest text-blue-500 font-bold mb-2 block">03 / Execution</span>
                <h3 className="text-lg font-semibold text-slate-900 mb-2">Browser & Desktop Automation</h3>
                <p className="text-xs font-light leading-relaxed transition-colors text-slate-500 max-w-[90%]">
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
                <svg viewBox="0 0 100 45" className="absolute bottom-3 w-full drop-shadow-[0_12px_20px_rgba(59,130,246,0.25)] transition-transform duration-700 group-hover:-translate-y-6">
                  <polygon points="5,15 50,-5 95,15 50,35" fill="url(#topFace)" stroke="#3b82f6" strokeWidth="0.5"></polygon>
                </svg>
              </div>
            </div>
          </motion.div>

          {/* Cell 5: Tool/API integration */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
            whileHover={{ y: -6, borderColor: "rgba(59,130,246,0.3)" }}
            className="p-8 h-72 relative group overflow-hidden bg-white"
            style={{ borderRight: "1px solid rgba(226, 232, 240, 0.8)", borderBottom: "1px solid rgba(226, 232, 240, 0.8)" }}>

            <div className="absolute -top-[2px] -left-[2px] w-[3px] h-[3px] bg-slate-100 border border-slate-300 z-20 box-content"></div>

            {/* Dynamic path lines background */}
            <div className="absolute inset-0 right-8 bottom-8 opacity-[0.25] pointer-events-none transition-transform duration-1000 group-hover:scale-105">
              <svg width="100%" height="100%" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="absolute bottom-4 right-0 w-40 h-40">
                <path d="M30,150 L80,100 L120,130 L170,80" stroke="rgba(0,0,0,0.1)" strokeWidth="1"></path>
                <path d="M80,100 L110,60 L170,80" stroke="rgba(0,0,0,0.1)" strokeWidth="1"></path>
                <path d="M80,100 L120,130 L170,80" stroke="#3b82f6" strokeWidth="1.2" strokeDasharray="4 4" className="drop-shadow-[0_0_5px_rgba(59,130,246,0.4)]"></path>
                <rect x="28" y="148" width="4" height="4" fill="#ffffff" stroke="#94a3b8" strokeWidth="0.5" transform="rotate(45 30 150)"></rect>
                <rect x="78" y="98" width="4" height="4" fill="#ffffff" stroke="#94a3b8" strokeWidth="0.5" transform="rotate(45 80 100)"></rect>
                <rect x="118" y="128" width="4" height="4" fill="#ffffff" stroke="#3b82f6" strokeWidth="1" transform="rotate(45 120 130)"></rect>
                <rect x="168" y="78" width="4" height="4" fill="#3b82f6" stroke="var(--color-surface-raised)" strokeWidth="0.5" transform="rotate(45 170 80)"></rect>
              </svg>
            </div>

            <div className="relative z-10 flex flex-col h-full justify-between">
              <div>
                <span className="text-[10px] uppercase tracking-widest text-blue-500 font-bold mb-2 block">04 / Integration</span>
                <h3 className="text-lg font-semibold text-slate-900 mb-2">Tool & API Integration</h3>
                <p className="text-xs font-light leading-relaxed transition-colors text-slate-500 max-w-[90%]">
                  Connect agents to thousands of SaaS applications, custom APIs, local databases, and execution sandboxes instantly.
                </p>
              </div>
              <div className="h-6" />
            </div>
          </motion.div>

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
              <span className="text-blue-500 text-xs uppercase tracking-[0.25em] font-bold">Supported OS</span>
            </div>
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="text-4xl md:text-5xl font-light tracking-tight leading-tight glass-text mb-4"
            >
              Cross-Platform OS Compatibility
            </motion.h2>
            <p className="font-light text-base leading-relaxed transition-colors text-slate-600 max-w-sm">
              Zaby agents run natively across both desktop and server kernels, providing zero-latency environments for deep automation.
            </p>
          </div>

          {/* Right Side: Interactive cards */}
          <div className="w-full lg:w-2/3 grid grid-cols-1 md:grid-cols-2 gap-8">

            {/* Windows Card */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
              whileHover={{ y: -6, borderColor: "rgba(59,130,246,0.3)" }}
              className="bg-white/90 backdrop-blur-md border border-slate-200/80 rounded-2xl p-8 shadow-[0_8px_30px_rgba(0,0,0,0.02)] hover:shadow-[0_20px_45px_rgba(59,130,246,0.1)] transition-all duration-500 group relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-blue-500/5 to-transparent rounded-bl-full pointer-events-none" />

              <div className="flex items-center gap-4 mb-6">
                <div className="w-14 h-14 rounded-xl bg-slate-50/50 flex items-center justify-center border border-slate-200/60 group-hover:bg-slate-100/80 transition-colors duration-500 ">
                  {/* Modern Windows Logo in Bright Blue */}
                  <svg className="w-7 h-7 text-[#0078d4] transition-transform duration-500 group-hover:scale-110" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M0 3.449L9.75 2.1v9.45H0V3.449zM0 12.45h9.75v9.45L0 20.551v-8.1zM10.8 1.95L24 0v11.55H10.8V1.95zM10.8 12.45H24v11.55L10.8 22.05v-9.6z" />
                  </svg>
                </div>
                <div>
                  <span className="text-[9px] font-bold text-blue-500 uppercase tracking-wider block">Enterprise & Desktop</span>
                  <h3 className="text-xl font-bold text-slate-900">Windows</h3>
                </div>
              </div>

              <p className="text-xs font-light leading-relaxed transition-colors text-slate-500 mb-6">
                Deep integration with desktop viewports, native registry manipulation, complete PowerShell pipeline control, and active Win32/UWP application automation.
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-2">
                <span className="px-2.5 py-1 text-[10px] font-semibold text-blue-600 bg-blue-50/50 border border-blue-500/20 rounded-full">Win32 APIs</span>
                <span className="px-2.5 py-1 text-[10px] font-semibold text-slate-600 bg-slate-50 border border-slate-200/60 rounded-full">PowerShell v7</span>
                <span className="px-2.5 py-1 text-[10px] font-semibold text-slate-600 bg-slate-50 border border-slate-200/60 rounded-full">GUI Hooks</span>
              </div>
            </motion.div>

            {/* Linux Card */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
              whileHover={{ y: -6, borderColor: "rgba(59,130,246,0.3)" }}
              className="bg-white/90 backdrop-blur-md border border-slate-200/80 rounded-2xl p-8 shadow-[0_8px_30px_rgba(0,0,0,0.02)] hover:shadow-[0_20px_45px_rgba(15,23,42,0.05)] hover:border-slate-400/60 transition-all duration-500 group relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-slate-500/5 to-transparent rounded-bl-full pointer-events-none" />

              <div className="flex items-center gap-4 mb-6">
                <div className="w-14 h-14 rounded-xl bg-slate-50 flex items-center justify-center border border-slate-200 group-hover:bg-slate-100 transition-colors duration-500  overflow-hidden p-1.5">
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

              <p className="text-xs font-light leading-relaxed transition-colors text-slate-500 mb-6">
                Native POSIX execution, modular systemd service management, micro-container isolation sandboxing, shell pipe orchestration, and headless display virtual automation.
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-2">
                <span className="px-2.5 py-1 text-[10px] font-semibold text-slate-800 bg-slate-100 border border-slate-200/50 rounded-full">POSIX Shell</span>
                <span className="px-2.5 py-1 text-[10px] font-semibold text-slate-600 bg-slate-50 border border-slate-200/60 rounded-full">Systemd</span>
                <span className="px-2.5 py-1 text-[10px] font-semibold text-slate-600 bg-slate-50 border border-slate-200/60 rounded-full">Docker/Core</span>
              </div>
            </motion.div>

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
              <span className="text-blue-500 text-xs uppercase tracking-[0.25em] font-bold">Agent Infrastructure</span>
            </div>
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="text-4xl md:text-5xl font-light tracking-tight leading-tight glass-text"
            >
              Autonomous Teams. Real Impact.
            </motion.h2>
            <p className="font-light text-base leading-relaxed transition-colors text-slate-600 mt-2 max-w-2xl">
              Deploy intelligent agents that plan, act, and deliver outcomes across your entire stack. Zaby provides the orchestration layer for the next generation of digital labor.
            </p>
          </div>

          {/* Grid Layout containing Left Column, Center Column (3D Stack), Right Column */}
          <div className="grid grid-cols-1 lg:grid-cols-3 items-center gap-8 lg:gap-12 relative z-10">

            {/* Left Column: Feature Cards 1, 2 */}
            <div className="flex flex-col gap-8 z-10 w-full order-1">

              {/* Feature Card 1: Multi-Agent Orchestration */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
                whileHover={{ y: -4, borderColor: "rgba(99,102,241,0.2)" }}
                className="bg-white/70 backdrop-blur-xl border border-slate-200/50 rounded-2xl p-6 shadow-[0_4px_20px_rgba(0,0,0,0.02)] hover:shadow-[0_20px_40px_rgba(99,102,241,0.05)] transition-all duration-500 group relative"
              >
                {/* Animated SVG Connection Line to Center */}
                <div className="absolute top-1/2 -right-32 w-32 h-24 -translate-y-1/2 pointer-events-none hidden lg:block z-0 overflow-visible">
                  <svg className="w-full h-full overflow-visible" xmlns="http://www.w3.org/2000/svg">
                    <path d="M 128,80 C 64,80 64,48 0,48" fill="none" stroke="rgba(99,102,241,0.2)" strokeWidth="1.5" strokeDasharray="4 4" className="animate-[dash_30s_linear_infinite]" />
                    <circle r="3" fill="#6366f1" className="shadow-[0_0_10px_rgba(99,102,241,0.5)]">
                      <animateMotion dur="4s" repeatCount="indefinite" path="M 128,80 C 64,80 64,48 0,48" />
                    </circle>
                  </svg>
                </div>

                <div className="flex flex-col gap-4 relative z-10">
                  <div className="flex items-start justify-between">
                    <div className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-200/60 flex items-center justify-center text-slate-400 group-hover:text-indigo-500 group-hover:bg-indigo-50/50 group-hover:border-indigo-200/50 transition-all duration-500">
                      <Icon icon="solar:server-square-cloud-bold-duotone" width={22} />
                    </div>
                    <span className="text-[10px] font-bold bg-slate-100 text-slate-500 px-2 py-0.5 rounded-md border border-slate-200/50">
                      1,000+ Nodes
                    </span>
                  </div>
                  
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-indigo-500/80 mb-1 block">Orchestration</span>
                    <h4 className="text-xl font-medium text-slate-900 tracking-tight">Multi-Agent Control</h4>
                    <p className="text-sm font-light leading-relaxed text-slate-500 mt-2">
                      Scale complex reasoning across distributed agent swarms with automated task synchronization.
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* Feature Card 2: Secure by Design */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                whileHover={{ y: -4, borderColor: "rgba(99,102,241,0.2)" }}
                className="bg-white/70 backdrop-blur-xl border border-slate-200/50 rounded-2xl p-6 shadow-[0_4px_20px_rgba(0,0,0,0.02)] hover:shadow-[0_20px_40px_rgba(99,102,241,0.05)] transition-all duration-500 group relative"
              >
                {/* Animated SVG Connection Line to Center */}
                <div className="absolute top-1/2 -right-32 w-32 h-24 -translate-y-1/2 pointer-events-none hidden lg:block z-0 overflow-visible">
                  <svg className="w-full h-full overflow-visible" xmlns="http://www.w3.org/2000/svg">
                    <path d="M 128,16 C 64,16 64,48 0,48" fill="none" stroke="rgba(99,102,241,0.2)" strokeWidth="1.5" strokeDasharray="4 4" className="animate-[dash_30s_linear_infinite]" />
                    <circle r="3" fill="#6366f1" className="shadow-[0_0_10px_rgba(99,102,241,0.5)]">
                      <animateMotion dur="5s" repeatCount="indefinite" path="M 128,16 C 64,16 64,48 0,48" />
                    </circle>
                  </svg>
                </div>

                <div className="flex flex-col gap-4 relative z-10">
                  <div className="flex items-start justify-between">
                    <div className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-200/60 flex items-center justify-center text-slate-400 group-hover:text-indigo-500 group-hover:bg-indigo-50/50 group-hover:border-indigo-200/50 transition-all duration-500">
                      <Icon icon="solar:shield-check-bold-duotone" width={22} />
                    </div>
                    <span className="text-[10px] font-bold bg-slate-100 text-slate-500 px-2 py-0.5 rounded-md border border-slate-200/50">
                      Zero Trust
                    </span>
                  </div>
                  
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-indigo-500/80 mb-1 block">Security</span>
                    <h4 className="text-xl font-medium text-slate-900 tracking-tight">Secure by Design</h4>
                    <p className="text-sm font-light leading-relaxed text-slate-500 mt-2">
                      Bank-grade isolation and zero-trust execution environments for safe resource management.
                    </p>
                  </div>
                </div>
              </motion.div>

            </div>

            {/* Center Column: 3D Isometric Architecture Stack */}
            <div className="flex flex-col items-center justify-center py-6 lg:py-0 h-[550px] relative z-10 w-full order-2 lg:order-2">
              {/* Natural Purple Glow Background */}
              <div className="absolute w-[400px] h-[400px] rounded-full bg-indigo-500/10 blur-[100px] -z-10 animate-pulse pointer-events-none" style={{ animationDuration: '8s' }} />
              <div className="absolute w-[250px] h-[250px] rounded-full bg-purple-500/10 blur-[60px] -z-10 pointer-events-none" />

              {/* 3D Isometric Stack Container */}
              <div className="relative w-full h-full flex items-center justify-center [perspective:1500px] [transform-style:preserve-3d]">
                
                <motion.div 
                  className="relative w-[280px] h-[280px] [transform-style:preserve-3d]"
                  style={{ rotateX: 60, rotateZ: -45 }}
                  animate={{
                    rotateZ: [-45, -42, -45],
                    rotateX: [60, 63, 60],
                    y: [0, -10, 0]
                  }}
                  transition={{
                    type: "tween",
                    duration: 10,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  {/* Layer 6: Bottom Glass Shadow/Base */}
                  <div className="absolute inset-0 [transform-style:preserve-3d]" style={{ transform: "translateZ(-120px)" }}>
                    <div className="absolute inset-0 rounded-[40px] border border-indigo-500/10 bg-indigo-500/5 backdrop-blur-[1px] shadow-[inset_0_0_50px_rgba(99,102,241,0.05)]" />
                  </div>

                  {/* Layer 5: Sandbox / Protocol Layer */}
                  <div className="absolute inset-0 [transform-style:preserve-3d]" style={{ transform: "translateZ(-60px)" }}>
                    <div className="absolute inset-0 rounded-[40px] border border-slate-200/60 bg-white/40 flex items-center justify-center overflow-hidden shadow-lg backdrop-blur-sm">
                       <Icon icon="solar:shield-up-linear" className="text-indigo-500/5 text-9xl" />
                       <div className="absolute top-6 left-8 text-[9px] font-mono tracking-wider text-slate-400/60 uppercase">L5: Sandbox_Core</div>
                    </div>
                  </div>

                  {/* Layer 4: Intelligence / Orchestration Layer */}
                  <div className="absolute inset-0 [transform-style:preserve-3d]" style={{ transform: "translateZ(0px)" }}>
                    <div className="absolute inset-0 rounded-[40px] border border-slate-200/80 bg-white/60 flex items-center justify-center overflow-hidden shadow-xl backdrop-blur-md">
                       <Icon icon="solar:layers-minimalistic-linear" className="text-indigo-500/10 text-9xl" />
                       <div className="absolute top-6 left-8 text-[9px] font-mono tracking-wider text-slate-400/70 uppercase">L4: Orchestrator</div>
                    </div>
                  </div>

                  {/* Layer 3: Output / Execution Layer */}
                  <div className="absolute inset-0 [transform-style:preserve-3d]" style={{ transform: "translateZ(60px)" }}>
                    <div className="absolute inset-0 rounded-[40px] border border-slate-200 bg-white/80 flex items-center justify-center overflow-hidden shadow-2xl backdrop-blur-lg">
                       <Icon icon="solar:play-circle-linear" className="text-indigo-500/15 text-9xl" />
                       <div className="absolute top-6 left-8 text-[9px] font-mono tracking-wider text-slate-400/80 uppercase">L3: Execution_Runtime</div>
                    </div>
                  </div>

                  {/* Layer 2: Main Logo Block (The Core) */}
                  <div className="absolute inset-0 [transform-style:preserve-3d]" style={{ transform: "translateZ(120px)" }}>
                    <div className="absolute inset-0 rounded-[40px] border border-indigo-500/30 bg-slate-900 flex items-center justify-center overflow-hidden shadow-[0_0_50px_rgba(99,102,241,0.3)]">
                       <div className="absolute inset-0 opacity-40 mix-blend-lighten bg-cover bg-center" style={{ backgroundImage: "url('https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/fa51902b-c2a4-4c33-a96e-a8f1ef67edc6_1600w.jpg')" }} />
                       
                       <motion.div
                         animate={{ scale: [1, 1.05] }}
                         transition={{ 
                           duration: 2, 
                           repeat: Infinity, 
                           repeatType: "reverse", 
                           ease: "easeInOut"
                         }}
                       >
                         <svg width="100" height="100" viewBox="0 0 100 100" fill="none" className="relative z-10 drop-shadow-[0_0_20px_rgba(255,255,255,0.4)]">
                            <path d="M 65 30 C 65 15, 35 15, 35 30 C 35 45, 65 55, 65 70 C 65 85, 35 85, 35 70" stroke="white" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round"></path>
                         </svg>
                       </motion.div>
                       <div className="absolute top-6 left-8 text-[9px] font-mono tracking-wider text-white/40 uppercase">L2: Zaby_Kernel_v2</div>
                    </div>
                  </div>

                  {/* Layer 1: Top Glass Plate (Protection/UI) */}
                  <div className="absolute inset-0 [transform-style:preserve-3d]" style={{ transform: "translateZ(180px)" }}>
                    <div className="absolute inset-0 rounded-[40px] border border-white/40 bg-white/5 backdrop-blur-[3px] shadow-[inset_0_0_20px_rgba(255,255,255,0.1)]" />
                    <div className="absolute top-8 left-8 w-2 h-2 rounded-full bg-white/60 blur-[1px] shadow-[0_0_10px_rgba(255,255,255,0.8)]" />
                    <div className="absolute top-8 right-8 w-1.5 h-1.5 rounded-full bg-white/40" />
                    <div className="absolute bottom-8 left-8 w-1.5 h-1.5 rounded-full bg-white/40" />
                    <div className="absolute bottom-8 right-8 w-1.5 h-1.5 rounded-full bg-white/40" />
                    <div className="absolute top-7 left-14 text-[9px] font-mono tracking-wider text-slate-400/80 uppercase">L1: Interface_Layer</div>
                  </div>

                </motion.div>
              </div>

              {/* Version/Core Label */}
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                className="mt-12 px-4 py-1.5 bg-slate-50/80 backdrop-blur-md border border-slate-200/60 rounded-full flex items-center gap-2 shadow-sm"
              >
                <span className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse" />
                <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-[0.2em]">Zaby Infra Spec v2.1.0</span>
              </motion.div>
            </div>

            {/* Right Column: Feature Cards 3, 4 */}
            <div className="flex flex-col gap-8 z-10 w-full order-3 lg:order-3">

              {/* Feature Card 3: Enterprise Grade */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
                whileHover={{ y: -4, borderColor: "rgba(99,102,241,0.2)" }}
                className="bg-white/70 backdrop-blur-xl border border-slate-200/50 rounded-2xl p-6 shadow-[0_4px_20px_rgba(0,0,0,0.02)] hover:shadow-[0_20px_40px_rgba(99,102,241,0.05)] transition-all duration-500 group relative"
              >
                {/* Animated SVG Connection Line to Center */}
                <div className="absolute top-1/2 -left-32 w-32 h-24 -translate-y-1/2 pointer-events-none hidden lg:block z-0 overflow-visible">
                  <svg className="w-full h-full overflow-visible" xmlns="http://www.w3.org/2000/svg">
                    <path d="M 0,80 C 64,80 64,48 128,48" fill="none" stroke="rgba(99,102,241,0.2)" strokeWidth="1.5" strokeDasharray="4 4" className="animate-[dash_30s_linear_infinite]" />
                    <circle r="3" fill="#6366f1" className="shadow-[0_0_10px_rgba(99,102,241,0.5)]">
                      <animateMotion dur="3.5s" repeatCount="indefinite" path="M 0,80 C 64,80 64,48 128,48" />
                    </circle>
                  </svg>
                </div>

                <div className="flex flex-col gap-4 relative z-10">
                  <div className="flex items-start justify-between">
                    <div className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-200/60 flex items-center justify-center text-slate-400 group-hover:text-indigo-500 group-hover:bg-indigo-50/50 group-hover:border-indigo-200/50 transition-all duration-500">
                      <Icon icon="solar:buildings-bold-duotone" width={22} />
                    </div>
                    <span className="text-[10px] font-bold bg-slate-100 text-slate-500 px-2 py-0.5 rounded-md border border-slate-200/50">
                      99.99% Uptime
                    </span>
                  </div>
                  
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-indigo-500/80 mb-1 block">Reliability</span>
                    <h4 className="text-xl font-medium text-slate-900 tracking-tight">Enterprise Grade</h4>
                    <p className="text-sm font-light leading-relaxed text-slate-500 mt-2">
                      Mission-critical reliability for global operational workflows with high availability.
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* Feature Card 4: Observability Built-in */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
                whileHover={{ y: -4, borderColor: "rgba(99,102,241,0.2)" }}
                className="bg-white/70 backdrop-blur-xl border border-slate-200/50 rounded-2xl p-6 shadow-[0_4px_20px_rgba(0,0,0,0.02)] hover:shadow-[0_20px_40px_rgba(99,102,241,0.05)] transition-all duration-500 group relative"
              >
                {/* Animated SVG Connection Line to Center */}
                <div className="absolute top-1/2 -left-32 w-32 h-24 -translate-y-1/2 pointer-events-none hidden lg:block z-0 overflow-visible">
                  <svg className="w-full h-full overflow-visible" xmlns="http://www.w3.org/2000/svg">
                    <path d="M 0,16 C 64,16 64,48 128,48" fill="none" stroke="rgba(99,102,241,0.2)" strokeWidth="1.5" strokeDasharray="4 4" className="animate-[dash_30s_linear_infinite]" />
                    <circle r="3" fill="#10b981" className="shadow-[0_0_10px_rgba(16,185,129,0.5)]">
                      <animateMotion dur="4.2s" repeatCount="indefinite" path="M 0,16 C 64,16 64,48 128,48" />
                    </circle>
                  </svg>
                </div>

                <div className="flex flex-col gap-4 relative z-10">
                  <div className="flex items-start justify-between">
                    <div className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-200/60 flex items-center justify-center text-slate-400 group-hover:text-indigo-500 group-hover:bg-indigo-50/50 group-hover:border-indigo-200/50 transition-all duration-500">
                      <Icon icon="solar:eye-bold-duotone" width={22} />
                    </div>
                    <span className="text-[10px] font-bold bg-slate-100 text-slate-500 px-2 py-0.5 rounded-md border border-slate-200/50">
                      Real-time
                    </span>
                  </div>
                  
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-indigo-500/80 mb-1 block">Observability</span>
                    <h4 className="text-xl font-medium text-slate-900 tracking-tight">Deep Tracing</h4>
                    <p className="text-sm font-light leading-relaxed text-slate-500 mt-2">
                      Real-time visibility into every agent action and reasoning step for complete oversight.
                    </p>
                  </div>
                </div>
              </motion.div>

            </div>

          </div>

        </div>

        {/* Global definitions for Sparkline Gradients and Animations */}
        <svg width="0" height="0" className="absolute">
          <defs>
            <style>{`
              @keyframes dash {
                to {
                  stroke-dashoffset: -1000;
                }
              }
            `}</style>
            <linearGradient id="sparklineGradEmerald" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#10b981" stopOpacity="0.25" />
              <stop offset="100%" stopColor="#10b981" stopOpacity="0" />
            </linearGradient>
            <linearGradient id="sparklineGradBlue" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.25" />
              <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
            </linearGradient>
          </defs>
        </svg>
      </section>

      {/* ------------------------------------------------------------- */}
      {/* SECTION 4: PLATFORM GLANCE (Interactive Sandbox Web Simulation) */}
      {/* ------------------------------------------------------------- */}
      <div id="platform-glance-section" className="w-full relative z-10 flex flex-col gap-8">
        <div className="flex flex-col gap-1 pl-1">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-4xl md:text-5xl font-light tracking-tight leading-tight glass-text"
          >
            Sandbox Preview
          </motion.h2>
          <p className="font-light text-base leading-relaxed transition-colors text-slate-600 max-w-2xl mt-2">
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

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-4xl md:text-5xl font-light tracking-tight leading-tight glass-text"
          >
            Scale Operational Velocity
          </motion.h2>
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

        <div className="text-[10px] tracking-[1em] uppercase z-20 text-slate-900/50 pt-4">
          OPEN AGENTS © ZABY WORKFORCE OS
        </div>
      </section>
    </div>
  );
}
