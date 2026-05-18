"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Menu, X, ArrowRight, ChevronDown } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { navLinks, NavItem } from "@/config/nav";
import { siteConfig } from "@/config/site";
import Image from "next/image";

export function Navbar() {
  const progressRef = useRef<HTMLDivElement>(null);
  const mobileToggleRef = useRef<HTMLButtonElement>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [mobileAccordions, setMobileAccordions] = useState<Record<string, boolean>>({});

  const toggleMobileAccordion = (label: string) => {
    setMobileAccordions(prev => ({
      ...prev,
      [label]: !prev[label]
    }));
  };

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
        onMouseLeave={() => setActiveDropdown(null)}
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
              className="flex items-center gap-3 cursor-pointer"
              aria-label={`${siteConfig.name} home`}
              onMouseEnter={() => setActiveDropdown(null)}
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
            <div className="hidden items-center gap-1 lg:gap-2 md:flex">
              {navLinks.map((link) => (
                <div 
                  key={link.label}
                  className="relative"
                  onMouseEnter={() => link.dropdown ? setActiveDropdown(link.label) : setActiveDropdown(null)}
                >
                  <Link
                    href={link.href}
                    className={cn(
                      "flex items-center gap-1.5 rounded-full px-4 py-2 text-[0.92rem] font-medium transition-all duration-300 cursor-pointer whitespace-nowrap",
                      (!scrolled && isTransparentPage)
                        ? "text-white/70 hover:bg-white/10 hover:text-white"
                        : "text-text-secondary hover:bg-slate-100 hover:text-text-primary",
                      activeDropdown === link.label && "bg-slate-100 text-text-primary"
                    )}
                    {...(link.external
                      ? { target: "_blank", rel: "noopener noreferrer" }
                      : {})}
                  >
                    {link.label}
                    {link.dropdown && (
                      <ChevronDown 
                        size={14} 
                        className={cn(
                          "transition-transform duration-300",
                          activeDropdown === link.label && "rotate-180"
                        )} 
                      />
                    )}
                  </Link>
                </div>
              ))}
            </div>

            {/* Right: Sign in + CTA + mobile toggle */}
            <div className="flex items-center gap-2 md:gap-4">
              <Link
                href="https://platform.zaby.io/tenant/login"
                className={cn(
                  "transition-all duration-300 cursor-pointer",
                  // Mobile: Colored button
                  "px-4 py-1.5 rounded-full bg-fuchsia-600 text-white text-[13px] font-bold shadow-lg shadow-fuchsia-200 active:scale-[0.95]",
                  // Desktop: Subtle link
                  "md:bg-transparent md:text-sm md:font-medium md:px-2 md:py-1.5 md:rounded-md md:shadow-none md:active:scale-100",
                  (!scrolled && isTransparentPage)
                    ? "md:text-white/70 md:hover:text-white"
                    : "md:text-text-secondary md:hover:bg-slate-100 md:hover:text-text-primary"
                )}
                onClick={() => setMobileOpen(false)}
                onMouseEnter={() => setActiveDropdown(null)}
              >
                Sign in
              </Link>

              {/* Gradient-border CTA button */}
              <Link
                href="https://platform.zaby.io/tenant/signup"
                className="group relative hidden shrink-0 overflow-hidden rounded-full cursor-pointer md:block"
                aria-label="Get started with Zaby"
                onMouseEnter={() => setActiveDropdown(null)}
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
                className="flex items-center justify-center rounded-full p-2 text-text-secondary transition-colors hover:text-text-primary cursor-pointer touch-manipulation md:hidden"
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

            {/* Desktop Mega Menu Dropdown */}
            <AnimatePresence>
              {activeDropdown && (() => {
                const activeLink = navLinks.find(l => l.label === activeDropdown);
                if (!activeLink?.dropdown) return null;

                return (
                  <motion.div
                    initial={{ opacity: 0, y: 0 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 0 }}
                    transition={{ duration: 0.15, ease: "easeOut" }}
                    className={cn(
                      "absolute left-0 right-0 top-full hidden md:block",
                      scrolled ? "pt-0" : "pt-4"
                    )}
                  >
                    <div className={cn(
                      "overflow-hidden border border-border/60 bg-white/98 backdrop-blur-xl transition-all duration-300",
                      scrolled 
                        ? "rounded-b-2xl border-t-0" 
                        : "rounded-2xl"
                    )}>
                      <div className="mx-auto grid max-w-7xl grid-cols-12 gap-0">
                        {/* Left content: Dynamic based on active dropdown */}
                        <div className="col-span-8 grid grid-cols-2 gap-8 p-10">
                          {activeLink.sections?.map((section) => (
                            <div key={section.title} className="space-y-6">
                              <h3 className="text-[12px] font-bold uppercase tracking-[0.1em] text-text-secondary/60">
                                {section.title}
                              </h3>
                              <ul className="space-y-1">
                                {section.items.map((item) => (
                                  <li key={item.label}>
                                    <Link 
                                      href={item.href}
                                      className="group flex flex-col space-y-1 rounded-xl p-3 transition-all duration-200 hover:bg-slate-50"
                                      onClick={() => setActiveDropdown(null)}
                                    >
                                      <div className="text-[1rem] font-semibold text-text-primary transition-colors group-hover:text-accent">
                                        {item.label}
                                      </div>
                                      {item.description && (
                                        <p className="text-[0.85rem] leading-relaxed text-text-secondary/80">
                                          {item.description}
                                        </p>
                                      )}
                                    </Link>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          ))}
                        </div>

                        {/* Right Featured Section */}
                        {activeLink.featured && (
                          <div className="col-span-4 flex flex-col justify-center border-l border-border/40 bg-slate-50/30 p-10">
                            <div className="space-y-8">
                              <div className="space-y-4">
                                <h4 className="text-[1.25rem] font-bold tracking-tight text-text-primary">
                                  {activeLink.featured.title}
                                </h4>
                                <p className="text-[0.95rem] leading-relaxed text-text-secondary/90">
                                  {activeLink.featured.description}
                                </p>
                              </div>
                              <Link 
                                href={activeLink.featured.href}
                                className="group/btn inline-flex items-center gap-2 rounded-full bg-accent/5 px-6 py-3 text-[0.92rem] font-bold text-accent border border-accent/20 transition-all hover:bg-accent hover:text-white"
                                onClick={() => setActiveDropdown(null)}
                              >
                                {activeLink.featured.ctaLabel}
                                <ArrowRight size={16} className="transition-transform group-hover/btn:translate-x-1" />
                              </Link>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </motion.div>
                );
              })()}
            </AnimatePresence>
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
                      key={link.label}
                      initial={{ opacity: 0, y: -6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -6 }}
                      transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1], delay: idx * 0.04 }}
                    >
                      {link.dropdown ? (
                        <div className="border-b border-border/55">
                          <button
                            type="button"
                            className="flex w-full items-center justify-between px-3 py-3.5 text-[15px] font-medium text-text-secondary transition-colors hover:text-text-primary"
                            onClick={() => toggleMobileAccordion(link.label)}
                          >
                            {link.label}
                            <ChevronDown 
                              size={16} 
                              className={cn(
                                "transition-transform duration-200",
                                mobileAccordions[link.label] && "rotate-180"
                              )} 
                            />
                          </button>
                          <AnimatePresence>
                            {mobileAccordions[link.label] && (
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                className="overflow-hidden bg-slate-50"
                              >
                                {link.sections?.map((section) => (
                                  <div key={section.title} className="px-6 py-4 space-y-4">
                                    <h4 className="text-[11px] font-bold uppercase tracking-wider text-text-secondary/80">
                                      {section.title}
                                    </h4>
                                    <ul className="space-y-3">
                                      {section.items.map((item) => (
                                        <li key={item.label}>
                                          <Link
                                            href={item.href}
                                            className="block text-[14px] text-text-secondary hover:text-accent"
                                            onClick={() => setMobileOpen(false)}
                                          >
                                            {item.label}
                                          </Link>
                                        </li>
                                      ))}
                                    </ul>
                                  </div>
                                ))}
                                {link.featured && (
                                  <div className="m-3 rounded-xl bg-slate-100/50 p-4 border border-border/40 space-y-3">
                                    <h4 className="text-sm font-bold text-text-primary">{link.featured.title}</h4>
                                    <Link 
                                      href={link.featured.href}
                                      className="inline-flex items-center gap-1.5 text-xs font-bold text-accent"
                                      onClick={() => setMobileOpen(false)}
                                    >
                                      {link.featured.ctaLabel}
                                      <ArrowRight size={12} />
                                    </Link>
                                  </div>
                                )}
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      ) : (
                        <Link
                          href={link.href}
                          className={cn(
                            "block border-b border-border/55 px-3 py-3.5 text-[15px] font-medium text-text-secondary cursor-pointer touch-manipulation",
                            "transition-colors duration-200 hover:bg-slate-50 hover:text-text-primary"
                          )}
                          onClick={() => setMobileOpen(false)}
                          {...(link.external
                            ? { target: "_blank", rel: "noopener noreferrer" }
                            : {})}
                        >
                          {link.label}
                        </Link>
                      )}
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
                      className="group relative block overflow-hidden rounded-lg cursor-pointer touch-manipulation"
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
