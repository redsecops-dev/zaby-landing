"use client";

import { Icon } from "@iconify/react";

const TRUST_ITEMS = [
  { icon: "solar:shield-keyhole-bold-duotone", label: "Enterprise Security" },
  { icon: "solar:server-square-bold-duotone", label: "99.9% Uptime SLA" },
  { icon: "solar:check-square-bold-duotone", label: "SOC2 Compliance" },
  { icon: "solar:earth-bold-duotone", label: "GDPR Ready" },
];

export function TrustStripSection() {
  return (
    <section className="w-full border-y border-slate-100 bg-[#FCFBFD]/60 backdrop-blur-xs py-8 md:py-10">
      <div className="max-w-7xl mx-auto px-4 md:px-8 flex flex-col items-center justify-center gap-4 text-center">
        {/* Horizontal Row of trust items */}
        <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-4 text-xs md:text-sm font-medium text-slate-500">
          {TRUST_ITEMS.map((item, idx) => (
            <div key={idx} className="flex items-center gap-2">
              <Icon icon={item.icon} className="text-base text-accent/80" />
              <span>{item.label}</span>
              {idx < TRUST_ITEMS.length - 1 && (
                <span className="hidden md:inline text-slate-300 ml-6 select-none font-light">·</span>
              )}
            </div>
          ))}
        </div>

        {/* Muted supporting sentence */}
        <p className="text-[11px] md:text-xs text-slate-400 font-light tracking-wide">
          Trusted by teams at leading enterprises, startups, and AI-native companies.
        </p>
      </div>
    </section>
  );
}

export default TrustStripSection;
