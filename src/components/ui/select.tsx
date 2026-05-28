"use client";

import * as React from "react";
import { Icon } from "@iconify/react";
import { cn } from "@/lib/utils";

interface SelectProps {
  value: string;
  onValueChange: (value: string) => void;
  placeholder?: string;
  options: readonly string[] | string[];
  className?: string;
  id?: string;
  required?: boolean;
}

export function Select({
  value,
  onValueChange,
  placeholder = "Select an option",
  options,
  className,
  id,
  required,
}: SelectProps) {
  const [isOpen, setIsOpen] = React.useState(false);
  const containerRef = React.useRef<HTMLDivElement>(null);

  // Close when clicking outside
  React.useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (option: string) => {
    onValueChange(option);
    setIsOpen(false);
  };

  return (
    <div className="relative w-full" ref={containerRef} id={id}>
      {/* Trigger Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "flex w-full items-center justify-between rounded-xl border border-[var(--color-border-strong)]/50 bg-white/50 px-4 py-3 text-sm text-[var(--color-text-primary)] placeholder:text-[var(--color-text-secondary)]/50 backdrop-blur-sm transition-all duration-150 outline-none focus:border-[var(--color-accent)]/50 focus:bg-white/70 focus:ring-2 focus:ring-[var(--color-accent)]/20 cursor-pointer text-left",
          !value && "text-[var(--color-text-secondary)]/50",
          className
        )}
      >
        <span className="truncate">{value || placeholder}</span>
        <Icon
          icon="solar:alt-arrow-down-bold"
          width={16}
          height={16}
          className={cn(
            "text-[var(--color-text-secondary)]/60 transition-transform duration-200 shrink-0 ml-2",
            isOpen && "transform rotate-180 text-[var(--color-accent-soft)]"
          )}
        />
      </button>

      {/* Hidden input to support native form validation (required) */}
      {required && (
        <input
          type="hidden"
          value={value}
          required
          aria-hidden="true"
        />
      )}

      {/* Dropdown Menu */}
      {isOpen && (
        <div 
          data-lenis-prevent
          className="absolute z-50 mt-2 max-h-60 w-full overflow-y-auto rounded-xl border border-[var(--color-border-strong)]/50 bg-white/95 dark:bg-zinc-950/95 backdrop-blur-xl p-1.5 shadow-xl transition-all animate-in fade-in-50 slide-in-from-top-1"
        >
          {options.map((option) => {
            const isSelected = option === value;
            return (
              <button
                key={option}
                type="button"
                onClick={() => handleSelect(option)}
                className={cn(
                  "flex w-full items-center justify-between rounded-lg px-3 py-2 text-xs md:text-sm text-left transition-colors cursor-pointer text-[var(--color-text-primary)] hover:bg-[var(--color-accent)]/10 dark:hover:bg-[var(--color-accent)]/15",
                  isSelected && "bg-[var(--color-accent)]/10 text-[var(--color-accent-soft)] font-semibold"
                )}
              >
                <span className="truncate">{option}</span>
                {isSelected && (
                  <Icon
                    icon="solar:check-circle-bold"
                    width={16}
                    height={16}
                    className="text-[var(--color-accent-soft)] shrink-0 ml-2"
                  />
                )}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
