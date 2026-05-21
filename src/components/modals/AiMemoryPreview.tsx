/*
  Conversational AI Preview Component
  Supports multiple conversational channels: WhatsApp, Microsoft Teams, SMS, Calls.
  Section 1: Content – showcases capabilities with vibrant design.
*/

"use client";

import React from "react";

export function AiMemoryPreview() {
  const html = `
  <section class="bg-white text-neutral-600 font-sans antialiased selection:bg-lime-500/30 selection:text-lime-200">
    <div class="pointer-events-none absolute inset-0 overflow-hidden">
        <img src="https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/fa51902b-c2a4-4c33-a96e-a8f1ef67edc6_1600w.jpg" alt="Abstract Neon Light Wave" class="absolute inset-0 w-full h-full object-cover opacity-[0.04]">
        <div class="absolute inset-0 flex items-center justify-center">
            <div class="h-[800px] w-[800px] rounded-full bg-lime-500/10 blur-[120px]" style="transform: translate3d(0,0,0);"></div>
        </div>
    </div>

    <section class="relative min-h-screen flex items-center py-24 sm:py-32 overflow-hidden">
        <div class="absolute inset-x-4 sm:inset-x-8 md:inset-x-12 max-w-6xl mx-auto inset-y-0 pointer-events-none">
            <div class="absolute left-0 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-black/10 to-transparent"></div>
            <div class="absolute right-0 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-black/10 to-transparent"></div>
            <div class="absolute -left-[3px] top-24 h-1.5 w-1.5 border border-black/15 bg-white"></div>
            <div class="absolute -right-[3px] top-24 h-1.5 w-1.5 border border-black/15 bg-white"></div>
            <div class="absolute -left-[3px] bottom-24 h-1.5 w-1.5 border border-black/15 bg-white"></div>
            <div class="absolute -right-[3px] bottom-24 h-1.5 w-1.5 border border-black/15 bg-white"></div>
        </div>

        <div class="relative w-full max-w-5xl mx-auto px-6 lg:px-8 z-10">
            <div class="text-center flex flex-col items-center">
                <div class="inline-flex items-center gap-1.5 rounded-full bg-lime-500/10 px-3 py-1 text-xs text-lime-600 ring-1 ring-inset ring-lime-500/25 uppercase tracking-tight font-medium mb-6 backdrop-blur-sm">
                    <iconify-icon icon="solar:link-minimalistic-linear" class="text-sm"></iconify-icon>
                    Conversational AI Hub
                </div>
                <h2 class="gsap-reveal text-4xl sm:text-5xl md:text-6xl font-normal text-neutral-900 tracking-tight leading-[1.1] max-w-3xl">
                    Unified Messaging Across WhatsApp, Teams, SMS & Calls
                </h2>
                <p class="gsap-reveal mt-6 max-w-2xl text-sm sm:text-base text-neutral-500 leading-relaxed">
                    Bridge your favorite chat platforms into a single, intelligent workflow. Deliver real‑time, context‑aware conversations everywhere your users are.
                </p>
            </div>

            <!-- Feature Icons Row -->
            <div class="mt-12 flex flex-wrap justify-center gap-8 text-4xl text-lime-400">
                <div class="flex flex-col items-center">
                    <iconify-icon icon="logos:whatsapp" class="text-5xl"></iconify-icon>
                    <span class="mt-2 text-sm text-neutral-600">WhatsApp</span>
                </div>
                <div class="flex flex-col items-center">
                    <iconify-icon icon="logos:microsoft-teams" class="text-5xl"></iconify-icon>
                    <span class="mt-2 text-sm text-neutral-600">Teams</span>
                </div>
                <div class="flex flex-col items-center">
                    <iconify-icon icon="fluent-emoji:mobile-phone" class="text-5xl"></iconify-icon>
                    <span class="mt-2 text-sm text-neutral-600">SMS</span>
                </div>
                <div class="flex flex-col items-center">
                    <iconify-icon icon="mdi:phone" class="text-5xl"></iconify-icon>
                    <span class="mt-2 text-sm text-neutral-600">Calls</span>
                </div>
            </div>
        </div>
    </section>

    <script src="https://cdn.tailwindcss.com"></script>
    <script src="https://code.iconify.design/iconify-icon/1.0.7/iconify-icon.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/ScrollTrigger.min.js"></script>
    <script>
        document.addEventListener("DOMContentLoaded", () => {
            gsap.registerPlugin(ScrollTrigger);
            const splitTextToSpans = selector => {
                document.querySelectorAll(selector).forEach(el => {
                    const text = el.innerText;
                    const words = text.split(' ');
                    el.innerHTML = '';
                    words.forEach(word => {
                        const wrapper = document.createElement('span');
                        wrapper.className = 'inline-flex overflow-hidden relative mr-[0.25em] align-top';
                        const inner = document.createElement('span');
                        inner.className = 'translate-y-[110%] inline-block pb-1';
                        inner.innerText = word;
                        wrapper.appendChild(inner);
                        el.appendChild(wrapper);
                    });
                });
            };
            splitTextToSpans('.gsap-reveal');
            document.querySelectorAll('.gsap-reveal').forEach(container => {
                const words = container.querySelectorAll('span > span');
                gsap.to(words, {
                    y: '0%',
                    duration: 1,
                    stagger: 0.05,
                    ease: "power4.out",
                    scrollTrigger: {
                        trigger: container,
                        start: "top 85%",
                        toggleActions: "play none none reverse"
                    }
                });
            });
        });
    </script>
  </section>
  `;
  return <div dangerouslySetInnerHTML={{ __html: html }} />;
}
