"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Icon } from "@iconify/react";
import { cn } from "@/lib/utils";
import { SectionWrapper, Container } from "@/components/layout";
import { GradientOrb, HeroBadge, GlassPanel } from "@/components/shared";
import { ScrollReveal } from "@/components/animations";
import { VALUES } from "./data";

export function ValuesSection() {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <SectionWrapper spacing="lg" background="transparent" className="overflow-visible">
      <GradientOrb
        color="blue"
        size="xl"
        className="absolute bottom-0 left-1/2 -translate-x-1/2 opacity-[0.06] pointer-events-none"
      />

      <Container size="lg" className="relative z-10">
        {/* Heading */}
        <div className="mb-16 flex flex-col items-center text-center">
          <ScrollReveal direction="up" delay={0.05}>
            <HeroBadge text="How we operate" />
          </ScrollReveal>
          <ScrollReveal direction="up" delay={0.1}>
            <h2 className="text-3xl font-extrabold tracking-tight text-[var(--color-text-primary)] md:text-4xl lg:text-5xl font-display">
              Our{" "}
              <span className="bg-linear-to-br from-accent via-[#c026d3] to-accent-soft bg-clip-text text-transparent">
                Values
              </span>
            </h2>
          </ScrollReveal>
          <ScrollReveal direction="up" delay={0.15}>
            <p className="mt-4 max-w-xl text-base font-light text-[var(--color-text-secondary)]">
              Principles that drive every product decision, engineering choice, and team interaction at Zaby.
            </p>
          </ScrollReveal>
        </div>

        {/* Tab Switcher */}
        <ScrollReveal direction="up" delay={0.2}>
          <div className="flex flex-wrap justify-center gap-2 mb-12">
            {VALUES.map((v, i) => (
              <button
                key={v.key}
                onClick={() => setActiveTab(i)}
                className={cn(
                  "px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 border cursor-pointer",
                  activeTab === i
                    ? "bg-(--color-button-primary-bg) text-white border-transparent shadow-[rgba(76,29,149,0.4)_0px_6px_20px_-6px]"
                    : "bg-white/60 text-[var(--color-text-secondary)] border-[var(--color-border-strong)]/30 backdrop-blur-md hover:bg-white/80 hover:text-[var(--color-text-primary)]"
                )}
              >
                {v.label}
              </button>
            ))}
          </div>
        </ScrollReveal>

        {/* Tab Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center"
          >
            {/* Text side */}
            <div className="flex flex-col gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/80 backdrop-blur-md border border-[var(--color-border-strong)]/30 text-[var(--color-accent)] shadow-sm shadow-black/5">
                <Icon icon={VALUES[activeTab].icon} width={28} height={28} />
              </div>
              <h3 className="text-2xl font-semibold text-[var(--color-text-primary)]">
                {VALUES[activeTab].label}
              </h3>
              <p className="text-base font-light text-[var(--color-text-secondary)] leading-relaxed">
                {VALUES[activeTab].description}
              </p>
            </div>

            {/* Visual side */}
            <GlassPanel
              padding="none"
              className="relative h-64 lg:h-80 rounded-3xl overflow-hidden flex items-center justify-center"
            >
              {/* Subtle dot grid */}
              <div
                className="absolute inset-0 opacity-[0.06]"
                style={{
                  backgroundImage:
                    "radial-gradient(circle, var(--color-text-secondary) 1px, transparent 1px)",
                  backgroundSize: "28px 28px",
                }}
              />
              <div className="relative flex flex-col items-center gap-3">
                <div className="flex h-20 w-20 items-center justify-center rounded-3xl bg-white/80 backdrop-blur-md border border-[var(--color-border-strong)]/30 text-[var(--color-accent)] shadow-md shadow-[var(--color-accent)]/10">
                  <Icon icon={VALUES[activeTab].icon} width={40} height={40} />
                </div>
                <p className="text-sm font-medium text-[var(--color-text-secondary)] text-center max-w-xs px-8">
                  {VALUES[activeTab].label}
                </p>
              </div>
              {/* Corner orbs */}
              <div className="absolute top-4 left-4 h-8 w-8 rounded-full bg-[var(--color-accent)]/15 blur-md" />
              <div className="absolute bottom-4 right-4 h-12 w-12 rounded-full bg-[var(--color-accent-soft)]/15 blur-xl" />
            </GlassPanel>
          </motion.div>
        </AnimatePresence>
      </Container>
    </SectionWrapper>
  );
}
