"use client";

import { useEffect, useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { Icon } from "@iconify/react";
import HeroHologram from "./HeroHologram";
// Corner dot marker used at cell intersections
function CornerDot() {
  return (
    <div className="absolute -left-[2px] -top-[2px] w-[3px] h-[3px] bg-slate-100 border border-slate-300 z-20 box-content" />
  );
}

const cellBorder: React.CSSProperties = {
  borderRight: "1px solid rgba(226, 232, 240, 0.8)",
  borderBottom: "1px solid rgba(226, 232, 240, 0.8)",
};

export default function Capabilities() {
  const rootRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const section = rootRef.current;
    if (!section) return;

    let cleanup: (() => void) | undefined;
    let rafId = 0;

    const init = async () => {
      const [{ gsap }, { ScrollTrigger }] = await Promise.all([
        import("gsap"),
        import("gsap/ScrollTrigger"),
      ]);

      if (!rootRef.current) return;

      gsap.registerPlugin(ScrollTrigger);

      const modalScroller = section.closest(
        "[data-preview-scroller='true']",
      ) as HTMLElement | null;
      const isInModal = Boolean(modalScroller);

      const ctx = gsap.context(() => {
        const words = section.querySelectorAll<HTMLElement>(".cap-reveal-word");

        if (words.length > 0) {
          gsap.set(words, { y: "110%", opacity: 0 });

          if (isInModal) {
            gsap.to(words, {
              y: "0%",
              opacity: 1,
              duration: 1.1,
              stagger: 0.08,
              ease: "power4.out",
              delay: 0.15,
            });
          } else {
            gsap.to(words, {
              y: "0%",
              opacity: 1,
              duration: 1.2,
              stagger: 0.1,
              ease: "power4.out",
              scrollTrigger: {
                trigger: section.querySelector("[data-cap-heading]"),
                scroller: modalScroller ?? undefined,
                start: "top 85%",
                toggleActions: "play none none reverse",
              },
            });
          }
        }

        const cells = section.querySelectorAll<HTMLElement>("[data-cap-cell]");

        if (isInModal) {
          gsap.fromTo(
            cells,
            { opacity: 0, y: 16 },
            {
              opacity: 1,
              y: 0,
              duration: 0.6,
              stagger: 0.07,
              ease: "power3.out",
              delay: 0.3,
            },
          );
        } else {
          gsap.fromTo(
            cells,
            { opacity: 0, y: 24 },
            {
              opacity: 1,
              y: 0,
              duration: 0.7,
              stagger: 0.08,
              ease: "power3.out",
              scrollTrigger: {
                trigger: section.querySelector("[data-cap-grid]"),
                scroller: modalScroller ?? undefined,
                start: "top 88%",
                toggleActions: "play none none none",
              },
            },
          );
        }

        ScrollTrigger.refresh();
      }, section);

      cleanup = () => ctx.revert();
    };

    rafId = window.requestAnimationFrame(() => {
      void init();
    });

    return () => {
      window.cancelAnimationFrame(rafId);
      cleanup?.();
    };
  }, []);

  return (
    <section
      ref={rootRef}
      className="relative overflow-x-hidden text-slate-900 antialiased"
    >
      <div className="relative mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
        {/* Background grid */}
      

        {/* Header */}
        <div className="relative z-10 mb-12 flex flex-col items-center text-center">
          {/* <div className="mb-4 flex items-center gap-3">
            <span className="text-[10px] font-medium uppercase tracking-[0.25em] text-blue-600">{"///"}</span>
            <span className="text-[10px] font-medium uppercase tracking-[0.25em] text-blue-600">Next-Gen Infra</span>
            <span className="text-[10px] font-medium uppercase tracking-[0.25em] text-blue-600">{"///"}</span>
          </div> */}

          <h2
            data-cap-heading
            className="flex flex-col items-center gap-1.5 text-2xl font-normal leading-tight tracking-tight text-slate-900 sm:text-3xl md:text-4xl"
          >
            <span className="flex flex-wrap justify-center gap-x-2">
              {["Architecture"].map((w) => (
                <span key={w} className="inline-flex overflow-hidden pb-[0.08em]">
                  <span className="cap-reveal-word block">{w}</span>
                </span>
              ))}
            </span>
            <span className="flex flex-wrap justify-center gap-x-2">
              {["engineered", "for", "scale."].map((w) => (
                <span key={w} className="inline-flex overflow-hidden pb-[0.08em]">
                  <span className="cap-reveal-word block">{w}</span>
                </span>
              ))}
            </span>
          </h2>
        </div>

        {/* Bento grid */}
        <div
          data-cap-grid
          className="relative z-10 grid grid-cols-1 bg-white/60 backdrop-blur-md shadow-[0_20px_50px_rgba(0,0,0,0.02)] border border-slate-200/60 rounded-2xl overflow-hidden lg:grid-cols-3"
          style={{
            borderTop: "1px solid rgba(226, 232, 240, 0.8)",
            borderLeft: "1px solid rgba(226, 232, 240, 0.8)",
          }}
        >
          {/* Cell 1 */}
          <div data-cap-cell className="group relative h-52 overflow-hidden p-6 bg-white/70 hover:bg-white/95 transition-all duration-500" style={cellBorder}>
            <img
              src="https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/5ee0a38a-b5d3-4531-8793-98beed4af162_1600w.jpg"
              alt=""
              aria-hidden="true"
              className="absolute inset-0 h-full w-full object-cover opacity-[0.05] transition-transform duration-1000 group-hover:scale-110"
              style={{
                maskImage: "radial-gradient(circle at right bottom, black, transparent 70%)",
                WebkitMaskImage: "radial-gradient(circle at right bottom, black, transparent 70%)",
              }}
            />
            <CornerDot />
            <h3 className="relative z-10 mb-1.5 text-xs font-semibold tracking-tight text-slate-900">Global distribution</h3>
            <p className="relative z-10 max-w-[85%] text-[11px] leading-relaxed text-slate-500 font-light">
              Information resides across multiple availability zones automatically. Nothing is centralized.
            </p>
            <div className="absolute bottom-4 right-4 z-10 text-purple-500/10 group-hover:text-purple-500/20 transition-all duration-700 group-hover:scale-105">
              <svg width="52" height="52" viewBox="0 0 100 100" fill="none" aria-hidden="true">
                <path d="M10,40 L50,60 L50,90 L10,70 Z" fill="currentColor" stroke="currentColor" strokeWidth="0.5" />
                <path d="M90,40 L90,70 L50,90 L50,60 Z" fill="currentColor" stroke="currentColor" strokeWidth="0.5" />
                <path d="M50,20 L90,40 L50,60 L10,40 Z" fill="currentColor" stroke="currentColor" strokeWidth="0.5" />
              </svg>
            </div>
          </div>

          {/* Cell 2: Central cube (row-span-2) */}
          <div data-cap-cell className="relative flex h-72 flex-col items-center justify-center overflow-hidden p-6 lg:row-span-2 lg:h-auto bg-slate-50/20 hover:bg-slate-50/40 transition-all duration-500" style={cellBorder}>
            <div className="absolute inset-0 z-10">
              {/* <Canvas camera={{ position: [0, 0.15, 8], fov: 42 }} dpr={[1, 2]}>
                <HeroHologram />
                <OrbitControls
                  target={[0, -0.1, 0]}
                  enableZoom={false}
                enablePan={false}
                  minPolarAngle={Math.PI / 2.4}
                  maxPolarAngle={Math.PI / 1.7}
                />
              </Canvas> */}
            </div>
            <CornerDot />
            <div className="pointer-events-none absolute inset-0 z-0 flex items-center justify-center opacity-25">
              <svg width="280" height="280" viewBox="0 0 100 100" aria-hidden="true" className="animate-[spin_60s_linear_infinite]">
                <circle cx="50" cy="50" r="20" fill="none" stroke="#d946ef" strokeWidth="0.2" strokeDasharray="1 2" />
                <circle cx="50" cy="50" r="30" fill="none" stroke="#d946ef" strokeWidth="0.2" strokeDasharray="1 3" />
                <circle cx="50" cy="50" r="40" fill="none" stroke="#d946ef" strokeWidth="0.2" strokeDasharray="2 4" />
                <circle cx="50" cy="50" r="55" fill="none" stroke="#d946ef" strokeWidth="0.1" strokeDasharray="1 5" />
              </svg>
            </div>
            <div className="relative z-10 flex h-40 w-40 items-center justify-center" style={{ animation: "pulse 4s ease-in-out infinite" }}>
              <div className="absolute inset-0 scale-150 rounded-full bg-purple-500/20 blur-[50px] mix-blend-screen" />
              <svg viewBox="0 0 100 100" className="h-full w-full drop-shadow-[0_0_15px_rgba(232,121,249,0.5)] transition-transform duration-1000 hover:scale-105" aria-hidden="true">
                <defs>
                  <linearGradient id="cap-topFace" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#f5d0fe" />
                    <stop offset="100%" stopColor="#e879f9" />
                  </linearGradient>
                  <linearGradient id="cap-leftFace" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#f5d0fe" />
                    <stop offset="100%" stopColor="#d946ef" />
                  </linearGradient>
                  <linearGradient id="cap-rightFace" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#e879f9" />
                    <stop offset="100%" stopColor="#c026d3" />
                  </linearGradient>
                </defs>
                <polygon points="50,20 90,40 50,60 10,40" fill="url(#cap-topFace)" stroke="#f5d0fe" strokeWidth="0.5" strokeLinejoin="round" />
                <polygon points="10,40 50,60 50,90 10,70" fill="url(#cap-leftFace)" stroke="#f5d0fe" strokeWidth="0.5" strokeLinejoin="round" />
                <polygon points="90,40 90,70 50,90 50,60" fill="url(#cap-rightFace)" stroke="#d946ef" strokeWidth="0.5" strokeLinejoin="round" />
              </svg>
            </div>
          </div>

          {/* Cell 3: Cryptographic security */}
          <div data-cap-cell className="group relative h-52 overflow-hidden p-6 bg-white/70 hover:bg-white/95 transition-all duration-500" style={cellBorder}>
            <CornerDot />
            <h3 className="relative z-10 mb-1.5 text-xs font-semibold tracking-tight text-slate-900">Zero-Trust Cryptographic Security</h3>
            <p className="relative z-10 max-w-[85%] text-[11px] leading-relaxed text-slate-500 font-light">
             Engineered with military-grade encryption and isolated access architecture, Digital Squad ensures your assets remain private, protected, and completely inaccessible to unauthorized entities — including platform operators.
            </p>
            <div className="absolute left-1/2 top-40 z-10 w-max -translate-x-1/2">
              <div className="flex items-center gap-2 rounded-full border border-purple-100 bg-white/90 px-3 py-1.5 shadow-sm backdrop-blur-md">
                <span className="flex h-1.5 w-1.5 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-purple-500"></span>
                </span>
                <Icon icon="solar:lock-password-linear" className="text-xs text-purple-500" />
                <span className="text-[10px] font-semibold uppercase tracking-wider text-purple-600">Data secured</span>
              </div>
            </div>
          </div>

          {/* Cell 4: Fail-safe redundancy */}
          <div data-cap-cell className="group relative h-60 overflow-hidden p-6 bg-white/70 hover:bg-white/95 transition-all duration-500" style={cellBorder}>
            <img
              src="https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/e534354d-c5f2-4399-a1d9-2f50338e8c47_1600w.jpg"
              alt=""
              aria-hidden="true"
              className="absolute inset-0 h-full w-full object-cover opacity-[0.04] mix-blend-multiply transition-transform duration-1000 group-hover:scale-110"
              style={{
                maskImage: "linear-gradient(to top, black, transparent)",
                WebkitMaskImage: "linear-gradient(to top, black, transparent)",
              }}
            />
            <CornerDot />
            <h3 className="relative z-10 mb-1.5 text-xs font-semibold tracking-tight text-slate-900">Fail-safe redundancy</h3>
            <p className="relative z-10 max-w-[85%] text-[11px] leading-relaxed text-slate-500 font-light">Continuous backup streams ensure absolute data integrity.</p>
            <div className="absolute bottom-6 left-1/2 z-10 h-20 w-28 -translate-x-1/2">
              <svg viewBox="0 0 100 50" aria-hidden="true" className="absolute bottom-0 w-full opacity-20 transition-transform duration-700 group-hover:-translate-y-1">
                <polygon points="50,10 90,25 50,40 10,25" fill="none" stroke="#d946ef" strokeWidth="1" />
              </svg>
              <svg viewBox="0 0 100 50" aria-hidden="true" className="absolute bottom-4 w-full opacity-40 transition-transform duration-700 group-hover:-translate-y-2">
                <polygon points="50,10 90,25 50,40 10,25" fill="none" stroke="#d946ef" strokeWidth="1" />
              </svg>
              <svg viewBox="0 0 100 50" aria-hidden="true" className="absolute bottom-8 w-full drop-shadow-[0_10px_15px_rgba(232,121,249,0.35)] transition-transform duration-700 group-hover:-translate-y-3">
                <defs>
                  <linearGradient id="cap-layerGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#f5d0fe" />
                    <stop offset="100%" stopColor="#e879f9" />
                  </linearGradient>
                </defs>
                <polygon points="50,10 90,25 50,40 10,25" fill="url(#cap-layerGrad)" stroke="#f5d0fe" strokeWidth="0.5" />
              </svg>
            </div>
          </div>

          {/* Cell 5: Dynamic pathing */}
          <div data-cap-cell className="relative h-60 overflow-hidden p-6 bg-white/70 hover:bg-white/95 transition-all duration-500 group" style={cellBorder}>
            <CornerDot />
            <div className="pointer-events-none absolute bottom-0 right-10 top-0 opacity-80 transition-transform duration-1000 group-hover:scale-105">
              <svg width="180" height="180" viewBox="0 0 200 200" fill="none" aria-hidden="true" className="absolute bottom-12 right-0">
                <path d="M30,150 L80,100 L120,130 L170,80" stroke="rgba(0,0,0,0.05)" strokeWidth="1" />
                <path d="M80,100 L110,60 L170,80" stroke="rgba(0,0,0,0.05)" strokeWidth="1" />
                <path d="M80,100 L120,130 L170,80" stroke="#e879f9" strokeWidth="1.5" strokeDasharray="4 4" className="drop-shadow-[0_0_5px_rgba(232,121,249,0.5)]" />
                <rect x="28" y="148" width="4" height="4" fill="white" stroke="#d946ef" strokeWidth="0.5" transform="rotate(45 30 150)" />
                <rect x="78" y="98" width="4" height="4" fill="white" stroke="#d946ef" strokeWidth="0.5" transform="rotate(45 80 100)" />
                <rect x="118" y="128" width="4" height="4" fill="white" stroke="#e879f9" strokeWidth="1" transform="rotate(45 120 130)" />
                <rect x="168" y="78" width="4" height="4" fill="#e879f9" stroke="#f5d0fe" strokeWidth="0.5" transform="rotate(45 170 80)" className="animate-pulse" />
                <rect x="108" y="58" width="4" height="4" fill="white" stroke="#d946ef" strokeWidth="0.5" transform="rotate(45 110 60)" />
              </svg>
            </div>
            <div className="absolute bottom-6 left-6 right-6">
              <h3 className="mb-1.5 text-xs font-semibold tracking-tight text-slate-900">Adaptive Phantom Intelligence</h3>
              <p className="text-[11px] leading-relaxed text-slate-500 font-light">Phantom Squad adapts through runtime experience with human-like intelligence.</p>
            </div>
          </div>

          {/* Cell 6: Predictable overhead */}
          <div data-cap-cell className="relative h-60 overflow-hidden p-6 bg-white/70 hover:bg-white/95 transition-all duration-500 group" style={cellBorder}>
            <img
              src="https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/d14dc069-558a-4c51-8aad-5cc237f9b61d_1600w.jpg"
              alt=""
              aria-hidden="true"
              className="absolute inset-0 h-full w-full object-cover opacity-[0.03] mix-blend-multiply"
              style={{
                maskImage: "radial-gradient(circle at left top, black, transparent 70%)",
                WebkitMaskImage: "radial-gradient(circle at left top, black, transparent 70%)",
              }}
            />
            <CornerDot />
            <h3 className="relative z-10 mb-1.5 text-xs font-semibold tracking-tight text-slate-900">Predictable overhead</h3>
            <p className="relative z-10 max-w-[85%] text-[11px] leading-relaxed text-slate-500 font-light">Scale resources linearly without hidden multipliers.</p>
            <div
              className="absolute bottom-6 left-6 right-10 z-10 rounded-xl bg-white p-4 shadow-sm"
              style={{ border: "1px solid rgba(0,0,0,0.06)" }}
            >
              <div className="mb-3 flex items-center gap-2">
                <Icon icon="solar:pie-chart-2-linear" className="text-xs text-purple-500" />
                <span className="text-[10px] font-normal text-slate-500">Resource Usage</span>
              </div>
              <div className="mb-3 text-lg font-semibold tracking-tight text-slate-900">$38.50</div>
              <div className="flex h-1.5 w-full overflow-hidden rounded-full bg-slate-100">
                <div className="w-3/4 rounded-full bg-linear-to-r from-purple-500 to-fuchsia-400 shadow-[0_0_10px_rgba(232,121,249,0.2)]" />
                <div className="w-1/4 rounded-full bg-slate-100" />
              </div>
            </div>
          </div>

          {/* Cell 7: Builder optimized */}
          <div data-cap-cell className="group relative flex h-60 flex-col justify-end overflow-hidden p-6 bg-white/70 hover:bg-white/95 transition-all duration-500" style={cellBorder}>
            <CornerDot />
            <div className="pointer-events-none absolute inset-0 mb-12 flex items-center justify-center">
              <div className="relative flex h-14 w-14 items-center justify-center">
                <div className="absolute inset-0 rounded-full bg-purple-500/20 blur-[30px]" />
                <svg viewBox="0 0 100 100" aria-hidden="true" className="h-12 w-12 drop-shadow-[0_0_15px_rgba(232,121,249,0.5)] transition-transform duration-1000 group-hover:scale-110 group-hover:rotate-3">
                  <defs>
                    <linearGradient id="cap-logoGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#e879f9" />
                      <stop offset="100%" stopColor="#d946ef" />
                    </linearGradient>
                  </defs>
                  <path d="M20,80 L20,30 L50,60 L80,30 L80,80" fill="none" stroke="url(#cap-logoGrad)" strokeWidth="12" strokeLinejoin="bevel" strokeLinecap="square" />
                </svg>
                <div className="absolute -bottom-5 h-5 w-20 rounded-[50%] border border-slate-200 bg-slate-100/60" style={{ transform: "rotateX(70deg)" }} />
              </div>
            </div>
            <div className="relative z-10">
              <h3 className="mb-1.5 text-xs font-semibold tracking-tight text-slate-900">Builder optimized</h3>
              <p className="max-w-[85%] text-[11px] leading-relaxed text-slate-500 font-light">Intuitive SDKs. Zero configuration required to initialize.</p>
            </div>
          </div>

          {/* Cell 8: Initialize platform */}
          <div
            data-cap-cell
            className="group relative flex h-60 cursor-pointer flex-col items-center justify-center overflow-hidden p-6 transition-all duration-500 bg-slate-50/40 hover:bg-slate-50/60"
            style={{
              ...cellBorder,
              backgroundImage: "repeating-linear-gradient(-45deg, transparent, transparent 8px, rgba(0,0,0,0.01) 8px, rgba(0,0,0,0.01) 16px)",
            }}
          >
            <img
              src="https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/005600e5-f6ab-4e59-bc86-eaeb02797dfa_1600w.jpg"
              alt=""
              aria-hidden="true"
              className="absolute inset-0 h-full w-full object-cover opacity-0 mix-blend-multiply transition-opacity duration-500 group-hover:opacity-[0.05]"
            />
            <CornerDot />
            <div className="absolute -bottom-px -right-px z-20 box-content h-0.75 w-0.75 border border-slate-300 bg-slate-50" />
            <div
              className="relative z-10 flex items-center gap-3 rounded-full border border-slate-200 bg-white px-5 py-2.5 transition-colors duration-300 group-hover:bg-slate-50"
            >
              <span className="text-[11px] font-semibold text-slate-800">Initialize platform</span>
              <div className="flex gap-0.5">
                <div className="h-1 w-1 rounded-full bg-purple-500" />
                <div className="h-1 w-1 rounded-full bg-purple-500/70" />
                <div className="h-1 w-1 rounded-full bg-purple-500/40" />
                <div className="h-1 w-1 rounded-full bg-purple-500/20" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
