"use client";

import { Icon } from "@iconify/react";
import { useEffect, useRef, useState, type CSSProperties } from "react";
import { AnimatePresence } from "framer-motion";
import { SaasInfoPanel } from "./SaasInfoPanel";
import { saasCardData } from "./saas-data";
import { GlassFilter } from "@/components/ui/liquid-glass";

// Fixed transform preset for each slot in the card fan stack.
// Every card shares the same base frame size; slot hierarchy comes from the wrapper transform preset.
const stackTransforms = [
  { x: -70, y: 0, z: 180, rotY: 8, scale: 1.00, opacity: 1.00, zIndex: 6 },
  { x: 20, y: -8, z: 40, rotY: 11, scale: 0.88, opacity: 0.92, zIndex: 5 },
  { x: 70, y: -16, z: -90, rotY: 14, scale: 0.74, opacity: 0.72, zIndex: 4 },
  { x: 110, y: -24, z: -190, rotY: 17, scale: 0.60, opacity: 0.52, zIndex: 3 },
  { x: 140, y: -32, z: -290, rotY: 20, scale: 0.48, opacity: 0.34, zIndex: 2 },
  { x: 160, y: -40, z: -390, rotY: 23, scale: 0.36, opacity: 0.16, zIndex: 1 },
];

const stackSceneStyle: CSSProperties = {
  perspective: "1800px",
  transformStyle: "preserve-3d",
};

const cardWrapperStyle: CSSProperties = {
  marginLeft: "-170px", // half of card width (340px)
  marginTop: "-260px",  // half of card height (520px)
  transformStyle: "preserve-3d",
  willChange: "transform, opacity",
};

const brandItems = [
  { icon: "solar:shield-check-linear", label: "SOC2 Security" },
  { icon: "solar:widget-bold-duotone", label: "AI Screenings" },
  { icon: "solar:pie-chart-3-linear", label: "Talent Analytics" },
  { icon: "solar:chat-round-video-linear", label: "AI Mock Interviews" },
  { icon: "solar:document-add-linear", label: "Auto Question Bank" },
  { icon: "solar:key-linear", label: "GDPR Compliant" },
  { icon: "solar:bolt-linear", label: "Automated Hiring" },
];

const noiseTexture =
  "url('data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E')";

export default function AiSaasShowcase() {
  const rootRef = useRef<HTMLElement | null>(null);
  const frameRef = useRef<HTMLDivElement | null>(null);
  const titleRef = useRef<HTMLHeadingElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  
  const [activeIndex, setActiveIndex] = useState(0);
  // Tracks which DOM card index sits at each logical stack slot (array rotation).
  const cardOrderRef = useRef<number[]>([0, 1, 2, 3, 4, 5]);
  const isAnimatingRef = useRef(false);
  
  const animateToOrderRef = useRef<((newOrder: number[]) => void) | null>(null);
  const restartAutoScrollRef = useRef<(() => void) | null>(null);

  useEffect(() => {
    let isDisposed = false;
    let cleanupGsap: (() => void) | null = null;

    const init = async () => {
      if (!rootRef.current || !frameRef.current) {
        return;
      }

      const [{ gsap }, { ScrollTrigger }] = await Promise.all([
        import("gsap"),
        import("gsap/ScrollTrigger"),
      ]);

      if (isDisposed || !rootRef.current || !frameRef.current) {
        return;
      }

      gsap.registerPlugin(ScrollTrigger);

      const root = rootRef.current;
      const frame = frameRef.current;



      // ── GSAP Animations and Stack Carousel Setup ──
      const context = gsap.context(() => {
        const cards = gsap.utils.toArray<HTMLElement>(".saas-card-wrapper", root);

        // Place all cards off-screen (right side) ready for the intro fly-in.
        gsap.set(cards, {
          x: 300,
          z: -800,
          rotationY: 45,
          opacity: 0,
          transformOrigin: "center center",
        });

        // ── Array-rotation Carousel Function ──
        const animateToOrder = (newOrder: number[]) => {
          if (isAnimatingRef.current) return;
          isAnimatingRef.current = true;

          const tl = gsap.timeline({
            onComplete: () => {
              isAnimatingRef.current = false;
              setActiveIndex(newOrder[0]);
            },
          });

          newOrder.forEach((domIdx, slotIdx) => {
            const target = stackTransforms[slotIdx];
            tl.to(cards[domIdx], {
              x: target.x,
              y: target.y,
              z: target.z,
              rotationY: target.rotY,
              scale: target.scale,
              opacity: target.opacity,
              duration: 0.8,
              ease: "power2.inOut",
              overwrite: true,
              onStart: () => {
                gsap.set(cards[domIdx], { zIndex: target.zIndex });
              },
            }, 0);
          });
        };

        animateToOrderRef.current = animateToOrder;

        // ── Intro fly-in ──
        const introTimeline = gsap.timeline({ delay: 0.1 });

        cards.forEach((card, index) => {
          const target = stackTransforms[index];
          introTimeline.to(
            card,
            {
              duration: 1.6,
              x: target.x,
              y: target.y,
              z: target.z,
              rotationY: target.rotY,
              scale: target.scale,
              opacity: target.opacity,
              ease: "power3.out",
              onStart: () => {
                gsap.set(card, { zIndex: target.zIndex });
              },
            },
            index * 0.12
          );
        });

        // Subtle float effect on card contents
        introTimeline.add(() => {
          cards.forEach((card) => {
            const innerElement = card.querySelector<HTMLElement>(".saas-card-content");
            if (!innerElement) return;

            gsap.to(innerElement, {
              y: `+=${Math.random() * 6 + 4}`,
              duration: 3 + Math.random() * 2,
              yoyo: true,
              repeat: -1,
              ease: "sine.inOut",
              delay: Math.random(),
            });
          });
        });

        // ── Auto-scroll setup ──
        const startAutoScroll = () => {
          if (context._autoScrollInterval) {
            clearInterval(context._autoScrollInterval);
          }
          context._autoScrollInterval = setInterval(() => {
            if (isAnimatingRef.current) return;
            const prevOrder = cardOrderRef.current;
            const newOrder = [...prevOrder.slice(1), prevOrder[0]];
            cardOrderRef.current = newOrder;
            animateToOrder(newOrder);
          }, 5000);
        };

        restartAutoScrollRef.current = startAutoScroll;
        
        introTimeline.eventCallback("onComplete", () => {
          startAutoScroll();
        });

        // Title word-reveal animation
        if (titleRef.current) {
          gsap.to(".saas-reveal-word", {
            scrollTrigger: {
              trigger: titleRef.current,
              start: "top 85%",
            },
            y: "0%",
            duration: 0.8,
            stagger: 0.08,
            ease: "power4.out",
          });
        }
      }, root);

      cleanupGsap = () => {
        if (context._autoScrollInterval) {
          clearInterval(context._autoScrollInterval);
        }
        context.revert();
      };
    };

    void init();

    return () => {
      isDisposed = true;
      cleanupGsap?.();
    };
  }, []);

  const handleCardClick = (clickedLogicalIndex: number) => {
    if (isAnimatingRef.current || !animateToOrderRef.current) return;

    const currentOrder = cardOrderRef.current;
    const clickedSlot = currentOrder.indexOf(clickedLogicalIndex);

    if (clickedSlot <= 0) return; // Ignore if front card or invalid index

    const newOrder = [...currentOrder.slice(clickedSlot), ...currentOrder.slice(0, clickedSlot)];
    cardOrderRef.current = newOrder;

    animateToOrderRef.current(newOrder);

    // Restart timer interval so manual clicks reset the countdown
    if (restartAutoScrollRef.current) {
      restartAutoScrollRef.current();
    }
  };

  const activeData = saasCardData[activeIndex] || saasCardData[0];

  return (
    <section
      ref={rootRef}
      className="relative w-full py-20 md:py-32 overflow-hidden bg-transparent"
    >
      <GlassFilter />
      <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10">
        
        {/* Section header */}
        <div className="text-center mb-12 md:mb-20">
          
          <h2 ref={titleRef} className="flex flex-wrap justify-center gap-x-3 gap-y-1 text-3xl md:text-4xl lg:text-5xl font-medium tracking-tight text-slate-900 mb-4">
            {[
              "Enterprise",
              "AI.",
              "One",
              "Platform."
            ].map((word) => (
              <span key={word} className="inline-flex overflow-hidden">
                <span className="saas-reveal-word translate-y-[110%] will-change-transform font-medium">{word}</span>
              </span>
            ))}
          </h2>
          
          <p className="text-sm md:text-base text-slate-500 max-w-xl mx-auto leading-relaxed mt-4">
            Everything your team needs to screen, evaluate, and hire—powered by AI infrastructure you can trust.
          </p>
        </div>

        {/* Brand strip */}
        <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-4 mb-16 md:mb-20 border-y border-slate-100 py-6 bg-slate-50/50">
          {brandItems.map((item, idx) => (
            <div key={idx} className="flex items-center gap-2 text-xs text-slate-400 font-medium hover:text-slate-900 transition-colors duration-300">
              <Icon icon={item.icon} className="text-base text-slate-300" />
              <span className="uppercase tracking-wider">{item.label}</span>
            </div>
          ))}
        </div>

        {/* Two-panel layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          
          {/* Left: Card stack with particle background */}
          <div ref={frameRef} className="relative min-h-[600px] flex items-center justify-center overflow-visible">

            <div style={stackSceneStyle} className="relative w-full h-full flex items-center justify-center scale-75 sm:scale-90 md:scale-100 transition-transform duration-300">
              <div ref={containerRef} className="relative w-[340px] h-[520px]">
                {saasCardData.map((card, physicalIdx) => {
                  return (
                    <div
                      key={card.id}
                      className="saas-card-wrapper absolute left-1/2 top-1/2 w-[340px] h-[520px] cursor-pointer"
                      style={cardWrapperStyle}
                      onClick={() => handleCardClick(physicalIdx)}
                    >
                      <div className="saas-card-content pointer-events-auto h-full w-full rounded-[24px] bg-gradient-to-br from-purple-200 via-fuchsia-200 to-indigo-200 p-[1px]">
                        <div className="relative flex h-full w-full flex-col justify-between overflow-hidden rounded-[23px] bg-white/70 p-8 border border-slate-100/50 group">
                          
                          {/* Glass Layers */}
                          <div
                            className="absolute inset-0 z-0 overflow-hidden rounded-[23px]"
                            style={{
                              backdropFilter: "blur(18px)",
                              filter: "url(#glass-distortion)",
                              isolation: "isolate",
                            }}
                          />
                          <div
                            className="absolute inset-0 z-10 rounded-[23px]"
                            style={{ background: "rgba(255, 255, 255, 0.55)" }}
                          />
                          <div
                            className="absolute inset-0 z-20 rounded-[23px] overflow-hidden"
                            style={{
                              boxShadow:
                                "inset 3px 3px 2px 0 rgba(255, 255, 255, 0.75), inset -2px -2px 2px 1.5px rgba(255, 255, 255, 0.4)",
                            }}
                          />

                          {/* Colored ambient glow at bottom-right */}
                          <div 
                            className="absolute -right-20 -bottom-20 w-60 h-60 rounded-full blur-[80px] opacity-15 transition-opacity duration-500 group-hover:opacity-25 pointer-events-none z-0" 
                            style={{ background: card.accentColor }} 
                          />
                          
                          {/* Subtler colored ambient glow at top-left */}
                          <div 
                            className="absolute -left-10 -top-10 w-40 h-40 rounded-full blur-[60px] opacity-10 pointer-events-none z-0" 
                            style={{ background: card.accentColor }} 
                          />

                          {/* Noise overlay */}
                          <div
                            className="absolute inset-0 opacity-[0.02] pointer-events-none mix-blend-overlay z-0"
                            style={{ backgroundImage: noiseTexture }}
                          />

                          {/* Grid texture */}
                          <div
                            className="absolute inset-0 opacity-[0.1] pointer-events-none z-0"
                            style={{
                              backgroundImage: "linear-gradient(to right, rgba(0,0,0,0.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(0,0,0,0.06) 1px, transparent 1px)",
                              backgroundSize: "24px 24px",
                            }}
                          />

                          {/* Top badge */}
                          <div className="relative z-30 flex items-center gap-2">
                            <span 
                              className="w-1.5 h-1.5 rounded-full animate-pulse" 
                              style={{ background: card.accentColor }} 
                            />
                            <span 
                              className="text-[10px] font-bold uppercase tracking-[0.25em]"
                              style={{ color: card.accentColor }}
                            >
                              {card.badge}
                            </span>
                          </div>

                          {/* Middle visual icon/graphic with soft glow */}
                          <div className="relative z-30 my-auto flex justify-center items-center h-32">
                            <div 
                              className="absolute w-20 h-20 rounded-full blur-[24px] opacity-25 transition-transform duration-500 group-hover:scale-125 pointer-events-none" 
                              style={{ background: card.accentColor }} 
                            />
                            <Icon 
                              icon={card.features[0]?.icon || "solar:cpu-bolt-linear"} 
                              className="text-6xl relative z-10 transition-all duration-500 group-hover:scale-110 group-hover:rotate-3" 
                              style={{ color: card.accentColor }} 
                            />
                          </div>

                          {/* Bottom title & metadata */}
                          <div className="relative z-30 flex flex-col text-2xl font-light uppercase leading-[1.0] tracking-tight text-slate-800">
                            {card.heading.map((word, idx) => (
                              <span key={idx} style={idx === 0 ? { color: card.accentColor } : {}}>
                                {word}
                              </span>
                            ))}
                            <span className="mt-3 text-[10px] font-mono tracking-widest text-slate-500 uppercase">
                              SYS.INTELLIGENCE // 0{physicalIdx + 1}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right: Info panel */}
          <div className="bg-transparent min-h-[520px] lg:h-[600px] relative overflow-hidden flex flex-col justify-between rounded-[24px]">
            <AnimatePresence mode="wait">
              <SaasInfoPanel
                key={activeData.id}
                data={activeData}
                index={activeIndex}
                total={saasCardData.length}
              />
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}