"use client";

import React from "react";
import { SectionWrapper, Container } from "@/components/layout";
import { HeroBadge, HeroHeading, GradientOrb } from "@/components/shared";
import { ScrollReveal } from "@/components/animations";

export function ContactHeroSection() {
  return (
    <SectionWrapper
      spacing="none"
      background="transparent"
      className="relative flex min-h-[80vh] items-center md:mt-30 justify-center overflow-hidden"
    >
      {/* Background orbs */}
      <GradientOrb
        color="purple"
        size="xl"
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 opacity-20"
      />
      <GradientOrb
        color="pink"
        size="lg"
        className="absolute right-1/4 top-1/4 opacity-15"
      />

      <Container
        size="lg"
        className="relative z-10 flex flex-col items-center text-center"
      >
        <ScrollReveal direction="up" delay={0.1}>
          {/* Badge */}
          <HeroBadge
            text="Contact Us"
            icon="solar:phone-calling-bold-duotone"
            className="mb-6 inline-flex"
          />

          {/* Heading & Subtitle */}
          <HeroHeading
            className="w-full items-center lg:!items-center text-center [&>h1]:text-center [&>p]:mx-auto"
            title={
              <>
                Get in{" "}
                <span className="bg-linear-to-br from-[var(--color-accent)] via-[#c026d3] to-[var(--color-accent-soft)] bg-clip-text text-transparent">
                  Touch
                </span>
              </>
            }
            subtitle="Ready to deploy operational AI across your business? We're here to help you build, configure, and scale your AI workforce."
          />
        </ScrollReveal>
      </Container>
    </SectionWrapper>
  );
}
