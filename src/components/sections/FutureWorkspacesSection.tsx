"use client";

import React, { useEffect, useRef, useState } from "react";
import { Icon } from "@iconify/react";
import Link from "next/link";

// ─── Data ────────────────────────────────────────────────────────────────────

interface SectionData {
  id: number;
  title: string;
  description: string;
  image: string;
  action: string;
  hasArrow: boolean;
  href?: string;
}

type BlogPost = {
  id: string;
  title?: string | null;
  slug?: string | null;
  excerpt?: string | null;
  content?: string | null;
  featuredImage?: string | null;
};

type BlogsApiResponse = {
  success?: boolean;
  data?: {
    data?: BlogPost[];
  };
};

const BLOGS_API_URL = "https://prod-api.zaby.io/api/v1/public/blogs";

const SECTIONS_DATA: SectionData[] = [
  {
    id: 1,
    title: "Hiring Workspace",
    description:
      "AI-powered recruitment operations — candidate screening, automated assessments, and interview coordination in one place.",
    image:
      "https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/724142aa-44a6-48d3-9cf3-761e00d05b78_1600w.jpg",
    action: "Explore",
    hasArrow: true,
  },
  {
    id: 2,
    title: "Support Operations",
    description:
      "Intelligent support infrastructure — AI-assisted ticket management, escalation workflows, and triage automation at scale.",
    image:
      "https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/005600e5-f6ab-4e59-bc86-eaeb02797dfa_1600w.jpg",
    action: "Explore",
    hasArrow: true,
  },
  {
    id: 3,
    title: "Content Studio",
    description:
      "Coming soon — AI-native content pipelines with generation workflows, team collaboration, and multi-stage review systems.",
    image:
      "https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/fb6415fd-bf4d-4ccf-8e9d-7ab445e99207_1600w.jpg",
    action: "Register your interest to be among the first to be informed",
    hasArrow: false,
  },
  {
    id: 4,
    title: "Assessment Platform",
    description:
      "Coming soon — Enterprise evaluation systems with automated scoring, adaptive assessments, and workflow automation.",
    image:
      "https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/5ee0a38a-b5d3-4531-8793-98beed4af162_1600w.jpg",
    action: "Register your interest to be among the first to be informed",
    hasArrow: false,
  },
];

function stripHtmlTags(input?: string | null): string {
  if (!input) return "";

  return input
    .replace(/<[^>]*>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/\s+/g, " ")
    .trim();
}

function extractFirstImage(content?: string | null): string | null {
  if (!content) return null;

  const match = content.match(/<img[^>]+src=["']([^"']+)["']/i);
  return match?.[1] ?? null;
}

function truncateText(text: string, limit: number): string {
  if (text.length <= limit) return text;
  return `${text.slice(0, limit).trim()}...`;
}

function mapBlogsToSections(posts: BlogPost[]): SectionData[] {
  return posts.slice(0, 4).map((post, index) => {
    const fallback = SECTIONS_DATA[index % SECTIONS_DATA.length];
    const plainExcerpt = stripHtmlTags(post.excerpt || post.content);

    return {
      id: fallback.id,
      title: post.title?.trim() || fallback.title,
      description:
        truncateText(plainExcerpt, 140) || fallback.description,
      image: post.featuredImage || extractFirstImage(post.content) || fallback.image,
      action: "Read article",
      hasArrow: true,
      href: `/blog/${post.slug || post.id}`,
    };
  });
}

async function fetchBlogs(): Promise<BlogPost[]> {
  const params = new URLSearchParams({
    page: "1",
    limit: "4",
  });

  const response = await fetch(`${BLOGS_API_URL}?${params.toString()}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    cache: "no-store",
  });

  if (!response.ok) return [];

  const payload = (await response.json()) as BlogsApiResponse;
  if (!payload.success) return [];

  return payload.data?.data ?? [];
}

// ─── ArchitectureSection ─────────────────────────────────────────────────────

function ArchitectureSection({ section }: { section: SectionData }) {
  const content = (
    <>
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center transition-transform duration-2000 ease-out group-hover:scale-105"
        style={{ backgroundImage: `url('${section.image}')` }}
      />

      {/* Adaptive Gradient Mask */}
      <div className="absolute top-0 left-0 w-full h-[70%] bg-linear-to-b from-black via-black/90 to-transparent transition-colors duration-700 pointer-events-none" />

      {/* Gradient Border Separator */}
      <div className="absolute right-0 top-0 bottom-0 w-px bg-linear-to-b from-transparent via-white/10 to-transparent hidden lg:block z-20 transition-colors duration-700" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-white/10 to-transparent lg:hidden z-20 transition-colors duration-700" />

      {/* Content */}
      <div className="relative z-10 p-8 lg:p-12 xl:p-16 h-full flex flex-col pt-16 lg:pt-24">
        <div className="content-wrapper">
          <h2 className="reveal-text text-3xl lg:text-4xl font-extralight tracking-tight text-white mb-6 transition-colors duration-700 line-clamp-3">
            {section.title}
          </h2>
          <p className="reveal-text text-sm font-extralight text-zinc-300 leading-relaxed max-w-[90%] transition-colors duration-700 line-clamp-4">
            {section.description}
          </p>
        </div>

        <div className="mt-auto pb-4 lg:pb-12 content-wrapper">
          <div className="relative w-full pt-4 flex items-center justify-between group/btn">
            <div className="absolute top-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-white/20 to-transparent group-hover:via-white transition-all duration-500" />
            
            <span className="text-[10px] tracking-widest uppercase text-white font-normal group-hover/btn:opacity-70 transition-all duration-700">
              {section.action}
            </span>
            
            <Icon
              icon="solar:arrow-right-linear"
              className="text-white text-lg opacity-0 -translate-x-4 transition-all duration-300 group-hover/btn:opacity-100 group-hover/btn:translate-x-0"
              width={18}
              height={18}
            />
          </div>
        </div>
      </div>
    </>
  );

  if (section.href) {
    return (
      <Link 
        href={section.href} 
        className="col-section group relative flex-1 h-[70vh] lg:h-dvh overflow-hidden cursor-pointer block"
      >
        {content}
      </Link>
    );
  }

  return (
    <section className="col-section group relative flex-1 h-[70vh] lg:h-dvh overflow-hidden cursor-pointer">
      {content}
    </section>
  );
}

// ─── AnimationsManager ───────────────────────────────────────────────────────

function AnimationsManager({ scopeRef }: { scopeRef: React.RefObject<HTMLElement | null> }) {
  useEffect(() => {
    const initAnimations = async () => {
      try {
        const { gsap } = await import("gsap");
        const { ScrollTrigger } = await import("gsap/ScrollTrigger");

        gsap.registerPlugin(ScrollTrigger);

        const root = scopeRef.current;
        if (!root) return;

        // Prepare masked reveal text — scoped to this section only
        root.querySelectorAll<HTMLElement>(".reveal-text").forEach((el) => {
          const text = el.innerText.trim();
          const words = text.split(/\s+/);
          el.innerHTML = "";

          words.forEach((word) => {
            const wrapper = document.createElement("span");
            wrapper.className = "inline-block overflow-hidden align-top";

            const inner = document.createElement("span");
            inner.className = "fws-reveal-word inline-block";
            inner.style.transform = "translateY(110%)";
            inner.innerHTML = word + "&nbsp;";

            wrapper.appendChild(inner);
            el.appendChild(wrapper);
          });
        });

        if (document.fonts) {
          await document.fonts.ready;
        }

        const ctx = gsap.context(() => {
          const tl = gsap.timeline();

          tl.from(".col-section", {
            duration: 1.2,
            y: window.innerHeight * 0.05,
            opacity: 0,
            stagger: 0.1,
            ease: "power3.out",
            clearProps: "all",
          });

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

          gsap.utils.toArray<HTMLElement>(".col-section").forEach((section) => {
            const words = section.querySelectorAll(".fws-reveal-word");

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
        }, root);

        return () => ctx.revert();
      } catch {
        // Animations not critical — fail silently
      }
    };

    const cleanup = initAnimations();
    return () => {
      cleanup.then((fn) => fn?.());
    };
  }, [scopeRef]);

  return null;
}

// ─── Main Section Export ─────────────────────────────────────────────────────

export function FutureWorkspacesSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [sections, setSections] = useState<SectionData[]>(SECTIONS_DATA);

  useEffect(() => {
    let isMounted = true;

    const loadBlogs = async () => {
      try {
        const blogs = await fetchBlogs();

        if (!isMounted || blogs.length === 0) return;

        const dynamicSections = mapBlogsToSections(blogs);
        if (dynamicSections.length >= SECTIONS_DATA.length) {
          setSections(dynamicSections.slice(0, SECTIONS_DATA.length));
          return;
        }

        const remainingFallback = SECTIONS_DATA.slice(dynamicSections.length);
        setSections([...dynamicSections, ...remainingFallback]);
      } catch {
        // If API fails, keep dummy section data.
      }
    };

    loadBlogs();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-x-hidden selection:bg-white/30 selection:text-black min-h-screen"
    >
      <AnimationsManager scopeRef={sectionRef} />

      <main className="relative z-10 w-full min-h-dvh flex flex-col lg:flex-row">
        {sections.map((section) => (
          <ArchitectureSection key={section.id} section={section} />
        ))}
      </main>
    </section>
  );
}
