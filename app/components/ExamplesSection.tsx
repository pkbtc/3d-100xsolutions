"use client";

import { useEffect, useRef } from "react";

const examples = [
  {
    title: "Virtual Restaurant Tour",
    category: "Restaurant",
    description:
      "Explore a fine-dining restaurant in full 3D — from the entrance lobby to private dining rooms. Guests can preview the ambiance before reservation.",
    url: "https://www.matterport.com/industries/restaurants",
    image: "🍽️",
    gradient: "from-[#fd79a8]/20 to-[#e84393]/20",
  },
  {
    title: "Luxury Apartment Walkthrough",
    category: "Real Estate",
    description:
      "A complete 3D walkthrough of a luxury apartment complex. Buyers can explore floor plans, balcony views, and common areas on any device.",
    url: "https://www.matterport.com/industries/real-estate",
    image: "🏢",
    gradient: "from-[#00cec9]/20 to-[#0984e3]/20",
  },
  {
    title: "Car Configurator",
    category: "Automotive",
    description:
      "Interactive 3D car showcase where users pick colors, wheels, and interiors. Rotate, zoom, and customize before visiting the dealership.",
    url: "https://www.bmw.com/en/automotive-life/car-configurator.html",
    image: "🚗",
    gradient: "from-[#6c5ce7]/20 to-[#a29bfe]/20",
  },
  {
    title: "Furniture Showroom",
    category: "Retail",
    description:
      "A virtual showroom where customers browse furniture in 3D, see it in different room settings, and get exact measurements.",
    url: "https://www.ikea.com",
    image: "🛋️",
    gradient: "from-[#fdcb6e]/20 to-[#f9ca24]/20",
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
    <section id="examples" className="relative py-28 md:py-36" ref={ref}>
      <div className="absolute inset-0 bg-gradient-to-b from-background via-surface/30 to-background" />
      <div className="absolute top-1/3 left-0 w-[400px] h-[400px] bg-accent-primary/5 rounded-full blur-[150px]" />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Section header */}
        <div className="text-center mb-20">
          <span className="text-accent-primary text-sm font-semibold uppercase tracking-widest mb-4 block">
            Inspiration
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-text-primary mb-6">
            3D in <span className="gradient-text">Action</span>
          </h2>
          <p className="text-text-secondary text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
            See how businesses across industries are using 3D experiences
            to engage customers and drive results.
          </p>
        </div>

        {/* Examples grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {examples.map((example, i) => (
            <a
              key={example.title}
              href={example.url}
              target="_blank"
              rel="noopener noreferrer"
              className="example-card glass-card rounded-2xl overflow-hidden group block transition-all duration-700 ease-out"
              style={{
                opacity: 0,
                transform: "translateY(30px)",
                transitionDelay: `${i * 150}ms`,
              }}
              id={`example-${i}`}
            >
              {/* Image placeholder area */}
              <div
                className={`h-48 md:h-56 bg-gradient-to-br ${example.gradient} flex items-center justify-center text-7xl relative overflow-hidden`}
              >
                {/* Grid overlay */}
                <div className="absolute inset-0 grid-bg opacity-50" />
                <span className="relative z-10 transition-transform duration-500 group-hover:scale-125">
                  {example.image}
                </span>

                {/* Category badge */}
                <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-background/60 backdrop-blur-sm text-xs font-medium text-text-primary border border-white/10">
                  {example.category}
                </div>

                {/* External link icon */}
                <div className="absolute top-4 right-4 w-8 h-8 rounded-full bg-background/60 backdrop-blur-sm flex items-center justify-center text-text-secondary opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  ↗
                </div>
              </div>

              <div className="p-6 md:p-8">
                <h3 className="text-xl font-bold text-text-primary mb-2 group-hover:text-accent-primary transition-colors duration-300">
                  {example.title}
                </h3>
                <p className="text-text-secondary text-sm leading-relaxed">
                  {example.description}
                </p>
              </div>
            </a>
          ))}
        </div>

        {/* Note */}
        <p className="text-center text-text-muted text-sm mt-10">
          These are illustrative examples. We build custom 3D experiences tailored to your unique needs.
        </p>
      </div>
    </section>
  );
}
