import { Component, lazy, Suspense, useEffect, useState, type ReactNode } from "react";
import { Pause, Play } from "lucide-react";
import { Button } from "@/components/ui/button";

const KineticScene = lazy(() => import("@/components/KineticScene"));

function SecurityFallback() {
  return <div className="sculpture-fallback" aria-hidden="true"><svg width="280" height="340" viewBox="0 0 280 340" fill="none"><path d="M140 20L255 65L240 210Q225 280 140 325Q55 280 40 210L25 65Z" className="stroke-foreground" strokeWidth="9" /><path d="M60 170H95L112 145L129 205L149 110L170 220L190 170H220" className="stroke-primary" strokeWidth="4" /></svg></div>;
}

class ArtworkBoundary extends Component<{ children: ReactNode }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() { return { failed: true }; }
  render() { return this.state.failed ? <SecurityFallback /> : this.props.children; }
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
          <Suspense fallback={<SecurityFallback />}>
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