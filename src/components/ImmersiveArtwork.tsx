import { Component, lazy, Suspense, useEffect, useState, type ReactNode } from "react";
import { Pause, Play } from "lucide-react";
import { Button } from "@/components/ui/button";

const KineticScene = lazy(() => import("@/components/KineticScene"));

class ArtworkBoundary extends Component<{ children: ReactNode }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() { return { failed: true }; }
  render() { return this.state.failed ? <div className="sculpture-fallback" aria-hidden="true"><span /><span /><span /></div> : this.props.children; }
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
          <Suspense fallback={<div className="sculpture-fallback"><span /><span /><span /></div>}>
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