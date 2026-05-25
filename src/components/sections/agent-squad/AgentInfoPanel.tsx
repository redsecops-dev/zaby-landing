"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Icon } from "@iconify/react";
import { AgentCardData } from "./agent-data";

interface Props {
  data: AgentCardData;
  index: number;
  total: number;
}

const spring = { type: "spring" as const, stiffness: 280, damping: 28 };

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 22, filter: "blur(6px)" },
  animate: { opacity: 1, y: 0, filter: "blur(0px)" },
  exit: { opacity: 0, y: -16, filter: "blur(4px)" },
  transition: { ...spring, delay },
});

export function AgentInfoPanel({ data, index, total }: Props) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={data.id}
        className="flex flex-col justify-between h-full p-8 md:p-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
      >
        {/* Badge + counter */}
        <div className="flex items-center justify-between mb-6">
          <motion.div {...fadeUp(0)} className="flex items-center gap-2">
            <span
              className="inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em]"
              style={{
                borderColor: `${data.accentColor}30`,
                background: `${data.accentColor}08`,
                color: data.accentColor,
              }}
            >
              <motion.span
                className="h-1.5 w-1.5 rounded-full"
                style={{ background: data.accentColor }}
                animate={{ opacity: [1, 0.3, 1] }}
                transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
              />
              {data.badge}
            </span>
          </motion.div>
          <motion.span
            {...fadeUp(0.12)}
            className="text-xs text-slate-400 font-medium tabular-nums"
          >
            {String(index + 1).padStart(2, "0")}/{String(total).padStart(2, "0")}
          </motion.span>
        </div>

        {/* Heading */}
        <div className="overflow-hidden">
          {data.heading.map((line, li) => (
            <motion.div
              key={li}
              initial={{ opacity: 0, y: 32, filter: "blur(8px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: -20, filter: "blur(4px)" }}
              transition={{ ...spring, delay: 0.07 + li * 0.06 }}
            >
              <span className="text-[2.5rem] font-medium tracking-tight leading-[1.1] text-slate-900">
                {line}
              </span>
            </motion.div>
          ))}
        </div>

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
              className="flex items-center gap-2.5 rounded-xl border border-slate-100 bg-slate-50/50 px-3 py-2.5"
            >
              <Icon icon={feat.icon} className="text-base text-slate-500 flex-shrink-0" />
              <span className="text-xs font-medium text-slate-600">{feat.label}</span>
            </motion.div>
          ))}
        </div>

        {/* Stats row */}
        <motion.div
          {...fadeUp(0.38)}
          className="flex items-center gap-6 border-t border-slate-100 pt-5 mb-6"
        >
          {data.stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-lg font-semibold text-slate-900 tabular-nums">{stat.value}</div>
              <div className="text-[10px] text-slate-400 uppercase tracking-wider font-medium">
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div {...fadeUp(0.44)} className="flex items-center gap-4">
          <button
            className="flex items-center gap-2 rounded-xl px-5 py-2.5 text-xs font-semibold text-white transition-transform active:scale-95"
            style={{ background: data.accentColor }}
          >
            {data.cta}
            <ArrowRight size={14} />
          </button>
          <button className="text-xs font-medium text-slate-500 hover:text-slate-700 transition-colors">
            {data.ctaSecondary}
          </button>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}