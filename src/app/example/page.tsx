import KORTEXAINeuralArchitecture from "./Hero";
import IriaPricing from "./IriaPricing";
import PremiumDigitalInspirationLayout from "./Premium-Digital-Inspiration-Layout";
import JoinTheMovement from "./Join-the-Movement";
import DataSynchronyVisualization from "./Data-Synchrony-Visualization";
import FutureWorkspacesArchitecturalConcepts from "./Future-Workspaces-Architectural-Concepts";
import DesignInspirationLayoutRemixed from "./Design-Inspiration-Layout---Remixed";

export default function ExamplePage() {
  return (
    <>
      <style>{`
        body {
          background-color: var(--background);
          background-image: url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M20 20.5V18H17.5V20.5H20ZM20 20.5V23H22.5V20.5H20Z' fill='%23E5E7EB' fill-opacity='0.4' fill-rule='evenodd'/%3E%3C/svg%3E");
          transition: background-color 0.3s ease;
        }
        
        @media (prefers-color-scheme: dark) {
          body {
            background-image: url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M20 20.5V18H17.5V20.5H20ZM20 20.5V23H22.5V20.5H20Z' fill='%231E293B' fill-opacity='0.3' fill-rule='evenodd'/%3E%3C/svg%3E");
          }
        }
      `}</style>
      <KORTEXAINeuralArchitecture />
      <PremiumDigitalInspirationLayout />
      <DataSynchronyVisualization/>
      <FutureWorkspacesArchitecturalConcepts/>
      <JoinTheMovement/>
      <IriaPricing />
      <DesignInspirationLayoutRemixed />
      {/* <IriaPricing /> */}
    </>
  );
}
