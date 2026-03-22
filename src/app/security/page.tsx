import type { Metadata } from "next";
import FloatingIconsBg from "@/components/FloatingIconsBg";
import Navbar from "@/components/Navbar";
import Security from "@/components/Security";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Security — 8 Layers of Defense for AI-Generated Infrastructure",
  description:
    "Structured output enforcement, Zod validation, sandboxed writes, hash-chained audit trails. Enterprise-grade security for AI DevOps.",
  alternates: { canonical: "https://dojops.ai/security" },
  openGraph: {
    title: "DojOps Security — 8 Layers of Defense for AI-Generated Infrastructure",
    description:
      "Structured output enforcement, Zod validation, sandboxed writes, hash-chained audit trails. Enterprise-grade security for AI DevOps.",
    url: "https://dojops.ai/security",
  },
};

export default function SecurityPage() {
  return (
    <>
      <FloatingIconsBg />
      <Navbar />
      <main>
        <h1 className="sr-only">
          DojOps security — 8 layers of defense for AI-generated infrastructure
        </h1>
        <Security />
        <CTASection />
      </main>
      <Footer />
    </>
  );
}
