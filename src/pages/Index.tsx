import Navbar from "@/components/Navbar";
import BrandHero from "@/components/BrandHero";
import LabsProducts from "@/components/LabsProducts";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <BrandHero />
      <LabsProducts
        id="ai-labs-portfolio"
        eyebrow="// ai labs · portfolio"
        title={<>AI Labs <span className="text-accent">Portfolio</span></>}
        intro="Our clinical AI security and privacy products, from open-source phi-guard to tools in active development. Select any product to see how it works."
      />
      <Footer />
    </div>
  );
};

export default Index;
