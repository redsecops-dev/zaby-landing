"use client";

import { OrbitingCircles } from "@/components/ui/orbiting-circles";
import { Icon } from "@iconify/react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

export function OrbitingCirclesDemo() {
  return (
    <div className="relative flex h-[280px] w-[280px] flex-col items-center justify-center overflow-hidden">
      
      {/* Central Core Icon (staggered entry) */}
      <motion.div 
        className="relative z-20 flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-tr from-violet-600 to-indigo-500 shadow-[0_0_25px_rgba(139,92,246,0.45)] border border-violet-400/40 select-none"
        initial={{ scale: 0, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ type: "spring", stiffness: 180, damping: 15, delay: 0.15 }}
      >
        <Icon icon="solar:chat-round-line-bold" className="text-xl text-white" />
        <div className="absolute inset-0 rounded-xl bg-violet-400/20 blur-lg -z-10 animate-pulse" />
      </motion.div>

      {/* Inner Orbit (Radius 48) - Ripples out first */}
      <motion.div
        className="absolute inset-0 pointer-events-none flex items-center justify-center"
        initial={{ scale: 0, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{
          type: "spring",
          stiffness: 85,
          damping: 16,
          delay: 0.3,
        }}
        style={{ transformOrigin: "center" }}
      >
        <OrbitingCircles
          className="border-none bg-transparent"
          duration={18}
          radius={48}
          iconSize={24}
        >
          <ChannelIcon icon="logos:whatsapp-icon" sizeClass="text-[11px]" pClass="p-1" />
          <ChannelIcon icon="logos:slack-icon" sizeClass="text-[11px]" pClass="p-1" />
          <ChannelIcon icon="logos:microsoft-teams" sizeClass="text-[11px]" pClass="p-1" />
          <ChannelIcon icon="logos:discord-icon" sizeClass="text-[11px]" pClass="p-1" />
        </OrbitingCircles>
      </motion.div>

      {/* Middle Orbit (Radius 84) - Ripples out second */}
      <motion.div
        className="absolute inset-0 pointer-events-none flex items-center justify-center"
        initial={{ scale: 0, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{
          type: "spring",
          stiffness: 80,
          damping: 15,
          delay: 0.45,
        }}
        style={{ transformOrigin: "center" }}
      >
        <OrbitingCircles
          className="border-none bg-transparent"
          radius={84}
          duration={28}
          iconSize={28}
          reverse
        >
          <ChannelIcon icon="logos:openai-icon" sizeClass="text-[13px]" pClass="p-1" />
          <ChannelIcon icon="logos:notion-icon" sizeClass="text-[13px]" pClass="p-1" />
          <ChannelIcon icon="logos:github-icon" sizeClass="text-[13px]" pClass="p-1" />
          <ChannelIcon icon="logos:google-drive" sizeClass="text-[13px]" pClass="p-1" />
        </OrbitingCircles>
      </motion.div>

      {/* Outer Orbit (Radius 120) - Ripples out third */}
      <motion.div
        className="absolute inset-0 pointer-events-none flex items-center justify-center"
        initial={{ scale: 0, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{
          type: "spring",
          stiffness: 75,
          damping: 14,
          delay: 0.6,
        }}
        style={{ transformOrigin: "center" }}
      >
        <OrbitingCircles
          className="border-none bg-transparent"
          radius={120}
          duration={38}
          iconSize={32}
        >
          <ChannelIcon icon="solar:phone-bold-duotone" color="text-blue-600" sizeClass="text-[15px]" pClass="p-1" />
          <ChannelIcon icon="solar:letter-bold-duotone" color="text-slate-700" sizeClass="text-[15px]" pClass="p-1" />
          <ChannelIcon icon="solar:database-bold-duotone" color="text-orange-600" sizeClass="text-[15px]" pClass="p-1" />
          <ChannelIcon icon="solar:chat-round-dots-bold-duotone" color="text-slate-800" sizeClass="text-[15px]" pClass="p-1" />
        </OrbitingCircles>
      </motion.div>

    </div>
  );
}

interface ChannelIconProps {
  icon: string
  color?: string
  sizeClass?: string
  pClass?: string
}

function ChannelIcon({ icon, color = "", sizeClass = "text-sm", pClass = "p-1.5" }: ChannelIconProps) {
  return (
    <div className={cn(
      "flex h-full w-full items-center justify-center rounded-lg bg-white shadow-[0_3px_8px_rgba(0,0,0,0.04)] border border-slate-100/80 transition-transform hover:scale-110 select-none",
      pClass
    )}>
      <Icon icon={icon} className={`${sizeClass} ${color}`} />
    </div>
  );
}
