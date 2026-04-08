"use client";

import { useEffect, useRef } from "react";

const useCases = [
  {
    emoji: "🍽️",
    title: "Restaurants & Cafes",
    description:
      "Let diners explore your space before booking. Showcase ambiance, seating, and the overall experience.",
  },
  {
    emoji: "🏠",
    title: "Real Estate & Housing",
    description:
      "Virtual property tours that help families understand layouts, views, and surroundings.",
  },
  {
    emoji: "🚗",
    title: "Automotive",
    description:
      "Interactive car configurators with 360° views, color options, and interior walkthroughs.",
  },
  {
    emoji: "🏨",
    title: "Hotels & Resorts",
    description:
      "Immersive room tours and resort walkthroughs that boost direct bookings.",
  },
  {
    emoji: "🏗️",
    title: "Architecture",
    description:
      "Present unbuilt projects in full 3D. Clients walk through designs before construction.",
  },
  {
    emoji: "🛋️",
    title: "Interior Design",
    description:
      "Visualize room designs, furniture placement, and material choices in realistic 3D.",
  },
  {
    emoji: "🏥",
    title: "Healthcare",
    description:
      "Help patients navigate hospitals virtually. Showcase facilities for trust building.",
  },
  {
    emoji: "🎓",
    title: "Education",
    description:
      "Virtual campus tours for prospective students. Explore classrooms and labs.",
  },
];

export default function UseCasesSection() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const el = entry.target as HTMLElement;
            el.style.opacity = "1";
            el.style.transform = "scale(1)";
          }
        });
      },
      { threshold: 0.05, rootMargin: "0px 0px -30px 0px" }
    );

    const items = ref.current?.querySelectorAll(".usecase-item");
    items?.forEach((item) => observer.observe(item));

    return () => observer.disconnect();
  }, []);

  return (
    <section id="use-cases" className="relative py-24 md:py-36" ref={ref}>
      {/* Ambient glow */}
      <div
        className="absolute bottom-0 left-1/4 pointer-events-none"
        style={{
          width: "400px",
          height: "400px",
          background: "radial-gradient(circle, rgba(94,158,255,0.03) 0%, transparent 70%)",
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
            Industries We Serve
          </span>
          <h2
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6"
            style={{ color: "var(--text-primary)" }}
          >
            3D for <span className="gradient-text">Every Business</span>
          </h2>
          <p
            className="text-lg md:text-xl max-w-2xl mx-auto leading-relaxed"
            style={{ color: "var(--text-secondary)" }}
          >
            Whatever your industry, a 3D web experience can transform how
            customers perceive and interact with your business.
          </p>
        </div>

        {/* Use cases grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {useCases.map((uc, i) => (
            <div
              key={uc.title}
              className="usecase-item glass-card p-6 text-center group cursor-default transition-all duration-600 ease-out"
              style={{
                opacity: 0,
                transform: "scale(0.95)",
                transitionDelay: `${i * 60}ms`,
              }}
            >
              <div className="glass-icon mx-auto mb-4">
                {uc.emoji}
              </div>
              <h3
                className="text-base font-semibold mb-2 transition-colors duration-300"
                style={{ color: "var(--text-primary)" }}
              >
                {uc.title}
              </h3>
              <p
                className="text-sm leading-relaxed"
                style={{ color: "var(--text-secondary)" }}
              >
                {uc.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
