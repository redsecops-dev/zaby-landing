"use client";

import React, { useState, useEffect, useRef, useId } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Icon } from "@iconify/react";
import Link from "next/link";
import {
  HeroLiquidMetalRoot,
  HeroLiquidMetalContainer,
  HeroLiquidMetalContent,
  HeroLiquidMetalHeading,
  HeroLiquidMetalDescription,
  HeroLiquidMetalVisual,
  HeroLiquidMetalMobileVisual,
} from "@/components/ui/hero-liquid-metal";

// import { useRouter } from "next/router";

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

      const startX =
        fromRect.left - containerRect.left + fromRect.width / 2 + startXOffset;
      const startY =
        fromRect.top - containerRect.top + fromRect.height / 2 + startYOffset;
      const endX =
        toRect.left - containerRect.left + toRect.width / 2 + endXOffset;
      const endY =
        toRect.top - containerRect.top + toRect.height / 2 + endYOffset;

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
  }, [
    containerRef,
    fromRef,
    toRef,
    curvature,
    startXOffset,
    startYOffset,
    endXOffset,
    endYOffset,
  ]);

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
  // const router= useRouter()
  const [activeTab, setActiveTab] = useState("monthly"); // For scheduling triggers
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);
  const [retrySimState, setRetrySimState] = useState("idle"); // idle, running, success

  // Ref for Hero Canvas animation
  const heroCanvasRef = useRef<HTMLCanvasElement>(null);

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
        color:
          i % 2 === 0 ? "rgba(59, 130, 246, 0.4)" : "rgba(99, 102, 241, 0.3)",
        pulseSpeed: Math.random() * 0.02 + 0.01,
        phase: Math.random() * Math.PI,
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
            ctx.strokeStyle = `rgba(59, 130, 246, ${0.15 * (1 - dist / 100)})`;
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
        ctx.shadowColor = "rgba(59, 130, 246, 0.5)";
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

  return (
    <div
      className="w-full min-h-screen h-auto bg-white text-slate-800 font-sans antialiased selection:bg-blue-500/10 p-6 md:p-12 lg:p-16 flex flex-col gap-16 relative overflow-x-hidden"
      style={{
        backgroundImage:
          "radial-gradient(circle at 80% 10%, rgba(59, 130, 246, 0.04) 0%, transparent 50%), radial-gradient(circle at 10% 80%, rgba(99, 102, 241, 0.03) 0%, transparent 50%)",
      }}
    >
      <style
        dangerouslySetInnerHTML={{
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
      `,
        }}
      />
      {/* -------------------- SECTION 1: HERO WITH EXTENDED ANIMATION -------------------- */}
      <section className="relative w-full rounded-3xl overflow-hidden flex flex-col gap-8">
        {/* Network Nodes Canvas background extended behind everything in Section 1 */}
        {/* <canvas ref={heroCanvasRef} className="absolute inset-0 w-full h-full pointer-events-none z-0" /> */}

        {/* Top Edge Blur Animation to avoid abrupt edges */}
        {/* <div className="absolute top-0 left-0 right-0 h-16 bg-gradient-to-b from-[#fafbfe] via-[#fafbfe]/40 to-transparent pointer-events-none z-10 edge-blur-animated" /> */}
        <div className="flex justify-between items-center">
          {/* Left Column - Content & Buttons */}
          <div className="lg:col-span-7 flex flex-col items-start text-left">
            <h1 className="reveal-text text-3xl sm:text-4xl md:text-5xl font-light tracking-tight leading-tight text-slate-900 max-w-2xl mb-6">
              Agentic Workflows
            </h1>

            <p className="reveal-text text-sm sm:text-base text-slate-500 leading-relaxed font-light mb-8 max-w-xl">
              A stateful execution framework for orchestrating intelligent
              agents, scheduled operations, retry logic, and compliance-critical
              workflows at scale.
            </p>

            <div className="flex flex-wrap items-center gap-4 gsap-reveal-item">
              <Link
                href="https://platform.zaby.io"
                className="group relative flex w-full cursor-pointer items-center justify-center gap-3 rounded-full bg-(--color-button-primary-bg) px-10 py-6 text-sm font-medium tracking-wide text-white transition-all hover:bg-(--color-button-primary-hover) sm:w-auto h-auto"
              >
                <Icon icon="solar:bolt-linear" width={20} height={20} />
                Build AI Workflow
              </Link>
              <Link
                href="https://platform.zaby.io/docs"
                className="flex w-full cursor-pointer items-center justify-center gap-3 rounded-full border border-(--color-button-secondary-border) bg-(--color-button-secondary-bg) px-10 py-6 text-sm font-medium text-(--color-button-secondary-text) backdrop-blur-md transition-all hover:bg-white sm:w-auto h-auto"
              >
                <Icon icon="solar:document-linear" width={20} height={20} />
                View Templates
              </Link>
            </div>
          </div>

          {/* Right Column - Checklist */}
          <div className="lg:col-span-5 flex flex-col gap-6 pl-0 lg:pl-12 border-l border-slate-100/80 mt-8 lg:mt-0 text-left">
            {[
              {
                title: "Adaptive Logic Flow",
                desc: "Orchestrate complex task sequences with autonomous decision-making at every node.",
              },
              {
                title: "Context-Aware Routing",
                desc: "Automatically inject relevant organizational data into every workflow step.",
              },
              {
                title: "Autonomous Recovery",
                desc: "Self-healing execution with intelligent error detection and automated retry logic.",
              },
              {
                title: "Stateful Model Chaining",
                desc: "Maintain persistent execution state across complex, multi-stage AI sequences.",
              },
            ].map((item, idx) => (
              <div
                key={idx}
                className="flex gap-4 items-start gsap-reveal-item"
              >
                <div className="w-5 h-5 rounded-full bg-violet-50 text-violet-500 border border-violet-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Icon icon="solar:check-read-linear" className="text-xs" />
                </div>
                <div className="flex flex-col gap-1 text-left">
                  <span className="text-sm font-semibold text-slate-900 leading-none">
                    {item.title}
                  </span>
                  <span className="text-xs text-slate-500 leading-relaxed font-light">
                    {item.desc}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
        {/* <h3 className="text-4xl md:text-5xl font-light tracking-tight leading-tight  mb-2">
              Agentic Workflows
            </h3>
            <p className="font-light text-base leading-relaxed text-slate-600 max-w-2xl">
              A stateful execution framework for orchestrating intelligent agents, scheduled operations, retry logic, and compliance-critical workflows at scale.
            </p> */}

        {/* Main Grid Content */}
      </section>

      {/* -------------------- SECTION 2: THE MONTHLY AUDIT WORKFLOW CANVAS -------------------- */}
      <section className="w-full relative z-10 border-t border-slate-200/60 pt-16">
        {/* Left header context */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4 text-left">
          <div>
            <span className="text-xs font-bold text-blue-600 uppercase tracking-widest block mb-2">
              Use Case
            </span>
            <h2 className="text-4xl md:text-5xl font-light tracking-tight leading-tight glass-text">
              Monthly Audit: Workflows Orchestrate.
            </h2>
            <p className="font-light text-base leading-relaxed transition-colors text-slate-500 mt-2 max-w-xl">
              Automatic daily, weekly, or monthly scheduler. Orchestrates
              compliance rules, executes tool integrations, and automatically
              triggers retry actions.
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
                <h4 className="text-xs font-bold text-slate-800">
                  Monthly Compliance Audit Flow
                </h4>
                <p className="text-[9px] text-slate-400">
                  Trigger: SYSTEM COMPLIANCE CRON
                </p>
              </div>
            </div>

            {/* Glowing Execution Status */}
            <div className="flex items-center gap-1.5 px-3 py-1 bg-emerald-500/10 border border-emerald-500/20 rounded-full">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-[8px] font-mono font-bold text-emerald-600 uppercase tracking-widest">
                Active &amp; Listening
              </span>
            </div>
          </div>

          {/* Interactive Graph Node Tree container (Aligned with absolute precision matching Image 1) */}
          <div className="flex-1 w-full overflow-x-auto pb-4">
            <div
              ref={containerRef}
              className="w-[980px] h-[600px] relative mx-auto my-4 shrink-0"
            >
              {/* Premium Magic UI AnimatedBeam Connections */}

              {/* Top Flow: Collect -> Extract -> Evaluate */}
              <AnimatedBeam
                containerRef={containerRef}
                fromRef={collectRef}
                toRef={extractRef}
                duration={4.5}
                delay={0}
                repeatDelay={3.5}
                gradientStartColor="#3b82f6"
                gradientStopColor="#4f46e5"
              />
              <AnimatedBeam
                containerRef={containerRef}
                fromRef={extractRef}
                toRef={evaluateRef}
                duration={4.5}
                delay={0}
                repeatDelay={3.5}
                gradientStartColor="#4f46e5"
                gradientStopColor="#3b82f6"
              />

              {/* Vertical flow under Extract: Extract -> Store Evidence -> Review -> Publish */}
              <AnimatedBeam
                containerRef={containerRef}
                fromRef={extractRef}
                toRef={storeRef}
                duration={4.5}
                delay={0}
                repeatDelay={3.5}
                gradientStartColor="#3b82f6"
                gradientStopColor="#4f46e5"
              />
              <AnimatedBeam
                containerRef={containerRef}
                fromRef={storeRef}
                toRef={reviewRef}
                duration={4.5}
                delay={0}
                repeatDelay={3.5}
                gradientStartColor="#4f46e5"
                gradientStopColor="#3b82f6"
              />
              <AnimatedBeam
                containerRef={containerRef}
                fromRef={reviewRef}
                toRef={publishRef}
                duration={4.5}
                delay={0}
                repeatDelay={3.5}
                gradientStartColor="#3b82f6"
                gradientStopColor="#4f46e5"
              />

              {/* Green Conditional Paths (Escalations) */}
              <AnimatedBeam
                containerRef={containerRef}
                fromRef={evaluateRef}
                toRef={ruleRef}
                duration={4.5}
                delay={0}
                repeatDelay={3.5}
                gradientStartColor="#3b82f6"
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
                gradientStartColor="#3b82f6"
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
                style={{
                  left: "40px",
                  top: "40px",
                  width: "240px",
                  height: "80px",
                }}
                onMouseEnter={() => setHoveredNode("collect")}
                onMouseLeave={() => setHoveredNode(null)}
                className={`absolute bg-white border text-left transition-all duration-300 overflow-hidden flex items-center justify-between p-4 z-10 rounded-2xl ${
                  hoveredNode === "collect"
                    ? "border-blue-500/40 scale-[1.02]"
                    : "border-slate-200"
                }`}
              >
                {hoveredNode === "collect" && (
                  <div
                    className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-500/5 to-transparent h-1/2 w-full animate-pulse top-0"
                    style={{ animationDuration: "1.2s" }}
                  />
                )}
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-200/60 flex items-center justify-center">
                    <Icon icon="logos:google-drive" className="text-xl" />
                  </div>
                  <div>
                    <h5 className="text-xs font-bold text-slate-800">
                      Collect Audit Sources
                    </h5>
                    <p className="text-[9px] text-slate-400">
                      Drive / Sheets / Docs
                    </p>
                  </div>
                </div>
                <div className="w-4 h-4 rounded-full bg-emerald-500 text-white flex items-center justify-center">
                  <Icon
                    icon="solar:check-circle-bold"
                    className="text-[10px]"
                  />
                </div>
              </div>

              {/* NODE 2: Retry Policy detail box */}
              <div
                ref={retryRef}
                style={{
                  left: "40px",
                  top: "273px",
                  width: "240px",
                  height: "215px",
                }}
                className="absolute bg-[#fafbfe] border border-slate-200 text-left overflow-hidden p-5 z-10 rounded-2xl"
              >
                <div className="absolute -right-12 -top-12 w-24 h-24 rounded-full bg-indigo-500/5 blur-xl pointer-events-none" />
                <div className="flex items-center gap-2 mb-4">
                  <Icon
                    icon="solar:restart-bold"
                    className="text-indigo-600 text-sm animate-spin"
                    style={{ animationDuration: "6s" }}
                  />
                  <span className="text-[9px] font-bold text-indigo-600 uppercase tracking-widest">
                    Retry Policy
                  </span>
                </div>
                <div className="flex flex-col gap-2.5">
                  <div className="flex items-center justify-between text-[10px] border-b border-slate-100 pb-1.5">
                    <span className="text-slate-400">Max Attempts</span>
                    <span className="font-bold text-slate-800 bg-white px-2 py-0.5 rounded border border-slate-200 shadow-xs">
                      3
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-[10px] border-b border-slate-100 pb-1.5">
                    <span className="text-slate-400">Backoff Strategy</span>
                    <span className="font-bold text-slate-800 bg-white px-2 py-0.5 rounded border border-slate-200 shadow-xs">
                      Exponential
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-[10px] border-b border-slate-100 pb-1.5">
                    <span className="text-slate-400">Initial Delay</span>
                    <span className="font-bold text-slate-800 bg-white px-2 py-0.5 rounded border border-slate-200 shadow-xs">
                      10s
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-[10px]">
                    <span className="text-slate-400">Max Delay</span>
                    <span className="font-bold text-slate-800 bg-white px-2 py-0.5 rounded border border-slate-200 shadow-xs">
                      5m
                    </span>
                  </div>
                </div>
              </div>

              {/* NODE 3: Extract & Summarize */}
              <div
                ref={extractRef}
                style={{
                  left: "370px",
                  top: "40px",
                  width: "240px",
                  height: "80px",
                }}
                onMouseEnter={() => setHoveredNode("extract")}
                onMouseLeave={() => setHoveredNode(null)}
                className={`absolute bg-white border text-left transition-all duration-300 overflow-hidden flex items-center justify-between p-4 z-10 rounded-2xl ${
                  hoveredNode === "extract"
                    ? "border-blue-500/40 scale-[1.02]"
                    : "border-slate-200"
                }`}
              >
                {hoveredNode === "extract" && (
                  <div
                    className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-500/5 to-transparent h-1/2 w-full animate-pulse top-0"
                    style={{ animationDuration: "1.2s" }}
                  />
                )}
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-200/60 flex items-center justify-center">
                    <Icon icon="logos:openai-icon" className="text-lg" />
                  </div>
                  <div>
                    <h5 className="text-xs font-bold text-slate-800">
                      Extract &amp; Summarize
                    </h5>
                    <p className="text-[9px] text-slate-400">AI Agent</p>
                  </div>
                </div>
                <div className="w-4 h-4 rounded-full bg-emerald-500 text-white flex items-center justify-center">
                  <Icon
                    icon="solar:check-circle-bold"
                    className="text-[10px]"
                  />
                </div>
              </div>

              {/* NODE 4: Store Evidence */}
              <div
                ref={storeRef}
                style={{
                  left: "370px",
                  top: "190px",
                  width: "240px",
                  height: "80px",
                }}
                onMouseEnter={() => setHoveredNode("store")}
                onMouseLeave={() => setHoveredNode(null)}
                className={`absolute bg-white border text-left transition-all duration-300 overflow-hidden flex items-center justify-between p-4 z-10 rounded-2xl ${
                  hoveredNode === "store"
                    ? "border-blue-500/40 scale-[1.02]"
                    : "border-slate-200"
                }`}
              >
                {hoveredNode === "store" && (
                  <div
                    className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-500/5 to-transparent h-1/2 w-full animate-pulse top-0"
                    style={{ animationDuration: "1.2s" }}
                  />
                )}
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-200/60 flex items-center justify-center">
                    <Icon icon="logos:notion-icon" className="text-lg" />
                  </div>
                  <div>
                    <h5 className="text-xs font-bold text-slate-800">
                      Store Evidence
                    </h5>
                    <p className="text-[9px] text-slate-400">Notion Database</p>
                  </div>
                </div>
                <div className="w-4 h-4 rounded-full bg-emerald-500 text-white flex items-center justify-center">
                  <Icon
                    icon="solar:check-circle-bold"
                    className="text-[10px]"
                  />
                </div>
              </div>

              {/* NODE 5: Review & Approve */}
              <div
                ref={reviewRef}
                style={{
                  left: "370px",
                  top: "340px",
                  width: "240px",
                  height: "80px",
                }}
                onMouseEnter={() => setHoveredNode("review")}
                onMouseLeave={() => setHoveredNode(null)}
                className={`absolute bg-white border text-left transition-all duration-300 overflow-hidden flex items-center justify-between p-4 z-10 rounded-2xl ${
                  hoveredNode === "review"
                    ? "border-blue-500/40 scale-[1.02]"
                    : "border-slate-200"
                }`}
              >
                {hoveredNode === "review" && (
                  <div
                    className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-500/5 to-transparent h-1/2 w-full animate-pulse top-0"
                    style={{ animationDuration: "1.2s" }}
                  />
                )}
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-200/60 flex items-center justify-center">
                    <Icon icon="logos:openai-icon" className="text-lg" />
                  </div>
                  <div>
                    <h5 className="text-xs font-bold text-slate-800">
                      Review &amp; Approve
                    </h5>
                    <p className="text-[9px] text-slate-400">
                      Human + AI Review
                    </p>
                  </div>
                </div>
                <div className="w-4 h-4 rounded-full bg-emerald-500 text-white flex items-center justify-center">
                  <Icon
                    icon="solar:check-circle-bold"
                    className="text-[10px]"
                  />
                </div>
              </div>

              {/* NODE 6: Publish Audit Report */}
              <div
                ref={publishRef}
                style={{
                  left: "370px",
                  top: "490px",
                  width: "240px",
                  height: "80px",
                }}
                onMouseEnter={() => setHoveredNode("publish")}
                onMouseLeave={() => setHoveredNode(null)}
                className={`absolute bg-white border text-left transition-all duration-300 overflow-hidden flex items-center justify-between p-4 z-10 rounded-2xl ${
                  hoveredNode === "publish"
                    ? "border-blue-500/40 scale-[1.02]"
                    : "border-slate-200"
                }`}
              >
                {hoveredNode === "publish" && (
                  <div
                    className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-500/5 to-transparent h-1/2 w-full animate-pulse top-0"
                    style={{ animationDuration: "1.2s" }}
                  />
                )}
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-200/60 flex items-center justify-center">
                    <Icon icon="logos:google-drive" className="text-xl" />
                  </div>
                  <div>
                    <h5 className="text-xs font-bold text-slate-800">
                      Publish Audit Report
                    </h5>
                    <p className="text-[9px] text-slate-400">Drive / PDF</p>
                  </div>
                </div>
                <div className="w-4 h-4 rounded-full bg-emerald-500 text-white flex items-center justify-center">
                  <Icon
                    icon="solar:check-circle-bold"
                    className="text-[10px]"
                  />
                </div>
              </div>

              {/* NODE 7: Evaluate & Score */}
              <div
                ref={evaluateRef}
                style={{
                  left: "700px",
                  top: "40px",
                  width: "240px",
                  height: "80px",
                }}
                onMouseEnter={() => setHoveredNode("evaluate")}
                onMouseLeave={() => setHoveredNode(null)}
                className={`absolute bg-white border text-left transition-all duration-300 overflow-hidden flex items-center justify-between p-4 z-10 rounded-2xl ${
                  hoveredNode === "evaluate"
                    ? "border-blue-500/40 scale-[1.02]"
                    : "border-slate-200"
                }`}
              >
                {hoveredNode === "evaluate" && (
                  <div
                    className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-500/5 to-transparent h-1/2 w-full animate-pulse top-0"
                    style={{ animationDuration: "1.2s" }}
                  />
                )}
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-200/60 flex items-center justify-center text-indigo-600">
                    <Icon icon="solar:document-text-bold" className="text-xl" />
                  </div>
                  <div>
                    <h5 className="text-xs font-bold text-slate-800">
                      Evaluate &amp; Score
                    </h5>
                    <p className="text-[9px] text-slate-400">Audit Criteria</p>
                  </div>
                </div>
                <div className="w-4 h-4 rounded-full bg-emerald-500 text-white flex items-center justify-center">
                  <Icon
                    icon="solar:check-circle-bold"
                    className="text-[10px]"
                  />
                </div>
              </div>

              {/* NODE 8: Conditional Rule filter block */}
              <div
                ref={ruleRef}
                style={{
                  left: "700px",
                  top: "190px",
                  width: "240px",
                  height: "80px",
                }}
                className="absolute bg-white border border-emerald-500/20 text-left overflow-hidden p-4 z-10 rounded-2xl flex items-center justify-between"
              >
                <div className="absolute -left-12 -top-12 w-24 h-24 rounded-full bg-emerald-500/5 blur-xl pointer-events-none" />
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600 shrink-0">
                    <Icon
                      icon="solar:filter-bold"
                      className="text-xl animate-pulse"
                    />
                  </div>
                  <div>
                    <span className="text-[8px] font-mono text-emerald-700 block mb-0.5">
                      .if score &lt; 80
                    </span>
                    <h5 className="text-xs font-bold text-slate-800">
                      Escalate for Review
                    </h5>
                  </div>
                </div>
                <div className="w-4 h-4 rounded-full bg-emerald-500 text-white flex items-center justify-center">
                  <Icon
                    icon="solar:check-circle-bold"
                    className="text-[10px]"
                  />
                </div>
              </div>

              {/* NODE 9: Notify Stakeholders */}
              <div
                ref={notifyRef}
                style={{
                  left: "700px",
                  top: "340px",
                  width: "240px",
                  height: "80px",
                }}
                onMouseEnter={() => setHoveredNode("notify")}
                onMouseLeave={() => setHoveredNode(null)}
                className={`absolute bg-white border text-left transition-all duration-300 overflow-hidden flex items-center justify-between p-4 z-10 rounded-2xl ${
                  hoveredNode === "notify"
                    ? "border-blue-500/40 scale-[1.02]"
                    : "border-slate-200"
                }`}
              >
                {hoveredNode === "notify" && (
                  <div
                    className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-500/5 to-transparent h-1/2 w-full animate-pulse top-0"
                    style={{ animationDuration: "1.2s" }}
                  />
                )}
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-200/60 flex items-center justify-center">
                    <Icon icon="logos:whatsapp-icon" className="text-xl" />
                  </div>
                  <div>
                    <h5 className="text-xs font-bold text-slate-800">
                      Notify Stakeholders
                    </h5>
                    <p className="text-[9px] text-slate-400">
                      WhatsApp / Email
                    </p>
                  </div>
                </div>
                <div className="w-4 h-4 rounded-full bg-emerald-500 text-white flex items-center justify-center">
                  <Icon
                    icon="solar:check-circle-bold"
                    className="text-[10px]"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Settings Bar */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-6 border-t border-slate-200/60 text-left">
            <div>
              <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block">
                Audits Enforced
              </span>
              <p className="text-xs font-bold text-slate-800 mt-1">
                Weekly, Monthly, Daily
              </p>
            </div>
            <div>
              <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block">
                Target Logs Enforced
              </span>
              <p className="text-xs font-bold text-slate-800 mt-1">
                Google Drive, Notion, OpenAI
              </p>
            </div>
            <div>
              <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block">
                Execution Engine
              </span>
              <p className="text-xs font-bold text-slate-800 mt-1 text-blue-600">
                AI + Deterministic Flow
              </p>
            </div>
            <div>
              <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block">
                Orchestrator State
              </span>
              <p className="text-xs font-bold text-slate-800 mt-1 text-emerald-600 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />{" "}
                100% Traceable
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* -------------------- SECTION 3: WORKFLOW TEMPLATES -------------------- */}
      <section className="w-full relative z-10 border-t border-slate-200/60 pt-16">
        <div className="flex flex-col items-start text-left mb-8">
          <span className="text-xs font-bold text-blue-600 uppercase tracking-[0.2em] mb-3">
            Templates
          </span>
          <h2 className="text-4xl md:text-5xl font-light tracking-tight leading-tight glass-text mb-2">
            Readily available workflow templates.
          </h2>
          <p className="font-light text-base leading-relaxed transition-colors text-slate-600 max-w-xl">
            Jumpstart compliance orchestration with pre-configured templates
            designed for fair evaluation, auditing gatekeepers, and systematic
            assessing procedures.
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
              icon: "solar:shield-check-bold",
            },
            {
              title: "Fair Grading & Evaluation",
              desc: "Enforces double-blind reviews for criteria-based educational or performance rubrics.",
              trigger: "On Submission",
              roles: "Evaluator, Reviewer",
              icon: "solar:verified-check-bold",
            },
            {
              title: "Multi-Agent Ledger Audit",
              desc: "Reconcile database records against transaction ledgers automatically.",
              trigger: "Monthly Schedule",
              roles: "Compliance Team",
              icon: "solar:notes-bold",
            },
            {
              title: "Active Complaint Router",
              desc: "Analyzes incoming support reports, evaluates compliance level, and notifies managers.",
              trigger: "Real-time Webhook",
              roles: "Support Team Manager",
              icon: "solar:bell-bold",
            },
          ].map((item) => (
            <div
              key={item.title}
              className="p-6 rounded-2xl border border-slate-200 bg-white transition-all duration-300 flex flex-col justify-between h-72 text-left"
            >
              <div>
                <div className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-200/60 flex items-center justify-center text-blue-600 mb-4">
                  <Icon icon={item.icon} className="text-xl" />
                </div>
                <h4 className="text-sm font-bold text-slate-800 mb-2">
                  {item.title}
                </h4>
                <p className="text-[11px] text-slate-500 leading-normal">
                  {item.desc}
                </p>
              </div>

              <div className="mt-4 pt-4 border-t border-slate-100">
                <div className="flex justify-between text-[9px] text-slate-400 font-medium mb-3">
                  <span>Trigger: {item.trigger}</span>
                  <span>Roles: {item.roles}</span>
                </div>
                <button className="cursor-pointer w-full border border-slate-200 text-slate-700 py-2 rounded-xl text-[10px] font-bold transition-all flex items-center justify-center gap-1">
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
            <span className="text-xs font-bold text-blue-600 uppercase tracking-[0.2em] mb-4">
              See It In Action
            </span>
            <h2 className="text-4xl md:text-5xl font-light tracking-tight leading-tight glass-text mb-4">
              Watch workflows <br />
              in motion.
            </h2>
            <p className="font-light text-base leading-relaxed transition-colors text-slate-600 mb-6">
              See how structured steps + cognitive intelligence ensure
              compliance, complete accuracy, and absolute fairness in real-world
              scenarios.
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
                  backgroundImage:
                    "url('https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/fa51902b-c2a4-4c33-a96e-a8f1ef67edc6_1600w.jpg')",
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              />

              {/* Title tag */}
              <div className="relative z-10 flex items-center justify-between">
                <span className="text-[10px] font-mono text-blue-400 font-bold tracking-wider">
                  Audit &amp; Evaluation Workflow Demo
                </span>
                <span className="text-[9px] font-mono bg-blue-600/20 text-blue-400 px-2 py-0.5 rounded border border-blue-500/30">
                  1080P PRO
                </span>
              </div>

              {/* Glowing Play button center */}
              <div className="relative z-10 flex items-center justify-center my-8">
                <div className="w-16 h-16 rounded-full bg-blue-600 text-white flex items-center justify-center shadow-[0_0_30px_rgba(59,130,246,0.5)] hover:scale-105 hover:bg-blue-500 transition-all cursor-pointer">
                  <Icon icon="solar:play-bold" className="text-2xl ml-1" />
                </div>
              </div>

              {/* Controls bar */}
              <div className="relative z-10 flex items-center gap-4 bg-black/40 backdrop-blur-md p-2 rounded-xl border border-white/5 text-xs font-mono text-white/80">
                <Icon
                  icon="solar:pause-bold"
                  className="cursor-pointer hover:text-white"
                />
                <span className="text-[9px]">1:34 / 2:45</span>

                {/* Scrubber bar */}
                <div className="flex-1 h-[3px] rounded bg-white/20 relative cursor-pointer">
                  <div className="absolute top-0 bottom-0 left-0 w-3/5 bg-blue-500 rounded" />
                  <div className="absolute top-1/2 left-3/5 -translate-y-1/2 w-2 h-2 rounded-full bg-white shadow" />
                </div>

                <Icon
                  icon="solar:volume-loud-bold"
                  className="cursor-pointer hover:text-white"
                />
                <Icon
                  icon="solar:maximize-bold"
                  className="cursor-pointer hover:text-white"
                />
              </div>
            </div>

            {/* Checklist */}
            <div className="md:col-span-4 flex flex-col justify-center gap-4 text-left">
              {[
                "Step-by-step execution",
                "AI checks & intelligence",
                "Human-in-the-loop review",
                "Transparent outcomes",
                "Complete audit trail",
              ].map((text) => (
                <div key={text} className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-600 shrink-0">
                    <Icon icon="solar:check-circle-bold" width={12} />
                  </div>
                  <span className="text-xs font-bold text-slate-800">
                    {text}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* -------------------- SECTION 6: CTA BANNER WITH INTERACTIVE SHADER -------------------- */}
      <footer className="w-full relative z-10 mt-6 flex flex-col gap-6">
        <HeroLiquidMetalRoot
          title="Workflows ensure compliance."
          subtitle="Workflows build trust."
          description="Take absolute control over automated daily routines, cross-application connections, and multi-agent AI execution pipelines securely."
          image="https://shaders.paper.design/images/logos/diamond.svg"
          desktopShaderProps={{
            scale: 0.8,
            speed: 0.7,
            repetition: 7,
            softness: 0.9,
            distortion: 0.3,
            colorTint: "#7c3aed",
          }}
          mobileShaderProps={{
            speed: 0.65,
            scale: 0.78,
            colorTint: "#a78bfa",
          }}
          className="w-full rounded-2xl bg-purple-500/5 backdrop-blur-lg text-white border border-purple-500/50 relative overflow-hidden min-h-[320px] h-auto flex flex-col justify-between p-6 md:p-8"
        >
          <HeroLiquidMetalContainer className="relative z-10 grid gap-6 pb-0 sm:pb-0 lg:pb-0 sm:gap-6 lg:grid-cols-[1.4fr_0.6fr] lg:items-center lg:gap-8 w-full max-w-none px-0">
            <HeroLiquidMetalContent className="p-0 sm:px-0 md:px-0 lg:pr-0 lg:pl-0 xl:pl-0 2xl:pl-0 text-left items-start gap-3">
              <HeroLiquidMetalHeading
                className="text-left pt-0 sm:pt-0 lg:pt-0"
                headingClassName="!text-black text-2xl md:text-3xl lg:text-3xl xl:text-3xl 2xl:text-3xl font-light leading-tight tracking-tight text-white text-left lg:text-left pt-0 sm:pt-0"
              />
              <HeroLiquidMetalDescription
                className="text-left mx-0 max-w-none pb-0 sm:pb-0 lg:pb-0"
                descriptionClassName="text-gray-500 text-xs md:text-sm leading-relaxed max-w-lg text-left lg:text-left"
              />

              <div className="relative z-10 flex flex-wrap gap-3 pt-4 border-t border-white/10 mt-2 w-full justify-start">
                <Link
                  href="https://platform.zaby.io"
                  className="group relative flex w-full cursor-pointer items-center justify-center gap-3 rounded-full bg-(--color-button-primary-bg) px-6 py-3.5 text-sm font-medium tracking-wide text-white shadow-[rgba(76,29,149,0.5)_0px_10px_30px_-10px] transition-all hover:bg-(--color-button-primary-hover) hover:shadow-[rgba(76,29,149,0.6)_0px_12px_34px_-10px] sm:w-auto"
                >
                  Build a workflow
                  <Icon icon="solar:arrow-right-linear" />
                </Link>
                <Link
                  href="https://platform.zaby.io/docs"
                  className="flex w-full cursor-pointer items-center justify-center gap-3 rounded-full border border-(--color-button-secondary-border) bg-(--color-button-secondary-bg) px-8 py-3.5 font-medium text-(--color-button-secondary-text) transition-all hover:bg-[#e9d5ff] sm:w-auto"
                >
                  Use a workflow
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
