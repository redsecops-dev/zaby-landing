import React from "react";

export default function CompliancePlatform() {
  const html = `<section class="text-slate-900 min-h-screen flex items-center justify-center p-4 sm:p-8 lg:p-12 bg-white" style="font-family: 'Inter', sans-serif; -webkit-font-smoothing: antialiased;">
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&amp;display=swap" rel="stylesheet">

<main class="w-full max-w-[1200px] mx-auto bg-[#f8f9fa] rounded-[32px] p-8 sm:p-12 lg:p-16 flex flex-col gap-12 sm:gap-16">
        
        <!-- Header Section -->
        <header class="flex flex-col gap-6">
            <div class="text-xs font-normal text-slate-500 tracking-wide uppercase">[ System Overview ]</div>
            
            <div class="grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-8 lg:gap-16 items-start">
                <h1 class="text-4xl sm:text-5xl lg:text-6xl font-normal tracking-tight leading-[1.1] text-slate-900 reveal-text">
                    Continuous compliance, engineered for absolute transparency
                </h1>
                
                <div class="flex flex-col gap-6 pt-2 lg:pt-4">
                    <p class="text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
                        Our system runs security validations and logging transparently in the background, producing audit-ready records with complete traceability without slowing down your operations.
                    </p>
                    <a href="#" class="inline-flex items-center gap-2 text-sm font-normal text-slate-900 hover:text-slate-600 transition-all duration-[160ms] active:scale-[0.97] group w-fit" style="transition-timing-function: cubic-bezier(0.23, 1, 0.32, 1);">
                        View compliance standards 
                        <iconify-icon icon="solar:arrow-right-linear" class="transition-transform duration-[200ms] group-hover:translate-x-1" style="transition-timing-function: cubic-bezier(0.23, 1, 0.32, 1);"></iconify-icon>
                    </a>
                </div>
            </div>
        </header>

        <!-- Scrolling Brands Section -->
        <section class="w-full relative overflow-hidden rounded-[24px] p-[1px] bg-gradient-to-b from-slate-200/80 via-slate-100/50 to-slate-50/10 shadow-[0px_2px_4px_-1px_rgba(0,0,0,0.02)]">
            <div class="bg-white rounded-[23px] relative overflow-hidden py-6 sm:py-8 flex items-center">
                <!-- Fade overlays for premium masked edge effect -->
                <div class="absolute left-0 top-0 bottom-0 w-16 sm:w-32 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none"></div>
                <div class="absolute right-0 top-0 bottom-0 w-16 sm:w-32 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none"></div>

                <!-- Scrolling Track -->
                <div class="marquee-track flex items-center w-max">
                    <!-- Set 1 -->
                    <div class="flex items-center gap-10 sm:gap-20 pr-10 sm:pr-20 text-slate-400">
                        <div class="flex items-center gap-2 opacity-60 hover:opacity-100 transition-opacity duration-300">
                            <iconify-icon icon="solar:box-minimalistic-linear" width="28"></iconify-icon>
                            <span class="text-lg font-semibold tracking-tight text-slate-800">AcmeCorp</span>
                        </div>
                        <div class="flex items-center gap-2 opacity-60 hover:opacity-100 transition-opacity duration-300">
                            <iconify-icon icon="solar:leaf-linear" width="28"></iconify-icon>
                            <span class="text-lg font-semibold tracking-tight text-slate-800">Evergreen</span>
                        </div>
                        <div class="flex items-center gap-2 opacity-60 hover:opacity-100 transition-opacity duration-300">
                            <iconify-icon icon="solar:planet-linear" width="28"></iconify-icon>
                            <span class="text-lg font-semibold tracking-tight text-slate-800">Nexus</span>
                        </div>
                        <div class="flex items-center gap-2 opacity-60 hover:opacity-100 transition-opacity duration-300">
                            <iconify-icon icon="solar:ghost-linear" width="28"></iconify-icon>
                            <span class="text-lg font-semibold tracking-tight text-slate-800">Specter</span>
                        </div>
                        <div class="flex items-center gap-2 opacity-60 hover:opacity-100 transition-opacity duration-300">
                            <iconify-icon icon="solar:layers-minimalistic-linear" width="28"></iconify-icon>
                            <span class="text-lg font-semibold tracking-tight text-slate-800">StackFlow</span>
                        </div>
                        <div class="flex items-center gap-2 opacity-60 hover:opacity-100 transition-opacity duration-300">
                            <iconify-icon icon="solar:shield-keyhole-linear" width="28"></iconify-icon>
                            <span class="text-lg font-semibold tracking-tight text-slate-800">Aegis</span>
                        </div>
                    </div>
                    <!-- Set 2 (Duplicate for seamless loop) -->
                    <div class="flex items-center gap-10 sm:gap-20 pr-10 sm:pr-20 text-slate-400">
                        <div class="flex items-center gap-2 opacity-60 hover:opacity-100 transition-opacity duration-300">
                            <iconify-icon icon="solar:box-minimalistic-linear" width="28"></iconify-icon>
                            <span class="text-lg font-semibold tracking-tight text-slate-800">AcmeCorp</span>
                        </div>
                        <div class="flex items-center gap-2 opacity-60 hover:opacity-100 transition-opacity duration-300">
                            <iconify-icon icon="solar:leaf-linear" width="28"></iconify-icon>
                            <span class="text-lg font-semibold tracking-tight text-slate-800">Evergreen</span>
                        </div>
                        <div class="flex items-center gap-2 opacity-60 hover:opacity-100 transition-opacity duration-300">
                            <iconify-icon icon="solar:planet-linear" width="28"></iconify-icon>
                            <span class="text-lg font-semibold tracking-tight text-slate-800">Nexus</span>
                        </div>
                        <div class="flex items-center gap-2 opacity-60 hover:opacity-100 transition-opacity duration-300">
                            <iconify-icon icon="solar:ghost-linear" width="28"></iconify-icon>
                            <span class="text-lg font-semibold tracking-tight text-slate-800">Specter</span>
                        </div>
                        <div class="flex items-center gap-2 opacity-60 hover:opacity-100 transition-opacity duration-300">
                            <iconify-icon icon="solar:layers-minimalistic-linear" width="28"></iconify-icon>
                            <span class="text-lg font-semibold tracking-tight text-slate-800">StackFlow</span>
                        </div>
                        <div class="flex items-center gap-2 opacity-60 hover:opacity-100 transition-opacity duration-300">
                            <iconify-icon icon="solar:shield-keyhole-linear" width="28"></iconify-icon>
                            <span class="text-lg font-semibold tracking-tight text-slate-800">Aegis</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- Aura Image Background & Floating UI Card -->
        <section id="canvas-container" class="relative w-full aspect-[4/3] sm:aspect-[16/9] lg:aspect-[2.2/1] rounded-[24px] overflow-hidden isolate shadow-[inset_0_0_0_1px_rgba(0,0,0,0.04)] bg-[url(https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/1d3d40de-ce06-4312-8a1f-3cf92888acc1_3840w.jpg)] bg-cover bg-center">
            
            <!-- Dark blending overlay for contrast -->
            <div class="absolute inset-0 -z-10 bg-slate-900/20 mix-blend-overlay pointer-events-none"></div>

            <!-- Card Container with Enhanced Border Gradient & Beautiful Shadows -->
            <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] max-w-[520px] rounded-2xl p-[1px] bg-gradient-to-br from-white/95 via-white/50 to-slate-300/30 shadow-[0px_0px_0px_1px_rgba(0,0,0,0.06),0px_1px_1px_-0.5px_rgba(0,0,0,0.06),0px_3px_3px_-1.5px_rgba(0,0,0,0.06),_0px_6px_6px_-3px_rgba(0,0,0,0.06),0px_12px_12px_-6px_rgba(0,0,0,0.06),0px_24px_24px_-12px_rgba(0,0,0,0.06)] card-animate-up backdrop-blur-md">
                
                <div class="bg-white/95 rounded-[15px] flex flex-col overflow-hidden w-full h-full">
                    <!-- Card Header -->
                    <div class="px-5 py-4 border-b border-slate-100 flex justify-between items-center bg-[#fafafa]/50">
                        <div class="flex items-center gap-2.5">
                            <div class="w-6 h-6 rounded bg-indigo-100 flex items-center justify-center text-indigo-600">
                                <iconify-icon icon="solar:shield-check-linear" width="14"></iconify-icon>
                            </div>
                            <span class="text-sm font-normal text-slate-800 tracking-tight">Apex Security Inc.</span>
                        </div>
                        <button class="text-slate-400 hover:text-slate-600 transition-all duration-[160ms] active:scale-[0.97]" style="transition-timing-function: cubic-bezier(0.23, 1, 0.32, 1);">
                            <iconify-icon icon="solar:menu-dots-vertical-linear" width="18"></iconify-icon>
                        </button>
                    </div>

                    <!-- Card Subheader -->
                    <div class="px-5 py-3 border-b border-slate-100 bg-[#fafafa]/30 flex items-center gap-2">
                        <iconify-icon icon="solar:document-text-linear" class="text-blue-500" width="16"></iconify-icon>
                        <span class="text-xs font-normal text-slate-400 uppercase tracking-wider">Audit-712C</span>
                    </div>

                    <!-- Card Table Data -->
                    <div class="px-5 py-3 flex flex-col bg-white">
                        <!-- Table Headers -->
                        <div class="grid grid-cols-[1.8fr_1fr_1fr] gap-4 pb-3 border-b border-slate-100 mb-1">
                            <span class="text-xs text-slate-400 font-normal tracking-wide">Directives</span>
                            <span class="text-xs text-slate-400 font-normal tracking-wide">Evidence</span>
                            <span class="text-xs text-slate-400 font-normal tracking-wide">State</span>
                        </div>

                        <!-- Row 1 -->
                        <div class="grid grid-cols-[1.8fr_1fr_1fr] gap-4 py-2.5 items-center border-b border-slate-50 last:border-0">
                            <span class="text-xs sm:text-sm text-slate-700 font-normal tracking-tight">External Identity</span>
                            <div class="flex items-center gap-1.5">
                                <div class="w-5 h-5 p-[1px] rounded-[4px] bg-gradient-to-b from-slate-300/60 to-slate-100 flex items-center justify-center shadow-[0px_1px_2px_0px_rgba(0,0,0,0.02)]">
                                    <div class="w-full h-full bg-slate-50 rounded-[3px] flex items-center justify-center">
                                        <div class="w-2 h-2 bg-slate-300 rounded-[2px]"></div>
                                    </div>
                                </div>
                                <div class="h-5 p-[1px] rounded-[4px] bg-gradient-to-b from-slate-300/60 to-slate-100 flex items-center justify-center shadow-[0px_1px_2px_0px_rgba(0,0,0,0.02)]">
                                    <div class="w-full h-full px-[5px] bg-slate-50 rounded-[3px] flex items-center justify-center text-xs text-slate-500 font-normal">
                                        <iconify-icon icon="solar:folder-linear" class="mr-1 text-slate-400" width="12"></iconify-icon> 9
                                    </div>
                                </div>
                            </div>
                            <div>
                                <span class="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 text-xs font-normal tracking-tight">
                                    <iconify-icon icon="solar:check-circle-linear" class="text-emerald-500" width="14"></iconify-icon> Verified
                                </span>
                            </div>
                        </div>

                        <!-- Row 2 -->
                        <div class="grid grid-cols-[1.8fr_1fr_1fr] gap-4 py-2.5 items-center border-b border-slate-50 last:border-0">
                            <span class="text-xs sm:text-sm text-slate-700 font-normal tracking-tight">Agreement Validation</span>
                            <div class="flex items-center gap-1.5">
                                <div class="w-5 h-5 p-[1px] rounded-[4px] bg-gradient-to-b from-slate-300/60 to-slate-100 flex items-center justify-center shadow-[0px_1px_2px_0px_rgba(0,0,0,0.02)]">
                                    <div class="w-full h-full bg-slate-50 rounded-[3px] flex items-center justify-center">
                                        <div class="w-2 h-2 bg-slate-300 rounded-[2px]"></div>
                                    </div>
                                </div>
                                <div class="h-5 p-[1px] rounded-[4px] bg-gradient-to-b from-slate-300/60 to-slate-100 flex items-center justify-center shadow-[0px_1px_2px_0px_rgba(0,0,0,0.02)]">
                                    <div class="w-full h-full px-[5px] bg-slate-50 rounded-[3px] flex items-center justify-center text-xs text-slate-500 font-normal">
                                        <iconify-icon icon="solar:folder-linear" class="mr-1 text-slate-400" width="12"></iconify-icon> 14
                                    </div>
                                </div>
                            </div>
                            <div>
                                <span class="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 text-xs font-normal tracking-tight">
                                    <iconify-icon icon="solar:check-circle-linear" class="text-emerald-500" width="14"></iconify-icon> Verified
                                </span>
                            </div>
                        </div>

                        <!-- Row 3 -->
                        <div class="grid grid-cols-[1.8fr_1fr_1fr] gap-4 py-2.5 items-center border-b border-slate-50 last:border-0">
                            <span class="text-xs sm:text-sm text-slate-700 font-normal tracking-tight">Access Role Check</span>
                            <div class="flex items-center gap-1.5">
                                <div class="w-5 h-5 p-[1px] rounded-[4px] bg-gradient-to-b from-slate-300/60 to-slate-100 flex items-center justify-center shadow-[0px_1px_2px_0px_rgba(0,0,0,0.02)]">
                                    <div class="w-full h-full bg-slate-50 rounded-[3px] flex items-center justify-center">
                                        <div class="w-2 h-2 bg-slate-300 rounded-[2px]"></div>
                                    </div>
                                </div>
                                <div class="h-5 p-[1px] rounded-[4px] bg-gradient-to-b from-slate-300/60 to-slate-100 flex items-center justify-center shadow-[0px_1px_2px_0px_rgba(0,0,0,0.02)]">
                                    <div class="w-full h-full px-[5px] bg-slate-50 rounded-[3px] flex items-center justify-center text-xs text-slate-500 font-normal">
                                        <iconify-icon icon="solar:folder-linear" class="mr-1 text-slate-400" width="12"></iconify-icon> 7
                                    </div>
                                </div>
                            </div>
                            <div>
                                <span class="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 text-xs font-normal tracking-tight">
                                    <iconify-icon icon="solar:check-circle-linear" class="text-emerald-500" width="14"></iconify-icon> Verified
                                </span>
                            </div>
                        </div>

                        <!-- Row 4 -->
                        <div class="grid grid-cols-[1.8fr_1fr_1fr] gap-4 py-2.5 items-center border-b border-slate-50 last:border-0">
                            <span class="text-xs sm:text-sm text-slate-700 font-normal tracking-tight">Q2 Assessment</span>
                            <div class="flex items-center gap-1.5">
                                <div class="w-5 h-5 p-[1px] rounded-[4px] bg-gradient-to-b from-slate-300/60 to-slate-100 flex items-center justify-center shadow-[0px_1px_2px_0px_rgba(0,0,0,0.02)]">
                                    <div class="w-full h-full bg-slate-50 rounded-[3px] flex items-center justify-center">
                                        <div class="w-2 h-2 bg-slate-300 rounded-[2px]"></div>
                                    </div>
                                </div>
                                <div class="h-5 p-[1px] rounded-[4px] bg-gradient-to-b from-slate-300/60 to-slate-100 flex items-center justify-center shadow-[0px_1px_2px_0px_rgba(0,0,0,0.02)]">
                                    <div class="w-full h-full px-[5px] bg-slate-50 rounded-[3px] flex items-center justify-center text-xs text-slate-500 font-normal">
                                        <iconify-icon icon="solar:folder-linear" class="mr-1 text-slate-400" width="12"></iconify-icon> 21
                                    </div>
                                </div>
                            </div>
                            <div>
                                <span class="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-red-500 text-white text-xs font-normal tracking-tight shadow-sm">
                                    <iconify-icon icon="solar:danger-triangle-linear" class="text-white/90" width="12"></iconify-icon> Flagged
                                </span>
                            </div>
                        </div>

                        <!-- Row 5 -->
                        <div class="grid grid-cols-[1.8fr_1fr_1fr] gap-4 py-2.5 items-center border-b border-slate-50 last:border-0">
                            <span class="text-xs sm:text-sm text-slate-700 font-normal tracking-tight">Record Verification</span>
                            <div class="flex items-center gap-1.5">
                                <div class="w-5 h-5 p-[1px] rounded-[4px] bg-gradient-to-b from-slate-300/60 to-slate-100 flex items-center justify-center shadow-[0px_1px_2px_0px_rgba(0,0,0,0.02)]">
                                    <div class="w-full h-full bg-slate-50 rounded-[3px] flex items-center justify-center">
                                        <div class="w-2 h-2 bg-slate-300 rounded-[2px]"></div>
                                    </div>
                                </div>
                                <div class="h-5 p-[1px] rounded-[4px] bg-gradient-to-b from-slate-300/60 to-slate-100 flex items-center justify-center shadow-[0px_1px_2px_0px_rgba(0,0,0,0.02)]">
                                    <div class="w-full h-full px-[5px] bg-slate-50 rounded-[3px] flex items-center justify-center text-xs text-slate-500 font-normal">
                                        <iconify-icon icon="solar:folder-linear" class="mr-1 text-slate-400" width="12"></iconify-icon> 11
                                    </div>
                                </div>
                            </div>
                            <div>
                                <span class="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 text-xs font-normal tracking-tight">
                                    <iconify-icon icon="solar:check-circle-linear" class="text-emerald-500" width="14"></iconify-icon> Verified
                                </span>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </section>

        <!-- Bottom Features Grid -->
        <section class="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 lg:gap-16 pt-4 feature-stagger">
            <div class="flex flex-col gap-3">
                <h3 class="text-sm sm:text-base font-normal text-slate-900 tracking-tight">Verifiable Results</h3>
                <p class="text-xs sm:text-sm text-slate-500 leading-relaxed">
                    Every test, result, and conclusion is systematically recorded and backed by cryptographic evidence. Teams can explain outcomes with total confidence.
                </p>
            </div>
            
            <div class="flex flex-col gap-3">
                <h3 class="text-sm sm:text-base font-normal text-slate-900 tracking-tight">Reduce Manual Effort</h3>
                <p class="text-xs sm:text-sm text-slate-500 leading-relaxed">
                    With evidence linked automatically and working papers generated cleanly, engineering teams spend drastically less time responding to follow-ups.
                </p>
            </div>
            
            <div class="flex flex-col gap-3">
                <h3 class="text-sm sm:text-base font-normal text-slate-900 tracking-tight">Consistent Workflows</h3>
                <p class="text-xs sm:text-sm text-slate-500 leading-relaxed">
                    Uniform testing parameters and documentation templates ensure the exact same level of rigor across distributed teams and all reporting periods.
                </p>
            </div>
        </section>

    </main>

<script src="https://cdn.tailwindcss.com"></script>
<script src="https://code.iconify.design/iconify-icon/1.0.7/iconify-icon.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/ScrollTrigger.min.js"></script>
<script>
        document.addEventListener('DOMContentLoaded', () => {
            gsap.registerPlugin(ScrollTrigger);

            // Masked Word Reveal Animation (Custom Premium Implementation)
            const textElements = document.querySelectorAll('.reveal-text');
            
            textElements.forEach(textEl => {
                const text = textEl.textContent.trim();
                textEl.innerHTML = '';
                const words = text.split(/\\s+/);
                
                words.forEach(word => {
                    const wordWrapper = document.createElement('span');
                    wordWrapper.className = 'inline-flex overflow-hidden align-bottom mr-[0.25em] pb-1 -mb-1';
                    
                    const wordInner = document.createElement('span');
                    wordInner.className = 'reveal-word-inner inline-block translate-y-[120%] opacity-0';
                    wordInner.textContent = word;
                    
                    wordWrapper.appendChild(wordInner);
                    textEl.appendChild(wordWrapper);
                });

                // Polished staggering ease-out curve
                gsap.to(textEl.querySelectorAll('.reveal-word-inner'), {
                    y: "0%",
                    opacity: 1,
                    duration: 1.2,
                    ease: "power4.out",
                    stagger: 0.04,
                    scrollTrigger: {
                        trigger: textEl,
                        start: "top 90%",
                    }
                });
            });

            // Infinite Seamless Marquee Animation
            gsap.to('.marquee-track', {
                xPercent: -50,
                repeat: -1,
                duration: 25,
                ease: "none"
            });

            // Card entrance: Utilizing scale + opacity rather than pure translation for natural physics
            gsap.from('.card-animate-up', {
                y: 16,
                scale: 0.96,
                opacity: 0,
                duration: 1.2,
                ease: "power3.out",
                delay: 0.2,
                scrollTrigger: {
                    trigger: '#canvas-container',
                    start: "top 80%"
                }
            });

            // Features stagger: Accelerated delay to maintain snappy UI bounds (<80ms)
            gsap.from('.feature-stagger > div', {
                y: 12,
                opacity: 0,
                duration: 0.8,
                ease: "power3.out",
                stagger: 0.08,
                scrollTrigger: {
                    trigger: '.feature-stagger',
                    start: "top 85%"
                }
            });
        });
    </script>
</section>`;

  return <div dangerouslySetInnerHTML={{ __html: html }} />;
}
