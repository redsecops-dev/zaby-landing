"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Icon } from "@iconify/react";
import { SaasCardData } from "./saas-data";

interface Props {
  data: SaasCardData;
  index: number;
  total: number;
}

const spring = { type: "spring" as const, stiffness: 280, damping: 28 };

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 22 },
  animate: { opacity: 1, y: 0 },
  transition: { ...spring, delay },
});

function StatusBadge({ label, color }: { label: string; color: string }) {
  return (
    <motion.div {...fadeUp(0)} className="flex items-center gap-2">
      <span
        className="inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em]"
        style={{
          borderColor: `${color}35`,
          background: `${color}15`,
          color,
        }}
      >
        <motion.span
          className="h-1.5 w-1.5 rounded-full"
          style={{ background: color }}
          animate={{ opacity: [1, 0.3, 1] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
        />
        {label}
      </span>
    </motion.div>
  );
}

function PanelHeading({ lines }: { lines: string[] }) {
  return (
    <div className="flex flex-col gap-1">
      {lines.map((line, li) => (
        <div key={li} className="overflow-hidden pb-2">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...spring, delay: 0.07 + li * 0.06 }}
          >
            <span className="text-[2.5rem] font-medium tracking-tight leading-tight text-slate-800 block">
              {line}
            </span>
          </motion.div>
        </div>
      ))}
    </div>
  );
}

export function SaasInfoPanel({ data, index, total }: Props) {
  return (
    <motion.div
      className="relative flex flex-col justify-between min-h-[520px] lg:h-full p-8 md:p-10 overflow-hidden rounded-[24px] bg-white/40 border border-slate-100/50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
        {/* Ambient background glows */}
        <div 
          className="absolute -right-32 -top-32 w-80 h-80 rounded-full blur-[100px] opacity-25 pointer-events-none transition-all duration-700" 
          style={{ background: data.accentColor }} 
        />
        <div 
          className="absolute -left-20 -bottom-20 w-60 h-60 rounded-full blur-[80px] opacity-15 pointer-events-none transition-all duration-700" 
          style={{ background: data.accentColor }} 
        />

        {/* Glass Layers */}
        <div
          className="absolute inset-0 z-0 overflow-hidden rounded-[24px]"
          style={{
            backdropFilter: "blur(6px)",
            filter: "url(#glass-distortion)",
            isolation: "isolate",
          }}
        />
        <div
          className="absolute inset-0 z-10 rounded-[24px]"
          style={{ background: "rgba(255, 255, 255, 0.25)" }}
        />
        <div
          className="absolute inset-0 z-20 rounded-[24px] overflow-hidden"
          style={{
            boxShadow:
              "inset 2px 2px 1px 0 rgba(255, 255, 255, 0.5), inset -1px -1px 1px 1px rgba(255, 255, 255, 0.3)",
          }}
        />

        <div className="relative z-30 flex flex-col justify-between h-full">
          {/* Badge + counter */}
          <div className="flex items-center justify-between mb-6">
            <StatusBadge label={data.badge} color={data.accentColor} />
            <motion.span
              {...fadeUp(0.12)}
              className="text-xs text-slate-400 font-medium tabular-nums"
            >
              {String(index + 1).padStart(2, "0")}/{String(total).padStart(2, "0")}
            </motion.span>
          </div>

          {/* Heading */}
          <PanelHeading lines={data.heading} />

          {/* Description */}
          <motion.p
            {...fadeUp(0.18)}
            className="text-sm text-slate-500 leading-relaxed mt-4 mb-6 max-w-md"
          >
            {data.description}
          </motion.p>

          {/* Feature list */}
          <div className="grid grid-cols-2 gap-3 mb-8">
            {data.features.map((feat, fi) => (
              <motion.div
                key={feat.label}
                {...fadeUp(0.22 + fi * 0.04)}
                className="flex items-center gap-2.5 rounded-xl border border-slate-100 bg-slate-50 px-3 py-2.5"
              >
                <Icon 
                  icon={feat.icon} 
                  className="text-base flex-shrink-0" 
                  style={{ color: data.accentColor }}
                />
                <span className="text-xs font-medium text-slate-500">{feat.label}</span>
              </motion.div>
            ))}
          </div>

          {/* Stats row */}
          <motion.div
            {...fadeUp(0.38)}
            className="flex items-center gap-6 border-t border-slate-100 pt-5 mb-6"
          >
            {data.stats.map((stat) => (
              <div key={stat.label} className="text-left">
                <div className="text-lg font-semibold text-slate-800 tabular-nums">{stat.value}</div>
                <div className="text-[10px] text-slate-400 uppercase tracking-wider font-medium">
                  {stat.label}
                </div>
              </div>
            ))}
          </motion.div>

          {/* CTA */}
          <motion.div {...fadeUp(0.44)} className="flex items-center gap-4 relative z-40">
            <button
              className="flex items-center gap-2 rounded-xl px-5 py-2.5 text-xs font-semibold text-white transition-transform active:scale-95 cursor-pointer animate-in fade-in zoom-in duration-300"
              style={{ background: data.accentColor }}
            >
              {data.cta}
              <ArrowRight size={14} />
            </button>
            <button className="text-xs font-medium text-slate-400 hover:text-slate-800 transition-colors cursor-pointer">
              {data.ctaSecondary}
            </button>
          </motion.div>
        </div>
      </motion.div>
  );
}