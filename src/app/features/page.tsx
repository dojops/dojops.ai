import type { Metadata } from "next";
import FloatingIconsBg from "@/components/FloatingIconsBg";
import Navbar from "@/components/Navbar";
import Features from "@/components/Features";
import HighlightStats from "@/components/HighlightStats";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Features — AI-Powered DevOps Automation",
  description:
    "12+ DevOps skills, 17 specialist agents, 10 security scanners, 6 LLM providers. Schema-validated configs with sandboxed execution.",
  alternates: { canonical: "https://dojops.ai/features" },
  openGraph: {
    title: "DojOps Features — AI-Powered DevOps Automation",
    description:
      "12+ DevOps skills, 17 specialist agents, 10 security scanners, 6 LLM providers. Schema-validated configs with sandboxed execution.",
    url: "https://dojops.ai/features",
  },
};

export default function FeaturesPage() {
  return (
    <>
      <FloatingIconsBg />
      <Navbar />
      <main>
        <HighlightStats />
        <Features />
        <CTASection />
      </main>
      <Footer />
    </>
  );
}
