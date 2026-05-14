import { SectionWrapper, Container } from "@/components/layout";
import { SectionHeading, GlassPanel, GradientOrb } from "@/components/shared";
import { ScrollReveal } from "@/components/animations";

const BENTO_ITEMS = [
  {
    span: "lg:col-span-2",
    height: "min-h-48",
    title: "AI Co-pilot",
    description: "Your intelligent assistant that understands your codebase, docs, and team context — always ready.",
    accent: true,
  },
  {
    span: "lg:col-span-1",
    height: "min-h-48",
    title: "Live Collab",
    description: "Real-time cursors, comments, and presence — built into every surface.",
  },
  {
    span: "lg:col-span-1",
    height: "min-h-40",
    title: "Smart Alerts",
    description: "Proactive nudges when something needs your attention.",
  },
  {
    span: "lg:col-span-2",
    height: "min-h-40",
    title: "Knowledge Graph",
    description: "Auto-links people, documents, code, and decisions into a navigable web of context.",
  },
];

export function BentoSection() {
  return (
    <SectionWrapper spacing="lg" background="white" className="relative overflow-hidden">
      <GradientOrb color="primary" size="lg" className="bottom-0 right-0 translate-x-1/3 translate-y-1/3" />
      <Container size="lg" className="relative z-10">
        <SectionHeading
          label="Platform"
          title="Built for the way teams actually work"
          align="center"
          gradient
          className="mb-12"
        />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {BENTO_ITEMS.map((item) => (
            <ScrollReveal key={item.title} direction="up">
              <GlassPanel
                padding="lg"
                className={`flex flex-col justify-end gap-3 ${item.height} ${item.span} ${item.accent ? "border-[var(--color-accent)]/30" : ""}`}
              >
                {item.accent && (
                  <div className="w-8 h-8 rounded-lg bg-[var(--color-accent)] mb-2" aria-hidden="true" />
                )}
                <h3 className="font-semibold text-[var(--color-primary)] text-base">{item.title}</h3>
                <p className="text-[var(--color-muted-foreground)] text-sm leading-relaxed">{item.description}</p>
              </GlassPanel>
            </ScrollReveal>
          ))}
        </div>
      </Container>
    </SectionWrapper>
  );
}
