import { useEffect } from "react";
import { ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import ProductMark from "@/components/ProductMark";
import ProductExperience from "@/components/ProductExperience";
import { Link, useParams } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { StatusPill } from "@/components/LabsProducts";
import { getLabsProduct, labsProducts } from "@/data/labsProducts";
import { applySEO } from "@/lib/seo";
import NotFound from "./NotFound";

const SectionLabel = ({ children }: { children: React.ReactNode }) => (
  <div className="text-[13px] tracking-[4px] text-faint uppercase mb-3">{children}</div>
);

const LabsProduct = () => {
  const { slug } = useParams();
  const product = getLabsProduct(slug);

  useEffect(() => {
    if (!product) return;
    applySEO({
      title: `${product.name} — ALTCTRL AI Labs`,
      description: product.seoDescription,
      canonical: `https://altctrl.run/ai-labs/${product.slug}`,
      jsonLd: {
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        name: product.name,
        description: product.seoDescription,
        applicationCategory: "SecurityApplication",
        url: `https://altctrl.run/ai-labs/${product.slug}`,
        ...(product.github ? { codeRepository: product.github } : {}),
        author: { "@type": "Person", name: "Jaleed Ahmad", url: "https://altctrl.run/founder" },
        publisher: { "@type": "Organization", name: "ALTCTRL Solutions", url: "https://altctrl.run" },
      },
    });
    window.scrollTo(0, 0);
  }, [product]);

  if (!product) return <NotFound />;

  const others = labsProducts.filter((p) => p.slug !== product.slug);

  return (
    <div className={`lab-product-page lab-theme-${product.slug} bg-background min-h-screen text-foreground`}>
      <Navbar />
      <main className="pt-14">
        <section className={`lab-product-hero lab-theme-${product.slug}`}>
          <div className="lab-page-inner relative">
            <nav aria-label="Breadcrumb" className="lab-breadcrumb"><Link to="/ai-labs">AI Labs</Link><span>/</span><span>{product.name}</span></nav>
            <div className="lab-product-identity"><ProductMark slug={product.slug} /><span>ALTCTRL / {product.name}</span><StatusPill product={product} /></div>
            <div className="lab-hero-art" aria-hidden="true"><div className="lab-art-grid" /><div className="lab-art-ring" /><div className="lab-art-ring second" /><ProductMark slug={product.slug} /><div className="lab-art-sweep" /></div>
            <div className="lab-hero-copy">
              <div className="section-index"><span>Clinical systems / {String(labsProducts.indexOf(product) + 1).padStart(2, "0")}</span></div>
              <h1>{product.name}</h1>
              <p className="lab-hero-tagline">{product.tagline}</p>
              <p className="lab-hero-summary">{product.summary}</p>
              <div className="flex flex-wrap gap-3 mt-8">
                <Button asChild size="lg"><Link to={product.cta.href}>{product.cta.label}<ArrowUpRight /></Link></Button>
                {product.github && <Button asChild variant="outline" size="lg"><a href={product.github} target="_blank" rel="noreferrer">View on GitHub<ArrowUpRight /></a></Button>}
              </div>
            </div>
            <div className="lab-hero-foot"><span>{product.audience}</span><span>Engineered in Ontario, Canada</span></div>
          </div>
        </section>
        <ProductExperience key={product.slug} product={product} />

        {/* Problem */}
        <section className="px-6 md:px-20 py-16 border-t border-border">
          <div className="max-w-5xl mx-auto">
            <SectionLabel>// the problem</SectionLabel>
            <h2 className="font-display text-[clamp(32px,4vw,46px)] text-foreground mb-8">Why this matters</h2>
            <ul className="space-y-4">
              {product.problem.map((p) => (
                <li key={p} className="flex gap-4 text-base text-dim leading-relaxed">
                  <span className="text-primary mt-1" aria-hidden="true">▸</span>
                  <span>{p}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Features */}
        <section className="px-6 md:px-20 py-16 border-t border-border bg-noise bg-circuit relative">
          <div className="relative max-w-6xl mx-auto">
            <SectionLabel>// what it does</SectionLabel>
            <h2 className="font-display text-[clamp(32px,4vw,46px)] text-foreground mb-10">Features</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-border border border-border">
              {product.features.map((f) => (
                <div key={f.title} className="bg-surface p-7">
                  <div className="font-display text-[24px] tracking-[1px] text-foreground mb-3">{f.title}</div>
                  <p className="text-sm text-dim leading-relaxed">{f.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* How it works + code */}
        <section className="px-6 md:px-20 py-16 border-t border-border">
          <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <SectionLabel>// how it works</SectionLabel>
              <h2 className="font-display text-[clamp(32px,4vw,46px)] text-foreground mb-8">Step by step</h2>
              <ol className="space-y-5">
                {product.howItWorks.map((step, i) => (
                  <li key={step} className="flex gap-5 items-start">
                    <span className="font-display text-3xl text-accent leading-none w-8 flex-shrink-0">{i + 1}</span>
                    <span className="text-base text-dim leading-relaxed pt-1">{step}</span>
                  </li>
                ))}
              </ol>
            </div>
            {product.codeSample ? (
              <div>
                <SectionLabel>// example output</SectionLabel>
                <pre className="bg-surface border border-border rounded-md p-5 text-[13px] leading-relaxed text-foreground overflow-x-auto mt-4">
                  <code>{product.codeSample}</code>
                </pre>
                <p className="text-xs text-faint mt-3">Synthetic example. No real patient data is used anywhere in this project.</p>
              </div>
            ) : (
              <div className="border border-border bg-surface rounded-md p-8 self-start">
                <div className="font-display text-2xl text-foreground mb-3">Want early access?</div>
                <p className="text-sm text-dim leading-relaxed mb-5">
                  {product.name} is being built now. Tell us about your organization and we&apos;ll reach out when it is ready to pilot.
                </p>
                <Link to={product.cta.href} className="text-[12px] tracking-[3px] uppercase text-accent hover:underline">
                  {product.cta.label} →
                </Link>
              </div>
            )}
          </div>
        </section>

        {/* Security design + limitations */}
        <section className="px-6 md:px-20 py-16 border-t border-border bg-noise relative">
          <div className="relative max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <SectionLabel>// security design</SectionLabel>
              <h2 className="font-display text-[clamp(28px,3.5vw,40px)] text-foreground mb-6">How it protects data</h2>
              <ul className="space-y-3">
                {product.security.map((s) => (
                  <li key={s} className="flex gap-3 text-sm text-dim leading-relaxed">
                    <span className="text-accent" aria-hidden="true">✓</span>
                    <span>{s}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <SectionLabel>// limitations</SectionLabel>
              <h2 className="font-display text-[clamp(28px,3.5vw,40px)] text-foreground mb-6">What it doesn&apos;t do</h2>
              <ul className="space-y-3">
                {product.limitations.map((l) => (
                  <li key={l} className="flex gap-3 text-sm text-dim leading-relaxed">
                    <span className="text-accent" aria-hidden="true">!</span>
                    <span>{l}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Other products */}
        <section className="px-6 md:px-20 py-16 border-t border-border">
          <div className="max-w-6xl mx-auto">
            <SectionLabel>// more from AI Labs</SectionLabel>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-border border border-border mt-6">
              {others.map((p) => (
                <Link key={p.slug} to={`/ai-labs/${p.slug}`} className="bg-surface p-6 hover:bg-surface2 transition-colors group">
                  <div className="flex items-center gap-3 mb-3">
                    <ProductMark slug={p.slug} className="h-8 w-8 flex-shrink-0" />
                    <span className="font-display text-[24px] text-foreground group-hover:text-accent transition-colors">{p.name}</span>
                  </div>
                  <p className="text-sm text-dim leading-relaxed">{p.tagline}</p>
                </Link>
              ))}
            </div>
            <p className="text-sm text-faint mt-8">
              Built by <Link to="/founder" className="text-dim hover:text-accent underline underline-offset-4">Jaleed Ahmad</Link>, founder of ALTCTRL.
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default LabsProduct;
