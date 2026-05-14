import { SectionWrapper, Container } from "@/components/layout";
import { SectionHeading } from "@/components/shared";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FAQS = [
  {
    question: "What makes Zaby different from Notion or Confluence?",
    answer: "Zaby is built AI-first Ã¢â¬â every surface has context-aware AI that understands your team's docs, code, and conversations. It's not a wiki with AI tacked on; it's a workspace designed to think with you.",
  },
  {
    question: "Is my data used to train AI models?",
    answer: "No. Your data is never used to train external AI models. All inference runs on isolated compute with zero data retention after responses.",
  },
  {
    question: "Can I self-host Zaby?",
    answer: "Yes Ã¢â¬â Enterprise plans include a self-hosted option with full deployment support, single-tenant infrastructure, and your choice of cloud provider.",
  },
  {
    question: "Which integrations are supported at launch?",
    answer: "At launch: GitHub, GitLab, Slack, Jira, Linear, Notion, Google Workspace, and Figma. More than 30 additional integrations are available via our REST API.",
  },
  {
    question: "How does billing work for annual plans?",
    answer: "Annual plans are billed once per year at a 20% discount versus monthly. You can upgrade, downgrade, or cancel at any time — unused months are prorated."
  },
  {
    question: "Is Zaby SOC 2 compliant?",
    answer: "Yes. Zaby is SOC 2 Type II certified. We also support GDPR, HIPAA-ready configurations, and SSO/SCIM provisioning on Enterprise plans.",
  },
  {
    question: "How long does onboarding take?",
    answer: "Most teams are fully productive within a day. Our guided setup connects your tools, imports existing docs, and lets the AI context engine start learning immediately.",
  },
  {
    question: "Do you offer a free trial of Pro?",
    answer: "Yes Ã¢â¬â every new account gets a 14-day Pro trial, no credit card required.",
  },
];

export function FaqSection() {
  return (
    <SectionWrapper id="faq" spacing="lg" background="muted">
      <Container size="md">
        <SectionHeading
          label="FAQ"
          title="Questions? We have answers."
          align="center"
          gradient
          className="mb-12"
        />
        <Accordion type="single" collapsible className="flex flex-col gap-2">
          {FAQS.map((faq, i) => (
            <AccordionItem
              key={i}
              value={`item-${i}`}
              className="glass-panel px-6 border-0"
            >
              <AccordionTrigger className="text-sm font-semibold text-[var(--color-primary)] py-5 hover:no-underline">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-sm text-[var(--color-muted-foreground)] leading-relaxed pb-5">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </Container>
    </SectionWrapper>
  );
}
