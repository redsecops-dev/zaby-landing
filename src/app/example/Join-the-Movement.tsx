"use client";

import { useEffect, useRef } from "react";
import { Icon } from "@iconify/react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function JoinTheMovement() {
  const clockNumbersRef = useRef<HTMLDivElement>(null);
  const systemBlueRef = useRef<HTMLDivElement>(null);
  const systemOrangeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // 1. Clock Face Generation
    const clockNumbersContainer = clockNumbersRef.current;
    if (clockNumbersContainer) {
      clockNumbersContainer.innerHTML = "";
      const radius = 43;

      for (let i = 1; i <= 12; i++) {
        const angle = i * 30 - 90;
        const rad = (angle * Math.PI) / 180;
        const x = 50 + radius * Math.cos(rad);
        const y = 50 + radius * Math.sin(rad);

        const numEl = document.createElement("div");
        numEl.className =
          "absolute text-[11px] font-medium tracking-wider transform -translate-x-1/2 -translate-y-1/2";
        numEl.style.left = `${x}%`;
        numEl.style.top = `${y}%`;
        numEl.textContent = String(i);

        if (i === 12 || i === 3 || i === 6 || i === 9) {
          numEl.style.color = "rgba(255,255,255,0.15)";
        } else {
          numEl.style.color = "rgba(255,255,255,0.05)";
        }

        clockNumbersContainer.appendChild(numEl);
      }
    }

    // 2. Animation Logic (Clock Hands)
    const sysBlue = systemBlueRef.current;
    const sysOrange = systemOrangeRef.current;

    if (sysBlue && sysOrange) {
      let angleBlue = 45;
      let angleOrange = 180;
      const speedBlue = 1.2;
      const speedOrange = 0.3;

      const animateClock = () => {
        angleBlue = (angleBlue + speedBlue) % 360;
        angleOrange = (angleOrange + speedOrange) % 360;

        sysBlue.style.transform = `rotate(${angleBlue}deg)`;
        sysOrange.style.transform = `rotate(${angleOrange}deg)`;

        requestAnimationFrame(animateClock);
      };

      const frameId = requestAnimationFrame(animateClock);

      return () => cancelAnimationFrame(frameId);
    }
  }, []);

  useEffect(() => {
    // 3. GSAP Scroll Reveals
    const revealElements = document.querySelectorAll(".gs-reveal");

    revealElements.forEach((el) => {
      if (el.tagName === "H1" || el.tagName === "P") {
        const text = el.textContent || "";
        const words = text.split(/\s+/);
        el.innerHTML = "";

        words.forEach((word) => {
          if (word.trim() !== "") {
            const wordWrapper = document.createElement("span");
            wordWrapper.className =
              "inline-block overflow-hidden pb-1 -mb-1 align-bottom";

            const innerSpan = document.createElement("span");
            innerSpan.className =
              "inline-block translate-y-[120%] opacity-0 will-change-transform";
            innerSpan.innerHTML = word + "&nbsp;";

            wordWrapper.appendChild(innerSpan);
            el.appendChild(wordWrapper);
          }
        });

        gsap.to(el.querySelectorAll("span > span"), {
          y: "0%",
          opacity: 1,
          duration: 1.2,
          stagger: 0.04,
          ease: "power4.out",
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        });
      }
    });
  }, []);

  return (
    <section className="bg-[color:var(--background)] text-[color:var(--foreground)] font-sans overflow-x-hidden antialiased min-h-screen flex flex-col selection:bg-white/20 dark:selection:bg-black/20 transition-colors">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');
      `}</style>

      {/* Background Effects */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden flex items-center justify-center">
        {/* Abstract FBM-style noise overlay */}
        <div
          className="absolute inset-0 opacity-[0.03] mix-blend-screen"
          style={{
            backgroundImage: `url('data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E')`,
          }}
        />

        {/* Diagonal Light Rays */}
        <div className="absolute top-[20%] left-[-10%] w-[80%] h-[20%] bg-gradient-to-r from-orange-500/10 via-orange-500/5 to-transparent blur-[80px] rotate-[25deg] origin-left" />
        <div className="absolute top-[30%] left-[-20%] w-[120%] h-[1px] bg-gradient-to-r from-transparent via-orange-400/40 to-transparent blur-[1px] rotate-[25deg]" />

        <div className="absolute bottom-[10%] right-[-10%] w-[80%] h-[20%] bg-gradient-to-l from-blue-600/10 via-blue-600/5 to-transparent blur-[80px] rotate-[25deg] origin-right" />
        <div className="absolute bottom-[20%] right-[-20%] w-[120%] h-[1px] bg-gradient-to-r from-transparent via-blue-500/40 to-transparent blur-[1px] rotate-[25deg]" />
      </div>

      {/* Main Content */}
      <main className="relative z-10 flex-1 w-full max-w-[1400px] mx-auto px-6 sm:px-12 lg:px-24 flex flex-col justify-center pt-24 pb-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-8 items-center">
          {/* Left Column: Clock Component */}
          <div className="flex justify-center lg:justify-start items-center relative" style={{ perspective: "1000px" }}>
            {/* Main Clock Container with Gradient Border Shell */}
            <div className="relative w-[340px] h-[340px] sm:w-[420px] sm:h-[420px] rounded-full shadow-[0_30px_60px_-15px_rgba(0,0,0,1)] bg-gradient-to-br from-[#2a2a30] to-[#0a0a0c] p-[3px] group">
              {/* Outer Edge Glow */}
              <div className="absolute inset-0 rounded-full border border-white/5 shadow-[inset_0_2px_4px_rgba(255,255,255,0.05)]" />

              {/* Inner Bezel */}
              <div className="relative w-full h-full rounded-full bg-gradient-to-br from-[#18181b] to-[#0d0d0f] p-[12px] shadow-[inset_0_10px_20px_rgba(0,0,0,0.8),0_0_20px_rgba(0,0,0,0.5)]">
                {/* Clock Face / Grid Surface */}
                <div className="relative w-full h-full rounded-full bg-[#0a0a0c] overflow-hidden shadow-[inset_0_0_30px_rgba(0,0,0,1)]">
                  {/* Dot Pattern Overlay */}
                  <div
                    className="absolute inset-0 opacity-[0.15]"
                    style={{
                      backgroundImage:
                        "radial-gradient(circle, #ffffff 1px, transparent 1px)",
                      backgroundSize: "10px 10px",
                    }}
                  />

                  {/* Clock Numbers Container */}
                  <div
                    ref={clockNumbersRef}
                    className="absolute inset-0 z-10 pointer-events-none"
                  />

                  {/* Blue System (Fast, Small) */}
                  <div
                    ref={systemBlueRef}
                    className="absolute inset-0 w-full h-full"
                  >
                    <div
                      className="absolute inset-0 mix-blend-screen opacity-90"
                      style={{
                        background:
                          "conic-gradient(from 0deg, transparent 0deg, transparent 40deg, rgba(59, 130, 246, 0.15) 70deg, rgba(59, 130, 246, 0.8) 90deg, transparent 90deg)",
                        maskImage:
                          "radial-gradient(circle at center, transparent 66%, black 66.5%, black 68%, transparent 68.5%)",
                        WebkitMaskImage:
                          "radial-gradient(circle at center, transparent 66%, black 66.5%, black 68%, transparent 68.5%)",
                      }}
                    />
                    <div className="absolute top-1/2 left-1/2 w-[38%] h-[2px] bg-gradient-to-r from-blue-500/0 via-blue-400/80 to-blue-400 origin-left drop-shadow-[0_0_8px_rgba(59,130,246,0.6)]">
                      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[8px] h-[3px] bg-white rounded-full shadow-[0_0_12px_4px_rgba(59,130,246,0.9)]" />
                    </div>
                  </div>

                  {/* Orange System (Slow, Main) */}
                  <div
                    ref={systemOrangeRef}
                    className="absolute inset-0 w-full h-full"
                  >
                    <div
                      className="absolute inset-0 mix-blend-screen opacity-90"
                      style={{
                        background:
                          "conic-gradient(from 0deg, transparent 0deg, transparent 30deg, rgba(249, 115, 22, 0.1) 60deg, rgba(249, 115, 22, 0.8) 90deg, transparent 90deg)",
                        maskImage:
                          "radial-gradient(circle at center, transparent 66%, black 66.5%, black 68%, transparent 68.5%)",
                        WebkitMaskImage:
                          "radial-gradient(circle at center, transparent 66%, black 66.5%, black 68%, transparent 68.5%)",
                      }}
                    />
                    <div className="absolute top-1/2 left-1/2 w-[42%] h-[2px] bg-gradient-to-r from-orange-500/0 via-orange-400/80 to-orange-400 origin-left drop-shadow-[0_0_8px_rgba(249,115,22,0.6)]">
                      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[12px] h-[3px] bg-white rounded-full shadow-[0_0_15px_4px_rgba(249,115,22,0.9)]" />
                    </div>
                  </div>

                  {/* Center Pivot */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-[#1a1a1e] border-2 border-[#2a2a30] z-30 shadow-[0_0_15px_rgba(255,255,255,0.1),inset_0_2px_4px_rgba(0,0,0,0.8)] animate-[pulse_3s_cubic-bezier(0.4,0,0.6,1)_infinite]">
                    <div className="absolute inset-0 rounded-full bg-white/5" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Typography & Actions */}
          <div className="flex flex-col items-center lg:items-start text-center lg:text-left pt-8 lg:pt-0 pl-0 lg:pl-12">
            <h1
              className="text-[56px] sm:text-[72px] lg:text-[84px] font-semibold tracking-tight leading-[1.05] text-[color:var(--foreground)] mb-6 gs-reveal"
              style={{ letterSpacing: "-0.03em" }}
            >
              Join the
              <br />
              Movement
            </h1>

            <p
              className="text-[17px] leading-relaxed text-[color:var(--foreground)]/60 mb-10 max-w-md gs-reveal"
              style={{ letterSpacing: "-0.01em" }}
            >
              Unlock the future of productivity with Axiom.
              <br />
              Remember, this journey is just getting started.
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-5 w-full sm:w-auto gs-reveal">
              {/* SEE IN ACTION Button */}
              <button className="relative group px-8 py-3.5 rounded-full bg-gradient-to-b from-white to-[#e2e2e5] text-black transition-transform duration-300 hover:scale-[1.02] active:scale-[0.98] w-full sm:w-auto">
                <span className="relative z-10 text-[12px] font-semibold tracking-[0.05em] uppercase text-black/90">
                  See in action
                </span>
                {/* Ambient Glow */}
                <div className="absolute inset-0 rounded-full bg-orange-500/20 blur-xl group-hover:bg-orange-500/30 group-hover:blur-2xl transition-all duration-500 -z-10 translate-y-2 scale-90" />
                {/* Direct drop shadow */}
                <div className="absolute inset-0 rounded-full shadow-[0_4px_20px_rgba(249,115,22,0.3)] group-hover:shadow-[0_8px_30px_rgba(249,115,22,0.4)] transition-shadow duration-300" />
              </button>

              {/* JOIN OUR SLACK Button (Gradient Border Shell) */}
              <button className="relative p-[1px] rounded-full bg-gradient-to-br from-white/20 via-white/5 to-transparent overflow-hidden transition-transform duration-300 hover:scale-[1.02] active:scale-[0.98] group w-full sm:w-auto">
                {/* Inner Content Container */}
                <div className="relative px-7 py-3.5 rounded-full bg-[#0a0a0c]/90 backdrop-blur-2xl flex items-center justify-center gap-3 transition-colors duration-300 group-hover:bg-[#111114]/90">
                  <Icon icon="logos:slack-icon" className="text-lg" />
                  <span className="text-[12px] font-semibold tracking-[0.05em] uppercase text-[color:var(--foreground)]/90">
                    Join our Slack
                  </span>
                </div>
              </button>
            </div>
          </div>
        </div>
      </main>

     
    </section>
  );
}
