"use client";


import { Icon } from "@iconify/react";
import { BackgroundBeams } from "./background-beams";
import Image from "next/image";
import Link from "next/link";
import { use } from "react";

// Footer Section
function FooterSection() {
  return (
    <footer className="w-full bg-[#0A0D14] pt-20 pb-12 relative overflow-hidden text-slate-300">
      <BackgroundBeams className="opacity-40" />
      <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-12 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-10 pb-16 border-b border-slate-800/60">
          <h2 className="design-reveal text-3xl md:text-[2.5rem] font-medium tracking-tight leading-[1.1] max-w-2xl text-slate-200">
            World&apos;s Leading <span style={{ color: "var(--color-accent)" }}>Operational AI</span> Infrastructure
          </h2>
          <div className="flex gap-4 items-center">
            <Image
              src="/iso/iso-9001.png"
              alt="ISO 9001 Certification"
              width={100}
              height={100}
              className="w-16 h-16 md:w-20 md:h-20 cursor-pointer object-contain"
              onClick={() => window.open('https://www.iafcertsearch.org/certification/CBGrJHgQD06uUl9n4SzLujlK', '_blank')}
            />
            <Image
              src="/iso/iso-27001.png"
              alt="ISO 27001 Certification"
              width={100}
              height={100}
              className="w-16 h-16 md:w-20 md:h-20 cursor-pointer object-contain"
              onClick={() => window.open('https://www.iafcertsearch.org/certification/NSfA7vSho5dy4E9oDojNiXbX', '_blank')}
            />
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-x-8 gap-y-12 py-16 border-b border-slate-800/60">
          {[
            {
              title: "Company",
              links: [
                { label: "About Us", href: "/about" },
                { label: "Careers", href: "/careers" },
                { label: "Blog", href: "/blog" },
                { label: "Research", href: "/research" },
                { label: "Contact", href: "/contact" }
              ]
            },
            {
              title: "Quick Links",
              links: [
                { label: "Business", href: "/business" },
                { label: "Creators", href: "/creators" },
                { label: "Workflow", href: "/workflow" },
                { label: "Zaby Interview", href: "/products/interview" },
                { label: "Zaby Prep", href: "/products/cert-prep" }
              ]
            },
            {
              title: "Products",
              links: [
                { label: "Workspace", href: "#" },
                { label: "AI Engine", href: "#" },
                { label: "Integrations", href: "#" },
                { label: "Mobile", href: "#" },
                { label: "API", href: "#" }
              ]
            },
            {
              title: "Technology",
              links: [
                { label: "AI Models", href: "#" },
                { label: "Real-time Sync", href: "#" },
                { label: "Security", href: "#" },
                { label: "Performance", href: "#" }
              ]
            },
            {
              title: "Legal",
              links: [
                { label: "Privacy Policy", href: "/privacy" },
                { label: "Terms of Service", href: "/terms-of-services" },
                { label: "Cookie Policy", href: "/cookies" }
              ]
            }
          ].map((section, idx) => (
            <div key={idx} className="flex flex-col gap-4">
              <span className="text-[10px] font-medium text-slate-500 uppercase tracking-widest">
                {section.title}
              </span>
              {section.links.map((link, linkIdx) => (
                <Link
                  key={linkIdx}
                  href={link.href}
                  className="text-xs text-slate-400 hover:text-white transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          ))}
        </div>

        <div className="flex flex-col md:flex-row justify-between items-start md:items-center pt-8 pb-16 gap-6 relative z-10">
          <div className="flex items-center gap-6">
            {[
              { icon: "ri:twitter-x-line", url: "https://x.com/ZabyAi123" },
              { icon: "ri:linkedin-fill", url: "https://www.linkedin.com/company/zaby-ai/" },
              { icon: "ri:instagram-line", url: "https://www.instagram.com/zaby.tech/" },
              { icon: "ri:youtube-fill", url: "https://youtube.com/@genzaby?si=2q3z-hEwlhKxkzDz" },
              { icon: "ri:github-fill", url: "#" }
            ].map((social, idx) => (
              <a 
                key={idx} 
                href={social.url} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-slate-500 hover:text-white transition-colors"
              >
                <Icon icon={social.icon} width={18} />
              </a>
            ))}
          </div>
          <div className="text-right">
            <p className="text-[10px] text-slate-500 mb-1 leading-relaxed">
              Plot No.25, Srujana, Lakshmi Nagar Colony, Ameenpur, Ramachandrapuram,<br />
              Medak- 502032, Gachibowli, Telangana, India
            </p>
            <p className="text-[10px] text-slate-600">
              © 2025 GEN ZABY AI SOLUTIONS PRIVATE LIMITED. All Rights Reserved.
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
          zaby
        </h1>
      </div>
    </footer>
  );
}

export default FooterSection;