"use client";

import { useEffect, useRef, useState } from "react";
import { Icon } from "@iconify/react";
import type { CSSProperties } from "react";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { GlassPanel } from "@/components/shared/GlassPanel";
import { GradientOrb } from "@/components/shared/GradientOrb";

type TestimonialCardData = {
  avatar: string;
  name: string;
  title: string;
  quote: string;
  colorName: "purple" | "blue" | "orange" | "primary" | "pink";
};

type PublicTestimonial = {
  id: string;
  name?: string | null;
  designation?: string | null;
  company?: string | null;
  review?: string | null;
  profileImageUrl?: string | null;
};

type PublicTestimonialsApiResponse = {
  success?: boolean;
  data?: {
    testimonials?: PublicTestimonial[];
  };
};

const TESTIMONIALS_API_URL = `${process.env.NEXT_PUBLIC_API_URL ?? "https://prod-api.zaby.io"}/api/v1/public/testimonials`;

const marqueeMaskStyle: CSSProperties = {
  maskImage:
    "linear-gradient(to right, transparent, black 6%, black 94%, transparent)",
  WebkitMaskImage:
    "linear-gradient(to right, transparent, black 6%, black 94%, transparent)",
};

const FALLBACK_TESTIMONIALS: TestimonialCardData[] = [
  {
    avatar:
      "https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/2f563338-39fa-47ea-9761-658d4f3f84db_800w.jpg",
    name: "Marcus Chen",
    title: "Head of Operations, Novus",
    quote:
      '"Deploying Agent Squad transformed how our operations team works. Agents now handle monitoring, triage, and escalation autonomously - we\'ve reduced manual overhead by 60% in three months."',
    colorName: "purple",
  },
  {
    avatar:
      "https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/4f5668c5-fc4a-44e0-bc5e-a664189d3c31_800w.jpg",
    name: "Elena Rostova",
    title: "VP Engineering, Meridian",
    quote:
      '"Zaby\'s Agentic Workflows replaced an entire layer of manual process coordination. The reasoning-based orchestration handles edge cases we never could have anticipated with static automation."',
    colorName: "blue",
  },
  {
    avatar:
      "https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/eca707cc-a5b7-439a-b4fd-247f6106c2e1_800w.jpg",
    name: "David Lin",
    title: "Founder, Stack AI",
    quote:
      '"We built our entire support and hiring operations on Zaby. What used to require a team of coordinators now runs on Open Agents - it scaled with us from 10 to 500 customers without friction."',
    colorName: "pink",
  },
];

const GRADIENT_PAIRS: { colorName: "purple" | "blue" | "pink" }[] = [
  { colorName: "purple" },
  { colorName: "blue" },
  { colorName: "pink" },
];

function mapPublicTestimonials(testimonials: PublicTestimonial[]): TestimonialCardData[] {
  return testimonials.slice(0, 3).map((testimonial, index) => {
    const pair = GRADIENT_PAIRS[index % GRADIENT_PAIRS.length];
    const title = [testimonial.designation?.trim(), testimonial.company?.trim()].filter(Boolean).join(", ");

    return {
      avatar: testimonial.profileImageUrl || FALLBACK_TESTIMONIALS[index % FALLBACK_TESTIMONIALS.length].avatar,
      name: testimonial.name?.trim() || FALLBACK_TESTIMONIALS[index % FALLBACK_TESTIMONIALS.length].name,
      title: title || FALLBACK_TESTIMONIALS[index % FALLBACK_TESTIMONIALS.length].title,
      quote: testimonial.review?.trim()
        ? `"${testimonial.review.trim()}"`
        : FALLBACK_TESTIMONIALS[index % FALLBACK_TESTIMONIALS.length].quote,
      colorName: pair.colorName,
    };
  });
}

// Testimonial Card
function TestimonialCard({ avatar, name, title, quote, colorName }: TestimonialCardData) {
  return (
    <GlassPanel 
      padding="lg" 
      className="relative h-full min-h-[280px] flex flex-col group transition-transform duration-300 hover:-translate-y-1 overflow-hidden"
    >
      {/* Ambient background glow */}
      <GradientOrb 
        color={colorName} 
        size="md" 
        className="absolute inset-0 opacity-0 group-hover:opacity-30 transition-opacity duration-500 z-0" 
      />

      <div className="relative z-10 flex flex-col h-full">
        <Icon icon="solar:quote-left-linear" width={24} className="text-slate-300 mb-6" />
        <p className="text-sm font-normal leading-relaxed text-[var(--color-text-secondary)] grow mb-8">{quote}</p>
        <div className="flex items-center gap-4">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={avatar}
            alt={name}
            className="w-10 h-10 rounded-full object-cover grayscale opacity-90"
          />
          <div>
            <h4 className="text-xs font-medium text-[var(--color-text-primary)]">{name}</h4>
            <span className="text-[10px] text-[var(--color-text-secondary)]">{title}</span>
          </div>
        </div>
      </div>
    </GlassPanel>
  );
}

// Testimonials Section
function TestimonialSection() {
  const [testimonials, setTestimonials] = useState<TestimonialCardData[]>(FALLBACK_TESTIMONIALS);
  const marqueeItems = [...testimonials, ...testimonials];

  useEffect(() => {
    const controller = new AbortController();

    const loadPublicTestimonials = async () => {
      try {
        const params = new URLSearchParams({
          page: "1",
          limit: "3",
        });

        const response = await fetch(`${TESTIMONIALS_API_URL}?${params.toString()}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          cache: "no-store",
          signal: controller.signal,
        });

        if (!response.ok) return;

        const payload = (await response.json()) as PublicTestimonialsApiResponse;
        if (!payload.success) return;

        const mapped = mapPublicTestimonials(payload.data?.testimonials ?? []);
        if (mapped.length > 0) {
          setTestimonials(mapped);
        }
      } catch {
        // Keep fallback testimonials when API is unavailable
      }
    };

    loadPublicTestimonials();

    return () => controller.abort();
  }, []);

  return (
    <section className="w-full max-w-7xl px-4 md:px-8 lg:px-12 pt-8 md:pt-12 pb-24 md:pb-32 mx-auto">
      <SectionHeading
        label="Testimonials"
        title="Trusted by leading teams."
        align="center"
        size="lg"
        className="mb-10 md:mb-16"
      />

      <div className="testimonials-marquee relative -mx-2 sm:mx-0 overflow-hidden" style={marqueeMaskStyle}>
        <div className="testimonials-track flex w-max items-stretch gap-4 md:gap-6 py-2 px-2 sm:px-0">
          {marqueeItems.map((testimonial, idx) => (
            <div
              key={`${testimonial.name}-${idx}`}
              className="w-[86vw] max-w-104 sm:w-96 md:w-100 shrink-0"
              aria-hidden={idx >= testimonials.length ? true : undefined}
            >
              <TestimonialCard {...testimonial} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Global Styles
function GlobalStyles() {
  return (
    <style>{`
      @keyframes blob-spin {
        0% { transform: rotate(0deg) scale(1); }
        50% { transform: rotate(180deg) scale(1.1); }
        100% { transform: rotate(360deg) scale(1); }
      }

      @keyframes blob-morph {
        0% { border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%; background-position: 0% 50%; }
        50% { border-radius: 30% 60% 70% 40% / 50% 60% 30% 60%; background-position: 100% 50%; }
        100% { border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%; background-position: 0% 50%; }
      }

      @keyframes float-slow {
        0%, 100% { transform: translateY(0); }
        50% { transform: translateY(-10px); }
      }

      .animate-fluid-blob {
        animation: blob-morph 12s ease-in-out infinite alternate, blob-spin 24s linear infinite;
      }

      .animate-float {
        animation: float-slow 6s ease-in-out infinite;
      }

      @keyframes testimonials-scroll {
        0% { transform: translateX(0); }
        100% { transform: translateX(-50%); }
      }

      .testimonials-track {
        will-change: transform;
        animation: testimonials-scroll 28s linear infinite;
      }

      .testimonials-marquee:hover .testimonials-track {
        animation-play-state: paused;
      }

      @media (max-width: 767px) {
        .testimonials-track {
          animation-duration: 22s;
        }
      }

      @media (prefers-reduced-motion: reduce) {
        .testimonials-track {
          animation: none;
          transform: none;
        }
      }

      .no-scrollbar::-webkit-scrollbar {
        display: none;
      }
      
      .no-scrollbar {
        -ms-overflow-style: none;
        scrollbar-width: none;
      }
    `}</style>
  );
}

// Main Component
export function DesignInspirationSection() {
  return (
    <section className="flex flex-col items-center text-(--foreground) overflow-x-hidden">
      <GlobalStyles />
      <TestimonialSection />
    </section>
  );
}