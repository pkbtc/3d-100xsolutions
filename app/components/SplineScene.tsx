"use client";

import { useState, useCallback, useRef } from "react";
import Spline from "@splinetool/react-spline";

interface SplineSceneProps {
  interactive?: boolean;
  className?: string;
  showControls?: boolean;
}

export default function SplineScene({
  interactive = true,
  className = "",
  showControls = false,
}: SplineSceneProps) {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleLoad = useCallback(() => {
    setLoaded(true);
  }, []);

  const handleError = useCallback(() => {
    setError(true);
  }, []);

  if (error) {
    return (
      <div className={`flex items-center justify-center ${className}`}>
        <div className="text-center p-8">
          <div className="text-5xl mb-4">⚡</div>
          <p className="text-text-secondary text-sm">
            3D scene is loading...
            <br />
            <span className="text-text-muted text-xs">Please refresh if it takes too long</span>
          </p>
        </div>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className={`relative ${className}`}
      style={{ pointerEvents: interactive ? "auto" : "none" }}
    >
      {/* Loading state */}
      {!loaded && (
        <div className="absolute inset-0 flex flex-col items-center justify-center z-10">
          <div className="relative">
            <div className="w-20 h-20 rounded-full border-2 border-accent-primary/20 border-t-accent-primary animate-spin" />
            <div className="absolute inset-0 w-20 h-20 rounded-full border-2 border-accent-secondary/15 border-b-accent-secondary animate-spin" style={{ animationDirection: "reverse", animationDuration: "1.5s" }} />
          </div>
          <p className="text-text-muted text-sm mt-6 animate-pulse">Loading 3D Experience...</p>
        </div>
      )}

      {/* Spline canvas */}
      <div className={`w-full h-full transition-opacity duration-1000 ${loaded ? "opacity-100" : "opacity-0"}`}>
        <Spline
          scene="https://prod.spline.design/8sWMHRL4O4t3-kG0/scene.splinecode"
          onLoad={handleLoad}
          onError={handleError}
        />
      </div>

      {/* Controls hint */}
      {showControls && loaded && (
        <div className="absolute bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 flex items-center justify-center gap-3 sm:gap-4 px-4 sm:px-5 py-2 sm:py-2.5 rounded-full bg-surface-glass backdrop-blur-xl border border-white/10 opacity-0 animate-fade-in z-50 w-max shadow-xl"
          style={{ animationDelay: "1s", animationFillMode: "forwards" }}
        >
          <span className="flex items-center gap-1.5 text-text-muted text-[11px] sm:text-xs font-medium whitespace-nowrap">
            <svg width="14" height="14" className="w-3.5 h-3.5 sm:w-4 sm:h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" />
            </svg>
            Drag to rotate
          </span>
          <span className="w-px h-3 sm:h-4 bg-white/15" />
          <span className="flex items-center justify-center gap-1.5 text-text-muted text-[11px] sm:text-xs font-medium whitespace-nowrap">
            <svg width="14" height="14" className="w-3.5 h-3.5 sm:w-4 sm:h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.35-4.35M11 8v6M8 11h6" />
            </svg>
            Scroll to zoom
          </span>
        </div>
      )}

      {/* Watermark Blocker Overlay (Precise size for mobile/desktop) */}
      {loaded && (
        <div className="absolute bottom-4 right-4 w-[135px] h-[36px] z-40 rounded-lg bg-surface/90 backdrop-blur-md opacity-0 animate-fade-in pointer-events-none" style={{ animationDelay: "1s", animationFillMode: "forwards" }} />
      )}



      {/* Hide Spline watermark via CSS (Fallback if it's DOM-based) */}
      <style>{`
        #logo,
        canvas + div,
        div:has(> a[href*="spline.design"]),
        [data-spline-watermark],
        a[href*="spline.design"] {
          display: none !important;
          opacity: 0 !important;
          pointer-events: none !important;
        }
      `}</style>
    </div>
  );
}
