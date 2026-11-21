import { ArrowDown, ArrowUpRight, Asterisk } from "lucide-react";
import { Link } from "react-router-dom";
import ImmersiveArtwork from "@/components/ImmersiveArtwork";
import { Button } from "@/components/ui/button";

export default function BrandHero() {
  return (
    <section className="kinetic-hero">
      <div className="hero-topline"><span>Independent technology practice</span><span>Mississauga, Ontario / Canada</span></div>
      <h1 className="hero-wordmark">ALTCTRL<span className="text-primary">↗</span></h1>
      <ImmersiveArtwork />
      <div className="hero-statement">
        <div className="hero-eyebrow"><Asterisk size={17} /> Systems today. Possibilities tomorrow.</div>
        <h2>Engineering trust.<br />Building <span className="text-primary">what’s next.</span></h2>
        <p>Personal IT. Business infrastructure.<br />A new frontier in clinical AI.<br />Three disciplines. One uncompromising approach.</p>
        <div className="flex flex-wrap items-center gap-4 mt-7">
          <Button asChild className="kinetic-cta"><Link to="/ai-labs">Explore AI Labs <ArrowUpRight /></Link></Button>
          <Button asChild variant="link" className="text-foreground"><Link to="/get-help">Get IT support <ArrowUpRight /></Link></Button>
        </div>
      </div>
      <div className="hero-bottomline"><Link to="/it-services" aria-label="Explore ALTCTRL IT Services"><ArrowDown size={18} /> Explore the practice</Link><span>IT Services / Business IT / AI Labs</span><span className="hero-coordinate">43.5890° N / 79.6441° W</span></div>
    </section>
  );
}
