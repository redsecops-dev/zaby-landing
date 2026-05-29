"use client";

import React, { useState } from "react";
import { Turnstile, type TurnstileInstance } from "@marsidev/react-turnstile";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

export interface TurnstileCaptchaProps {
  /** Called with the verification token on success */
  onSuccess: (token: string) => void;
  /** Called when a previously valid token expires */
  onExpire?: () => void;
  /** Called when verification encounters an error */
  onError?: (error?: string) => void;
  /** Additional className for the wrapper */
  className?: string;
  /** Reset key — change to force a re-render of the widget */
  resetKey?: string | number;
}

type CaptchaStatus = "idle" | "verifying" | "verified" | "error";

export function TurnstileCaptcha({
  onSuccess,
  onExpire,
  onError,
  className,
  resetKey,
}: TurnstileCaptchaProps) {
  const [status, setStatus] = useState<CaptchaStatus>("idle");
  const widgetRef = React.useRef<TurnstileInstance | null>(null);

  const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

  if (!siteKey) {
    console.error("TurnstileCaptcha: NEXT_PUBLIC_TURNSTILE_SITE_KEY is not set");
    return null;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className={cn(
        "flex flex-col items-center gap-3",
        className
      )}
    >
      {/* Turnstile Widget */}
      <div className="relative">
        <Turnstile
          key={resetKey}
          ref={widgetRef}
          siteKey={siteKey}
          options={{
            theme: "light",
            size: "normal",
            appearance: "always",
          }}
          onSuccess={(token) => {
            setStatus("verified");
            onSuccess(token);
          }}
          onExpire={() => {
            setStatus("idle");
            onExpire?.();
          }}
          onError={(error) => {
            setStatus("error");
            onError?.(error);
          }}
          onWidgetLoad={() => {
            setStatus("verifying");
          }}
        />
      </div>

      {/* Status indicator */}
      <AnimatePresence mode="wait">
        {status === "verified" && (
          <motion.div
            key="verified"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="flex items-center gap-1.5 text-xs font-medium text-emerald-600"
          >
            <svg
              className="h-3.5 w-3.5"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <motion.path
                d="M3 8.5L6.5 12L13 4"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.4, delay: 0.1, ease: "easeOut" }}
              />
            </svg>
            Verified
          </motion.div>
        )}

        {status === "error" && (
          <motion.p
            key="error"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="text-xs text-red-500"
          >
            Verification failed. Please try again.
          </motion.p>
        )}
      </AnimatePresence>

      {/* Branding line */}
      <p className="text-[10px] tracking-wide text-[var(--color-text-secondary)]/40 select-none">
        Protected by Cloudflare Turnstile
      </p>
    </motion.div>
  );
}
