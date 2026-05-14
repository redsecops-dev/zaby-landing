import { SectionWrapper, Container } from "@/components/layout";
import { SectionHeading, GlassPanel } from "@/components/shared";
import { HoverLift } from "@/components/animations";

const TESTIMONIALS = [
  {
    quote: "Zaby replaced four tools we were juggling. Our team ships 2x faster and actually enjoys collaboration now.",
    author: "Priya Sharma",
    role: "CTO",
    company: "Clearwave",
    avatarInitials: "PS",
  },
  {
    quote: "The AI context engine is uncanny — it knows exactly what we need before we ask. It's like having a brilliant team member who reads everything.",
    author: "Marcus Chen",
    role: "Engineering Lead",
    company: "Volta Labs",
    avatarInitials: "MC",
  },
  {
    quote: "We onboard new engineers in half the time now. The knowledge graph is a game changer for institutional memory.",
    author: "Aisha Okonkwo",
    role: "Head of Product",
    company: "Meridian AI",
    avatarInitials: "AO",
  },
];

export function TestimonialsSection() {
  return (
    <SectionWrapper spacing="lg" background="white">
      <Container size="lg">
        <SectionHeading
          label="What teams say"
          title="Loved by engineering & product teams"
          align="center"
          gradient
          className="mb-12"
        />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TESTIMONIALS.map((t) => (
            <HoverLift key={t.author}>
              <GlassPanel padding="lg" className="flex flex-col gap-4 h-full">
                <p className="text-[var(--color-primary)] text-sm leading-relaxed flex-1">
                  &ldquo;{t.quote}&rdquo;
                </p>
                <div className="flex items-center gap-3 pt-2 border-t border-[var(--color-border)]">
                  <div className="w-9 h-9 rounded-full bg-[var(--color-accent)] flex items-center justify-center text-white text-xs font-bold">
                    {t.avatarInitials}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-[var(--color-primary)]">{t.author}</p>
                    <p className="text-xs text-[var(--color-muted-foreground)]">{t.role}, {t.company}</p>
                  </div>
                </div>
              </GlassPanel>
            </HoverLift>
          ))}
        </div>
      </Container>
    </SectionWrapper>
  );
}
