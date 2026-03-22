import type { Metadata } from "next";
import FloatingIconsBg from "@/components/FloatingIconsBg";
import Navbar from "@/components/Navbar";
import PipelineFlow from "@/components/PipelineFlow";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "How DojOps Works — Describe, Review, Apply",
  description:
    "Three steps to AI-powered DevOps: describe what you need, review the generated config, apply with sandboxed execution and approval workflows.",
  alternates: { canonical: "https://dojops.ai/how-it-works" },
  openGraph: {
    title: "How DojOps Works — Describe, Review, Apply",
    description:
      "Three steps to AI-powered DevOps: describe what you need, review the generated config, apply with sandboxed execution and approval workflows.",
    url: "https://dojops.ai/how-it-works",
  },
};

export default function HowItWorksPage() {
  return (
    <>
      <FloatingIconsBg />
      <Navbar />
      <main>
        <h1 className="sr-only">How DojOps works — from prompt to production</h1>
        <PipelineFlow />
        <CTASection />
      </main>
      <Footer />
    </>
  );
}
