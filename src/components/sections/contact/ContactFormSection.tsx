"use client";

import { useState } from "react";
import { Icon } from "@iconify/react";
import { cn } from "@/lib/utils";
import { GradientOrb } from "@/components/shared/GradientOrb";
import { FadeUp } from "@/components/animations";

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
      // "https://prod-api.zaby.io/api/v1/public/contact",


    try {
      const res = await fetch(
        "http://192.168.68.68:9080/api/v1/public/contact",
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
        // Surface a human-readable error but still treat any non-2xx as an error
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
    "w-full rounded-xl border border-white/60 bg-white/50 px-4 py-3 text-sm text-text-primary placeholder:text-text-secondary/50 backdrop-blur-sm transition-all duration-150 outline-none focus:border-accent/50 focus:bg-white/70 focus:ring-2 focus:ring-accent/20";

  return (
    <section className="relative py-20 md:py-28 overflow-hidden">
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

      <div className="relative mx-auto w-full max-w-3xl px-4 sm:px-6 lg:px-8">
        <FadeUp>
          {/* Section heading */}
          <div className="mb-10 text-center">
            <h2 className="text-3xl font-semibold tracking-tight text-text-primary md:text-4xl">
              Send us a{" "}
              <span className="bg-linear-to-br from-accent via-[#c026d3] to-accent-soft bg-clip-text text-transparent">
                message
              </span>
            </h2>
            <p className="mt-3 text-base font-light text-text-secondary">
              Fill out the form below and we&apos;ll get back to you within 24
              hours.
            </p>
          </div>
        </FadeUp>

        {/* Success state */}
        {status === "success" ? (
          <FadeUp>
            <div className="flex flex-col items-center gap-4 rounded-2xl border border-emerald-200/60 bg-emerald-50/60 px-8 py-14 text-center backdrop-blur-md">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-emerald-500/10">
                <Icon
                  icon="solar:check-circle-bold-duotone"
                  width={32}
                  height={32}
                  className="text-emerald-500"
                />
              </div>
              <h3 className="text-xl font-semibold text-text-primary">
                Message sent!
              </h3>
              <p className="max-w-sm text-sm font-light text-text-secondary">
                Thanks for reaching out. Our team will review your message and
                get back to you within 24 hours.
              </p>
              <button
                onClick={() => setStatus("idle")}
                className="mt-2 rounded-full border border-border/50 bg-white/60 px-5 py-2 text-sm font-medium text-text-primary backdrop-blur-md transition-colors hover:bg-white/80"
              >
                Send another message
              </button>
            </div>
          </FadeUp>
        ) : (
          <FadeUp>
            <form
              onSubmit={handleSubmit}
              className="rounded-2xl border border-white/60 bg-white/50 p-8 backdrop-blur-md shadow-xl shadow-purple-100/20 md:p-10"
            >
              {/* Name row */}
              <div className="grid gap-5 sm:grid-cols-2">
                <div className="flex flex-col gap-1.5">
                  <label
                    htmlFor="firstName"
                    className="text-sm font-medium text-text-primary"
                  >
                    First Name <span className="text-accent">*</span>
                  </label>
                  <input
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
                  <label
                    htmlFor="lastName"
                    className="text-sm font-medium text-text-primary"
                  >
                    Last Name <span className="text-accent">*</span>
                  </label>
                  <input
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
                <label
                  htmlFor="email"
                  className="text-sm font-medium text-text-primary"
                >
                  Email Address <span className="text-accent">*</span>
                </label>
                <input
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
                <label
                  htmlFor="company"
                  className="text-sm font-medium text-text-primary"
                >
                  Company{" "}
                  <span className="text-text-secondary/60">(Optional)</span>
                </label>
                <input
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
                <label
                  htmlFor="subject"
                  className="text-sm font-medium text-text-primary"
                >
                  Subject <span className="text-accent">*</span>
                </label>
                <div className="relative">
                  <select
                    id="subject"
                    name="subject"
                    required
                    value={form.subject}
                    onChange={handleChange}
                    className={cn(
                      inputBase,
                      "cursor-pointer appearance-none pr-10",
                      !form.subject && "text-text-secondary/50"
                    )}
                  >
                    <option value="" disabled>
                      How can we help?
                    </option>
                    {SUBJECTS.map((s) => (
                      <option key={s} value={s} className="text-text-primary">
                        {s}
                      </option>
                    ))}
                  </select>
                  <Icon
                    icon="solar:alt-arrow-down-bold"
                    width={16}
                    height={16}
                    className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-text-secondary/60"
                  />
                </div>
              </div>

              {/* Message */}
              <div className="mt-5 flex flex-col gap-1.5">
                <label
                  htmlFor="message"
                  className="text-sm font-medium text-text-primary"
                >
                  Message <span className="text-accent">*</span>
                </label>
                <textarea
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
              <button
                type="submit"
                disabled={status === "loading"}
                className="mt-7 flex w-full items-center justify-center gap-2 rounded-full bg-(--color-button-primary-bg) px-8 py-3.5 text-sm font-medium text-white shadow-[rgba(76,29,149,0.5)_0px_10px_30px_-10px] transition-all duration-200 hover:bg-(--color-button-primary-hover) hover:shadow-[rgba(76,29,149,0.4)_0px_14px_36px_-10px] disabled:cursor-not-allowed disabled:opacity-60"
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
              </button>

              <p className="mt-4 text-center text-xs text-text-secondary/60">
                By submitting, you agree to our{" "}
                <a
                  href="/privacy"
                  className="underline underline-offset-2 transition-colors hover:text-accent"
                >
                  Privacy Policy
                </a>
                .
              </p>
            </form>
          </FadeUp>
        )}
      </div>
    </section>
  );
}
