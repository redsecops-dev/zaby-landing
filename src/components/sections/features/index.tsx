"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { ArrowRight } from "lucide-react";
import { PreviewModal } from "@/components/shared/PreviewModal";
import { Icon } from "@iconify/react";
import { useScrollTriggerAnimation } from "@/lib/gsap-utils";
import { OrbitingCirclesDemo } from "@/components/modals/components/OrbitingCirclesDemo";
import { FeatureCard } from "./FeatureCard";
import { MemoryOrbital } from "./MemoryOrbital";
import { WorkflowDiagram } from "./WorkflowDiagram";

const CARD_HASH_MAP: Record<number, string> = {
  1: "agent-squad",
  4: "ai-infra",
  7: "ai-memory",
  8: "agentic-workflow",
  9: "conversational-ai",
};

const HASH_CARD_MAP: Record<string, number> = {
  "agent-squad": 1,
  "ai-infra": 4,
  "ai-memory": 7,
  "agentic-workflow": 8,
  "conversational-ai": 9,
};

export function FeaturesSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [selectedCard, setSelectedCard] = useState<number | null>(null);

  // Handle hash changes from URL
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.slice(1);
      if (hash && HASH_CARD_MAP[hash]) {
        setSelectedCard(HASH_CARD_MAP[hash]);
      }
    };

    handleHashChange();
    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  // Update URL when card is selected
  const handleCardClick = (cardNumber: number) => {
    setSelectedCard(cardNumber);
    const hash = CARD_HASH_MAP[cardNumber];
    if (hash) {
      window.history.pushState(null, "", `#${hash}`);
    }
  };

  // Handle modal close and restore previous URL
  const handleCloseModal = () => {
    setSelectedCard(null);
    window.history.pushState(null, "", window.location.pathname);
  };

  useScrollTriggerAnimation(sectionRef, { isModal: false });

  return (
    <section
      ref={sectionRef}
      className="min-h-screen flex items-center justify-center p-4 md:p-8 lg:p-12 text-slate-900"
    >
      <main className="w-full max-w-7xl bg-white/40 backdrop-blur-3xl rounded-2xl border border-white/60 shadow-md p-4 md:p-6 lg:p-8">
        <div className="grid grid-cols-12 gap-4 lg:gap-5">

          {/* Card 1: UI Stack — col-span-3 row-span-2 */}
          <FeatureCard
            onClick={() => handleCardClick(1)}
            className="col-span-12 lg:col-span-8 lg:row-span-2"
            innerClassName="flex-row items-stretch p-6"
          >
            <div className="flex-1 relative overflow-hidden h-full flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-8 relative z-20">
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded-full bg-slate-900" />
                    <span className="text-xs font-medium tracking-tight">Phantom Squad</span>
                  </div>
                </div>
                <div className="relative z-20 max-w-[85%] md:max-w-[56%] lg:max-w-[58%]">
                  <h2 className="reveal-text text-2xl font-medium tracking-tight leading-tight mb-2">
                    Deploy AI that executes, not just responds.
                  </h2>
                  <p className="reveal-text text-xs text-slate-500 mb-6 mt-2">
                    Autonomous agents operate continuously, completing real tasks across your entire business.
                    Integrate seamlessly with your workflows, automate complex processes, and scale operations with intelligent autonomy.<br/>
                    Experience 24/7 execution, adaptive learning, and reliable results—no manual intervention required.
                  </p>
                </div>
              </div>
            </div>

            {/* Central static cube */}
            <div className="pointer-events-none absolute left-10 -bottom-70 z-10 hidden -translate-x-1/2 -translate-y-1/2 transform md:flex">
              <div className="relative flex h-100 w-100 items-center justify-center">
                <div className="absolute inset-0 scale-150 rounded-full bg-blue-500/20 blur-[50px] mix-blend-screen" />
                <svg viewBox="0 0 100 100" className="h-full w-full drop-shadow-[0_0_25px_rgba(59,130,246,0.7)] transition-transform duration-1000 hover:scale-105" aria-hidden="true">
                  <defs>
                    <linearGradient id="feat-topFace" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#60a5fa" />
                      <stop offset="100%" stopColor="#2563eb" />
                    </linearGradient>
                    <linearGradient id="feat-leftFace" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#93c5fd" />
                      <stop offset="100%" stopColor="#3b82f6" />
                    </linearGradient>
                    <linearGradient id="feat-rightFace" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#60a5fa" />
                      <stop offset="100%" stopColor="#1d4ed8" />
                    </linearGradient>
                  </defs>
                  <polygon points="50,20 90,40 50,60 10,40" fill="url(#feat-topFace)" stroke="#93c5fd" strokeWidth="0.5" strokeLinejoin="round" />
                  <polygon points="10,40 50,60 50,90 10,70" fill="url(#feat-leftFace)" stroke="#bfdbfe" strokeWidth="0.5" strokeLinejoin="round" />
                  <polygon points="90,40 90,70 50,90 50,60" fill="url(#feat-rightFace)" stroke="#2563eb" strokeWidth="0.5" strokeLinejoin="round" />
                </svg>
              </div>
            </div>

            {/* Agent figure — right side */}
            <div className="pointer-events-none absolute inset-y-0 right-0 z-20 hidden w-[45%] items-end justify-center md:flex">
              <div className="relative h-[100%] w-full max-w-[450px] translate-x-4 translate-y-4 scale-115 transition-transform duration-500 group-hover:translate-y-0 group-hover:scale-[1.22]">
                <Image
                  src="/models/agent.png"
                  alt="Glowing agent figure"
                  fill
                  priority
                  sizes="(max-width: 768px) 100vw, 45vw"
                  className="object-contain object-center drop-shadow-[0_24px_40px_rgba(59,130,246,0.28)] h-full"
                />
              </div>
            </div>
          </FeatureCard>

          {/* Card 4: Agent Infra — col-span-4 row-span-2 */}
          <FeatureCard
            onClick={() => handleCardClick(4)}
            className="col-span-12 lg:col-span-4 lg:row-span-2"
            innerClassName="p-6 pb-4"
          >
            {/* Header: Agent Infra */}
            <div className="mb-5">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded-full bg-slate-900" />
                <span className="text-xs font-medium tracking-tight">Agent Infra</span>
              </div>
            </div>

            {/* Headline */}
            <div className="flex-1 flex flex-col justify-center">
              <h2 className="reveal-text text-2xl font-medium tracking-tight leading-tight text-slate-900 mb-2">
                Autonomous Teams. Real Impact.
              </h2>
              <p className="reveal-text text-xs text-slate-500 leading-relaxed mt-1">
                Deploy intelligent agents that plan, act, and deliver outcomes across your entire stack.
              </p>
            </div>

            {/* Stacked layers image */}
            <div className="relative my-4 flex h-48 w-full items-center justify-center overflow-visible">
              <div className="pointer-events-none absolute inset-0 flex items-center justify-center" aria-hidden>
                <div className="absolute h-[88%] w-[78%] rounded-[42%] bg-purple-500/[0.22] blur-[52px] transition-opacity duration-700 group-hover:bg-purple-500/[0.28]" />
                <div className="absolute h-[62%] w-[58%] translate-y-1 rounded-full bg-cyan-400/[0.14] blur-[40px] transition-opacity duration-700 group-hover:bg-cyan-400/[0.2]" />
                <div className="absolute h-[48%] w-[42%] -translate-y-2 rounded-full bg-fuchsia-400/[0.12] blur-[32px] transition-opacity duration-700 group-hover:bg-fuchsia-400/[0.18]" />
                <div className="absolute bottom-[8%] left-1/2 h-10 w-[65%] -translate-x-1/2 rounded-full bg-purple-400/[0.1] blur-2xl" />
              </div>
              <img
                src="/models/sandbox.png"
                alt="Holographic stacked glass layers"
                className="relative z-10 w-[70%] h-full object-contain drop-shadow-[0_8px_32px_rgba(168,85,247,0.18)]"
              />
            </div>

            {/* Feature badges */}
            {/* <div className="pt-2 border-t border-slate-100">
              <div className="flex flex-wrap gap-x-5 gap-y-2 pt-3">
                {[
                  { icon: "solar:server-square-cloud-bold-duotone", label: "Multi-Agent\nOrchestration" },
                  { icon: "solar:shield-check-bold-duotone", label: "Secure by\nDesign" },
                  { icon: "solar:buildings-bold-duotone", label: "Enterprise\nGrade" },
                  { icon: "solar:eye-bold-duotone", label: "Observability\nBuilt-in" },
                ].map((badge) => (
                  <div key={badge.label} className="flex items-center gap-1.5">
                    <div className="w-5 h-5 rounded-md bg-slate-50 border border-slate-200/60 flex items-center justify-center">
                      <Icon icon={badge.icon} className="text-xs text-slate-500" />
                    </div>
                    <span className="text-[9px] font-medium text-slate-500 leading-tight whitespace-pre-line">{badge.label}</span>
                  </div>
                ))}
              </div>
            </div> */}
          </FeatureCard>

          {/* Card 7: RENO Engine / AI Memory — col-span-3 */}
          <FeatureCard
            onClick={() => handleCardClick(7)}
            className="col-span-12 md:col-span-6 lg:col-span-3"
            innerClassName="p-5 pb-12"
          >
            {/* Header and Title Stack */}
            <div className="flex flex-col gap-4 w-full z-25">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded-full bg-slate-900" />
                <span className="text-xs font-medium tracking-tight">AI Memory</span>
              </div>
              <div className="text-left">
                <h2 className="reveal-text text-xl font-medium tracking-tight leading-tight text-slate-900 mb-1">
                  Unified Agent Memory
                </h2>
                <p className="reveal-text text-xs text-slate-500 leading-relaxed mt-1">
                  Multi-lane memory that keeps agents contextual and adaptive.
                </p>
              </div>
            </div>

            {/* Orbital Graphic */}
            <div className="flex-1 flex items-center justify-center my-2 overflow-visible z-10">
              <MemoryOrbital />
            </div>

            {/* Bottom Strip */}
            {/* <div className="absolute bottom-0 left-0 right-0 border-t border-slate-100 bg-slate-50/50 px-4 py-3 flex justify-between items-center z-20">
              <div className="flex items-center gap-1.5 overflow-hidden">
                <Icon icon="solar:magic-stick-3-bold-duotone" className="text-accent text-xs flex-shrink-0" />
                <span className="text-[8px] text-slate-400 uppercase tracking-widest font-bold truncate">Semantic memory sync</span>
              </div>
              <div className="flex items-center gap-0.5 text-[10px] font-semibold text-accent hover:text-accent-hover transition-colors flex-shrink-0">
                <span>Learn more</span>
                <ArrowRight size={10} className="text-accent" />
              </div>
            </div> */}
          </FeatureCard>

          {/* Card 8: Agentic Workflows — col-span-5 */}
          <FeatureCard
            onClick={() => handleCardClick(8)}
            className="col-span-12 lg:col-span-5"
            innerClassName="p-6 pb-0"
          >
            {/* Header: Agentic Workflows */}
            <div className="mb-5">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded-full bg-slate-900" />
                <span className="text-xs font-medium tracking-tight">Agentic Workflows</span>
              </div>
            </div>

            {/* Headline */}
            <div className="mb-4">
              <h2 className="reveal-text text-2xl font-medium tracking-tight leading-tight text-slate-900 mb-2">
                Agentic Workflows
              </h2>
              <p className="reveal-text text-xs text-slate-500 leading-relaxed mt-1">
                Stateful execution for real-world processes.
              </p>
            </div>

            {/* Workflow Diagram */}
            <div className="flex-1 relative min-h-[260px] mt-2">
              <WorkflowDiagram />
            </div>

            {/* Bottom Strip */}
            {/* <div className="mt-auto border-t border-slate-100 -mx-6 px-6 py-4 flex items-center justify-between bg-white/50 backdrop-blur-sm">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600">
                  <Icon icon="solar:bolt-bold-duotone" className="text-xl" />
                </div>
                <span className="text-xs font-medium text-slate-500">Multi-step. Autonomous. Reliable.</span>
              </div>
              <div className="flex items-center gap-1.5 text-xs font-bold text-indigo-600 hover:text-indigo-700 transition-colors">
                <span>Explore workflows</span>
                <ArrowRight size={14} />
              </div>
            </div> */}
          </FeatureCard>

          {/* Card 9: Conversational AI — col-span-4 */}
          <FeatureCard
            onClick={() => handleCardClick(9)}
            className="col-span-12 lg:col-span-4"
            innerClassName="p-6 pb-0 min-h-[350px]"
          >
            {/* Header */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-4 h-4 rounded-full bg-slate-900" />
                <span className="text-xs font-medium tracking-tight">Conversational AI</span>
              </div>
              <h2 className="reveal-text text-2xl font-medium tracking-tight leading-tight text-slate-900 mb-1">
                Conversational AI
              </h2>
              <p className="reveal-text text-xs text-slate-500 leading-relaxed font-normal">
                Understand. Respond. Act.
              </p>
            </div>

            {/* Orbiting Diagram */}
            <div className="flex-1 relative flex items-center justify-center w-full min-h-[270px] ">
              <div className="absolute inset-0 flex items-center justify-center scale-[1.0] sm:scale-[1.08] origin-center opacity-100 pointer-events-none">
                <OrbitingCirclesDemo />
              </div>
            </div>

            {/* Bottom Strip */}
            {/* <div className="mt-auto border-t border-slate-100 -mx-6 px-6 py-4 flex items-center justify-between bg-white/50 backdrop-blur-sm">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600">
                  <Icon icon="solar:chat-round-line-bold-duotone" className="text-xl" />
                </div>
                <span className="text-xs font-medium text-slate-500">AI conversations that drive real outcomes.</span>
              </div>
              <div className="flex items-center gap-1.5 text-xs font-bold text-indigo-600 hover:text-indigo-700 transition-colors">
                <span>Explore Conversational AI</span>
                <ArrowRight size={14} />
              </div>
            </div> */}
          </FeatureCard>

        </div>
      </main>

      <PreviewModal
        isOpen={selectedCard !== null}
        onClose={handleCloseModal}
        selectedCard={selectedCard}
      />
    </section>
  );
}
