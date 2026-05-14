"use client";

import { useEffect, useRef } from "react";
import { Icon } from "@iconify/react";

// ─── Types ───────────────────────────────────────────────────────────────────

type CardType = "flow" | "throughput" | "engine" | "efficiency" | "facility";

interface CardData {
  id: number;
  title: string;
  description: string;
  icon?: string;
  bgImage?: string;
  x: number;
  y: number;
  z: number;
  rot: number;
  type: CardType;
}

// ─── Data ────────────────────────────────────────────────────────────────────

const CARDS_DATA: CardData[] = [
  {
    id: 1,
    title: "Agent Runtime",
    description: "Execution lifecycle management across globally distributed agent instances.",
    icon: "solar:routing-2-linear",
    bgImage: "https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/e534354d-c5f2-4399-a1d9-2f50338e8c47_1600w.jpg",
    x: -280, y: -10, z: -200, rot: 18,
    type: "flow",
  },
  {
    id: 2,
    title: "Workflow Engine",
    description: "Orchestration, scheduling, and retry logic for complex multi-agent pipelines.",
    x: -150, y: 5, z: -100, rot: 10,
    type: "throughput",
  },
  {
    id: 3,
    title: "Execution Core",
    description: "Centralized runtime managing task queues, agent state, and operational continuity across all execution shards.",
    x: 0, y: 10, z: 0, rot: 0,
    type: "engine",
  },
  {
    id: 4,
    title: "Memory Store",
    description: "Vector storage and semantic retrieval for persistent agent intelligence across sessions.",
    icon: "solar:settings-linear",
    x: 150, y: 0, z: -100, rot: -10,
    type: "efficiency",
  },
  {
    id: 5,
    title: "Enterprise Node",
    description: "Dedicated Cluster — Active",
    icon: "solar:server-square-linear",
    bgImage: "https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/7f78131e-65e9-49b2-aa1f-ccc33e28df9f_1600w.webp",
    x: 280, y: -15, z: -200, rot: -18,
    type: "facility",
  },
];

// ─── ThroughputCard ──────────────────────────────────────────────────────────

function ThroughputCard() {
  return (
    <div className="relative w-full h-full bg-white/95 backdrop-blur-xl rounded-[2.5rem] p-6 flex flex-col justify-between border border-white/50 shadow-inner">
      <div>
        <h3 className="text-2xl font-semibold tracking-tight mb-2 text-slate-800">Workflow Engine</h3>
        <p className="text-xs leading-relaxed text-slate-500 font-medium">
          Orchestration, scheduling, and retry logic for complex multi-agent pipelines.
        </p>
      </div>

      <div className="flex items-end justify-between h-24 gap-[3px] mt-4 mb-2">
        {[40, 70, 50, 100, 30, 60, 85, 45, 75].map((height, i) => (
          <div
            key={i}
            className="w-2 rounded-full origin-bottom bar-anim"
            style={{
              height: `${height}%`,
              backgroundColor: height === 100
                ? "rgba(232,121,249,1)"
                : `rgba(232,121,249,${(height / 100) * 0.8})`,
            }}
          />
        ))}
      </div>

      <div className="space-y-2 mt-auto">
        <div className="bg-slate-50 rounded-full px-4 py-2 flex justify-between items-center text-xs border border-slate-100">
          <span className="text-slate-500">Active Agents</span>
          <span className="font-semibold text-slate-800">942 / hr</span>
        </div>
        <div className="bg-slate-50 rounded-full px-4 py-2 flex justify-between items-center text-xs border border-slate-100">
          <span className="text-slate-500">Avg. Task Time</span>
          <span className="font-semibold text-slate-800">415 ms</span>
        </div>
      </div>
    </div>
  );
}

// ─── CoreEngineCard ──────────────────────────────────────────────────────────

function CoreEngineCard() {
  return (
    <div className="relative w-full h-full bg-white/70 backdrop-blur-2xl rounded-[2.5rem] border border-white/60 p-7 flex flex-col shadow-inner">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-3">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/77415a2e-dcbc-4748-a29d-fced4821881a_1600w.jpg"
            alt="User"
            className="w-9 h-9 rounded-full object-cover border border-white/50 shadow-sm"
          />
          <div className="flex flex-col">
          <span className="text-xs font-semibold text-slate-800">Execution Core</span>
            <span className="text-[10px] text-slate-500">Authorized</span>
          </div>
        </div>
        <Icon icon="solar:menu-dots-circle-linear" className="text-slate-400 hover:text-slate-600 cursor-pointer transition-colors" width={24} height={24} />
      </div>

      <h2 className="text-3xl font-semibold tracking-tight text-slate-900 mb-2">Execution Core</h2>
      <p className="text-xs leading-relaxed text-slate-600 mb-6 font-medium">
        Centralized runtime managing task queues, agent state, and operational continuity across all execution shards.
      </p>

      <div className="flex-grow bg-slate-50/50 rounded-3xl border border-slate-200/60 p-5 relative overflow-hidden flex flex-col justify-between mb-6 shadow-inner">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.5)]" />
            <span className="font-semibold text-sm text-slate-700 tracking-tight">Activity</span>
          </div>
          <div className="text-xs font-medium text-slate-500">Live</div>
        </div>

        <div className="relative h-20 mt-4 w-full">
          <svg className="absolute inset-0 w-full h-full overflow-visible" viewBox="0 0 100 40" preserveAspectRatio="none">
            <path d="M0,20 Q20,30 40,15 T70,25 T100,15" fill="none" stroke="currentColor" strokeWidth="1" className="text-slate-300" />
            <path
              id="main-path"
              d="M0,25 Q15,10 30,22 T55,10 T75,25 T100,18"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="text-blue-500 drop-shadow-md"
              style={{ strokeDasharray: 200, strokeDashoffset: 200 }}
            />
            <circle cx="30" cy="22" r="3" fill="currentColor" stroke="white" strokeWidth="1" className="text-blue-500 main-dot" />
            <circle cx="55" cy="10" r="3" fill="currentColor" stroke="white" strokeWidth="1" className="text-blue-500 main-dot" />
            <circle cx="75" cy="25" r="3" fill="currentColor" stroke="white" strokeWidth="1" className="text-blue-500 main-dot" />
          </svg>
        </div>
      </div>

      <div className="flex gap-3">
        <button className="flex-1 bg-white/60 hover:bg-white text-slate-700 text-xs font-medium py-3 rounded-2xl transition-all border border-slate-200/50 shadow-sm backdrop-blur-md">
          Inspect
        </button>
        <button className="flex-1 bg-linear-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white text-xs font-medium py-3 rounded-2xl shadow-[0_8px_16px_rgba(79,70,229,0.2)] transition-all">
          Deploy
        </button>
      </div>
    </div>
  );
}

// ─── AnimationsManager ───────────────────────────────────────────────────────

function AnimationsManager() {
  useEffect(() => {
    const initAnimations = async () => {
      try {
        const { gsap } = await import("gsap");
        const { ScrollTrigger } = await import("gsap/ScrollTrigger");
        gsap.registerPlugin(ScrollTrigger);

        gsap.to("#dsv-hero-header", {
          autoAlpha: 1,
          y: 0,
          duration: 1.2,
          ease: "power3.out",
          delay: 0.2,
        });

        gsap.to(".dsv-card", {
          duration: 1.8,
          autoAlpha: 1,
          scale: 1,
          x: (i: number, el: HTMLElement) => parseFloat(el.dataset.x ?? "0"),
          y: (i: number, el: HTMLElement) => parseFloat(el.dataset.y ?? "0"),
          z: (i: number, el: HTMLElement) => parseFloat(el.dataset.z ?? "0"),
          rotateY: (i: number, el: HTMLElement) => parseFloat(el.dataset.rot ?? "0"),
          stagger: { amount: 0.4, from: "center" },
          ease: "back.out(1.1)",
          delay: 0.4,
        });

        gsap.to("#main-path", {
          strokeDashoffset: 0,
          duration: 2.5,
          ease: "power2.inOut",
          delay: 1.5,
        });

        gsap.to(".main-dot", {
          scale: 1.3,
          transformOrigin: "center",
          duration: 1.5,
          yoyo: true,
          repeat: -1,
          ease: "sine.inOut",
          stagger: 0.2,
        });

        // GSAP accepts string "random(...)" for scaleY/duration — cast for TS
        gsap.to(".bar-anim", {
          scaleY: "random(0.5, 1.2)" as unknown as number,
          duration: "random(1.5, 3)" as unknown as number,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });

      } catch {
        // Animations not critical — fail silently
      }
    };

    initAnimations();
  }, []);

  return null;
}

// ─── CardStack ───────────────────────────────────────────────────────────────

function CardStack() {
  const scaleWrapperRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Responsive scale
  useEffect(() => {
    const updateScale = () => {
      if (!scaleWrapperRef.current) return;
      const w = window.innerWidth;
      const h = window.innerHeight;
      let scale = 1;
      if (w < 850) scale = w / 850;
      if (h < 700 && scale > 0.6) scale = h / 800;
      scale = Math.max(0.45, scale);
      scaleWrapperRef.current.style.transform = `scale(${scale})`;
    };

    window.addEventListener("resize", updateScale);
    updateScale();
    return () => window.removeEventListener("resize", updateScale);
  }, []);

  // Mouse parallax
  useEffect(() => {
    const initParallax = async () => {
      try {
        const { gsap } = await import("gsap");
        const container = containerRef.current;
        if (!container) return;

        const handleMouseMove = (e: MouseEvent) => {
          const x = (e.clientX / window.innerWidth - 0.5) * 2;
          const y = (e.clientY / window.innerHeight - 0.5) * 2;
          gsap.to(container, {
            rotateY: x * 6,
            rotateX: -y * 3,
            duration: 1.5,
            ease: "power2.out",
          });
        };

        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
      } catch {
        // Parallax not critical
      }
    };

    const cleanup = initParallax();
    return () => { cleanup?.then((fn) => fn?.()); };
  }, []);

  return (
    <div
      ref={scaleWrapperRef}
      className="relative w-[320px] h-[460px] origin-center"
      style={{ transformStyle: "preserve-3d" }}
    >
      <div
        ref={containerRef}
        id="card-stack"
        className="absolute inset-0 w-full h-full"
        style={{ transformStyle: "preserve-3d" }}
      >
        {CARDS_DATA.map((card) => (
          <div
            key={card.id}
            className="dsv-card absolute top-1/2 left-1/2 p-px rounded-[2rem] shadow-xl"
            style={{
              width: card.type === "engine" ? "300px" : card.type === "throughput" || card.type === "efficiency" ? "240px" : "220px",
              height: card.type === "engine" ? "450px" : card.type === "throughput" || card.type === "efficiency" ? "380px" : "340px",
              marginLeft: card.type === "engine" ? "-150px" : card.type === "throughput" || card.type === "efficiency" ? "-120px" : "-110px",
              marginTop: card.type === "engine" ? "-225px" : card.type === "throughput" || card.type === "efficiency" ? "-190px" : "-170px",
              background:
                card.type === "engine"
                  ? "linear-gradient(to bottom, rgba(96,165,250,0.4), transparent, rgba(168,85,247,0.2))"
                  : card.type === "throughput"
                  ? "linear-gradient(to bottom right, rgba(232,121,249,0.5), rgba(217,70,239,0.1))"
                  : card.type === "efficiency"
                  ? "linear-gradient(to bottom right, rgba(45,212,191,0.4), rgba(16,185,129,0.1))"
                  : "linear-gradient(to bottom right, rgba(203,213,225,0.5), rgba(203,213,225,0.1))",
              zIndex: card.type === "engine" ? 10 : card.type === "throughput" || card.type === "efficiency" ? 2 : 1,
              opacity: 0,
              transformStyle: "preserve-3d",
            }}
            data-x={card.x}
            data-y={card.y}
            data-z={card.z}
            data-rot={card.rot}
          >
            {card.type === "throughput" && <ThroughputCard />}
            {card.type === "engine" && <CoreEngineCard />}
            {card.type === "efficiency" && (
              <div className="relative w-full h-full bg-white/95 backdrop-blur-xl rounded-[2.5rem] p-6 flex flex-col justify-between border border-white/50 shadow-inner">
                <div className="flex justify-end w-full mb-2">
                  <div className="flex gap-1">
                    <div className="w-1.5 h-1.5 rounded-full bg-slate-300" />
                    <div className="w-1.5 h-1.5 rounded-full bg-teal-400" />
                  </div>
                </div>
                <div>
                  <h3 className="text-2xl font-semibold tracking-tight mb-2 text-slate-800">Memory Store</h3>
                  <p className="text-xs leading-relaxed text-slate-500 font-medium">Vector storage and semantic retrieval for persistent agent intelligence.</p>
                </div>
                <div className="bg-slate-50 rounded-2xl border border-slate-100 p-4 mt-6 flex flex-col gap-4">
                  <div className="w-full flex items-center justify-between text-xs">
                    <div className="flex items-center h-1.5 w-2/3 bg-slate-200 rounded-full overflow-hidden">
                      <div className="h-full w-[78%] bg-teal-400 rounded-full" />
                    </div>
                    <span className="text-slate-700 font-medium ml-3">78%</span>
                  </div>
                  <div className="w-full flex items-center justify-between text-xs">
                    <div className="flex items-center h-1.5 w-1/2 bg-slate-200 rounded-full overflow-hidden">
                      <div className="h-full w-[42%] bg-slate-400 rounded-full" />
                    </div>
                    <span className="text-slate-700 font-medium ml-3">42%</span>
                  </div>
                </div>
                <div className="flex gap-2 mt-auto pt-6">
                  <div className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-center text-slate-400">
                    <Icon icon="solar:settings-linear" width={20} height={20} />
                  </div>
                  <button className="flex-1 bg-slate-900 hover:bg-slate-800 text-white text-xs font-medium py-2 rounded-xl transition-colors shadow-sm">
                    Retrieve
                  </button>
                </div>
              </div>
            )}
            {card.type === "flow" && (
              <div className="relative w-full h-full bg-white rounded-[2rem] p-5 overflow-hidden flex flex-col justify-between border border-white/40">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={card.bgImage}
                  alt="Abstract"
                  className="absolute inset-0 w-full h-full object-cover opacity-10 mix-blend-luminosity pointer-events-none"
                />
                <div className="relative z-10">
                  <Icon icon={card.icon!} className="text-indigo-500 mb-4" width={24} height={24} />
                  <h3 className="text-xl font-medium tracking-tight mb-2 text-slate-800">Agent Runtime</h3>
                  <p className="text-xs leading-relaxed text-slate-500 font-medium">Execution lifecycle management across globally distributed agent instances.</p>
                </div>
                <div className="relative z-10 h-20 w-full bg-slate-50/50 backdrop-blur-sm rounded-xl border border-slate-200/50 p-2 overflow-hidden">
                  <svg className="absolute inset-0 w-full h-full px-2 py-4 overflow-visible" viewBox="0 0 100 40" preserveAspectRatio="none">
                    <path
                      id="path-1"
                      d="M0,25 Q15,35 30,20 T60,25 T100,10"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      className="text-indigo-400"
                      style={{ strokeDasharray: 200, strokeDashoffset: 200 }}
                    />
                    <circle cx="30" cy="20" r="2" fill="currentColor" className="text-indigo-500 dot-anim" />
                    <circle cx="60" cy="25" r="2" fill="currentColor" className="text-indigo-500 dot-anim" />
                  </svg>
                </div>
              </div>
            )}
            {card.type === "facility" && (
              <div className="relative w-full h-full bg-slate-100 rounded-[2rem] overflow-hidden flex flex-col justify-end p-5 border border-white/50">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={card.bgImage}
                  alt="Modern Architecture"
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent" />
                <div className="relative z-10 flex justify-end w-full mb-auto mt-2">
                  <div className="bg-white/20 backdrop-blur-md p-2 rounded-xl border border-white/20 text-white shadow-sm">
                    <Icon icon={card.icon!} width={20} height={20} />
                  </div>
                </div>
                <div className="relative z-10 pt-4">
                  <h4 className="text-white text-sm font-medium mb-1">Enterprise Node</h4>
                  <div className="flex items-center justify-between">
                    <div className="text-[10px] text-white/70 font-medium">Dedicated Cluster</div>
                    <div className="flex items-center gap-1.5 bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded-full border border-emerald-500/30 text-[10px]">
                      <div className="w-1 h-1 rounded-full bg-emerald-400" />
                      Active
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* <div className="absolute bottom-8 flex gap-2.5 opacity-0 z-20" id="dsv-bottom-dots">
        <div className="w-2 h-2 rounded-full bg-slate-800 border border-transparent shadow-sm" />
        <div className="w-2 h-2 rounded-full bg-slate-300" />
        <div className="w-2 h-2 rounded-full bg-slate-300" />
      </div> */}
    </div>
  );
}

// ─── Main Section Export ─────────────────────────────────────────────────────

export function DataSynchronySection() {
  return (
    <section
      className="relative w-full text-slate-800 antialiased selection:bg-[#f5d0fe] py-20 px-4 md:px-8"
    >
      <AnimationsManager />

      {/* Hero header */}
      <div
        className="text-center w-full max-w-2xl mx-auto mb-16 z-10 opacity-0 flex flex-col items-center"
        id="dsv-hero-header"
      >
        <div className="inline-flex items-center gap-1.5 px-3 py-1 mb-4 rounded-full bg-white/60 border border-slate-200/50 backdrop-blur-md">
          <div className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
          <span className="text-xs font-medium text-slate-600">Runtime Architecture</span>
        </div>
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight text-slate-900 mb-4 drop-shadow-sm">
          Platform Infrastructure
        </h1>
        <p className="text-sm text-slate-600 font-medium max-w-md mx-auto leading-relaxed">
          Five interconnected runtime layers powering autonomous AI execution, orchestration, memory, and enterprise deployment.
        </p>
      </div>

      {/* Card stack */}
      <div
        className="w-full flex items-center justify-center"
        style={{ perspective: "1500px", transformStyle: "preserve-3d" }}
      >
        <CardStack />
      </div>

    </section>
  );
}
