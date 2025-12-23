import { Navbar } from "@/components/Navbar";
import { HeroSection } from "@/components/HeroSection";
import { SmartDrillSection } from "@/components/SmartDrillSection";
import { ServicesGrid } from "@/components/ServicesGrid";
import { SocialProof } from "@/components/SocialProof";
import { LeadCapture } from "@/components/LeadCapture";
import { Footer } from "@/components/Footer";

const Index = () => {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      <SmartDrillSection />
      <ServicesGrid />
      <SocialProof />
      <LeadCapture />
      <Footer />
    </main>
  );
};

export default Index;
