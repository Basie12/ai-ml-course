import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono, Sora } from "next/font/google";
import { SiteHeader } from "@/components/SiteHeader";
import { RevealOnScroll } from "@/components/RevealOnScroll";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", weight: ["400", "500", "600", "700"] });
const sora = Sora({ subsets: ["latin"], variable: "--font-sora", weight: ["600", "700", "800"] });
const mono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-jb-mono", weight: ["400", "500"] });

const DESCRIPTION =
  "A 24-week AI & machine learning engineering program for working professionals in the US. Build 6 real-world projects — from production ML APIs to RAG and multi-agent systems — taught live by a working AI/ML engineer.";

export const metadata: Metadata = {
  metadataBase: new URL("https://aiwithbassa.com"),
  title: "AI with Bassa · 24-Week AI & Machine Learning Engineering Program",
  description: DESCRIPTION,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: "AI with Bassa",
    title: "Don't just learn AI. Build what's next. — AI with Bassa",
    description: DESCRIPTION,
    url: "https://aiwithbassa.com/",
  },
  twitter: {
    card: "summary_large_image",
    title: "AI with Bassa · 24-Week AI & ML Engineering Program",
    description: DESCRIPTION,
  },
};

export const viewport: Viewport = {
  themeColor: "#080F25",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${sora.variable} ${mono.variable}`}>
      <body>
        <a className="skip-link" href="#main">
          Skip to content
        </a>
        <SiteHeader />
        {children}
        <RevealOnScroll />
      </body>
    </html>
  );
}
