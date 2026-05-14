import FooterSection from "../sections/footer/Footer";
import { Navbar } from "./Navbar";

interface PageShellProps {
  children: React.ReactNode;
}

export function PageShell({ children }: PageShellProps) {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1" role="main">
        {children}
      </main>
      <FooterSection/>
    </div>
  );
}
