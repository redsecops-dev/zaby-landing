import { SectionWrapper, Container } from "@/components/layout";
import { Stagger } from "@/components/animations";
import { FadeUp } from "@/components/animations";

const LOGOS = [
  { name: "Vercel", abbr: "▲" },
  { name: "Linear", abbr: "⬡" },
  { name: "Stripe", abbr: "S" },
  { name: "Notion", abbr: "N" },
  { name: "Figma", abbr: "F" },
  { name: "GitHub", abbr: "G" },
];

export function LogosSection() {
  return (
    <SectionWrapper spacing="sm" background="muted">
      <Container size="lg">
        <FadeUp>
          <p className="text-center text-sm font-medium text-[var(--color-muted-foreground)] mb-8 tracking-wide uppercase">
            Trusted by teams at
          </p>
        </FadeUp>
        <Stagger className="flex flex-wrap items-center justify-center gap-10">
          {LOGOS.map((logo) => (
            <div
              key={logo.name}
              className="flex items-center gap-2 text-[var(--color-muted-foreground)] hover:text-[var(--color-primary)] transition-colors"
              title={logo.name}
            >
              <span className="text-2xl font-bold leading-none">{logo.abbr}</span>
              <span className="text-base font-semibold">{logo.name}</span>
            </div>
          ))}
        </Stagger>
      </Container>
    </SectionWrapper>
  );
}
