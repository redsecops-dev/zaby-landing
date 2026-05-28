"use client";

import { Icon } from "@iconify/react";
import { SectionWrapper, Container } from "@/components/layout";
import { ScrollReveal } from "@/components/animations";
import { LIFE_AT_ZABY_CARDS } from "./data";

export function LifeAtZabySection() {
  return (
    <SectionWrapper
      spacing="lg"
      background="transparent"
      className="!bg-(--color-button-primary-bg) text-white overflow-visible"
    >
      {/* Subtle glow accents */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
        <div className="absolute top-0 left-1/4 h-96 w-96 rounded-full bg-[var(--color-accent)]/15 blur-3xl opacity-60" />
        <div className="absolute bottom-0 right-1/4 h-64 w-64 rounded-full bg-[var(--color-accent-soft)]/10 blur-3xl opacity-40" />
      </div>

      <Container size="lg" className="relative z-10">
        <div className="mb-16 text-center">
          <ScrollReveal direction="up" delay={0.05}>
            <h2 className="text-3xl font-extrabold tracking-tight text-white md:text-4xl lg:text-5xl font-display">
              Life at{" "}
              <span className="bg-linear-to-br from-accent via-[#e879f9] to-accent-soft bg-clip-text text-transparent">
                Zaby
              </span>
            </h2>
          </ScrollReveal>
          <ScrollReveal direction="up" delay={0.1}>
            <p className="mt-4 max-w-xl mx-auto text-base font-light text-white/60">
              We operate like the systems we build — with precision, continuity, and ownership.
            </p>
          </ScrollReveal>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-white/8 rounded-3xl overflow-hidden border border-white/10">
          {LIFE_AT_ZABY_CARDS.map((item, i) => (
            <ScrollReveal
              key={item.title}
              direction="up"
              delay={(i % 3) * 0.1}
            >
              <div className="flex flex-col gap-4 bg-(--color-button-primary-bg) p-8 hover:bg-white/5 transition-colors duration-300 h-full">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/8 border border-white/12 text-[var(--color-accent)]">
                  <Icon icon={item.icon} width={22} height={22} />
                </div>
                <h3 className="text-base font-semibold text-white">{item.title}</h3>
                <p className="text-sm font-light text-white/55 leading-relaxed">{item.desc}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </Container>
    </SectionWrapper>
  );
}
