"use client";

import { useEffect, useRef } from "react";
import {
  Package,
  Leaf,
  Globe,
  Ghost,
  Layers,
  Shield,
  ArrowRight,
  ShieldCheck,
  MoreVertical,
  FileText,
  Folder,
  CheckCircle,
  AlertTriangle,
} from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const BRANDS: Array<{ Icon: React.ComponentType<{ size: number; className?: string }>; name: string }> = [
  { Icon: Package, name: "AcmeCorp" },
  { Icon: Leaf, name: "Evergreen" },
  { Icon: Globe, name: "Nexus" },
  { Icon: Ghost, name: "Specter" },
  { Icon: Layers, name: "StackFlow" },
  { Icon: Shield, name: "Aegis" },
];

const AUDIT_ROWS: Array<{
  directive: string;
  files: number;
  status: "verified" | "flagged";
}> = [
  { directive: "External Identity", files: 9, status: "verified" },
  { directive: "Agreement Validation", files: 14, status: "verified" },
  { directive: "Access Role Check", files: 7, status: "verified" },
  { directive: "Q2 Assessment", files: 21, status: "flagged" },
  { directive: "Record Verification", files: 11, status: "verified" },
];

const FEATURES = [
  {
    title: "Verifiable Results",
    desc: "Every test, result, and conclusion is systematically recorded and backed by cryptographic evidence. Teams can explain outcomes with total confidence.",
  },
  {
    title: "Reduce Manual Effort",
    desc: "With evidence linked automatically and working papers generated cleanly, engineering teams spend drastically less time responding to follow-ups.",
  },
  {
    title: "Consistent Workflows",
    desc: "Uniform testing parameters and documentation templates ensure the exact same level of rigor across distributed teams and all reporting periods.",
  },
];

export default function CompliancePlatform() {
  const marqueeRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLElement>(null);
  const featuresRef = useRef<HTMLElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // Seamless marquee loop — moves by -50% of total width (2 sets = seamless)
      if (marqueeRef.current) {
        gsap.to(marqueeRef.current, {
          xPercent: -50,
          repeat: -1,
          duration: 25,
          ease: "none",
        });
      }

      // Floating card entrance
      gsap.from(".cp-card-animate", {
        y: 16,
        scale: 0.96,
        opacity: 0,
        duration: 1.2,
        ease: "power3.out",
        delay: 0.2,
        scrollTrigger: {
          trigger: canvasRef.current,
          start: "top 80%",
        },
      });

      // Feature items stagger
      gsap.from(".cp-feature-item", {
        y: 12,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        stagger: 0.08,
        scrollTrigger: {
          trigger: featuresRef.current,
          start: "top 85%",
        },
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <section className="text-slate-900 flex items-start justify-center p-4 sm:p-8 lg:p-12 bg-white">
      <main className="w-full max-w-300 mx-auto bg-[#f8f9fa] rounded-4xl p-8 sm:p-12 lg:p-16 flex flex-col gap-12 sm:gap-16">

        {/* Header Section */}
        <header className="flex flex-col gap-6">
          <div className="text-xs font-normal text-slate-500 tracking-wide uppercase">
            [ System Overview ]
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-8 lg:gap-16 items-start">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-normal tracking-tight leading-[1.1] text-slate-900">
              Continuous compliance, engineered for absolute transparency
            </h1>
            <div className="flex flex-col gap-6 pt-2 lg:pt-4">
              <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
                Our system runs security validations and logging transparently in the
                background, producing audit-ready records with complete traceability
                without slowing down your operations.
              </p>
              <a
                href="#"
                className="inline-flex items-center gap-2 text-sm font-normal text-slate-900 hover:text-slate-600 transition-all duration-160 active:scale-[0.97] group w-fit"
                style={{ transitionTimingFunction: "cubic-bezier(0.23, 1, 0.32, 1)" }}
              >
                View compliance standards
                <ArrowRight
                  size={16}
                  className="transition-transform duration-200 group-hover:translate-x-1"
                  style={{ transitionTimingFunction: "cubic-bezier(0.23, 1, 0.32, 1)" }}
                />
              </a>
            </div>
          </div>
        </header>

        {/* Scrolling Brands */}
        <section className="w-full relative overflow-hidden rounded-3xl p-px bg-linear-to-b from-slate-200/80 via-slate-100/50 to-slate-50/10 shadow-[0px_2px_4px_-1px_rgba(0,0,0,0.02)]">
          <div className="bg-white rounded-[23px] relative overflow-hidden py-6 sm:py-8 flex items-center">
            {/* Fade edge masks */}
            <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-32 bg-linear-to-r from-white to-transparent z-10 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-32 bg-linear-to-l from-white to-transparent z-10 pointer-events-none" />
            {/* Marquee track — two identical sets for seamless loop */}
            <div ref={marqueeRef} className="flex items-center w-max">
              {[0, 1].map((set) => (
                <div
                  key={set}
                  className="flex items-center gap-10 sm:gap-20 pr-10 sm:pr-20 text-slate-400"
                >
                  {BRANDS.map((brand) => (
                    <div
                      key={`${set}-${brand.name}`}
                      className="flex items-center gap-2 opacity-60 hover:opacity-100 transition-opacity duration-300"
                    >
                      <brand.Icon size={28} />
                      <span className="text-lg font-semibold tracking-tight text-slate-800">
                        {brand.name}
                      </span>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Aura Image Background + Floating Audit Card */}
        <section
          ref={canvasRef}
          className="relative w-full aspect-4/3 sm:aspect-video lg:aspect-[2.2/1] rounded-3xl overflow-hidden isolate shadow-[inset_0_0_0_1px_rgba(0,0,0,0.04)] bg-cover bg-center"
          style={{
            backgroundImage:
              "url(https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/1d3d40de-ce06-4312-8a1f-3cf92888acc1_3840w.jpg)",
          }}
        >
          <div className="absolute inset-0 -z-10 bg-slate-900/20 mix-blend-overlay pointer-events-none" />

          {/* Floating card */}
          <div className="cp-card-animate absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] max-w-130 rounded-2xl p-px bg-linear-to-br from-white/95 via-white/50 to-slate-300/30 shadow-[0px_0px_0px_1px_rgba(0,0,0,0.06),0px_1px_1px_-0.5px_rgba(0,0,0,0.06),0px_3px_3px_-1.5px_rgba(0,0,0,0.06),0px_6px_6px_-3px_rgba(0,0,0,0.06),0px_12px_12px_-6px_rgba(0,0,0,0.06),0px_24px_24px_-12px_rgba(0,0,0,0.06)] backdrop-blur-md">
            <div className="bg-white/95 rounded-[15px] flex flex-col overflow-hidden w-full h-full">

              {/* Card Header */}
              <div className="px-5 py-4 border-b border-slate-100 flex justify-between items-center bg-[#fafafa]/50">
                <div className="flex items-center gap-2.5">
                  <div className="w-6 h-6 rounded bg-indigo-100 flex items-center justify-center text-indigo-600">
                    <ShieldCheck size={14} />
                  </div>
                  <span className="text-sm font-normal text-slate-800 tracking-tight">
                    Apex Security Inc.
                  </span>
                </div>
                <button
                  type="button"
                  className="text-slate-400 hover:text-slate-600 transition-all duration-160 active:scale-[0.97]"
                  style={{ transitionTimingFunction: "cubic-bezier(0.23, 1, 0.32, 1)" }}
                >
                  <MoreVertical size={18} />
                </button>
              </div>

              {/* Card Subheader */}
              <div className="px-5 py-3 border-b border-slate-100 bg-[#fafafa]/30 flex items-center gap-2">
                <FileText size={16} className="text-blue-500" />
                <span className="text-xs font-normal text-slate-400 uppercase tracking-wider">
                  Audit-712C
                </span>
              </div>

              {/* Audit Table */}
              <div className="px-5 py-3 flex flex-col bg-white">
                <div className="grid grid-cols-[1.8fr_1fr_1fr] gap-4 pb-3 border-b border-slate-100 mb-1">
                  <span className="text-xs text-slate-400 font-normal tracking-wide">Directives</span>
                  <span className="text-xs text-slate-400 font-normal tracking-wide">Evidence</span>
                  <span className="text-xs text-slate-400 font-normal tracking-wide">State</span>
                </div>
                {AUDIT_ROWS.map((row) => (
                  <div
                    key={row.directive}
                    className="grid grid-cols-[1.8fr_1fr_1fr] gap-4 py-2.5 items-center border-b border-slate-50 last:border-0"
                  >
                    <span className="text-xs sm:text-sm text-slate-700 font-normal tracking-tight">
                      {row.directive}
                    </span>
                    <div className="flex items-center gap-1.5">
                      <div className="w-5 h-5 p-px rounded-[4px] bg-linear-to-b from-slate-300/60 to-slate-100 flex items-center justify-center shadow-[0px_1px_2px_0px_rgba(0,0,0,0.02)]">
                        <div className="w-full h-full bg-slate-50 rounded-[3px] flex items-center justify-center">
                          <div className="w-2 h-2 bg-slate-300 rounded-xs" />
                        </div>
                      </div>
                      <div className="h-5 p-px rounded-[4px] bg-linear-to-b from-slate-300/60 to-slate-100 flex items-center justify-center shadow-[0px_1px_2px_0px_rgba(0,0,0,0.02)]">
                        <div className="flex items-center gap-0.5 h-full px-1.25 bg-slate-50 rounded-[3px] text-xs text-slate-500 font-normal">
                          <Folder size={12} className="text-slate-400" />
                          {row.files}
                        </div>
                      </div>
                    </div>
                    <div>
                      {row.status === "verified" ? (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 text-xs font-normal tracking-tight">
                          <CheckCircle size={14} className="text-emerald-500" />
                          Verified
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-red-500 text-white text-xs font-normal tracking-tight shadow-sm">
                          <AlertTriangle size={12} className="text-white/90" />
                          Flagged
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>

            </div>
          </div>
        </section>

        {/* Bottom Features Grid */}
        <section
          ref={featuresRef}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 lg:gap-16 pt-4"
        >
          {FEATURES.map((feature) => (
            <div key={feature.title} className="cp-feature-item flex flex-col gap-3">
              <h3 className="text-sm sm:text-base font-normal text-slate-900 tracking-tight">
                {feature.title}
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">{feature.desc}</p>
            </div>
          ))}
        </section>

      </main>
    </section>
  );
}
