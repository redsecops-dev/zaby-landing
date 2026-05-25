"use client";

import React, { useRef, useCallback } from "react";
import { Icon } from "@iconify/react";
import { agentData } from "./agent-data";

interface CardFanProps {
  activeIndex: number;
  setActiveIndex: (index: number) => void;
}

const stackTransforms = [
  { x: -70, y: 0, z: 180, rotY: 8, scale: 1.00, opacity: 1.00, zIndex: 6 },
  { x: 20, y: -8, z: 40, rotY: 11, scale: 0.88, opacity: 0.92, zIndex: 5 },
  { x: 70, y: -16, z: -90, rotY: 14, scale: 0.74, opacity: 0.72, zIndex: 4 },
  { x: 110, y: -24, z: -190, rotY: 17, scale: 0.60, opacity: 0.52, zIndex: 3 },
  { x: 140, y: -32, z: -290, rotY: 20, scale: 0.48, opacity: 0.34, zIndex: 2 },
  { x: 160, y: -40, z: -390, rotY: 23, scale: 0.36, opacity: 0.16, zIndex: 1 },
];

const stackSceneStyle: React.CSSProperties = {
  perspective: "1800px",
  transformStyle: "preserve-3d",
};

const cardWrapperStyle: React.CSSProperties = {
  marginLeft: "-170px",
  marginTop: "-260px",
  transformStyle: "preserve-3d",
  willChange: "transform, opacity",
};

const noiseTexture =
  "url('data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E')";

export function CardFan({ activeIndex, setActiveIndex }: CardFanProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const cardOrderRef = useRef<number[]>([0, 1, 2, 3, 4, 5]);
  const isAnimatingRef = useRef(false);

  const handleCardAnimation = useCallback(
    (clickedLogicalIndex: number) => {
      if (isAnimatingRef.current || !containerRef.current) return;
      isAnimatingRef.current = true;

      const cardsElements = containerRef.current.querySelectorAll(".card-wrapper");
      const currentOrder = [...cardOrderRef.current];
      const clickedPhysicalIndex = currentOrder.indexOf(clickedLogicalIndex);

      if (clickedPhysicalIndex <= 0) {
        isAnimatingRef.current = false;
        return;
      }

      // Rotate the order: move clicked card to front
      const newOrder = [...currentOrder];
      const removed = newOrder.splice(clickedPhysicalIndex, 1);
      newOrder.unshift(removed[0]);
      cardOrderRef.current = newOrder;

      // Apply transforms via GSAP-like direct style manipulation
      newOrder.forEach((logicalIdx, slotIdx) => {
        const el = cardsElements[logicalIdx] as HTMLElement;
        if (!el) return;
        const t = stackTransforms[slotIdx];
        el.style.transition = "transform 0.6s cubic-bezier(0.22, 1, 0.36, 1), opacity 0.6s ease";
        el.style.transform = `translate3d(${t.x}px, ${t.y}px, ${t.z}px) rotateY(${t.rotY}deg) scale(${t.scale})`;
        el.style.opacity = String(t.opacity);
        el.style.zIndex = String(t.zIndex);
      });

      setActiveIndex(newOrder[0]);

      setTimeout(() => {
        isAnimatingRef.current = false;
      }, 600);
    },
    [setActiveIndex]
  );

  return (
    <div
      className="relative w-full h-full flex items-center justify-center overflow-visible"
      style={stackSceneStyle}
    >
      <div ref={containerRef} className="relative w-[320px] h-[420px]">
        {agentData.map((agent, physicalIdx) => {
          const slot = stackTransforms[physicalIdx] || stackTransforms[stackTransforms.length - 1];
          return (
            <div
              key={agent.id}
              className="card-wrapper absolute inset-0 w-[320px] h-[420px] rounded-2xl cursor-pointer"
              style={{
                ...cardWrapperStyle,
                transform: `translate3d(${slot.x}px, ${slot.y}px, ${slot.z}px) rotateY(${slot.rotY}deg) scale(${slot.scale})`,
                opacity: slot.opacity,
                zIndex: slot.zIndex,
              }}
              onClick={() => handleCardAnimation(physicalIdx)}
            >
              <div
                className="relative w-full h-full rounded-2xl overflow-hidden border border-white/20 shadow-2xl"
                style={{
                  background: `linear-gradient(135deg, ${agent.accentColor}18, ${agent.accentColor}08, transparent)`,
                }}
              >
                {/* Noise texture overlay */}
                <div
                  className="absolute inset-0 opacity-[0.03] pointer-events-none"
                  style={{ backgroundImage: noiseTexture }}
                />

                {/* Card content */}
                <div className="relative z-10 p-6 flex flex-col h-full">
                  {/* Badge */}
                  <span
                    className="inline-flex self-start items-center gap-1.5 rounded-full border px-3 py-1 text-[9px] font-bold uppercase tracking-[0.2em] mb-4"
                    style={{
                      borderColor: `${agent.accentColor}30`,
                      background: `${agent.accentColor}10`,
                      color: agent.accentColor,
                    }}
                  >
                    <span
                      className="w-1.5 h-1.5 rounded-full"
                      style={{ background: agent.accentColor }}
                    />
                    {agent.badge}
                  </span>

                  {/* Name */}
                  <h3 className="text-3xl font-medium tracking-tight text-slate-900 leading-tight mb-2">
                    {agent.heading.join(" ")}
                  </h3>

                  {/* Description */}
                  <p className="text-xs text-slate-500 leading-relaxed mb-auto line-clamp-3">
                    {agent.description}
                  </p>

                  {/* Feature icons row */}
                  <div className="flex items-center gap-2 mt-6 pt-4 border-t border-slate-100/50">
                    {agent.features.slice(0, 4).map((feat, fi) => (
                      <div
                        key={fi}
                        className="w-8 h-8 rounded-lg flex items-center justify-center"
                        style={{
                          background: `${agent.accentColor}08`,
                          border: `1px solid ${agent.accentColor}15`,
                        }}
                      >
                        <Icon icon={feat.icon} className="text-sm" style={{ color: agent.accentColor }} />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}