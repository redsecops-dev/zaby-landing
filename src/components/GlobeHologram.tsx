"use client";

import { useRef, useMemo, useEffect } from "react";
import { useFrame, useLoader } from "@react-three/fiber";
import * as THREE from "three";
import { OrbitControls } from "@react-three/drei";

/**
 * GlobeHologram — Interactive Grid Globe
 * 
 * - Precise Lat/Lon Grid of points
 * - Continental Landmask (Specular map)
 * - Subtle Spherical Wireframe
 * - Interactive Cursor Rotation
 */

const LANDMASK_URL = "https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/planets/earth_specular_2048.jpg";

const GridGlobeShader = {
  uniforms: {
    time: { value: 0 },
    color: { value: new THREE.Color("#e879f9") }, // Magenta continental points
    map: { value: null }
  },
  vertexShader: `
    varying vec2 vUv;
    varying float vVisible;
    varying vec3 vNormal;
    varying vec3 vViewPosition;
    uniform float time;
    
    void main() {
      // Correct Spherical UV mapping
      float phi = acos(position.y / length(position));
      float theta = atan(position.z, position.x);
      vUv = vec2(0.5 - theta / (2.0 * 3.14159), 1.0 - phi / 3.14159);
      
      vNormal = normalize(normalMatrix * position);
      vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
      vViewPosition = -mvPosition.xyz;
      
      // Pulse animation
      float pulse = sin(time * 1.5 + position.y * 2.0) * 0.1 + 0.9;
      
      // Point size based on distance and pulse
      gl_PointSize = (5.0 * pulse) * (2.0 / -mvPosition.z);
      gl_Position = projectionMatrix * mvPosition;
    }
  `,
  fragmentShader: `
    uniform sampler2D map;
    uniform vec3 color;
    uniform float time;
    varying vec2 vUv;
    varying vec3 vNormal;
    varying vec3 vViewPosition;
    
    void main() {
      // Sample continental landmask (Specular map: Water is bright, Land is dark)
      vec4 mask = texture2D(map, vUv);
      if (mask.r > 0.3) discard; // Keep land areas
      
      // Circular point shape
      float dist = distance(gl_PointCoord, vec2(0.5));
      if (dist > 0.5) discard;
      
      // Front lighting effect
      vec3 normal = normalize(vNormal);
      vec3 lightDir = vec3(0.0, 0.0, 1.0); // True front lighting
      float dotProduct = dot(normal, lightDir);
      
      // Lighting from the front (bias towards positive dot product)
      float frontLight = smoothstep(-0.2, 0.5, dotProduct);
      
      // Fresnel effect for subtle edge glow
      float fresnel = pow(1.0 - max(0.0, dotProduct), 3.0) * 0.4;
      
      // Vertical scan line
      float scanLine = smoothstep(0.9, 1.0, sin(vUv.y * 20.0 - time * 2.0)) * 0.2;
      
      // Flickering effect
      float flicker = 0.9 + 0.1 * sin(time * 20.0 + vUv.x * 100.0);
      
      // Combine effects
      float opacity = (0.3 + frontLight * 0.5 + fresnel + scanLine) * flicker * (1.0 - dist * 2.0);
      
      // Reduce visibility of points on the far back side
      opacity *= smoothstep(-0.5, 0.2, dotProduct);
      
      gl_FragColor = vec4(color, opacity);
    }
  `
};

export default function GlobeHologram() {
  const pointsRef = useRef<THREE.Points>(null!);
  const gridRef = useRef<THREE.Group>(null!);
  const scanRingRef = useRef<THREE.Mesh>(null!);
  const startTime = useRef(performance.now());
  const landmask = useLoader(THREE.TextureLoader, LANDMASK_URL);
 
  // Define globe radius
  const radius = 2.5;
 
  // Generate high-density grid points
  const gridData = useMemo(() => {
    const pos: number[] = [];
    const latSteps = 120;
    const lonSteps = 240;
    for (let i = 0; i <= latSteps; i++) {
      const phi = (i / latSteps) * Math.PI;
      for (let j = 0; j <= lonSteps; j++) {
        const theta = (j / lonSteps) * 2 * Math.PI;
        const x = radius * Math.sin(phi) * Math.cos(theta);
        const y = radius * Math.cos(phi);
        const z = radius * Math.sin(phi) * Math.sin(theta);
        pos.push(x, y, z);
      }
    }
    return new Float32Array(pos);
  }, []);
 
  useFrame((state) => {
    const elapsedTime = (performance.now() - startTime.current) / 1000;
    if (pointsRef.current) {
      const mat = pointsRef.current.material as THREE.ShaderMaterial;
      mat.uniforms.time.value = elapsedTime;
    }
  });
 
  return (
    <group>
      <OrbitControls
        enableZoom={false}
        enablePan={false}
        minPolarAngle={Math.PI / 3}
        maxPolarAngle={2 * Math.PI / 3}
        autoRotate
        autoRotateSpeed={2.5}
        makeDefault
      />
 
      {/* 1. High-Density Continental Points */}
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[gridData, 3]} />
        </bufferGeometry>
        <shaderMaterial
          {...GridGlobeShader}
          uniforms={{
            ...GridGlobeShader.uniforms,
            map: { value: landmask },
            time: { value: 0 }
          }}
          transparent
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </points>
 
      {/* 2. Enhanced Lat/Lon Grid - Futuristic Blue */}
      <group ref={gridRef}>
        {Array.from({ length: 12 }).map((_, i) => {
          const lat = (i / 12) * Math.PI;
          const r = radius * Math.sin(lat);
          const y = radius * Math.cos(lat);
          return (
            <mesh key={`lat-${i}`} position={[0, y, 0]} rotation={[Math.PI / 2, 0, 0]}>
              <torusGeometry args={[r, 0.0015, 8, 120]} />
              <meshBasicMaterial color="#e879f9" transparent opacity={0.12} />
            </mesh>
          );
        })}
        {Array.from({ length: 18 }).map((_, i) => (
          <mesh key={`lon-${i}`} rotation={[0, (i / 18) * Math.PI * 2, 0]}>
            <torusGeometry args={[radius, 0.0015, 8, 120]} />
            <meshBasicMaterial color="#e879f9" transparent opacity={0.12} />
          </mesh>
        ))}
      </group>
 
      {/* 3. Glowing Atmosphere Outer Shell - Volumetric Magenta */}
      <mesh scale={1.1}>
        <sphereGeometry args={[radius, 64, 64]} />
        <meshBasicMaterial
          color="#e879f9"
          transparent
          opacity={0.06}
          side={THREE.BackSide}
          blending={THREE.AdditiveBlending}
        />
      </mesh>
 
      {/* 4. Scanning Ring (Equator) - Sweeping Magenta Ring */}
      <mesh ref={scanRingRef} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[radius * 1.05, 0.015, 16, 100]} />
        <meshBasicMaterial color="#e879f9" transparent opacity={0.45} />
      </mesh>
    </group>
  );
}
