import type { Metadata } from "next";
import { Space_Grotesk, Manrope, IBM_Plex_Mono } from "next/font/google";
import { SiteHeader } from "@/components/SiteHeader";
import "./globals.css";

const space = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space",
  weight: ["500", "600", "700"],
});

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  weight: ["400", "500", "600", "700"],
});

const mono = IBM_Plex_Mono({
  subsets: ["latin"],
  variable: "--font-mono-face",
  weight: ["500", "600"],
});

export const metadata: Metadata = {
  title: "BassaCourse · AI & ML Engineer Accelerator",
  description:
    "A 24-week practitioner program for software engineers ready for mid-to-senior AI/ML Engineering roles.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${space.variable} ${manrope.variable} ${mono.variable}`}
    >
      <body
        style={
          {
            ["--font-display" as string]:
              "var(--font-space), 'Space Grotesk', sans-serif",
            ["--font-body" as string]: "var(--font-manrope), Manrope, sans-serif",
            ["--font-mono" as string]:
              "var(--font-mono-face), 'IBM Plex Mono', monospace",
          } as React.CSSProperties
        }
      >
        <SiteHeader />
        {children}
      </body>
    </html>
  );
}
