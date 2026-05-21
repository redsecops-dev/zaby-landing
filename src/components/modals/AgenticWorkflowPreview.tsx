"use client";

import React, { useState, useEffect, useRef, useId } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Icon } from "@iconify/react";

// Premium Magic UI AnimatedBeam Component (Supports curvature, gradients, offsets, and reverse flows)
export interface AnimatedBeamProps {
  className?: string;
  containerRef: React.RefObject<HTMLElement | null>;
  fromRef: React.RefObject<HTMLElement | null>;
  toRef: React.RefObject<HTMLElement | null>;
  curvature?: number;
  startXOffset?: number;
  startYOffset?: number;
  endXOffset?: number;
  endYOffset?: number;
  duration?: number;
  delay?: number;
  reverse?: boolean;
  pathColor?: string;
  pathWidth?: number;
  pathOpacity?: number;
  gradientStartColor?: string;
  gradientStopColor?: string;
  repeatDelay?: number;
}

export const AnimatedBeam: React.FC<AnimatedBeamProps> = ({
  className,
  containerRef,
  fromRef,
  toRef,
  curvature = 0,
  startXOffset = 0,
  startYOffset = 0,
  endXOffset = 0,
  endYOffset = 0,
  duration = 2.5,
  delay = 0,
  reverse = false,
  pathColor = "#e2e8f0",
  pathWidth = 2,
  pathOpacity = 0.6,
  gradientStartColor = "#d946ef",
  gradientStopColor = "#6366f1",
  repeatDelay = 0,
}) => {
  const id = useId();
  const [pathD, setPathD] = useState("");
  const [svgDimensions, setSvgDimensions] = useState({ width: 0, height: 0 });
  const pathRef = useRef<SVGPathElement>(null);
  const [pathLength, setPathLength] = useState(0);

  useEffect(() => {
    const updatePath = () => {
      if (!containerRef.current || !fromRef.current || !toRef.current) return;

      const containerRect = containerRef.current.getBoundingClientRect();
      const fromRect = fromRef.current.getBoundingClientRect();
      const toRect = toRef.current.getBoundingClientRect();

      const svgWidth = containerRect.width;
      const svgHeight = containerRect.height;
      setSvgDimensions({ width: svgWidth, height: svgHeight });

      const startX = fromRect.left - containerRect.left + fromRect.width / 2 + startXOffset;
      const startY = fromRect.top - containerRect.top + fromRect.height / 2 + startYOffset;
      const endX = toRect.left - containerRect.left + toRect.width / 2 + endXOffset;
      const endY = toRect.top - containerRect.top + toRect.height / 2 + endYOffset;

      const controlX = (startX + endX) / 2;
      const controlY = (startY + endY) / 2 - curvature;

      const path = `M ${startX} ${startY} Q ${controlX} ${controlY} ${endX} ${endY}`;
      setPathD(path);
    };

    updatePath();

    const resizeObserver = new ResizeObserver(updatePath);
    if (containerRef.current) resizeObserver.observe(containerRef.current);
    if (fromRef.current) resizeObserver.observe(fromRef.current);
    if (toRef.current) resizeObserver.observe(toRef.current);

    window.addEventListener("resize", updatePath);

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener("resize", updatePath);
    };
  }, [containerRef, fromRef, toRef, curvature, startXOffset, startYOffset, endXOffset, endYOffset]);

  useEffect(() => {
    if (pathRef.current) {
      setPathLength(pathRef.current.getTotalLength());
    }
  }, [pathD]);

  const gradientId = `beam-gradient-${id.replace(/:/g, "")}`;

  return (
    <svg
      fill="none"
      width={svgDimensions.width}
      height={svgDimensions.height}
      viewBox={`0 0 ${svgDimensions.width} ${svgDimensions.height}`}
      className={`pointer-events-none absolute inset-0 z-0 ${className}`}
    >
      <path
        ref={pathRef}
        d={pathD}
        stroke={pathColor}
        strokeWidth={pathWidth}
        strokeOpacity={pathOpacity}
        strokeLinecap="round"
      />
      <motion.path
        d={pathD}
        stroke={`url(#${gradientId})`}
        strokeWidth={pathWidth + 1}
        strokeLinecap="round"
        initial={{ strokeDashoffset: reverse ? -pathLength : 40 }}
        animate={{
          strokeDashoffset: reverse ? [40, -pathLength] : [40, -pathLength],
        }}
        transition={{
          duration: duration,
          delay: delay,
          ease: "easeInOut",
          repeat: Infinity,
          repeatDelay: repeatDelay,
        }}
        style={{
          strokeDasharray: `40 ${pathLength || 1000}`,
        }}
      />
      <defs>
        <linearGradient
          id={gradientId}
          gradientUnits="userSpaceOnUse"
          x1="0%"
          y1="0%"
          x2="100%"
          y2="0%"
        >
          <stop offset="0%" stopColor={gradientStartColor} stopOpacity="0" />
          <stop offset="50%" stopColor={gradientStartColor} stopOpacity="1" />
          <stop offset="100%" stopColor={gradientStopColor} stopOpacity="0" />
        </linearGradient>
      </defs>
    </svg>
  );
};

export function AgenticWorkflowPreview() {
  const [activeTab, setActiveTab] = useState("monthly"); // For scheduling triggers
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);
  const [retrySimState, setRetrySimState] = useState("idle"); // idle, running, success

  // Ref for Hero Canvas animation
  const heroCanvasRef = useRef<HTMLCanvasElement>(null);
  // Ref for CTA Canvas animation
  const ctaCanvasRef = useRef<HTMLCanvasElement>(null);

  // Refs for Monthly Audit AnimatedBeam connections
  const containerRef = useRef<HTMLDivElement>(null);
  const collectRef = useRef<HTMLDivElement>(null);
  const extractRef = useRef<HTMLDivElement>(null);
  const evaluateRef = useRef<HTMLDivElement>(null);
  const storeRef = useRef<HTMLDivElement>(null);
  const reviewRef = useRef<HTMLDivElement>(null);
  const publishRef = useRef<HTMLDivElement>(null);
  const retryRef = useRef<HTMLDivElement>(null);
  const ruleRef = useRef<HTMLDivElement>(null);
  const notifyRef = useRef<HTMLDivElement>(null);

  // 1. Hero interactive Canvas particles effect
  useEffect(() => {
    const canvas = heroCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    let width = (canvas.width = canvas.offsetWidth);
    let height = (canvas.height = canvas.offsetHeight);

    const particles: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;
      color: string;
      pulseSpeed: number;
      phase: number;
    }> = [];

    for (let i = 0; i < 40; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.8,
        vy: (Math.random() - 0.5) * 0.8,
        radius: Math.random() * 2 + 1,
        color: i % 2 === 0 ? "rgba(232, 121, 249, 0.4)" : "rgba(99, 102, 241, 0.3)",
        pulseSpeed: Math.random() * 0.02 + 0.01,
        phase: Math.random() * Math.PI
      });
    }

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
    };
    window.addEventListener("resize", handleResize);

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      // Draw flowing grid network lines
      ctx.strokeStyle = "rgba(226, 232, 240, 0.4)";
      ctx.lineWidth = 0.5;
      for (let x = 40; x < width; x += 40) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      for (let y = 40; y < height; y += 40) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      // Draw connection lines between particles that are close
      ctx.lineWidth = 0.8;
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 100) {
            ctx.strokeStyle = `rgba(232, 121, 249, ${0.15 * (1 - dist / 100)})`;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }

      // Draw particles
      particles.forEach((p) => {
        p.phase += p.pulseSpeed;
        const currentRadius = p.radius + Math.sin(p.phase) * 0.8;
        ctx.beginPath();
        ctx.arc(p.x, p.y, currentRadius, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.shadowColor = "rgba(232, 121, 249, 0.5)";
        ctx.shadowBlur = 6;
        ctx.fill();
        ctx.shadowBlur = 0;

        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;
      });

      animationId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationId);
    };
  }, []);

  // 2. CTA Canvas Interactive Plexus Animation
  useEffect(() => {
    const canvas = ctaCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    let width = (canvas.width = canvas.offsetWidth);
    let height = (canvas.height = canvas.offsetHeight);

    const nodes: Array<{
      x: number;
      y: number;
      targetX: number;
      targetY: number;
      speed: number;
      radius: number;
    }> = [];

    for (let i = 0; i < 30; i++) {
      nodes.push({
        x: Math.random() * width,
        y: Math.random() * height,
        targetX: Math.random() * width,
        targetY: Math.random() * height,
        speed: Math.random() * 0.005 + 0.002,
        radius: Math.random() * 2 + 1.5
      });
    }

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      // Draw connection lines
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 120) {
            ctx.strokeStyle = `rgba(139, 92, 246, ${0.2 * (1 - dist / 120)})`;
            ctx.lineWidth = 0.8;
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.stroke();
          }
        }
      }

      // Update & Draw nodes
      nodes.forEach((n) => {
        n.x += (n.targetX - n.x) * n.speed;
        n.y += (n.targetY - n.y) * n.speed;

        if (Math.abs(n.x - n.targetX) < 5 && Math.abs(n.y - n.targetY) < 5) {
          n.targetX = Math.random() * width;
          n.targetY = Math.random() * height;
        }

        ctx.beginPath();
        ctx.arc(n.x, n.y, n.radius, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(232, 121, 249, 0.6)";
        ctx.shadowColor = "rgba(232, 121, 249, 0.4)";
        ctx.shadowBlur = 8;
        ctx.fill();
        ctx.shadowBlur = 0;
      });

      animationId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <div
      className="w-full min-h-screen h-auto bg-[#fafbfe] text-slate-800 font-sans antialiased selection:bg-fuchsia-500/10 p-6 md:p-12 lg:p-16 flex flex-col gap-16 relative overflow-x-hidden"
      style={{
        backgroundImage: "radial-gradient(circle at 80% 10%, rgba(232, 121, 249, 0.04) 0%, transparent 50%), radial-gradient(circle at 10% 80%, rgba(99, 102, 241, 0.03) 0%, transparent 50%)"
      }}
    >
      <style dangerouslySetInnerHTML={{
        __html: `
        .font-geist { font-family: 'Geist', sans-serif !important; }
        .glass-panel {
          background: rgba(255, 255, 255, 0.85);
          backdrop-filter: blur(16px);
          border: 1px solid rgba(226, 232, 240, 0.9);
        }
        .canvas-bg {
          background-image: radial-gradient(rgba(148, 163, 184, 0.1) 1.5px, transparent 1.5px);
          background-size: 24px 24px;
        }
        @keyframes edge-blur-pulse {
          0%, 100% {
            backdrop-filter: blur(8px);
            opacity: 0.8;
          }
          50% {
            backdrop-filter: blur(14px);
            opacity: 0.95;
          }
        }
        .edge-blur-animated {
          animation: edge-blur-pulse 5s ease-in-out infinite;
        }
      ` }} />
      {/* -------------------- SECTION 1: HERO WITH EXTENDED ANIMATION -------------------- */}
      <section className="relative w-full rounded-3xl border border-slate-200/60 bg-white/50 p-8 md:p-12 overflow-hidden flex flex-col gap-8 min-h-[75vh]">
        {/* Network Nodes Canvas background extended behind everything in Section 1 */}
        <canvas ref={heroCanvasRef} className="absolute inset-0 w-full h-full pointer-events-none z-0" />

        {/* Top Edge Blur Animation to avoid abrupt edges */}
        <div className="absolute top-0 left-0 right-0 h-16 bg-gradient-to-b from-[#fafbfe] via-[#fafbfe]/40 to-transparent pointer-events-none z-10 edge-blur-animated" />

        {/* Headspace at the top edge to keep a small description about what is a workflow */}
        <div className="relative z-10 w-full rounded-2xl border border-white/50 bg-[#fafbfe]/40 backdrop-blur-[8px] p-6 md:p-8">
          <div className="max-w-3xl text-left">
            <h3 className="text-4xl sm:text-5xl font-extrabold tracking-tighter mb-2">
              <span className="bg-gradient-to-r from-fuchsia-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
                Agentic Workflows
              </span>
            </h3>
            <p className="text-slate-500 text-xs sm:text-sm font-medium leading-relaxed max-w-2xl">
              A stateful execution framework for orchestrating intelligent agents, scheduled operations, retry logic, and compliance-critical workflows at scale.
            </p>
          </div>
        </div>

        {/* Main Grid Content */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10 flex-1">
          {/* Left Side Pitch */}
          <div className="lg:col-span-6 flex flex-col items-start text-left">
            <h1 className="text-3xl sm:text-4xl font-light tracking-tight text-slate-900 leading-tight mb-6 font-geist">
              See workflows <br />
              <span className="font-semibold text-fuchsia-600 bg-gradient-to-r from-fuchsia-600 to-indigo-600 bg-clip-text text-transparent">
                in action.
              </span>
            </h1>

            <p className="text-slate-500 text-base leading-relaxed max-w-xl mb-8">
              Let's walk through a real-world use case and see how workflows bring order, intelligence, and reliability to every step.
            </p>

            <div className="flex flex-wrap gap-3">
              <div className="flex items-center gap-2 px-3.5 py-2 rounded-full bg-white border border-slate-200">
                <Icon icon="solar:bolt-circle-bold" className="text-fuchsia-500" />
                <span className="text-xs font-semibold text-slate-700">Scheduled Audits</span>
              </div>
              <div className="flex items-center gap-2 px-3.5 py-2 rounded-full bg-white border border-slate-200">
                <Icon icon="solar:round-transfer-horizontal-bold" className="text-fuchsia-500" />
                <span className="text-xs font-semibold text-slate-700">Intelligent Routing</span>
              </div>
              <div className="flex items-center gap-2 px-3.5 py-2 rounded-full bg-white border border-slate-200">
                <Icon icon="solar:restart-bold" className="text-fuchsia-500" />
                <span className="text-xs font-semibold text-slate-700">Auto-Retry Fallbacks</span>
              </div>
            </div>
          </div>

          {/* Right Side: Floating 3D Pyramid & Sphere (Directly overlaid on canvas, no card border/background) */}
          <div className="lg:col-span-6 w-full min-h-[350px] relative flex items-center justify-center">
            {/* Glowing central 3D Pyramid & Sphere Container (Adapted to Fuchsia/Indigo Zaby system) */}
            <div className="relative w-full max-w-lg mx-auto h-72 flex flex-col items-center justify-center z-10">
              <div className="absolute w-72 h-72 rounded-full bg-fuchsia-500/5 blur-[60px] -z-10 pointer-events-none" />

              {/* The 3D Pyramid & Podium Container */}
              <div className="relative w-72 h-72 flex flex-col items-center justify-center">
                <div className="absolute inset-0 flex items-center justify-center [perspective:1200px] [transform-style:preserve-3d]">
                  {/* Floating Animation Group */}
                  <motion.div
                    className="relative flex items-center justify-center [transform-style:preserve-3d]"
                    style={{ width: "120px", height: "152px" }}
                    animate={{
                      y: [0, -14, 0],
                    }}
                    transition={{
                      duration: 6,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  >
                    {/* Glossy Core Sphere */}
                    <div
                      className="absolute w-16 h-16 rounded-full bg-gradient-to-br from-fuchsia-400 via-fuchsia-500 to-indigo-700 shadow-[0_0_35px_rgba(217,70,239,0.6),inset_0_5px_12px_rgba(255,255,255,0.6),inset_0_-5px_12px_rgba(0,0,0,0.4)] border border-fuchsia-300/40 animate-pulse z-10 flex items-center justify-center overflow-hidden"
                      style={{ transform: "translateY(20px)" }}
                    >
                      <div className="absolute top-1.5 left-2 w-5 h-3 rounded-full bg-white/60 rotate-[-15deg] blur-[0.5px]" />
                    </div>

                    {/* 3D Rotating Glass Pyramid */}
                    <motion.div
                      className="absolute [transform-style:preserve-3d]"
                      style={{ width: "120px", height: "152px", top: "0px", left: "0px" }}
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
                          width: "120px",
                          height: "152px",
                          left: "0px",
                          top: "0px",
                          clipPath: "polygon(50% 0%, 0% 100%, 100% 100%)",
                          transformOrigin: "50% 100%",
                          transform: "translateZ(60px) rotateX(23deg)",
                        }}
                      />
                      {/* Right Face */}
                      <div
                        className="absolute bg-fuchsia-500/[0.05] border border-fuchsia-400/30 backdrop-blur-[1px]"
                        style={{
                          width: "120px",
                          height: "152px",
                          left: "0px",
                          top: "0px",
                          clipPath: "polygon(50% 0%, 0% 100%, 100% 100%)",
                          transformOrigin: "50% 100%",
                          transform: "rotateY(90deg) translateZ(60px) rotateX(23deg)",
                        }}
                      />
                      {/* Back Face */}
                      <div
                        className="absolute bg-fuchsia-500/[0.04] border border-fuchsia-400/30 backdrop-blur-[1px]"
                        style={{
                          width: "120px",
                          height: "152px",
                          left: "0px",
                          top: "0px",
                          clipPath: "polygon(50% 0%, 0% 100%, 100% 100%)",
                          transformOrigin: "50% 100%",
                          transform: "rotateY(180deg) translateZ(60px) rotateX(23deg)",
                        }}
                      />
                      {/* Left Face */}
                      <div
                        className="absolute bg-fuchsia-500/[0.05] border border-fuchsia-400/30 backdrop-blur-[1px]"
                        style={{
                          width: "120px",
                          height: "152px",
                          left: "0px",
                          top: "0px",
                          clipPath: "polygon(50% 0%, 0% 100%, 100% 100%)",
                          transformOrigin: "50% 100%",
                          transform: "rotateY(270deg) translateZ(60px) rotateX(23deg)",
                        }}
                      />
                      {/* Base Face */}
                      <div
                        className="absolute bg-fuchsia-500/[0.03] border border-fuchsia-400/20"
                        style={{
                          width: "120px",
                          height: "120px",
                          left: "0px",
                          top: "0px",
                          transformOrigin: "50% 100%",
                          transform: "translate3d(0px, 32px, 60px) rotateX(90deg)",
                        }}
                      />
                    </motion.div>
                  </motion.div>
                </div>

                {/* Concentric Elevated Circular Podium */}
                <div className="absolute bottom-4 flex items-center justify-center w-full h-16 pointer-events-none">
                  <svg viewBox="0 0 200 60" className="w-48 h-full overflow-visible">
                    <defs>
                      <radialGradient id="podiumGlowFuchsia" cx="50%" cy="50%" r="50%">
                        <stop offset="0%" stopColor="#d946ef" stopOpacity="0.4" />
                        <stop offset="100%" stopColor="#d946ef" stopOpacity="0" />
                      </radialGradient>
                    </defs>
                    <ellipse cx="100" cy="30" rx="75" ry="15" fill="none" stroke="rgba(226, 232, 240, 0.7)" strokeWidth="1" />
                    <ellipse cx="100" cy="30" rx="65" ry="12" fill="none" stroke="rgba(217, 70, 239, 0.15)" strokeWidth="1.5" />
                    <line x1="50" y1="30" x2="150" y2="30" stroke="rgba(226, 232, 240, 0.4)" strokeWidth="0.75" />
                    <line x1="100" y1="15" x2="100" y2="45" stroke="rgba(226, 232, 240, 0.4)" strokeWidth="0.75" />
                    <ellipse cx="100" cy="30" rx="45" ry="9" fill="url(#podiumGlowFuchsia)" />
                    <ellipse cx="100" cy="30" rx="35" ry="7" fill="none" stroke="#d946ef" strokeWidth="1" className="animate-pulse" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* -------------------- SECTION 2: THE MONTHLY AUDIT WORKFLOW CANVAS -------------------- */}
      <section className="w-full relative z-10 border-t border-slate-200/60 pt-16">

        {/* Left header context */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4 text-left">
          <div>
            <span className="text-xs font-bold text-fuchsia-600 uppercase tracking-widest block mb-2">Use Case</span>
            <h2 className="text-3xl font-light text-slate-900 tracking-tight">
              Monthly Audit: <span className="font-semibold text-slate-800">Workflows Orchestrate.</span>
            </h2>
            <p className="text-slate-500 text-sm mt-1 max-w-xl">
              Automatic daily, weekly, or monthly scheduler. Orchestrates compliance rules, executes tool integrations, and automatically triggers retry actions.
            </p>
          </div>
        </div>

        {/* Interactive Canvas Graph (Exactly matching the Image 1 style with Sci-Fi animations) */}
        <div className="w-full min-h-[600px] rounded-3xl glass-panel border border-slate-200/80 overflow-hidden relative p-8 flex flex-col justify-between canvas-bg">

          {/* Top Panel Controls */}
          <div className="flex items-center justify-between border-b border-slate-200/60 pb-4 mb-8">
            <div className="flex items-center gap-3 text-left">
              <div className="w-8 h-8 rounded-lg bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600">
                <Icon icon="solar:document-text-bold" className="text-sm" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-slate-800">Monthly Compliance Audit Flow</h4>
                <p className="text-[9px] text-slate-400">Trigger: SYSTEM COMPLIANCE CRON</p>
              </div>
            </div>

            {/* Glowing Execution Status */}
            <div className="flex items-center gap-1.5 px-3 py-1 bg-emerald-500/10 border border-emerald-500/20 rounded-full">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-[8px] font-mono font-bold text-emerald-600 uppercase tracking-widest">Active &amp; Listening</span>
            </div>
          </div>

          {/* Interactive Graph Node Tree container (Aligned with absolute precision matching Image 1) */}
          <div className="flex-1 w-full overflow-x-auto pb-4">
            <div ref={containerRef} className="w-[980px] h-[600px] relative mx-auto my-4 shrink-0">

              {/* Premium Magic UI AnimatedBeam Connections */}

              {/* Top Flow: Collect -> Extract -> Evaluate */}
              <AnimatedBeam
                containerRef={containerRef}
                fromRef={collectRef}
                toRef={extractRef}
                duration={4.5}
                delay={0}
                repeatDelay={3.5}
                gradientStartColor="#d946ef"
                gradientStopColor="#6366f1"
              />
              <AnimatedBeam
                containerRef={containerRef}
                fromRef={extractRef}
                toRef={evaluateRef}
                duration={4.5}
                delay={0}
                repeatDelay={3.5}
                gradientStartColor="#6366f1"
                gradientStopColor="#8b5cf6"
              />

              {/* Vertical flow under Extract: Extract -> Store Evidence -> Review -> Publish */}
              <AnimatedBeam
                containerRef={containerRef}
                fromRef={extractRef}
                toRef={storeRef}
                duration={4.5}
                delay={0}
                repeatDelay={3.5}
                gradientStartColor="#d946ef"
                gradientStopColor="#6366f1"
              />
              <AnimatedBeam
                containerRef={containerRef}
                fromRef={storeRef}
                toRef={reviewRef}
                duration={4.5}
                delay={0}
                repeatDelay={3.5}
                gradientStartColor="#6366f1"
                gradientStopColor="#d946ef"
              />
              <AnimatedBeam
                containerRef={containerRef}
                fromRef={reviewRef}
                toRef={publishRef}
                duration={4.5}
                delay={0}
                repeatDelay={3.5}
                gradientStartColor="#d946ef"
                gradientStopColor="#6366f1"
              />

              {/* Green Conditional Paths (Escalations) */}
              <AnimatedBeam
                containerRef={containerRef}
                fromRef={evaluateRef}
                toRef={ruleRef}
                duration={4.5}
                delay={0}
                repeatDelay={3.5}
                gradientStartColor="#8b5cf6"
                gradientStopColor="#22c55e"
              />
              <AnimatedBeam
                containerRef={containerRef}
                fromRef={ruleRef}
                toRef={notifyRef}
                duration={4.5}
                delay={0}
                repeatDelay={3.5}
                gradientStartColor="#22c55e"
                gradientStopColor="#10b981"
              />
              <AnimatedBeam
                containerRef={containerRef}
                fromRef={reviewRef}
                toRef={notifyRef}
                duration={4.5}
                delay={0}
                repeatDelay={3.5}
                gradientStartColor="#d946ef"
                gradientStopColor="#10b981"
              />

              {/* Purple/Red Retry Connections (Fires in sync with main flow) */}
              {/* Retry → Store Evidence (arcs upward) */}
              <AnimatedBeam
                containerRef={containerRef}
                fromRef={retryRef}
                toRef={storeRef}
                curvature={-50}
                reverse
                duration={4.5}
                delay={0}
                repeatDelay={3.5}
                gradientStartColor="#ef4444"
                gradientStopColor="#f97316"
              />
              {/* Retry → Review & Approve (straight horizontal) */}
              <AnimatedBeam
                containerRef={containerRef}
                fromRef={retryRef}
                toRef={reviewRef}
                curvature={0}
                reverse
                duration={4.5}
                delay={0}
                repeatDelay={3.5}
                gradientStartColor="#ef4444"
                gradientStopColor="#f97316"
              />
              {/* Retry → Publish Audit Report (arcs downward) */}
              <AnimatedBeam
                containerRef={containerRef}
                fromRef={retryRef}
                toRef={publishRef}
                curvature={50}
                reverse
                duration={4.5}
                delay={0}
                repeatDelay={3.5}
                gradientStartColor="#ef4444"
                gradientStopColor="#f97316"
              />

              {/* NODE 1: Collect Audit Sources */}
              <div
                ref={collectRef}
                style={{ left: '40px', top: '40px', width: '240px', height: '80px' }}
                onMouseEnter={() => setHoveredNode("collect")}
                onMouseLeave={() => setHoveredNode(null)}
                className={`absolute bg-white border text-left transition-all duration-300 overflow-hidden flex items-center justify-between p-4 z-10 rounded-2xl ${hoveredNode === "collect"
                  ? "border-fuchsia-500/40 scale-[1.02]"
                  : "border-slate-200"
                  }`}
              >
                {hoveredNode === "collect" && (
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent via-fuchsia-500/5 to-transparent h-1/2 w-full animate-pulse top-0" style={{ animationDuration: '1.2s' }} />
                )}
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-200/60 flex items-center justify-center">
                    <Icon icon="logos:google-drive" className="text-xl" />
                  </div>
                  <div>
                    <h5 className="text-xs font-bold text-slate-800">Collect Audit Sources</h5>
                    <p className="text-[9px] text-slate-400">Drive / Sheets / Docs</p>
                  </div>
                </div>
                <div className="w-4 h-4 rounded-full bg-emerald-500 text-white flex items-center justify-center">
                  <Icon icon="solar:check-circle-bold" className="text-[10px]" />
                </div>
              </div>

              {/* NODE 2: Retry Policy detail box */}
              <div
                ref={retryRef}
                style={{ left: '40px', top: '273px', width: '240px', height: '215px' }}
                className="absolute bg-[#fafbfe] border border-slate-200 text-left overflow-hidden p-5 z-10 rounded-2xl"
              >
                <div className="absolute -right-12 -top-12 w-24 h-24 rounded-full bg-indigo-500/5 blur-xl pointer-events-none" />
                <div className="flex items-center gap-2 mb-4">
                  <Icon icon="solar:restart-bold" className="text-indigo-600 text-sm animate-spin" style={{ animationDuration: '6s' }} />
                  <span className="text-[9px] font-bold text-indigo-600 uppercase tracking-widest">Retry Policy</span>
                </div>
                <div className="flex flex-col gap-2.5">
                  <div className="flex items-center justify-between text-[10px] border-b border-slate-100 pb-1.5">
                    <span className="text-slate-400">Max Attempts</span>
                    <span className="font-bold text-slate-800 bg-white px-2 py-0.5 rounded border border-slate-200 shadow-xs">3</span>
                  </div>
                  <div className="flex items-center justify-between text-[10px] border-b border-slate-100 pb-1.5">
                    <span className="text-slate-400">Backoff Strategy</span>
                    <span className="font-bold text-slate-800 bg-white px-2 py-0.5 rounded border border-slate-200 shadow-xs">Exponential</span>
                  </div>
                  <div className="flex items-center justify-between text-[10px] border-b border-slate-100 pb-1.5">
                    <span className="text-slate-400">Initial Delay</span>
                    <span className="font-bold text-slate-800 bg-white px-2 py-0.5 rounded border border-slate-200 shadow-xs">10s</span>
                  </div>
                  <div className="flex items-center justify-between text-[10px]">
                    <span className="text-slate-400">Max Delay</span>
                    <span className="font-bold text-slate-800 bg-white px-2 py-0.5 rounded border border-slate-200 shadow-xs">5m</span>
                  </div>
                </div>
              </div>

              {/* NODE 3: Extract & Summarize */}
              <div
                ref={extractRef}
                style={{ left: '370px', top: '40px', width: '240px', height: '80px' }}
                onMouseEnter={() => setHoveredNode("extract")}
                onMouseLeave={() => setHoveredNode(null)}
                className={`absolute bg-white border text-left transition-all duration-300 overflow-hidden flex items-center justify-between p-4 z-10 rounded-2xl ${hoveredNode === "extract"
                  ? "border-fuchsia-500/40 scale-[1.02]"
                  : "border-slate-200"
                  }`}
              >
                {hoveredNode === "extract" && (
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent via-fuchsia-500/5 to-transparent h-1/2 w-full animate-pulse top-0" style={{ animationDuration: '1.2s' }} />
                )}
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-200/60 flex items-center justify-center">
                    <Icon icon="logos:openai-icon" className="text-lg" />
                  </div>
                  <div>
                    <h5 className="text-xs font-bold text-slate-800">Extract &amp; Summarize</h5>
                    <p className="text-[9px] text-slate-400">AI Agent</p>
                  </div>
                </div>
                <div className="w-4 h-4 rounded-full bg-emerald-500 text-white flex items-center justify-center">
                  <Icon icon="solar:check-circle-bold" className="text-[10px]" />
                </div>
              </div>

              {/* NODE 4: Store Evidence */}
              <div
                ref={storeRef}
                style={{ left: '370px', top: '190px', width: '240px', height: '80px' }}
                onMouseEnter={() => setHoveredNode("store")}
                onMouseLeave={() => setHoveredNode(null)}
                className={`absolute bg-white border text-left transition-all duration-300 overflow-hidden flex items-center justify-between p-4 z-10 rounded-2xl ${hoveredNode === "store"
                  ? "border-fuchsia-500/40 scale-[1.02]"
                  : "border-slate-200"
                  }`}
              >
                {hoveredNode === "store" && (
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent via-fuchsia-500/5 to-transparent h-1/2 w-full animate-pulse top-0" style={{ animationDuration: '1.2s' }} />
                )}
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-200/60 flex items-center justify-center">
                    <Icon icon="logos:notion-icon" className="text-lg" />
                  </div>
                  <div>
                    <h5 className="text-xs font-bold text-slate-800">Store Evidence</h5>
                    <p className="text-[9px] text-slate-400">Notion Database</p>
                  </div>
                </div>
                <div className="w-4 h-4 rounded-full bg-emerald-500 text-white flex items-center justify-center">
                  <Icon icon="solar:check-circle-bold" className="text-[10px]" />
                </div>
              </div>

              {/* NODE 5: Review & Approve */}
              <div
                ref={reviewRef}
                style={{ left: '370px', top: '340px', width: '240px', height: '80px' }}
                onMouseEnter={() => setHoveredNode("review")}
                onMouseLeave={() => setHoveredNode(null)}
                className={`absolute bg-white border text-left transition-all duration-300 overflow-hidden flex items-center justify-between p-4 z-10 rounded-2xl ${hoveredNode === "review"
                  ? "border-fuchsia-500/40 scale-[1.02]"
                  : "border-slate-200"
                  }`}
              >
                {hoveredNode === "review" && (
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent via-fuchsia-500/5 to-transparent h-1/2 w-full animate-pulse top-0" style={{ animationDuration: '1.2s' }} />
                )}
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-200/60 flex items-center justify-center">
                    <Icon icon="logos:openai-icon" className="text-lg" />
                  </div>
                  <div>
                    <h5 className="text-xs font-bold text-slate-800">Review &amp; Approve</h5>
                    <p className="text-[9px] text-slate-400">Human + AI Review</p>
                  </div>
                </div>
                <div className="w-4 h-4 rounded-full bg-emerald-500 text-white flex items-center justify-center">
                  <Icon icon="solar:check-circle-bold" className="text-[10px]" />
                </div>
              </div>

              {/* NODE 6: Publish Audit Report */}
              <div
                ref={publishRef}
                style={{ left: '370px', top: '490px', width: '240px', height: '80px' }}
                onMouseEnter={() => setHoveredNode("publish")}
                onMouseLeave={() => setHoveredNode(null)}
                className={`absolute bg-white border text-left transition-all duration-300 overflow-hidden flex items-center justify-between p-4 z-10 rounded-2xl ${hoveredNode === "publish"
                  ? "border-fuchsia-500/40 scale-[1.02]"
                  : "border-slate-200"
                  }`}
              >
                {hoveredNode === "publish" && (
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent via-fuchsia-500/5 to-transparent h-1/2 w-full animate-pulse top-0" style={{ animationDuration: '1.2s' }} />
                )}
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-200/60 flex items-center justify-center">
                    <Icon icon="logos:google-drive" className="text-xl" />
                  </div>
                  <div>
                    <h5 className="text-xs font-bold text-slate-800">Publish Audit Report</h5>
                    <p className="text-[9px] text-slate-400">Drive / PDF</p>
                  </div>
                </div>
                <div className="w-4 h-4 rounded-full bg-emerald-500 text-white flex items-center justify-center">
                  <Icon icon="solar:check-circle-bold" className="text-[10px]" />
                </div>
              </div>

              {/* NODE 7: Evaluate & Score */}
              <div
                ref={evaluateRef}
                style={{ left: '700px', top: '40px', width: '240px', height: '80px' }}
                onMouseEnter={() => setHoveredNode("evaluate")}
                onMouseLeave={() => setHoveredNode(null)}
                className={`absolute bg-white border text-left transition-all duration-300 overflow-hidden flex items-center justify-between p-4 z-10 rounded-2xl ${hoveredNode === "evaluate"
                  ? "border-fuchsia-500/40 scale-[1.02]"
                  : "border-slate-200"
                  }`}
              >
                {hoveredNode === "evaluate" && (
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent via-fuchsia-500/5 to-transparent h-1/2 w-full animate-pulse top-0" style={{ animationDuration: '1.2s' }} />
                )}
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-200/60 flex items-center justify-center text-indigo-600">
                    <Icon icon="solar:document-text-bold" className="text-xl" />
                  </div>
                  <div>
                    <h5 className="text-xs font-bold text-slate-800">Evaluate &amp; Score</h5>
                    <p className="text-[9px] text-slate-400">Audit Criteria</p>
                  </div>
                </div>
                <div className="w-4 h-4 rounded-full bg-emerald-500 text-white flex items-center justify-center">
                  <Icon icon="solar:check-circle-bold" className="text-[10px]" />
                </div>
              </div>

              {/* NODE 8: Conditional Rule filter block */}
              <div
                ref={ruleRef}
                style={{ left: '700px', top: '190px', width: '240px', height: '80px' }}
                className="absolute bg-white border border-emerald-500/20 text-left overflow-hidden p-4 z-10 rounded-2xl flex items-center justify-between"
              >
                <div className="absolute -left-12 -top-12 w-24 h-24 rounded-full bg-emerald-500/5 blur-xl pointer-events-none" />
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600 shrink-0">
                    <Icon icon="solar:filter-bold" className="text-xl animate-pulse" />
                  </div>
                  <div>
                    <span className="text-[8px] font-mono text-emerald-700 block mb-0.5">.if score &lt; 80</span>
                    <h5 className="text-xs font-bold text-slate-800">Escalate for Review</h5>
                  </div>
                </div>
                <div className="w-4 h-4 rounded-full bg-emerald-500 text-white flex items-center justify-center">
                  <Icon icon="solar:check-circle-bold" className="text-[10px]" />
                </div>
              </div>

              {/* NODE 9: Notify Stakeholders */}
              <div
                ref={notifyRef}
                style={{ left: '700px', top: '340px', width: '240px', height: '80px' }}
                onMouseEnter={() => setHoveredNode("notify")}
                onMouseLeave={() => setHoveredNode(null)}
                className={`absolute bg-white border text-left transition-all duration-300 overflow-hidden flex items-center justify-between p-4 z-10 rounded-2xl ${hoveredNode === "notify"
                  ? "border-fuchsia-500/40 scale-[1.02]"
                  : "border-slate-200"
                  }`}
              >
                {hoveredNode === "notify" && (
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent via-fuchsia-500/5 to-transparent h-1/2 w-full animate-pulse top-0" style={{ animationDuration: '1.2s' }} />
                )}
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-200/60 flex items-center justify-center">
                    <Icon icon="logos:whatsapp-icon" className="text-xl" />
                  </div>
                  <div>
                    <h5 className="text-xs font-bold text-slate-800">Notify Stakeholders</h5>
                    <p className="text-[9px] text-slate-400">WhatsApp / Email</p>
                  </div>
                </div>
                <div className="w-4 h-4 rounded-full bg-emerald-500 text-white flex items-center justify-center">
                  <Icon icon="solar:check-circle-bold" className="text-[10px]" />
                </div>
              </div>

            </div>
          </div>

          {/* Settings Bar */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-6 border-t border-slate-200/60 text-left">
            <div>
              <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block">Audits Enforced</span>
              <p className="text-xs font-bold text-slate-800 mt-1">Weekly, Monthly, Daily</p>
            </div>
            <div>
              <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block">Target Logs Enforced</span>
              <p className="text-xs font-bold text-slate-800 mt-1">Google Drive, Notion, OpenAI</p>
            </div>
            <div>
              <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block">Execution Engine</span>
              <p className="text-xs font-bold text-slate-800 mt-1 text-fuchsia-600">AI + Deterministic Flow</p>
            </div>
            <div>
              <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block">Orchestrator State</span>
              <p className="text-xs font-bold text-slate-800 mt-1 text-emerald-600 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" /> 100% Traceable
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* -------------------- SECTION 3: WORKFLOW TEMPLATES -------------------- */}
      <section className="w-full relative z-10 border-t border-slate-200/60 pt-16">
        <div className="flex flex-col items-start text-left mb-8">
          <span className="text-xs font-bold text-fuchsia-600 uppercase tracking-[0.2em] mb-3">Templates</span>
          <h2 className="text-3xl font-light text-slate-900 tracking-tight leading-tight mb-2">
            Readily available <span className="font-semibold">workflow templates.</span>
          </h2>
          <p className="text-slate-500 text-sm leading-relaxed max-w-xl">
            Jumpstart compliance orchestration with pre-configured templates designed for fair evaluation, auditing gatekeepers, and systematic assessing procedures.
          </p>
        </div>

        {/* Templates Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              title: "SOC2 Compliance Auditing",
              desc: "Automated checks routing database and system logs to audit files for SOC2 readiness.",
              trigger: "Weekly Schedule",
              roles: "Admin, Auditor",
              icon: "solar:shield-check-bold"
            },
            {
              title: "Fair Grading & Evaluation",
              desc: "Enforces double-blind reviews for criteria-based educational or performance rubrics.",
              trigger: "On Submission",
              roles: "Evaluator, Reviewer",
              icon: "solar:verified-check-bold"
            },
            {
              title: "Multi-Agent Ledger Audit",
              desc: "Reconcile database records against transaction ledgers automatically.",
              trigger: "Monthly Schedule",
              roles: "Compliance Team",
              icon: "solar:notes-bold"
            },
            {
              title: "Active Complaint Router",
              desc: "Analyzes incoming support reports, evaluates compliance level, and notifies managers.",
              trigger: "Real-time Webhook",
              roles: "Support Team Manager",
              icon: "solar:bell-bold"
            }
          ].map((item) => (
            <div
              key={item.title}
              className="p-6 rounded-2xl border border-slate-200 bg-white shadow-[0_2px_8px_rgba(0,0,0,0.01)] hover:border-fuchsia-500/30 hover:shadow-lg transition-all duration-300 flex flex-col justify-between h-72 text-left"
            >
              <div>
                <div className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-200/60 flex items-center justify-center text-fuchsia-600 mb-4">
                  <Icon icon={item.icon} className="text-xl" />
                </div>
                <h4 className="text-sm font-bold text-slate-800 mb-2">{item.title}</h4>
                <p className="text-[11px] text-slate-500 leading-normal">{item.desc}</p>
              </div>

              <div className="mt-4 pt-4 border-t border-slate-100">
                <div className="flex justify-between text-[9px] text-slate-400 font-medium mb-3">
                  <span>Trigger: {item.trigger}</span>
                  <span>Roles: {item.roles}</span>
                </div>
                <button className="w-full bg-slate-50 hover:bg-fuchsia-500 hover:text-white border border-slate-200 text-slate-700 py-2 rounded-xl text-[10px] font-bold transition-all flex items-center justify-center gap-1">
                  Use Template
                  <Icon icon="solar:arrow-right-linear" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* -------------------- SECTION 4: PRODUCT DEMO VIDEO PLAYER -------------------- */}
      <section className="w-full relative z-10 border-t border-slate-200/60 pt-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

          {/* Left Column Copy */}
          <div className="lg:col-span-4 flex flex-col items-start justify-center text-left">
            <span className="text-xs font-bold text-fuchsia-600 uppercase tracking-[0.2em] mb-4">See It In Action</span>
            <h2 className="text-3xl font-light text-slate-900 tracking-tight leading-tight mb-4 font-geist">
              Watch workflows <br />
              <span className="font-semibold text-slate-800">in motion.</span>
            </h2>
            <p className="text-slate-500 text-sm leading-relaxed mb-6">
              See how structured steps + cognitive intelligence ensure compliance, complete accuracy, and absolute fairness in real-world scenarios.
            </p>
          </div>

          {/* Right Column Video Player & Checklist */}
          <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-12 gap-6 items-stretch">

            {/* Custom Video Player mock */}
            <div className="md:col-span-8 rounded-2xl bg-slate-900 p-4 shadow-xl border border-slate-850 flex flex-col gap-4 relative overflow-hidden text-white min-h-[300px] justify-between">

              {/* Abstract system image background */}
              <div
                className="absolute inset-0 opacity-[0.2] z-0 pointer-events-none"
                style={{
                  backgroundImage: "url('https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/fa51902b-c2a4-4c33-a96e-a8f1ef67edc6_1600w.jpg')",
                  backgroundSize: "cover",
                  backgroundPosition: "center"
                }}
              />

              {/* Title tag */}
              <div className="relative z-10 flex items-center justify-between">
                <span className="text-[10px] font-mono text-fuchsia-400 font-bold tracking-wider">Audit &amp; Evaluation Workflow Demo</span>
                <span className="text-[9px] font-mono bg-fuchsia-600/20 text-fuchsia-400 px-2 py-0.5 rounded border border-fuchsia-500/30">1080P PRO</span>
              </div>

              {/* Glowing Play button center */}
              <div className="relative z-10 flex items-center justify-center my-8">
                <div className="w-16 h-16 rounded-full bg-fuchsia-600 text-white flex items-center justify-center shadow-[0_0_30px_rgba(232,121,249,0.5)] hover:scale-105 hover:bg-fuchsia-500 transition-all cursor-pointer">
                  <Icon icon="solar:play-bold" className="text-2xl ml-1" />
                </div>
              </div>

              {/* Controls bar */}
              <div className="relative z-10 flex items-center gap-4 bg-black/40 backdrop-blur-md p-2 rounded-xl border border-white/5 text-xs font-mono text-white/80">
                <Icon icon="solar:pause-bold" className="cursor-pointer hover:text-white" />
                <span className="text-[9px]">1:34 / 2:45</span>

                {/* Scrubber bar */}
                <div className="flex-1 h-[3px] rounded bg-white/20 relative cursor-pointer">
                  <div className="absolute top-0 bottom-0 left-0 w-3/5 bg-fuchsia-500 rounded" />
                  <div className="absolute top-1/2 left-3/5 -translate-y-1/2 w-2 h-2 rounded-full bg-white shadow" />
                </div>

                <Icon icon="solar:volume-loud-bold" className="cursor-pointer hover:text-white" />
                <Icon icon="solar:maximize-bold" className="cursor-pointer hover:text-white" />
              </div>
            </div>

            {/* Checklist */}
            <div className="md:col-span-4 flex flex-col justify-center gap-4 text-left">
              {[
                "Step-by-step execution",
                "AI checks & intelligence",
                "Human-in-the-loop review",
                "Transparent outcomes",
                "Complete audit trail"
              ].map((text) => (
                <div key={text} className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-fuchsia-500/10 border border-fuchsia-500/20 flex items-center justify-center text-fuchsia-600 shrink-0">
                    <Icon icon="solar:check-circle-bold" width={12} />
                  </div>
                  <span className="text-xs font-bold text-slate-800">{text}</span>
                </div>
              ))}
            </div>

          </div>

        </div>
      </section>



      {/* -------------------- SECTION 6: CTA BANNER WITH INTERACTIVE ANIMATION -------------------- */}
      <footer className="w-full relative z-10 mt-6 flex flex-col gap-6">

        {/* Extended CTA banner housing the gorgeous plexus canvas block */}
        <div className="w-full rounded-2xl bg-gradient-to-br from-fuchsia-950 via-purple-950 to-indigo-950 text-white border border-white/10 relative overflow-hidden shadow-xl min-h-[350px] flex flex-col justify-between p-8 md:p-12">

          {/* Active Interactive Plexus Grid Background overlay */}
          <canvas ref={ctaCanvasRef} className="absolute inset-0 w-full h-full opacity-40 z-0" />

          <div className="absolute inset-0 opacity-[0.08] mix-blend-screen pointer-events-none"
            style={{
              backgroundImage: "url('https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/fa51902b-c2a4-4c33-a96e-a8f1ef67edc6_1600w.jpg')",
              backgroundSize: "cover"
            }}
          />

          {/* Top Banner Content Area */}
          <div className="relative z-10 max-w-2xl text-left flex flex-col gap-4">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-[10px] font-bold uppercase tracking-wider w-fit">
              <Icon icon="solar:shield-check-bold" className="text-fuchsia-400" />
              Enterprise Orchestration Engine
            </div>

            <h3 className="text-3xl sm:text-4.5xl font-light leading-tight tracking-tight">
              Workflows ensure compliance. <br />
              <span className="font-semibold text-fuchsia-300">Workflows build trust.</span>
            </h3>

            <p className="text-xs text-white/60 leading-relaxed max-w-lg">
              Take absolute control over automated daily routines, cross-application connections, and multi-agent AI execution pipelines securely.
            </p>
          </div>

          {/* Bottom Button Row */}
          <div className="relative z-10 flex flex-wrap gap-4 pt-8 border-t border-white/10 mt-8 shrink-0">
            <button className="bg-white text-slate-950 hover:bg-slate-100 px-8 py-3.5 rounded-full text-xs font-bold transition-all shadow-lg flex items-center gap-2">
              Build a workflow
              <Icon icon="solar:arrow-right-linear" />
            </button>
            <button className="bg-white/10 text-white hover:bg-white/15 border border-white/20 px-8 py-3.5 rounded-full text-xs font-medium transition-all">
              Use a workflow
            </button>
          </div>

        </div>

        {/* Small bottom footer detail */}
        <div className="flex items-center justify-center gap-2 text-[10px] text-slate-400">
          <Icon icon="solar:lock-keyhole-minimalistic-linear" className="text-slate-400" />
          <span>Your data is secure and never used to train models.</span>
        </div>

      </footer>

    </div>
  );
}
