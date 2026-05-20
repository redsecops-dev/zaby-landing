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
    color: { value: new THREE.Color("#1e1b4b") },
    accent: { value: new THREE.Color("#4338ca") }
  },
  vertexShader: ProHologramShader.vertexShader,
  fragmentShader: `
    uniform float time;
    uniform vec3 color;
    uniform vec3 accent;
    varying vec3 vNormal;
    varying vec3 vPosition;

    void main() {
      float fresnel = pow(1.0 - abs(dot(vNormal, vec3(0.0, 0.0, 1.0))), 2.5);
      
      float radial = length(vPosition.xz);
      float gridDensity = 60.0;
      float gridLineThickness = 0.98;
      
      float latGrid = step(gridLineThickness, sin(vPosition.y * gridDensity));
      float lonGrid = step(gridLineThickness, sin(atan(vPosition.z, vPosition.x) * 12.0));
      float grid = max(latGrid, lonGrid);
      
      float sparkle = latGrid * lonGrid * (sin(time * 5.0) * 0.5 + 0.5);
      float scanline = step(0.995, sin(vPosition.y * 2.0 - time * 0.5));
      
      // Deep indigo / navy tones for light mode
      vec3 edgeColor = vec3(0.16, 0.14, 0.42);   // #29236b - deep indigo edge
      vec3 coreColor = vec3(0.07, 0.05, 0.22);    // #120e38 - rich navy core
      
      vec3 finalColor = mix(coreColor, edgeColor, fresnel * 0.7 + grid * 0.5 + sparkle);
      
      float finalOpacity = (fresnel * 0.5 + 0.12 + grid * 0.35 + scanline * 0.15 + sparkle * 0.4);
      
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

  // --- Point Cloud Reconstruction (Sampling from Mesh) ---
  const bodyPoints = useMemo(() => {
    const allPositions: number[] = [];
    const meshes: THREE.Mesh[] = [];

    scene.updateWorldMatrix(true, true);
    scene.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        meshes.push(child as THREE.Mesh);
      }
    });

    if (meshes.length === 0) return new Float32Array(0);

    const pointsPerMesh = Math.floor(particleCount / meshes.length);
    const tempPosition = new THREE.Vector3();

    meshes.forEach((mesh) => {
      try {
        const geo = mesh.geometry.clone();
        mesh.updateWorldMatrix(true, true);
        geo.applyMatrix4(mesh.matrixWorld);
        const sampler = new MeshSurfaceSampler(new THREE.Mesh(geo)).build();
        for (let i = 0; i < pointsPerMesh; i++) {
          sampler.sample(tempPosition);
          allPositions.push(tempPosition.x, tempPosition.y, tempPosition.z);
        }
        geo.dispose();
      } catch (err) {
        console.error("Sampling error:", err);
      }
    });

    return new Float32Array(allPositions);
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

  // Sync animation variables

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

    // Update time uniforms on all meshes
    scene.traverse((child) => {
      if ((child as THREE.Mesh).isMesh && child.userData?.uniforms?.time) {
        child.userData.uniforms.time.value = elapsedTime;
      }
    });
  });

  // Apply the correct shader based on theme
  const shaderToUse = isLight ? LightHologramShader : ProHologramShader;
  const blendingMode = isLight ? THREE.NormalBlending : THREE.AdditiveBlending;

  useEffect(() => {
    scene.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh;
        if (!mesh.geometry.boundingBox) {
          mesh.geometry.computeBoundingBox();
        }

        const mat = new THREE.ShaderMaterial({
          ...shaderToUse,
          uniforms: {
            time: { value: 0 },
            color: { value: shaderToUse.uniforms.color.value.clone() },
            accent: { value: shaderToUse.uniforms.accent.value.clone() }
          },
          transparent: true,
          blending: blendingMode,
          depthWrite: false,
          side: THREE.DoubleSide
        });
        mesh.material = mat;
        // Store uniforms ref for animation updates
        mesh.userData = { uniforms: mat.uniforms };
      }
    });
  }, [scene]);

  // Theme-aware colors
  const particleColor = isLight ? "#1e1b4b" : "#445566";
  const particleOpacity = isLight ? 0.25 : 0.4;
  const flowColor = isLight ? "#312e81" : "#334455";
  const flowOpacity = isLight ? 0.2 : 0.3;
  const ringColor = isLight ? "#1e1b4b" : "#223344";
  const ringBaseOpacity = isLight ? 0.1 : 0.15;

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

        {/* 2. Custom Mesh with Pro Hologram Shader */}
        <primitive object={scene} />
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
