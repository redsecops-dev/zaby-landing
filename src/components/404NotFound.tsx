"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import AnimatedGradientBackground from "@/components/ui/animated-gradient-background";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="relative w-full h-screen overflow-hidden !bg-white flex items-center justify-center">
      {/* Animated Gradient Background */}
      <AnimatedGradientBackground 
        Breathing={true}
        animationSpeed={0.03}
        startingGap={100}
      />

      <div className="relative z-10 flex flex-col items-center justify-center px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <h1 className="text-8xl md:text-9xl font-extrabold text-white tracking-tighter mb-4 drop-shadow-2xl">
            404
          </h1>
          <h2 className="text-2xl md:text-3xl font-medium text-gray-300 mb-8 max-w-lg mx-auto leading-tight">
            Lost in the neural network. The page you are looking for does not exist.
          </h2>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button
              asChild
              size="lg"
              className="rounded-full bg-white text-black hover:bg-gray-200 px-8 py-6 text-base font-semibold transition-all duration-300 hover:scale-105"
            >
              <Link href="/">
                Return Home
              </Link>
            </Button>
            
            <Button
              variant="outline"
              size="lg"
              className="rounded-full border-white/20 bg-white/5 text-white hover:bg-white/10 backdrop-blur-md px-8 py-6 text-base font-semibold transition-all duration-300 hover:scale-105"
              onClick={() => window.history.back()}
            >
              Go Back
            </Button>
          </div>
        </motion.div>

        {/* Decorative elements */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.5 }}
          transition={{ duration: 2, delay: 1 }}
          className="absolute -bottom-32 left-1/2 -translate-x-1/2 w-full max-w-5xl h-64 bg-accent/20 blur-[120px] rounded-full pointer-events-none"
        />
      </div>
      
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 text-[10px] tracking-[0.5em] uppercase text-gray-500 z-20">
        System Status: Page Not Found
      </div>
    </div>
  );
}
