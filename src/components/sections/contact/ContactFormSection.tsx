"use client";

import React, { useState } from "react";
import { Icon } from "@iconify/react";
import { cn } from "@/lib/utils";
import { SectionWrapper, Container } from "@/components/layout";
import { GlassPanel, GradientOrb, SectionHeading, GridBackground } from "@/components/shared";
import { ScrollReveal } from "@/components/animations";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select } from "@/components/ui/select";


interface ContactFormData {
  firstName: string;
  lastName: string;
  email: string;
  company: string;
  subject: string;
  message: string;
}

type SubmitStatus = "idle" | "loading" | "success" | "error";

const SUBJECTS = [
  "General Inquiry",
  "Enterprise Sales",
  "Partnerships & Integrations",
  "Technical Support",
  "Agent Squad — Demo Request",
  "Open Agents — Demo Request",
  "Agentic Workflows — Demo Request",
  "Agent Memory — Demo Request",
  "AI SaaS Workspace — Demo Request",
  "Pricing & Plans",
  "Other",
];

const INITIAL_FORM: ContactFormData = {
  firstName: "",
  lastName: "",
  email: "",
  company: "",
  subject: "",
  message: "",
};

export function ContactFormSection() {
  const [form, setForm] = useState<ContactFormData>(INITIAL_FORM);
  const [status, setStatus] = useState<SubmitStatus>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  function handleChange(
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    setErrorMessage("");

    try {
      const res = await fetch(
        "https://prod-api.zaby.io/api/v1/public/contact",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            firstName: form.firstName.trim(),
            lastName: form.lastName.trim(),
            email: form.email.trim(),
            company: form.company.trim() || undefined,
            subject: form.subject,
            message: form.message.trim(),
          }),
        }
      );

      if (res.ok) {
        setStatus("success");
        setForm(INITIAL_FORM);
      } else {
        const data = await res.json().catch(() => null);
        setErrorMessage(
          data?.message ??
            "Something went wrong. Please try again or email us directly at support@zaby.io."
        );
        setStatus("error");
      }
    } catch {
      setErrorMessage(
        "Unable to send your message. Please check your connection or email us at support@zaby.io."
      );
      setStatus("error");
    }
  }

  const inputBase =
    "w-full rounded-xl border border-[var(--color-border-strong)]/50 bg-white/50 px-4 py-3 text-sm text-[var(--color-text-primary)] placeholder:text-[var(--color-text-secondary)]/50 backdrop-blur-sm transition-all duration-150 outline-none focus:border-[var(--color-accent)]/50 focus:bg-white/70 focus:ring-2 focus:ring-[var(--color-accent)]/20";

  return (
    <SectionWrapper id="contact-form" spacing="lg" background="transparent" className="relative overflow-hidden">
      {/* Background subtle grid pattern */}
      <GridBackground variant="dots" opacity="light" className="opacity-[0.03] z-0" />

      {/* Background orbs */}
      <GradientOrb
        color="pink"
        size="xl"
        className="absolute -left-40 top-1/2 -translate-y-1/2 opacity-10"
      />
      <GradientOrb
        color="purple"
        size="lg"
        className="absolute -right-32 bottom-0 opacity-10"
      />

      <Container size="sm" className="relative z-10">
        <ScrollReveal direction="up" delay={0.1}>
          <SectionHeading
            title={
              <>
                Send us a{" "}
                <span className="bg-linear-to-br from-[var(--color-accent)] via-[#c026d3] to-[var(--color-accent-soft)] bg-clip-text text-transparent font-semibold">
                  message
                </span>
              </>
            }
            subtitle="Fill out the form below and we'll get back to you within 24 hours."
            className="mb-10"
            align="center"
          />
        </ScrollReveal>

        {/* Success state */}
        {status === "success" ? (
          <ScrollReveal direction="up" delay={0.15}>
            <div className="flex flex-col items-center gap-4 rounded-2xl border border-emerald-200/60 bg-emerald-50/60 px-8 py-14 text-center backdrop-blur-md">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-emerald-500/10">
                <Icon
                  icon="solar:check-circle-bold-duotone"
                  width={32}
                  height={32}
                  className="text-emerald-500"
                />
              </div>
              <h3 className="text-xl font-semibold text-[var(--color-text-primary)]">
                Message sent!
              </h3>
              <p className="max-w-sm text-sm font-light text-[var(--color-text-secondary)]">
                Thanks for reaching out. Our team will review your message and
                get back to you within 24 hours.
              </p>
            </div>
          </ScrollReveal>
        ) : (
          <ScrollReveal direction="up" delay={0.15}>
            <GlassPanel
              padding="none"
              className="border border-[var(--color-glass-border)] bg-white/60 backdrop-blur-md rounded-2xl shadow-xl shadow-purple-100/5"
            >
              <form onSubmit={handleSubmit} className="p-8 md:p-10 text-left">
                {/* Name row */}
                <div className="grid gap-5 sm:grid-cols-2">
                  <div className="flex flex-col gap-1.5">
                    <Label
                      htmlFor="firstName"
                      className="text-sm font-semibold text-[var(--color-text-primary)]"
                    >
                      First Name <span className="text-[var(--color-accent-soft)]">*</span>
                    </Label>
                    <Input
                      id="firstName"
                      name="firstName"
                      type="text"
                      required
                      autoComplete="given-name"
                      placeholder="John"
                      value={form.firstName}
                      onChange={handleChange}
                      className={inputBase}
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <Label
                      htmlFor="lastName"
                      className="text-sm font-semibold text-[var(--color-text-primary)]"
                    >
                      Last Name <span className="text-[var(--color-accent-soft)]">*</span>
                    </Label>
                    <Input
                      id="lastName"
                      name="lastName"
                      type="text"
                      required
                      autoComplete="family-name"
                      placeholder="Doe"
                      value={form.lastName}
                      onChange={handleChange}
                      className={inputBase}
                    />
                  </div>
                </div>

                {/* Email */}
                <div className="mt-5 flex flex-col gap-1.5">
                  <Label
                    htmlFor="email"
                    className="text-sm font-semibold text-[var(--color-text-primary)]"
                  >
                    Email Address <span className="text-[var(--color-accent-soft)]">*</span>
                  </Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    required
                    autoComplete="email"
                    placeholder="john@company.com"
                    value={form.email}
                    onChange={handleChange}
                    className={inputBase}
                  />
                </div>

                {/* Company */}
                <div className="mt-5 flex flex-col gap-1.5">
                  <Label
                    htmlFor="company"
                    className="text-sm font-semibold text-[var(--color-text-primary)]"
                  >
                    Company{" "}
                    <span className="text-[var(--color-text-secondary)]/60">(Optional)</span>
                  </Label>
                  <Input
                    id="company"
                    name="company"
                    type="text"
                    autoComplete="organization"
                    placeholder="Your Company"
                    value={form.company}
                    onChange={handleChange}
                    className={inputBase}
                  />
                </div>

                {/* Subject */}
                <div className="mt-5 flex flex-col gap-1.5">
                  <Label
                    htmlFor="subject"
                    className="text-sm font-semibold text-[var(--color-text-primary)]"
                  >
                    Subject <span className="text-[var(--color-accent-soft)]">*</span>
                  </Label>
                  <Select
                    id="subject"
                    required
                    value={form.subject}
                    onValueChange={(val) => setForm((prev) => ({ ...prev, subject: val }))}
                    options={SUBJECTS}
                    placeholder="How can we help?"
                    className={inputBase}
                  />
                </div>

                {/* Message */}
                <div className="mt-5 flex flex-col gap-1.5">
                  <Label
                    htmlFor="message"
                    className="text-sm font-semibold text-[var(--color-text-primary)]"
                  >
                    Message <span className="text-[var(--color-accent-soft)]">*</span>
                  </Label>
                  <Textarea
                    id="message"
                    name="message"
                    required
                    rows={5}
                    placeholder="Tell us about your use case, the agents you want to deploy, or anything else we should know…"
                    value={form.message}
                    onChange={handleChange}
                    className={cn(inputBase, "resize-none")}
                  />
                </div>

                {/* Error banner */}
                {status === "error" && (
                  <div className="mt-4 flex items-start gap-3 rounded-xl border border-red-200/60 bg-red-50/60 px-4 py-3 text-sm text-red-600">
                    <Icon
                      icon="solar:danger-triangle-bold-duotone"
                      width={18}
                      height={18}
                      className="mt-0.5 shrink-0"
                    />
                    <span>{errorMessage}</span>
                  </div>
                )}

                {/* Submit */}
                <Button
                  type="submit"
                  disabled={status === "loading"}
                  className="mt-7 cursor-pointer flex w-full items-center justify-center gap-2 rounded-full bg-[var(--color-button-primary-bg)] hover:bg-[var(--color-button-primary-hover)] text-white shadow-[rgba(76,29,149,0.2)_0px_10px_30px_-10px] transition-all duration-200 disabled:cursor-not-allowed disabled:opacity-60 h-auto py-3.5"
                >
                  {status === "loading" ? (
                    <>
                      <Icon
                        icon="solar:spinner-bold-duotone"
                        width={18}
                        height={18}
                        className="animate-spin"
                      />
                      Sending…
                    </>
                  ) : (
                    <>
                      Send Message
                      <Icon
                        icon="solar:arrow-right-bold"
                        width={16}
                        height={16}
                      />
                    </>
                  )}
                </Button>

                <p className="mt-4 text-center text-xs text-[var(--color-text-secondary)]/60">
                  By submitting, you agree to our{" "}
                  <a
                    href="/privacy"
                    className="underline underline-offset-2 transition-colors hover:text-[var(--color-accent-soft)]"
                  >
                    Privacy Policy
                  </a>
                  .
                </p>
              </form>
            </GlassPanel>
          </ScrollReveal>
        )}
      </Container>
    </SectionWrapper>
  );
}

