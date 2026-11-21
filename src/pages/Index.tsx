import Navbar from "@/components/Navbar";
import BrandHero from "@/components/BrandHero";
import PortfolioHeader from "@/components/PortfolioHeader";
import LabsProducts from "@/components/LabsProducts";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <BrandHero />
      <PortfolioHeader
        id="ai-labs-portfolio"
        eyebrow="// Portfolio · AI Labs"
        title={
          <>
            ALTCTRL <span className="text-accent">/ Portfolio</span>
          </>
        }
        tagline="Every product our AI Labs division has released or is actively building — from the open-source phi-guard to clinical tools still in development."
      />
      <LabsProducts hideHeading />
      <Footer />
    </div>
  );
};

export default Index;
