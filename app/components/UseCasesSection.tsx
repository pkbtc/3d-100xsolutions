"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const useCases = [
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h7v7H3V3zm11 0h7v7h-7V3zM3 14h7v7H3v-7zm11 0h7v7h-7v-7z" />
      </svg>
    ),
    title: "Restaurants & Cafes",
    description:
      "Let diners explore your space before booking. Showcase ambiance, seating, and the overall experience.",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
      </svg>
    ),
    title: "Real Estate & Housing",
    description:
      "Virtual property tours that help families understand layouts, views, and surroundings.",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
    title: "Automotive",
    description:
      "Interactive car configurators with 360° views, color options, and interior walkthroughs.",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
      </svg>
    ),
    title: "Hotels & Resorts",
    description:
      "Immersive room tours and resort walkthroughs that boost direct bookings.",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z" />
      </svg>
    ),
    title: "Architecture",
    description:
      "Present unbuilt projects in full 3D. Clients walk through designs before construction.",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
      </svg>
    ),
    title: "Interior Design",
    description:
      "Visualize room designs, furniture placement, and material choices in realistic 3D.",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
      </svg>
    ),
    title: "Healthcare",
    description:
      "Help patients navigate hospitals virtually. Showcase facilities for trust building.",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
      </svg>
    ),
    title: "Education",
    description:
      "Virtual campus tours for prospective students. Explore classrooms and labs.",
  },
];

export default function UseCasesSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Header
      gsap.fromTo(".usecases-header", 
        { y: 50, opacity: 0 },
        {
          scrollTrigger: {
            trigger: ".usecases-header",
            start: "top 85%",
            toggleActions: "play none none none",
          },
          y: 0,
          opacity: 1,
          duration: 0.9,
          ease: "power3.out",
        }
      );

      // Cards pop in with scale
      gsap.fromTo(".usecase-item", 
        { scale: 0.85, opacity: 0 },
        {
          scrollTrigger: {
            trigger: ".usecases-grid",
            start: "top 82%",
            toggleActions: "play none none none",
          },
          scale: 1,
          opacity: 1,
          stagger: {
            each: 0.07,
            grid: [2, 4],
            from: "center",
          },
          duration: 0.6,
          ease: "back.out(1.4)",
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="use-cases" className="relative py-24 md:py-36" ref={sectionRef}>
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section header */}
        <div className="usecases-header text-center mb-16">
          <div className="section-label mx-auto">Industries We Serve</div>
          <h2
            className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-5 tracking-tight"
            style={{ color: "var(--text-primary)" }}
          >
            3D for <span className="gradient-text">Every Business</span>
          </h2>
          <p
            className="text-base md:text-lg max-w-2xl mx-auto leading-relaxed"
            style={{ color: "var(--text-secondary)" }}
          >
            Whatever your industry, a 3D web experience can transform how
            customers perceive and interact with your business.
          </p>
        </div>

        {/* Use cases grid */}
        <div className="usecases-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {useCases.map((uc, i) => (
            <div
              key={uc.title}
              className="usecase-item glass-card p-6 text-center group cursor-default transition-all duration-300 hover:-translate-y-1"
            >
              <div
                className="w-14 h-14 rounded-xl flex items-center justify-center mx-auto mb-4 transition-all duration-300 group-hover:scale-105"
                style={{
                  background: i % 2 === 0 ? "rgba(var(--primary-rgb), 0.08)" : "rgba(var(--accent-rgb), 0.06)",
                  border: `1px solid ${i % 2 === 0 ? "rgba(var(--primary-rgb), 0.15)" : "rgba(var(--accent-rgb), 0.12)"}`,
                  color: i % 2 === 0 ? "var(--primary)" : "var(--accent)",
                }}
              >
                {uc.icon}
              </div>
              <h3
                className="text-base font-bold mb-2 transition-colors duration-300"
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
