import type { Metadata } from "next";
import {
  ContactHeroSection,
  ContactInfoSection,
  ContactFormSection,
} from "@/components/sections/contact";

export const metadata: Metadata = {
  title: "Contact — Zaby",
  description:
    "Get in touch with Zaby. Talk to our team about Agent Squad, Open Agents, Agentic Workflows, enterprise deployment, or partnerships.",
};

export default function ContactPage() {
  return (
    <main className="relative antialiased">
      <ContactHeroSection />
      <ContactInfoSection />
      <ContactFormSection />
    </main>
  );
}
