import { Icon } from "@iconify/react";

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

// Footer Section
function FooterSection() {
  return (
    <footer className="w-full bg-[#0A0D14] pt-20 pb-12 relative overflow-hidden text-slate-300">
      <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-12 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-10 pb-16 border-b border-slate-800/60">
          <h2 className="design-reveal text-3xl md:text-[2.5rem] font-medium tracking-tight leading-[1.1] max-w-2xl text-slate-200">
            World&apos;s Leading <span style={{ color: "var(--color-accent)" }}>Operational AI</span> Infrastructure
          </h2>
          <div className="flex gap-3">
            <BadgeItem icon="solar:shield-check-linear" label="Enterprise" />
            <BadgeItem icon="solar:verified-check-linear" label="Secure" />
            <BadgeItem icon="solar:global-linear" label="Global" />
            <BadgeItem icon="solar:settings-minimalistic-linear" label="Scalable" />
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-x-8 gap-y-12 py-16 border-b border-slate-800/60">
          {[
            {
              title: "Products",
              links: ["Workspace", "AI Engine", "Integrations", "Mobile", "Enterprise", "API"]
            },
            {
              title: "Solutions",
              links: ["Use Cases", "Industries"]
            },
            {
              title: "Technology",
              links: ["AI Models", "Real-time Sync", "Security", "Performance"]
            },
            {
              title: "Resources",
              links: ["Case Studies", "Blog", "Documentation", "Community"]
            },
            {
              title: "Company",
              links: ["About Us", "Team", "Investors", "Careers", "Press"]
            },
            {
              title: "Legal",
              links: ["Privacy Policy", "Terms of Service"]
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
            {["ri:linkedin-fill", "ri:instagram-line", "ri:youtube-fill", "ri:twitter-x-line", "ri:github-fill", "ri:discord-fill"].map((icon, idx) => (
              <a key={idx} href="#" className="text-slate-500 hover:text-white transition-colors">
                <Icon icon={icon} width={18} />
              </a>
            ))}
          </div>
          <div className="text-right">
            <p className="text-[10px] text-slate-500 mb-1">
              Zaby Inc., Global Headquarters
            </p>
            <p className="text-[10px] text-slate-600">
              © Copyright 2024 Zaby. All Rights Reserved.
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