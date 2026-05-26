"use client";

import React from "react";
import { motion } from "framer-motion";
import { Icon } from "@iconify/react";

/* 
  ── Node configurations inside the 380 × 220 coordinate system ──
  Card widths are adjusted to accommodate labels without overflow.
*/
const NODES = [
  {
    id: "create",
    cx: 135,
    cy: 50,
    width: 175,
    height: 44,
    icon: "solar:user-bold-duotone",
    label: "Create list of clients",
    isTwoLine: false,
  },
  {
    id: "insert",
    cx: 300,
    cy: 50,
    width: 110,
    height: 44,
    icon: "solar:document-bold-duotone",
    label: "Insert\nRecord",
    isTwoLine: true,
  },
  {
    id: "import",
    cx: 55,
    cy: 120,
    width: 86,
    height: 44,
    icon: "solar:cloud-upload-bold-duotone",
    label: "Import",
    isTwoLine: false,
  },
  {
    id: "fetch",
    cx: 160,
    cy: 190,
    width: 115,
    height: 44,
    icon: "solar:letter-bold-duotone",
    label: "Fetch Mails",
    isTwoLine: false,
  },
  {
    id: "store",
    cx: 300,
    cy: 145,
    width: 115,
    height: 44,
    icon: "solar:database-bold-duotone",
    label: "Store\nContacts",
    isTwoLine: true,
  },
];

export function WorkflowDiagram() {
  return (
    <div className="relative w-full h-[230px] flex items-center justify-center overflow-visible scale-[1.08] sm:scale-[1.16] origin-center select-none">
      <svg className="absolute inset-0 w-full h-full pointer-events-none overflow-visible" viewBox="0 0 380 220" fill="none">
        
        {/* Connection Lines */}
        {/* 1. Create -> Insert */}
        <motion.line
          x1={222.5} y1={50} x2={245} y2={50}
          stroke="rgba(124, 58, 237, 0.15)" strokeWidth="1.5"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        />

        {/* 2. Create -> Import */}
        <motion.path
          d="M 75 72 L 75 120 L 95 120"
          stroke="rgba(124, 58, 237, 0.15)" strokeWidth="1.5" fill="none"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        />

        {/* 3. Import -> Fetch Mails */}
        <motion.path
          d="M 75 142 L 75 190 L 102.5 190"
          stroke="rgba(124, 58, 237, 0.15)" strokeWidth="1.5" fill="none"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        />

        {/* 4. Import -> Store Contacts (main horizontal track) */}
        <motion.path
          d="M 95 120 L 242.5 120"
          stroke="rgba(124, 58, 237, 0.15)" strokeWidth="1.5" fill="none"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.0, ease: "easeOut" }}
        />

        {/* 4b. Curve to Store Contacts */}
        <motion.path
          d="M 220 120 C 220 135, 230 135, 242.5 135"
          stroke="rgba(124, 58, 237, 0.15)" strokeWidth="1.5" fill="none"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        />

        {/* 5. Main horizontal tail */}
        <motion.path
          d="M 242.5 120 L 330 120"
          stroke="rgba(124, 58, 237, 0.15)" strokeWidth="1.5" fill="none"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        />

        {/* ── Animated Flow Dots ── */}
        {/* Dot 1: Create -> Insert */}
        <motion.circle r="2.2" fill="#7c3aed" style={{ filter: "drop-shadow(0 0 2px #7c3aed)" }}>
          <animateMotion
            dur="2.4s"
            repeatCount="indefinite"
            path="M 222.5 50 L 245 50"
          />
        </motion.circle>

        {/* Dot 2: Create -> Import */}
        <motion.circle r="2.2" fill="#7c3aed" style={{ filter: "drop-shadow(0 0 2px #7c3aed)" }}>
          <animateMotion
            dur="2.8s"
            repeatCount="indefinite"
            path="M 75 72 L 75 120 L 95 120"
          />
        </motion.circle>

        {/* Dot 3: Import -> Fetch Mails */}
        <motion.circle r="2.2" fill="#7c3aed" style={{ filter: "drop-shadow(0 0 2px #7c3aed)" }}>
          <animateMotion
            dur="2.8s"
            repeatCount="indefinite"
            path="M 75 142 L 75 190 L 102.5 190"
          />
        </motion.circle>

        {/* Dot 4: Import -> Store Contacts */}
        <motion.circle r="2.2" fill="#7c3aed" style={{ filter: "drop-shadow(0 0 2px #7c3aed)" }}>
          <animateMotion
            dur="3.2s"
            repeatCount="indefinite"
            path="M 95 120 L 220 120 C 220 135, 230 135, 242.5 135"
          />
        </motion.circle>

        {/* Dot 5: Horizontal Extension */}
        <motion.circle r="2.2" fill="#7c3aed" style={{ filter: "drop-shadow(0 0 2px #7c3aed)" }}>
          <animateMotion
            dur="2.4s"
            repeatCount="indefinite"
            path="M 220 120 L 330 120"
          />
        </motion.circle>

        {/* ── Junction details ── */}
        {/* Diamond 1 */}
        <polygon
          points="160,116 164,120 160,124 156,120"
          fill="white"
          stroke="rgba(124, 58, 237, 0.45)"
          strokeWidth="1.2"
        />

        {/* Diamond 2 */}
        <polygon
          points="310,116 314,120 310,124 306,120"
          fill="white"
          stroke="rgba(124, 58, 237, 0.45)"
          strokeWidth="1.2"
        />

        {/* Junction anchor dots */}
        {/* <circle cx="220" cy="120" r="2.2" fill="#7c3aed" />
        <circle cx="226" cy="120" r="2.2" fill="#7c3aed" /> */}

        {/* Elbow anchor dot on Fetch path */}
        {/* <circle cx="95" cy="190" r="2.2" fill="#7c3aed" /> */}

        {/* ── Render HTML Node Cards using foreignObject for perfect alignment ── */}
        {NODES.map((node, i) => {
          const parts = node.label.split("\n");
          
          const foWidth = node.width + 12;
          const foHeight = node.height + 12;
          const foX = node.cx - foWidth / 2;
          const foY = node.cy - foHeight / 2;

          return (
            <foreignObject
              key={node.id}
              x={foX}
              y={foY}
              width={foWidth}
              height={foHeight}
              className="overflow-visible"
            >
              <motion.div
                className="flex items-center gap-2 px-3 border border-slate-100/90 bg-white rounded-xl shadow-[0_3px_10px_rgba(0,0,0,0.02)] select-none pointer-events-auto"
                style={{
                  width: `${node.width}px`,
                  height: `${node.height}px`,
                  margin: "6px",
                }}
                initial={{ opacity: 0, scale: 0.9, y: 8 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  type: "spring",
                  stiffness: 140,
                  damping: 18,
                  delay: 0.15 + i * 0.08,
                }}
              >
                {/* Icon Container */}
                <div className="w-7 h-7 rounded-lg bg-violet-50 flex items-center justify-center flex-shrink-0">
                  <Icon icon={node.icon} className="text-sm text-violet-600 font-bold" />
                </div>

                {/* Text details */}
                <div className="flex flex-col text-left">
                  {node.isTwoLine ? (
                    <>
                      <span className="text-[10px] font-semibold text-slate-800 leading-tight">
                        {parts[0]}
                      </span>
                      <span className="text-[10px] font-semibold text-slate-800 leading-tight">
                        {parts[1]}
                      </span>
                    </>
                  ) : (
                    <span className="text-[10px] font-semibold text-slate-800 leading-tight whitespace-nowrap">
                      {node.label}
                    </span>
                  )}
                </div>
              </motion.div>
            </foreignObject>
          );
        })}
      </svg>
    </div>
  );
}