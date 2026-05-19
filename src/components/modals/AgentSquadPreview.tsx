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

export function AgentSquadPreview() {
  return (
    <div className="bg-linear-to-br from-slate-50 to-slate-100 p-8 flex flex-col gap-8 ">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-lg bg-slate-900 flex items-center justify-center">
            <Zap size={24} className="text-white" strokeWidth={1.5} />
          </div>
          <h1 className="text-3xl font-medium tracking-tight">Agent Squad</h1>
        </div>
        <p className="text-slate-600 text-lg">Deploy teams of AI agents that work together autonomously.</p>
      </div>

      {/* Features Grid */}
      {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center flex-shrink-0">
              <Users size={20} className="text-slate-900" strokeWidth={1.5} />
            </div>
            <div>
              <h3 className="font-medium text-slate-900 mb-1">Multi-Agent Orchestration</h3>
              <p className="text-sm text-slate-600">Coordinate multiple specialized agents to complete complex tasks in parallel.</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center flex-shrink-0">
              <BarChart3 size={20} className="text-slate-900" strokeWidth={1.5} />
            </div>
            <div>
              <h3 className="font-medium text-slate-900 mb-1">Real-Time Performance Monitoring</h3>
              <p className="text-sm text-slate-600">Track agent execution, success rates, and resource utilization in real-time dashboards.</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center flex-shrink-0">
              <Zap size={20} className="text-slate-900" strokeWidth={1.5} />
            </div>
            <div>
              <h3 className="font-medium text-slate-900 mb-1">Dynamic Agent Creation</h3>
              <p className="text-sm text-slate-600">Spawn agents on-demand to handle specific tasks without manual deployment.</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center flex-shrink-0">
              <Users size={20} className="text-slate-900" strokeWidth={1.5} />
            </div>
            <div>
              <h3 className="font-medium text-slate-900 mb-1">Intelligent Delegation</h3>
              <p className="text-sm text-slate-600">Agents automatically assign subtasks to the most capable team members based on context.</p>
            </div>
          </div>
        </div>
      </div> */}

      <LiveAgentsSection />
      <AgentSquad />
      <Capabilities />
      <JoinTheMovementSection />

      {/* CTA */}
      <section className="relative min-h-[85vh] w-full flex flex-col items-center justify-center py-20 space-y-8 overflow-hidden rounded-3xl border border-slate-200/80 bg-linear-to-br from-white via-slate-50 to-slate-100/90 shadow-[0_24px_80px_-40px_rgba(15,23,42,0.25)]">
        {/* Holographic 3D Mesh at marked location */}
        {/* <div className="w-full h-[55vh] relative z-10 -mb-20">
          <Canvas camera={{ position: [0, 0.2, 9.8], fov: 45 }}>
            <ambientLight intensity={0.5} />
            <HeroHologram />
            <OrbitControls 
              target={[0, 0.0, 0]}
              enableZoom={false} 
              enablePan={false}
              minPolarAngle={Math.PI / 2.5}
              maxPolarAngle={Math.PI / 1.5}
            />
          </Canvas>
        </div> */}

        {/* ambient blobs */}
        <div className="pointer-events-none absolute -left-12 top-0 h-52 w-52 rounded-full bg-sky-200/30 blur-3xl" />
        <div className="pointer-events-none absolute -right-12 bottom-0 h-52 w-52 rounded-full bg-violet-200/25 blur-3xl" />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="relative z-10 text-center space-y-4"
        >
          <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-slate-950">
            Ready to deploy your squad?
          </h2>
          <p className="text-slate-600 font-light text-base sm:text-lg max-w-lg mx-auto leading-relaxed">
            Launch your first multi-agent workflow and watch your team scale autonomously.
          </p>
        </motion.div>
        
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="relative z-10 px-10 sm:px-12 py-3.5 sm:py-4 bg-slate-950 text-white font-medium rounded-full tracking-tight text-sm sm:text-base hover:bg-slate-800 shadow-lg hover:shadow-[0_16px_48px_-20px_rgba(15,23,42,0.5)] transition-all duration-300"
        >
          Deploy now
        </motion.button>

        <div className="absolute z-10 bottom-8 text-[10px] tracking-[1em] text-slate-400 uppercase">
          AGENT SQUAD © 2026 · AI WORKSPACE
        </div>
      </section>
    </div>
  );
}
