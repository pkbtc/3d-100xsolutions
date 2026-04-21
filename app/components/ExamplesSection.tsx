"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const examples = [
  {
    title: "Virtual Restaurant Tour",
    category: "Restaurant",
    description:
      "Explore a fine-dining restaurant in full 3D - from the entrance lobby to private dining rooms. Preview the ambiance before reservation.",
    url: "https://www.matterport.com/industries/restaurants",
    icon: (
      <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h7v7H3V3zm11 0h7v7h-7V3zM3 14h7v7H3v-7zm11 0h7v7h-7v-7z" />
      </svg>
    ),
  },
  {
    title: "Luxury Apartment Walkthrough",
    category: "Real Estate",
    description:
      "A complete 3D walkthrough of a luxury apartment complex. Explore floor plans, balcony views, and common areas on any device.",
    url: "https://www.matterport.com/industries/real-estate",
    icon: (
      <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
      </svg>
    ),
  },
  {
    title: "Car Configurator",
    category: "Automotive",
    description:
      "Interactive 3D car showcase where users pick colors, wheels, and interiors. Rotate, zoom, and customize before visiting.",
    url: "https://www.bmw.com/en/automotive-life/car-configurator.html",
    icon: (
      <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
  },
  {
    title: "Furniture Showroom",
    category: "Retail",
    description:
      "A virtual showroom where customers browse furniture in 3D, see it in different room settings, and get exact measurements.",
    url: "https://www.ikea.com",
    icon: (
      <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
      </svg>
    ),
  },
];

export default function ExamplesSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Header
      gsap.fromTo(".examples-header",
        { y: 50, opacity: 0 },
        {
          scrollTrigger: {
            trigger: ".examples-header",
            start: "top 85%",
            toggleActions: "play none none none",
          },
          y: 0,
          opacity: 1,
          duration: 0.9,
          ease: "power3.out",
        }
      );

      // Cards slide in from alternating sides
      const cards = gsap.utils.toArray<HTMLElement>(".example-card");
      cards.forEach((card, i) => {
        gsap.fromTo(card,
          { x: i % 2 === 0 ? -60 : 60, y: 30, opacity: 0 },
          {
            scrollTrigger: {
              trigger: card,
              start: "top 88%",
              toggleActions: "play none none none",
            },
            x: 0,
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: "power3.out",
          }
        );
      });

      // Note text
      gsap.fromTo(".examples-note",
        { opacity: 0, y: 20 },
        {
          scrollTrigger: {
            trigger: ".examples-note",
            start: "top 92%",
            toggleActions: "play none none none",
          },
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: "power2.out",
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="examples" className="relative py-24 md:py-36" ref={sectionRef}>
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section header */}
        <div className="examples-header text-center mb-16">
          <div className="section-label mx-auto">Inspiration</div>
          <h2
            className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-5 tracking-tight"
            style={{ color: "var(--text-primary)" }}
          >
            3D in <span className="gradient-text">Action</span>
          </h2>
          <p
            className="text-base md:text-lg max-w-2xl mx-auto leading-relaxed"
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
              className="example-card glass-card overflow-hidden group block transition-all duration-300 hover:-translate-y-1"
              id={`example-${i}`}
            >
              {/* Image area */}
              <div
                className="h-48 md:h-56 flex items-center justify-center relative overflow-hidden"
                style={{
                  background: "rgba(255, 255, 255, 0.02)",
                }}
              >
                <span
                  className="relative z-10 transition-transform duration-500 group-hover:scale-110"
                  style={{ color: i % 2 === 0 ? "var(--primary)" : "var(--accent)", opacity: 0.4 }}
                >
                  {example.icon}
                </span>

                {/* Category badge */}
                <div className="absolute top-4 left-4 service-pill">
                  {example.category}
                </div>

                {/* External link icon */}
                <div
                  className="absolute top-4 right-4 w-8 h-8 rounded-lg flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-sm"
                  style={{
                    background: "rgba(var(--primary-rgb), 0.1)",
                    border: "1px solid rgba(var(--primary-rgb), 0.2)",
                    color: "var(--primary)",
                  }}
                >
                  ↗
                </div>
              </div>

              {/* Divider */}
              <div style={{ height: "1px", background: "var(--border)" }} />

              <div className="p-7 md:p-8">
                <h3
                  className="text-lg font-bold mb-2 transition-colors duration-300"
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
          className="examples-note text-center text-sm mt-12"
          style={{ color: "var(--text-muted)" }}
        >
          These are illustrative examples. We build custom 3D experiences tailored to your unique needs.
        </p>
      </div>
    </section>
  );
}
