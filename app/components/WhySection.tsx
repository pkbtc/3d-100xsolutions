"use client";

import { useEffect, useRef } from "react";

const reasons = [
  {
    icon: "🎯",
    title: "10x Customer Engagement",
    description:
      "Interactive 3D experiences keep visitors on your site 3x longer than traditional websites. Users explore, rotate, and interact — creating emotional connections that drive conversions.",
    stat: "300%",
    statLabel: "longer session time",
  },
  {
    icon: "🏗️",
    title: "Crystal-Clear Visualization",
    description:
      "Let customers walk through a building before it's built, tour a restaurant before visiting, or inspect a product from every angle. 3D removes guesswork and builds instant trust.",
    stat: "85%",
    statLabel: "faster decisions",
  },
  {
    icon: "🚀",
    title: "Competitive Edge",
    description:
      "Only 2% of businesses use 3D web experiences. Be the first in your industry to offer immersive digital experiences and stand miles ahead.",
    stat: "2%",
    statLabel: "market adoption",
  },
  {
    icon: "💰",
    title: "Higher Conversion Rates",
    description:
      "Businesses with 3D experiences see up to 40% higher conversion rates. When customers can truly experience your offering online, they take action.",
    stat: "40%",
    statLabel: "more conversions",
  },
];

export default function WhySection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const el = entry.target as HTMLElement;
            el.style.opacity = "1";
            el.style.transform = "translateY(0)";
          }
        });
      },
      { threshold: 0.05, rootMargin: "0px 0px -30px 0px" }
    );

    const cards = sectionRef.current?.querySelectorAll(".why-card");
    cards?.forEach((card) => observer.observe(card));

    return () => observer.disconnect();
  }, []);

  return (
    <section id="why-3d" className="relative py-24 md:py-36" ref={sectionRef}>
      {/* Ambient glow */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 pointer-events-none"
        style={{
          width: "500px",
          height: "500px",
          background: "radial-gradient(circle, rgba(94,158,255,0.04) 0%, transparent 70%)",
          filter: "blur(100px)",
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section header */}
        <div className="text-center mb-20">
          <span
            className="text-xs font-semibold uppercase tracking-[0.2em] mb-4 block"
            style={{ color: "var(--accent)" }}
          >
            The Future is 3D
          </span>
          <h2
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6"
            style={{ color: "var(--text-primary)" }}
          >
            Why <span className="gradient-text">3D Matters</span> for Your Business
          </h2>
          <p
            className="text-lg md:text-xl max-w-2xl mx-auto leading-relaxed"
            style={{ color: "var(--text-secondary)" }}
          >
            In a world of flat websites, 3D experiences cut through the noise and
            make your business unforgettable.
          </p>
        </div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 lg:gap-6">
          {reasons.map((reason, i) => (
            <div
              key={reason.title}
              className="why-card glass-card p-8 md:p-10 group transition-all duration-700 ease-out"
              style={{
                opacity: 0,
                transform: "translateY(24px)",
                transitionDelay: `${i * 120}ms`,
              }}
            >
              <div className="flex flex-col sm:flex-row items-start gap-5">
                <div className="glass-icon">
                  {reason.icon}
                </div>
                <div className="flex-1">
                  <h3
                    className="text-xl md:text-2xl font-semibold mb-3 transition-colors duration-300"
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
                      className="stat-number text-3xl font-bold"
                      style={{ color: "var(--text-primary)" }}
                    >
                      {reason.stat}
                    </span>
                    <span
                      className="text-xs font-medium"
                      style={{ color: "var(--text-muted)" }}
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
