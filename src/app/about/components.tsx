"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, LucideIcon } from "lucide-react";
import { SectionWrapper, Container } from "@/components/layout";
import { GlassPanel, GradientOrb, HeroBadge } from "@/components/shared";
import { ScrollReveal } from "@/components/animations";
import { cn } from "@/lib/utils";

// ─── Hero Section ────────────────────────────────────────────────────────────

interface HeroProps {
  badge: string;
  title: React.ReactNode;
  description: string;
}

export const HeroSection = ({ badge, title, description }: HeroProps) => (
  <SectionWrapper
    spacing="none"
    background="transparent"
    className="relative mt-20 sm:mt-30 flex items-center justify-center overflow-visible"
  >
    <GradientOrb
      color="purple"
      size="xl"
      className="absolute right-1/4 top-1/2 -translate-y-1/2 opacity-[0.08] pointer-events-none"
    />
    <GradientOrb
      color="pink"
      size="lg"
      className="absolute left-1/4 top-1/4 opacity-[0.06] pointer-events-none"
    />

    <Container size="lg" className="relative z-10 py-12 sm:py-20 flex flex-col items-center text-center">
    

      <ScrollReveal direction="up" delay={0.1}>
        <HeroBadge text={badge} />
      </ScrollReveal>

      <ScrollReveal direction="up" delay={0.15}>
        <h1 className="text-[2.6rem] sm:text-5xl md:text-6xl lg:text-[4.5rem] font-extrabold tracking-tight text-[var(--color-text-primary)] leading-[1.07] font-display max-w-4xl">
          {title}
        </h1>
      </ScrollReveal>

      <ScrollReveal direction="up" delay={0.2}>
        <p className="mt-7 text-base md:text-lg font-light leading-relaxed text-[var(--color-text-secondary)] max-w-2xl mx-auto">
          {description}
        </p>
      </ScrollReveal>

      <ScrollReveal direction="up" delay={0.25}>
        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <Link
            href="https://platform.zaby.io/tenant/signup"
            className="inline-flex items-center gap-2 rounded-full bg-(--color-button-primary-bg) px-8 py-4 text-sm font-medium text-white transition-all hover:bg-(--color-button-primary-hover) cursor-pointer"
          >
            Start Building
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 rounded-full border border-[var(--color-border-strong)]/50 bg-white px-8 py-4 text-sm font-medium text-[var(--color-text-primary)] transition-all hover:bg-slate-50 cursor-pointer"
          >
            Book a Demo
          </Link>
        </div>
      </ScrollReveal>
    </Container>
  </SectionWrapper>
);

// ─── Stats Bar ───────────────────────────────────────────────────────────────

interface Stat {
  value: string;
  label: string;
  sub: string;
}

export const StatsSection = ({ stats }: { stats: Stat[] }) => (
  <SectionWrapper spacing="none" background="transparent" className="border-y border-[var(--color-border-strong)]/40 py-14">
    <Container size="lg">
      <div className="grid grid-cols-2 gap-y-10 lg:grid-cols-4">
        {stats.map((stat, i) => (
          <ScrollReveal key={i} direction="up" delay={i * 0.07}>
            <div
              className={cn(
                "px-6 lg:px-10 text-center",
                i > 0 && "lg:border-l lg:border-[var(--color-border-strong)]/30"
              )}
            >
              <div className="text-4xl sm:text-5xl md:text-[3.5rem] font-semibold tracking-tight bg-linear-to-br from-accent via-[#c026d3] to-accent-soft bg-clip-text text-transparent leading-none mb-2">
                {stat.value}
              </div>
              <div className="text-sm font-semibold text-[var(--color-text-primary)] mb-1">
                {stat.label}
              </div>
              <div className="text-xs text-[var(--color-text-secondary)] font-light hidden sm:block">
                {stat.sub}
              </div>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </Container>
  </SectionWrapper>
);

// ─── Mission Section ─────────────────────────────────────────────────────────

export const MissionSection = ({
  badge,
  title,
  description,
  items,
}: {
  badge: string;
  title: React.ReactNode;
  description: string;
  items: { label: string; Icon: LucideIcon }[];
}) => (
  <SectionWrapper spacing="lg" background="transparent" className="border-t border-[var(--color-border-strong)]/20">
    <Container size="lg" className="flex flex-col items-center text-center">
      <ScrollReveal direction="up" delay={0.05}>
        <HeroBadge text={badge} />
      </ScrollReveal>

      <ScrollReveal direction="up" delay={0.1}>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-[var(--color-text-primary)] leading-[1.1] mb-8 font-display max-w-4xl">
          {title}
        </h2>
      </ScrollReveal>

      <ScrollReveal direction="up" delay={0.15}>
        <p className="text-base md:text-lg font-light leading-relaxed text-[var(--color-text-secondary)] max-w-3xl mx-auto mb-10">
          {description}
        </p>
      </ScrollReveal>

      <ScrollReveal direction="up" delay={0.2}>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 w-full max-w-3xl">
          {items.map(({ label, Icon }, i) => (
            <GlassPanel
              key={i}
              padding="md"
              className="flex flex-col items-center gap-2.5 rounded-2xl transition-all hover:border-[var(--color-accent)]/20 hover:shadow-sm"
            >
              <Icon className="w-5 h-5 text-[var(--color-accent)]" />
              <span className="text-sm font-medium text-[var(--color-text-primary)]">
                {label}
              </span>
            </GlassPanel>
          ))}
        </div>
      </ScrollReveal>
    </Container>
  </SectionWrapper>
);

// ─── Journey Section (Timeline) ──────────────────────────────────────────────

interface TimelineItem {
  year: string;
  category: string;
  title: string;
  desc: string;
}

export const JourneySection = ({
  badge,
  title,
  items,
}: {
  badge: string;
  title: React.ReactNode;
  items: TimelineItem[];
}) => (
  <SectionWrapper spacing="lg" background="transparent" className="border-t border-[var(--color-border-strong)]/20">
    <Container size="lg" className="flex flex-col items-center text-center">
      <ScrollReveal direction="up" delay={0.05}>
        <HeroBadge text={badge} />
      </ScrollReveal>

      <ScrollReveal direction="up" delay={0.1} className="mb-16">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-[var(--color-text-primary)] leading-[1.1] font-display">
          {title}
        </h2>
      </ScrollReveal>

      <div className="relative w-full max-w-6xl mx-auto mt-8 pb-12 overflow-x-auto">
        {/* Progress Bar Background */}
        <div className="absolute top-1/2 left-0 w-full h-0.5 bg-[var(--color-border-strong)]/30 -translate-y-1/2 rounded-full" />

        <div className="relative grid grid-cols-6 gap-4 min-w-[900px]">
          {items.map((item, i) => (
            <div key={i} className="relative flex flex-col items-center">
              {/* Content Card */}
              <div
                className={cn(
                  "absolute w-48 text-center",
                  i % 2 === 0 ? "bottom-12" : "top-12"
                )}
              >
                <div className="space-y-2 p-4 rounded-xl hover:bg-white/5 transition-colors">
                  <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-widest text-[var(--color-accent)]">
                    <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-accent)] inline-block" />
                    {item.category}
                  </span>
                  <h4 className="text-sm font-semibold text-[var(--color-text-primary)] leading-snug">
                    {item.title}
                  </h4>
                  <p className="text-xs font-light text-[var(--color-text-secondary)] leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>

              {/* Dot on line */}
              <div className="relative z-20 flex flex-col items-center justify-center h-20">
                <div className="w-4 h-4 rounded-full border-2 border-[var(--color-accent)] bg-white shadow-md" />
                <span className="text-[11px] font-semibold text-[var(--color-text-secondary)] mt-2 tabular-nums">
                  {item.year}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Container>
  </SectionWrapper>
);

// ─── Values Section ──────────────────────────────────────────────────────────

export const ValuesSection = ({
  badge,
  title,
  items,
}: {
  badge: string;
  title: React.ReactNode;
  items: { Icon: LucideIcon; title: string; desc: string }[];
}) => (
  <SectionWrapper spacing="lg" background="transparent" className="border-t border-[var(--color-border-strong)]/20">
    <Container size="lg" className="flex flex-col items-center text-center">
      <ScrollReveal direction="up" delay={0.05}>
        <HeroBadge text={badge} />
      </ScrollReveal>

      <ScrollReveal direction="up" delay={0.1} className="mb-12">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-[var(--color-text-primary)] leading-[1.1] font-display">
          {title}
        </h2>
      </ScrollReveal>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 w-full max-w-4xl mx-auto">
        {items.map(({ Icon, title, desc }, i) => (
          <ScrollReveal key={i} direction="up" delay={0.12 + i * 0.08}>
            <GlassPanel
              padding="lg"
              className="rounded-2xl transition-all hover:border-[var(--color-accent)]/20 hover:shadow-sm text-center flex flex-col items-center h-full"
            >
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-[var(--color-accent)]/10 border border-[var(--color-accent)]/15">
                <Icon className="w-6 h-6 text-[var(--color-accent)]" />
              </div>
              <h3 className="text-base font-semibold text-[var(--color-text-primary)] mb-2">
                {title}
              </h3>
              <p className="text-sm font-light leading-relaxed text-[var(--color-text-secondary)]">
                {desc}
              </p>
            </GlassPanel>
          </ScrollReveal>
        ))}
      </div>
    </Container>
  </SectionWrapper>
);

// ─── Company Details Section ─────────────────────────────────────────────────

export const CompanyDetailsSection = ({
  badge,
  items,
}: {
  badge: string;
  items: { Icon: LucideIcon; label: string; value: string; sub: string }[];
}) => (
  <SectionWrapper spacing="lg" background="transparent" className="border-t border-[var(--color-border-strong)]/20">
    <Container size="lg" className="flex flex-col items-center text-center">
      <ScrollReveal direction="up" delay={0.05}>
        <HeroBadge text={badge} />
      </ScrollReveal>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-5xl mx-auto mt-4">
        {items.map(({ Icon, label, value, sub }, i) => (
          <ScrollReveal key={i} direction="up" delay={0.1 + i * 0.08}>
            <GlassPanel
              padding="lg"
              className="rounded-2xl flex flex-col items-center justify-center min-h-[220px] h-full transition-all hover:border-[var(--color-accent)]/20 hover:shadow-sm"
            >
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-slate-50 border border-[var(--color-border-strong)]/40">
                <Icon className="w-5 h-5 text-[var(--color-accent)]" />
              </div>
              <div className="text-[10px] font-bold uppercase tracking-widest text-[var(--color-text-secondary)]/60 mb-2">
                {label}
              </div>
              <div className="text-sm font-semibold text-[var(--color-text-primary)] leading-snug mb-1 text-center">
                {value}
              </div>
              <div className="text-xs font-light text-[var(--color-text-secondary)] text-center">
                {sub}
              </div>
            </GlassPanel>
          </ScrollReveal>
        ))}
      </div>
    </Container>
  </SectionWrapper>
);

// ─── Hiring Section ──────────────────────────────────────────────────────────

export const HiringSection = ({
  title,
  description,
  items,
}: {
  title: React.ReactNode;
  description: string;
  items: { role: string; dept: string }[];
}) => (
  <SectionWrapper spacing="lg" background="transparent" className="border-t border-[var(--color-border-strong)]/20">
    <Container size="lg" className="flex flex-col items-center text-center">
      <ScrollReveal direction="up" delay={0.05}>
        <span className="inline-flex items-center gap-1.5 rounded-full border border-[var(--color-accent)]/20 bg-[var(--color-accent)]/5 px-4 py-1.5 text-xs font-semibold text-[var(--color-accent)] mb-5 md:mb-8">
          <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-accent)] animate-pulse" />
          Actively Hiring
        </span>
      </ScrollReveal>

      <ScrollReveal direction="up" delay={0.1}>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-[var(--color-text-primary)] leading-[1.1] font-display">
          {title}
        </h2>
      </ScrollReveal>

      <ScrollReveal direction="up" delay={0.15}>
        <p className="mt-6 text-base font-light leading-relaxed text-[var(--color-text-secondary)] max-w-xl mx-auto">
          {description}
        </p>
      </ScrollReveal>

      <ScrollReveal direction="up" delay={0.2}>
        <div className="pt-6">
          <Link
            href="/careers"
            className="inline-flex items-center gap-2 rounded-full bg-(--color-button-primary-bg) px-8 py-4 text-sm font-medium text-white transition-all hover:bg-(--color-button-primary-hover) cursor-pointer"
          >
            See Open Roles
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </ScrollReveal>

      <ScrollReveal direction="up" delay={0.25} className="mt-16 w-full max-w-2xl">
        <GlassPanel padding="lg" className="rounded-3xl overflow-hidden">
          <div className="relative grid grid-cols-2 gap-4">
            {items.map((item, i) => (
              <div
                key={i}
                className="rounded-xl border border-[var(--color-border-strong)]/40 bg-white p-4 text-center transition-all hover:border-[var(--color-accent)]/20 hover:shadow-sm"
              >
                <div className="text-[10px] font-bold uppercase tracking-widest text-[var(--color-accent)]/70 mb-1">
                  {item.dept}
                </div>
                <div className="text-sm font-semibold text-[var(--color-text-primary)]">
                  {item.role}
                </div>
              </div>
            ))}
          </div>
        </GlassPanel>
      </ScrollReveal>
    </Container>
  </SectionWrapper>
);
