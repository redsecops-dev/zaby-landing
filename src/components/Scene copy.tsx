"use client";

import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import { Preload, OrbitControls } from "@react-three/drei";

export default function Scene({ 
  children, 
  className,
  camera = { position: [0, 0, 5], fov: 75 }
}: { 
  children: React.ReactNode, 
  className?: string,
  camera?: { position: [number, number, number], fov: number }
}) {
  return (
    <div className={`w-full h-full ${className}`}>
      <Canvas
        camera={camera}
        gl={{ antialias: true, alpha: true }}
        dpr={[1, 2]}
      >
        <Suspense fallback={null}>
          {children}
          <Preload all />
        </Suspense>
      </Canvas>
    </div>
  );
}
