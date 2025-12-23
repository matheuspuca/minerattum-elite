import { Navbar } from "@/components/Navbar";
import { HeroSection } from "@/components/HeroSection";
import { SmartDrillSection } from "@/components/SmartDrillSection";
import { TrainingCarousel } from "@/components/TrainingCarousel";
import { SocialProof } from "@/components/SocialProof";
import { LeadCapture } from "@/components/LeadCapture";
import { Footer } from "@/components/Footer";

const Index = () => {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      <SmartDrillSection />
      <TrainingCarousel />
      <SocialProof />
      <LeadCapture />
      <Footer />
    </main>
  );
};

export default Index;
