"use client";

import SplineScene from "./SplineScene";

export default function ShowcaseSection() {
  return (
    <section id="showcase" className="relative py-20 pb-32">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-surface/30 to-background pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 h-[70vh] min-h-[500px]">
        {/* Glow behind the scene */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-3/4 bg-accent-primary/10 rounded-full blur-[120px] pointer-events-none" />
        
        <div className="w-full h-full rounded-2xl glass-card overflow-hidden relative shadow-2xl shadow-accent-primary/10 border border-white/5">
          <SplineScene interactive={true} className="w-full h-full" showControls={true} />
        </div>
      </div>
    </section>
  );
}
