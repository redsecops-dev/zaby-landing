"use client";

import { useEffect, useRef } from "react";
import { Icon } from "@iconify/react";

// Card Components
function UIStackCard() {
  return (
    <div className="col-span-12 lg:col-span-3 lg:row-span-2 bg-white rounded-2xl border border-slate-200/60 overflow-hidden relative flex flex-col group transition-all duration-300 hover:shadow-md">
      <div className="flex-1 bg-gradient-to-br from-[#EAE2F8] to-[#F3E8FF] p-6 relative overflow-hidden">
        <div className="flex items-center justify-between mb-8 relative z-10">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full bg-slate-900"></div>
            <span className="text-xs font-medium tracking-tight">Nexus</span>
          </div>
          <div className="flex gap-3 text-xs text-slate-500 font-medium">
            <span>Features</span>
            <span>Pricing</span>
          </div>
        </div>

        <div className="relative z-10 max-w-[80%]">
          <h2 className="text-2xl font-medium tracking-tight leading-tight mb-2">
            Accelerate growth with intelligent insights.
          </h2>
          <p className="text-xs text-slate-500 mb-6">
            Automate your workflow and leverage AI for better decisions.
          </p>
          <button className="bg-[#FD6703] text-white text-xs px-4 py-1.5 rounded-full font-medium hover:bg-[#E55D02] transition-colors">
            Start Trial
          </button>
        </div>

        <div className="absolute -bottom-12 -right-12 w-48 h-48 rounded-full border-[16px] border-slate-900 opacity-90 group-hover:scale-105 transition-transform duration-500"></div>
        <div className="absolute -top-12 -right-4 w-32 h-32 rounded-full border-[12px] border-slate-900 opacity-90 group-hover:scale-105 transition-transform duration-500 delay-75"></div>
      </div>

      <div className="h-32 bg-gradient-to-tr from-[#E2D8F0] to-[#FADDF0] relative border-t border-white/20 p-6 flex flex-col justify-end overflow-hidden">
        <div className="absolute bottom-0 right-0 w-32 h-32 bg-[#FD6703] rounded-tl-full opacity-80 blur-2xl translate-x-1/2 translate-y-1/2"></div>
        <span className="text-lg font-medium tracking-tight relative z-10">Scale operations.</span>
      </div>
    </div>
  );
}

function IntroCard() {
  return (
    <div className="col-span-12 md:col-span-6 lg:col-span-3 bg-white rounded-2xl border border-slate-200/60 overflow-hidden relative p-6 flex flex-col justify-between min-h-[220px]">
      <div className="absolute inset-0 bg-gradient-to-br from-[#E0F2FE] via-[#F3E8FF] to-[#FCE7F3] opacity-60"></div>
      <div className="absolute -top-20 -left-20 w-64 h-64 bg-gradient-to-r from-blue-300 to-purple-300 rounded-full mix-blend-multiply filter blur-[40px] opacity-70 animate-fluid-blob"></div>

      <div className="flex justify-between items-start text-xs font-medium text-slate-500 relative z-10 mb-8">
        <span>@alexrivers</span>
        <div className="flex gap-3">
          <span>Work</span>
          <span>Info</span>
        </div>
      </div>
      <div className="relative z-10">
        <p className="text-lg font-normal tracking-tight leading-snug">
          My name is <span className="font-medium">Alex Rivers</span>,<br />I'm a product designer building<br />interfaces in Berlin.
        </p>
      </div>
      <div className="flex justify-between items-end text-xs text-slate-400 mt-6 relative z-10">
        <span>Available for work</span>
        <div className="flex gap-2">
          <span>Dribbble</span>
          <span>X</span>
        </div>
      </div>
    </div>
  );
}

function AbstractBoxCard() {
  return (
    <div className="col-span-12 md:col-span-6 lg:col-span-2 bg-[#F8F9FA] rounded-2xl border border-slate-200/60 overflow-hidden relative min-h-[220px] flex items-center justify-center group cursor-pointer">
      <div className="relative w-full h-full flex items-center justify-center animate-float">
        <div className="absolute w-20 h-28 bg-white border border-slate-100 rounded-lg shadow-xl translate-x-4 translate-y-4 rotate-6 z-10 transition-transform duration-300 group-hover:rotate-12 group-hover:translate-x-6">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-gradient-to-tr from-orange-400 to-pink-500 rounded-full blur-md opacity-60"></div>
        </div>
        <div className="absolute w-16 h-24 bg-slate-50 border border-slate-200 rounded-lg shadow-md -translate-x-6 -translate-y-2 -rotate-3 z-0 transition-transform duration-300 group-hover:-rotate-6 group-hover:-translate-x-8">
          <div className="absolute top-1/4 left-1/4 w-6 h-6 bg-gradient-to-tr from-blue-400 to-purple-500 rounded-full blur-sm opacity-50"></div>
        </div>
      </div>
    </div>
  );
}

function HeroGradientCard() {
  return (
    <div className="col-span-12 lg:col-span-4 lg:row-span-2 bg-white rounded-2xl border border-slate-200/60 overflow-hidden relative p-8 flex flex-col justify-between min-h-[460px]">
      <div className="flex justify-between items-center text-xs font-medium text-slate-500 relative z-20">
        <div className="flex items-center gap-1 text-slate-900">
          <div className="w-2.5 h-2.5 rounded-full bg-slate-900"></div>
          <span>Platform</span>
        </div>
        <div className="flex gap-4">
          <span className="hidden sm:inline">Components</span>
          <span className="hidden sm:inline">Templates</span>
          <span className="text-slate-900">Pro Access</span>
        </div>
      </div>

      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-[#EC4899] via-[#F97316] to-[#8B5CF6] opacity-30 mix-blend-multiply blur-[80px] animate-fluid-blob"></div>
        <div
          className="absolute top-1/4 left-1/4 w-[80%] h-[80%] bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-[#FEBED9] via-[#FD6703] to-transparent opacity-40 mix-blend-screen blur-[60px] animate-fluid-blob"
          style={{ animationDelay: "-4s" }}
        ></div>
      </div>

      <div className="relative z-10 flex flex-col items-center text-center mt-12 mb-8">
        <h1 className="text-4xl sm:text-5xl font-medium tracking-tight leading-[1.1] text-slate-900 mb-4 max-w-[280px]">
          Premium digital resources
        </h1>
        <p className="text-xs text-slate-600 mb-6 max-w-[200px]">
          Join the waitlist to receive curated design assets weekly.
        </p>

        <div className="flex w-full max-w-[260px] bg-white/60 backdrop-blur-md rounded-full border border-slate-300/80 p-1 shadow-sm transition-all focus-within:border-slate-400 focus-within:shadow-md">
          <input
            type="email"
            placeholder="Your email"
            className="flex-1 bg-transparent px-3 text-sm outline-none placeholder:text-slate-400 font-medium"
          />
          <button className="bg-slate-900 text-white text-xs px-4 py-2 rounded-full font-medium hover:bg-slate-800 transition-colors flex items-center gap-1">
            Join <Icon icon="solar:arrow-right-linear" width={14} height={14} />
          </button>
        </div>
      </div>

      <div className="relative z-10 flex justify-between items-end text-[10px] text-slate-400 uppercase tracking-wider mt-auto pt-8 border-t border-slate-100">
        <div>
          <span className="block mb-1">New Releases</span>
          <span className="text-slate-900 font-medium normal-case tracking-normal text-xs">Abstract 3D Pack</span>
        </div>
        <div className="text-right">
          <span className="block mb-1">Date</span>
          <span className="text-slate-900 font-medium normal-case tracking-normal text-xs">Oct 24, 2023</span>
        </div>
      </div>
    </div>
  );
}

function CoreTextCard() {
  return (
    <div className="col-span-12 md:col-span-6 lg:col-span-3 bg-white rounded-2xl border border-slate-200/60 p-6 flex flex-col justify-between">
      <div className="flex justify-between items-start text-xs text-slate-400 mb-8">
        <span>Focus</span>
        <span>01</span>
      </div>
      <div>
        <h3 className="text-xl font-medium tracking-tight mb-2">Systems.</h3>
        <p className="text-sm text-slate-500 font-normal leading-relaxed">
          Scalable design systems, interactive prototypes, and modern web applications for startups.
        </p>
      </div>
    </div>
  );
}

function TypographyCard() {
  return (
    <div className="col-span-12 md:col-span-6 lg:col-span-2 bg-white rounded-2xl border border-slate-200/60 p-6 flex flex-col justify-center items-center relative overflow-hidden group">
      <div className="absolute inset-0 bg-slate-50 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      <h3 className="text-3xl font-medium tracking-tight text-slate-900 relative z-10 leading-none text-center">
        Inter<br />Tight
      </h3>

      <div className="w-full flex justify-between mt-8 text-[10px] text-slate-400 uppercase tracking-wider relative z-10 border-t border-slate-100 pt-3">
        <div className="flex flex-col">
          <span>Weights</span>
          <span className="text-slate-900 font-medium normal-case text-xs">9</span>
        </div>
        <div className="flex flex-col text-right">
          <span>Style</span>
          <span className="text-slate-900 font-medium normal-case text-xs">Sans</span>
        </div>
      </div>
    </div>
  );
}

function PaletteCard() {
  return (
    <div className="col-span-12 md:col-span-6 lg:col-span-3 bg-white rounded-2xl border border-slate-200/60 overflow-hidden flex flex-col h-40">
      <div className="flex-1 bg-[#F3EDE1] p-4 flex items-start">
        <span className="text-xs font-medium text-slate-900">#F3EDE1</span>
      </div>
      <div className="flex-1 bg-[#FD6703]"></div>
      <div className="flex-1 bg-[#F5A345]"></div>
      <div className="flex-1 bg-[#FEBED9]"></div>
    </div>
  );
}

function DiscoverCard() {
  return (
    <div className="col-span-12 lg:col-span-5 bg-white rounded-2xl border border-slate-200/60 p-8 flex flex-col items-center justify-center text-center">
      <div className="flex items-center gap-2 mb-6">
        <Icon icon="solar:layers-minimalistic-linear" width={20} height={20} className="text-slate-900" />
        <span className="text-xs font-medium tracking-tight">Gallery</span>
      </div>
      <h2 className="text-2xl sm:text-3xl font-medium tracking-tight mb-3">
        Explore curated digital experiences.
      </h2>
      <p className="text-sm text-slate-500 mb-6">Featuring over 500 hand-picked interfaces and interactions.</p>
      <button className="bg-slate-900 text-white text-xs px-5 py-2.5 rounded-full font-medium hover:bg-slate-800 transition-colors flex items-center gap-2">
        Start browsing <Icon icon="solar:arrow-right-up-linear" width={14} height={14} />
      </button>
    </div>
  );
}

function LogoCard() {
  return (
    <div className="col-span-12 lg:col-span-4 bg-white rounded-2xl border border-slate-200/60 p-8 flex items-center justify-center group cursor-pointer">
      <div className="flex items-center gap-3 transition-transform duration-300 group-hover:scale-105">
        <Icon icon="solar:box-minimalistic-linear" width={32} height={32} className="text-slate-900" />
        <span className="text-2xl font-medium tracking-tighter text-slate-900">QuantumLabs</span>
      </div>
    </div>
  );
}

function CardGrid() {
  return (
    <div className="w-full min-h-screen flex items-center justify-center p-4 md:p-8 lg:p-12">
      <main className="w-full max-w-[1280px] bg-white/40 backdrop-blur-3xl rounded-[2.5rem] border border-white/60 shadow-[0_8px_40px_rgb(0,0,0,0.04)] p-4 md:p-6 lg:p-8">
        <div className="grid grid-cols-12 gap-4 lg:gap-5">
          <UIStackCard />
          <IntroCard />
          <AbstractBoxCard />
          <HeroGradientCard />
          <CoreTextCard />
          <TypographyCard />
          <PaletteCard />
          <DiscoverCard />
          <LogoCard />
        </div>
      </main>
    </div>
  );
}

// Testimonial Card
function TestimonialCard({ avatar, name, title, quote, gradientFrom, gradientTo }) {
  return (
    <div className="relative rounded-3xl bg-gradient-to-br from-slate-200/80 via-slate-100 to-transparent p-[1px] group transition-transform duration-300 hover:-translate-y-1">
      <div
        className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-50 transition-opacity duration-500 blur-xl"
        style={{
          backgroundImage: `linear-gradient(to bottom right, ${gradientFrom}, ${gradientTo})`
        }}
      ></div>
      <div className="relative h-full bg-white/70 backdrop-blur-xl rounded-[23px] p-8 flex flex-col">
        <Icon icon="solar:quote-left-linear" width={24} className="text-slate-300 mb-6" />
        <p className="text-sm font-normal leading-relaxed text-slate-600 flex-grow mb-8">{quote}</p>
        <div className="flex items-center gap-4">
          <img
            src={avatar}
            alt={name}
            className="w-10 h-10 rounded-full object-cover grayscale opacity-90"
          />
          <div>
            <h4 className="text-xs font-medium text-slate-900">{name}</h4>
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
      title: "Design Director, Novus",
      quote: '"Implementing this system completely transformed our approach to interface design. The modularity and precision are unmatched, allowing our team to ship features twice as fast."',
      gradientFrom: "#EAE2F8",
      gradientTo: "#FCE7F3"
    },
    {
      avatar: "https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/4f5668c5-fc4a-44e0-bc5e-a664189d3c31_800w.jpg",
      name: "Elena Rostova",
      title: "Lead Product Manager",
      quote: '"The attention to detail in the components is striking. It feels like a premium product out of the box, saving us weeks of internal alignment and prototyping."',
      gradientFrom: "#E0F2FE",
      gradientTo: "#F3E8FF"
    },
    {
      avatar: "https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/eca707cc-a5b7-439a-b4fd-247f6106c2e1_800w.jpg",
      name: "David Lin",
      title: "Founder, Stack AI",
      quote: '"An absolute game-changer for early-stage startups. We used these core assets to build our MVP, and it instantly established trust with our initial user base."',
      gradientFrom: "#FADDF0",
      gradientTo: "#EAE2F8"
    }
  ];

  return (
    <section className="w-full max-w-[1280px] px-4 md:px-8 lg:px-12 pb-24 md:pb-32 mx-auto">
      <div className="flex flex-col items-center text-center mb-16">
        <h2 className="gsap-reveal text-3xl md:text-4xl font-medium tracking-tight text-slate-900">
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
function BadgeItem({ icon, label }) {
  return (
    <div className="w-14 h-16 border border-slate-700/60 rounded-b-xl rounded-t-md flex flex-col items-center justify-center bg-gradient-to-b from-slate-800/20 to-slate-900/40">
      <Icon icon={icon} width={20} className="text-slate-400" />
      <span className="text-[7px] font-medium text-slate-500 mt-1 uppercase text-center leading-tight">
        {label}
      </span>
    </div>
  );
}

// Footer Section
function FooterSection() {
  return (
    <footer className="w-full bg-[#0A0D14] pt-20 pb-12 relative overflow-hidden text-slate-300">
      <div className="max-w-[1280px] mx-auto px-4 md:px-8 lg:px-12 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-10 pb-16 border-b border-slate-800/60">
          <h2 className="gsap-reveal text-3xl md:text-[2.5rem] font-medium tracking-tight leading-[1.1] max-w-2xl text-slate-200">
            World's Most <span className="text-[#3B82F6]">Secure</span> Multimodal and Multilingual Agentic AI Platform
          </h2>
          <div className="flex gap-3">
            <BadgeItem icon="solar:shield-check-linear" label="AICPA SOC" />
            <BadgeItem icon="solar:verified-check-linear" label="ISO 27001" />
            <BadgeItem icon="solar:global-linear" label="GDPR" />
            <BadgeItem icon="solar:medical-kit-linear" label="HIPAA" />
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-x-8 gap-y-12 py-16 border-b border-slate-800/60">
          {[
            {
              title: "Products",
              links: ["Inya Assist", "Inya Workforce", "Inya Shield", "Inya Insights", "Inya"]
            },
            {
              title: "Solutions",
              links: ["Usecases", "Industries"]
            },
            {
              title: "Technology",
              links: ["Speech to Text", "Text to Speech", "Real-time Translate", "SLMs & RAGs"]
            },
            {
              title: "Resources",
              links: ["Case Studies", "Blogs", "Glossary"]
            },
            {
              title: "Company",
              links: ["About Us", "Leadership", "Investors & Partners", "Careers", "News & Updates"]
            },
            {
              title: "Legals",
              links: ["Privacy Policies", "Terms & Conditions"]
            }
          ].map((section, idx) => (
            <div key={idx} className="flex flex-col gap-4">
              <span className="text-[10px] font-medium text-slate-500 uppercase tracking-widest">
                {section.title}
              </span>
              {section.links.map((link, linkIdx) => (
                <a
                  key={linkIdx}
                  href="#"
                  className="text-xs text-slate-400 hover:text-white transition-colors"
                >
                  {link}
                </a>
              ))}
            </div>
          ))}
        </div>

        <div className="flex flex-col md:flex-row justify-between items-start md:items-center pt-8 pb-16 gap-6 relative z-10">
          <div className="flex items-center gap-6">
            {["ri:linkedin-fill", "ri:instagram-line", "ri:youtube-fill", "ri:facebook-fill", "ri:discord-fill", "ri:twitter-x-line"].map((icon, idx) => (
              <a key={idx} href="#" className="text-slate-500 hover:text-white transition-colors">
                <Icon icon={icon} width={18} />
              </a>
            ))}
          </div>
          <div className="text-right">
            <p className="text-[10px] text-slate-500 mb-1">
              Gnani.ai, 440 N Barranca Ave, #4039 Covina, California - 91723
            </p>
            <p className="text-[10px] text-slate-600">
              © Copyright 2022 Gnani Innovations Private Limited. All Rights Reserved.
            </p>
          </div>
        </div>
      </div>

      <div className="absolute bottom-[-15%] left-1/2 -translate-x-1/2 w-[110%] pointer-events-none select-none z-0 flex justify-center">
        <h1
          className="text-[18vw] font-medium tracking-tighter leading-none text-transparent bg-clip-text opacity-[0.25]"
          style={{
            backgroundImage: "radial-gradient(circle, #334155 2.5px, transparent 3px)",
            backgroundSize: "14px 14px"
          }}
        >
          gnani.ai
        </h1>
      </div>
    </footer>
  );
}

// Animation Manager
function AnimationManager() {
  useEffect(() => {
    const initAnimations = async () => {
      try {
        const { gsap } = await import("gsap");

        const gsapReveals = document.querySelectorAll(".gsap-reveal");

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
            inner.className = "word-inner";
            inner.style.display = "inline-block";
            inner.style.transform = "translateY(100%)";

            // Handle special coloring for specific words (e.g., "Secure" in blue)
            if (word === "Secure") {
              inner.style.color = "#3B82F6";
            }

            inner.innerHTML = word + (index < words.length - 1 ? "&nbsp;" : "");

            wrapper.appendChild(inner);
            el.appendChild(wrapper);
          });

          // Animate
          gsap.to(el.querySelectorAll(".word-inner"), {
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
      } catch (error) {
        console.error("Animation initialization failed:", error);
      }
    };

    initAnimations();
  }, []);

  return null;
}

// Styles Component
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
export default function DesignInspirationLayoutRemixed() {
  return (
    <section className="flex flex-col items-center min-h-screen text-slate-900 overflow-x-hidden bg-white">
      {/* <GlobalStyles /> */}
      {/* <AnimationManager /> */}
      {/* <CardGrid /> */}
      <TestimonialSection />
      <FooterSection />
    </section>
  );
}
