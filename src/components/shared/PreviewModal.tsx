"use client";

import { useEffect } from "react";
import { X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import CompliancePlatform from "@/app/example/Compliance-Platform";
import { AgentSquadPreview } from "@/components/modals/AgentSquadPreview";
import { OpenAgentsPreview } from "@/components/modals/OpenAgentsPreview";
import { AiMemoryPreview } from "@/components/modals/AiMemoryPreview";
import { AgenticWorkflowPreview } from "@/components/modals/AgenticWorkflowPreview";

interface PreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedCard?: number | null;
}

export function PreviewModal({ isOpen, onClose, selectedCard }: PreviewModalProps) {
  // Close on ESC key
  useEffect(() => {
    if (!isOpen) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Fixed backdrop — blur + dim, click to close */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-199 cursor-pointer"
            onClick={onClose}
            aria-hidden="true"
            style={{
              backdropFilter: "blur(12px) saturate(160%)",
              WebkitBackdropFilter: "blur(12px) saturate(160%)",
              background: "rgba(0,0,0,0.45)",
            }}
          />

          {/* Scroll container — fixed overlay that scrolls its content */}
          <div
            className="fixed inset-0 z-200 overflow-y-auto overscroll-contain flex min-h-full items-stretch justify-center p-0 sm:items-start sm:px-6 sm:py-14"
            data-preview-scroller="true"
            role="dialog"
            aria-modal="true"
            aria-label="Feature preview"
            onClick={onClose}
          >
            {/* Fullscreen on mobile, modal card on larger screens */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 30,
              }}
              className="relative min-h-dvh h-auto w-full max-w-none rounded-none bg-white shadow-none sm:my-6 sm:max-h-[calc(100dvh-3rem)] sm:min-h-0 sm:max-w-7xl sm:rounded-2xl sm:shadow-[0_24px_80px_-8px_rgba(0,0,0,0.28),0_0_0_1px_rgba(0,0,0,0.05)]"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Floating close button */}
              <button
                onClick={onClose}
                className="absolute top-3.5 right-3.5 z-20 flex h-8 w-8 cursor-pointer items-center justify-center rounded-lg bg-slate-100 text-slate-500 transition-all duration-150 hover:bg-slate-200 hover:text-slate-800 active:scale-90"
                aria-label="Close preview"
              >
                <X size={15} strokeWidth={2} />
              </button>

              {/* Content */}
              <div className="h-full overflow-y-auto overflow-x-hidden rounded-none sm:rounded-2xl">
                {selectedCard === 1 && <AgentSquadPreview />}
                {selectedCard === 4 && <OpenAgentsPreview />}
                {selectedCard === 7 && <AiMemoryPreview />}
                {selectedCard === 8 && <AgenticWorkflowPreview />}
                {!selectedCard && <CompliancePlatform />}
                {selectedCard && ![1, 4, 7, 8].includes(selectedCard) && <CompliancePlatform />}
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
