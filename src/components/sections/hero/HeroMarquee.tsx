import type { CSSProperties } from "react";
import { Icon } from "@iconify/react";
import { Manrope } from "next/font/google";

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const BRAND_ITEMS = [
  { icon: "solar:hexagon-linear",  name: "Acme Corp",  bold: false },
  { icon: "solar:triangle-linear", name: "Vortex",     bold: false },
  { icon: "solar:target-linear",   name: "Sphere",     bold: true  },
  { icon: "solar:box-linear",      name: "Cube AI",    bold: true  },
  { icon: "solar:globus-linear",   name: "Nexus",      bold: false },
  { icon: "solar:cpu-linear",      name: "Synapse",    bold: false },
] as const;

const marqueeMaskStyle: CSSProperties = {
  maskImage:
    "linear-gradient(to right, transparent, black 5%, black 95%, transparent)",
  WebkitMaskImage:
    "linear-gradient(to right, transparent, black 5%, black 95%, transparent)",
};

export interface HeroMarqueeProps {
  className?: string;
}

export function HeroMarquee({ className }: HeroMarqueeProps) {
  return (
    <div
      className={`relative -mx-4 overflow-hidden border-y border-border bg-white/10 backdrop-blur-xs py-10 md:-mx-6 md:py-14${className ? ` ${className}` : ""}`}
      aria-hidden="true"
    >
      <div
        className="relative flex w-full overflow-hidden"
        style={marqueeMaskStyle}
      >
        <div className="marquee-track flex w-max">
          {[0, 1].map((copyIndex) => (
            <div
              key={copyIndex}
              aria-hidden={copyIndex === 1 ? true : undefined}
              className="flex items-center gap-12 whitespace-nowrap px-6 md:gap-24 md:px-12"
            >
              {BRAND_ITEMS.map((brand) => (
                <div
                  key={`${copyIndex}-${brand.name}`}
                  className={`flex items-center gap-3 text-xl tracking-tight text-text-primary md:text-2xl ${manrope.className} ${brand.bold ? "font-bold" : "font-semibold"}`}
                >
                  <Icon icon={brand.icon} width={28} height={28} />
                  {brand.name}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
