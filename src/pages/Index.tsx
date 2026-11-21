import Navbar from "@/components/Navbar";
import BrandHero from "@/components/BrandHero";
import PortfolioHeader from "@/components/PortfolioHeader";
import LabsProducts from "@/components/LabsProducts";
import Footer from "@/components/Footer";
import PracticeDivisions from "@/components/PracticeDivisions";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <BrandHero />
      <PracticeDivisions />
      <PortfolioHeader
        id="ai-labs-portfolio"
        eyebrow="02 / Selected work · AI Labs"
        title={
          <>
            Ideas into<br /><span className="portfolio-emphasis">infrastructure.</span>
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
