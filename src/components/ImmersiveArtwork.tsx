import { Component, lazy, Suspense, useEffect, useState, type ReactNode } from "react";
import { Pause, Play } from "lucide-react";
import { Button } from "@/components/ui/button";

const KineticScene = lazy(() => import("@/components/KineticScene"));

function DNAFallback() {
  return <div className="sculpture-fallback" aria-hidden="true"><svg width="280" height="340" viewBox="0 0 280 340" fill="none"><path d="M80 20C240 70 40 120 80 170S240 270 80 320" className="stroke-foreground" strokeWidth="9" /><path d="M200 20C40 70 240 120 200 170S40 270 200 320" className="stroke-primary" strokeWidth="9" />{Array.from({ length: 15 }, (_, i) => { const y = 30 + i * 20; const offset = Math.cos((y - 20) / 150 * Math.PI) * 60; return <path key={i} d={`M${140 - offset} ${y}H${140 + offset}`} className="stroke-foreground" strokeWidth="3" opacity="0.6" />; })}</svg></div>;
}

class ArtworkBoundary extends Component<{ children: ReactNode }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() { return { failed: true }; }
  render() { return this.state.failed ? <DNAFallback /> : this.props.children; }
}

export default function ImmersiveArtwork({ compact = false }: { compact?: boolean }) {
  const [paused, setPaused] = useState(() => window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setPaused(media.matches);
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  return (
    <>
      <div className="immersive-artwork" aria-hidden="true">
        <ArtworkBoundary>
          <Suspense fallback={<DNAFallback />}>
            <KineticScene paused={paused} compact={compact} />
          </Suspense>
        </ArtworkBoundary>
      </div>
      <Button variant="outline" size="icon" className="motion-control" onClick={() => setPaused(!paused)} aria-label={paused ? "Play sculpture motion" : "Pause sculpture motion"} aria-pressed={paused} title={paused ? "Play motion" : "Pause motion"}>
        {paused ? <Play /> : <Pause />}
      </Button>
    </>
  );
}