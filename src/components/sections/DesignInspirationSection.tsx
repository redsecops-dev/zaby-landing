"use client";

import { useEffect, useRef } from "react";
import { Icon } from "@iconify/react";

// Testimonial Card
function TestimonialCard({ avatar, name, title, quote, gradientFrom, gradientTo }: {
  avatar: string;
  name: string;
  title: string;
  quote: string;
  gradientFrom: string;
  gradientTo: string;
}) {
  return (
    <div className="relative rounded-3xl bg-linear-to-br from-slate-200/80 via-slate-100 to-transparent p-px group transition-transform duration-300 hover:-translate-y-1">
      <div
        className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-50 transition-opacity duration-500 blur-xl"
        style={{
          backgroundImage: `linear-gradient(to bottom right, ${gradientFrom}, ${gradientTo})`
        }}
      ></div>
      <div className="relative h-full bg-white/70 backdrop-blur-xl rounded-[23px] p-8 flex flex-col">
        <Icon icon="solar:quote-left-linear" width={24} className="text-slate-300 mb-6" />
        <p className="text-sm font-normal leading-relaxed text-slate-600 grow mb-8">{quote}</p>
        <div className="flex items-center gap-4">
          <img
            src={avatar}
            alt={name}
            className="w-10 h-10 rounded-full object-cover grayscale opacity-90"
          />
          <div>
            <h4 className="text-xs font-medium text-(--foreground)">{name}</h4>
            <span className="text-[10px] text-slate-500">{title}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

// Testimonials Section
function TestimonialSection() {
  const testimonials = [
    {
      avatar: "https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/2f563338-39fa-47ea-9761-658d4f3f84db_800w.jpg",
      name: "Marcus Chen",
      title: "Head of Operations, Novus",
      quote: '"Deploying Agent Squad transformed how our operations team works. Agents now handle monitoring, triage, and escalation autonomously — we\'ve reduced manual overhead by 60% in three months."',
      gradientFrom: "var(--color-accent-soft)",
      gradientTo: "#FCE7F3"
    },
    {
      avatar: "https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/4f5668c5-fc4a-44e0-bc5e-a664189d3c31_800w.jpg",
      name: "Elena Rostova",
      title: "VP Engineering, Meridian",
      quote: '"Zaby\'s Agentic Workflows replaced an entire layer of manual process coordination. The reasoning-based orchestration handles edge cases we never could have anticipated with static automation."',
      gradientFrom: "#E0F2FE",
      gradientTo: "var(--color-accent-soft)"
    },
    {
      avatar: "https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/eca707cc-a5b7-439a-b4fd-247f6106c2e1_800w.jpg",
      name: "David Lin",
      title: "Founder, Stack AI",
      quote: '"We built our entire support and hiring operations on Zaby. What used to require a team of coordinators now runs on Open Agents — it scaled with us from 10 to 500 customers without friction."',
      gradientFrom: "#FADDF0",
      gradientTo: "var(--color-accent-soft)"
    }
  ];

  return (
    <section className="w-full max-w-7xl px-4 md:px-8 lg:px-12 pt-8 md:pt-12 pb-24 md:pb-32 mx-auto">
      <div className="flex flex-col items-center text-center mb-16">
        <h2 className="design-reveal text-3xl md:text-4xl font-medium tracking-tight text-(--foreground)">
          Trusted by leading teams.
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {testimonials.map((testimonial, idx) => (
          <TestimonialCard key={idx} {...testimonial} />
        ))}
      </div>
    </section>
  );
}

// Footer Badge
function BadgeItem({ icon, label }: { icon: string; label: string }) {
  return (
    <div className="w-14 h-16 border border-slate-700/60 rounded-b-xl rounded-t-md flex flex-col items-center justify-center bg-linear-to-b from-slate-800/20 to-slate-900/40">
      <Icon icon={icon} width={20} className="text-slate-400" />
      <span className="text-[7px] font-medium text-slate-500 mt-1 uppercase text-center leading-tight">
        {label}
      </span>
    </div>
  );
}



// Animation Manager with scoped context
function AnimationsManager({ scopeRef }: { scopeRef: React.RefObject<HTMLElement | null> }) {
  useEffect(() => {
    const initAnimations = async () => {
      const section = scopeRef.current;
      if (!section) return;

      try {
        const [{ gsap }, { ScrollTrigger }] = await Promise.all([
          import("gsap"),
          import("gsap/ScrollTrigger"),
        ]);

        gsap.registerPlugin(ScrollTrigger);

        const context = gsap.context(() => {
          // Find all design-reveal elements within this section
          const gsapReveals = section.querySelectorAll(".design-reveal");

          if (gsapReveals.length === 0) return;

          gsapReveals.forEach((el) => {
            const text = el.innerText;
            const words = text.split(" ");
            el.innerHTML = "";

            words.forEach((word, index) => {
              const wrapper = document.createElement("span");
              wrapper.style.overflow = "hidden";
              wrapper.style.display = "inline-block";
              wrapper.style.paddingBottom = "0.2em";

              const inner = document.createElement("span");
              inner.className = "word-inner-design";
              inner.style.display = "inline-block";
              inner.style.transform = "translateY(100%)";

              // Handle special coloring for specific words
              if (word === "Powerful") {
                inner.style.color = "var(--color-accent)";
              }

              inner.innerHTML = word + (index < words.length - 1 ? "&nbsp;" : "");

              wrapper.appendChild(inner);
              el.appendChild(wrapper);
            });

            // Animate
            gsap.to(el.querySelectorAll(".word-inner-design"), {
              y: "0%",
              duration: 0.9,
              stagger: 0.05,
              ease: "power4.out",
              scrollTrigger: {
                trigger: el,
                start: "top 90%",
                toggleActions: "play none none reverse"
              }
            });
          });
        }, section);

        return () => context.revert();
      } catch {
        // Fail silently if GSAP not available
      }
    };

    const cleanup = initAnimations();
    return () => {
      cleanup.then((fn) => fn?.());
    };
  }, [scopeRef]);

  return null;
}

// Global Styles
function GlobalStyles() {
  return (
    <style>{`
      @keyframes blob-spin {
        0% { transform: rotate(0deg) scale(1); }
        50% { transform: rotate(180deg) scale(1.1); }
        100% { transform: rotate(360deg) scale(1); }
      }

      @keyframes blob-morph {
        0% { border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%; background-position: 0% 50%; }
        50% { border-radius: 30% 60% 70% 40% / 50% 60% 30% 60%; background-position: 100% 50%; }
        100% { border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%; background-position: 0% 50%; }
      }

      @keyframes float-slow {
        0%, 100% { transform: translateY(0); }
        50% { transform: translateY(-10px); }
      }

      .animate-fluid-blob {
        animation: blob-morph 12s ease-in-out infinite alternate, blob-spin 24s linear infinite;
      }

      .animate-float {
        animation: float-slow 6s ease-in-out infinite;
      }

      .no-scrollbar::-webkit-scrollbar {
        display: none;
      }
      
      .no-scrollbar {
        -ms-overflow-style: none;
        scrollbar-width: none;
      }
    `}</style>
  );
}

// Main Component
export function DesignInspirationSection() {
  const sectionRef = useRef<HTMLElement | null>(null);

  return (
    <section ref={sectionRef} className="flex flex-col items-center min-h-screen text-(--foreground) overflow-x-hidden">
      <GlobalStyles />
      <AnimationsManager scopeRef={sectionRef} />
      <TestimonialSection />
    </section>
  );
}
