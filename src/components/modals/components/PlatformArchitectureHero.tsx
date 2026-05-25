import React from "react";

export default function PlatformArchitectureHero() {
  const html = `<section class="bg-[#0a0a0a] text-white overflow-hidden h-[100dvh] w-full flex flex-col font-sans selection:bg-white/20 relative">
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500&amp;family=JetBrains+Mono:wght@400&amp;display=swap" rel="stylesheet">
<link id="all-fonts-link-font-geist" rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Geist:wght@200;300;400;500;600&amp;display=swap">
<style>
        .preserve-3d { transform-style: preserve-3d; }
        .font-geist { font-family: 'Geist', sans-serif !important; }
    </style>

<div class="absolute inset-0 z-0 pointer-events-none opacity-[0.25]" style="background-image: url('https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/fa51902b-c2a4-4c33-a96e-a8f1ef67edc6_1600w.jpg'); background-size: cover; background-position: center; mix-blend-mode: screen; mask-image: linear-gradient(to bottom, black 0%, transparent 80%); -webkit-mask-image: linear-gradient(to bottom, black 0%, transparent 80%);"></div>

<header class="absolute top-0 left-0 right-0 w-full px-6 lg:px-12 py-6 flex items-center justify-between z-50">
        <a href="#" aria-label="Homepage" class="flex items-center gap-2 text-white font-normal tracking-tight text-lg font-geist">
            <iconify-icon icon="solar:layers-minimalistic-linear" width="24" stroke-width="1.5"></iconify-icon>
            Vertex
        </a>
        
        <nav class="hidden md:flex items-center gap-8">
            <a href="#" class="text-sm font-light text-white/60 hover:text-white transition-colors font-geist">Products</a>
            <a href="#" class="text-sm font-light text-white/60 hover:text-white transition-colors font-geist">Solutions</a>
            <a href="#" class="text-sm font-light text-white/60 hover:text-white transition-colors font-geist">Developers</a>
            <a href="#" class="text-sm font-light text-white/60 hover:text-white transition-colors font-geist">Pricing</a>
        </nav>

        <div class="flex items-center gap-4">
            <a href="#" class="hidden md:block text-sm font-light text-white/60 hover:text-white transition-colors font-geist">Sign In</a>
            <button aria-label="Contact Sales" class="text-white px-4 py-2 rounded-full text-xs font-light hover:bg-white/10 transition-colors font-geist" style="background: linear-gradient(rgba(255,255,255,0.05), rgba(255,255,255,0.02)) padding-box, linear-gradient(135deg, rgba(255,255,255,0.4), rgba(255,255,255,0.05)) border-box; border: 1px solid transparent;">
                Contact Sales
            </button>
        </div>
    </header>

<main class="flex-1 w-full flex flex-col lg:flex-row items-center max-w-[90rem] mx-auto px-6 lg:px-12 pt-24 pb-8 lg:py-0 relative z-10">
        
        <!-- Hero Text Content -->
        <div class="flex-1 w-full flex flex-col justify-center items-start text-left shrink-0 z-20 mt-8 lg:mt-0">
            <h1 id="hero-title" class="text-6xl sm:text-7xl lg:text-8xl text-white mb-6 max-w-none leading-[1.1] font-geist font-extralight tracking-tighter">
                <span class="inline-block overflow-hidden align-top"><span class="reveal-word inline-block" style="transform: translateY(110%);">One</span></span>
                <span class="inline-block overflow-hidden align-top"><span class="reveal-word inline-block" style="transform: translateY(110%);">platform.</span></span>
                <br>
                <span class="inline-block overflow-hidden align-top"><span class="reveal-word inline-block" style="transform: translateY(110%);">Infinite</span></span>
                <span class="inline-block overflow-hidden align-top"><span class="reveal-word inline-block" style="transform: translateY(110%);">possibilities.</span></span>
            </h1>
            <p class="reveal-fade text-base sm:text-lg text-white/60 mb-8 max-w-md leading-relaxed font-geist opacity-0 translate-y-4">
                Consolidate your task orchestration, team directory, and global communications within a unified, high-performance spatial environment.
            </p>
            <div class="reveal-fade flex flex-wrap items-center gap-4 opacity-0 translate-y-4">
                <button class="bg-white text-black px-6 py-3 rounded-full text-sm font-light hover:bg-neutral-200 transition-colors flex items-center gap-2 font-geist">
                    Start Building
                    <iconify-icon icon="solar:arrow-right-linear" width="18" stroke-width="1.5"></iconify-icon>
                </button>
                <button class="bg-transparent text-white px-6 py-3 rounded-full text-sm font-light hover:bg-white/5 transition-colors font-geist" style="background: linear-gradient(transparent, transparent) padding-box, linear-gradient(135deg, rgba(255,255,255,0.3), rgba(255,255,255,0.05)) border-box; border: 1px solid transparent;">
                    Read Documentation
                </button>
            </div>
        </div>

        <!-- 3D Scene Container -->
        <div class="flex-1 relative w-full h-[40vh] lg:h-full flex items-center justify-center mt-8 lg:mt-0" style="perspective: 1200px;">
            
            <!-- Animated Isometric Wrapper -->
            <div id="scene" class="relative w-[240px] h-[240px] sm:w-[320px] sm:h-[320px] preserve-3d" style="transform: rotateX(60deg) rotateZ(-45deg);">

                <!-- Layer 6: Bottom Glass Shadow/Outline -->
                <div class="scene-layer absolute inset-0 preserve-3d" data-z="-100">
                    <div class="absolute inset-0 rounded-[32px] bg-transparent" style="box-shadow: 0 0 40px rgba(0,0,0,0.8) inset; background: linear-gradient(transparent, transparent) padding-box, linear-gradient(135deg, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0.02) 100%) border-box; border: 1px solid transparent;">
                        <div class="absolute top-5 left-5 w-1.5 h-1.5 rounded-full bg-white/20"></div>
                        <div class="absolute top-5 right-5 w-1.5 h-1.5 rounded-full bg-white/20"></div>
                        <div class="absolute bottom-5 left-5 w-1.5 h-1.5 rounded-full bg-white/20"></div>
                        <div class="absolute bottom-5 right-5 w-1.5 h-1.5 rounded-full bg-white/20"></div>
                    </div>
                </div>

                <!-- Layer 5: Task Orchestration -->
                <div class="scene-layer absolute inset-0 preserve-3d" data-z="-30">
                    <div class="absolute inset-0 rounded-[32px] flex items-center justify-center overflow-hidden" style="background: linear-gradient(#121212, #121212) padding-box, linear-gradient(135deg, rgba(255,255,255,0.3) 0%, rgba(255,255,255,0.05) 100%) border-box; border: 1px solid transparent;">
                        <div class="absolute top-5 left-5 w-1 h-1 rounded-full bg-white/40 shadow-[0_0_8px_rgba(255,255,255,0.8)]"></div>
                        <div class="absolute top-5 right-5 w-1 h-1 rounded-full bg-white/40"></div>
                        <div class="absolute bottom-5 left-5 w-1 h-1 rounded-full bg-white/40"></div>
                        <div class="absolute bottom-5 right-5 w-1 h-1 rounded-full bg-white/40"></div>
                    </div>
                    <div class="absolute top-[32px] bottom-[32px] left-0 w-[20px] bg-[#080808] origin-left border-l border-white/5 flex items-end justify-center pb-8" style="transform: rotateY(-90deg);"></div>
                    <div class="absolute left-[32px] right-[32px] bottom-0 h-[20px] bg-[#080808] origin-bottom border-b border-white/5" style="transform: rotateX(-90deg);"></div>
                </div>

                <!-- Layer 4: Team Directory -->
                <div class="scene-layer absolute inset-0 preserve-3d" data-z="40">
                    <div class="absolute inset-0 rounded-[32px] flex items-center justify-center overflow-hidden" style="background: linear-gradient(#121212, #121212) padding-box, linear-gradient(135deg, rgba(255,255,255,0.3) 0%, rgba(255,255,255,0.05) 100%) border-box; border: 1px solid transparent;">
                        <div class="absolute top-5 left-5 w-1 h-1 rounded-full bg-white/40 shadow-[0_0_8px_rgba(255,255,255,0.8)]"></div>
                        <div class="absolute top-5 right-5 w-1 h-1 rounded-full bg-white/40"></div>
                        <div class="absolute bottom-5 left-5 w-1 h-1 rounded-full bg-white/40"></div>
                        <div class="absolute bottom-5 right-5 w-1 h-1 rounded-full bg-white/40"></div>
                    </div>
                    <div class="absolute top-[32px] bottom-[32px] left-0 w-[20px] bg-[#080808] origin-left border-l border-white/5 flex items-end justify-center pb-8" style="transform: rotateY(-90deg);"></div>
                    <div class="absolute left-[32px] right-[32px] bottom-0 h-[20px] bg-[#080808] origin-bottom border-b border-white/5" style="transform: rotateX(-90deg);"></div>
                </div>

                <!-- Layer 3: Video Conferences -->
                <div class="scene-layer absolute inset-0 preserve-3d" data-z="110">
                    <div class="absolute inset-0 rounded-[32px] flex items-center justify-center overflow-hidden" style="background: linear-gradient(#121212, #121212) padding-box, linear-gradient(135deg, rgba(255,255,255,0.3) 0%, rgba(255,255,255,0.05) 100%) border-box; border: 1px solid transparent;">
                        <div class="absolute top-5 left-5 w-1 h-1 rounded-full bg-white/40 shadow-[0_0_8px_rgba(255,255,255,0.8)]"></div>
                        <div class="absolute top-5 right-5 w-1 h-1 rounded-full bg-white/40"></div>
                        <div class="absolute bottom-5 left-5 w-1 h-1 rounded-full bg-white/40"></div>
                        <div class="absolute bottom-5 right-5 w-1 h-1 rounded-full bg-white/40"></div>
                    </div>
                    <div class="absolute top-[32px] bottom-[32px] left-0 w-[20px] bg-[#080808] origin-left border-l border-white/5 flex items-end justify-center pb-8" style="transform: rotateY(-90deg);"></div>
                    <div class="absolute left-[32px] right-[32px] bottom-0 h-[20px] bg-[#080808] origin-bottom border-b border-white/5" style="transform: rotateX(-90deg);"></div>
                </div>

                <!-- Layer 2: Main Logo Block -->
                <div class="scene-layer absolute inset-0 preserve-3d" data-z="180">
                    <div class="absolute inset-0 rounded-[32px] flex items-center justify-center overflow-hidden" style="box-shadow: inset 0 0 60px rgba(0,0,0,0.5); background: linear-gradient(#151515, #151515) padding-box, linear-gradient(135deg, rgba(255,255,255,0.5) 0%, rgba(255,255,255,0.1) 100%) border-box; border: 1px solid transparent;">
                        
                        <!-- Aura Asset Texture Overlay -->
                        <div class="absolute inset-0 opacity-[0.3]" style="background-image: url('https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/fa51902b-c2a4-4c33-a96e-a8f1ef67edc6_1600w.jpg'); background-size: cover; background-position: center; mix-blend-mode: lighten;"></div>
                        
                        <!-- Center Logo -->
                        <svg width="84" height="84" viewBox="0 0 100 100" fill="none" class="relative z-10" style="filter: drop-shadow(0 4px 12px rgba(255,255,255,0.1)); transform: translateZ(1px);">
                            <path d="M 65 30 C 65 15, 35 15, 35 30 C 35 45, 65 55, 65 70 C 65 85, 35 85, 35 70" stroke="white" stroke-width="12" stroke-linecap="round" stroke-linejoin="round"></path>
                            <path d="M 65 30 C 65 15, 35 15, 35 30 C 35 45, 65 55, 65 70 C 65 85, 35 85, 35 70" stroke="#151515" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" style="mix-blend-mode: overlay;"></path>
                        </svg>

                        <!-- Corner Dots -->
                        <div class="absolute top-5 left-5 w-1 h-1 rounded-full bg-white/50 shadow-[0_0_8px_rgba(255,255,255,0.8)]"></div>
                        <div class="absolute top-5 right-5 w-1 h-1 rounded-full bg-white/50"></div>
                        <div class="absolute bottom-5 left-5 w-1 h-1 rounded-full bg-white/50"></div>
                        <div class="absolute bottom-5 right-5 w-1 h-1 rounded-full bg-white/50"></div>
                    </div>
                    <div class="absolute top-[32px] bottom-[32px] left-0 w-[24px] bg-[#050505] origin-left border-l border-white/5 flex items-end justify-center pb-8" style="transform: rotateY(-90deg);"></div>
                    <div class="absolute left-[32px] right-[32px] bottom-0 h-[24px] bg-[#050505] origin-bottom border-b border-white/5" style="transform: rotateX(-90deg);"></div>
                </div>

                <!-- Layer 1: Top Glass Plate -->
                <div class="scene-layer absolute inset-0 preserve-3d pointer-events-none" data-z="260">
                    <div class="absolute inset-0 rounded-[32px] backdrop-blur-[2px]" style="background: linear-gradient(rgba(255,255,255,0.015), rgba(255,255,255,0.015)) padding-box, linear-gradient(135deg, rgba(255,255,255,0.6) 0%, rgba(255,255,255,0.1) 100%) border-box; border: 1px solid transparent;">
                        <div class="absolute top-5 left-5 w-1.5 h-1.5 rounded-full bg-white/60 shadow-[0_0_12px_rgba(255,255,255,0.9)]"></div>
                        <div class="absolute top-5 right-5 w-1.5 h-1.5 rounded-full bg-white/60"></div>
                        <div class="absolute bottom-5 left-5 w-1.5 h-1.5 rounded-full bg-white/60"></div>
                        <div class="absolute bottom-5 right-5 w-1.5 h-1.5 rounded-full bg-white/60"></div>
                    </div>
                </div>

            </div>
        </div>
    </main>

<script src="https://cdn.tailwindcss.com"></script>
<script src="https://code.iconify.design/iconify-icon/1.0.7/iconify-icon.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/ScrollTrigger.min.js"></script>
<script>
        // GSAP Masked Reveal Animations
        gsap.registerPlugin(ScrollTrigger);
        
        gsap.to('.reveal-word', {
            scrollTrigger: {
                trigger: '#hero-title',
                start: 'top 90%'
            },
            y: '0%',
            duration: 1.2,
            stagger: 0.1,
            ease: 'power4.out',
            delay: 0.1
        });

        gsap.to('.reveal-fade', {
            scrollTrigger: {
                trigger: '#hero-title',
                start: 'top 85%'
            },
            y: 0,
            opacity: 1,
            duration: 1,
            stagger: 0.15,
            ease: 'power3.out',
            delay: 0.4
        });

        // WebGL-like 3D Scene Animation Logic
        const scene = document.getElementById('scene');
        const layers = document.querySelectorAll('.scene-layer');
        
        let time = 0;
        let mouseX = 0;
        let mouseY = 0;
        let targetRotX = 60;
        let targetRotZ = -45;
        let currentRotX = 60;
        let currentRotZ = -45;

        // Interactive Parallax
        document.addEventListener('mousemove', (e) => {
            mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
            mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
            targetRotX = 60 - mouseY * 12;
            targetRotZ = -45 + mouseX * 12;
        });

        function renderLoop() {
            time += 0.015;

            // Smooth interpolation for mouse movement
            currentRotX += (targetRotX - currentRotX) * 0.08;
            currentRotZ += (targetRotZ - currentRotZ) * 0.08;

            // Apply base rotation + subtle ambient breathing
            const rx = currentRotX + Math.sin(time * 0.8) * 1.5;
            const rz = currentRotZ + Math.cos(time * 0.5) * 1.5;
            scene.style.transform = \`rotateX(\${rx}deg) rotateZ(\${rz}deg)\`;

            // Calculate organic spread factor (simulates z-depth breathing)
            const spread = 1 + Math.sin(time * 1.2) * 0.06;

            layers.forEach((layer, index) => {
                const baseZ = parseFloat(layer.getAttribute('data-z'));
                // Apply dynamic Z-translation with slight phase shift per layer
                const phaseZ = baseZ * spread + Math.sin(time * 2 + index) * 2;
                layer.style.transform = \`translateZ(\${phaseZ}px)\`;
            });

            requestAnimationFrame(renderLoop);
        }

        // Start the render loop
        renderLoop();
    </script>
</section>`;

  return <div dangerouslySetInnerHTML={{ __html: html }} />;
}
