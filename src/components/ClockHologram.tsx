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

export default function ClockHologram() {
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
    <div className="flex justify-center lg:justify-start items-center relative [perspective:1000px]">
      {/* Silver Ring Border */}
      <div
        className="absolute -inset-6 rounded-full pointer-events-none z-0"
        style={{
          background: `linear-gradient(135deg, ${COLORS.silverRing} 0%, #a9a9a9 50%, ${COLORS.silverRingDark} 100%)`,
          boxShadow: `inset 0 1px 0 ${COLORS.white}99, 0 2px 4px rgba(0,0,0,0.3)`
        }}
      />
     
      <div
        className="relative w-80 h-80 sm:w-96 sm:h-96 rounded-full p-0.75 group z-10"
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
