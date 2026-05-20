"use client";

import { motion } from "framer-motion";
import { Zap } from "lucide-react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import AgentSquad from "./components/AgentSquad";
import LiveAgentsSection from "./components/LiveAgentsSection";
import HeroHologram from "./components/HeroHologram";
import { JoinTheMovementSection } from "../sections";
import Capabilities from "./components/Capabilites";
import Scene from "@/components/Scene";
import ParticleField from "@/components/ParticleField";
import GlobeHologram from "@/components/GlobeHologram";
import ClockHologram from "@/components/ClockHologram";


import { useRef, useEffect } from "react";
import { useMotionValue, useTransform } from "framer-motion";

export function AgentSquadPreview() {
  const heroRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const shouldPlayRef = useRef(true);

  // Track scroll of the actual scroll container (modal's overflow-y-auto div),
  // not window — which is frozen when a modal is open.
  const rawScroll = useMotionValue(0);
  const phantomOpacity = useTransform(rawScroll, [0, 300], [1, 0]);
  const heroScale = useTransform(rawScroll, [0, 300], [1, 1.05]);

  useEffect(() => {
    // Find the nearest scrollable ancestor
    let scrollEl: Element | null = heroRef.current?.parentElement ?? null;
    while (scrollEl) {
      const oy = getComputedStyle(scrollEl).overflowY;
      if (oy === "auto" || oy === "scroll") break;
      scrollEl = scrollEl.parentElement;
    }
    const target = scrollEl ?? document.documentElement;

    const onScroll = () => rawScroll.set((target as Element).scrollTop);
    target.addEventListener("scroll", onScroll, { passive: true });
    return () => target.removeEventListener("scroll", onScroll);
  }, [rawScroll]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Browsers may suspend video when opacity hits 0 — resume whenever paused unexpectedly
    const resume = () => {
      if (shouldPlayRef.current) {
        video.play().catch(() => { });
      }
    };

    video.addEventListener("ended", resume);
    video.addEventListener("pause", resume);

    return () => {
      shouldPlayRef.current = false;
      video.removeEventListener("ended", resume);
      video.removeEventListener("pause", resume);
    };
  }, []);
  return (
    <div className="bg-linear-to-br from-slate-50 to-slate-100 p-8 flex flex-col gap-8 ">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-lg bg-slate-900 flex items-center justify-center">
            <Zap size={24} className="text-white" strokeWidth={1.5} />
          </div>
          <h1 className="text-3xl font-medium tracking-tight">Phantom Squad</h1>
        </div>
        <p className="text-slate-600 text-lg">Deploy teams of AI agents that work together autonomously.</p>
      </div>

      {/* Section 1: Hero */}
      <section ref={heroRef} className="relative h-screen w-full flex items-center justify-center overflow-hidden">
        {/* Hero Video */}
        <motion.div
          style={{
            opacity: phantomOpacity,
            scale: heroScale,
            WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, black 15%, black 85%, transparent 100%)',
            maskImage: 'linear-gradient(to bottom, transparent 0%, black 15%, black 85%, transparent 100%)'
          }}
          className="z-[4] pointer-events-none w-auto h-[80vh] md:h-[90vh]"
        >
          <video
            ref={videoRef}
            autoPlay
            loop
            muted
            playsInline
            src="/models/phantom_light.mp4"
            className="w-full h-full object-contain rounded-2xl shadow-none"
          />
        </motion.div>

        <div className="absolute inset-0 z-10">
          <Scene camera={{ position: [0, 0, 15], fov: 75 }}>
            {/* The 3D model is moved to the CTA bottom section, but we keep floating background depth particles */}
            <ParticleField />
            <OrbitControls
              enableZoom={false}
              enablePan={false}
              minPolarAngle={Math.PI / 2.5}
              maxPolarAngle={Math.PI / 1.5}
            />
          </Scene>
        </div>
      </section>

      {/* Section 1.5: Phantom Core Description */}
      <section className={`relative min-h-[70vh] w-full flex flex-col items-center justify-center py-24 px-10 md:px-20 overflow-hidden transition-colors duration-500 bg-slate-50/80`}>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.025)_0%,transparent_75%)] pointer-events-none" />

        {/* Animated background lines */}
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute top-0 left-1/4 w-[1px] h-full bg-gradient-to-b from-blue-500/20 via-transparent to-transparent" />
          <div className="absolute top-0 left-3/4 w-[1px] h-full bg-gradient-to-b from-blue-500/20 via-transparent to-transparent" />
        </div>

        <div className="w-full max-w-5xl relative z-10 grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
          {/* Left Column: Core statement */}
          <div className="md:col-span-5 space-y-6">

            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="text-4xl md:text-5xl font-light tracking-tight leading-tight glass-text"
            >
              Intelligent. Custom. Built to scale.
            </motion.h2>
            <p className={`font-light text-base leading-relaxed transition-colors text-slate-600`}>
              Phantom is the ultimate enterprise workforce orchestrator, specifically engineered to automate high-density bulk work with lightning velocity and complete custom integration.
            </p>
          </div>

          {/* Right Column: Virtual Cards grid */}
          <div className="md:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <motion.div
              whileHover={{ y: -6, borderColor: "rgba(59,130,246,0.3)" }}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
              className={`p-8 rounded-2xl border backdrop-blur-xl transition-all duration-300 group hover:shadow-[0_0_30px_rgba(59,130,246,0.05)] border-slate-200/80 bg-white/70 hover:bg-white/95`}
            >
              <div className="h-10 w-10 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-400 mb-5 border border-blue-500/20 group-hover:bg-blue-500/20 group-hover:text-blue-300 transition-all duration-300">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className={`text-sm font-medium mb-2 tracking-wide uppercase transition-colors text-slate-900`}>Fast & Efficient</h3>
              <p className={`text-xs font-light leading-relaxed transition-colors text-slate-500`}>
                Hyper-optimized computational execution paths guarantee ultra-fast, zero-overhead task cycles for all synchronized operational workflows.
              </p>
            </motion.div>

            <motion.div
              whileHover={{ y: -6, borderColor: "rgba(59,130,246,0.3)" }}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
              className={`p-8 rounded-2xl border backdrop-blur-xl transition-all duration-300 group hover:shadow-[0_0_30px_rgba(59,130,246,0.05)] border-slate-200/80 bg-white/70 hover:bg-white/95`}
            >
              <div className="h-10 w-10 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-400 mb-5 border border-blue-500/20 group-hover:bg-blue-500/20 group-hover:text-blue-300 transition-all duration-300">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className={`text-sm font-medium mb-2 tracking-wide uppercase transition-colors text-slate-900`}>Reliable & Effective</h3>
              <p className={`text-xs font-light leading-relaxed transition-colors text-slate-500`}>
                Engineered with resilient, self-healing nodes providing a reliable system structure built to execute massive scales of production bulk work consistently.
              </p>
            </motion.div>
          </div>
        </div>
      </section>
      {/* Section 2: Clock */}
      <section className={`relative h-screen w-full flex items-center px-10 md:px-20 transition-colors duration-500 bg-white`}>
        <div className="grid grid-cols-1 md:grid-cols-2 w-full items-center">
          <div className="h-[60vh] relative flex items-center justify-center">
            {/* The beautiful Cybernetic Analog Clock! */}
            <div className="relative z-10 w-full flex justify-center px-4">
              <ClockHologram />
            </div>
          </div>
          <div className="flex flex-col space-y-4 pl-0 md:pl-12">
            <motion.h2
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 1 }}
              className="cinematic-title glass-text"
            >
              Round the clock
            </motion.h2>
            <p className={`max-w-md font-light leading-relaxed transition-colors text-slate-500`}>
              Continuous neural synchronization ensuring your digital workforce operates at peak efficiency, 24/7.
            </p>
          </div>
        </div>
      </section>

      {/* Section 3: Global Network */}
      <section className={`relative h-screen w-full flex items-center px-10 md:px-20 transition-colors duration-500 bg-slate-50/60`}>
        <div className="grid grid-cols-1 md:grid-cols-2 w-full items-center gap-12">
          <div className="flex flex-col space-y-8 order-2 md:order-1">
            <div className="space-y-2">
              <motion.h2
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 1 }}
                className="cinematic-title glass-text"
              >
                Around the Globe
              </motion.h2>
            </div>

            <p className={`max-w-md font-light leading-relaxed transition-colors text-slate-500`}>
              A decentralized intelligence mesh connecting nodes across every continent, powering local decisions with global wisdom.
            </p>

          </div>
          <div className="h-[70vh] order-1 md:order-2">
            <Scene>
              <GlobeHologram />
            </Scene>
          </div>
        </div>
      </section>
      <LiveAgentsSection />
      <AgentSquad />
      <Capabilities />
      {/* CTA */}
      {/* Section 5: CTA */}
      <section className={`relative min-h-[90vh] w-full flex flex-col items-center justify-center py-20 space-y-8 overflow-hidden transition-colors duration-500 bg-white`}>
        {/* Holographic 3D Mesh (phantom_v2.glb) at the marked location */}
        <div className="w-full h-[65vh] relative z-10 -mb-24">
          <Scene camera={{ position: [0, 0.2, 9.8], fov: 45 }}>
            <ambientLight intensity={0.5} />
            <HeroHologram />
            <OrbitControls
              target={[0, 0.0, 0]}
              enableZoom={false}
              enablePan={false}
              minPolarAngle={Math.PI / 2.5}
              maxPolarAngle={Math.PI / 1.5}
            />
          </Scene>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center space-y-4 z-20"
        >
          <h2 className="text-4xl font-light tracking-tight glass-text">Ready to evolve?</h2>
          <p className={`font-light transition-colors text-slate-600`}>Deploy your first Phantom today.</p>
        </motion.div>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className={`px-12 py-4 font-medium rounded-full tracking-tight transition-all duration-500 z-20 bg-slate-900 text-white hover:bg-slate-800 hover:shadow-[0_0_40px_rgba(15,23,42,0.15)]`}
        >
          Deploy now
        </motion.button>

        <div className={`absolute bottom-10 text-[10px] tracking-[1em] uppercase z-20 transition-colors text-slate-900/20`}>
          PHANTOMS © ZABY WORKFORCE OS
        </div>
      </section>
    </div>
  );
}
