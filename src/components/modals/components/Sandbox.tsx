import React from "react";

export default function Sandbox() {
  const html = `<section class="bg-[#02040A] text-slate-300 font-['Inter'] antialiased min-h-screen relative overflow-x-hidden flex items-center justify-center p-4 md:p-12 selection:bg-blue-500/30 selection:text-white" style="background-image: repeating-linear-gradient(-45deg, rgba(255,255,255,0.015) 0px, rgba(255,255,255,0.015) 1px, transparent 1px, transparent 8px);">
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500&amp;display=swap" rel="stylesheet">
<link id="all-fonts-link-font-geist" rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Geist:wght@300;400;500;600;700&amp;display=swap">
<style id="all-fonts-style-font-geist">.font-geist { font-family: 'Geist', sans-serif !important; }</style>

<div class="fixed inset-0 pointer-events-none z-0 overflow-hidden flex items-center justify-center">
        <div class="absolute w-[80vw] h-[80vw] md:w-[50vw] md:h-[50vw] bg-indigo-900/20 rounded-full blur-[100px] md:blur-[140px] top-[-10%] left-[-10%] mix-blend-screen opacity-60"></div>
        <div class="absolute w-[60vw] h-[60vw] md:w-[40vw] md:h-[40vw] bg-blue-800/10 rounded-full blur-[80px] md:blur-[120px] bottom-[-10%] right-[-10%] mix-blend-screen opacity-50"></div>
        <!-- Ambient Grid Texture -->
        <div class="absolute inset-0 opacity-[0.03]" style="background-image: linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px); background-size: 32px 32px;"></div>
    </div>

<div class="fixed inset-0 pointer-events-none z-0">
        <!-- Vertical Rails -->
        <div class="absolute left-4 md:left-12 top-0 bottom-0 w-px bg-white/[0.04]"></div>
        <div class="absolute right-4 md:right-12 top-0 bottom-0 w-px bg-white/[0.04]"></div>
        <div class="absolute left-1/2 top-0 bottom-0 w-px bg-white/[0.02] -translate-x-1/2"></div>
        <!-- Horizontal Rails -->
        <div class="absolute top-4 md:top-12 left-0 right-0 h-px bg-white/[0.04]"></div>
        <div class="absolute bottom-4 md:bottom-12 left-0 right-0 h-px bg-white/[0.04]"></div>
        
        <!-- Corner Mini Squares -->
        <div class="absolute left-[14px] md:left-[46px] top-[14px] md:top-[46px] w-1.5 h-1.5 border border-white/20 bg-[#02040A]"></div>
        <div class="absolute right-[14px] md:right-[46px] top-[14px] md:top-[46px] w-1.5 h-1.5 border border-white/20 bg-[#02040A]"></div>
        <div class="absolute left-[14px] md:left-[46px] bottom-[14px] md:bottom-[46px] w-1.5 h-1.5 border border-white/20 bg-[#02040A]"></div>
        <div class="absolute right-[14px] md:right-[46px] bottom-[14px] md:bottom-[46px] w-1.5 h-1.5 border border-white/20 bg-[#02040A]"></div>
    </div>

<main class="relative z-10 w-full max-w-5xl aspect-auto mt-8 md:mt-0">
        
        <!-- Outer Gradient Shell -->
        <div class="relative p-[1px] rounded-2xl md:rounded-[24px] bg-gradient-to-b from-blue-400/20 via-white/5 to-transparent overflow-visible group">
            
            <!-- L-Brackets for framing -->
            <div class="absolute -top-2 -left-2 w-4 h-4 border-t border-l border-white/20 rounded-tl-md"></div>
            <div class="absolute -top-2 -right-2 w-4 h-4 border-t border-r border-white/20 rounded-tr-md"></div>
            <div class="absolute -bottom-2 -left-2 w-4 h-4 border-b border-l border-white/20 rounded-bl-md"></div>
            <div class="absolute -bottom-2 -right-2 w-4 h-4 border-b border-r border-white/20 rounded-br-md"></div>

            <!-- Inner Surface -->
            <div class="relative bg-[#060B14]/80 backdrop-blur-2xl rounded-2xl md:rounded-[23px] overflow-hidden flex flex-col border border-white/[0.02]">
                
                <!-- Ambient Top Glow -->
                <div class="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-blue-500/10 to-transparent pointer-events-none"></div>

                <!-- Header / Telemetry Bar -->
                <header class="flex items-center justify-between px-6 py-4 border-b border-white/[0.05] relative z-20">
                    <div class="flex items-center gap-4">
                        <div class="flex items-center gap-2 px-2.5 py-1 rounded-full border border-white/10 bg-white/5 backdrop-blur-md">
                            <div class="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></div>
                            <span class="text-xs text-white/80 tracking-tight font-geist font-light">NODE ONLINE</span>
                        </div>
                        <span class="text-xs text-slate-500 hidden sm:inline-block tracking-tight font-geist font-light">61.042° N, 24.195° E</span>
                    </div>
                    
                    <div class="flex items-center gap-3">
                        <span class="text-xs text-slate-500 tracking-tight font-geist font-light">SYS.VER_2.4.1</span>
                        <div class="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center bg-white/[0.02] hover:bg-white/[0.08] transition-colors cursor-pointer">
                            <iconify-icon icon="solar:menu-dots-circle-linear" class="text-slate-400" width="16"></iconify-icon>
                        </div>
                    </div>
                </header>

                <!-- Hero Imagery (Aura Assets) -->
                <figure class="relative w-full aspect-video md:aspect-[21/9] border-b border-white/[0.05] overflow-hidden bg-slate-900 group-hover:border-white/[0.08] transition-colors duration-500">
                    <!-- Scanline Overlay -->
                    <div class="absolute inset-0 pointer-events-none z-10 opacity-20" style="background: linear-gradient(to bottom, transparent 50%, rgba(0,0,0,0.5) 51%); background-size: 100% 4px;"></div>
                    
                    <img src="https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/704c40aa-c183-4d78-b58e-ed478aca262c_3840w.webp" alt="Project Fjord Minimalist Glass Office" class="w-full h-full object-cover object-center opacity-80 mix-blend-luminosity hover:mix-blend-normal transition-all duration-1000 scale-105 hover:scale-100">
                    
                    <!-- Inner Image Vignette/Gradients -->
                    <div class="absolute inset-0 bg-gradient-to-t from-[#060B14] via-[#060B14]/20 to-transparent pointer-events-none z-10"></div>
                    <div class="absolute inset-0 shadow-[inset_0_0_100px_rgba(0,0,0,0.8)] pointer-events-none z-10"></div>

                    <!-- Floating Image Label -->
                    <div class="absolute bottom-6 left-6 z-20 flex items-center gap-2">
                        <iconify-icon icon="solar:camera-minimalistic-linear" class="text-slate-400" width="14"></iconify-icon>
                        <span class="text-xs text-slate-400 tracking-tight font-geist font-light">SECTOR 04 / GLACIAL OBSERVATORY</span>
                    </div>
                </figure>

                <!-- Content Layout -->
                <div class="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12 p-6 md:p-10 lg:p-12 relative z-20">
                    
                    <!-- Left: Metadata / Specs -->
                    <aside class="col-span-1 md:col-span-4 flex flex-col gap-6 md:border-r border-white/[0.05] md:pr-8">
                        <div>
                            <p class="text-xs text-slate-500 uppercase tracking-widest mb-1 border-l-2 border-indigo-500/50 pl-2 font-geist font-light">Designation</p>
                            <p class="text-sm text-slate-200 tracking-tight font-geist font-light">Atmospheric Data Center</p>
                        </div>
                        <div>
                            <p class="text-xs text-slate-500 uppercase tracking-widest mb-1 border-l-2 border-white/10 pl-2 font-geist font-light">Thermal Output</p>
                            <p class="text-sm text-slate-200 tracking-tight font-geist font-light">Zero-Emission Loop</p>
                        </div>
                        <div>
                            <p class="text-xs text-slate-500 uppercase tracking-widest mb-1 border-l-2 border-white/10 pl-2 font-geist font-light">Current Phase</p>
                            <p class="text-sm text-slate-200 tracking-tight font-geist font-light">Deployment &amp; Calibration</p>
                        </div>
                    </aside>

                    <!-- Right: Main Typography & Actions -->
                    <article class="col-span-1 md:col-span-8 flex flex-col justify-center">
                        <div class="mb-4">
                            <!-- Eyebrow -->
                            <span class="inline-block text-xs text-indigo-400 tracking-widest uppercase mb-3 font-geist font-light">Initiative 01</span>
                            
                            <!-- Masked GSAP Reveal Title -->
                            <h1 class="text-4xl md:text-5xl lg:text-6xl text-white leading-[1.1] reveal-title font-geist font-light tracking-tighter">
                                Project Fjord
                            </h1>
                        </div>

                        <p class="text-sm md:text-base text-slate-400 leading-relaxed max-w-xl mb-8 font-geist font-light">
                            Architectural synthesis designed for extreme environments. Integrating autonomous edge-networks directly within glacial topography to provide zero-latency global node access while maintaining complete ecosystem equilibrium.
                        </p>

                        <!-- CTA Row -->
                        <div class="flex flex-wrap items-center gap-4 mt-auto">
                            <button class="bg-white text-[#02040A] hover:bg-slate-200 transition-colors px-6 py-2.5 rounded-full text-xs tracking-tight flex items-center gap-2 font-geist font-light">
                                Initialize Sequence
                                <iconify-icon icon="solar:arrow-right-linear" width="14"></iconify-icon>
                            </button>
                            <button class="bg-white/[0.03] border border-white/10 text-white hover:bg-white/[0.08] transition-colors px-6 py-2.5 rounded-full text-xs tracking-tight flex items-center gap-2 backdrop-blur-md font-geist font-light">
                                <iconify-icon icon="solar:documents-linear" width="14"></iconify-icon>
                                View Schematics
                            </button>
                        </div>
                    </article>

                </div>
            </div>
        </div>
    </main>

<script src="https://cdn.tailwindcss.com"></script>
<script src="https://code.iconify.design/iconify-icon/1.0.7/iconify-icon.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/ScrollTrigger.min.js"></script>
<script>
        document.addEventListener("DOMContentLoaded", (event) => {
            gsap.registerPlugin(ScrollTrigger);

            // Select the target heading
            const titleElement = document.querySelector('.reveal-title');
            
            if(titleElement) {
                // Split text into words manually
                const text = titleElement.innerText;
                titleElement.innerHTML = '';
                
                const words = text.split(' ');
                
                words.forEach((word, index) => {
                    // Create an overflow-hidden wrapper
                    const wrapper = document.createElement('span');
                    wrapper.style.display = 'inline-block';
                    wrapper.style.overflow = 'hidden';
                    wrapper.style.verticalAlign = 'top';
                    wrapper.style.paddingRight = '0.25em'; // Space between words
                    
                    // Create the inner word container to animate
                    const inner = document.createElement('span');
                    inner.className = 'gsap-word';
                    inner.style.display = 'inline-block';
                    inner.style.transform = 'translateY(110%)'; // Start fully pushed down
                    inner.innerText = word;
                    
                    wrapper.appendChild(inner);
                    titleElement.appendChild(wrapper);
                });

                // Trigger animation
                gsap.to('.gsap-word', {
                    y: "0%",
                    duration: 1.2,
                    stagger: 0.1,
                    ease: 'power4.out',
                    scrollTrigger: {
                        trigger: titleElement,
                        start: 'top 90%',
                    }
                });
            }
        });
    </script>
</section>`;

  return <div dangerouslySetInnerHTML={{ __html: html }} />;
}
