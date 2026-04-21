"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const services = [
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
      </svg>
    ),
    title: "3D Websites",
    description:
      "Fully interactive 3D websites that let users explore your business in an immersive environment. From landing pages to full-scale web apps.",
    features: ["Interactive Navigation", "Real-time Rendering", "Mobile Responsive", "SEO Optimized"],
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
      </svg>
    ),
    title: "3D Building Tours",
    description:
      "Virtual walkthroughs of buildings, housing societies, and real estate properties. Explore every floor and amenity before visiting.",
    features: ["Floor-by-floor Tours", "Amenity Highlights", "Day/Night Views", "Measurement Tools"],
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h7v7H3V3zm11 0h7v7h-7V3zM3 14h7v7H3v-7zm11 0h7v7h-7v-7z" />
      </svg>
    ),
    title: "3D Restaurant & Retail",
    description:
      "Bring your restaurant, cafe, or retail space online in stunning 3D. Customers explore your ambiance before making a reservation.",
    features: ["Ambiance Preview", "Menu Integration", "Seating Layouts", "Booking Integration"],
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
      </svg>
    ),
    title: "3D Product Showcases",
    description:
      "Interactive 3D models of your products - cars, furniture, electronics. 360° rotation, zoom, and customization at their fingertips.",
    features: ["360° Rotation", "Zoom & Inspect", "Color Customization", "AR Preview"],
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    title: "Interactive Experiences",
    description:
      "Gamified and interactive 3D web experiences that tell your brand story. From virtual events to showcases users remember.",
    features: ["Brand Storytelling", "Virtual Events", "User Interaction", "Analytics"],
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
      </svg>
    ),
    title: "3D Mobile Apps",
    description:
      "Cross-platform 3D applications optimized for mobile. Stunning visuals on both iOS and Android browsers.",
    features: ["Cross-platform", "Touch Optimized", "Offline Support", "Push Notifications"],
  },
];

export default function ServicesSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Header
      gsap.fromTo(".services-header",
        { y: 50, opacity: 0 },
        {
          scrollTrigger: {
            trigger: ".services-header",
            start: "top 85%",
            toggleActions: "play none none none",
          },
          y: 0,
          opacity: 1,
          duration: 0.9,
          ease: "power3.out",
        }
      );

      // Cards — stagger from alternating sides
      gsap.fromTo(".service-card",
        { y: 50, opacity: 0, scale: 0.96 },
        {
          scrollTrigger: {
            trigger: ".services-grid",
            start: "top 80%",
            toggleActions: "play none none none",
          },
          y: 0,
          opacity: 1,
          scale: 1,
          stagger: {
            each: 0.1,
            from: "start",
          },
          duration: 0.7,
          ease: "power3.out",
        }
      );

      // Feature tags slide in
      gsap.fromTo(".service-card .feature-tag",
        { x: -15, opacity: 0 },
        {
          scrollTrigger: {
            trigger: ".services-grid",
            start: "top 70%",
            toggleActions: "play none none none",
          },
          x: 0,
          opacity: 1,
          stagger: 0.03,
          duration: 0.4,
          ease: "power2.out",
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="services" className="relative py-24 md:py-36" ref={sectionRef}>
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section header */}
        <div className="services-header text-center mb-16">
          <div className="section-label mx-auto">What We Build</div>
          <h2
            className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-5 tracking-tight"
            style={{ color: "var(--text-primary)" }}
          >
            Our <span className="gradient-text">3D Services</span>
          </h2>
          <p
            className="text-base md:text-lg max-w-2xl mx-auto leading-relaxed"
            style={{ color: "var(--text-secondary)" }}
          >
            From concept to deployment, we build complete 3D web solutions
            tailored to your business needs.
          </p>
        </div>

        {/* Services grid */}
        <div className="services-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">
          {services.map((service) => (
            <div
              key={service.title}
              className="service-card glass-card p-7 md:p-8 group relative transition-all duration-300 hover:-translate-y-1"
            >
              {/* Icon */}
              <div
                className="w-14 h-14 rounded-xl flex items-center justify-center mb-5 transition-all duration-300 group-hover:scale-105"
                style={{
                  background: "rgba(var(--primary-rgb), 0.08)",
                  border: "1px solid rgba(var(--primary-rgb), 0.15)",
                  color: "var(--primary)",
                }}
              >
                {service.icon}
              </div>

              {/* Service pill */}
              <div className="service-pill mb-4">Core Service</div>

              <h3
                className="text-lg font-bold mb-3 transition-colors duration-300"
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
