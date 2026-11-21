import { ArrowDown, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import ImmersiveArtwork from "@/components/ImmersiveArtwork";

export default function Hero() {
  return (
    <section className="kinetic-hero labs-hero">
      <div className="hero-topline"><span>ALTCTRL / Research & development</span><span className="text-accent">Private beta</span></div>
      <h1 className="hero-wordmark">AI LABS<span className="text-primary">↗</span></h1>
      <ImmersiveArtwork compact />
      <div className="hero-statement"><div className="hero-eyebrow">The next layer of healthcare technology</div><h2>Clinical intelligence.<br /><span className="text-primary">Human trust.</span></h2><p>Privacy-first tools. Secure RAG architectures.<br />Open-weight models, inside your own cloud.<br />In development with clinical design partners.</p><div className="flex flex-wrap gap-4 mt-7"><Button asChild className="kinetic-cta"><a href="#products">Explore the portfolio <ArrowUpRight /></a></Button><Button asChild variant="link" className="text-foreground"><a href="#contact">Join the waitlist <ArrowUpRight /></a></Button></div></div>
      <div className="hero-bottomline"><a href="#products"><ArrowDown size={18} /> Discover the work</a><span>Decision support. Clinician in the loop.</span></div>
    </section>
  );
}