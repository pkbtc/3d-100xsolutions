"use client";

import { useEffect, useRef } from "react";

const useCases = [
  {
    emoji: "🍽️",
    title: "Restaurants & Cafes",
    description:
      "Let diners explore your space before booking. Showcase ambiance, seating, and the overall experience.",
    color: "rgba(253, 121, 168, 0.15)",
    borderColor: "rgba(253, 121, 168, 0.3)",
  },
  {
    emoji: "🏠",
    title: "Real Estate & Housing",
    description:
      "Virtual property tours that help families understand layouts, views, surroundings and neighborhood.",
    color: "rgba(0, 206, 201, 0.15)",
    borderColor: "rgba(0, 206, 201, 0.3)",
  },
  {
    emoji: "🚗",
    title: "Automotive",
    description:
      "Interactive car configurators with 360° views, color options, and interior walkthroughs.",
    color: "rgba(108, 92, 231, 0.15)",
    borderColor: "rgba(108, 92, 231, 0.3)",
  },
  {
    emoji: "🏨",
    title: "Hotels & Resorts",
    description:
      "Immersive room tours, pool views, and resort walkthroughs that boost direct bookings.",
    color: "rgba(253, 203, 110, 0.15)",
    borderColor: "rgba(253, 203, 110, 0.3)",
  },
  {
    emoji: "🏗️",
    title: "Architecture & Construction",
    description:
      "Present unbuilt projects in full 3D. Clients can walk through designs before construction begins.",
    color: "rgba(162, 155, 254, 0.15)",
    borderColor: "rgba(162, 155, 254, 0.3)",
  },
  {
    emoji: "🛋️",
    title: "Interior Design",
    description:
      "Visualize room designs, furniture placement, and material choices in realistic 3D environments.",
    color: "rgba(129, 236, 236, 0.15)",
    borderColor: "rgba(129, 236, 236, 0.3)",
  },
  {
    emoji: "🏥",
    title: "Healthcare Facilities",
    description:
      "Help patients navigate hospitals virtually. Showcase facilities and equipment for trust building.",
    color: "rgba(250, 177, 160, 0.15)",
    borderColor: "rgba(250, 177, 160, 0.3)",
  },
  {
    emoji: "🎓",
    title: "Education & Campus",
    description:
      "Virtual campus tours for prospective students. Explore classrooms, labs, and recreational areas.",
    color: "rgba(108, 92, 231, 0.15)",
    borderColor: "rgba(108, 92, 231, 0.3)",
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
    <section id="use-cases" className="relative py-28 md:py-36 grid-bg" ref={ref}>
      <div className="absolute bottom-0 left-1/4 w-[500px] h-[500px] bg-accent-tertiary/5 rounded-full blur-[150px]" />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Section header */}
        <div className="text-center mb-20">
          <span className="text-accent-tertiary text-sm font-semibold uppercase tracking-widest mb-4 block">
            Industries We Serve
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-text-primary mb-6">
            3D for <span className="gradient-text">Every Business</span>
          </h2>
          <p className="text-text-secondary text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
            Whatever your industry, a 3D web experience can transform how
            customers perceive and interact with your business.
          </p>
        </div>

        {/* Use cases grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {useCases.map((uc, i) => (
            <div
              key={uc.title}
              className="usecase-item glass-card rounded-2xl p-6 text-center group cursor-default transition-all duration-600 ease-out"
              style={{
                opacity: 0,
                transform: "scale(0.9)",
                transitionDelay: `${i * 80}ms`,
              }}
            >
              <div
                className="use-case-icon mx-auto"
                style={{
                  background: uc.color,
                  borderColor: uc.borderColor,
                }}
              >
                {uc.emoji}
              </div>
              <h3 className="text-lg font-bold text-text-primary mb-2 group-hover:text-accent-primary transition-colors duration-300">
                {uc.title}
              </h3>
              <p className="text-text-secondary text-sm leading-relaxed">
                {uc.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
