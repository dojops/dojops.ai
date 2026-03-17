import type { Metadata } from "next";
import FloatingIconsBg from "@/components/FloatingIconsBg";
import Navbar from "@/components/Navbar";
import InstallSection from "@/components/InstallSection";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Install DojOps — npm, Homebrew, curl, Docker",
  description:
    "Install DojOps in 30 seconds via npm, Homebrew, curl, or Docker. Configure your LLM provider and start generating DevOps configs.",
  alternates: { canonical: "https://dojops.ai/install" },
  openGraph: {
    title: "Install DojOps — npm, Homebrew, curl, Docker",
    description:
      "Install DojOps in 30 seconds via npm, Homebrew, curl, or Docker. Configure your LLM provider and start generating DevOps configs.",
    url: "https://dojops.ai/install",
  },
};

export default function InstallPage() {
  return (
    <>
      <FloatingIconsBg />
      <Navbar />
      <main>
        <InstallSection />
        <CTASection />
      </main>
      <Footer />
    </>
  );
}
