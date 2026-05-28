"use client";

import { Icon } from "@iconify/react";
import { SectionWrapper } from "@/components/layout/SectionWrapper";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { GlassPanel } from "@/components/shared/GlassPanel";

const USE_CASES = [
  {
    icon: "solar:user-rounded-bold-duotone",
    badge: "Hiring & Assessment",
    title: "Automate candidate screening at scale",
    description: "Deploy AI assessments that adapt in real-time, generate questions, and produce detailed skill analytics.",
    color: "#7c3aed",
  },
  {
    icon: "solar:users-group-two-rounded-bold-duotone",
    badge: "Agent Operations",
    title: "AI agents that run your business workflows",
    description: "Orchestrate multi-agent squads for support, ops, and execution with persistent memory and human-in-the-loop approvals.",
    color: "#e879f9",
  },
  {
    icon: "solar:shield-check-bold-duotone",
    badge: "Enterprise Compliance",
    title: "Security and governance built in",
    description: "RBAC, audit logs, encryption, and compliance monitoring across every agent interaction and workflow.",
    color: "#0ea5e9",
  },
];

export function UseCasesSection() {
  return (
    <SectionWrapper spacing="md" background="transparent" className="w-full max-w-7xl mx-auto px-4 md:px-8">
      <SectionHeading
        label="Use Cases"
        title="Solutions Built for the Enterprise"
        subtitle="Discover how Zaby AI transforms operational efficiency across core organizational workflows."
        align="center"
        size="lg"
        className="mb-12 md:mb-16"
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
        {USE_CASES.map((uc, idx) => (
          <GlassPanel
            key={idx}
            padding="lg"
            className="group relative flex flex-col items-start bg-white/70 hover:bg-white/95 transition-all duration-300"
          >
            {/* Icon */}
            <div
              className="w-11 h-11 rounded-xl flex items-center justify-center mb-5"
              style={{ background: `${uc.color}12`, border: `1px solid ${uc.color}20` }}
            >
              <Icon icon={uc.icon} className="text-xl" style={{ color: uc.color }} />
            </div>

            {/* Badge */}
            <span
              className="inline-flex items-center rounded-full px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-widest mb-3"
              style={{ color: uc.color, background: `${uc.color}08`, border: `1px solid ${uc.color}18` }}
            >
              {uc.badge}
            </span>

            {/* Title */}
            <h3 className="text-lg font-medium tracking-tight text-slate-900 mb-2 leading-snug">
              {uc.title}
            </h3>

            {/* Description */}
            <p className="text-sm text-slate-500 leading-relaxed">
              {uc.description}
            </p>
          </GlassPanel>
        ))}
      </div>
    </SectionWrapper>
  );
}

export default UseCasesSection;