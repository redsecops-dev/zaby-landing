"use client";

import { useEffect } from "react";
import { initSmoothScroll } from "@/lib/lenis";

export function SmoothScrollProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const scrollInstance = initSmoothScroll();
    return () => {
      if (scrollInstance) {
        scrollInstance.destroy();
      }
    };
  }, []);

  return <>{children}</>;
}
