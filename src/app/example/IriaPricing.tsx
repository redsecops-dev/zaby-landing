"use client";

import { startTransition, useEffect, useRef, useState } from "react";
import type { CSSProperties } from "react";
import { Icon } from "@iconify/react";
import { Instrument_Serif, Inter } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
});

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: ["400"],
  style: ["normal", "italic"],
});

type BillingCycle = "monthly" | "annually";

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
    name: "Developer",
    description: "For prototyping and hobby projects.",
    monthlyPrice: 0,
    annualPrice: 0,
    ctaLabel: "Start for free",
    features: [
      "10,000 characters per month",
      "3 standard studio voices",
      "Standard API latency (~400ms)",
      "Community Discord support",
    ],
  },
  {
    name: "Studio",
    description: "For creators and scaled production.",
    monthlyPrice: 49,
    annualPrice: 39,
    ctaLabel: "Upgrade to Studio",
    highlighted: true,
    backgroundImage:
      "https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/e534354d-c5f2-4399-a1d9-2f50338e8c47_1600w.jpg",
    features: [
      "500,000 characters per month",
      "Voice cloning (10 custom models)",
      "Sub-200ms ultra-low latency",
      "Emotional range steering",
      "Priority email support",
    ],
  },
  {
    name: "Scale",
    description: "For massive conversational workloads.",
    monthlyPrice: null,
    annualPrice: null,
    ctaLabel: "Contact sales",
    backgroundImage:
      "https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/5ee0a38a-b5d3-4531-8793-98beed4af162_1600w.jpg",
    features: [
      "Unlimited character generation",
      "Volume-based usage discounts",
      "SOC 2 Type II compliance",
      "Dedicated compute clusters",
      "Shared Slack channel",
    ],
  },
];

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
        className={`pricing-reveal-word inline-block translate-y-[110%] motion-reduce:translate-y-0 ${className}`}
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
  const hasFixedPrice = plan.monthlyPrice !== null && plan.annualPrice !== null;
  const currentPrice = !hasFixedPrice
    ? "Custom"
    : billingCycle === "monthly"
      ? `$${plan.monthlyPrice}`
      : `$${plan.annualPrice}`;
  const featureIcon = plan.highlighted
    ? "solar:check-circle-bold"
    : "solar:check-circle-linear";

  return (
    <article
      className={`relative h-full rounded-[18px] p-[1px] transition-all duration-700 ${
        isReady ? "translate-y-0 opacity-100" : "translate-y-5 opacity-0"
      }`}
      style={{
        transitionDelay: `${delay}ms`,
        background: plan.highlighted
          ? "linear-gradient(135deg, rgba(192,38,211,0.6), rgba(124,58,237,0.3))"
          : "linear-gradient(135deg, rgba(255,255,255,0.8), rgba(255,255,255,0.2))",
        boxShadow: plan.highlighted
          ? "rgba(76, 29, 149, 0.15) 0px 20px 40px -10px"
          : undefined,
      }}
    >
      {plan.highlighted ? (
        <div className="absolute -top-3 left-1/2 z-20 -translate-x-1/2 rounded-full bg-[linear-gradient(135deg,#c026d3,#7c3aed)] p-[1px]">
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
          <h3 className="text-lg font-normal tracking-tight text-[color:var(--foreground)]">{plan.name}</h3>
          <p className="mt-1 text-sm text-[color:var(--foreground)]/60">{plan.description}</p>
        </div>

        <div className="relative z-10 mb-8 flex items-baseline gap-1">
          <span className="text-4xl font-light tracking-tighter text-[color:var(--foreground)]">
            {currentPrice}
          </span>
          {hasFixedPrice ? (
            <span className="text-sm text-[color:var(--foreground)]/60">/ month</span>
          ) : null}
        </div>

        {hasFixedPrice && billingCycle === "annually" && plan.annualPrice !== 0 ? (
          <p className="relative z-10 mb-6 text-xs font-medium uppercase tracking-[0.12em] text-fuchsia-600">
            Billed annually
          </p>
        ) : null}

        <a
          href="#"
          className={`relative z-10 mb-8 flex w-full items-center justify-center gap-2 rounded-full px-4 py-3 text-sm transition-all ${
            plan.highlighted
              ? "bg-[linear-gradient(135deg,#1a0b2e_0%,#4c1d95_100%)] text-white shadow-md hover:opacity-90"
              : "border border-neutral-200/60 bg-white text-neutral-800 shadow-sm hover:bg-neutral-50"
          }`}
        >
          {plan.ctaLabel}
          {plan.highlighted ? (
            <Icon icon="solar:arrow-right-linear" width={16} height={16} />
          ) : null}
        </a>

        <div className="relative z-10 flex-1">
          <p
            className={`relative z-10 mb-4 text-xs font-medium uppercase tracking-wide text-[color:var(--foreground)]`}
          >
            {plan.name === "Developer"
              ? "Includes"
              : plan.name === "Studio"
                ? "Everything in Dev, plus"
                : "Everything in Studio, plus"}
          </p>
          <ul className="space-y-4">
            {plan.features.map((feature) => (
              <li key={feature} className="flex items-start gap-3">
                <Icon
                  icon={featureIcon}
                  width={20}
                  height={20}
                  className={plan.highlighted ? "mt-0.5 text-fuchsia-500" : "mt-0.5 text-[color:var(--foreground)]/40"}
                />
                <span className={plan.highlighted ? "text-sm text-[color:var(--foreground)]" : "text-sm text-[color:var(--foreground)]/70"}>
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

export default function IriaPricing() {
  const [billingCycle, setBillingCycle] = useState<BillingCycle>("monthly");
  const [isReady, setIsReady] = useState(false);
  const sectionRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const section = sectionRef.current;

    if (!section) {
      return;
    }

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    let firstFrame = 0;
    let secondFrame = 0;
    let isDisposed = false;
    let revertAnimations: (() => void) | undefined;

    if (prefersReducedMotion) {
      setIsReady(true);
    } else {
      firstFrame = window.requestAnimationFrame(() => {
        secondFrame = window.requestAnimationFrame(() => {
          startTransition(() => setIsReady(true));
        });
      });

      void (async () => {
        const [{ gsap }, { ScrollTrigger }] = await Promise.all([
          import("gsap"),
          import("gsap/ScrollTrigger"),
        ]);

        if (isDisposed) {
          return;
        }

        gsap.registerPlugin(ScrollTrigger);

        const context = gsap.context(() => {
          const title = section.querySelector("[data-pricing-title]");
          const words = section.querySelectorAll<HTMLElement>(".pricing-reveal-word");

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

        revertAnimations = () => context.revert();
      })();
    }

    return () => {
      isDisposed = true;
      window.cancelAnimationFrame(firstFrame);
      window.cancelAnimationFrame(secondFrame);
      revertAnimations?.();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className={`relative min-h-screen flex items-center justify-center overflow-x-hidden  text-[color:var(--foreground)] antialiased selection:bg-fuchsia-200 selection:text-fuchsia-900 p-4 md:p-8 lg:p-12 ${inter.className}`}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0 opacity-[0.02] mix-blend-multiply"
      >
        <div className="h-full w-full bg-cover bg-center" style={textureOverlayStyle} />
      </div>

      <div className="w-full max-w-[1280px] bg-white/40 backdrop-blur-3xl rounded-[2.5rem] border border-white/60 shadow-[0_8px_40px_rgb(0,0,0,0.04)] p-4 md:p-6 lg:p-8">
        <div className="relative z-10 mx-auto flex w-full flex-col items-center">
        
          <p
            className={`mt-8 max-w-[28rem] text-center text-base leading-relaxed text-[color:var(--foreground)]/60 transition-all duration-700 md:text-lg ${
              isReady ? "translate-y-0 opacity-100" : "translate-y-[15px] opacity-0"
            }`}
            style={{ transitionDelay: "140ms" }}
          >
            Start building with sentient voice capabilities today. Upgrade
            seamlessly when your conversational agents need global scale.
          </p>

          <div
            className={`mt-10 inline-flex items-center rounded-full border border-white/60 bg-white/40 p-1 shadow-[0_4px_12px_-4px_rgba(0,0,0,0.05)] backdrop-blur-xl transition-all duration-700 ${
              isReady ? "translate-y-0 opacity-100" : "translate-y-[15px] opacity-0"
            }`}
            style={{ transitionDelay: "200ms" }}
          >
            <button
              type="button"
              aria-pressed={billingCycle === "monthly"}
              onClick={() => setBillingCycle("monthly")}
              className={`relative flex items-center gap-2 rounded-full px-6 py-2.5 text-sm transition-all ${
                billingCycle === "monthly"
                  ? "bg-white text-[color:var(--foreground)] shadow-[0_2px_8px_-2px_rgba(0,0,0,0.08)]"
                  : "text-[color:var(--foreground)]/60 hover:text-[color:var(--foreground)]"
              }`}
            >
              Monthly
            </button>
            <button
              type="button"
              aria-pressed={billingCycle === "annually"}
              onClick={() => setBillingCycle("annually")}
              className={`relative flex items-center gap-2 rounded-full px-6 py-2.5 text-sm transition-all ${
                billingCycle === "annually"
                  ? "bg-white text-[color:var(--foreground)] shadow-[0_2px_8px_-2px_rgba(0,0,0,0.08)]"
                  : "text-[color:var(--foreground)]/60 hover:text-[color:var(--foreground)]"
              }`}
            >
              Annually
              <span className="rounded-full border border-fuchsia-200/50 bg-fuchsia-100/50 px-2 py-0.5 text-[10px] tracking-wide text-fuchsia-600">
                SAVE 20%
              </span>
            </button>
          </div>

          <div className="relative z-10 mt-16 grid w-full max-w-6xl grid-cols-1 gap-6 md:grid-cols-3">
            {PLANS.map((plan, index) => (
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
    </section>
  );
}