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
      {/* Floating orbs */}
      <div className="absolute top-[15%] left-[10%] w-48 h-48 md:w-72 md:h-72 rounded-full bg-accent-primary/10 blur-[100px] animate-float z-[1]" />
      <div className="absolute bottom-[20%] right-[15%] w-64 h-64 md:w-96 md:h-96 rounded-full bg-accent-secondary/8 blur-[120px] animate-float-delay-1 z-[1]" />
      <div className="absolute top-[40%] right-[30%] w-32 h-32 md:w-48 md:h-48 rounded-full bg-accent-tertiary/6 blur-[80px] animate-float-delay-2 z-[1]" />

      {/* Geometric shapes */}
      <div className="absolute top-[20%] right-[20%] w-4 h-4 border-2 border-accent-primary/30 rotate-45 animate-float z-[2]" />
      <div className="absolute bottom-[30%] left-[15%] w-6 h-6 border-2 border-accent-secondary/25 rounded-full animate-float-delay-2 z-[2]" />
      <div className="absolute top-[60%] right-[10%] w-3 h-3 bg-accent-tertiary/30 rotate-45 animate-float-delay-1 z-[2]" />

      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
        {/* Badge */}
        <div className="animate-fade-in-up mb-8 inline-flex items-center gap-2 px-4 py-2 rounded-full border border-accent-primary/20 bg-accent-primary/5 backdrop-blur-sm">
          <span className="w-2 h-2 rounded-full bg-accent-secondary animate-pulse" />
          <span className="text-text-secondary text-sm font-medium">
            Interactive 3D Object Showcase
          </span>
        </div>

        {/* Main heading */}
        <h1
          className="animate-fade-in-up delay-200 text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-black leading-[1.1] tracking-tight mb-6 sm:mb-8"
          style={{ opacity: 0 }}
        >
          Experience{" "}
          <span className="gradient-text">3D</span>
          <br />
          Like Never Before
        </h1>

        {/* Subtitle */}
        <p
          className="animate-fade-in-up delay-400 text-base sm:text-lg md:text-2xl text-text-secondary max-w-2xl mx-auto mb-8 sm:mb-10 leading-relaxed"
          style={{ opacity: 0 }}
        >
          Explore our hand-crafted 3D scene below.{" "}
          <span className="text-accent-secondary font-semibold">Drag to rotate</span>,{" "}
          <span className="text-accent-primary font-semibold">scroll to zoom</span>{" "}
          — fully interactive in your browser.
        </p>

        {/* CTA buttons */}
        <div
          className="animate-fade-in-up delay-600 flex flex-col sm:flex-row items-center justify-center gap-4"
          style={{ opacity: 0 }}
        >
          <a href="#showcase" className="btn-primary w-full sm:w-auto text-base px-8 py-4" id="hero-cta-primary">
            <span>View 3D Object</span>
            <span className="text-lg">↓</span>
          </a>
          <a href="#contact" className="btn-secondary w-full sm:w-auto text-base px-8 py-4" id="hero-cta-secondary">
            Get in Touch
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-fade-in delay-800 z-10" style={{ opacity: 0 }}>
        <div className="flex flex-col items-center gap-2">
          <span className="text-text-muted text-xs uppercase tracking-widest">Scroll</span>
          <div className="w-6 h-10 border-2 border-text-muted/30 rounded-full flex justify-center pt-2">
            <div className="w-1 h-3 bg-accent-primary rounded-full animate-bounce" />
          </div>
        </div>
      </div>
    </section>
  );
}
