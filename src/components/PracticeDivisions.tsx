import { ArrowUpRight, Asterisk } from "lucide-react";
import { Link } from "react-router-dom";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const divisions = [
  { number: "01", title: "IT Services", status: "Active practice", to: "/it-services", description: "Expert computer repair, BitLocker recovery and remote rescue for individuals and households.", links: [{ label: "BitLocker recovery", to: "/bitlocker-recovery" }, { label: "Data recovery", to: "/data-recovery" }, { label: "No fix, no fee", to: "/no-fix-no-fee" }] },
  { number: "02", title: "Business IT", status: "Built for organisations", to: "/business-it", description: "Managed support, workstation fleets and secure networks. Infrastructure your business can depend on.", links: [{ label: "Managed IT", to: "/business-it?service=managed-it" }, { label: "Office networks", to: "/business-it?service=network" }, { label: "Consultation", to: "/business-it?service=consultation" }] },
  { number: "03", title: "AI Labs", status: "Research & development", to: "/ai-labs", description: "Proprietary clinical AI and open-source privacy tools. Engineering the next layer of healthcare technology.", links: [{ label: "phi-guard", to: "/ai-labs/phi-guard" }, { label: "The portfolio", to: "#ai-labs-portfolio" }] },
];

export default function PracticeDivisions() {
  const { ref, isVisible } = useScrollReveal(0.08);
  return (
    <section id="divisions" className="practice-section">
      <div className="kinetic-marquee" aria-hidden="true"><div>{[0, 1, 2, 3].map(n => <span key={n}>RECOVER. <Asterisk /> CONNECT. <Asterisk /> ADVANCE. <Asterisk /></span>)}</div></div>
      <div ref={ref} className={`practice-inner ${isVisible ? "scroll-visible" : "scroll-hidden"}`}>
        <div className="section-index"><span>01 / The practice</span><span>Three tracks. One operator.</span></div>
        {divisions.map(division => (
          <article key={division.number} className="division-row">
            <span className="division-number">{division.number}</span>
            <div className="division-name"><span className="division-status">{division.status}</span><Link to={division.to}><h2>{division.title}</h2></Link></div>
            <div className="division-details"><p>{division.description}</p><div className="division-links">{division.links.map(link => link.to.startsWith("#") ? <a key={link.label} href={link.to}>{link.label} <ArrowUpRight size={12} /></a> : <Link key={link.label} to={link.to}>{link.label} <ArrowUpRight size={12} /></Link>)}</div></div>
            <Link className="division-arrow" to={division.to} aria-label={`Explore ${division.title}`}><ArrowUpRight /></Link>
          </article>
        ))}
      </div>
    </section>
  );
}