import type { Metadata } from "next";
import FloatingIconsBg from "@/components/FloatingIconsBg";
import Navbar from "@/components/Navbar";
import Features from "@/components/Features";
import HighlightStats from "@/components/HighlightStats";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Features — AI-Powered Automation",
  description:
    "38 DevOps skills, 32 specialist agents, 10 security scanners, 7 LLM providers. Schema-validated configs with sandboxed execution.",
  alternates: { canonical: "https://dojops.ai/features" },
  openGraph: {
    title: "DojOps Features — AI-Powered Automation",
    description:
      "38 DevOps skills, 32 specialist agents, 10 security scanners, 7 LLM providers. Schema-validated configs with sandboxed execution.",
    url: "https://dojops.ai/features",
  },
};

export default function FeaturesPage() {
  return (
    <>
      <FloatingIconsBg />
      <Navbar />
      <main>
        <h1 className="sr-only">DojOps features — AI-powered automation</h1>
        <HighlightStats />
        <Features />
        <CTASection />
      </main>
      <Footer />
    </>
  );
}
