import { SectionWrapper, Container } from "@/components/layout";
import { SectionHeading } from "@/components/shared";
import { ScrollReveal } from "@/components/animations";
import { cn } from "@/lib/utils";

const STEPS = [
  {
    step: 1,
    title: "Connect your tools",
    description: "Link GitHub, Slack, Notion, Jira and more in minutes. Zaby ingests your existing knowledge base automatically.",
  },
  {
    step: 2,
    title: "AI learns your context",
    description: "Our context engine maps relationships between docs, code, and conversations — so every answer is specific to your team.",
  },
  {
    step: 3,
    title: "Ship faster, together",
    description: "From AI-assisted code reviews to auto-generated standups, Zaby removes the busywork and keeps your team in flow.",
  },
];

export function WorkflowSection() {
  return (
    <SectionWrapper id="workflow" spacing="lg" background="muted">
      <Container size="md">
        <SectionHeading
          label="How it works"
          title="From setup to flow in minutes"
          align="center"
          gradient
          className="mb-16"
        />
        <div className="flex flex-col gap-0">
          {STEPS.map((s, i) => (
            <ScrollReveal key={s.step} delay={i * 0.15} direction="up">
              <div className="flex gap-6 pb-12 relative">
                {i < STEPS.length - 1 && (
                  <div
                    className="absolute left-6 top-12 bottom-0 w-px bg-[var(--color-border)]"
                    aria-hidden="true"
                  />
                )}
                <div className={cn(
                  "flex-none w-12 h-12 rounded-full flex items-center justify-center text-sm font-bold z-10",
                  "bg-[var(--color-accent)] text-white shadow-[var(--shadow-glow-accent)]"
                )}>
                  {s.step}
                </div>
                <div className="flex flex-col gap-2 pt-2">
                  <h3 className="font-semibold text-[var(--color-primary)] text-lg">{s.title}</h3>
                  <p className="text-[var(--color-muted-foreground)] text-sm leading-relaxed max-w-prose">{s.description}</p>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </Container>
    </SectionWrapper>
  );
}
