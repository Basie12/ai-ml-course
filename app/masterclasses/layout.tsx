import type { Metadata } from "next";

const DESCRIPTION =
  "Free live AI and machine learning masterclasses with a working AI/ML engineer. Build a real model, ask questions live, and get a roadmap into AI engineering.";

export const metadata: Metadata = {
  title: "Free AI/ML Masterclasses · AI with Bassa",
  description: DESCRIPTION,
  alternates: { canonical: "/masterclasses/" },
  openGraph: {
    type: "website",
    siteName: "AI with Bassa",
    title: "Free AI/ML Masterclasses · AI with Bassa",
    description: DESCRIPTION,
    url: "https://aiwithbassa.com/masterclasses/",
  },
};

export default function MasterclassesLayout({ children }: { children: React.ReactNode }) {
  return children;
}
