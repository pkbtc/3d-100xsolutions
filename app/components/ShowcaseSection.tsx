"use client";

import SplineScene from "./SplineScene";

export default function ShowcaseSection() {
  return (
    <section id="showcase" className="relative py-12 sm:py-20 pb-20 sm:pb-32">
      {/* Soft gradient overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(to bottom, var(--background), rgba(255,255,255,0.01) 50%, var(--background))",
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 h-[60vh] sm:h-[70vh] min-h-[350px] sm:min-h-[500px]">
        {/* Subtle glow behind */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2/3 h-2/3 rounded-full pointer-events-none"
          style={{
            background: "radial-gradient(circle, rgba(94,158,255,0.05) 0%, transparent 70%)",
            filter: "blur(80px)",
          }}
        />

        <div
          className="w-full h-full glass-card overflow-hidden relative"
          style={{
            borderRadius: "var(--radius-xl)",
          }}
        >
          <SplineScene interactive={true} className="w-full h-full" showControls={true} />
        </div>
      </div>
    </section>
  );
}
