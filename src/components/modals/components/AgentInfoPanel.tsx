"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, ChevronRight } from "lucide-react";
import { Icon } from "@iconify/react";

export interface AgentCardData {
  id: string;
  badge: string;
  accentColor: string;
  heading: string[];       // each line as separate string
  description: string;
  features: { icon: string; label: string }[];
  stats: { label: string; value: string }[];
  cta: string;
  ctaSecondary: string;
}

interface Props {
  data: AgentCardData;
  index: number;
  total: number;
}

// ─── tiny spring helpers ────────────────────────────────────────────────────
const spring = { type: "spring" as const, stiffness: 280, damping: 28 };
const ease   = [0.22, 1, 0.36, 1] as const;

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 22, filter: "blur(6px)" },
  animate: { opacity: 1, y: 0,  filter: "blur(0px)" },
  exit:    { opacity: 0, y: -16, filter: "blur(4px)" },
  transition: { ...spring, delay },
});

const fadeIn = (delay = 0) => ({
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit:    { opacity: 0 },
  transition: { duration: 0.35, ease, delay },
});

// ─── Progress line ───────────────────────────────────────────────────────────
function ProgressLine({ index, total }: { index: number; total: number }) {
  const pct = ((index + 1) / total) * 100;
  return (
    <div className="absolute left-0 top-8 bottom-8 w-0.5 rounded-full overflow-hidden bg-slate-100">
      <motion.div
        className="w-full rounded-full origin-top"
        style={{ height: `${pct}%`, background: "linear-gradient(to bottom, #0ea5e9, #6366f1)" }}
        initial={false}
        animate={{ height: `${pct}%` }}
        transition={{ duration: 0.65, ease }}
      />
    </div>
  );
}

// ─── Status badge ────────────────────────────────────────────────────────────
function StatusBadge({ label, color }: { label: string; color: string }) {
  return (
    <motion.div {...fadeUp(0)} className="flex items-center gap-2">
      <span
        className="inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em]"
        style={{
          borderColor: `${color}30`,
          background: `${color}08`,
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

// ─── Heading ─────────────────────────────────────────────────────────────────
function PanelHeading({ lines }: { lines: string[] }) {
  return (
    <div className="overflow-hidden">
      {lines.map((line, li) => (
        <motion.div
          key={li}
          initial={{ opacity: 0, y: 32, filter: "blur(8px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          exit={{ opacity: 0, y: -20, filter: "blur(4px)" }}
          transition={{ ...spring, delay: 0.07 + li * 0.07 }}
          className="block text-[1.85rem] font-semibold leading-[1.05] tracking-tight text-slate-900 md:text-[2.1rem]"
        >
          {line}
        </motion.div>
      ))}
    </div>
  );
}

// ─── Feature item ────────────────────────────────────────────────────────────
function FeatureItem({
  icon, label, delay, color,
}: { icon: string; label: string; delay: number; color: string }) {
  return (
    <motion.div
      {...fadeUp(delay)}
      className="group flex items-center gap-3 rounded-xl px-3 py-2.5 transition-colors duration-200 hover:bg-slate-50"
    >
      <span
        className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg"
        style={{ background: `${color}12`, color }}
      >
        <Icon icon={icon} className="text-sm" />
      </span>
      <span
        className="text-[0.8rem] font-medium tracking-wide text-slate-600"
        style={{ borderLeft: `2px solid ${color}25` }}
      >
        <span className="pl-3">{label}</span>
      </span>
      <ChevronRight size={12} className="ml-auto shrink-0 text-slate-300 transition-transform group-hover:translate-x-0.5" />
    </motion.div>
  );
}

// ─── Stat cell ───────────────────────────────────────────────────────────────
function StatCell({ label, value, delay, color }: { label: string; value: string; delay: number; color: string }) {
  return (
    <motion.div {...fadeIn(delay)} className="flex flex-col gap-1 text-center">
      <span className="text-[0.6rem] font-semibold uppercase tracking-widest text-slate-400">{label}</span>
      <motion.span
        className="text-base font-semibold tracking-tight text-slate-800"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4, delay }}
        style={{ color }}
      >
        {value}
      </motion.span>
      {/* tiny animated waveform underline */}
      <motion.div
        className="mx-auto h-px w-8 rounded-full"
        style={{ background: `linear-gradient(to right, transparent, ${color}, transparent)` }}
        animate={{ scaleX: [0.4, 1, 0.6, 1, 0.4], opacity: [0.4, 1, 0.6, 1, 0.4] }}
        transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut", delay: delay + 0.4 }}
      />
    </motion.div>
  );
}

// ─── Main panel ──────────────────────────────────────────────────────────────
export function AgentInfoPanel({ data, index, total }: Props) {
  const color = data.accentColor;

  return (
    <div className="relative flex h-full w-full items-center justify-center py-6 pl-4 pr-4 md:pr-0">
      {/* ambient glow */}
      <motion.div
        className="pointer-events-none absolute left-1/2 top-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full blur-[80px]"
        animate={{ opacity: [0.12, 0.22, 0.12] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        style={{ background: color }}
      />

      {/* progress line */}
      <ProgressLine index={index} total={total} />

      {/* glass card */}
      <div
        className="relative ml-4 w-full max-w-sm overflow-hidden rounded-2xl border bg-white/70 shadow-xl backdrop-blur-sm"
        style={{ borderColor: `${color}18` }}
      >
        {/* gradient top border strip */}
        <div
          className="absolute inset-x-0 top-0 h-0.5 rounded-t-2xl"
          style={{ background: `linear-gradient(to right, transparent, ${color}, transparent)` }}
        />

        {/* subtle ambient tint in card BG */}
        <div
          className="pointer-events-none absolute inset-0 rounded-2xl"
          style={{
            background: `radial-gradient(ellipse at top right, ${color}06 0%, transparent 70%)`,
          }}
        />

        <div className="relative z-10 space-y-5 p-6">
          {/* 1. Status badge */}
          <AnimatePresence mode="wait">
            <motion.div key={`badge-${data.id}`}>
              <StatusBadge label={data.badge} color={color} />
            </motion.div>
          </AnimatePresence>

          {/* 2. Heading */}
          <AnimatePresence mode="wait">
            <motion.div key={`heading-${data.id}`}>
              <PanelHeading lines={data.heading} />
            </motion.div>
          </AnimatePresence>

          {/* 3. Description */}
          <AnimatePresence mode="wait">
            <motion.p
              key={`desc-${data.id}`}
              {...fadeUp(0.18)}
              className="text-[0.82rem] leading-relaxed text-slate-500"
            >
              {data.description}
            </motion.p>
          </AnimatePresence>

          {/* thin divider */}
          <div className="h-px w-full rounded-full bg-slate-100" />

          {/* 4. Feature stack */}
          <AnimatePresence mode="wait">
            <motion.div key={`features-${data.id}`} className="-mx-2 space-y-0.5">
              {data.features.map((f, i) => (
                <FeatureItem
                  key={f.label}
                  icon={f.icon}
                  label={f.label}
                  delay={0.22 + i * 0.07}
                  color={color}
                />
              ))}
            </motion.div>
          </AnimatePresence>

          {/* thin divider */}
          <div className="h-px w-full rounded-full bg-slate-100" />

          {/* 5. Telemetry row */}
          <AnimatePresence mode="wait">
            <motion.div
              key={`stats-${data.id}`}
              className="flex items-center justify-around rounded-xl border py-3"
              style={{ borderColor: `${color}12`, background: `${color}04` }}
            >
              {data.stats.map((s, i) => (
                <StatCell key={s.label} label={s.label} value={s.value} delay={0.3 + i * 0.06} color={color} />
              ))}
            </motion.div>
          </AnimatePresence>

          {/* 6. CTA module */}
          <AnimatePresence mode="wait">
            <motion.div
              key={`cta-${data.id}`}
              {...fadeUp(0.42)}
              className="space-y-2"
            >
              {/* primary CTA */}
              <motion.button
                whileHover={{ scale: 1.02, y: -1 }}
                whileTap={{ scale: 0.98 }}
                className="group relative flex w-full items-center justify-center gap-2 overflow-hidden rounded-xl px-5 py-3 text-sm font-semibold text-white transition-shadow duration-300 hover:shadow-lg"
                style={{ background: `linear-gradient(135deg, ${color} 0%, ${color}cc 100%)` }}
              >
                <span>{data.cta.replace(" →", "")}</span>
                <motion.span
                  className="flex items-center"
                  animate={{ x: [0, 3, 0] }}
                  transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
                >
                  <ArrowRight size={14} />
                </motion.span>
                {/* shimmer sweep */}
                <motion.span
                  className="pointer-events-none absolute inset-0 -skew-x-12 -translate-x-full bg-white/20"
                  animate={{ translateX: ["−100%", "200%"] }}
                  transition={{ duration: 2.2, repeat: Infinity, repeatDelay: 1.8 }}
                />
              </motion.button>

              {/* secondary micro action */}
              <motion.button
                whileHover={{ x: 2 }}
                className="flex w-full items-center justify-center gap-1.5 rounded-xl border border-slate-100 px-5 py-2.5 text-[0.78rem] font-medium text-slate-500 transition-colors hover:border-slate-200 hover:text-slate-700"
              >
                {data.ctaSecondary}
                <ChevronRight size={11} className="shrink-0" />
              </motion.button>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* card index indicator dots */}
        <div className="flex items-center justify-center gap-1.5 pb-4 pt-1">
          {Array.from({ length: total }).map((_, i) => (
            <motion.span
              key={i}
              className="rounded-full"
              animate={{
                width:  i === index ? "20px" : "6px",
                height: "6px",
                backgroundColor: i === index ? color : "#e2e8f0",
              }}
              transition={{ duration: 0.3, ease }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
