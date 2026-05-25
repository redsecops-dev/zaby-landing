"use client";

import { useRef, useMemo, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useGLTF, Center } from "@react-three/drei";
import { MeshSurfaceSampler } from "three/examples/jsm/math/MeshSurfaceSampler.js";
import * as BufferGeometryUtils from "three/examples/jsm/utils/BufferGeometryUtils.js";

/**
 * HeroHologram — Integrated Custom Mesh
 * 
 * - Loads custom 'phantom.glb'
 * - High-density particle reconstruction from mesh surface
 * - Pro-grade GLSL shader for Fresnel & Musculature
 * - Energy flow strands radiating from base
 * - Theme-aware: adapts to light/dark mode
 */

const MODEL_PATH = "/models/phantom_v2.glb";

const ProHologramShader = {
  uniforms: {
    time: { value: 0 },
    color: { value: new THREE.Color("#0033ff") },
    accent: { value: new THREE.Color("#00ffff") }
  },
  vertexShader: `
    varying vec3 vNormal;
    varying vec3 vPosition;
    void main() {
      vNormal = normalize(normalMatrix * normal);
      vPosition = position;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  fragmentShader: `
    uniform float time;
    uniform vec3 color;
    uniform vec3 accent;
    varying vec3 vNormal;
    varying vec3 vPosition;

    void main() {
      // 1. Ultra-Sharp Fresnel (The 'Halo' effect)
      float fresnel = pow(1.0 - abs(dot(vNormal, vec3(0.0, 0.0, 1.0))), 3.0);
      
      // 2. Contoured Surface Grid (Wraps around anatomy)
      // Using a mix of Y and radial distance to make it follow the 'cylindrical' nature of a body
      float radial = length(vPosition.xz);
      float gridDensity = 60.0;
      float gridLineThickness = 0.98;
      
      float latGrid = step(gridLineThickness, sin(vPosition.y * gridDensity));
      float lonGrid = step(gridLineThickness, sin(atan(vPosition.z, vPosition.x) * 12.0));
      float grid = max(latGrid, lonGrid);
      
      // 3. Shimmering Nodes (Sparkle at intersections)
      float sparkle = latGrid * lonGrid * (sin(time * 5.0) * 0.5 + 0.5);
      
      // 4. Subtle Vertical Scanline
      float scanline = step(0.995, sin(vPosition.y * 2.0 - time * 0.5));
      
      // Colors: Dark Bluish Grey / Slate
      vec3 icyBlue = vec3(0.3, 0.4, 0.5);
      vec3 coreColor = vec3(0.05, 0.08, 0.12);
      
      vec3 finalColor = mix(coreColor, icyBlue, fresnel * 0.8 + grid * 0.4 + sparkle);
      
      float finalOpacity = (fresnel * 0.7 + 0.05 + grid * 0.3 + scanline * 0.2 + sparkle * 0.5);
      
      gl_FragColor = vec4(finalColor, finalOpacity);
    }
  `
};

// Light mode shader: deep indigo tones, higher opacity, no additive glow
const LightHologramShader = {
  uniforms: {
    time: { value: 0 },
    color: { value: new THREE.Color("#00d4ff") },
    accent: { value: new THREE.Color("#e0fbff") }
  },
  vertexShader: ProHologramShader.vertexShader,
  fragmentShader: `
    uniform float time;
    uniform vec3 color;
    uniform vec3 accent;
    varying vec3 vNormal;
    varying vec3 vPosition;

    void main() {
      // 1. Fresnel edge detection
      float fresnel = pow(1.0 - abs(dot(vNormal, vec3(0.0, 0.0, 1.0))), 2.5);
      
      // 2. Grids and lines
      float gridDensity = 50.0;
      float gridLineThickness = 0.97;
      float latGrid = step(gridLineThickness, sin(vPosition.y * gridDensity));
      float lonGrid = step(gridLineThickness, sin(atan(vPosition.z, vPosition.x) * 10.0));
      float grid = max(latGrid, lonGrid);
      
      float sparkle = latGrid * lonGrid * (sin(time * 4.0) * 0.5 + 0.5);
      float scanline = step(0.994, sin(vPosition.y * 1.5 - time * 0.8));
      
      // Vibrant cyan holographic colors matching reference image
      vec3 glowColor = color;          // Bright cyan (#00d4ff)
      vec3 lightCoreColor = accent;    // Very light cyan/white (#e0fbff)
      
      // On white background, we mix lightCoreColor with glowColor based on edge glow/grid
      vec3 finalColor = mix(lightCoreColor, glowColor, fresnel * 0.9 + grid * 0.5 + sparkle * 0.3);
      
      // Keep core almost transparent, and edges/grids crisp
      float finalOpacity = (fresnel * 0.6 + 0.01 + grid * 0.3 + scanline * 0.1 + sparkle * 0.3);
      
      gl_FragColor = vec4(finalColor, finalOpacity);
    }
  `
};

export default function HeroHologram() {
  const groupRef = useRef<THREE.Group>(null!);
  const startTime = useRef(performance.now());

  const isLight = true;

  const flowRef = useRef<THREE.Points>(null!);
  const { scene } = useGLTF(MODEL_PATH);

  const particleCount = 75000; // Refined density for v2
  const flowCount = 6000;

  // Apply the correct shader based on theme
  const shaderToUse = isLight ? LightHologramShader : ProHologramShader;
  const blendingMode = isLight ? THREE.NormalBlending : THREE.AdditiveBlending;

  // --- Merge Geometries and Reconstruct Point Cloud ---
  const { mergedGeometry, bodyPoints } = useMemo(() => {
    const meshes: THREE.Mesh[] = [];
    scene.updateWorldMatrix(true, true);
    scene.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        meshes.push(child as THREE.Mesh);
      }
    });

    if (meshes.length === 0) {
      return { mergedGeometry: null, bodyPoints: new Float32Array(0) };
    }

    // 1. Clone and apply matrixWorld to get all geometries in local space
    const geometries: THREE.BufferGeometry[] = [];
    meshes.forEach((mesh) => {
      const geo = mesh.geometry.clone();
      mesh.updateWorldMatrix(true, true);
      geo.applyMatrix4(mesh.matrixWorld);
      geometries.push(geo);
    });

    let merged: THREE.BufferGeometry | null = null;
    try {
      merged = BufferGeometryUtils.mergeGeometries(geometries, false);
      geometries.forEach(g => g.dispose());
    } catch (err) {
      console.error("Error merging geometries:", err);
      merged = geometries[0] || null;
    }

    if (!merged) {
      return { mergedGeometry: null, bodyPoints: new Float32Array(0) };
    }

    // 2. Sample points from the merged geometry
    const allPositions: number[] = [];
    const tempPosition = new THREE.Vector3();
    try {
      const sampler = new MeshSurfaceSampler(new THREE.Mesh(merged)).build();
      for (let i = 0; i < particleCount; i++) {
        sampler.sample(tempPosition);
        allPositions.push(tempPosition.x, tempPosition.y, tempPosition.z);
      }
    } catch (err) {
      console.error("Sampling error on merged geometry:", err);
    }

    return {
      mergedGeometry: merged,
      bodyPoints: new Float32Array(allPositions)
    };
  }, [scene]);

  // --- Energy Flow Strands ---
  const flowData = useMemo(() => {
    const pos = new Float32Array(flowCount * 3);
    const vel = new Float32Array(flowCount);
    const angle = new Float32Array(flowCount);
    for (let i = 0; i < flowCount; i++) {
      angle[i] = Math.random() * Math.PI * 2;
      const radius = 0.2 + Math.random() * 0.4;
      pos[i * 3] = Math.cos(angle[i]) * radius;
      pos[i * 3 + 1] = -1.2;
      pos[i * 3 + 2] = Math.sin(angle[i]) * radius;
      vel[i] = 0.02 + Math.random() * 0.05;
    }
    return { pos, vel, angle };
  }, []);

  // --- Memoize Uniforms ---
  const memoizedUniforms = useMemo(() => {
    return {
      time: { value: 0 },
      color: { value: shaderToUse.uniforms.color.value.clone() },
      accent: { value: shaderToUse.uniforms.accent.value.clone() }
    };
  }, [shaderToUse]);

  // --- Animation loop ---
  useFrame(() => {
    const elapsedTime = (performance.now() - startTime.current) / 1000;
    // Continuous premium rotation animation for the holographic human body mesh
    groupRef.current.rotation.y = elapsedTime * 0.25;
    const baseY = -0.4; // Shifted slightly down so head isn't cut off in CTA section
    groupRef.current.position.y = baseY + Math.sin(elapsedTime * 0.4) * 0.05;

    // Update energy flow positions ascending vertically
    const arr = flowRef.current.geometry.attributes.position.array as Float32Array;
    for (let i = 0; i < flowCount; i++) {
      const i3 = i * 3;
      arr[i3 + 1] += flowData.vel[i];
      // Rotate strands slightly around cylinder axis
      flowData.angle[i] += 0.005;
      const radius = 0.2 + (arr[i3 + 1] + 1.2) * 0.1;
      arr[i3] = Math.cos(flowData.angle[i]) * radius;
      arr[i3 + 2] = Math.sin(flowData.angle[i]) * radius;

      // Reset to base when it goes too high (above shoulder height, e.g. y = 1.2)
      if (arr[i3 + 1] > 1.2) {
        arr[i3 + 1] = -1.2;
      }
    }
    flowRef.current.geometry.attributes.position.needsUpdate = true;

    // Update time uniform directly
    if (memoizedUniforms.time) {
      memoizedUniforms.time.value = elapsedTime;
    }
  });

  // Theme-aware colors — vibrant cyan to match reference hologram
  const particleColor = isLight ? "#00d4ff" : "#445566";
  const particleOpacity = isLight ? 0.4 : 0.4;
  const flowColor = isLight ? "#00e5ff" : "#334455";
  const flowOpacity = isLight ? 0.35 : 0.3;
  const ringColor = isLight ? "#00d4ff" : "#223344";
  const ringBaseOpacity = isLight ? 0.18 : 0.15;

  return (
    <group ref={groupRef} position={[0, -0.2, 0]} scale={2.5}>
      <group rotation={[0, -Math.PI / 2, 0]}>
        {/* 1. Volumetric Point Cloud Reconstruction from Custom Mesh */}
        {bodyPoints.length > 0 && (
          <points>
            <bufferGeometry>
              <bufferAttribute
                attach="attributes-position"
                args={[bodyPoints, 3]}
              />
            </bufferGeometry>
            <pointsMaterial
              size={0.015}
              color={particleColor}
              transparent
              opacity={particleOpacity}
              blending={blendingMode}
              depthWrite={false}
              sizeAttenuation
            />
          </points>
        )}

        {/* 2. Single Merged Custom Mesh with Pro Hologram Shader */}
        {mergedGeometry && (
          <mesh geometry={mergedGeometry}>
            <shaderMaterial
              {...shaderToUse}
              uniforms={memoizedUniforms}
              transparent
              blending={blendingMode}
              depthWrite={false}
              side={THREE.DoubleSide}
            />
          </mesh>
        )}
      </group>

      {/* 3. Radial Energy Flow Strands */}
      <points ref={flowRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[flowData.pos, 3]} />
        </bufferGeometry>
        <pointsMaterial
          size={0.009}
          color={flowColor}
          transparent
          opacity={flowOpacity}
          blending={blendingMode}
          depthWrite={false}
          sizeAttenuation
        />
      </points>

      {/* 4. Floor Resonance Rings */}
      <group position={[0, -1.2, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        {[...Array(12)].map((_, i) => (
          <mesh key={i}>
            <ringGeometry args={[i * 0.2, i * 0.2 + 0.005, 128]} />
            <meshBasicMaterial
              color={ringColor}
              transparent
              opacity={ringBaseOpacity - i * 0.008}
              blending={blendingMode}
              side={THREE.DoubleSide}
              depthWrite={false}
            />
          </mesh>
        ))}
      </group>
    </group>
  );
}

useGLTF.preload(MODEL_PATH);
