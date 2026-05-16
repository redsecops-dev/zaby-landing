"use client";

import { useEffect, useRef, useState } from "react";
import { Icon } from "@iconify/react";

const CARDS_DATA = [
  {
    id: 1,
    title: "Packet Flow",
    description: "Monitoring inbound request density across global edge nodes.",
    icon: "solar:routing-2-linear",
    bgImage: "https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/e534354d-c5f2-4399-a1d9-2f50338e8c47_1600w.jpg",
    x: -280,
    y: -10,
    z: -200,
    rot: 18,
    type: "flow"
  },
  {
    id: 2,
    title: "Throughput",
    description: "Real-time bandwidth consumption and scaling metrics.",
    x: -150,
    y: 5,
    z: -100,
    rot: 10,
    type: "throughput"
  },
  {
    id: 3,
    title: "Core Engine",
    description: "Centralized processing unit managing asynchronous task queues and load balancing across all operational shards.",
    x: 0,
    y: 10,
    z: 0,
    rot: 0,
    type: "engine"
  },
  {
    id: 4,
    title: "Efficiency",
    description: "Resource allocation and memory usage across isolated clusters.",
    icon: "solar:settings-linear",
    x: 150,
    y: 0,
    z: -100,
    rot: -10,
    type: "efficiency"
  },
  {
    id: 5,
    title: "Facility 04",
    description: "Nordic Cluster - Active",
    icon: "solar:server-square-linear",
    bgImage: "https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/7f78131e-65e9-49b2-aa1f-ccc33e28df9f_1600w.webp",
    x: 280,
    y: -15,
    z: -200,
    rot: -18,
    type: "facility"
  }
];

function WebGLBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    let animationFrameId = null;
    let isDisposed = false;

    const initWebGL = async () => {
      try {
        const THREE = await import("three");

        if (isDisposed) return;

        const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

        const scene = new THREE.Scene();
        const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);

        const vertexShader = `
          varying vec2 vUv;
          void main() {
            vUv = uv;
            gl_Position = vec4(position, 1.0);
          }
        `;

        const fragmentShader = `
          uniform float uTime;
          uniform vec2 uResolution;
          uniform float uDarkTheme;
          varying vec2 vUv;

          vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
          vec2 mod289(vec2 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
          vec3 permute(vec3 x) { return mod289(((x*34.0)+1.0)*x); }
          float snoise(vec2 v) {
            const vec4 C = vec4(0.211324865405187, 0.366025403784439, -0.577350269189626, 0.024390243902439);
            vec2 i  = floor(v + dot(v, C.yy) );
            vec2 x0 = v -   i + dot(i, C.xx);
            vec2 i1; i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
            vec4 x12 = x0.xyxy + C.xxzz;
            x12.xy -= i1;
            i = mod289(i);
            vec3 p = permute( permute( i.y + vec3(0.0, i1.y, 1.0 )) + i.x + vec3(0.0, i1.x, 1.0 ));
            vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
            m = m*m ; m = m*m ;
            vec3 x = 2.0 * fract(p * C.www) - 1.0;
            vec3 h = abs(x) - 0.5;
            vec3 ox = floor(x + 0.5);
            vec3 a0 = x - ox;
            m *= 1.79284291400159 - 0.85373472095314 * ( a0*a0 + h*h );
            vec3 g;
            g.x  = a0.x  * x0.x  + h.x  * x0.y;
            g.yz = a0.yz * x12.xz + h.yz * x12.yw;
            return 130.0 * dot(m, g);
          }

          void main() {
            vec2 uv = gl_FragCoord.xy / uResolution.xy;
            
            vec2 noiseUv1 = uv * 1.5 + vec2(uTime * 0.015, uTime * 0.02);
            vec2 noiseUv2 = uv * 2.0 - vec2(uTime * 0.01, uTime * 0.015);
            
            float n1 = snoise(noiseUv1);
            float n2 = snoise(noiseUv2);
            
            vec3 bgLight = vec3(0.96, 0.97, 0.98);
            vec3 c1Light = vec3(0.92, 0.94, 0.99);
            vec3 c2Light = vec3(0.88, 0.91, 0.96);
            
            vec3 bgDark = vec3(0.04, 0.05, 0.06);
            vec3 c1Dark = vec3(0.06, 0.08, 0.12);
            vec3 c2Dark = vec3(0.05, 0.07, 0.09);
            
            vec3 bg = mix(bgLight, bgDark, uDarkTheme);
            vec3 colorA = mix(c1Light, c1Dark, uDarkTheme);
            vec3 colorB = mix(c2Light, c2Dark, uDarkTheme);
            
            vec3 finalColor = mix(bg, colorA, n1 * 0.5 + 0.5);
            finalColor = mix(finalColor, colorB, n2 * 0.3 + 0.3);
            
            float dist = distance(uv, vec2(0.5));
            finalColor -= dist * (0.05 + 0.05 * uDarkTheme);

            gl_FragColor = vec4(finalColor, 1.0);
          }
        `;

        const isSystemDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

        const material = new THREE.ShaderMaterial({
          vertexShader,
          fragmentShader,
          uniforms: {
            uTime: { value: 0 },
            uResolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) },
            uDarkTheme: { value: isSystemDark ? 1.0 : 0.0 }
          }
        });

        const geometry = new THREE.PlaneGeometry(2, 2);
        const mesh = new THREE.Mesh(geometry, material);
        scene.add(mesh);

        let time = 0;
        const render = () => {
          animationFrameId = requestAnimationFrame(render);
          time += 0.01;
          material.uniforms.uTime.value = time;
          renderer.render(scene, camera);
        };
        render();

        const { gsap } = await import("gsap");
        window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", (e) => {
          gsap.to(material.uniforms.uDarkTheme, {
            value: e.matches ? 1.0 : 0.0,
            duration: 1.5,
            ease: "power2.inOut"
          });
        });

        const handleResize = () => {
          renderer.setSize(window.innerWidth, window.innerHeight);
          material.uniforms.uResolution.value.set(window.innerWidth, window.innerHeight);
        };
        window.addEventListener("resize", handleResize);

        return () => {
          window.removeEventListener("resize", handleResize);
          geometry.dispose();
          material.dispose();
          renderer.dispose();
        };
      } catch (error) {
        console.error("WebGL initialization failed:", error);
      }
    };

    const cleanup = initWebGL();

    return () => {
      isDisposed = true;
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
      cleanup?.then((fn) => fn?.());
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 z-0 pointer-events-none w-full h-full"
    />
  );
}

function ThroughputCard() {
  return (
    <div className="relative w-full h-full bg-white/95 dark:bg-[#13161c]/95 backdrop-blur-xl rounded-[2.5rem] p-6 flex flex-col justify-between border border-white/50 dark:border-white/5 shadow-inner">
      <div>
        <h3 className="text-2xl font-semibold tracking-tight mb-2 text-slate-800 dark:text-slate-100">
          Throughput
        </h3>
        <p className="text-xs leading-relaxed text-slate-500 dark:text-slate-400 font-medium">
          Real-time bandwidth consumption and scaling metrics.
        </p>
      </div>

      <div className="flex items-end justify-between h-24 gap-[3px] mt-4 mb-2">
        {[40, 70, 50, 100, 30, 60, 85, 45, 75].map((height, i) => (
          <div
            key={i}
            className={`w-2 rounded-full origin-bottom bar-anim ${
              height === 100 ? "bg-orange-500 dark:bg-orange-500/80" : `bg-orange-400 dark:bg-orange-400 opacity-${Math.round((height / 100) * 8)}`
            }`}
            style={{ height: `${height}%` }}
          />
        ))}
      </div>

      <div className="space-y-2 mt-auto">
        <div className="bg-slate-50 dark:bg-slate-800/50 rounded-full px-4 py-2 flex justify-between items-center text-xs border border-slate-100 dark:border-slate-700">
          <span className="text-slate-500 dark:text-slate-400">Peak Load</span>
          <span className="font-semibold text-slate-800 dark:text-slate-200">942 TB/s</span>
        </div>
        <div className="bg-slate-50 dark:bg-slate-800/50 rounded-full px-4 py-2 flex justify-between items-center text-xs border border-slate-100 dark:border-slate-700">
          <span className="text-slate-500 dark:text-slate-400">Average</span>
          <span className="font-semibold text-slate-800 dark:text-slate-200">415 TB/s</span>
        </div>
      </div>
    </div>
  );
}

function CoreEngineCard() {
  return (
    <div className="relative w-full h-full bg-white/70 dark:bg-[#0d1017]/70 backdrop-blur-2xl rounded-[2.5rem] border border-white/60 dark:border-white/10 p-7 flex flex-col shadow-inner">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-3">
          <img
            src="https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/77415a2e-dcbc-4748-a29d-fced4821881a_1600w.jpg"
            alt="User"
            className="w-9 h-9 rounded-full object-cover border border-white/50 dark:border-slate-700 shadow-sm"
          />
          <div className="flex flex-col">
            <span className="text-xs font-semibold text-slate-800 dark:text-slate-200">System Admin</span>
            <span className="text-[10px] text-slate-500 dark:text-slate-400">Authorized</span>
          </div>
        </div>
        <Icon icon="solar:menu-dots-circle-linear" className="text-2xl text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 cursor-pointer transition-colors" width={24} height={24} />
      </div>

      <h2 className="text-3xl font-semibold tracking-tight text-slate-900 dark:text-white mb-2">Core Engine</h2>
      <p className="text-xs leading-relaxed text-slate-600 dark:text-slate-400 mb-6 font-medium">
        Centralized processing unit managing asynchronous task queues and load balancing across all operational shards.
      </p>

      <div className="flex-grow bg-slate-50/50 dark:bg-slate-800/30 rounded-3xl border border-slate-200/60 dark:border-slate-700/50 p-5 relative overflow-hidden flex flex-col justify-between mb-6 shadow-inner">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.5)]" />
            <span className="font-semibold text-sm text-slate-700 dark:text-slate-200 tracking-tight">Activity</span>
          </div>
          <div className="text-xs font-medium text-slate-500 dark:text-slate-400">Live</div>
        </div>

        <div className="relative h-20 mt-4 w-full">
          <svg className="absolute inset-0 w-full h-full overflow-visible" viewBox="0 0 100 40" preserveAspectRatio="none">
            <path d="M0,20 Q20,30 40,15 T70,25 T100,15" fill="none" stroke="currentColor" strokeWidth="1" className="text-slate-300 dark:text-slate-700" />
            <path id="main-path" d="M0,25 Q15,10 30,22 T55,10 T75,25 T100,18" fill="none" stroke="currentColor" strokeWidth="2" className="text-blue-500 drop-shadow-md" style={{ strokeDasharray: 200, strokeDashoffset: 200 }} />
            <circle cx="30" cy="22" r="3" fill="currentColor" stroke="white" strokeWidth="1" className="text-blue-500 main-dot dark:stroke-[#0d1017]" />
            <circle cx="55" cy="10" r="3" fill="currentColor" stroke="white" strokeWidth="1" className="text-blue-500 main-dot dark:stroke-[#0d1017]" />
            <circle cx="75" cy="25" r="3" fill="currentColor" stroke="white" strokeWidth="1" className="text-blue-500 main-dot dark:stroke-[#0d1017]" />
          </svg>
        </div>
      </div>

      <div className="flex gap-3">
        <button className="flex-1 bg-white/60 dark:bg-slate-800/60 hover:bg-white dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs font-medium py-3 rounded-2xl transition-all border border-slate-200/50 dark:border-slate-600/50 shadow-sm backdrop-blur-md">
          Diagnostics
        </button>
        <button className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white text-xs font-medium py-3 rounded-2xl shadow-[0_8px_16px_rgba(79,70,229,0.2)] transition-all">
          Compile
        </button>
      </div>
    </div>
  );
}

function AnimationsManager() {
  useEffect(() => {
    const initAnimations = async () => {
      try {
        const { gsap } = await import("gsap");
        const { ScrollTrigger } = await import("gsap/ScrollTrigger");

        gsap.registerPlugin(ScrollTrigger);

        const tl = gsap.timeline({ delay: 0.1 });

        tl.to("#hero-header", {
          autoAlpha: 1,
          y: 0,
          duration: 1.2,
          ease: "power3.out"
        })
          .to(".card", {
            duration: 1.8,
            autoAlpha: 1,
            scale: 1,
            x: (i, el) => parseFloat(el.dataset.x),
            y: (i, el) => parseFloat(el.dataset.y),
            z: (i, el) => parseFloat(el.dataset.z),
            rotateY: (i, el) => parseFloat(el.dataset.rot),
            stagger: { amount: 0.4, from: "center" },
            ease: "back.out(1.1)"
          }, "-=0.8")
          .to("#bottom-dots", {
            autoAlpha: 1,
            y: -10,
            duration: 0.8,
            ease: "power2.out"
          }, "-=1.0");

        gsap.to("#main-path", {
          strokeDashoffset: 0,
          duration: 2.5,
          ease: "power2.inOut",
          delay: 1.5
        });

        gsap.to(".main-dot", {
          scale: 1.3,
          transformOrigin: "center",
          duration: 1.5,
          yoyo: true,
          repeat: -1,
          ease: "sine.inOut",
          stagger: 0.2
        });

        gsap.to(".bar-anim", {
          scaleY: "random(0.5, 1.2)",
          duration: "random(1.5, 3)",
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut"
        });

        gsap.to(".reveal-word", {
          scrollTrigger: {
            trigger: ".reveal-word",
            start: "top 85%",
            end: "bottom 40%",
            toggleActions: "play none none reverse"
          },
          y: "0%",
          stagger: 0.04,
          duration: 0.8,
          ease: "power3.out"
        });
      } catch (error) {
        console.error("Animation initialization failed:", error);
      }
    };

    initAnimations();
  }, []);

  return null;
}

function CardStack() {
  const scaleWrapperRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    const updateScale = () => {
      if (!scaleWrapperRef.current) return;
      const width = window.innerWidth;
      const height = window.innerHeight;
      let scale = 1;
      if (width < 850) scale = width / 850;
      if (height < 700 && scale > 0.6) scale = height / 800;
      scale = Math.max(0.45, scale);
      
      const gsap = window.gsap;
      if (gsap) {
        gsap.set(scaleWrapperRef.current, { scale });
      } else {
        scaleWrapperRef.current.style.transform = `scale(${scale})`;
      }
    };

    window.addEventListener("resize", updateScale);
    updateScale();

    return () => window.removeEventListener("resize", updateScale);
  }, []);

  useEffect(() => {
    const initParallax = async () => {
      try {
        const { gsap } = await import("gsap");

        const container = containerRef.current;
        if (!container) return;

        const handleMouseMove = (e) => {
          const x = (e.clientX / window.innerWidth - 0.5) * 2;
          const y = (e.clientY / window.innerHeight - 0.5) * 2;
          gsap.to(container, {
            rotateY: x * 6,
            rotateX: -y * 3,
            duration: 1.5,
            ease: "power2.out"
          });
        };

        window.addEventListener("mousemove", handleMouseMove);

        return () => window.removeEventListener("mousemove", handleMouseMove);
      } catch (error) {
        console.error("Parallax initialization failed:", error);
      }
    };

    const cleanup = initParallax();
    return () => cleanup?.then((fn) => fn?.());
  }, []);

  return (
    <div
      ref={scaleWrapperRef}
      className="relative w-[320px] h-[460px] origin-center"
      style={{ transformStyle: "preserve-3d" }}
    >
      <div
        ref={containerRef}
        id="card-stack"
        className="absolute inset-0 w-full h-full"
        style={{ transformStyle: "preserve-3d" }}
      >
        {CARDS_DATA.map((card) => (
          <div
            key={card.id}
            className="card absolute top-1/2 left-1/2 p-[1px] rounded-[2rem] shadow-xl"
            style={{
              width: card.type === "engine" ? "300px" : card.type === "throughput" || card.type === "efficiency" ? "240px" : "220px",
              height: card.type === "engine" ? "450px" : card.type === "throughput" || card.type === "efficiency" ? "380px" : "340px",
              marginLeft: card.type === "engine" ? "-150px" : card.type === "throughput" || card.type === "efficiency" ? "-120px" : "-110px",
              marginTop: card.type === "engine" ? "-225px" : card.type === "throughput" || card.type === "efficiency" ? "-190px" : "-170px",
              background: card.type === "engine" ? "linear-gradient(to bottom, rgba(96, 165, 250, 0.4), transparent, rgba(168, 85, 247, 0.2))" : card.type === "throughput" ? "linear-gradient(to bottom right, rgba(251, 146, 60, 0.5), rgba(248, 113, 113, 0.1))" : card.type === "efficiency" ? "linear-gradient(to bottom right, rgba(45, 212, 191, 0.4), rgba(16, 185, 129, 0.1))" : "linear-gradient(to bottom right, rgba(203, 213, 225, 0.5), rgba(203, 213, 225, 0.1))",
              zIndex: card.type === "engine" ? 10 : card.type === "throughput" || card.type === "efficiency" ? 2 : 1,
              opacity: 0,
              scale: 0.6,
          transformStyle: "preserve-3d"
            }}
            data-x={card.x}
            data-y={card.y}
            data-z={card.z}
            data-rot={card.rot}
          >
            {card.type === "throughput" && <ThroughputCard />}
            {card.type === "engine" && <CoreEngineCard />}
            {card.type === "efficiency" && (
              <div className="relative w-full h-full bg-white/95 dark:bg-[#13161c]/95 backdrop-blur-xl rounded-[2.5rem] p-6 flex flex-col justify-between border border-white/50 dark:border-white/5 shadow-inner">
                <div className="flex justify-end w-full mb-2">
                  <div className="flex gap-1">
                    <div className="w-1.5 h-1.5 rounded-full bg-slate-300 dark:bg-slate-600" />
                    <div className="w-1.5 h-1.5 rounded-full bg-teal-400" />
                  </div>
                </div>
                <div>
                  <h3 className="text-2xl font-semibold tracking-tight mb-2 text-slate-800 dark:text-slate-100">Efficiency</h3>
                  <p className="text-xs leading-relaxed text-slate-500 dark:text-slate-400 font-medium">Resource allocation and memory usage across isolated clusters.</p>
                </div>
                <div className="bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-100 dark:border-slate-700 p-4 mt-6 flex flex-col gap-4">
                  <div className="w-full flex items-center justify-between text-xs">
                    <div className="flex items-center h-1.5 w-2/3 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                      <div className="h-full w-[78%] bg-teal-400 rounded-full" />
                    </div>
                    <span className="text-slate-700 dark:text-slate-300 font-medium ml-3">78%</span>
                  </div>
                  <div className="w-full flex items-center justify-between text-xs">
                    <div className="flex items-center h-1.5 w-1/2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                      <div className="h-full w-[42%] bg-slate-400 dark:bg-slate-500 rounded-full" />
                    </div>
                    <span className="text-slate-700 dark:text-slate-300 font-medium ml-3">42%</span>
                  </div>
                </div>
                <div className="flex gap-2 mt-auto pt-6">
                  <div className="w-10 h-10 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-center text-slate-400 dark:text-slate-500">
                    <Icon icon="solar:settings-linear" width={20} height={20} />
                  </div>
                  <button className="flex-1 bg-slate-900 dark:bg-slate-100 hover:bg-slate-800 dark:hover:bg-white text-white dark:text-slate-900 text-xs font-medium py-2 rounded-xl transition-colors shadow-sm">
                    Optimize
                  </button>
                </div>
              </div>
            )}
            {card.type === "flow" && (
              <div className="relative w-full h-full bg-white dark:bg-[#11141a] rounded-[2rem] p-5 overflow-hidden flex flex-col justify-between border border-white/40 dark:border-white/5">
                <img src={card.bgImage} alt="Abstract" className="absolute inset-0 w-full h-full object-cover opacity-10 dark:opacity-20 mix-blend-luminosity pointer-events-none" />
                <div className="relative z-10">
                  <Icon icon={card.icon} className="text-xl mb-4 text-indigo-500 dark:text-indigo-400" width={24} height={24} />
                  <h3 className="text-xl font-medium tracking-tight mb-2 text-slate-800 dark:text-slate-100">Packet Flow</h3>
                  <p className="text-xs leading-relaxed text-slate-500 dark:text-slate-400 font-medium">Monitoring inbound request density across global edge nodes.</p>
                </div>
                <div className="relative z-10 h-20 w-full bg-slate-50/50 dark:bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-200/50 dark:border-slate-700/50 p-2 overflow-hidden">
                  <svg className="absolute inset-0 w-full h-full px-2 py-4 overflow-visible" viewBox="0 0 100 40" preserveAspectRatio="none">
                    <path id="path-1" d="M0,25 Q15,35 30,20 T60,25 T100,10" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-indigo-400" style={{ strokeDasharray: 200, strokeDashoffset: 200 }} />
                    <circle cx="30" cy="20" r="2" fill="currentColor" className="text-indigo-500 dot-anim" />
                    <circle cx="60" cy="25" r="2" fill="currentColor" className="text-indigo-500 dot-anim" />
                  </svg>
                </div>
              </div>
            )}
            {card.type === "facility" && (
              <div className="relative w-full h-full bg-slate-100 dark:bg-slate-900 rounded-[2rem] overflow-hidden flex flex-col justify-end p-5 border border-white/50 dark:border-white/5">
                <img src={card.bgImage} alt="Modern Architecture" className="absolute inset-0 w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <div className="relative z-10 flex justify-end w-full mb-auto mt-2">
                  <div className="bg-white/20 backdrop-blur-md p-2 rounded-xl border border-white/20 text-white shadow-sm">
                    <Icon icon={card.icon} width={20} height={20} />
                  </div>
                </div>
                <div className="relative z-10 pt-4">
                  <h4 className="text-white text-sm font-medium mb-1">Facility 04</h4>
                  <div className="flex items-center justify-between">
                    <div className="text-[10px] text-white/70 font-medium">Nordic Cluster</div>
                    <div className="flex items-center gap-1.5 bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded-full border border-emerald-500/30 text-[10px]">
                      <div className="w-1 h-1 rounded-full bg-emerald-400" />
                      Active
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="absolute bottom-8 flex gap-2.5 opacity-0 z-20" id="bottom-dots">
        <div className="w-2 h-2 rounded-full bg-slate-800 dark:bg-white border border-transparent shadow-sm" />
        <div className="w-2 h-2 rounded-full bg-slate-300 dark:bg-slate-700" />
        <div className="w-2 h-2 rounded-full bg-slate-300 dark:bg-slate-700" />
      </div>
    </div>
  );
}

export default function DataSynchronyVisualization() {
  return (
    <section className="relative w-full text-slate-800 dark:text-slate-100 antialiased selection:bg-blue-200 dark:selection:bg-blue-900/50 transition-colors duration-700" style={{ fontFamily: "Inter, sans-serif" }}>
      <WebGLBackground />
      <AnimationsManager />

      <div
        className="absolute inset-0 z-0 pointer-events-none opacity-[0.03] dark:opacity-[0.06] mix-blend-multiply dark:mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`
        }}
      />

      <main className="relative z-10 w-full flex flex-col items-center">
        <section className="relative w-full min-h-screen flex flex-col items-center justify-between py-12 px-4 md:px-8">
          <div className="text-center w-full max-w-2xl mt-4 md:mt-8 z-20 opacity-0 flex flex-col items-center" id="hero-header">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 mb-4 rounded-full bg-white/60 dark:bg-slate-800/40 border border-slate-200/50 dark:border-slate-700/50 backdrop-blur-md">
              <div className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
              <span className="text-xs font-medium text-slate-600 dark:text-slate-300">Live Architecture</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight text-slate-900 dark:text-white mb-4 drop-shadow-sm">
              Data Synchrony
            </h1>
            <p className="text-sm text-slate-600 dark:text-slate-400 font-medium max-w-md mx-auto leading-relaxed">
              Visualize complex architectural streams and consolidate node metrics in real-time. Built for precision.
            </p>
          </div>

          <div className="flex-1 w-full flex items-center justify-center min-h-[500px] mt-8" style={{ perspective: "1500px", transformStyle: "preserve-3d" }}>
            <CardStack />

            <div className="absolute bottom-6 flex flex-col items-center gap-2 opacity-50 z-20 animate-bounce">
              <span className="text-[10px] font-medium uppercase tracking-widest text-slate-500">Scroll</span>
              <Icon icon="solar:arrow-down-linear" className="text-slate-500" width={16} height={16} />
            </div>
          </div>
        </section>

        <section className="relative w-full flex items-center justify-center px-6 md:px-12 py-24 z-20 border-t border-slate-200/40 dark:border-white/5">
          <div className="max-w-5xl mx-auto flex flex-wrap justify-center gap-x-3 md:gap-x-5 gap-y-2 md:gap-y-4 text-center">
            {["Uncover", "hidden", "patterns", "in", "your", "architecture"].map((word, idx) => (
              <span key={idx} style={{ overflow: "hidden", display: "inline-block", paddingBottom: "0.2em" }}>
                <span
                  className={`reveal-word inline-block text-4xl md:text-6xl lg:text-7xl font-medium tracking-tight ${
                    ["patterns", "your", "architecture"].includes(word)
                      ? "text-slate-900 dark:text-slate-100"
                      : "text-slate-400 dark:text-slate-600"
                  }`}
                  style={{ transform: "translateY(110%)" }}
                >
                  {word}
                </span>
              </span>
            ))}

            <div className="w-full h-4 md:h-8" />

            {["By", "mapping", "real-time", "streams,", "we", "bring", "absolute", "clarity", "to", "complex", "systems"].map((word, idx) => (
              <span key={`bottom-${idx}`} style={{ overflow: "hidden", display: "inline-block", paddingBottom: "0.2em" }}>
                <span
                  className={`reveal-word inline-block text-3xl md:text-5xl lg:text-6xl font-medium tracking-tight ${
                    ["absolute", "clarity"].includes(word)
                      ? "text-slate-800 dark:text-slate-200"
                      : word === "real-time"
                      ? "text-blue-500 dark:text-blue-400"
                      : "text-slate-500 dark:text-slate-500"
                  }`}
                  style={{ transform: "translateY(110%)" }}
                >
                  {word}
                </span>
              </span>
            ))}
          </div>
        </section>
      </main>
    </section>
  );
}
