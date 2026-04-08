"use client";

import { useEffect, useRef } from "react";

const services = [
  {
    icon: "🌐",
    title: "3D Websites",
    description:
      "Fully interactive 3D websites that let users explore your business in an immersive environment. From landing pages to full-scale web apps.",
    features: ["Interactive Navigation", "Real-time Rendering", "Mobile Responsive", "SEO Optimized"],
  },
  {
    icon: "🏢",
    title: "3D Building Tours",
    description:
      "Virtual walkthroughs of buildings, housing societies, and real estate properties. Explore every floor and amenity before visiting.",
    features: ["Floor-by-floor Tours", "Amenity Highlights", "Day/Night Views", "Measurement Tools"],
  },
  {
    icon: "🍽️",
    title: "3D Restaurant & Retail",
    description:
      "Bring your restaurant, cafe, or retail space online in stunning 3D. Customers explore your ambiance before making a reservation.",
    features: ["Ambiance Preview", "Menu Integration", "Seating Layouts", "Booking Integration"],
  },
  {
    icon: "🚗",
    title: "3D Product Showcases",
    description:
      "Interactive 3D models of your products — cars, furniture, electronics. 360° rotation, zoom, and customization at their fingertips.",
    features: ["360° Rotation", "Zoom & Inspect", "Color Customization", "AR Preview"],
  },
  {
    icon: "🎮",
    title: "Interactive Experiences",
    description:
      "Gamified and interactive 3D web experiences that tell your brand story. From virtual events to showcases users remember.",
    features: ["Brand Storytelling", "Virtual Events", "User Interaction", "Analytics"],
  },
  {
    icon: "📱",
    title: "3D Mobile Apps",
    description:
      "Cross-platform 3D applications optimized for mobile. Stunning visuals on both iOS and Android browsers.",
    features: ["Cross-platform", "Touch Optimized", "Offline Support", "Push Notifications"],
  },
];

export default function ServicesSection() {
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

    const cards = sectionRef.current?.querySelectorAll(".service-card");
    cards?.forEach((card) => observer.observe(card));

    return () => observer.disconnect();
  }, []);

  return (
    <section id="services" className="relative py-24 md:py-36" ref={sectionRef}>
      {/* Ambient glow */}
      <div
        className="absolute top-1/2 right-0 pointer-events-none"
        style={{
          width: "400px",
          height: "400px",
          background: "radial-gradient(circle, rgba(140,120,200,0.04) 0%, transparent 70%)",
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
            What We Build
          </span>
          <h2
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6"
            style={{ color: "var(--text-primary)" }}
          >
            Our <span className="gradient-text">3D Services</span>
          </h2>
          <p
            className="text-lg md:text-xl max-w-2xl mx-auto leading-relaxed"
            style={{ color: "var(--text-secondary)" }}
          >
            From concept to deployment, we build complete 3D web solutions
            tailored to your business needs.
          </p>
        </div>

        {/* Services grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">
          {services.map((service, i) => (
            <div
              key={service.title}
              className="service-card glass-card p-7 md:p-8 group relative transition-all duration-700 ease-out"
              style={{
                opacity: 0,
                transform: "translateY(24px)",
                transitionDelay: `${i * 80}ms`,
              }}
            >
              <div className="glass-icon mb-5">
                {service.icon}
              </div>
              <h3
                className="text-lg font-semibold mb-3 transition-colors duration-300"
                style={{ color: "var(--text-primary)" }}
              >
                {service.title}
              </h3>
              <p
                className="text-sm leading-relaxed mb-6"
                style={{ color: "var(--text-secondary)" }}
              >
                {service.description}
              </p>

              {/* Feature tags */}
              <div className="flex flex-wrap gap-2">
                {service.features.map((feature) => (
                  <span key={feature} className="feature-tag">
                    {feature}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
