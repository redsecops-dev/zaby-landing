"use client";

import React, { useEffect, useRef } from "react";
import { Icon } from "@iconify/react";

// ─── Data ────────────────────────────────────────────────────────────────────

interface SectionData {
  id: number;
  title: string;
  description: string;
  image: string;
  action: string;
  hasArrow: boolean;
}

const SECTIONS_DATA: SectionData[] = [
  {
    id: 1,
    title: "Hiring Workspace",
    description:
      "AI-powered recruitment operations — candidate screening, automated assessments, and interview coordination in one place.",
    image:
      "https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/724142aa-44a6-48d3-9cf3-761e00d05b78_1600w.jpg",
    action: "Explore",
    hasArrow: true,
  },
  {
    id: 2,
    title: "Support Operations",
    description:
      "Intelligent support infrastructure — AI-assisted ticket management, escalation workflows, and triage automation at scale.",
    image:
      "https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/005600e5-f6ab-4e59-bc86-eaeb02797dfa_1600w.jpg",
    action: "Explore",
    hasArrow: true,
  },
  {
    id: 3,
    title: "Content Studio",
    description:
      "Coming soon — AI-native content pipelines with generation workflows, team collaboration, and multi-stage review systems.",
    image:
      "https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/fb6415fd-bf4d-4ccf-8e9d-7ab445e99207_1600w.jpg",
    action: "Register your interest to be among the first to be informed",
    hasArrow: false,
  },
  {
    id: 4,
    title: "Assessment Platform",
    description:
      "Coming soon — Enterprise evaluation systems with automated scoring, adaptive assessments, and workflow automation.",
    image:
      "https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/5ee0a38a-b5d3-4531-8793-98beed4af162_1600w.jpg",
    action: "Register your interest to be among the first to be informed",
    hasArrow: false,
  },
];

// ─── ArchitectureSection ─────────────────────────────────────────────────────

function ArchitectureSection({ section }: { section: SectionData }) {
  return (
    <section className="col-section group relative flex-1 h-[70vh] lg:h-dvh overflow-hidden cursor-pointer">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center transition-transform duration-2000 ease-out group-hover:scale-105"
        style={{ backgroundImage: `url('${section.image}')` }}
      />

      {/* Adaptive Gradient Mask */}
      <div className="absolute top-0 left-0 w-full h-[70%] bg-linear-to-b from-black via-black/90 to-transparent transition-colors duration-700 pointer-events-none" />

      {/* Gradient Border Separator */}
      <div className="absolute right-0 top-0 bottom-0 w-px bg-linear-to-b from-transparent via-white/10 to-transparent hidden lg:block z-20 transition-colors duration-700" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-white/10 to-transparent lg:hidden z-20 transition-colors duration-700" />

      {/* Content */}
      <div className="relative z-10 p-8 lg:p-12 xl:p-16 h-full flex flex-col pt-16 lg:pt-24">
        <div className="content-wrapper">
          <h2 className="reveal-text text-3xl lg:text-4xl font-extralight tracking-tight text-white mb-6 transition-colors duration-700">
            {section.title}
          </h2>
          <p className="reveal-text text-sm font-extralight text-zinc-300 leading-relaxed max-w-[85%] transition-colors duration-700">
            {section.description}
          </p>
        </div>

        <div className="mt-auto pb-4 lg:pb-12 content-wrapper">
          <div className="relative w-full pt-4 flex items-center justify-between group/btn">
            <div className="absolute top-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-white/20 to-transparent group-hover:via-white transition-all duration-500" />
            {section.hasArrow ? (
              <>
                <span className="text-[10px] tracking-widest uppercase text-white font-normal group-hover/btn:opacity-70 transition-all duration-700">
                  {section.action}
                </span>
                <Icon
                  icon="solar:arrow-right-linear"
                  className="text-white text-lg opacity-0 -translate-x-4 transition-all duration-300 group-hover/btn:opacity-100 group-hover/btn:translate-x-0"
                  width={18}
                  height={18}
                />
              </>
            ) : (
              <p className="text-[10px] tracking-widest uppercase text-white font-normal leading-relaxed group-hover/btn:opacity-70 transition-all duration-700">
                {section.action}
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── AnimationsManager ───────────────────────────────────────────────────────

function AnimationsManager({ scopeRef }: { scopeRef: React.RefObject<HTMLElement | null> }) {
  useEffect(() => {
    const initAnimations = async () => {
      try {
        const { gsap } = await import("gsap");
        const { ScrollTrigger } = await import("gsap/ScrollTrigger");

        gsap.registerPlugin(ScrollTrigger);

        const root = scopeRef.current;
        if (!root) return;

        // Prepare masked reveal text — scoped to this section only
        root.querySelectorAll<HTMLElement>(".reveal-text").forEach((el) => {
          const text = el.innerText.trim();
          const words = text.split(/\s+/);
          el.innerHTML = "";

          words.forEach((word) => {
            const wrapper = document.createElement("span");
            wrapper.className = "inline-block overflow-hidden align-top";

            const inner = document.createElement("span");
            inner.className = "fws-reveal-word inline-block";
            inner.style.transform = "translateY(110%)";
            inner.innerHTML = word + "&nbsp;";

            wrapper.appendChild(inner);
            el.appendChild(wrapper);
          });
        });

        if (document.fonts) {
          await document.fonts.ready;
        }

        const ctx = gsap.context(() => {
          const tl = gsap.timeline();

          tl.from(".col-section", {
            duration: 1.2,
            y: window.innerHeight * 0.05,
            opacity: 0,
            stagger: 0.1,
            ease: "power3.out",
            clearProps: "all",
          });

          tl.from(
            ".content-wrapper",
            {
              duration: 1,
              opacity: 0,
              stagger: 0.05,
              ease: "power2.out",
            },
            "-=0.8"
          );

          gsap.utils.toArray<HTMLElement>(".col-section").forEach((section) => {
            const words = section.querySelectorAll(".fws-reveal-word");

            gsap.to(words, {
              y: "0%",
              duration: 0.8,
              stagger: 0.015,
              ease: "power3.out",
              scrollTrigger: {
                trigger: section,
                start: "top 85%",
                toggleActions: "play none none reverse",
              },
            });
          });
        }, root);

        return () => ctx.revert();
      } catch {
        // Animations not critical — fail silently
      }
    };

    const cleanup = initAnimations();
    return () => {
      cleanup.then((fn) => fn?.());
    };
  }, [scopeRef]);

  return null;
}

// ─── Main Section Export ─────────────────────────────────────────────────────

export function FutureWorkspacesSection() {
  const sectionRef = useRef<HTMLElement>(null);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-x-hidden selection:bg-white/30 selection:text-black min-h-screen"
    >
      <AnimationsManager scopeRef={sectionRef} />

      <main className="relative z-10 w-full min-h-dvh flex flex-col lg:flex-row">
        {SECTIONS_DATA.map((section) => (
          <ArchitectureSection key={section.id} section={section} />
        ))}
      </main>
    </section>
  );
}
