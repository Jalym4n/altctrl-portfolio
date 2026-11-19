import { Link } from "react-router-dom";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { labsProducts, STATUS_STYLE, type LabsProduct } from "@/data/labsProducts";

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
}: Props) => {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section id={id} className="px-6 md:px-20 py-20 md:py-24 relative bg-noise bg-circuit">
      <div className="absolute inset-0 glow-green pointer-events-none" />
      <div ref={ref} className={`relative max-w-7xl mx-auto ${isVisible ? "scroll-visible" : "scroll-hidden"}`}>
        <div className="text-[14px] tracking-[4px] text-faint uppercase mb-3">{eyebrow}</div>
        <h2 className="font-display text-[clamp(40px,5vw,60px)] text-foreground tracking-[2px] mb-4">{title}</h2>
        <p className="text-base text-dim max-w-2xl mb-12">{intro}</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-border border border-border">
          {labsProducts.map((p) => (
            <Link
              key={p.slug}
              to={`/ai-labs/${p.slug}`}
              className="bg-surface p-8 md:p-10 group transition-colors hover:bg-surface2 flex flex-col"
            >
              <div className="flex items-start justify-between gap-4 mb-5">
                <span className="text-4xl" aria-hidden="true">{p.icon}</span>
                <StatusPill product={p} />
              </div>
              <div className="font-display text-[30px] tracking-[1px] text-foreground mb-2 group-hover:text-accent transition-colors">
                {p.name}
              </div>
              <p className="text-sm text-foreground mb-3">{p.tagline}</p>
              <p className="text-sm text-dim leading-relaxed mb-6 flex-1">{p.summary}</p>
              <div className="flex flex-wrap gap-2 mb-6">
                {p.tags.map((t) => (
                  <span key={t} className="text-[11px] tracking-[1px] text-foreground bg-surface3 border border-border px-2.5 py-1">
                    {t}
                  </span>
                ))}
              </div>
              <span className="text-[12px] tracking-[3px] uppercase text-accent">Learn more →</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LabsProducts;
