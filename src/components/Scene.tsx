"use client";

import { Canvas, CanvasProps } from "@react-three/fiber";
import React from "react";

interface SceneProps extends Partial<CanvasProps> {
  children: React.ReactNode;
}

export default function Scene({ children, ...props }: SceneProps) {
  return (
    <Canvas {...props}>
      {children}
    </Canvas>
  );
}
