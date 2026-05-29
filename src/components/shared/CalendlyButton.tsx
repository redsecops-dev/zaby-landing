"use client";

import React, { useState, useEffect } from "react";
import { PopupModal } from "react-calendly";
import { motion } from "framer-motion";
import { Icon } from "@iconify/react";
import { cn } from "@/lib/utils";

export interface CalendlyButtonProps {
  /** The Calendly event URL (e.g. 'https://calendly.com/acme/demo') */
  url?: string;
  /** Button style variant */
  variant?: "primary" | "secondary" | "navbar" | "hero";
  /** Custom text label */
  text?: string;
  /** Additional custom classNames */
  className?: string;
  /** Calendly prefill settings */
  prefill?: {
    email?: string;
    name?: string;
    firstName?: string;
    lastName?: string;
    customAnswers?: Record<string, string>;
  };
  /** Icon name from Iconify to display inside the button */
  icon?: string;
  /** Callback triggered when the modal is closed */
  onClose?: () => void;
}

export function CalendlyButton({
  url,
  variant = "primary",
  text = "Book a Demo",
  className,
  prefill,
  icon,
  onClose,
}: CalendlyButtonProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  // Read environment variable with fallback
  const calendlyUrl =
    url ||
    process.env.NEXT_PUBLIC_CALENDLY_URL ||
    "https://calendly.com/zaby-ai/demo";

  // Prevent server-side rendering issues with document element references
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Lock body & html scroll and remove iframe scrollbar when Calendly modal is active
  useEffect(() => {
    if (!isOpen) return;

    const originalBodyOverflow = document.body.style.overflow;
    const originalHtmlOverflow = document.documentElement.style.overflow;
    const originalPaddingRight = document.body.style.paddingRight;

    // Calculate scrollbar width to prevent page shift
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;

    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";
    document.documentElement.classList.add("calendly-open");

    if (scrollbarWidth > 0) {
      document.body.style.paddingRight = `${scrollbarWidth}px`;
    }

    // Interval to find and disable scrolling on Calendly iframe
    const intervalId = setInterval(() => {
      const iframe = document.querySelector(".calendly-overlay iframe");
      if (iframe) {
        iframe.setAttribute("scrolling", "no");
        clearInterval(intervalId);
      }
    }, 100);

    return () => {
      clearInterval(intervalId);
      document.body.style.overflow = originalBodyOverflow;
      document.documentElement.style.overflow = originalHtmlOverflow;
      document.documentElement.classList.remove("calendly-open");
      document.body.style.paddingRight = originalPaddingRight;
    };
  }, [isOpen]);

  const handleOpen = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
    onClose?.();
  };

  // Variant class mappings
  const baseClasses =
    "inline-flex items-center justify-center gap-2 font-medium tracking-wide transition-all duration-300 cursor-pointer select-none active:scale-[0.98]";

  const variantClasses = {
    primary:
      "rounded-2xl bg-linear-to-br from-purple-600 via-fuchsia-600 to-indigo-600 hover:from-purple-500 hover:via-fuchsia-500 hover:to-indigo-500 text-white px-6 py-3.5 text-sm shadow-[0_8px_30px_rgba(168,85,247,0.25)] dark:shadow-[0_8px_30px_rgba(168,85,247,0.15)] hover:shadow-[0_12px_40px_rgba(168,85,247,0.4)]",
    secondary:
      "rounded-2xl border border-purple-500/20 bg-purple-500/5 hover:bg-purple-500/10 text-purple-600 dark:text-purple-400 px-6 py-3.5 text-sm backdrop-blur-sm",
    navbar:
      "rounded-full text-xs font-semibold px-4.5 py-2.5 bg-slate-950 text-white dark:bg-white dark:text-slate-950 hover:bg-slate-900 dark:hover:bg-slate-50 shadow-sm",
    hero:
      "rounded-2xl bg-[var(--color-button-primary-bg)] hover:from-purple-500 hover:via-fuchsia-500 hover:to-pink-500 text-white px-8 py-4.5 text-base font-semibold shadow-[0_10px_35px_rgba(168,85,247,0.3)] hover:shadow-[0_15px_45px_rgba(168,85,247,0.55)]",
  };

  const renderIcon = () => {
    if (icon) {
      return <Icon icon={icon} width={variant === "hero" ? 20 : 16} height={variant === "hero" ? 20 : 16} />;
    }
    // Default fallback icons based on variant
    if (variant === "hero") {
      return <Icon icon="solar:calendar-date-bold-duotone" width={22} height={22} />;
    }
    return <Icon icon="solar:calendar-mark-line-duotone" width={16} height={16} />;
  };

  return (
    <>
      <motion.button
        type="button"
        onClick={handleOpen}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className={cn(baseClasses, variantClasses[variant], className)}
      >
        {renderIcon()}
        <span>{text}</span>
      </motion.button>

      {isMounted && (
        <PopupModal
          url={calendlyUrl}
          pageSettings={{
            backgroundColor: "ffffff",
            hideEventTypeDetails: false,
            hideLandingPageDetails: false,
            primaryColor: "a855f7", // Purple theme matching Zaby brand
            textColor: "1e293b",
          }}
          prefill={prefill}
          onModalClose={handleClose}
          open={isOpen}
          rootElement={document.body}
        />
      )}
    </>
  );
}
