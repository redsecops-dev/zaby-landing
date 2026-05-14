import React from "react";

export default function JoinTheMovement() {
  const html = `<section class="bg-[#09090b] text-white font-sans overflow-x-hidden antialiased min-h-screen flex flex-col selection:bg-white/20">
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&amp;display=swap" rel="stylesheet">

<div class="fixed inset-0 pointer-events-none z-0 overflow-hidden flex items-center justify-center">
        <!-- Abstract FBM-style noise overlay -->
        <div class="absolute inset-0 opacity-[0.03] mix-blend-screen" style="background-image: url('data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E');"></div>
        
        <!-- Diagonal Light Rays -->
        <div class="absolute top-[20%] left-[-10%] w-[80%] h-[20%] bg-gradient-to-r from-orange-500/10 via-orange-500/5 to-transparent blur-[80px] rotate-[25deg] origin-left"></div>
        <div class="absolute top-[30%] left-[-20%] w-[120%] h-[1px] bg-gradient-to-r from-transparent via-orange-400/40 to-transparent blur-[1px] rotate-[25deg]"></div>

        <div class="absolute bottom-[10%] right-[-10%] w-[80%] h-[20%] bg-gradient-to-l from-blue-600/10 via-blue-600/5 to-transparent blur-[80px] rotate-[25deg] origin-right"></div>
        <div class="absolute bottom-[20%] right-[-20%] w-[120%] h-[1px] bg-gradient-to-r from-transparent via-blue-500/40 to-transparent blur-[1px] rotate-[25deg]"></div>
    </div>

<main class="relative z-10 flex-1 w-full max-w-[1400px] mx-auto px-6 sm:px-12 lg:px-24 flex flex-col justify-center pt-24 pb-32">
        
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-8 items-center">
            
            <!-- Left Column: Clock Component -->
            <div class="flex justify-center lg:justify-start items-center relative perspective-[1000px]">
                
                <!-- Main Clock Container with Gradient Border Shell -->
                <div class="relative w-[340px] h-[340px] sm:w-[420px] sm:h-[420px] rounded-full shadow-[0_30px_60px_-15px_rgba(0,0,0,1)] bg-gradient-to-br from-[#2a2a30] to-[#0a0a0c] p-[3px] group">
                    <!-- Outer Edge Glow -->
                    <div class="absolute inset-0 rounded-full border border-white/5 shadow-[inset_0_2px_4px_rgba(255,255,255,0.05)]"></div>

                    <!-- Inner Bezel -->
                    <div class="relative w-full h-full rounded-full bg-gradient-to-br from-[#18181b] to-[#0d0d0f] p-[12px] shadow-[inset_0_10px_20px_rgba(0,0,0,0.8),0_0_20px_rgba(0,0,0,0.5)]">
                        
                        <!-- Clock Face / Grid Surface -->
                        <div class="relative w-full h-full rounded-full bg-[#0a0a0c] overflow-hidden shadow-[inset_0_0_30px_rgba(0,0,0,1)]">
                            
                            <!-- Dot Pattern Overlay -->
                            <div class="absolute inset-0 opacity-[0.15]" style="background-image: radial-gradient(circle, #ffffff 1px, transparent 1px); background-size: 10px 10px;"></div>

                            <!-- Central 'A' Logo -->
                            <div class="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
                                <span class="text-[140px] sm:text-[180px] font-extrabold tracking-tighter leading-none select-none text-[#121214]" style="text-shadow: -1px -1px 2px rgba(255,255,255,0.03), 2px 2px 4px rgba(0,0,0,0.8), 4px 4px 10px rgba(0,0,0,0.6);">
                                    A
                                </span>
                            </div>

                            <!-- Clock Numbers Container (Populated via JS) -->
                            <div id="clock-numbers" class="absolute inset-0 z-10 pointer-events-none"></div>

                            <!-- ROTATING HANDS AND TRAILS SYSTEM -->

                            <!-- Blue System (Fast, Small) -->
                            <div id="system-blue" class="absolute inset-0 w-full h-full">
                                <div class="absolute inset-0 mix-blend-screen opacity-90" style="background: conic-gradient(from 0deg, transparent 0deg, transparent 40deg, rgba(59, 130, 246, 0.15) 70deg, rgba(59, 130, 246, 0.8) 90deg, transparent 90deg); mask-image: radial-gradient(circle at center, transparent 66%, black 66.5%, black 68%, transparent 68.5%); -webkit-mask-image: radial-gradient(circle at center, transparent 66%, black 66.5%, black 68%, transparent 68.5%);"></div>
                                <div class="absolute top-1/2 left-1/2 w-[38%] h-[2px] bg-gradient-to-r from-blue-500/0 via-blue-400/80 to-blue-400 origin-left drop-shadow-[0_0_8px_rgba(59,130,246,0.6)]">
                                    <div class="absolute right-0 top-1/2 -translate-y-1/2 w-[8px] h-[3px] bg-white rounded-full shadow-[0_0_12px_4px_rgba(59,130,246,0.9)]"></div>
                                </div>
                            </div>

                            <!-- Orange System (Slow, Main) -->
                            <div id="system-orange" class="absolute inset-0 w-full h-full">
                                <div class="absolute inset-0 mix-blend-screen opacity-90" style="background: conic-gradient(from 0deg, transparent 0deg, transparent 30deg, rgba(249, 115, 22, 0.1) 60deg, rgba(249, 115, 22, 0.8) 90deg, transparent 90deg); mask-image: radial-gradient(circle at center, transparent 66%, black 66.5%, black 68%, transparent 68.5%); -webkit-mask-image: radial-gradient(circle at center, transparent 66%, black 66.5%, black 68%, transparent 68.5%);"></div>
                                <div class="absolute top-1/2 left-1/2 w-[42%] h-[2px] bg-gradient-to-r from-orange-500/0 via-orange-400/80 to-orange-400 origin-left drop-shadow-[0_0_8px_rgba(249,115,22,0.6)]">
                                    <div class="absolute right-0 top-1/2 -translate-y-1/2 w-[12px] h-[3px] bg-white rounded-full shadow-[0_0_15px_4px_rgba(249,115,22,0.9)]"></div>
                                </div>
                            </div>

                            <!-- Center Pivot -->
                            <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-[#1a1a1e] border-2 border-[#2a2a30] z-30 shadow-[0_0_15px_rgba(255,255,255,0.1),inset_0_2px_4px_rgba(0,0,0,0.8)] animate-[pulse_3s_cubic-bezier(0.4,0,0.6,1)_infinite]">
                                <div class="absolute inset-0 rounded-full bg-white/5"></div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>

            <!-- Right Column: Typography & Actions -->
            <div class="flex flex-col items-center lg:items-start text-center lg:text-left pt-8 lg:pt-0 pl-0 lg:pl-12">
                
                <h1 class="text-[56px] sm:text-[72px] lg:text-[84px] font-semibold tracking-tight leading-[1.05] text-white mb-6 gs-reveal" style="letter-spacing: -0.03em;">
                    Join the<br>Movement
                </h1>
                
                <p class="text-[17px] leading-relaxed text-white/60 mb-10 max-w-md gs-reveal" style="letter-spacing: -0.01em;">
                    Unlock the future of productivity with Axiom.<br>
                    Remember, this journey is just getting started.
                </p>

                <div class="flex flex-col sm:flex-row items-center gap-5 w-full sm:w-auto gs-reveal">
                    
                    <!-- SEE IN ACTION Button -->
                    <button class="relative group px-8 py-3.5 rounded-full bg-gradient-to-b from-white to-[#e2e2e5] text-black transition-transform duration-300 hover:scale-[1.02] active:scale-[0.98] w-full sm:w-auto">
                        <span class="relative z-10 text-[12px] font-semibold tracking-[0.05em] uppercase text-black/90">
                            See in action
                        </span>
                        <!-- Ambient Glow -->
                        <div class="absolute inset-0 rounded-full bg-orange-500/20 blur-xl group-hover:bg-orange-500/30 group-hover:blur-2xl transition-all duration-500 -z-10 translate-y-2 scale-90"></div>
                        <!-- Direct drop shadow -->
                        <div class="absolute inset-0 rounded-full shadow-[0_4px_20px_rgba(249,115,22,0.3)] group-hover:shadow-[0_8px_30px_rgba(249,115,22,0.4)] transition-shadow duration-300"></div>
                    </button>

                    <!-- JOIN OUR SLACK Button (Gradient Border Shell) -->
                    <button class="relative p-[1px] rounded-full bg-gradient-to-br from-white/20 via-white/5 to-transparent overflow-hidden transition-transform duration-300 hover:scale-[1.02] active:scale-[0.98] group w-full sm:w-auto">
                        <!-- Inner Content Container -->
                        <div class="relative px-7 py-3.5 rounded-full bg-[#0a0a0c]/90 backdrop-blur-2xl flex items-center justify-center gap-3 transition-colors duration-300 group-hover:bg-[#111114]/90">
                            <iconify-icon icon="logos:slack-icon" class="text-lg"></iconify-icon>
                            <span class="text-[12px] font-semibold tracking-[0.05em] uppercase text-white/90">
                                Join our Slack
                            </span>
                        </div>
                    </button>

                </div>
            </div>

        </div>
    </main>

<footer class="relative z-10 w-full px-6 sm:px-12 py-8 border-t border-white/5 bg-[#09090b]/50 backdrop-blur-md">
        <div class="max-w-[1400px] mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
            
            <!-- Copyright -->
            <div class="text-[13px] text-white/40 font-medium">
                Copyright © 2026 Axiom Labs. All rights reserved.
            </div>

            <!-- Links -->
            <div class="flex items-center gap-6 text-[13px] text-white/60 font-medium">
                <a href="#" class="hover:text-white transition-colors">Terms of Service</a>
                <a href="#" class="hover:text-white transition-colors">Privacy Policy</a>
            </div>

            <!-- Social Icons -->
            <div class="flex items-center gap-5 text-white/50">
                <a href="#" class="hover:text-white transition-colors"><iconify-icon icon="ri:twitter-x-fill" width="18"></iconify-icon></a>
                <a href="#" class="hover:text-white transition-colors"><iconify-icon icon="ri:linkedin-fill" width="18"></iconify-icon></a>
                <a href="#" class="hover:text-white transition-colors"><iconify-icon icon="ri:github-fill" width="18"></iconify-icon></a>
                <a href="#" class="hover:text-white transition-colors"><iconify-icon icon="ri:youtube-fill" width="18"></iconify-icon></a>
                <a href="#" class="hover:text-white transition-colors"><iconify-icon icon="logos:slack-icon" width="16" class="grayscale brightness-200 opacity-70 group-hover:grayscale-0"></iconify-icon></a>
                <a href="#" class="hover:text-white transition-colors"><iconify-icon icon="ri:telegram-fill" width="18"></iconify-icon></a>
            </div>

            <!-- Made with -->
            <div class="flex items-center gap-2 text-[13px] text-white/40 font-medium">
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" class="text-orange-500">
                    <path d="M2 4h2v2H2V4zm2-2h4v2H4V2zm4 0h4v2H8V2zm4 2h2v2h-2V4zm2 2h2v4h-2V6zm-2 4h2v2h-2v-2zm-2 2h2v2h-2v-2zm-2 2h2v2h-2v-2zm-2 2h2v2H8v-2zm-2-2h2v2H6v-2zm-2-2h2v2H4v-2zm-2-2h2v2H2v-2zM0 6h2v4H0V6z" fill="currentColor"></path>
                </svg>
                Made with passion and Huly
            </div>

        </div>
    </footer>

<script src="https://cdn.tailwindcss.com"></script>
<script src="https://code.iconify.design/iconify-icon/1.0.7/iconify-icon.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/ScrollTrigger.min.js"></script>
<script>
        document.addEventListener('DOMContentLoaded', () => {
            
            // 1. Clock Face Generation
            const clockNumbersContainer = document.getElementById('clock-numbers');
            const radius = 43; 
            
            for (let i = 1; i <= 12; i++) {
                const angle = (i * 30) - 90; 
                const rad = angle * (Math.PI / 180);
                const x = 50 + radius * Math.cos(rad);
                const y = 50 + radius * Math.sin(rad);

                const numEl = document.createElement('div');
                numEl.className = 'absolute text-[11px] font-medium tracking-wider transform -translate-x-1/2 -translate-y-1/2';
                numEl.style.left = \`\${x}%\`;
                numEl.style.top = \`\${y}%\`;
                numEl.textContent = i;
                
                if(i === 12 || i === 3 || i === 6 || i === 9) {
                    numEl.style.color = 'rgba(255,255,255,0.15)';
                } else {
                    numEl.style.color = 'rgba(255,255,255,0.05)';
                }

                clockNumbersContainer.appendChild(numEl);
            }

            // 2. Animation Logic (Clock Hands)
            const sysBlue = document.getElementById('system-blue');
            const sysOrange = document.getElementById('system-orange');
            
            let angleBlue = 45; 
            let angleOrange = 180;
            const speedBlue = 1.2;    
            const speedOrange = 0.3;  

            function animateClock() {
                angleBlue = (angleBlue + speedBlue) % 360;
                angleOrange = (angleOrange + speedOrange) % 360;

                sysBlue.style.transform = \`rotate(\${angleBlue}deg)\`;
                sysOrange.style.transform = \`rotate(\${angleOrange}deg)\`;

                requestAnimationFrame(animateClock);
            }
            requestAnimationFrame(animateClock);

            // 3. GSAP Scroll Reveals (Masked Words)
            gsap.registerPlugin(ScrollTrigger);
            const revealElements = document.querySelectorAll('.gs-reveal');
            
            revealElements.forEach((el) => {
                if (el.tagName === 'H1' || el.tagName === 'P') {
                    const text = el.innerHTML;
                    const words = text.replace(/<br\\s*[\\/]?>/gi, ' <br> ').split(/\\s+/);
                    el.innerHTML = '';
                    
                    words.forEach(word => {
                        if (word === '<br>') {
                            el.appendChild(document.createElement('br'));
                        } else if (word.trim() !== '') {
                            const wordWrapper = document.createElement('span');
                            wordWrapper.className = 'inline-block overflow-hidden pb-1 -mb-1 align-bottom'; 
                            
                            const innerSpan = document.createElement('span');
                            innerSpan.className = 'inline-block translate-y-[120%] opacity-0 will-change-transform';
                            innerSpan.innerHTML = word + '&nbsp;';
                            
                            wordWrapper.appendChild(innerSpan);
                            el.appendChild(wordWrapper);
                        }
                    });

                    gsap.to(el.querySelectorAll('span > span'), {
                        y: '0%',
                        opacity: 1,
                        duration: 1.2,
                        stagger: 0.04,
                        ease: 'power4.out',
                        scrollTrigger: {
                            trigger: el,
                            start: 'top 85%',
                            toggleActions: 'play none none none'
                        }
                    });
                } else {
                    gsap.fromTo(el, 
                        { y: 30, opacity: 0 },
                        { 
                            y: 0, 
                            opacity: 1, 
                            duration: 1, 
                            ease: 'power3.out',
                            delay: 0.5, 
                            scrollTrigger: {
                                trigger: el,
                                start: 'top 90%'
                            }
                        }
                    );
                }
            });
        });
    </script>
</section>`;

  return <div dangerouslySetInnerHTML={{ __html: html }} />;
}
