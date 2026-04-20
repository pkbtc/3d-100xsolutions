"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function HeroSection() {
  const heroRef = useRef<HTMLDivElement>(null);
  const tlRef = useRef<gsap.core.Timeline | null>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      // Chips row
      tl.fromTo(".hero-chips .chip", 
        { y: 30, opacity: 0 }, 
        { y: 0, opacity: 1, stagger: 0.08, duration: 0.7 }
      );

      // Heading
      tl.fromTo(
        ".hero-heading",
        { y: 60, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: "power4.out" },
        "-=0.4"
      );

      // Subtitle
      tl.fromTo(
        ".hero-subtitle",
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8 },
        "-=0.6"
      );

      // CTA buttons
      tl.fromTo(
        ".hero-ctas > *",
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.12, duration: 0.6 },
        "-=0.4"
      );

      // Stats cards
      tl.fromTo(
        ".hero-stat",
        { y: 40, opacity: 0, scale: 0.95 },
        { y: 0, opacity: 1, scale: 1, stagger: 0.1, duration: 0.6 },
        "-=0.3"
      );

      // Scroll indicator
      tl.fromTo(
        ".hero-scroll-indicator",
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.5 },
        "-=0.2"
      );

      // Fade out indicator on scroll
      gsap.to(".hero-scroll-indicator", {
        opacity: 0,
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "+=300",
          scrub: true,
        },
      });

      // Floating ambient orbs
      gsap.to(".hero-orb-1", {
        y: -30,
        x: 20,
        duration: 6,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      gsap.to(".hero-orb-2", {
        y: 25,
        x: -15,
        duration: 8,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      // Mouse parallax on heading
      const handleMouseMove = (e: MouseEvent) => {
        if (!heroRef.current) return;
        const { clientX, clientY } = e;
        const { innerWidth, innerHeight } = window;
        const x = (clientX / innerWidth - 0.5) * 15;
        const y = (clientY / innerHeight - 0.5) * 15;

        gsap.to(".hero-heading", {
          x: x * 0.3,
          y: y * 0.3,
          duration: 1,
          ease: "power2.out",
        });

        gsap.to(".hero-orb-1", {
          x: x * 1.5,
          y: y * 1.5,
          duration: 2,
          ease: "power2.out",
        });

        gsap.to(".hero-orb-2", {
          x: -x * 1.2,
          y: -y * 1.2,
          duration: 2,
          ease: "power2.out",
        });
      };

      window.addEventListener("mousemove", handleMouseMove);
      tlRef.current = tl;

      return () => window.removeEventListener("mousemove", handleMouseMove);
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="hero"
      ref={heroRef}
      className="hero-bg relative min-h-screen flex items-center justify-center pt-20 overflow-hidden"
    >
      {/* Subtle ambient orbs */}
      <div
        className="hero-orb-1 absolute pointer-events-none"
        style={{
          top: "15%",
          left: "10%",
          width: "320px",
          height: "320px",
          borderRadius: "50%",
          background: "transparent",
          filter: "blur(80px)",
        }}
      />
      <div
        className="hero-orb-2 absolute pointer-events-none"
        style={{
          bottom: "20%",
          right: "10%",
          width: "400px",
          height: "400px",
          borderRadius: "50%",
          background: "transparent",
          filter: "blur(100px)",
        }}
      />

      {/* Grid pattern overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
          maskImage: "radial-gradient(ellipse at center, black 30%, transparent 70%)",
          WebkitMaskImage: "radial-gradient(ellipse at center, black 30%, transparent 70%)",
        }}
      />

      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center pb-24">
        {/* Chips row */}
        <div className="hero-chips mb-8 flex flex-wrap items-center justify-center gap-2">
          {["3D Websites", "Virtual Tours", "Product Showcases", "Immersive Experiences"].map((chip) => (
            <span key={chip} className="chip">{chip}</span>
          ))}
        </div>

        {/* Main heading */}
        <h1
          className="hero-heading text-4xl sm:text-5xl md:text-7xl lg:text-[6.5rem] font-extrabold leading-[1.05] tracking-tight mb-7 sm:mb-9"
          style={{ color: "var(--text-primary)" }}
        >
          Future of{" "}
          <span className="gradient-text">3D Web</span>
          <br />
          Experiences
        </h1>

        {/* Subtitle */}
        <p
          className="hero-subtitle text-base sm:text-lg md:text-xl max-w-3xl mx-auto mb-9 sm:mb-12 leading-relaxed"
          style={{ color: "var(--text-secondary)" }}
        >
          Captivate your audience with hyper-realistic 3D elements.{" "}
          <span className="font-semibold" style={{ color: "var(--primary)" }}>
            Drag to rotate
          </span>
          ,{" "}
          <span className="font-semibold" style={{ color: "var(--accent)" }}>
            scroll to zoom
          </span>{" "}
          — build a world beyond the 2D surface.
        </p>

        {/* CTA buttons */}
        <div className="hero-ctas flex flex-col sm:flex-row items-center justify-center gap-4">
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

        {/* Stats row */}
        <div className="mt-14 grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[
            { value: "300%", label: "Longer Sessions" },
            { value: "40%", label: "More Conversions" },
            { value: "2%", label: "Market Adoption" },
            { value: "24h", label: "Avg. Turnaround" },
          ].map((s) => (
            <div
              key={s.label}
              className="hero-stat glass-card px-4 py-5 text-center group transition-all duration-400 hover:-translate-y-1"
            >
              <div
                className="text-2xl sm:text-3xl font-extrabold tracking-tight"
                style={{ color: "var(--primary)" }}
              >
                {s.value}
              </div>
              <div
                className="mt-1 text-[10px] font-semibold uppercase tracking-[0.15em]"
                style={{ color: "var(--text-muted)", fontFamily: "var(--font-mono, monospace)" }}
              >
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="hero-scroll-indicator absolute bottom-8 left-1/2 -translate-x-1/2 z-10">
        <div className="flex flex-col items-center gap-2">
          <span
            className="text-[10px] uppercase tracking-[0.2em] font-semibold"
            style={{ color: "var(--text-muted)", fontFamily: "var(--font-mono, monospace)" }}
          >
            Scroll
          </span>
          <div
            className="w-6 h-10 rounded-full flex justify-center pt-2"
            style={{
              border: "1px solid var(--border-light)",
              background: "rgba(255,255,255,0.03)",
            }}
          >
            <div
              className="w-1 h-2 rounded-full animate-bounce"
              style={{ background: "var(--primary)" }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
