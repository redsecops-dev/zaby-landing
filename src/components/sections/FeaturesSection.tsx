"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  Layers,
  Package,
} from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { PreviewModal } from "@/components/shared/PreviewModal";

function wrapWordsForGSAP(node: ChildNode) {
  if (node.nodeType === Node.TEXT_NODE) {
    const text = node.nodeValue ?? "";
    if (!text.trim()) return;
    const words = text.split(/(\s+)/);
    const fragment = document.createDocumentFragment();
    words.forEach((word) => {
      if (word.trim() === "") {
        fragment.appendChild(document.createTextNode(word));
      } else {
        const wrapper = document.createElement("span");
        wrapper.style.display = "inline-block";
        wrapper.style.overflow = "hidden";
        wrapper.style.verticalAlign = "bottom";
        wrapper.style.lineHeight = "1.1";
        const inner = document.createElement("span");
        inner.style.display = "inline-block";
        inner.style.transform = "translateY(110%)";
        inner.className = "gsap-word";
        inner.textContent = word;
        wrapper.appendChild(inner);
        fragment.appendChild(wrapper);
      }
    });
    node.parentNode?.replaceChild(fragment, node);
  } else if (
    node.nodeType === Node.ELEMENT_NODE &&
    (node as Element).tagName !== "BR" &&
    !(node as Element).classList.contains("gsap-word")
  ) {
    Array.from(node.childNodes).forEach(wrapWordsForGSAP);
  }
}

export function FeaturesSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [selectedCard, setSelectedCard] = useState<number | null>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      const revealEls =
        sectionRef.current?.querySelectorAll(".reveal-text") ?? [];
      revealEls.forEach((el) => {
        Array.from(el.childNodes).forEach(wrapWordsForGSAP);
        gsap.to(el.querySelectorAll(".gsap-word"), {
          y: "0%",
          duration: 0.8,
          ease: "power4.out",
          stagger: 0.04,
          scrollTrigger: {
            trigger: el,
            start: "top 95%",
            toggleActions: "play none none reverse",
          },
        });
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="min-h-screen flex items-center justify-center p-4 md:p-8 lg:p-12 text-slate-900 overflow-x-hidden"
    >
        <main className="w-full max-w-7xl bg-white/40 backdrop-blur-3xl rounded-[2.5rem] border border-white/60 shadow-[0_8px_40px_rgb(0,0,0,0.04)] p-4 md:p-6 lg:p-8">
        <div className="grid grid-cols-12 gap-4 lg:gap-5">

          {/* Card 1: UI Stack — col-span-3 row-span-2 */}
          <div className="col-span-12 lg:col-span-3 lg:row-span-2 h-full rounded-2xl bg-linear-to-br from-[#EAE2F8]/80 via-white/40 to-[#FADDF0]/60 p-px group cursor-pointer shadow-[0_1px_2px_0_rgb(0,0,0,0.05)] transition-all duration-300 hover:shadow-[0_10px_15px_-3px_rgb(0,0,0,0.1),0_4px_6px_-4px_rgb(0,0,0,0.1)]" onClick={() => setSelectedCard(1)}>
            <div className="bg-white rounded-[15px] overflow-hidden relative flex flex-col h-full w-full">
              <div className="flex-1 bg-linear-to-br from-[#EAE2F8] to-[#F3E8FF] p-6 relative overflow-hidden">
                <div className="flex items-center justify-between mb-8 relative z-10">
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded-full bg-slate-900" />
                    <span className="text-xs font-medium tracking-tight">Zaby</span>
                  </div>
                  <div className="flex gap-3 text-xs text-slate-500 font-medium">
                    <span>Overview</span>
                    <span>Plans</span>
                  </div>
                </div>
                <div className="relative z-10 max-w-[85%]">
                  <h2 className="reveal-text text-2xl font-medium tracking-tight leading-tight mb-2">
                    Deploy AI that executes, not just responds.
                  </h2>
                  <p className="reveal-text text-xs text-slate-500 mb-6 mt-2">
                    Autonomous agents operate continuously, completing real tasks across your entire business.
                  </p>
                  <Link href="https://platform.zaby.io/tenant/signup" className="cursor-pointer bg-(--color-button-primary-bg) text-white text-xs px-4 py-3.5 rounded-full font-medium hover:bg-(--color-button-primary-hover) transition-colors inline-block">
                    Get Started
                  </Link>
                </div>
                <div className="absolute -bottom-12 -right-12 w-48 h-48 rounded-full border-16 border-slate-900 opacity-90 group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute -top-12 -right-4 w-32 h-32 rounded-full border-12 border-slate-900 opacity-90 group-hover:scale-105 transition-transform duration-500 delay-75" />
              </div>
              <div className="h-32 relative border-t border-slate-100 p-6 flex flex-col justify-end overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/e534354d-c5f2-4399-a1d9-2f50338e8c47_1600w.jpg"
                  className="absolute inset-0 w-full h-full object-cover opacity-20 transition-transform duration-700 group-hover:scale-110"
                  alt="Abstract gradient background"
                />
                <div className="absolute inset-0 bg-linear-to-t from-white/90 to-transparent" />
                <div className="absolute bottom-0 right-0 w-32 h-32 bg-accent rounded-tl-full opacity-60 blur-2xl translate-x-1/2 translate-y-1/2" />
                <span className="reveal-text text-lg font-medium tracking-tight relative z-10">
                  Scale operations.
                </span>
              </div>
            </div>
          </div>

          {/* Card 2: Intro — col-span-3 */}
          <div className="col-span-12 md:col-span-6 lg:col-span-3 h-full rounded-2xl bg-linear-to-br from-[#E0F2FE]/80 via-slate-100/50 to-[#FCE7F3]/80 p-px group cursor-pointer shadow-[0_1px_2px_0_rgb(0,0,0,0.05)] transition-shadow hover:shadow-[0_4px_6px_-1px_rgb(0,0,0,0.1),0_2px_4px_-2px_rgb(0,0,0,0.1)]" onClick={() => setSelectedCard(2)}>
            <div className="bg-white rounded-[15px] overflow-hidden relative p-6 flex flex-col justify-between h-full min-h-55">
              <div className="absolute inset-0 bg-linear-to-br from-[#E0F2FE] via-[#F3E8FF] to-[#FCE7F3] opacity-40" />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/eca707cc-a5b7-439a-b4fd-247f6106c2e1_1600w.jpg"
                className="absolute -top-10 -right-10 w-40 h-40 rounded-full object-cover shadow-[0_25px_50px_-12px_rgb(0,0,0,0.25)] border-[6px] border-white/40 opacity-90 transition-transform duration-500 hover:scale-105"
                alt="Profile headshot"
              />
              <div className="flex justify-between items-start text-xs font-medium text-slate-500 relative z-10 mb-8">
                <span>@zabyai</span>
                <div className="flex gap-3 pr-16">
                  <span>Bio</span>
                </div>
              </div>
              <div className="relative z-10">
                <p className="reveal-text text-lg font-normal tracking-tight leading-snug">
                  Built for{" "}
                  <span className="font-medium">operational teams</span>,
                  <br />
                  AI workforce infrastructure
                  <br />
                  for the future of business.
                </p>
              </div>
              <div className="flex justify-between items-end text-xs text-slate-400 mt-6 relative z-10">
                <span>Execution-ready</span>
                <div className="flex gap-2">
                  <span>Docs</span>
                  <span>API</span>
                </div>
              </div>
            </div>
          </div>

          {/* Card 3: 3D Image — col-span-2 */}
          <div className="col-span-12 md:col-span-6 lg:col-span-2 h-full rounded-2xl bg-linear-to-tr from-slate-200/80 to-slate-100/40 p-px group cursor-pointer shadow-[0_1px_2px_0_rgb(0,0,0,0.05)] transition-shadow hover:shadow-[0_4px_6px_-1px_rgb(0,0,0,0.1),0_2px_4px_-2px_rgb(0,0,0,0.1)]" onClick={() => setSelectedCard(3)}>
            <div className="bg-[#F8F9FA] rounded-[15px] overflow-hidden relative h-full min-h-55 flex items-center justify-center">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/fb6415fd-bf4d-4ccf-8e9d-7ab445e99207_1600w.jpg"
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                alt="Isometric 3D architecture"
              />
              <div className="absolute inset-0 bg-linear-to-t from-slate-900/30 to-transparent transition-opacity duration-500 opacity-60 group-hover:opacity-40" />
            </div>
          </div>

          {/* Card 4: Hero Gradient — col-span-4 row-span-2 */}
          <div className="col-span-12 lg:col-span-4 lg:row-span-2 h-full rounded-2xl bg-linear-to-br from-[#FEBED9]/70 via-slate-200/40 to-[#8B5CF6]/50 p-px group cursor-pointer shadow-[0_1px_2px_0_rgb(0,0,0,0.05)] transition-shadow hover:shadow-[0_10px_15px_-3px_rgb(0,0,0,0.1),0_4px_6px_-4px_rgb(0,0,0,0.1)]" onClick={() => setSelectedCard(4)}>
            <div className="bg-white rounded-[15px] overflow-hidden relative p-8 flex flex-col justify-between h-full min-h-115">
              <div className="flex justify-between items-center text-xs font-medium text-slate-500 relative z-20">
                <div className="flex items-center gap-1 text-slate-900">
                  <div className="w-2.5 h-2.5 rounded-full bg-slate-900" />
                  <span>Library</span>
                </div>
                <div className="flex gap-4">
                  <span className="hidden sm:inline">Modules</span>
                  <span className="hidden sm:inline">Layouts</span>
                  <span className="text-slate-900">Premium</span>
                </div>
              </div>
              <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/4734259a-bad7-422f-981e-ce01e79184f2_1600w.jpg"
                  className="w-full h-full object-cover opacity-60 transition-transform duration-1000 group-hover:scale-105 mix-blend-multiply"
                  alt="Abstract gradient hills background"
                />
                <div className="absolute inset-0 bg-linear-to-b from-white/30 to-white/60 backdrop-blur-[2px]" />
              </div>
              <div className="relative z-10 flex flex-col items-center text-center mt-12 mb-8">
                <h1 className="reveal-text text-4xl sm:text-5xl font-medium tracking-tight leading-[1.1] text-slate-900 mb-4 max-w-70">
                  Operational AI Infrastructure
                </h1>
                <p className="reveal-text text-xs text-slate-600 mb-6 max-w-50 mt-2">
                  Get early access to Zaby platform updates.
                </p>
                <div className="flex w-full max-w-65 bg-white/70 backdrop-blur-md rounded-full border border-slate-300/80 p-1 shadow-[0_1px_2px_0_rgb(0,0,0,0.05)] transition-all focus-within:border-slate-400 focus-within:shadow-[0_4px_6px_-1px_rgb(0,0,0,0.1),0_2px_4px_-2px_rgb(0,0,0,0.1)]">
                  <input
                    type="email"
                    placeholder="Email address"
                    className="flex-1 cursor-text bg-transparent px-3 text-sm outline-none placeholder:text-slate-400 font-medium"
                  />
                  <button className="cursor-pointer bg-(--color-button-primary-bg) text-white text-xs px-4 py-3.5 rounded-full font-medium hover:bg-(--color-button-primary-hover) transition-colors flex items-center gap-1">
                    Join{" "}
                    <ArrowRight size={14} strokeWidth={1.5} />
                  </button>
                </div>
              </div>
              <div className="relative z-10 flex justify-between items-end text-[10px] text-slate-500 uppercase tracking-wider mt-auto pt-8 border-t border-slate-900/10">
                <div>
                  <span className="block mb-1">Latest Update</span>
                  <span className="text-slate-900 font-medium normal-case tracking-normal text-xs">
                    Agent Squad v2
                  </span>
                </div>
                <div className="text-right">
                  <span className="block mb-1">Date</span>
                  <span className="text-slate-900 font-medium normal-case tracking-normal text-xs">
                    May 2026
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Card 5: Core Text — col-span-3 */}
          <div className="col-span-12 md:col-span-6 lg:col-span-3 h-full rounded-2xl bg-linear-to-br from-slate-200/80 to-slate-100/30 p-px group cursor-pointer shadow-[0_1px_2px_0_rgb(0,0,0,0.05)] transition-shadow hover:shadow-[0_4px_6px_-1px_rgb(0,0,0,0.1),0_2px_4px_-2px_rgb(0,0,0,0.1)]" onClick={() => setSelectedCard(5)}>
            <div className="bg-white rounded-[15px] p-6 flex flex-col justify-between h-full relative">
              <div className="flex justify-between items-start text-xs text-slate-400 mb-8">
                <span>Capability</span>
                <span>01</span>
              </div>
              <div>
                <h3 className="reveal-text text-xl font-medium tracking-tight mb-2">
                  Execution First.
                </h3>
                <p className="reveal-text text-sm text-slate-500 font-normal leading-relaxed mt-2">
                  AI agents that execute tasks, interact with software, and operate continuously inside your business environment.
                </p>
              </div>
            </div>
          </div>

          {/* Card 6: Typography — col-span-2 */}
          <div className="col-span-12 md:col-span-6 lg:col-span-2 h-full rounded-2xl bg-linear-to-br from-slate-200/80 to-slate-100/30 p-px group cursor-pointer shadow-[0_1px_2px_0_rgb(0,0,0,0.05)] transition-shadow hover:shadow-[0_4px_6px_-1px_rgb(0,0,0,0.1),0_2px_4px_-2px_rgb(0,0,0,0.1)]" onClick={() => setSelectedCard(6)}>
            <div className="bg-white rounded-[15px] p-6 flex flex-col justify-center items-center relative overflow-hidden h-full">
              <div className="absolute inset-0 bg-slate-50 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <h3 className="reveal-text text-3xl font-medium tracking-tight text-slate-900 relative z-10 leading-none text-center">
                Manrope
              </h3>
              <div className="w-full flex justify-between mt-8 text-[10px] text-slate-400 uppercase tracking-wider relative z-10 border-t border-slate-100 pt-3">
                <div className="flex flex-col">
                  <span>Weights</span>
                  <span className="text-slate-900 font-medium normal-case text-xs">7</span>
                </div>
                <div className="flex flex-col text-right">
                  <span>Style</span>
                  <span className="text-slate-900 font-medium normal-case text-xs">Sans</span>
                </div>
              </div>
            </div>
          </div>

          {/* Card 7: Palette — col-span-3 */}
          <div className="col-span-12 md:col-span-6 lg:col-span-3 h-full rounded-2xl bg-linear-to-br from-accent/60 to-[#f0abfc]/60 p-px group cursor-pointer shadow-[0_1px_2px_0_rgb(0,0,0,0.05)] transition-shadow hover:shadow-[0_4px_6px_-1px_rgb(0,0,0,0.1),0_2px_4px_-2px_rgb(0,0,0,0.1)]" onClick={() => setSelectedCard(7)}>
            <div className="bg-white rounded-[15px] overflow-hidden relative flex flex-col h-40 w-full">
              <div className="flex-1 bg-[#F3EDE1] p-4 flex items-start">
                <span className="text-xs font-medium text-slate-900">#F3EDE1</span>
              </div>
              <div className="flex-1 bg-accent" />
              <div className="flex-1 bg-[#d946ef]" />
              <div className="flex-1 bg-[#FEBED9]" />
            </div>
          </div>

          {/* Card 8: Discover — col-span-5 */}
          <div className="col-span-12 lg:col-span-5 h-full rounded-2xl bg-linear-to-br from-slate-200/80 to-slate-100/30 p-px group cursor-pointer shadow-[0_1px_2px_0_rgb(0,0,0,0.05)] transition-shadow hover:shadow-[0_4px_6px_-1px_rgb(0,0,0,0.1),0_2px_4px_-2px_rgb(0,0,0,0.1)]" onClick={() => setSelectedCard(8)}>
            <div className="bg-white rounded-[15px] p-8 flex flex-col items-center justify-center text-center h-full w-full relative">
              <div className="flex items-center gap-2 mb-6">
                <Layers size={20} strokeWidth={1.5} className="text-slate-900" />
                <span className="text-xs font-medium tracking-tight">Showcase</span>
              </div>
              <h2 className="reveal-text text-2xl sm:text-3xl font-medium tracking-tight mb-3">
                Five layers. One execution platform.
              </h2>
              <p className="reveal-text text-sm text-slate-500 mb-6 mt-2">
                Agent Squad, Open Agents, Workflows, Memory, and AI Workspace — built for enterprise operations.
              </p>
              <button className="cursor-pointer bg-(--color-button-primary-bg) text-white text-xs px-5 py-3.5 rounded-full font-medium hover:bg-(--color-button-primary-hover) transition-colors flex items-center gap-2 mt-2">
                Explore platform{" "}
                <ArrowUpRight size={14} strokeWidth={1.5} />
              </button>
            </div>
          </div>

          {/* Card 9: Logo — col-span-4 */}
          <div className="col-span-12 lg:col-span-4 h-full rounded-2xl bg-linear-to-br from-slate-200/80 to-slate-100/30 p-px group cursor-pointer shadow-[0_1px_2px_0_rgb(0,0,0,0.05)] transition-shadow hover:shadow-[0_4px_6px_-1px_rgb(0,0,0,0.1),0_2px_4px_-2px_rgb(0,0,0,0.1)]" onClick={() => setSelectedCard(9)}>
            <div className="bg-white rounded-[15px] p-8 flex items-center justify-center h-full w-full relative">
              <div className="flex items-center gap-3 transition-transform duration-300 group-hover:scale-105">
                <Package size={32} strokeWidth={1.5} className="text-slate-900" />
                <span className="text-2xl font-medium tracking-tighter text-slate-900">
                  Zaby
                </span>
              </div>
            </div>
          </div>

        </div>
      </main>

      <PreviewModal
        isOpen={selectedCard !== null}
        onClose={() => setSelectedCard(null)}
      />
    </section>
  );
}
