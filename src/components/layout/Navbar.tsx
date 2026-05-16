"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Menu, X, ArrowRight } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { navLinks } from "@/config/nav";
import { siteConfig } from "@/config/site";
import Image from "next/image";

export function Navbar() {
  const progressRef = useRef<HTMLDivElement>(null);
  const mobileToggleRef = useRef<HTMLButtonElement>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Pages that should have a transparent navbar at the top (usually with dark heroes).
  // Blog detail pages use the standard light editorial header.
  const isTransparentPage = false;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const progressBar = progressRef.current;
    if (!progressBar) return;

    const updateScrollProgress = () => {
      const scrollOffset = document.documentElement.scrollTop;
      const scrollHeight =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight;

      if (scrollHeight <= 0) {
        progressBar.style.width = "0%";
        return;
      }
      progressBar.style.width = `${(scrollOffset / scrollHeight) * 100}%`;
    };

    updateScrollProgress();
    window.addEventListener("scroll", updateScrollProgress, { passive: true });
    return () => window.removeEventListener("scroll", updateScrollProgress);
  }, []);

  useEffect(() => {
    if (!mobileOpen) return;

    const toggleEl = mobileToggleRef.current;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMobileOpen(false);
      }
    };

    window.addEventListener("keydown", onKeyDown);

    return () => {
      window.removeEventListener("keydown", onKeyDown);
      toggleEl?.focus();
    };
  }, [mobileOpen]);

  return (
    <>
      {/* Scroll progress bar */}
      <div
        aria-hidden="true"
        className="fixed left-0 top-0 z-60 h-0.5 w-full bg-transparent"
      >
        <div
          ref={progressRef}
          className="h-full bg-accent shadow-[0_0_10px_var(--color-accent)] transition-[width] duration-100 ease-out"
          style={{ width: "0%" }}
        />
      </div>

      {/* Floating pill / sticky rectangle navbar */}
      <header
        className={cn(
          "fixed top-0 z-50 w-full px-0 pt-0 transition-[padding] duration-300 ease-out",
          scrolled ? "md:px-0 md:pt-0" : "md:px-4 md:pt-6"
        )}
        role="banner"
      >
        {/* Container: animates max-width from pill constraint → full-width */}
        <div
          className="mx-auto transition-all duration-300 ease-out"
          style={{ maxWidth: scrolled ? "100%" : "72rem" }}
        >
          <nav
            className={cn(
              "rounded-none border-b border-border/60 bg-white/92 backdrop-blur-md transition-all duration-300 ease-out",
              mobileOpen && "border-b-transparent",
              scrolled
                ? "md:rounded-none md:border-b md:border-border/60 md:bg-white/90"
                : isTransparentPage 
                  ? "md:rounded-full md:border md:border-white/10 md:border-b md:border-b-white/10 md:bg-white/5 md:shadow-none"
                  : "md:rounded-full md:border md:border-border md:border-b md:border-b-border md:bg-white/50 md:shadow-xl md:shadow-black/6"
            )}
            aria-label="Main navigation"
          >
            {/* Inner content — max-w-7xl when full-width to keep items from spreading on ultrawide */}
            <div
              className={cn(
                "flex items-center justify-between transition-all duration-300 ease-out",
                scrolled
                  ? "mx-auto w-full max-w-7xl px-4 py-2.5 sm:px-6 md:px-10 md:py-3"
                  : "px-3 py-2 sm:px-4 md:px-6 md:py-4"
              )}
            >
            {/* Logo */}
            <Link
              href="/"
              className="flex items-center gap-3"
              aria-label={`${siteConfig.name} home`}
            >
             <Image 
               src={(!scrolled && isTransparentPage) ? '/zaby-logos/logo-white.svg' : '/zaby-logos/logo-dark.svg'} 
               alt={`${siteConfig.name} logo`} 
               width={58} 
               height={58} 
               className="h-9 w-auto transition-all duration-300 md:h-11"
             />
            </Link>

            {/* Desktop nav links */}
            <div className="hidden items-center gap-8 md:flex">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "text-sm transition-colors duration-300",
                    (!scrolled && isTransparentPage)
                      ? "text-white/70 hover:text-white"
                      : "text-text-secondary hover:text-text-primary"
                  )}
                  {...(link.external
                    ? { target: "_blank", rel: "noopener noreferrer" }
                    : {})}
                >
                  {link.label}
                </Link>
              ))}
            </div>

            {/* Right: Sign in + CTA + mobile toggle */}
            <div className="flex items-center gap-2 md:gap-4">
              <Link
                href="/login"
                className={cn(
                  "rounded-md px-2 py-1.5 text-sm font-medium transition-colors duration-300",
                  (!scrolled && isTransparentPage)
                    ? "text-white/70 hover:text-white"
                    : "text-text-secondary hover:bg-muted hover:text-text-primary"
                )}
                onClick={() => setMobileOpen(false)}
              >
                Sign in
              </Link>

              {/* Gradient-border CTA button */}
              <Link
                href="#pricing"
                className="group relative hidden shrink-0 overflow-hidden rounded-full md:block"
                aria-label="Get started with Zaby"
              >
                <span className="relative flex items-center gap-2 rounded-full bg-(--color-button-primary-bg) px-4 py-3.5 text-white shadow-[rgba(76,29,149,0.5)_0px_10px_30px_-10px] transition-all duration-300 hover:bg-(--color-button-primary-hover) md:px-6">
                  <span className="text-xs font-medium uppercase tracking-wider text-white">
                    Get Started
                  </span>
                  <ArrowRight
                    size={14}
                    strokeWidth={1.5}
                    className="text-white transition-transform duration-300 group-hover:translate-x-1"
                  />
                </span>
              </Link>

              {/* Mobile toggle */}
              <button
                ref={mobileToggleRef}
                type="button"
                className="flex items-center justify-center rounded-full p-2 text-text-secondary transition-colors hover:text-text-primary md:hidden"
                aria-label={
                  mobileOpen ? "Close navigation menu" : "Open navigation menu"
                }
                aria-expanded={mobileOpen}
                aria-controls="mobile-menu"
                onClick={() => setMobileOpen((v) => !v)}
              >
                {mobileOpen ? (
                  <X size={20} strokeWidth={1.5} aria-hidden="true" />
                ) : (
                  <Menu size={20} strokeWidth={1.5} aria-hidden="true" />
                )}
              </button>
            </div>
            </div>
          </nav>

          {/* Mobile drawer attached below navbar */}
          <AnimatePresence initial={false}>
            {mobileOpen && (
              <motion.div
                id="mobile-menu"
                role="navigation"
                aria-label="Mobile navigation"
                initial={{ opacity: 0, y: -10, height: 0 }}
                animate={{ opacity: 1, y: 0, height: "auto" }}
                exit={{ opacity: 0, y: -10, height: 0 }}
                transition={{ duration: 0.24, ease: "easeOut" }}
                className="overflow-hidden border-y border-border/60 bg-white/95 shadow-[0_8px_24px_rgba(15,23,42,0.08)] backdrop-blur-md md:hidden"
              >
                <ul
                  role="list"
                  className="flex flex-col px-3 py-2"
                >
                  {navLinks.map((link, idx) => (
                    <motion.li
                      key={link.href}
                      initial={{ opacity: 0, y: -6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -6 }}
                      transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1], delay: idx * 0.04 }}
                    >
                      <Link
                        href={link.href}
                        className={cn(
                          "block border-b border-border/55 px-3 py-3.5 text-[15px] font-medium text-text-secondary",
                          "transition-colors duration-200 hover:bg-slate-50 hover:text-text-primary"
                        )}
                        onClick={() => setMobileOpen(false)}
                        {...(link.external
                          ? { target: "_blank", rel: "noopener noreferrer" }
                          : {})}
                      >
                        {link.label}
                      </Link>
                    </motion.li>
                  ))}

                  <motion.li
                    className="pt-3"
                    initial={{ opacity: 0, y: -6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
                  >
                    <Link
                      href="#pricing"
                      className="group relative block overflow-hidden rounded-lg"
                      onClick={() => setMobileOpen(false)}
                    >
                      <span className="relative flex items-center justify-center gap-2 rounded-lg bg-(--color-button-primary-bg) px-4 py-3 text-white shadow-[rgba(76,29,149,0.35)_0px_8px_18px_-10px] transition-all duration-300 hover:bg-(--color-button-primary-hover)">
                        <span className="text-sm font-medium text-white transition-colors duration-300">
                          Get Started
                        </span>
                        <ArrowRight
                          size={14}
                          strokeWidth={1.5}
                          className="text-white transition-all duration-300 group-hover:translate-x-1"
                        />
                      </span>
                    </Link>
                  </motion.li>
                </ul>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </header>
    </>
  );
}
