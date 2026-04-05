"use client";

import { useEffect, useRef } from "react";

const reasons = [
  {
    icon: "🎯",
    title: "10x Customer Engagement",
    description:
      "Interactive 3D experiences keep visitors on your site 3x longer than traditional websites. Users can explore, rotate, and interact with your space — creating emotional connections that drive conversions.",
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
      "Only 2% of businesses use 3D web experiences. Be the first in your industry to offer immersive digital experiences and stand miles ahead of your competition.",
    stat: "2%",
    statLabel: "market adoption",
  },
  {
    icon: "💰",
    title: "Higher Conversion Rates",
    description:
      "Businesses with 3D experiences see up to 40% higher conversion rates. When customers can truly experience your offering online, they're far more likely to take action.",
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
    <section id="why-3d" className="relative py-20 md:py-36 grid-bg" ref={sectionRef}>
      {/* Background accent */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[300px] sm:w-[600px] h-[300px] sm:h-[600px] bg-accent-primary/5 rounded-full blur-[100px] sm:blur-[150px]" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section header */}
        <div className="text-center mb-20">
          <span className="text-accent-secondary text-sm font-semibold uppercase tracking-widest mb-4 block">
            The Future is 3D
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-text-primary mb-6">
            Why <span className="gradient-text">3D Matters</span> for Your Business
          </h2>
          <p className="text-text-secondary text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
            In a world of flat websites, 3D experiences cut through the noise and
            make your business unforgettable.
          </p>
        </div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {reasons.map((reason, i) => (
            <div
              key={reason.title}
              className="why-card glass-card rounded-2xl p-8 md:p-10 group transition-all duration-700 ease-out"
              style={{
                opacity: 0,
                transform: "translateY(30px)",
                transitionDelay: `${i * 150}ms`,
              }}
            >
              <div className="flex flex-col sm:flex-row items-start gap-4 sm:gap-6">
                <div className="use-case-icon shrink-0 !mb-0 text-3xl">
                  {reason.icon}
                </div>
                <div className="flex-1">
                  <h3 className="text-xl md:text-2xl font-bold text-text-primary mb-3 group-hover:text-accent-primary transition-colors duration-300">
                    {reason.title}
                  </h3>
                  <p className="text-text-secondary leading-relaxed mb-4">
                    {reason.description}
                  </p>
                  <div className="flex items-baseline gap-2">
                    <span className="stat-number text-3xl font-bold">{reason.stat}</span>
                    <span className="text-text-muted text-sm">{reason.statLabel}</span>
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
