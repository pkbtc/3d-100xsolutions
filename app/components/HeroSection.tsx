"use client";

import { useEffect, useRef } from "react";

export default function HeroSection() {
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!heroRef.current) return;
      const { clientX, clientY } = e;
      const { width, height } = heroRef.current.getBoundingClientRect();
      const x = (clientX / width - 0.5) * 20;
      const y = (clientY / height - 0.5) * 20;
      heroRef.current.style.setProperty("--mouse-x", `${x}px`);
      heroRef.current.style.setProperty("--mouse-y", `${y}px`);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <section
      id="hero"
      ref={heroRef}
      className="hero-bg relative min-h-screen flex items-center justify-center pt-20 overflow-hidden"
    >
      {/* Soft ambient orbs — not neon, just gentle color diffusion */}
      <div
        className="absolute animate-float"
        style={{
          top: "15%",
          left: "10%",
          width: "320px",
          height: "320px",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(94,158,255,0.06) 0%, transparent 70%)",
          filter: "blur(60px)",
        }}
      />
      <div
        className="absolute animate-float-delay-1"
        style={{
          bottom: "20%",
          right: "10%",
          width: "400px",
          height: "400px",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(140,120,200,0.05) 0%, transparent 70%)",
          filter: "blur(80px)",
        }}
      />

      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
        {/* Badge */}
        <div
          className="animate-fade-in-up mb-8 inline-flex glass-badge"
        >
          <span
            className="w-1.5 h-1.5 rounded-full"
            style={{
              background: "var(--accent)",
              boxShadow: "0 0 8px rgba(94,158,255,0.4)",
            }}
          />
          <span
            className="text-xs font-medium"
            style={{ color: "var(--text-secondary)" }}
          >
            Interactive 3D Object Showcase
          </span>
        </div>

        {/* Main heading */}
        <h1
          className="animate-fade-in-up delay-200 text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-extrabold leading-[1.08] tracking-tight mb-7 sm:mb-9"
          style={{ opacity: 0, color: "var(--text-primary)" }}
        >
          Experience{" "}
          <span className="gradient-text">3D</span>
          <br />
          Like Never Before
        </h1>

        {/* Subtitle */}
        <p
          className="animate-fade-in-up delay-400 text-base sm:text-lg md:text-xl max-w-2xl mx-auto mb-9 sm:mb-11 leading-relaxed"
          style={{ opacity: 0, color: "var(--text-secondary)" }}
        >
          Explore our hand-crafted 3D scene below.{" "}
          <span className="font-medium" style={{ color: "var(--text-primary)" }}>
            Drag to rotate
          </span>
          ,{" "}
          <span className="font-medium" style={{ color: "var(--text-primary)" }}>
            scroll to zoom
          </span>{" "}
          — fully interactive in your browser.
        </p>

        {/* CTA buttons */}
        <div
          className="animate-fade-in-up delay-600 flex flex-col sm:flex-row items-center justify-center gap-4"
          style={{ opacity: 0 }}
        >
          <a
            href="#showcase"
            className="btn-primary w-full sm:w-auto text-base px-8 py-4"
            id="hero-cta-primary"
          >
            <span>View 3D Object</span>
            <span className="text-base opacity-60">↓</span>
          </a>
          <a
            href="#contact"
            className="btn-secondary w-full sm:w-auto text-base px-8 py-4"
            id="hero-cta-secondary"
          >
            Get in Touch
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-fade-in delay-800 z-10"
        style={{ opacity: 0 }}
      >
        <div className="flex flex-col items-center gap-2">
          <span
            className="text-[10px] uppercase tracking-[0.2em] font-medium"
            style={{ color: "var(--text-muted)" }}
          >
            Scroll
          </span>
          <div
            className="w-5 h-8 rounded-full flex justify-center pt-2"
            style={{
              border: "1px solid rgba(255,255,255,0.12)",
              background: "rgba(255,255,255,0.03)",
            }}
          >
            <div
              className="w-0.5 h-2 rounded-full animate-bounce"
              style={{ background: "rgba(255,255,255,0.30)" }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
