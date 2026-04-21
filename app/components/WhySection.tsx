"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const reasons = [
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
      </svg>
    ),
    color: "rgba(var(--primary-rgb), 0.1)",
    borderColor: "rgba(var(--primary-rgb), 0.2)",
    iconColor: "var(--primary)",
    title: "10x Customer Engagement",
    description:
      "Interactive 3D experiences keep visitors on your site 3x longer than traditional websites. Users explore, rotate, and interact - creating emotional connections that drive conversions.",
    stat: "300%",
    statLabel: "longer session time",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
      </svg>
    ),
    color: "rgba(var(--accent-rgb), 0.08)",
    borderColor: "rgba(var(--accent-rgb), 0.18)",
    iconColor: "var(--accent)",
    title: "Crystal-Clear Visualization",
    description:
      "Let customers walk through a building before it's built, tour a restaurant before visiting, or inspect a product from every angle. 3D removes guesswork and builds instant trust.",
    stat: "85%",
    statLabel: "faster decisions",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
      </svg>
    ),
    color: "rgba(var(--primary-rgb), 0.1)",
    borderColor: "rgba(var(--primary-rgb), 0.2)",
    iconColor: "var(--primary)",
    title: "Competitive Edge",
    description:
      "Only 2% of businesses use 3D web experiences. Be the first in your industry to offer immersive digital experiences and stand miles ahead.",
    stat: "2%",
    statLabel: "market adoption",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    color: "rgba(var(--accent-rgb), 0.08)",
    borderColor: "rgba(var(--accent-rgb), 0.18)",
    iconColor: "var(--accent)",
    title: "Higher Conversion Rates",
    description:
      "Businesses with 3D experiences see up to 40% higher conversion rates. When customers can truly experience your offering online, they take action.",
    stat: "40%",
    statLabel: "more conversions",
  },
];

export default function WhySection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Section header reveal
      gsap.fromTo(".why-header",
        { y: 50, opacity: 0 },
        {
          scrollTrigger: {
            trigger: ".why-header",
            start: "top 85%",
            toggleActions: "play none none none",
          },
          y: 0,
          opacity: 1,
          duration: 0.9,
          ease: "power3.out",
        }
      );

      // Cards staggered reveal
      gsap.fromTo(".why-card",
        { y: 60, opacity: 0 },
        {
          scrollTrigger: {
            trigger: ".why-cards-grid",
            start: "top 80%",
            toggleActions: "play none none none",
          },
          y: 0,
          opacity: 1,
          stagger: 0.15,
          duration: 0.8,
          ease: "power3.out",
        }
      );

      // Stat number counter animation
      const statEls = document.querySelectorAll(".why-stat-number");
      statEls.forEach((el) => {
        const target = el.textContent || "";
        const num = parseFloat(target);
        if (isNaN(num)) return;

        const suffix = target.replace(/[\d.]/g, "");
        const obj = { val: 0 };

        gsap.to(obj, {
          val: num,
          duration: 1.5,
          ease: "power2.out",
          scrollTrigger: {
            trigger: el,
            start: "top 90%",
            toggleActions: "play none none none",
          },
          onUpdate: () => {
            (el as HTMLElement).textContent = Math.round(obj.val) + suffix;
          },
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="why-3d" className="relative py-24 md:py-36" ref={sectionRef}>
      {/* Ambient glow */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 pointer-events-none"
        style={{
          width: "500px",
          height: "500px",
          background: "transparent",
          filter: "blur(100px)",
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section header */}
        <div className="why-header max-w-2xl mb-16">
          <div className="section-label">The Future is 3D</div>
          <h2
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold mb-5 tracking-tight"
            style={{ color: "var(--text-primary)" }}
          >
            Why <span className="gradient-text">3D Matters</span> for Your Business
          </h2>
          <p
            className="text-base md:text-lg leading-relaxed"
            style={{ color: "var(--text-secondary)" }}
          >
            In a world of flat websites, 3D experiences cut through the noise and
            make your business unforgettable.
          </p>
        </div>

        {/* Cards grid */}
        <div className="why-cards-grid grid grid-cols-1 md:grid-cols-2 gap-5 lg:gap-6">
          {reasons.map((reason) => (
            <div
              key={reason.title}
              className="why-card glass-card p-8 md:p-10 group transition-all duration-300 hover:-translate-y-1"
            >
              <div className="flex flex-col sm:flex-row items-start gap-5">
                {/* SVG icon */}
                <div
                  className="w-14 h-14 rounded-xl flex items-center justify-center shrink-0 transition-all duration-400 group-hover:scale-105"
                  style={{
                    background: reason.color,
                    border: `1px solid ${reason.borderColor}`,
                    color: reason.iconColor,
                    boxShadow: `inset 0 1px 0 rgba(255,255,255,0.06)`,
                  }}
                >
                  {reason.icon}
                </div>
                <div className="flex-1">
                  <h3
                    className="text-xl md:text-2xl font-bold mb-3 transition-colors duration-300"
                    style={{ color: "var(--text-primary)" }}
                  >
                    {reason.title}
                  </h3>
                  <p
                    className="leading-relaxed mb-5 text-sm md:text-base"
                    style={{ color: "var(--text-secondary)" }}
                  >
                    {reason.description}
                  </p>
                  <div className="flex items-baseline gap-2.5">
                    <span
                      className="why-stat-number stat-number text-3xl font-extrabold"
                      style={{ color: reason.iconColor }}
                    >
                      {reason.stat}
                    </span>
                    <span
                      className="text-xs font-semibold uppercase tracking-[0.1em]"
                      style={{ color: "var(--text-muted)", fontFamily: "var(--font-mono, monospace)" }}
                    >
                      {reason.statLabel}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
