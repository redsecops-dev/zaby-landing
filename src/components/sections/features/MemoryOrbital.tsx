"use client";

import React, { useMemo } from "react";
import { motion } from "framer-motion";
import { Icon } from "@iconify/react";

/* ── layout constants (220 × 220 viewBox) ── */
const CX = 110;
const CY = 110;
const OUTER_R = 92;
const MID_R = 68;
const INNER_R = 44;

const MEMORY_NODES = [
  { angle: -90,  icon: "solar:document-bold-duotone",          bg: "#ede9fe", color: "#7c3aed", label: "SEMANTIC" },
  { angle: -18,  icon: "solar:server-bold-duotone",            bg: "#dbeafe", color: "#3b82f6", label: "WORKING" },
  { angle: 54,   icon: "solar:database-bold-duotone",          bg: "#d1fae5", color: "#10b981", label: "EPISODIC" },
  { angle: 126,  icon: "solar:refresh-circle-bold-duotone",    bg: "#fef3c7", color: "#f59e0b", label: "PROCEDURAL" },
  { angle: 198,  icon: "solar:chat-square-code-bold-duotone",  bg: "#fce7f3", color: "#ec4899", label: "BUFFER" },
];

function polar(deg: number, r: number) {
  const rad = (deg * Math.PI) / 180;
  return { x: CX + r * Math.cos(rad), y: CY + r * Math.sin(rad) };
}

/* ── spring preset for staggered entry springing out from center ── */
const nodeSpring = (i: number, p: { x: number; y: number }) => ({
  initial: { 
    x: CX - p.x, 
    y: CY - p.y, 
    opacity: 0, 
    scale: 0.2 
  },
  whileInView: { 
    x: 0, 
    y: 0, 
    opacity: 1, 
    scale: 1 
  },
  viewport: { once: true, margin: "-40px" as const },
  transition: { 
    type: "spring" as const, 
    stiffness: 150, 
    damping: 20, 
    delay: 0.2 + i * 0.1 
  },
});

export function MemoryOrbital() {
  // Pre-calculate positions of memory nodes for performance
  const nodesWithPositions = useMemo(() => {
    return MEMORY_NODES.map((node, i) => ({
      ...node,
      p: polar(node.angle, OUTER_R),
      spring: nodeSpring(i, polar(node.angle, OUTER_R))
    }));
  }, []);

  return (
    <div className="relative w-[200px] h-[200px] mt-10 flex items-center justify-center overflow-visible scale-[1.05] sm:scale-[1.12] transition-transform duration-300">
      <div className="absolute w-[220px] h-[220px] scale-[1.08] origin-center flex-shrink-0 flex items-center justify-center">

        {/* ── SVG orbit rings + connection lines + moving dots ── */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 220 220">

          {/* Outer orbit — slow rotation */}
          <motion.g
            animate={{ rotate: 360 }}
            transition={{ duration: 100, repeat: Infinity, ease: "linear" }}
            style={{ transformOrigin: `${CX}px ${CY}px` }}
          >
            <motion.circle
              cx={CX} cy={CY} r={OUTER_R}
              fill="none" stroke="rgba(168,85,247,0.08)" strokeWidth="1"
              strokeDasharray="5 5"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 1, ease: "easeOut" }}
              style={{ transformOrigin: `${CX}px ${CY}px` }}
            />
          </motion.g>

          {/* Middle orbit — static */}
          <motion.circle
            cx={CX} cy={CY} r={MID_R}
            fill="none" stroke="rgba(168,85,247,0.06)" strokeWidth="1"
            strokeDasharray="4 4"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 1, delay: 0.1, ease: "easeOut" }}
            style={{ transformOrigin: `${CX}px ${CY}px` }}
          />

          {/* Inner filled ring — soft light purple fill behind center */}
          <motion.circle
            cx={CX} cy={CY} r={INNER_R}
            fill="rgba(168,85,247,0.02)" stroke="rgba(168,85,247,0.1)" strokeWidth="1"
            initial={{ opacity: 0, scale: 0.6 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 1, delay: 0.15, ease: "easeOut" }}
            style={{ transformOrigin: `${CX}px ${CY}px` }}
          />

          {/* Connection lines + Animated Flow Dots */}
          {nodesWithPositions.map((node, i) => (
            <React.Fragment key={`conn-${i}`}>
              {/* Connection line - springs out from center node with the orbital node */}
              <motion.line
                x1={CX}
                y1={CY}
                initial={{ x2: CX, y2: CY, opacity: 0 }}
                whileInView={{ x2: node.p.x, y2: node.p.y, opacity: 1 }}
                viewport={{ once: true }}
                transition={{
                  type: "spring",
                  stiffness: 150,
                  damping: 20,
                  delay: 0.2 + i * 0.1
                }}
                stroke="rgba(168,85,247,0.12)"
                strokeWidth="1.2"
              />

              {/* Animated Flow Dot (passing from nodes to center node) */}
              <motion.circle
                r="2"
                fill="#c084fc"
                style={{
                  filter: "drop-shadow(0 0 3px #c084fc)",
                }}
                animate={{
                  cx: [node.p.x, CX],
                  cy: [node.p.y, CY],
                  opacity: [0, 0.9, 0.9, 0],
                }}
                transition={{
                  duration: 2.2,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 1.2 + i * 0.35, // starts flowing after settle
                }}
              />
            </React.Fragment>
          ))}
        </svg>

        {/* ── Orbital nodes ── */}
        {nodesWithPositions.map((node, i) => (
          <motion.div
            key={i}
            className="absolute flex flex-col items-center gap-1 select-none"
            style={{ left: node.p.x - 16, top: node.p.y - 16 }}
            {...node.spring}
          >
            <div
              className="w-[32px] h-[32px] rounded-[10px] flex items-center justify-center shadow-sm"
              style={{ background: node.bg }}
            >
              <Icon icon={node.icon} className="text-[15px]" style={{ color: node.color }} />
            </div>
            <span
              className="text-[6.5px] font-bold tracking-[0.1em] whitespace-nowrap"
              style={{ color: "rgba(100,116,139,0.7)" }}
            >
              {node.label}
            </span>
          </motion.div>
        ))}

        {/* ── RENO center core (glowing, light purple, 3D sphere) ── */}
        <motion.div
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center"
          initial={{ opacity: 0, scale: 0.5 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ type: "spring", stiffness: 220, damping: 18, delay: 0.1 }}
        >
          {/* Sleek purple glowing effect behind the center node */}
          <motion.div
            className="absolute w-[88px] h-[88px] rounded-full pointer-events-none"
            style={{
              background: "radial-gradient(circle, rgba(56, 189, 248, 0.6) 0%, rgba(56, 189, 248, 0) 70%)",
              filter: "blur(12px)",
              mixBlendMode: "screen",
            }}
            animate={{
              scale: [0.85, 1.25, 0.85],
              opacity: [0.5, 0.9, 0.5],
            }}
            transition={{
              duration: 3.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />

          {/* 3D Sphere Center Node with Database Icon */}
          <div
            className="relative w-[52px] h-[52px] rounded-full flex flex-col items-center justify-center gap-0.5 select-none"
            style={{
              background: "radial-gradient(circle at 35% 35%, #5ab5f3ff 0%, #38bdf8 45%, #0284c7 75%, #0369a1 100%)",
              boxShadow: "inset -3px -3px 8px rgba(3, 105, 161, 0.8), inset 3px 3px 8px rgba(255, 255, 255, 0.8), 0 8px 20px rgba(2, 132, 199, 0.35)",
            }}
          >
            <Icon 
              icon="solar:database-bold-duotone" 
              className="text-[20px] text-white drop-shadow-[0_2px_4px_rgba(2,132,199,0.5)]" 
            />

          </div>
        </motion.div>

      </div>
    </div>
  );
}