import { ArrowUpRight, Asterisk } from "lucide-react";
import { Link } from "react-router-dom";
import { useScrollReveal } from "@/hooks/useScrollReveal";

export default function Footer() {
  const { ref, isVisible } = useScrollReveal(0.08);
  return (
    <footer className="kinetic-footer">
      <div ref={ref} className={isVisible ? "scroll-visible" : "scroll-hidden"}>
        <div className="section-index"><span>Let’s build something that matters.</span><Asterisk size={24} /></div>
        <Link to="/contact" className="footer-callout">Your next move.<ArrowUpRight /></Link>
        <div className="footer-grid">
          <div><Link className="footer-brand" to="/">ALTCTRL</Link><p>Personal IT. Business infrastructure.<br />Clinical AI. Three tracks, one operator.</p><span className="footer-location"><span /> Serving Mississauga &amp; the GTA</span></div>
          <div><h3>The practice</h3><Link to="/it-services">IT Services</Link><Link to="/business-it">Business IT</Link><Link to="/ai-labs">AI Labs</Link><Link to="/founder">The founder</Link></div>
          <div><h3>Quick access</h3><Link to="/bitlocker-recovery">BitLocker recovery</Link><Link to="/data-recovery">Data recovery</Link><Link to="/no-fix-no-fee">No fix, no fee</Link><Link to="/ai-labs/phi-guard">phi-guard</Link></div>
          <div><h3>Start a conversation</h3><a href="tel:+16476437979">+1-647-643-7979</a><a href="mailto:jaleed01@altctrl.run">jaleed01@altctrl.run</a><Link to="/get-help">Request help <ArrowUpRight size={14} /></Link></div>
        </div>
        <div className="footer-bottom"><span>© {new Date().getFullYear()} ALTCTRL Solutions</span><span>Ontario, Canada</span><Link to="/privacy">IT Services Privacy Policy <ArrowUpRight size={12} /></Link></div>
      </div>
    </footer>
  );
}