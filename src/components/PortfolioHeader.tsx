import { Link } from "react-router-dom";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { labsProducts, type ProductStatus } from "@/data/labsProducts";

const STATUS_META: Record<ProductStatus, { label: string; color: string }> = {
  "open-source": { label: "Open source", color: "hsl(var(--green))" },
  "in-development": { label: "In development", color: "hsl(var(--accent))" },
  planned: { label: "Planned", color: "hsl(var(--text-dim))" },
};

interface PortfolioHeaderProps {
  id?: string;
  eyebrow?: string;
  title?: React.ReactNode;
  tagline?: string;
}

const PortfolioHeader = ({
  id = "portfolio",
  eyebrow = "// Portfolio · AI Labs",
  title = (
    <>
      ALTCTRL <span className="text-accent">/ Portfolio</span>
    </>
  ),
  tagline = "Every product our AI Labs division has released or is actively building — from the open-source phi-guard to clinical tools still in development.",
}: PortfolioHeaderProps) => {
  const { ref, isVisible } = useScrollReveal();

  const counts = (["open-source", "in-development", "planned"] as ProductStatus[]).map((status) => ({
    status,
    label: STATUS_META[status].label,
    color: STATUS_META[status].color,
    count: labsProducts.filter((p) => p.status === status).length,
  }));

  return (
    <section id={id} className="portfolio-header">
      <div ref={ref} className={`relative max-w-7xl mx-auto ${isVisible ? "scroll-visible" : "scroll-hidden"}`}>
        <div className="border-t border-border pt-10">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-5">
            <div>
              <div className="portfolio-eyebrow">{eyebrow}</div>
              <h2 className="portfolio-title">
                {title}
              </h2>
              <p className="portfolio-intro">{tagline}</p>
            </div>
            <div className="flex-shrink-0">
              <span
                className="portfolio-count"
              >
                <span
                  className="w-2 h-2 rounded-full animate-pulse-dot"
                  style={{ background: "hsl(var(--accent))" }}
                />
                {labsProducts.length} products
              </span>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-x-6 gap-y-3 mt-8">
            {counts.map((c) => (
              <span key={c.status} className="inline-flex items-center gap-2 text-[12px] tracking-[1px] text-dim">
                <span className="w-1.5 h-1.5 rounded-full" style={{ background: c.color }} />
                <span className="text-foreground">{c.count}</span> {c.label.toLowerCase()}
              </span>
            ))}
            <Link
              to="/ai-labs"
              className="ml-auto text-[12px] tracking-[3px] text-accent uppercase hover:translate-x-1 transition-transform"
            >
              → Visit AI Labs
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PortfolioHeader;
