import { useState } from "react";
import { Check, ArrowRight, FileText, ShieldCheck, Activity } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import type { LabsProduct } from "@/data/labsProducts";

const previews: Record<string, { labels: string[]; rows: string[][] }> = {
  "phi-guard": { labels: ["Clinical note", "Protected text", "Audit trail"], rows: [["Patient: Avery Example", "DOB: 1990-01-01", "Assessment: HbA1c 7.2%"], ["Patient: [PATIENT_NAME_a2b63bcd]", "DOB: [DATE_OF_BIRTH_18dceb35]", "Assessment: HbA1c 7.2%"], ["2 identifiers replaced", "Clinical context preserved", "Patient details excluded from log"]] },
  "ehr-access-watch": { labels: ["Access event", "Risk signals", "Case review"], rows: [["Synthetic chart: EX-1042", "Access recorded outside working hours", "No documented care relationship"], ["Care-team match: not found", "Repeated access: review required", "Alert includes supporting evidence"], ["Related events grouped into a case", "Privacy officer reviews context", "Investigation remains human-led"]] },
  "fhir-sentry": { labels: ["Endpoint", "Checks", "Report"], rows: [["https://example.invalid/fhir", "Authorized target only", "Read-only request budget"], ["Authentication configuration", "SMART scopes and discovery", "TLS, CORS and security headers"], ["Finding: over-broad scope", "Evidence attached to finding", "Recommendation: restrict permissions"]] },
  "clinic-shield": { labels: ["Check-up", "Priorities", "Action plan"], rows: [["Are your backups tested?", "Do staff use multi-factor sign-in?", "Are devices regularly updated?"], ["Protect staff accounts", "Test recovery from a backup", "Review device updates"], ["Assign an owner to each action", "Record progress locally", "Print a plan for your clinic"]] },
};

export default function ProductExperience({ product }: { product: LabsProduct }) {
  const [step, setStep] = useState(0);
  const preview = previews[product.slug];
  const { ref, isVisible } = useScrollReveal(0.08);
  if (!preview) return null;
  return <section className="product-experience" ref={ref}>
    <div className={`lab-page-inner ${isVisible ? "scroll-visible" : "scroll-hidden"}`}>
      <div className="section-index"><span>01 / Inside {product.name}</span><span>Synthetic concept preview</span></div>
      <h2 className="font-display text-4xl md:text-5xl mb-10">{product.slug === "phi-guard" ? "The context stays. The identities don't." : product.slug === "ehr-access-watch" ? "From access logs to answers." : product.slug === "fhir-sentry" ? "Make the invisible risks visible." : "A clearer path to a safer clinic."}</h2>
      <div className="lab-preview">
        <div className="lab-preview-toolbar" role="tablist" aria-label={`${product.name} preview stages`}>
          {preview.labels.map((label, i) => <Button key={label} role="tab" id={`preview-tab-${i}`} aria-controls="preview-panel" aria-selected={step === i} variant={step === i ? "default" : "ghost"} onClick={() => setStep(i)}><span>0{i + 1}</span>{label}</Button>)}
        </div>
        <div className="lab-preview-body" id="preview-panel" role="tabpanel" aria-labelledby={`preview-tab-${step}`}>
          <div className="lab-preview-symbol" aria-hidden="true">{step === 0 ? <FileText /> : step === 1 ? <ShieldCheck /> : <Activity />}</div>
          <div key={step} className="lab-preview-output animate-fade-up"><span className="font-mono text-xs text-dim">{preview.labels[step].toUpperCase()}</span>{preview.rows[step].map(row => <div className="lab-preview-row" key={row}><Check size={16} /><span>{row}</span></div>)}</div>
          <Button variant="outline" size="icon" aria-label="Next preview stage" onClick={() => setStep((step + 1) % preview.labels.length)}><ArrowRight /></Button>
        </div>
        <p className="lab-preview-caption">Illustrative workflow with synthetic data. {product.status === "open-source" ? "The core library is open source; the Studio interface is in development." : "This product is not yet available for production use."}</p>
      </div>
    </div>
  </section>;
}