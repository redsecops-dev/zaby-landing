"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Shield, ChevronRight, X, Settings2, Info } from "lucide-react";
import { cn } from "@/lib/utils";

interface CookieCategory {
  id: string;
  title: string;
  description: string;
  enabled: boolean;
  required?: boolean;
}

export function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [categories, setCategories] = useState<CookieCategory[]>([
    {
      id: "necessary",
      title: "Essential Infrastructure",
      description: "Critical technologies required for secure runtime execution, platform stability, and core operational functions.",
      enabled: true,
      required: true,
    },
    {
      id: "analytics",
      title: "Observability & Analytics",
      description: "Infrastructure telemetry and platform analytics used to measure system performance and improve operational reliability.",
      enabled: true,
    },
    {
      id: "marketing",
      title: "Operational Growth",
      description: "Non-intrusive technologies used to communicate platform updates and reach new enterprise operators.",
      enabled: true,
    },
    {
      id: "personalization",
      title: "Experience Optimization",
      description: "Preferences and caching layers designed to optimize the platform experience and reduce execution latency.",
      enabled: true,
    },
  ]);

  useEffect(() => {
    const consent = localStorage.getItem("cookie-consent");
    if (!consent) {
      const timer = setTimeout(() => setIsVisible(true), 2000);
      return () => clearTimeout(timer);
    }
  }, []);

  const saveToStorage = (consents: Record<string, boolean>) => {
    localStorage.setItem("cookie-consent", JSON.stringify(consents));
    localStorage.setItem("cookie-consent-timestamp", new Date().toISOString());
    setIsVisible(false);
  };

  const handleAcceptAll = () => {
    const consents = categories.reduce((acc, cat) => ({ ...acc, [cat.id]: true }), {});
    saveToStorage(consents);
  };

  const handleSavePreferences = () => {
    const consents = categories.reduce((acc, cat) => ({ ...acc, [cat.id]: cat.enabled }), {});
    saveToStorage(consents);
  };

  const toggleCategory = (id: string) => {
    setCategories(prev =>
      prev.map(c => (c.id === id && !c.required ? { ...c, enabled: !c.enabled } : c))
    );
  };

  if (!isVisible) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 20, scale: 0.95 }}
        transition={{ type: "spring", damping: 25, stiffness: 200 }}
        className={cn(
          "fixed bottom-12 left-12 z-100 max-w-[460px] w-[calc(100vw-96px)]",
          "bg-white/70 backdrop-blur-3xl border border-white/40 shadow-[0_20px_50px_rgba(0,0,0,0.1)]",
          "rounded-[2rem] overflow-hidden antialiased select-none",
          isExpanded && "max-w-[520px]"
        )}
      >
        {/* Cinematic Gradient Overlay */}
        <div className="absolute inset-0 pointer-events-none bg-linear-to-br from-fuchsia-500/[0.03] to-blue-500/[0.03]" />
        
        {/* Glass border glow */}
        <div className="absolute inset-0 pointer-events-none rounded-[2rem] ring-1 ring-inset ring-white/30 shadow-[inset_0_1px_1px_rgba(255,255,255,0.4)]" />

        <div className="relative p-8">
          {!isExpanded ? (
            <div className="space-y-7">
              <div className="flex items-start gap-6">
                <div className="relative mt-1 flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-white shadow-[0_4px_12px_rgba(0,0,0,0.05)] text-fuchsia-600 border border-neutral-100">
                  <Shield size={22} strokeWidth={1.5} />
                  <span className="absolute -top-1 -right-1 flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-fuchsia-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-fuchsia-500 shadow-[0_0_8px_rgba(217,70,239,0.8)]"></span>
                  </span>
                </div>
                <div className="space-y-2.5">
                  <h3 className="text-[17px] font-bold tracking-tight text-neutral-950 leading-tight">
                    Cookies & Operational Preferences
                  </h3>
                  <p className="text-[14px] leading-relaxed text-neutral-500 font-medium">
                    Zaby uses essential technologies to improve operational reliability, platform analytics, and infrastructure performance while maintaining enterprise privacy standards.
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <button
                  onClick={handleAcceptAll}
                  className="flex-1 rounded-full bg-neutral-950 px-7 py-3.5 text-[14px] font-bold text-white transition-all hover:bg-neutral-800 hover:shadow-[0_8px_25px_rgba(0,0,0,0.15)] active:scale-[0.98] cursor-pointer"
                >
                  Enable Preferences
                </button>
                <button
                  onClick={() => setIsExpanded(true)}
                  className="flex items-center gap-2 px-4 py-3.5 text-[14px] font-bold text-neutral-500 hover:text-fuchsia-600 transition-colors cursor-pointer group"
                >
                  <Settings2 size={18} className="transition-transform group-hover:rotate-180 duration-500" />
                  <span>Settings</span>
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Settings2 size={16} className="text-fuchsia-600" />
                  <h3 className="text-[15px] font-bold tracking-tight text-neutral-900">
                    Infrastructure Settings
                  </h3>
                </div>
                <button
                  onClick={() => setIsExpanded(false)}
                  className="p-1 text-neutral-400 hover:text-neutral-900 transition-colors cursor-pointer"
                >
                  <X size={18} />
                </button>
              </div>

              <div className="space-y-4">
                {categories.map((category) => (
                  <div 
                    key={category.id} 
                    className={cn(
                      "group p-3.5 rounded-2xl border transition-all",
                      category.enabled ? "bg-fuchsia-50/30 border-fuchsia-500/10" : "bg-neutral-50/50 border-neutral-100"
                    )}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="text-[13px] font-bold text-neutral-900">{category.title}</span>
                          {category.required && (
                            <span className="text-[9px] font-black uppercase tracking-widest text-fuchsia-600 bg-fuchsia-100 px-1.5 py-0.5 rounded">Required</span>
                          )}
                        </div>
                        <p className="text-[12px] leading-relaxed text-neutral-500">
                          {category.description}
                        </p>
                      </div>
                      {!category.required && (
                        <button
                          onClick={() => toggleCategory(category.id)}
                          className={cn(
                            "relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none",
                            category.enabled ? "bg-fuchsia-600" : "bg-neutral-200"
                          )}
                        >
                          <span
                            className={cn(
                              "pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow-sm ring-0 transition duration-200 ease-in-out",
                              category.enabled ? "translate-x-4" : "translate-x-0"
                            )}
                          />
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex flex-col gap-2 pt-2">
                <button
                  onClick={handleSavePreferences}
                  className="w-full rounded-full bg-neutral-900 px-5 py-3 text-[13px] font-bold text-white transition-all hover:bg-neutral-800 shadow-sm active:scale-[0.98] cursor-pointer"
                >
                  Apply Operational Settings
                </button>
                <p className="text-center text-[10px] text-neutral-400 font-medium">
                  By applying, you authorize these infrastructure configurations.
                </p>
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
