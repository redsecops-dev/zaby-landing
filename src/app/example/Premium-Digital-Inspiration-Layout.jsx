import React from "react";

export default function PremiumDigitalInspirationLayout() {
  const html = `<section class="min-h-screen flex items-center justify-center p-4 md:p-8 lg:p-12 text-slate-900 overflow-x-hidden">


<main class="w-full max-w-[1280px] bg-white/40 backdrop-blur-3xl rounded-[2.5rem] border border-white/60 shadow-[0_8px_40px_rgb(0,0,0,0.04)] p-4 md:p-6 lg:p-8">
        
        <!-- Grid Layout -->
        <div class="grid grid-cols-12 gap-4 lg:gap-5">

            <!-- Card 1: UI Stack -->
            <div class="col-span-12 lg:col-span-3 lg:row-span-2 h-full rounded-2xl bg-gradient-to-br from-[#EAE2F8]/80 via-white/40 to-[#FADDF0]/60 p-[1px] group transition-all duration-300 hover:shadow-lg shadow-sm">
                <div class="bg-white rounded-[15px] overflow-hidden relative flex flex-col h-full w-full">
                    <div class="flex-1 bg-gradient-to-br from-[#EAE2F8] to-[#F3E8FF] p-6 relative overflow-hidden">
                        <!-- Nav fake -->
                        <div class="flex items-center justify-between mb-8 relative z-10">
                            <div class="flex items-center gap-2">
                                <div class="w-4 h-4 rounded-full bg-slate-900"></div>
                                <span class="text-xs font-medium tracking-tight">Aura UI</span>
                            </div>
                            <div class="flex gap-3 text-xs text-slate-500 font-medium">
                                <span>Overview</span>
                                <span>Plans</span>
                            </div>
                        </div>
                        <!-- Content -->
                        <div class="relative z-10 max-w-[85%]">
                            <h2 class="reveal-text text-2xl font-medium tracking-tight leading-tight mb-2">Optimize workflows with smart analytics.</h2>
                            <p class="reveal-text text-xs text-slate-500 mb-6 mt-2">Streamline operations and harness AI to drive better outcomes.</p>
                            <button class="bg-[#FD6703] text-white text-xs px-4 py-1.5 rounded-full font-medium hover:bg-[#E55D02] transition-colors">Get Started</button>
                        </div>
                        
                        <!-- Abstract UI elements -->
                        <div class="absolute -bottom-12 -right-12 w-48 h-48 rounded-full border-[16px] border-slate-900 opacity-90 group-hover:scale-105 transition-transform duration-500"></div>
                        <div class="absolute -top-12 -right-4 w-32 h-32 rounded-full border-[12px] border-slate-900 opacity-90 group-hover:scale-105 transition-transform duration-500 delay-75"></div>
                    </div>
                    
                    <!-- Bottom section of stacked card -->
                    <div class="h-32 relative border-t border-slate-100 p-6 flex flex-col justify-end overflow-hidden">
                        <img src="https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/e534354d-c5f2-4399-a1d9-2f50338e8c47_1600w.jpg" class="absolute inset-0 w-full h-full object-cover opacity-20 transition-transform duration-700 group-hover:scale-110" alt="Abstract gradient background">
                        <div class="absolute inset-0 bg-gradient-to-t from-white/90 to-transparent"></div>
                        <div class="absolute bottom-0 right-0 w-32 h-32 bg-[#FD6703] rounded-tl-full opacity-60 blur-2xl translate-x-1/2 translate-y-1/2"></div>
                        <span class="reveal-text text-lg font-medium tracking-tight relative z-10">Drive scale.</span>
                    </div>
                </div>
            </div>

            <!-- Card 2: Intro -->
            <div class="col-span-12 md:col-span-6 lg:col-span-3 h-full rounded-2xl bg-gradient-to-br from-[#E0F2FE]/80 via-slate-100/50 to-[#FCE7F3]/80 p-[1px] shadow-sm hover:shadow-md transition-shadow">
                <div class="bg-white rounded-[15px] overflow-hidden relative p-6 flex flex-col justify-between h-full min-h-[220px]">
                    <div class="absolute inset-0 bg-gradient-to-br from-[#E0F2FE] via-[#F3E8FF] to-[#FCE7F3] opacity-40"></div>
                    
                    <!-- Aura Headshot -->
                    <img src="https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/eca707cc-a5b7-439a-b4fd-247f6106c2e1_1600w.jpg" class="absolute -top-10 -right-10 w-40 h-40 rounded-full object-cover shadow-2xl border-[6px] border-white/40 opacity-90 transition-transform duration-500 hover:scale-105" alt="Profile headshot">
                    
                    <div class="flex justify-between items-start text-xs font-medium text-slate-500 relative z-10 mb-8">
                        <span>@jaydenross</span>
                        <div class="flex gap-3 pr-16">
                            <span>Bio</span>
                        </div>
                    </div>
                    <div class="relative z-10">
                        <p class="reveal-text text-lg font-normal tracking-tight leading-snug">I'm <span class="font-medium">Jayden Ross</span>,<br>a visual designer crafting<br>digital spaces in London.</p>
                    </div>
                    <div class="flex justify-between items-end text-xs text-slate-400 mt-6 relative z-10">
                        <span>Open to roles</span>
                        <div class="flex gap-2">
                            <span>Behance</span>
                            <span>IN</span>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Card 3: 3D Image feature -->
            <div class="col-span-12 md:col-span-6 lg:col-span-2 h-full rounded-2xl bg-gradient-to-tr from-slate-200/80 to-slate-100/40 p-[1px] group cursor-pointer shadow-sm hover:shadow-md transition-shadow">
                <div class="bg-[#F8F9FA] rounded-[15px] overflow-hidden relative h-full min-h-[220px] flex items-center justify-center">
                    <!-- Aura Architecture Image -->
                    <img src="https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/fb6415fd-bf4d-4ccf-8e9d-7ab445e99207_1600w.jpg" class="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" alt="Isometric 3D Tiny House">
                    <div class="absolute inset-0 bg-gradient-to-t from-slate-900/30 to-transparent transition-opacity duration-500 opacity-60 group-hover:opacity-40"></div>
                </div>
            </div>

            <!-- Card 4: Hero Gradient -->
            <div class="col-span-12 lg:col-span-4 lg:row-span-2 h-full rounded-2xl bg-gradient-to-br from-[#FEBED9]/70 via-slate-200/40 to-[#8B5CF6]/50 p-[1px] group shadow-sm hover:shadow-lg transition-shadow">
                <div class="bg-white rounded-[15px] overflow-hidden relative p-8 flex flex-col justify-between h-full min-h-[460px]">
                    <!-- Top Nav -->
                    <div class="flex justify-between items-center text-xs font-medium text-slate-500 relative z-20">
                        <div class="flex items-center gap-1 text-slate-900">
                            <div class="w-2.5 h-2.5 rounded-full bg-slate-900"></div>
                            <span>Library</span>
                        </div>
                        <div class="flex gap-4">
                            <span class="hidden sm:inline">Modules</span>
                            <span class="hidden sm:inline">Layouts</span>
                            <span class="text-slate-900">Premium</span>
                        </div>
                    </div>

                    <!-- Aura Abstract Background -->
                    <div class="absolute inset-0 z-0 overflow-hidden pointer-events-none">
                        <img src="https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/4734259a-bad7-422f-981e-ce01e79184f2_1600w.jpg" class="w-full h-full object-cover opacity-60 transition-transform duration-1000 group-hover:scale-105 mix-blend-multiply" alt="Abstract gradient hills background">
                        <div class="absolute inset-0 bg-gradient-to-b from-white/30 to-white/60 backdrop-blur-[2px]"></div>
                    </div>

                    <!-- Main Content -->
                    <div class="relative z-10 flex flex-col items-center text-center mt-12 mb-8">
                        <h1 class="reveal-text text-4xl sm:text-5xl font-medium tracking-tight leading-[1.1] text-slate-900 mb-4 max-w-[280px]">
                            Curated high-end assets
                        </h1>
                        <p class="reveal-text text-xs text-slate-600 mb-6 max-w-[200px] mt-2">Subscribe to get exclusive design materials weekly.</p>
                        
                        <div class="flex w-full max-w-[260px] bg-white/70 backdrop-blur-md rounded-full border border-slate-300/80 p-1 shadow-sm transition-all focus-within:border-slate-400 focus-within:shadow-md">
                            <input type="email" placeholder="Email address" class="flex-1 bg-transparent px-3 text-sm outline-none placeholder:text-slate-400 font-medium">
                            <button class="bg-slate-900 text-white text-xs px-4 py-2 rounded-full font-medium hover:bg-slate-800 transition-colors flex items-center gap-1">
                                Join <iconify-icon icon="solar:arrow-right-linear" width="14" height="14" style="stroke-width: 1.5;"></iconify-icon>
                            </button>
                        </div>
                    </div>

                    <!-- Bottom Footer -->
                    <div class="relative z-10 flex justify-between items-end text-[10px] text-slate-500 uppercase tracking-wider mt-auto pt-8 border-t border-slate-900/10">
                        <div>
                            <span class="block mb-1">Latest Drop</span>
                            <span class="text-slate-900 font-medium normal-case tracking-normal text-xs">Neon Abstracts</span>
                        </div>
                        <div class="text-right">
                            <span class="block mb-1">Date</span>
                            <span class="text-slate-900 font-medium normal-case tracking-normal text-xs">Nov 12, 2023</span>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Card 5: Core Text -->
            <div class="col-span-12 md:col-span-6 lg:col-span-3 h-full rounded-2xl bg-gradient-to-br from-slate-200/80 to-slate-100/30 p-[1px] shadow-sm hover:shadow-md transition-shadow">
                <div class="bg-white rounded-[15px] p-6 flex flex-col justify-between h-full">
                    <div class="flex justify-between items-start text-xs text-slate-400 mb-8">
                        <span>Discipline</span>
                        <span>01</span>
                    </div>
                    <div>
                        <h3 class="reveal-text text-xl font-medium tracking-tight mb-2">Architecture.</h3>
                        <p class="reveal-text text-sm text-slate-500 font-normal leading-relaxed mt-2">Robust component architectures, fluid interactions, and modern apps for top-tier startups.</p>
                    </div>
                </div>
            </div>

            <!-- Card 6: Typography -->
            <div class="col-span-12 md:col-span-6 lg:col-span-2 h-full rounded-2xl bg-gradient-to-br from-slate-200/80 to-slate-100/30 p-[1px] group shadow-sm hover:shadow-md transition-shadow">
                <div class="bg-white rounded-[15px] p-6 flex flex-col justify-center items-center relative overflow-hidden h-full">
                    <div class="absolute inset-0 bg-slate-50 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    <h3 class="reveal-text text-3xl font-medium tracking-tight text-slate-900 relative z-10 leading-none text-center">Satoshi</h3>
                    
                    <div class="w-full flex justify-between mt-8 text-[10px] text-slate-400 uppercase tracking-wider relative z-10 border-t border-slate-100 pt-3">
                        <div class="flex flex-col"><span>Weights</span><span class="text-slate-900 font-medium normal-case text-xs">7</span></div>
                        <div class="flex flex-col text-right"><span>Style</span><span class="text-slate-900 font-medium normal-case text-xs">Sans</span></div>
                    </div>
                </div>
            </div>

            <!-- Card 7: Palette -->
            <div class="col-span-12 md:col-span-6 lg:col-span-3 h-full rounded-2xl bg-gradient-to-br from-[#F5A345]/60 to-[#FEBED9]/60 p-[1px] shadow-sm hover:shadow-md transition-shadow">
                <div class="bg-white rounded-[15px] overflow-hidden flex flex-col h-40 w-full">
                    <div class="flex-1 bg-[#F3EDE1] p-4 flex items-start">
                        <span class="text-xs font-medium text-slate-900">#F3EDE1</span>
                    </div>
                    <div class="flex-1 bg-[#FD6703]"></div>
                    <div class="flex-1 bg-[#F5A345]"></div>
                    <div class="flex-1 bg-[#FEBED9]"></div>
                </div>
            </div>

            <!-- Card 8: Discover -->
            <div class="col-span-12 lg:col-span-5 h-full rounded-2xl bg-gradient-to-br from-slate-200/80 to-slate-100/30 p-[1px] shadow-sm hover:shadow-md transition-shadow">
                <div class="bg-white rounded-[15px] p-8 flex flex-col items-center justify-center text-center h-full w-full">
                    <div class="flex items-center gap-2 mb-6">
                        <iconify-icon icon="solar:layers-minimalistic-linear" width="20" height="20" class="text-slate-900" style="stroke-width: 1.5;"></iconify-icon>
                        <span class="text-xs font-medium tracking-tight">Showcase</span>
                    </div>
                    <h2 class="reveal-text text-2xl sm:text-3xl font-medium tracking-tight mb-3">Discover premium visual interfaces.</h2>
                    <p class="reveal-text text-sm text-slate-500 mb-6 mt-2">A collection of 500+ top-tier interactions and layouts.</p>
                    <button class="bg-slate-900 text-white text-xs px-5 py-2.5 rounded-full font-medium hover:bg-slate-800 transition-colors flex items-center gap-2 mt-2">
                        View gallery <iconify-icon icon="solar:arrow-right-up-linear" width="14" height="14" style="stroke-width: 1.5;"></iconify-icon>
                    </button>
                </div>
            </div>

            <!-- Card 9: Logo -->
            <div class="col-span-12 lg:col-span-4 h-full rounded-2xl bg-gradient-to-br from-slate-200/80 to-slate-100/30 p-[1px] group cursor-pointer shadow-sm hover:shadow-md transition-shadow">
                <div class="bg-white rounded-[15px] p-8 flex items-center justify-center h-full w-full">
                    <div class="flex items-center gap-3 transition-transform duration-300 group-hover:scale-105">
                        <iconify-icon icon="solar:box-minimalistic-linear" width="32" height="32" class="text-slate-900" style="stroke-width: 1.5;"></iconify-icon>
                        <span class="text-2xl font-medium tracking-tighter text-slate-900">NovaStudio</span>
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
        // Initialize GSAP ScrollTrigger
        gsap.registerPlugin(ScrollTrigger);

        // Robust function to split text nodes into individual wrapped spans for staggered animation
        function wrapWordsForGSAP(node) {
            // Process text nodes
            if (node.nodeType === Node.TEXT_NODE) {
                const text = node.nodeValue;
                if (!text.trim()) return; // skip pure whitespace nodes

                // Split by whitespace but keep the whitespace segments to preserve spacing
                const words = text.split(/(\\s+)/);
                const fragment = document.createDocumentFragment();

                words.forEach(word => {
                    if (word.trim() === '') {
                        fragment.appendChild(document.createTextNode(word));
                    } else {
                        // Outer mask
                        const wrapper = document.createElement('span');
                        wrapper.style.display = 'inline-block';
                        wrapper.style.overflow = 'hidden';
                        wrapper.style.verticalAlign = 'bottom';
                        wrapper.style.lineHeight = '1.1';

                        // Inner moving element
                        const inner = document.createElement('span');
                        inner.style.display = 'inline-block';
                        inner.style.transform = 'translateY(110%)'; // Start fully hidden below
                        inner.className = 'gsap-word';
                        inner.textContent = word;

                        wrapper.appendChild(inner);
                        fragment.appendChild(wrapper);
                    }
                });

                node.parentNode.replaceChild(fragment, node);
            } 
            // Recursively process child elements (excluding BR tags and already-processed nodes)
            else if (node.nodeType === Node.ELEMENT_NODE && node.tagName !== 'BR' && !node.classList.contains('gsap-word')) {
                // Convert childNodes to array before iterating since we modify the DOM
                Array.from(node.childNodes).forEach(wrapWordsForGSAP);
            }
        }

        // Apply text splitting and GSAP animation to all elements with .reveal-text
        document.querySelectorAll('.reveal-text').forEach(el => {
            // Apply text splitting
            Array.from(el.childNodes).forEach(wrapWordsForGSAP);
            
            // Set up ScrollTrigger animation for the generated .gsap-word elements
            gsap.to(el.querySelectorAll('.gsap-word'), {
                y: '0%',
                duration: 0.8,
                ease: 'power4.out',
                stagger: 0.04,
                scrollTrigger: {
                    trigger: el,
                    start: 'top 95%', // Trigger slightly earlier for a smoother feel
                    toggleActions: 'play none none reverse'
                }
            });
        });
    </script>
</section>`;

  return <div dangerouslySetInnerHTML={{ __html: html }} />;
}
