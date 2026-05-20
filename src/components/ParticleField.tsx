"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

/**
 * ParticleField — Data Convergence particles
 * 
 * From the reference:
 * - Particles originate from the distance and converge toward the hologram center
 * - Continue flowing downward
 * - Light blue / silver-white, very subtle
 * - NOT hyperspace warp, NOT chaotic
 * - Controlled, intelligent, atmospheric motion
 */

export default function ParticleField() {
  const pointsRef = useRef<THREE.Points>(null!);
  const count = 3000;

  const [positions, velocities] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const vel = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      // Start from wide spread, deep in distance
      const angle = Math.random() * Math.PI * 2;
      const radius = 2 + Math.random() * 8;
      pos[i3] = Math.cos(angle) * radius;
      pos[i3 + 1] = (Math.random() - 0.3) * 6;
      pos[i3 + 2] = -5 - Math.random() * 25;

      // Velocity: slowly converge toward center and forward
      vel[i3] = -pos[i3] * 0.002; // converge X
      vel[i3 + 1] = -0.005 - Math.random() * 0.01; // drift down
      vel[i3 + 2] = 0.03 + Math.random() * 0.07; // move forward
    }
    return [pos, vel];
  }, []);

  useFrame(() => {
    const array = pointsRef.current.geometry.attributes.position.array as Float32Array;
    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      array[i3] += velocities[i3];
      array[i3 + 1] += velocities[i3 + 1];
      array[i3 + 2] += velocities[i3 + 2];

      // Gently converge toward center as particle gets closer
      array[i3] *= 0.9995;

      // Reset when past camera
      if (array[i3 + 2] > 4) {
        const angle = Math.random() * Math.PI * 2;
        const radius = 2 + Math.random() * 8;
        array[i3] = Math.cos(angle) * radius;
        array[i3 + 1] = (Math.random() - 0.3) * 6;
        array[i3 + 2] = -20 - Math.random() * 10;
      }
    }
    pointsRef.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.008}
        color="#0066ff"
        transparent
        opacity={0.15}
        blending={THREE.AdditiveBlending}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  );
}
