"use client";

import { Icon } from "@iconify/react";
import { useEffect, useRef, useState, type CSSProperties } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { SaasInfoPanel } from "./SaasInfoPanel";
import { saasCardData } from "./saas-data";
import { GlassFilter } from "@/components/ui/liquid-glass";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { GlassPanel } from "@/components/shared/GlassPanel";
import { GridBackground } from "@/components/shared/GridBackground";
import { GradientOrb } from "@/components/shared/GradientOrb";

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
  const containerRef = useRef<HTMLDivElement | null>(null);
  
  const [activeIndex, setActiveIndex] = useState(0);
  const [selectedCardForModal, setSelectedCardForModal] = useState<typeof saasCardData[0] | null>(null);
  const [scrollIndex, setScrollIndex] = useState(0);

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const container = e.currentTarget;
    const scrollLeft = container.scrollLeft;
    const activeIdx = Math.round(scrollLeft / 314);
    setScrollIndex(activeIdx);
  };

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
        <div className="mb-12 md:mb-20">
          <SectionHeading
            label="Showcase"
            title="Enterprise AI. One Platform."
            subtitle="Everything your team needs to screen, evaluate, and hire—powered by AI infrastructure you can trust."
            align="center"
            size="lg"
          />
        </div>

        {/* Brand strip */}
        {/* <div className="hidden md:flex flex-wrap items-center justify-center gap-x-8 gap-y-4 mb-16 md:mb-20 border-y border-[var(--color-border-strong)]/30 py-6 bg-[var(--color-muted)]/20">
          {brandItems.map((item, idx) => (
            <div key={idx} className="flex items-center gap-2 text-xs text-[var(--color-text-secondary)] font-medium hover:text-[var(--color-text-primary)] transition-colors duration-300">
              <Icon icon={item.icon} className="text-base text-[var(--color-text-secondary)]/60" />
              <span className="uppercase tracking-wider">{item.label}</span>
            </div>
          ))}
        </div> */}

        {/* Two-panel layout (Desktop Only) */}
        <div className="hidden lg:grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          
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
                        <GlassPanel padding="lg" className="relative flex h-full w-full flex-col justify-between overflow-hidden rounded-[23px] group border-slate-100/50">
                          
                          {/* Colored ambient glows */}
                          <GradientOrb 
                            color={card.colorName} 
                            size="md" 
                            className="absolute -right-20 -bottom-20 opacity-15 transition-opacity duration-500 group-hover:opacity-25 z-0" 
                          />
                          <GradientOrb 
                            color={card.colorName} 
                            size="sm" 
                            className="absolute -left-10 -top-10 opacity-10 z-0" 
                          />

                          {/* Noise overlay */}
                          <div
                            className="absolute inset-0 opacity-[0.02] pointer-events-none mix-blend-overlay z-0"
                            style={{ backgroundImage: noiseTexture }}
                          />

                          {/* Grid texture */}
                          {/* <GridBackground variant="dots" opacity="light" className="z-0 opacity-10" /> */}

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
                        </GlassPanel>
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

        {/* Swipeable Carousel layout (Mobile Only) */}
        <div className="lg:hidden block w-full mt-4">
          <div 
            onScroll={handleScroll}
            className="flex gap-6 overflow-x-auto snap-x snap-mandatory pb-6 scrollbar-none scroll-smooth px-2"
          >
            {saasCardData.map((card, idx) => {
              return (
                <div
                  key={card.id}
                  className="snap-center shrink-0 w-[290px] h-[440px] cursor-pointer relative"
                  onClick={() => setSelectedCardForModal(card)}
                >
                  <div className="h-full w-full rounded-[24px] bg-gradient-to-br from-purple-200 via-fuchsia-200 to-indigo-200 p-[1px]">
                    <GlassPanel padding="lg" className="relative flex h-full w-full flex-col justify-between overflow-hidden rounded-[23px] group border-slate-100/50">
                      
                      {/* Colored ambient glows */}
                      <GradientOrb 
                        color={card.colorName} 
                        size="md" 
                        className="absolute -right-20 -bottom-20 opacity-15 z-0" 
                      />
                      <GradientOrb 
                        color={card.colorName} 
                        size="sm" 
                        className="absolute -left-10 -top-10 opacity-10 z-0" 
                      />

                      {/* Noise overlay */}
                      <div
                        className="absolute inset-0 opacity-[0.02] pointer-events-none mix-blend-overlay z-0"
                        style={{ backgroundImage: noiseTexture }}
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
                      <div className="relative z-30 my-auto flex justify-center items-center h-28">
                        <div 
                          className="absolute w-16 h-16 rounded-full blur-[20px] opacity-25 pointer-events-none" 
                          style={{ background: card.accentColor }} 
                        />
                        <Icon 
                          icon={card.features[0]?.icon || "solar:cpu-bolt-linear"} 
                          className="text-5xl relative z-10" 
                          style={{ color: card.accentColor }} 
                        />
                      </div>

                      {/* Bottom title & metadata */}
                      <div className="relative z-30 flex flex-col text-xl font-light uppercase leading-[1.0] tracking-tight text-slate-800">
                        {card.heading.map((word, idx) => (
                          <span key={idx} style={idx === 0 ? { color: card.accentColor } : {}}>
                            {word}
                          </span>
                        ))}
                        <span className="mt-3 text-[10px] font-mono tracking-widest text-slate-500 uppercase">
                          SYS.INTELLIGENCE // 0{idx + 1}
                        </span>
                      </div>
                    </GlassPanel>
                  </div>
                </div>
              );
            })}
          </div>
          
          {/* Swipe indicator dots */}
          <div className="flex justify-center gap-2 mt-2">
            {saasCardData.map((_, idx) => (
              <div 
                key={idx}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  scrollIndex === idx ? "w-4 bg-purple-500" : "w-1.5 bg-slate-300 dark:bg-slate-700"
                }`}
              />
            ))}
          </div>
        </div>

        {/* Full Screen Popup UI Modal */}
        <AnimatePresence>
          {selectedCardForModal && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
              {/* Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setSelectedCardForModal(null)}
                className="absolute inset-0 bg-slate-950/65 backdrop-blur-md"
              />

              {/* Modal Body */}
              <motion.div
                onClick={(e) => e.stopPropagation()}
                initial={{ opacity: 0, scale: 0.92, y: 15 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.92, y: 15 }}
                transition={{ type: "spring", stiffness: 350, damping: 32 }}
                className="relative w-full max-w-md overflow-hidden rounded-[28px] border border-white/20 p-6 md:p-8 shadow-2xl z-10"
              >
                {/* Background glows */}
                <GradientOrb 
                  color={selectedCardForModal.colorName} 
                  size="lg" 
                  className="absolute -right-32 -top-32 opacity-25 z-0" 
                />
                <GradientOrb 
                  color={selectedCardForModal.colorName} 
                  size="md" 
                  className="absolute -left-20 -bottom-20 opacity-15 z-0" 
                />
                
                {/* Glass background panel */}
                <GlassPanel padding="none" className="absolute inset-0 z-0 rounded-[28px]" />

                <div className="relative z-10 flex flex-col h-full justify-between">
                  {/* Header row */}
                  <div className="flex items-start justify-between mb-4">
                    <span
                      className="inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em]"
                      style={{
                        borderColor: `${selectedCardForModal.accentColor}35`,
                        background: `${selectedCardForModal.accentColor}15`,
                        color: selectedCardForModal.accentColor,
                      }}
                    >
                      <span
                        className="h-1.5 w-1.5 rounded-full animate-pulse"
                        style={{ background: selectedCardForModal.accentColor }}
                      />
                      {selectedCardForModal.badge}
                    </span>
                    <button
                      onClick={() => setSelectedCardForModal(null)}
                      className="text-slate-500 hover:text-slate-800 transition-colors p-1"
                    >
                      <Icon icon="solar:close-circle-bold" className="text-3xl" style={{ color: selectedCardForModal.accentColor }} />
                    </button>
                  </div>

                  {/* Heading */}
                  <div className="flex flex-col gap-1 mb-3">
                    {selectedCardForModal.heading.map((line, li) => (
                      <span key={li} className="text-3xl font-medium tracking-tight leading-none text-slate-800 block">
                        {line}
                      </span>
                    ))}
                  </div>

                  {/* Description */}
                  <p className="text-xs text-[var(--color-text-secondary)] leading-relaxed mb-5 max-w-sm">
                    {selectedCardForModal.description}
                  </p>

                  {/* Features List */}
                  <div className="grid grid-cols-2 gap-2.5 mb-6">
                    {selectedCardForModal.features.map((feat) => (
                      <div
                        key={feat.label}
                        className="flex items-center gap-2 rounded-xl border border-[var(--color-border-strong)]/40 bg-white/40 backdrop-blur-sm px-2.5 py-2"
                      >
                        <Icon 
                          icon={feat.icon} 
                          className="text-base flex-shrink-0" 
                          style={{ color: selectedCardForModal.accentColor }}
                        />
                        <span className="text-[11px] font-medium text-[var(--color-text-secondary)]">{feat.label}</span>
                      </div>
                    ))}
                  </div>

                  {/* Stats */}
                  <div className="flex items-center gap-5 border-t border-[var(--color-border-strong)]/40 pt-4 mb-5">
                    {selectedCardForModal.stats.map((stat) => (
                      <div key={stat.label} className="text-left">
                        <div className="text-base font-semibold text-slate-800 tabular-nums">{stat.value}</div>
                        <div className="text-[9px] text-[var(--color-text-secondary)] uppercase tracking-wider font-medium">
                          {stat.label}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-3">
                    <button
                      className="flex items-center gap-2 rounded-xl px-5 py-2.5 text-xs font-semibold text-white transition-transform active:scale-95 cursor-pointer"
                      style={{ background: selectedCardForModal.accentColor }}
                    >
                      {selectedCardForModal.cta}
                      <ArrowRight size={14} />
                    </button>
                    <button 
                      onClick={() => setSelectedCardForModal(null)}
                      className="text-xs font-medium text-[var(--color-text-secondary)] hover:text-slate-800 transition-colors cursor-pointer"
                    >
                      {selectedCardForModal.ctaSecondary}
                    </button>
                  </div>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
}