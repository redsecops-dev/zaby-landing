"use client";

import { useState } from "react";
import { SectionWrapper, Container } from "@/components/layout";
import { SectionHeading, GlassPanel, GradientOrb } from "@/components/shared";
import { FadeUp } from "@/components/animations";
import { cn } from "@/lib/utils";
import type { PricingPlan } from "./types";

const PLANS: PricingPlan[] = [
  {
    name: "Free",
    description: "For individuals and small teams getting started.",
    monthlyPrice: 0,
    annualPrice: 0,
    ctaLabel: "Start for free",
    features: [
      "5 projects",
      "3 team members",
      "AI drafts (50/mo)",
      "Community support",
    ],
  },
  {
    name: "Pro",
    description: "For growing teams that need more power.",
    monthlyPrice: 49,
    annualPrice: 39,
    ctaLabel: "Upgrade to Pro",
    highlighted: true,
    features: [
      "Unlimited projects",
      "25 team members",
      "AI drafts (unlimited)",
      "Priority support",
      "Advanced analytics",
    ],
  },
  {
    name: "Enterprise",
    description: "For large orgs with custom requirements.",
    monthlyPrice: null,
    annualPrice: null,
    ctaLabel: "Contact sales",
    features: [
      "Everything in Pro",
      "Unlimited members",
      "SSO & SCIM",
      "SOC 2 compliance",
      "Dedicated Slack channel",
      "Custom SLA",
    ],
  },
];

export function PricingSection() {
  const [billing, setBilling] = useState<"monthly" | "annually">("annually");

  return (
    <SectionWrapper id="pricing" spacing="lg" background="muted" className="relative overflow-hidden">
      <GradientOrb color="purple" size="xl" className="top-0 left-1/2 -translate-x-1/2 -translate-y-1/2" />
      <Container size="lg" className="relative z-10">
        <SectionHeading
          label="Pricing"
          title="Simple, transparent pricing"
          subtitle="No hidden fees. Cancel anytime."
          align="center"
          gradient
          className="mb-10"
        />

        {/* Billing toggle */}
        <div className="flex items-center justify-center gap-3 mb-12">
          <button
            onClick={() => setBilling("monthly")}
            className={cn(
              "text-sm font-medium px-4 py-1.5 rounded-full transition-colors",
              billing === "monthly"
                ? "bg-(--color-button-primary-bg) text-white"
                : "text-muted-fg hover:text-primary"
            )}
          >
            Monthly
          </button>
          <button
            onClick={() => setBilling("annually")}
            className={cn(
              "text-sm font-medium px-4 py-1.5 rounded-full transition-colors flex items-center gap-2",
              billing === "annually"
                ? "bg-(--color-button-primary-bg) text-white"
                : "text-muted-fg hover:text-primary"
            )}
          >
            Annually
            <span className="text-xs bg-accent text-white px-2 py-0.5 rounded-full">
              Save 20%
            </span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {PLANS.map((plan) => {
            const price = billing === "annually" ? plan.annualPrice : plan.monthlyPrice;
            return (
              <FadeUp key={plan.name}>
                <GlassPanel
                  padding="lg"
                  className={cn(
                    "flex flex-col gap-6 h-full",
                    plan.highlighted && "border-accent shadow-glow-accent"
                  )}
                >
                  {plan.highlighted && (
                    <span className="self-start text-xs font-semibold uppercase tracking-wide px-3 py-1 rounded-full bg-accent text-white">
                      Most popular
                    </span>
                  )}
                  <div>
                    <h3 className="font-bold text-primary text-xl">{plan.name}</h3>
                    <p className="text-muted-fg text-sm mt-1">{plan.description}</p>
                  </div>
                  <div className="text-4xl font-extrabold text-primary">
                    {price === null ? (
                      "Custom"
                    ) : price === 0 ? (
                      "Free"
                    ) : (
                      <>
                        ${price}
                        <span className="text-base font-medium text-muted-fg">/mo</span>
                      </>
                    )}
                  </div>
                  <ul className="flex flex-col gap-2 flex-1">
                    {plan.features.map((f) => (
                      <li key={f} className="flex items-start gap-2 text-sm text-muted-fg">
                        <span className="mt-0.5 text-accent">✓</span>
                        {f}
                      </li>
                    ))}
                  </ul>
                  <a
                    href="https://platform.zaby.io/tenant/signup"
                    className={cn(
                      "block text-center rounded-full py-3 text-sm font-semibold transition-opacity cursor-pointer",
                      plan.highlighted
                        ? "bg-(--color-button-primary-bg) text-white shadow-[rgba(76,29,149,0.5)_0px_10px_30px_-10px] hover:bg-(--color-button-primary-hover)"
                        : "border border-(--color-button-secondary-border) bg-(--color-button-secondary-bg) text-(--color-button-secondary-text) hover:bg-[#e9d5ff]"
                    )}
                  >
                    {plan.ctaLabel}
                  </a>
                </GlassPanel>
              </FadeUp>
            );
          })}
        </div>
      </Container>
    </SectionWrapper>
  );
}
