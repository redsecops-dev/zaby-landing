"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ScrollReveal, Stagger } from "@/components/animations";
import { GRID_STUDIES, INDUSTRY_FILTERS } from "./data";
import type { CaseStudy, IndustryFilter } from "./types";
import Link from "next/link";

function CaseStudyCard({ study }: { study: CaseStudy }) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.3 }}
      className="group flex flex-col overflow-hidden rounded-2xl border border-white/60 bg-white/60 backdrop-blur-md shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
    >
      {/* Visual header with gradient */}
      <div
        className="relative h-44 overflow-hidden"
        style={{
          background: `linear-gradient(135deg, ${study.gradientFrom}, ${study.gradientTo})`,
        }}
      >
        {/* Dot pattern */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage:
              "radial-gradient(circle at 2px 2px, rgba(255,255,255,0.5) 1px, transparent 0)",
            backgroundSize: "22px 22px",
          }}
        />
        {/* Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-32 w-32 rounded-full bg-white/10 blur-2xl" />

        {/* Metric overlay strip at bottom */}
        <div className="absolute bottom-0 left-0 right-0 flex border-t border-white/15 bg-black/20 backdrop-blur-sm">
          {study.metrics.slice(0, 2).map((metric, i) => (
            <div
              key={i}
              className={`flex-1 px-4 py-2.5 ${i === 0 ? "border-r border-white/15" : ""}`}
            >
              <div className="text-lg font-bold text-white leading-none">{metric.value}</div>
              <div className="mt-0.5 text-xs text-white/70 leading-tight">{metric.label}</div>
            </div>
          ))}
        </div>

        {/* Company initial badge */}
        <div className="absolute top-4 right-4 flex h-10 w-10 items-center justify-center rounded-xl bg-white/15 border border-white/20 backdrop-blur-sm">
          <span className="text-base font-bold text-white">{study.company.charAt(0)}</span>
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col p-5">
        {/* Tags */}
        <div className="mb-3 flex flex-wrap gap-2">
          <span className="inline-flex items-center gap-1 rounded-full border border-border/50 bg-white/60 px-2.5 py-0.5 text-xs font-medium text-muted-foreground">
            <span
              className="h-1.5 w-1.5 rounded-full"
              style={{ background: study.gradientFrom }}
            />
            {study.industry}
          </span>
          <span className="rounded-full border border-accent/20 bg-accent/5 px-2.5 py-0.5 text-xs font-medium text-accent/80">
            {study.product}
          </span>
        </div>

        {/* Headline */}
        <h3 className="text-sm font-semibold leading-snug text-foreground group-hover:text-accent transition-colors line-clamp-3 sm:text-base">
          {study.headline}
        </h3>

        {/* Read more */}
        <div className="mt-auto pt-5">
          <Link
            href={`/case-studies/${study.slug}`}
            className="cursor-pointer inline-flex items-center gap-1.5 text-xs font-medium text-accent/80 hover:text-accent transition-colors group/link"
          >
            Read case study
            <svg
              className="h-3.5 w-3.5 translate-x-0 transition-transform group-hover/link:translate-x-0.5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2.5}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </div>
    </motion.div>
  );
}

export function CaseStudiesGridSection() {
  const [activeFilter, setActiveFilter] = useState<IndustryFilter>("All");

  const filtered =
    activeFilter === "All"
      ? GRID_STUDIES
      : GRID_STUDIES.filter((s) => s.industry === activeFilter);

  return (
    <section className="relative py-20 md:py-28">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <ScrollReveal>
          <div className="mb-12 text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-border/50 bg-white/60 px-3 py-1 backdrop-blur-md text-xs font-medium tracking-wide text-accent/90 uppercase">
              All Case Studies
            </span>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Browse every{" "}
              <span className="bg-linear-to-br from-accent via-[#c026d3] to-accent-soft bg-clip-text text-transparent">
                success story
              </span>
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-sm text-muted-foreground sm:text-base">
              From enterprise operations to customer experience — explore how organisations
              deploy Zaby to transform their workflows.
            </p>
          </div>
        </ScrollReveal>

        {/* Filter pills */}
        <ScrollReveal delay={0.05}>
          <div className="mb-10 flex flex-wrap justify-center gap-2">
            {INDUSTRY_FILTERS.map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter as IndustryFilter)}
                className={`cursor-pointer rounded-full border px-4 py-1.5 text-xs font-medium transition-all duration-200 ${
                  activeFilter === filter
                    ? "bg-(--color-button-primary-bg) border-transparent text-white shadow-[rgba(76,29,149,0.35)_0px_6px_20px_-6px]"
                    : "border-border/50 bg-white/60 text-muted-foreground hover:border-accent/40 hover:text-foreground backdrop-blur-md"
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </ScrollReveal>

        {/* Grid */}
        <Stagger staggerDelay={0.05}>
          <AnimatePresence mode="popLayout">
            <motion.div
              layout
              className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
            >
              {filtered.map((study) => (
                <CaseStudyCard key={study.id} study={study} />
              ))}
            </motion.div>
          </AnimatePresence>
        </Stagger>

        {/* Empty state */}
        {filtered.length === 0 && (
          <div className="py-20 text-center text-muted-foreground">
            No case studies found for this filter.
          </div>
        )}
      </div>
    </section>
  );
}
