import type { ReactNode } from "react";
import type { Metadata } from "next";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { site } from "@/content/site";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
  variable: "--font-inter",
  fallback: ["system-ui", "sans-serif"],
});
const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["600", "700", "800"],
  display: "swap",
  variable: "--font-jakarta",
  fallback: ["system-ui", "sans-serif"],
});

const title =
  "Cloud Krown Operations | AI + human back office for property management";

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  ),
  title,
  description: site.hero.description,
  applicationName: site.brand.name,
  openGraph: {
    type: "website",
    siteName: site.brand.name,
    title,
    description: site.hero.description,
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${jakarta.variable}`}>
      <body id="top">
        <a
          href="#main-content"
          className="sr-only z-50 rounded-control bg-white text-brand-700 focus:fixed focus:left-5 focus:top-4 focus:not-sr-only focus:px-5 focus:py-3"
        >
          {site.accessibility.skipLink}
        </a>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
