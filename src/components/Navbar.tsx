import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { ArrowUpRight, Menu, Phone, X } from "lucide-react";
import { Button } from "@/components/ui/button";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const links = [
    { label: "IT Services", to: "/it-services" },
    { label: "Business IT", to: "/business-it" },
    { label: "BitLocker", to: "/bitlocker-recovery", flag: "Sitelink" },
    { label: "AI Labs", to: "/ai-labs", soon: true },
    { label: "Contact", to: "/contact" },
  ] as const;

  return (
    <nav className="kinetic-nav" aria-label="Main navigation">
      <Link to="/" className="nav-wordmark" aria-label="ALTCTRL home">ALTCTRL<span className="text-primary">↗</span></Link>
      <div className="desktop-navigation">
        {links.map(item => <Link key={item.to} to={item.to} aria-current={location.pathname === item.to ? "page" : undefined}>{item.label}{"soon" in item && <sup>β</sup>}</Link>)}
      </div>
      <div className="nav-actions">
        <Button asChild variant="ghost" className="nav-phone"><a href="tel:+16476437979"><Phone size={14} /><span>+1-647-643-7979</span></a></Button>
        <Button asChild className="nav-help"><Link to="/get-help">Get help <ArrowUpRight /></Link></Button>
        <Button variant="ghost" size="icon" className="nav-menu" aria-label={menuOpen ? "Close menu" : "Open menu"} aria-expanded={menuOpen} aria-controls="mobile-navigation" onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X /> : <Menu />}</Button>
      </div>
      {menuOpen && (
        <div id="mobile-navigation" className="mobile-navigation">
          {links.map((item, i) => <Link key={item.to} to={item.to} onClick={() => setMenuOpen(false)}><span>0{i + 1}</span>{item.label}<ArrowUpRight /></Link>)}
          <Link to="/get-help" onClick={() => setMenuOpen(false)}>Get help <ArrowUpRight /></Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
