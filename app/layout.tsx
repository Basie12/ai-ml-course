import type { Metadata } from "next";
import { Inter, Inter_Tight, JetBrains_Mono } from "next/font/google";
import { SiteHeader } from "@/components/SiteHeader";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["400", "500", "600"],
});

const interTight = Inter_Tight({
  subsets: ["latin"],
  variable: "--font-inter-tight",
  weight: ["500", "600", "700", "800"],
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jb-mono",
  weight: ["500", "600"],
});

export const metadata: Metadata = {
  title: "AI with Bassa · 24-Week AI & ML Engineer Program",
  description:
    "A 24-week, project-based AI & ML engineering program for working professionals in the US — production ML, MLOps, GenAI and agents, taught live by a working engineer.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${interTight.variable} ${mono.variable}`}
    >
      <body
        style={
          {
            ["--font-body" as string]: "var(--font-inter), Inter, system-ui, sans-serif",
            ["--font-display" as string]:
              "var(--font-inter-tight), 'Inter Tight', sans-serif",
            ["--font-mono" as string]:
              "var(--font-jb-mono), 'JetBrains Mono', ui-monospace, monospace",
            fontFamily: "var(--font-inter), Inter, system-ui, sans-serif",
          } as React.CSSProperties
        }
      >
        <SiteHeader />
        {children}
      </body>
    </html>
  );
}
