"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Icon } from "@iconify/react";
import { cn } from "@/lib/utils";
import { JOB_OPENINGS, DEPARTMENTS } from "./data";
import { JobCard } from "./JobCard";

export function OpenPositionsSection() {
  const [activeDept, setActiveDept] = useState<string>("All");

  const filteredJobs =
    activeDept === "All"
      ? JOB_OPENINGS
      : JOB_OPENINGS.filter((j) => j.department === activeDept);

  return (
    <section
      id="open-positions"
      className="relative py-24 md:py-32 bg-white/30 backdrop-blur-sm scroll-mt-20"
    >
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="mb-12 flex flex-col items-center text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-border/50 bg-white/60 px-3 py-1 backdrop-blur-md">
            <Icon icon="solar:briefcase-bold-duotone" width={12} height={12} className="text-accent" />
            <span className="text-xs font-medium tracking-wide text-accent/90">
              Now hiring
            </span>
          </div>
          <h2 className="text-3xl font-semibold tracking-tight text-text-primary md:text-4xl">
            Open{" "}
            <span className="bg-linear-to-br from-accent via-[#c026d3] to-accent-soft bg-clip-text text-transparent">
              Positions
            </span>
          </h2>
          <p className="mt-4 max-w-xl text-base font-light text-text-secondary">
            All roles are fully remote. We hire based on impact, ownership, and technical depth.
          </p>
        </div>

        {/* Department Filter */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {DEPARTMENTS.map((dept) => (
            <button
              key={dept}
              onClick={() => setActiveDept(dept)}
              className={cn(
                "px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200 border",
                activeDept === dept
                  ? "bg-(--color-button-primary-bg) text-white border-transparent shadow-[rgba(76,29,149,0.4)_0px_6px_20px_-6px]"
                  : "bg-white/60 text-text-secondary border-white/60 backdrop-blur-md hover:bg-white/80 hover:text-text-primary"
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
          <div className="text-center py-16 text-text-secondary">
            No open positions in this department right now.
          </div>
        )}

        {/* Open application nudge */}
        <div className="mt-12 text-center">
          <p className="text-sm text-text-secondary mb-4">
            Don&apos;t see a role that fits? We&apos;re always open to exceptional people.
          </p>
          <Link
            href="mailto:careers@zaby.ai?subject=Open Application"
            className="inline-flex items-center gap-2 text-sm font-medium text-accent hover:text-accent-hover transition-colors duration-200"
          >
            Send an open application
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
