"use client";

import { Icon } from "@iconify/react";
import { useEffect, useRef, useState, type CSSProperties } from "react";
import { AgentInfoPanel } from "./AgentInfoPanel";
import { type AgentCardData } from "./agent-data";

const agentData: AgentCardData[] = [
    {
        id: "nexus",
        badge: "NEXUS AGENT",
        accentColor: "#0ea5e9",
        heading: ["Quantum", "Intelligence", "Network"],
        description:
            "Autonomous multi-dimensional reasoning engine operating across distributed node clusters with real-time telemetry sync.",
        features: [
            { icon: "solar:cpu-bolt-linear",       label: "Autonomous orchestration" },
            { icon: "solar:graph-new-linear",       label: "Distributed reasoning" },
            { icon: "solar:bolt-linear",            label: "Real-time execution" },
            { icon: "solar:database-linear",        label: "Memory-aware workflows" },
        ],
        stats: [
            { label: "LATENCY", value: "12ms" },
            { label: "MEMORY",  value: "4.2TB" },
            { label: "STATUS",  value: "ACTIVE" },
        ],
        cta: "Explore Nexus →",
        ctaSecondary: "Deploy Workflow",
    },
    {
        id: "synapse",
        badge: "SYNAPSE CORE",
        accentColor: "#3b82f6",
        heading: ["Neural", "Protocol", "Sync"],
        description:
            "High-frequency communication protocol handler bridging agent clusters with sub-millisecond handshake resolution.",
        features: [
            { icon: "solar:transmission-linear",         label: "Protocol bridging" },
            { icon: "solar:signal-linear",               label: "Signal arbitration" },
            { icon: "solar:refresh-bold-duotone",        label: "Adaptive sync loops" },
            { icon: "solar:shield-network-linear",       label: "Secure mesh routing" },
        ],
        stats: [
            { label: "THROUGHPUT", value: "98 Gb/s" },
            { label: "NODES",      value: "2,400" },
            { label: "STATUS",     value: "SYNC" },
        ],
        cta: "Inspect Synapse →",
        ctaSecondary: "View Topology",
    },
    {
        id: "flux",
        badge: "FLUX ENGINE",
        accentColor: "#64748b",
        heading: ["Core", "Latency", "Reduction"],
        description:
            "Predictive load balancer that anticipates task spikes and pre-allocates resources across the execution mesh.",
        features: [
            { icon: "solar:tuning-2-linear",         label: "Predictive pre-allocation" },
            { icon: "solar:chart-2-linear",          label: "Spike dampening" },
            { icon: "solar:layers-linear",           label: "Parallel lane routing" },
            { icon: "solar:clock-circle-linear",     label: "Zero-latency handoff" },
        ],
        stats: [
            { label: "P99",    value: "3ms" },
            { label: "LOAD",   value: "72%" },
            { label: "STATUS", value: "OPTIMAL" },
        ],
        cta: "Inspect Flux →",
        ctaSecondary: "View Metrics",
    },
    {
        id: "arch",
        badge: "ARCH LAYER",
        accentColor: "#1e3a8a",
        heading: ["Deep", "Architecture", "Runtime"],
        description:
            "Enterprise-grade infrastructure layer with isolated execution shards, dedicated compute, and zero-trust networking.",
        features: [
            { icon: "solar:server-bold-duotone",                      label: "Isolated execution shards" },
            { icon: "solar:lock-keyhole-minimalistic-linear",          label: "Zero-trust networking" },
            { icon: "solar:cloud-storage-linear",                     label: "Dedicated compute pools" },
            { icon: "solar:mirror-left-linear",                       label: "Auto-replication" },
        ],
        stats: [
            { label: "UPTIME",  value: "99.99%" },
            { label: "SHARDS",  value: "128" },
            { label: "STATUS",  value: "SECURED" },
        ],
        cta: "Explore Arch →",
        ctaSecondary: "View Clusters",
    },
    {
        id: "grid",
        badge: "GRID PHASE",
        accentColor: "#94a3b8",
        heading: ["Phase", "Grid", "Lock"],
        description:
            "Temporal execution scheduler that locks task phases across distributed agents for perfectly orchestrated workflows.",
        features: [
            { icon: "solar:calendar-minimalistic-linear",  label: "Phase scheduling" },
            { icon: "solar:routing-linear",               label: "Cross-agent lock sync" },
            { icon: "solar:timeline-linear",              label: "Event sequencing" },
            { icon: "solar:map-point-wave-linear",         label: "Geo-distributed phasing" },
        ],
        stats: [
            { label: "PHASES",  value: "64K" },
            { label: "DRIFT",   value: "0.2ms" },
            { label: "STATUS",  value: "LOCKED" },
        ],
        cta: "Explore Grid →",
        ctaSecondary: "Map Phases",
    },
    {
        id: "sys",
        badge: "SYS BOOT",
        accentColor: "#64748b",
        heading: ["System", "Boot", "Sequence"],
        description:
            "Cold-start agent runtime that initializes the full execution context in under 200ms from zero state.",
        features: [
            { icon: "solar:power-linear",       label: "Cold-start <200ms" },
            { icon: "solar:chip-linear",        label: "Context hydration" },
            { icon: "solar:checklist-linear",   label: "Dependency resolution" },
            { icon: "solar:pulse-2-linear",     label: "Health probe cascade" },
        ],
        stats: [
            { label: "BOOT",     value: "186ms" },
            { label: "SERVICES", value: "42" },
            { label: "STATUS",   value: "READY" },
        ],
        cta: "Run Boot →",
        ctaSecondary: "View Logs",
    },
];

// Fixed transform preset for each slot in the card fan stack.
// Every card shares the same base frame size; slot hierarchy now comes solely
// from the wrapper transform preset below.
const stackTransforms = [
    { x:  -70, y:   0, z:  180, rotY:  8, scale: 1.00, opacity: 1.00, zIndex: 6 },
    { x:   20, y:  -8, z:   40, rotY: 11, scale: 0.88, opacity: 0.92, zIndex: 5 },
    { x:   70, y: -16, z:  -90, rotY: 14, scale: 0.74, opacity: 0.72, zIndex: 4 },
    { x:  110, y: -24, z: -190, rotY: 17, scale: 0.60, opacity: 0.52, zIndex: 3 },
    { x:  140, y: -32, z: -290, rotY: 20, scale: 0.48, opacity: 0.34, zIndex: 2 },
    { x:  160, y: -40, z: -390, rotY: 23, scale: 0.36, opacity: 0.16, zIndex: 1 },
];

const stackSceneStyle: CSSProperties = {
    perspective: "1800px",
    transformStyle: "preserve-3d",
};

const cardWrapperStyle: CSSProperties = {
    marginLeft: "-170px",
    marginTop: "-260px",
    transformStyle: "preserve-3d",
    willChange: "transform, opacity",
};

const brandItems = [
    { icon: "solar:planet-linear", label: "Aura Space" },
    { icon: "solar:box-linear", label: "Nexus Core" },
    { icon: "solar:leaf-linear", label: "Lumina" },
    { icon: "solar:atom-linear", label: "Quantum" },
    { icon: "solar:shield-linear", label: "Sentinel" },
    { icon: "solar:ghost-linear", label: "Specter" },
    { icon: "solar:infinity-linear", label: "Aethereal" },
];

const noiseTexture =
    "url('data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E')";

export default function AgentSquad() {
    const rootRef  = useRef<HTMLElement | null>(null);
    const frameRef = useRef<HTMLDivElement | null>(null);
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const [activeIndex, setActiveIndex] = useState(0);
    // Tracks which DOM card index sits at each logical stack slot (array rotation).
    const cardOrderRef = useRef<number[]>([0, 1, 2, 3, 4, 5]);
    const isAnimatingRef = useRef(false);

    useEffect(() => {
        let isDisposed = false;
        let animationFrameId = 0;

        let onResize: (() => void) | null = null;
        let onPointerMove: ((event: PointerEvent) => void) | null = null;

        let cleanupThree: (() => void) | null = null;
        let cleanupGsap: (() => void) | null = null;

        const init = async () => {
            if (!rootRef.current || !frameRef.current || !canvasRef.current) {
                return;
            }

            const [{ gsap }, { ScrollTrigger }, THREE] = await Promise.all([
                import("gsap"),
                import("gsap/ScrollTrigger"),
                import("three"),
            ]);

            if (isDisposed || !rootRef.current || !frameRef.current || !canvasRef.current) {
                return;
            }

            gsap.registerPlugin(ScrollTrigger);

            const root = rootRef.current;
            const frame = frameRef.current;
            const canvas = canvasRef.current;

            const scene = new THREE.Scene();
            const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
            camera.position.z = 50;

            const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
            renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
            renderer.setClearColor(0xffffff, 0);

            const vertexShader = `
                uniform float uTime;
                attribute float size;
                varying float vDepth;
                void main() {
                    vec3 pos = position;
                    pos.z += sin(pos.x * 0.1 + uTime * 0.5) * 2.0;
                    vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
                    vDepth = -mvPosition.z;
                    gl_PointSize = size * (300.0 / -mvPosition.z);
                    gl_Position = projectionMatrix * mvPosition;
                }
            `;

            const fragmentShader = `
                uniform float uTime;
                uniform vec3 uColor;
                varying float vDepth;
                void main() {
                    vec2 xy = gl_PointCoord.xy - vec2(0.5);
                    float radius = length(xy);
                    if (radius > 0.5) discard;
                    float alpha = smoothstep(0.5, 0.4, radius);
                    float depthFade = smoothstep(150.0, 20.0, vDepth);
                    float pulse = (sin(uTime * 0.8) * 0.5 + 0.5) * 0.3 + 0.1;
                    gl_FragColor = vec4(uColor, alpha * depthFade * pulse);
                }
            `;

            const particles = 1500;
            const geometry = new THREE.BufferGeometry();
            const positions = new Float32Array(particles * 3);
            const sizes = new Float32Array(particles);

            for (let i = 0; i < particles; i += 1) {
                positions[i * 3] = (Math.random() - 0.5) * 200;
                positions[i * 3 + 1] = (Math.random() - 0.5) * 100;
                positions[i * 3 + 2] = (Math.random() - 0.5) * 100;
                sizes[i] = Math.random() * 1.5 + 0.5;
            }

            geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
            geometry.setAttribute("size", new THREE.BufferAttribute(sizes, 1));

            const material = new THREE.ShaderMaterial({
                uniforms: {
                    uTime: { value: 0 },
                    uColor: { value: new THREE.Color(0x94a3b8) },
                },
                vertexShader,
                fragmentShader,
                transparent: true,
                depthWrite: false,
                blending: THREE.NormalBlending,
            });

            const pointCloud = new THREE.Points(geometry, material);
            scene.add(pointCloud);

            let mouseX = 0;
            let mouseY = 0;
            const clock = new THREE.Timer();

            const setCanvasSize = () => {
                const bounds = frame.getBoundingClientRect();
                const width = Math.max(1, bounds.width || window.innerWidth);
                const height = Math.max(1, bounds.height || window.innerHeight);
                camera.aspect = width / height;
                camera.updateProjectionMatrix();
                renderer.setSize(width, height, false);
            };

            onPointerMove = (event) => {
                const rect = frame.getBoundingClientRect();
                const halfWidth = rect.width / 2;
                const halfHeight = rect.height / 2;
                mouseX = (event.clientX - rect.left - halfWidth) * 0.05;
                mouseY = (event.clientY - rect.top - halfHeight) * 0.05;
            };

            onResize = () => {
                setCanvasSize();
                ScrollTrigger.refresh();
            };

            frame.addEventListener("pointermove", onPointerMove, { passive: true });
            window.addEventListener("resize", onResize);
            setCanvasSize();

            const render = () => {
                material.uniforms.uTime.value = clock.getElapsed();
                camera.position.x += (mouseX * 0.2 - camera.position.x) * 0.05;
                camera.position.y += (-mouseY * 0.2 - camera.position.y) * 0.05;
                camera.lookAt(scene.position);
                renderer.render(scene, camera);
                animationFrameId = window.requestAnimationFrame(render);
            };
            render();

            cleanupThree = () => {
                window.cancelAnimationFrame(animationFrameId);
                frame.removeEventListener("pointermove", onPointerMove as EventListener);
                window.removeEventListener("resize", onResize as EventListener);
                scene.remove(pointCloud);
                geometry.dispose();
                material.dispose();
                renderer.dispose();
            };

            const context = gsap.context(() => {
                const cards = gsap.utils.toArray<HTMLElement>(".card-wrapper", root);
                const revealTitle = root.querySelector<HTMLElement>("[data-reveal-title]");

                // Place all cards off-screen (right side) ready for the intro fly-in.
                gsap.set(cards, {
                    x: 300,
                    z: -800,
                    rotationY: 45,
                    opacity: 0,
                    transformOrigin: "center center",
                });

                // ── Array-rotation carousel ──────────────────────────────────────────
                // On each advance the logical order array rotates: [0,1,2,3,4,5] →
                // [1,2,3,4,5,0].  Each DOM card fully adopts the complete transform
                // preset of its new slot — no inherited state from the previous slot.
                const advanceCarousel = () => {
                    if (isAnimatingRef.current) return;
                    isAnimatingRef.current = true;

                    const prevOrder = cardOrderRef.current;
                    const exitingDomIdx = prevOrder[0];   // front card leaving
                    const incomingDomIdx = prevOrder[1];  // next card taking ownership
                    const newOrder = [...prevOrder.slice(1), prevOrder[0]];
                    cardOrderRef.current = newOrder;

                    const tl = gsap.timeline({
                        onComplete: () => {
                            isAnimatingRef.current = false;
                            // Panel updates only after the full transition is done.
                            setActiveIndex(newOrder[0]);
                        },
                    });

                    const heroTarget = stackTransforms[0];
                    const trailingTarget = stackTransforms[5];

                    // Phase 1a (t=0): the old hero immediately loses ownership.
                    // Shrink/fade starts at the same moment its zIndex drops.
                    tl.to(cards[exitingDomIdx], {
                        x: heroTarget.x - 20,
                        z: 110,
                        scale: 0.82,
                        opacity: 0.45,
                        rotationY: -10,
                        duration: 0.25,
                        ease: "power2.out",
                        overwrite: true,
                        onStart: () => {
                            gsap.set(cards[exitingDomIdx], { zIndex: trailingTarget.zIndex });
                        },
                    });

                    // Phase 1b (t=0): the incoming card claims hero status immediately.
                    tl.to(cards[incomingDomIdx], {
                        x: stackTransforms[1].x - 20,
                        rotationY: 4,
                        opacity: 1,
                        scale: 1.06,
                        z: heroTarget.z,
                        duration: 0.35,
                        ease: "power2.out",
                        overwrite: true,
                        onStart: () => {
                            gsap.set(cards[incomingDomIdx], { zIndex: heroTarget.zIndex });
                        },
                    }, 0);

                    // ── Slide phase starts once hierarchy transfer is already visible. ─
                    tl.addLabel("slidePhase", 0.25);

                    // Phase 2b: every other card hard-maps to its new slot preset.
                    // zIndex is set via onStart (instant, not animated).
                    // scale/opacity/transform are fully overwritten — zero inherited state.
                    newOrder.forEach((domIdx, slot) => {
                        if (domIdx === exitingDomIdx) return; // handled separately
                        const target = stackTransforms[slot];
                        tl.to(cards[domIdx], {
                            x: target.x,
                            y: target.y,
                            z: target.z,
                            rotationY: target.rotY,
                            scale: target.scale,
                            opacity: target.opacity,
                            duration: 1.15,
                            ease: "power3.inOut",
                            overwrite: true,
                            onStart: () => {
                                gsap.set(cards[domIdx], { zIndex: target.zIndex });
                            },
                        }, "slidePhase");
                    });

                    // Phase 2c: exiting card completes its arc into the back slot.
                    // Starts just after hierarchy transfer so the old hero feels small fast.
                    const lastTarget = stackTransforms[5];
                    tl.to(cards[exitingDomIdx], {
                        x: lastTarget.x,
                        y: lastTarget.y,
                        z: lastTarget.z,
                        rotationY: lastTarget.rotY,
                        scale: lastTarget.scale,
                        opacity: lastTarget.opacity,
                        duration: 1,
                        ease: "power3.inOut",
                        overwrite: true,
                    }, "slidePhase+=0.05");
                };

                // ── Intro fly-in ─────────────────────────────────────────────────────
                const introTimeline = gsap.timeline({ delay: 0.2 });

                cards.forEach((card, index) => {
                    const target = stackTransforms[index];
                    introTimeline.to(
                        card,
                        {
                            duration: 1.8,
                            x: target.x,
                            y: target.y,
                            z: target.z,
                            rotationY: target.rotY,
                            scale: target.scale,
                            opacity: target.opacity,
                            ease: "power3.out",
                            onStart: () => {
                                gsap.set(card, { zIndex: target.zIndex });
                            },
                        },
                        index * 0.15,
                    );
                });

                // Subtle idle float on each card's inner face after intro.
                introTimeline.add(() => {
                    cards.forEach((card) => {
                        const innerElement = card.querySelector<HTMLElement>(".card-content");
                        if (!innerElement) return;

                        // Only float on y-axis. Never touch scale, x, or z here
                        // — those are owned by the outer wrapper's slot transforms.
                        gsap.to(innerElement, {
                            y: `+=${Math.random() * 6 + 4}`,
                            duration: 3 + Math.random() * 2,
                            yoyo: true,
                            repeat: -1,
                            ease: "sine.inOut",
                            delay: Math.random(),
                        });
                    });
                });

                // Start auto-advance after intro completes.
                introTimeline.eventCallback("onComplete", () => {
                    const autoScrollInterval = setInterval(() => {
                        advanceCarousel();
                    }, 5000);

                    context._autoScrollInterval = autoScrollInterval;
                });

                if (revealTitle) {
                    gsap.to(".reveal-word", {
                        scrollTrigger: {
                            trigger: revealTitle,
                            start: "top 85%",
                        },
                        y: "0%",
                        duration: 1,
                        stagger: 0.08,
                        ease: "power4.out",
                    });
                }

                gsap.to(".marquee-track", {
                    xPercent: -50,
                    ease: "none",
                    duration: 25,
                    repeat: -1,
                });
            }, root);

            cleanupGsap = () => {
                if (context._autoScrollInterval) {
                    clearInterval(context._autoScrollInterval);
                }
                context.revert();
            };
        };

        void init();

        return () => {
            isDisposed = true;
            cleanupGsap?.();
            cleanupThree?.();
        };
    }, []);

    return (
        <section ref={rootRef} className="relative w-full overflow-x-hidden bg-white text-slate-900 selection:bg-slate-200">
            <section className="relative h-screen min-h-[760px] w-full overflow-hidden">
                <div ref={frameRef} className="pointer-events-none absolute inset-6 z-0 overflow-hidden sm:inset-12">
                    <div
                        className="absolute inset-0"
                        style={{
                            maskImage: "radial-gradient(circle at center, black 0%, black 56%, rgba(0,0,0,0.55) 72%, transparent 92%)",
                            WebkitMaskImage: "radial-gradient(circle at center, black 0%, black 56%, rgba(0,0,0,0.55) 72%, transparent 92%)",
                        }}
                    >
                        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-slate-50/80 via-white to-slate-100" />
                        <canvas ref={canvasRef} className="absolute inset-0 opacity-40" />
                    </div>
                    <div
                        className="absolute inset-0 border border-slate-900/[0.04]"
                        style={{ backgroundImage: "repeating-linear-gradient(45deg, rgba(0,0,0,0.01) 0, rgba(0,0,0,0.01) 1px, transparent 1px, transparent 10px)" }}
                    />
                    <div
                        className="absolute inset-0 opacity-30"
                        style={{
                            backgroundImage:
                                "linear-gradient(to right, rgba(0,0,0,0.03) 1px, transparent 1px), linear-gradient(to bottom, rgba(0,0,0,0.03) 1px, transparent 1px)",
                            backgroundSize: "64px 64px",
                        }}
                    />
                </div>

                <main data-carousel-area className="relative z-10 flex h-full w-full cursor-grab active:cursor-grabbing" style={{ touchAction: "pan-y" }}>
                    {/* ── Left: card fan ────────────────────────────────── */}
                    <div className="flex h-full w-full items-center justify-center md:w-[58%]">
                    <div className="pointer-events-none relative h-[600px] w-full max-w-xl" style={stackSceneStyle}>
                        <div className="card-wrapper absolute left-1/2 top-1/2 h-[520px] w-[340px]" style={cardWrapperStyle}>
                            <div className="card-content pointer-events-auto h-full w-full rounded-[24px] bg-gradient-to-br from-blue-300 via-slate-100 to-slate-300 p-[1px] shadow-[0_30px_60px_rgba(0,0,0,0.15)]">
                                <div className="relative flex h-full w-full flex-col justify-between overflow-hidden rounded-[23px] bg-[#0ea5e9] p-8">
                                    <img src="https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/eca707cc-a5b7-439a-b4fd-247f6106c2e1_1600w.jpg" alt="Portrait" className="absolute inset-0 -top-10 h-[120%] w-full object-cover object-top opacity-90 mix-blend-multiply grayscale contrast-125" />
                                    <div className="relative z-10 flex items-center gap-1 text-white">
                                        <Icon icon="solar:record-circle-linear" className="text-sm" />
                                        <span className="mt-0.5 text-xs font-light uppercase tracking-[0.2em]">NEXUS</span>
                                    </div>
                                    <div className="relative z-10 flex flex-col text-3xl font-light uppercase leading-[0.9] tracking-tight text-[#34d399]">
                                        <span>Quantum</span>
                                        <span>Network 2029</span>
                                        <span>Data Stream</span>
                                        <span>Node Seq. 42</span>
                                        <span>V.11 SEC 99</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="card-wrapper absolute left-1/2 top-1/2 h-[520px] w-[340px]" style={cardWrapperStyle}>
                            <div className="card-content pointer-events-auto h-full w-full rounded-[24px] bg-gradient-to-br from-blue-200 via-slate-100 to-slate-200 p-[1px] shadow-[0_20px_40px_rgba(0,0,0,0.1)]">
                                <div className="relative flex h-full w-full flex-col justify-between overflow-hidden rounded-[23px] bg-[#3b82f6] p-8">
                                    <img src="https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/e534354d-c5f2-4399-a1d9-2f50338e8c47_1600w.jpg" alt="Protocols abstract background" className="absolute inset-0 h-full w-full object-cover opacity-60 mix-blend-overlay" />
                                    <div className="relative z-10">
                                        <span className="text-xs font-light uppercase tracking-widest text-white/90">Protocols</span>
                                    </div>
                                    <div className="relative z-10 text-4xl font-light leading-none tracking-tight text-white">
                                        <div>syn</div>
                                        <div>apx</div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="card-wrapper absolute left-1/2 top-1/2 h-[520px] w-[340px]" style={cardWrapperStyle}>
                            <div className="card-content pointer-events-auto h-full w-full rounded-[24px] bg-gradient-to-br from-sky-100 via-white to-slate-200 p-[1px] shadow-[0_15px_30px_rgba(0,0,0,0.08)]">
                                <div className="relative flex h-full w-full flex-col justify-center overflow-hidden rounded-[23px] bg-white p-8">
                                    <img src="https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/7f78131e-65e9-49b2-aa1f-ccc33e28df9f_1600w.webp" alt="Latency card texture" className="absolute inset-0 h-full w-full object-cover opacity-10 grayscale mix-blend-luminosity" />
                                    <div className="absolute -bottom-10 -right-10 h-64 w-64 rotate-12 rounded-3xl bg-slate-200 opacity-50 blur-sm mix-blend-multiply" />
                                    <div className="relative z-10 text-4xl font-light leading-[0.9] tracking-tight text-slate-800">
                                        <div>flux</div>
                                        <div>core</div>
                                        <div>latency</div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="card-wrapper absolute left-1/2 top-1/2 h-[520px] w-[340px]" style={cardWrapperStyle}>
                            <div className="card-content pointer-events-auto h-full w-full rounded-[24px] bg-gradient-to-br from-indigo-200 via-slate-100 to-slate-300 p-[1px] shadow-xl">
                                <div className="relative flex h-full w-full flex-col justify-end overflow-hidden rounded-[23px] bg-[#1e3a8a] p-8">
                                    <img src="https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/5ee0a38a-b5d3-4531-8793-98beed4af162_1600w.jpg" alt="Architecture deep blue texture" className="absolute inset-0 h-full w-full object-cover opacity-50 mix-blend-overlay" />
                                </div>
                            </div>
                        </div>

                        <div className="card-wrapper absolute left-1/2 top-1/2 h-[520px] w-[340px]" style={cardWrapperStyle}>
                            <div className="card-content pointer-events-auto h-full w-full rounded-[24px] bg-gradient-to-br from-slate-200 via-white to-slate-300 p-[1px] shadow-lg">
                                <div className="relative flex h-full w-full flex-col justify-center overflow-hidden rounded-[23px] bg-gradient-to-br from-slate-50 to-slate-200 p-6">
                                    <div className="absolute inset-0 opacity-[0.03] mix-blend-overlay" style={{ backgroundImage: noiseTexture }} />
                                    <div className="relative z-10 space-y-4">
                                        <span className="block text-xs font-light uppercase tracking-[0.15em] text-slate-500">Phase</span>
                                        <div className="text-3xl font-light leading-[0.9] tracking-tight text-slate-800">
                                            <div>grid</div>
                                            <div>lock</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="card-wrapper absolute left-1/2 top-1/2 h-[520px] w-[340px]" style={cardWrapperStyle}>
                            <div className="card-content pointer-events-auto h-full w-full rounded-[24px] bg-gradient-to-br from-slate-100 to-slate-200 p-[1px] shadow-md">
                                <div className="relative flex h-full w-full flex-col justify-end overflow-hidden rounded-[23px] bg-slate-50 p-6">
                                    <img src="https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/bfef5098-c30f-4cd9-b4ac-04b2673ab943_1600w.jpg" alt="System boot texture" className="absolute inset-0 h-full w-full object-cover opacity-10 grayscale mix-blend-multiply" />
                                    <div className="relative z-10 text-xl font-light leading-none tracking-tight text-slate-700">
                                        <div>sys</div>
                                        <div className="mt-2">boot</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    </div>{/* end card fan wrapper */}

                    {/* ── Right: info panel ─────────────────────────────── */}
                    <div className="hidden h-full w-[42%] items-center justify-center md:flex">
                        <AgentInfoPanel
                            data={agentData[activeIndex] ?? agentData[0]}
                            index={activeIndex}
                            total={agentData.length}
                        />
                    </div>
                </main>
            </section>

            <section className="relative z-20 flex w-full flex-col justify-center border-t border-slate-100 bg-white py-24">
                <div className="container mx-auto mb-12 px-6 sm:px-12">
                    <h2 data-reveal-title className="flex flex-wrap gap-x-3 gap-y-1 text-2xl font-light uppercase tracking-tight text-slate-900 md:text-3xl">
                        {[
                            "Trusted",
                            "by",
                            "innovative",
                            "teams",
                            "globally",
                        ].map((word) => (
                            <span key={word} className="inline-flex overflow-hidden">
                                <span className="reveal-word translate-y-[110%] will-change-transform">{word}</span>
                            </span>
                        ))}
                    </h2>
                </div>

                <div className="relative w-full overflow-hidden border-y border-slate-100 bg-slate-50/50 py-10">
                    <div className="absolute inset-y-0 left-0 z-10 w-32 bg-gradient-to-r from-white to-transparent" />
                    <div className="absolute inset-y-0 right-0 z-10 w-32 bg-gradient-to-l from-white to-transparent" />

                    <div className="marquee-track flex w-max items-center whitespace-nowrap">
                        {[0, 1].map((groupIndex) => (
                            <div key={groupIndex} className="flex items-center space-x-20 px-10">
                                {brandItems.map((item) => (
                                    <div key={`${groupIndex}-${item.label}`} className="flex items-center gap-3 text-xl font-light uppercase tracking-tight text-slate-400 transition-colors duration-300 hover:text-slate-900">
                                        <Icon icon={item.icon} className="text-3xl" />
                                        <span>{item.label}</span>
                                    </div>
                                ))}
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </section>
    );
}