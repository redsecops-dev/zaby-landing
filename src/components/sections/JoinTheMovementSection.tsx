"use client";

import React, { useEffect, useRef } from "react";

// Color constants
const COLORS = {
  silverRing: "#c0c0c0",
  silverRingDark: "#808080",
  white: "#ffffff",
  blue: "rgb(59, 130, 246)",
  orange: "rgb(249, 115, 22)",
  black: "#000000",
  textSecondary: "rgba(0,0,0,0.65)",
};

const CLOCK_STYLES = {
  outerRingGradient: "linear-gradient(135deg, #2a2a30 0%, #0a0a0c 100%)",
  middleRingGradient: "linear-gradient(135deg, #18181b 0%, #0d0d0f 100%)",
  innerBg: "#0a0a0c",
  maskRadial: "radial-gradient(circle at center, transparent 66%, black 66.5%, black 68%, transparent 68.5%)",
};

function BlueNeedle() {
  return (
    <div className="absolute top-1/2 left-1/2 w-[38%] h-0.5 bg-linear-to-r from-blue-500/0 via-blue-400/80 to-blue-400 origin-left drop-shadow-[0_0_8px_rgba(59,130,246,0.6)]">
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-0.75 bg-white rounded-full shadow-[0_0_12px_4px_rgba(59,130,246,0.9)]" />
    </div>
  );
}

function OrangeNeedle() {
  return (
    <div className="absolute top-1/2 left-1/2 w-[42%] h-0.5 bg-linear-to-r from-orange-500/0 via-orange-400/80 to-orange-400 origin-left drop-shadow-[0_0_8px_rgba(249,115,22,0.6)]">
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-0.75 bg-white rounded-full shadow-[0_0_15px_4px_rgba(249,115,22,0.9)]" />
    </div>
  );
}

function ClockComponent() {
  const sysBlueRef = useRef<HTMLDivElement>(null);
  const sysOrangeRef = useRef<HTMLDivElement>(null);
  const clockNumbersRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Clock Face Generation
    if (clockNumbersRef.current) {
      clockNumbersRef.current.innerHTML = "";
      const radius = 43;

      for (let i = 1; i <= 12; i++) {
        const angle = i * 30 - 90;
        const rad = (angle * Math.PI) / 180;
        const x = 50 + radius * Math.cos(rad);
        const y = 50 + radius * Math.sin(rad);

        const numEl = document.createElement("div");
        numEl.className = "absolute text-[11px] font-medium tracking-wider transform -translate-x-1/2 -translate-y-1/2";
        numEl.style.left = `${x}%`;
        numEl.style.top = `${y}%`;
        numEl.textContent = String(i);
        numEl.style.color = i === 12 || i === 3 || i === 6 || i === 9 
          ? "rgba(255,255,255,0.15)"
          : "rgba(255,255,255,0.05)";

        clockNumbersRef.current.appendChild(numEl);
      }
    }

    // Animation Logic
    let angleBlue = 45;
    let angleOrange = 180;
    const speedBlue = 1.2;
    const speedOrange = 0.3;
    let animationFrame = 0;

    function animateClock() {
      angleBlue = (angleBlue + speedBlue) % 360;
      angleOrange = (angleOrange + speedOrange) % 360;

      if (sysBlueRef.current) sysBlueRef.current.style.transform = `rotate(${angleBlue}deg)`;
      if (sysOrangeRef.current) sysOrangeRef.current.style.transform = `rotate(${angleOrange}deg)`;

      animationFrame = requestAnimationFrame(animateClock);
    }

    animationFrame = requestAnimationFrame(animateClock);

    return () => {
      cancelAnimationFrame(animationFrame);
    };
  }, []);

  return (
    <div className="flex justify-center lg:justify-start items-center relative perspective-[1000px]">
      {/* Silver Ring Border */}
      <div 
        className="absolute -inset-6 rounded-full pointer-events-none z-0"
        style={{
          background: `linear-gradient(135deg, ${COLORS.silverRing} 0%, #a9a9a9 50%, ${COLORS.silverRingDark} 100%)`,
          boxShadow: `inset 0 1px 0 ${COLORS.white}99, 0 2px 4px rgba(0,0,0,0.3)`
        }}
      />
      
      <div 
        className="relative w-85 h-85 sm:w-105 sm:h-105 rounded-full p-0.75 group z-10"
        style={{
          background: CLOCK_STYLES.outerRingGradient,
          boxShadow: "0 30px 60px -15px rgba(0,0,0,1)"
        }}
      >
        <div 
          className="absolute inset-0 rounded-full border shadow-[inset_0_2px_4px_rgba(255,255,255,0.05)]"
          style={{
            borderColor: "rgba(255,255,255,0.1)"
          }}
        />

        <div 
          className="relative w-full h-full rounded-full bg-linear-to-br p-3 shadow-[inset_0_10px_20px_rgba(0,0,0,0.8),0_0_20px_rgba(0,0,0,0.5)]"
          style={{
            background: CLOCK_STYLES.middleRingGradient
          }}
        >
          <div 
            className="relative w-full h-full rounded-full overflow-hidden shadow-[inset_0_0_30px_rgba(0,0,0,1)]"
            style={{
              background: CLOCK_STYLES.innerBg,
              boxShadow: "inset 0 0 30px rgba(0,0,0,1)"
            }}
          >
            {/* Dot Pattern */}
            <div className="absolute inset-0 opacity-[0.15]" style={{ backgroundImage: "radial-gradient(circle, #ffffff 1px, transparent 1px)", backgroundSize: "10px 10px" }} />

            {/* Clock Numbers */}
            <div ref={clockNumbersRef} className="absolute inset-0 z-10 pointer-events-none" />

            {/* Blue System */}
            <div ref={sysBlueRef} className="absolute inset-0 z-20">
              <div
                className="absolute inset-0 mix-blend-screen opacity-90 z-0"
                style={{
                  background: "conic-gradient(from 0deg, transparent 0deg, transparent 40deg, rgba(59, 130, 246, 0.15) 70deg, rgba(59, 130, 246, 0.8) 90deg, transparent 90deg)",
                  maskImage: CLOCK_STYLES.maskRadial,
                  WebkitMaskImage: CLOCK_STYLES.maskRadial,
                }}
              />
              <BlueNeedle />
            </div>

            {/* Orange System */}
            <div ref={sysOrangeRef} className="absolute inset-0 z-20">
              <div
                className="absolute inset-0 mix-blend-screen opacity-90 z-0"
                style={{
                  background: "conic-gradient(from 0deg, transparent 0deg, transparent 30deg, rgba(249, 115, 22, 0.1) 60deg, rgba(249, 115, 22, 0.8) 90deg, transparent 90deg)",
                  maskImage: CLOCK_STYLES.maskRadial,
                  WebkitMaskImage: CLOCK_STYLES.maskRadial,
                }}
              />
              <OrangeNeedle />
            </div>

            {/* Center Pivot */}
            <div 
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full border-2 z-40 shadow-[0_0_15px_rgba(255,255,255,0.1),inset_0_2px_4px_rgba(0,0,0,0.8)] animate-pulse"
              style={{
                background: "#1a1a1e",
                borderColor: "#2a2a30"
              }}
            >
              <div className="absolute inset-0 rounded-full" style={{ background: "rgba(255,255,255,0.05)" }} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function AnimationsManager({ scopeRef }: { scopeRef: React.RefObject<HTMLElement | null> }) {
  useEffect(() => {
    let frame = 0;

    const initAnimations = async () => {
      const section = scopeRef.current;
      if (!section) return;

      try {
        const [{ gsap }, { ScrollTrigger }] = await Promise.all([
          import("gsap"),
          import("gsap/ScrollTrigger"),
        ]);

        gsap.registerPlugin(ScrollTrigger);

        const context = gsap.context(() => {
          const revealElements = section.querySelectorAll(".jtm-reveal");

          revealElements.forEach((el: Element) => {
            const htmlEl = el as HTMLElement;
            if (htmlEl.tagName === "H1" || htmlEl.tagName === "P") {
              const lineSource = htmlEl.dataset.revealLines;
              const textSource = htmlEl.dataset.revealText;
              const lines = lineSource
                ? lineSource.split("|")
                : [textSource || htmlEl.textContent || ""];

              htmlEl.innerHTML = "";

              lines.forEach((line, lineIndex) => {
                line
                  .trim()
                  .split(/\s+/)
                  .filter(Boolean)
                  .forEach((word) => {
                    const wordWrapper = document.createElement("span");
                    wordWrapper.className = "inline-block overflow-hidden pb-1 -mb-1 align-bottom";

                    const innerSpan = document.createElement("span");
                    innerSpan.className = "inline-block translate-y-[120%] opacity-0 will-change-transform";
                    innerSpan.textContent = `${word} `;

                    wordWrapper.appendChild(innerSpan);
                    htmlEl.appendChild(wordWrapper);
                  });

                if (lineIndex < lines.length - 1) {
                  htmlEl.appendChild(document.createElement("br"));
                }
              });

              gsap.to(htmlEl.querySelectorAll("span > span"), {
                y: "0%",
                opacity: 1,
                duration: 1.2,
                stagger: 0.04,
                ease: "power4.out",
                scrollTrigger: {
                  trigger: htmlEl,
                  start: "top 85%",
                  toggleActions: "play none none none"
                }
              });
            } else {
              gsap.fromTo(
                htmlEl,
                { y: 30, opacity: 0 },
                {
                  y: 0,
                  opacity: 1,
                  duration: 1,
                  ease: "power3.out",
                  delay: 0.5,
                  scrollTrigger: {
                    trigger: htmlEl,
                    start: "top 90%"
                  }
                }
              );
            }
          });
        }, section);

        return () => context.revert();
      } catch {
        // Fail silently
      }
    };

    const cleanup = new Promise<(() => void) | void>((resolve) => {
      frame = window.requestAnimationFrame(() => {
        void initAnimations().then(resolve);
      });
    });

    return () => {
      window.cancelAnimationFrame(frame);
      cleanup.then((fn) => fn?.());
    };
  }, [scopeRef]);

  return null;
}

export function JoinTheMovementSection() {
  const sectionRef = useRef<HTMLElement>(null);

  return (
    <section 
      ref={sectionRef} 
      className="relative w-full min-h-screen flex flex-col justify-center items-center px-4 sm:px-6 md:px-8 py-12 sm:py-16 md:py-24"
    >
      {/* Background Effects */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03] mix-blend-screen" style={{ backgroundImage: "url('data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E')" }} />
        <div className="absolute top-[20%] left-[-10%] w-[80%] h-[20%] bg-linear-to-r from-orange-500/10 via-orange-500/5 to-transparent blur-[80px] rotate-25 origin-left" />
        <div className="absolute bottom-[10%] right-[-10%] w-[80%] h-[20%] bg-linear-to-l from-blue-600/10 via-blue-600/5 to-transparent blur-[80px] rotate-25 origin-right" />
      </div>

      <AnimationsManager scopeRef={sectionRef} />

      {/* Main Content */}
      <div className="relative z-10 w-full max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-center">
          {/* Left: Clock Component */}
          <div className="flex justify-center md:justify-start order-2 md:order-1">
            <div className="scale-75 sm:scale-90 md:scale-100 origin-center">
              <ClockComponent />
            </div>
          </div>

          {/* Right: Typography & Actions */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left order-1 md:order-2 space-y-4 sm:space-y-6">
            <h1 
              className="jtm-reveal text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-tight"
              data-reveal-lines="Join the|Movement"
              style={{ color: COLORS.black }}
            >
              Join the<br />Movement
            </h1>

            <p 
              className="jtm-reveal text-sm sm:text-base md:text-lg leading-relaxed max-w-md"
              data-reveal-text="Unlock the future of operational AI with Zaby. Your AI workforce infrastructure starts here."
              style={{ color: COLORS.textSecondary }}
            >
              Unlock the future of operational AI with Zaby. Your AI workforce infrastructure starts here.
            </p>

            <div className="flex gap-3 w-full sm:w-auto jtm-reveal pt-2 sm:pt-4">
              <button 
                className="relative group px-6 sm:px-8 py-2.5 sm:py-3 rounded-lg sm:rounded-full text-xs sm:text-sm font-semibold tracking-wide uppercase transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] w-full sm:w-auto"
                style={{
                  background: "linear-gradient(135deg, #e879f9 0%, #d946ef 100%)",
                  color: COLORS.white,
                  boxShadow: "0 4px 15px rgba(232, 121, 249, 0.3)"
                }}
              >
                <span className="relative z-10">See in action</span>
              </button>

              <button 
                className="relative group px-6 sm:px-8 py-2.5 sm:py-3 rounded-lg sm:rounded-full text-xs sm:text-sm font-semibold tracking-wide uppercase transition-all duration-300 w-full sm:w-auto"
                style={{
                  background: "rgba(255,255,255,0.1)",
                  color: COLORS.black,
                  border: "1px solid rgba(232, 121, 249, 0.3)",
                  backdropFilter: "blur(12px)"
                }}
              >
                Join our Slack
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
