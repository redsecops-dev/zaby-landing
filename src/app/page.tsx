import {
  HeroSection,
  FeaturesSection,
  DataSynchronySection,
  FutureWorkspacesSection,
  IriaPricingSection,
  DesignInspirationSection,
  JoinTheMovementSection,
  InfrastructureSection,
} from "@/components/sections";

export default function Home() {
  return (
    <>
      <HeroSection />
      <FeaturesSection />
      <DataSynchronySection />
      <FutureWorkspacesSection />
      <IriaPricingSection />
      {/* <InfrastructureSection /> */}
      <JoinTheMovementSection />
      <DesignInspirationSection />
      {/* <PricingSection /> */}
      {/* <TestimonialsSection /> */}
      {/* <FaqSection /> */}
      {/* <CtaSection /> */}
    </>
  );
}
