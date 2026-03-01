import FloatingIconsBg from "@/components/FloatingIconsBg";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import InstallSection from "@/components/InstallSection";
import HighlightStats from "@/components/HighlightStats";
import HowItWorks from "@/components/HowItWorks";
import Features from "@/components/Features";
import ToolsGrid from "@/components/ToolsGrid";
import Security from "@/components/Security";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <FloatingIconsBg />
      <Navbar />
      <main>
        <Hero />
        <InstallSection />
        <HighlightStats />
        <HowItWorks />
        <Features />
        <ToolsGrid />
        <Security />
      </main>
      <Footer />
    </>
  );
}
