"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { ArrowRight } from "lucide-react";
import { PreviewModal } from "@/components/shared/PreviewModal";
import { Icon } from "@iconify/react";
import { useScrollTriggerAnimation } from "@/lib/gsap-utils";
import { OrbitingCirclesDemo } from "@/components/modals/components/OrbitingCirclesDemo";
import { FeatureCard } from "./FeatureCard";
import { WorkflowDiagram } from "./WorkflowDiagram";
import { GlassPanel, GradientOrb, GridBackground } from "@/components/shared";

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
      className="min-h-screen flex items-center justify-center p-4 md:p-8 lg:p-12 text-[var(--color-text-primary)]"
    >
      <GlassPanel
        padding="lg"
        className="w-full max-w-7xl relative overflow-hidden"
      >
        {/* Ambient background effects */}
        {/* <GradientOrb color="purple" size="lg" className="absolute -top-40 -left-20 opacity-20 z-0" /> */}
        {/* <GridBackground variant="dots" opacity="light" className="z-0 opacity-10" /> */}

        <div className="grid grid-cols-12 gap-4 lg:gap-5 relative ">
          {/* Card 1: UI Stack — col-span-3 row-span-2 */}
          <FeatureCard
            onClick={() => handleCardClick(1)}
            className="col-span-12 lg:col-span-8 lg:row-span-2 overflow-hidden"
            innerClassName="flex-row items-stretch p-6 bg-transparent"
          >
            <div className="flex-1 relative overflow-hidden h-full flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-8 relative z-20">
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded-full bg-[var(--color-text-primary)]" />
                    <span className="text-xs font-medium tracking-tight text-[var(--color-text-primary)]">
                      Phantom Squad
                    </span>
                  </div>
                </div>
                <div className="relative z-20 max-w-[85%] md:max-w-[56%] lg:max-w-[58%]">
                  <h2 className="reveal-text text-2xl font-medium tracking-tight leading-tight mb-2 text-[var(--color-text-primary)]">
                    Deploy AI that executes, not just responds.
                  </h2>
                  <p className="reveal-text text-[0.8rem] text-[var(--color-text-secondary)] mb-6 mt-2">
                    Autonomous agents operate continuously, completing real
                    tasks across your entire business. Integrate seamlessly with
                    your workflows, automate complex processes, and scale
                    operations with intelligent autonomy.
                    <br />
                    Experience 24/7 execution, adaptive learning, and reliable
                    results—no manual intervention required.
                  </p>
                </div>
              </div>
            </div>

            {/* Central static cube */}
            <div className="pointer-events-none absolute left-10 -bottom-50 z-10 hidden -translate-x-1/2 -translate-y-1/2 transform md:flex">
              <div className="relative flex h-70 w-70 items-center justify-center">
                <div className="absolute inset-0 scale-150 rounded-full bg-blue-500/20 blur-[50px] mix-blend-screen" />
                <svg
                  viewBox="0 0 100 100"
                  className="h-full w-full drop-shadow-[0_0_25px_rgba(59,130,246,0.7)] transition-transform duration-1000 hover:scale-105"
                  aria-hidden="true"
                >
                  <defs>
                    <linearGradient
                      id="feat-topFace"
                      x1="0%"
                      y1="0%"
                      x2="100%"
                      y2="100%"
                    >
                      <stop offset="0%" stopColor="#60a5fa" />
                      <stop offset="100%" stopColor="#2563eb" />
                    </linearGradient>
                    <linearGradient
                      id="feat-leftFace"
                      x1="0%"
                      y1="0%"
                      x2="100%"
                      y2="100%"
                    >
                      <stop offset="0%" stopColor="#93c5fd" />
                      <stop offset="100%" stopColor="#3b82f6" />
                    </linearGradient>
                    <linearGradient
                      id="feat-rightFace"
                      x1="0%"
                      y1="0%"
                      x2="100%"
                      y2="100%"
                    >
                      <stop offset="0%" stopColor="#60a5fa" />
                      <stop offset="100%" stopColor="#1d4ed8" />
                    </linearGradient>
                  </defs>
                  <polygon
                    points="50,20 90,40 50,60 10,40"
                    fill="url(#feat-topFace)"
                    stroke="#93c5fd"
                    strokeWidth="0.5"
                    strokeLinejoin="round"
                  />
                  <polygon
                    points="10,40 50,60 50,90 10,70"
                    fill="url(#feat-leftFace)"
                    stroke="#bfdbfe"
                    strokeWidth="0.5"
                    strokeLinejoin="round"
                  />
                  <polygon
                    points="90,40 90,70 50,90 50,60"
                    fill="url(#feat-rightFace)"
                    stroke="#2563eb"
                    strokeWidth="0.5"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </div>

            {/* Agent figure — right side */}
            <div className="pointer-events-none absolute inset-y-0 right-0 z-20 hidden w-[45%] items-end justify-center md:flex">
              <div className="relative h-[85%] w-full max-w-[450px] translate-x-4 translate-y-4 scale-115 mb-5 transition-transform duration-500 group-hover:translate-y-0 group-hover:scale-[1.22]">
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
            innerClassName="p-6 pb-4 bg-transparent"
          >
            {/* Header: Agent Infra */}
            <div className="mb-5">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded-full bg-[var(--color-text-primary)]" />
                <span className="text-xs font-medium tracking-tight text-[var(--color-text-primary)]">
                  Agent Infra
                </span>
              </div>
            </div>

            {/* Headline */}
            <div className="flex-1 flex flex-col justify-center">
              <h2 className="reveal-text text-2xl font-medium tracking-tight leading-tight text-[var(--color-text-primary)] mb-2">
                Autonomous Teams. Real Impact.
              </h2>
              <p className="reveal-text text-[0.8rem] text-[var(--color-text-secondary)] leading-relaxed mt-1">
                Deploy intelligent agents that plan, act, and deliver outcomes
                across your entire stack.
              </p>
            </div>

            {/* Stacked layers image */}
            <div className="relative my-4 flex h-48 w-full items-center justify-center overflow-visible">
              <div
                className="pointer-events-none absolute inset-0 flex items-center justify-center"
                aria-hidden
              >
                <GradientOrb
                  color="purple"
                  size="md"
                  className="absolute h-[88%] w-[78%] opacity-20 blur-[52px] z-0"
                />
                <GradientOrb
                  color="blue"
                  size="sm"
                  className="absolute h-[62%] w-[58%] translate-y-1 opacity-15 blur-[40px] z-0"
                />
                <GradientOrb
                  color="pink"
                  size="sm"
                  className="absolute h-[48%] w-[42%] -translate-y-2 opacity-12 blur-[32px] z-0"
                />
                <div className="absolute bottom-[8%] left-1/2 h-10 w-[65%] -translate-x-1/2 rounded-full bg-purple-400/[0.1] blur-2xl z-0" />
              </div>
              <img
                src="/models/sandbox.png"
                alt="Holographic stacked glass layers"
                className="relative z-10 w-[70%] h-full object-contain drop-shadow-[0_8px_32px_rgba(168,85,247,0.18)]"
              />
            </div>
          </FeatureCard>

          {/* Card 7: RENO Engine / AI Memory — col-span-3 */}
          <FeatureCard
            onClick={() => handleCardClick(7)}
            className="col-span-12 md:col-span-6 lg:col-span-3"
            innerClassName="p-5 pb-12 bg-transparent"
          >
            {/* Header and Title Stack */}
            <div className="flex flex-col gap-4 w-full z-25">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded-full bg-[var(--color-text-primary)]" />
                <span className="text-xs font-medium tracking-tight text-[var(--color-text-primary)]">
                  AI Memory
                </span>
              </div>
              <div className="text-left">
                <h2 className="reveal-text text-xl font-medium tracking-tight leading-tight text-[var(--color-text-primary)] mb-1">
                  Unified Agent Memory
                </h2>
                <p className="reveal-text text-[0.8rem] text-[var(--color-text-secondary)] leading-relaxed mt-1">
                  Multi-lane memory that keeps agents contextual and adaptive.
                </p>
              </div>
            </div>

            {/* Orbital Graphic */}
            <div className="flex-1 flex items-center justify-center my-2 overflow-hidden z-10">
              <video
                src="/models/AiMemory.mp4"
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-auto max-w-[280px] mix-blend-multiply"
              />
            </div>
          </FeatureCard>

          {/* Card 8: Agentic Workflows — col-span-5 */}
          <FeatureCard
            onClick={() => handleCardClick(8)}
            className="col-span-12 lg:col-span-5"
            innerClassName="p-6 pb-0 bg-transparent"
          >
            {/* Header: Agentic Workflows */}
            <div className="mb-5">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded-full bg-[var(--color-text-primary)]" />
                <span className="text-xs font-medium tracking-tight text-[var(--color-text-primary)]">
                  Agentic Workflows
                </span>
              </div>
            </div>

            {/* Headline */}
            <div className="mb-4">
              <h2 className="reveal-text text-2xl font-medium tracking-tight leading-tight text-[var(--color-text-primary)] mb-2">
                Agentic Workflows
              </h2>
              <p className="reveal-text text-[0.8rem] text-[var(--color-text-secondary)] leading-relaxed mt-1">
                Stateful execution for real-world processes.
              </p>
            </div>

            {/* Workflow Diagram */}
            <div className="flex-1 relative min-h-[260px] mt-2">
              <WorkflowDiagram />
            </div>
          </FeatureCard>

          {/* Card 9: Conversational AI — col-span-4 */}
          <FeatureCard
            onClick={() => handleCardClick(9)}
            className="col-span-12 lg:col-span-4"
            innerClassName="p-6 pb-0 min-h-[350px] bg-transparent"
          >
            {/* Header */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-4 h-4 rounded-full bg-[var(--color-text-primary)]" />
                <span className="text-xs font-medium tracking-tight text-[var(--color-text-primary)]">
                  Conversational AI
                </span>
              </div>
              <h2 className="reveal-text text-2xl font-medium tracking-tight leading-tight text-[var(--color-text-primary)] mb-1">
                Conversational AI
              </h2>
              <p className="reveal-text text-[0.8rem] text-[var(--color-text-secondary)] leading-relaxed font-normal">
                Understand. Respond. Act.
              </p>
            </div>

            {/* Orbiting Diagram */}
            <div className="flex-1 relative flex items-center justify-center w-full min-h-[270px] ">
              <div className="absolute inset-0 flex items-center justify-center scale-[1.0] sm:scale-[1.08] origin-center opacity-100 pointer-events-none">
                <OrbitingCirclesDemo />
              </div>
            </div>
          </FeatureCard>
        </div>
      </GlassPanel>

      <PreviewModal
        isOpen={selectedCard !== null}
        onClose={handleCloseModal}
        selectedCard={selectedCard}
      />
    </section>
  );
}
