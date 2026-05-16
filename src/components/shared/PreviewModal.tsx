"use client";

import { useEffect } from "react";
import { X } from "lucide-react";
import CompliancePlatform from "@/app/example/Compliance-Platform";

interface PreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function PreviewModal({ isOpen, onClose }: PreviewModalProps) {
  // Close on ESC key
  useEffect(() => {
    if (!isOpen) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <>
      {/* Fixed backdrop — blur + dim, click to close */}
      <div
        className="fixed inset-0 z-199 cursor-pointer"
        onClick={onClose}
        aria-hidden="true"
        style={{
          backdropFilter: "blur(12px) saturate(160%)",
          WebkitBackdropFilter: "blur(12px) saturate(160%)",
          background: "rgba(0,0,0,0.45)",
          animation: "modal-backdrop-in 0.3s ease forwards",
        }}
      />

      {/* Scroll container — fixed overlay that scrolls its content */}
      <div
        className="fixed inset-0 z-200 overflow-y-auto overscroll-contain"
        data-preview-scroller="true"
        role="dialog"
        aria-modal="true"
        aria-label="Feature preview"
        onClick={onClose}
      >
        {/* Inner centering wrapper */}
        <div className="flex min-h-full items-stretch justify-center p-0 sm:items-start sm:px-6 sm:py-14">
          {/* Fullscreen on mobile, modal card on larger screens */}
          <div
            className="relative min-h-dvh h-auto w-full max-w-none rounded-none bg-white shadow-none sm:h-auto sm:max-w-5xl sm:rounded-2xl sm:shadow-[0_24px_80px_-8px_rgba(0,0,0,0.28),0_0_0_1px_rgba(0,0,0,0.05)]"
            style={{
              animation: "modal-card-in 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards",
            }}
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
            <div className="h-full overflow-hidden rounded-none sm:rounded-2xl">
              <CompliancePlatform />
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes modal-backdrop-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes modal-card-in {
          from { opacity: 0; transform: scale(0.90) translateY(20px); }
          to { opacity: 1; transform: scale(1) translateY(0); }
        }
      `}</style>
    </>
  );
}
