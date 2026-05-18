"use client";

import React, { useRef } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { ArrowRight, LucideIcon } from "lucide-react";
import { FadeUp, FadeIn, Stagger, ScrollReveal } from "@/components/animations";
import { cn } from "@/lib/utils";

// --- Base Components ---

export const SectionLabel = ({ children, className }: { children: React.ReactNode; className?: string }) => (
  <FadeIn>
    <div className={cn("inline-flex items-center gap-2 rounded-full border border-border/50 bg-white/60 px-3 py-1 backdrop-blur-md shadow-sm shadow-black/5", className)}>
      <span className="h-1.5 w-1.5 rounded-full bg-accent" />
      <span className="text-xs font-medium tracking-wide text-accent/90">{children}</span>
    </div>
  </FadeIn>
);

export const Section = ({ children, className, id }: { children: React.ReactNode; className?: string; id?: string }) => (
  <section id={id} className={cn("relative py-16 sm:py-24 overflow-hidden flex flex-col items-center justify-center text-center w-full", className)}>
    <div className="relative mx-auto max-w-7xl px-4 md:px-8 lg:px-12 w-full flex flex-col items-center">
      {children}
    </div>
  </section>
);

// --- Hero Section ---

interface HeroProps {
  badge: string;
  title: React.ReactNode;
  description: string;
}

export const HeroSection = ({ badge, title, description }: HeroProps) => (
  <Section className="pt-24 md:pt-32 pb-16">
    <SectionLabel className="mb-8">{badge}</SectionLabel>
    <div className="max-w-4xl mx-auto">
      <FadeUp delay={0.06}>
        <h1 className="text-[2.6rem] sm:text-5xl md:text-6xl lg:text-[4.5rem] font-semibold tracking-tight text-text-primary leading-[1.07]">
          {title}
        </h1>
      </FadeUp>
      <FadeUp delay={0.12}>
        <p className="mt-7 text-base md:text-lg font-light leading-relaxed text-text-secondary max-w-2xl mx-auto">
          {description}
        </p>
      </FadeUp>
      <FadeUp delay={0.18}>
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
            className="inline-flex items-center gap-2 rounded-full border border-border-strong/50 bg-white px-8 py-4 text-sm font-medium text-text-primary transition-all hover:bg-slate-50 cursor-pointer"
          >
            Book a Demo
          </Link>
        </div>
      </FadeUp>
    </div>
  </Section>
);

// --- Stats Bar ---

interface Stat {
  value: string;
  label: string;
  sub: string;
}

export const StatsSection = ({ stats }: { stats: Stat[] }) => (
  <section className="border-y border-border-strong/40 py-14 w-full">
    <div className="mx-auto max-w-7xl px-4 md:px-8 lg:px-12">
      <div className="grid grid-cols-2 gap-y-10 lg:grid-cols-4">
        {stats.map((stat, i) => (
          <FadeUp key={i} delay={i * 0.07}>
            <div className={cn(
              "px-6 lg:px-10 text-center",
              i > 0 && "lg:border-l lg:border-border-strong/30"
            )}>
              <div className="text-4xl sm:text-5xl md:text-[3.5rem] font-semibold tracking-tight bg-linear-to-br from-accent via-[#c026d3] to-accent-soft bg-clip-text text-transparent leading-none mb-2">
                {stat.value}
              </div>
              <div className="text-sm font-semibold text-text-primary mb-1">{stat.label}</div>
              <div className="text-xs text-text-secondary font-light hidden sm:block">{stat.sub}</div>
            </div>
          </FadeUp>
        ))}
      </div>
    </div>
  </section>
);

// --- Mission Section ---

export const MissionSection = ({ badge, title, description, items }: { 
  badge: string; 
  title: React.ReactNode; 
  description: string;
  items: { label: string; Icon: LucideIcon }[];
}) => (
  <Section className="border-t border-zinc-100">
    <SectionLabel className="mb-8">{badge}</SectionLabel>
    <div className="max-w-4xl mx-auto">
      <FadeUp>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-text-primary leading-[1.1] mb-8">
          {title}
        </h2>
      </FadeUp>
      <FadeUp delay={0.1}>
        <p className="text-base md:text-lg font-light leading-relaxed text-text-secondary max-w-3xl mx-auto mb-10">
          {description}
        </p>
      </FadeUp>
      <FadeUp delay={0.15}>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {items.map(({ label, Icon }, i) => (
            <div key={i} className="flex flex-col items-center gap-2.5 rounded-2xl border border-border-strong/40 bg-white/50 p-4">
              <Icon className="w-5 h-5 text-accent" />
              <span className="text-sm font-medium text-text-primary">{label}</span>
            </div>
          ))}
        </div>
      </FadeUp>
    </div>
  </Section>
);

// --- Journey Section (Timeline) ---

interface TimelineItem {
  year: string;
  category: string;
  title: string;
  desc: string;
}

export const JourneySection = ({ badge, title, items }: { badge: string; title: React.ReactNode; items: TimelineItem[] }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <Section id="journey" className="border-t border-zinc-100">
      <SectionLabel className="mb-8">{badge}</SectionLabel>
      <FadeUp className="mb-16">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-text-primary leading-[1.1]">
          {title}
        </h2>
      </FadeUp>

      <div ref={containerRef} className="relative w-full max-w-6xl mx-auto mt-8 pb-12 overflow-visible">
        {/* Progress Bar Background */}
        <div className="absolute top-1/2 left-0 w-full h-0.5 bg-border/30 -translate-y-1/2 rounded-full" />
        
        {/* Animated Progress Bar */}
        <motion.div 
          className="absolute top-1/2 left-0 h-0.5 bg-accent -translate-y-1/2 rounded-full origin-left z-10"
          style={{ scaleX }}
        />

        <div className="relative grid grid-cols-6 gap-4 min-w-[900px]">
          {items.map((item, i) => (
            <TimelinePoint key={i} item={item} index={i} total={items.length} scrollYProgress={scrollYProgress} />
          ))}
        </div>
      </div>
    </Section>
  );
};

const TimelinePoint = ({ item, index, total, scrollYProgress }: { item: TimelineItem; index: number; total: number; scrollYProgress: any }) => {
  const threshold = index / total;
  const opacity = useTransform(scrollYProgress, [threshold - 0.1, threshold, threshold + 0.1], [0.3, 1, 1]);
  const scale = useTransform(scrollYProgress, [threshold - 0.1, threshold, threshold + 0.1], [0.8, 1.1, 1]);
  const y = index % 2 === 0 ? -120 : 120;

  return (
    <div className="relative flex flex-col items-center">
      {/* Content Card */}
      <motion.div 
        style={{ opacity, scale }}
        className={cn(
          "absolute w-48 text-center",
          index % 2 === 0 ? "bottom-12" : "top-12"
        )}
      >
        <div className="space-y-2 p-4 rounded-xl hover:bg-white/5 transition-colors">
          <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-widest text-accent">
            <span className="w-1.5 h-1.5 rounded-full bg-accent inline-block" />
            {item.category}
          </span>
          <h4 className="text-sm font-semibold text-text-primary leading-snug">{item.title}</h4>
          <p className="text-xs font-light text-text-secondary leading-relaxed">{item.desc}</p>
        </div>
      </motion.div>

      {/* Dot on line */}
      <div className="relative z-20 flex flex-col items-center justify-center h-20">
        <motion.div 
          style={{ scale }}
          className={cn(
            "w-4 h-4 rounded-full border-2 border-accent bg-white shadow-md transition-colors",
            // We can add a class based on scroll progress if we want to change color
          )}
        />
        <span className="text-[11px] font-semibold text-text-secondary mt-2 tabular-nums">
          {item.year}
        </span>
      </div>
    </div>
  );
};

// --- Values Section ---

export const ValuesSection = ({ badge, title, items }: { badge: string; title: React.ReactNode; items: any[] }) => (
  <Section className="border-t border-zinc-100">
    <SectionLabel className="mb-8">{badge}</SectionLabel>
    <FadeUp className="mb-12">
      <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-text-primary leading-[1.1]">
        {title}
      </h2>
    </FadeUp>
    <ScrollReveal>
      <Stagger staggerDelay={0.08} className="grid grid-cols-1 sm:grid-cols-2 gap-5 w-full max-w-4xl mx-auto">
        {items.map(({ Icon, title, desc }, i) => (
          <div
            key={i}
            className="rounded-2xl border border-border-strong/40 bg-white/50 p-6 transition-all hover:border-accent/20 hover:bg-white text-center flex flex-col items-center"
          >
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-accent/10 border border-accent/15">
              <Icon className="w-6 h-6 text-accent" />
            </div>
            <h3 className="text-base font-semibold text-text-primary mb-2">{title}</h3>
            <p className="text-sm font-light leading-relaxed text-text-secondary">{desc}</p>
          </div>
        ))}
      </Stagger>
    </ScrollReveal>
  </Section>
);

// --- Company Details Section ---

export const CompanyDetailsSection = ({ badge, items }: { badge: string; items: any[] }) => (
  <Section className="border-t border-zinc-100">
    <SectionLabel className="mb-12">{badge}</SectionLabel>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-5xl mx-auto">
      {items.map(({ Icon, label, value, sub }, i) => (
        <FadeUp key={i} delay={i * 0.08}>
          <div className="rounded-2xl border border-border-strong/40 bg-white/50 p-8 flex flex-col items-center justify-center min-h-[220px] h-full">
            <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-slate-50 border border-border-strong/40">
              <Icon className="w-5 h-5 text-accent" />
            </div>
            <div className="text-[10px] font-bold uppercase tracking-widest text-text-secondary/60 mb-2">
              {label}
            </div>
            <div className="text-sm font-semibold text-text-primary leading-snug mb-1 text-center">{value}</div>
            <div className="text-xs font-light text-text-secondary text-center">{sub}</div>
          </div>
        </FadeUp>
      ))}
    </div>
  </Section>
);

// --- Hiring Section ---

export const HiringSection = ({ title, description, items }: { title: React.ReactNode; description: string; items: any[] }) => (
  <Section className="border-t border-zinc-100">
    <div className="max-w-4xl mx-auto flex flex-col items-center">
      <FadeUp>
        <div className="space-y-6 flex flex-col items-center">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-accent/20 bg-accent/5 px-4 py-1.5 text-xs font-semibold text-accent">
            <span className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse" />
            Actively Hiring
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-text-primary leading-[1.1]">
            {title}
          </h2>
          <p className="text-base font-light leading-relaxed text-text-secondary max-w-xl mx-auto">
            {description}
          </p>
          <div className="pt-4">
            <Link
              href="/careers"
              className="inline-flex items-center gap-2 rounded-full bg-(--color-button-primary-bg) px-8 py-4 text-sm font-medium text-white transition-all hover:bg-(--color-button-primary-hover) cursor-pointer"
            >
              See Open Roles
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </FadeUp>

      <FadeUp delay={0.2} className="mt-16 w-full max-w-2xl">
        <div className="relative rounded-3xl border border-border-strong/40 bg-white/50 p-8 overflow-hidden">
          <div className="relative grid grid-cols-2 gap-4">
            {items.map((item, i) => (
              <div key={i} className="rounded-xl border border-border-strong/40 bg-white p-4 text-center">
                <div className="text-[10px] font-bold uppercase tracking-widest text-accent/70 mb-1">
                  {item.dept}
                </div>
                <div className="text-sm font-semibold text-text-primary">{item.role}</div>
              </div>
            ))}
          </div>
        </div>
      </FadeUp>
    </div>
  </Section>
);
