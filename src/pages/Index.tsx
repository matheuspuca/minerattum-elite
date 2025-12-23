import { Navbar } from "@/components/Navbar";
import { HeroSection } from "@/components/HeroSection";
import { SmartDrillSection } from "@/components/SmartDrillSection";
import { AcademySection } from "@/components/AcademySection";
import { TrustBanner } from "@/components/TrustBanner";
import { Footer } from "@/components/Footer";

const Index = () => {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      <SmartDrillSection />
      <AcademySection />
      <TrustBanner />
      <Footer />
    </main>
  );
};

export default Index;
