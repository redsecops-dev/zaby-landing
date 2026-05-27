"use client";

import React from "react";
import { motion } from "framer-motion";
import { Icon } from "@iconify/react";
import { Award } from "lucide-react";

const BRAND_ITEMS = [
  { icon: "solar:hexagon-linear", name: "Acme Corp", bold: false },
  { icon: "solar:triangle-linear", name: "Vortex", bold: false },
  { icon: "solar:target-linear", name: "Sphere", bold: true },
  { icon: "solar:box-linear", name: "Cube AI", bold: true },
  { icon: "solar:globus-linear", name: "Nexus", bold: false },
  { icon: "solar:cpu-linear", name: "Synapse", bold: false },
] as const;

export default function TrustedBrands() {
  return (
    <section className="border-y border-[#e5e5e5] bg-[#FAF9F6]/50 py-10  my-20 overflow-hidden relative">
      <div className="mx-auto max-w-7xl px-4">
        {/* <div className="text-center mb-6">
          <span className="text-xs uppercase font-bold tracking-widest text-[#a3a3a3]">
            Trusted by Forward-Thinking Teams & Global Security Standards
          </span>
        </div> */}

        <div className="flex flex-col md:flex-row items-center justify-between gap-8">

          {/* Moving Marquee of brands */}
          <div
            className="relative flex-1 overflow-hidden"
            style={{
              maskImage: "linear-gradient(to right, transparent, black 5%, black 95%, transparent)",
              WebkitMaskImage: "linear-gradient(to right, transparent, black 5%, black 95%, transparent)",
            }}
          >
            <motion.div
              className="flex w-max"
              animate={{ x: [0, "-50%"] }}
              transition={{
                repeat: Infinity,
                ease: "linear",
                duration: 25,
              }}
            >
              {[0, 1].map((copyIndex) => (
                <div
                  key={copyIndex}
                  aria-hidden={copyIndex === 1 ? true : undefined}
                  className="flex items-center gap-16 whitespace-nowrap px-8 md:gap-20 md:px-10"
                >
                  {BRAND_ITEMS.map((brand) => (
                    <div
                      key={`${copyIndex}-${brand.name}`}
                      className={`flex items-center gap-3 text-lg tracking-tight text-[#525252] md:text-2xl transition-colors duration-200 hover:text-[#171717] ${brand.bold ? "font-bold" : "font-semibold"}`}
                    >
                      <Icon icon={brand.icon} width={30} height={30} className="text-[#a3a3a3]" />
                      <span>{brand.name}</span>
                    </div>
                  ))}
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
