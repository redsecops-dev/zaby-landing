"use client";

import { startTransition, useEffect, useRef, useState } from "react";
import type { CSSProperties } from "react";
import { Icon } from "@iconify/react";
import { ShimmerButton, CalendlyButton } from "@/components/shared";

type BillingCycle = "monthly" | "annually";

type ApiPlanFeature = {
  id: string;
  name: string;
  description: string | null;
  type: string;
  unit: string | null;
  value: unknown;
};

type TenantApiPlan = {
  id: string;
  name: string;
  description: string | null;
  type: string;
  status: string;
  price: number;
  comparePrice: number | null;
  currency: string;
  billingCycle: string;
  interval: number;
  trialDays: number | null;
  isPopular: boolean;
  sortOrder: number;
  isCustom: boolean;
  isVisible: boolean;
  targetUserType: string;
  features: ApiPlanFeature[];
};

type PlansApiResponse = {
  success: boolean;
  data?: {
    plans?: TenantApiPlan[];
  };
};

type Plan = {
  name: string;
  description: string;
  monthlyPrice: number | null;
  annualPrice: number | null;
  ctaLabel: string;
  highlighted?: boolean;
  backgroundImage?: string;
  features: string[];
};

const PLANS: Plan[] = [
  {
    name: "Starter",
    description: "For individuals and small teams exploring AI-powered operations.",
    monthlyPrice: 0,
    annualPrice: 0,
    ctaLabel: "Start for free",
    features: [
      "Up to 3 Open Agents",
      "5 team members",
      "Basic Agentic Workflows",
      "Community support",
    ],
  },
  {
    name: "Professional",
    description: "For growing teams deploying operational AI at scale.",
    monthlyPrice: 49,
    annualPrice: 39,
    ctaLabel: "Upgrade to Professional",
    highlighted: true,
    backgroundImage:
      "https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/e534354d-c5f2-4399-a1d9-2f50338e8c47_1600w.jpg",
    features: [
      "Unlimited Open Agents",
      "25 team members",
      "Agent Squad deployment",
      "Advanced Agentic Workflows",
      "Agent Memory (persistent)",
      "Priority support",
    ],
  },
  {
    name: "Enterprise",
    description: "For large organizations requiring custom AI workforce infrastructure.",
    monthlyPrice: null,
    annualPrice: null,
    ctaLabel: "Upgrade to Enterprise",
    backgroundImage:
      "https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/5ee0a38a-b5d3-4531-8793-98beed4af162_1600w.jpg",
    features: [
      "Everything in Professional",
      "Unlimited team members",
      "Dedicated enterprise deployment",
      "RBAC & audit logs",
      "Dedicated account manager",
      "Custom SLA & support",
    ],
  },
];

const API_BASE = process.env.NEXT_PUBLIC_API_URL ?? "https://prod-api.zaby.io";

const PLAN_UI_META: Record<
  string,
  Pick<Plan, "ctaLabel" | "highlighted" | "backgroundImage"> & {
    displayName?: string;
  }
> = {
  starter: {
    displayName: "Starter",
    ctaLabel: "Start for free",
    highlighted: false,
  },
  growth: {
    displayName: "Professional",
    ctaLabel: "Upgrade to Professional",
    highlighted: true,
    backgroundImage:
      "https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/e534354d-c5f2-4399-a1d9-2f50338e8c47_1600w.jpg",
  },
  professional: {
    displayName: "Professional",
    ctaLabel: "Upgrade to Professional",
    highlighted: true,
    backgroundImage:
      "https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/e534354d-c5f2-4399-a1d9-2f50338e8c47_1600w.jpg",
  },
  enterprise: {
    displayName: "Enterprise",
    ctaLabel: "Upgrade to Enterprise",
    highlighted: false,
    backgroundImage:
      "https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/5ee0a38a-b5d3-4531-8793-98beed4af162_1600w.jpg",
  },
};

function normalizeCycle(cycle: string): "monthly" | "annually" | null {
  const value = cycle.trim().toLowerCase();
  if (value === "monthly" || value === "month") return "monthly";
  if (value === "yearly" || value === "annual" || value === "annually" || value === "year") {
    return "annually";
  }
  return null;
}

function normalizePlanKey(name: string): string {
  return name.toLowerCase().replace(/^tenant_/, "").trim();
}

function formatInr(amount: number): string {
  return new Intl.NumberFormat("en-IN").format(amount);
}

function mapTenantPlans(apiPlans: TenantApiPlan[]): Plan[] {
  const grouped: Record<
    string,
    { monthly?: TenantApiPlan; annually?: TenantApiPlan }
  > = {};

  apiPlans
    .filter((plan) => {
      return (
        plan.targetUserType === "TENANT" &&
        plan.status === "ACTIVE" &&
        plan.isVisible
      );
    })
    .forEach((plan) => {
      const key = normalizePlanKey(plan.name);
      if (!grouped[key]) grouped[key] = {};
      const cycle = normalizeCycle(plan.billingCycle);
      if (cycle === "annually") grouped[key].annually = plan;
      else grouped[key].monthly = plan;
    });

  return Object.entries(grouped)
    .sort(([, aVariants], [, bVariants]) => {
      const aPlan = aVariants.monthly ?? aVariants.annually;
      const bPlan = bVariants.monthly ?? bVariants.annually;
      const aSort = aPlan?.sortOrder ?? Number.MAX_SAFE_INTEGER;
      const bSort = bPlan?.sortOrder ?? Number.MAX_SAFE_INTEGER;
      if (aSort !== bSort) return aSort - bSort;
      return (aPlan?.price ?? Number.MAX_SAFE_INTEGER) - (bPlan?.price ?? Number.MAX_SAFE_INTEGER);
    })
    .map(([key, variants]) => {
      const monthlyPlan = variants.monthly ?? variants.annually;
      const annuallyPlan = variants.annually ?? variants.monthly;
      if (!monthlyPlan && !annuallyPlan) return null;

      const meta = PLAN_UI_META[key];
      const displayName =
        meta?.displayName ??
        key
          .split("_")
          .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
          .join(" ");

      const sourcePlanForContent = monthlyPlan ?? annuallyPlan;
      const features = (sourcePlanForContent?.features ?? []).map((feature) => feature.name);
      const uniqueFeatures = Array.from(new Set(features));

      return {
        name: displayName,
        description: sourcePlanForContent?.description ?? "",
        monthlyPrice:
          monthlyPlan && typeof monthlyPlan.price === "number"
            ? monthlyPlan.price
            : null,
        annualPrice:
          annuallyPlan && typeof annuallyPlan.price === "number"
            ? annuallyPlan.price
            : null,
        ctaLabel: meta?.ctaLabel ?? "Get started",
        highlighted:
          Boolean(monthlyPlan?.isPopular) ||
          Boolean(annuallyPlan?.isPopular) ||
          meta?.highlighted,
        backgroundImage: meta?.backgroundImage,
        features: uniqueFeatures,
      } as Plan;
    })
    .filter((plan): plan is Plan => Boolean(plan));
}

const textureOverlayStyle: CSSProperties = {
  backgroundImage:
    "url(https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/fa51902b-c2a4-4c33-a96e-a8f1ef67edc6_3840w.jpg)",
};

function PricingRevealWord({
  children,
  className = "",
}: {
  children: string;
  className?: string;
}) {
  return (
    <span className="inline-block overflow-hidden">
      <span
        className={`iriaps-reveal-word inline-block translate-y-0 motion-reduce:translate-y-0 ${className}`}
      >
        {children}
      </span>
    </span>
  );
}

function PlanCard({
  plan,
  billingCycle,
  isReady,
  delay,
}: {
  plan: Plan;
  billingCycle: BillingCycle;
  isReady: boolean;
  delay: number;
}) {
  const activePrice =
    billingCycle === "monthly" ? plan.monthlyPrice : plan.annualPrice;
  const hasPriceForCycle = activePrice !== null;
  const currentPrice = hasPriceForCycle
    ? `₹${formatInr(activePrice)}`
    : "Custom";
  const featureIcon = plan.highlighted
    ? "solar:check-circle-bold"
    : "solar:check-circle-linear";

  return (
    <article
      className={`relative h-full rounded-[18px] p-px transition-all duration-700 ${
        isReady ? "translate-y-0 opacity-100" : "translate-y-5 opacity-0"
      }`}
      style={{
        transitionDelay: `${delay}ms`,
        background: plan.highlighted
          ? "linear-gradient(135deg, rgba(217, 70, 239, 0.6), rgba(168, 85, 247, 0.3))"
          : "linear-gradient(135deg, rgba(255, 255, 255, 0.8), rgba(255, 255, 255, 0.2))",
        boxShadow: plan.highlighted
          ? "rgba(168, 85, 247, 0.15) 0px 20px 40px -10px"
          : undefined,
      }}
    >
      {plan.highlighted ? (
        <div className="absolute -top-3 left-1/2 z-20 -translate-x-1/2 rounded-full p-px" style={{ background: "linear-gradient(135deg, var(--color-accent-soft), var(--color-accent))" }}>
          <div className="rounded-full bg-neutral-900 px-3 py-0.5 text-[10px] font-medium uppercase tracking-wide text-white">
            Most Popular
          </div>
        </div>
      ) : null}

      <div
        className={`relative h-full overflow-hidden rounded-[17px] p-8 ${
          plan.highlighted ? "bg-white/80 backdrop-blur-3xl" : "bg-white/50 backdrop-blur-2xl"
        }`}
      >
        {plan.backgroundImage ? (
          <div
            aria-hidden="true"
            className={`pointer-events-none absolute inset-0 bg-cover bg-center ${
              plan.highlighted
                ? "opacity-[0.06] mix-blend-multiply"
                : "opacity-[0.03] grayscale mix-blend-luminosity"
            }`}
            style={{ backgroundImage: `url(${plan.backgroundImage})` }}
          />
        ) : null}

        <div className="relative z-10 mb-6">
          <h3 className="text-lg font-normal tracking-tight text-(--foreground)">{plan.name}</h3>
          <p className="mt-1 text-sm text-(--foreground)/60">{plan.description}</p>
        </div>

        <div className="relative z-10 mb-8 flex items-baseline gap-1">
          <span className="text-4xl font-light tracking-tighter text-(--foreground)">
            {currentPrice}
          </span>
          {hasPriceForCycle ? (
            <span className="text-sm text-(--foreground)/60">
              / {billingCycle === "monthly" ? "month" : "year"}
            </span>
          ) : null}
        </div>

        {hasPriceForCycle && billingCycle === "annually" && plan.annualPrice !== 0 ? (
          <p className="relative z-10 mb-6 text-xs font-medium uppercase tracking-[0.12em]" style={{ color: "var(--color-accent)" }}>
            Billed annually
          </p>
        ) : null}

        {plan.name === "Enterprise" ? (
          <CalendlyButton
            variant="secondary"
            text={plan.ctaLabel}
            icon="solar:calendar-date-bold-duotone"
            className="relative z-10 mb-8 flex w-full items-center justify-center gap-2 rounded-full border border-neutral-200/60 bg-white px-4 py-3 text-sm text-neutral-800 transition-all hover:bg-slate-50 hover:border-purple-500 font-medium"
          />
        ) : plan.highlighted ? (
          <ShimmerButton
            asChild
            shimmerColor="#e879f9"
            shimmerSize="0.1em"
            background="var(--color-button-primary-bg)"
            borderRadius="9999px"
            className="relative z-10 mb-8 flex w-full items-center justify-center gap-2 px-4 py-3 text-sm shadow-[rgba(168,85,247,0.15)_0px_8px_16px_-4px] hover:shadow-[rgba(168,85,247,0.25)_0px_10px_22px_-4px]"
          >
            <a href="https://platform.zaby.io/tenant/signup">
              <span className="relative z-10">{plan.ctaLabel}</span>
              <Icon icon="solar:arrow-right-linear" width={16} height={16} className="relative z-10" />
            </a>
          </ShimmerButton>
        ) : (
          <a
            href="https://platform.zaby.io/tenant/signup"
            className="relative z-10 mb-8 flex w-full items-center justify-center gap-2 rounded-full border border-neutral-200/60 bg-white px-4 py-3 text-sm text-neutral-800 transition-opacity hover:opacity-80 hover:border-purple-500"
          >
            {plan.ctaLabel}
          </a>
        )}

        <div className="relative z-10 flex-1">
          <p
            className={`relative z-10 mb-4 text-xs font-medium uppercase tracking-wide text-(--foreground)`}
          >
            {plan.name === "Starter"
              ? "Includes"
              : plan.name === "Professional"
                ? "Everything in Starter, plus"
                : "Everything in Professional, plus"}
          </p>
          <ul className="space-y-4">
            {plan.features.map((feature) => (
              <li key={feature} className="flex items-start gap-3">
                <Icon
                  icon={featureIcon}
                  width={20}
                  height={20}
                  className={plan.highlighted ? "mt-0.5" : "mt-0.5 text-(--foreground)/40"}
                  style={plan.highlighted ? { color: "var(--color-accent-soft)" } : {}}
                />
                <span className={plan.highlighted ? "text-sm text-(--foreground)" : "text-sm text-(--foreground)/70"}>
                  {feature}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </article>
  );
}

function AnimationsManager({ scopeRef }: { scopeRef: React.RefObject<HTMLElement | null> }) {
  useEffect(() => {
    const initAnimations = async () => {
      const section = scopeRef.current;
      if (!section) return;

      const prefersReducedMotion = window.matchMedia(
        "(prefers-reduce-motion: reduce)"
      ).matches;

      if (prefersReducedMotion) return;

      try {
        const [{ gsap }, { ScrollTrigger }] = await Promise.all([
          import("gsap"),
          import("gsap/ScrollTrigger"),
        ]);

        gsap.registerPlugin(ScrollTrigger);

        const context = gsap.context(() => {
          const title = section.querySelector("[data-pricing-title]");
          const words = section.querySelectorAll<HTMLElement>(".iriaps-reveal-word");

          if (title) {
            gsap.to(words, {
              yPercent: 0,
              duration: 1.1,
              ease: "expo.out",
              stagger: 0.06,
              delay: 0.1,
              scrollTrigger: {
                trigger: title,
                start: "top 85%",
                once: true,
              },
            });
          }
        }, section);

        return () => context.revert();
      } catch {
        // Fail silently if GSAP not available
      }
    };

    const cleanup = initAnimations();
    return () => {
      cleanup.then((fn) => fn?.());
    };
  }, [scopeRef]);

  return null;
}

export function IriaPricingSection() {
  const [billingCycle, setBillingCycle] = useState<BillingCycle>("monthly");
  const [isReady, setIsReady] = useState(false);
  const [plans, setPlans] = useState<Plan[]>(PLANS);
  const sectionRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    let firstFrame = 0;
    let secondFrame = 0;

    if (prefersReducedMotion) {
      firstFrame = window.requestAnimationFrame(() => {
        startTransition(() => setIsReady(true));
      });
    } else {
      firstFrame = window.requestAnimationFrame(() => {
        secondFrame = window.requestAnimationFrame(() => {
          startTransition(() => setIsReady(true));
        });
      });
    }

    return () => {
      window.cancelAnimationFrame(firstFrame);
      window.cancelAnimationFrame(secondFrame);
    };
  }, []);

  useEffect(() => {
    let cancelled = false;

    const fetchTenantPlans = async () => {
      try {
        const response = await fetch(`${API_BASE}/api/v1/public/plans`, {
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP ${response.status}`);
        }

        const payload: PlansApiResponse = await response.json();
        const apiPlans = payload?.data?.plans;

        if (!payload?.success || !Array.isArray(apiPlans)) {
          return;
        }

        const mappedPlans = mapTenantPlans(apiPlans);
        if (!cancelled && mappedPlans.length > 0) {
          setPlans(mappedPlans);
        }
      } catch {
        // Keep static fallback plans when API fails.
      }
    };

    void fetchTenantPlans();

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex items-center justify-center overflow-x-hidden text-(--foreground) antialiased selection:bg-white/30 selection:text-black p-4 md:p-8 lg:p-12"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0 opacity-[0.02] mix-blend-multiply"
      >
        <div className="h-full w-full bg-cover bg-center" style={textureOverlayStyle} />
      </div>

      <div className="w-full max-w-7xl bg-white/40 backdrop-blur-3xl rounded-[2.5rem] border border-white/60 shadow-[0_8px_40px_rgb(0,0,0,0.04)] p-4 md:p-6 lg:p-8">
        <div className="relative z-10 mx-auto flex w-full flex-col items-center">
          {/* Badge */}
          <div
            className={`mb-6 inline-flex items-center gap-2 rounded-full border border-slate-200/60 bg-white/50 px-4 py-1.5 transition-all duration-700 backdrop-blur-sm ${
              isReady ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"
            }`}
            style={{ transitionDelay: "40ms" }}
          >
            <span className="h-1.5 w-1.5 rounded-full bg-accent" />
            <span className="text-xs font-medium uppercase tracking-wide text-slate-600">
              Flexible Plans
            </span>
          </div>

          <h2
            data-pricing-title
            className={`text-center text-3xl font-light tracking-tight text-slate-900 transition-all duration-700 md:text-4xl lg:text-5xl ${
              isReady ? "translate-y-0 opacity-100" : "translate-y-5 opacity-0"
            }`}
            style={{ transitionDelay: "80ms" }}
          >
            <PricingRevealWord>Simple,</PricingRevealWord>
            <br />
            <PricingRevealWord>Transparent</PricingRevealWord>
            {" "}
            <PricingRevealWord>Pricing</PricingRevealWord>
          </h2>

          <p
            className={`mt-8 max-w-md text-center text-base leading-relaxed text-(--foreground)/60 transition-all duration-700 md:text-lg ${
              isReady ? "translate-y-0 opacity-100" : "translate-y-3.75 opacity-0"
            }`}
            style={{ transitionDelay: "140ms" }}
          >
            Scale your AI operations with flexible plans built for every team size. Start free, upgrade when you need more.
          </p>

          <div
            className={`mt-10 inline-flex items-center rounded-full border border-white/60 bg-white/40 p-1 shadow-[0_4px_12px_-4px_rgba(0,0,0,0.05)] backdrop-blur-xl transition-all duration-700 ${
              isReady ? "translate-y-0 opacity-100" : "translate-y-3.75 opacity-0"
            }`}
            style={{ transitionDelay: "200ms" }}
          >
            <button
              type="button"
              aria-pressed={billingCycle === "monthly"}
              onClick={() => setBillingCycle("monthly")}
              suppressHydrationWarning={true}
              className={`relative flex items-center gap-2 rounded-full px-6 py-2.5 text-sm transition-all ${
                billingCycle === "monthly"
                  ? "bg-white text-(--foreground) shadow-[0_2px_8px_-2px_rgba(0,0,0,0.08)]"
                  : "text-(--foreground)/60 hover:text-(--foreground)"
              }`}
            >
              Monthly
            </button>
            <button
              type="button"
              aria-pressed={billingCycle === "annually"}
              onClick={() => setBillingCycle("annually")}
              suppressHydrationWarning={true}
              className={`relative flex items-center gap-2 rounded-full px-6 py-2.5 text-sm transition-all ${
                billingCycle === "annually"
                  ? "bg-white text-(--foreground) shadow-[0_2px_8px_-2px_rgba(0,0,0,0.08)]"
                  : "text-(--foreground)/60 hover:text-(--foreground)"
              }`}
            >
              Annually
              <span className="rounded-full border px-2 py-0.5 text-[10px] tracking-wide" style={{ borderColor: "var(--color-accent)/20", backgroundColor: "var(--color-accent)/10", color: "var(--color-accent)" }}>
                SAVE 20%
              </span>
            </button>
          </div>

          <div className="relative z-10 mt-16 grid w-full max-w-6xl grid-cols-1 gap-6 md:grid-cols-3">
            {plans.map((plan, index) => (
              <PlanCard
                key={plan.name}
                plan={plan}
                billingCycle={billingCycle}
                isReady={isReady}
                delay={300 + index * 100}
              />
            ))}
          </div>
        </div>
      </div>

      <AnimationsManager scopeRef={sectionRef} />
    </section>
  );
}