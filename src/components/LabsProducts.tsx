import { Link } from "react-router-dom";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { labsProducts, STATUS_STYLE, type LabsProduct } from "@/data/labsProducts";
import { ArrowUpRight } from "lucide-react";
import ProductMark from "@/components/ProductMark";



export const StatusPill = ({ product }: { product: LabsProduct }) => {
  const style = STATUS_STYLE[product.status];
  return (
    <span
      className="inline-flex items-center gap-2 text-[10px] tracking-[2px] uppercase border px-2.5 py-1 rounded-full"
      style={{ color: style.color, borderColor: `color-mix(in srgb, ${style.color} 45%, transparent)` }}
    >
      <span className="w-1.5 h-1.5 rounded-full" style={{ background: style.dot }} />
      {product.statusLabel}
    </span>
  );
};

type Props = {
  id?: string;
  eyebrow?: string;
  title?: React.ReactNode;
  intro?: string;
  hideHeading?: boolean;
};

const LabsProducts = ({
  id = "products",
  eyebrow = "// products",
  title = (
    <>
      Security &amp; Privacy <span className="text-accent">Tools</span>
    </>
  ),
  intro = "Tools that protect patient data where it is most at risk: AI prompts, record access, health-data APIs, and small-clinic IT.",
  hideHeading = false,
}: Props) => {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section id={id} className="portfolio-products">
      <div ref={ref} className={`relative max-w-7xl mx-auto ${isVisible ? "scroll-visible" : "scroll-hidden"}`}>
        {!hideHeading && (
          <>
            <div className="text-[14px] tracking-[4px] text-faint uppercase mb-3">{eyebrow}</div>
            <h2 className="font-display text-[clamp(40px,5vw,60px)] text-foreground tracking-[2px] mb-4">{title}</h2>
            <p className="text-base text-dim max-w-2xl mb-12">{intro}</p>
          </>
        )}

        <div className="product-grid">
          {labsProducts.map((p, index) => {
            return (
            <Link
              key={p.slug}
              to={`/ai-labs/${p.slug}`}
              className="product-card group"
            >
              <div className="product-card-top">
                <span className="product-index">0{index + 1} / ALTCTRL LABS</span>
                <StatusPill product={p} />
              </div>
              <div className={`product-art product-art-${index}`} aria-hidden="true"><div className="product-art-orbit" /><div className="product-art-orbit second" /><ProductMark slug={p.slug} /><span>0{index + 1}</span></div>
              <h3 className="product-name">
                {p.name}
              </h3>
              <p className="product-tagline">{p.tagline}</p>
              <p className="product-summary">{p.summary}</p>
              <div className="product-tags">
                {p.tags.map((t) => (
                  <span key={t}>
                    {t}
                  </span>
                ))}
              </div>
              <span className="product-link">Explore project <ArrowUpRight size={20} /></span>
            </Link>
          ); })}
        </div>
      </div>
    </section>
  );
};

export default LabsProducts;
