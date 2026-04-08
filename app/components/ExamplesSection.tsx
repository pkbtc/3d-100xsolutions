"use client";

import { useEffect, useRef } from "react";

const examples = [
  {
    title: "Virtual Restaurant Tour",
    category: "Restaurant",
    description:
      "Explore a fine-dining restaurant in full 3D — from the entrance lobby to private dining rooms. Preview the ambiance before reservation.",
    url: "https://www.matterport.com/industries/restaurants",
    image: "🍽️",
  },
  {
    title: "Luxury Apartment Walkthrough",
    category: "Real Estate",
    description:
      "A complete 3D walkthrough of a luxury apartment complex. Explore floor plans, balcony views, and common areas on any device.",
    url: "https://www.matterport.com/industries/real-estate",
    image: "🏢",
  },
  {
    title: "Car Configurator",
    category: "Automotive",
    description:
      "Interactive 3D car showcase where users pick colors, wheels, and interiors. Rotate, zoom, and customize before visiting.",
    url: "https://www.bmw.com/en/automotive-life/car-configurator.html",
    image: "🚗",
  },
  {
    title: "Furniture Showroom",
    category: "Retail",
    description:
      "A virtual showroom where customers browse furniture in 3D, see it in different room settings, and get exact measurements.",
    url: "https://www.ikea.com",
    image: "🛋️",
  },
];

export default function ExamplesSection() {
  const ref = useRef<HTMLDivElement>(null);

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

    const items = ref.current?.querySelectorAll(".example-card");
    items?.forEach((item) => observer.observe(item));

    return () => observer.disconnect();
  }, []);

  return (
    <section id="examples" className="relative py-24 md:py-36" ref={ref}>
      {/* Ambient glow */}
      <div
        className="absolute top-1/3 left-0 pointer-events-none"
        style={{
          width: "350px",
          height: "350px",
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
            Inspiration
          </span>
          <h2
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6"
            style={{ color: "var(--text-primary)" }}
          >
            3D in <span className="gradient-text">Action</span>
          </h2>
          <p
            className="text-lg md:text-xl max-w-2xl mx-auto leading-relaxed"
            style={{ color: "var(--text-secondary)" }}
          >
            See how businesses across industries are using 3D experiences
            to engage customers and drive results.
          </p>
        </div>

        {/* Examples grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 lg:gap-6">
          {examples.map((example, i) => (
            <a
              key={example.title}
              href={example.url}
              target="_blank"
              rel="noopener noreferrer"
              className="example-card glass-card overflow-hidden group block transition-all duration-700 ease-out"
              style={{
                opacity: 0,
                transform: "translateY(24px)",
                transitionDelay: `${i * 120}ms`,
              }}
              id={`example-${i}`}
            >
              {/* Image area — glass surface */}
              <div
                className="h-48 md:h-56 flex items-center justify-center text-7xl relative overflow-hidden"
                style={{
                  background: "rgba(255, 255, 255, 0.02)",
                }}
              >
                <span className="relative z-10 transition-transform duration-500 group-hover:scale-110">
                  {example.image}
                </span>

                {/* Category badge */}
                <div
                  className="absolute top-4 left-4 px-3 py-1.5 rounded-full text-[11px] font-medium"
                  style={{
                    background: "rgba(255,255,255,0.06)",
                    backdropFilter: "blur(20px)",
                    border: "1px solid rgba(255,255,255,0.08)",
                    color: "var(--text-secondary)",
                  }}
                >
                  {example.category}
                </div>

                {/* External link icon */}
                <div
                  className="absolute top-4 right-4 w-8 h-8 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-sm"
                  style={{
                    background: "rgba(255,255,255,0.06)",
                    backdropFilter: "blur(20px)",
                    border: "1px solid rgba(255,255,255,0.08)",
                    color: "var(--text-secondary)",
                  }}
                >
                  ↗
                </div>
              </div>

              {/* Divider line */}
              <div
                style={{
                  height: "1px",
                  background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.06), transparent)",
                }}
              />

              <div className="p-7 md:p-8">
                <h3
                  className="text-lg font-semibold mb-2 transition-colors duration-300"
                  style={{ color: "var(--text-primary)" }}
                >
                  {example.title}
                </h3>
                <p
                  className="text-sm leading-relaxed"
                  style={{ color: "var(--text-secondary)" }}
                >
                  {example.description}
                </p>
              </div>
            </a>
          ))}
        </div>

        {/* Note */}
        <p
          className="text-center text-sm mt-12"
          style={{ color: "var(--text-muted)" }}
        >
          These are illustrative examples. We build custom 3D experiences tailored to your unique needs.
        </p>
      </div>
    </section>
  );
}
