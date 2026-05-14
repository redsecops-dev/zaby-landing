"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Menu, X, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { navLinks } from "@/config/nav";
import { siteConfig } from "@/config/site";
import Image from "next/image";

import { usePathname } from "next/navigation";

export function Navbar() {
  const pathname = usePathname();
  const progressRef = useRef<HTMLDivElement>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Pages that should have a transparent navbar at the top (usually with dark heroes)
  const isTransparentPage = /^\/blog\/.+/.test(pathname);

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
          "fixed top-0 z-50 w-full transition-[padding] duration-300 ease-out",
          scrolled ? "px-0 pt-0" : "px-4 pt-4 md:pt-6"
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
              "transition-all duration-300 ease-out",
              scrolled
                ? "rounded-none border-b border-border/60 bg-white/90 backdrop-blur-md"
                : isTransparentPage 
                  ? "rounded-full border border-white/10 bg-white/5 backdrop-blur-md shadow-none"
                  : "rounded-full border border-border bg-white/50 shadow-xl shadow-black/6 backdrop-blur-md"
            )}
            aria-label="Main navigation"
          >
            {/* Inner content — max-w-7xl when full-width to keep items from spreading on ultrawide */}
            <div
              className={cn(
                "flex items-center justify-between transition-all duration-300 ease-out",
                scrolled
                  ? "mx-auto w-full max-w-7xl px-6 py-3 md:px-10"
                  : "px-4 py-3 md:px-6 md:py-4"
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
               className="transition-all duration-300"
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
            <div className="flex items-center gap-4">
              <Link
                href="/login"
                className={cn(
                  "hidden text-sm font-medium transition-colors duration-300 sm:block",
                  (!scrolled && isTransparentPage)
                    ? "text-white/70 hover:text-white"
                    : "text-text-secondary hover:text-text-primary"
                )}
              >
                Sign in
              </Link>

              {/* Gradient-border CTA button */}
              <Link
                href="#pricing"
                className="group relative shrink-0 overflow-hidden rounded-full"
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

          {/* Mobile dropdown — same glass language as pill */}
          {mobileOpen && (
            <div
              id="mobile-menu"
              className={cn("mt-2", scrolled && "px-4")}
              role="navigation"
              aria-label="Mobile navigation"
            >
              <div className="rounded-2xl border border-border bg-white/95 p-4 shadow-xl shadow-black/6 backdrop-blur-xl">
                <ul className="flex flex-col gap-1" role="list">
                  {navLinks.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className={cn(
                          "block rounded-xl px-4 py-3 text-sm font-medium text-text-secondary",
                          "transition-colors duration-200 hover:bg-muted hover:text-text-primary"
                        )}
                        onClick={() => setMobileOpen(false)}
                        {...(link.external
                          ? { target: "_blank", rel: "noopener noreferrer" }
                          : {})}
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                  <li className="mt-2 border-t border-border pt-2">
                    <Link
                      href="#pricing"
                      className="group relative block overflow-hidden rounded-full"
                      onClick={() => setMobileOpen(false)}
                    >
                      <span className="relative flex items-center justify-center gap-2 rounded-full bg-(--color-button-primary-bg) px-4 py-3.5 text-white shadow-[rgba(76,29,149,0.5)_0px_10px_30px_-10px] transition-all duration-300 hover:bg-(--color-button-primary-hover)">
                        <span className="text-sm font-medium text-white transition-colors duration-300">
                          Get started
                        </span>
                        <ArrowRight
                          size={14}
                          strokeWidth={1.5}
                          className="text-white transition-all duration-300 group-hover:translate-x-1"
                        />
                      </span>
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          )}
        </div>
      </header>
    </>
  );
}
