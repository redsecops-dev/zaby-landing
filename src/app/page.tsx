import {
  HeroSection,
  FeaturesSection,
  IriaPricingSection,
  DesignInspirationSection,
  AiSaasShowcase,
  UseCasesSection,
  TrustStripSection,
} from "@/components/sections";
import Cta from "@/components/sections/cta/Cta";

export default function Home() {
  return (
    <>
      <HeroSection />
      {/* <TrustStripSection /> */}
      <FeaturesSection />
      <AiSaasShowcase />
      <UseCasesSection />
      <IriaPricingSection />
      <DesignInspirationSection />
      <Cta/>
    </>
  );
}
