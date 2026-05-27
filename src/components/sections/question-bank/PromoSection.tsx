"use client";

import React from "react";
import Link from "next/link";
import { Database, Fingerprint, Users, ArrowRight } from "lucide-react";
import { SectionWrapper, Container } from "@/components/layout";
import { GlassPanel, GradientOrb } from "@/components/shared";
import { ScrollReveal } from "@/components/animations";
import { Button } from "@/components/ui/button";

export default function PromoSection() {
  return (
    <SectionWrapper spacing="lg" background="transparent" className="relative overflow-hidden !py-0 mb-20">
      <Container size="lg" className="relative z-10">
        <ScrollReveal direction="up" delay={0.15}>
          <GlassPanel
            padding="none"
            className="relative overflow-hidden rounded-3xl p-8 md:p-12 lg:p-16 flex flex-col lg:flex-row justify-between gap-12 items-center bg-white/70 border-[var(--color-glass-border)] shadow-xs"
          >
            {/* Background Decorative Glow Orbs */}
            <GradientOrb color="purple" size="lg" className="-bottom-24 -left-24 opacity-15 pointer-events-none" />
            <GradientOrb color="blue" size="md" className="-top-12 -right-12 opacity-10 pointer-events-none" />

            {/* Left Block — Promotional Info */}
            <div className="flex-1 flex flex-col gap-4 relative z-10">
              <h3 className="text-sm font-semibold tracking-wider text-[var(--color-accent-soft)] uppercase font-sans">
                Switch from any existing assessment platform
              </h3>
              <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight leading-tight font-display text-[var(--color-text-primary)]">
                Get up to{" "}
                <span className="bg-linear-to-r from-[var(--color-accent-hover)] via-[#c026d3] to-[var(--color-accent-soft)] bg-clip-text text-transparent">
                  90% OFF
                </span>{" "}
                <br />
                <span className="text-xl md:text-2xl font-semibold text-[var(--color-text-secondary)] tracking-wide uppercase">
                  BASED ON YOUR CURRENT INVOICE
                </span>
              </h2>
              <p className="text-sm md:text-base text-[var(--color-text-secondary)] max-w-md font-light leading-relaxed font-sans">
                Migrate from legacy assessment platforms seamlessly. Zaby will handle all content mapping and onboarding support.
              </p>
              
              <div className="mt-4 flex flex-wrap gap-4">
                <Button 
                  asChild
                  size="lg"
                  className="group cursor-pointer rounded-full bg-[var(--color-button-primary-bg)] hover:bg-[var(--color-button-primary-hover)] text-white font-semibold shadow-[rgba(47,19,98,0.15)_0px_10px_25px_-5px] transition-all duration-300 hover:scale-[1.02]"
                >
                  <Link href="https://platform.zaby.io/tenant/signup">
                    Book Demo
                    <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
                  </Link>
                </Button>
              </div>
            </div>

            {/* Right Block — Migration Value Propositions */}
            <div className="lg:max-w-md flex flex-col gap-8 relative z-10 w-full text-left">
              {[
                {
                  icon: <Database className="h-5 w-5" />,
                  title: "Seamless Migration",
                  desc: "Don't lose your content and assessments. We automate mapping with 0 data loss.",
                },
                {
                  icon: <Fingerprint className="h-5 w-5" />,
                  title: "Enterprise Security",
                  desc: "Your candidate data is private, secure & compliant. SOC2 & ISO certified.",
                },
                {
                  icon: <Users className="h-5 w-5" />,
                  title: "Dedicated Support",
                  desc: "White-glove onboarding & customer success teams available 24/7/365.",
                },
              ].map((item, idx) => (
                <div key={idx} className="flex gap-4 items-start group/item">
                  <div className="w-12 h-12 rounded-2xl bg-[var(--color-accent)]/10 border border-[var(--color-accent)]/20 flex items-center justify-center text-[var(--color-accent-hover)] shrink-0 shadow-sm group-hover/item:scale-110 group-hover/item:bg-[var(--color-accent)]/15 transition-all duration-300">
                    {item.icon}
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-[var(--color-text-primary)] mb-1 font-display tracking-wide">{item.title}</h4>
                    <p className="text-xs text-[var(--color-text-secondary)] leading-relaxed font-light font-sans">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>

          </GlassPanel>
        </ScrollReveal>
      </Container>
    </SectionWrapper>
  );
}


