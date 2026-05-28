"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { SectionWrapper, Container } from "@/components/layout";
import { HeroBadge } from "@/components/shared";
import { ScrollReveal } from "@/components/animations";
import { JOB_OPENINGS, DEPARTMENTS } from "./data";
import { JobCard } from "./JobCard";

export function OpenPositionsSection() {
  const [activeDept, setActiveDept] = useState<string>("All");

  const filteredJobs =
    activeDept === "All"
      ? JOB_OPENINGS
      : JOB_OPENINGS.filter((j) => j.department === activeDept);

  return (
    <SectionWrapper
      spacing="lg"
      background="transparent"
      id="open-positions"
      className="scroll-mt-20 bg-white/30 backdrop-blur-sm"
    >
      <Container size="lg">
        {/* Heading */}
        <div className="mb-12 flex flex-col items-center text-center">
          <ScrollReveal direction="up" delay={0.05}>
            <HeroBadge text="Now hiring" />
          </ScrollReveal>
          <ScrollReveal direction="up" delay={0.1}>
            <h2 className="text-3xl font-extrabold tracking-tight text-[var(--color-text-primary)] md:text-4xl font-display">
              Open{" "}
              <span className="bg-linear-to-br from-accent via-[#c026d3] to-accent-soft bg-clip-text text-transparent">
                Positions
              </span>
            </h2>
          </ScrollReveal>
          <ScrollReveal direction="up" delay={0.15}>
            <p className="mt-4 max-w-xl text-base font-light text-[var(--color-text-secondary)]">
              All roles are fully remote. We hire based on impact, ownership, and technical depth.
            </p>
          </ScrollReveal>
        </div>

        {/* Department Filter */}
        <ScrollReveal direction="up" delay={0.2}>
          <div className="flex flex-wrap justify-center gap-2 mb-10">
            {DEPARTMENTS.map((dept) => (
              <button
                key={dept}
                onClick={() => setActiveDept(dept)}
                className={cn(
                  "px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200 border cursor-pointer",
                  activeDept === dept
                    ? "bg-(--color-button-primary-bg) text-white border-transparent shadow-[rgba(76,29,149,0.4)_0px_6px_20px_-6px]"
                    : "bg-white/60 text-[var(--color-text-secondary)] border-[var(--color-border-strong)]/30 backdrop-blur-md hover:bg-white/80 hover:text-[var(--color-text-primary)]"
                )}
              >
                {dept}
                {dept !== "All" && (
                  <span className="ml-1.5 text-xs opacity-60">
                    ({JOB_OPENINGS.filter((j) => j.department === dept).length})
                  </span>
                )}
              </button>
            ))}
          </div>
        </ScrollReveal>

        {/* Job List */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeDept}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="flex flex-col gap-3"
          >
            {filteredJobs.map((job) => (
              <JobCard key={job.id} job={job} />
            ))}
          </motion.div>
        </AnimatePresence>

        {filteredJobs.length === 0 && (
          <div className="text-center py-16 text-[var(--color-text-secondary)]">
            No open positions in this department right now.
          </div>
        )}

        {/* Open application nudge */}
        <div className="mt-12 text-center">
          <p className="text-sm text-[var(--color-text-secondary)] mb-4">
            Don&apos;t see a role that fits? We&apos;re always open to exceptional people.
          </p>
          <Link
            href="mailto:careers@zaby.ai?subject=Open Application"
            className="inline-flex items-center gap-2 text-sm font-medium text-[var(--color-accent)] hover:text-[var(--color-accent-hover)] transition-colors duration-200"
          >
            Send an open application
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </Container>
    </SectionWrapper>
  );
}
