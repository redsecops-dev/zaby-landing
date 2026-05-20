import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { PageShell } from "@/components/layout";
import { BackgroundImage } from "@/components/shared/BackgroundImage";
import { CookieConsent } from "@/components/shared/CookieConsent";
import { siteConfig } from "@/config/site";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: siteConfig.title,
  description: siteConfig.description,
  metadataBase: new URL(siteConfig.url),
  openGraph: {
    title: siteConfig.title,
    description: siteConfig.description,
    url: siteConfig.url,
    siteName: siteConfig.name,
    images: [{ url: siteConfig.ogImage }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.title,
    description: siteConfig.description,
    images: [siteConfig.ogImage],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body>
        <BackgroundImage />
        <PageShell>{children}</PageShell>
        <CookieConsent />
      </body>
    </html>
  );
}
