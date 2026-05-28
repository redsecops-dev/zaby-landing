"use client";

import React from "react";
import { Icon } from "@iconify/react";
import { SectionWrapper, Container } from "@/components/layout";
import { GlassPanel, SectionHeading, GradientOrb, CalendlyButton } from "@/components/shared";
import { ScrollReveal } from "@/components/animations";
import { DottedMap } from "@/components/ui/dotted-map";

const CONTACT_CHANNELS = [
  {
    icon: "solar:letter-bold-duotone",
    iconColor: "text-[var(--color-accent-soft)]",
    bgColor: "bg-[var(--color-accent)]/10",
    title: "Email Us",
    subtitle: "Our team will respond within 24 hours",
    isCalendly: false,
    items: [
      { label: "General & Support", value: "support@zaby.io", href: "mailto:support@zaby.io" },
      { label: "Sales", value: "sales@zaby.io", href: "mailto:sales@zaby.io" },
      { label: "Partnerships", value: "partners@zaby.io", href: "mailto:partners@zaby.io" },
    ],
    note: null,
  },
  {
    icon: "solar:phone-bold-duotone",
    iconColor: "text-emerald-500",
    bgColor: "bg-emerald-500/10",
    title: "Call Us",
    subtitle: "Speak with our team directly",
    isCalendly: false,
    items: [
      { label: null, value: "+91-8523871114", href: "tel:+918523871114" },
    ],
    note: "Monday – Friday, 9 AM – 6 PM IST",
  },
  {
    icon: "solar:calendar-bold-duotone",
    iconColor: "text-purple-500",
    bgColor: "bg-purple-500/10",
    title: "Schedule Demo",
    subtitle: "Book an interactive session",
    isCalendly: true,
    items: [],
    note: "Instant calendar confirmation",
  },
  {
    icon: "solar:map-point-bold-duotone",
    iconColor: "text-blue-500",
    bgColor: "bg-blue-500/10",
    title: "Visit Us",
    subtitle: "Our headquarters",
    isCalendly: false,
    items: [
      {
        label: null,
        value: "Plot No.25, Srujana, Lakshmi Nagar Colony, Gachibowli, Hyderabad, Telangana, India",
        href: "https://maps.google.com/?q=Plot+No.25,+Srujana,+Lakshmi+Nagar+Colony,+Ameenpur,+Ramachandrapuram,+Medak,+Telangana,+502032,+India",
      },
    ],
    note: null,
  },
] as const;

export function ContactInfoSection() {
  const hqMarker = [
    {
      lat: 17.5250,
      lng: 78.3315,
      size: 1.8,
      pulse: true,
    },
  ];

  return (
    <SectionWrapper spacing="md" background="transparent" className="relative overflow-hidden">
      {/* Background ambient glow orb */}
      <GradientOrb
        color="purple"
        size="xl"
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.08] dark:opacity-[0.05] pointer-events-none"
      />

      <Container size="lg" className="relative z-10">
        {/* Heading */}
        <ScrollReveal direction="up" delay={0.1}>
          <SectionHeading
            title={
              <>
                Contact &{" "}
                <span className="bg-linear-to-br from-[var(--color-accent)] via-[#c026d3] to-[var(--color-accent-soft)] bg-clip-text text-transparent font-semibold">
                  Location
                </span>
              </>
            }
            subtitle="Find our headquarters and reach out through our dedicated support channels."
            className="mb-12"
            align="center"
          />
        </ScrollReveal>

        {/* Dashboard Grid */}
        <div className="grid gap-8 lg:grid-cols-12 items-stretch">
          {/* Map Container - Left Column */}
          <div className="lg:col-span-7 flex flex-col">
            <ScrollReveal direction="up" delay={0.15} className="h-full">
              <div className="relative flex h-full min-h-[380px] w-full items-center justify-center overflow-hidden rounded-3xl border border-[var(--color-border-strong)]/40 bg-white/40 dark:bg-zinc-950/20 backdrop-blur-xl p-6 md:p-10 shadow-xs">
                {/* Subtle Gradient Overlay */}
                <div className="absolute inset-0 rounded-3xl bg-linear-to-tr from-purple-500/5 to-pink-500/5 opacity-50 pointer-events-none" />

                <DottedMap
                  width={150}
                  height={75}
                  mapSamples={4800}
                  markers={hqMarker}
                  dotColor="currentColor"
                  markerColor="var(--color-accent-soft, #d946ef)"
                  dotRadius={0.24}
                  stagger={true}
                  pulse={true}
                  className="w-full h-auto text-zinc-400/80 dark:text-zinc-600"
                  renderMarkerOverlay={({ marker, x, y }) => (
                    <g>
                      {/* Connector Line */}
                      <line
                        x1={x}
                        y1={y}
                        x2={x}
                        y2={y - 8.5}
                        stroke="var(--color-accent-soft, #d946ef)"
                        strokeWidth={0.2}
                        opacity={0.8}
                      />
                      
                      {/* Tiny connector dot */}
                      <circle
                        cx={x}
                        cy={y - 8.5}
                        r={0.35}
                        fill="var(--color-accent-soft, #d946ef)"
                      />

                      {/* Tooltip Card shadow/border background */}
                      <rect
                        x={x - 28.8}
                        y={y - 17.9}
                        width={58}
                        height={8.6}
                        rx={1.5}
                        fill="rgba(0, 0, 0, 0.05)"
                      />
                      <rect
                        x={x - 29}
                        y={y - 18.1}
                        width={58}
                        height={8.6}
                        rx={1.5}
                        fill="var(--color-bg, #ffffff)"
                        stroke="var(--color-accent-soft, #d946ef)"
                        strokeWidth={0.2}
                      />

                      {/* Tooltip Text */}
                      <text
                        x={x}
                        y={y - 13.8}
                        fill="var(--color-text-primary, #171717)"
                        fontSize={2.4}
                        fontFamily="var(--font-sans), sans-serif"
                        fontWeight="600"
                        textAnchor="middle"
                        dominantBaseline="central"
                      >
                        Gachibowli, Hyderabad, Telangana, India
                      </text>
                    </g>
                  )}
                />
              </div>
            </ScrollReveal>
          </div>

          {/* Cards Column - Right Column */}
          <div className="lg:col-span-5 flex flex-col gap-5 justify-between">
            {CONTACT_CHANNELS.map((channel, channelIdx) => (
              <ScrollReveal key={channel.title} direction="up" delay={0.15 + channelIdx * 0.05} className="flex-1 flex flex-col">
                <GlassPanel 
                  padding="none"
                  className="flex h-full flex-col border border-[var(--color-glass-border)] bg-white/60 dark:bg-zinc-900/40 backdrop-blur-md rounded-2xl p-5 transition-all duration-300 hover:scale-[1.01] hover:shadow-xs justify-between"
                >
                  <div>
                    {/* Icon + Title */}
                    <div className="flex items-start gap-4 text-left">
                      <div
                        className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl ${channel.bgColor}`}
                      >
                        <Icon
                          icon={channel.icon}
                          width={18}
                          height={18}
                          className={channel.iconColor}
                        />
                      </div>
                      <div>
                        <h3 className="text-sm font-bold text-[var(--color-text-primary)] font-display">
                          {channel.title}
                        </h3>
                        <p className="text-[11px] text-[var(--color-text-secondary)]">
                          {channel.subtitle}
                        </p>
                      </div>
                    </div>

                    {/* Divider */}
                    <div className="my-2.5 border-t border-[var(--color-border-strong)]/40" />

                    {/* Items */}
                    {channel.isCalendly ? (
                      <div className="mt-2 text-left">
                        <CalendlyButton
                          variant="secondary"
                          text="Book Demo Call"
                          icon="solar:calendar-date-bold-duotone"
                          className="w-full justify-start py-2.5 rounded-xl border border-purple-500/20 text-xs font-semibold bg-purple-500/5 hover:bg-purple-500/10 text-purple-600 dark:text-purple-400"
                        />
                      </div>
                    ) : (
                      <div className="flex flex-col gap-1.5 text-left">
                        {channel.items.map((item) => (
                          <div key={item.value} className="flex flex-col gap-0.5">
                            {item.label && (
                              <span className="text-[10px] font-semibold text-[var(--color-text-secondary)]/70">
                                {item.label}:
                              </span>
                            )}
                            <a
                              href={item.href}
                              target={item.href.startsWith("http") ? "_blank" : undefined}
                              rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
                              className="wrap-break-word text-xs font-semibold text-[var(--color-accent-soft)] transition-colors hover:text-[var(--color-accent-hover)]"
                            >
                              {item.value}
                            </a>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Note badge */}
                  {channel.note && (
                    <div className="mt-3 rounded-lg bg-[var(--color-border-strong)]/30 border border-[var(--color-border-strong)]/10 px-2.5 py-1.5 text-[10px] text-[var(--color-text-secondary)] text-left">
                      {channel.note}
                    </div>
                  )}
                </GlassPanel>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </Container>
    </SectionWrapper>
  );
}
