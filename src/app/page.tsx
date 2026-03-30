import FloatingIconsBg from "@/components/FloatingIconsBg";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import HighlightStats from "@/components/HighlightStats";
import Platform from "@/components/Platform";
import PromoOffer from "@/components/PromoOffer";
import Features from "@/components/Features";
import PipelineFlow from "@/components/PipelineFlow";
import ToolsGrid from "@/components/ToolsGrid";
import Security from "@/components/Security";
import InstallSection from "@/components/InstallSection";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";

export default function Home() {
  return (
    <>
      <FloatingIconsBg />
      <Navbar />
      <main>
        <Hero />
        <HighlightStats />
        <Platform />
        <PromoOffer />
        <Features />
        <PipelineFlow />
        <ToolsGrid />
        <Security />
        <InstallSection />
        <CTASection />
      </main>
      <Footer />
      <ScrollToTop />
    </>
  );
}
