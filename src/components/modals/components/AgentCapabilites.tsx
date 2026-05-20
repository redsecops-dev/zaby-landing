import React from "react";

export default function AgentCapabilities() {
  const html = `<section class="bg-slate-50 text-slate-900 antialiased min-h-screen font-sans flex flex-col items-center" style="font-family: 'Inter', sans-serif;">
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500&amp;display=swap" rel="stylesheet">

<div class="relative w-full max-w-6xl mx-auto min-h-screen bg-white border-x border-slate-200 flex flex-col items-center pt-24 pb-32 overflow-hidden shadow-sm">
        
        <!-- Frame Corner Markers -->
        <div class="absolute top-0 left-0 w-1.5 h-1.5 bg-slate-300 -translate-x-[1px] -translate-y-[1px]"></div>
        <div class="absolute top-0 right-0 w-1.5 h-1.5 bg-slate-300 translate-x-[1px] -translate-y-[1px]"></div>
        <div class="absolute bottom-0 left-0 w-1.5 h-1.5 bg-slate-300 -translate-x-[1px] translate-y-[1px]"></div>
        <div class="absolute bottom-0 right-0 w-1.5 h-1.5 bg-slate-300 translate-x-[1px] translate-y-[1px]"></div>

        <main class="w-full px-4 md:px-8 flex flex-col items-center relative z-10">
            
            <!-- Header Section -->
            <div class="max-w-3xl text-center mb-16">
                <h1 id="reveal-title" class="text-4xl md:text-5xl font-normal tracking-tight text-slate-900 leading-tight mb-6">
                    Transform user interactions into autonomous growth engines
                </h1>
                <p class="text-sm md:text-base text-slate-500 font-light leading-relaxed max-w-2xl mx-auto">
                    Eliminate uncertainty from your marketing efforts. Our intelligent system processes live engagement data to automatically construct and launch conversion-focused campaigns. Multiply your results with pinpoint accuracy.
                </p>
            </div>

            <!-- Inset Dark Feature Block (Gradient Border Wrapper) -->
            <div class="w-full max-w-5xl mb-16 z-10 relative mx-auto shadow-2xl p-[1px] rounded-[2rem] bg-gradient-to-b from-slate-700/50 via-slate-800/20 to-slate-950/10 hover:from-slate-600/60 transition-colors duration-700">
                <div class="w-full h-full bg-slate-950 rounded-[calc(2rem-1px)] p-6 md:p-12 overflow-hidden relative">
                    
                    <!-- Fluid Mesh Gradient WebGL Background -->
                    <div id="webgl-container" class="absolute inset-0 z-0 pointer-events-none rounded-[calc(2rem-1px)]"></div>

                    <div class="w-full h-full relative z-10 flex flex-col md:flex-row items-center justify-between gap-8 md:gap-4">
                        
                        <!-- Column 1: Input Pills -->
                        <div class="flex-1 flex flex-col gap-4 z-10 w-full items-center md:items-start">
                            <div class="h-8 w-24 bg-transparent border-r border-dashed border-slate-700/50 hidden md:block"></div>
                            
                            <div class="p-[1px] rounded-[2rem] bg-gradient-to-b from-slate-700/60 to-slate-900/40 shadow-[0_4px_10px_-2px_rgba(0,0,0,0.3)] transition-transform hover:-translate-y-0.5 min-w-[120px]">
                                <div class="bg-gradient-to-b from-slate-800 to-slate-900/90 rounded-[calc(2rem-1px)] px-5 py-3 flex flex-col items-center justify-center w-full h-full shadow-[inset_0_1px_1px_rgba(255,255,255,0.1),inset_0_-1px_4px_rgba(0,0,0,0.4)]">
                                    <iconify-icon icon="solar:global-linear" stroke-width="1.5" class="text-slate-400 text-lg" style="filter: drop-shadow(0 1px 1px rgba(0,0,0,0.3));"></iconify-icon>
                                    <span class="text-xs text-slate-300 mt-1 font-light tracking-wide" style="text-shadow: 0 1px 1px rgba(0,0,0,0.4);">Live Signals</span>
                                </div>
                            </div>
                            
                            <div class="p-[1px] rounded-[2rem] bg-gradient-to-b from-blue-500/30 to-slate-900/50 shadow-[0_4px_10px_-2px_rgba(0,0,0,0.3)] transform md:translate-x-4 transition-transform hover:-translate-y-0.5 min-w-[140px]">
                                <div class="bg-gradient-to-b from-blue-900/80 to-slate-900/90 rounded-[calc(2rem-1px)] px-6 py-4 flex flex-col items-center justify-center w-full h-full shadow-[inset_0_1px_1px_rgba(255,255,255,0.15),inset_0_-1px_4px_rgba(0,0,0,0.4)]">
                                    <iconify-icon icon="solar:letter-linear" stroke-width="1.5" class="text-blue-300 text-xl" style="filter: drop-shadow(0 1px 1px rgba(0,0,0,0.4));"></iconify-icon>
                                    <span class="text-xs text-blue-200/90 mt-1 font-normal tracking-wide" style="text-shadow: 0 1px 1px rgba(0,0,0,0.4);">Inbox Analytics</span>
                                </div>
                            </div>
                            
                            <div class="p-[1px] rounded-[2rem] bg-gradient-to-b from-slate-700/60 to-slate-900/40 shadow-[0_4px_10px_-2px_rgba(0,0,0,0.3)] transition-transform hover:-translate-y-0.5 min-w-[120px]">
                                <div class="bg-gradient-to-b from-slate-800 to-slate-900/90 rounded-[calc(2rem-1px)] px-5 py-3 flex flex-col items-center justify-center w-full h-full shadow-[inset_0_1px_1px_rgba(255,255,255,0.1),inset_0_-1px_4px_rgba(0,0,0,0.4)]">
                                    <iconify-icon icon="solar:users-group-rounded-linear" stroke-width="1.5" class="text-slate-400 text-lg" style="filter: drop-shadow(0 1px 1px rgba(0,0,0,0.3));"></iconify-icon>
                                    <span class="text-xs text-slate-300 mt-1 font-light tracking-wide" style="text-shadow: 0 1px 1px rgba(0,0,0,0.4);">Interactions</span>
                                </div>
                            </div>

                            <div class="h-8 w-24 bg-transparent border-r border-dashed border-slate-700/50 hidden md:block"></div>
                        </div>

                        <!-- Column 2: Mockup Card (Nested Layer) -->
                        <div class="shrink-0 w-full max-w-xs rounded-2xl bg-gradient-to-b from-slate-700/50 to-slate-800/30 p-[1px] shadow-2xl z-10 mx-auto">
                            <div class="bg-slate-900/90 backdrop-blur-md rounded-[calc(1rem-1px)] p-4 w-full h-full shadow-[inset_0_1px_0_rgba(255,255,255,0.05)]">
                                <!-- Post Header -->
                                <div class="flex items-center justify-between mb-4">
                                    <div class="flex items-center gap-3">
                                        <div class="w-8 h-8 rounded-full bg-slate-800 ring-1 ring-white/10 flex items-center justify-center text-slate-300 overflow-hidden">
                                            <img src="https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/2f563338-39fa-47ea-9761-658d4f3f84db_800w.jpg" class="w-full h-full object-cover grayscale" alt="Nexus Dynamics Avatar">
                                        </div>
                                        <div class="flex flex-col">
                                            <span class="text-sm font-normal text-slate-200 leading-none">Nexus Dynamics</span>
                                            <span class="text-xs text-slate-500 mt-0.5 font-light">@nexusdynamics</span>
                                        </div>
                                    </div>
                                    <div class="p-[1px] rounded-full bg-gradient-to-b from-slate-600/60 to-slate-800/40 shadow-[0_2px_6px_-1px_rgba(0,0,0,0.8)]">
                                        <button class="bg-gradient-to-b from-slate-700/90 to-slate-800 hover:from-slate-700 hover:to-slate-700/90 transition-colors text-slate-200 text-xs font-normal px-3 py-1.5 rounded-[calc(9999px-1px)] shadow-[inset_0_1px_1px_rgba(255,255,255,0.2),inset_0_-1px_2px_rgba(0,0,0,0.5)]" style="text-shadow: 0 1px 1px rgba(0,0,0,0.4);">Follow</button>
                                    </div>
                                </div>
                                <!-- Actual Image Container -->
                                <div class="w-full aspect-square bg-slate-800 rounded-xl mb-4 overflow-hidden border border-white/5">
                                    <img src="https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/fa51902b-c2a4-4c33-a96e-a8f1ef67edc6_1600w.jpg" alt="Generated abstract campaign asset" class="w-full h-full object-cover opacity-90">
                                </div>
                                <!-- Post Footer -->
                                <div class="flex items-center justify-between">
                                    <div class="flex items-center gap-4 text-slate-500">
                                        <iconify-icon icon="solar:heart-linear" class="text-base cursor-pointer hover:text-slate-300 transition-colors"></iconify-icon>
                                        <iconify-icon icon="solar:chat-line-linear" class="text-base cursor-pointer hover:text-slate-300 transition-colors"></iconify-icon>
                                        <iconify-icon icon="solar:plain-linear" class="text-base cursor-pointer hover:text-slate-300 transition-colors"></iconify-icon>
                                    </div>
                                    <span class="text-xs text-slate-500 font-light tracking-widest uppercase">Routed by System</span>
                                </div>
                            </div>
                        </div>

                        <!-- Column 3: Output Pills -->
                        <div class="flex-1 flex flex-col gap-4 z-10 w-full items-center md:items-end">
                            <div class="h-8 w-24 bg-transparent border-l border-dashed border-slate-700/50 hidden md:block"></div>
                            
                            <div class="p-[1px] rounded-[2rem] bg-gradient-to-b from-slate-700/60 to-slate-900/40 shadow-[0_4px_10px_-2px_rgba(0,0,0,0.3)] transition-transform hover:-translate-y-0.5 min-w-[120px]">
                                <div class="bg-gradient-to-b from-slate-800 to-slate-900/90 rounded-[calc(2rem-1px)] px-5 py-3 flex flex-col items-center justify-center w-full h-full shadow-[inset_0_1px_1px_rgba(255,255,255,0.2),inset_0_-1px_4px_rgba(0,0,0,0.4)]">
                                    <span class="text-sm font-normal text-slate-100 leading-none" style="text-shadow: 0 1px 1px rgba(0,0,0,0.4);">+840</span>
                                    <span class="text-xs text-slate-400 mt-1 font-light tracking-wide" style="text-shadow: 0 1px 1px rgba(0,0,0,0.4);">Qualified Leads</span>
                                </div>
                            </div>
                            
                            <div class="p-[1px] rounded-[2rem] bg-gradient-to-b from-indigo-500/30 to-slate-900/50 shadow-[0_4px_10px_-2px_rgba(0,0,0,0.3)] transform md:-translate-x-4 transition-transform hover:-translate-y-0.5 min-w-[140px]">
                                <div class="bg-gradient-to-b from-indigo-900/80 to-slate-900/90 rounded-[calc(2rem-1px)] px-6 py-4 flex flex-col items-center justify-center w-full h-full shadow-[inset_0_1px_1px_rgba(255,255,255,0.15),inset_0_-1px_4px_rgba(0,0,0,0.4)]">
                                    <span class="text-base font-normal text-indigo-200 leading-none" style="text-shadow: 0 1px 1px rgba(0,0,0,0.4);">+3,200</span>
                                    <span class="text-xs text-indigo-300 mt-1 font-normal tracking-wide" style="text-shadow: 0 1px 1px rgba(0,0,0,0.4);">New Members</span>
                                </div>
                            </div>
                            
                            <div class="p-[1px] rounded-[2rem] bg-gradient-to-b from-slate-700/60 to-slate-900/40 shadow-[0_4px_10px_-2px_rgba(0,0,0,0.3)] transition-transform hover:-translate-y-0.5 min-w-[120px]">
                                <div class="bg-gradient-to-b from-slate-800 to-slate-900/90 rounded-[calc(2rem-1px)] px-5 py-3 flex flex-col items-center justify-center w-full h-full shadow-[inset_0_1px_1px_rgba(255,255,255,0.1),inset_0_-1px_4px_rgba(0,0,0,0.4)]">
                                    <span class="text-sm font-normal text-slate-100 leading-none" style="text-shadow: 0 1px 1px rgba(0,0,0,0.4);">+$128k</span>
                                    <span class="text-xs text-slate-400 mt-1 font-light tracking-wide" style="text-shadow: 0 1px 1px rgba(0,0,0,0.4);">Gross Volume</span>
                                </div>
                            </div>

                            <div class="h-8 w-24 bg-transparent border-l border-dashed border-slate-700/50 hidden md:block"></div>
                        </div>

                    </div>
                </div>
            </div>

            <!-- CTA Section -->
            <div class="flex flex-col items-center text-center mt-4">
                <div class="mb-5 p-[1px] rounded-full bg-gradient-to-b from-slate-600/50 to-slate-900/80 shadow-md transition-all hover:-translate-y-0.5 cursor-pointer group">
                    <button class="bg-slate-900 hover:bg-slate-800 rounded-[calc(9999px-1px)] px-8 py-3.5 flex items-center gap-3 text-white font-normal text-sm w-full h-full transition-colors">
                        Deploy Your First System
                        <div class="w-6 h-6 bg-white/10 rounded-full flex items-center justify-center text-white group-hover:translate-x-1 transition-transform">
                            <iconify-icon icon="solar:arrow-right-linear" stroke-width="1.5"></iconify-icon>
                        </div>
                    </button>
                </div>
                <p class="text-xs text-slate-500 font-light max-w-md mx-auto mb-4 leading-relaxed">
                    Assets generated from real-time metrics. Adaptable plans, cancel whenever, secured by our results promise.
                </p>
                <div class="flex items-center gap-2 text-xs font-normal text-slate-600 tracking-wide uppercase">
                    <span class="relative flex h-2 w-2">
                      <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                      <span class="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
                    </span>
                    Reserve Availability For <span id="dynamic-month"></span>
                </div>
            </div>

        </main>
    </div>

<script src="https://cdn.tailwindcss.com"></script>
<script src="https://code.iconify.design/iconify-icon/1.0.7/iconify-icon.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/ScrollTrigger.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js"></script>
<script>
        // Set dynamic month
        const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        document.getElementById('dynamic-month').textContent = months[new Date().getMonth()];

        // GSAP Text Reveal Animation Setup
        document.addEventListener("DOMContentLoaded", (event) => {
            gsap.registerPlugin(ScrollTrigger);

            const title = document.getElementById('reveal-title');
            const text = title.innerText;
            title.innerHTML = '';
            
            // Manual word splitting for masking effect
            const words = text.split(' ');
            words.forEach(word => {
                const container = document.createElement('span');
                container.style.display = 'inline-block';
                container.style.overflow = 'hidden';
                container.style.verticalAlign = 'bottom';
                container.style.paddingBottom = '0.1em';
                
                const inner = document.createElement('span');
                inner.className = 'word-mask-inner';
                inner.innerHTML = word + '&nbsp;'; 
                inner.style.display = 'inline-block';
                inner.style.transform = 'translateY(110%)';
                
                container.appendChild(inner);
                title.appendChild(container);
            });

            // Animate words up
            gsap.to('.word-mask-inner', {
                y: '0%',
                duration: 0.8,
                stagger: 0.04,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: '#reveal-title',
                    start: 'top 85%',
                }
            });
            
            // WebGL (Three.js) Deep Navy Procedural Mesh Gradient Animation
            const initWebGL = () => {
                const container = document.getElementById('webgl-container');
                if (!container) return;

                const scene = new THREE.Scene();
                const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
                const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
                
                renderer.setSize(container.clientWidth, container.clientHeight);
                container.appendChild(renderer.domElement);

                const vertexShader = \`
                    varying vec2 vUv;
                    void main() {
                        vUv = uv;
                        gl_Position = vec4(position, 1.0);
                    }
                \`;

                const fragmentShader = \`
                    uniform float time;
                    uniform vec2 resolution;
                    varying vec2 vUv;

                    void main() {
                        vec2 p = vUv * 2.0 - 1.0;
                        p.x *= resolution.x / resolution.y;
                        
                        float t = time * 0.3;
                        
                        // Procedural Wave Folding / CPPN
                        vec2 pos = p * 1.2;
                        for(int i = 0; i < 3; i++) {
                            float theta = t * 0.4 + float(i) * 1.5;
                            float c = cos(theta);
                            float s = sin(theta);
                            mat2 rot = mat2(c, -s, s, c);
                            pos = pos * rot;
                            pos.x += sin(pos.y * 2.5 + t) * 0.4;
                            pos.y += cos(pos.x * 2.5 + t) * 0.4;
                        }
                        
                        // Deep Navy and Cobalt
                        vec3 colorBase = vec3(0.01, 0.03, 0.12);
                        vec3 colorMid = vec3(0.05, 0.15, 0.45);
                        vec3 colorHighlight = vec3(0.1, 0.3, 0.8);
                        
                        float mix1 = sin(pos.x * 2.0) * 0.5 + 0.5;
                        float mix2 = cos(pos.y * 2.0) * 0.5 + 0.5;
                        
                        vec3 finalColor = mix(colorBase, colorMid, mix1);
                        finalColor = mix(finalColor, colorHighlight, mix2 * 0.6);
                        
                        // Breathing pulse
                        float pulse = sin(time * 0.8) * 0.5 + 0.5;
                        finalColor += colorHighlight * pulse * 0.08;
                        
                        // Technical Overlays
                        float dist = length(p);
                        
                        // Radial Rings
                        float rings = fract(dist * 8.0 - time * 0.2);
                        float ringLines = smoothstep(0.98, 1.0, rings) * 0.15;
                        finalColor += vec3(ringLines);
                        
                        // Calibration Grid
                        vec2 grid = fract(vUv * 30.0);
                        float gridLines = (smoothstep(0.98, 1.0, grid.x) + smoothstep(0.98, 1.0, grid.y)) * 0.06;
                        finalColor += vec3(gridLines);
                        
                        // Ambient Scanline
                        float scanline = sin(vUv.y * 300.0 - time * 10.0) * 0.5 + 0.5;
                        finalColor -= vec3(scanline * 0.04);
                        
                        // Radial Vignette
                        float vignette = smoothstep(2.2, 0.2, dist);
                        finalColor *= vignette;
                        
                        gl_FragColor = vec4(finalColor, 1.0);
                    }
                \`;

                const geometry = new THREE.PlaneGeometry(2, 2);
                const material = new THREE.ShaderMaterial({
                    vertexShader,
                    fragmentShader,
                    uniforms: {
                        time: { value: 0 },
                        resolution: { value: new THREE.Vector2(container.clientWidth, container.clientHeight) }
                    },
                    transparent: true
                });

                const mesh = new THREE.Mesh(geometry, material);
                scene.add(mesh);

                let startTime = Date.now();
                const animate = () => {
                    requestAnimationFrame(animate);
                    material.uniforms.time.value = (Date.now() - startTime) * 0.001;
                    renderer.render(scene, camera);
                };

                animate();

                // Handle resize
                window.addEventListener('resize', () => {
                    if (container) {
                        renderer.setSize(container.clientWidth, container.clientHeight);
                        material.uniforms.resolution.value.set(container.clientWidth, container.clientHeight);
                    }
                });
            };

            // Initialize WebGL slightly after load to ensure container sizing
            setTimeout(initWebGL, 100);
        });
    </script>
</section>`;

  return <div dangerouslySetInnerHTML={{ __html: html }} />;
}
