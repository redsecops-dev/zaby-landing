"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { 
  ArrowLeft, 
  MapPin, 
  Clock, 
  CheckCircle2, 
  ChevronRight,
  Share2,
  Mail
} from "lucide-react";
import { Icon } from "@iconify/react";
import { cn } from "@/lib/utils";
import { FadeUp, FadeIn, Stagger } from "@/components/animations";
import { GradientOrb } from "@/components/shared/GradientOrb";
import type { JobOpening } from "@/components/sections/careers/types";

interface JobClientProps {
  job: JobOpening;
}

export default function JobClient({ job }: JobClientProps) {
  const mailtoLink = `mailto:careers@zaby.ai?subject=Application — ${job.title}`;

  return (
    <main className="relative min-h-screen antialiased bg-white overflow-hidden pt-24 md:pt-32 pb-24">
      {/* Background Orbs */}
      <GradientOrb color="purple" size="xl" className="absolute -top-32 -left-20 opacity-10 pointer-events-none" />
      <GradientOrb color="pink" size="lg" className="absolute top-1/4 -right-16 opacity-8 pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-4 md:px-8 lg:px-12">
        {/* Breadcrumbs Section */}
        <div className="mb-12">
          <FadeIn>
            <nav className="flex items-center gap-2 text-sm text-text-secondary mb-8">
              <Link
                href="/"
                className="group relative text-text-secondary hover:text-text-primary transition-all duration-300 cursor-pointer inline-flex items-center gap-1"
              >
                Home
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-accent to-accent-soft group-hover:w-full transition-all duration-300" />
              </Link>
              <span className="text-border-strong/40">/</span>
              <Link
                href="/careers"
                className="group relative text-text-secondary hover:text-text-primary transition-all duration-300 cursor-pointer inline-flex items-center gap-1"
              >
                Careers
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-accent to-accent-soft group-hover:w-full transition-all duration-300" />
              </Link>
              <span className="text-border-strong/40">/</span>
              <span className="text-text-secondary/60 line-clamp-1">{job.title}</span>
            </nav>
          </FadeIn>

          <div className="flex flex-col gap-6">
            <FadeUp delay={0.1}>
              <div className="inline-flex items-center gap-2 rounded-full border border-accent/20 bg-accent/5 px-3 py-1">
                <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                <span className="text-xs font-medium tracking-wide text-accent/90">{job.department}</span>
              </div>
            </FadeUp>

            <FadeUp delay={0.15}>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight text-text-primary leading-[1.1]">
                {job.title}
              </h1>
            </FadeUp>

            <FadeUp delay={0.2}>
              <div className="flex flex-wrap gap-6 items-center">
                <div className="flex items-center gap-2 text-text-secondary">
                  <MapPin className="w-4 h-4 text-accent" />
                  <span className="text-sm">{job.location}</span>
                </div>
                <div className="flex items-center gap-2 text-text-secondary">
                  <Clock className="w-4 h-4 text-accent" />
                  <span className="text-sm">{job.type}</span>
                </div>
              </div>
            </FadeUp>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-12 lg:gap-20 items-start">
          {/* Left Column: Job Details */}
          <div className="space-y-12">
            <FadeUp delay={0.25}>
              <div className="prose prose-slate max-w-none">
                <h2 className="text-2xl font-semibold text-text-primary mb-6">About the Role</h2>
                <p className="text-lg font-light leading-relaxed text-text-secondary">
                  {job.description}
                </p>
                {/* Additional mock about text if needed */}
                <p className="mt-4 text-lg font-light leading-relaxed text-text-secondary">
                  As part of the Zaby {job.department} team, you will be at the forefront of the autonomous enterprise revolution. We are building the critical infrastructure that allows AI agents to move beyond static interaction and into reliable, persistent execution within complex enterprise environments.
                </p>
              </div>
            </FadeUp>

            {job.responsibilities && (
              <FadeUp delay={0.3}>
                <div>
                  <h2 className="text-2xl font-semibold text-text-primary mb-6">Responsibilities</h2>
                  <Stagger staggerDelay={0.05} className="space-y-4">
                    {job.responsibilities.map((item, i) => (
                      <div key={i} className="flex gap-4 group">
                        <div className="mt-1.5 shrink-0">
                          <div className="w-5 h-5 rounded-full bg-accent/10 border border-accent/20 flex items-center justify-center">
                            <ChevronRight className="w-3 h-3 text-accent group-hover:translate-x-0.5 transition-transform" />
                          </div>
                        </div>
                        <p className="text-base font-light text-text-secondary leading-relaxed">{item}</p>
                      </div>
                    ))}
                  </Stagger>
                </div>
              </FadeUp>
            )}

            {job.requirements && (
              <FadeUp delay={0.35}>
                <div>
                  <h2 className="text-2xl font-semibold text-text-primary mb-6">Requirements</h2>
                  <Stagger staggerDelay={0.05} className="space-y-4">
                    {job.requirements.map((item, i) => (
                      <div key={i} className="flex gap-4 group">
                        <div className="mt-1.5 shrink-0">
                          <CheckCircle2 className="w-5 h-5 text-accent opacity-80" />
                        </div>
                        <p className="text-base font-light text-text-secondary leading-relaxed">{item}</p>
                      </div>
                    ))}
                  </Stagger>
                </div>
              </FadeUp>
            )}

            {job.bonusPoints && (
              <FadeUp delay={0.4}>
                <div>
                  <h2 className="text-2xl font-semibold text-text-primary mb-6">Bonus Points</h2>
                  <Stagger staggerDelay={0.05} className="space-y-4">
                    {job.bonusPoints.map((item, i) => (
                      <div key={i} className="flex gap-4 group">
                        <div className="mt-1.5 shrink-0">
                          <div className="w-2 h-2 rounded-full bg-accent/40 mt-2" />
                        </div>
                        <p className="text-base font-light text-text-secondary leading-relaxed italic">{item}</p>
                      </div>
                    ))}
                  </Stagger>
                </div>
              </FadeUp>
            )}
          </div>

          {/* Right Column: Sticky Sidebar */}
          <aside className="lg:sticky lg:top-32 space-y-6">
            <FadeUp delay={0.45}>
              <div className="rounded-3xl border border-border-strong/40 bg-white/60 p-8 backdrop-blur-md shadow-sm">
                <h3 className="text-lg font-semibold text-text-primary mb-6">Apply Now</h3>
                
                <div className="space-y-4">
                  <Link
                    href={mailtoLink}
                    className="flex w-full items-center justify-center gap-2 rounded-full bg-(--color-button-primary-bg) px-6 py-4 text-sm font-medium text-white transition-all hover:bg-(--color-button-primary-hover) shadow-[rgba(76,29,149,0.4)_0px_6px_20px_-6px]"
                  >
                    Apply for this role
                    <Icon icon="solar:letter-bold" className="w-4 h-4" />
                  </Link>
                  
                  <div className="text-center">
                    <p className="text-xs text-text-secondary px-4">
                      By clicking apply, you&apos;ll be directed to send an email to our hiring team at careers@zaby.ai
                    </p>
                  </div>
                </div>

                <div className="mt-8 pt-8 border-t border-border/50 space-y-4">
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-text-secondary">Department</span>
                    <span className="font-medium text-text-primary">{job.department}</span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-text-secondary">Location</span>
                    <span className="font-medium text-text-primary">{job.location}</span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-text-secondary">Job Type</span>
                    <span className="font-medium text-text-primary">{job.type}</span>
                  </div>
                </div>
              </div>
            </FadeUp>

            <FadeUp delay={0.5}>
              <div className="rounded-3xl border border-border-strong/40 bg-slate-50/50 p-8">
                <div className="flex items-center gap-3 mb-4">
                  <div className="h-10 w-10 flex items-center justify-center rounded-xl bg-accent/10 border border-accent/15">
                    <Icon icon="solar:shield-check-bold-duotone" className="w-5 h-5 text-accent" />
                  </div>
                  <span className="text-sm font-semibold text-text-primary uppercase tracking-wider">Ethos</span>
                </div>
                <p className="text-sm font-light leading-relaxed text-text-secondary italic">
                  &quot;Execution over conversation. We build infrastructure that actually moves things forward, not just talks about them.&quot;
                </p>
              </div>
            </FadeUp>

            <FadeUp delay={0.55}>
              <div className="flex justify-center gap-4">
                <button className="p-3 rounded-full border border-border/50 text-text-secondary hover:text-accent hover:border-accent/20 transition-all">
                  <Share2 className="w-4 h-4" />
                </button>
                <Link href={mailtoLink} className="p-3 rounded-full border border-border/50 text-text-secondary hover:text-accent hover:border-accent/20 transition-all">
                  <Mail className="w-4 h-4" />
                </Link>
              </div>
            </FadeUp>
          </aside>
        </div>
      </div>
    </main>
  );
}
