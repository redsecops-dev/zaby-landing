"use client";

import { useEffect, useState } from "react";
import { ChevronRight } from "lucide-react";
import { type Section } from "@/lib/blog";
import { cn } from "@/lib/utils";

interface TableOfContentsProps {
  sections: Section[];
  accentBarClass: string;
}

export function TableOfContents({ sections, accentBarClass }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      {
        rootMargin: "-100px 0% -80% 0%",
        threshold: 0,
      }
    );

    sections.forEach((section) => {
      const element = document.getElementById(section.id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, [sections]);

  return (
    <nav className="space-y-4">
      {sections.map((section) => (
        <a
          key={section.id}
          href={`#${section.id}`}
          onClick={(e) => {
            e.preventDefault();
            document.getElementById(section.id)?.scrollIntoView({
              behavior: "smooth",
            });
          }}
          className={cn(
            "group flex items-start gap-2 text-sm transition-all duration-300 leading-tight",
            activeId === section.id
              ? "text-fuchsia-600 font-bold translate-x-1"
              : "text-neutral-500 hover:text-fuchsia-600"
          )}
        >
          <ChevronRight 
            className={cn(
              "w-3.5 h-3.5 mt-0.5 transition-all duration-300 shrink-0",
              activeId === section.id ? "opacity-100" : "opacity-0 group-hover:opacity-100"
            )} 
          />
          <span className="relative">
            {section.heading}
            {activeId === section.id && (
              <span className={cn("absolute -left-5 top-1/2 -translate-y-1/2 w-1 h-4 rounded-full", accentBarClass)} />
            )}
          </span>
        </a>
      ))}
    </nav>
  );
}
