import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import HowItWorks from "@/components/HowItWorks";
import Features from "@/components/Features";
import ToolsGrid from "@/components/ToolsGrid";
import Security from "@/components/Security";
import InstallSection from "@/components/InstallSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <HowItWorks />
        <Features />
        <ToolsGrid />
        <Security />
        <InstallSection />
      </main>
      <Footer />
    </>
  );
}
