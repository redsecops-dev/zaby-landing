"use client";

import { useEffect, useRef } from "react";
import { Icon } from "@iconify/react";

const SECTIONS_DATA = [
  {
    id: 1,
    title: "Flexible Nodes",
    description: "Dynamic, self-contained work environments located at the heart of the tech corridor.",
    image: "https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/724142aa-44a6-48d3-9cf3-761e00d05b78_1600w.jpg",
    action: "Discover",
    hasArrow: true,
  },
  {
    id: 2,
    title: "Crystal Atriums",
    description: "Next-generation, light-filled structures engineered to foster deep collaboration.",
    image: "https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/005600e5-f6ab-4e59-bc86-eaeb02797dfa_1600w.jpg",
    action: "Discover",
    hasArrow: true,
  },
  {
    id: 3,
    title: "Open-Plan Studios",
    description: "Upcoming release – Energizing communal zones positioned adjacent to main transit arteries.",
    image: "https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/fb6415fd-bf4d-4ccf-8e9d-7ab445e99207_1600w.jpg",
    action: "Register your interest to be among the first to be informed",
    hasArrow: false,
  },
  {
    id: 4,
    title: "Summit Offices",
    description: "Upcoming release – Exclusive private suites occupying the uppermost levels of the Apex Building.",
    image: "https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/5ee0a38a-b5d3-4531-8793-98beed4af162_1600w.jpg",
    action: "Register your interest to be among the first to be informed",
    hasArrow: false,
  },
];

function ArchitectureSection({ section }) {
  return (
    <section className="col-section group relative flex-1 h-[70vh] lg:h-[100dvh] overflow-hidden cursor-pointer">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center transition-transform duration-[2000ms] ease-out group-hover:scale-105"
        style={{ backgroundImage: `url('${section.image}')` }}
      />

      {/* Adaptive Gradient Mask */}
      <div className="absolute top-0 left-0 w-full h-[70%] bg-gradient-to-b from-black via-black/90 to-transparent transition-colors duration-700 pointer-events-none" />

      {/* Gradient Border Separator */}
      <div className="absolute right-0 top-0 bottom-0 w-[1px] bg-gradient-to-b from-transparent via-white/10 to-transparent hidden lg:block z-20 transition-colors duration-700" />
      <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent lg:hidden z-20 transition-colors duration-700" />

      {/* Content */}
      <div className="relative z-10 p-8 lg:p-12 xl:p-16 h-full flex flex-col pt-16 lg:pt-24">
        <div className="content-wrapper">
          <h2 className="reveal-text text-3xl lg:text-4xl font-extralight tracking-tight text-white mb-6 transition-colors duration-700">
            {section.title}
          </h2>
          <p className="reveal-text text-sm font-extralight text-zinc-300 leading-relaxed max-w-[85%] transition-colors duration-700">
            {section.description}
          </p>
        </div>

        <div className="mt-auto pb-4 lg:pb-12 content-wrapper">
          <div className="relative w-full pt-4 flex items-center justify-between group/btn">
            <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent group-hover:via-white transition-all duration-500" />
            {section.hasArrow ? (
              <>
                <span className="text-[10px] tracking-widest uppercase text-white font-normal group-hover/btn:opacity-70 transition-all duration-700">
                  {section.action}
                </span>
                <Icon
                  icon="solar:arrow-right-linear"
                  className="text-white text-lg opacity-0 -translate-x-4 transition-all duration-300 group-hover/btn:opacity-100 group-hover/btn:translate-x-0"
                  width={18}
                  height={18}
                />
              </>
            ) : (
              <p className="text-[10px] tracking-widest uppercase text-white font-normal leading-relaxed group-hover/btn:opacity-70 transition-all duration-700">
                {section.action}
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

function WebGLBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    let animationFrameId = null;
    let isDisposed = false;

    const initThree = async () => {
      try {
        const THREE = await import("three");

        if (isDisposed) return;

        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(
          75,
          window.innerWidth / window.innerHeight,
          0.1,
          1000
        );
        camera.position.z = 5;

        const renderer = new THREE.WebGLRenderer({
          canvas,
          alpha: true,
          antialias: true,
        });
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

        // Create particles
        const particlesGeometry = new THREE.BufferGeometry();
        const particlesCount = 700;
        const posArray = new Float32Array(particlesCount * 3);

        for (let i = 0; i < particlesCount * 3; i++) {
          posArray[i] = (Math.random() - 0.5) * 15;
        }

        particlesGeometry.setAttribute(
          "position",
          new THREE.BufferAttribute(posArray, 3)
        );

        const particlesMaterial = new THREE.PointsMaterial({
          size: 0.015,
          color: 0xffffff,
          transparent: true,
          opacity: 0.5,
          blending: THREE.NormalBlending,
        });

        const particlesMesh = new THREE.Points(
          particlesGeometry,
          particlesMaterial
        );
        scene.add(particlesMesh);

        let mouseX = 0;
        let mouseY = 0;
        let targetX = 0;
        let targetY = 0;

        const windowHalfX = window.innerWidth / 2;
        const windowHalfY = window.innerHeight / 2;

        const handleMouseMove = (event) => {
          mouseX = event.clientX - windowHalfX;
          mouseY = event.clientY - windowHalfY;
        };

        document.addEventListener("mousemove", handleMouseMove);

        const clock = new THREE.Clock();

        const animate = () => {
          animationFrameId = requestAnimationFrame(animate);
          const elapsedTime = clock.getElapsedTime();

          targetX = mouseX * 0.001;
          targetY = mouseY * 0.001;

          particlesMesh.rotation.y += 0.0005;
          particlesMesh.rotation.x += 0.0002;

          particlesMesh.rotation.y += 0.05 * (targetX - particlesMesh.rotation.y);
          particlesMesh.rotation.x += 0.05 * (targetY - particlesMesh.rotation.x);

          const positions = particlesGeometry.attributes.position.array;
          for (let i = 0; i < particlesCount; i++) {
            const i3 = i * 3;
            positions[i3 + 1] += Math.sin(elapsedTime + positions[i3]) * 0.001;
          }
          particlesGeometry.attributes.position.needsUpdate = true;

          renderer.render(scene, camera);
        };

        animate();

        const handleResize = () => {
          camera.aspect = window.innerWidth / window.innerHeight;
          camera.updateProjectionMatrix();
          renderer.setSize(window.innerWidth, window.innerHeight);
        };

        window.addEventListener("resize", handleResize);

        return () => {
          document.removeEventListener("mousemove", handleMouseMove);
          window.removeEventListener("resize", handleResize);
          particlesGeometry.dispose();
          particlesMaterial.dispose();
          renderer.dispose();
        };
      } catch (error) {
        console.error("Three.js initialization failed:", error);
      }
    };

    const cleanup = initThree();

    return () => {
      isDisposed = true;
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
      cleanup?.then((fn) => fn?.());
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full z-0 pointer-events-none opacity-30 transition-opacity duration-700"
    />
  );
}

function AnimationsManager() {
  useEffect(() => {
    const initAnimations = async () => {
      try {
        const { gsap } = await import("gsap");
        const { ScrollTrigger } = await import("gsap/ScrollTrigger");

        gsap.registerPlugin(ScrollTrigger);

        // Prepare masked reveal text
        document.querySelectorAll(".reveal-text").forEach((el) => {
          const text = el.innerText.trim();
          const words = text.split(/\s+/);
          el.innerHTML = "";

          words.forEach((word) => {
            const wrapper = document.createElement("span");
            wrapper.className = "inline-block overflow-hidden align-top";

            const inner = document.createElement("span");
            inner.className = "reveal-word inline-block";
            inner.style.transform = "translateY(110%)";
            inner.innerHTML = word + "&nbsp;";

            wrapper.appendChild(inner);
            el.appendChild(wrapper);
          });
        });

        // Wait for fonts to load
        if (document.fonts) {
          await document.fonts.ready;
        }

        const tl = gsap.timeline();

        // Section Slide In
        tl.from(".col-section", {
          duration: 1.2,
          y: window.innerHeight * 0.05,
          opacity: 0,
          stagger: 0.1,
          ease: "power3.out",
          clearProps: "all",
        });

        // Wrapper Fade
        tl.from(
          ".content-wrapper",
          {
            duration: 1,
            opacity: 0,
            stagger: 0.05,
            ease: "power2.out",
          },
          "-=0.8"
        );

        // Masked Word Reveal on Scroll
        gsap.utils.toArray(".col-section").forEach((section) => {
          const words = section.querySelectorAll(".reveal-word");

          gsap.to(words, {
            y: "0%",
            duration: 0.8,
            stagger: 0.015,
            ease: "power3.out",
            scrollTrigger: {
              trigger: section,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          });
        });
      } catch (error) {
        console.error("GSAP initialization failed:", error);
      }
    };

    initAnimations();

    return () => {
      // Cleanup handled by GSAP's context revert
    };
  }, []);

  return null;
}

export default function FutureWorkspacesArchitecturalConcepts() {
  return (
    <section className="relative bg-black transition-colors duration-700 m-0 p-0 overflow-x-hidden selection:bg-white/30 selection:text-black [&::-webkit-scrollbar]:hidden min-h-screen">
      <style>{`
        html {
          font-family: 'Inter', sans-serif;
          scrollbar-width: none;
          -ms-overflow-style: none;
        }
      `}</style>

      <WebGLBackground />
      <AnimationsManager />

      <main className="relative z-10 w-full min-h-[100dvh] flex flex-col lg:flex-row">
        {SECTIONS_DATA.map((section) => (
          <ArchitectureSection key={section.id} section={section} />
        ))}
      </main>
    </section>
  );
}

