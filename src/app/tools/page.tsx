import type { Metadata } from "next";
import FloatingIconsBg from "@/components/FloatingIconsBg";
import Navbar from "@/components/Navbar";
import ToolsGrid from "@/components/ToolsGrid";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Tools — 12+ DevOps Skills + 7 LLM Providers",
  description:
    "Terraform, Kubernetes, Docker, GitHub Actions, Ansible, and more. Works with OpenAI, Anthropic, Ollama, DeepSeek, Gemini, GitHub Copilot.",
  alternates: { canonical: "https://dojops.ai/tools" },
  openGraph: {
    title: "DojOps Tools — 12+ DevOps Skills + 7 LLM Providers",
    description:
      "Terraform, Kubernetes, Docker, GitHub Actions, Ansible, and more. Works with OpenAI, Anthropic, Ollama, DeepSeek, Mistral, Gemini, GitHub Copilot.",
    url: "https://dojops.ai/tools",
  },
};

export default function ToolsPage() {
  return (
    <>
      <FloatingIconsBg />
      <Navbar />
      <main>
        <ToolsGrid />
        <CTASection />
      </main>
      <Footer />
    </>
  );
}
